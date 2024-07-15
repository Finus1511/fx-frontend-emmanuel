import React, { useEffect, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import "./CreaterFlow.css";
import { translate, t } from "react-multi-lang";
import { Formik, Form as FORM, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { prCreatorUpdateRequestFileStart } from "../../../store/actions/PersonalizeAction";
import { getErrorNotificationMessage } from "../../helper/NotificationMessage";
import { createNotification } from "react-redux-notify";

const AddDigitalProductModal = (props) => {
  const dispatch = useDispatch();
  const creatorUpdateRequestFile = useSelector((state) => state.personalize.creatorUpdateRequestFile);
  const [skipRender, setSkipRender] = useState(true);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedThumbnail, setSelectedThumbnail] = useState([]);
  const [acceptedFileTypes, setAcceptedFileTypes] = useState();
  const [productFile, setProductFile] = useState([])
  const [thumbnailFile, setThumbnailFile] = useState([])

  const handleAcceptedFiles = () => {
    switch (props.show.type) {
      case "image":
        setAcceptedFileTypes(".png, .gif, .jpeg, .jpg, .gif");
        break;
      case "audio":
        setAcceptedFileTypes(".mp3, .wav");
        break;
      case "video":
        setAcceptedFileTypes(".mp4, .mov, .mkv");
        break;
      case "product":
        setAcceptedFileTypes(".pdf, .xlsx, .xls, .csv");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    handleAcceptedFiles();
  }, [props.show]);

  const validationSchema = Yup.object().shape({
    amount: Yup.number()
      .required("Amount is required")
      .min(0.1, "Amount must be at least 0.1")
      .test("is-number", "Amount must be a number", (value) => !isNaN(value)),
    description: Yup.string().required(t("required")),
  });

  const handleSubmit = (values) => {
    dispatch(
      prCreatorUpdateRequestFileStart({
        file: productFile,
        preview_file: thumbnailFile,
        personalized_request_unique_id: props.show.unique_id,
      })
    );
  };

  useEffect(() => {
    if (
      !skipRender &&
      !creatorUpdateRequestFile.loading &&
      Object.keys(creatorUpdateRequestFile.data).length > 0
    ) {
      props.onHide();
    }
    setSkipRender(false);
  }, [creatorUpdateRequestFile]);

  const handleImageChange = (event) => {
    const files = event.target.files;
    if (files.length == 1) {
      let ext = files[0].name.slice(files[0].name.lastIndexOf('.'));
      if (acceptedFileTypes.includes(ext)) {
        setSelectedImages(URL.createObjectURL(files[0]));
        setProductFile(files[0])
      } else {
        const notificationMessage = getErrorNotificationMessage(t('invalid_file_format'));
        dispatch(createNotification(notificationMessage));
      }
    } else {
      const notificationMessage = getErrorNotificationMessage(t('select_single_item'));
      dispatch(createNotification(notificationMessage));
    }
  };

  const handleThumbnailImageChange = (event) => {
    const files = event.target.files;
    if (files.length == 1) {
      let ext = files[0].name.slice(files[0].name.lastIndexOf('.'));
      if (".png, .gif, .jpeg, .gif".includes(ext)) {
        setSelectedThumbnail(URL.createObjectURL(files[0]));
        setThumbnailFile(files[0]);
      } else {
        const notificationMessage = getErrorNotificationMessage(t('invalid_file_format'));
        dispatch(createNotification(notificationMessage));
      }
    } else {
      const notificationMessage = getErrorNotificationMessage(t('select_single_item'));
      dispatch(createNotification(notificationMessage));
    }
  };

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="rejection-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Product ({props.show.type == "product" ? "digital" : props.show.type})
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
              <FORM noValidate className="creater-flow-product-form">
                <Row>
                  <Col md={12}>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Select Product File</Form.Label>
                      <div className="upload-image-sec">
                        <label htmlFor="file-upload" className="">
                          <div className="upload-image-btn">
                            <div className={`${selectedImages.length > 0 ? "custom-file-upload-disbled" : "custom-file-upload"}`}>Upload</div>
                            <span>
                              <span className="upload-image-btn-info">
                                Accepts {acceptedFileTypes} only
                              </span>
                              <input
                                id="file-upload"
                                className="d-none"
                                type="file"
                                accept={acceptedFileTypes}
                                multiple={false}
                                onChange={(e) => {
                                  console.log(e)
                                  e.preventDefault();
                                  handleImageChange(e)
                                }}
                                disabled={selectedImages.length > 0}
                              />
                            </span>
                          </div>
                        </label>
                      </div>
                    </Form.Group>
                    <div className="preview-section mb-3">
                      <div className="upload-image-row">
                        {selectedImages.length > 0 ?
                          <div className="your-address-row">
                            <div className="your-address-card">
                              <div class="form-check">
                                <Button
                                  className="product-image-delete-btn"
                                  disabled={creatorUpdateRequestFile.loading}
                                  onClick={(event) => {
                                    setSelectedImages([])
                                    document.getElementById('file-upload').value = null
                                  }}>
                                  <i className="far fa-times-circle"></i>
                                </Button>
                                <label
                                  class="form-check-label"
                                >
                                  <input
                                    class="form-check-input"
                                    type="checkbox"
                                    name="service_type"
                                    id="1"
                                    disabled
                                  />
                                  <div className="your-address-item">
                                    <div className="check-tick">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="25"
                                        height="25"
                                        enableBackground="new 0 0 512 512"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          fill="#9f4298"
                                          d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0zm-.091 15.419a2.001 2.001 0 01-2.823-.005l-2.782-2.696 1.393-1.437 2.793 2.707 5.809-5.701 1.404 1.425-5.793 5.707z"
                                          data-original="#000000"
                                        ></path>
                                      </svg>
                                    </div>
                                    <div className="your-address-box">
                                      {props.show.type == "image" ? (
                                        <img
                                          className="uploaded-product-img"
                                          src={selectedImages}
                                          alt="product_file"
                                        />
                                      ) : props.show.type == "video" ? (
                                        <video
                                          className="uploaded-product-img"
                                          src={selectedImages}
                                          alt="product_file"
                                          autoPlay
                                          loop
                                          muted
                                        />
                                      ) : props.show.type == "audio" ? (
                                        <audio
                                          src={selectedImages}
                                          alt="product_file"
                                          controls
                                        />
                                      ) : (
                                        <p className="doc-info">{selectedImages}</p>
                                      )}
                                    </div>
                                  </div>
                                </label>
                              </div>
                            </div>
                          </div>
                          : null}
                      </div>
                    </div>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Select Thumbnail Image</Form.Label>
                      <div className="upload-image-sec">
                        <label htmlFor="thumbnail-file-upload" className="">
                          <div className="upload-image-btn">
                            <div className={`${selectedThumbnail.length > 0 ? "custom-file-upload-disbled" : "custom-file-upload"}`}>
                              Upload Image
                            </div>
                            <span>
                              <span className="upload-image-btn-info">
                                Accepts .png, .gif, .jpeg, .gif only
                              </span>
                              <input
                                id="thumbnail-file-upload"
                                className="d-none"
                                type="file"
                                multiple={false}
                                accept=".png, .gif, .jpeg, .jpg, .gif"
                                onChange={handleThumbnailImageChange}
                                disabled={selectedThumbnail.length > 0}
                              />
                            </span>
                          </div>
                        </label>
                      </div>
                    </Form.Group>
                    <div className="preview-section mb-3">
                      <div className="upload-image-row">
                        {selectedThumbnail.length > 0 ?
                          <div className="your-address-row">
                            <div className="your-address-card">
                              <div class="form-check">
                                <Button
                                  className="product-image-delete-btn"
                                  disabled={creatorUpdateRequestFile.loading}
                                  onClick={(event) => {
                                    setSelectedThumbnail([])
                                    document.getElementById('thumbnail-file-upload').value = null
                                  }}>
                                  <i className="far fa-times-circle"></i>
                                </Button>
                                <label
                                  class="form-check-label"
                                >
                                  <input
                                    class="form-check-input"
                                    type="checkbox"
                                    name="service_type"
                                    id="1"
                                  />
                                  <div className="your-address-item">
                                    <div className="check-tick">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="25"
                                        height="25"
                                        enableBackground="new 0 0 512 512"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          fill="#9f4298"
                                          d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0zm-.091 15.419a2.001 2.001 0 01-2.823-.005l-2.782-2.696 1.393-1.437 2.793 2.707 5.809-5.701 1.404 1.425-5.793 5.707z"
                                          data-original="#000000"
                                        ></path>
                                      </svg>
                                    </div>
                                    <div className="your-address-box">
                                      <img
                                        className="uploaded-product-img"
                                        src={selectedThumbnail}
                                        alt="product-preview"
                                      />
                                    </div>
                                  </div>
                                </label>
                              </div>
                            </div>
                          </div>
                          : null}
                      </div>
                    </div>
                  </Col>
                </Row>
                <div className="personalized-request-btn">
                  <Button
                    className="default-btn"
                    type="submit"
                    disabled={creatorUpdateRequestFile.loading}
                  >
                    {creatorUpdateRequestFile.loading ? "Loading" : "Submit"}
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

export default AddDigitalProductModal;
