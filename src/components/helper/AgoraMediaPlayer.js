import React, { useRef, useEffect } from "react";

const AgoraMediaPlayer = (props) => {
  const container = useRef(null);

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
