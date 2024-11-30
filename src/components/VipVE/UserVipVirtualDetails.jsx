import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Image, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { creatorVirtualExperienceViewStart } from "../../store/actions/CreatorVipVEAction";
import { connect } from "react-redux";
import { translate } from "react-multi-lang";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { withRouter } from "react-router-dom/cjs/react-router-dom";
import UserVirtualLoader from "../Loader/UserVirtualLoader";
import CustomLazyLoad from "../helper/CustomLazyLoad";
import BookingModal from "./BookingModal";
import { apiConstants } from "../Constant/constants";
import Map, { GoogleApiWrapper, Marker } from "google-maps-react";
import Questions from "./Questions";
import NoDataFound from "../NoDataFound/NoDataFound";

const UserVipVirtualDetails = (props) => {

  const dispatch = useDispatch();
  const { unique_id } = useParams();
  const [bookingModal, setBookingModal] = useState(false);
  const [bookAll, setBookAll] = useState(false);
  const creatorVirtualBookingStart = useSelector(state => state.creatorVipVE.creatorVirtualBookingStart);
  const updateAnswer = useSelector((state) => state.creatorVipVE.creatorVirtualExperienceUpdateAnswer);
  const [skipRender, setSkipRender] = useState(true);
  const [show, setShow] = useState(false);
  const history = useHistory();

  const closeBookingModal = () => {
    setBookingModal(false);
  };

  useEffect(() => {
    dispatch(
      creatorVirtualExperienceViewStart({
        virtual_experience_unique_id: unique_id,
      })
    );
  }, []);

  useEffect(() => {
    if (!skipRender &&
      ((!creatorVirtualBookingStart.loading && Object.keys(creatorVirtualBookingStart.data).length > 0) ||
        (!updateAnswer.loading && Object.keys(updateAnswer.data).length > 0))
    ) {
      closeBookingModal();
      dispatch(
        creatorVirtualExperienceViewStart({
          virtual_experience_unique_id: unique_id,
        })
      );
    }
    setSkipRender(false);
  }, [creatorVirtualBookingStart, updateAnswer])

  const { google } = props;

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      {props.userVirtualDetails.loading ? (
        <UserVirtualLoader />
      ) : Object.keys(props.userVirtualDetails.data).length > 0 ? (
        <Container>
          <div className="user-virtual-wrapped">
            <Row>
              <Col md={12} lg={12}>
                <div className="get-back-user-frame">
                  <a style={{ cursor: "pointer" }} onClick={() => history.goBack()}>
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
                    <h4 style={{ color: "var(--primary-color)" }}>{props.userVirtualDetails.data.virtual_experience.status == 1 ? "Scheduled" : "Booked"}</h4>
                  </div>
                  <div className="user-full-body">
                    <div className="custome-call-card-bottom mt-3">
                      <div className="user-schedule-info-card">
                        <div className="user-schedule-info-frame" style={{ gap: "1em!important" }}>
                          <h4>Price :</h4>
                          <h4 style={{ color: "var(--primary-color)" }}>
                            {props.userVirtualDetails.data.virtual_experience.amount_formatted}
                          </h4>
                        </div>
                      </div>
                    </div>
                    {!props.userVirtualDetails.data.virtual_experience.virtual_experience_creator && (
                      <div className="custome-call-card-btn">
                        <div className="custome-call-card-btn mb-3">
                          {!props.userVirtualDetails.data.is_answered && (
                            <div className="custome-book-card">
                              <Button
                                className="start-video-call-btn"
                                style={{ width: "50%!important" }}
                                onClick={() =>
                                  setShow(true)
                                }
                              >
                                Answer
                              </Button>
                            </div>
                          )}
                        </div>
                        {Object.keys(props.userVirtualDetails.data.booking).length > 0 ?
                          props.userVirtualDetails.data.booking.status == 1 && props.userVirtualDetails.data.is_answered ?
                            <h4 style={{ color: "var(--primary-color)" }}>Requested</h4>
                            : props.userVirtualDetails.data.booking.status == 2 ? (
                              <div className="custome-call-card-btn mb-3">
                                <div className="custome-book-card">
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
                              </div>
                            ) : props.userVirtualDetails.data.booking.status == 3 ?
                              <h4 style={{ color: "var(--primary-color)" }}>Rejected</h4>
                              : props.userVirtualDetails.data.booking.status == 4 ?
                                <h4 style={{ color: "var(--primary-color)" }}>Paid</h4> : null
                          : null}
                      </div>
                    )}
                  </div>
                </div>
                <div className="user-full-card mt-3">
                  <div className="user-full-header">
                    <h4>Location</h4>
                  </div>
                  <div className="user-full-body">
                    <div className="user-schedule-info-frame" style={{ gap: "1em!important" }}>
                      <h4>Location:</h4>
                      <h4 style={{ color: "var(--primary-color)" }}>
                        {props.userVirtualDetails.data.virtual_experience.location}
                      </h4>
                    </div>
                    <div className="custom-location">
                      <Map
                        google={google}
                        center={{ lat: props.userVirtualDetails.data.virtual_experience.latitude, lng: props.userVirtualDetails.data.virtual_experience.longitude }}
                        zoom={0}
                        style={{ width: "300px", height: "200px" }}
                      >
                        {/* Marker for the selected location */}
                        <Marker position={{ lat: props.userVirtualDetails.data.virtual_experience.latitude, lng: props.userVirtualDetails.data.virtual_experience.longitude }} />
                      </Map>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            {show && (
              <Questions show={show} handleClose={handleClose} questions={props.userVirtualDetails.data.questions} isPreview={false} />
            )}
          </div>
        </Container>
      ) : <div className="user-virtual-wrapped mt-5">
        <NoDataFound />
      </div>}
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
  userVirtualDetails: state.creatorVipVE.creatorVirtualExperienceView,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

const connector = connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(UserVipVirtualDetails));

export default GoogleApiWrapper({
  apiKey: apiConstants.google_api_key,
})(connector);