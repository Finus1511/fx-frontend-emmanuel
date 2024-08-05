import React, { useEffect } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { Form as FORM, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  postFileUploadStart
} from "../../../store/actions/PostAction";
import { ButtonLoader } from '../../helper/Loader';
import { connect } from "react-redux";

const AddLinkModal = (props) => {

  const validationSchema = Yup.object().shape({
    youtube_link: Yup.string().required("Required")
  });

  const handleSubmit = (formData) => {
    props.dispatch(postFileUploadStart(formData));
  }

  // useEffect(() => {
  //   if (
  //     props.fileUpload.loading === false &&
  //     props.fileUpload.data
  //   ) {
  //     console.log("fileUpload data", props.fileUpload.data)
  //   }
  // }, [props.fileUpload])

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="pay-amount-modal"
      {...props}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Youtube Embed Link
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            youtube_link: "",
            file_type: "url"
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, setFieldValue, resetForm, setFieldError }) => (
            <FORM className="create-folder-form">
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Embed Link *</Form.Label>
                <Field
                  name="youtube_link"
                  type="text"
                  placeholder="Past Here"
                  className="form-control"
                />
              </Form.Group>
              <ErrorMessage
                component={"div"}
                name="youtube_link"
                className="error-msg text-danger text-right"
              />
              <Button variant="primary" type="submit" className="default-btn mt-3" disabled={props.fileUpload.buttonDisable}>
                {props.fileUpload.loadingButtonContent !== null ? <ButtonLoader /> : "Add"}
              </Button>
            </FORM>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  )
}

const mapStateToPros = (state) => ({
  fileUpload: state.post.fileUpload,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(AddLinkModal);