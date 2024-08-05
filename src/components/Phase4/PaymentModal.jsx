import React from 'react'
import { Button, Modal, Form, InputGroup, Image } from 'react-bootstrap';
import { Link, useHistory } from "react-router-dom";
import "./Phase4.css";
import { premiumFolderPaymentStart } from '../../store/actions/PremiumFolderAction';

const PaymentModal = (props) => {
  return (
    <Modal
      show={props.modalShow}
      onHide={props.closeFolderModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="pay-amount-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Select Payment Method
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="pay-amount-modal-body">
          <div class="pay-wallet-sec">
            <div className="pay-amount-head">
              <h4>Payment Method</h4>
            </div>
            <div className="services-card-wrapped">
              <div className="go-live-select-lable">
                <div class="form-check">
                  <label class="form-check-label" for="1">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      name="stream_type"
                      id="1"
                    />
                    <div className="service-card-custome">
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
                      <div className="service-card-custome-sec">
                        <span className="service-card-custome-info">
                          Wallet:
                        </span>
                        <span className="wallet-amount">
                          <Image src="assets/images/phase4/wallet.svg" className="wallet-icon" />
                          5,63,241.02
                        </span>
                      </div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="pay-amount-sec">
            <div className="pay-amount-head">
              <h4>Payment Details</h4>
              <p>Lorem ipsum dolor sit amet.</p>
            </div>
            <div className="coupon-input">
              <Form.Group controlId="formBasicEmail">
                <InputGroup >
                  <Form.Control type="text" aria-label="text" value="5BDFKHT6K98Q" />
                  <InputGroup.Text><Link to="#">Apply</Link></InputGroup.Text>
                </InputGroup>
              </Form.Group>
            </div>
            <div className="pay-modal-token-sec">
              <div className="pay-modal-token">
                <p>Tokens</p>
                <p>187.00</p>
              </div>
              <div className="pay-modal-token">
                <h5>Total Tokens</h5>
                <h4>167.00</h4>
              </div>
            </div>
            <Button className="default-btn">Pay</Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default PaymentModal