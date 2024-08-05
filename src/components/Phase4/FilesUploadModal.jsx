import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Row,
  Col,
  Button,
  Modal,
  Form,
  Image,
  Media,
} from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { translate, t } from "react-multi-lang";
import { Formik, Form as FORM, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { uploadFilesPremiumFolderStart } from "../../store/actions/PremiumFolderAction";
import { useDispatch, useSelector } from "react-redux";
import { ButtonLoader } from "../helper/Loader";
import { useDropzone } from "react-dropzone";
import { createNotification } from "react-redux-notify";
import { getErrorNotificationMessage } from "../helper/NotificationMessage";

const FilesUploadModal = (props) => {

  const formRef = useRef();
  const dispatch = useDispatch();
  const params = useParams();
  const uploadFilePremiumFolder = useSelector((state) => state.folder.uploadFilePremiumFolder);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [skipRender, setSkipRender] = useState(true);

  const handleSubmit = (values) => {
    dispatch(uploadFilesPremiumFolderStart({
        ...values.files,
        collection_unique_id: params.unique_id
    }))
  }

  const folderSchema = Yup.object().shape({
    // files: Yup.mixed().required(t("required")),
  });
  const handleFileDelete = (index) => {
    const updatedFiles = [...uploadedFiles];
    updatedFiles.splice(index, 1);
    setUploadedFiles(updatedFiles);
    let updatedDataArray = [];
    updatedFiles.forEach((file, key) => {
      let name = "files[" + key + "]";
      updatedDataArray[name] = file;
    });
    if (!updatedFiles.length == 0) {
      formRef.current.setFieldValue("files", updatedDataArray);
    } else {
      formRef.current.setFieldValue("files", null);
    }
  };
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "image/gif": [".gif"],
      "video/mp4": [".mp4", ".MP4"],
      "video/mpeg": [".mpeg", ".MPEG"],
      "video/webm": [".webm", ".WEBM"],
    },
    onDrop: (acceptedFiles, rejectedFiles) => {
      let validFiles = acceptedFiles.filter((file) => {
        const ext = file.name.slice(file.name.lastIndexOf('.'));
        return ['.png', '.jpg', '.gif'].includes(ext);
      });

      rejectedFiles.length > 0 && props.dispatch(createNotification({
        message: "Invalid file type",
        type: "error",
      }));

      acceptedFiles.forEach((file, key) => {
        uploadedFiles.push(file)
      });
      let data_array = [];
      uploadedFiles.forEach((file, key) => {
        let name = "files[" + key + "]";
        data_array[name] = file;
      });
      formRef.current.setFieldValue("files", data_array);
    },
  });


  useEffect(() => {
    if (!skipRender && !uploadFilePremiumFolder.loading &&
      Object.keys(uploadFilePremiumFolder.data).length > 0
    ) {
      props.closeFolderModal();
    }
    setSkipRender(false)
  }, [uploadFilePremiumFolder]);

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
            files: "",

          }}
          validationSchema={folderSchema}
          onSubmit={handleSubmit}
          innerRef={formRef}
        >
          {({ errors, touched, setFieldValue, resetForm, setFieldError }) => (
            <FORM className="create-folder-form">
              <Form.Group controlId="formBasicPassword">
                <Form.Label>{t("upload_preview")}</Form.Label>
                <div className="folder-upload-preview" {...getRootProps()}>
                  <label for="file-upload" class="file-label">
                    {t("upload_preview")}
                  </label>
                  <input
                    {...getInputProps()}
                    id="file-upload"
                    className="d-none" />
                </div>
              </Form.Group>
              <ErrorMessage
                component={"div"}
                name="files"
                className="error-msg text-danger text-right"
              />
              <div className="file-preview-card-wrapper preview">
                {uploadedFiles.length > 0 && (
                  <h4 className="file-preview-title">
                    {t("uploaded")}
                  </h4>
                )}
                {uploadedFiles.length > 0 &&
                  uploadedFiles.map((file, index) => (
                    <div className="file-preview-card uploaded">
                      <p>{file.name}</p>
                      <Button
                        className="delete-preview"
                        onClick={() => handleFileDelete(index)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fillRule="evenodd"
                          clipRule="evenodd"
                          imageRendering="optimizeQuality"
                          shapeRendering="geometricPrecision"
                          textRendering="geometricPrecision"
                          viewBox="0 0 173.397 173.397"
                        >
                          <g>
                            <circle
                              cx="86.699"
                              cy="86.699"
                              r="84.667"
                              fill="#db4437"
                            ></circle>
                            <g fill="#fff">
                              <path d="M122.819 67.955l-6.586 66.354c-.376 3.783-3.256 6.818-7.059 6.818H64.223c-3.802 0-6.683-3.033-7.058-6.818l-6.587-66.354zM71.052 81.06a3.538 3.538 0 013.334-3.718 3.538 3.538 0 013.719 3.333l2.275 41.735a3.476 3.476 0 01-2.12 3.432c-1.381.599-2.912.291-3.954-.796a3.515 3.515 0 01-.978-2.247l-2.276-41.74zm27.96-3.718a3.549 3.549 0 013.333 3.718l-2.275 41.734a3.476 3.476 0 01-2.479 3.18 3.476 3.476 0 01-3.844-1.216 3.516 3.516 0 01-.73-2.344l2.276-41.739a3.538 3.538 0 013.718-3.333z"></path>
                              <rect
                                width="86.35"
                                height="12.415"
                                x="43.524"
                                y="53.122"
                                rx="6.207"
                              ></rect>
                              <path d="M108.151 53.726h-6.18v-7.94c0-4.035-3.3-7.336-7.335-7.336H78.762c-4.035 0-7.336 3.3-7.336 7.336v7.94h-6.18v-7.94c0-7.446 6.07-13.516 13.515-13.516h15.875c7.445 0 13.515 6.07 13.515 13.515z"></path>
                            </g>
                          </g>
                        </svg>
                      </Button>
                    </div>
                  ))}
              </div>
              <Button
                variant="primary"
                type="submit"
                className="default-btn"
                disabled={uploadFilePremiumFolder.loading}
              >
                {uploadFilePremiumFolder.loading ? <ButtonLoader /> : t("create")}
              </Button>
            </FORM>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default translate(FilesUploadModal);