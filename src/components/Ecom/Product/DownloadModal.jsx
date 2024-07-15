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
import { digitalProductDownloadStart } from "../../../store/actions/ProductsAction";
const REDIRECT_URI = window.location.href;

const DownloadModal = (props) => {

  const dispatch = useDispatch();
  const [loginPasswordVisible, setLoginPasswordVisible] = useState(false);
  const digitalProductDownload = useSelector((state) => state.userProducts.digitalProductDownload);
  const [skipRender, setSkipRender] = useState(true);

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required(t("password_is_required"))
      .matches(/^(?=.*[a-zA-Z0-9])(?=.{6,})/, t("password_required_note")),
  });

  const handleSubmit = (values) => {
    dispatch(digitalProductDownloadStart({
        ...values,
        user_product_id: props.product.user_product_id,
    }));
  };

  useEffect(()=> {
    console.log(digitalProductDownload)
    if(!skipRender && !digitalProductDownload.loading && Object.keys(digitalProductDownload.data).length > 0)
    {
        props.closeDownloadModal()
        window.open(digitalProductDownload.data.product_file, "_blank", "noreferrer");
    }
    setSkipRender(false);
  }, [digitalProductDownload])

  return (
    <>
      <Modal
        className="modal-dialog-center auth-modal"
        size="md"
        centered
        show={props.downloadModal}
        onHide={props.closeDownloadModal}
      >
        <Modal.Body>
          <h4>
            Download Digital Product
          </h4>
          <Button
            className="modal-close"
            onClick={() => {
              props.closeDownloadModal();
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
              <h5 className="mb-3">Please enter your password to download {props.product.name}.</h5>
              <div className="auth-sec">
                  <Formik
                    initialValues={{
                      password: configuration.get("configData.demo_user_password"),
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => handleSubmit(values)}
                  >
                    {({ touched, errors, isSubmitting, setFieldValue }) => (
                      <FORM noValidate>
                        <div className="form-group">
                          <Form.Label>{t("password")}</Form.Label>
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
                              className="form-control"
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
                        <div className="auth-btn-sec">
                          <Button
                            type="submit"
                            disabled={digitalProductDownload.buttonDisable}
                            className="default-btn"
                          >
                            {digitalProductDownload.buttonDisable ? t("loading") : t("download")}
                          </Button>
                        </div>
                      </FORM>
                    )}
                  </Formik>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DownloadModal;
