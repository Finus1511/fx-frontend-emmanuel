import React, { useState, useRef, useEffect } from "react";
import {
  Modal,
  Container,
  Row,
  Col,
  Button,
  Image,
  Media,
  Form,
} from "react-bootstrap";
import "./NewSettings.css";
import { Link } from "react-router-dom";
import { hideFollowersStart, twoStepAuthUpdateStart } from "../../../store/actions/UserAction";
import { translate, t } from "react-multi-lang";
import SettingsSidebar from "./SettingsSidebar";
import { connect } from "react-redux";
import { set } from "date-fns";

const HideFollowers = (props) => {

    const [skipRender, setSkipRender] = useState(true);

  const [initialValue, setInitialValue] = useState(!props.profile.data.show_followings ? true : false);

  const handleChange = (event) => {
    props.dispatch(hideFollowersStart());
  };

  useEffect(() => {
    if (!skipRender && !props.hideFollowers.loading && Object.keys(props.hideFollowers.data).length > 0) {
        // setInitialValue(!initialValue);
        window.location.reload();
    }
    setSkipRender(false);
  }, [props.hideFollowers]);

  return (
    <>
      <div className="new-settings-sec new-change-password">
        <div className="new-settings-box">
          <SettingsSidebar />
          <div className="new-settings-main-wrapper">
            <div className="new-changes-password-box">
              <div className="settings-personal-info-card">
                <div className="settings-personal-info-header">
                  <h3>{t("hide_followers")}</h3>
                  <p>{t("hide_followers_content")}</p>
                </div>
                <div className="change-password-sec">
                  <Form className="switch-flex">
                    <Form.Check
                      type="switch"
                      id="change-enable"
                      label="Hide"
                      checked={initialValue}
                      onChange={(event) => handleChange(event)}
                    />
                  </Form>
                  <div className="two-step-auth-img-sec">
                    <Image
                      src={
                        window.location.origin +
                        "/assets/images/new-settings/hide.png"
                      }
                      alt=""
                      className="two-step-auth-img"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToPros = (state) => ({
  hideFollowers: state.users.hideFollowers,
  profile: state.users.profile,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(HideFollowers));
