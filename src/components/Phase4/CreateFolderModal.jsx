import React, { useState, useEffect, useRef } from "react";
import { Button, Modal, Form, Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { translate, t } from "react-multi-lang";
import { Form as FORM, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createPremiumFolderStart } from "../../store/actions/PremiumFolderAction";
import { useDispatch, useSelector } from "react-redux";
import { ButtonLoader } from "../helper/Loader";
import { useDropzone } from "react-dropzone";
import { getErrorNotificationMessage } from "../helper/NotificationMessage";
import { createNotification } from "react-redux-notify";
import { values } from "draft-js/lib/DefaultDraftBlockRenderMap";

const CreateFolderModal = (props) => {
  const formRef = useRef();
  const dispatch = useDispatch();
  const createPremiumFolder = useSelector(
    (state) => state.folder.createPremiumFolder
  );
  const history = useHistory();
  const [selectedImages, setSelectedImages] = useState(null);

  const handleSubmit = () => {
    dispatch(createPremiumFolderStart());
  };

  const folderSchema = Yup.object().shape({
    name: Yup.string().required(t("required")),
    file: Yup.string().nullable().required(t("required")),
    description: Yup.string().required(t("required")),
    amount: Yup.string().required(t("required")),
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "image/jpeg": [".jpeg"],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length > 0) {
        const notificationMessage = getErrorNotificationMessage(
          t("image_only_allowed")
        );
        dispatch(createNotification(notificationMessage));
      } else {
        handleImageChange(acceptedFiles, formRef.current.setFieldValue);
      }
    },
  });

  const handleImageChange = (event, setFieldValue) => {
    if (event.length > 0) {
      setSelectedImages(URL.createObjectURL(event[0]));
      setFieldValue("file", event[0]);
      const fileInput = document.getElementById("file-upload");
      fileInput.value = "";
    }
  };

  return (
    <Modal
      show={props.show}
      onHide={() => {
        props.onHide();
      }}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="pay-amount-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {t("create_new_folder")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{
            name: "",
            file: null,
            amount: "",
            description: "",
          }}
          validationSchema={folderSchema}
          onSubmit={handleSubmit}
          innerRef={formRef}
        >
          {({ errors, touched, setFieldValue, resetForm, setFieldError }) => (
            <FORM className="create-folder-form">
              <Form.Group controlId="formBasicEmail">
                <Form.Label>{t("folder_name")}</Form.Label>
                <Field
                  className="form-control"
                  type="text"
                  name="name"
                  placeholder="Enter folder name"
                />
              </Form.Group>
              <ErrorMessage
                component={"div"}
                name="name"
                className="error-msg text-danger text-right"
              />
              <Form.Group controlId="formBasicPassword">
                <Form.Label>{t("upload_preview")}</Form.Label>
                <div className="folder-upload-preview" {...getRootProps()}>
                  {formRef.current?.values.file == null ? (
                    <>
                      <label for="file-upload" class="file-label">
                        {t("upload_preview")}
                      </label>
                      <input
                        {...getInputProps()}
                        id="file-upload"
                        className="d-none"
                      />
                    </>
                  ) : (
                    <div className="folder-image-preview">
                      <div className="preview-img">
                        <Image
                          className="premium-folder-preview"
                          src={selectedImages}
                        />
                      </div>
                      <Button
                        className="folder-image-preview-button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFieldValue("file", null);
                          setSelectedImages("");
                        }}
                      >
                        <i className="far fa-times-circle"></i>
                      </Button>
                    </div>
                  )}
                </div>
              </Form.Group>
              <ErrorMessage
                component={"div"}
                name="file"
                className="error-msg text-danger text-right"
              />
              <Form.Group controlId="formBasicPassword">
                <Form.Label>{t("set_amount")}</Form.Label>
                <Field
                  name="amount"
                  type="text"
                  placeholder="Set amount"
                  className="form-control"
                />
              </Form.Group>
              <ErrorMessage
                component={"div"}
                name="amount"
                className="error-msg text-danger text-right"
              />

              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>{t("folder_description")}</Form.Label>
                <Field
                  name="description"
                  as="textarea"
                  rows={3}
                  placeholder="Description here"
                  className="create-folder-desc form-control"
                />
              </Form.Group>
              <ErrorMessage
                component={"div"}
                name="description"
                className="error-msg text-danger text-right"
              />
              <Button
                variant="primary"
                type="submit"
                className="default-btn"
                disabled={createPremiumFolder.loading}
              >
                {createPremiumFolder.loading ? <ButtonLoader /> : t("create")}
              </Button>
            </FORM>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default CreateFolderModal;
