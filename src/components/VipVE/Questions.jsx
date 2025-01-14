import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Button, Form, Image, Media, Modal } from "react-bootstrap";
import "../Accounts/Profile/NewProfile.css";
import "react-loading-skeleton/dist/skeleton.css";
import "@djthoms/pretty-checkbox";
import { Formik, Form as FORM, Field, ErrorMessage } from "formik";
import { translate, t } from "react-multi-lang";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { creatorVipVEUpdateAnswerStart } from "../../store/actions/CreatorVipVEAction";
import { getErrorNotificationMessage } from "../helper/NotificationMessage";

const Questions = (props) => {

	const dispatch = useDispatch();

	const userVirtualDetails = useSelector((state) => state.creatorVipVE.creatorVirtualExperienceView);
	const updateAnswer = useSelector((state) => state.creatorVipVE.creatorVirtualExperienceUpdateAnswer);

	const [skipRender, setSkipRender] = useState(true)

	const handleFormSubmit = (values) => {
		if (Object.keys(userVirtualDetails.data).length > 0) {
			const filteredData = Object.fromEntries(
				Object.entries(values).filter(([key, value]) => value.toString().trim() !== "")
			);
			dispatch(creatorVipVEUpdateAnswerStart({
				virtual_experience_id: userVirtualDetails.data.virtual_experience.id,
				answers: JSON.stringify(filteredData)
			}));
		} else {
			getErrorNotificationMessage("Virtual Experience details not found.");
		}
	};

	useEffect(() => {
		if (!skipRender && !updateAnswer.loading && Object.keys(updateAnswer.data).length > 0) {
			props.handleClose()
		}
		setSkipRender(false)
	}, [updateAnswer]);

	return (
		<Modal
			show={props.show}
			backdrop="static"
			keyboard={false}
			size="md"
			centered
			onHide={props.handleClose}
			className="pay-amount-modal new-upload"
		>
			<Modal.Header closeButton>
				<Modal.Title>Question</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="question-list">
					<Formik
						initialValues={props.questions.reduce((acc, _, index) => {
							acc[index] = ""; // Initialize all fields with empty strings
							return acc;
						}, {})}
						onSubmit={handleFormSubmit}
					>
						<FORM>
							<ul>
								{props.questions.map((question, index) => (
									<li>
										<div className="question-list-flex">
											<h4>{question.question}</h4>
										</div>
										<div className="">
											<Form.Group>
												{question.type === "textarea" ? (
													<Field
														as="textarea"
														name={question.id ?? index.toString()} // Name as index
														className="form-control"
													/>
												) : (
													<Field
														type={question.type}
														name={question.id ?? index.toString()} // Name as index
														className="form-control"
													/>
												)}
											</Form.Group>
										</div>
									</li>
								))}
							</ul>
							<div className="btn-left">
							<Button
								variant="primary"
								className="btn gradient-btn postBtn gradientcolor text-uppercase w-unset"
								type="submit"
								disabled={updateAnswer.buttonDisable}
							>
								{updateAnswer.buttonDisable ? "Loading" : "Submit"}
							</Button>
							</div>
						</FORM>
					</Formik>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default translate(Questions);