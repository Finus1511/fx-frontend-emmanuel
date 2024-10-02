import React, { useEffect, useState } from "react";
import "../LiveStreaming/LiveStreaming.css";
import { connect } from "react-redux";
import { translate, t } from "react-multi-lang";
import { useHistory } from "react-router";
import LiveStreamingCard from "./LiveStreamingCard";
import { singleLiveVideoViewStart } from "../../store/actions/LiveVideoAction";

const NewJoinVideoMinimize = (props) => {
  const history = useHistory();
  const [skipFirst, setSkipFirst] = useState(true);
  const [join, setJoin] = useState(false);

  useEffect(() => {
    if (Object.keys(props.liveVideoView.data).length <= 0) {
      setJoin(true);
      props.dispatch(
        singleLiveVideoViewStart({
          live_video_unique_id: localStorage.getItem("live_video_unique_id"),
        })
      );
    }
  }, []);

  useEffect(() => {
    if (!skipFirst) {
      if (!props.liveVideoView.loading) {
        if (Object.keys(props.liveVideoView.data).length == 0) {
          history.push("/live-streaming");
        }
      }
    }
  }, [props.liveVideoView]);

  useEffect(() => {
    if (!skipFirst) {
      if (
        !props.saveBlockUser.loading &&
        Object.keys(props.saveBlockUser.data).length > 0
      ) {
        history.push("/live-streaming");
      }
    }
    setSkipFirst(false);
  }, [props.saveBlockUser]);

  return (
    <>
      {!props.liveVideoView.loading &&
      Object.keys(props.liveVideoView.data).length > 0 ? (
        <>
          <div className="live-streaming-free-user-sec">
            <div className="live-streaming-user-box">
              <LiveStreamingCard
                liveVideoDetails={props.liveVideoView.data.live_video_details}
                isOwner={
                  props.liveVideoView.data.live_video_details.is_owner === 0
                    ? false
                    : true
                }
                join={join}
                showRemoteUser={false}
                maximize={true}
              />
            </div>
          </div>
        </>
      ) : (
        t("loading")
      )}
    </>
  );
};

const mapStateToPros = (state) => ({
  liveVideoView: state.liveVideo.singleLiveVideoView,
  saveBlockUser: state.users.saveBlockUser,
  liveAudienceList: state.liveVideo.liveAudienceList,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(NewJoinVideoMinimize));