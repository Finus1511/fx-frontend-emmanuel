import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import AgoraRTC from "agora-rtc-sdk-ng";
import { createNotification } from "react-redux-notify";
import { useDispatch, useSelector } from "react-redux";
import {
  getErrorNotificationMessage,
  getSuccessNotificationMessage,
} from "../../components/helper/NotificationMessage";
import { updateSingleLiveVideoStart } from "../../store/actions/LiveVideoAction";
import { virtualExperienceHostUpdateStart } from "../../store/actions/CreatorVirtualAction";

const useAgoraRTC = (client, socket) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [localVideoTrack, setLocalVideoTrack] = useState(undefined);
  const [localAudioTrack, setLocalAudioTrack] = useState(undefined);
  const [joinState, setJoinState] = useState(false);
  const [remoteUsers, setRemoteUsers] = useState([]);
  const [count, setCount] = useState(0);
  const [isStreamEnded, setIsStreamEnded] = useState(false);
  const [joinedUsers, setJoinedUsers] = useState([]);
  const [mediaStatus, setMediaStatus] = useState({
    audio: {
      muted: false,
    },
    video: {
      muted: false,
      fullScreen: false,
    },
    permissionDenied: null,
  });

  const createLocalTracks = async (audioConfig, videoConfig) => {
    const [microphoneTrack, cameraTrack] =
      await AgoraRTC.createMicrophoneAndCameraTracks({
        microphone: {
          AEC: true,
          ANS: true,
          AGC: true,
          encoderConfig: "music_standard",
        },
        camera: {
          encoderConfig: "720p_1",
        },
      });
    setLocalAudioTrack(microphoneTrack);
    setLocalVideoTrack(cameraTrack);
    return [microphoneTrack, cameraTrack];
  };

  const createAudioTrack = async (audioConfig) => {
    const microphoneTrack = await AgoraRTC.createMicrophoneAudioTrack(
      audioConfig
    );
    setLocalAudioTrack(microphoneTrack);
    return microphoneTrack;
  };

  const createVideoTrack = async (audioConfig) => {
    const cameraTrack = await AgoraRTC.createCameraVideoTrack(audioConfig);
    setLocalVideoTrack(cameraTrack);
    return cameraTrack;
  };

  const unPublishLocalTracks = async () => {
    const [microphoneTrack, cameraTrack] = await createLocalTracks();
    await client.unpublish([microphoneTrack, cameraTrack]);
  };

  const join = async (appid, channel, token, role, mode, isOwner) => {
    if (!client || !role) return;

    if (mode === "live") {
      client.setClientRole(role);

      await client.join(appid, channel, token || null).catch((e) => {
        leaveRtcChannel(isOwner);
      });

      if (isOwner) {
        try {
          const cameraStream = await navigator.mediaDevices.getUserMedia({
            video: true,
          });
          const cameraTrack = await createVideoTrack(cameraStream);
          await client.publish([cameraTrack]);
        } catch (cameraError) {
          setMediaStatus((prev) => ({
            ...prev,
            permissionDenied: true,
          }));
          const notificationMessage = getErrorNotificationMessage(
            cameraError.message
          );
          dispatch(createNotification(notificationMessage));
        }

        try {
          const microphoneStream = await navigator.mediaDevices.getUserMedia({
            audio: true,
          });
          const microphoneTrack = await createAudioTrack(microphoneStream);
          await client.publish([microphoneTrack]);
        } catch (microphoneError) {
          setMediaStatus((prev) => ({
            ...prev,
            permissionDenied: true,
            audio: { muted: true },
          }));
          const notificationMessage = getErrorNotificationMessage(
            microphoneError.message
          );
          dispatch(createNotification(notificationMessage));
        }
      }

      setJoinState(true);
      setMediaStatus((prev) => {
        return {
          ...prev,
          permissionDenied: false,
        };
      });
    }
  };

  const unpublishTracks = async (track) => {
    if (track) {
      await client.unpublish(track);
    } else {
      await client.unpublish();
    }
  };

  const leaveRtcChannel = async (isHost) => {
    if (localAudioTrack) {
      localAudioTrack.stop();
      localAudioTrack.close();
    }
    if (localVideoTrack) {
      localVideoTrack.stop();
      localVideoTrack.close();
    }
    if (isHost) {
      localStorage.removeItem("virtual_id");
      setRemoteUsers([]);
      setJoinState(false);
      await client?.leave();
      setIsStreamEnded("isOwner");
    } else {
      await client?.leave();
      setIsStreamEnded("audience");
    }
  };

  const muteAudio = async () => {
    if (localAudioTrack) {
      await localAudioTrack.setMuted(!localAudioTrack.muted);
      setMediaStatus({
        ...mediaStatus,
        audio: {
          ...mediaStatus.audio,
          muted: localAudioTrack.muted,
        },
      });
    } else {
      const notificationMessage = getErrorNotificationMessage(
        "MicroPhone Access Denied"
      );
      dispatch(createNotification(notificationMessage));
    }
  };

  const muteVideo = async () => {
    if (localVideoTrack) {
      await localVideoTrack.setMuted(!localVideoTrack.muted);
      setMediaStatus({
        ...mediaStatus,
        video: {
          ...mediaStatus.video,
          muted: localVideoTrack.muted,
        },
      });
    } else {
      const notificationMessage = getErrorNotificationMessage(
        "Camera Access Denied"
      );
      dispatch(createNotification(notificationMessage));
    }
  };

  useEffect(() => {
    if (!client) return;
    setRemoteUsers(client.remoteUsers);
    const handleUserPublished = async (user, mediaType) => {
      await client.subscribe(user, mediaType);
      const remote = Array.from(client.remoteUsers).filter(
        (user) => user.videoTrack || user.audioTrack
      );

      const uids = remote.map((user) => user.uid);
      setRemoteUsers(remote);
      localStorage.setItem("isOwner", uids[0]);
      setCount(client.remoteUsers.length);
    };

    const handleUserUnpublished = (user) => {
      setRemoteUsers((remoteUsers) =>
        Array.from(client.remoteUsers).filter(
          (user) => user.videoTrack || user.audioTrack
        )
      );
      setCount(client.remoteUsers.length);
    };

    const handleUserJoined = async (user) => {
      setRemoteUsers((remoteUsers) =>
        Array.from(client.remoteUsers).filter(
          (user) => user.videoTrack || user.audioTrack
        )
      );
      setCount(client.remoteUsers.length);
    };

    const handleUserLeft = async (user) => {
      if (user.uid == localStorage.getItem("isOwner")) {
        await client.leave();
        setRemoteUsers([]);
        setCount(0);
        localStorage.removeItem("isOwner");
        const notificationMessage = getSuccessNotificationMessage(
          "Creator leaves the livestream"
        );
        dispatch(createNotification(notificationMessage));
        history.push("/order-placed-detail");
      } else {
        setRemoteUsers((remoteUsers) =>
          Array.from(client.remoteUsers).filter(
            (user) => user.videoTrack || user.audioTrack
          )
        );
        setCount(client.remoteUsers.length);
      }
    };

    client.on("user-published", handleUserPublished);
    client.on("user-unpublished", handleUserUnpublished);
    client.on("user-joined", handleUserJoined);
    client.on("user-left", handleUserLeft);

    return () => {
      client.off("user-published", handleUserPublished);
      client.off("user-unpublished", handleUserUnpublished);
      client.off("user-joined", handleUserJoined);
      client.off("user-left", handleUserLeft);
    };
  }, [client]);

  return {
    localAudioTrack,
    localVideoTrack,
    joinState,
    leaveRtcChannel,
    join,
    remoteUsers,
    isStreamEnded,
    muteAudio,
    muteVideo,
    mediaStatus,
    unpublishTracks,
    unPublishLocalTracks,
    joinedUsers,
    count,
  };
};

export default useAgoraRTC;
