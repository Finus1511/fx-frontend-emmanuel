import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Image,
  Table,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import { Link, useHistory } from "react-router-dom";
import "./Personalized.css";
import RejectionModal from "./RejectionModal";
import RejectedReasonModal from "./RejectedReasonModal";
import PersonalizedPassword from "./PersonalizedPassword";
import { prRequestListStart } from "../../store/actions/PersonalizeAction";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from "../../hooks/useSearchParams";
import * as Yup from "yup";
import { Field, Form as FORM, Formik } from "formik";
import { translate, t } from "react-multi-lang";
import PaymentModal from "./PaymentModal";
import NoDataFound from "../NoDataFound/NoDataFound";

const PersonalRequestTable = () => {
  const dispatch = useDispatch();
  const requestList = useSelector((state) => state.personalize.requestList);
  const history = useHistory();
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(12);
  const [modalShow, setModalShow] = useState(false);
  const [disModalShow, setDisModalShow] = useState(false);
  const [passwordModalShow, setPasswordModalShow] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);
  const [rejectedReasonModalShow, setRejectedReasonModalShow] = useState(false);
  const searchParams = useSearchParams();
  const formRef = useRef(null);
  const [filter, setFilter] = useState({
    search_key: searchParams.get("search_key")
      ? searchParams.get("search_key")
      : "",
  });

  useEffect(() => {
    dispatch(prRequestListStart({ skip: skip, take: take, ...filter }));
  }, [skip, filter]);

  const handlePayemnt = (user) => {
    if (user.type == "product" && user.product_type !== 1) {
      history.push("/your-address", {
        amount: user.amount,
        type: user.type,
        unique_id: user.unique_id,
      });
    } else {
      setPaymentModal(user);
    }
  };

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
                    <span className="personalized-request-back-info">
                      {t("back")}
                    </span>
                  </Link>
                  <div className="table-heading">
                    <h4>{t("my_request")}</h4>
                  </div>
                </div>
                {Object.keys(requestList.data).length > 0 && (
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
                            ? `/personal-request-table?search_key=${
                                val.search_key
                              }&sort_by=${searchParams.get("sort_by")}`
                            : `/personal-request-table?search_key=${val.search_key}`
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
                                          ? `/personal-request-table?sort_by=${searchParams.get(
                                              "sort_by"
                                            )}`
                                          : `/personal-request-table`
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

              {requestList.loading ? (
                <>
                  {[...Array(3)].map((item) => (
                    <Skeleton width="100%" height={60}></Skeleton>
                  ))}
                </>
              ) : Object.keys(requestList.data).length > 0 ? (
                <InfiniteScroll
                  dataLength={requestList.data.personalized_requests.length}
                  next={() => {
                    setSkip(skip + take);
                  }}
                  hasMore={
                    requestList.data.personalized_requests.length <
                    requestList.data.total
                  }
                  loader={
                    requestList.infiniteLoading &&
                    [...Array(4)].map(() => (
                      <Skeleton width="100%" height={60}></Skeleton>
                    ))
                  }
                >
                  <Table responsive className="personalized-request-table">
                    <thead>
                      <tr>
                        <th>{t("name")}</th>
                        <th>{t("creator")}</th>
                        <th>{t("request")}</th>
                        <th>{t("order_id")}</th>
                        <th>{t("amount")}</th>
                        <th>{t("description")}</th>
                        <th>{t("date")}</th>
                        <th>{t("status")}</th>
                        <th>{t("actions")}</th>
                      </tr>
                    </thead>
                    {requestList.data.personalized_requests.map(
                      (user, index) => (
                        <tbody>
                          <tr>
                            <td className="name">{user.sender.name}</td>
                            <td className="name">{user.receiver?.name || "N/A"}</td>
                            <td style={{textTransform:"capitalize"}}>{user.type == "product" ? user.product_type_formatted : user.type}</td>
                            <td>{user.unique_id}</td>
                            <td>
                              <div className="creater-flow-amount">
                                {user.amount_formatted}
                                {user.is_amount_update ? (
                                  <div className="amount-status-badge">
                                    Revised
                                  </div>
                                ) : null}
                              </div>
                            </td>
                            <td>
                              {/* <p>{user.description} </p>                       */}
                              <Button className="dis-modal-btn" onClick={() => setDisModalShow(user)}>
                                View Description
                              </Button>

                              { disModalShow ? <Modal
                                className="rejection-modal"
                                show={disModalShow}
                                onHide={() => setDisModalShow(false)}
                                size="md"
                                aria-labelledby="contained-modal-title-vcenter"
                                centered
                                backdrop="static" // This prevents closing the modal when clicking outside of it
                                // keyboard={false} // This prevents closing the modal with the escape key
                              >
                                <Modal.Header closeButton>
                                  Order ID - {disModalShow.unique_id}
                                </Modal.Header>
                                <Modal.Body>
                                  <p className="table-discription">{disModalShow.description}</p>
                                </Modal.Body>
                              </Modal>:null}
                            </td>
                            <td>{user.created_at}</td>
                            <td>
                              <div className="table-outline-btn ">
                                {user.status_formatted}
                              </div>
                            </td>
                            <td>
                              <div className="table-btn-sec">
                                {user.status == 1 ? (
                                  <Button
                                    className="table-cancel-btn"
                                    onClick={() =>
                                      setModalShow({
                                        unique_id: user.unique_id,
                                        type: "cancel",
                                      })
                                    }
                                  >
                                    {t("cancel")}
                                  </Button>
                                ) : user.status == 2 ? (
                                  <>
                                    <Button
                                      className="table-pay-btn"
                                      onClick={() =>
                                        handlePayemnt({
                                          unique_id: user.unique_id,
                                          type: user.type,
                                          product_type: user.product_type,
                                          amount: user.amount,
                                        })
                                      }
                                    >
                                      {t("pay")}
                                    </Button>
                                    <Button
                                      className="table-reject-btn"
                                      onClick={() =>
                                        setModalShow({
                                          unique_id: user.unique_id,
                                          type: "reject",
                                        })
                                      }
                                    >
                                      {t("reject")}
                                    </Button>
                                  </>
                                ) : user.status == 3 ? (
                                  <Button
                                    className="table-download-btn"
                                    onClick={() =>
                                      setRejectedReasonModalShow(user)
                                    }
                                  >
                                    {t("rejected_reason")}
                                  </Button>
                                ) : user.status == 5 ? (
                                  <div className="table-download-btn">
                                    {t("paid")}
                                  </div>
                                ) : user.status == 6 &&
                                  user.product_type == 1 ? (
                                  <Button
                                    className="table-download-btn"
                                    onClick={() => setPasswordModalShow(user)}
                                  >
                                    {t("download")}
                                  </Button>
                                ) : (
                                  user.status == 6 &&
                                  user.product_type == 2 && (
                                    <Button
                                      className="table-download-btn"
                                      onClick={() =>
                                        history.push(
                                          `/product-details/${user.unique_id}`
                                        )
                                      }
                                    >
                                      {t("view")}
                                    </Button>
                                  )
                                )}
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

      {modalShow && (
        <RejectionModal show={modalShow} onHide={() => setModalShow(false)} />
      )}

      {passwordModalShow && (
        <PersonalizedPassword
          show={passwordModalShow}
          onHide={() => setPasswordModalShow(false)}
        />
      )}

      {rejectedReasonModalShow && (
        <RejectedReasonModal
          show={rejectedReasonModalShow}
          onHide={() => setRejectedReasonModalShow(false)}
        />
      )}

      {paymentModal && (
        <PaymentModal
          show={paymentModal}
          onHide={() => setPaymentModal(false)}
        />
      )}
    </div>
  );
};

export default translate(PersonalRequestTable);
