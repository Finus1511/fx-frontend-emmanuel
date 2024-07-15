import React, { useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import SliderImage from "react-zoom-slider";
import Slider from "react-slick";
import { Link, useHistory, useParams } from "react-router-dom";
import "./Personalized.css";
import { useDispatch, useSelector } from "react-redux";
import { prRequestViewStart } from "../../store/actions/PersonalizeAction";
import Skeleton from "react-loading-skeleton";
import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../../components/helper/NotificationMessage";
import { createNotification } from "react-redux-notify";
import { translate, t } from "react-multi-lang";
import NoDataFound from "../NoDataFound/NoDataFound";

const ProductDetails = (data) => {
  const { uniqueId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const requestView = useSelector((state) => state.personalize.requestView);

  useEffect(() => {
    dispatch(prRequestViewStart({ personalized_request_unique_id: uniqueId }));
  }, []);

  const handleCopy = async (data) => {
    try {
      await navigator.clipboard.writeText(data);
      const notificationMessage = getSuccessNotificationMessage(
        "Copied to clipboard"
      );
      dispatch(createNotification(notificationMessage));
    } catch (e) {
      const notificationMessage = getErrorNotificationMessage(e);
      dispatch(createNotification(notificationMessage));
    }
  };

  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <img
            src={
              /\.(jpg|jpeg|png|gif)$/i.test(
                requestView.data.personalized_product
                  .personalized_product_files[i].file
              )
                ? requestView.data.personalized_product
                    .personalized_product_files[i].file
                : window.location.origin + "/assets/images/icons/video.svg"
            }
          />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    // adaptiveHeight: true,
    fade: true,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      {requestView.loading ? (
        <div className="new-home-page-sec">
          <Container fluid>
            <div className="personalized-request-box">
              <div className="personalized-table-back product-detail-header">
                <Skeleton height={18} />

                <div className="table-heading">
                  <Skeleton width={100} height={18} />
                </div>
              </div>
              <Row>
                <Col md={6}>
                  <Skeleton height={600} />
                </Col>
                <Col md={6}>
                  <div className="personalized-request-product-details-info">
                    <div className="product-title">
                      <Skeleton width={60} height={20} />
                      <Skeleton height={20} width={80} />
                    </div>
                    <div className="product-tracking-id">
                      <Skeleton height={80} />
                      <div className="product-tracking-location-sec">
                        <div className="product-tracking-location"></div>
                      </div>
                    </div>
                    <div className="product-discription-info">
                      <Skeleton width={160} height={15} />
                      <Skeleton height={80} />
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      ) : (
        <div className="new-home-page-sec">
          <Container fluid>
            <div className="personalized-request-box">
              <div className="personalized-table-back product-detail-header">
                <Link to="" onClick={() => history.goBack()}>
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
                  <span className="personalized-request-back-info">
                    {t("back")}
                  </span>
                </Link>

                <div className="table-heading">
                  <h4>{t("product_details")}</h4>
                </div>
              </div>
              {Object.keys(requestView.data).length > 0 ? (
                <Row>
                  <Col md={6}>
                    <Slider {...settings}>
                      {requestView.data.personalized_product.personalized_product_files.map(
                        (data, index) => (
                          <div>
                            <>
                              {/\.(jpg|jpeg|png|gif)$/i.test(`${data.file}`) ==
                              true ? (
                                <img src={data.file} width="100%" />
                              ) : (
                                <video
                                  controls
                                  loop
                                  width="100%"
                                  className="product-video-postion"
                                >
                                  <source src={data.file} />
                                </video>
                              )}
                            </>
                          </div>
                        )
                      )}
                    </Slider>
                  </Col>
                  <Col md={6}>
                    <div className="personalized-request-product-details-info">
                      <div className="product-title">
                        <h3>{requestView.data.personalized_product.name}</h3>
                        <h4>{requestView.data.personalized_requests.amount}</h4>
                      </div>
                      {requestView.data.personalized_product.shipping_url !==
                        "" && (
                        <div className="product-tracking-id">
                          <h4>{t("tracking_id")}</h4>
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
                                {
                                  requestView.data.personalized_product
                                    .shipping_url
                                }
                              </span>
                            </div>
                            <Button
                              onClick={() =>
                                handleCopy(
                                  requestView.data.personalized_product
                                    .shipping_url
                                )
                              }
                              className="product-tracking-copy-btn"
                            >
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
                              <span className="product-tracking-copy-info">
                                {t("copy")}
                              </span>
                            </Button>
                          </div>
                        </div>
                      )}
                      <div className="product-discription-info">
                        <h4>{t("product_description")}</h4>
                        <p>
                          {requestView.data.personalized_product.description}
                        </p>
                      </div>
                    </div>
                  </Col>
                </Row>
              ) : (
                <NoDataFound />
              )}
            </div>
          </Container>
        </div>
      )}
    </>
  );
};

export default translate(ProductDetails);
