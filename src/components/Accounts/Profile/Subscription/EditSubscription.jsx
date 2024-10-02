import React, { useEffect, useState } from "react";
import { Button, Col, Form, Image, Row } from "react-bootstrap";
import { Formik, Form as FORM, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from 'react-router-dom';
import { fetchSingleSubscriptionStart, subscriptionSaveStart } from "../../../../store/actions/SubscriptionAction";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import * as Yup from 'yup';
import SettingsSidebar from "../SettingsSidebar";

const EditSubscription = (props) => {

	const dispatch = useDispatch();
	const { subscription_id } = useParams();
	const history = useHistory();

	const subscriptionSave = useSelector((state) => state.subscriptions.subscriptionSave);
	const singleSubscription = useSelector((state) => state.subscriptions.singleSubscription);
	const profile = useSelector((state) => state.users.profile);

	const [imagePreview, setImagePreview] = useState(null);
	const [initialRender, setInitialRender] = useState(true);

	useEffect(() => {
		if (subscription_id) {
			dispatch(fetchSingleSubscriptionStart({
				subscription_id: subscription_id
			}));
		}
	}, [])

	useEffect(() => {
		if (!initialRender && !subscriptionSave.loading && Object.keys(subscriptionSave.data).length > 0) {
			history.push('/manage-subscription');
		}
		setInitialRender(false);
	}, [subscriptionSave]);

	// Validation schema
	const SubscriptionSchema = Yup.object().shape({
		title: Yup.string()
			.required("Title is required")
			.min(3, "Title must be at least 3 characters"),
		amount: Yup.number()
			.required("Amount is required")
			.positive("Amount must be a positive number")
			.typeError("Amount must be a number"),
		plan_type: Yup.string()
			.required("Duration is required"),
		plan: Yup.number()
			.required("Number of Duration is required")
			.positive("Duration must be a positive number")
			.integer("Duration must be an integer")
			.typeError("Number of Duration must be a number"),
		description: Yup.string()
			.required("Description is required"),
		discount: Yup.string()
			.required("Discount is required")
	});

	const renderSkeletonLoader = () => (
		<div>
			<div className="sub-add-btn">
				<Skeleton width={150} height={40} />
			</div>
			<Row>
				<Col md={6} className="mb-4">
					<Skeleton width={150} height={30} />
					<Skeleton height={50} />
				</Col>
				<Col md={6} className="mb-4">
					<Skeleton width={150} height={30} />
					<Skeleton height={50} />
				</Col>
				<Col md={6} className="mb-4">
					<Skeleton width={150} height={30} />
					<Skeleton height={50} />
				</Col>
				<Col md={6} className="mb-4">
					<Skeleton width={150} height={30} />
					<Skeleton height={50} />
				</Col>
				<Col md={6} className="mb-4">
					<Skeleton width={150} height={30} />
					<Skeleton height={50} />
				</Col>
				<Col md={6} className="mb-4">
					<Skeleton width={150} height={30} />
					<Skeleton height={50} />
				</Col>
				<Col md={12}>
					<Skeleton height={200} width={1280} />
				</Col>
			</Row>
		</div>
	);

	const handleImageChange = (event) => {
		if (event.currentTarget.type === "file") {
			const file = event.currentTarget.files[0];
			if (file) {
				const reader = new FileReader();
				reader.onloadend = () => {
					setImagePreview(reader.result);
				};
				reader.readAsDataURL(file);
			}
		}
	};

	const handleSubmit = (values) => {
		dispatch(subscriptionSaveStart(values));
	};

	return (
		<div className="new-settings-sec new-change-password">
			<div className="new-settings-box">
				<SettingsSidebar />
				<div className="new-settings-main-wrapper">
					<div className="settings-personal-info-card">
						<div className="settings-personal-info-header">
							<h3>Manage Subscription</h3>
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit.
								Inventore officiis nostrum voluptatibus error. Non
								exercitationem, voluptas laborum, molestiae reiciendis dolorum
								enim eligendi fuga harum inventore maiores officiis adipisci
								voluptates delectus!
							</p>
						</div>

						{singleSubscription.loading ? (renderSkeletonLoader()) : Object.keys(singleSubscription.data).length > 0 ? (
							<div className="">
								<div className="sub-add-btn">
									<button className="settings-submit-btn" onClick={() => history.push('/manage-subscription')}>Show Subscriptions</button>
								</div>
								<Formik
									initialValues={{
										subscription_id: singleSubscription.data.subscription_id || "",
										picture: "",
										title: singleSubscription.data.title || "",
										amount: singleSubscription.data.amount || 0,
										plan_type: singleSubscription.data.plan_type || "days",
										plan: singleSubscription.data.plan || 0,
										description: singleSubscription.data.description || "",
										discount: singleSubscription.data.discount || "",
									}}
									validationSchema={SubscriptionSchema}
									onSubmit={(values) => { handleSubmit(values) }}
								>
									{({ setFieldValue, values }) => (
										<FORM className="edit-profile-form">
											<Row>
												<Col md={6}>
													<Form.Group>
														<Form.Label>Title</Form.Label>
														<Field
															type="text"
															name="title"
															placeholder="Enter here"
															className="form-control"
														/>
														<ErrorMessage name="title" component="div" className="text-danger" />
													</Form.Group>
												</Col>
												<Col md={6}>
													<Form.Group>
														<Form.Label>Amount</Form.Label>
														<Field
															type="number"
															name="amount"
															placeholder="Enter here"
															className="form-control"
														/>
														<ErrorMessage name="amount" component="div" className="text-danger" />
													</Form.Group>
												</Col>
												<Col md={6}>
													<Form.Group>
														<Form.Label>Select Duration</Form.Label>
														<Field
															as="select"
															name="plan_type"
															className="form-control mr-sm-2"
														>
															<option value="days">Days</option>
															<option value="months">Months</option>
															<option value="years">Years</option>
														</Field>
														<ErrorMessage name="plan_type" component="div" className="text-danger" />
													</Form.Group>
												</Col>
												<Col md={6}>
													<Form.Group>
														<Form.Label>Number of Duration</Form.Label>
														<Field
															type="number"
															name="plan"
															placeholder="Enter here"
															className="form-control"
														/>
														<ErrorMessage name="plan" component="div" className="text-danger" />
													</Form.Group>
												</Col>
												<Col md={6}>
													<Form.Group>
														<Form.Label>Description</Form.Label>
														<Field
															type="text"
															name="description"
															placeholder="Enter here"
															className="form-control"
														/>
														<ErrorMessage name="description" component="div" className="text-danger" />
													</Form.Group>
												</Col>
												<Col md={6}>
													<Form.Group>
														<Form.Label>Upload image</Form.Label>
														<div className="custom-file">
															<div className="custom-file__box">
																<label htmlFor="input-file" className="cursor-pointer">
																	<div className="custom-file__center">
																		<p>Upload Image</p>
																	</div>
																</label>
																<input
																	id="input-file"
																	type="file"
																	name="picture"
																	accept="image/*"
																	onChange={(event) => {
																		setFieldValue("picture", event.currentTarget.files[0]);
																		handleImageChange(event)
																	}}
																/>
															</div>
															<ErrorMessage name="picture" component="div" className="text-danger" />
														</div>
													</Form.Group>
												</Col>
												<Col md={6}>
													<Form.Group>
														<Form.Label>Discount</Form.Label>
														<ReactQuill
															value={values.discount}
															onChange={(value) => setFieldValue("discount", value)}
														/>
														<ErrorMessage name="discount" component="div" className="text-danger" />
													</Form.Group>
												</Col>
												<Col md={6}>
													{/* {imagePreview && ( */}
													<Image
														src={imagePreview || singleSubscription.data.picture}
														style={{ width: "40em", height: "auto", marginTop: "10px" }}
													/>
													{/* )} */}
												</Col>
											</Row>
											<Row>
												<Col sm={12} xs={12} md={12}>
													<div className="settings-btn-sec">
														<Button className="settings-submit-btn" type="submit" disabled={subscriptionSave.loading}>
															{subscriptionSave.loading ? "Loading" : "Submit"}
														</Button>
													</div>
												</Col>
											</Row>
										</FORM>
									)}
								</Formik>
							</div>
						) : null}
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditSubscription;
