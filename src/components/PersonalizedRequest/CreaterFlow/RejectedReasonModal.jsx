import React, { useEffect, useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import "../Personalized.css";
import { Formik, Form as FORM, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { prUpdateAcceptRejectStart } from "../../../store/actions/PersonalizeAction";
import { translate, t } from "react-multi-lang";
import { useSelector, useDispatch } from "react-redux";

const RejectedReasonModal = (props) => {
  const dispatch = useDispatch();
  const updateAcceptReject = useSelector(
    (state) => state.personalize.updateAcceptReject
  );
  const [skipRender, setSkipRender] = useState(true);

  const validationSchema = Yup.object().shape({
    cancel_reason: Yup.string().required(t("required")),
  });

  const handleSubmit = (values) => {
    dispatch(
      prUpdateAcceptRejectStart({
        ...values,
        unique_id: props.show.unique_id,
        status: 3,
      })
    );
  };

  useEffect(() => {
    if (
      !skipRender &&
      !updateAcceptReject.loading &&
      Object.keys(updateAcceptReject.data).length > 0
    ) {
      props.onHide();
    }
    setSkipRender(false);
  }, [updateAcceptReject]);

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
            Reject Request ({props.show.unique_id})
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              amount: props.show.amount,
              description: props.show.description,
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ touched, errors, isSubmitting, setFieldValue, values }) => (
              <FORM noValidate>
                <Form.Group controlId="formBasicDescription" className="mb-3">
                  <Form.Label>Reject Reason</Form.Label>
                  <Field
                    class="form-control personalized-req-textarea"
                    as="textarea"
                    rows={3}
                    placeholder={t("description")}
                    name="cancel_reason"
                  />
                  <ErrorMessage
                    component={"div"}
                    name="cancel_reason"
                    className="error-msg text-danger text-right"
                  />
                </Form.Group>
                <div className="personalized-request-btn">
                  <Button
                    className="default-btn"
                    type="submit"
                    disabled={updateAcceptReject.loading}
                  >
                    {updateAcceptReject.loading ? "Loading" : "Reject"}
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

export default RejectedReasonModal;
