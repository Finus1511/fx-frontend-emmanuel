import React, { useState } from "react";
import { Container, Image, Nav, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import SignInModal from "./Auth/SignInModal";
import RegisterModal from "./Auth/RegisterModal";
import { translate, t } from "react-multi-lang";

const NewHomeBanner = (props) => {
  const [signIn, setSignIn] = useState(null);

  const closeSignInModal = () => {
    setSignIn(false);
  };

  const [register, setRegister] = useState(false);

  const closeRegisterModal = () => {
    setRegister(false);
  };

  return (
    <>
      <div className="home-banner-sec">
        <div className="banner-vertical-content">
          <Container fluid>
            <div className="home-banner-box">
              <Row className="align-items-center">
                <Col md={12} xl={6} className="resp-mrg-btm-md">
                  <div className="banner-content">
                    <h1>{t("landing_page.home_banner.header")}</h1>
                    <p>
                      {t("landing_page.home_banner.content")}
                    </p>
                    <div className="banner-btn-sec">
                      <Button
                        className="default-btn"
                        onClick={() => setSignIn("login")}
                      >
                        {t("login")}
                      </Button>
                      <Button
                        className="default-outline-btn"
                        onClick={() => setSignIn("signup")}
                      >
                        {t("register")}
                      </Button>
                    </div>
                  </div>
                </Col>
                <Col md={12} xl={6}>
                  <div className="banner-img-sec">
                    <Image
                      className="banner-img"
                      src={
                        window.location.origin +
                        "/assets/images/new-landing-page/banner-img.png"
                      }
                      type="image/png"
                    />
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </div>
      {signIn && <SignInModal
        signIn={signIn}
        closeSignInModal={closeSignInModal}
        setSignIn={setSignIn}
      />}
      <RegisterModal
        register={register}
        closeRegisterModal={closeRegisterModal}
        setRegister={setRegister}
      />
    </>
  );
};

export default NewHomeBanner;
