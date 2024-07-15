import React, { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Form as FORM, Formik, Field, ErrorMessage } from "formik";
import "./Personalized.css";
import * as Yup from "yup";
import {
  prUserRejectRequestStart,
  prUserCancelRequestStart,
} from "../../store/actions/PersonalizeAction";
import { useDispatch, useSelector } from "react-redux";
import { translate, t } from "react-multi-lang";

const RejectionModal = (props) => {
  const userRejectRequest = useSelector(
    (state) => state.personalize.userRejectRequest
  );

  const userCancelRequest = useSelector(
    (state) => state.personalize.userCancelRequest
  );
  const formikRef = useRef();
  const dispatch = useDispatch();
  const [skipRender, setSkipRender] = useState(true);

  const rejectionSchema = Yup.object().shape({
    cancel_reason: Yup.string().required("Required *"),
  });

  const handleSubmit = (values) => {
    if (props.show.type == "reject") {
      dispatch(
        prUserRejectRequestStart({
          ...values,
          personalized_request_unique_id: props.show.unique_id,
        })
      );
    } else {
      dispatch(
        prUserCancelRequestStart({
          ...values,
          personalized_request_unique_id: props.show.unique_id,
        })
      );
    }
  };
  useEffect(() => {
    if (
      !userRejectRequest.loading &&
      !skipRender &&
      Object.keys(userRejectRequest.data).length > 0
    ) {
      props.onHide();
    }
    setSkipRender(false);
  }, [userRejectRequest]);

  useEffect(() => {
    if (
      !userCancelRequest.loading &&
      !skipRender &&
      Object.keys(userCancelRequest.data).length > 0
    ) {
      props.onHide();
    }
    setSkipRender(false);
  }, [userCancelRequest]);

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
            {props.show.type == "reject"
              ? t("enter_rejected_reason")
              : t("enter_cancel_reason")}
            {`(${props.show.unique_id})`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>{t("description")}</h4>
          <Formik
            initialValues={{
              cancel_reason: "",
            }}
            validationSchema={rejectionSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, setFieldValue, resetForm }) => (
              <FORM>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Field
                    className="form-control"
                    name="cancel_reason"
                    as="textarea"
                    rows={3}
                    placeholder={
                      props.show.type == "reject"
                        ? "Enter Rejection Reason"
                        : "Enter Cancel Reason"
                    }
                  />
                  <ErrorMessage
                    component="div"
                    name="cancel_reason"
                    className="errorMsg mt-3"
                  />
                </Form.Group>
                <div className="personalized-request-btn">
                  <Button
                    className="default-btn"
                    disabled={
                      userRejectRequest.buttonDisable ||
                      userCancelRequest.buttonDisable
                    }
                    type="submit"
                  >
                    {userRejectRequest.loading || userCancelRequest.loading
                      ? t("loading")
                      : t("submit")}
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

export default translate(RejectionModal);
