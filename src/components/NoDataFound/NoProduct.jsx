import React from "react";
import { Row, Col, Image } from "react-bootstrap";

const NoProduct = () => {
  return (
    <>
      <div className="no-data-found-sec">
        <Row>
          <Col sm="12" md="12">
            <div className="no-data-found-img-sec">
              <Image
                alt="not-found"
                src={window.location.origin + "/assets/images/no-product.svg"}
              />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default NoProduct;
