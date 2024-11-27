import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Button, Form, Image, Media, Modal } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import "./NewProfile.css";
import { fetchPostsStart } from "../../../store/actions/PostAction";
import { fetchUserDetailsStart } from "../../../store/actions/UserAction";
import { connect } from "react-redux";
import { getSuccessNotificationMessage } from "../../helper/NotificationMessage";
import { createNotification } from "react-redux-notify/lib/modules/Notifications";
import configuration from "react-global-configuration";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  RedditShareButton,
  TelegramShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
  RedditIcon,
  TelegramIcon,
} from "react-share";
import "./NewProfile.css";
import "react-loading-skeleton/dist/skeleton.css";
import ProfileLoader from "../../Loader/ProfileLoader";
import { Checkbox } from "pretty-checkbox-react";
import "@djthoms/pretty-checkbox";
import { FileUploader } from "react-drag-drop-files";
import InputSpinner from "react-bootstrap-input-spinner";
import { useDropzone } from "react-dropzone";
import { CalenderScheduler } from "../../CustomComponents/CalenderScheduler/CalenderScheduler";
import dayjs from "dayjs";
import { Formik, Form as FORM, Field, ErrorMessage } from "formik";
import { translate, t } from "react-multi-lang";
import * as Yup from "yup";
import Skeleton from "react-loading-skeleton";
import { useDispatch } from "react-redux";
import {
  slotAvailableStart,
  creatorVirtualExperienceFileSaveStart,
} from "../../../store/actions/CreatorVirtualAction";
import ScheduleLoader from "../../Loader/ScheduleLoader";
import HomeSidebar from "./HomeSidebar";

