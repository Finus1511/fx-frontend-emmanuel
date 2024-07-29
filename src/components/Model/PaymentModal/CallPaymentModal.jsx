import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { translate, t } from "react-multi-lang";
import { Button, Modal, Form, InputGroup, Image } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import "../../Phase4/Phase4.css";
import PaymentMethodCard from "./PaymentMethodCard";
import PaymentModelMsgSec from "./PaymentModelMsgSec";
import {
  audioCallPayByWalletStart,
  videoCallPayByWalletStart,
} from "../../../store/actions/PrivateCallAction";
import { fetchCardDetailsStart } from "../../../store/actions/CardsAction";
import { fetchWalletDetailsStart } from "../../../store/actions/WalletAction";
import { useDispatch, useSelector } from "react-redux";
import CustomLazyLoad from "../../helper/CustomLazyLoad";
import Skeleton from "react-loading-skeleton";
import { couponCodeValidationStart } from "../../../store/actions/PremiumFolderAction";
import * as Yup from "yup";
import { Formik, Form as FORM, ErrorMessage, Field } from "formik";
import { ButtonLoader } from "../../helper/Loader";

const CallPaymentModal = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const wallet = useSelector((state) => state.wallet.walletData);
  const couponCodeValidation = useSelector(
    (state) => state.folder.couponCodeValidation
  );
  const { isVideo = false } = props;
  const nullData = ["", null, undefined, "light"];
  const [skipRender, setSkipRender] = useState(true);
  const [reloadWallet, setReloadWallet] = useState(true);
  const [couponDiscount, setCouponDiscount] = useState("");
  const [paymentType, setPaymentType] = useState(
    localStorage.getItem("default_payment_method")
  );
  const [selectedCard, setSelectedCard] = useState(null);
  const [showAddCard, setShowAddCard] = useState(false);

  const paypalOnError = () => {};
  const paypalOnSuccess = () => {};
  const paypalOnCancel = () => {};

  const handleSubmit = () => {
    if (isVideo) {
      props.dispatch(
        videoCallPayByWalletStart({
          video_call_request_id: props.callDetails.video_call_request_id,
          promo_code: couponDiscount.promo_code ? couponDiscount.promo_code : "",
        })
      );
    } else {
      props.dispatch(
        audioCallPayByWalletStart({
          audio_call_request_id: props.callDetails.audio_call_request_id,
          promo_code: couponDiscount.promo_code ? couponDiscount.promo_code : "",
        })
      );
    }
  };

  useEffect(() => {
    if (
      !skipRender &&
      !props.audioCallPayByWallet.loading &&
      Object.keys(props.audioCallPayByWallet.data).length > 0
    ) {
      props.closepaymentsModal();
    }
  }, [props.audioCallPayByWallet]);

  useEffect(() => {
    if (
      !skipRender &&
      !props.videoCallPayByWallet.loading &&
      Object.keys(props.videoCallPayByWallet.data).length > 0
    ) {
      props.closepaymentsModal();
    }
    setSkipRender(false);
  }, [props.videoCallPayByWallet]);

  useEffect(() => {
    dispatch(fetchWalletDetailsStart());
  }, [reloadWallet]);

  useEffect(() => {
    if (
      !skipRender &&
      !couponCodeValidation.loading &&
      Object.keys(couponCodeValidation.data).length > 0
    ) {
      setCouponDiscount(couponCodeValidation.data.coupon_code_validate);
    }
  }, [couponCodeValidation]);

  const couponSchema = Yup.object().shape({
    promo_code: Yup.string().required(t("required")),
  });

  const handleValidation = (values) => {
    if (isVideo) {
      dispatch(couponCodeValidationStart({
        ...values,
        video_call_request_id: props.callDetails.video_call_request_id,
        platform: "video-call-payments",
      }));
    } else {
      dispatch(couponCodeValidationStart({
        ...values,
        audio_call_request_id: props.callDetails.audio_call_request_id,
        platform: "audio-call-payments",
      }));
    }
  };

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
                  <PaymentModelMsgSec
                    title={t(isVideo ? "video_payment" : "audio_payment")}
                    message={t(
                      isVideo ? "video_payment_note" : "audio_payment_note"
                    )}
                    paymentType={paymentType}
                    amount_formatted={props.callDetails.amount_formatted}
                    amount={props.callDetails.amount}
                    payNowAction={handleSubmit}
                    paypalOnError={paypalOnError}
                    paypalOnSuccess={paypalOnSuccess}
                    paypalOnCancel={paypalOnCancel}
                    btnDisable={
                      props.audioCallPayByWallet.ButtonDisable ||
                      props.videoCallPayByWallet.ButtonDisable
                    }
                    btnText={
                      props.audioCallPayByWallet.loadingButtonContent
                        ? props.audioCallPayByWallet.loadingButtonContent
                        : props.videoCallPayByWallet.loadingButtonContent
                        ? props.videoCallPayByWallet.loadingButtonContent
                        : t("pay")
                    }
                  />
                </Col>
              </Row>
            </div>
          </Modal.Body>
        </Modal> */}
        <Modal
          show={props.paymentsModal}
          onHide={props.closepaymentsModal}
          size="xl"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          className="pay-amount-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {t(isVideo ? "video_payment" : "audio_payment")}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="pay-amount-modal-body">
              <div class="pay-wallet-sec ">
                <div className="pay-amount-head ">
                  <h4>{t("payment_method")}</h4>
                </div>
                {wallet.loading ? (
                  <Skeleton height={45} borderRadius={10} />
                ) : Object.keys(wallet.data).length > 0 ? (
                  <div className="services-card-wrapped">
                    <div className="go-live-select-lable">
                      <div class="form-check">
                        <label class="form-check-label" for="1">
                          {/* <input
                          class="form-check-input"
                          type="checkbox"
                          name="stream_type"
                          id="1"
                          checked={values.stream_type == "public"}
                          onChange={() =>
                            setFieldValue("stream_type", "public")
                          }
                        /> */}
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
                              {("wallet")}:
                              </span>
                              <span className="wallet-amount">
                                <Image
                                  src="assets/images/phase4/wallet.svg"
                                  className="wallet-icon"
                                />
                                {wallet.data?.user_wallet?.remaining_formatted}
                              </span>
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>
                    {wallet.data.user_wallet.remaining <
                      props.callDetails.amount && (
                      <p className="text-danger">
                        {t("low_wallet_balance_tips_payment_para")}
                      </p>
                    )}
                    {wallet.data.user_wallet.remaining <
                      props.callDetails.amount && (
                      <div className="add-wallet-btn-sec">
                        <Button
                          className="default-btn"
                          onClick={() => {
                            history.push("/wallet");
                          }}
                        >
                          {t("add_wallet_amount")}
                        </Button>
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
                  {/* <p>Lorem ipsum dolor sit amet.</p> */}
                </div>
                <div className="coupon-input">
                  {!couponDiscount ? (
                    <Formik
                      initialValues={{
                        promo_code: ""
                      }}
                      validationSchema={couponSchema}
                      onSubmit={handleValidation}
                    >
                      {({
                        errors,
                        touched,
                        setFieldValue,
                        resetForm,
                        setFieldError,
                      }) => (
                        <FORM>
                          <Form.Group controlId="formBasicEmail">
                            <InputGroup>
                              <Field
                                type="text"
                                aria-label="text"
                                name="promo_code"
                                className="form-control"
                              />
                              <InputGroup.Text>
                                <Button type="submit">
                                  {couponCodeValidation.loading ? (
                                    <ButtonLoader />
                                  ) : (
                                    "Apply"
                                  )}
                                </Button>
                              </InputGroup.Text>
                            </InputGroup>
                          </Form.Group>
                          <ErrorMessage
                            component="div"
                            name="coupon_code"
                            className="errorMsg"
                          />
                        </FORM>
                      )}
                    </Formik>
                  ) : (
                    <div className="coupon-container">
                      <div className="coupon-detail">
                        <Image
                          className="coupon-image"
                          src={
                            window.location.origin + "/assets/images/Coupon.svg"
                          }
                        />

                        <div className="coupon-text">
                          <p className="text-dark coupon-code">{couponDiscount.promo_code}</p>
                          <p className="text-success coupon-saved">
                            {t("saved")} {couponDiscount.coupon_applied_amount.toFixed(2)}
                          </p>
                        </div>
                      </div>

                      <Link
                        className="coupon-remove"
                        to="#"
                        onClick={() => setCouponDiscount("")}
                      >
                        {t("remove")}
                      </Link>
                    </div>
                  )}
                </div>
                <div className="pay-modal-token-sec">
                  <div className="pay-modal-token">
                    <p>{t("tokens")}</p>
                    <p>{props.callDetails.amount_formatted}</p>
                  </div>
                  {couponDiscount &&
                    <div className="pay-modal-token">
                      <p>{t("coupon_discount")}</p>
                      <p> -{couponDiscount.coupon_applied_amount.toFixed(2)}</p>
                    </div>
                  }
                  <div className="pay-modal-token">
                    <h5>{t("total_token")}</h5>
                    <h4>
                      {couponDiscount ?
                      props.callDetails.amount - couponDiscount.coupon_applied_amount.toFixed(2)
                      :
                      props.callDetails.amount}
                    </h4>
                  </div>
                </div>
                <Button
                  className="default-btn"
                  onClick={() => handleSubmit()}
                  disabled={
                    props.audioCallPayByWallet.ButtonDisable ||
                    props.videoCallPayByWallet.ButtonDisable ||
                    wallet.buttonDisable ||
                    wallet.data?.user_wallet?.remaining <
                      props.callDetails.amount
                  }
                >
                  {props.audioCallPayByWallet.loadingButtonContent
                    ? props.audioCallPayByWallet.loadingButtonContent
                    : props.videoCallPayByWallet.loadingButtonContent
                    ? props.videoCallPayByWallet.loadingButtonContent
                    : t("pay")}
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
  audioCallPayByWallet: state.privateCall.audioCallPayByWallet,
  videoCallPayByWallet: state.privateCall.audioCallPayByWallet,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(CallPaymentModal));
