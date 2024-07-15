import React, { useEffect, useState } from "react";
import { Form, Button, Modal, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Formik, Form as FORM, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import {
  isAndroid,
  isIOS,
  isWindows,
  isMacOs,
  mobileModel,
  browserName,
  osName,
  mobileVendor,
  browserVersion,
} from "react-device-detect";
import {
  forgotPasswordStart,
  referralValidationStart,
  userLoginStart,
  userRegisterStart,
  usernameValidationStart,
} from "../../../store/actions/UserAction";
import { translate, t } from "react-multi-lang";
import configuration from "react-global-configuration";
import { useDispatch, useSelector } from "react-redux";
import { getErrorNotificationMessage } from "../../helper/NotificationMessage";
import { createNotification } from "react-redux-notify";
import { LoginSocialGoogle, LoginSocialFacebook } from "reactjs-social-login";
const REDIRECT_URI = window.location.href;

const SignInModal = (props) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(props.signIn);
  const [deviceUniqueId, setDeviceUniqueId] = useState("");
  const [loginPasswordVisible, setLoginPasswordVisible] = useState(false);
  const [additionalDetails, setAdditionalDetails] = useState({
    device_type: "",
    device_model: "",
    browser_type: browserName,
    device_token: "",
  });
  const [isvalidUserName, setIsValidUserName] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [userName, setUserName] = useState("");
  const login = useSelector((state) => state.users.loginInputData);
  const signup = useSelector((state) => state.users.registerInputData);
  const forgotPassword = useSelector(
    (state) => state.users.forgotPasswordInputData
  );
  const validation = useSelector((state) => state.users.validationInputData);

  useEffect(() => {
    getDeviceUniqueID();
  }, []);

  async function getDeviceUniqueID() {
    const fpPromise = FingerprintJS.load();
    const fp = await fpPromise;
    const result = await fp.get();
    setDeviceUniqueId(result.visitorId);
  }

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email(t("invalid_email"))
      .required(t("email_is_required")),
    password: Yup.string()
      .required(t("password_is_required"))
      .matches(/^(?=.*[a-zA-Z0-9])(?=.{6,})/, t("password_required_note")),
  });

  const handleLogin = (values) => {
    let newValues = {
      ...values,
      ...additionalDetails,
      device_unique_id: deviceUniqueId,
      isReload: props.isReload || 0,
    };
    dispatch(userLoginStart(newValues));
  };

  const registerSchema = Yup.object().shape({
    name: Yup.string().required(t("name_is_required")),
    username: Yup.string().required(t("username_is_required")),
    email: Yup.string()
      .email(t("invalid_email"))
      .required(t("email_is_required")),
    password: Yup.string()
      .required(t("password_is_required"))
      .matches(/^(?=.*[a-zA-Z0-9])(?=.{6,})/, t("password_required_note")),
  });

  const handleSignup = (values) => {
    let newValues = {
      ...values,
      ...additionalDetails,
      referral_code: referralCode,
      device_unique_id: deviceUniqueId,
    };
    dispatch(userRegisterStart(newValues));
  };

  const forgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email(t("invalid_email"))
      .required(t("email_is_required")),
  });

  const handleForgotPassword = (values) => {
    dispatch(forgotPasswordStart(values));
  };

  const handleFacebookLogin = (response) => {
    console.log("handleFacebookLogin", response);
    const emailAddress =
      response.email === undefined || response.email === null
        ? response.id + "@facebook.com"
        : response.email;
    dispatch(
      userRegisterStart({
        name: response.name,
        first_name: response.first_name ? response.first_name : "",
        last_name: response.last_name ? response.last_name : "",
        email: emailAddress,
        social_unique_id: response.userID,
        picture: response.picture ? response.picture.data.url : "",
        login_by: "facebook",
        device_token: additionalDetails.device_token,
      })
    );
  };

  const handleGoogleLogin = (response) => {
    console.log("handleGoogleLogin", response);
    dispatch(
      userRegisterStart({
        name: response.name,
        email: response.email,
        first_name: response.given_name ? response.given_name : "",
        last_name: response.family_name ? response.family_name : "",
        social_unique_id: response.sub,
        picture: response.picture,
        login_by: "google",
        device_token: additionalDetails.device_token,
      })
    );
  };

  const handleUsernameValidation = (username) => {
    if (username && username.length > 3) {
      if (username.replace(" ", "") === username) {
        if (username !== userName) {
          setUserName(username);
          setIsValidUserName(true);
          dispatch(usernameValidationStart({ username: username }));
          return "";
        }
      } else {
        setIsValidUserName(false);
        return t("no_white_space_allowed");
      }
    } else {
      setIsValidUserName(false);
      return t("must_contain_four_characters");
    }
  };

  const handleSocialLoginFailure = (err) => {
    console.error(err);
  };

  const checkReferralCode = (event) => {
    event.preventDefault();

    if (referralCode) {
      dispatch(referralValidationStart({ referral_code: referralCode }));
    } else {
      const notificationMessage = getErrorNotificationMessage(
        t("please_enter_the_referral_code")
      );
      dispatch(createNotification(notificationMessage));
    }
  };

  return (
    <>
      <Modal
        className="modal-dialog-center auth-modal"
        size="md"
        centered
        show={props.signIn}
        onHide={props.closeSignInModal}
      >
        <Modal.Body>
          <h4>
            {show == "login"
              ? t("login")
              : show == "signup"
              ? t("signup")
              : t("forgot_password")}
          </h4>
          <Button
            className="modal-close"
            onClick={() => {
              props.closeSignInModal();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              fill="none"
              viewBox="0 0 11 11"
            >
              <path
                fill="#979BA2"
                d="M10.756.252a.83.83 0 00-1.176 0L5.5 4.324 1.42.244A.83.83 0 10.244 1.42l4.08 4.08-4.08 4.08a.83.83 0 101.176 1.176l4.08-4.08 4.08 4.08a.831.831 0 101.176-1.176L6.676 5.5l4.08-4.08a.836.836 0 000-1.168z"
              ></path>
            </svg>
          </Button>
          <div className="auth-form-modal-sec">
            <div className="auth-form-sec">
              <div className="auth-social-link-box">
                <div className="auth-social-link-card">
                  {configuration.get("configData.FB_CLIENT_ID") ? (
                    <LoginSocialFacebook
                      appId={configuration.get(
                        "configData.social_logins.FB_CLIENT_ID"
                      )}
                      fieldsProfile={
                        "id,first_name,last_name,middle_name,name,name_format,picture,short_name,email,gender"
                      }
                      redirect_uri={REDIRECT_URI}
                      onResolve={({ provider, data }) => {
                        handleFacebookLogin(data);
                      }}
                      onReject={(err) => {
                        console.log(err);
                      }}
                    >
                      <Button className="auth-social-btn">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="icon icon-tabler icon-tabler-brand-facebook"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          stroke-width="2"
                          stroke="#878E96"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
                        </svg>
                        {t("login_with_facebook")}
                      </Button>
                    </LoginSocialFacebook>
                  ) : null}
                  {configuration.get("configData.GOOGLE_CLIENT_ID") ? (
                    <LoginSocialGoogle
                      client_id={configuration.get(
                        "configData.social_logins.GOOGLE_CLIENT_ID"
                      )}
                      redirect_uri={REDIRECT_URI}
                      scope="openid profile email"
                      discoveryDocs="claims_supported"
                      access_type="offline"
                      onResolve={({ provider, data }) => {
                        handleGoogleLogin(data);
                      }}
                      onReject={(err) => {
                        console.log(err);
                      }}
                    >
                      <Button className="auth-social-btn">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="icon icon-tabler icon-tabler-brand-google"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          stroke-width="2"
                          stroke="#878E96"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M20.945 11a9 9 0 1 1 -3.284 -5.997l-2.655 2.392a5.5 5.5 0 1 0 2.119 6.605h-4.125v-3h7.945z" />
                        </svg>
                        {t("login_with_google")}
                      </Button>
                    </LoginSocialGoogle>
                  ) : null}
                </div>
              </div>
              {(configuration.get("configData.FB_CLIENT_ID") ||configuration.get("configData.GOOGLE_CLIENT_ID")) ?<div className="divider-separtor-sec">
                <span>{t("or")}</span>
              </div>:null}
              <div className="auth-sec">
                {show === "login" ? (
                  <Formik
                    initialValues={{
                      email: configuration.get("configData.demo_user_email"),
                      password: configuration.get(
                        "configData.demo_user_password"
                      ),
                    }}
                    validationSchema={loginSchema}
                    onSubmit={(values) => handleLogin(values)}
                  >
                    {({ touched, errors, isSubmitting, setFieldValue }) => (
                      <FORM noValidate>
                        <div className="form-group mb-3">
                          <InputGroup>
                            <InputGroup.Text id="basic-addon1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 18 15"
                              >
                                <path
                                  fill="#DDE1E6"
                                  d="M18 10.784c0 2.324-2.016 4.208-4.527 4.216H4.545C2.043 15 0 13.125 0 10.8v-.008s.005-3.688.013-5.543c0-.349.432-.544.727-.327a969.228 969.228 0 016.01 4.472 3.848 3.848 0 002.277.742c.828 0 1.638-.267 2.277-.75.048-.03 3.786-2.808 5.957-4.405.295-.217.73-.022.73.325.009 1.84.009 5.478.009 5.478z"
                                ></path>
                                <path
                                  fill="#DDE1E6"
                                  d="M17.528 2.228C16.748.868 15.215 0 13.527 0H4.545C2.857 0 1.323.868.543 2.228a.685.685 0 00.2.899l6.682 4.949c.468.35 1.035.524 1.602.524h.018c.567 0 1.134-.174 1.602-.524l6.682-4.95a.685.685 0 00.2-.898z"
                                ></path>
                              </svg>
                            </InputGroup.Text>
                            <Field
                              type="email"
                              name="email"
                              placeholder={t("e_mail_address")}
                              className="form-control"
                            />
                          </InputGroup>
                          <ErrorMessage
                            component={"div"}
                            name="email"
                            className="text-danger text-right"
                          />
                        </div>
                        <div className="form-group">
                          <InputGroup className="auth-input-group">
                            <InputGroup.Text>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 16 19"
                              >
                                <path
                                  fill="#DDE1E6"
                                  d="M13.6 6.669V5.542C13.6 2.482 11.093 0 8 0 4.907 0 2.4 2.481 2.4 5.542v1.127A3.957 3.957 0 000 10.292v4.75C.003 17.227 1.792 18.997 4 19h8c2.208-.003 3.997-1.773 4-3.958v-4.75a3.957 3.957 0 00-2.4-3.623zm-4.8 6.79a.796.796 0 01-.8.791.796.796 0 01-.8-.792v-1.583c0-.437.358-.792.8-.792.442 0 .8.355.8.792v1.583zM12 6.332H4v-.791c0-2.186 1.79-3.959 4-3.959s4 1.773 4 3.959v.791z"
                                ></path>
                              </svg>
                            </InputGroup.Text>
                            <Field
                              type={loginPasswordVisible ? "text" : "password"}
                              name="password"
                              placeholder={t("password")}
                              className="form-control input-right-icon-form-control"
                            />
                            <InputGroup.Text
                              className="border-right-input"
                              onClick={() =>
                                setLoginPasswordVisible(!loginPasswordVisible)
                              }
                            >
                              {loginPasswordVisible ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                  fill="#8F95B2"
                                >
                                  <path
                                    d="M23.821 11.181a15.736 15.736 0 00-4.145-5.44l3.032-3.032-1.415-1.416L18 4.583A11.783 11.783 0 0012 3C4.5 3 1.057 9.261.179 11.181a1.969 1.969 0 000 1.64 15.736 15.736 0 004.145 5.44l-3.031 3.032 1.414 1.414L6 19.417A11.783 11.783 0 0012 21c7.5 0 10.943-6.261 11.821-8.181a1.968 1.968 0 000-1.638zM2 12.011C2.75 10.366 5.693 5 12 5a9.847 9.847 0 014.518 1.068l-1.765 1.765a4.992 4.992 0 00-6.92 6.92l-2.079 2.079A13.647 13.647 0 012 12.011zM15 12a3 3 0 01-3 3 2.951 2.951 0 01-1.285-.3l3.985-3.985A2.951 2.951 0 0115 12zm-6 0a3 3 0 013-3 2.951 2.951 0 011.285.3L9.3 13.285A2.951 2.951 0 019 12zm3 7a9.847 9.847 0 01-4.518-1.068l1.765-1.765a4.992 4.992 0 006.92-6.92l2.078-2.078A13.584 13.584 0 0122 12c-.764 1.657-3.708 7-10 7z"
                                    data-name="01 align center"
                                  ></path>
                                </svg>
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                  fill="#8F95B2"
                                >
                                  <g data-name="01 align center">
                                    <path d="M23.821 11.181C22.943 9.261 19.5 3 12 3S1.057 9.261.179 11.181a1.969 1.969 0 000 1.64C1.057 14.739 4.5 21 12 21s10.943-6.261 11.821-8.181a1.968 1.968 0 000-1.638zM12 19c-6.307 0-9.25-5.366-10-6.989C2.75 10.366 5.693 5 12 5c6.292 0 9.236 5.343 10 7-.764 1.657-3.708 7-10 7z"></path>
                                    <path d="M12 7a5 5 0 105 5 5.006 5.006 0 00-5-5zm0 8a3 3 0 113-3 3 3 0 01-3 3z"></path>
                                  </g>
                                </svg>
                              )}
                            </InputGroup.Text>
                          </InputGroup>
                          <ErrorMessage
                            component={"div"}
                            name="password"
                            className="text-danger text-right"
                          />
                        </div>
                        <div className="forgot-password-link-sec">
                          <Link
                            to="#"
                            onClick={() => setShow("forgotpassword")}
                            className="forgot-password-link"
                          >
                            {t("forgot_password")}
                          </Link>
                        </div>
                        <div className="auth-btn-sec">
                          <Button
                            type="submit"
                            disabled={login.buttonDisable}
                            className="default-btn"
                          >
                            {login.buttonDisable ? t("loading") : t("login")}
                          </Button>
                        </div>
                        <div className="auth-footer-sec">
                          <h5>
                            {t("do_not_have_an_account")}
                            <Link to="#" onClick={() => setShow("signup")}>
                              {t("signup")}
                            </Link>
                          </h5>
                        </div>
                      </FORM>
                    )}
                  </Formik>
                ) : null}
                {show === "signup" ? (
                  <Formik
                    initialValues={{
                      name: "",
                      username: "",
                      email: "",
                      password: "",
                    }}
                    validationSchema={registerSchema}
                    onSubmit={(values) => handleSignup(values)}
                  >
                    {({ touched, errors, isSubmitting, setFieldValue }) => (
                      <FORM noValidate>
                        <div className="form-group mb-3">
                          <InputGroup>
                            <InputGroup.Text id="basic-addon1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="#DDE1E6"
                                x="0"
                                y="0"
                                enableBackground="new 0 0 512 512"
                                version="1.1"
                                viewBox="0 0 512 512"
                                xmlSpace="preserve"
                              >
                                <circle cx="256" cy="128" r="128"></circle>
                                <path d="M256 298.667c-105.99.118-191.882 86.01-192 192C64 502.449 73.551 512 85.333 512h341.333c11.782 0 21.333-9.551 21.333-21.333-.117-105.99-86.009-191.883-191.999-192z"></path>
                              </svg>
                            </InputGroup.Text>
                            <Field
                              type="text"
                              name="name"
                              placeholder={t("name")}
                              className="form-control"
                              autoComplete="off"
                            />
                          </InputGroup>
                          <ErrorMessage
                            component={"div"}
                            name="name"
                            className="text-danger text-right"
                          />
                        </div>
                        <div className="form-group mb-3">
                          <InputGroup>
                            <InputGroup.Text id="basic-addon1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="#DDE1E6"
                                x="0"
                                y="0"
                                enableBackground="new 0 0 512 512"
                                version="1.1"
                                viewBox="0 0 512 512"
                                xmlSpace="preserve"
                              >
                                <circle cx="256" cy="128" r="128"></circle>
                                <path d="M256 298.667c-105.99.118-191.882 86.01-192 192C64 502.449 73.551 512 85.333 512h341.333c11.782 0 21.333-9.551 21.333-21.333-.117-105.99-86.009-191.883-191.999-192z"></path>
                              </svg>
                            </InputGroup.Text>
                            <Field
                              type="text"
                              name="username"
                              placeholder={t("username")}
                              className="form-control"
                              validate={handleUsernameValidation}
                              autoComplete="off"
                            />
                          </InputGroup>
                          <ErrorMessage
                            component={"div"}
                            name="username"
                            className="text-danger text-right"
                          />
                          {validation.isInValid && isvalidUserName ? (
                            <div class="text-danger text-right">
                              {validation.errorMessage ??
                                t("username_already_taken")}
                            </div>
                          ) : (
                            ""
                          )}
                          {validation.isValid && isvalidUserName ? (
                            <div class="text-success text-right">
                              {t("looks_good")}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="form-group mb-3">
                          <InputGroup>
                            <InputGroup.Text id="basic-addon1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 18 15"
                              >
                                <path
                                  fill="#DDE1E6"
                                  d="M18 10.784c0 2.324-2.016 4.208-4.527 4.216H4.545C2.043 15 0 13.125 0 10.8v-.008s.005-3.688.013-5.543c0-.349.432-.544.727-.327a969.228 969.228 0 016.01 4.472 3.848 3.848 0 002.277.742c.828 0 1.638-.267 2.277-.75.048-.03 3.786-2.808 5.957-4.405.295-.217.73-.022.73.325.009 1.84.009 5.478.009 5.478z"
                                ></path>
                                <path
                                  fill="#DDE1E6"
                                  d="M17.528 2.228C16.748.868 15.215 0 13.527 0H4.545C2.857 0 1.323.868.543 2.228a.685.685 0 00.2.899l6.682 4.949c.468.35 1.035.524 1.602.524h.018c.567 0 1.134-.174 1.602-.524l6.682-4.95a.685.685 0 00.2-.898z"
                                ></path>
                              </svg>
                            </InputGroup.Text>
                            <Field
                              type="email"
                              name="email"
                              placeholder={t("email_address")}
                              className="form-control"
                              autoComplete="off"
                            />
                          </InputGroup>
                          <ErrorMessage
                            component={"div"}
                            name="email"
                            className="text-danger text-right"
                          />
                        </div>
                        <div className="form-group">
                          <InputGroup className="mb-0 auth-input-group">
                            <InputGroup.Text>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 16 19"
                              >
                                <path
                                  fill="#DDE1E6"
                                  d="M13.6 6.669V5.542C13.6 2.482 11.093 0 8 0 4.907 0 2.4 2.481 2.4 5.542v1.127A3.957 3.957 0 000 10.292v4.75C.003 17.227 1.792 18.997 4 19h8c2.208-.003 3.997-1.773 4-3.958v-4.75a3.957 3.957 0 00-2.4-3.623zm-4.8 6.79a.796.796 0 01-.8.791.796.796 0 01-.8-.792v-1.583c0-.437.358-.792.8-.792.442 0 .8.355.8.792v1.583zM12 6.332H4v-.791c0-2.186 1.79-3.959 4-3.959s4 1.773 4 3.959v.791z"
                                ></path>
                              </svg>
                            </InputGroup.Text>
                            <Field
                              type={loginPasswordVisible ? "text" : "password"}
                              name="password"
                              placeholder={t("password")}
                              className="form-control input-right-icon-form-control"
                              autoComplete="off"
                            />
                            <InputGroup.Text className="border-right-input">
                              <button
                                onClick={() =>
                                  setLoginPasswordVisible(!loginPasswordVisible)
                                }
                                class="btn password-eye"
                                type="button"
                              >
                                {loginPasswordVisible ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="20"
                                  height="20"
                                  viewBox="0 0 24 24"
                                  fill="#8F95B2"
                                >
                                  <path
                                    d="M23.821 11.181a15.736 15.736 0 00-4.145-5.44l3.032-3.032-1.415-1.416L18 4.583A11.783 11.783 0 0012 3C4.5 3 1.057 9.261.179 11.181a1.969 1.969 0 000 1.64 15.736 15.736 0 004.145 5.44l-3.031 3.032 1.414 1.414L6 19.417A11.783 11.783 0 0012 21c7.5 0 10.943-6.261 11.821-8.181a1.968 1.968 0 000-1.638zM2 12.011C2.75 10.366 5.693 5 12 5a9.847 9.847 0 014.518 1.068l-1.765 1.765a4.992 4.992 0 00-6.92 6.92l-2.079 2.079A13.647 13.647 0 012 12.011zM15 12a3 3 0 01-3 3 2.951 2.951 0 01-1.285-.3l3.985-3.985A2.951 2.951 0 0115 12zm-6 0a3 3 0 013-3 2.951 2.951 0 011.285.3L9.3 13.285A2.951 2.951 0 019 12zm3 7a9.847 9.847 0 01-4.518-1.068l1.765-1.765a4.992 4.992 0 006.92-6.92l2.078-2.078A13.584 13.584 0 0122 12c-.764 1.657-3.708 7-10 7z"
                                    data-name="01 align center"
                                  ></path>
                                </svg>
                                ) : (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="#8F95B2"
                                  >
                                    <g data-name="01 align center">
                                      <path d="M23.821 11.181C22.943 9.261 19.5 3 12 3S1.057 9.261.179 11.181a1.969 1.969 0 000 1.64C1.057 14.739 4.5 21 12 21s10.943-6.261 11.821-8.181a1.968 1.968 0 000-1.638zM12 19c-6.307 0-9.25-5.366-10-6.989C2.75 10.366 5.693 5 12 5c6.292 0 9.236 5.343 10 7-.764 1.657-3.708 7-10 7z"></path>
                                      <path d="M12 7a5 5 0 105 5 5.006 5.006 0 00-5-5zm0 8a3 3 0 113-3 3 3 0 01-3 3z"></path>
                                    </g>
                                  </svg>
                                )}
                              </button>
                            </InputGroup.Text>
                          </InputGroup>
                          <ErrorMessage
                            component={"div"}
                            name="password"
                            className="text-danger text-right"
                          />
                        </div>
                        <div className="form-group"></div>
                        <div className="auth-static-page-sec">
                          <h5>
                            {t("signing_up_confirmation")}{" "}
                            <Link to={`/page/terms`} target="_blank">
                              {t("terms_of_service")}
                            </Link>{" "}
                            {t("and")}{" "}
                            <Link to={`/page/privacy`} target="_blank">
                              {t("privacy_policy")}
                            </Link>
                          </h5>
                        </div>
                        <div className="auth-btn-sec">
                          <Button type="submit" className="default-btn">
                            {signup.loadingButtonContent !== null
                              ? t("loading")
                              : t("signup")}
                          </Button>
                        </div>
                        <div className="auth-footer-sec">
                          <h5>
                            {t("already_have_an_account")}
                            <Link to="#" onClick={() => setShow("login")}>
                              {t("login")}
                            </Link>
                          </h5>
                        </div>
                      </FORM>
                    )}
                  </Formik>
                ) : null}
                {show === "forgotpassword" ? (
                  <Formik
                    initialValues={{
                      email: "",
                    }}
                    validationSchema={forgotPasswordSchema}
                    onSubmit={(values) => handleForgotPassword(values)}
                  >
                    {({ touched, errors, isSubmitting, setFieldValue }) => (
                      <FORM noValidate>
                        <div className="form-group mb-3">
                          <InputGroup className="auth-input-group">
                            <InputGroup.Text>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 16 19"
                              >
                                <path
                                  fill="#DDE1E6"
                                  d="M13.6 6.669V5.542C13.6 2.482 11.093 0 8 0 4.907 0 2.4 2.481 2.4 5.542v1.127A3.957 3.957 0 000 10.292v4.75C.003 17.227 1.792 18.997 4 19h8c2.208-.003 3.997-1.773 4-3.958v-4.75a3.957 3.957 0 00-2.4-3.623zm-4.8 6.79a.796.796 0 01-.8.791.796.796 0 01-.8-.792v-1.583c0-.437.358-.792.8-.792.442 0 .8.355.8.792v1.583zM12 6.332H4v-.791c0-2.186 1.79-3.959 4-3.959s4 1.773 4 3.959v.791z"
                                ></path>
                              </svg>
                            </InputGroup.Text>
                            <Field
                              type="email"
                              name="email"
                              placeholder={t("email_address")}
                              className="form-control input-right-icon-form-control"
                            />
                          </InputGroup>
                          <ErrorMessage
                            component={"div"}
                            name="email"
                            className="text-danger text-right"
                          />
                        </div>
                        <div className="auth-btn-sec">
                          <Button
                            className="default-btn"
                            type="submit"
                            disabled={forgotPassword.buttonDisable}
                          >
                            {forgotPassword.loadingButtonContent !== null
                              ? t("loading")
                              : t("request_reset_link")}
                          </Button>
                        </div>
                        <div className="auth-footer-sec">
                          <h5>
                            {t("already_have_an_account")}
                            <Link to="#" onClick={() => setShow("login")}>
                              {t("login")}
                            </Link>
                          </h5>
                        </div>
                      </FORM>
                    )}
                  </Formik>
                ) : null}
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SignInModal;
