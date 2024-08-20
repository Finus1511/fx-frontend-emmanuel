import React from "react";
import SettingsSidebar from "./SettingsSidebar";
import { Button, Col, Form, Image, Row } from "react-bootstrap";
import { Formik, Form as FORM, Field, ErrorMessage } from "formik";

const ManageSubscription = () => {
  return (
    <>
      <div className="new-settings-sec new-change-password">
        <div className="new-settings-box">
          <SettingsSidebar />
          <div className="new-settings-main-wrapper">
            <div className="settings-personal-info-card">
              <div className="settings-personal-info-header">
                <h3>Manage Subscrption</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Inventore officiis nostrum voluptatibus error. Non
                  exercitationem, voluptas laborum, molestiae reiciendis dolorum
                  enim eligendi fuga harum inventore maiores officiis adipisci
                  voluptates delectus!
                </p>
              </div>

              {/* step 1 */}

              <div className="">
                <Formik>
                  <FORM className="edit-profile-form">
                    <Row>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Upload image</Form.Label>
                          <div className="custom-file">
                            <div class="custom-file__box">
                              <label
                                for="input-file"
                                className="cursor-pointer"
                              >
                                <div class="custom-file__center">
                                  <p>Upload Image</p>
                                </div>
                              </label>
                              <input
                                id="input-file"
                                type="file"
                                name="profile"
                                accept="image/*"
                              />
                            </div>
                            {/* <div class="custom-file__box">
                              <label for="input-file">
                                <div class="custom-file__center">
                                  <img src={pdf} alt="" />
                                  <div class="custom-file__delete">
                                    <Image
                                      className="edit-profile-tab-icon"
                                      src={
                                        window.location.origin +
                                        "/assets/images/icons/trash.svg"
                                      }
                                    />
                                  </div>
                                </div>
                              </label>
                            </div> */}
                          </div>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Title</Form.Label>
                          <Field
                            required
                            type="text"
                            placeholder="Enter here"
                            className="form-control"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Amount</Form.Label>
                          <Field
                            required
                            type="text"
                            placeholder="Enter here"
                            className="form-control"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Select Duration</Form.Label>
                          <Field className="form-control mr-sm-2" as="select">
                            <option value="week">Week</option>
                            <option value="month">Month</option>
                          </Field>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Number of Duration</Form.Label>
                          <Field
                            required
                            type="text"
                            placeholder="Enter here"
                            className="form-control"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Decription</Form.Label>
                          <Field
                            required
                            type="text"
                            placeholder="Enter here"
                            className="form-control"
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group>
                          <Form.Label>Discount</Form.Label>
                          <Field
                            required
                            type="text"
                            placeholder="Enter here"
                            className="form-control"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={12} xs={12} md={12}>
                        <div className="settings-btn-sec">
                          <Button className="settings-submit-btn" type="submit">
                            Submit
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </FORM>
                </Formik>
              </div>

              {/* step 2  */}
              <div className="">
                <div className="sub-add-btn">
                  <button className="settings-submit-btn">Add</button>
                </div>
                <div className="subscribe-grid">
                  <div className="subscribe-card">
                    <div className="subscribe-img">
                      <Image
                        src={
                          window.location.origin +
                          "/assets/images/subscribe.jpg"
                        }
                      />
                    </div>
                    <div className="subscribe__flex">
                      <div className="subscribe-content">
                        <h4>Official Patron</h4>
                        <div className="subscribe-value">
                          <h5>$5</h5>
                          <p>/ Month</p>
                          <span>(plus VAT)</span>
                        </div>
                        <div className="subscribe-para">
                          <h5>Decription</h5>
                          <p>
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Incidunt vitae quia laboriosam,
                          </p>
                        </div>
                        <div className="subscribe-para">
                          <h5>Discount</h5>
                          <ul>
                            <li>Tees: 20% pff promocode</li>
                            <li>Dojo: 20% off annual</li>
                          </ul>
                        </div>
                      </div>
                      <div className="subscribe-btn">
                        <button className="out-btn">Edit</button>
                        <button>Delete</button>
                      </div>
                    </div>
                  </div>
                  <div className="subscribe-card">
                    <div className="subscribe-img">
                      <Image
                        src={
                          window.location.origin + "/assets/images/sub-1.png"
                        }
                      />
                    </div>
                    <div className="subscribe__flex">
                      <div className="subscribe-content">
                        <h4>Official Patron</h4>
                        <div className="subscribe-value">
                          <h5>$5</h5>
                          <p>/ Month</p>
                          <span>(plus VAT)</span>
                        </div>
                        <div className="subscribe-para">
                          <h5>Decription</h5>
                          <p>
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Incidunt vitae quia laboriosam,
                          </p>
                        </div>
                        <div className="subscribe-para">
                          <h5>Discount</h5>
                          <ul>
                            <li>Tees: 20% pff promocode</li>
                            <li>Dojo: 20% off annual</li>
                          </ul>
                        </div>
                      </div>
                      <div className="subscribe-btn">
                        <button className="out-btn">Edit</button>
                        <button>Delete</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageSubscription;
