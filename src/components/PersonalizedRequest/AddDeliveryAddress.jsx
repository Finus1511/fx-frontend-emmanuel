import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Form, Image, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import "react-phone-number-input/style.css";
import { Form as FORM, Formik, Field, ErrorMessage } from "formik";
import PhoneInput, {
  formatPhoneNumberIntl,
  isValidPhoneNumber,
  isPossiblePhoneNumber,
} from "react-phone-number-input";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import "./Personalized.css";
import * as Yup from "yup";
import { translate, t } from "react-multi-lang";
import axios from "axios";
import PaymentModal from "./PaymentModal";

const AddDeliveryAddress = () => {
  const formRef = useRef();
  const history = useHistory();
  const location = useLocation();
  const [defaultCountry, setDefaultCountry] = useState("");
  const [paymentModal, setPaymentModal] = useState(false);

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

  useEffect(() => {
    const getUserLocation = async () => {
      try {
        const response = await axios.get("http://ip-api.com/json/");
        setDefaultCountry(response.data.countryCode);
      } catch (error) {
        // If the API call fails, you can set a fallback country code here.
        setDefaultCountry("IN");
      }
    };
    getUserLocation();
  }, []);

  const AddressSchema = Yup.object().shape({
    name: Yup.string()
      .required(t("required"))
      .matches(/^\S.*$/, t("required"))
      .trim(),
    address: Yup.string().required(t("required")),
    contact_number: Yup.string()
      .test(
        "valid-mobile",
        t("address_invalid", { value: "phone number" }),
        (value) => {
          if (!value) {
            return false;
          }
          return isValidPhoneNumber(value);
        }
      )
      .required(t("required")),
    city: Yup.string()
      .required(t("required"))
      .matches(/^[A-Za-z]+$/, t("address_invalid", { value: "city" })),
    pincode: Yup.string().required(t("required")),
    flat_no: Yup.string().required(t("required")),
    landmark: Yup.string().required(t("required")),
    state: Yup.string()
      .required(t("required"))
      .matches(/^[A-Za-z]+$/, t("address_invalid", { value: "state" })),
    country: Yup.string()
      .required(t("required"))
      .matches(/^[A-Za-z ]+$/, t("address_invalid", { value: "country" })),
  });

  const handleSubmit = (values) => {
    const { flat_no, address, ...data } = values;
    const flatNoAndAddress = `${values.flat_no}, ${values.address}`;
    const intlNo = formatPhoneNumberIntl(values.contact_number);
    const countryCode = intlNo.substring(
      intlNo.indexOf("+") + 1,
      intlNo.indexOf(" ")
    );
    const mobile = intlNo
      .substring(intlNo.indexOf(" "), intlNo.length)
      .replaceAll(" ", "");

    setPaymentModal({
      ...data,
      address: flatNoAndAddress,
      contact_number: mobile,
      country_code: countryCode,
      amount: location.state.amount,
      type: location.state.type,
      unique_id: location.state.unique_id,
    });
  };

  return (
    <div className="new-home-page-sec">
      <Container fluid>
        <div className="personalized-request-box">
          <div className="personalized-table-back personal-request-top-space">
            <Link
              to=""
              onClick={() =>
                history.goBack({
                  amount: location.state.amount,
                  type: location.state.type,
                  unique_id: location.state.unique_id,
                })
              }
            >
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
              <h4>{t("delivery_address")}</h4>
            </div>
          </div>
          <Row className="align-items-center justify-content-center">
            <Col md={8}>
              <Formik
                initialValues={{
                  name: "",
                  address: "",
                  pincode: "",
                  country: "",
                  city: "",
                  state: "",
                  landmark: "",
                  contact_number: "",
                  flat_no: "",
                }}
                validationSchema={AddressSchema}
                onSubmit={handleSubmit}
                innerRef={formRef}
              >
                {({
                  errors,
                  touched,
                  setFieldValue,
                  resetForm,
                  setFieldError,
                }) => (
                  <FORM className="delivery-address-form">
                    <Row>
                      <Col md={6}>
                        <Form.Group controlId="formBasicEmail">
                          <Form.Label>{t("full_name")}</Form.Label>
                          <Field
                            className="form-control"
                            name="name"
                            type="text"
                            placeholder="Eg. John Duo"
                          />
                          <ErrorMessage
                            component="div"
                            name="name"
                            className="errorMsg"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="formBasicEmail">
                          <Form.Label>{t("phone_number")}</Form.Label>

                          <PhoneInput
                            name="contact_number"
                            defaultCountry={defaultCountry}
                            placeholder={t("mobile.placeholder")}
                            onChange={(value) =>
                              setFieldValue("contact_number", value)
                            }
                            international
                          />
                          <ErrorMessage
                            component="div"
                            name="contact_number"
                            className="errorMsg"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="formBasicEmail">
                          <Form.Label>{t("zipcode")}</Form.Label>
                          <Field
                            className="form-control"
                            name="pincode"
                            type="number"
                            placeholder="Eg. 6 digits (0-9) zip code"
                          />
                          <ErrorMessage
                            component="div"
                            name="pincode"
                            className="errorMsg"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="formBasicEmail">
                          <Form.Label>{t("flat_no")}</Form.Label>
                          <Field
                            className="form-control"
                            name="flat_no"
                            type="number"
                            placeholder="Flat,House no., Company, Apartment"
                          />
                          <ErrorMessage
                            component="div"
                            name="flat_no"
                            className="errorMsg"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="formBasicEmail">
                          <Form.Label>{t("street_address")}</Form.Label>
                          <Field
                            className="form-control"
                            name="address"
                            type="text"
                            placeholder="Area, Street, Sector, Village"
                          />
                          <ErrorMessage
                            component="div"
                            name="address"
                            className="errorMsg"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="formBasicEmail">
                          <Form.Label>{t("landmark")}</Form.Label>
                          <Field
                            className="form-control"
                            name="landmark"
                            type="text"
                            placeholder="Eg. Appollo Hospital"
                          />
                          <ErrorMessage
                            component="div"
                            name="landmark"
                            className="errorMsg"
                          />
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group controlId="formBasicEmail">
                          <Form.Label>{t("city_town")}</Form.Label>
                          <Field
                            className="form-control"
                            name="city"
                            type="text"
                            placeholder="Enter your Town/City name"
                          />
                          <ErrorMessage
                            component="div"
                            name="city"
                            className="errorMsg"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="formBasicEmail">
                          <Form.Label>{t("state")}</Form.Label>
                          <Field
                            className="form-control"
                            name="state"
                            type="text"
                            placeholder="Enter your state name"
                          />
                          <ErrorMessage
                            component="div"
                            name="state"
                            className="errorMsg"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="formBasicEmail">
                          <Form.Label>{t("country")}</Form.Label>
                          <Field
                            className="form-control"
                            name="country"
                            type="text"
                            placeholder="Enter your Town/City name"
                          />
                          <ErrorMessage
                            component="div"
                            name="country"
                            className="errorMsg"
                          />
                        </Form.Group>
                      </Col>
                      <Col md="12">
                        <div className="delivery-btn">
                          <Button className="default-btn" type="submit">
                            {t("add_address")}
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </FORM>
                )}
              </Formik>
            </Col>
            <Col md={4} className="resp-display-none">
              <div class="personal-request-img-sec">
                <Image
                  className="personal-request-img"
                  src={
                    window.location.origin + "/assets/images/delivery-from.png"
                  }
                  alt=""
                />
              </div>
            </Col>
          </Row>
        </div>
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

export default translate(AddDeliveryAddress);
