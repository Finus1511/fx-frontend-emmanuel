import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import { Link, useHistory } from "react-router-dom";
import EditRequestModal from "./EditRequestModal";
import "./CreaterFlow.css";
// import RejectionModal from "./RejectionModal";
// import RejectedReasonModal from "./RejectedReasonModal";
// import PersonalizedPassword from "./PersonalizedPassword";
import { useSelector, useDispatch } from "react-redux";
import { prReceivedListStart } from "../../../store/actions/PersonalizeAction";
import Skeleton from "react-loading-skeleton";
import RejectedReasonModal from "./RejectedReasonModal";
import NoDataFound from "../../NoDataFound/NoDataFound";
import InfiniteScroll from "react-infinite-scroll-component";
import AddDigitalProductModal from "./AddDigitalProductModal";
import AcceptRequestModal from "./AcceptRequestModal";
import { useSearchParams } from "../../../hooks/useSearchParams";
import * as Yup from "yup";
import { Field, Form as FORM, Formik } from "formik";
import { translate, t } from "react-multi-lang";
import RejectedModal from "./RejectedModal";
import Tooltip from '@material-ui/core/Tooltip';

const CreatorFlowTable = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const receivedList = useSelector((state) => state.personalize.receivedList);
  const [editRequestModalShow, setEditRequestModalShow] = useState(false);
  const [acceptRequestModalShow, setAccepRequestModalShow] = useState(false);
  const [digitalProductModalShow, setDigitalProductModalShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [passwordModalShow, setPasswordModalShow] = useState(false);
  const [rejectedReasonModalShow, setRejectedReasonModalShow] = useState(false);
  const [rejectedModal, setRejectedModal] = useState(false);
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(12);
  const searchParams = useSearchParams();
  const [skipRender, setSkipRender] = useState(true);
  const [filter, setFilter] = useState({
    search_key: searchParams.get("search_key")
      ? searchParams.get("search_key")
      : "",
  });

  useEffect(() => {
    dispatch(prReceivedListStart({ skip: skip, take: take, ...filter }));
  }, [skip, filter]);

  useEffect(() => {
    setFilter({
      ...filter,
      search_key: searchParams.get("search_key")
        ? searchParams.get("search_key")
        : "",
    });
  }, [searchParams.get("search_key")]);

  const validationSchema = Yup.object().shape({
    search_key: Yup.string()
      .required(t("required"))
      .matches(/^(?=\S*$)/, t("white_space")),
  });

  return (
    <div className="new-home-page-sec">
      <Container fluid>
        <div className="personalized-request-box">
          <Row className="align-items-center">
            <Col md={12}>
              <div className="personalized-table-head">
                <div className="personalized-table-back">
                  <Link to="#" onClick={() => history.goBack()}>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        enableBackground="new 0 0 512 512"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#9f4298"
                          d="M4.943 5.606L1.024 9.525a3.585 3.585 0 000 4.95l3.919 3.919a1.5 1.5 0 102.121-2.121l-2.779-2.781 18.25-.023a1.5 1.5 0 001.5-1.5 1.5 1.5 0 00-1.5-1.5L4.3 10.492l2.764-2.765a1.5 1.5 0 00-2.121-2.121z"
                        ></path>
                      </svg>
                    </span>
                    <span
                      className="personalized-request-back-info"
                      onClick={() => history.goBack()}
                    >
                      Back
                    </span>
                  </Link>
                  <div className="table-heading">
                    <h4>Received Requests</h4>
                  </div>
                </div>
                {Object.keys(receivedList.data).length > 0 && (
                  <div className="personalized-table-search">
                    <Formik
                      initialValues={{
                        search_key: searchParams.get("search_key")
                          ? searchParams.get("search_key")
                          : "",
                      }}
                      validationSchema={validationSchema}
                      onSubmit={(val) => {
                        setFilter({
                          ...filter,
                          search_key: val.search_key,
                        });

                        history.push(
                          searchParams.get("sort_by")
                            ? `/creater-flow-table?search_key=${val.search_key
                            }&sort_by=${searchParams.get("sort_by")}`
                            : `/creater-flow-table?search_key=${val.search_key}`
                          // { state: { value: value } }
                        );
                      }}
                      innerRef={formRef}
                    >
                      {({ values, setFieldValue, resetForm }) => (
                        <FORM className="form">
                          <div className="efi-transation-search">
                            <InputGroup className="mb-0">
                              <Field
                                // placeholder={t("search_placeholder")}
                                placeholder={"Search"}
                                type="text"
                                className="form-control trans-form-control"
                                name="search_key"
                                onKeyPress={(event) => {
                                  if (event.key === "Enter") {
                                    event.preventDefault();
                                    formRef.current.handleSubmit();
                                  }
                                }}
                              />
                              {searchParams.get("search_key") ? (
                                <InputGroup.Text id="basic-addon1">
                                  <Button
                                    className="search-btn"
                                    onClick={() => {
                                      setFieldValue("search_key", "");
                                      setFilter({
                                        ...filter,
                                        search_key: "",
                                      });
                                      history.push(
                                        searchParams.get("sort_by")
                                          ? `/creater-flow-table?sort_by=${searchParams.get(
                                            "sort_by"
                                          )}`
                                          : `/creater-flow-table`
                                      );
                                    }}
                                  >
                                    <svg
                                      height="30"
                                      width="30"
                                      viewBox="0 0 20 20"
                                      aria-hidden="true"
                                      focusable="false"
                                      class="icon icon-tabler icons-tabler-outline icon-tabler-search"
                                    >
                                      <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
                                    </svg>
                                  </Button>
                                </InputGroup.Text>
                              ) : (
                                <InputGroup.Text id="basic-addon1">
                                  <Button className="search-btn" type="submit">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="20"
                                      height="20"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="#333"
                                      stroke-width="2"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    // class="icon icon-tabler icons-tabler-outline icon-tabler-search"
                                    >
                                      <path
                                        stroke="none"
                                        d="M0 0h24v24H0z"
                                        fill="none"
                                      />
                                      <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                                      <path d="M21 21l-6 -6" />
                                    </svg>
                                  </Button>
                                </InputGroup.Text>
                              )}
                            </InputGroup>
                          </div>
                        </FORM>
                      )}
                    </Formik>
                  </div>
                )}
              </div>
              {receivedList.loading ? (
                <>
                  {[...Array(3)].map((item) => (
                    <Skeleton width="100%" height={60}></Skeleton>
                  ))}
                </>
              ) : Object.keys(receivedList.data).length > 0 ? (
                <InfiniteScroll
                  dataLength={
                    receivedList.data.personalized_creator_requests.length
                  }
                  next={() => {
                    setSkip(skip + take);
                  }}
                  hasMore={
                    receivedList.data.personalized_creator_requests.length <
                    receivedList.data.total
                  }
                  loader={
                    <>
                      {receivedList.infiniteLoading &&
                        [...Array(3)].map((item) => (
                          <Skeleton width="100%" height={60}></Skeleton>
                        ))}
                    </>
                  }
                  style={{ height: "auto", overflow: "hidden" }}
                >
                  <Table responsive className="personalized-request-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Request</th>
                        <th>Order ID</th>
                        <th>Amount</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    {receivedList.data.personalized_creator_requests.map(
                      (item, index) => (
                        <tbody>
                          <tr>
                            <td className="name">{item.sender.name}</td>
                            <td style={{ textTransform: "capitalize" }}>{item.type == "product" ? item.product_type_formatted : item.type}</td>
                            <td>{item.unique_id}</td>
                            <td>
                              <div className="creater-flow-amount">
                                {item.amount_formatted}
                                {item.is_amount_update ? (
                                  <div className="amount-status-badge">
                                    Revised
                                  </div>
                                ) : null}
                              </div>
                            </td>
                            <td>
                              {/* <p>{item.description}</p> */}
                              <Button className="dis-modal-btn" onClick={() => setModalShow(item)}>
                                View Description
                              </Button>

                              {modalShow ? <Modal
                                className="rejection-modal"
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                                size="md"
                                aria-labelledby="contained-modal-title-vcenter"
                                centered
                                scrollable
                                backdrop="static"
                              >
                                <Modal.Header closeButton>
                                  <Modal.Title>
                                  {modalShow.unique_id}
                                  </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                  <p className="table-discription">{modalShow.description}</p>
                                </Modal.Body>
                              </Modal> : null}

                            </td>
                            <td>{item.created_at}</td>
                            <td>
                              <span className="table-outline-btn">
                                {item.status_formatted}
                              </span>
                            </td>
                            <td>
                              <div className="table-btn-sec">
                                {item.status == 1 ? (
                                  <React.Fragment>
                                    <Button
                                      className="table-pay-btn"
                                      onClick={() =>
                                        setAccepRequestModalShow(item)
                                      }
                                    >
                                      Accept
                                    </Button>
                                    <Button
                                      className="table-reject-btn"
                                      onClick={() =>
                                        setEditRequestModalShow(item)
                                      }
                                    >
                                      Edit
                                    </Button>
                                    <Button
                                      className="table-cancel-btn"
                                      onClick={() =>
                                        setRejectedReasonModalShow(item)
                                      }
                                    >
                                      Reject
                                    </Button>
                                  </React.Fragment>
                                ) : item.status == 5 ? (
                                  <Button
                                    className="table-cancel-btn"
                                    onClick={() =>
                                      item.type == "product" &&
                                        item.product_type == 2
                                        ? history.push(
                                          `/creater-product-detail/${item.id}`
                                        )
                                        : setDigitalProductModalShow(item)
                                    }
                                  >
                                    Add Product
                                  </Button>
                                ) : // : item.status == 6 ? (
                                  //   <Button
                                  //       className="table-cancel-btn"
                                  //       onClick={() => history.push(`/product-details/${item.unique_id}`)}
                                  //     >
                                  //       View Product
                                  //   </Button>)
                                  item.status == 3 ? (
                                    <Button
                                      className="table-download-btn"
                                      onClick={() =>
                                        setRejectedModal(item)
                                      }
                                    >
                                      {t("rejected_reason")}
                                    </Button>
                                  ) :
                                    null}
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      )
                    )}
                  </Table>
                </InfiniteScroll>
              ) : (
                <NoDataFound />
              )}
            </Col>
          </Row>
        </div>
      </Container>
      {/* <RejectionModal show={modalShow} onHide={() => setModalShow(false)} />
      <RejectedReasonModal
        show={rejectedReasonModalShow}
        onHide={() => setRejectedReasonModalShow(false)}
      /> */}
      {editRequestModalShow ? (
        <EditRequestModal
          show={editRequestModalShow}
          onHide={() => setEditRequestModalShow(false)}
        />
      ) : null}
      {rejectedReasonModalShow ? (
        <RejectedReasonModal
          show={rejectedReasonModalShow}
          onHide={() => setRejectedReasonModalShow(false)}
        />
      ) : null}
      {rejectedModal ? (
        <RejectedModal
          show={rejectedModal}
          onHide={() => setRejectedModal(false)}
        />
      ) : null}
      {digitalProductModalShow ? (
        <AddDigitalProductModal
          show={digitalProductModalShow}
          onHide={() => setDigitalProductModalShow(false)}
        />
      ) : null}
      {acceptRequestModalShow ? (
        <AcceptRequestModal
          show={acceptRequestModalShow}
          onHide={() => setAccepRequestModalShow(false)}
        />
      ) : null}
    </div>
  );
};

export default CreatorFlowTable;
