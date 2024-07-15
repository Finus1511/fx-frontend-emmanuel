import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Button,
  Form,
  FormCheck,
  FormControl,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  prProductFilesUploadStart,
  prProductFilesRemoveStart,
  prCreateUserProductStart,
} from "../../../store/actions/PersonalizeAction";
import { translate, t } from "react-multi-lang";
import { createNotification } from "react-redux-notify";
import { getErrorNotificationMessage } from "../../helper/NotificationMessage";
import { Formik, Form as FORM, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { register } from "timeago.js";
import CustomLazyLoad from "../../helper/CustomLazyLoad";

const CreaterProductDetail = () => {
  const history = useHistory();
  const params = useParams();
  const [selectedImages, setSelectedImages] = useState([]);
  const [checkboxes, setCheckboxes] = useState([]);
  const dispatch = useDispatch();
  const [previewImage, setPreviewImage] = useState(false);
  const [productFilesUploadStatus, setproductFilesUploadStatus] =
    useState(false);
  const [inputData, setInputData] = useState({
    file_id: [],
  });
  const [postFileData, setPostFileData] = useState([]);
  const productFilesUpload = useSelector(
    (state) => state.personalize.productFilesUpload
  );
  const productFilesRemove = useSelector(
    (state) => state.personalize.productFilesRemove
  );
  const createUserProduct = useSelector(
    (state) => state.personalize.createUserProduct
  );

  const [skipRender, setSkipRender] = useState(true);

  const validationSchema = Yup.object().shape({
    shipping_url: Yup.string()
      .required(t("required"))
      .matches(
        /^(http:\/\/|https:\/\/)/,
        t("shipping_url_must_start_with_http_or_https")
      )
      .url(t("invalid_url")),
    name: Yup.string()
      .required(t("required"))
      .matches(/^[aA-zZ\s]+$/, t("only_alphabets_are_allowed_for_this_field")),
    description: Yup.string().required(t("required")),
  });

  const handleSubmit = (values) => {
    if (inputData.file_id?.length) {
      dispatch(
        prCreateUserProductStart({
          ...values,
          file_ids: inputData.file_id,
          personalized_request_id: params.id,
        })
      );
    } else {
      const notificationMessage = getErrorNotificationMessage(
        t("please_upload_image_and_try_again")
      );
      dispatch(createNotification(notificationMessage));
    }
  };

  const handleChangeImage = (event, fileType) => {
    let data_array = [];

    [...event.target.files].forEach((file, key) => {
      let name = "files[" + key + "]";

      data_array[name] = file;
    });
    data_array["file_type"] = fileType;

    setPreviewImage(true);
    setproductFilesUploadStatus(true);
    // console.log(data_array)
    dispatch(
      prProductFilesUploadStart({
        personalized_product_id: params.id,
        ...data_array,
      })
    );
  };

  useEffect(() => {
    if (
      !skipRender &&
      productFilesUpload.loading === false &&
      Object.keys(productFilesUpload.data).length > 0
    ) {
      if (productFilesUpload.data.personalize_product_files.length > 0) {
        let files = [];
        productFilesUpload.data.personalize_product_files.map((value, i) => {
          files.push(value);
        });
        setPostFileData(
          postFileData.length > 0 ? [...postFileData, ...files] : files
        );
        setInputData({
          ...inputData,
          file_id:
            inputData.file_id.length > 0
              ? [
                  ...inputData.file_id,
                  ...productFilesUpload.data.personalize_product_file_ids,
                ]
              : productFilesUpload.data.personalize_product_file_ids,
        });
      }
    }
    setSkipRender(false);
  }, [!productFilesUpload.loading]);

  useEffect(() => {
    if (!skipRender && productFilesRemove.loading === false) {
      let files = [];
      if (productFilesRemove.data.personalized_product_files.length > 0) {
        productFilesRemove.data.personalized_product_files.map((value, i) => {
          files.push({ file: value });
        });
      } else {
        setproductFilesUploadStatus(false);
        setPreviewImage(false);
      }
      setPostFileData(postFileData.filter(items => productFilesRemove.data.personalized_product_files.includes(items.file)));
      setInputData({
        ...inputData,
        file_id: productFilesRemove.data.personalized_product_file_ids
          .split(",")
          .map(Number),
      });
    }
    setSkipRender(false);
  }, [!productFilesRemove.loading]);

  const handleClose = (event, post_file) => {
    event.preventDefault();
    if (productFilesUpload.loadingButtonContent !== null) {
      const notificationMessage = getErrorNotificationMessage(
        t("file_being_uploaded")
      );
      dispatch(createNotification(notificationMessage));
    } else {
      // setPostFileData([]);
      dispatch(
        prProductFilesRemoveStart({
          file: post_file.file,
          // file_type: props.productFilesUpload.data.post_file.file_type,
          // blur_file: props.productFilesUpload.data.post_file.blur_file,
          personalized_product_file_id: inputData.file_id,
        })
      );
    }
  };

  useEffect(() => {
    if (
      !skipRender &&
      !createUserProduct.loading &&
      Object.keys(createUserProduct.data).length > 0
    ) {
      // history.push(`/product-details/${createUserProduct.data.personalized_product.unique_id}`);
      history.push("/creater-flow-table");
    }
    setSkipRender(false);
  }, [createUserProduct]);

  return (
    <div className="new-home-page-sec">
      <Container>
        <div className="personalized-request-sec">
          <Row className="align-items-center justify-content-center">
            <Col md={12} lg={12} xl={12}>
              <div
                className="personalized-request-back"
                onClick={() => history.goBack()}
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    enableBackground="new 0 0 512 512"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#9f4298"
                      d="M4.943 5.606L1.024 9.525a3.585 3.585 0 000 4.95l3.919 3.919a1.5 1.5 0 102.121-2.121l-2.779-2.781 18.25-.023a1.5 1.5 0 001.5-1.5 1.5 1.5 0 00-1.5-1.5L4.3 10.492l2.764-2.765a1.5 1.5 0 00-2.121-2.121z"
                    ></path>
                  </svg>
                </span>
                <span className="personalized-request-back-info-2">
                  {t("back")}
                </span>
              </div>
              <div className="personalized-request-head">
                <h4>
                  {t("shipping_url")} & {t("product_details")}
                </h4>
                <p>{t("enter_product_details")}</p>
              </div>
              <div className="creater-flow-product-form">
                <Formik
                  initialValues={{
                    name: "",
                    description: "",
                    shipping_url: "",
                  }}
                  validationSchema={validationSchema}
                  onSubmit={(values) => handleSubmit(values)}
                >
                  {({
                    touched,
                    errors,
                    isSubmitting,
                    setFieldValue,
                    values,
                  }) => (
                    <FORM>
                      <Row>
                        <Col md={6}>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>{t("product_name")}</Form.Label>
                            <Field
                              type="text"
                              className="form-control"
                              placeholder={t("product_name")}
                              name="name"
                            />
                            <ErrorMessage
                              component={"div"}
                              name="name"
                              className="error-msg"
                            />
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                          >
                            <Form.Label>{t("product_description")}</Form.Label>
                            <Field
                              type="text"
                              as="textarea"
                              rows={4}
                              className="form-control"
                              placeholder={t("description")}
                              name="description"
                            />
                            <ErrorMessage
                              component={"div"}
                              name="description"
                              className="error-msg"
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicEmail"
                          >
                            <Form.Label>{t("shipping_url")}</Form.Label>
                            <Field
                              type="text"
                              className="form-control"
                              placeholder={"Enter url with https://"}
                              name="shipping_url"
                            />
                            <ErrorMessage
                              component={"div"}
                              name="shipping_url"
                              className="error-msg"
                            />
                          </Form.Group>
                          <Form.Group
                            className="mb-3"
                            controlId="formBasicPassword"
                          >
                            <Form.Label>
                              {t("images")} & {t("videos")}
                            </Form.Label>
                            <div className="upload-image-sec">
                              <label htmlFor="file-upload" className="">
                                <div className="upload-image-btn">
                                  <div className="custom-file-upload">
                                    {productFilesRemove.loading ||
                                    productFilesUpload.loading ||
                                    createUserProduct.loading
                                      ? t("loading")
                                      : t("upload")}
                                  </div>
                                  <span>
                                    <span className="upload-image-btn-info">
                                      {t("accepts_images_or_videos")}
                                    </span>
                                    <Form.Control
                                      id="file-upload"
                                      type="file"
                                      className="d-none"
                                      multiple="multiple"
                                      accept=".jpg,.jpeg,.png,.mp4,.mov,.mkv,.ogg"
                                      onChange={(event) => {
                                        event.target.files.length > 0 &&
                                          handleChangeImage(event, "image");
                                      }}
                                      name="post_files"
                                      disabled={
                                        productFilesRemove.loading ||
                                        productFilesUpload.loading ||
                                        createUserProduct.loading
                                      }
                                    />
                                  </span>
                                </div>
                              </label>
                            </div>
                          </Form.Group>
                        </Col>
                      </Row>

                      <Row>
                        <Col md={12}>
                          {postFileData.length > 0 ? (
                            <h4>{t("preview_images")}</h4>
                          ) : null}
                          <div className="upload-image-row mb-3">
                            {postFileData.map((image, index) => (
                              <div className="your-address-row" key={index}>
                                <div className="your-address-card">
                                  <div class="form-check">
                                    <Button
                                      className="product-image-delete-btn"
                                      disabled={
                                        productFilesRemove.loading ||
                                        productFilesUpload.loading ||
                                        createUserProduct.loading
                                      }
                                      onClick={(event) =>
                                        handleClose(event, image)
                                      }
                                    >
                                      <i className="far fa-times-circle"></i>
                                    </Button>
                                    <label
                                      class="form-check-label"
                                      checked={selectedImages.includes(
                                        image.file
                                      )}
                                    >
                                      <input
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
                                          {image.file_type == "mp4" ||
                                          image.file_type == "mov" ||
                                          image.file_type == "ogg" ||
                                          image.file_type == "mkv" ? (
                                            <video
                                              // autoPlay
                                              // loop
                                              className="uploaded-product-img"
                                              src={image.file}
                                              muted
                                              controls
                                            />
                                          ) : (
                                            <CustomLazyLoad
                                              alt="#"
                                              src={image.file}
                                              className="uploaded-product-img"
                                            />
                                          )}
                                        </div>
                                      </div>
                                    </label>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </Col>
                      </Row>
                      <div className="personalized-request-btn">
                        <Button
                          className="default-btn"
                          type="submit"
                          disabled={
                            productFilesRemove.loading ||
                            productFilesUpload.loading ||
                            createUserProduct.loading
                          }
                          // onClick={() => history.push("/creater-flow-product")}
                        >
                          {t("submit")}
                        </Button>
                      </div>
                    </FORM>
                  )}
                </Formik>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default translate(CreaterProductDetail);
