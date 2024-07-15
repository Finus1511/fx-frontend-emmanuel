import React, { useState, useEffect } from "react";
import {
  InputGroup,
  FormControl,
  Image,
  Modal,
  Media,
  Row,
  Col,
  Form,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import AddCardModalSec from "./AddCardModalSec";
import PaymentMethodCard from "./PaymentMethodCard";
import PaymentModelMsgSec from "./PaymentModelMsgSec";
import { createNotification } from "react-redux-notify/lib/modules/Notifications";
import { getErrorNotificationMessage } from "../../helper/NotificationMessage";
import {
  livePaymentPaypalStart,
  livePaymentStripeStart,
  livePaymentWalletStart,
} from "../../../store/actions/LiveVideoAction";
import { connect } from "react-redux";
import { translate, t } from "react-multi-lang";
import { fetchWalletDetailsStart } from "../../../store/actions/WalletAction";
import Skeleton from "react-loading-skeleton";

const LiveStreamingPaymentModal = (props) => {

  const dispatch = useDispatch();
  const nullData = ["", null, undefined, "light"];

  const [paymentType, setPaymentType] = useState(localStorage.getItem("default_payment_method"));
  const [selectedCard, setSelectedCard] = useState(null);
  const [showAddCard, setShowAddCard] = useState(false);

  const wallet = useSelector(state => state.wallet.walletData);
  const [reloadWallet, setReloadWallet] = useState(true);

  const paypalOnError = (err) => {
    const notificationMessage = getErrorNotificationMessage(err);
    this.props.dispatch(createNotification(notificationMessage));
  };

  const paypalOnSuccess = (payment) => {
    setTimeout(() => {
      props.dispatch(
        livePaymentPaypalStart({
          live_video_id: props.live.live_video_id,
          payment_id: payment.paymentID,
        })
      );
    }, 1000);
    props.closePaymentModal();
  };

  const paypalOnCancel = (data) => {
    const notificationMessage = getErrorNotificationMessage(
      t("payment_cancelled_please_try_again")
    );
    this.props.dispatch(createNotification(notificationMessage));
  };

  const handleSubmit = () => {
    if (paymentType === "CARD")
      props.dispatch(
        livePaymentStripeStart({
          live_video_id: props.live.live_video_id,
          user_card_id: selectedCard,
        })
      );
    if (paymentType === "WALLET")
      props.dispatch(
        livePaymentWalletStart({
          live_video_id: props.live.live_video_id,
        })
      );
    props.closePaymentModal();
  };

  useEffect(() => {
    dispatch(fetchWalletDetailsStart());
  }, [reloadWallet]);

  return (
    <>
      <div className="payment-modal-sec">
        {/* <Modal
          className={`modal-dialog-center user-list-free-modal payment-modal-res ${nullData.includes(localStorage.getItem("theme")) ?
            "" : "dark-theme-modal"
            }`}
          size="xl"
          centered
          show={props.paymentsModal}
          onHide={props.closepaymentsModal}
        >
           <Modal.Header closeButton>
            <Modal.Title>User List</Modal.Title> 
          </Modal.Header> 
          <Modal.Body className="wallet-card-body">
            <Button className="modal-close"
              onClick={() => props.closepaymentsModal()}>
              <i className="fa fa-times" />
            </Button>
            <div className="payment-modal-body">
              <Row className="justify-content-between">
                <PaymentMethodCard
                  paymentType={paymentType}
                  setPaymentType={setPaymentType}
                  selectedCard={selectedCard}
                  setSelectedCard={setSelectedCard}
                  setShowAddCard={setShowAddCard}
                />
                <Col md={12} xl={5}>
                  {showAddCard ?
                    <AddCardModalSec
                      setShowAddCard={setShowAddCard}
                    />
                    : <PaymentModelMsgSec
                      title={props.live.title}
                      message={props.live.description}
                      paymentType={paymentType}
                      amount_formatted={props.live.amount_formatted}
                      amount={props.live.amount}
                      payNowAction={handleSubmit}
                      paypalOnError={paypalOnError}
                      paypalOnSuccess={paypalOnSuccess}
                      paypalOnCancel={paypalOnCancel}
                      btnDisable={props.liveVideoDetails.buttonDisable}
                      btnText={props.liveVideoDetails.loadingButtonContent !== null
                        ? props.liveVideoDetails.loadingButtonContent
                        : t("pay")}
                    />
                  }
                </Col>
              </Row>
            </div>
          </Modal.Body>
        </Modal> */}
        <Modal
          {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          show={props.paymentsModal}
          onHide={props.closepaymentsModal}
          centered
          className="pay-amount-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {t("select_payment_method")}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="pay-amount-modal-body">
              <div class="pay-wallet-sec">
                <div className="pay-amount-head">
                  <h4>{t("payment_method")}</h4>
                </div>
                {wallet.loading ? (
                  <Skeleton height={45} borderRadius={10} />
                ) : Object.keys(wallet.data).length > 0 ? (
                  <div className="services-card-wrapped">
                    <div className="go-live-select-lable">
                      <div class="form-check">
                        <label class="form-check-label" for="1">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            name="stream_type"
                            checked={paymentType === "WALLET"}
                            onChange={() => { }}
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
                                {t("wallet")}:
                              </span>
                              <span className="wallet-amount">
                                <Image src="assets/images/phase4/wallet.svg" className="wallet-icon" />
                                {wallet.data.user_wallet.remaining_formatted}
                              </span>
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>
                    {props.live.amount >
                      wallet.data.user_wallet.remaining ? (
                      <p className="text-danger">
                        {t("low_wallet_balance_tips_payment_para")}
                      </p>
                    ) :
                      null
                    }
                    {props.live.amount >
                      wallet.data.user_wallet.remaining && (
                        <div className="add-wallet-btn-sec">
                          <Link to="/wallet"
                            className="default-btn">
                            {t("add_wallet_amount")}
                          </Link>
                        </div>
                      )}
                  </div>
                ) : (
                  <div className="d-flex justify-content-center">
                    <div>
                      <h5>{t("something_went_wrong")}</h5>
                      <Button
                        className="button-below-text"
                        onClick={() => setReloadWallet(!reloadWallet)}
                      >
                        {t("reload_wallet")}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              <div class="pay-amount-sec">
                <div className="pay-amount-head">
                  <h4>{t("payment_details")}</h4>
                  <p>Lorem ipsum dolor sit amet.</p>
                </div>
                <div className="coupon-input">
                  <Form.Group controlId="formBasicEmail">
                    <InputGroup >
                      <Form.Control type="text" aria-label="text" value="5BDFKHT6K98Q" />
                      <InputGroup.Text><Link to="#">{t("apply")}</Link></InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                </div>
                <div className="pay-modal-token-sec">
                  <div className="pay-modal-token">
                    <p>{t("tokens")}</p>
                    <p>{props.live.amount_formatted}</p>
                  </div>
                  <div className="pay-modal-token">
                    <h5>{t("total_token")}</h5>
                    <h4>{props.live.amount}</h4>
                  </div>
                </div>
                <Button
                  className="default-btn"
                  onClick={handleSubmit}
                  buttonDisable={
                    props.liveWallet.buttonDisable ||
                    wallet.buttonDisable ||
                    wallet.data?.user_wallet?.remaining <
                    props.live.amount
                  }
                >{props.liveWallet.loadingButtonContent ?
                  props.liveWallet.loadingButtonContent :
                  t("pay")}
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

const mapStateToPros = (state) => ({
  liveVideoDetails: state.liveVideo.singleLiveVideo,
  liveWallet:state.liveVideo.liveWallet,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(LiveStreamingPaymentModal));
