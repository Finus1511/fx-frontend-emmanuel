import React, { useEffect, useState } from "react";
import SettingsSidebar from "../SettingsSidebar";
import { Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSubscriptionStart,
  subscriptionDeleteStart,
} from "../../../../store/actions/SubscriptionAction";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "react-quill/dist/quill.snow.css";
import CreateSubscription from "./CreateSubscription";
import { Link } from "react-router-dom";
import { translate, t } from "react-multi-lang";
import NoDataFound from "../../../NoDataFound/NoDataFound";

const ManageSubscription = () => {
  const dispatch = useDispatch();

  const subscriptions = useSelector(
    (state) => state.subscriptions.subscription
  );
  const subscriptionDelete = useSelector(
    (state) => state.subscriptions.subscriptionDelete
  );
  const profile = useSelector((state) => state.users.profile);

  const [show, setShow] = useState("list");

  useEffect(() => {
    dispatch(
      fetchSubscriptionStart({
        user_id: profile.data.user_id,
      })
    );
  }, []);

  useEffect(() => {
    if (!subscriptions.loading && Object.keys(subscriptions.data).length > 0) {
      subscriptions.data.total_subscriptions <= 0
        ? setShow("create")
        : setShow("list");
    }
  }, [subscriptions]);

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
                <Skeleton width={240} height={40} />
                <Skeleton width={240} height={40} />
              </div>
            </div>
          </div>
        ))}
    </div>
  );

  const handleDelete = (subscription_id) => {
    dispatch(
      subscriptionDeleteStart({
        subscription_id: subscription_id,
      })
    );
  };

  return (
    <>
      <div className="new-settings-sec new-change-password">
        <div className="new-settings-box">
          <SettingsSidebar />
          <div className="new-settings-main-wrapper">
            <div className="settings-personal-info-card">
              <div className="settings-personal-info-header">
                <h3>Manage Subscription</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Inventore officiis nostrum voluptatibus error. Non
                  exercitationem, voluptas laborum, molestiae reiciendis dolorum
                  enim eligendi fuga harum inventore maiores officiis adipisci
                  voluptates delectus!
                </p>
              </div>
              {show === "list" ? (
                subscriptions.loading ? (
                  renderSkeletonLoader()
                ) : Object.keys(subscriptions.data).length > 0 ? (
                  <div className="">
                    <div className="sub-add-btn">
                      {subscriptions.data.total_subscriptions < 2 ? (
                        <button
                          className="settings-submit-btn"
                          onClick={() => setShow("create")}
                        >
                          Add Subscription
                        </button>
                      ) : null}
                    </div>
                    <div className="subscribe-grid">
                      {subscriptions.data.subscriptions.map((subscription) => (
                        <div key={subscription.id} className="subscribe-card">
                          <div className="subscribe-img">
                            <Image src={subscription.picture} />
                          </div>
                          <div className="subscribe__flex">
                            <div className="subscribe-content">
                              <h4>{subscription.title}</h4>
                              <div className="subscribe-value">
                                <h5>{subscription.amount_formatted}</h5>
                                <p>/ {subscription.plan_type_formatted} </p>
                                {/* <span style={{ textTransform: "capitalize"}}>{subscription.plan_type}</span> */}
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
                              <Link
                                to={`/edit-subscription/${subscription.id}`}
                                className="out-btn"
                              >
                                Edit
                              </Link>
                              <button
                                // onClick={() => handleDelete(subscription.subscription_id)}
                                onClick={() => {
                                  if (
                                    window.confirm(
                                      t("delete_subscription_confirmation")
                                    )
                                  ) {
                                    handleDelete(subscription.subscription_id);
                                  }
                                }}
                                disabled={
                                  subscriptionDelete.loading &&
                                  subscriptionDelete.data.subscription_id ==
                                    subscription.subscription_id
                                }
                              >
                                {subscriptionDelete.loading &&
                                subscriptionDelete.data.subscription_id ==
                                  subscription.subscription_id
                                  ? "Loading"
                                  : "Delete"}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <NoDataFound />
                )
              ) : (
                <CreateSubscription setShow={setShow} show={show} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default translate(ManageSubscription);
