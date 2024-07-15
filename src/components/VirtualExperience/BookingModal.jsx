import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Image,
  Modal,
  Tab,
  Nav,
  Row,
  Col,
} from "react-bootstrap";
import { createNotification } from "react-redux-notify/lib/modules/Notifications";
import { connect, useDispatch, useSelector } from "react-redux";
import { translate, t } from "react-multi-lang";
import configuration from "react-global-configuration";
import PaypalExpressBtn from "react-paypal-express-checkout";
import { getErrorNotificationMessage } from "../helper/NotificationMessage";
import {
  livePaymentPaypalStart,
  livePaymentStripeStart,
  livePaymentWalletStart,
} from "../../store/actions/LiveVideoAction";
import { fetchCardDetailsStart } from "../../store/actions/CardsAction";
import { fetchWalletDetailsStart } from "../../store/actions/WalletAction";
import { Link } from "react-router-dom";
import { creatorVirtualBookingStartStart } from "../../store/actions/CreatorVirtualAction";
const $ = window.$;

const BookingModal = (props) => {

  const dispatch = useDispatch();
  const creatorVirtualBookingStart = useSelector(state => state.creatorVirtual.creatorVirtualBookingStart);
  const [paymentType, setPaymentType] = useState("WALLET");

  const [isOnlyWalletPayment, setIsOnlyWalletPayment] = useState(
    configuration.get("configData.is_only_wallet_payment")
  );

  useEffect(() => {
    if (props.bookingModal) {
      props.dispatch(fetchCardDetailsStart());
      props.dispatch(fetchWalletDetailsStart());
    }
  }, [props.bookingModal]);

  const handleSubmit = () => {
    // event.preventDefault();
    if (paymentType === "CARD")
      dispatch(
        creatorVirtualBookingStartStart({
          virtual_experience_id: props.bookingModal.virtual_experience_id,
          book_all: props.bookAll ? 1 : 0,
      })
      );
    if (paymentType == "WALLET")
      dispatch(
        creatorVirtualBookingStartStart({
          virtual_experience_id: props.bookingModal.virtual_experience_id,
          book_all: props.bookAll ? 1 : 0,
        })
      );
  };

  const paypalOnSuccess = (payment) => {
    setTimeout(() => {
      props.dispatch(
        livePaymentPaypalStart({
          live_video_id: props?.virtualExperiences.unique_id, // u
          payment_id: payment.paymentID,
        })
      );
    }, 1000);
    props.closeBookingModal();
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
  let env = configuration.get("configData.PAYPAL_MODE"); // you can set here to 'production' for production
  let currency = "USD"; // or you can set this value from your props or state

  const client = {
    sandbox: configuration.get("configData.PAYPAL_ID"),
    production: configuration.get("configData.PAYPAL_ID"),
  };

  return (
    <Modal
      centered
      size="lg"
      className="modal-dialog-center sent-tip-modal"
      show={props.bookingModal}
      onHide={props.closeBookingModal}
    >
        <>
          <Modal.Header closeButton>
            <Modal.Title>Virtual Experience Booking</Modal.Title>
          </Modal.Header>
          <Modal.Body className="subscription-tip-ppv-tab">
            <Tab.Container
              id="left-tabs-example"
              defaultActiveKey={paymentType}
            >
              <Row>
                <Col sm={3}>
                  <Nav variant="pills" className="flex-column">
                    {isOnlyWalletPayment == 0 ? (
                      <Nav.Item>
                        {configuration.get("configData.is_stripe_enabled") ==
                          1 &&
                        configuration.get(
                          "configData.stripe_publishable_key"
                        ) !== "" &&
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
                        {configuration.get("configData.is_paypal_enabled") ==
                          1 &&
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
                        {configuration.get("configData.is_ccbill_enabled") ==
                          1 &&
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
                    ) : null}
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
                          value={!props.bookAll ? props?.virtualExperiences.price_per_formatted : props?.virtualExperiences.price_per * props?.virtualExperiences.total_capacity + " Tokens"}
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
                                      <h5 className="text-muted">Add Card</h5>
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
                                {props?.virtualExperiences.price_per >
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
            {paymentType === "PAYPAL" &&
            props?.virtualExperiences.price_per != 0 ? (
              <PaypalExpressBtn
                env={env}
                client={client}
                currency={currency}
                total={props?.virtualExperiences.price_per}
                onError={paypalOnError}
                onSuccess={paypalOnSuccess}
                onCancel={paypalOnCancel}
              />
            ) : null}
            <Button
              type="button"
              className="btn btn-danger"
              data-dismiss="modal"
              disabled={creatorVirtualBookingStart.buttonDisable}
              onClick={props.closeBookingModal}
            >
              {t("cancel")}
            </Button>
            {paymentType !== "PAYPAL" ? (
              <Button
                type="button"
                className="btn btn-success"
                data-dismiss="modal"
                onClick={handleSubmit}
                disabled={creatorVirtualBookingStart.buttonDisable}
              >
                {creatorVirtualBookingStart.buttonDisable
                  ? "Loading"
                  : t("pay")}
              </Button>
            ) : null}
          </Modal.Footer>
        </>
    </Modal>
  );
};

const mapStateToPros = (state) => ({
  liveVideoDetails: state.liveVideo.singleLiveVideo,
  wallet: state.wallet.walletData,
  cards: state.cards.cardDetails,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(BookingModal));
