import React, { useState } from 'react'
import { Container, Row, Col, Form, Image, Table, InputGroup, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { CopyToClipboard } from "react-copy-to-clipboard";

import "./GoLiveProduct.css"


const LiveStreamOrderProduct = () => {

  return (
    <div className="new-home-page-sec">
      <Container fluid>
        <div className="personalized-request-box">
          <Row className="align-items-center">
            <Col md={12}>
              <div className="personalized-table-head">
                <div className="personalized-table-back">
                  <Link to="/lives-stream-orders-table">
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
                  <div className="table-heading"><h4>Order <span>#36749</span></h4></div>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <div className="order-product-detail-card">
                <div className="order-product-detail-head">
                  <div className="order-detail-info">
                    <h3>Order ID <span>#456794</span></h3>
                    <p>Updated on 22 Feb 2022 , 11:23 AM</p>
                  </div>
                  <div className="shiping-url">
                    <p className="shiping-url-heading">Shipping URL</p>
                    <div className="shiping-url-copy-sec">
                      <Link>https://www.flipkart.com/order_details?order_id=OD430</Link>
                      <CopyToClipboard
                        text="8y98y7"
                      >
                        <span className="url-copy-btn">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="17"
                            height="17"
                            fill="none"
                            viewBox="0 0 17 17"
                          >
                            <path
                              stroke="#111"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              d="M12.458 5.323H8.5A3.167 3.167 0 005.333 8.49v3.958A3.167 3.167 0 008.5 15.615h3.958a3.167 3.167 0 003.167-3.167V8.49a3.167 3.167 0 00-3.167-3.167z"
                            ></path>
                            <path
                              stroke="#111"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              d="M11.667 5.324v-.792A3.167 3.167 0 008.5 1.365H4.542a3.167 3.167 0 00-3.167 3.167V8.49a3.167 3.167 0 003.167 3.167h.791"
                            ></path>
                          </svg>
                          <p>Copy</p>
                        </span>
                      </CopyToClipboard>
                    </div>
                  </div>
                </div>
                <div className="order-product-detail-box live-stream-order-ptoduct">
                  <div className="order-product-detail">
                    <div className="order-placed-img">
                      <Image
                        className="order-placed-product-img"
                        src={window.location.origin + '/assets/images/products/headphone.png'}
                      />
                    </div>
                    <div className="order-detail-info">
                      <h4>boAt Rockerz 450 Bluetooth Wireless On Ear Headphone with Mic (Luscious Black)</h4>
                      <h3>$250.00</h3>
                      <span className="product-quantify">
                        <p>Quantity</p>
                        <div className="product-quantify-box">20</div>
                      </span>
                    </div>
                  </div>
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
                </div>
                <div className="order-product-detail-box">
                  <div className="order-summary-info">
                    <h3>Order Summary</h3>
                  </div>
                  <div className="order-summary-info">
                    <h4>Item Total</h4>
                    <h4>$250</h4>
                  </div>
                  <div className="order-summary-info">
                    <h4>Delivery</h4>
                    <h4>$40</h4>
                  </div>
                  <div className="grand-total-info">
                    <h4>Grand Total</h4>
                    <h4>$290</h4>
                  </div>
                </div>
                <div className="order-product-detail-box">
                  <div className="order-summary-info">
                    <h3>Shipping Address</h3>
                  </div>
                  <div className="shipping-address-info">
                    <h4>Mathew Thomas</h4>
                    <p>69, 3rd Cross, Teachers colony, Kumaraswamy layout,, near Dayananada Sagara College of Engineering,Bangalore, Karanataka - 560078
                      +91 9742123456</p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  )
}

export default LiveStreamOrderProduct;