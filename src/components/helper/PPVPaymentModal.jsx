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
import { connect } from "react-redux";
import {
  PPVPaymentStripeStart,
  PPVPaymentWalletStart,
  PPVPaymentPaypalStart,
  PPVPaymentCCBillStart,
  PPVPaymentCoinPaymentStart,
} from "../../store/actions/PostAction";
import { useSelector, useDispatch } from "react-redux";
import { fetchCardDetailsStart } from "../../store/actions/CardsAction";
import { fetchWalletDetailsStart } from "../../store/actions/WalletAction";
import PaypalExpressBtn from "react-paypal-express-checkout";
import { createNotification } from "react-redux-notify";
import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../../components/helper/NotificationMessage";
import configuration from "react-global-configuration";
import { Link } from "react-router-dom";
import { translate, t } from "react-multi-lang";
import Skeleton from "react-loading-skeleton";

const PPVPaymentModal = (props) => {

  const dispatch = useDispatch();
  const [amount, setAmount] = useState(0);
  const [paymentType, setPaymentType] = useState(localStorage.getItem("default_payment_method"));
  const wallet = useSelector(state => state.wallet.walletData);
  const [reloadWallet, setReloadWallet] = useState(true);


  useEffect(() => {
    dispatch(fetchWalletDetailsStart());
  }, [reloadWallet]);

  const [isOnlyWalletPayment, setIsOnlyWalletPayment] = useState(
    configuration.get("configData.is_only_wallet_payment")
  );

  const [showPayPal, payPal] = useState(false);

  useEffect(() => {
    if (props.PPVPayment === true) {
      props.dispatch(fetchCardDetailsStart());
      props.dispatch(fetchWalletDetailsStart());
    }
  }, [props.PPVPayment]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (paymentType === "PAYPAL") showPayPal(true);

    if (paymentType === "CARD")
      props.dispatch(
        PPVPaymentStripeStart({
          post_id:
            props.post_id != undefined || props.post_id != null
              ? props.post_id
              : "",
          amount: amount,
          user_id: props.user_id,
        })
      );
    if (paymentType === "WALLET")
      props.dispatch(
        PPVPaymentWalletStart({
          post_id:
            props.post_id != undefined || props.post_id != null
              ? props.post_id
              : "",
          user_id: props.user_id,
        })
      );
    if (paymentType === "CCBILL")
      props.dispatch(
        PPVPaymentCCBillStart({
          post_id:
            props.post_id != undefined || props.post_id != null
              ? props.post_id
              : "",
          amount: props.amount,
          user_id: props.user_id,
        })
      );
    if (paymentType === "coinpayment")
      props.dispatch(
        PPVPaymentCoinPaymentStart({
          post_id:
            props.post_id != undefined || props.post_id != null
              ? props.post_id
              : "",
          amount: props.amount,
          user_id: props.user_id,
        })
      );

    if (paymentType === "PAYPAL") props.closePPVPaymentModal();
  };

  const paypalOnSuccess = (payment) => {
    console.log(payment);
    setTimeout(() => {
      props.dispatch(
        PPVPaymentPaypalStart({
          payment_id: payment.paymentID,
          post_id:
            props.post_id != undefined || props.post_id != null
              ? props.post_id
              : "",
          amount: props.amount,
          user_id: props.user_id,
        })
      );
    }, 1000);
  };

  const paypalOnError = (err) => {
    const notificationMessage = getErrorNotificationMessage(err);
    this.props.dispatch(createNotification(notificationMessage));
  };

  const paypalOnCancel = (data) => {
    const notificationMessage = getErrorNotificationMessage(
      t("payment_cancelled_please_try_again")
    );
    this.props.dispatch(createNotification(notificationMessage));
  };

  const choosePaymentOption = (event) => {
    console.log(amount);
    setPaymentType(event);
  };

  let env = configuration.get("configData.PAYPAL_MODE"); // you can set here to 'production' for production
  let currency = "USD"; // or you can set this value from your props or state

  const client = {
    sandbox: configuration.get("configData.PAYPAL_ID"),
    production: configuration.get("configData.PAYPAL_ID"),
  };

  const nullData = ["", null, undefined, "light"];

  return (
    <>
      {/* <Modal
        show={props.PPVPayment}
        onHide={props.closePPVPaymentModal}
        centered
        size="lg"
        className={`${nullData.includes(localStorage.getItem("theme")) ?
          "" : "dark-theme-modal"
        }`}
      >
        {props.PPVPayment === true ? (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{t("pay_and_see_the_Post")}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="subscription-tip-ppv-tab">
              <Tab.Container
                id="left-tabs-example"
                defaultActiveKey={paymentType}
              >
                <Row>
                  <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                    {isOnlyWalletPayment == 0 ? 
                    <Nav.Item>
                      {configuration.get("configData.is_stripe_enabled") == 1 &&
                      configuration.get("configData.stripe_publishable_key") !==
                        "" &&
                      configuration.get("configData.stripe_secret_key") !==
                        "" ? (
                        <Nav.Item>
                          <Nav.Link
                            onClick={() => setPaymentType("CARD")}
                            eventKey="CARD"
                          >
                            {t("card_stripe")}
                          </Nav.Link>
                        </Nav.Item>
                      ) : null}
                      {configuration.get("configData.is_paypal_enabled") == 1 &&
                      configuration.get("configData.PAYPAL_ID") !== "" ? (
                        <Nav.Item>
                          <Nav.Link
                            onClick={() => setPaymentType("PAYPAL")}
                            eventKey="PAYPAL"
                          >
                            {t("paypal")}
                          </Nav.Link>
                        </Nav.Item>
                      ) : null}
                      {configuration.get("configData.is_ccbill_enabled") == 1 &&
                      configuration.get("configData.flex_form_id") !== "" &&
                      configuration.get("configData.salt_key") !== "" ? (
                        <Nav.Item>
                          <Nav.Link
                            onClick={() => setPaymentType("CCBILL")}
                            eventKey="CCBILL"
                          >
                            {t("ccbill")}
                          </Nav.Link>
                        </Nav.Item>
                      ) : null}
                      </Nav.Item>
                      : null}
                      {configuration.get(
                        "configData.is_wallet_payment_enabled"
                      ) == 1 ? (
                        <Nav.Item>
                          <Nav.Link
                            onClick={() => setPaymentType("WALLET")}
                            eventKey="WALLET"
                          >
                            {t("wallet")}
                          </Nav.Link>
                        </Nav.Item>
                      ) : null}
                    </Nav>
                  </Col>
                  <Col sm={9}>
                    <div className="card-stripe-box">
                      <Form>
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Control
                            type="text"
                            placeholder={t("pay_amount")}
                            value={props.post.amount_formatted}
                            disabled
                          />
                        </Form.Group>
                        <Tab.Content>
                          {configuration.get("configData.is_stripe_enabled") ==
                            1 &&
                          configuration.get(
                            "configData.stripe_publishable_key"
                          ) !== "" &&
                          configuration.get("configData.stripe_secret_key") !==
                            "" ? (
                            <Tab.Pane eventKey="CARD">
                              <div className="card-stripe-sec">
                                {props.cards.loading ? (
                                  ""
                                ) : props.cards.data.cards.length > 0 ? (
                                  props.cards.data.cards.map(
                                    (card) =>
                                      card.is_default == 1 && (
                                        <div className="card-stripe-list-box">
                                          <h5 className="mb-3">
                                            XXXX XXXX XXXX {card.last_four}
                                          </h5>
                                          <h5 className="text-muted">
                                            {card.card_type}
                                          </h5>
                                          <div className="card-stripe-bottom">
                                            <div className="card-stripe-action-btn">
                                              <p className="card-link-text text-success">
                                                {t("default_card")}
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      )
                                  )
                                ) : (
                                  <div className="card-stripe-item">
                                    <Link to="cards">
                                      <div className="add-account-item">
                                        <Image
                                          className="add-account-icon"
                                          src={
                                            window.location.origin +
                                            "/assets/images/icons/new/add-card.svg"
                                          }
                                        />
                                        <h5 className="text-muted">{t("add_card")}</h5>
                                      </div>
                                    </Link>
                                  </div>
                                )}
                              </div>
                            </Tab.Pane>
                          ) : null}

                          {configuration.get(
                            "configData.is_wallet_payment_enabled"
                          ) == 1 ? (
                            <Tab.Pane eventKey="WALLET">
                              {props.wallet.loading ? (
                                ""
                              ) : (
                                <div className="card-stripe-box">
                                  <div className="wallet-balence-amount">
                                    <h4>{t("available")}</h4>
                                    <p>
                                      {
                                        props.wallet.data.user_wallet
                                          .remaining_formatted
                                      }
                                    </p>
                                  </div>
                                  {props.amount >
                                  props.wallet.data.user_wallet.remaining ? (
                                    <div className="">
                                      <p className="conv-desc desc">
                                        {t(
                                          "low_wallet_balance_tips_payment_para"
                                        )}
                                      </p>
                                      <div className="d-flex">
                                        <Link
                                          to="/wallet"
                                          className="withdraw-money-btn"
                                        >
                                          {t("add_wallet_amount")}
                                        </Link>
                                      </div>
                                    </div>
                                  ) : null}
                                </div>
                              )}
                            </Tab.Pane>
                          ) : null}
                        </Tab.Content>
                      </Form>
                    </div>
                  </Col>
                </Row>
              </Tab.Container>
            </Modal.Body>
            <Modal.Footer>
              {paymentType === "PAYPAL" && props.amount != 0 ? (
                <PaypalExpressBtn
                  env={env}
                  client={client}
                  currency={currency}
                  total={props.amount}
                  onError={paypalOnError}
                  onSuccess={paypalOnSuccess}
                  onCancel={paypalOnCancel}
                />
              ) : null}
              <Button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={props.closePPVPaymentModal}
              >
                {t("cancel")}
              </Button>
              {paymentType !== "PAYPAL" ? (
                <Button
                  type="button"
                  className="btn btn-success"
                  data-dismiss="modal"
                  onClick={handleSubmit}
                  disabled={props.ppvPayStripe.buttonDisable}
                >
                  {props.ppvPayStripe.loadingButtonContent !== null
                    ? props.ppvPayStripe.loadingButtonContent
                    : t("pay_now")}
                </Button>
              ) : null}
            </Modal.Footer>
          </>
        ) : null}
      </Modal> */}
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        show={props.PPVPayment}
        onHide={props.closePPVPaymentModal}
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
                  {props.post.amount >
                    wallet.data.user_wallet.remaining ? (
                    <p className="text-danger">
                      {t("low_wallet_balance_tips_payment_para")}
                    </p>
                  ) :
                    null
                  }
                  {props.post.amount >
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
                  <p>{props.post.amount_formatted}</p>
                </div>
                <div className="pay-modal-token">
                  <h5>{t("total_token")}</h5>
                  <h4>{props.post.amount}</h4>
                </div>
              </div>
              <Button
                className="default-btn"
                onClick={handleSubmit}
                buttonDisable={
                  props.ppvPayWallet.buttonDisable ||
                  wallet.buttonDisable ||
                  wallet.data?.user_wallet?.remaining <
                  props.post.amount
                }
              >{props.ppvPayWallet.loadingButtonContent ?
                props.ppvPayWallet.loadingButtonContent :
                t("pay")}
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

const mapStateToPros = (state) => ({
  ppvPayStripe: state.post.ppvPayStripe,
  wallet: state.wallet.walletData,
  cards: state.cards.cardDetails,
  ppvPayWallet: state.post.ppvPayWallet,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(PPVPaymentModal));
