import React, { useEffect, useState } from "react";
import HeaderIndex from "./Header/HeaderIndex";
import { Notify } from "react-redux-notify";
import LatestFooter from "./Footer/LatestFooter";
import { connect } from "react-redux";
import { fetchUserDetailsStart } from "../../store/actions/UserAction";
import { useHistory } from 'react-router-dom';
import SomethingWentWrong from "../helper/SomethingWentWrong";
import PageLoader from "../Loader/PageLoader";

const MainLayout = (props) => {
  let history = useHistory();

  const [themeState, setThemeState] = useState(
    localStorage.getItem("theme") !== "" &&
      localStorage.getItem("theme") !== null &&
      localStorage.getItem("theme") !== undefined &&
      localStorage.getItem("theme") === "dark" ?
      true
      : false
  );

  const toggleClass = () => {
    localStorage.setItem("theme", themeState ? "light" : "dark");
    setThemeState(!themeState);
  };

  useEffect(() => {
    if(localStorage.getItem("userLoginStatus")) {
      if (!props.profile.buttonDisable && Object.keys(props.profile.data) <= 0) {
        props.dispatch(fetchUserDetailsStart());
      }
    }
  }, []);

  useEffect(() => {
    if (!props.profile.loading && props.profile.data.is_email_verified === 0) {
      history.push('/register/verify');
    }
  }, [props.profile]);

  return props.profile.loading ? <PageLoader/> : Object.keys(props.profile.data).length > 0 ? (
    <div className={`${themeState ? "dark-mode" : ""}`} >
      <div className="app-admin-wrap layout-sidebar-large">
        <Notify position="TopRight" />
        {!history.location.pathname.includes("/join-virtual-experience") ? <HeaderIndex toggleTheme={toggleClass} darkTheme={themeState} /> : null}
        <div className="main-content-wrap sidenav-open d-flex flex-column">
          <div className="main-wrap-sec">
            {React.cloneElement(props.children)}
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
