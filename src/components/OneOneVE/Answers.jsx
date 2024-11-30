import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Button, Form, Image, Media, Modal } from "react-bootstrap";
import "../Accounts/Profile/NewProfile.css";
import "react-loading-skeleton/dist/skeleton.css";
import "@djthoms/pretty-checkbox";
import { Formik, Form as FORM, Field, ErrorMessage } from "formik";
import { translate, t } from "react-multi-lang";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { creatorVipVEUpdateAnswerStart, creatorVirtualViewAnswerStart } from "../../store/actions/CreatorVipVEAction";
import { getErrorNotificationMessage } from "../helper/NotificationMessage";
import NoDataFound from "../NoDataFound/NoDataFound";

const Answers = (props) => {

	const dispatch = useDispatch();

	const viewAnswers = useSelector((state) => state.creatorVipVE.viewAnswers);

	useEffect(() => {
		dispatch(creatorVirtualViewAnswerStart({
			virtual_experience_id: props.show.virtual_experience_info.ve_vip_id,
			user_id: props.show.user_id
		}))
	}, []);

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
				<Modal.Title>Answers</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="question-list">
					<Formik >
						<FORM>
							<ul>
								{viewAnswers.loading ? "Loading" :
									Object.keys(viewAnswers.data).length > 0 && Object.keys(viewAnswers.data.answers).length > 0 ?
										viewAnswers.data.answers.map((data, index) => (
											<li>
												<div className="question-list-flex">
													<h4>{data.question.question}</h4>
												</div>
												<div className="">
													<p>{data.answer}</p>
												</div>
											</li>
										)) : <NoDataFound />}
							</ul>
						</FORM>
					</Formik>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" className="btn gradient-btn postBtn gradientcolor text-uppercase w-unset" onClick={props.handleClose}>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default translate(Answers);