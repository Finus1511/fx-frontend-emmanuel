import React, { useEffect, useRef, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./Personalized.css";
import { Form as FORM, Formik, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { prRequestViewStart } from "../../store/actions/PersonalizeAction";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import { translate, t } from "react-multi-lang";

const PersonalizedPassword = (props) => {
  const downloadLinkRef = useRef(null);
  const history = useHistory();
  const dispatch = useDispatch();
  const [skipRender, setSkipRender] = useState(true);
  const [passwordShow, setShowPassword] = useState(false);
  const requestView = useSelector((state) => state.personalize.requestView);

  const passwordSchema = Yup.object().shape({
    password: Yup.string().required("Required *"),
  });

  useEffect(() => {
    if (
      !requestView.loading &&
      !skipRender &&
      Object.keys(requestView.data).length > 0
    ) {
      const { file } = requestView.data.personalized_requests;
      window.open(file, "_blank");
      props.onHide();
    }
    setSkipRender(false);
  }, [requestView]);

  const handleSubmit = (values) => {
    dispatch(
      prRequestViewStart({
        personalized_request_unique_id: props.show.unique_id,
        password: values.password,
      })
    );
  };

  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="rejection-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {t("enter_your_password")}
            {`(${props.show.unique_id})`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4> {t("password")}</h4>
          <Formik
            initialValues={{
              password: "",
            }}
            validationSchema={passwordSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, setFieldValue, resetForm }) => (
              <FORM>
                <div className="form-group">
                <InputGroup className="auth-input-group">
                  {/* <InputGroup.Text>
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
                  </InputGroup.Text> */}
                  <Field
                    type={passwordShow ? "text" : "password"}
                    name="password"
                    placeholder={t("password")}
                    className="form-control input-right-icon-form-control"
                  />
                  <InputGroup.Text
                    className="border-right-input"
                    onClick={() => setShowPassword(!passwordShow)}
                  >
                    {passwordShow ? (
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
                  component="div"
                  name="password"
                  className="errorMsg mt-3"
                />
                </div>
                <div className="personalized-request-btn">
                  <Button className="default-btn" type="submit">
                    {requestView.loading ? t("loading") : t("confirm")}
                  </Button>
                </div>
              </FORM>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default translate(PersonalizedPassword);
