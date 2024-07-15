import React, { useEffect, useState } from "react";
import {
  Button,
  Image,
  Media,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { translate, t } from "react-multi-lang";
import AgoraRTC from "agora-rtc-sdk-ng";
import { liveVideoEndStart } from "../../store/actions/LiveVideoAction";
import configuration from "react-global-configuration";
import useAgoraRTC from "./useAgoraRTC";
import AgoraMediaPlayer from "../helper/AgoraMediaPlayer";
import { endVirtualExperienceStart } from "../../store/actions/CreatorVirtualAction";
import Countdown from "react-countdown";
// import io from "socket.io-client";
const rtcclient = AgoraRTC.createClient({ mode: "live", codec: "vp8" });

const NewLiveStreamingCard = (props) => {

  // const socket = io.connect("http://localhost:3001", {
  //   withCredentials: false,
  //   "Access-Control-Allow-Origin": "*",
  // });

  // const joinRoom = (room) => {
  //   socket.emit("join_room", room);
  // };

  const dispatch = useDispatch();

  const {
    localAudioTrack,
    localVideoTrack,
    leaveRtcChannel,
    join,
    joinState,
    remoteUsers,
    isStreamEnded,
    muteAudio,
    muteVideo,
    mediaStatus,
    toggleFullScreen,
    joinedUsers,
    allUsers,
  } = useAgoraRTC(rtcclient);

  const handleJoin = () => {
    let joinResponse = join(
      configuration.get("configData.agora_app_id"),
      props.virtualExperienceDetails.virtual_id,
      props.virtualExperienceDetails.agora_token
        ? props.virtualExperienceDetails.agora_token : "",
      "host",
      "live",
      props.isOwner,
      props.virtualExperienceDetails.unique_id,
      props.profile.data.name,
      // socket,
    );
    // joinRoom(props.liveVideoDetails.live_video_unique_id);
  };

  const history = useHistory();
  const endVirtualExperience = useSelector(state => state.creatorVirtual.endVirtualExperience);
  const [skipRender, setSkipRender] = useState(true);

  useEffect(() => {
    // handleJoin();
    return () => {
      props.isOwner ? leaveCall() : leaveCallUser();
    };
  }, []);

  useEffect(() => {
    if (!props.creatorVirtualExperienceView.loading && Object.keys(props.creatorVirtualExperienceView.data).length > 0) {
      handleJoin();
    }
  }, [props.creatorVirtualExperienceView]);

  useEffect(() => {
    if (isStreamEnded) {
      window.location.assign("/home");
    }
  }, [isStreamEnded]);

  const leaveCall = async () => {
    await leaveRtcChannel(props.isOwner);
    dispatch(endVirtualExperienceStart({
      virtual_experience_unique_id: props.virtualExperienceDetails.unique_id
    }))
  };

  const leaveCallUser = () => {
    window.location.assign(`/user-virtual-details/${props.virtualExperienceDetails.unique_id}`);
  }

  useEffect(()=> {
    if(!skipRender && !endVirtualExperience.loading && Object.keys(endVirtualExperience.data).length > 0)
    {
      window.location.assign(`/user-virtual-details/${props.virtualExperienceDetails.unique_id}`);
    } 
    setSkipRender(false);
  }, [endVirtualExperience])

  // useEffect(() => {
  //   const unloadCallback = (event) => {
  //       console.log("reload before")
  //       event.preventDefault();
  //       event.returnValue = "";
  //       return "";
  //   };

  //   const visibilityChangeCallback = (event) => {
  //       if (document.visibilityState === "hidden") {
  //           console.log("visibility change before");
  //           event.preventDefault();
  //           event.returnValue = "";
  //           return "";
  //       }
  //   };

  //   window.addEventListener("beforeunload", unloadCallback);
  //   document.addEventListener("visibilitychange", visibilityChangeCallback);

  //   return () => {
  //       window.removeEventListener("beforeunload", unloadCallback);
  //       document.removeEventListener("visibilitychange", visibilityChangeCallback);
  //   };
  // }, []);

  useEffect(() => {
    const unloadCallback = (event) => {
      const message = "Are you sure you want to leave?";
      event.preventDefault(); // Standard technique to trigger the confirmation dialog
      event.returnValue = message; // Some browsers require setting returnValue
      // Returning a string also triggers the confirmation dialog in some browsers
      return message;
    };

    const handleNavigation = (event) => {
        console.log("navigation before");
        event.preventDefault();
        event.returnValue = "";
        return "";
        // Here, you can add additional checks or actions if needed
    };

    window.addEventListener("beforeunload", unloadCallback);
    window.addEventListener("popstate", handleNavigation);

    return () => {
        window.removeEventListener("beforeunload", unloadCallback);
        window.removeEventListener("popstate", handleNavigation);
    };
}, []);


  useEffect(()=> {
    return () => {

    }
  }, [])

  return (
    <>
      <div style={{display:"flex", gap:"1em", fontSize:"1.8em", color:"var(--primary-color)"}}>
        <h4>Call Ends In</h4>
        <Countdown date={new Date(props.virtualExperienceDetails.scheduled_end)} onComplete={()=> {
          props.isOwner ? leaveCall() : leaveCallUser()
        }}/>
      </div>
      <div className="agora-video-container-box-virtual-experience" style={{display:"flex"}}>
        <div className="live-streaming-user-card-left">
          <div
            className={
              mediaStatus.video.fullScreen
                ? "full-streaming-card"
                : "live-streaming-card"
            }
            id="video-container"
            style={{
              backgroundImage: `url(${props.virtualExperienceDetails.snapshot})`,
            }}
          >
            {(props.isOwner && joinState) ? (
              <AgoraMediaPlayer
                videoTrack={localVideoTrack}
                useClassname={
                  mediaStatus.video.fullScreen
                    ? "agora-container-full"
                    : "agora-container"
                }
                useId="agora_local"
                mirror={true}
              ></AgoraMediaPlayer>
            ):null}

            {(!props.isOwner && remoteUsers.length > 0) ?(
              <>
                {remoteUsers
                  .filter((user) => user.uid == props.virtualExperienceDetails.host_id)
                  .map((user, index) => (
                    <AgoraMediaPlayer
                      key={index}
                      videoTrack={user.videoTrack}
                      audioTrack={user.audioTrack}
                      useClassname={
                        mediaStatus.video.fullScreen
                          ? "agora-container-full"
                          : "agora-container"
                      }
                      useId={`agora_remote${user.uid}`}
                      mirror={true}
                    ></AgoraMediaPlayer>
                  ))}
                <div
                  style={{
                    position: "absolute",
                    bottom: "1em",
                    right: "1em",
                    height: "20em",
                    width: "28em",
                    backgroundImage: `url(${props.virtualExperienceDetails.snapshot})`,
                    backgroundSize: "cover",
                  }}
                >
                  <AgoraMediaPlayer
                    videoTrack={localVideoTrack}
                    // audioTrack={localAudioTrack}
                    useClassname={
                      mediaStatus.video.fullScreen
                        ? "agora-container-full"
                        : "agora-container-picture-in-picture"
                    }
                    useId="agora_local"
                    mirror={true}
                  ></AgoraMediaPlayer>
                </div>
              </>
            ):null}

            {props.isOwner ? (
              joinState && (
                <>
                  <div className="live-streaming-close-btn-sec">
                    <Button className="close-btn" onClick={() => leaveCall()}>
                      <Image
                        className="close-btn-icon"
                        src={
                          window.location.origin +
                          "/assets/images/live-streaming/close.svg"
                        }
                      />
                      <span>{t("close")}</span>
                    </Button>
                  </div>
                  <div className="live-streaming-modal-action-btn-sec">
                    <ul className="list-unstyled">
                      <Media as="li">
                        <Button
                          className="modal-action-btn"
                          onClick={() => muteAudio()}
                        >
                          {mediaStatus.audio.muted ? (
                            <Image
                              className="modal-action-btn-icon"
                              src={
                                window.location.origin +
                                "/assets/images/live-streaming/audio-mute.svg"
                              }
                              //  id="mute-audio"
                            />
                          ) : (
                            <Image
                              className="modal-action-btn-icon"
                              src={
                                window.location.origin +
                                "/assets/images/live-streaming/audio-icon.svg"
                              }
                              // id="unmute-audio"
                              //  style={{ display: "none" }}
                            />
                          )}
                        </Button>
                      </Media>
                      <Media as="li">
                        <Button
                          className="modal-action-btn"
                          onClick={() => muteVideo()}
                        >
                          {mediaStatus.video.muted ? (
                            <Image
                              className="modal-action-btn-icon"
                              src={
                                window.location.origin +
                                "/assets/images/live-streaming/video-hide.svg"
                              }
                              //id="mute-video"
                            />
                          ) : (
                            <Image
                              className="modal-action-btn-icon"
                              src={
                                window.location.origin +
                                "/assets/images/live-streaming/video.svg"
                              }
                              // style={{ display: "none" }}
                              // id="unmute-video"
                            />
                          )}
                        </Button>
                      </Media>
                    </ul>
                  </div>
                </>
              )
            ) : (
              <>
                <div className="live-streaming-close-btn-sec">
                    <Button className="close-btn" onClick={() => leaveCallUser()}>
                      <Image
                        className="close-btn-icon"
                        src={
                          window.location.origin +
                          "/assets/images/live-streaming/close.svg"
                        }
                      />
                      <span>{t("leave")}</span>
                    </Button>
                </div>
                <div className="live-streaming-modal-action-btn-sec">
                  <ul className="list-unstyled">
                    <Media as="li">
                      <Button
                        className="modal-action-btn"
                        onClick={() => muteAudio()}
                      >
                        {mediaStatus.audio.muted ? (
                          <Image
                            className="modal-action-btn-icon"
                            src={
                              window.location.origin +
                              "/assets/images/live-streaming/audio-mute.svg"
                            }
                            //  id="mute-audio"
                          />
                        ) : (
                          <Image
                            className="modal-action-btn-icon"
                            src={
                              window.location.origin +
                              "/assets/images/live-streaming/audio-icon.svg"
                            }
                            // id="unmute-audio"
                            //  style={{ display: "none" }}
                          />
                        )}
                      </Button>
                    </Media>
                    <Media as="li">
                      <Button
                        className="modal-action-btn"
                        onClick={() => muteVideo()}
                      >
                        {mediaStatus.video.muted ? (
                          <Image
                            className="modal-action-btn-icon"
                            src={
                              window.location.origin +
                              "/assets/images/live-streaming/video-hide.svg"
                            }
                            //id="mute-video"
                          />
                        ) : (
                          <Image
                            className="modal-action-btn-icon"
                            src={
                              window.location.origin +
                              "/assets/images/live-streaming/video.svg"
                            }

                          />
                        )}
                      </Button>
                    </Media>
                  </ul>
                </div>
              </>
            )}

            <div className="live-streaming-full-screen-sec">
              <Button className="close-btn" onClick={() => toggleFullScreen()}>
                <Image
                  className="live-streaming-full-screen-icon"
                  src={
                    window.location.origin +
                    "/assets/images/live-streaming/full-screen.svg"
                  }
                />
              </Button>
            </div>

          </div>
        </div>
        <div className="live-streaming-user-card-right">
          {remoteUsers.length > 0 &&
            remoteUsers
              .filter((user) => user.uid != props.virtualExperienceDetails?.host_id)
              .map((user, index) => (
                <div
                  key={index}
                  style={{
                    backgroundImage: `url(${props.virtualExperienceDetails.snapshot})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    width: "100%",
                    maxHeight: "24em",
                  }}
                >
                  <AgoraMediaPlayer
                    videoTrack={user.videoTrack}
                    audioTrack={user.audioTrack}
                    useClassname={
                      mediaStatus.video.fullScreen
                        ? "agora-container-full"
                        : "agora-container-small"
                    }
                    useId={`agora_remote${user.uid}`}
                    mirror={true}
                    // title={joinedUsers.find(joined => joined.uid == user.uid) ? joinedUsers.find(joined => joined.uid == user.uid)[0].name  : "Unknown"}
                  ></AgoraMediaPlayer>
                </div>
              ))}
        </div>
      </div>
    </>
  );
};

const mapStateToPros = (state) => ({
  creatorVirtualExperienceView: state.creatorVirtual.creatorVirtualExperienceView,
  liveVideo: state.liveVideo.singleLiveVideo,
  profile: state.users.profile,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(NewLiveStreamingCard));
