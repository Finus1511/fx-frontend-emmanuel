import React, { useEffect, useState } from "react";
import { Modal, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSubscriptionStart,
  subscriptionDeleteStart,
} from "../../../../store/actions/SubscriptionAction";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "react-quill/dist/quill.snow.css";
import { translate, t } from "react-multi-lang";
import NoDataFound from "../../../NoDataFound/NoDataFound";

const SubscribeModal = (props) => {
  const dispatch = useDispatch();

  const subscriptions = useSelector(
    (state) => state.subscriptions.subscription
  );

  const [subscriptionData, setSubscriptionData] = useState({
    subscription_id: 0,
  });

  useEffect(() => {
    dispatch(
      fetchSubscriptionStart({
        user_id: props.userDetails.user_id,
      })
    );
  }, []);

  const renderSkeletonLoader = () => (
    <div className="subscribe-grid">
      {Array(2)
        .fill()
        .map((_, index) => (
          <div key={index} className="subscribe-card">
            <div className="subscribe-img">
              <Skeleton height={150} />
            </div>
            <div className="subscribe__flex">
              <div className="subscribe-content">
                <h4>
                  <Skeleton width={100} />
                </h4>
                <div className="subscribe-para">
                  <h5>
                    <Skeleton width={100} />
                  </h5>
                  <p>
                    <Skeleton count={2} />
                  </p>
                </div>
                <div className="subscribe-para">
                  <h5>
                    <Skeleton width={100} />
                  </h5>
                  <ul>
                    <li>
                      <Skeleton width={120} />
                    </li>
                    <li>
                      <Skeleton width={120} />
                    </li>
                  </ul>
                </div>
              </div>
              <div className="subscribe-btn">
                <Skeleton width={320} height={40} />
              </div>
            </div>
          </div>
        ))}
    </div>
  );

  return (
    <>
      <Modal
        show={props.showSubscribeModal}
        onHide={props.handleCloseSubscribeModal}
        backdrop="static"
        keyboard={false}
        dialogClassName="custom-modal"
        centered
        className={`${
          localStorage.getItem("theme") !== "" &&
          localStorage.getItem("theme") !== null &&
          localStorage.getItem("theme") !== undefined &&
          localStorage.getItem("theme") === "dark"
            ? "dark-theme-modal"
            : ""
        }
        `}
      >
        <Modal.Body>
          <div className="subscribe">
            <div className="subscribe__title">
              <h4>Subscribe</h4>
              <button onClick={props.handleCloseSubscribeModal}>
                <Image
                  src={
                    window.location.origin + "/assets/images/icons/close.svg"
                  }
                />
              </button>
            </div>

            {subscriptions.loading ? (
              renderSkeletonLoader()
            ) : Object.keys(subscriptions.data).length > 0 &&
              subscriptions.data.total_subscriptions > 0 ? (
              <div className="subscribe-flex">
                {subscriptions.data.subscriptions.map((subscription) => (
                  <div className="subscribe-card subscribe-card-model">
                    <div className="subscribe-img">
                      <Image src={subscription.picture} />
                    </div>
                    <div className="subscribe__flex">
                      <div className="subscribe-content">
                        <h4>{subscription.title}</h4>
                        <div className="subscribe-value">
                          <h5>{subscription.amount_formatted}</h5>
                          <p>/ {subscription.plan_type_formatted}</p>
                          {/* <span>(plus VAT)</span> */}
                        </div>
                        <div className="subscribe-para">
                          <h5>Description</h5>
                          <p>{subscription.description}</p>
                        </div>
                        <div className="subscribe-para mb-6">
                          <h5>Discount</h5>
                          <p
                            dangerouslySetInnerHTML={{
                              __html: subscription.discount,
                            }}
                          ></p>
                        </div>
                      </div>
                      <div className="subscribe-btn">
                        <button
                          onClick={() => props.handleSubscribe(subscription)}
                        >
                          Subscribe
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <NoDataFound />
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default translate(SubscribeModal);
