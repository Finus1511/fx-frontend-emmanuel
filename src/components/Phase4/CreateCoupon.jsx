import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
  Image,
  Form,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { Radio, Checkbox } from "pretty-checkbox-react";
import Switch from "react-switch";
import Select from "react-select";
import "./Phase4.css";
import { translate, t } from "react-multi-lang";
import { Form as FORM, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  createCouponCodeStart,
  generatCouponCodeStart,
} from "../../store/actions/PremiumFolderAction";
import { useDispatch, useSelector } from "react-redux";
import { ButtonLoader } from "../helper/Loader";

const CreateCoupon = () => {
  const dispatch = useDispatch();
  const createCouponCode = useSelector((state) => state.folder.createCouponCode);
  const generateCouponCode = useSelector((state) => state.folder.generateCouponCode);
  
  const formRef = useRef();
  const [checked, setChecked] = useState(false);
  const [expiry, setExpiry] = useState(false);
  const [skiprender, setSkiprender] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const history = useHistory();

  const handleChange = (checked) => {
    if (checked) {
      formRef.current.setFieldValue("status", 1);
    } else {
      formRef.current.setFieldValue("status", 0);
    }
    setChecked(checked);
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

  const options = [
    { value: "all-payments", label: t("all-payments") },
    { value: "subscription-payments", label: t("subscription_payments") },
    { value: "user-tips", label: t("user_tips") },
    { value: "post-payments", label: t("post_payments") },
    { value: "video-call-payments", label: t("video_call_payments") },
    { value: "audio-call-payments", label: t("audio_call_payments") },
    { value: "chat-asset-payments", label: t("chat_asset_payments") },
    { value: "order-payments", label: t("order_payments") },
    { value: "live-video-payments", label: t("live_video_payments") },
    { value: "total-payments", label: t("total_payments") },
  ];

  const CouponSchema = (expiry) => {
    const baseSchema = {
      promo_code: Yup.string().required(t("required")),
      amount_type: Yup.string().required(t("required")),
      amount: Yup.string().required(t("required")),
      platform: Yup.string().required(t("required")),
      no_of_users_limit: Yup.string().required(t("required")),
      per_users_limit: Yup.string().required(t("required")),
      start_date: Yup.string().required(t("required")),
    };

    if (expiry) {
      baseSchema.expiry_date = Yup.string().required(t("required"));
    } else {
      baseSchema.expiry_date = Yup.string();
    }

    return Yup.object().shape(baseSchema);
  };

  const handleSubmit = (values) => {
    dispatch(createCouponCodeStart({...values, promo_code: values.promo_code.toUpperCase()}));
  };

  const handleGenerateCoupon = () => {
    dispatch(generatCouponCodeStart(8));
  };

  useEffect(() => {
    if (!skiprender && Object.keys(createCouponCode.data).length > 0) {
      history.push("/coupon-details-table");
    }
    setSkiprender(false);
  }, [createCouponCode]);

  useEffect(() => {
    if (!skiprender && Object.keys(generateCouponCode.data).length > 0) {
      formRef.current.setFieldValue(
        "promo_code",
        generateCouponCode.data.coupon_code
      );
    }
    setSkiprender(false);
  }, [generateCouponCode]);

  const handleExpiry = (data) => {
    if (data) {
      formRef.current.setValues({
        ...formRef.current.values,
        expiry_date: "",
      });
    } else {
      const { expiry_date, ...rest } = formRef.current.values;
      formRef.current.setValues(rest);
    }
    setExpiry(data);
  };

  const getMinDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const handleKeyDown = (e) => {
    // Allow only alphanumeric characters
    if (!/[a-zA-Z0-9]/.test(e.key) && e.key.length === 1) {
      e.preventDefault();
    }
  };

  return (
    <div className="new-home-page-sec mb-0">
      <Container fluid>
        <div className="personalized-request-box">
          <Row className="align-items-center">
            <Col md={12}>
              <div className="personalized-table-head">
                <div className="personalized-table-back">
                  <Link to="#" onClick={() => history.goBack()}>
                    {/* <Link to="#" onClick={() => history.goBack()}> */}
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
                    <h4>{t("create_coupon")}</h4>
                  </div>
                </div>
              </div>
              <div className="create-coupon-sec">
                <Row className="justify-content-center">
                  <Col lg={8}>
                    <Formik
                      initialValues={{
                        promo_code: "",
                        amount_type: 0,
                        amount: "",
                        platform: "",
                        no_of_users_limit: "",
                        per_users_limit: "",
                        start_date: "",
                        expiry_date: "",
                        status: 0,
                      }}
                      validationSchema={CouponSchema(expiry)}
                      onSubmit={handleSubmit}
                      innerRef={formRef}
                      enableReinitialize={true}
                    >
                      {({
                        errors,
                        touched,
                        values,
                        setFieldValue,
                        resetForm,
                        setFieldError,
                      }) => (
                        <FORM>
                          <div className="coupon-card-box">
                            <div className="coupon-card-primary">
                              <h4>{t("coupon_code")}</h4>
                              <Form>
                                <Form.Group className="mb-0">
                                  <Form.Label>
                                    {t("generate_coupon")}
                                  </Form.Label>
                                  <Field
                                    className="form-control promo-code-text"
                                    name="promo_code"
                                    type="text"
                                    placeholder="Generate coupon code"
                                    onKeyDown={handleKeyDown}
                                  />
                                </Form.Group>
                                <Button
                                  disabled={generateCouponCode.loading}
                                  onClick={() => handleGenerateCoupon()}
                                >
                                  {generateCouponCode.loading ? (
                                    <ButtonLoader />
                                  ) : (
                                    t("generate_code")
                                  )}
                                </Button>
                              </Form>
                              <ErrorMessage
                                component={"div"}
                                name="promo_code"
                                className="error-msg text-danger text-right"
                              />
                              <p>{t("customer_discount")}</p>
                            </div>
                            <div className="coupon-card">
                              <h4>{t("type")}</h4>
                              <div className="coupon-amount-types">
                                <Radio
                                  className="coupon-amount-radio"
                                  name="amount_type"
                                  checked={values.amount_type == 0}
                                  onClick={(e) =>
                                    setFieldValue("amount_type", 0)
                                  }
                                  value="thin-crust"
                                >
                                  <span>{t("percentage")}</span>
                                </Radio>
                                <Radio
                                  className="coupon-amount-radio"
                                  name="amount_type"
                                  checked={values.amount_type == 1}
                                  onClick={(e) =>
                                    setFieldValue("amount_type", 1)
                                  }
                                  value="regular-crust"
                                >
                                  <span>{t("fixed_amount")}</span>
                                </Radio>
                              </div>
                            </div>
                            <ErrorMessage
                              component={"div"}
                              name="amount_type"
                              className="error-msg text-danger text-right"
                            />
                            <div className="coupon-card">
                              <h4>{t("value")}</h4>
                              <div className="coupon-amount-types">
                                <Form.Group>
                                  <Form.Label>
                                    {t("enter_discount_value")}
                                  </Form.Label>
                                  <InputGroup>
                                    <Field
                                      className="form-control"
                                      type="number"
                                      name="amount"
                                      aria-label="Amount (to the nearest dollar)"
                                      min="1"
                                      max={values.amount_type == 0 ? 100 : null}
                                    />
                                    {values.amount_type == 0 ?
                                      <InputGroup.Text>%</InputGroup.Text>
                                      :
                                      null}
                                  </InputGroup>
                                  <ErrorMessage
                                    component={"div"}
                                    name="amount"
                                    className="error-msg text-danger text-right"
                                  />
                                </Form.Group>
                              </div>
                            </div>

                            <div className="coupon-card">
                              <h4>{t("applies_on")}</h4>
                              <div className="coupon-amount-types">
                                <Form.Group>
                                  <Form.Label>
                                    {t("coupon_discount_applies")}
                                  </Form.Label>
                                  <Select
                                    defaultValue={selectedOption}
                                    onChange={(option) =>
                                      setFieldValue("platform", option.value)
                                    }
                                    options={options}
                                    styles={customStyles}
                                  />
                                  <ErrorMessage
                                    component={"div"}
                                    name="platform"
                                    className="error-msg text-danger text-right"
                                  />
                                </Form.Group>
                              </div>
                            </div>
                            <div className="coupon-card">
                              <h4>{t("usage_limits")}</h4>
                              <div className="coupon-amount-types">
                                <Form.Group>
                                  <Radio
                                    className="coupon-amount-radio"
                                    name="no_of_users_limit"
                                    value="thin-crust"
                                    checked
                                  >
                                    <span>{t("limit_total_number_of_uses")}</span>
                                  </Radio>
                                  <InputGroup className="mb-4 mt-4">
                                    <Field
                                      className="form-control"
                                      type="number"
                                      name="no_of_users_limit"
                                      aria-label="Amount (to the nearest dollar)"
                                      min="1"
                                    />
                                  </InputGroup>
                                  <ErrorMessage
                                    component={"div"}
                                    name="no_of_users_limit"
                                    className="error-msg text-danger text-right"
                                  />
                                </Form.Group>
                                <Form.Group>
                                  <Radio
                                    className="coupon-amount-radio"
                                    name="per_users_limit"
                                    value="regular-crust"
                                    checked
                                  >
                                    <span>{t("limit_number_of_uses_per_customer")}</span>
                                  </Radio>
                                  <InputGroup className="mb-4 mt-4">
                                    <Field
                                      className="form-control"
                                      type="number"
                                      name="per_users_limit"
                                      aria-label="Amount (to the nearest dollar)"
                                      min="1"
                                    />
                                  </InputGroup>
                                  <ErrorMessage
                                    component={"div"}
                                    name="per_users_limit"
                                    className="error-msg text-danger text-right"
                                  />
                                </Form.Group>
                              </div>
                            </div>
                            <div className="coupon-card">
                              <h4>{t("active_dates")}</h4>
                              <div className="create-coupon-input">
                                <Form.Group>
                                  <Form.Label>
                                    {t("start_date_and_time")}
                                  </Form.Label>
                                  <Form.Control
                                    id="schedule-time-input"
                                    type="datetime-local"
                                    className="form-control mb-4"
                                    placeholder="start_date"
                                    name="start_date"
                                    min={getMinDateTime()}
                                    onChange={(e) =>
                                      setFieldValue(
                                        "start_date",
                                        e.target.value
                                      )
                                    }
                                  />
                                </Form.Group>
                              </div>
                              <ErrorMessage
                                component={"div"}
                                name="start_date"
                                className="error-msg text-danger text-right"
                              />
                              <div className="coupon-amount-types">
                                <Radio
                                  className="coupon-amount-radio mb-3"
                                  name="expiryDate"
                                  checked={expiry}
                                  onClick={() => handleExpiry(!expiry)}
                                >
                                  <span>{t("set_expiry_date")}</span>
                                </Radio>
                              </div>
                              {expiry && (
                                <div className="create-coupon-input">
                                  <Form.Group>
                                    <Form.Label>
                                      {t("expiry_date_and_time")}
                                    </Form.Label>
                                    <Form.Control
                                      id="schedule-time-input"
                                      type="datetime-local"
                                      className="form-control"
                                      placeholder="expiry_date"
                                      name="expiry_date"
                                      min={values.start_date}
                                      onChange={(e) =>
                                        setFieldValue(
                                          "expiry_date",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </Form.Group>
                                </div>
                              )}
                            </div>

                            <div className="coupon-card">
                              <div className="coupon-card-switch">
                                <h4>{t("coupon_code_is_enabled")}</h4>
                                <Switch
                                  onChange={handleChange}
                                  checked={checked}
                                />
                              </div>
                            </div>
                            <ErrorMessage
                              component={"div"}
                              name="status"
                              className="error-msg text-danger text-right"
                            />
                            <div className="coupon-card-btn">
                              <Button
                                className="default-cancel-btn">
                                {t("cancel")}
                              </Button>
                              <Button
                                className="default-btn"
                                disabled={createCouponCode.loading}
                                type="submit"
                              >
                                {createCouponCode.loading ? (
                                  <ButtonLoader />
                                ) : (
                                  t("create")
                                )}
                              </Button>
                            </div>
                          </div>
                        </FORM>
                      )}
                    </Formik>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default translate(CreateCoupon);
