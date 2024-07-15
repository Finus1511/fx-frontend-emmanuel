import React, { useState, useEffect, useRef } from "react";
import {
  Form,
  Button,
  Image,
  Modal,
  Tab,
  Nav,
  Row,
  Col,
} from "react-bootstrap";
import PhoneInput, {
  formatPhoneNumberIntl,
  isValidPhoneNumber,
} from "react-phone-number-input";
import configuration from "react-global-configuration";
import { Link } from "react-router-dom";
import "./GoLiveProduct.css";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteDeliveryAddressStart,
  fetchDeliveryAddressStart,
  saveDeliveryAddressStart,
  setDefaultDeliveryAddressStart,
  productLiveStreamOrderPaymentStart,
  liveStreamShoppingsProuctsListStart,
} from "../../store/actions/ProductLiveStreamAction";
import { fetchWalletDetailsStart } from "../../store/actions/WalletAction";
import { translate, t } from "react-multi-lang";
import { Formik, Form as FORM, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import getAllCountries from "react-select-country-list";
import Skeleton from "react-loading-skeleton";
import axios from "axios";
import { getErrorNotificationMessage } from "../helper/NotificationMessage";
import { createNotification } from "react-redux-notify";
import NoDataFound from "../NoDataFound/NoDataFound";

const BuyNowModal = (props) => {
  const formRef = useRef();
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();
  const [defaultCountry, setDefaultCountry] = useState("");
  const deliveryAddress = useSelector(
    (state) => state.productLiveStream.deliveryAddress
  );
  const deliveryAddressSave = useSelector(
    (state) => state.productLiveStream.deliveryAddressSave
  );
  const [selectedAddress, setSelectedAddress] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [addressID, setAddressId] = useState("");
  const [editAddress, setEditAddress] = useState(false);
  const wallet = useSelector((state) => state.wallet.walletData);
  const productLiveStreamOrderPayment = useSelector(
    (state) => state.productLiveStream.productLiveStreamOrderPayment
  );
  const [paymentType, setPaymentType] = useState(
    localStorage.getItem("default_payment_method")
  );
  const [skipRender, setSkipRender] = useState(true);

  useEffect(() => {
    dispatch(fetchWalletDetailsStart());
  }, []);

  const addAddressSchema = Yup.object().shape({
    name: Yup.string().required(t("required")),
    address: Yup.string().required(t("required")),
    state: Yup.string().required(t("required")),
    city: Yup.string().required(t("required")),
    country: Yup.string().required(t("required")),
    pincode: Yup.string()
      .required(t("required"))
      .matches(/^(?=.*[0-9])/, "Space not allowed")
      .min(6, "Must contain six characters"),
    contact_number: Yup.string()
      .test(
        "valid-mobile",
        t("address_invalid", { value: "Phone number" }),
        (value) => {
          if (!value) {
            return false;
          }
          return isValidPhoneNumber(value);
        }
      )
      .required(t("required")),
    landmark: Yup.string().required(t("required")),
  });

  useEffect(() => {
    dispatch(fetchDeliveryAddressStart());
  }, [step]);

  useEffect(() => {
    if (
      selectedAddress === "" &&
      !deliveryAddress.loading &&
      Object.keys(deliveryAddress.data).length > 0 &&
      deliveryAddress.data.lss_delivery_address_details.length > 0
    ) {
      let address = deliveryAddress.data.lss_delivery_address_details.filter(
        (address) => address.is_default === 1
      );
      setSelectedAddress(address[0]);
    }
    if (
      !deliveryAddress.loading &&
      Object.keys(deliveryAddress.data).length > 0 &&
      deliveryAddress.data.lss_delivery_address_details.length == 0
    ) {
      setSelectedAddress("");
    }
  }, [deliveryAddress]);

  const handleSubmit = (values) => {
    const intlNo = formatPhoneNumberIntl(values.contact_number);
    const countryCode = intlNo.substring(
      intlNo.indexOf("+") + 1,
      intlNo.indexOf(" ")
    );
    const mobile = intlNo
      .substring(intlNo.indexOf(" "), intlNo.length)
      .replaceAll(" ", "");
    dispatch(
      saveDeliveryAddressStart({
        ...values,
        contact_number: mobile,
        country_code: countryCode,
        lss_delivery_address_id: addressID,
      })
    );
  };

  useEffect(() => {
    setStep(1);
  }, []);

  useEffect(() => {
    if (
      !skipRender &&
      !deliveryAddressSave.loading &&
      Object.keys(deliveryAddressSave.data).length > 0
    ) {
      if (
        selectedAddress?.id ===
        deliveryAddressSave.data.lss_delivery_address_details.id
      ) {
        setSelectedAddress(
          deliveryAddressSave.data.lss_delivery_address_details
        );
      }
      dispatch(fetchDeliveryAddressStart());
      setAddressId("");
      setCountryCode("");
      setStep(2);
    }
    setSkipRender(false);
  }, [deliveryAddressSave]);

  const handleSetDefault = (delivery_address_id) => {
    dispatch(
      setDefaultDeliveryAddressStart({
        lss_delivery_address_unique_id: delivery_address_id,
      })
    );
  };
  const handleDeleteAddress = (delivery_address_id) => {
    if (window.confirm(t("delete_delivery_address_confirmation"))) {
      dispatch(
        deleteDeliveryAddressStart({
          lss_delivery_address_unique_id: delivery_address_id,
        })
      );
    }
  };

  useEffect(() => {
    const getUserLocation = async () => {
      try {
        const response = await axios.get("http://ip-api.com/json/");
        setDefaultCountry(response.data.countryCode);
      } catch (error) {
        setDefaultCountry("IN");
      }
    };
    getUserLocation();
  }, []);

  const excludedCountries = [{ value: "PK", label: "Pakistan" }];

  const allCountries = getAllCountries().data.filter(
    (country) => !excludedCountries.some((obj) => obj.value === country.value)
  );

  const handleEditAddress = (address) => {
    setStep(3);
    const modStr = address.country[0].toUpperCase() + address.country.slice(1);
    setAddressId(address.id);
    setCountryCode(modStr);
    setTimeout(() => {
      formRef.current.setFieldValue("name", address.name);
      formRef.current.setFieldValue(
        "contact_number",
        "+" + address.country_code + address.contact_number
      );
      formRef.current.setFieldValue("city", address.city);
      formRef.current.setFieldValue("state", address.state);
      formRef.current.setFieldValue("country_code", address.country_code);
      formRef.current.setFieldValue("region_code", address.region_code);
      formRef.current.setFieldValue("country", address.country);
      formRef.current.setFieldValue("pincode", address.pincode);
      formRef.current.setFieldValue("landmark", address.landmark);
      formRef.current.setFieldValue("address", address.address);
    }, 100);
  };

  useEffect(() => {
    if (
      Object.keys(productLiveStreamOrderPayment.data).length > 0 &&
      !skipRender
    ) {
      dispatch(
        liveStreamShoppingsProuctsListStart({
          live_stream_shopping_unique_id: props.show.liveVideo,
        })
      );
      props.setPurchasedProduct(props.show.user_product_unique_id);
      props.onHide();
    }
    setSkipRender(false);
  }, [productLiveStreamOrderPayment]);

  useEffect(() => {
    dispatch(fetchWalletDetailsStart());
  }, []);

  const handlePayment = () => {
    dispatch(
      productLiveStreamOrderPaymentStart({
        live_stream_shopping_unique_id: props.show.liveVideo,
        user_product_unique_id: props.show.user_product_unique_id,
        lss_delivery_address_id: selectedAddress?.id,
      })
    );
  };

  const buyProduct = () => {
    if (selectedAddress.length == 0) {
      const notificationMessage = getErrorNotificationMessage(
        t("please_add_delvery_address_to_continue")
      );
      dispatch(createNotification(notificationMessage));
    } else {
      setStep(4);
    }
  };
  const customStyles = {
    menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
      left: "0px",
      borderRadius: "8px",
      overflow: "hidden",
    }),
    menuList: (provided) => ({
      ...provided,
      padding: 0,
      minWidth: 250,
      fontSize: "1.2em",
      "&::-webkit-scrollbar-track": {
        boxShadow: "inset 0 0 6px rgba(0,0,0,0.3)",
        borderRadius: "3px",
        backgroundColor: "#fff",
      },
      "&::-webkit-scrollbar": {
        width: "4px",
        backgroundColor: "#fff",
      },
      "&::-webkit-scrollbar-thumb": {
        borderRadius: "3px",
        boxShadow: "inset 0 0 6px rgba(0, 0, 0, .3)",
        backgroundColor: "#555",
      },
    }),
    container: (provided) => ({ ...provided, width: "auto" }),
    control: (provided) => ({
      ...provided,
      backgroundColor: "transparent!important",
      border: "1px solid #E7E7E7!important",
      borderRadius: "6px!important",
      boxShadow: "none!important",
      height: "45px",
      display: "flex",
      alignItems: "center",
      alignItemsContent: "center",
      cursor: "pointer",
      fontSize: "0.9em",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#8a96a3",
      fontSize: "1.4em",
      fontWeight: "400",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#242529",
      display: "flex",
      alignItems: "center",
      gap: "0.5em",
      fontSize: "1.4em",
      fontWeight: "400",
    }),
    indicatorContainer: (provided) => ({
      ...provided,
      color: "#32089F!important",
    }),
    indicatorSeparator: (base) => ({
      ...base,
      display: "none",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      svg: {
        fill: "#111",
      },
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isSelected ? "#f7f7f7" : "#fff",
        color: "#000",
        "&:hover": {
          backgroundColor: "#f7f7f7",
          color: "#242529",
        },
      };
    },
  };

  const handleConfirm = () => {
    if (selectedAddress.length !== 0) {
      setSelectedAddress(selectedAddress);
      setStep(1);
    } else {
      const notificationMessage = getErrorNotificationMessage(
        t("please_add_delvery_address_to_continue")
      );
      dispatch(createNotification(notificationMessage));
    }
  };

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="buy-product-modal"
      >
        <Modal.Header closeButton>
          <span className="header-product-payment">
            {step == 1
              ? t("buy_now")
              : step == 2
              ? t("shipping_address")
              : step == 3
              ? editAddress
                ? t("edit_address")
                : t("add_address")
              : t("pay_now")}
          </span>
        </Modal.Header>
        {step == 1 && (
          <>
            <Modal.Body className="buy-product-modal-1">
              <div className="buy-product-img-detail">
                <div className="buy-product-img-box">
                  <Image
                    className="buy-product-img"
                    src={props.show.picture}
                    alt="product-img"
                  />
                </div>
                <span className="buy-product-name">
                  {t("product_name")}: {props.show.name}
                </span>
              </div>
              <div className="buy-product-discription">
                <h4>{t("description")}</h4>
                <p>{props.show.description}</p>
              </div>
              <div className="buy-product-address">
                <div className="buy-product-address-head">
                  {Object.keys(deliveryAddress.data).length > 0 &&
                    (Object.keys(
                      deliveryAddress.data?.lss_delivery_address_details
                    ).length > 0 ? (
                      <>
                        <h5>{t("default_address")}</h5>
                        <Button
                          onClick={() => setStep(2)}
                          className="change-address-btn"
                        >
                          {t("change_address")}
                        </Button>
                      </>
                    ) : (
                      <>
                        <h5></h5>
                        <Button
                          className="change-address-btn"
                          onClick={() => setStep(3)}
                        >
                          {t("add_address")}
                        </Button>
                      </>
                    ))}
                </div>
                <div className="buy-product-address-info">
                  {deliveryAddress.loading ? (
                    [...Array(3)].map(() => <Skeleton height={30} />)
                  ) : deliveryAddress.data.lss_delivery_address_details.length >
                      0 && selectedAddress ? (
                    <>
                      <h4>{selectedAddress?.name}</h4>
                      <p>
                        {selectedAddress?.address +
                          "," +
                          selectedAddress?.landmark +
                          "," +
                          selectedAddress?.city +
                          "," +
                          selectedAddress?.state +
                          "," +
                          selectedAddress?.country +
                          "," +
                          selectedAddress?.pincode}
                      </p>
                      <p>
                        {t("mobile_number")}: + {selectedAddress.country_code}
                        {selectedAddress?.contact_number}
                      </p>
                    </>
                  ) : null}
                </div>
              </div>
              <div className="buy-product-price">
                <h5>{t("order_total")}</h5>
                <h4>
                  {props.show.price} {""}
                  {t("tokens")}
                </h4>
              </div>
              <div className="product-buy-now">
                <Button className="default-btn" onClick={buyProduct}>
                  {t("buy_now")}
                </Button>
              </div>
            </Modal.Body>
          </>
        )}
        {step == 2 && (
          <Modal.Body className="buy-product-modal-body">
            <div className="personalized-table-head">
              <div className="personalized-table-back">
                <Link to="#" onClick={() => setStep(1)}>
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
              </div>
              <div className="personalized-table-search">
                <Button className="default-btn" onClick={() => setStep(3)}>
                  {t("add_new_address")}
                </Button>
              </div>
            </div>
            <div className="your-address-row">
              {Object.keys(deliveryAddress.data).length > 0 &&
                deliveryAddress.data.lss_delivery_address_details.length >
                  0 && (
                  <span className="buy-product-lable">
                    <h5>{t("default_address")}</h5>
                  </span>
                )}
              {deliveryAddress.loading ? (
                [...Array(3)].map(() => <Skeleton height={100} />)
              ) : (
                <>
                  {!deliveryAddress.loading &&
                  Object.keys(deliveryAddress.data).length > 0 &&
                  deliveryAddress.data.lss_delivery_address_details.length >
                    0 ? (
                    deliveryAddress.data.lss_delivery_address_details.map(
                      (address, index) => (
                        <div className="your-address-card">
                          <div class="form-check">
                            <label class="form-check-label" for={index}>
                              <input
                                class="form-check-input"
                                type="radio"
                                // name="service_type"
                                checked={
                                  selectedAddress &&
                                  selectedAddress?.unique_id ==
                                    address.unique_id
                                }
                                onClick={() => {
                                  setSelectedAddress(address);
                                }}
                                name="address"
                                id={index}
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
                                  </div>
                                  <div className="your-address-detail">
                                    <p>
                                      {address.address +
                                        "," +
                                        address.landmark +
                                        "," +
                                        address.state +
                                        "," +
                                        address.country +
                                        "," +
                                        address.pincode}
                                    </p>
                                    <p>
                                      {t("mobile_number")}:{" "}
                                      <strong>
                                        {" "}
                                        +{address.country_code}
                                        {address.contact_number}
                                      </strong>
                                    </p>
                                  </div>
                                  <div className="buy-product-address-action">
                                    {address.is_default == 0 && (
                                      <Button
                                        type="button"
                                        onClick={() =>
                                          handleSetDefault(address?.unique_id)
                                        }
                                      >
                                        {t("set_as_default")}
                                      </Button>
                                    )}

                                    <Button
                                      onClick={() =>
                                        handleDeleteAddress(address.unique_id)
                                      }
                                    >
                                      {t("remove")}
                                    </Button>
                                    <Button
                                      onClick={() => {
                                        handleEditAddress(address);
                                        setEditAddress(true);
                                      }}
                                    >
                                      {t("edit")}
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </label>
                          </div>
                        </div>
                      )
                    )
                  ) : (
                    <NoDataFound />
                  )}
                </>
              )}
            </div>
            <div className="order-confirm-address">
              <Button
                disabled={!selectedAddress}
                className="default-btn"
                onClick={() => handleConfirm()}
              >
                {t("confirm_shipping_address")}
              </Button>
            </div>
          </Modal.Body>
        )}
        {step == 3 && (
          <Modal.Body className="buy-product-modal-body">
            <div className="personalized-table-head">
              <div className="personalized-table-back">
                <Link
                  to="#"
                  onClick={() => {
                    setStep(1);
                    setAddressId("");
                    setCountryCode("");
                  }}
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
                  <span className="personalized-request-back-info">
                    {t("back")}
                  </span>
                </Link>
              </div>
            </div>
            <Formik
              initialValues={{
                name: "",
                contact_number: "",
                address: "",
                landmark: "",
                city: "",
                state: "",
                country: "",
                pincode: "",
                region_code: "",
              }}
              validationSchema={addAddressSchema}
              onSubmit={(values) => handleSubmit(values)}
              innerRef={formRef}
            >
              {({ touched, errors, values, setFieldValue, resetForm }) => (
                <FORM className="add-address-form">
                  <Row>
                    <Col md={12} lg={6} xl={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Field
                          className="form-control"
                          placeholder={t("name")}
                          type="text"
                          autoFocus={true}
                          name="name"
                        />
                        <ErrorMessage
                          name="name"
                          component={"div"}
                          className="error-msg text-danger text-right"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={12} lg={6} xl={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>{t("phone_number")}</Form.Label>
                        {/* <PhoneInput
                          className="contact_number"
                          placeholder="Enter phone number"
                          value={value}
                          onChange={setValue}
                        /> */}
                        <PhoneInput
                          name="contact_number"
                          defaultCountry={defaultCountry}
                          value={values.contact_number}
                          placeholder={t("mobile.placeholder")}
                          onChange={(value) =>
                            setFieldValue("contact_number", value)
                          }
                          international
                        />
                        <ErrorMessage
                          component="div"
                          name="contact_number"
                          className="error-msg text-danger text-right"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={12} lg={6} xl={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>{t("address")}</Form.Label>
                        <Field
                          rows={2}
                          className="form-control"
                          placeholder={t("address")}
                          type="text"
                          name="address"
                        />
                        <ErrorMessage
                          name="address"
                          component={"div"}
                          className="error-msg text-danger text-right"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={12} lg={6} xl={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>{t("city")}</Form.Label>
                        <Field
                          className="form-control"
                          placeholder={t("city")}
                          type="text"
                          name="city"
                        />
                        <ErrorMessage
                          name="city"
                          component={"div"}
                          className="error-msg text-danger text-right"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={12} lg={6} xl={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>{t("state")}</Form.Label>
                        <Field
                          className="form-control"
                          placeholder={t("state")}
                          type="text"
                          name="state"
                        />
                        <ErrorMessage
                          name="state"
                          component={"div"}
                          className="error-msg text-danger text-right"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={12} lg={6} xl={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>{t("country")}</Form.Label>
                        <Select
                          styles={customStyles}
                          name="country"
                          options={allCountries}
                          defaultValue={allCountries.find(
                            (option) => option.label == countryCode
                          )}
                          isSearchable={true}
                          onChange={(selectedOption, e) => {
                            setFieldValue("country", selectedOption.label);
                            setFieldValue("region_code", selectedOption.value);
                          }}
                          placeholder={t("country")}
                        />
                        {!values.country && (
                          <ErrorMessage
                            name="country"
                            component={"div"}
                            className="error-msg text-danger text-right"
                          />
                        )}
                      </Form.Group>
                    </Col>
                    <Col md={12} lg={6} xl={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>{t("landmark")}</Form.Label>
                        <Field
                          className="form-control"
                          placeholder={t("landmark")}
                          type="text"
                          name="landmark"
                        />
                        <ErrorMessage
                          name="landmark"
                          component={"div"}
                          className="error-msg text-danger text-right"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={12} lg={6} xl={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>{t("zipcode")}</Form.Label>
                        <Field
                          className="form-control"
                          placeholder={t("zipcode")}
                          type="text"
                          name="pincode"
                        />
                        <ErrorMessage
                          name="pincode"
                          component={"div"}
                          className="error-msg text-danger text-right"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <div className="order-confirm-address">
                    <Button
                      className="default-btn"
                      disabled={deliveryAddressSave.buttonDisable}
                      type="submit"
                    >
                      {deliveryAddressSave.buttonDisable
                        ? t("loading")
                        : editAddress
                        ? t("edit_address")
                        : t("add_address")}
                    </Button>
                  </div>
                </FORM>
              )}
            </Formik>
          </Modal.Body>
        )}
        {step == 4 && (
          <>
            <Modal.Body className="subscription-tip-ppv-tab">
              <div className="personalized-table-head">
                <div className="personalized-table-back">
                  <Link to="#" onClick={() => setStep(1)}>
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
                </div>
              </div>
              <Tab.Container
                id="left-tabs-example"
                defaultActiveKey={paymentType}
              >
                <Row>
                  <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                      {configuration.get(
                        "configData.is_wallet_payment_enabled"
                      ) == 1 ? (
                        // <Nav.Item>
                        //   <Nav.Link
                        //     onClick={() => setPaymentType("WALLET")}
                        //     eventKey="WALLET"
                        //   >
                        //     {t("wallet")}
                        //   </Nav.Link>
                        // </Nav.Item>
                        <span className="wallet-badge">{t("wallet")}</span>
                      ) : null}
                    </Nav>
                  </Col>
                  <Col sm={9}>
                    <div className="card-stripe-box">
                      <Form>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Control
                            type="text"
                            placeholder={t("pay_amount")}
                            value={props.show.price}
                            disabled
                          />
                        </Form.Group>
                        <Tab.Content>
                          {configuration.get(
                            "configData.is_wallet_payment_enabled"
                          ) == 1 ? (
                            <Tab.Pane eventKey="WALLET">
                              {wallet.loading ? (
                                ""
                              ) : (
                                <div className="card-stripe-box">
                                  <div className="wallet-balence-amount">
                                    <h4>{t("available")}</h4>
                                    <p>
                                      {
                                        wallet.data.user_wallet
                                          .remaining_formatted
                                      }
                                    </p>
                                  </div>
                                  {props.show.price >
                                  wallet.data.user_wallet.remaining ? (
                                    <div className="">
                                      <p className="conv-desc desc">
                                        {t(
                                          "low_wallet_balance_tips_payment_para"
                                        )}
                                      </p>
                                      <div className="d-flex">
                                        <Link
                                          to="/wallet"
                                          className="withdraw-money-btn"
                                        >
                                          {t("add_wallet_amount")}
                                        </Link>
                                      </div>
                                    </div>
                                  ) : null}
                                </div>
                              )}
                            </Tab.Pane>
                          ) : null}
                        </Tab.Content>
                      </Form>
                    </div>
                  </Col>
                </Row>
              </Tab.Container>
            </Modal.Body>
            <Modal.Footer>
              <div className="product-pay-now-btn-sec">
                <Button
                  type="button"
                  className="default-btn"
                  data-dismiss="modal"
                  onClick={() => handlePayment()}
                  disabled={
                    wallet.loading || productLiveStreamOrderPayment.loading
                  }
                >
                  {productLiveStreamOrderPayment.loading
                    ? t("loading")
                    : t("pay")}
                </Button>
                <Button
                  type="button"
                  className="default-btn"
                  data-dismiss="modal"
                  disabled={productLiveStreamOrderPayment.loading}
                  onClick={props.onHide}
                >
                  {t("cancel")}
                </Button>
              </div>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </>
  );
};

export default BuyNowModal;
