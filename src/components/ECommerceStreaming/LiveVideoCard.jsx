import React, { useState, useEffect, useRef } from "react";
import { Image, Button } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { translate, t } from "react-multi-lang";
import AgoraRTC from "agora-rtc-sdk-ng";
import { liveVideoEndStart } from "../../store/actions/LiveVideoAction";
import configuration from "react-global-configuration";
import useAgoraRTC from "./useAgoraRTC";
import {
  productLiveStreamViewStart,
  productLiveStreamEndStart,
  liveStreamUserCountStart,
} from "../../store/actions/ProductLiveStreamAction";
const rtcclient = AgoraRTC.createClient({ mode: "live", codec: "vp8" });

const LiveVideoCard = (props) => {
  const dispatch = useDispatch();
  const container = useRef(null);
  const history = useHistory();
  const profile = useSelector((state) => state.users.profile);
  const productLiveStreamEnd = useSelector(
    (state) => state.productLiveStream.productLiveStreamEnd
  );
  const productLiveStreamView = useSelector(
    (state) => state.productLiveStream.productLiveStreamView
  );
  const liveStreamUserCount = useSelector(
    (state) => state.productLiveStream.liveStreamUserCount
  );
  const [skipRender, setSkipRender] = useState(true);
  const [isOwner, setIsOwner] = useState(false);

  const {
    localAudioTrack,
    localVideoTrack,
    leaveRtcChannel,
    join,
    remoteUsers,
    isStreamEnded,
    muteAudio,
    muteVideo,
    mediaStatus,
    count,
  } = useAgoraRTC(rtcclient);

  const handleJoin = (Owner) => {
    setIsOwner(Owner);
    let joinResponse = join(
      configuration.get("configData.agora_app_id"),
      productLiveStreamView.data.live_stream_shopping.virtual_id !== ""
        ? productLiveStreamView.data.live_stream_shopping.virtual_id
        : "",
      productLiveStreamView.data.live_stream_shopping.agora_token !== ""
        ? productLiveStreamView.data.live_stream_shopping.agora_token
        : "",
      "host",
      "live",
      Owner
    );
  };

  useEffect(() => {
    dispatch(
      productLiveStreamViewStart({
        live_stream_shopping_unique_id: props.liveVideoId,
        virtual_id:
          props.virtual_id !== ""
            ? props.virtual_id
            : localStorage.getItem("virtual_id")
            ? localStorage.getItem("virtual_id")
            : "",
      })
    );
    return () => {
      window.location.assign(history.location.pathname);
    };
  }, []);

  // useEffect(() => {
  //   const unloadCallback = (event) => {
  //     const message = "Are you sure you want to leave?";
  //     event.preventDefault();
  //     event.returnValue = message;
  //     return message;
  //   };

  //   const handleNavigation = (event) => {
  //     console.log("navigation before");
  //     event.preventDefault();
  //     event.returnValue = "";
  //     return "";
  //   };

  //   window.addEventListener("beforeunload", unloadCallback);
  //   window.addEventListener("popstate", handleNavigation);

  //   return () => {
  //     window.removeEventListener("beforeunload", unloadCallback);
  //     window.removeEventListener("popstate", handleNavigation);
  //   };
  // }, []);

  useEffect(() => {
    if (
      !productLiveStreamView.loading &&
      Object.keys(productLiveStreamView.data).length > 0
    ) {
      if (props.virtual_id == "") {
        localStorage.setItem(
          "virtual_id",
          productLiveStreamView.data.live_stream_shopping.virtual_id !== ""
            ? productLiveStreamView.data.live_stream_shopping.virtual_id
            : ""
        );
      }
      if (
        profile.data.user_id ==
        productLiveStreamView.data.live_stream_shopping.user_details.id
      ) {
        handleJoin(true);
      } else {
        handleJoin(false);
      }
    }
  }, [productLiveStreamView]);

  useEffect(() => {
    if (!skipRender) {
      if (isStreamEnded == "isOwner") {
        dispatch(
          productLiveStreamEndStart({
            live_stream_shopping_unique_id: props.liveVideoId,
          })
        );
      }
      if (isStreamEnded == "audience") {
        window.location.assign(`/order-placed-detail`);
      }
    }
    setSkipRender(false);
  }, [isStreamEnded]);

  const leaveCall = async () => {
    const confirmed = window.confirm(
      isOwner ? t("confirmation_end_call") : t("confirmation_leave_call")
    );
    if (confirmed) {
      await leaveRtcChannel(isOwner);
    }
  };

  const leaveCallUser = () => {
    window.location.assign(`/order-placed-detail`);
  };

  useEffect(() => {
    if (
      !skipRender &&
      !productLiveStreamEnd.loading &&
      Object.keys(productLiveStreamEnd.data).length > 0
    ) {
      window.location.assign(`/live-history-detail`);
    }
    setSkipRender(false);
  }, [productLiveStreamEnd]);

  useEffect(() => {
    if (isOwner && !skipRender) {
      dispatch(
        liveStreamUserCountStart({
          live_stream_shopping_unique_id: props.liveVideoId,
          viewer_count: count,
        })
      );
      setSkipRender(false);
    }
  }, [count]);

  //video container

  useEffect(() => {
    if (!container.current) return;

    const playTrack = (track) => {
      if (track) {
        track.play(container.current, {
          mirror: true,
        });
      }
    };

    if (isOwner) {
      playTrack(localVideoTrack);
    } else {
      if (remoteUsers && remoteUsers[0]) {
        playTrack(remoteUsers[0].videoTrack);
        playTrack(remoteUsers[0].audioTrack);
      }
    }

    return () => {
      if (isOwner) {
        if (localVideoTrack) {
          localVideoTrack.stop();
        }
        if (localAudioTrack) {
          localAudioTrack.stop();
        }
      } else {
        if (remoteUsers && remoteUsers[0]) {
          if (remoteUsers[0].videoTrack) {
            remoteUsers[0].videoTrack.stop();
          }
          if (remoteUsers[0].audioTrack) {
            remoteUsers[0].audioTrack.stop();
          }
        }
      }
    };
  }, [localVideoTrack, remoteUsers]);

  return (
    <>
      <div className="onlive-stream-card">
        <div className="video-call-container" ref={container}>
          <Image
            className={
              isOwner
                ? mediaStatus.video.muted == true
                  ? "image-above-video-call"
                  : "image-above-video-call-none"
                : remoteUsers[0]?._video_muted_ !== true
                ? "image-above-video-call-none"
                : "image-above-video-call"
            }
            src={window.location.origin + "/assets/images/Video_Muted.png"}
          />
        </div>
        <div className="most-popular-thumbnail-img-sec"></div>
        <div className="onlive-stream-info-card">
          <div className="onlive-stream-user-sec">
            <Link to="#" className="most-popular-user-name">
              <div className="most-popular-user-info">
                <Image
                  className="product-stream-user-img"
                  src={
                    window.location.origin +
                    "/assets/images/products/live-product-user.png"
                  }
                />
                {!productLiveStreamView.loading &&
                  Object.keys(productLiveStreamView.data).length > 0 && (
                    <div className="most-popular-user-details">
                      <h4>
                        {productLiveStreamView.data.live_stream_shopping
                          .user_details.name
                          ? productLiveStreamView.data.live_stream_shopping
                              .user_details.name
                          : ""}
                        <span>
                          <Image
                            className="sidebar-verified-icon"
                            src={
                              window.location.origin +
                              "/assets/images/new-home/verified-icon.png"
                            }
                          />
                        </span>
                      </h4>
                      <span className="most-popular-user-name">
                        {" "}
                        {productLiveStreamView.data.live_stream_shopping
                          .user_details.name
                          ? productLiveStreamView.data.live_stream_shopping
                              .user_details.name
                          : ""}
                      </span>
                    </div>
                  )}
              </div>
            </Link>
          </div>
          {!productLiveStreamView.loading &&
            Object.keys(productLiveStreamView.data).length > 0 && (
              <div className="onlive-stream-action">
                <div className="onlive-stream-video-ctrl  sm-none">
                  <Button
                    className="video-end-btn"
                    onClick={() => {
                      leaveCall();
                    }}
                  >
                    {isOwner ? t("end_call") : t("leave_call")}
                  </Button>
                </div>
                <div className="onlive-stream-video-ctrl  sm-none">
                  {isOwner && localVideoTrack && (
                    <Button
                      className="video-ctrl-icon"
                      onClick={() => {
                        muteVideo();
                      }}
                    >
                      {!mediaStatus.video.muted ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="#fff"
                            d="M21.15 6.17c-.41-.22-1.27-.45-2.44.37l-1.47 1.04c-.11-3.11-1.46-4.33-4.74-4.33h-6C3.08 3.25 1.75 4.58 1.75 8v8c0 2.3 1.25 4.75 4.75 4.75h6c3.28 0 4.63-1.22 4.74-4.33l1.47 1.04c.62.44 1.16.58 1.59.58.37 0 .66-.11.85-.21.41-.21 1.1-.78 1.1-2.21V8.38c0-1.43-.69-2-1.1-2.21zM11 11.38c-1.03 0-1.88-.84-1.88-1.88S9.97 7.62 11 7.62c1.03 0 1.88.84 1.88 1.88s-.85 1.88-1.88 1.88z"
                          ></path>
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="#fff"
                            d="M17.74 7.57c.01.07.01.15 0 .22 0-.07-.01-.14-.01-.21l.01-.01z"
                            opacity="0.4"
                          ></path>
                          <path
                            fill="#fff"
                            d="M17.28 6.56L3.83 20.01c-1.4-.89-1.95-2.48-1.95-4.01V8c0-3.42 1.33-4.75 4.75-4.75h6c2.89 0 4.28.95 4.65 3.31z"
                          ></path>
                          <path
                            fill="#fff"
                            d="M21.4 2.23c-.3-.3-.79-.3-1.09 0L1.85 20.69c-.3.3-.3.79 0 1.09.15.14.35.22.54.22.2 0 .39-.08.54-.23L21.4 3.31c.3-.3.3-.78 0-1.08zM22.38 8.38v7.24c0 1.43-.7 2-1.1 2.21-.19.1-.49.21-.86.21-.43 0-.96-.14-1.58-.58l-1.48-1.04c-.07 2.21-.77 3.47-2.36 4-.64.23-1.43.33-2.38.33h-6c-.24 0-.47-.01-.71-.04L15 11.63l5.65-5.65c.26.02.47.1.63.19.4.21 1.1.78 1.1 2.21z"
                          ></path>
                        </svg>
                      )}
                    </Button>
                  )}
                </div>
                <div className="onlive-stream-video-ctrl  sm-none">
                  {isOwner && localAudioTrack && (
                    <Button
                      className="video-ctrl-icon"
                      onClick={() => muteAudio()}
                    >
                      {!mediaStatus.audio.muted ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="#fff"
                            d="M17.02 3.78c-1.12-.62-2.55-.46-4.01.45l-2.92 1.83c-.2.12-.43.19-.66.19H8c-2.42 0-3.75 1.33-3.75 3.75v4c0 2.42 1.33 3.75 3.75 3.75H9.43c.23 0 .46.07.66.19l2.92 1.83c.88.55 1.74.82 2.54.82a3 3 0 001.47-.37c1.11-.62 1.73-1.91 1.73-3.63V7.41c0-1.72-.62-3.01-1.73-3.63z"
                          ></path>
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="#fff"
                            d="M18 16.75a.75.75 0 01-.6-1.2 5.926 5.926 0 00.72-5.84.75.75 0 01.4-.98c.38-.16.82.02.98.4 1.02 2.42.67 5.23-.9 7.33-.15.19-.37.29-.6.29z"
                          ></path>
                          <path
                            fill="#fff"
                            d="M19.83 19.25a.75.75 0 01-.6-1.2c2.14-2.85 2.61-6.67 1.23-9.96a.75.75 0 01.4-.98c.38-.16.82.02.98.4 1.59 3.78 1.05 8.16-1.41 11.44-.14.2-.37.3-.6.3zM14.04 12.96c.63-.63 1.71-.18 1.71.71v2.93c0 1.72-.62 3.01-1.73 3.63a3 3 0 01-1.47.37c-.8 0-1.66-.27-2.54-.82l-.64-.4c-.54-.34-.63-1.1-.18-1.55l4.85-4.87zM21.77 2.23c-.3-.3-.79-.3-1.09 0l-4.95 4.95c-.06-1.6-.66-2.8-1.72-3.39-1.12-.62-2.55-.46-4.01.45L7.09 6.06c-.2.12-.43.19-.66.19H5c-2.42 0-3.75 1.33-3.75 3.75v4c0 2.42 1.33 3.75 3.75 3.75h.16l-2.94 2.94c-.3.3-.3.79 0 1.09.16.14.35.22.55.22.2 0 .39-.08.54-.23L21.77 3.31c.31-.3.31-.78 0-1.08z"
                          ></path>
                        </svg>
                      )}
                    </Button>
                  )}
                </div>
                <div className="product-stream-liveVideo-count">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="none"
                    viewBox="0 0 26 26"
                  >
                    <g clipPath="url(#clip0_507_78)">
                      <path
                        fill="#9F4298"
                        d="M25.356 12.458C25.356 5.578 19.778 0 12.898 0S.439 5.578.439 12.458v.674c0 6.88 5.578 12.458 12.459 12.458 6.88 0 12.458-5.578 12.458-12.458v-.674z"
                      ></path>
                      <path
                        fill="#fff"
                        d="M9.867 11.111a1.01 1.01 0 00-2.02 0v6.061a1.01 1.01 0 102.02 0v-6.06zM17.948 11.111a1.01 1.01 0 00-2.02 0v6.061a1.01 1.01 0 002.02 0v-6.06zM13.908 8.418a1.01 1.01 0 00-2.02 0v7.407a1.01 1.01 0 002.02 0V8.418z"
                      ></path>
                    </g>
                    <defs>
                      <clipPath id="clip0_507_78">
                        <path fill="#fff" d="M0 0H25.59V25.59H0z"></path>
                      </clipPath>
                    </defs>
                  </svg>
                  <span className="product-stream-count-detail">{count}</span>
                </div>
              </div>
            )}
        </div>
        {!productLiveStreamView.loading &&
          Object.keys(productLiveStreamView.data).length > 0 && (
            <div className="video-ctrl-sm">
              <div className="onlive-stream-video-ctrl">
                {isOwner && localVideoTrack && (
                  <Button
                    className="video-ctrl-icon"
                    onClick={() => {
                      muteVideo();
                    }}
                  >
                    {!mediaStatus.video.muted ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#fff"
                          d="M21.15 6.17c-.41-.22-1.27-.45-2.44.37l-1.47 1.04c-.11-3.11-1.46-4.33-4.74-4.33h-6C3.08 3.25 1.75 4.58 1.75 8v8c0 2.3 1.25 4.75 4.75 4.75h6c3.28 0 4.63-1.22 4.74-4.33l1.47 1.04c.62.44 1.16.58 1.59.58.37 0 .66-.11.85-.21.41-.21 1.1-.78 1.1-2.21V8.38c0-1.43-.69-2-1.1-2.21zM11 11.38c-1.03 0-1.88-.84-1.88-1.88S9.97 7.62 11 7.62c1.03 0 1.88.84 1.88 1.88s-.85 1.88-1.88 1.88z"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#fff"
                          d="M17.74 7.57c.01.07.01.15 0 .22 0-.07-.01-.14-.01-.21l.01-.01z"
                          opacity="0.4"
                        ></path>
                        <path
                          fill="#fff"
                          d="M17.28 6.56L3.83 20.01c-1.4-.89-1.95-2.48-1.95-4.01V8c0-3.42 1.33-4.75 4.75-4.75h6c2.89 0 4.28.95 4.65 3.31z"
                        ></path>
                        <path
                          fill="#fff"
                          d="M21.4 2.23c-.3-.3-.79-.3-1.09 0L1.85 20.69c-.3.3-.3.79 0 1.09.15.14.35.22.54.22.2 0 .39-.08.54-.23L21.4 3.31c.3-.3.3-.78 0-1.08zM22.38 8.38v7.24c0 1.43-.7 2-1.1 2.21-.19.1-.49.21-.86.21-.43 0-.96-.14-1.58-.58l-1.48-1.04c-.07 2.21-.77 3.47-2.36 4-.64.23-1.43.33-2.38.33h-6c-.24 0-.47-.01-.71-.04L15 11.63l5.65-5.65c.26.02.47.1.63.19.4.21 1.1.78 1.1 2.21z"
                        ></path>
                      </svg>
                    )}
                  </Button>
                )}
              </div>
              <div className="onlive-stream-video-ctrl">
                {isOwner && localAudioTrack && (
                  <Button
                    className="video-ctrl-icon"
                    onClick={() => muteAudio()}
                  >
                    {!mediaStatus.audio.muted ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#fff"
                          d="M17.02 3.78c-1.12-.62-2.55-.46-4.01.45l-2.92 1.83c-.2.12-.43.19-.66.19H8c-2.42 0-3.75 1.33-3.75 3.75v4c0 2.42 1.33 3.75 3.75 3.75H9.43c.23 0 .46.07.66.19l2.92 1.83c.88.55 1.74.82 2.54.82a3 3 0 001.47-.37c1.11-.62 1.73-1.91 1.73-3.63V7.41c0-1.72-.62-3.01-1.73-3.63z"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#fff"
                          d="M18 16.75a.75.75 0 01-.6-1.2 5.926 5.926 0 00.72-5.84.75.75 0 01.4-.98c.38-.16.82.02.98.4 1.02 2.42.67 5.23-.9 7.33-.15.19-.37.29-.6.29z"
                        ></path>
                        <path
                          fill="#fff"
                          d="M19.83 19.25a.75.75 0 01-.6-1.2c2.14-2.85 2.61-6.67 1.23-9.96a.75.75 0 01.4-.98c.38-.16.82.02.98.4 1.59 3.78 1.05 8.16-1.41 11.44-.14.2-.37.3-.6.3zM14.04 12.96c.63-.63 1.71-.18 1.71.71v2.93c0 1.72-.62 3.01-1.73 3.63a3 3 0 01-1.47.37c-.8 0-1.66-.27-2.54-.82l-.64-.4c-.54-.34-.63-1.1-.18-1.55l4.85-4.87zM21.77 2.23c-.3-.3-.79-.3-1.09 0l-4.95 4.95c-.06-1.6-.66-2.8-1.72-3.39-1.12-.62-2.55-.46-4.01.45L7.09 6.06c-.2.12-.43.19-.66.19H5c-2.42 0-3.75 1.33-3.75 3.75v4c0 2.42 1.33 3.75 3.75 3.75h.16l-2.94 2.94c-.3.3-.3.79 0 1.09.16.14.35.22.55.22.2 0 .39-.08.54-.23L21.77 3.31c.31-.3.31-.78 0-1.08z"
                        ></path>
                      </svg>
                    )}
                  </Button>
                )}
              </div>
              <div className="onlive-stream-video-ctrl">
                <Button
                  className="video-end-btn-sm"
                  onClick={() => {
                    leaveCall();
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 128 128"
                  >
                    <circle
                      cx="64"
                      cy="64"
                      r="64"
                      fill="#ef5261"
                      data-name="Circle Grid"
                    ></circle>
                    <path
                      fill="#eeefee"
                      d="M57.831 70.1c8.79 8.79 17.405 12.356 20.508 9.253l4.261-4.26a7.516 7.516 0 0110.629 0l9.566 9.566a7.516 7.516 0 010 10.629l-7.453 7.453c-7.042 7.042-27.87-2.358-47.832-22.319C37.534 70.441 30.991 61.04 26.762 52.2s-5.086-16.091-1.567-19.61l7.453-7.453a7.516 7.516 0 0110.629 0l9.566 9.563a7.516 7.516 0 010 10.629L48.579 49.6c-3.103 3.1.462 11.714 9.252 20.5z"
                    ></path>
                  </svg>
                </Button>
              </div>
            </div>
          )}
      </div>
    </>
  );
};

export default LiveVideoCard;
