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
import { prUpdateAcceptRejectStart } from "../../../store/actions/PersonalizeAction";

const AcceptRequestModal = (props) => {
  
  const dispatch = useDispatch();
  const updateAcceptReject = useSelector((state) => state.personalize.updateAcceptReject);
  const [skipRender, setSkipRender] = useState(true);

  const handleSubmit = () => {
    dispatch(
      prUpdateAcceptRejectStart({
        unique_id: props.show.unique_id,
        status: 2,
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
            Accept Request ({props.show.unique_id})
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Do you want to accept this request?</h4>
          <div className="personalized-request-btn">
            <Button
              className="default-btn"
              onClick={()=> handleSubmit()}
              disabled={updateAcceptReject.loading}
            >
              {updateAcceptReject.loading ? "Loading" : "Accept"}
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AcceptRequestModal;
