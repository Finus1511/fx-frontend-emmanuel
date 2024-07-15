import React from "react";
import InputSpinner from "react-bootstrap-input-spinner";
import { Row, Col, Button, Image, Container } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";

const UserVirtualLoader = () => {
  return (
    <>
      <div className="user-virtual-wrapped">
        <Container>
        <Row>
          <Col md={6} lg={6}>
            <div className="user-virtaul-frame">
              {[...Array(3)].map((i, key) => (
                <Skeleton
                  key={key}
                  className="user-virtual-image mb-1"
                  height={150}
                />
              ))}
            </div>
          </Col>
          <Col md={6} lg={6}>
            <div className="user-full-card">
              {[...Array(1)].map((i, key) => (
                <Skeleton
                  key={key}
                  className="user-virtual-image mb-1"
                  height={200}
                />
              ))}
            </div>
          </Col>
        </Row>
        </Container>
        
      </div>
    </>
  );
};
export default UserVirtualLoader;
