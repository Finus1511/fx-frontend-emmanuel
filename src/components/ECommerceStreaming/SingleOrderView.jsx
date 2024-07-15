import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import ShippingUrlModal from "./ShippingUrlModal";
import EditShippingModal from "./EditShippingModal";
import {
  Link,
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { translate, t } from "react-multi-lang";
import Skeleton from "react-loading-skeleton";
import { productSingleOrderViewStart } from "../../store/actions/ProductLiveStreamAction";
import { useDispatch, useSelector } from "react-redux";
import NoDataFound from "../NoDataFound/NoDataFound";
import DeliveredConfirmationModal from "./DeliveredConfirmationModal";
import { ProgressBar, Step } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";
import "./GoLiveProduct.css";

const SingleOrderView = () => {
  const { unique_id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const productSingleOrderView = useSelector(
    (state) => state.productLiveStream.productSingleOrderView
  );
  const stepLabels = ["Order Placed", "Processing", "Shipped"];
  const [stepPercentage, setStepPercentage] = useState(0);
  const [shippingUrlModalShow, setShippingUrlModalShow] = useState(false);
  const [confirmationModalShow, setConfirmationModalShow] = useState(false);
  const [shoppingId, setShoppingId] = useState("");

  useEffect(() => {
    dispatch(productSingleOrderViewStart({ unique_id: unique_id }));
  }, []);

  useEffect(() => {
    if (Object.keys(productSingleOrderView.data).length > 0) {
      productSingleOrderView.data.lss_order_product.shipping_url !==
        undefined &&
      productSingleOrderView.data.lss_order_product.shipping_url == ""
        ? setStepPercentage(0)
        : productSingleOrderView.data.lss_order_product.is_shipped !== 1
        ? setStepPercentage(50)
        : productSingleOrderView.data.lss_order_product.is_shipped == 1 &&
          setStepPercentage(100);
    }
  }, [productSingleOrderView]);

  return (
    <div className="new-home-page-sec">
      <Container fluid>
        {productSingleOrderView.loading ? (
          <div className="personalized-request-box">
            <Row className="align-items-center">
              <Col md={12}>
                <div className="personalized-table-head">
                  <div className="personalized-table-back">
                    <Skeleton height={20} width={100} borderRadius={10} />
                    <div className="table-heading">
                      <h4>
                        <Skeleton height={20} width={150} borderRadius={10} />
                      </h4>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <div className="order-product-detail-card">
                  <div className="order-product-detail-head">
                    <div className="order-detail-info">
                      <h3>
                        <Skeleton height={20} width={150} />
                      </h3>
                      <Skeleton height={10} width={200} />
                    </div>
                    <div className="ship-btn">
                      <span>
                        <Skeleton height={45} width={110} borderRadius={10} />
                      </span>
                    </div>
                  </div>
                  <div>
                    <Skeleton height={110} borderRadius={10} />
                  </div>
                  <div>
                    <Skeleton height={160} borderRadius={10} />
                  </div>
                  <div>
                    <Skeleton height={110} borderRadius={10} />
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        ) : (
          <div className="personalized-request-box">
            <Row className="align-items-center">
              <Col md={12}>
                <div className="personalized-table-head">
                  <div className="personalized-table-back">
                    <Link
                      to="#"
                      onClick={() => {
                        history.goBack();
                      }}
                    >
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
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
                    {Object.keys(productSingleOrderView.data).length > 0 &&
                      productSingleOrderView.data.lss_order_product.length >
                        0 && (
                        <div className="table-heading">
                          {productSingleOrderView.data.lss_order_product
                            ?.unique_id && (
                            <h4>
                              {t("order_details")}
                              {/* <span>
                              {
                                productSingleOrderView.data.lss_order_product
                                  .unique_id
                              }
                            </span> */}
                            </h4>
                          )}
                        </div>
                      )}
                  </div>
                </div>
              </Col>
            </Row>
            {Object.keys(productSingleOrderView.data).length > 0 &&
            Object.keys(productSingleOrderView.data.lss_order_product).length >
              0 ? (
              <Row>
                <Col md={12}>
                  <div className="order-product-detail-card">
                    <div className="order-product-detail-head">
                      <div className="order-detail-info">
                        {productSingleOrderView.data.lss_order_product
                          ?.unique_id && (
                          <h3>
                            {t("order_id")}
                            <span>
                              :
                              {
                                productSingleOrderView.data.lss_order_product
                                  .unique_id
                              }
                            </span>
                          </h3>
                        )}
                        {productSingleOrderView.data.lss_order_product
                          ?.updated_at &&
                          productSingleOrderView.data.lss_order_product
                            .updated_at !== "" && (
                            <p>
                              {t("updated_on")} {""}
                              {
                                productSingleOrderView.data.lss_order_product
                                  .updated_at
                              }
                            </p>
                          )}
                      </div>

                      <div className="ship-btn">
                        {productSingleOrderView.data.lss_order_product
                          ?.user_details?.is_content_creator == 2 &&
                        productSingleOrderView.data.lss_order_product
                          ?.shipping_url !== undefined &&
                        productSingleOrderView.data.lss_order_product
                          ?.shipping_url == "" ? (
                          <span>
                            <Button
                              className="default-btn profile-sidebar-broadcast-btn"
                              type="button"
                              onClick={() => {
                                setShippingUrlModalShow({
                                  shipping_url: "",
                                });
                                setShoppingId(
                                  productSingleOrderView.data.lss_order_product
                                    .live_stream_shopping_details.unique_id
                                );
                              }}
                            >
                              {t("ship")}
                            </Button>
                          </span>
                        ) : (
                          productSingleOrderView.data.lss_order_product
                            ?.is_shipped == 0 && (
                            <div className="shipped-detail-btn-sec">
                              <Button
                                className="edit-url-btn"
                                type="button"
                                onClick={() => {
                                  setShippingUrlModalShow({
                                    shipping_url:
                                      productSingleOrderView.data
                                        .lss_order_product.shipping_url,
                                  });
                                  setShoppingId(
                                    productSingleOrderView.data
                                      .lss_order_product
                                      .live_stream_shopping_details.unique_id
                                  );
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    stroke="#9F4298"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit="10"
                                    strokeWidth="1.5"
                                    d="M13.26 3.6l-8.21 8.69c-.31.33-.61.98-.67 1.43l-.37 3.24c-.13 1.17.71 1.97 1.87 1.77l3.22-.55c.45-.08 1.08-.41 1.39-.75l8.21-8.69c1.42-1.5 2.06-3.21-.15-5.3-2.2-2.07-3.87-1.34-5.29.16zM11.89 5.05a6.126 6.126 0 005.45 5.15M3 22h18"
                                  ></path>
                                </svg>
                                {t("edit_shipping_url")}
                              </Button>
                              <Button
                                className="shipped-btn"
                                type="button"
                                onClick={() => {
                                  setConfirmationModalShow(true);
                                  setShoppingId(
                                    productSingleOrderView.data
                                      .lss_order_product
                                      .live_stream_shopping_details.unique_id
                                  );
                                }}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    stroke="#fff"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeMiterlimit="10"
                                    strokeWidth="1.5"
                                    d="M23 17.91c.02.75-.18 1.46-.54 2.07-.2.36-.47.69-.77.96-.69.64-1.6 1.03-2.61 1.06-1.46.03-2.75-.72-3.46-1.87-.38-.59-.61-1.3-.62-2.05-.03-1.26.53-2.4 1.43-3.15.68-.56 1.54-.91 2.48-.93A4 4 0 0123 17.91z"
                                  ></path>
                                  <path
                                    stroke="#fff"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    d="M17.44 18.03l1.01.96 2.09-2.02M3.17 7.44L12 12.55l8.77-5.08M12 21.61v-9.07"
                                  ></path>
                                  <path
                                    stroke="#fff"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    d="M21.61 9.17v5.66c0 .05 0 .09-.01.14-.7-.61-1.6-.97-2.6-.97-.94 0-1.81.33-2.5.88A3.97 3.97 0 0015 18c0 .75.21 1.46.58 2.06.09.16.2.31.32.45l-1.83 1.01c-1.14.64-3 .64-4.14 0l-5.34-2.96c-1.21-.67-2.2-2.35-2.2-3.73V9.17c0-1.38.99-3.06 2.2-3.73l5.34-2.96c1.14-.64 3-.64 4.14 0l5.34 2.96c1.21.67 2.2 2.35 2.2 3.73z"
                                  ></path>
                                </svg>
                                {t("shipping_process")}
                              </Button>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                    <div className="order-product-detail-box live-stream-order-ptoduct">
                      <div className="order-product-detail">
                        <div className="order-placed-img">
                          {productSingleOrderView.data.lss_order_product
                            ?.user_details?.picture &&
                            productSingleOrderView.data.lss_order_product
                              ?.user_details?.picture !== "" && (
                              <Image
                                className="order-placed-product-img"
                                src={
                                  productSingleOrderView.data.lss_order_product
                                    .order_product_details?.picture
                                }
                              />
                            )}
                        </div>
                        <div className="order-detail-info">
                          {productSingleOrderView.data.lss_order_product
                            ?.order_product_details?.name &&
                            productSingleOrderView.data.lss_order_product
                              ?.order_product_details?.name !== "" && (
                              <h4>
                                {
                                  productSingleOrderView.data.lss_order_product
                                    .order_product_details?.name
                                }
                              </h4>
                            )}
                          <h3>
                            {productSingleOrderView.data.lss_order_product !==
                              undefined &&
                            productSingleOrderView.data.lss_order_product
                              ?.order_product_details?.description !==
                              undefined &&
                            productSingleOrderView.data.lss_order_product
                              ?.order_product_details?.description !== ""
                              ? productSingleOrderView.data.lss_order_product
                                  ?.order_product_details?.description
                              : t("not_added")}
                          </h3>

                          {/* <span className="product-quantify">
                            <p>{t("quantity")}</p>
                            <div className="product-quantify-box">20</div>
                          </span> */}
                        </div>
                      </div>
                      <div className="fx-shipping-status-wrapped">
                        <div className="shiping-status-sec">
                          <span className="shiping-status-badge">
                            <p>
                              {productSingleOrderView.data.lss_order_product
                                ?.shipping_url !== undefined &&
                              productSingleOrderView.data.lss_order_product
                                ?.shipping_url == ""
                                ? t("shipping_pending")
                                : productSingleOrderView.data.lss_order_product
                                    ?.is_shipped !== 1
                                ? t("shipping_processing")
                                : t("shipped")}
                            </p>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="19"
                              height="20"
                              fill="none"
                              viewBox="0 0 19 20"
                            >
                              <g clipPath="url(#clip0_448_2113)">
                                <path
                                  fill="#9F4298"
                                  d="M11.875 14.75H0V3.667a2.375 2.375 0 012.375-2.375H9.5a2.375 2.375 0 012.375 2.375V14.75zm1.583 0H19v-3.958h-5.542v3.958zm1.584-10.292h-1.584v4.75H19v-.791a3.963 3.963 0 00-3.958-3.959zM2.42 16.333c-.03.13-.044.263-.046.396a1.98 1.98 0 003.958 0 1.917 1.917 0 00-.046-.396H2.421zm11.083 0c-.029.13-.044.263-.046.396a1.98 1.98 0 003.959 0 1.93 1.93 0 00-.046-.396h-3.867z"
                                ></path>
                              </g>
                              <defs>
                                <clipPath id="clip0_448_2113">
                                  <path
                                    fill="#fff"
                                    d="M0 0H19V19H0z"
                                    transform="translate(0 .5)"
                                  ></path>
                                </clipPath>
                              </defs>
                            </svg>
                          </span>
                          <ProgressBar
                            percent={stepPercentage}
                            filledBackground="linear-gradient(to right, #fff, #9F4298)"
                          >
                            {stepLabels.map((label, index) => (
                              <Step key={index}>
                                {({ accomplished }) => (
                                  <div className="step-container">
                                    <div
                                      className="step-circle"
                                      style={{
                                        backgroundColor: accomplished
                                          ? "#1CE626"
                                          : "#e0e0e0",
                                      }}
                                    >
                                      {accomplished ? (
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="18"
                                          height="18"
                                          fillRule="evenodd"
                                          enableBackground="new 0 0 512 512"
                                          viewBox="0 0 254000 254000"
                                        >
                                          <g fill="#fff">
                                            <path
                                              d="M96229 162644l89510-89509c2637-2638 6967-2611 9578 0l8642 8642c2611 2611 2611 6968 0 9578l-89509 89510c-2611 2611-6941 2638-9579 0l-8642-8642c-2638-2638-2638-6941 0-9579z"
                                              data-original="#48b02c"
                                            ></path>
                                            <path
                                              d="M68270 108089l54525 54525c2637 2638 2606 6973 0 9579l-8642 8642c-2606 2605-6973 2605-9579 0l-54525-54525c-2606-2606-2637-6941 0-9579l8642-8642c2638-2637 6941-2637 9579 0z"
                                              data-original="#48b02c"
                                            ></path>
                                          </g>
                                        </svg>
                                      ) : label == "Shipped" ? (
                                        <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="18"
                                        height="18"
                                        enableBackground="new 0 0 512 512"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          fill="#131615"
                                          d="M24 10c0-2.757-2.243-5-5-5h-2V4c0-1.654-1.346-3-3-3h-2v2h2c.552 0 1 .449 1 1v13H2v-4H0v6h2.037A3.504 3.504 0 005.5 23a3.504 3.504 0 003.463-4h6.074a3.504 3.504 0 003.463 4 3.504 3.504 0 003.463-4H24v-9zM7 19.5c0 .827-.673 1.5-1.5 1.5S4 20.327 4 19.5c0-.189.037-.356.091-.5H6.91c.054.144.091.311.091.5zM19 7c1.654 0 3 1.346 3 3v1h-5V7h2zm1 12.5c0 .827-.673 1.5-1.5 1.5s-1.5-.673-1.5-1.5c0-.189.037-.356.091-.5h2.819c.054.144.091.311.091.5zM17 17v-4h5v4h-5zM10 3H0V1h10v2zM8 7H0V5h8v2zm-2 4H0V9h6v2z"
                                          data-original="#000000"
                                        ></path>
                                      </svg>
                                      ) : (
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="18"
                                          height="18"
                                          enableBackground="new 0 0 512 512"
                                          viewBox="0 0 24 24"
                                        >
                                          <path
                                            fill="#000"
                                            d="M15.999 15.5a.996.996 0 01-.548-.164l-4-2.628a1.003 1.003 0 01-.451-.836V7a1 1 0 112 0v4.333l3.549 2.331a1 1 0 01-.55 1.836zm-3.285 6.475A9.936 9.936 0 0112 22C6.486 22 2 17.514 2 12S6.486 2 12 2c3.151 0 6.112 1.512 7.988 4H17a1 1 0 100 2h4c1.103 0 2-.897 2-2V2a1 1 0 10-2 0v2.104C18.743 1.543 15.473 0 12 0 5.383 0 0 5.383 0 12s5.383 12 12 12c.288 0 .573-.011.856-.031a.999.999 0 00.926-1.068.99.99 0 00-1.068-.926zM23 11a1 1 0 00-1 1c0 .455-.031.913-.092 1.36a1 1 0 001.982.27c.072-.536.109-1.085.109-1.63a1 1 0 00-1-1zm-.863 5.396a.997.997 0 00-1.357.396c-.217.396-.464.782-.735 1.148a1.002 1.002 0 00.804 1.594c.307 0 .609-.141.806-.405.323-.439.62-.902.88-1.377a.999.999 0 00-.396-1.357zm-4.731 4.02a9.953 9.953 0 01-1.191.656 1 1 0 10.842 1.814c.491-.229.973-.493 1.432-.789a1 1 0 10-1.082-1.682z"
                                            data-original="#000000"
                                          ></path>
                                        </svg>
                                      )}
                                    </div>
                                    <div className="step-label">{label}</div>
                                  </div>
                                )}
                              </Step>
                            ))}
                          </ProgressBar>
                        </div>
                      </div>
                    </div>
                    <div className="order-product-detail-box">
                      <div className="order-summary-info">
                        <h3>{t("order_summary")}</h3>
                      </div>
                      <div className="order-summary-info">
                        <h4>{t("item_total")}</h4>
                        {productSingleOrderView.data.lss_order_product
                          ?.amount_formatted &&
                          productSingleOrderView.data.lss_order_product
                            ?.amount_formatted !== "" && (
                            <h4>
                              {
                                productSingleOrderView.data.lss_order_product
                                  ?.amount_formatted
                              }
                            </h4>
                          )}
                      </div>
                      {/* <div className="order-summary-info">
                        <h4>{t("delivery")}</h4>
                        {productSingleOrderView.data.lss_order_product
                          .order_product_details.delivery_price &&
                          productSingleOrderView.data.lss_order_product
                            .order_product_details.delivery_price !== "" && (
                            <h4>
                              {
                                productSingleOrderView.data.lss_order_product
                                  .order_product_details.delivery_price
                              }
                            </h4>
                          )}
                      </div> */}
                      <div className="grand-total-info">
                        <h4>{t("grand_total")}</h4>
                        <h4>
                          {
                            productSingleOrderView.data.lss_order_product
                              ?.amount_formatted
                          }
                        </h4>
                      </div>
                    </div>
                    <div className="order-product-detail-box">
                      <div className="order-summary-info">
                        <h3>{t("shipping_address")}</h3>
                      </div>
                      <div className="shipping-address-info">
                        {productSingleOrderView.data.lss_order_product
                          ?.user_details?.name &&
                          productSingleOrderView.data.lss_order_product
                            ?.user_details?.name !== "" && (
                            <h4>
                              {
                                productSingleOrderView.data.lss_order_product
                                  .user_details.name
                              }
                            </h4>
                          )}
                        <p>
                          {productSingleOrderView.data.lss_order_product
                            ?.delivery_address_details?.address +
                            "," +
                            productSingleOrderView.data.lss_order_product
                              ?.delivery_address_details?.landmark +
                            "," +
                            productSingleOrderView.data.lss_order_product
                              ?.delivery_address_details?.city +
                            "," +
                            productSingleOrderView.data.lss_order_product
                              ?.delivery_address_details?.state +
                            "," +
                            productSingleOrderView.data.lss_order_product
                              ?.delivery_address_details?.country +
                            "," +
                            productSingleOrderView.data.lss_order_product
                              ?.delivery_address_details?.pincode +
                            "," +
                            productSingleOrderView.data.lss_order_product
                              ?.delivery_address_details?.contact_number}
                        </p>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            ) : (
              <NoDataFound />
            )}
          </div>
        )}
      </Container>

      {shippingUrlModalShow ? (
        <ShippingUrlModal
          show={shippingUrlModalShow}
          onHide={() => setShippingUrlModalShow(false)}
          shoppingId={shoppingId}
          uniqueId={unique_id}
        />
      ) : null}
      {confirmationModalShow ? (
        <DeliveredConfirmationModal
          show={confirmationModalShow}
          onHide={() => setConfirmationModalShow(false)}
          shoppingId={shoppingId}
          uniqueId={unique_id}
        />
      ) : null}
    </div>
  );
};

export default translate(SingleOrderView);