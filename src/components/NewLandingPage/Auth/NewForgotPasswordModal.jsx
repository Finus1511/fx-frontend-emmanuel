import React from "react";
import { Form, Button, Modal, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const NewForgotPasswordModal = (props) => {
  return (
    <>
      <Modal
        className="modal-dialog-center auth-modal"
        size="md"
        centered
        show={props.newForgotPassword}
        onHide={props.closeNewForgotPasswordModal}
      >
        <Modal.Body>
          <h4>Login</h4>
          <Button
            className="modal-close"
            onClick={() => props.closeNewForgotPasswordModal()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              fill="none"
              viewBox="0 0 11 11"
            >
              <path
                fill="#979BA2"
                d="M10.756.252a.83.83 0 00-1.176 0L5.5 4.324 1.42.244A.83.83 0 10.244 1.42l4.08 4.08-4.08 4.08a.83.83 0 101.176 1.176l4.08-4.08 4.08 4.08a.831.831 0 101.176-1.176L6.676 5.5l4.08-4.08a.836.836 0 000-1.168z"
              ></path>
            </svg>
          </Button>

          <div className="auth-form-modal-sec">
            <Form className="auth-form-sec">
              <InputGroup className="mb-0 auth-input-group">
                <InputGroup.Text>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 16 19"
                >
                  <path
                    fill="#DDE1E6"
                    d="M13.6 6.669V5.542C13.6 2.482 11.093 0 8 0 4.907 0 2.4 2.481 2.4 5.542v1.127A3.957 3.957 0 000 10.292v4.75C.003 17.227 1.792 18.997 4 19h8c2.208-.003 3.997-1.773 4-3.958v-4.75a3.957 3.957 0 00-2.4-3.623zm-4.8 6.79a.796.796 0 01-.8.791.796.796 0 01-.8-.792v-1.583c0-.437.358-.792.8-.792.442 0 .8.355.8.792v1.583zM12 6.332H4v-.791c0-2.186 1.79-3.959 4-3.959s4 1.773 4 3.959v.791z"
                  ></path>
                </svg>
                </InputGroup.Text>
                <Form.Control
                  placeholder="*******"
                  className="border-right-zero"
                />
                <InputGroup.Text className="border-right-input">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 20 21"
                >
                  <path
                    stroke="#8F95B2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.714 9.635a1.411 1.411 0 010 1.73c-1.244 1.624-4.23 4.968-7.714 4.968-3.485 0-6.47-3.344-7.714-4.968a1.41 1.41 0 010-1.73C3.53 8.011 6.515 4.667 10 4.667c3.485 0 6.47 3.344 7.714 4.968v0z"
                  ></path>
                  <path
                    stroke="#8F95B2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 13a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
                  ></path>
                </svg>
                </InputGroup.Text>
              </InputGroup>
              <div className="auth-btn-sec">
                <Button className="default-btn">Forgot Password</Button>
              </div>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default NewForgotPasswordModal;
