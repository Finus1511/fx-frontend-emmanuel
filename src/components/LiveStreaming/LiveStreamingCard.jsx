import React, { useEffect, useState } from "react";
import {
  Modal,
  Container,
  Row,
  Col,
  Button,
  Form,
  Image,
  Media,
} from "react-bootstrap";
import "./LiveStreaming.css";
import { Link, useHistory, useLocation } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { translate, t } from "react-multi-lang";
import AgoraRTC from "agora-rtc-sdk-ng";
import { liveVideoEndStart, fetchCustomTipsStart } from "../../store/actions/LiveVideoAction";
import configuration from "react-global-configuration";
import useAgoraRTC from "../../hooks/useAgoraRTC";
import AgoraMediaPlayer from "../helper/AgoraMediaPlayer";
import Skeleton from "react-loading-skeleton";
import { sendTipWalletStart } from "../../store/actions/SendTipAction";
import AddWalletAmountModal from "../Model/PaymentModal/AddWalletAmountModal";
import { fetchWalletDetailsStart } from "../../store/actions/WalletAction";

const rtcclient = AgoraRTC.createClient({ mode: "live", codec: "vp8" });

const LiveStreamingCard = (props) => {

  const customTips = useSelector((state) => state.liveVideo.customTips);

  const [addWalletAmountModal, setAddWalletAmountModal] = useState(false);

  const [pipMode, setPipMode] = useState(false);

  const videoElement = useSelector((state) => state.liveVideo.videoElement);

  const togglePictureInPicture = async () => {
    setPipMode(!pipMode);
  };

  const closeAddWalletAmountModal = () => {
    setAddWalletAmountModal(false);
  };

  const {
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
  } = useAgoraRTC(rtcclient);

  const handleJoin = () => {
    localStorage.setItem('current_path', history.location.pathname);
    let joinResponse = join(
      configuration.get("configData.agora_app_id"),
      props.liveVideoDetails.virtual_id,
      props.liveVideoDetails.agora_token
        ? props.liveVideoDetails.agora_token
        : null,
      props.isOwner === true ? "host" : "audience",
      "live"
    );
  };

  const history = useHistory();

  useEffect(() => {

    handleJoin();

    return () => {
      localStorage.setItem('current_path', history.location.pathname);
      if (props.isOwner && window.confirm("Are you sure? want to leave the stream?")) {
        window.location.assign(history.location.pathname);
      }
    };
  }, []);

  useEffect(() => {
    if (isStreamEnded) {
      props.dispatch(
        liveVideoEndStart({
          live_video_id: props.liveVideoDetails.live_video_id,
          isOwner: props.isOwner,
        })
      );
    }
  }, [isStreamEnded]);

  useEffect(() => {
    if (!props.isOwner) {
      props.dispatch(fetchWalletDetailsStart());
      props.dispatch(
        fetchCustomTipsStart({
          type: "live-video-payments",
        })
      );
    }
  }, []);

  const leaveCall = async () => {
    await leaveRtcChannel(props.isOwner);
  };

  const sendTip = (tip) => {
    if (tip.amount > props.wallet.data.user_wallet.remaining) {
      setAddWalletAmountModal(true)
    } else {
      props.dispatch(
        sendTipWalletStart({
          amount: tip.amount,
          user_id: props.liveVideoDetails.user_id,
          tips_type: "live",
        })
      );
    }
  };
console.log("mediaStatus", mediaStatus)
  return (
    <>
      <div
        className={
          mediaStatus.video.fullScreen
            ? "full-streaming-card"
            : "live-streaming-card"
        }
        id="video-container"
        style={{ backgroundImage: `url(${props.liveVideoDetails.snapshot})` }}
      >
        {/* <div id="agora_local" className="agora-container" /> */}
        {props.isOwner && joinState && (
          <AgoraMediaPlayer
            videoTrack={localVideoTrack}
            useClassname={
              mediaStatus.video.fullScreen
                ? "agora-container-full"
                : "agora-container"
            }
            useId="agora_local"
            mirror={true}
            pipMode={pipMode}
            localtrackID={localVideoTrack?._ID}
          ></AgoraMediaPlayer>
        )}

        {remoteUsers.length > 0 &&
          remoteUsers.map((user) => (
            <AgoraMediaPlayer
              videoTrack={user.videoTrack}
              audioTrack={user.audioTrack}
              useClassname={
                mediaStatus.video.fullScreen
                  ? "agora-container-full"
                  : "agora-container"
              }
              useId="agora_local"
              mirror={true}
              pipMode={pipMode}
              localtrackID={user.videoTrack?._ID}
            ></AgoraMediaPlayer>
          ))}

        <div
          className="live-streaming-bg-img-sec"
          id="agora_profile_placeholder"
          style={{ display: "none" }}
        >
          <Image
            className="live-streaming-bg-img"
            src={props.liveVideoDetails.snapshot}
          />
        </div>

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
                  {/* <Media as="li">
                <Button className="modal-action-btn">
                  <Image
                    className="modal-action-btn-icon"
                    src={
                      window.location.origin + "/assets/images/live-streaming/refresh-icon.svg"
                    }
                  />
                </Button>
              </Media> */}
                </ul>
              </div>
            </>
          )
        ) : (
          <>
            <div className="live-streaming-modal-action-btn-sec">
              <ul className="list-unstyled">
                <Media as="li" className="live-picture-in-picture">
                  <Button
                    className="modal-action-btn"
                    onClick={() => togglePictureInPicture()}
                  >
                    <Image
                      className="modal-action-btn-icon"
                      src={
                        window.location.origin +
                        "/assets/images/video-call/pip-open.png"
                      }
                    />
                  </Button>
                </Media>
                <Media as="li">
                  <div className="live-icon">
                    {props.wallet.loading || customTips.loading ? (
                      [...Array(6)].map((val, i) =>
                        <ul>
                          <li>
                            <Skeleton className="custom-tip-skeleton" circle={true} />
                          </li>
                        </ul>
                      )
                    ) : Object.keys(customTips.data).length > 0 && Object.keys(props.wallet.data).length > 0 ? (
                      <ul>
                        {customTips.data.custom_tips.map((tip) => (
                          <li>
                            <button onClick={() => sendTip(tip)}>
                              <Image
                                src={tip.picture}
                              />
                            </button>
                            <p>{tip.amount_formatted}</p>
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    <div
                      className="send-coin "
                      onClick={() => props.setTipModal(true)}
                    >
                      {/* <Image
              className="live-streaming-send-tip-icon"
              src={
                window.location.origin +
                "/assets/images/live-streaming/send-tip.svg"
              }
            /> */}
                      <button className="send-tip-btn hoverColor">
                        {/* {t("send_tips")} */}
                        Custom Tips
                      </button>
                    </div>
                  </div>
                </Media>
              </ul>
            </div>
          </>
        )}

        <div className="live-streaming-full-screen-sec">
          <Button className="close-btn" onClick={() => toggleFullScreen(props.maximize)}>
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
      {addWalletAmountModal ?
        <AddWalletAmountModal
          paymentsModal={addWalletAmountModal}
          closepaymentsModal={closeAddWalletAmountModal}
          payments={props.wallet}
        />
        : null
      }
    </>
  );
};

const mapStateToPros = (state) => ({
  liveVideo: state.liveVideo.singleLiveVideo,
  wallet: state.wallet.walletData,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(LiveStreamingCard));
