import React, { useEffect, useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import "./Personalized.css";
import { Formik, Form as FORM, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { prUpdateAcceptRejectStart } from "../../store/actions/PersonalizeAction";
import { translate, t } from "react-multi-lang";
import { useSelector, useDispatch } from "react-redux";
import "./Personalized.css";

const RejectedReasonModal = (props) => {
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
            {t("rejected_reason")}
            {`(${props.show.unique_id})`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Enter Rejection Reason"
              value={props.show.cancel_reason}
              disabled={true}
            />
          </Form.Group>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default translate(RejectedReasonModal);
