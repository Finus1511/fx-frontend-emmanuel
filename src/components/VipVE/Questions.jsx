import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Button, Form, Image, Media, Modal } from "react-bootstrap";
import "../Accounts/Profile/NewProfile.css";
import "react-loading-skeleton/dist/skeleton.css";
import "@djthoms/pretty-checkbox";
import { Formik, Form as FORM, Field, ErrorMessage } from "formik";
import { translate, t } from "react-multi-lang";
import * as Yup from "yup";
import { useDispatch } from "react-redux";

const Questions = (props) => {

	const dispatch = useDispatch();

	const handleFormSubmit = (values) => {
    console.log("Form values by index:", values);
    // Perform further actions with the form values
  };

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
                        name={index.toString()} // Name as index
                        className="form-control"
                      />
                    ) : (
                      <Field
                        type={question.type}
                        name={index.toString()} // Name as index
                        className="form-control"
                      />
                    )}
											</Form.Group>
										</div>
									</li>
								))}
							</ul>
							<Button
					variant="primary"
					className="btn gradient-btn postBtn gradientcolor text-uppercase w-unset"
					type="submit"
				>
					Submit
				</Button>
						</FORM>
					</Formik>
				</div>
			</Modal.Body>
			<Modal.Footer>
				{/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
				<Button
					variant="primary"
					className="btn gradient-btn postBtn gradientcolor text-uppercase w-unset"
					onClick={props.handleClose}
				>
					Submit
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default translate(Questions);