var utc = require("dayjs/plugin/utc");
var timezone = require("dayjs/plugin/timezone");
dayjs.extend(utc);
dayjs.extend(timezone);
const ScheduleCalendar = (props) => {
  const formatNumber = (num) => {
    if (num < 10) return "0" + num;
    else return num;
  };
  const dispatch = useDispatch();
  const history = useHistory();
  const formRef = useRef();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [today, setToday] = useState(null);
  const [skipRender, setSkipRender] = useState(true);
  const [startTime, setStartTime] = useState();
  const [startTimeFormatted, setStartTimeFormatted] = useState();
  const [badgeStatus, setBadgeStatus] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(12);
  const [activeButton, setActiveButton] = useState(null);

  useEffect(() => {
    setSkip(take);
    if (props.profile.loading) {
      props.dispatch(fetchUserDetailsStart());
      setBadgeStatus(localStorage.getItem("is_verified_badge"));
    }
  }, []);

  const startTimeOnchange = (time) => {
    formRef.current.setFieldValue("scheduled_start", "");
    formRef.current.setFieldValue("scheduled_end", "");
    setActiveButton(null);
    setStartTime(time);
    setStartTimeFormatted(dayjs(time).format("MM/DD/YYYY"));
  };

  useEffect(() => {
    if (!skipRender) {
      dispatch(slotAvailableStart({ date: startTime }));
    }
  }, [startTime]);

  useEffect(() => {
    if (!props.profile.loading && Object.keys(props.profile.data).length > 0) {
      setToday(
        new Date(
          new Date().toLocaleString("en", {
            timeZone: props.profile.data.timezone,
          })
        )
      );
    }
  }, [props.profile]);

  useEffect(() => {
    if (today) {
      setStartTime(
        today.getFullYear() +
          "-" +
          formatNumber(parseInt(today.getMonth() + 1)) +
          "-" +
          formatNumber(today.getDate())
      );
      setStartTimeFormatted(
        parseInt(today.getMonth() + 1) +
          "/" +
          today.getDate() +
          "/" +
          today.getFullYear()
      );
      setSkipRender(false);
    }
  }, [today]);

  const handleShareClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const onCopy = (event) => {
    const notificationMessage = getSuccessNotificationMessage(
      t("profile_link_copied")
    );
    props.dispatch(createNotification(notificationMessage));
  };

  const handleClose = () => {
    setAnchorEl(null);
    setShow(false);
  };

  const handleFileDelete = (index) => {
    const updatedFiles = [...uploadedFiles];
    updatedFiles.splice(index, 1);
    setUploadedFiles(updatedFiles);
    let updatedDataArray = [];
    updatedFiles.forEach((file, key) => {
      let name = "files[" + key + "]";
      updatedDataArray[name] = file;
    });
    if (!updatedFiles.length == 0) {
      formRef.current.setFieldValue("file_ids", updatedDataArray);
    } else {
      formRef.current.setFieldValue("file_ids", null);
    }
  };
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "image/gif": [".gif"],
    },
    onDrop: (acceptedFiles, rejectedFiles) => {
      let validFiles = acceptedFiles.filter((file) => {
        const ext = file.name.slice(file.name.lastIndexOf("."));
        return [".png", ".jpg", ".gif"].includes(ext);
      });

      rejectedFiles.length > 0 &&
        props.dispatch(
          createNotification({
            message: "Invalid file type",
            type: "error",
          })
        );

      acceptedFiles.forEach((file, key) => {
        uploadedFiles.push(file);
      });
      let data_array = [];
      uploadedFiles.forEach((file, key) => {
        let name = "files[" + key + "]";
        data_array[name] = file;
      });
      formRef.current.setFieldValue("file_ids", data_array);
    },
  });

  useEffect(() => {
    if (
      !skipRender &&
      !props.creatorVirtualExperienceSave.loading &&
      Object.keys(props.creatorVirtualExperienceSave.data).length > 0
    ) {
      history.push("/user-created-list");
    }
    setSkipRender(false);
  }, [props.creatorVirtualExperienceSave]);

  const handleSubmit = (values) => {
    dispatch(creatorVirtualExperienceFileSaveStart(values));
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    total_capacity: Yup.number().required("Required").min(1),
    price_per: Yup.number()
      .required("Required")
      .positive("Price must be a greater than zero"),
    scheduled_start: Yup.string().required(t("Slot is required")),
    file_ids: Yup.mixed().required("File is required"),
  });

  const handleButtonClick = (slot, setFieldError) => {
    const [startHours, startMinutes] = parseTime(slot.start_time);
    const [endHours, endMinutes] = parseTime(slot.end_time);

    const formattedStartTime = formatTime(
      slot.utc_date,
      startHours,
      startMinutes
    );
    const formattedEndTime = formatTime(slot.utc_date, endHours, endMinutes);
    formRef.current.setFieldValue("scheduled_start", formattedStartTime);
    formRef.current.setFieldValue("scheduled_end", formattedEndTime);
    setActiveButton(slot.start_time);
  };

  const parseTime = (time) => {
    const [timePart, meridiem] = time.split(" ");
    let [hours, minutes] = timePart.split(":");
    hours = parseInt(hours, 10);

    if (meridiem === "PM" && hours < 12) {
      hours += 12;
    }

    if (meridiem === "AM" && hours === 12) {
      hours = 0;
    }
    return [hours, minutes];
  };

  const formatTime = (date, hours, minutes) => {
    return `${date} ${String(hours).padStart(2, "0")}:${minutes}:00`;
  };

  const open = Boolean(anchorEl);
  const popoverId = open ? "simple-popover" : undefined;
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  const [questions, setQuestions] = useState([
    { title: "", plan_type: "Text" },
  ]);

  // Handler to add a new question
  const addNewQuestion = () => {
    setQuestions([...questions, { title: "", plan_type: "Text" }]);
  };

  // Handler to update question values
  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  return (
    <>
      <div className="new-home-sec">
        {props.profile.loading ? (
          <ScheduleLoader />
        ) : (
          <div className="new-home-box">
            <HomeSidebar profile={props.profile} />
            <div className="new-home-main-wrapper">
              <Formik
                initialValues={{
                  title: "",
                  description: "",
                  price_per: "",
                  total_capacity: "1",
                  scheduled_start: "",
                  scheduled_end: "",
                  file_ids: null,
                }}
                validationSchema={validationSchema}
                innerRef={formRef}
                onSubmit={handleSubmit}
              >
                {({
                  values,
                  setFieldValue,
                  setFieldTouched,
                  errors,
                  setFieldError,
                }) => (
                  <FORM>
                    <div className="virtual-experienc-schedule-date-wrapped">
                      <div className="virtal-file-header">
                        <h4>Schedule Availability</h4>
                      </div>
                      <CalenderScheduler
                        date={today}
                        format="YYYY-MM-DD"
                        disablePastDate={true}
                        onChange={startTimeOnchange}
                      />

                      <div className="virtual-experienc-schedule-date-cards">
                        <div className="schedule-grid-layout">
                          {props.slotAvailable.loading
                            ? [...Array(12)].map((i, key) => (
                                <Skeleton
                                  key={key}
                                  height={40}
                                  width={300}
                                  borderRadius={30}
                                />
                              ))
                            : Object.keys(props.slotAvailable.data).length >
                                0 &&
                              Object.keys(props.slotAvailable.data.slots)
                                .length > 0
                            ? props.slotAvailable.data.slots.map((slot, i) => (
                                <Button
                                  key={i}
                                  className={`date-card ${
                                    activeButton === slot.start_time
                                      ? "active"
                                      : ""
                                  }`}
                                  onClick={() =>
                                    handleButtonClick(slot, setFieldError)
                                  }
                                  disabled={!slot.is_available}
                                >
                                  {slot.start_time} - {slot.end_time}
                                </Button>
                              ))
                            : null}
                        </div>
                      </div>
                      {!values.scheduled_start && (
                        <ErrorMessage
                          component={"div"}
                          name="scheduled_start"
                          className="errorMsg w-100"
                        />
                      )}
                    </div>
                    <div className="virtual-experienc-file-wrapped">
                      <div className="virtal-file-header">
                        <h4>Virtual Experience</h4>
                      </div>
                      <div className="virtal-file-form-section">
                        <Row>
                          <Col lg={6} md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Title</Form.Label>
                              <Field
                                type="text"
                                className="form-control"
                                placeholder="Title"
                                name="title"
                              />
                              <ErrorMessage
                                component={"div"}
                                name="title"
                                className="errorMsg w-100"
                              />
                            </Form.Group>
                            <Form.Group className="mb-3">
                              <Form.Label>Description</Form.Label>
                              <Field
                                as="textarea"
                                className="form-control schedule-calender-description "
                                rows={3}
                                placeholder="Description"
                                name="description"
                              />
                              <ErrorMessage
                                component={"div"}
                                name="description"
                                className="errorMsg w-100"
                              />
                            </Form.Group>
                            {/* <Form.Group className="mb-3">
                                                            <Form.Label className="w-100">Availability</Form.Label>
                                                            <Checkbox name="availability"
                                                                checked={values.availability == 1} onChange={num => formRef.current.setFieldValue("availability", 1)}>
                                                                Yes
                                                            </Checkbox>
                                                            <Checkbox name="availability"
                                                                checked={values.availability==2} onChange={num => formRef.current.setFieldValue("availability", 2)}>
                                                                No
                                                            </Checkbox>
                                                        </Form.Group> */}
                            <div className="file-form-schedule-card">
                              <h4>Schedule</h4>
                              <div className="file-form-inner-card-wrapped">
                                <div className="file-form-inner-card">
                                  <div className="file-form-inner-left">
                                    <h5>Price per person</h5>
                                  </div>
                                  <div className="file-form-inner-right ">
                                    <Form.Group className="p-0 input-schedule ">
                                      <Field
                                        type="number"
                                        min={1}
                                        name="price_per"
                                        className="form-control"
                                        onKeyDown={(e) => {
                                          if (
                                            e.key === "-" ||
                                            e.key === "e" ||
                                            e.key === "E"
                                          ) {
                                            e.preventDefault();
                                          }
                                        }}
                                      />
                                      <ErrorMessage
                                        component={"div"}
                                        name="price_per"
                                        className="errorMsg w-100"
                                      />
                                    </Form.Group>
                                  </div>
                                </div>
                                <div className="file-form-inner-card">
                                  <div className="file-form-inner-left">
                                    <h5>Room Capacity (Max)</h5>
                                  </div>
                                  <div className="file-form-inner-right spinner-card">
                                    <InputSpinner
                                      name="total_capacity"
                                      type={"real"}
                                      precision={2}
                                      max={100}
                                      min={1}
                                      step={1}
                                      value={1}
                                      onChange={(num) =>
                                        formRef.current.setFieldValue(
                                          "total_capacity",
                                          num
                                        )
                                      }
                                      variant={"dark"}
                                      size="sm"
                                    />
                                    <ErrorMessage
                                      component={"div"}
                                      name="total_capacity"
                                      className="errorMsg w-100"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Col>
                          <Col lg={6} md={6}>
                            <Form.Group className="mb-3 file-form-upload">
                              <div className="file-upload-input-card">
                                <div {...getRootProps()}>
                                  <input {...getInputProps()} />
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="52"
                                    height="52"
                                    enableBackground="new 0 0 512 512"
                                    viewBox="0 0 512 512"
                                  >
                                    <path
                                      fill="#9f4298"
                                      d="M303.508 324.693a15.962 15.962 0 01-12.3-5.758L272 295.885v151.807a16 16 0 01-32 0V295.885l-19.208 23.05a16 16 0 11-24.583-20.485l47.5-57a16 16 0 0124.584 0l47.5 57a16 16 0 01-12.283 26.243zm182.907-103.425a128.434 128.434 0 00-53.015-40.946 133.368 133.368 0 00-27.388-77.541C386.25 77.05 357.018 58.945 323.7 51.8c-81.28-17.425-168.763 32.165-195.012 110.546l-2.84 8.482a126.526 126.526 0 00.678 253.05h73.227a16 16 0 000-32h-73.227a94.526 94.526 0 010-189.052h10.838a16 16 0 0015.172-10.92l6.5-19.4c21.239-63.425 92.1-103.538 157.961-89.416 52.792 11.318 87.445 55.5 84.268 107.445a16 16 0 0011.335 16.294c39.682 11.99 67.4 49.215 67.4 90.523a94.633 94.633 0 01-94.526 94.526h-73.227a16 16 0 000 32h73.227A126.67 126.67 0 00512 297.352a125.165 125.165 0 00-25.585-76.084z"
                                      data-original="#000000"
                                    ></path>
                                  </svg>
                                  <p>
                                    Drag & drop files or <span>Browse</span>{" "}
                                  </p>
                                </div>
                              </div>
                              <ErrorMessage
                                component={"div"}
                                name="file_ids"
                                className="errorMsg w-100"
                              />

                              <div className="file-preview-card-wrapper">
                                {uploadedFiles.length > 0 && (
                                  <h4 className="file-preview-title">
                                    Uploaded
                                  </h4>
                                )}
                                {uploadedFiles.length > 0 &&
                                  uploadedFiles.map((file, index) => (
                                    <div className="file-preview-card uploaded">
                                      <p>{file.name}</p>
                                      <Button
                                        onClick={() => handleFileDelete(index)}
                                      >
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="20"
                                          height="20"
                                          fillRule="evenodd"
                                          clipRule="evenodd"
                                          imageRendering="optimizeQuality"
                                          shapeRendering="geometricPrecision"
                                          textRendering="geometricPrecision"
                                          viewBox="0 0 173.397 173.397"
                                        >
                                          <g>
                                            <circle
                                              cx="86.699"
                                              cy="86.699"
                                              r="84.667"
                                              fill="#db4437"
                                            ></circle>
                                            <g fill="#fff">
                                              <path d="M122.819 67.955l-6.586 66.354c-.376 3.783-3.256 6.818-7.059 6.818H64.223c-3.802 0-6.683-3.033-7.058-6.818l-6.587-66.354zM71.052 81.06a3.538 3.538 0 013.334-3.718 3.538 3.538 0 013.719 3.333l2.275 41.735a3.476 3.476 0 01-2.12 3.432c-1.381.599-2.912.291-3.954-.796a3.515 3.515 0 01-.978-2.247l-2.276-41.74zm27.96-3.718a3.549 3.549 0 013.333 3.718l-2.275 41.734a3.476 3.476 0 01-2.479 3.18 3.476 3.476 0 01-3.844-1.216 3.516 3.516 0 01-.73-2.344l2.276-41.739a3.538 3.538 0 013.718-3.333z"></path>
                                              <rect
                                                width="86.35"
                                                height="12.415"
                                                x="43.524"
                                                y="53.122"
                                                rx="6.207"
                                              ></rect>
                                              <path d="M108.151 53.726h-6.18v-7.94c0-4.035-3.3-7.336-7.335-7.336H78.762c-4.035 0-7.336 3.3-7.336 7.336v7.94h-6.18v-7.94c0-7.446 6.07-13.516 13.515-13.516h15.875c7.445 0 13.515 6.07 13.515 13.515z"></path>
                                            </g>
                                          </g>
                                        </svg>
                                      </Button>
                                    </div>
                                  ))}
                              </div>
                            </Form.Group>
                          </Col>
                          <Col md={12}>
                            <div className="file-schedule-card-btn">
                              <Button
                                className="schedule-cancel-btn"
                                onClick={() => {
                                  history.push("/profile");
                                }}
                              >
                                Cancel
                              </Button>
                              <Button
                                className="settings-submit-btn"
                                disabled={
                                  props.creatorVirtualExperienceFileSave
                                    .buttonDisable ||
                                  props.creatorVirtualExperienceSave
                                    .buttonDisable
                                }
                                type="submit"
                              >
                                {!props.creatorVirtualExperienceFileSave
                                  .buttonDisable ||
                                props.creatorVirtualExperienceSave.buttonDisable
                                  ? "Create"
                                  : "Loading"}
                              </Button>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </FORM>
                )}
              </Formik>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const mapStateToPros = (state) => ({
  profile: state.users.profile,
  posts: state.post.posts,
  creatorVirtualExperienceFileSave:
    state.creatorVirtual.creatorVirtualExperienceFileSave,
  creatorVirtualExperienceSave:
    state.creatorVirtual.creatorVirtualExperienceSave,
  slotAvailable: state.creatorVirtual.slotAvailable,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(ScheduleCalendar));
