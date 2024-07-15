import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Image, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { creatorVirtualExperienceViewStart, startVirtualExperienceStart } from "../../../store/actions/CreatorVirtualAction";
import UserVirtualLoader from "../../Loader/UserVirtualLoader";
import { connect } from "react-redux";
import { translate } from "react-multi-lang";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import BookingModal from "../../VirtualExperience/BookingModal";
import { Field } from "formik";
import { getSuccessNotificationMessage } from "../../helper/NotificationMessage";
import { createNotification } from "react-redux-notify";
import { get } from "jquery";
import { Link } from "react-router-dom";
import Countdown from 'react-countdown';
import { withRouter } from "react-router-dom/cjs/react-router-dom";
import CustomLazyLoad from "../../helper/CustomLazyLoad";

const UserVirtualDetails = (props) => {

  const dispatch = useDispatch();
  const { unique_id } = useParams();
  const [isChecked, setIsChecked] = useState(0);
  const [bookingModal, setBookingModal] = useState(false);
  const [bookAll, setBookAll] = useState(false);
  const creatorVirtualBookingStart = useSelector(state => state.creatorVirtual.creatorVirtualBookingStart);
  const startVirtualExperience = useSelector(state => state.creatorVirtual.startVirtualExperience);
  const [skipRender, setSkipRender] = useState(true);
  const [countDown, setCountDown] = useState(null);
  const history = useHistory();

  const closeBookingModal = () => {
    setBookingModal(false);
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked ? 1 : 0);
  };

  useEffect(() => {
    dispatch(
      creatorVirtualExperienceViewStart({
        virtual_experience_unique_id: unique_id,
      })
    );
  }, []);

  useEffect(() => {
    if (!skipRender && !creatorVirtualBookingStart.loading && Object.keys(creatorVirtualBookingStart.data).length > 0) {
      closeBookingModal();
      dispatch(
        creatorVirtualExperienceViewStart({
          virtual_experience_unique_id: unique_id,
        })
      );
    }
    setSkipRender(false);
  }, [creatorVirtualBookingStart])

  useEffect(() => {
    if (!skipRender && !startVirtualExperience.loading && Object.keys(startVirtualExperience.data).length > 0) {
      window.location.assign(
        window.location.origin +
        "/join-virtual-experience/" +
        props.userVirtualDetails.data.virtual_experience.unique_id
      );
    }
    setSkipRender(false);
  }, [startVirtualExperience]);

  useEffect(() => {
    if(!skipRender && !props.userVirtualDetails.loading && Object.keys(props.userVirtualDetails.data).length > 0) {
      let time = new Date(props.userVirtualDetails.data.virtual_experience.scheduled_start);
      const newTimestamp = new Date(time.getTime() - (5 * 60000));
      setCountDown(new Date(newTimestamp));
    }
    setSkipRender(false);
  }, [props.userVirtualDetails]);

  return (
    <>
      {props.userVirtualDetails.loading ? (
        <UserVirtualLoader />
      ) : (
        <Container>
          {Object.keys(props.userVirtualDetails.data).length > 0 && (
            <div className="user-virtual-wrapped">
              <Row>
                <Col md={12} lg={12}>
                  <div className="get-back-user-frame">
                    <a style={{cursor:"pointer"}} onClick={()=> history.goBack()}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0"
                        y="0"
                        enableBackground="new 0 0 512 512"
                        version="1.1"
                        viewBox="0 0 512 512"
                        xmlSpace="preserve"
                        width="24"
                        height="24"
                      >
                        <path d="M256 0C114.618 0 0 114.618 0 256s114.618 256 256 256 256-114.618 256-256S397.382 0 256 0zm0 469.333c-117.818 0-213.333-95.515-213.333-213.333S138.182 42.667 256 42.667 469.333 138.182 469.333 256 373.818 469.333 256 469.333z"></path>
                        <path d="M313.752 134.248c-8.331-8.331-21.839-8.331-30.17 0L176.915 240.915c-8.331 8.331-8.331 21.839 0 30.17l106.667 106.667c8.331 8.331 21.839 8.331 30.17 0 8.331-8.331 8.331-21.839 0-30.17L222.17 256l91.582-91.582c8.331-8.331 8.331-21.838 0-30.17z"></path>
                      </svg>
                      <span>Back</span>
                    </a>
                  </div>
                </Col>
                <Col md={6} lg={6}>
                  <div className="user-virtaul-frame">
                    <div className="user-full-card">
                      <div className="user-profile-card">
                        <div className="user-virtual-profile-img">
                          <CustomLazyLoad
                            className="w-100"
                            src={
                              props.userVirtualDetails.data.virtual_experience.user_info.picture || window.location.origin + "/assets/images/ve.jpeg"
                            }
                          />
                        </div>
                        <h4>
                          {props.userVirtualDetails.data.virtual_experience.title}
                        </h4>
                      </div>
                    </div>
                    <div className="user-full-card mt-3">
                      <div className="user-full-header">
                        <h4>Description</h4>
                      </div>
                      <div className="user-full-body">
                        <p>
                          {
                            props.userVirtualDetails.data.virtual_experience
                              .description
                          }
                        </p>
                      </div>
                    </div>
                    {props.userVirtualDetails.data.virtual_experience.files
                      .length > 0 && (
                        <div className="user-full-card mt-3">
                          <div className="user-full-header">
                            <h4>Images</h4>
                          </div>
                          <div className="user-full-body">
                            <div className="user-image-frame">
                              {props.userVirtualDetails.data.virtual_experience
                                .files &&
                                props.userVirtualDetails.data.virtual_experience
                                  .files.length > 0 &&
                                props.userVirtualDetails.data.virtual_experience.files.map(
                                  (file, key) => (
                                    <div key={key}>
                                      {file.file && (
                                        <CustomLazyLoad
                                          className="user-virtual-image"
                                          src={file.file}
                                        />
                                      )}
                                    </div>
                                  )
                                )}
                            </div>
                          </div>
                        </div>
                      )}
                  </div>
                </Col>
                <Col md={6} lg={6}>
                  <div className="user-full-card">
                    <div className="user-full-header">
                      <h4>Virtual Experience</h4>
                      <h4 style={{ color: "var(--primary-color)" }}>{props.userVirtualDetails.data.virtual_experience.status_formatted}</h4>
                    </div>
                    <div className="user-full-body">
                      <div className="custome-call-card-bottom mt-3">
                        <div className="custome-call-card-info">
                          <h4>{props.userVirtualDetails.data.virtual_experience.start_date}</h4>
                          <p>
                            {props.userVirtualDetails.data.virtual_experience.start_time}{" "}-
                            {props.userVirtualDetails.data.virtual_experience.end_time}{" "}
                            (IST)
                          </p>
                        </div>
                        <div className="user-schedule-info-card">
                          <div className="user-schedule-info-frame">
                            <h4>
                              Room Capacity : {props.userVirtualDetails.data.virtual_experience.used_capacity}/{props.userVirtualDetails.data.virtual_experience.total_capacity}
                            </h4>
                          </div>
                          <div className="user-schedule-info-frame" style={{ gap: "1em!important" }}>
                            <h4>Price Per Person :</h4>
                            <h4 style={{ color: "var(--primary-color)" }}>
                              {props.userVirtualDetails.data.virtual_experience.price_per_formatted}
                            </h4>
                          </div>
                        </div>
                      </div>
                      {/* {(!props.userVirtualDetails.data.virtual_experience.start_call && props.userVirtualDetails.data.virtual_experience.status == 1) ?
                      <div className="custome-call-card-btn">
                        <h5>You can {props.userVirtualDetails.data.virtual_experience.virtual_experience_creator ? "start" : "join"} the call in </h5>
                        <div style={{fontSize:"1.8em", color: "var(--primary-color)"}}>
                        {countDown && <Countdown date={countDown} onComplete={()=> {
                          props.userVirtualDetails.data.virtual_experience.status == 1 && dispatch(
                            creatorVirtualExperienceViewStart({
                              virtual_experience_unique_id: unique_id,
                            })
                          );
                        }}/>}
                        </div>
                      </div> : null} */}
                      <div className="custome-call-card-btn">
                        {props.userVirtualDetails.data.virtual_experience.virtual_experience_creator ? (
                          (props.userVirtualDetails.data.virtual_experience.start_call == 1 && [1, 2].includes(props.userVirtualDetails.data.virtual_experience.status)) ? (
                            <Button className="start-video-call-btn" onClick={() => {
                              if (props.userVirtualDetails.data.virtual_experience.status == 1) {
                                dispatch(startVirtualExperienceStart({
                                  virtual_experience_unique_id: props.userVirtualDetails.data.virtual_experience.unique_id
                                }))
                              } else {
                                window.location.assign(
                                  window.location.origin +
                                  "/join-virtual-experience/" +
                                  props.userVirtualDetails.data.virtual_experience.unique_id
                                );
                              }
                            }}>
                              {props.userVirtualDetails.data.virtual_experience.status == 1 ? "Start Call" : "Join Call"}
                            </Button>
                          ) : null) : 
                          props.userVirtualDetails.data.virtual_experience.user_needs_to_pay ?
                            (<div className="custome-call-card-btn mb-3">
                              {props.userVirtualDetails.data.virtual_experience.remaning_capacity > 0 ? (
                                <div className="custome-book-card">
                                  {props.userVirtualDetails.data.virtual_experience.used_capacity == 0 ?
                                  <div class="pretty p-svg p-curve">
                                  <input type="checkbox" onClick={() => setBookAll(!bookAll)} checked={bookAll}/>
                                  <div class="state p-success">
                                      <svg
                                        class="svg svg-icon"
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="20"
                                          height="20"
                                          fill="#fff"
                                          x="0"
                                          y="0"
                                          enableBackground="new 0 0 507.506 507.506"
                                          version="1.1"
                                          viewBox="0 0 507.506 507.506"
                                          xmlSpace="preserve"
                                        >
                                        <path d="M163.865 436.934a54.228 54.228 0 01-38.4-15.915L9.369 304.966c-12.492-12.496-12.492-32.752 0-45.248 12.496-12.492 32.752-12.492 45.248 0l109.248 109.248L452.889 79.942c12.496-12.492 32.752-12.492 45.248 0 12.492 12.496 12.492 32.752 0 45.248L202.265 421.019a54.228 54.228 0 01-38.4 15.915z"></path>
                                      </svg>
                                      <label>Book All</label>
                                  </div>
                              </div>
                                  : null}
                                  <Button
                                    className="start-video-call-btn"
                                    style={{ width: "50%!important" }}
                                    onClick={() =>
                                      setBookingModal(
                                        props.userVirtualDetails.data.virtual_experience
                                      )
                                    }
                                  >
                                    Book
                                  </Button>
                                </div>
                              ) : (
                                null
                              )}
                            </div>) : 
                            props.userVirtualDetails.data.virtual_experience.status == 2 ?
                              <Button className="start-video-call-btn" onClick={() => {
                                window.location.assign(
                                  window.location.origin +
                                  "/join-virtual-experience/" +
                                  props.userVirtualDetails.data.virtual_experience.unique_id
                                );
                              }}>
                                Join Call
                          </Button> : null}
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          )}
        </Container>
      )}
      {bookingModal && (
        <BookingModal
          bookingModal={bookingModal}
          closeBookingModal={closeBookingModal}
          virtualExperiences={bookingModal}
          bookAll={bookAll}
        />
      )}
    </>
  );
};

const mapStateToPros = (state) => ({
  userVirtualDetails: state.creatorVirtual.creatorVirtualExperienceView,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(withRouter(UserVirtualDetails)));
