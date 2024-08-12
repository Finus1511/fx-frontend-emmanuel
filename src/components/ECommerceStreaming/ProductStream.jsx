import React, { useEffect, useState } from "react";
import { Container, Row, Col, Nav, Image, Tab, Button } from "react-bootstrap";
import {
  Link,
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom";
import "./GoLiveProduct.css";
import GoLiveModal from "../helper/GoLiveModal";
import { translate, t } from "react-multi-lang";
import Skeleton from "react-loading-skeleton";
import {
  productLiveStreamListStart,
  productScheduledStreamListStart,
  creatorLiveStreamShoppingsListStart,
} from "../../store/actions/ProductLiveStreamAction";
import { useDispatch, useSelector } from "react-redux";
import NoDataFound from "../NoDataFound/NoDataFound";
import InfiniteScroll from "react-infinite-scroll-component";
import PaymentModal from "../ECommerceStreaming/PaymentModal";
import CustomLazyLoad from "../helper/CustomLazyLoad";
import ReactTooltip from "react-tooltip";

const ProductStream = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.users.profile);
  const productLiveStreamList = useSelector(
    (state) => state.productLiveStream.productLiveStreamList
  );
  const productScheduledStreamList = useSelector(
    (state) => state.productLiveStream.productScheduledStreamList
  );
  const creatorLiveStreamList = useSelector(
    (state) => state.productLiveStream.creatorLiveStreamList
  );
  const [goLive, setGoLive] = useState(false);
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(12);
  const [eventKey, setEventKey] = useState(
    location.state?.golive !== 1 ? "onlive" : "livestream"
  );
  const [paymentModal, setPaymentModal] = useState(false);

  const closeGoLiveModal = () => {
    setGoLive(false);
  };

  useEffect(() => {
    localStorage.removeItem("virtual_id");
    if (eventKey == "onlive") {
      dispatch(productLiveStreamListStart({ skip: skip, take: take }));
    } else if (eventKey == "scheduled") {
      dispatch(productScheduledStreamListStart({ skip: skip, take: take }));
    } else {
      dispatch(creatorLiveStreamShoppingsListStart({ skip: skip, take: take }));
    }
  }, [skip]);

  const fetchList = (eventKey) => {
    setEventKey(eventKey);
    setSkip(0);
    if (eventKey == "onlive") {
      dispatch(productLiveStreamListStart({ skip: skip, take: take }));
    } else if (eventKey == "scheduled") {
      dispatch(productScheduledStreamListStart({ skip: skip, take: take }));
    } else {
      dispatch(creatorLiveStreamShoppingsListStart({ skip: skip, take: take }));
    }
  };

  return (
    <>
      <div className="new-home-page-sec">
        <div className="live-streaming-header-sec">
          <Container fluid>
            <Row>
              <Col md={12}>
                <div className="live-streaming-header-sec">
                  <div className="live-streaming-left-sec">
                    {profile.data.is_content_creator === 2 && (
                      <Link
                        to="/go-live-product"
                        className="  new-live-history-btn"
                      >
                        {t("golive_with_products")}
                      </Link>
                    )}
                    <Link
                      to="/product-stream"
                      className="new-go-live-btn inside-space-bar"
                    >
                      {t("product_streams")}
                    </Link>
                    <Link
                      to="/live-videos"
                      className="new-live-history-btn pull-right"
                    >
                      {t("on_live")}
                    </Link>
                    {profile.data.is_content_creator === 2 && (
                      <>
                        <Link
                          to="/live-videos-history"
                          className=" new-live-history-btn pull-right"
                        >
                          {t("my_live_streams")}
                        </Link>
                        <Link
                          to="#"
                          onClick={() => setGoLive(true)}
                          className="new-live-history-btn pull-right"
                        >
                          {t("go_live")}
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="product-stream-tabs">
          <Container fluid>
            <Tab.Container
              id="left-tabs-example"
              defaultActiveKey={
                location.state?.golive !== 1 ? "onlive" : "livestream"
              }
            >
              <Row>
                <Col sm={12} md={2} lg={2} xl={2} className="resp-mrg-btn-xs">
                  <Nav
                    variant="pills"
                    className="flex-column"
                    onSelect={(selectedKey) => {
                      fetchList(selectedKey);
                    }}
                  >
                    <Nav.Item>
                      <Nav.Link eventKey="onlive">{t("onlive")}</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="scheduled">
                        {t("scheduled_stream")}
                      </Nav.Link>
                    </Nav.Item>
                    {profile.data.is_content_creator === 2 && (
                      <Nav.Item>
                        <Nav.Link eventKey="livestream">
                          {t("my_live_stream")}
                        </Nav.Link>
                      </Nav.Item>
                    )}
                  </Nav>
                </Col>
                <Col sm={12} md={10} lg={10} xl={10}>
                  <Tab.Content>
                    <Tab.Pane eventKey="onlive">
                      {productLiveStreamList.loading ? (
                        <div className="product-stream-live-box">
                          {[...Array(8)].map((data) => (
                            <div className="product-stream-live-card">
                              <Skeleton height={250} borderRadius={5} />
                            </div>
                          ))}
                        </div>
                      ) : Object.keys(productLiveStreamList.data).length > 0 &&
                        productLiveStreamList.data.total > 0 ? (
                        <InfiniteScroll
                          dataLength={
                            productLiveStreamList.data
                              .live_stream_shoppings_onlive.length
                          }
                          next={() => {
                            setSkip(skip + take);
                          }}
                          hasMore={
                            productLiveStreamList.data
                              .live_stream_shoppings_onlive.length <
                            productLiveStreamList.data.total
                          }
                          loader={
                            productLiveStreamList.infiniteLoading && (
                              <div className="product-stream-live-box">
                                {[...Array(8)].map((data) => (
                                  <div className="product-stream-live-card">
                                    <Skeleton height={250} borderRadius={5} />
                                  </div>
                                ))}
                              </div>
                            )
                          }
                        >
                          <div className="product-stream-live-box">
                            {productLiveStreamList.data.live_stream_shoppings_onlive.map(
                              (stream) => (
                                // <div className="product-stream-live-card">
                                //   <ReactTooltip className="data-class" />
                                //   <div className="most-popular-thumbnail-img-sec">
                                //     <CustomLazyLoad
                                //       className="most-popular-thumbnail-img"
                                //       src={stream.preview_file}
                                //     />
                                //   </div>
                                //   <div className="product-stream-live-head">
                                //     <div className="most-popular-user-btn-sec">
                                //       {stream.is_user_needs_to_pay == 1 ? (
                                //         <Button
                                //           className="join-now-btn hoverColor"
                                //           onClick={() => {
                                //             setPaymentModal(stream);
                                //           }}
                                //         >
                                //           {t("pay") + " & " + t("join_now")}
                                //         </Button>
                                //       ) : (
                                //         stream.is_streaming == "YES" && (
                                //           <Button
                                //             className="join-now-btn hoverColor"
                                //             onClick={() =>
                                //               history.push(
                                //                 `product-onlive-stream/${stream.unique_id}`,
                                //                 {
                                //                   virtual_id: stream.virtual_id,
                                //                 }
                                //               )
                                //             }
                                //           >
                                //             {t("join_now")}
                                //           </Button>
                                //         )
                                //       )}
                                //     </div>
                                //     {/* <div className="product-stream-live-count">
                                //       <svg
                                //         xmlns="http://www.w3.org/2000/svg"
                                //         width="22"
                                //         height="22"
                                //         fill="none"
                                //         viewBox="0 0 26 26"
                                //       >
                                //         <g clipPath="url(#clip0_507_78)">
                                //           <path
                                //             fill="#9F4298"
                                //             d="M25.356 12.458C25.356 5.578 19.778 0 12.898 0S.439 5.578.439 12.458v.674c0 6.88 5.578 12.458 12.459 12.458 6.88 0 12.458-5.578 12.458-12.458v-.674z"
                                //           ></path>
                                //           <path
                                //             fill="#fff"
                                //             d="M9.867 11.111a1.01 1.01 0 00-2.02 0v6.061a1.01 1.01 0 102.02 0v-6.06zM17.948 11.111a1.01 1.01 0 00-2.02 0v6.061a1.01 1.01 0 002.02 0v-6.06zM13.908 8.418a1.01 1.01 0 00-2.02 0v7.407a1.01 1.01 0 002.02 0V8.418z"
                                //           ></path>
                                //         </g>
                                //         <defs>
                                //           <clipPath id="clip0_507_78">
                                //             <path
                                //               fill="#fff"
                                //               d="M0 0H25.59V25.59H0z"
                                //             ></path>
                                //           </clipPath>
                                //         </defs>
                                //       </svg>
                                //       <span className="product-stream-count-detail">
                                //         0
                                //       </span>
                                //     </div> */}
                                //   </div>
                                //   <div className="product-stream-user-info-card">
                                //     <div className="stream-list">
                                //       <Link
                                //         to={`/${stream.user_details.username}`}
                                //         className="most-popular-user-name"
                                //       >
                                //         <div className="most-popular-user-info">
                                //           <CustomLazyLoad
                                //             className="product-stream-user-img"
                                //             src={stream.user_details.picture}
                                //           />

                                //           <div className="most-popular-user-details">
                                //             <h5
                                //               data-tip={
                                //                 stream.title.length > 10
                                //                   ? stream.title
                                //                   : null
                                //               }
                                //             >
                                //               {stream.title.length > 10
                                //                 ? `${stream.title.slice(
                                //                     0,
                                //                     10
                                //                   )}...`
                                //                 : stream.title}

                                //               <span>
                                //                 <CustomLazyLoad
                                //                   className="sidebar-verified-icon"
                                //                   src={
                                //                     window.location.origin +
                                //                     "/assets/images/new-home/verified-icon.png"
                                //                   }
                                //                 />
                                //               </span>
                                //             </h5>
                                //             <span className="most-popular-user-name">
                                //               @{stream.user_details.username}
                                //             </span>
                                //           </div>
                                //         </div>
                                //       </Link>
                                //     </div>
                                //     {/* <div className="most-popular-user-btn-sec">
                                //       {stream.is_user_needs_to_pay == 1 ? (
                                //         <Button
                                //           className="join-now-btn hoverColor"
                                //           onClick={() => {
                                //             setPaymentModal(stream);
                                //           }}
                                //         >
                                //           {t("pay") + "&" + t("join_now")}
                                //         </Button>
                                //       ) : (
                                //         stream.is_streaming == "YES" && (
                                //           <Button
                                //             className="join-now-btn hoverColor"
                                //             onClick={() =>
                                //               history.push(
                                //                 `product-onlive-stream/${stream.unique_id}`,
                                //                 {
                                //                   virtual_id: stream.virtual_id,
                                //                 }
                                //               )
                                //             }
                                //           >
                                //             {t("join_now")}
                                //           </Button>
                                //         )
                                //       )}
                                //     </div> */}
                                //   </div>
                                // </div>
                                <div className="new-product-stream-live-card">
                                  <ReactTooltip className="data-class" />
                                  <div className="new-product-live-card-img">
                                    <CustomLazyLoad
                                      className="most-popular-thumbnail-img"
                                      src={stream.preview_file}
                                    />
                                    <div className="product-stream-live-count">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="22"
                                        height="22"
                                        fill="none"
                                        viewBox="0 0 26 26"
                                      >
                                        <g clipPath="url(#clip0_507_78)">
                                          <path
                                            fill="#9F4298"
                                            d="M25.356 12.458C25.356 5.578 19.778 0 12.898 0S.439 5.578.439 12.458v.674c0 6.88 5.578 12.458 12.459 12.458 6.88 0 12.458-5.578 12.458-12.458v-.674z"
                                          ></path>
                                          <path
                                            fill="#fff"
                                            d="M9.867 11.111a1.01 1.01 0 00-2.02 0v6.061a1.01 1.01 0 102.02 0v-6.06zM17.948 11.111a1.01 1.01 0 00-2.02 0v6.061a1.01 1.01 0 002.02 0v-6.06zM13.908 8.418a1.01 1.01 0 00-2.02 0v7.407a1.01 1.01 0 002.02 0V8.418z"
                                          ></path>
                                        </g>
                                        <defs>
                                          <clipPath id="clip0_507_78">
                                            <path
                                              fill="#fff"
                                              d="M0 0H25.59V25.59H0z"
                                            ></path>
                                          </clipPath>
                                        </defs>
                                      </svg>
                                      <span className="product-stream-count-detail">
                                        {stream.viewer_count}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="new-product-live-card-info">
                                    <div className="live-card-profile-details">
                                      <Link
                                        to={`/${stream.user_details.username}`}
                                        className="most-popular-user-name"
                                      >
                                        <div className="live-card-profile-info">
                                          <div className="live-card-dp">
                                            <CustomLazyLoad
                                              className="product-stream-user-img"
                                              src={stream.user_details.picture}
                                            />
                                          </div>
                                          <div className="live-card-dp-info">
                                            <h4
                                              data-tip={
                                                stream.title.length > 8
                                                  ? stream.title
                                                  : null
                                              }
                                            >
                                              {stream.title.length > 8
                                                ? `${stream.title.slice(
                                                    0,
                                                    8
                                                  )}...`
                                                : stream.title}
                                            </h4>
                                            <p>
                                              @{stream.user_details.username}
                                              <span>
                                                <CustomLazyLoad
                                                  className="sidebar-verified-icon"
                                                  src={
                                                    window.location.origin +
                                                    "/assets/images/new-home/verified-icon.png"
                                                  }
                                                />
                                              </span>
                                            </p>
                                          </div>
                                        </div>
                                      </Link>
                                      <div className="live-card-profile-action">
                                        {stream.is_user_needs_to_pay == 1 ? (
                                          <Button
                                            className="join-now-btn hoverColor"
                                            onClick={() => {
                                              setPaymentModal(stream);
                                            }}
                                          >
                                            {t("pay") + " & " + t("join_now")}
                                          </Button>
                                        ) : (
                                          stream.is_streaming == "YES" && (
                                            <Button
                                              className="join-now-btn hoverColor"
                                              onClick={() =>
                                                history.push(
                                                  `product-onlive-stream/${stream.unique_id}`,
                                                  {
                                                    virtual_id:
                                                      stream.virtual_id,
                                                  }
                                                )
                                              }
                                            >
                                              {t("join_now")}
                                            </Button>
                                          )
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </InfiniteScroll>
                      ) : (
                        <NoDataFound />
                      )}
                    </Tab.Pane>
                    <Tab.Pane eventKey="scheduled">
                      {productScheduledStreamList.loading ? (
                        <div className="product-stream-live-box">
                          {[...Array(8)].map((data) => (
                            <div className="product-stream-live-card">
                              <Skeleton height={250} borderRadius={5} />
                            </div>
                          ))}
                        </div>
                      ) : (
                        Object.keys(productScheduledStreamList.data).length >
                          0 &&
                        (productScheduledStreamList.data.total > 0 ? (
                          <InfiniteScroll
                            dataLength={
                              productScheduledStreamList.data
                                .scheduled_live_stream_shoppings.length
                            }
                            next={() => {
                              setSkip(skip + take);
                            }}
                            hasMore={
                              productScheduledStreamList.data
                                .scheduled_live_stream_shoppings.length <
                              productScheduledStreamList.data.total
                            }
                            loader={
                              productScheduledStreamList.infiniteLoading && (
                                <div className="product-stream-live-box">
                                  {[...Array(8)].map((data) => (
                                    <div className="product-stream-live-card">
                                      <Skeleton height={250} borderRadius={5} />
                                    </div>
                                  ))}
                                </div>
                              )
                            }
                          >
                            <div className="product-stream-live-box">
                              {productScheduledStreamList.data.scheduled_live_stream_shoppings.map(
                                (stream, index) => (
                                  // <div className="product-stream-live-card">
                                  //   <ReactTooltip className="data-class" />
                                  //   <div className="most-popular-thumbnail-img-sec">
                                  //     <CustomLazyLoad
                                  //       className="most-popular-thumbnail-img"
                                  //       src={stream.preview_file}
                                  //     />
                                  //   </div>
                                  //   <div className="product-stream-live-head">
                                  //     <div className="product-stream-live-calender">
                                  //       <span className="product-stream-count-detail">
                                  //         <p>{stream.schedule_time}</p>
                                  //       </span>
                                  //     </div>
                                  //   </div>
                                  //   <div className="product-stream-user-info-card">
                                  //     <div className="stream-list">
                                  //       <Link
                                  //         to={`/${stream.user_details.username}`}
                                  //         className="most-popular-user-name"
                                  //       >
                                  //         <div className="most-popular-user-info">
                                  //           <CustomLazyLoad
                                  //             className="product-stream-user-img"
                                  //             src={stream.user_details.picture}
                                  //           />

                                  //           <div className="most-popular-user-details">
                                  //             <h5>
                                  //               <span
                                  //                 data-tip={
                                  //                   stream.title.length > 10
                                  //                     ? stream.title
                                  //                     : null
                                  //                 }
                                  //               >
                                  //                 {stream.title.length > 10
                                  //                   ? `${stream.title.slice(
                                  //                       0,
                                  //                       10
                                  //                     )}...`
                                  //                   : stream.title}
                                  //               </span>
                                  //               <span>
                                  //                 <CustomLazyLoad
                                  //                   className="sidebar-verified-icon"
                                  //                   src={
                                  //                     window.location.origin +
                                  //                     "/assets/images/new-home/verified-icon.png"
                                  //                   }
                                  //                 />
                                  //               </span>
                                  //             </h5>
                                  //             <span className="most-popular-user-name">
                                  //               @{stream.user_details.username}
                                  //             </span>
                                  //           </div>
                                  //         </div>
                                  //       </Link>
                                  //     </div>
                                  //     <div className="most-popular-user-btn-sec">
                                  //       {stream.is_user_needs_to_pay == 1 ? (
                                  //         stream.status == 2 ? (
                                  //           <Button
                                  //             className="join-now-btn hoverColor"
                                  //             onClick={() => {
                                  //               setPaymentModal(stream);
                                  //             }}
                                  //           >
                                  //             {t("pay") + "&" + t("join_now")}
                                  //           </Button>
                                  //         ) : (
                                  //           <Button
                                  //             className="join-now-btn hoverColor"
                                  //             onClick={() => {
                                  //               setPaymentModal(stream);
                                  //             }}
                                  //           >
                                  //             {t("pay")}
                                  //           </Button>
                                  //         )
                                  //       ) : stream.is_user_needs_to_pay == 0 &&
                                  //         stream.status == 2 ? (
                                  //         <Button
                                  //           className="join-now-btn hoverColor"
                                  //           onClick={() =>
                                  //             history.push(
                                  //               `product-onlive-stream/${stream.unique_id}`,
                                  //               {
                                  //                 virtual_id: stream.virtual_id,
                                  //               }
                                  //             )
                                  //           }
                                  //         >
                                  //           {t("join_now")}
                                  //         </Button>
                                  //       ) : null}
                                  //     </div>
                                  //   </div>
                                  // </div>

                                  <div className="new-product-stream-live-card">
                                    <ReactTooltip className="data-class" />
                                    <div className="new-product-live-card-img">
                                      <CustomLazyLoad
                                        className="most-popular-thumbnail-img"
                                        src={stream.preview_file}
                                      />
                                      <div className="product-stream-live-count">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="22"
                                          height="22"
                                          fill="none"
                                          viewBox="0 0 26 26"
                                        >
                                          <g clipPath="url(#clip0_507_78)">
                                            <path
                                              fill="#9F4298"
                                              d="M25.356 12.458C25.356 5.578 19.778 0 12.898 0S.439 5.578.439 12.458v.674c0 6.88 5.578 12.458 12.459 12.458 6.88 0 12.458-5.578 12.458-12.458v-.674z"
                                            ></path>
                                            <path
                                              fill="#fff"
                                              d="M9.867 11.111a1.01 1.01 0 00-2.02 0v6.061a1.01 1.01 0 102.02 0v-6.06zM17.948 11.111a1.01 1.01 0 00-2.02 0v6.061a1.01 1.01 0 002.02 0v-6.06zM13.908 8.418a1.01 1.01 0 00-2.02 0v7.407a1.01 1.01 0 002.02 0V8.418z"
                                            ></path>
                                          </g>
                                          <defs>
                                            <clipPath id="clip0_507_78">
                                              <path
                                                fill="#fff"
                                                d="M0 0H25.59V25.59H0z"
                                              ></path>
                                            </clipPath>
                                          </defs>
                                        </svg>
                                        <span className="product-stream-count-detail">
                                          {stream.viewer_count}
                                        </span>
                                      </div>
                                    </div>
                                    <div className="new-product-live-card-info">
                                      <div className="live-card-profile-details">
                                        <Link
                                          to={`/${stream.user_details.username}`}
                                          className="most-popular-user-name"
                                        >
                                          <div className="live-card-profile-info">
                                            <div className="live-card-dp">
                                              <CustomLazyLoad
                                                className="product-stream-user-img"
                                                src={
                                                  stream.user_details.picture
                                                }
                                              />
                                            </div>
                                            <div className="live-card-dp-info">
                                              <h4
                                                data-tip={
                                                  stream.title.length > 8
                                                    ? stream.title
                                                    : null
                                                }
                                              >
                                                {stream.title.length > 8
                                                  ? `${stream.title.slice(
                                                      0,
                                                      8
                                                    )}...`
                                                  : stream.title}
                                              </h4>
                                              <p>
                                                @{stream.user_details.username}
                                                <span>
                                                  <CustomLazyLoad
                                                    className="sidebar-verified-icon"
                                                    src={
                                                      window.location.origin +
                                                      "/assets/images/new-home/verified-icon.png"
                                                    }
                                                  />
                                                </span>
                                              </p>
                                            </div>
                                          </div>
                                        </Link>
                                        <div className="live-card-profile-status-info">
                                          <p>{stream.status_formatted}</p>
                                        </div>
                                      </div>
                                      <div className="live-card-profile-status">
                                        <div className="live-card-profile-status-date">
                                          <p>{stream.schedule_time}</p>
                                        </div>
                                        <div className="live-card-profile-action">
                                          {stream.is_user_needs_to_pay == 1 ? (
                                            <Button
                                              className="join-now-btn hoverColor"
                                              onClick={() => {
                                                setPaymentModal(stream);
                                              }}
                                            >
                                              {t("pay") + " & " + t("join_now")}
                                            </Button>
                                          ) : (
                                            stream.is_streaming == "YES" && (
                                              <Button
                                                className="join-now-btn hoverColor"
                                                onClick={() =>
                                                  history.push(
                                                    `product-onlive-stream/${stream.unique_id}`,
                                                    {
                                                      virtual_id:
                                                        stream.virtual_id,
                                                    }
                                                  )
                                                }
                                              >
                                                {t("join_now")}
                                              </Button>
                                            )
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          </InfiniteScroll>
                        ) : (
                          <NoDataFound />
                        ))
                      )}
                    </Tab.Pane>
                    <Tab.Pane eventKey="livestream">
                      {creatorLiveStreamList.loading ? (
                        <div className="product-stream-live-box">
                          {[...Array(8)].map((data) => (
                            <div className="product-stream-live-card">
                              <Skeleton height={250} borderRadius={5} />
                            </div>
                          ))}
                        </div>
                      ) : Object.keys(creatorLiveStreamList.data).length > 0 &&
                        creatorLiveStreamList.data.total > 0 ? (
                        <InfiniteScroll
                          dataLength={
                            creatorLiveStreamList.data
                              .creator_live_stream_shoppings.length
                          }
                          next={() => {
                            setSkip(skip + take);
                          }}
                          hasMore={
                            creatorLiveStreamList.data
                              .creator_live_stream_shoppings.length <
                            creatorLiveStreamList.data.total
                          }
                          loader={
                            creatorLiveStreamList.infiniteLoading && (
                              <div className="product-stream-live-box">
                                {[...Array(8)].map((data) => (
                                  <div className="product-stream-live-card">
                                    <Skeleton height={250} borderRadius={5} />
                                  </div>
                                ))}
                              </div>
                            )
                          }
                        >
                          <div className="product-stream-live-box">
                            {creatorLiveStreamList.data.creator_live_stream_shoppings.map(
                              (stream) => (
                                // <div className="product-stream-live-card">
                                //   <ReactTooltip className="data-class" />
                                //   <div className="most-popular-thumbnail-img-sec">
                                //     <CustomLazyLoad
                                //       className="most-popular-thumbnail-img"
                                //       src={stream.preview_file}
                                //     />
                                //   </div>
                                //   <div className="product-stream-live-status-sec">
                                //     <div className="product-stream-live-status">
                                //       {stream.schedule_type == 2 && (
                                //         <div className="product-stream-live-calender">
                                //           <span className="product-stream-count-detail">
                                //             <p>{stream.schedule_time}</p>
                                //           </span>
                                //         </div>
                                //       )}
                                //       <div className="product-stream-live-calender">
                                //         <span className="live-stream-status">
                                //           {stream.status_formatted}
                                //         </span>
                                //       </div>
                                //     </div>
                                //     <div className="product-stream-live-count">
                                //       <svg
                                //         xmlns="http://www.w3.org/2000/svg"
                                //         width="22"
                                //         height="22"
                                //         fill="none"
                                //         viewBox="0 0 26 26"
                                //       >
                                //         <g clipPath="url(#clip0_507_78)">
                                //           <path
                                //             fill="#9F4298"
                                //             d="M25.356 12.458C25.356 5.578 19.778 0 12.898 0S.439 5.578.439 12.458v.674c0 6.88 5.578 12.458 12.459 12.458 6.88 0 12.458-5.578 12.458-12.458v-.674z"
                                //           ></path>
                                //           <path
                                //             fill="#fff"
                                //             d="M9.867 11.111a1.01 1.01 0 00-2.02 0v6.061a1.01 1.01 0 102.02 0v-6.06zM17.948 11.111a1.01 1.01 0 00-2.02 0v6.061a1.01 1.01 0 002.02 0v-6.06zM13.908 8.418a1.01 1.01 0 00-2.02 0v7.407a1.01 1.01 0 002.02 0V8.418z"
                                //           ></path>
                                //         </g>
                                //         <defs>
                                //           <clipPath id="clip0_507_78">
                                //             <path
                                //               fill="#fff"
                                //               d="M0 0H25.59V25.59H0z"
                                //             ></path>
                                //           </clipPath>
                                //         </defs>
                                //       </svg>
                                //       <span className="product-stream-count-detail">
                                //         0
                                //       </span>
                                //     </div>
                                //   </div>
                                //   <div className="most-popular-user-btn-sec live-stream-btn-center">
                                //     {stream.schedule_type == 1 &&
                                //     stream.status == 2 ? (
                                //       <Button
                                //         className="join-now-btn hoverColor"
                                //         onClick={() =>
                                //           history.push(
                                //             `product-onlive-stream/${stream.unique_id}`,
                                //             {
                                //               virtual_id: stream.virtual_id,
                                //             }
                                //           )
                                //         }
                                //       >
                                //         {t("join_now")}
                                //       </Button>
                                //     ) : (
                                //       stream.schedule_type == 2 &&
                                //       stream.call_status == 1 && (
                                //         <Button
                                //           className="join-now-btn hoverColor"
                                //           onClick={() =>
                                //             history.push(
                                //               `product-onlive-stream/${stream.unique_id}`,
                                //               {
                                //                 virtual_id: stream.virtual_id,
                                //               }
                                //             )
                                //           }
                                //         >
                                //           {stream.status == 1
                                //             ? t("start_now")
                                //             : t("join_now")}
                                //         </Button>
                                //       )
                                //     )}
                                //   </div>
                                //   <div className="product-stream-user-info-card">
                                //     <div className="stream-list">
                                //       <Link
                                //         to={`/${stream.user_details.username}`}
                                //         className="most-popular-user-name"
                                //       >
                                //         <div className="most-popular-user-info">
                                //           <CustomLazyLoad
                                //             className="product-stream-user-img"
                                //             src={stream.user_details.picture}
                                //           />

                                //           <div className="most-popular-user-details">
                                //             <h5
                                //               data-tip={
                                //                 stream.title.length > 10
                                //                   ? stream.title
                                //                   : null
                                //               }
                                //             >
                                //               {stream.title.length > 10
                                //                 ? `${stream.title.slice(
                                //                     0,
                                //                     10
                                //                   )}...`
                                //                 : stream.title}

                                //               <span>
                                //                 <CustomLazyLoad
                                //                   className="sidebar-verified-icon"
                                //                   src={
                                //                     window.location.origin +
                                //                     "/assets/images/new-home/verified-icon.png"
                                //                   }
                                //                 />
                                //               </span>
                                //             </h5>
                                //             <span className="most-popular-user-name">
                                //               @{stream.user_details.username}
                                //             </span>
                                //           </div>
                                //         </div>
                                //       </Link>
                                //     </div>
                                //     {/* <div className="most-popular-user-btn-sec">
                                //       {stream.is_user_needs_to_pay == 1 ? (
                                //         <Button
                                //           className="join-now-btn hoverColor"
                                //           onClick={() => {
                                //             setPaymentModal(stream);
                                //           }}
                                //         >
                                //           {t("pay") + "&" + t("join_now")}
                                //         </Button>
                                //       ) : (
                                //         stream.is_streaming == "YES" && (
                                //           <Button
                                //             className="join-now-btn hoverColor"
                                //             onClick={() =>
                                //               history.push(
                                //                 `product-onlive-stream/${stream.unique_id}`,
                                //                 {
                                //                   virtual_id: stream.virtual_id,
                                //                 }
                                //               )
                                //             }
                                //           >
                                //             {t("join_now")}
                                //           </Button>
                                //         )
                                //       )}
                                //     </div> */}
                                //   </div>
                                // </div>
                                <div className="new-product-stream-live-card">
                                  <ReactTooltip className="data-class" />
                                  <div className="new-product-live-card-img">
                                    <CustomLazyLoad
                                      className="most-popular-thumbnail-img"
                                      src={stream.preview_file}
                                    />

                                    <div className="product-stream-live-count">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="22"
                                        height="22"
                                        fill="none"
                                        viewBox="0 0 26 26"
                                      >
                                        <g clipPath="url(#clip0_507_78)">
                                          <path
                                            fill="#9F4298"
                                            d="M25.356 12.458C25.356 5.578 19.778 0 12.898 0S.439 5.578.439 12.458v.674c0 6.88 5.578 12.458 12.459 12.458 6.88 0 12.458-5.578 12.458-12.458v-.674z"
                                          ></path>
                                          <path
                                            fill="#fff"
                                            d="M9.867 11.111a1.01 1.01 0 00-2.02 0v6.061a1.01 1.01 0 102.02 0v-6.06zM17.948 11.111a1.01 1.01 0 00-2.02 0v6.061a1.01 1.01 0 002.02 0v-6.06zM13.908 8.418a1.01 1.01 0 00-2.02 0v7.407a1.01 1.01 0 002.02 0V8.418z"
                                          ></path>
                                        </g>
                                        <defs>
                                          <clipPath id="clip0_507_78">
                                            <path
                                              fill="#fff"
                                              d="M0 0H25.59V25.59H0z"
                                            ></path>
                                          </clipPath>
                                        </defs>
                                      </svg>
                                      <span className="product-stream-count-detail">
                                        {stream.viewer_count}
                                      </span>
                                    </div>
                                  </div>
                                  <div className="new-product-live-card-info">
                                    <div className="live-card-profile-details">
                                      <Link
                                        to={`/${stream.user_details.username}`}
                                        className="most-popular-user-name"
                                      >
                                        <div className="live-card-profile-info">
                                          <div className="live-card-dp">
                                            <CustomLazyLoad
                                              className="product-stream-user-img"
                                              src={stream.user_details.picture}
                                            />
                                          </div>
                                          <div className="live-card-dp-info">
                                            <h4
                                              data-tip={
                                                stream.title.length > 8
                                                  ? stream.title
                                                  : null
                                              }
                                            >
                                              {stream.title.length > 8
                                                ? `${stream.title.slice(
                                                    0,
                                                    8
                                                  )}...`
                                                : stream.title}
                                            </h4>
                                            <p>
                                              @{stream.user_details.username}
                                              <span>
                                                <CustomLazyLoad
                                                  className="sidebar-verified-icon"
                                                  src={
                                                    window.location.origin +
                                                    "/assets/images/new-home/verified-icon.png"
                                                  }
                                                />
                                              </span>
                                            </p>
                                          </div>
                                        </div>
                                      </Link>
                                      <div className="live-card-profile-status-info">
                                        <p>{stream.status_formatted}</p>
                                      </div>
                                    </div>
                                    <div className="live-card-profile-status">
                                      <div className="live-card-profile-status-date">
                                        <p>{stream.schedule_time}</p>
                                      </div>
                                      <div className="live-card-profile-action">
                                        {stream.schedule_type == 1 &&
                                        stream.status == 2 ? (
                                          <Button
                                            className="join-now-btn hoverColor"
                                            onClick={() =>
                                              history.push(
                                                `product-onlive-stream/${stream.unique_id}`,
                                                {
                                                  virtual_id: stream.virtual_id,
                                                }
                                              )
                                            }
                                          >
                                            {t("join_now")}
                                          </Button>
                                        ) : (
                                          stream.schedule_type == 2 &&
                                          stream.call_status == 1 && (
                                            <Button
                                              className="join-now-btn hoverColor"
                                              onClick={() =>
                                                history.push(
                                                  `product-onlive-stream/${stream.unique_id}`,
                                                  {
                                                    virtual_id:
                                                      stream.virtual_id,
                                                  }
                                                )
                                              }
                                            >
                                              {stream.status == 1
                                                ? t("start_now")
                                                : t("join_now")}
                                            </Button>
                                          )
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </InfiniteScroll>
                      ) : (
                        <NoDataFound />
                      )}
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </Container>
        </div>
      </div>
      {profile.loading ? (
        t("loading")
      ) : (
        <GoLiveModal
          goLive={goLive}
          closeGoLiveModal={closeGoLiveModal}
          username={profile.data.username}
          userPicture={profile.data.picture}
          name={profile.data.name}
          user_id={profile.data.user_id}
        />
      )}
      {paymentModal && (
        <PaymentModal
          show={paymentModal}
          onHide={() => setPaymentModal(false)}
          paymentType="liveStream"
        />
      )}
    </>
  );
};

export default translate(ProductStream);
