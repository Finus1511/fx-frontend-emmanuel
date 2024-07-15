import React, { useEffect, useState, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Image,
  Table,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

const LiveStreamOrdersTable = () => {
  const history = useHistory();

  return (
    <div className="new-home-page-sec">
      <Container fluid>
        <div className="personalized-request-box">
          <Row className="align-items-center">
            <Col md={12}>
              <div className="personalized-table-head">
                <div className="personalized-table-back">
                  <Link to="/product-stream">
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
                    <span className="personalized-request-back-info">Back</span>
                  </Link>
                  <div className="table-heading">
                    <h4>Live Stream Orders</h4>
                  </div>
                </div>
              </div>

              <Table
                responsive
                className="personalized-request-table live-stream-product-table"
              >
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Stream Name</th>
                    <th>Order ID</th>
                    <th>Shipping Address</th>
                    <th>Phone Number</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className="live-stream-product-img">
                        <span className="live-stream-product-qty">2x</span>
                        <Image
                          className=""
                          src={
                            window.location.origin +
                            "/assets/images/products/jacket1.png"
                          }
                          alt="product-img"
                        />
                      </div>
                    </td>
                    <td>$576.00</td>
                    <td>Streaming Mafia</td>
                    <td>
                      <div className="live-stream-table-adrs">
                        69, 3rd Cross, Teachers colony, Kumaraswamy layout,,
                        near Dayananada Sagara College of Engineering,Bangalore,
                        Karanataka - 560078
                      </div>
                    </td>
                    <td>+91-7765654434</td>
                    <td>$6767</td>
                    <td>
                      <span className="shiping-status-badge">
                        <p>Shipping Pending</p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="19"
                          height="20"
                          fill="none"
                          viewBox="0 0 19 20"
                        >
                          <g clipPath="url(#clip0_448_2113)">
                            <path
                              fill="#9F4298"
                              d="M11.875 14.75H0V3.667a2.375 2.375 0 012.375-2.375H9.5a2.375 2.375 0 012.375 2.375V14.75zm1.583 0H19v-3.958h-5.542v3.958zm1.584-10.292h-1.584v4.75H19v-.791a3.963 3.963 0 00-3.958-3.959zM2.42 16.333c-.03.13-.044.263-.046.396a1.98 1.98 0 003.958 0 1.917 1.917 0 00-.046-.396H2.421zm11.083 0c-.029.13-.044.263-.046.396a1.98 1.98 0 003.959 0 1.93 1.93 0 00-.046-.396h-3.867z"
                            ></path>
                          </g>
                          <defs>
                            <clipPath id="clip0_448_2113">
                              <path
                                fill="#fff"
                                d="M0 0H19V19H0z"
                                transform="translate(0 .5)"
                              ></path>
                            </clipPath>
                          </defs>
                        </svg>
                      </span>
                    </td>
                    <td>
                      <div className="table-btn-sec">
                        <Button
                          className="table-download-btn"
                          onClick={() =>
                            history.push("/lives-stream-order-product")
                          }
                        >
                          View
                        </Button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="live-stream-product-img">
                        <span className="live-stream-product-qty">2x</span>
                        <Image
                          className=""
                          src={
                            window.location.origin +
                            "/assets/images/products/jacket1.png"
                          }
                          alt="product-img"
                        />
                      </div>
                    </td>
                    <td>$576.00</td>
                    <td>Streaming Mafia</td>
                    <td>
                      <div className="live-stream-table-adrs">
                        69, 3rd Cross, Teachers colony, Kumaraswamy layout,,
                        near Dayananada Sagara College of Engineering,Bangalore,
                        Karanataka - 560078
                      </div>
                    </td>
                    <td>+91-7765654434</td>
                    <td>$6767</td>
                    <td>
                      <div className="">
                        <Button
                          className="shiping-status-btn profile-sidebar-broadcast-btn"
                          type="button"
                        >
                          Shipping Process
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="19"
                            height="20"
                            fill="none"
                            viewBox="0 0 19 20"
                          >
                            <g clipPath="url(#clip0_448_2113)">
                              <path
                                fill="#9F4298"
                                d="M11.875 14.75H0V3.667a2.375 2.375 0 012.375-2.375H9.5a2.375 2.375 0 012.375 2.375V14.75zm1.583 0H19v-3.958h-5.542v3.958zm1.584-10.292h-1.584v4.75H19v-.791a3.963 3.963 0 00-3.958-3.959zM2.42 16.333c-.03.13-.044.263-.046.396a1.98 1.98 0 003.958 0 1.917 1.917 0 00-.046-.396H2.421zm11.083 0c-.029.13-.044.263-.046.396a1.98 1.98 0 003.959 0 1.93 1.93 0 00-.046-.396h-3.867z"
                              ></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_448_2113">
                                <path
                                  fill="#fff"
                                  d="M0 0H19V19H0z"
                                  transform="translate(0 .5)"
                                ></path>
                              </clipPath>
                            </defs>
                          </svg>
                        </Button>
                      </div>
                    </td>
                    <td>
                      <div className="table-btn-sec">
                        <Button
                          onClick={() =>
                            history.push("/lives-stream-order-product")
                          }
                          className="table-download-btn"
                        >
                          View
                        </Button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className="live-stream-product-img">
                        <span className="live-stream-product-qty">2x</span>
                        <Image
                          className=""
                          src={
                            window.location.origin +
                            "/assets/images/products/jacket1.png"
                          }
                          alt="product-img"
                        />
                      </div>
                    </td>
                    <td>$576.00</td>
                    <td>Streaming Mafia</td>
                    <td>
                      <div className="live-stream-table-adrs">
                        69, 3rd Cross, Teachers colony, Kumaraswamy layout,,
                        near Dayananada Sagara College of Engineering,Bangalore,
                        Karanataka - 560078
                      </div>
                    </td>
                    <td>+91-7765654434</td>
                    <td>$6767</td>
                    <td>
                      <div className="shiping-status">
                        <Button
                          className="shiping-status-btn profile-sidebar-broadcast-btn"
                          type="button"
                        >
                          Shipping Process
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="19"
                            height="20"
                            fill="none"
                            viewBox="0 0 19 20"
                          >
                            <g clipPath="url(#clip0_448_2113)">
                              <path
                                fill="#9F4298"
                                d="M11.875 14.75H0V3.667a2.375 2.375 0 012.375-2.375H9.5a2.375 2.375 0 012.375 2.375V14.75zm1.583 0H19v-3.958h-5.542v3.958zm1.584-10.292h-1.584v4.75H19v-.791a3.963 3.963 0 00-3.958-3.959zM2.42 16.333c-.03.13-.044.263-.046.396a1.98 1.98 0 003.958 0 1.917 1.917 0 00-.046-.396H2.421zm11.083 0c-.029.13-.044.263-.046.396a1.98 1.98 0 003.959 0 1.93 1.93 0 00-.046-.396h-3.867z"
                              ></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_448_2113">
                                <path
                                  fill="#fff"
                                  d="M0 0H19V19H0z"
                                  transform="translate(0 .5)"
                                ></path>
                              </clipPath>
                            </defs>
                          </svg>
                        </Button>
                      </div>
                    </td>
                    <td>
                      <div className="table-btn-sec">
                        <Button
                          className="table-download-btn"
                          onClick={() =>
                            history.push("/lives-stream-order-product")
                          }
                        >
                          View
                        </Button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default LiveStreamOrdersTable;
