import React, { useEffect, useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import { createNotification } from "react-redux-notify";
import { useDispatch, useSelector } from "react-redux";
import { getErrorNotificationMessage } from "../../components/helper/NotificationMessage";
import { updateSingleLiveVideoStart } from "../../store/actions/LiveVideoAction";
import { virtualExperienceHostUpdateStart } from "../../store/actions/CreatorVirtualAction";

const useAgoraRTC = (client, socket) => {
  const dispatch = useDispatch();

  const [localVideoTrack, setLocalVideoTrack] = useState(undefined);
  const [localAudioTrack, setLocalAudioTrack] = useState(undefined);
  const [joinState, setJoinState] = useState(false);
  const [remoteUsers, setRemoteUsers] = useState([]);
  const [isStreamEnded, setIsStreamEnded] = useState(false);
  const [hostUser, setHostUser] = useState(false);
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
          AEC: true, // Enable Acoustic Echo Cancellation (AEC)
          ANS: true, // Enable Automatic Noise Suppression (ANS)
          AGC: true, // Enable Automatic Gain Control (AGC)
          encoderConfig: 'music_standard', // Audio encoder configuration
        },
        camera: {
          encoderConfig: '720p_1', // Video encoder configuration
        }
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

  const unPublishLocalTracks = async () => {
    const [microphoneTrack, cameraTrack] = await createLocalTracks();
    await client.unpublish([microphoneTrack, cameraTrack]);
  };

  const join = async (appid, channel, token, role, mode, isOwner, video_id, userName) => {
    if (!client || !role) return;

    if (mode === "live") {

      client.setClientRole(role);

      await client.join(appid, channel, token || null).catch((e) => {
        leaveRtcChannel();
      });

      // socket code for storing users 

      // const joinEventData = {
      //   event: 'userJoined',
      //   uid: client.uid,
      //   name: userName,
      // };

      // let send_message = { data: [...joinedUsers, {
      //   event: 'userJoined',
      //   uid: client.uid,
      //   name: userName,
      // }], room : video_id }
      
      // socket.emit("send_message", send_message);
      // setJoinedUsers((prev) => [...prev, joinEventData]);

      if(isOwner) {
        dispatch(virtualExperienceHostUpdateStart({
          virtual_experience_unique_id: video_id,
          host_id: client?._joinInfo?.uid 
        }))
      }

      if (role === "host") {
        await navigator.mediaDevices
          .getUserMedia({ audio: true, video: true })
          .then(async (res) => {
            const [microphoneTrack, cameraTrack] = await createLocalTracks();
            cameraTrack.play("agora_local", { fit: "cover", mirror: true });
            await client.publish([microphoneTrack, cameraTrack]);
            window.client = client;
            window.videoTrack = cameraTrack;
          })
          .catch((e) => {
            console.log("denied", e);
            setMediaStatus((prev) => {
              return {
                ...prev,
                permissionDenied: true,
              };
            });
            const notificationMessage = getErrorNotificationMessage(e.message);
            dispatch(createNotification(notificationMessage));
          });
      }
      setJoinState(true);
      setMediaStatus((prev) => {
        return {
          ...prev,
          permissionDenied: false,
        };
      });
    } else {
      await navigator.mediaDevices
        .getUserMedia({ audio: true, video: true })
        .then(async (res) => {
          await client.join(appid, channel, token || null).catch((e) => {
            leaveRtcChannel();
          });
          const [microphoneTrack, cameraTrack] = await createLocalTracks();
          await client.publish([microphoneTrack, cameraTrack]);
          window.client = client;
          window.videoTrack = cameraTrack;
          setJoinState(true);
          setMediaStatus((prev) => {
            return {
              ...prev,
              permissionDenied: false,
            };
          });
        })
        .catch((e) => {
          console.log("denied", e);
          setMediaStatus((prev) => {
            return {
              ...prev,
              permissionDenied: true,
            };
          });
          const notificationMessage = getErrorNotificationMessage(e.message);
          dispatch(createNotification(notificationMessage));
        });
    }
  };

  const joinAudio = async (appid, channel, token) => {
    if (!client) return;

    await navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then(async (res) => {
        await client.join(appid, channel, token || null).catch((e) => {
          leaveRtcChannel();
        });
        const microphoneTrack = await createAudioTrack();
        await client.publish([microphoneTrack]);
        window.client = client;
        setJoinState(true);
        setMediaStatus((prev) => {
          return {
            ...prev,
            permissionDenied: false,
          };
        });
      })
      .catch((e) => {
        console.log("denied", e);
        setMediaStatus((prev) => {
          return {
            ...prev,
            permissionDenied: true,
          };
        });
        const notificationMessage = getErrorNotificationMessage(e.message);
        dispatch(createNotification(notificationMessage));
      });
  };

  const unpublishTracks = async (track) => {
    if (track) {
      await client.unpublish(track);
    } else {
      await client.unpublish();
    }
  };

  const leaveRtcChannel = async (isHost = true) => {
    if (localAudioTrack) {
      localAudioTrack.stop();
      localAudioTrack.close();
    }
    if (localVideoTrack) {
      localVideoTrack.stop();
      localVideoTrack.close();
    }
    if (isHost) {
      setRemoteUsers([]);
      setJoinState(false);
      await client?.leave();
      setIsStreamEnded(true);
    } else {
      await client?.leave();
      setIsStreamEnded(true);
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
    }
  };

  const toggleFullScreen = () => {
    setMediaStatus((prevMediaStatus) => {
      if (prevMediaStatus.video.fullScreen) {
        document.body.style.overflow = "auto";
      } else {
        document.body.style.overflow = "hidden";
      }
      return {
        ...prevMediaStatus,
        video: {
          ...prevMediaStatus.video,
          fullScreen: !prevMediaStatus.video.fullScreen,
        },
      };
    });
  };

  useEffect(() => {
    if (!client) return;

    setRemoteUsers(client.remoteUsers);

    const handleUserPublished = async (user, mediaType) => {
      // one to one logic here
      await client.subscribe(user, mediaType);
      // toggle rerender while state of remoteUsers changed.
      setRemoteUsers((remoteUsers) => Array.from(client.remoteUsers));
    };
    const handleUserUnpublished = (user) => {
      setRemoteUsers((remoteUsers) => Array.from(client.remoteUsers));
    };
    const handleUserJoined = (user) => {
      setRemoteUsers((remoteUsers) => Array.from(client.remoteUsers));
    };
    const handleUserLeft = (user) => {
      setRemoteUsers((remoteUsers) => Array.from(client.remoteUsers));
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
      localStorage.removeItem("hostUser");
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
    toggleFullScreen,
    unpublishTracks,
    joinAudio,
    unPublishLocalTracks,
    hostUser,
    joinedUsers,
  };
};

export default useAgoraRTC;



