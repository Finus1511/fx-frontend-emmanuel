import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import "./CreaterFlow.css";
import { translate, t } from "react-multi-lang";
import { Formik, Form as FORM, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { prCreatorEditRequestStart } from "../../../store/actions/PersonalizeAction";

const EditRequestModal = (props) => {
  
  const dispatch = useDispatch();
  const creatorEditRequest = useSelector((state) => state.personalize.creatorEditRequest);
  const [skipRender, setSkipRender] = useState(true);

  const validationSchema = Yup.object().shape({
    amount: Yup.number()
      .required("Amount is required")
      .min(0.1, "Amount must be at least 0.1")
      .max(1000, "Amount can be max least 1000")
      .test("is-number", "Amount must be a number", (value) => !isNaN(value)),
    description: Yup.string().required(t("required")),
  });

  const handleSubmit = (values) => {
    dispatch(prCreatorEditRequestStart({
      ...values,
      unique_id: props.show.unique_id,
      status: 2,
    }))
  };

  useEffect(() => {
    if (!skipRender && !creatorEditRequest.loading && Object.keys(creatorEditRequest.data).length > 0) {
      props.onHide();
    }
    setSkipRender(false);
  }, [creatorEditRequest]);

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
            Edit Request ({props.show.unique_id})
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
                    />
                  </InputGroup>
                  <ErrorMessage
                    component={"div"}
                    name="amount"
                    className="error-msg text-danger text-right"
                  />
                </Form.Group>

                <Form.Group controlId="formBasicDescription" className="mb-3">
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
                    disabled={creatorEditRequest.loading}
                  >
                    {creatorEditRequest.loading ? "Loading" : "Update"}
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

export default EditRequestModal;
