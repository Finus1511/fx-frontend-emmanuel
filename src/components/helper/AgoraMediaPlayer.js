import React, { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { liveVideoElement } from "../../store/actions/LiveVideoAction";

const AgoraMediaPlayer = (props) => {
  const container = useRef(null);
  const videoElement = useRef(null);
  const location = useLocation();

  const dispatch = useDispatch();

  console.log("videoTrack", props.videoTrack);

  useEffect(() => {
    if (!container.current) return;

    const playTrack = (track) => {
      if (track) {
        track.play(container.current, {
          mirror: props.mirror ? true : false,
        });
      }
    };

    playTrack(props.videoTrack);
    playTrack(props.audioTrack);

    return () => {
      if (props.videoTrack) {
        props.videoTrack.stop();
      }
      if (props.audioTrack) {
        props.audioTrack.stop();
      }
    };
  }, [container, props.videoTrack, props.audioTrack]);

  const togglePictureInPicture = async () => {
    try {
      if (document.pictureInPictureEnabled) {
        if (document.pictureInPictureElement) {
          document.exitPictureInPicture();
        } else {
          console.log(`video_${props.localtrackID}`);
          const data = document.getElementById(`video_${props.localtrackID}`);
          data.style.transform = "rotateY(0deg)";
          await data.requestPictureInPicture();
          dispatch(liveVideoElement({
            current: data,
            path: location.pathname,
            current_path: location.pathname
          }));
          // videoElement.current = data; // Store the reference to the video element
        }
      } else {
        console.error("Picture-in-Picture mode is not supported.");
      }
    } catch (error) {
      console.error("Error toggling Picture-in-Picture mode:", error);
    }
  };

  useEffect(() => {
    togglePictureInPicture();
  }, [props.pipMode]);

  // useEffect(() => {
  //   const handleLeavePip = () => {
  //     const path = location.pathname;
  //     console.log('location', path,
  //       `/join-live/${localStorage.getItem(
  //         "live_video_unique_id"
  //       )}`)
  //     console.log("Close PIP");
  //     // Add behavior after exiting PiP
  //     // Example: window.location.href = 'https://example.com/return-path';
  //   };

  //   // Add event listener when videoElement ref is set
  //   if (videoElement.current) {
  //     console.log("Close PIP 1");
  //     videoElement.current.addEventListener('leavepictureinpicture', handleLeavePip);
  //   }

  //   // Cleanup event listener on component unmount
  //   return () => {
  //     if (videoElement.current) {
  //       console.log("Close PIP 2");
  //       videoElement.current.removeEventListener('leavepictureinpicture', handleLeavePip);
  //     }
  //   };
  // }, [videoElement.current]);

  return (
    <div
      ref={container}
      className={props.useClassname || ""}
      style={props.videoTrack?._muted ? { width: "0px", height: "0px" } : {}}
      id={props.useId || ""}
    ></div>
  );
};

export const AgoraMediaPlayerCard = (props) => {
  return (
    <div className="card">
      <div className="card-header">{props.title}</div>
      <div className="card-body">
        <AgoraMediaPlayer {...props} />
      </div>
    </div>
  );
};

export default AgoraMediaPlayer;
