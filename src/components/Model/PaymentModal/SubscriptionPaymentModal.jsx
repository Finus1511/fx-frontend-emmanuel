import React, { useState, useEffect } from "react";
import { Button, Modal, Form, InputGroup, Image } from 'react-bootstrap';
import { Link } from "react-router-dom";
import PaymentMethodCard from "./PaymentMethodCard";
import AddCardModalSec from "./AddCardModalSec";
import PaymentModelMsgSec from "./PaymentModelMsgSec";
import { createNotification } from "react-redux-notify/lib/modules/Notifications";
import { getErrorNotificationMessage } from "../../helper/NotificationMessage";
import {
  subscriptionPaymentPaypalStart,
  subscriptionPaymentStripeStart,
  subscriptionPaymentWalletStart,
} from "../../../store/actions/SubscriptionAction";
import { useSelector, useDispatch } from "react-redux";
import { translate, t } from "react-multi-lang";
import { connect } from "react-redux";
import { fetchWalletDetailsStart } from "../../../store/actions/WalletAction";
import Skeleton from "react-loading-skeleton";

const SubscriptionPaymentModal = (props) => {

  const dispatch = useDispatch();
  const nullData = ["", null, undefined, "light"];
  const [skipRender, setSkipRender] = useState(true);

  const [paymentType, setPaymentType] = useState(localStorage.getItem("default_payment_method"));
  const wallet = useSelector(state => state.wallet.walletData);
  const [reloadWallet, setReloadWallet] = useState(true);

  const [selectedCard, setSelectedCard] = useState(null);
  const [showAddCard, setShowAddCard] = useState(false);

  const paypalOnError = (err) => {
    const notificationMessage = getErrorNotificationMessage(err);
    this.props.dispatch(createNotification(notificationMessage));
  };

  const paypalOnSuccess = (payment) => {
    setTimeout(() => {
      subscriptionPaymentPaypalStart({
        payment_id: payment.paymentID,
        user_unique_id: props.user_unique_id,
        plan_type: props.subscriptionData.plan_type,
        is_free: props.subscriptionData.is_free,
      });
    }, 1000);
    props.closePPVPaymentModal();
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
        subscriptionPaymentStripeStart({
          user_unique_id: props.user_unique_id,
          plan_type: props.subscriptionData.plan_type,
          is_free: props.subscriptionData.is_free,
        })
      );
    if (paymentType === "WALLET")
      props.dispatch(
        subscriptionPaymentWalletStart({
          user_unique_id: props.user_unique_id,
          plan_type: props.subscriptionData.plan_type,
          is_free: props.subscriptionData.is_free,
        })
      );
  };

  useEffect(() => {
    if (
      !skipRender &&
      !props.subPayStripe.loading &&
      Object.keys(props.subPayStripe.success).length > 0
    ) {
      props.closepaymentsModal();
    }
  }, [props.subPayStripe]);

  useEffect(() => {
    if (
      !skipRender &&
      !props.subPayWallet.loading &&
      Object.keys(props.subPayWallet.success).length > 0
    ) {
      props.closepaymentsModal();
    }
    setSkipRender(false);
  }, [props.subPayWallet]);

  useEffect(() => {
    dispatch(fetchWalletDetailsStart());
  }, [reloadWallet]);

  return (
    <>
      <div className="payment-modal-sec">
        {/* <Modal
          className={`modal-dialog-center user-list-free-modal payment-modal-res ${
            nullData.includes(localStorage.getItem("theme"))
              ? ""
              : "dark-theme-modal"
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
            <Button
              className="modal-close"
              onClick={() => props.closepaymentsModal()}
            >
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
                  {showAddCard ? (
                    <AddCardModalSec setShowAddCard={setShowAddCard} />
                  ) : (
                    <PaymentModelMsgSec
                      title={t("subscription_payment")}
                      message={t("subscription_payment_note")}
                      paymentType={paymentType}
                      amount_formatted={props.subscriptionData.amount_formatted}
                      amount={props.subscriptionData.amount}
                      payNowAction={handleSubmit}
                      paypalOnError={paypalOnError}
                      paypalOnSuccess={paypalOnSuccess}
                      paypalOnCancel={paypalOnCancel}
                      btnDisable={
                        props.subPayStripe.ButtonDisable ||
                        props.subPayWallet.ButtonDisable
                      }
                      btnText={
                        props.subPayStripe.loadingButtonContent
                          ? props.subPayStripe.loadingButtonContnet
                          : props.subPayWallet.loadingButtonContent
                          ? props.subPayWallet.loadingButtonContent
                          : t("pay")
                      }
                    />
                  )}
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
                    {props.subscriptionData.amount >
                      wallet.data.user_wallet.remaining ? (
                      <p className="text-danger">
                        {t("low_wallet_balance_tips_payment_para")}
                      </p>
                    ) :
                      null
                    }
                    {props.subscriptionData.amount >
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
                    <p>{props.subscriptionData.amount_formatted}</p>
                  </div>
                  <div className="pay-modal-token">
                    <h5>{t("total_token")}</h5>
                    <h4>{props.subscriptionData.amount}</h4>
                  </div>
                </div>
                <Button
                  className="default-btn"
                  onClick={handleSubmit}
                  buttonDisable={
                    props.subPayWallet.buttonDisable ||
                    wallet.buttonDisable ||
                    wallet.data?.user_wallet?.remaining <
                    props.subscriptionData.amount
                  }
                >{props.subPayWallet.loadingButtonContent ?
                  props.subPayWallet.loadingButtonContent :
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
  subPayStripe: state.subscriptions.subPayStripe,
  subPayWallet: state.subscriptions.subPayWallet,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(SubscriptionPaymentModal));
