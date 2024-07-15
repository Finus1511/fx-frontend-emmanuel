import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useParams, useLocation } from "react-router-dom";
import "./GoLiveProduct.css";
import ProductList from "./ProductList";
import LiveVideoCard from "./LiveVideoCard";
import { liveStreamShoppingsProuctsListStart } from "../../store/actions/ProductLiveStreamAction";
import { useDispatch, useSelector } from "react-redux";
import { translate, t } from "react-multi-lang";
import Skeleton from "react-loading-skeleton";
import CustomLazyLoad from "../helper/CustomLazyLoad";
import LiveStreamingComments from "./LiveStreamingComments";
import io from "socket.io-client";
import configuration from "react-global-configuration";
let chatSocket;

const ProductOnliveStream = () => {
  const location = useLocation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [activeSec, setActiveSec] = useState("available");
  const lssProductsList = useSelector(
    (state) => state.productLiveStream.lssProductsList
  );
  const productLiveStreamView = useSelector(
    (state) => state.productLiveStream.productLiveStreamView
  );
  const liveVideoChat = useSelector(
    (state) => state.productLiveStream.liveVideoChat
  );

  useEffect(() => {
    dispatch(
      liveStreamShoppingsProuctsListStart({
        live_stream_shopping_unique_id: id,
      })
    );
  }, []);

  const setActiveSection = (event, key) => {
    setActiveSec(key);
    dispatch(
      liveStreamShoppingsProuctsListStart({
        live_stream_shopping_unique_id: id,
        type: key,
      })
    );
  };

  const chatSocketConnect = (id) => {
    let chatSocketUrl = configuration.get("configData.chat_socket_url");

    if (chatSocketUrl) {
      chatSocket = io(chatSocketUrl, {
        query: `live_video_message_${id}`,
      });
    }
  };

  useEffect(() => {
    if (chatSocket) {
      chatSocket.disconnect();
    }
    chatSocketConnect(id);
    // setIsChat(true);
    return () => {
      chatSocket.disconnect();
    };
  }, []);

  // useEffect(() => {
  //   if (productLiveStreamView.data) {
  //     chatSocketConnect();
  //   }
  // }, [!productLiveStreamView.loading]);

  return (
    <div className="new-home-page-sec mb-0">
      <Container fluid>
        <div className="personalized-request-box-1">
          <div className="personalized-table-back personal-request-top-space">
            {/* <Link to="/product-stream">
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
            </Link> */}
            <div className="table-heading">
              <h4>{t("online_stream")}</h4>
            </div>
          </div>
        </div>
        <Row>
          <Col md={12} lg={3} xl={3} className="resp-mrg-btn-xs">
            <ProductList
              lssProductsList={lssProductsList}
              setActiveSection={setActiveSection}
            />
          </Col>
          <Col md={12} lg={3} xl={6} className="resp-mrg-btn-xs">
            <LiveVideoCard
              isOwner={true}
              liveVideoId={id}
              virtual_id={
                location.state?.virtual_id && location.state.virtual_id
              }
            />
          </Col>
          <Col md={12} lg={3} xl={3}>
            <LiveStreamingComments
              id={id}
              liveVideoData={productLiveStreamView.data}
              chatSocket={chatSocket}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default translate(ProductOnliveStream);
