import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Image, Button } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import { useHistory } from "react-router-dom";
import "./Personalized.css";
import Collapsible from "react-collapsible";
import { Formik, Form as FORM, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { translate, t } from "react-multi-lang";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { prStoreStart } from "../../store/actions/PersonalizeAction";

const PersonalizedRequest = () => {
  const history = useHistory();
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState();
  const [productType, setProductType] = useState(1);
  const params = useParams();
  const dispatch = useDispatch();
  const prStore = useSelector((state) => state.personalize.prStore);
  const [skipRender, setSkipRender] = useState(true);

  const validationSchema = Yup.object().shape({
    amount: Yup.number()
      .required("Amount is required")
      .min(0.1, "Amount must be at least 0.1")
      .max(1000, "Amount can be max least 1000")
      .test("is-number", "Amount must be a number", (value) => !isNaN(value)),
    description: Yup.string().required(t("required")),
  });

  useEffect(() => {
    setStep(1);
  }, []);

  const handleSubmit = (values) => {
    dispatch(
      prStoreStart(
        selectedType == "product"
          ? {
            ...values,
            type: selectedType,
            product_type: productType,
            receiver_id: params.id,
          }
          : {
            ...values,
            type: selectedType,
            product_type: productType,
            receiver_id: params.id,
          }
      )
    );
  };

  useEffect(() => {
    if (
      !skipRender &&
      !prStore.loading &&
      Object.keys(prStore.data).length > 0
    ) {
      history.push("/personal-request-table");
    }
    setSkipRender(false);
  }, [prStore]);

  return (
    <div className="new-home-page-sec">
      <Container>
        <div className="personalized-request-sec">
          {step == 1 && (
            <Row className="align-items-center justify-content-center">
              <Col md={12} lg={6} xl={6}>
                <div
                  className="personalized-request-back"
                  onClick={() => history.goBack()}
                >
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
                  <span className="personalized-request-back-info-2">Back</span>
                </div>
                <div className="personalized-request-head">
                  <h4>Personalized Request</h4>
                  <p>Please choose from the options below</p>
                </div>
                <div className="services-card-wrapped">
                  <div class="form-check">
                    <label class="form-check-label" for="1">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        name="service_type"
                        id="1"
                        onClick={() => setSelectedType("video")}
                        checked={selectedType == "video"}
                      />
                      <div className="service-card-custome">
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
                        <div className="service-card-custome-sec">
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="22"
                              height="22"
                              enableBackground="new 0 0 512 512"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="#131615"
                                d="M22.575 10.152a2.304 2.304 0 00-2.517.5l-.438.438a5.034 5.034 0 00-2.189-2.458 4.986 4.986 0 001.568-3.633c0-2.757-2.243-5-5-5a4.997 4.997 0 00-4 2.003 4.994 4.994 0 00-4-2.003A5.007 5.007 0 001 5c0 1.429.603 2.721 1.568 3.633A5.004 5.004 0 000 13v6c0 2.757 2.243 5 5 5h10a5.008 5.008 0 004.621-3.09l.438.438a2.303 2.303 0 002.516.501A2.3 2.3 0 0024 19.716v-7.429c0-.938-.56-1.775-1.425-2.133zM14 2c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3zM6 2c1.654 0 3 1.346 3 3S7.654 8 6 8 3 6.654 3 5s1.346-3 3-3zm12 17c0 1.654-1.346 3-3 3H5c-1.654 0-3-1.346-3-3v-6c0-1.654 1.346-3 3-3h10c1.654 0 3 1.346 3 3v6zm4 .714c0 .171-.104.25-.191.286a.29.29 0 01-.337-.067L20 18.461v-4.922l1.472-1.472a.29.29 0 01.337-.067.291.291 0 01.191.286v7.429z"
                                data-original="#000000"
                              ></path>
                            </svg>
                          </span>
                          <span className="service-card-custome-info">
                            Video
                          </span>
                        </div>
                      </div>
                    </label>
                  </div>
                  <div class="form-check">
                    <label class="form-check-label" for="2">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        name="service_type"
                        id="2"
                        onClick={() => setSelectedType("image")}
                        checked={selectedType == "image"}
                      />
                      <div className="service-card-custome">
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
                        <div className="service-card-custome-sec">
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="21"
                              fill="none"
                              viewBox="0 0 20 21"
                            >
                              <g fill="#000" clipPath="url(#clip0_41_421)">
                                <path d="M15.833.5H4.167A4.172 4.172 0 000 4.667v11.666A4.172 4.172 0 004.167 20.5h11.666A4.172 4.172 0 0020 16.333V4.667A4.172 4.172 0 0015.833.5zM4.167 2.167h11.666a2.5 2.5 0 012.5 2.5v11.666a2.459 2.459 0 01-.25 1.071l-7.635-7.636a4.166 4.166 0 00-5.894 0l-2.887 2.887V4.667a2.5 2.5 0 012.5-2.5zm0 16.666a2.5 2.5 0 01-2.5-2.5v-1.321l4.065-4.065a2.501 2.501 0 013.536 0l7.636 7.636c-.333.163-.7.249-1.07.25H4.166z"></path>
                                <path d="M13.333 9.25a2.916 2.916 0 100-5.833 2.916 2.916 0 000 5.833zm0-4.167a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z"></path>
                              </g>
                              <defs>
                                <clipPath id="clip0_41_421">
                                  <path
                                    fill="#fff"
                                    d="M0 0H20V20H0z"
                                    transform="translate(0 .5)"
                                  ></path>
                                </clipPath>
                              </defs>
                            </svg>
                          </span>
                          <span className="service-card-custome-info">
                            Image
                          </span>
                        </div>
                      </div>
                    </label>
                  </div>
                  <div class="form-check">
                    <label class="form-check-label" for="3">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        name="service_type"
                        id="3"
                        onClick={() => setSelectedType("audio")}
                        checked={selectedType == "audio"}
                      />
                      <div className="service-card-custome">
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
                        <div className="service-card-custome-sec">
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="23"
                              height="23"
                              fill="none"
                              viewBox="0 0 23 23"
                            >
                              <path
                                fill="#000"
                                d="M11.5 19.167a7.675 7.675 0 007.667-7.667V7.667a7.667 7.667 0 00-15.334 0V11.5a7.675 7.675 0 007.667 7.667zM5.75 8.625h3.833V6.708H5.836a5.743 5.743 0 0111.328 0h-3.747v1.917h3.833v1.917h-3.833v1.916h3.747a5.743 5.743 0 01-11.328 0h3.747v-1.916H5.75V8.625z"
                              ></path>
                              <path
                                fill="#000"
                                d="M21.083 12.458a8.634 8.634 0 01-8.625 8.625h-1.916a8.636 8.636 0 01-8.625-8.625H0A10.554 10.554 0 0010.542 23h1.916A10.555 10.555 0 0023 12.458h-1.917z"
                              ></path>
                            </svg>
                          </span>
                          <span className="service-card-custome-info">
                            Audio
                          </span>
                        </div>
                      </div>
                    </label>
                  </div>
                  <Collapsible trigger={
                    <div className="collapsible-header">
                      <div className="dropdown-down-info">
                        <Image
                          className=""
                          src={
                            window.location.origin +
                            "/assets/images/products/product-icon.svg"
                          }
                          alt=""
                        />
                        <span>Product</span>
                      </div>
                      <div className="dropdown-down-arrow">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          enableBackground="new 0 0 512 512"
                          viewBox="0 0 451.847 451.847"
                        >
                          <path
                            fill="#242529"
                            d="M225.923 354.706c-8.098 0-16.195-3.092-22.369-9.263L9.27 151.157c-12.359-12.359-12.359-32.397 0-44.751 12.354-12.354 32.388-12.354 44.748 0l171.905 171.915 171.906-171.909c12.359-12.354 32.391-12.354 44.744 0 12.365 12.354 12.365 32.392 0 44.751L248.292 345.449c-6.177 6.172-14.274 9.257-22.369 9.257z"
                            data-original="#000000"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  }
                    className={`product-type-sec ${selectedType == "product" && "selected-product-option"}`}>
                    <div className="product-collapse-type-card">
                      <div class="form-check">
                        <label class="form-check-label" for="4">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            name="service_type"
                            id="4"
                            onClick={() => {
                              setSelectedType("product");
                              setProductType(2);
                            }}
                            checked={
                              productType == 2 && selectedType == "product"
                            }
                          />
                          <div className="service-card-custome">
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
                            <div className="service-card-custome-sec">
                              <span className="service-card-custome-info">
                                Physical
                              </span>
                            </div>
                          </div>
                        </label>
                      </div>
                      <div class="form-check">
                        <label class="form-check-label" for="5">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            name="service_type"
                            id="5"
                            onClick={() => {
                              setSelectedType("product");
                              setProductType(1);
                            }}
                            checked={
                              productType == 1 && selectedType == "product"
                            }
                          />
                          <div className="service-card-custome">
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
                            <div className="service-card-custome-sec">
                              <span className="service-card-custome-info">
                                Digital
                              </span>
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </Collapsible>
                  <div className="personalized-request-btn">
                    <Button
                      className="default-btn"
                      type="submit"
                      disabled={!selectedType}
                      onClick={() => setStep(2)}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </Col>

              <Col className="resp-display-none">
                <div class="personal-request-img-sec">
                  <Image
                    className="personal-request-img"
                    src={
                      window.location.origin +
                      "/assets/images/personal-request-img.png"
                    }
                    alt=""
                  />
                </div>
              </Col>
            </Row>
          )}
          {step == 2 && (
            <Row className="d-flex align-items-center justify-content-center personal-request-top-space">
              <Col md={12} lg={6} xl={6}>
                <div
                  className="personalized-request-back"
                  onClick={() => setStep(1)}
                >
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
                  <span className="personalized-request-back-info-2">Back</span>
                </div>
                <div className="personalized-request-head">
                  <h4>Budget & Description </h4>
                  <p>
                    Please enter the price you are willing to pay along with a
                    description
                  </p>
                </div>
                <div className="personalized-request-from-2">
                  <Formik
                    initialValues={{
                      amount: "",
                      description: "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => handleSubmit(values)}
                  >
                    {({
                      touched,
                      errors,
                      isSubmitting,
                      setFieldValue,
                      values,
                    }) => (
                      <FORM noValidate>
                        <Form.Group controlId="formBasicEmail" className="mb-4">
                          <Form.Label>Amount</Form.Label>
                          <InputGroup>
                            <InputGroup.Text id="basic-addon1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                enableBackground="new 0 0 512 512"
                                viewBox="0 0 339.004 339.004"
                              >
                                <path
                                  d="M262.122 232.344c.197-26.82-10.405-48.031-31.552-63.01-16.333-11.533-36.154-17.549-55.325-23.33-39.936-12.107-51.521-18.484-51.521-37.582 0-21.273 27.646-28.842 51.313-28.842 17.236 0 37.066 5.359 49.381 13.301l24.415-37.812c-16.095-10.434-38.123-17.551-59.875-19.76V0H143.92v37.785c-40.035 8.807-65.255 34.973-65.255 70.637 0 24.977 10.379 44.785 30.79 58.756 15.524 10.666 34.457 16.393 52.746 21.938 39.172 11.84 55.079 19.055 54.898 42.949l-.001.176c0 20.055-26.577 27.184-49.346 27.184-21.508 0-44.897-9.426-58.155-23.441l-32.719 30.949c16.79 17.758 41.184 30.313 67.041 35.234v36.838h45.039V302.96c44.487-6.368 73.12-33.151 73.164-70.616z"
                                  data-original="#000000"
                                ></path>
                              </svg>
                            </InputGroup.Text>
                            <Field
                              type="number"
                              className="form-control"
                              placeholder={t("amount")}
                              name="amount"
                              autoFocus={true}
                              min={0}
                            />
                          </InputGroup>
                          <ErrorMessage
                            component={"div"}
                            name="amount"
                            className="error-msg text-danger text-right"
                          />
                        </Form.Group>

                        <Form.Group
                          controlId="formBasicDescription"
                          className="mb-3"
                        >
                          <Form.Label>Description</Form.Label>
                          <Field
                            class="form-control personalized-req-textarea"
                            as="textarea"
                            rows={3}
                            placeholder={t("description")}
                            name="description"
                          />
                          <ErrorMessage
                            component={"div"}
                            name="description"
                            className="error-msg text-danger text-right"
                          />
                        </Form.Group>
                        <div className="personalized-request-btn">
                          <Button
                            className="default-btn"
                            type="submit"
                            disabled={prStore.loading}
                          >
                            {prStore.loading ? "Loading" : "Create"}
                          </Button>
                        </div>
                      </FORM>
                    )}
                  </Formik>
                </div>
              </Col>
              <Col className="resp-display-none">
                <div class="personal-request-img-sec">
                  <Image
                    className="personal-request-img"
                    src={
                      window.location.origin +
                      "/assets/images/personal-request-img2.png"
                    }
                    alt=""
                  />
                </div>
              </Col>
            </Row>
          )}
        </div>
      </Container>
    </div>
  );
};

export default PersonalizedRequest;
