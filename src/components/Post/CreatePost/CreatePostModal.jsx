import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Row, Col, Image, Form, Modal } from "react-bootstrap";
import { connect } from "react-redux";
import {
	postFileUploadStart,
	savePostStart,
	postFileRemoveStart,
	fetchPostCategoriesStart,
} from "../../../store/actions/PostAction";
import { createNotification } from "react-redux-notify/lib/modules/Notifications";
import { getErrorNotificationMessage } from "../../helper/NotificationMessage";
import { translate, t } from "react-multi-lang";
import PostEditor from "../postMentions/PostEditor";
import { Multiselect } from "multiselect-react-dropdown";
import { Form as FORM, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ButtonLoader } from "../../helper/Loader";

const CreatePostModal = (props) => {

	const mentionsRef = useRef();

	const [inputData, setInputData] = useState({});
	const [postFileData, setPostFileData] = useState([]);
	const [postFile, setPostFile] = useState({
		file_type: "",
		preview_file: "",
	});
	const [addLinkModal, setAddLinkModal] = useState(false);
	const [fileUploadStatus, setFileUploadStatus] = useState(false);
	const [editorContentState, setEditorContentstate] = useState("");
	const [editorHtmlContent, setEditorHtmlContent] = useState("");
	const [youtubeLink, setYoutubeLink] = useState("");

	const validationSchema = Yup.object().shape({
		youtube_link: Yup.string().required("Required")
	});

	useEffect(() => {
		props.dispatch(fetchPostCategoriesStart());
	}, []);

	useEffect(() => {
		if (
			props.fileUpload.loading === false &&
			props.fileUpload.data
		) {
			if (props.fileUpload.data.post_file && props.fileUpload.data.post_file.length > 0) {
				let files = [];
				props.fileUpload.data.post_file.map((value, i) => {
					files.push(value.post_file);
				});
				setPostFileData(files);
				setInputData({
					...inputData,
					post_file_id: props.fileUpload.data.post_file_id,
				});
			} else {
				console.log("fileUpload data", props.fileUpload.data)
				setInputData({
					...inputData,
					post_file_id: props.fileUpload.data.post_file_id
				});
				setAddLinkModal(false);
				setYoutubeLink(props.fileUpload.data.file);
				setFileUploadStatus(true);
			}
		}
	}, [!props.fileUpload.loading]);

	useEffect(() => {
		if (props.fileRemove.loading === false) {
			let files = [];
			if (props.fileRemove.data.post_file.length > 0) {
				props.fileRemove.data.post_file.map((value, i) => {
					files.push(value);
				});
			} else {
				setFileUploadStatus(false);
				setYoutubeLink("");
				setPostFile({
					file_type: "",
					preview_file: ""
				});
			}
			setInputData({
				...inputData,
				post_file_id: props.fileRemove.data.post_file_id,
			});
			setPostFileData(files);
		}
	}, [!props.fileRemove.loading]);

	const handleChangeImage = (event, fileType) => {

		setPostFile({
			...postFile,
			file_type: 'image'
		});

		let data_array = [];

		[...event.target.files].forEach((file, key) => {
			let name = "file[" + key + "]";

			data_array[name] = file;
		});
		data_array["file_type"] = fileType;

		setFileUploadStatus(true);
		props.dispatch(postFileUploadStart(data_array));
	};

	const handleChangeVideo = (event, fileType) => {
		console.log("Video upload")

		setPostFile({
			...postFile,
			file_type: 'video'
		});

		let data_array = [];

		[...event.target.files].forEach((file, key) => {
			let name = "file[" + key + "]";

			data_array[name] = file;
		});

		data_array["file_type"] = fileType;

		setFileUploadStatus(true);
		props.dispatch(postFileUploadStart(data_array));
	};

	const handleChangeAudio = (event, fileType) => {

		setPostFile({
			...postFile,
			file_type: 'audio'
		});

		let data_array = [];

		[...event.target.files].forEach((file, key) => {
			let name = "file[" + key + "]";

			data_array[name] = file;
		});

		data_array["file_type"] = fileType;
		setFileUploadStatus(true);

		props.dispatch(postFileUploadStart(data_array));
	};

	const handleClose = (event, post_file) => {
		event.preventDefault();
		if (props.fileUpload.loadingButtonContent !== null) {
			const notificationMessage = getErrorNotificationMessage(
				t("file_being_uploaded")
			);
			props.dispatch(createNotification(notificationMessage));
		} else {
			setPostFileData([]);
			props.dispatch(
				postFileRemoveStart({
					file: post_file,
					post_file_id: inputData.post_file_id,
				})
			);
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (fileUploadStatus) {
			props.dispatch(
				savePostStart({
					content: editorHtmlContent,
					amount: inputData.amount ? inputData.amount : "",
					post_file_id: inputData.post_file_id ? inputData.post_file_id : "",
					preview_file: inputData.preview_file ? inputData.preview_file : "",
					category_ids: inputData.category_ids ? inputData.category_ids : [],
					video_preview_file: inputData.video_preview_file ? inputData.video_preview_file : "",
					publish_type: inputData.publish_type ? inputData.publish_type : "all"
				})
			);
		} else {
			const notificationMessage = getErrorNotificationMessage(
				t("please_upload_media_files")
			);
			props.dispatch(createNotification(notificationMessage));
		}
	};

	const setValues = (inputValue) => {
		let user_id_arr = [];
		inputValue.map((value, i) => {
			user_id_arr.push(value.category_id);
		});
		setInputData({
			...inputData,
			category_ids: user_id_arr,
		});
	};

	const handleVideopreviewImage = (event) => {
		if (event.currentTarget.type === "file") {
			setFileUploadStatus(true);
			let reader = new FileReader();
			let file = event.currentTarget.files[0];
			reader.onloadend = () => {
				setPostFile({
					...postFile,
					preview_file: reader.result
				});
			};

			if (file) {
				reader.readAsDataURL(file);
			}

			setInputData({
				...inputData,
				preview_file: file,
			});

			setPostFile({
				...postFile,
				preview_file: file
			});
		}
	};

	const handleAudiopreviewImage = (event) => {
		if (event.currentTarget.type === "file") {
			setFileUploadStatus(true);
			let reader = new FileReader();
			let file = event.currentTarget.files[0];
			reader.onloadend = () => {
				setPostFile({
					...postFile,
					preview_file: reader.result
				});
			};

			if (file) {
				reader.readAsDataURL(file);
			}

			setInputData({
				...inputData,
				preview_file: file,
			});

			setPostFile({
				...postFile,
				preview_file: file
			});
		}
	};

	const handleYoutubeSubmit = (formData) => {
		setPostFile({
			...postFile,
			file_type: 'youtube'
		});
		props.dispatch(postFileUploadStart(formData));
	}

	return (
		<>
			<Modal.Header closeButton>
				<Modal.Title>New Post</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="notification-page create-post" id="tabs">
					<Container>
						{!addLinkModal ? (
							<div className="create-post-box">
								<Form onSubmit={handleSubmit}>
									<Row>
										<Col sm={12} md={12}>
											<div className="searchMentions">
												<div className="PostEditor">
													<PostEditor
														className="PostEditor__input"
														placeholder={t("new_post_placeholder")}
														ref={mentionsRef}
														getEditorRawContent={setEditorContentstate}
														getEditorHtmlContent={setEditorHtmlContent}
														dispatch={props.dispatch}
													/>
												</div>
											</div>
										</Col>

										<Col sm={12} md={6} className="mt-3 mt-lg-4">
											{props.postCategories.data.post_categories &&
												props.postCategories.data.post_categories.length > 0 ? (
												<>
													<Form.Group className="mb-0">
														<Form.Label className="edit-input-label mb-3 mb-lg-3">
															{t("category")} ({t("optional")})
														</Form.Label>
														{props.postCategories.data.post_categories ? (
															<Multiselect
																name="category_ids"
																options={props.postCategories.data.post_categories}
																displayValue="name"
																avoidHighlightFirstOption="true"
																placeholder={t("choose_category")}
																onSelect={(values) => setValues(values)}
															/>
														) : null}
													</Form.Group>
												</>
											) : null}

											<div className="left-half post-write">
												<Button>
													<Form.Group className="mb-0">
														<Form.Control
															id="fileupload_photo"
															type="file"
															multiple="multiple"
															disabled={["audio", "video", "youtube"].includes(postFile.file_type) ? true : false}
															accept=".gif,.jpg,.jpeg,.gif,.png,.jpg,.jpeg,.png"
															onChange={(event) =>
																handleChangeImage(event, "image")
															}
															name="post_files"
														/>
														<Form.Label
															id="attach_file_photo"
															for="fileupload_photo"
															className="chat-attach_file"
															data-original-title="null"
														>
															<Image
																src="assets/images/post/post-image-upload.svg"
																className="svg-clone"
															/>
														</Form.Label>
													</Form.Group>
												</Button>
												<Button>
													<Form.Group
														className="mb-0"
														controlId="formFileDisabled"
													>
														<Form.Control
															id="fileupload_video"
															type="file"
															multiple="multiple"
															disabled={["audio", "image", "youtube"].includes(postFile.file_type) ? true : false}
															accept="video/mp4,video/x-m4v,video/*"
															onChange={(event) =>
																handleChangeVideo(event, "video")
															}
															name="post_files"
														/>
														<Form.Label
															id="attach_file_video"
															for="fileupload_video"
															className="chat-attach_file"
															data-original-title="null"
														>
															<Image
																src="assets/images/post/post-video-upload.svg"
																className="svg-clone video-add-icon"
															/>
														</Form.Label>
													</Form.Group>
												</Button>

												<Button>
													<Form.Group
														className="mb-0"
														controlId="formFileDisabled"
													>
														<Form.Control
															id="fileupload_audio"
															type="file"
															multiple="multiple"
															disabled={["image", "video", "youtube"].includes(postFile.file_type) ? true : false}
															accept="audio/mp3,audio/*"
															onChange={(event) =>
																handleChangeAudio(event, "audio")
															}
															name="post_files"
														/>
														<Form.Label
															id="attach_file_audio"
															for="fileupload_audio"
															className="chat-attach_file"
															data-original-title="null"
														>
															<Image
																src="assets/images/post/post-audio-upload.svg"
																className="svg-clone"
															/>
														</Form.Label>
													</Form.Group>
												</Button>
												<Button
													disabled={["audio", "video", "image"].includes(postFile.file_type) ? true : false}
													onClick={() => setAddLinkModal(true)}
												>
													<Image
														src="assets/images/post/post-link-upload.svg"
														className="svg-clone"
													/>
												</Button>
											</div>
											{postFile.file_type == "image" && postFileData ? (
												<Row>
													{postFileData.map((image, index) => (
														<Col sm={12} md={6}>
															<div className="post-img-preview-sec">
																<Link
																	to="#"
																	onClick={(event) => handleClose(event, image)}
																>
																	<i className="far fa-times-circle"></i>
																</Link>
																<Image
																	alt="post-image"
																	src={image}
																	className="post-video-preview"
																/>
															</div>
														</Col>
													))}
												</Row>
											) : null}
											{postFile.file_type == "video" && postFileData ? (
												<Row>
													{postFileData.map((video, index) => (
														<Col sm={12} md={12}>
															<div
																key={index}
																className="post-img-preview-sec my-3 my-lg-4"
															>
																<video
																	autoplay
																	controls
																	id="myVideo"
																	className="user-profile1 create-post-video"
																>
																	<source src={video} type="video/mp4" />
																</video>
																<Link
																	to="#"
																	onClick={(event) => handleClose(event, video)}
																	className="close-video"
																>
																	<i className="far fa-window-close"></i>
																</Link>
															</div>
														</Col>
													))}
												</Row>
											) : null}
											{postFile.file_type == "audio" && postFileData ? (
												<Row>
													{postFileData.map((audio, index) => (
														<Col sm={12} md={12}>
															<div className="post-img-preview-sec">
																<audio
																	controls
																	id="myVideo"
																	className="user-profile1"
																>
																	<source src={audio} type="audio/mp3" />
																</audio>
																<Link
																	to="#"
																	onClick={(event) => handleClose(event, audio)}
																	className="close-audio"
																>
																	<i className="far fa-window-close"></i>
																</Link>
															</div>
														</Col>
													))}
												</Row>
											) : null}
											{youtubeLink ? (
												<Row>
													<Col sm={12} md={12}>
														<div className="post-img-preview-sec youtube-preview">
															<div dangerouslySetInnerHTML={{ __html: youtubeLink }} />
															<Link
																to="#"
																onClick={(event) => handleClose(event, youtubeLink)}
																className="close-audio"
															>
																<i className="far fa-window-close"></i>
															</Link>
														</div>
													</Col>
												</Row>
											) : null}
										</Col>

										<Col sm={12} md={6} className="mt-3 mt-lg-4">
											<Form.Group className="md-mrg-btm">
												<label className="text-muted m-1 mb-3 mb-lg-3">
													{t("price")} ({t("optional")})
												</label>
												<Form.Control
													type="number"
													placeholder={t("price_placeholder")}
													name="amount"
													pattern="[0-9]*"
													min="1"
													inputmode="numeric"
													value={inputData.amount}
													width="50%"
													onChange={(event) =>
														setInputData({
															...inputData,
															amount: event.currentTarget.value,
														})
													}
												/>
											</Form.Group>
											<Form.Group>
												<label className="text-muted m-1 mb-3 mb-lg-3">
													{t("publish_type")}
												</label>
												<Form.Control
													className="form-control mr-sm-2"
													as="select"
													id="inlineFormCustomSelect"
													custom
													name="publish_type"
													onChange={(e) => setInputData({...inputData, publish_type: e.target.value})}
												>
													<option value="all">{t("followers_and_favourites")}</option>
													<option value="followers">{t("followers_only")}</option>
													<option value="favourites">{t("favourites_only")}</option>
												</Form.Control>
											</Form.Group>
											{postFile.file_type == "video" ? (
												<>
													<Form.Group className="md-mrg-btm mb-3 mb-lg-3">
														<label className="text-muted m-1 mt-3 f-12 text-uppercase mb-3 mb-lg-3">
															{t("upload_video_thumbnail")}:({t("optional")})
														</label>
														<Form.Control
															style={{ display: "block" }}
															type="file"
															placeholder={t("upload_video_thumbnail_placeholder")}
															name="preview_file"
															width="50%"
															className="form-control"
															accept=".gif,.jpg,.jpeg,.gif,.png,.jpg,.jpeg,.png"
															onChange={(event) => handleVideopreviewImage(event)}
														/>
													</Form.Group>
													{postFile.preview_file ? (
														<Row>
															<Col sm={12} md={6} className="mb-3 mb-lg-4">
																<div className="post-img-preview-sec m-0">
																	<Link
																		to="#"
																		onClick={() => {
																			setPostFile({
																				...postFile,
																				preview_file: ""
																			})
																			setInputData({
																				...inputData,
																				preview_file: ""
																			})
																		}}
																	>
																		<i className="far fa-times-circle"></i>
																	</Link>
																	<Image
																		alt="post-video"
																		src={postFile.preview_file}
																		className="post-video-preview"
																	/>
																</div>
															</Col>
														</Row>
													) : null}
												</>
											) : (null)}
											{postFile.file_type == "audio" ? (
												<>
													<Form.Group className="md-mrg-btm mb-3 mb-lg-3">
														<label className="text-muted m-1 mt-3 f-12 text-uppercase mb-3 mb-lg-3">
															{t("upload_audio_thumbnail")}:({t("optional")})
														</label>
														<Form.Control
															style={{ display: "block" }}
															type="file"
															placeholder={t("upload_audio_thumbnail_placeholder")}
															name="preview_file"
															width="50%"
															className="form-control"
															accept=".gif,.jpg,.jpeg,.gif,.png,.jpg,.jpeg,.png"
															onChange={(event) => handleAudiopreviewImage(event)}
														/>
													</Form.Group>
													{postFile.preview_file ? (
														<Row>
															<Col sm={12} md={6} className="mb-3 mb-lg-4">
																<div className="post-img-preview-sec m-0">
																	<Link
																		to="#"
																		onClick={() => {
																			setPostFile({
																				...postFile,
																				preview_file: ""
																			})
																			setInputData({
																				...inputData,
																				preview_file: ""
																			})
																		}}
																	>
																		<i className="far fa-times-circle"></i>
																	</Link>
																	<Image
																		alt="post-audio"
																		src={postFile.preview_file}
																		className="post-video-preview"
																	/>
																</div>
															</Col>
														</Row>
													) : null}
												</>
											) : (null)}
										</Col>
									</Row>
								</Form>
							</div>
						) : (
							<>
								<div className="">
									<Link
										className="bookmarkes-list notify-title"
										to="#"
										onClick={() => setAddLinkModal(false)}
									>
										<Image
											src={
												window.location.origin +
												"/assets/images/icons/back.svg"
											}
											className="svg-clone"
										/>
										{t("back")}
									</Link>
								</div>
								<Formik
									initialValues={{
										youtube_link: "",
										file_type: "url"
									}}
									validationSchema={validationSchema}
									onSubmit={handleYoutubeSubmit}
								>
									<FORM className="create-folder-form">
										<Form.Group controlId="formBasicPassword">
											<Form.Label>Embed Link *</Form.Label>
											<Field
												name="youtube_link"
												type="text"
												placeholder="Past Here"
												className="form-control"
											/>
										</Form.Group>
										<ErrorMessage
											component={"div"}
											name="youtube_link"
											className="error-msg text-danger text-right"
										/>
										<Button variant="primary" type="submit" className="default-btn mt-3" disabled={props.fileUpload.buttonDisable}>
											{props.fileUpload.loadingButtonContent !== null ? <ButtonLoader /> : "Add"}
										</Button>
									</FORM>
								</Formik>
							</>
						)}
					</Container>
					{/* {addLinkModal && <AddLinkModal show={addLinkModal} onHide={() => setAddLinkModal(false)} />} */}
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button
					className="btn gradient-btn postBtn gradientcolor text-uppercase w-unset"
					onClick={handleSubmit}
					disabled={
						props.fileUpload.buttonDisable ||
						props.savePost.buttonDisable
					}
				>
					{props.fileUpload.loadingButtonContent !== null
						? props.fileUpload.loadingButtonContent
						: props.savePost.loadingButtonContent !== null
							? props.savePost.loadingButtonContent
							: t("post")}
				</Button>
			</Modal.Footer>
		</>
	);
};

const mapStateToPros = (state) => ({
	savePost: state.post.savePost,
	fileUpload: state.post.fileUpload,
	fileRemove: state.post.fileRemove,
	searchUser: state.home.searchUser,
	postCategories: state.post.postCategories,
});

function mapDispatchToProps(dispatch) {
	return { dispatch };
}

export default connect(
	mapStateToPros,
	mapDispatchToProps
)(translate(CreatePostModal));
