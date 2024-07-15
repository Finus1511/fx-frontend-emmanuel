import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import "./GoLiveProduct.css";
import { Form as FORM, Formik, Field, ErrorMessage } from "formik";
import { creatorUpdateShippingUrlStart } from "../../store/actions/ProductLiveStreamAction";
import { useDispatch, useSelector } from "react-redux";
import { translate, t } from "react-multi-lang";
import * as Yup from "yup";

const ShippingUrlModal = (props) => {
  const { uniqueId, shoppingId } = props;
  const dispatch = useDispatch();
  const [skipRender, setSkipRender] = useState(true);
  const updateShippingUrl = useSelector(
    (state) => state.productLiveStream.updateShippingUrl
  );

  const urlSchema = Yup.object().shape({
    shipping_url: Yup.string().required(t("required")),
  });

  const handleSubmit = (values) => {
    dispatch(
      creatorUpdateShippingUrlStart({
        ...values,
        unique_id: uniqueId,
        live_stream_shopping_unique_id: shoppingId,
      })
    );
  };

  useEffect(() => {
    if (
      !updateShippingUrl.loading &&
      !skipRender &&
      Object.keys(updateShippingUrl.data).length > 0
    ) {
      props.onHide();
    }
    setSkipRender(false);
  }, [updateShippingUrl]);

  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="rejection-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {t("enter_shipping_url")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              shipping_url: props.show.shipping_url,
            }}
            validationSchema={urlSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, setFieldValue, resetForm }) => (
              <FORM>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label className="url-label">
                    {t("shipping_url")}
                  </Form.Label>
                  <Field
                    type="text"
                    name="shipping_url"
                    placeholder={t("enter_shipping_url")}
                    className="form-control"
                  />
                  <ErrorMessage
                    component="div"
                    name="shipping_url"
                    className="errorMsg mt-3"
                  />
                </Form.Group>
                <div className="feature-content-footer">
                  <Button
                    className="default-btn ship-btn"
                    type="submit"
                    disabled={updateShippingUrl.loading}
                  >
                    <span>
                      {updateShippingUrl.loading ? t("loading") : t("ship")}
                    </span>
                  </Button>
                </div>
              </FORM>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default translate(ShippingUrlModal);
