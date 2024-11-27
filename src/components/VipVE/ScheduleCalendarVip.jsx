import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Button, Form, Image, Media, Modal } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { fetchUserDetailsStart } from "../../store/actions/UserAction";
import { connect } from "react-redux";
import { createNotification } from "react-redux-notify/lib/modules/Notifications";
import "../Accounts/Profile/NewProfile.css";
import "react-loading-skeleton/dist/skeleton.css";
import "@djthoms/pretty-checkbox";
import { useDropzone } from "react-dropzone";
import { CalenderScheduler } from "../CustomComponents/CalenderScheduler/CalenderScheduler";
import dayjs from "dayjs";
import { Formik, Form as FORM, Field, ErrorMessage } from "formik";
import { translate, t } from "react-multi-lang";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import {
	creatorOneOnOneVEFileSaveStart,
} from "../../store/actions/CreatorOneOnOneVEAction";
import ScheduleLoader from "../Loader/ScheduleLoader";
import { apiConstants } from "../Constant/constants";
import Map, { GoogleApiWrapper, Marker } from "google-maps-react";
import HomeSidebar from "../Accounts/Profile/HomeSidebar";
import Questions from "./Questions";

var utc = require("dayjs/plugin/utc");
var timezone = require("dayjs/plugin/timezone");
dayjs.extend(utc);
dayjs.extend(timezone);
const ScheduleCalendarOneOnOne = (props) => {

	const dispatch = useDispatch();
	const history = useHistory();
	const formRef = useRef();
	const [uploadedFiles, setUploadedFiles] = useState([]);
	const [today, setToday] = useState(null);
	const [skipRender, setSkipRender] = useState(true);
	const [skip, setSkip] = useState(0);
	const [take, setTake] = useState(12);
	const [activeButton, setActiveButton] = useState(null);
	const [position, setPosition] = useState({ lat: 0, lng: 0 });
	const [show, setShow] = useState(false);
	const [questions, setQuestions] = useState([
    { question: "", type: "Text" },
  ]);

	useEffect(() => {
		setSkip(take);
		if (props.profile.loading) {
			props.dispatch(fetchUserDetailsStart());
		}
	}, []);

	const startTimeOnchange = (time) => {
		console.log(dayjs(time).format("YYYY-MM-DD"));
		formRef.current.setFieldValue("scheduled_date", dayjs(time).format("YYYY-MM-DD"));
		setActiveButton(null);
	};

	useEffect(() => {
		if (!props.profile.loading && Object.keys(props.profile.data).length > 0) {
			const date = new Date(
				new Date().toLocaleString("en", {
					timeZone: props.profile.data.timezone,
				})
			);
			setToday(dayjs(new Date(
				new Date().toLocaleString("en", {
					timeZone: props.profile.data.timezone,
				})
			)).format("YYYY-MM-DD"));
		}
	}, [props.profile]);

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
			history.push("/user-ve-one-on-one-created-list");
		}
		setSkipRender(false);
	}, [props.creatorVirtualExperienceSave]);

	const handleSubmit = (values) => {
		console.log("Values", values);
		dispatch(creatorOneOnOneVEFileSaveStart(values));
	};

	const validationSchema = Yup.object().shape({
		title: Yup.string().required("Required"),
		description: Yup.string().required("Required"),
		location: Yup.string().required("Required"),
		amount: Yup.number()
			.required("Required")
			.positive("Price must be a greater than zero"),
		scheduled_date: Yup.string().required(t("Slot is required")),
		file_ids: Yup.mixed().required("File is required"),
	});

	let autocomplete;

	const { google } = props;

	const renderAutoComplete = () => {
		const { google } = props;
		if (!google) {
			console.log("asdfsadfasdfno");
			return;
		}

		autocomplete = new google.maps.places.Autocomplete(autocomplete, {
			types: ["geocode"],
		});

		autocomplete.setFields(["address_component", "geometry", "name"]);

		autocomplete.addListener("place_changed", () => {
			const place = autocomplete.getPlace();
			console.log("Place", place);
			if (!place.geometry) return;
			let full_address = "";
			place.address_components.map(
				(address) =>
				(full_address =
					full_address == ""
						? address.long_name
						: full_address + "," + address.long_name)
			);

			setPosition({ lat: place.geometry.location.lat(), lng: place.geometry.location.lng() });
			formRef.current.setFieldValue("latitude", place.geometry.location.lat());
			formRef.current.setFieldValue("longitude", place.geometry.location.lng());
			formRef.current.setFieldValue("location", full_address);

		});
	};

	const handleShow = () => setShow(true);

  // Handler to add a new question
  const addNewQuestion = () => {
    setQuestions([...questions, { question: "", type: "Text" }]);
  };

  // Handler to update question values
  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

	const handleClose = () => {
    setShow(false);
  };

	const removeQuestion = (indexToRemove) => {
    setQuestions((prevQuestions) =>
      prevQuestions.filter((_, index) => index !== indexToRemove)
    );
  };

	console.log("questions", questions)

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
									amount: "",
									latitude: "",
									longitude: "",
									location: "",
									scheduled_date: dayjs(new Date(
										new Date().toLocaleString("en", {
											timeZone: props.profile.data.timezone,
										})
									)).format("YYYY-MM-DD"),
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
											{!values.scheduled_date && (
												<ErrorMessage
													component={"div"}
													name="scheduled_date"
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
														<Form.Group className="mb-3">
															<Form.Label>Amount</Form.Label>
															<Field
																type="number"
																className="form-control"
																placeholder="Amount"
																name="amount"
															/>
															<ErrorMessage
																component={"div"}
																name="amount"
																className="errorMsg w-100"
															/>
														</Form.Group>
														<Form.Group className="mb-3">
															<Form.Label>Location</Form.Label>
															<input
																id="edit-address"
																type="text"
																placeholder="Location"
																onFocus={renderAutoComplete}
																ref={(ref) => (autocomplete = ref)}
																name="location"
																className="form-control edit-reset"
															></input>
															<ErrorMessage
																component={"div"}
																name="location"
																className="errorMsg w-100"
															/>
															<div className="custom-map">
																<Map
																	google={google}
																	center={position}
																	zoom={14}
																	style={{ width: "500px", height: "400px" }}
																>
																	{/* Marker for the selected location */}
																	{position.lat !== 0 && (
																		<Marker position={position} />
																	)}
																</Map>
															</div>
														</Form.Group>
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
										<div className="question-box">
                      <div className="question-head">
                        <h4>Add Question</h4>
                        <Button
                          className="settings-submit-btn"
                          onClick={handleShow}
                        >
                          Preview
                        </Button>
                      </div>
                      <div className="add-question">
                        {questions.map((question, index) => (
                          <div key={index} className="add-question-list">
                            <Row>
                            <Col lg={6} md={6}>
                            <Form.Group>
                              <Form.Label>Enter your question</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Enter here"
                                value={question.question}
                                onChange={(e) =>
                                  handleQuestionChange(
                                    index,
                                    "question",
                                    e.target.value
                                  )
                                }
                                className="form-control"
                              />
                            </Form.Group>
                            </Col>
                            <Col lg={4} md={4}>
                            <Form.Group>
                              <Form.Label>Select answer type</Form.Label>
                              <Form.Control
                                as="select"
                                value={question.type}
                                onChange={(e) =>
                                  handleQuestionChange(
                                    index,
                                    "type",
                                    e.target.value
                                  )
                                }
                                className="form-control mr-sm-2"
                              >
                                <option value="text">Text</option>
                                <option value="number">Number</option>
                                <option value="textarea">Textarea</option>
                              </Form.Control>
                            </Form.Group>
                            </Col>
                            <Col lg={2} md={2}>
														{questions.length > 1 && (
															<div className="remove-btn">
																<Button className="settings-submit-btn" onClick={() => removeQuestion(index)}>
																	Remove
																</Button>
															</div>
														)}
                            </Col>
                            </Row>
                          </div>
                        ))}
                        <div className="question-submit-btn">
                          <Button type="submit" className="settings-submit-btn">
                            Submit
                          </Button>
                        </div>
                        <div className="question-add-btn">
                          <Button
                            type="button"
                            onClick={() => addNewQuestion()}
                            className="settings-submit-btn"
                          >
                            + Add new question
                          </Button>
                        </div>
                      </div>
                    </div>
									</FORM>
								)}
							</Formik>
						</div>
					</div>
				)}
			</div>
			<Questions show={show} handleClose={handleClose} questions={questions} isPreview={true} />
		</>
	);
};

const mapStateToPros = (state) => ({
	profile: state.users.profile,
	posts: state.post.posts,
	creatorVirtualExperienceFileSave: state.creatorOneOnOneVE.creatorVirtualExperienceFileSave,
	creatorVirtualExperienceSave: state.creatorOneOnOneVE.creatorVirtualExperienceSave,
});

function mapDispatchToProps(dispatch) {
	return { dispatch };
}

const connector = connect(
	mapStateToPros,
	mapDispatchToProps
)(translate(ScheduleCalendarOneOnOne));

export default GoogleApiWrapper({
	apiKey: apiConstants.google_api_key,
})(connector);