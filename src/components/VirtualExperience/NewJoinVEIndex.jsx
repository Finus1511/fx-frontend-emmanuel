import React, { useEffect, useState } from "react";
import {
  Button,
  Image,
  Media,
  Dropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { translate, t } from "react-multi-lang";
import { useParams } from "react-router";
import { useHistory } from "react-router";
import { singlecreatorVirtualExperienceViewStart } from "../../store/actions/LiveVideoAction";
import DurationTimer from "../LiveStreaming/DurationTimer";
import CopyToClipboard from "react-copy-to-clipboard";
import {
  getErrorNotificationMessage,
  getSuccessNotificationMessage,
} from "../helper/NotificationMessage";
import { createNotification } from "react-redux-notify";
import { unFollowUserStart } from "../../store/actions/FollowAction";
import { saveBlockUserStart } from "../../store/actions/UserAction";
import NewLiveStreamingCard from "./NewLiveStreamingCard";
import { creatorVirtualExperienceViewStart } from "../../store/actions/CreatorVirtualAction";
import PageLoader from "../Loader/PageLoader";

const NewJoinVEIndex = (props) => {

  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const [skipFirst, setSkipFirst] = useState(true);

  useEffect(() => {
      dispatch(
        creatorVirtualExperienceViewStart({
          virtual_experience_unique_id: params.virtual_experience_unique_id,
        })
      );
  }, [params.virtual_experience_unique_id]);

  // useEffect(() => {
  //   if (!skipFirst) {
  //     if (!props.creatorVirtualExperienceView.loading) {
  //       if (Object.keys(props.creatorVirtualExperienceView.data).length == 0) {
  //         history.push("/home");
  //       }
  //     }
  //   }
  // }, [props.creatorVirtualExperienceView]);

  useEffect(()=> {
    if(!props.creatorVirtualExperienceView.loading && Object.keys(props.creatorVirtualExperienceView.data).length > 0) {
      if(props.creatorVirtualExperienceView.data.virtual_experience.user_needs_to_pay === 1) {
        dispatch(createNotification(getErrorNotificationMessage("You need to pay to join this virtual experience.")));
        history.push(`/user-virtual-details/${params.virtual_experience_unique_id}`);
      }
    }
  }, [props.creatorVirtualExperienceView])

  const onCopy = () => {
    const notificationMessage =
      getSuccessNotificationMessage("Live link copied");
    props.dispatch(createNotification(notificationMessage));
  };

  const handleUnfollowUser = (e) => {
    e.preventDefault();
    props.dispatch(
      unFollowUserStart({
        user_id: props.creatorVirtualExperienceView.data.virtual_experience.user_id,
      })
    );
  };

  const blockUser = () => {
    props.dispatch(
      saveBlockUserStart({
        user_id: props.creatorVirtualExperienceView.data.virtual_experience.user_id,
      })
    );
  };

  // useEffect(() => {
  //   if (!skipFirst) {
  //     if (
  //       !props.saveBlockUser.loading &&
  //       Object.keys(props.saveBlockUser.data).length > 0
  //     ) {
  //       history.push("/live-streaming");
  //     }
  //   }
  //   setSkipFirst(false);
  // }, [props.saveBlockUser]);

  // useEffect(()=> {
  //   console.log(props.creatorVirtualExperienceView)
  // }, [props.creatorVirtualExperienceView])

  return (
    <>
      {!props.creatorVirtualExperienceView.loading &&
      Object.keys(props.creatorVirtualExperienceView.data).length > 0 ? (
        <>
          <div className="live-streaming-free-user-sec">
            <div className="live-streaming-user-box">
              <div className="live-streaming-header-1-sec">
                <div className="live-streaming-header-info">
                  {props.creatorVirtualExperienceView.data.virtual_experience.virtual_experience_creator ===
                  0 ? (
                    <div className="live-streaming-user-img-sec">
                      <Image
                        className="live-streaming-user-img"
                        src={
                          props.creatorVirtualExperienceView.data.virtual_experience.user_info.picture
                        }
                      />
                    </div>
                  ) : null}
                  <div className="live-streaming-user-details">
                    {props.creatorVirtualExperienceView.data.virtual_experience.virtual_experience_creator ===
                    0 ? (
                      <h4>
                        {
                          props.creatorVirtualExperienceView.data.virtual_experience
                            .user_info.name
                        }
                        {props.creatorVirtualExperienceView.data.virtual_experience
                          .virtual_experience_creator === 1 ? (
                          <span>
                            <Image
                              className="sidebar-verified-icon"
                              src={
                                window.location.origin +
                                "/assets/images/new-home/verified-icon.svg"
                              }
                            />
                          </span>
                        ) : null}
                      </h4>
                    ) : null}
                    <h3>
                      {props.creatorVirtualExperienceView.data.virtual_experience.title}
                    </h3>
                  </div>
                </div>
                <div className="live-streaming-user-action-btn-sec">
                  <ul className="list-unstyled">
                    {props.creatorVirtualExperienceView.data.virtual_experience.virtual_experience_creator ===
                    0
                      ? props.creatorVirtualExperienceView.data.virtual_experience
                          .is_following === 1 && (
                          <Media as="li">
                            <Link
                              to="#"
                              className="new-live-history-btn"
                              onClick={handleUnfollowUser}
                            >
                              Unfollow
                            </Link>
                          </Media>
                        )
                      : null}
                    <Media as="li">
                      <CopyToClipboard
                        text={
                          window.location.origin +
                          "/join-virtual-experience/" +
                          props.creatorVirtualExperienceView.data.virtual_experience
                            .unique_id
                        }
                        onCopy={onCopy}
                      >
                        <Link to="#" className="new-go-live-btn">
                          Share
                          <Image
                            className="new-go-live-btn-icon"
                            src={
                              window.location.origin +
                              "/assets/images/live-streaming/share-icon.svg"
                            }
                          />
                        </Link>
                      </CopyToClipboard>
                    </Media>
                    {/* {props.creatorVirtualExperienceView.data.virtual_experience.virtual_experience_creator ===
                    0 ? (
                      <Media as="li">
                        <Dropdown className="live-streaming-dropdown">
                          <Dropdown.Toggle
                            variant="success"
                            id="dropdown-basic"
                          >
                            <Image
                              className="live-streaming-dropdown-icon"
                              src={
                                window.location.origin +
                                "/assets/images/live-streaming/three-dots.svg"
                              }
                            />
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item onClick={() => blockUser()}>
                              {t("block")}
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </Media>
                    ) : null} */}
                  </ul>
                </div>
              </div>
              <div className="live-streaming-desc">
                <p>
                  {props.creatorVirtualExperienceView.data.virtual_experience.description}
                </p>
              </div>
              <div className="live-streaming-live-notify-sec">
                <div className="live-streaming-count">
                  {props.creatorVirtualExperienceView.data.virtual_experience
                    .status === 1 ? (
                    <Button className="join-now-btn">{t("live")}</Button>
                  ) : null}
                    {/* <p>
                    <DurationTimer
                      time={
                        props.creatorVirtualExperienceView.data.virtual_experience.started_at
                      }
                    />
                  </p> */}
                </div>
                <div className="live-streaming-started-info">
                  <h5>
                    {t("stream_started_at")}{" "}
                    <span>
                    {props.creatorVirtualExperienceView.data.virtual_experience.start_date}{" "}{props.creatorVirtualExperienceView.data.virtual_experience.start_time}
                    </span>
                  </h5>
                </div>
              </div>
              {!props.creatorVirtualExperienceView.data.virtual_experience.user_needs_to_pay ? <NewLiveStreamingCard
                virtualExperienceDetails={props.creatorVirtualExperienceView.data.virtual_experience}
                isOwner={props.creatorVirtualExperienceView.data.virtual_experience.virtual_experience_creator}
              /> : null}
            </div>
          </div>
        </>
      ) : (
        <PageLoader/>
      )}
    </>
  );
};

const mapStateToPros = (state) => ({
  creatorVirtualExperienceView: state.creatorVirtual.creatorVirtualExperienceView,
  saveBlockUser: state.users.saveBlockUser,
  liveAudienceList: state.liveVideo.liveAudienceList,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(NewJoinVEIndex));
