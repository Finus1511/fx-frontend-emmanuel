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
  InputGroup
} from "react-bootstrap";
import { translate, t } from "react-multi-lang";
import configuration from "react-global-configuration";
import { productLiveStreamPaymentStart } from "../../store/actions/ProductLiveStreamAction";
import { fetchWalletDetailsStart } from "../../store/actions/WalletAction";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
const $ = window.$;

const PaymentModal = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const wallet = useSelector((state) => state.wallet.walletData);
  const liveStreamPayment = useSelector((state) => state.productLiveStream.liveStreamPayment);
  const [paymentType, setPaymentType] = useState(localStorage.getItem("default_payment_method"));
  const [skipRender, setSkipRender] = useState(true);
  const [reloadWallet, setReloadWallet] = useState(true);

  useEffect(() => {
    dispatch(fetchWalletDetailsStart());
  }, []);

  const handleSubmit = () => {
    dispatch(
      productLiveStreamPaymentStart({
        live_stream_shopping_unique_id: props.show.unique_id,
      })
    );
  };

  useEffect(() => {
    if (Object.keys(liveStreamPayment.data).length > 0 && !skipRender) {
      if (props.show.schedule_type == 1 || props.show.is_streaming == "YES")
        history.push(`product-onlive-stream/${props.show.unique_id}`, {
          virtual_id: props.show.virtual_id,
        });
      else {
        if (props.show.status == 1 && props.show.schedule_type == 2) {
          props.onHide();
        } else {
          history.push(`product-onlive-stream/${props.show.unique_id}`, {
            virtual_id: props.show.virtual_id,
          });
        }
      }
    }
    setSkipRender(false);
  }, [liveStreamPayment]);

  useEffect(() => {
    dispatch(fetchWalletDetailsStart());
  }, []);

  return (
    // <Modal
    //   {...props}
    //   centered
    //   size="lg"
    //   className="modal-dialog-center sent-tip-modal"
    // >
    //   <>
    //     <Modal.Header closeButton className="pay-now-modal">
    //       <Modal.Title>{t("pay_now")}</Modal.Title>
    //     </Modal.Header>
    //     <Modal.Body className="subscription-tip-ppv-tab">
    //       <Tab.Container id="left-tabs-example" defaultActiveKey={paymentType}>
    //         <Row>
    //           <Col sm={3}>
    //             <Nav variant="pills" className="flex-column">
    //               {configuration.get("configData.is_wallet_payment_enabled") ==
    //               1 ? (
    //                 <Nav.Item>
    //                   <Nav.Link
    //                     onClick={() => setPaymentType("WALLET")}
    //                     eventKey="WALLET"
    //                   >
    //                     {t("wallet")}
    //                   </Nav.Link>
    //                 </Nav.Item>
    //               ) : null}
    //             </Nav>
    //           </Col>
    //           <Col sm={9}>
    //             <div className="card-stripe-box">
    //               <Form>
    //                 <Form.Group
    //                   className="mb-3"
    //                   controlId="exampleForm.ControlInput1"
    //                 >
    //                   <Form.Control
    //                     type="text"
    //                     placeholder={t("pay_amount")}
    //                     value={props?.show.amount}
    //                     disabled
    //                   />
    //                 </Form.Group>
    //                 <Tab.Content>
    //                   {configuration.get(
    //                     "configData.is_wallet_payment_enabled"
    //                   ) == 1 ? (
    //                     <Tab.Pane eventKey="WALLET">
    //                       {wallet.loading ? (
    //                         ""
    //                       ) : (
    //                         <div className="card-stripe-box">
    //                           <div className="wallet-balence-amount">
    //                             <h4>{t("available")}</h4>
    //                             <p>
    //                               {wallet.data.user_wallet.remaining_formatted}
    //                             </p>
    //                           </div>
    //                           {props?.show.amount >
    //                           wallet.data.user_wallet.remaining ? (
    //                             <div className="">
    //                               <p className="conv-desc desc">
    //                                 {t("low_wallet_balance_tips_payment_para")}
    //                               </p>
    //                               <div className="d-flex">
    //                                 <Link
    //                                   to="/wallet"
    //                                   className="withdraw-money-btn"
    //                                 >
    //                                   {t("add_wallet_amount")}
    //                                 </Link>
    //                               </div>
    //                             </div>
    //                           ) : null}
    //                         </div>
    //                       )}
    //                     </Tab.Pane>
    //                   ) : null}
    //                 </Tab.Content>
    //               </Form>
    //             </div>
    //           </Col>
    //         </Row>
    //       </Tab.Container>
    //     </Modal.Body>
    //     <Modal.Footer>
    //     <div className="pay-now-btn-sec">
    //       <Button
    //         type="button"
    //         className="default-btn"
    //         data-dismiss="modal"
    //         onClick={handleSubmit}
    //         disabled={wallet.loading || liveStreamPayment.loading}
    //       >
    //         {liveStreamPayment.loading ? t("loading") : t("pay")}
    //       </Button>
    //       <Button
    //         type="button"
    //         className="default-btn"
    //         data-dismiss="modal"
    //         disabled={liveStreamPayment.loading}
    //         onClick={props.onHide}
    //       >
    //         {t("cancel")}
    //       </Button>
    //       </div>
    //     </Modal.Footer>
    //   </>
    // </Modal>
    <>
  {  console.log(props.show)}
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
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
                  {props.show.amount >
                    wallet.data.user_wallet.remaining ? (
                    <p className="text-danger">
                      {t("low_wallet_balance_tips_payment_para")}
                    </p>
                  ) :
                    null
                  }
                  {props.show.amount >
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
                  <p>{props.show.amount_formatted}</p>
                </div>
                <div className="pay-modal-token">
                  <h5>{t("total_token")}</h5>
                  <h4>{props.show.amount}</h4>
                </div>
              </div>
              <Button
                className="default-btn"
                onClick={handleSubmit}
                buttonDisable={
                  liveStreamPayment.loading ||
                  wallet.buttonDisable ||
                  wallet.data?.user_wallet?.remaining <
                  props?.show.amount
                }
              >   {liveStreamPayment.loading ? t("loading") : t("pay")}
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default translate(PaymentModal);
