import React, { useState, useEffect, useCallback } from "react";
import { Form, Button, Image, Modal, Container, Row, Col } from "react-bootstrap";
import Cropper from "react-easy-crop";
import { t } from "react-multi-lang";
import { useDispatch, useSelector } from "react-redux";
import { updateCommunityDetailsStart } from "../../store/actions/CommunityAction";
import { Formik, Form as FORM, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const UpdateCommunity = (props) => {

  const dispatch = useDispatch();
  const communityUpdate = useSelector(state => state.community.communityUpdate);

  const [skipRender, setSkipRender] = useState(true)
  const [inputData, setInputData] = useState({
    name: props.selectedUser.name
  });

  const handleSubmit = (data) => {
    dispatch(updateCommunityDetailsStart({
      ...data,
      community_id: props.selectedUser.community_id
    }));
  };

  useEffect(() => {
    if (!skipRender && !communityUpdate.loading && Object.keys(communityUpdate.data).length > 0) {
      props.closeUpdateCommunity()
    }
    setSkipRender(false);
  }, [communityUpdate]);

  const communityValidation = Yup.object().shape({
    name: Yup.string().required(t("name_is_required")),
  });

  return (
    <>
      <Modal
        className="modal-dialog-center pay-amount-modal new-upload modal"
        size="lg"
        centered
        show={props.updateCommunity}
        onHide={props.closeUpdateCommunity}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Community</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="notification-page create-post" id="tabs">
            <Container>
              <Formik
                initialValues={{
                  name: props.selectedUser.name
                }}
                validationSchema={communityValidation}
                onSubmit={(data) => handleSubmit(data)}
              >
                {({ values, errors, touched }) => (
                  <FORM>
                    <Row>
                      <Col sm={12} md={12} className="mt-3 mt-lg-4">
                        <Form.Group controlId="formBasicEmail">
                          <Form.Label>{t("name")}</Form.Label>
                          <Field
                            className="form-control"
                            type="text"
                            placeholder={t(
                              "name_placeholder"
                            )}
                            name="name"
                          />
                          <ErrorMessage
                            name="name"
                            component="div"
                            className="text-danger text-right"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <div className="settings-btn-sec">
                          <Button
                            type="submit"
                            className="settings-submit-btn"
                            disabled={communityUpdate.buttonDisbled}
                          >
                            {communityUpdate.loadingButtonContent
                              ? communityUpdate.loadingButtonContent
                              : t("submit")}
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </FORM>
                )}
              </Formik>
            </Container>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UpdateCommunity;
