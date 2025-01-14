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
import { creatorVirtualBookingListStart, creatorVirtualExperienceListStart } from "../../../store/actions/CreatorVirtualAction";
import Skeleton from "react-loading-skeleton";
import NoDataFound from "../../NoDataFound/NoDataFound";
import PaymentModal from "./PaymentModal";
import { videoCallBroadcastStart } from "../../../store/actions/LiveVideoAction";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";


const VitrualExperienceList = () => {

  const formRef = useRef()
  const dispatch = useDispatch();
  const history = useHistory()
  const currentRoute = history.location.pathname;
  const creatorBooking = useSelector(state => state.creatorVirtual.creatorVirtualBookingList);
  const userVirtualExperienceCreatedList = useSelector(state => state.creatorVirtual.userVirtualExperienceCreatedList);
  const [listData, setListData] = useState(currentRoute == "/user-created-list" ? userVirtualExperienceCreatedList : creatorBooking);
  const [search, setSearch] = useState({
    search_key: "",
    skip: 0,
    take: 12
  })
  const [paymentModal, setPaymentModal] = useState(false);
  const [VirtualData, setVirtualData] = useState(false);

  useEffect(() => {
    if (currentRoute == "/user-created-list") {
      dispatch(creatorVirtualExperienceListStart(search))
    }
    else {
      dispatch(creatorVirtualBookingListStart(search))
    }
  }, [search, currentRoute]);

  useEffect(() => {
    setListData(currentRoute === "/user-created-list" ? userVirtualExperienceCreatedList : creatorBooking)
  }, [currentRoute, userVirtualExperienceCreatedList, creatorBooking]);

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

  return (
    <>
      <div className="admin-booking-list-wrapped">
        <Container>
          <Row>
            <Col sm={12} md={12}>
              <div className="admin-booking-list-info">
                <a href="#" onClick={()=> history.goBack()}
                  className="bookmarkes-list notify-title back-button"
                >
                  <Image
                    src={
                      window.location.origin +
                      "/assets/images/icons/back.svg"
                    }
                    className="svg-clone"
                  />&nbsp;
                  Virtual Experience {currentRoute == "/user-created-list" ? "Creations" : "Bookings"}
                </a>
                <p className="text-muted f-2">
                  The list contains the virtual experience {currentRoute == "/user-created-list" ? "requests" : "bookings"} made by you.
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
              {currentRoute == "/user-created-list" ? <div className="admin-booking-table">
                {listData.loading ? ([...Array(3)].map((i, key) => (<Skeleton key={key} height={40} width={1050} />))) :
                  (listData.data && listData.data.virtual_experiences && Object.keys(listData.data).length > 0 && listData.data.virtual_experiences.length > 0) ? (
                    <Table hover className="m-0">
                      <thead>
                        <tr>
                          <th>S.No</th>
                          <th>Title</th>
                          <th>Creator Name</th>
                          <th>Amount</th>
                          <th>Capacity</th>
                          <th>Scheduled Date</th>
                          <th>Start Time</th>
                          <th>End Time</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {listData.data.virtual_experiences.map((creator, i) => (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{creator.title}</td>
                            <td>{creator.user_info.name}</td>
                            <td>{creator.price_per_formatted}</td>
                            <td>{creator.total_capacity}</td>
                            <td>{creator.start_date}</td>
                            <td>{creator.start_time}</td>
                            <td>{creator.end_time}</td>
                            <td>{creator.status_formatted}</td>
                            <td>
                              <Link to={`/user-virtual-details/${creator.unique_id}`}>
                                View
                              </Link >
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  ) : (<NoDataFound />)}
              </div> : <div className="admin-booking-table">
                {listData.loading ? ([...Array(3)].map((i, key) => (<Skeleton key={key} height={40} width={1050} />))) :
                  (listData.data && listData.data.virtual_experience_bookings && Object.keys(listData.data).length > 0 && listData.data.virtual_experience_bookings.length > 0) ? (
                    <Table hover className="m-0">
                      <thead>
                        <tr>
                          <th>S.No</th>
                          <th>Title</th>
                          <th>Creator Name</th>
                          <th>Amount</th>
                          <th>Capacity</th>
                          <th>Scheduled Date</th>
                          <th>Start Time</th>
                          <th>End Time</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {listData.data.virtual_experience_bookings.map((creator, i) => (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{creator.virtual_experience_info.title}</td>
                            <td>{creator.user_info.name}</td>
                            <td>{creator.total}</td>
                            <td>{creator.total_capacity}</td>
                            <td>{creator.virtual_experience_info.start_date}</td>
                            <td>{creator.virtual_experience_info.start_time}</td>
                            <td>{creator.virtual_experience_info.end_time}</td>
                            <td>{creator.status_formatted}</td>
                            <td>
                              <Link to={`/user-virtual-details/${creator.virtual_experience_info.unique_id}`}>
                                View
                              </Link >
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  ) : (<NoDataFound />)}
              </div>}
            </div>
          </Col>
        </Row>
      </Container>
      <PaymentModal
        paymentModal={paymentModal}
        closePaymentModal={closePaymentModal}
        virtualExperiences={VirtualData}
      />
    </>
  );
};
export default withRouter(VitrualExperienceList);