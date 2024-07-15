import React, { useRef } from "react";
import { Button, Modal, Form, InputGroup } from "react-bootstrap";
import { Radio } from "pretty-checkbox-react";
import "./Phase4.css";
import { Formik, Form as FORM, ErrorMessage, Field } from "formik";
import { translate, t } from "react-multi-lang";

const CouponTableFilterModal = (props) => {
  const formRef = useRef();
  const handleSubmit = (values) => {
    const { amountType, date, start_time, end_time } = values;
    if (!amountType && !date && !start_time && !end_time) {
      formRef.current.setFieldError("end_time", "Select at least one field");
      return;
    }
    props.onSubmit(values);
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="coupon-table-filter-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {t("filter")}
        </Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{
          amountType: "",
          date: "",
          start_time: "",
          end_time: "",
        }}
        onSubmit={handleSubmit}
        innerRef={formRef}
      >
        {({ errors, touched, setFieldValue, resetForm, setFieldError }) => (
          <FORM>
            <Modal.Body>
              <div className="coupon-filter-types">
                <h4>{t("types")}</h4>
                <div className="table-filter-radio-btn">
                  <Radio
                    className="coupon-filter-radio"
                    name="amountType"
                    value="percentage"
                  >
                    <span>{t("percentage")}</span>
                  </Radio>
                  <Radio
                    className="coupon-filter-radio"
                    name="amountType"
                    value="amount"
                  >
                    <span>{t("fixed_amount")}</span>
                  </Radio>
                </div>
              </div>
              <div className="coupon-filter-types">
                <h4>{t("starts")}</h4>
                <div className="table-filter-radio-btn">
                  <Radio
                    className="coupon-filter-radio"
                    name="date"
                    value="7days"
                  >
                    <span>
                      {t("last")} 7 {t("days")}
                    </span>
                  </Radio>
                  <Radio
                    className="coupon-filter-radio"
                    name="date"
                    value="30days"
                  >
                    <span>
                      {t("last")} 30 {t("days")}
                    </span>
                  </Radio>
                  <Radio
                    className="coupon-filter-radio"
                    name="date"
                    value="90days"
                  >
                    <span>
                      {t("last")} 90{t("days")}
                    </span>
                  </Radio>
                  <Radio
                    className="coupon-filter-radio"
                    name="date"
                    value="custom"
                  >
                    <span>{t("custom")}</span>
                  </Radio>
                </div>
              </div>

              <div className="coupon-filter-date">
                <div className="go-live-produc-input">
                  <Form.Group>
                    <Form.Label>{t("start_date")}</Form.Label>
                    <Field
                      id="schedule-time-input"
                      type="datetime-local"
                      className="form-control"
                      placeholder="schedule_time"
                      name="start_time"
                      // onChange={(e) =>
                      //   setFieldValue("schedule_time", e.target.value)
                      // }
                    />
                  </Form.Group>
                </div>
                <div className="go-live-produc-input">
                  <Form.Group>
                    <Form.Label>{t("end_date")}</Form.Label>
                    <Field
                      id="schedule-time-input"
                      type="datetime-local"
                      className="form-control"
                      placeholder="schedule_time"
                      name="end_time"
                      // onChange={(e) =>
                      //   setFieldValue("schedule_time", e.target.value)
                      // }
                    />
                  </Form.Group>
                </div>
              </div>
              <ErrorMessage
                component="div"
                name="end_time"
                className="errorMsg text-danger text-right"
              />
            </Modal.Body>
            <Modal.Footer>
              <div className="coupon-card-btn">
                <Button className="default-cancel-btn" onClick={props.onHide}>
                  {t("clear")} {t("filter")}
                </Button>
                <Button className="default-btn" type="submit">
                  {t("apply")}
                </Button>
              </div>
            </Modal.Footer>
          </FORM>
        )}
      </Formik>
    </Modal>
  );
};

export default translate(CouponTableFilterModal);
