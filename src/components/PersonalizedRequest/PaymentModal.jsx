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
import { connect } from "react-redux";
import { translate, t } from "react-multi-lang";
import configuration from "react-global-configuration";
import PaypalExpressBtn from "react-paypal-express-checkout";
import { getErrorNotificationMessage } from "../helper/NotificationMessage";
import { prUserPaymentByWalletStart } from "../../store/actions/PersonalizeAction";
import { fetchWalletDetailsStart } from "../../store/actions/WalletAction";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const $ = window.$;

const PaymentModal = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const wallet = useSelector((state) => state.wallet.walletData);
  const userPaymentByWallet = useSelector(
    (state) => state.personalize.userPaymentByWallet
  );
  const [paymentType, setPaymentType] = useState(
    localStorage.getItem("default_payment_method")
  );
  const [skipRender, setSkipRender] = useState(true);

  useEffect(() => {
    dispatch(fetchWalletDetailsStart());
  }, []);

  const handleSubmit = () => {
    const { type, unique_id, amount, ...data } = props.show;
    dispatch(
      prUserPaymentByWalletStart({
        ...data,
        personalized_request_unique_id: props.show.unique_id,
      })
    );
  };

  useEffect(() => {
    if (Object.keys(userPaymentByWallet.data).length > 0 && !skipRender) {
      if (props.show.product_type == 1) props.onHide();
      else {
        history.push("/personal-request-table");
      }
    }
    setSkipRender(false);
  }, [userPaymentByWallet]);

  useEffect(() => {
    dispatch(fetchWalletDetailsStart());
  }, []);

  return (
    <Modal
      {...props}
      centered
      size="lg"
      className="modal-dialog-center sent-tip-modal"
    >
      <>
        <Modal.Header closeButton>
          <Modal.Title>{t("personalized_req_payment")}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="subscription-tip-ppv-tab">
          <Tab.Container id="left-tabs-example" defaultActiveKey={paymentType}>
            <Row>
              <Col sm={3}>
                <Nav variant="pills" className="flex-column">
                  {configuration.get("configData.is_wallet_payment_enabled") ==
                  1 ? (
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
                        value={props?.show.amount}
                        disabled
                      />
                    </Form.Group>
                    <Tab.Content>
                      {configuration.get(
                        "configData.is_wallet_payment_enabled"
                      ) == 1 ? (
                        <Tab.Pane eventKey="WALLET">
                          {wallet.loading ? (
                            ""
                          ) : (
                            <div className="card-stripe-box">
                              <div className="wallet-balence-amount">
                                <h4>{t("available")}</h4>
                                <p>
                                  {wallet.data.user_wallet.remaining_formatted}
                                </p>
                              </div>
                              {props?.show.amount >
                              wallet.data.user_wallet.remaining ? (
                                <div className="">
                                  <p className="conv-desc desc">
                                    {t("low_wallet_balance_tips_payment_para")}
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
          <Button
            type="button"
            className="btn btn-success"
            data-dismiss="modal"
            onClick={handleSubmit}
            disabled={wallet.loading || userPaymentByWallet.loading}
          >
            {userPaymentByWallet.loading ? t("loading") : t("pay")}
          </Button>
          <Button
            type="button"
            className="btn btn-danger"
            data-dismiss="modal"
            disabled={userPaymentByWallet.loading}
            onClick={props.onHide}
          >
            {t("cancel")}
          </Button>
        </Modal.Footer>
      </>
    </Modal>
  );
};

export default translate(PaymentModal);
