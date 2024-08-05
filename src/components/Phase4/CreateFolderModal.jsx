import React, { useState, useEffect, useCallback, useRef } from "react";
import { Button, Modal, Form, Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { translate, t } from "react-multi-lang";
import { Form as FORM, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { createPremiumFolderStart } from "../../store/actions/PremiumFolderAction";
import { useDispatch, useSelector } from "react-redux";
import { ButtonLoader } from "../helper/Loader";
import { useDropzone } from "react-dropzone";

const CreateFolderModal = (props) => {

  const formRef = useRef();
  const dispatch = useDispatch();
  const createPremiumFolder = useSelector((state) => state.folder.createPremiumFolder);
  const [skipRender, setSkipRender] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false);
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = (values) => {
    if (files.length > 0 && error == "") {
      dispatch(createPremiumFolderStart(values));
    }
  }

  const folderSchema = Yup.object().shape({
    name: Yup.string().required(t("required")),
    thumbnail: Yup.string().nullable().required(t("required")),
    description: Yup.string().required(t("required")),
    amount: Yup.string().required(t("required")),
  });

  const onDropRejected = useCallback((rejectedFiles) => {
    if (rejectedFiles.length > 1) {
      setErrorMessage(t("please_upload_only_one_file_at_a_time"));
      setError("");
    } else {
      const invalidFiles = rejectedFiles.filter(
        (file) => !["image/jpeg", "image/png", "image/jpg"].includes(file.type)
      );
      if (invalidFiles.length > 0) {
        setErrorMessage(t("invalid_file_formats"));
        setError("");
      }
    }
  }, []);

  const onDropAccepted = () => {
    setErrorMessage("");
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDropRejected,
    onDropAccepted,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/jpg": [],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        if (file.size > 3145728) {
          setError(
            t("invalid_file_size", { file_name: file.name }) +
            t("is_larger_than_size")
          );
        } else {
          setError("");
        }
      });
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      formRef.current.setFieldValue("thumbnail", acceptedFiles[0]);
    },
  });

  useEffect(() => {
    if (props.modalShow == false) {
      setErrorMessage(false)
      setFiles([])
      setError("")
    }
  }, [props.modalShow]);

  const images = files.map((file, key) => (
    <div className="folder-image-preview">
      <div className="preview-img">
        <Image
          className="premium-folder-preview"
          key={file.name}
          src={file.preview}
          alt="image-preview"
        />
      </div>
      <Button
        className="folder-image-preview-button"
        onClick={(event) => {
          event.stopPropagation();
          formRef.current.setFieldValue("file", "");
          setFiles([]);
          setError("");
        }}
      >
        <i className="far fa-times-circle"></i>
      </Button>
    </div>
  ));

  useEffect(() => {
    if (
      !skipRender &&
      !createPremiumFolder.loading &&
      Object.keys(createPremiumFolder.data).length > 0
    ) {
      props.closeFolderModal();
    }
    setSkipRender(false)
  }, [createPremiumFolder]);

  return (
    <Modal
      show={props.modalShow}
      onHide={props.closeFolderModal}
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
            thumbnail: "",
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
                <Form.Label>{t("folder_name")} *</Form.Label>
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
                  {files.length <= 0 &&
                    <>
                      <label for="file-upload" class="file-label">
                        {t("upload_preview")} *
                      </label>
                      <input
                        {...getInputProps()}
                        id="file-upload"
                        className="d-none" />
                    </>
                  }
                  <div>{images}</div>
                </div>
              </Form.Group>
              {!errorMessage || !error ? (
                <ErrorMessage
                  component={"div"}
                  name="thumbnail"
                  className="error-msg text-danger text-right"
                />
              ) : null}
              {errorMessage || error ? (
                <p className="error-msg selectfile">
                  {errorMessage || error}
                </p>
              ) : null}
              <Form.Group controlId="formBasicPassword">
                <Form.Label>{t("set_amount")} *</Form.Label>
                <Field
                  name="amount"
                  type="number"
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
                <Form.Label>{t("folder_description")} *</Form.Label>
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

export default translate(CreateFolderModal);
