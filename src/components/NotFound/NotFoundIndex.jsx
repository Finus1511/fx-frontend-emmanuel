import React from "react";
import { Button, Col, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { translate, t } from "react-multi-lang";

import "./NotFound.css";

const NotFoundIndex = () => {
  return (
    <>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "2em",
        }}
      >
        <Image
          style={{ width: "30em" }}
          src={window.location.origin + "/assets/images/404.png"}
        />
        <div className="custome-call-card-btn">
          <Link to="/" className="start-video-call-btn">
            Go Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default translate(NotFoundIndex);
