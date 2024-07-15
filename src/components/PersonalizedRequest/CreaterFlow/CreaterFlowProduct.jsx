import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import SliderImage from 'react-zoom-slider';
import { Link } from "react-router-dom";
// import './Personalized.css';


const data = [
  {
    image: window.location.origin + '/assets/images/products/shoe1.png',
    text: 'img1'
  },
  {
    image: window.location.origin + '/assets/images/products/shoe1.png',
    text: 'img2'
  },
  {
    image: window.location.origin + '/assets/images/products/shoe1.png',
    text: 'img3'
  },
  {
    image: window.location.origin + '/assets/images/products/shoe1.png',
    text: 'img4'
  },
]

const CreaterFlowProductDetails = () => {
  return (
    <div className="new-home-page-sec">
      <Container fluid>
        <div className="personalized-request-box">
          <div className="personalized-table-back product-detail-header">
            <Link to="/creater-product-detail">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  enableBackground="new 0 0 512 512"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#9f4298"
                    d="M4.943 5.606L1.024 9.525a3.585 3.585 0 000 4.95l3.919 3.919a1.5 1.5 0 102.121-2.121l-2.779-2.781 18.25-.023a1.5 1.5 0 001.5-1.5 1.5 1.5 0 00-1.5-1.5L4.3 10.492l2.764-2.765a1.5 1.5 0 00-2.121-2.121z"
                  ></path>
                </svg>
              </span>
              <span className="personalized-request-back-info">Back</span>
            </Link>
            <div className="table-heading"><h4>Product Details</h4></div>
          </div>
          <Row>
            <Col md={6}>
              <div className="product-slider">
                <SliderImage
                  data={data}
                  showDescription={false}
                  direction="right"
                />
              </div>
            </Col>
            <Col md={6}>
              <div className="personalized-request-product-details-info">
                <div className="product-title">
                  <h3>Nike Mens Revolution 6 Nn 4e Running Shoes</h3>
                  <h4>$815.00</h4>
                </div>
                <div className="product-tracking-id">
                  <h4>Tracking ID</h4>
                  <div className="product-tracking-location-sec">
                    <div className="product-tracking-location">
                      <span className="product-tracking-location-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="22"
                          fill="none"
                          viewBox="0 0 22 22"
                        >
                          <path
                            fill="#9F4298"
                            d="M14.232 10.353a.647.647 0 110 1.294h-.647a1.94 1.94 0 00-.001 3.881h5.183a3.236 3.236 0 01-.002 6.47H8.41a.647.647 0 110-1.295h10.355a1.942 1.942 0 00.002-3.88h-5.183a3.234 3.234 0 11.001-6.47h.647zm3.633.833a.647.647 0 01-.797 0 14.253 14.253 0 01-.645-.555 15.774 15.774 0 01-1.391-1.442c-1.303-1.54-2.094-3.11-2.094-4.658a4.528 4.528 0 019.057 0c0 1.548-.792 3.118-2.094 4.658a15.747 15.747 0 01-2.037 1.997zm-.229-1.51c.436-.398.872-.843 1.277-1.322 1.123-1.328 1.788-2.647 1.788-3.823a3.235 3.235 0 00-6.47 0c0 1.176.665 2.495 1.789 3.823a14.501 14.501 0 001.446 1.476l.17-.153zm-.17-3.204a1.94 1.94 0 110-3.882 1.94 1.94 0 010 3.882zm0-1.294a.647.647 0 100-1.294.647.647 0 000 1.294zM4.926 21.86a.647.647 0 01-.796 0 14.342 14.342 0 01-.645-.555 15.767 15.767 0 01-1.391-1.442C.79 18.323 0 16.753 0 15.205a4.528 4.528 0 119.057 0c0 1.548-.792 3.118-2.094 4.658a15.767 15.767 0 01-2.037 1.997zm-.228-1.51c.436-.398.872-.843 1.277-1.322 1.123-1.328 1.788-2.647 1.788-3.823a3.234 3.234 0 10-6.47 0c0 1.176.665 2.495 1.789 3.823a14.48 14.48 0 001.446 1.476l.17-.153zm-.17-3.205a1.94 1.94 0 110-3.88 1.94 1.94 0 010 3.88zm0-1.293a.647.647 0 100-1.294.647.647 0 000 1.294z"
                          ></path>
                        </svg>
                      </span>
                      <span className="product-tracking-location-info">
                        https://utm_campaign=ExampleCamp_ ...
                      </span>
                    </div>
                    <Button className="product-tracking-copy-btn">
                      <span className="product-tracking-copy-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          fill="none"
                          viewBox="0 0 19 18"
                        >
                          <path
                            stroke="#111"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M13.458 5.824H9.5A3.167 3.167 0 006.333 8.99v3.958A3.167 3.167 0 009.5 16.115h3.958a3.167 3.167 0 003.167-3.166V8.99a3.167 3.167 0 00-3.167-3.166z"
                          ></path>
                          <path
                            stroke="#111"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M12.667 5.824v-.792A3.167 3.167 0 009.5 1.865H5.542a3.167 3.167 0 00-3.167 3.167V8.99a3.166 3.166 0 003.167 3.167h.791"
                          ></path>
                        </svg>
                      </span>
                      <span className="product-tracking-copy-info">Copy</span>
                    </Button>
                  </div>
                </div>
                <div className="product-discription-info">
                  <h4>Product Description</h4>
                  <p>Abdos 500Pcs Cap & Plastic Test Tubes, P10310 is a premium quality product from Abdos. Moglix is a well-known
                    ecommerce platform for qualitative range of Other Lab Supplies. All Abdos 500Pcs Cap & Plastic Test Tubes, P10310 
                    are manufactured by using quality assured material and advanced techniques, which make them up to the standard in this 
                    highly challenging field. The materials utilized to manufacture Abdos 500Pcs Cap & Plastic Test Tubes, P10310, are sourced 
                    from the most reliable and official vendors, chosen after performing detailed market surveys.
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>


    </div>
  )
}

export default CreaterFlowProductDetails