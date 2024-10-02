import React, { useEffect, useRef, useState } from "react";
import HeaderIndex from "./Header/HeaderIndex";
import { Notify } from "react-redux-notify";
import LatestFooter from "./Footer/LatestFooter";
import { connect } from "react-redux";
import { fetchUserDetailsStart } from "../../store/actions/UserAction";
import SomethingWentWrong from "../helper/SomethingWentWrong";
import PageLoader from "../Loader/PageLoader";
import AgoraMinimize from "../LiveStreaming/NewJoinVideoMinimize";
import { useLocation, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import Draggable from "react-draggable";

const MainLayout = (props) => {

  const history = useHistory();
  const location = useLocation();
  const userVideoElement = useRef(null);

  const [themeState, setThemeState] = useState(
    localStorage.getItem("theme") !== "" &&
      localStorage.getItem("theme") !== null &&
      localStorage.getItem("theme") !== undefined &&
      localStorage.getItem("theme") === "dark" ?
      true
      : false
  );

  const liveVideoView = useSelector((state) => state.liveVideo.singleLiveVideoView);
  const videoElement = useSelector((state) => state.liveVideo.videoElement);

  const toggleClass = () => {
    localStorage.setItem("theme", themeState ? "light" : "dark");
    setThemeState(!themeState);
  };

  useEffect(() => {
    if(localStorage.getItem("userLoginStatus")) {
      if (!props.profile.buttonDisable && Object.keys(props.profile.data).length <= 0) {
        props.dispatch(fetchUserDetailsStart());
      }
    }
  }, []);

  useEffect(() => {
    if (!props.profile.loading && props.profile.data.is_email_verified === 0) {
      history.push('/register/verify');
    }
  }, [props.profile]);

  useEffect(() => {
    console.log('videoElement', videoElement);
    if (Object.keys(videoElement.data).length > 0) {
      console.log("Set userVideoElement");
      userVideoElement.current = videoElement.data.current;
    }
  }, [videoElement]);

  useEffect(() => {
    const handleLeavePip = () => {
      if (Object.keys(videoElement.data).length > 0) {
        console.log('videoElement', videoElement);
        const path = localStorage.getItem('current_path');
        console.log('location', path, path.includes("/join-live/"))
        console.log("current_path", localStorage.getItem('current_path'));
        if (!path.includes("/join-live/")) {
          console.log("Load new path");
          window.location.href = window.location.origin + videoElement.data.path;
        }
      } else {
        console.log("Load current path");
        window.location.href = window.location.origin;
      }
    };

    // Add event listener when userVideoElement ref is set
    if (userVideoElement.current) {
      console.log("Close PIP 1");
      userVideoElement.current.addEventListener('leavepictureinpicture', handleLeavePip);
    }

    // Cleanup event listener on component unmount
    return () => {
      if (userVideoElement.current) {
        console.log("Close PIP 2");
        userVideoElement.current.removeEventListener('leavepictureinpicture', handleLeavePip);
      }
    };
  }, [userVideoElement.current]);

  return props.profile.loading ? <PageLoader/> : Object.keys(props.profile.data).length > 0 ? (
    <div className={`${themeState ? "dark-mode" : ""}`} >
      <div className="app-admin-wrap layout-sidebar-large">
        <Notify position="TopRight" />
        {!history.location.pathname.includes("/join-virtual-experience") ? <HeaderIndex toggleTheme={toggleClass} darkTheme={themeState} /> : null}
        <div className="main-content-wrap sidenav-open d-flex flex-column">
          <div className="main-wrap-sec">
            {React.cloneElement(props.children)}
            {Object.keys(liveVideoView.data).length > 0 ||
            Object.keys(liveVideoView.data).length <= 0
              ? location.pathname !=
                  `/join-live/${localStorage.getItem(
                    "live_video_unique_id"
                  )}` &&
                localStorage.getItem("live_video_unique_id") && (
                  <div className="minimize-video">
                    <AgoraMinimize />
                  </div>
                )
              : null}
          </div>
          {props.showFooter ?
            <LatestFooter />
            : null
          }
        </div>
      </div>
    </div>
  ) : <SomethingWentWrong handleClick={()=> props.dispatch(fetchUserDetailsStart())}/>;
}

const mapStateToPros = (state) => ({
  profile: state.users.profile,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros, mapDispatchToProps
)(MainLayout);
