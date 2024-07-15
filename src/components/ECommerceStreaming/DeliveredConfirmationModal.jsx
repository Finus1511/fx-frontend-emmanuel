import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import "./GoLiveProduct.css";
import { deliveryConfirmationStart } from "../../store/actions/ProductLiveStreamAction";
import { useDispatch, useSelector } from "react-redux";
import { translate, t } from "react-multi-lang";

const DeliveredConfirmationModal = (props) => {
  const { uniqueId, shoppingId } = props;
  const dispatch = useDispatch();
  const [skipRender, setSkipRender] = useState(true);
  const deliveryConfirmation = useSelector(
    (state) => state.productLiveStream.deliveryConfirmation
  );

  const handleSubmit = () => {
    dispatch(
      deliveryConfirmationStart({
        lss_product_payment_unique_id: uniqueId,
        live_stream_shopping_unique_id: shoppingId,
      })
    );
  };

  useEffect(() => {
    if (
      !deliveryConfirmation.loading &&
      !skipRender &&
      Object.keys(deliveryConfirmation.data).length > 0
    ) {
      props.onHide();
    }
    setSkipRender(false);
  }, [deliveryConfirmation]);

  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="rejection-modal ship-confirmation-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {t("confirmation")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>{t("confirm_delivered")}</h3>
          <div className="ship-confirmation-modal-footer">
            <Button
              className="default-btn ship-btn"
              onClick={() => {
                handleSubmit();
              }}
              disabled={deliveryConfirmation.loading}
            >
              <span>
                {deliveryConfirmation.loading ? t("loading") : t("confirm")}
              </span>
            </Button>

            <Button
              className="default-btn ship-btn"
              disabled={deliveryConfirmation.loading}
              onClick={() => {
                props.onHide();
              }}
            >
              <span>{t("cancel")}</span>
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default translate(DeliveredConfirmationModal);
