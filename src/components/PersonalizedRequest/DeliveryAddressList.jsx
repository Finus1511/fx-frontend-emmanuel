import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Col, Form, Image, Button } from "react-bootstrap";
import { Link, useHistory, useLocation } from "react-router-dom";
import "./Personalized.css";
import { useDispatch, useSelector } from "react-redux";
import { prDeliveyAddressListStart } from "../../store/actions/PersonalizeAction";
import Skeleton from "react-loading-skeleton";
import { Form as FORM, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PaymentModal from "./PaymentModal";
import { translate, t } from "react-multi-lang";
import NoDataFound from "../NoDataFound/NoDataFound";

const DeliveryAddressList = () => {
  const location = useLocation();
  const formRef = useRef();
  const [paymentModal, setPaymentModal] = useState(false);
  const dispatch = useDispatch();
  const deliveryAddressList = useSelector(
    (state) => state.personalize.deliveryAddressList
  );
  const history = useHistory();
  useEffect(() => {
    dispatch(prDeliveyAddressListStart());
  }, []);

  const rejectionSchema = Yup.object().shape({
    address: Yup.mixed().required("Required *"),
  });

  const handleSubmit = (values) => {
    setPaymentModal({
      personalized_delivery_address_id: values.address,
      amount: location.state.amount,
      type: location.state.type,
      unique_id: location.state.unique_id,
    });
  };

  return (
    <div className="new-home-page-sec">
      <Container fluid>
        {deliveryAddressList.loading ? (
          <div className="personalized-request-box">
            <div className="personalized-table-head">
              <div className="personalized-table-back">
                <Skeleton width={75} borderRadius={10} height={20} />
                <div className="table-heading">
                  <Skeleton width={100} height={20} />
                </div>
              </div>
              <div className="h">
                <Skeleton width={200} borderRadius={10} height={50} />
              </div>
            </div>
            <Row className="align-items-center justify-content-center">
              <>
                <Col md={7}>
                  <div className="your-address-row">
                    {[...Array(4)].map((item, index) => (
                      <div className="your-address-card" key={index}>
                        <div class="form-check">
                          <Skeleton
                            width={1000}
                            borderRadius={10}
                            height={120}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </Col>
                <Col md={5} className="resp-display-none">
                  <div class="personal-request-img-sec">
                    <Image
                      className="your-address-img"
                      src={
                        window.location.origin +
                        "/assets/images/delivery-from.png"
                      }
                      alt=""
                    />
                  </div>
                </Col>
              </>
            </Row>
          </div>
        ) : Object.keys(deliveryAddressList.data).length > 0 ? (
          <div className="personalized-request-box">
            <div className="personalized-table-head">
              <div className="personalized-table-back">
                <Link to="/personal-request-table">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
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
                  <h4>{t("your_address")}</h4>
                </div>
              </div>
              <div className="h">
                <Button
                  className="default-btn profile-sidebar-broadcast-btn"
                  type="button"
                  onClick={() =>
                    history.push("/delivery-address", {
                      amount: location.state.amount,
                      type: location.state.type,
                      unique_id: location.state.unique_id,
                    })
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <g clipPath="url(#clip0_259_586)">
                      <path
                        fill="#fff"
                        d="M20 1v3h3v2h-3v3h-2V6h-3V4h3V1h2zm-8 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm1-9.94v2.02A6.53 6.53 0 0012 5c-3.35 0-6 2.57-6 6.2 0 2.34 1.95 5.44 6 9.14 4.05-3.7 6-6.79 6-9.14V11h2v.2c0 3.32-2.67 7.25-8 11.8-5.33-4.55-8-8.48-8-11.8C4 6.22 7.8 3 12 3c.34 0 .67.02 1 .06z"
                      ></path>
                    </g>
                    <defs>
                      <clipPath id="clip0_259_586">
                        <path fill="#fff" d="M0 0H24V24H0z"></path>
                      </clipPath>
                    </defs>
                  </svg>
                  {t("add_address")}
                </Button>
              </div>
            </div>
            <Row className="align-items-center justify-content-center">
              <>
                <Col md={7}>
                  <div className="your-address-row">
                    <Formik
                      initialValues={{
                        address: "",
                      }}
                      validationSchema={rejectionSchema}
                      onSubmit={handleSubmit}
                      innerRef={formRef}
                    >
                      {({ errors, touched, setFieldValue, resetForm }) => (
                        <FORM>
                          {deliveryAddressList.data.delivery_addresses.map(
                            (address, index) => (
                              <div className="your-address-card" key={index}>
                                <div class="form-check">
                                  <label class="form-check-label" for={index}>
                                    <input
                                      class="form-check-input"
                                      type="checkbox"
                                      name="service_type"
                                      id={index}
                                      checked={
                                        address.id ===
                                        formRef.current?.values.address
                                      }
                                      onChange={() => {
                                        formRef.current.setFieldValue(
                                          "address",
                                          address.id
                                        );
                                      }}
                                    />
                                    <div className="your-address-item">
                                      <div className="check-tick">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="25"
                                          height="25"
                                          enableBackground="new 0 0 512 512"
                                          viewBox="0 0 24 24"
                                        >
                                          <path
                                            fill="#9f4298"
                                            d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0zm-.091 15.419a2.001 2.001 0 01-2.823-.005l-2.782-2.696 1.393-1.437 2.793 2.707 5.809-5.701 1.404 1.425-5.793 5.707z"
                                            data-original="#000000"
                                          ></path>
                                        </svg>
                                      </div>
                                      <div className="your-address-box">
                                        <div className="your-address-card-head">
                                          <div className="your-address-card-checkobox">
                                            <h4>{address.name}</h4>
                                          </div>
                                          <div className="your-address-card-action">
                                            {/* <Button className="edit-btn">
                                              Edit
                                            </Button>
                                            <span className="your-address-line"></span>
                                            <Button className="remove-btn">
                                              Remove
                                            </Button> */}
                                          </div>
                                        </div>
                                        <div className="your-address-detail">
                                          <p>
                                            {address.address},{address.city},{" "}
                                            {address.state},{address.country} -{" "}
                                            {address.pincode}, {t("landmark")}-
                                            {address.landmark},
                                            {t("contact_number")}:+
                                            {address.country_code}-
                                            {address.contact_number}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </label>
                                </div>
                              </div>
                            )
                          )}
                          <ErrorMessage
                            component="div"
                            name="address"
                            className="errorMsg mt-3"
                          />

                          <Button className="table-download-btn" type="submit">
                            {t("next")}
                          </Button>
                        </FORM>
                      )}
                    </Formik>
                  </div>
                </Col>
                <Col md={5} className="resp-display-none">
                  <div class="personal-request-img-sec">
                    <Image
                      className="your-address-img"
                      src={
                        window.location.origin +
                        "/assets/images/delivery-from.png"
                      }
                      alt=""
                    />
                  </div>
                </Col>
              </>
            </Row>
          </div>
        ) : (
          <NoDataFound />
        )}
      </Container>
      {paymentModal && (
        <PaymentModal
          show={paymentModal}
          onHide={() => setPaymentModal(false)}
        />
      )}
    </div>
  );
};

export default translate(DeliveryAddressList);
