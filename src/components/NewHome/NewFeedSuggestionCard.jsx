import React, { useEffect, useState } from "react";
import {
  Modal,
  Container,
  Row,
  Col,
  Button,
  Form,
  Image,
  Media,
} from "react-bootstrap";
import "./NewHome.css";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { connect, useDispatch, useSelector } from "react-redux";
import { translate, t } from "react-multi-lang";
import { featuredCreatorsListStart, fetchPostSuggesstionStart } from "../../store/actions/HomeAction";
import Skeleton from "react-loading-skeleton";
import CustomLazyLoad from "../helper/CustomLazyLoad";

const NewFeedSuggestionCard = (props) => {

  const [isPremium, setIsPremium] = useState(false);
  const dispatch = useDispatch();
  const featuredCreators = useSelector((state) => state.home.featuredCreators);

  useEffect(() => {
    dispatch(featuredCreatorsListStart())
    // props.dispatch(fetchPostSuggesstionStart());
  }, []);

  const setting = {
    // dots: false,
    // infinite: false,
    // speed: 500,
    // vertical: true,
    // arrow: true,
    // verticalSwiping: true,
    // slidesToShow: 2,
    // slidesToScroll: 1,
    // adaptiveHeight: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    dots: true,
    speed: 500,
    arrows: true,
    vertical: true,
    verticalSwiping: true,
    focusOnSelect: true,
    infinite: false,
    responsive: [
      {
        breakpoint: 1195,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          adaptiveHeight: true,
        },
      },
    ],
  };

  return (
    <>
      <div className="new-feed-suggestion-box">
        <div className="new-feed-suggestion-header">
          <h4>{t("landing_page.featured.header")}</h4>
          <div className="new-feed-suggestion-action-btn-sec">
            <Button
              className="icon-btn"
              onClick={() => {
                setIsPremium(false);
                props.dispatch(fetchPostSuggesstionStart());
              }}
            >
              <i className="fas fa-sync-alt"></i>
            </Button>
            <Button className="icon-btn">
              <i
                className={`fas fa-tag ${isPremium ? "active-icon" : ""}`}
                onClick={() => {
                  setIsPremium(true);
                  props.dispatch(fetchPostSuggesstionStart({ premium: 1 }));
                }}

              ></i>
            </Button>
          </div>
        </div>
        {featuredCreators.loading ? (
          <div className="new-feed-suggestion-card">
            {[...Array(3)].map(() => (
              <>

                <Skeleton className="new-feed-suggestion-bg-img-loader" />

              </>
            ))}
          </div>
        ) : Object.keys(featuredCreators.data).length > 0 ? (
          <Slider {...setting}>
            {featuredCreators.data.featured_users.map((user) => (
              <div key={user.user_id}>
                <Link to={`/${user.user_unique_id}`}>
                  <div className="new-feed-suggestion-card">
                    <div className="new-feed-suggestion-bg-img-sec">
                      <CustomLazyLoad
                        className="new-feed-suggestion-bg-img"
                        src={user.cover}
                      />
                    </div>
                    <div className="new-feed-suggestion-user-info">
                      <div className="new-feed-suggestion-user-img-sec">
                        <CustomLazyLoad
                          className="new-feed-suggestion-user-img"
                          src={user.picture}
                        />
                      </div>
                      <div className="new-feed-suggestion-user-details">
                        <h4>
                          {user.name}
                          {user.is_verified_badge == 1 ? (
                            <span>
                              <Image
                                className="sidebar-verified-icon"
                                src={
                                  window.location.origin +
                                  "/assets/images/new-home/verified-icon.svg"
                                }
                              />
                            </span>
                          ) : null}
                        </h4>
                        <Link to={`/${user.user_unique_id}`}>@{user.username}</Link>
                      </div>
                    </div>
                    <div className="new-user-feed-premium-sec">
                      <p>{user.user_account_type_formatted}</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        ) : (
          t("no_suggestions")
        )}
      </div>
    </>
  );
};

const mapStateToPros = (state) => ({
  postSug: state.home.postSug,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(NewFeedSuggestionCard));
