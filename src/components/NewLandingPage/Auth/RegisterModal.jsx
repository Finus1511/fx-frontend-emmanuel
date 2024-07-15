import React from "react";
import { Form, Button, Modal, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const RegisterModal = (props) => {
  return (
    <>
      <Modal
        className="modal-dialog-center auth-modal"
        size="md"
        centered
        show={props.register}
        onHide={props.closeRegisterModal}
      >
        <Modal.Body>
          <h4>Register</h4>
          <Button
            className="modal-close"
            onClick={() => props.closeRegisterModal()}
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
              <div className="auth-social-link-box">
                <div className="auth-social-link-card">
                  <Button className="auth-social-btn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="icon icon-tabler icon-tabler-brand-google"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="#878E96"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M20.945 11a9 9 0 1 1 -3.284 -5.997l-2.655 2.392a5.5 5.5 0 1 0 2.119 6.605h-4.125v-3h7.945z" />
                    </svg>
                    Continue with Google
                  </Button>
                  <Button className="auth-social-btn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="icon icon-tabler icon-tabler-brand-facebook"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      stroke-width="2"
                      stroke="#878E96"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
                    </svg>
                    Continue with Facebook
                  </Button>
                </div>
              </div>
              <div className="divider-separtor-sec">
                <span>Or with</span>
              </div>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="#DDE1E6"
                    x="0"
                    y="0"
                    enableBackground="new 0 0 512 512"
                    version="1.1"
                    viewBox="0 0 512 512"
                    xmlSpace="preserve"
                    >
                    <circle cx="256" cy="128" r="128"></circle>
                    <path d="M256 298.667c-105.99.118-191.882 86.01-192 192C64 502.449 73.551 512 85.333 512h341.333c11.782 0 21.333-9.551 21.333-21.333-.117-105.99-86.009-191.883-191.999-192z"></path>
                </svg>
                </InputGroup.Text>
                <Form.Control
                  placeholder="Name"
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 18 15"
                  >
                    <path
                      fill="#DDE1E6"
                      d="M18 10.784c0 2.324-2.016 4.208-4.527 4.216H4.545C2.043 15 0 13.125 0 10.8v-.008s.005-3.688.013-5.543c0-.349.432-.544.727-.327a969.228 969.228 0 016.01 4.472 3.848 3.848 0 002.277.742c.828 0 1.638-.267 2.277-.75.048-.03 3.786-2.808 5.957-4.405.295-.217.73-.022.73.325.009 1.84.009 5.478.009 5.478z"
                    ></path>
                    <path
                      fill="#DDE1E6"
                      d="M17.528 2.228C16.748.868 15.215 0 13.527 0H4.545C2.857 0 1.323.868.543 2.228a.685.685 0 00.2.899l6.682 4.949c.468.35 1.035.524 1.602.524h.018c.567 0 1.134-.174 1.602-.524l6.682-4.95a.685.685 0 00.2-.898z"
                    ></path>
                  </svg>
                </InputGroup.Text>
                <Form.Control
                  placeholder="Email"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
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
              <div className="auth-static-page-sec">
                <h5>By signing up, you agree to our <Link to="#">Terms of Service</Link> And <Link to="#">Privacy Policy.</Link></h5>
              </div>
              <div className="auth-btn-sec">
                <Button className="default-btn">Register</Button>
              </div>
              <div className="auth-footer-sec">
                <h5>Already have an Account?
                  <Link to="#">
                    Login
                  </Link>
                </h5>
              </div>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RegisterModal;
