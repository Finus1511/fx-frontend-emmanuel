import React, { useEffect, useRef, useState } from "react";
import {
	Table,
	Container,
	Row,
	Col,
	Button,
	Image,
	InputGroup,
} from "react-bootstrap";
import { Formik, Field, Form } from "formik";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Skeleton from "react-loading-skeleton";
import NoDataFound from "../NoDataFound/NoDataFound";
import PaymentModal from "../Accounts/Profile/PaymentModal";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import { creatorVirtualBookingAcceptStart, creatorVirtualBookingReceivedListStart, creatorVirtualBookingRejectStart } from "../../store/actions/CreatorVipVEAction";
import Answers from "./Answers";

const ReceivedBooking = () => {

	const formRef = useRef()
	const dispatch = useDispatch();
	const history = useHistory()
	const creatorVirtualBookingReceivedList = useSelector(state => state.creatorVipVE.creatorVirtualBookingReceivedList);
	const creatorVirtualBookingAccept = useSelector(state => state.creatorVipVE.creatorVirtualBookingAccept);
	const creatorVirtualBookingReject = useSelector(state => state.creatorVipVE.creatorVirtualBookingReject);
	const [search, setSearch] = useState({
		search_key: ""
	})
	const [paymentModal, setPaymentModal] = useState(false);
	const [VirtualData, setVirtualData] = useState(false);
	const [showAnswer, setShowAnswer] = useState("");
	const [skipRender, setSkipRender] = useState(true);

	useEffect(() => {
		dispatch(creatorVirtualBookingReceivedListStart(search))
	}, [search]);

	const handleSearch = (values) => {
		setSearch(values)
	}

	const handleClose = () => {
		setSearch({ ...search, search_key: "" })
		formRef.current.setFieldValue("search_key", "");
	}
	const openPaymentModal = (event, creator) => {
		event.preventDefault();
		setVirtualData(creator)
		setPaymentModal(true);
	};

	const closePaymentModal = () => {
		setPaymentModal(false);
	};

	const handleAccept = (unique_id) => {
		if (
			window.confirm("Are you sure to accept the booking?")
		) {
			dispatch(creatorVirtualBookingAcceptStart({unique_id}));
		}
	}

	const handleReject = (unique_id) => {
		if (
			window.confirm("Are you sure to reject the booking?")
		) {
			dispatch(creatorVirtualBookingRejectStart({unique_id}));
		}
	}

	useEffect(() => {
		if (!skipRender && 
			((!creatorVirtualBookingAccept.loading && Object.keys(creatorVirtualBookingAccept.data).length > 0) ||
			(!creatorVirtualBookingReject.loading && Object.keys(creatorVirtualBookingReject.data).length > 0))
		) {
			dispatch(creatorVirtualBookingReceivedListStart(search))
		}
		setSkipRender(false)
	}, [creatorVirtualBookingAccept, creatorVirtualBookingReject]);

	return (
		<>
			<div className="admin-booking-list-wrapped">
				<Container>
					<Row>
						<Col sm={12} md={12}>
							<div className="admin-booking-list-info">
								<a href="#" onClick={() => history.goBack()}
									className="bookmarkes-list notify-title back-button"
								>
									<Image
										src={
											window.location.origin +
											"/assets/images/icons/back.svg"
										}
										className="svg-clone"
									/>&nbsp;
									Virtual Experience Received Bookings
								</a>
								<p className="text-muted f-2">
									The list contains the virtual experience bookings received for you.
								</p>
							</div>
						</Col>
					</Row>
				</Container>
			</div>
			<Container>
				<Row>
					<Col md={12}>
						<div className="table-wrap">
							<Formik
								initialValues={{
									search_key: ""
								}}
								onSubmit={handleSearch}
								innerRef={formRef}
							>
								{({ setFieldValue, values }) => (
									<div className="new-feed-search-sec admin-booking-search">
										<Form>
											<InputGroup className="mb-0">
												<Field
													className="form-control"
													name="search_key"
													placeholder="search"
													aria-describedby="basic-addon2"
												/>
												<InputGroup.Text id="basic-addon2">
													{search.search_key && (<Button onClick={handleClose} className="btn btn-light mr-4">
														<Image
															src={
																window.location.origin +
																"/assets/images/icons/close.svg"
															}
														/>
													</Button>)
													}
													<Button type="submit"
														className="btn btn-light">
														<Image
															className="new-feeds-search-icon"
															src={
																window.location.origin +
																"/assets/images/feed-story/search-icon.svg"
															}
														/>
													</Button>
												</InputGroup.Text>
											</InputGroup>
										</Form>
									</div>
								)}
							</Formik>
							<div className="admin-booking-table">
								{creatorVirtualBookingReceivedList.loading ? ([...Array(3)].map((i, key) => (<Skeleton key={key} height={40} width={1050} />))) :
									(creatorVirtualBookingReceivedList.data && creatorVirtualBookingReceivedList.data.virtual_experience_bookings && Object.keys(creatorVirtualBookingReceivedList.data).length > 0 && creatorVirtualBookingReceivedList.data.virtual_experience_bookings.length > 0) ? (
										<Table hover className="m-0">
											<thead>
												<tr>
													<th>S.No</th>
													<th>Title</th>
													<th>Creator Name</th>
													<th>Amount</th>
													<th>Location</th>
													<th>Scheduled Date</th>
													<th>Status</th>
													<th>Action</th>
												</tr>
											</thead>
											<tbody>
												{creatorVirtualBookingReceivedList.data.virtual_experience_bookings.map((creator, i) => (
													<tr key={i}>
														<td>{i + 1}</td>
														<td>{creator.virtual_experience_info.title}</td>
														<td>{creator.user_info.name}</td>
														<td>{creator.amount}</td>
														<td>{creator.virtual_experience_info.location}</td>
														<td>{creator.virtual_experience_info.scheduled_date}</td>
														<td>{creator.status_formatted}</td>
														<td>
															<div className="btn-grid">
															<Button
																className="default-btn-grid"
																
																onClick={() =>
																	setShowAnswer(creator)
																}
															>
																View Answer
															</Button>
															{creator.status == 1 ? (<>
															<Button
																className="default-btn-grid"
																onClick={() => { handleAccept(creator.unique_id)}}
															>
																Accept
															</Button>
															<Button
																className="default-outline-grid"
																onClick={() => { handleReject(creator.unique_id)}}
															>
																Cancel
															</Button>
															</>) : null}
															</div>
															
														</td>
													</tr>
												))}
											</tbody>
										</Table>
									) : (<NoDataFound />)}
							</div>
						</div>
					</Col>
				</Row>
			</Container>
			<PaymentModal
				paymentModal={paymentModal}
				closePaymentModal={closePaymentModal}
				virtualExperiences={VirtualData}
			/>
			{showAnswer && (
				<Answers handleClose={() => setShowAnswer("")} show={showAnswer} />
			)}

		</>
	);
};
export default withRouter(ReceivedBooking);