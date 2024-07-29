import React from 'react';
import {
  Container,
  Row,
  Col,
} from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
const EditCouponLoder = () => {
  return (
    <>
      <div className="personalized-table-head">
        <Skeleton count={1} height={25} width={200} />
      </div>
      <div className="create-coupon-sec">
        <Row className="justify-content-center">
          <Col lg={8}>
            <div className="coupon-card-box">
              <Skeleton className="mb-2" count={1} height={180} width={"100%"} />
              <div className="coupon-card">
                <Skeleton count={1} height={90} width={"100%"} />
              </div>
              <div className="coupon-card">
                <Skeleton count={1} height={155} width={"100%"} />
              </div>
              <div className="coupon-card">
                <Skeleton count={1} height={158} width={"100%"} />
              </div>
              <div className="coupon-card">
                <Skeleton count={1} height={256} width={"100%"} />
              </div>
              <div className="coupon-card">
                <Skeleton count={1} height={186} width={"100%"} />
              </div>
              <div className="coupon-card">
                <Skeleton count={1} height={70} width={"100%"} />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  )
}
export default EditCouponLoder;