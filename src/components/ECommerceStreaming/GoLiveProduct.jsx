import React, { useEffect, useState, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Image,
  Button,
  InputGroup,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom";
import "./GoLiveProduct.css";
import { Form as FORM, Formik, Field, ErrorMessage } from "formik";
import { translate, t } from "react-multi-lang";
import { createNotification } from "react-redux-notify/lib/modules/Notifications";
import * as Yup from "yup";
import GoLiveModal from "../helper/GoLiveModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsProOwnerStart } from "../../store/actions/ProductOwnerAction";
import NoDataFound from "../NoDataFound/NoDataFound";
import CommonCenterLoader from "../Loader/CommonCenterLoader";
import CustomLazyLoad from "../helper/CustomLazyLoad";
import { getErrorNotificationMessage } from "../helper/NotificationMessage";
import { productLiveStreamStart } from "../../store/actions/ProductLiveStreamAction";
import { useDropzone } from "react-dropzone";
import configuration from "react-global-configuration";

const GoLiveProduct = () => {
  const [goLive, setGoLive] = useState(false);
  const profile = useSelector((state) => state.users.profile);
  const dispatch = useDispatch();
  const history = useHistory();
  const formRef = useRef();
  const products = useSelector((state) => state.proOwner.products);
  const productLiveStream = useSelector(
    (state) => state.productLiveStream.productLiveStream
  );
  const [selectAll, setSelectAll] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedImages, setSelectedImages] = useState(null);
  const [skipRender, setSkipRender] = useState(true);

  const goLiveSchema = Yup.object().shape({
    title: Yup.string().required(t("title_is_required")),
    stream_type: Yup.string().required(t("required")),
    payment_type: Yup.string().required(t("required")),
    schedule_type: Yup.string().required(t("required")),
    preview_file: Yup.string().required(t("required")),
    description: Yup.string().required(t("required")),
    amount: Yup.number(t("invalid_format")).when("payment_type", {
      is: "paid",
      then: Yup.number()
        .typeError(t("invalid"))
        .min(1, t("golive_min_amount"))
        .max(100000, t("golive_max_amount"))
        .required(t("required")),
      otherwise: Yup.number(),
    }),
    schedule_time: Yup.string().when("schedule_type", {
      is: "2",
      then: Yup.string()
        .required(t("required"))
        .matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/, t("invalid_date_format"))
        .test("is-future-date", t("selected_date_future"), (value) => {
          const selectedDateTimeValue = new Date(value);
          const currentDateTime = new Date();
          return selectedDateTimeValue > currentDateTime;
        }),
      otherwise: Yup.string(),
    }),
  });

  const handleSubmit = (values) => {
    let { schedule_time, ...formdata } = values;
    if (selectedProducts.length > 0) {
      localStorage.removeItem("virtual_id");
      dispatch(
        productLiveStreamStart(
          values.schedule_type == 2
            ? {
              ...values,
              schedule_time: values.schedule_time.split("T").join(" "),
              user_product_ids: selectedProducts,
            }
            : { ...formdata, user_product_ids: selectedProducts }
        )
      );
    } else {
      const notificationMessage = getErrorNotificationMessage(
        t("please_select_product")
      );
      dispatch(createNotification(notificationMessage));
    }
  };

  useEffect(() => {
    dispatch(fetchProductsProOwnerStart());
  }, []);

  const handleImageChange = (event, setFieldValue) => {
    if (event.length > 0) {
      setSelectedImages(URL.createObjectURL(event[0]));
      setFieldValue("preview_file", event[0]);
      const fileInput = document.getElementById("file-upload");
      fileInput.value = "";
    }
  };

  useEffect(() => {
    if (
      !skipRender &&
      !productLiveStream.loading &&
      Object.keys(productLiveStream.data).length > 0
    ) {
      if (
        productLiveStream.data.live_stream_shopping.schedule_type &&
        productLiveStream.data.live_stream_shopping.schedule_type == 1
      )
        history.push(
          `/product-onlive-stream/${productLiveStream.data.live_stream_shopping.unique_id}`,
          {
            virtual_id: productLiveStream.data.live_stream_shopping.virtual_id,
          }
        );
      else {
        history.push(`/product-stream`, { golive: 1 });
      }
    }
    setSkipRender(false);
  }, [productLiveStream]);

  const closeGoLiveModal = () => {
    setGoLive(false);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "image/jpeg": [".jpeg"],
      "image/gif": [".gif"],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length > 0) {
        const notificationMessage = getErrorNotificationMessage(
          t("image_only_allowed")
        );
        dispatch(createNotification(notificationMessage));
      }
      else {
        handleImageChange(acceptedFiles, formRef.current.setFieldValue);
      }

    },
  });

  const toggleCheckbox = (checked) => {
    if (checked === "select-all") {
      setSelectAll(!selectAll);
      setSelectedProducts(
        !selectAll
          ? products.data.user_products.map(
            (product) => product.user_product_id
          )
          : []
      );
    } else {
      setSelectedProducts((prevSelectedProducts) => {
        const isAlreadySelected = prevSelectedProducts.includes(checked);
        const newSelectedProducts = isAlreadySelected
          ? prevSelectedProducts.filter((product) => product !== checked)
          : [...prevSelectedProducts, checked];
        setSelectAll(
          newSelectedProducts.length ==
          products.data.user_products.filter(
            (product) => product.quantity != 0
          ).length
        );
        return newSelectedProducts;
      });
    }
  };

  return (
    <>
      <div className="new-home-page-sec">
        <div className="live-streaming-header-sec">
          <Container fluid>
            <Row>
              <Col md={12}>
                <div className="live-streaming-header-wrapped">
                  <div className="live-streaming-left-sec">
                    {profile.data.is_content_creator === 2 && (
                      <Link to="/go-live-product" className="new-go-live-btn">
                        {t("golive_with_products")}
                      </Link>
                    )}
                    <Link
                      to="/product-stream"
                      className="new-live-history-btn  pull-right inside-space-bar"
                    >
                      {t("product_streams")}
                    </Link>
                    <Link
                      to="/live-videos"
                      className="new-live-history-btn  pull-right"
                    >
                      {t("on_live")}
                    </Link>
                    {profile.data.is_content_creator === 2 && (
                      <>
                        <Link
                          to="/live-videos-history"
                          className=" new-live-history-btn pull-right"
                        >
                          {t("my_live_streams")}
                        </Link>
                        <Link
                          to="#"
                          onClick={() => setGoLive(true)}
                          className="new-live-history-btn  pull-right"
                        >
                          {t("go_live")}
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="go-live-product-sec">
          <Container fluid>
            <Row>
              <Col md={12} lg={12} xl={12}>
                <div className="go-live-product-head">
                  <h3>{t("lets_dive_in")}</h3>
                  <p>{t("initiate_product_stream")}</p>
                </div>
              </Col>
            </Row>
            <Formik
              initialValues={{
                title: "",
                stream_type: "",
                payment_type: "",
                schedule_type: "",
                description: "",
                amount: 0,
                preview_file: "",
                schedule_time: "",
              }}
              innerRef={formRef}
              validationSchema={goLiveSchema}
              onSubmit={(values) => handleSubmit(values)}
            >
              {({ errors, touched, setFieldValue, resetForm, values }) => (
                <FORM>
                  <Row className=" justify-content-center">
                    <Col md={12} lg={6} xl={6}>
                      <div className="go-live-produc-input">
                        <Form.Group controlId="formBasicEmail">
                          <Form.Label>{t("title")}</Form.Label>
                          <Field
                            type="text"
                            className="form-control"
                            placeholder={t("title")}
                            name="title"
                          />
                          <ErrorMessage
                            component={"div"}
                            name="title"
                            className="errorMsg w-100"
                          />
                        </Form.Group>
                      </div>
                      <div className="services-card-wrapped">
                        <div className="go-live-select-lable">
                          <label>{t("stream_type")}</label>
                        </div>
                        <Row>
                          <Col
                            md={12}
                            lg={6}
                            xl={6}
                            className="resp-mrg-bottom-md"
                          >
                            <div class="form-check">
                              <label class="form-check-label" for="1">
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  name="stream_type"
                                  id="1"
                                  checked={values.stream_type == "public"}
                                  onChange={() =>
                                    setFieldValue("stream_type", "public")
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
                                    <span>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="22"
                                        height="22"
                                        enableBackground="new 0 0 512 512"
                                        viewBox="0 0 80.13 80.13"
                                      >
                                        <path
                                          fill="#c3c3d0"
                                          d="M48.355 17.922c3.705 2.323 6.303 6.254 6.776 10.817a11.69 11.69 0 004.966 1.112c6.491 0 11.752-5.261 11.752-11.751 0-6.491-5.261-11.752-11.752-11.752-6.429.002-11.644 5.169-11.742 11.574zm-7.699 24.062c6.491 0 11.752-5.262 11.752-11.752s-5.262-11.751-11.752-11.751c-6.49 0-11.754 5.262-11.754 11.752s5.264 11.751 11.754 11.751zm4.985.801h-9.972c-8.297 0-15.047 6.751-15.047 15.048v12.195l.031.191.84.263c7.918 2.474 14.797 3.299 20.459 3.299 11.059 0 17.469-3.153 17.864-3.354l.785-.397h.084V57.833c.003-8.297-6.747-15.048-15.044-15.048zm19.443-12.132h-9.895a14.483 14.483 0 01-4.47 10.088c7.375 2.193 12.771 9.032 12.771 17.11v3.758c9.77-.358 15.4-3.127 15.771-3.313l.785-.398h.084V45.699c0-8.296-6.75-15.046-15.046-15.046zm-45.049-.8c2.299 0 4.438-.671 6.25-1.814a14.544 14.544 0 015.467-9.276c.012-.22.033-.438.033-.66 0-6.491-5.262-11.752-11.75-11.752-6.492 0-11.752 5.261-11.752 11.752 0 6.488 5.26 11.75 11.752 11.75zm10.554 10.888a14.492 14.492 0 01-4.467-10.032c-.367-.027-.73-.056-1.104-.056h-9.971C6.75 30.653 0 37.403 0 45.699v12.197l.031.188.84.265c6.352 1.983 12.021 2.897 16.945 3.185v-3.683c.002-8.078 5.396-14.915 12.773-17.11z"
                                          data-original="#000000"
                                        ></path>
                                      </svg>
                                    </span>
                                    <span className="service-card-custome-info">
                                      {t("public")}
                                    </span>
                                  </div>
                                </div>
                              </label>
                            </div>
                          </Col>
                          <Col md={12} lg={6} xl={6}>
                            <div class="form-check">
                              <label class="form-check-label" for="2">
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  name="stream_type"
                                  id="2"
                                  checked={values.stream_type == "private"}
                                  onChange={() =>
                                    setFieldValue("stream_type", "private")
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
                                    <span>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          fill="#C3C3D0"
                                          d="M8.167 0c-3.171 0-5.75 2.662-5.75 5.935 0 3.274 2.579 5.936 5.75 5.936 3.17 0 5.75-2.662 5.75-5.936 0-3.273-2.58-5.935-5.75-5.935zm3.777 15.43a.47.47 0 01-.647.206 6.56 6.56 0 00-3.13-.798c-3.7 0-6.709 3.106-6.709 6.925v1.483a.487.487 0 01-.479.495.487.487 0 01-.479-.495v-1.483c0-4.364 3.44-7.914 7.667-7.914 1.245 0 2.483.315 3.578.913a.501.501 0 01.2.668zm9.64-.257v-1.818c0-1.909-1.505-3.462-3.355-3.462s-3.354 1.553-3.354 3.462v1.818a3.478 3.478 0 00-1.917 3.128v1.979c0 1.909 1.505 3.462 3.354 3.462h3.834c1.85 0 3.354-1.553 3.354-3.462V18.3c0-1.378-.785-2.57-1.917-3.128zm-5.75-1.818c0-1.363 1.075-2.473 2.395-2.473s2.396 1.11 2.396 2.473v1.52a3.316 3.316 0 00-.48-.036h-3.832c-.163 0-.323.012-.48.036v-1.52zm3.354 5.936c0 .546-.43.989-.959.989-.529 0-.958-.444-.958-.99s.43-.989.958-.989c.53 0 .959.444.959.99z"
                                        ></path>
                                      </svg>
                                    </span>
                                    <span className="service-card-custome-info">
                                      {t("private")}
                                    </span>
                                  </div>
                                </div>
                              </label>
                            </div>
                          </Col>
                        </Row>
                        <ErrorMessage
                          component={"div"}
                          name="stream_type"
                          className="errorMsg w-100"
                        />
                        <div className="go-live-select-lable">
                          <label>{t("schedule_type")}</label>
                        </div>
                        <Row>
                          <Col
                            md={12}
                            lg={6}
                            xl={6}
                            className="resp-mrg-bottom-md"
                          >
                            <div class="form-check">
                              <label class="form-check-label" for="3">
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  name="service_type"
                                  id="3"
                                  checked={values.schedule_type == 1}
                                  onChange={() =>
                                    setFieldValue("schedule_type", 1)
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
                                    <span>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="27"
                                        height="27"
                                        enableBackground="new 0 0 512 512"
                                        viewBox="0 0 24 24"
                                      >
                                        <g
                                          fill="#d4d4dd"
                                          fillRule="evenodd"
                                          clipRule="evenodd"
                                        >
                                          <path
                                            d="M2.49 10.457a.48.48 0 01-.485-.54A9.301 9.301 0 019.92 2.004a.48.48 0 01.54.484v.668a.753.753 0 001.506 0v-.668a.48.48 0 01.54-.484c4.521.63 8 4.512 8 9.206v.136c-.005.365-.405.573-.742.432a6.1 6.1 0 00-7.986 7.986c.142.336-.066.736-.43.74-.046.002-.091.002-.137.002-4.695 0-8.578-3.482-9.206-8.004a.48.48 0 01.484-.54h.671a.753.753 0 100-1.507zm9.475-2.986a.753.753 0 10-1.506 0v3.451a.501.501 0 01-.158.366L8.393 13.08a.753.753 0 101.031 1.098l2.145-2.015c.253-.237.396-.569.396-.915z"
                                            data-original="#000000"
                                          ></path>
                                          <path
                                            d="M17.406 22a4.594 4.594 0 100-9.187 4.594 4.594 0 000 9.187zm2.442-5.223a.753.753 0 00-1.162-.958l-1.176 1.425a.501.501 0 01-.725.052l-.398-.363a.753.753 0 00-1.015 1.112l1.03.94c.482.44 1.283.415 1.718-.113z"
                                            data-original="#000000"
                                          ></path>
                                        </g>
                                      </svg>
                                    </span>
                                    <span className="service-card-custome-info">
                                      {t("now")}
                                    </span>
                                  </div>
                                </div>
                              </label>
                            </div>
                          </Col>
                          <Col md={12} lg={6} xl={6}>
                            <div class="form-check">
                              <label class="form-check-label" for="4">
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  name="service_type"
                                  id="4"
                                  checked={values.schedule_type == 2}
                                  onChange={() =>
                                    setFieldValue("schedule_type", 2)
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
                                    <span>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="27"
                                        height="27"
                                        fill="none"
                                        viewBox="0 0 27 27"
                                      >
                                        <path
                                          fill="#D4D4DD"
                                          d="M15.863.981a1.083 1.083 0 00-1.28 1.065v3.119a8.617 8.617 0 00-9.675 9.675H1.789a1.084 1.084 0 00-1.065 1.28A13 13 0 1015.863.98zM13.5 15.923a2.16 2.16 0 01-1.867-1.083H9.167a1.083 1.083 0 110-2.167h2.466c.19-.324.46-.594.784-.783V8.34a1.083 1.083 0 112.166 0v3.55a2.16 2.16 0 01-1.083 4.033zM11.303.865a1.083 1.083 0 110 2.167 1.083 1.083 0 010-2.167zM6.86 2.767a1.083 1.083 0 11-.003-.002l.003.002zm-3.35 3.234a1.083 1.083 0 110 2.167A1.083 1.083 0 013.51 6zm-1.734 4.514a1.084 1.084 0 11-.002 0h.002z"
                                        ></path>
                                      </svg>
                                    </span>
                                    <span className="service-card-custome-info">
                                      {t("later")}
                                    </span>
                                  </div>
                                </div>
                              </label>
                            </div>
                          </Col>
                        </Row>
                        <ErrorMessage
                          component={"div"}
                          name="schedule_type"
                          className="errorMsg w-100"
                        />
                        {values.schedule_type == 2 ? (
                          <div className="go-live-produc-input">
                            <Form.Group controlId="formBasicEmail">
                              <Form.Label>{t("schedule_time")}</Form.Label>
                              <Field
                                id="schedule-time-input"
                                type="datetime-local"
                                className="form-control"
                                placeholder={t("schedule_time")}
                                name="schedule_time"
                                onChange={(e) =>
                                  setFieldValue("schedule_time", e.target.value)
                                }
                              />
                              <ErrorMessage
                                component={"div"}
                                name="schedule_time"
                                className="errorMsg w-100"
                              />
                            </Form.Group>
                          </div>
                        ) : null}
                        <div className="go-live-select-lable">
                          <label className="">{t("payment")}</label>
                        </div>
                        <Row>
                          <Col
                            md={12}
                            lg={6}
                            xl={6}
                            className="resp-mrg-bottom-md"
                          >
                            <div class="form-check">
                              <label class="form-check-label" for="5">
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  name="payment_type"
                                  id="5"
                                  checked={values.payment_type == "free"}
                                  onChange={() =>
                                    setFieldValue("payment_type", "free")
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
                                    <span>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="27"
                                        height="27"
                                        fill="none"
                                        viewBox="0 0 30 35"
                                      >
                                        <g clipPath="url(#clip0_423_776)">
                                          <path
                                            fill="#C3C3D0"
                                            d="M25.975 22.29l-4.338 2.05a3.533 3.533 0 00-3.011-1.859l-4.004-.11a4.228 4.228 0 01-1.82-.47l-.408-.211a7.187 7.187 0 00-6.656.007l.025-.923a.554.554 0 00-.538-.569l-4.391-.12a.553.553 0 00-.569.537L0 30.258a.554.554 0 00.539.569l4.39.12h.015c.3 0 .546-.238.554-.538l.013-.461 1.14-.61c.448-.242.972-.299 1.46-.16l6.812 1.911a7.291 7.291 0 001.533.163 7.388 7.388 0 003.087-.673.526.526 0 00.068-.038l9.876-6.388a.554.554 0 00.182-.738 2.797 2.797 0 00-3.694-1.125z"
                                          ></path>
                                          <rect
                                            width="16.52"
                                            height="16.48"
                                            x="7.646"
                                            y="2.716"
                                            fill="#C3C3D0"
                                            rx="8.24"
                                          ></rect>
                                          <path
                                            stroke="#fff"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1.333"
                                            d="M12.355 11.2l1.88 2.11L19.457 8.6"
                                          ></path>
                                        </g>
                                        <defs>
                                          <clipPath id="clip0_423_776">
                                            <path
                                              fill="#fff"
                                              d="M0 0H29.315V33.757H0z"
                                              transform="translate(0 .757)"
                                            ></path>
                                          </clipPath>
                                        </defs>
                                      </svg>{" "}
                                    </span>
                                    <span className="service-card-custome-info">
                                      {t("free")}
                                    </span>
                                  </div>
                                </div>
                              </label>
                            </div>
                          </Col>
                          <Col md={12} lg={6} xl={6}>
                            <div class="form-check">
                              <label class="form-check-label" for="6">
                                <input
                                  class="form-check-input"
                                  type="checkbox"
                                  name="payment_type"
                                  id="6"
                                  checked={values.payment_type == "paid"}
                                  onChange={() =>
                                    setFieldValue("payment_type", "paid")
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
                                    <span>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="27"
                                        height="27"
                                        enableBackground="new 0 0 512 512"
                                        viewBox="0 0 16.933 16.933"
                                      >
                                        <path
                                          fill="#c3c3d0"
                                          d="M8.468.53c-2.043 0-3.706 1.66-3.706 3.703s1.663 3.705 3.706 3.705c2.042 0 3.703-1.662 3.703-3.705S10.51.53 8.468.53zm-.001 1.056c.132 0 .264.088.264.265v.57c.454.118.793.53.793 1.02a.265.265 0 11-.53 0 .524.524 0 00-.526-.529.526.526 0 00-.53.53c0 .295.234.529.53.529a1.06 1.06 0 011.056 1.058c0 .49-.339.903-.793 1.021v.565c0 .353-.529.353-.529 0V6.05a1.062 1.062 0 01-.793-1.02.265.265 0 01.53 0c0 .295.233.529.529.529.295 0 .527-.234.527-.53S8.763 4.5 8.468 4.5a1.063 1.063 0 01-1.06-1.058c0-.49.34-.901.794-1.02V1.85c0-.177.132-.265.265-.265zm6.708 5.61c-.32 0-.643.123-.886.367l-1.676 1.675c.22.305.352.677.352 1.08 0 1.022-.83 1.852-1.852 1.852H8.229c-.384.035-.384-.561 0-.527h2.884c.737 0 1.322-.587 1.322-1.324 0-.26-.075-.498-.202-.7a1.342 1.342 0 00-1.12-.622H5.556c-1.124 0-1.748.581-2.27 1.103l3.673 3.674c.057-.01.117-.015.185-.015h4.498c.91 0 1.67-.45 2.207-1.229.606-.878 1.741-2.52 2.243-3.23.182-.26.299-.556.31-.864a1.168 1.168 0 00-.34-.873 1.252 1.252 0 00-.887-.367zM2.381 10.054a.262.262 0 00-.186.077L.607 11.72a.265.265 0 000 .376l4.235 4.232c.103.102.27.102.373 0l1.587-1.588a.265.265 0 000-.373L2.568 10.13a.264.264 0 00-.187-.077z"
                                          data-original="#000000"
                                        ></path>
                                      </svg>
                                    </span>
                                    <span className="service-card-custome-info">
                                      {t("paid")}
                                    </span>
                                  </div>
                                </div>
                              </label>
                            </div>
                          </Col>
                        </Row>
                        <ErrorMessage
                          component={"div"}
                          name="payment_type"
                          className="errorMsg w-100"
                        />
                      </div>
                      {values.payment_type == "paid" ? (
                        <div className="go-live-produc-input">
                          <div className="mb-3">
                            <Form.Label className=" W-100">
                              {t("amount")}
                            </Form.Label>
                            <InputGroup>
                              <InputGroup.Text id="basic-addon1">
                                {configuration.get("configData.currency")}
                              </InputGroup.Text>
                              <Field
                                type="number"
                                className="form-control"
                                placeholder={t("enter_tokens")}
                                name="amount"
                              />
                            </InputGroup>
                            <ErrorMessage
                              component={"div"}
                              name="amount"
                              className="errorMsg w-100"
                            />
                          </div>
                        </div>
                      ) : null}
                      <div className="go-live-produc-input">
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                          <Form.Label>{t("description")}</Form.Label>
                          <Field
                            className="form-control"
                            as="textarea"
                            rows={3}
                            name="description"
                            placeholder={t("description")}
                          />
                          <ErrorMessage
                            component={"div"}
                            name="description"
                            className="errorMsg w-100"
                          />
                        </Form.Group>
                      </div>
                    </Col>
                    <Col md={12} lg={6} xl={6}>
                      <div className="upload-preview-image">
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicPassword"
                        >
                          <div className="go-live-select-lable mb-3">
                            <label>{t("select_preview_file")}</label>
                          </div>
                          <div className="upload-image-sec">
                            <label
                              onClick={(e) => e.preventDefault()}
                              className=""
                              style={{ width: "100%" }}
                            >
                              <div
                                className="upload-image-btn"
                                {...getRootProps()}
                              >
                                <div className="custom-file-upload">
                                  {t("upload")}
                                </div>
                                <span>
                                  <span className="upload-image-btn-info">
                                    {t("accepts_images")}
                                  </span>
                                  <input
                                    {...getInputProps()}
                                    id="file-upload"
                                    className="d-none"
                                  />
                                </span>
                              </div>
                            </label>
                          </div>
                        </Form.Group>
                        <ErrorMessage
                          component={"div"}
                          name="preview_file"
                          className="errorMsg w-100"
                        />
                        <div className="preview-section mb-3">
                          <div className="preview-title-sec">
                            {values.preview_file ? (
                              <h5> {t("preview_file")}</h5>
                            ) : null}
                          </div>
                          {selectedImages ? (
                            <div className="preview-image-wrappe">
                              <div className="preview-image-card">
                                <div className="preview-action">
                                  <Button
                                    className="product-image-delete-btn"
                                    onClick={(event) => {
                                      setSelectedImages(null);
                                      setFieldValue("preview_file", "");
                                    }}
                                  >
                                    <i className="far fa-times-circle"></i>
                                  </Button>
                                </div>
                                <div className="preview-avater">
                                  <CustomLazyLoad
                                    alt="#"
                                    src={selectedImages}
                                    className="uploaded-product-img"
                                  />
                                </div>
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className="go-live-choose-product">
                        <div className="upload-preview-lable">
                          <label className="">{t("choose_products")}</label>
                          <label class="checkbox-wrapper" for="select-all">
                            <input
                              type="checkbox"
                              class="checkbox-input"
                              id="select-all"
                              checked={selectAll}
                              onChange={() => toggleCheckbox("select-all")}
                            />
                            <span class="checkbox-tile">
                              <span class="checkbox-label">
                                {t("select_all")}
                              </span>
                            </span>
                          </label>
                        </div>
                        <div className="go-live-product-list-sec">
                          {products.loading ? (
                            <CommonCenterLoader />
                          ) : products.data.user_products.length > 0 &&
                            products.data.user_products.some(
                              (product) => product.quantity !== 0
                            ) ? (
                            <div className="go-live-product">
                              {products.data.user_products.map(
                                (product, i) =>
                                  product.quantity > 0 &&
                                  product.status !== 0 && (
                                    <div className="your-address-row" key={i}>
                                      <div className="your-address-card">
                                        <div class="form-check">
                                          <label class="form-check-label">
                                            <input
                                              class="form-check-input"
                                              type="checkbox"
                                              name="service_type"
                                              checked={selectedProducts?.includes(
                                                product.user_product_id
                                              )}
                                              onChange={() =>
                                                toggleCheckbox(
                                                  product.user_product_id
                                                )
                                              }
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
                                                    <CustomLazyLoad
                                                      className="live-stream-product-img"
                                                      src={
                                                        product.picture ||
                                                        window.location.origin +
                                                        "/assets/images/products/jacket1.png"
                                                      }
                                                      alt=""
                                                    />
                                                  </div>
                                                  <div className="live-stream-product-info">
                                                    <h4>{product.name}</h4>
                                                    <p>{product.description}</p>
                                                    <p>
                                                      Qty{" "}
                                                      <strong>
                                                        {product.quantity}
                                                      </strong>
                                                    </p>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </label>
                                        </div>
                                      </div>
                                    </div>
                                  )
                              )}
                            </div>
                          ) : (
                            <div>
                              <NoDataFound />
                            </div>
                          )}
                        </div>
                      </div>
                      <div class="go-live-product-btn">
                        <button
                          type="submit"
                          class="default-btn btn btn-primary"
                          disabled={productLiveStream.loading}
                        >
                          {t("go_live")}
                        </button>
                      </div>
                    </Col>
                  </Row>
                </FORM>
              )}
            </Formik>
          </Container>
        </div>
      </div>
      {profile.loading ? (
        t("loading")
      ) : (
        <GoLiveModal
          goLive={goLive}
          closeGoLiveModal={closeGoLiveModal}
          username={profile.data.username}
          userPicture={profile.data.picture}
          name={profile.data.name}
          user_id={profile.data.user_id}
        />
      )}
    </>
  );
};

export default translate(GoLiveProduct);
