import React, { useState, useEffect } from "react";
import {
  Modal,
  Container,
  Row,
  Col,
  Button,
  Form,
  Image,
  Media,
} from "react-bootstrap";
import "./Product.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  fetchProductCategoriesStart,
  fetchProductSubCategoriesStart,
  userProductsSaveStart,
} from "../../../store/actions/ProductsAction";
import { translate, t } from "react-multi-lang";
import ProductHeader from "./ProductHeader";
import configuration from "react-global-configuration";
import { useDropzone } from "react-dropzone";

const AddProduct = (props) => {
  const [productData, setProductData] = useState([]);
  const [digitalProduct, setDigitalProduct] = useState(false);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    props.dispatch(fetchProductCategoriesStart());
  }, []);

  const handleChange = (event) => {
    let value =
      event.target.name == "picture"
        ? event.target.files[0]
        : event.target.value;
    if (event.target.name == "product_category_id") {
      setProductData({
        ...productData,
        product_category_id: value,
        product_sub_category_id: "",
      });
      props.dispatch(
        fetchProductSubCategoriesStart({ product_category_id: value })
      );
    } else {
      setProductData({
        ...productData,
        [event.target.name]: value,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let values = productData;
    if(digitalProduct && files.length > 0)
      values = {...values, product_file: files[0]}
    props.dispatch(
      userProductsSaveStart({
        ...values,
        is_digital_product: digitalProduct ? 1 : 0,
        quantity: digitalProduct ? 1 : values.quantity,
      })
    );
  };

  const { getRootProps, getInputProps, isFocused, isDragActive, isDragReject } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
      "application/docx": [".docx"],
    },
    maxFiles: 1,
    useFsAccessApi: false,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map(file => Object.assign(file, {
          preview: URL.createObjectURL(file)
        }))
      )
    },
  });

  const handleFileDelete = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
    let updatedDataArray = [];
    updatedFiles.forEach((file, key) => {
      let name = "files[" + key + "]";
      updatedDataArray[name] = file;
    });
    // if (!updatedFiles.length == 0) {
    //   formRef.current.setFieldValue("file_ids", updatedDataArray);
    // } else {
    //   formRef.current.setFieldValue("file_ids", null);
    // }
  };

  return (
    <>
      <div className="add-product-sec">
        <Container>
          <div className="ecom-navbar">
            <ProductHeader />
          </div>

          <Form onSubmit={handleSubmit} className="add-product-form">
            <h2>{t("add_product")}</h2>
            <Row>
              <Col md={6}>
                <div className="border-right-divider add-product-form-sec">
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>{t("name")}*</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={t("name")}
                      name="name"
                      onChange={(event) => {
                        handleChange(event);
                      }}
                    />
                  </Form.Group>
                  {!digitalProduct ? (
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>{t("quantity")}*</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder={t("quantity")}
                        min="1"
                        name="quantity"
                        onChange={(event) => {
                          handleChange(event);
                        }}
                      />
                    </Form.Group>
                  ) : null}
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>{t("price")}*</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder={
                        configuration.get(
                          "configData.is_only_wallet_payment"
                        ) == 1
                          ? t("token")
                          : t("price")
                      }
                      min="1"
                      name="price"
                      onChange={(event) => {
                        handleChange(event);
                      }}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>{t("category")}*</Form.Label>
                    <Form.Control
                      as="select"
                      className="mr-sm-2"
                      id="inlineFormCustomSelect"
                      custom
                      name="product_category_id"
                      onChange={(event) => {
                        handleChange(event);
                      }}
                    >
                      <option value="">{t("select_category")}</option>
                      {props.categories.loading
                        ? t("loading")
                        : props.categories.data.product_categories.map(
                            (category) => (
                              <option value={category.product_category_id}>
                                {category.name}
                              </option>
                            )
                          )}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>{t("sub_category")}*</Form.Label>
                    <Form.Control
                      as="select"
                      className="mr-sm-2"
                      id="inlineFormCustomSelect"
                      custom
                      name="product_sub_category_id"
                      onChange={(event) => {
                        handleChange(event);
                      }}
                    >
                      <option value="0">{t("select_sub_category")}</option>
                      {props.subCategories.loading
                        ? null
                        : props.subCategories.data.product_sub_categories.map(
                            (sub_category) => (
                              <option
                                value={sub_category.product_sub_category_id}
                              >
                                {sub_category.name}
                              </option>
                            )
                          )}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <div className="custome-book-card">
                      <div class="pretty p-svg p-curve">
                        <input
                          type="checkbox"
                          onClick={() => setDigitalProduct(!digitalProduct)}
                          checked={digitalProduct}
                        />
                        <div class="state p-success">
                          <svg
                            class="svg svg-icon"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="#fff"
                            x="0"
                            y="0"
                            enableBackground="new 0 0 507.506 507.506"
                            version="1.1"
                            viewBox="0 0 507.506 507.506"
                            xmlSpace="preserve"
                          >
                            <path d="M163.865 436.934a54.228 54.228 0 01-38.4-15.915L9.369 304.966c-12.492-12.496-12.492-32.752 0-45.248 12.496-12.492 32.752-12.492 45.248 0l109.248 109.248L452.889 79.942c12.496-12.492 32.752-12.492 45.248 0 12.492 12.496 12.492 32.752 0 45.248L202.265 421.019a54.228 54.228 0 01-38.4 15.915z"></path>
                          </svg>
                          <label>{t("is_digital_product")}</label>
                        </div>
                      </div>
                    </div>
                  </Form.Group>
                  {digitalProduct ? (
                    <>
                      {/* 
                      <Form.Group id="file-upload-form" controlId="formFile">
                        <Form.Control
                          type="file"
                          name="product_file"
                          onChange={(event) => {
                            handleChange(event);
                          }}
                        />
                      </Form.Group> */}
                      <Form.Group className="mb-3 file-form-upload">
                      <Form.Label>{t("digital_product_file")}</Form.Label>
                        <div className="file-upload-input-card">
                          <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="52"
                              height="52"
                              enableBackground="new 0 0 512 512"
                              viewBox="0 0 512 512"
                            >
                              <path
                                fill="#9f4298"
                                d="M303.508 324.693a15.962 15.962 0 01-12.3-5.758L272 295.885v151.807a16 16 0 01-32 0V295.885l-19.208 23.05a16 16 0 11-24.583-20.485l47.5-57a16 16 0 0124.584 0l47.5 57a16 16 0 01-12.283 26.243zm182.907-103.425a128.434 128.434 0 00-53.015-40.946 133.368 133.368 0 00-27.388-77.541C386.25 77.05 357.018 58.945 323.7 51.8c-81.28-17.425-168.763 32.165-195.012 110.546l-2.84 8.482a126.526 126.526 0 00.678 253.05h73.227a16 16 0 000-32h-73.227a94.526 94.526 0 010-189.052h10.838a16 16 0 0015.172-10.92l6.5-19.4c21.239-63.425 92.1-103.538 157.961-89.416 52.792 11.318 87.445 55.5 84.268 107.445a16 16 0 0011.335 16.294c39.682 11.99 67.4 49.215 67.4 90.523a94.633 94.633 0 01-94.526 94.526h-73.227a16 16 0 000 32h73.227A126.67 126.67 0 00512 297.352a125.165 125.165 0 00-25.585-76.084z"
                                data-original="#000000"
                              ></path>
                            </svg>
                            <p>
                              Drag & drop files or <span>Browse</span>{" "}
                            </p>
                          </div>
                        </div>
                        <div className="file-preview-card-wrapper">
                          {files.length > 0 && (
                            <h4 className="file-preview-title">
                              Uploaded
                            </h4>
                          )}
                          {files.length > 0 &&
                            files.map((file, index) => (
                              <div className="file-preview-card uploaded">
                                <p>{file.name}</p>
                                <Button
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
                      </Form.Group>
                    </>
                  ) : null}
                </div>
              </Col>
              <Col md={6}>
                <div className="add-product-upload-file-sec">
                  <Form.Label>{t("upload_product_image")}</Form.Label>
                  <Form.Group id="file-upload-form" className="uploader">
                    <Form.File
                      id="file-upload"
                      name="picture"
                      accept="image/*"
                      onChange={(event) => {
                        handleChange(event);
                      }}
                    />
                    <label for="file-upload" id="file-drag">
                      <div id="start">
                        <i className="fa fa-download" aria-hidden="true"></i>
                        <div>{t("select_a_image")}</div>
                      </div>
                    </label>
                    <p className="inuput-help">
                      {t("upload_product_image_para")}
                    </p>
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>{t("description")}</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      className="height-auto"
                      name="description"
                      onChange={(event) => {
                        handleChange(event);
                      }}
                    />
                  </Form.Group>
                  <div className="add-product-btn-sec">
                    <Button
                      type="submit"
                      className="add-product-btn"
                      disabled={props.productSave.buttonDisable}
                    >
                      {!props.productSave.loading ? "Uploading" : t("add")}
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    </>
  );
};

const mapStateToPros = (state) => ({
  categories: state.userProducts.productCategories,
  subCategories: state.userProducts.productSubCategories,
  productSave: state.userProducts.productSave,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(AddProduct));
