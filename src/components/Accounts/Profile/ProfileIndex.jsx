import React, { useState, useEffect } from "react";
import {
  Modal,
  Container,
  Row,
  Col,
  Button,
  Form,
  Image,
  Tab,
  Nav,
  Media,
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import "./NewProfile.css";
import { fetchPostsStart } from "../../../store/actions/PostAction";
import {
  fetchUserDetailsStart,
  updateVerifyBadgeStatusStart,
} from "../../../store/actions/UserAction";
import { connect } from "react-redux";
import { getSuccessNotificationMessage } from "../../helper/NotificationMessage";
import { createNotification } from "react-redux-notify/lib/modules/Notifications";
import { translate, t } from "react-multi-lang";
import configuration from "react-global-configuration";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import { useSelector, useDispatch } from "react-redux";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  RedditShareButton,
  TelegramShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
  RedditIcon,
  TelegramIcon,
} from "react-share";
import "./NewProfile.css";
import ProfileSinglePost from "../../helper/ProfileSinglePost";
import InfiniteScroll from "react-infinite-scroll-component";
import NoDataFound from "../../NoDataFound/NoDataFound";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ProfileLoader from "../../Loader/ProfileLoader";
import VirtualExperiencsProduct from "./AdminVirtualExperienceProduct";
import { creatorVirtualExperienceListStart } from "../../../store/actions/CreatorVirtualAction";
import BroadCastModal from "../../Chat/BroadCastModal";
import NewProfileFeedCard from "../../helper/NewProfileFeedCard";
import CreatorFolderList from "../../Phase4/CreatorFolderList";
import UserFolderList from "../../Phase4/UserFolderList";
import {
  premiumFolderListStart,
  fetchMorepremiumFolderListStart
} from "../../../store/actions/PremiumFolderAction";
import HomeSidebar from "./HomeSidebar";

const ProfileIndex = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userVirtualExperienceCreatedList = useSelector((state) =>
    state.creatorVirtual.userVirtualExperienceCreatedList);
  const premiumFolderList = useSelector((state) => state.folder.premiumFolderList);
  const [badgeStatus, setBadgeStatus] = useState(0);
  const [activeSec, setActiveSec] = useState("all");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(12);
  const [type, setType] = useState("image");
  const [skipRender, setSkipRender] = useState(true);
  const [broadCast, setBroadCast] = useState(false);

  const closeBroadCastModal = () => {
    setBroadCast(false);
  };

  useEffect(() => {
    props.dispatch(fetchPostsStart({ type: "all", skip: 0, take: take }));
    setSkip(take);
    if (props.profile.loading) {
      props.dispatch(fetchUserDetailsStart());
      setBadgeStatus(localStorage.getItem("is_verified_badge"));
    }
  }, []);

  const setActiveSection = (event, key) => {
    setActiveSec(key);
    switch (key) {
      case "all":
        props.dispatch(fetchPostsStart({ type: key, skip: 0, take: take }));
        setSkip(take);
        break;
      case "folders":
        dispatch(
          premiumFolderListStart({ skip: 0, take: 12 })
        );
        break;
      case "virtual":
        dispatch(
          creatorVirtualExperienceListStart({ type: key, skip: 0, take: take })
        );
        setSkip(take);
        break;
      case "media":
        props.dispatch(fetchPostsStart({ type: type, skip: 0, take: take }));
        setSkip(take);
        break;
      default:
        break;
    }
  };

  const fetchMorePost = () => {
    switch (activeSec) {
      case "all":
        props.dispatch(
          fetchPostsStart({
            append: true,
            skip: 0,
            take: take,
          })
        );
        setSkip(take);
        break;
      case "folders":
        dispatch(
          fetchMorepremiumFolderListStart({
            skip: premiumFolderList.data.collections.length,
            take: 12,
          })
        );
        setSkip(take);
        break;
      case "virtual":
        dispatch(
          creatorVirtualExperienceListStart({
            skip: skip,
            take: take,
            append: true,
          })
        );
        setSkip(take);
        break;

      default:
        setSkip(skip + take);
        break;
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleShareClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const onCopy = (event) => {
    const notificationMessage = getSuccessNotificationMessage(
      t("profile_link_copied")
    );
    props.dispatch(createNotification(notificationMessage));
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const popoverId = open ? "simple-popover" : undefined;

  useEffect(() => {
    if (!skipRender && !props.posts.loading) {
      props.dispatch(fetchPostsStart({ type: type, skip: 0, take: take }));
    }
    setSkipRender(false);
  }, [type]);

  return (
    <>
      <div className="new-home-sec">
        {props.profile.loading ? (
          <ProfileLoader />
        ) : (
          <div className="new-home-box">
            <HomeSidebar profile={props.profile} />
            <div className="new-home-main-wrapper">
              <div className="user-cover-img-sec">
                <Image
                  className="user-cover-img"
                  src={props.profile.data.cover}
                  alt={props.profile.data.name}
                />
                <div className="website-hide-sec">
                  {props.profile.data.featured_story ? (
                    <a
                      data-fancybox="gallery"
                      href={props.profile.data.featured_story}
                    >
                      <Image
                        src={props.profile.data.picture}
                        alt={props.profile.data.name}
                        className="single-profile-user-img border-red"
                      />
                    </a>
                  ) : (
                    <Image
                      src={props.profile.data.picture}
                      alt={props.profile.data.name}
                      className="single-profile-user-img"
                    />
                  )}
                </div>
              </div>
              <div className="user-right-content">
                <div className="user-right-info">
                  <div className="user-info-desc">
                    <p>
                      {props.profile.data.about_formatted}
                      {/* <a href="#">Read More</a> */}
                    </p>
                  </div>
                  <div className="user-info-list">
                    <ul className="list-unstyled">
                      {props.profile.data.selected_category &&
                        props.profile.data.selected_category.name && (
                          <Media as="li">
                            <Link to="#">
                              <Image
                                className="user-info-icon"
                                src={
                                  window.location.origin +
                                  "/assets/images/new-home/icon/fashion.svg"
                                }
                              />
                              <span>
                                {props.profile.data.selected_category.name}
                              </span>
                            </Link>
                          </Media>
                        )}
                      {props.profile.data.date_of_birth && (
                        <Media as="li">
                          <Link to="#">
                            <Image
                              className="user-info-icon"
                              src={
                                window.location.origin +
                                "/assets/images/new-home/icon/date-icon.svg"
                              }
                            />
                            <span>{props.profile.data.date_of_birth}</span>
                          </Link>
                        </Media>
                      )}
                      {props.profile.data.gender &&
                        props.profile.data.gender != "rather-not-select" && (
                          <Media as="li">
                            <Link to="#">
                              <Image
                                className="user-info-icon"
                                src={
                                  window.location.origin +
                                  "/assets/images/new-home/icon/gender.svg"
                                }
                              />
                              <span>{props.profile.data.gender}</span>
                            </Link>
                          </Media>
                        )}
                      {props.profile.data.eyes_color_formatted && (
                        <Media as="li">
                          <Link to="#">
                            <Image
                              className="user-info-icon"
                              src={
                                window.location.origin +
                                "/assets/images/new-home/icon/eye.svg"
                              }
                            />
                            <span>
                              {props.profile.data.eyes_color_formatted}
                            </span>
                          </Link>
                        </Media>
                      )}
                      {props.profile.data.height ? (
                        <Media as="li">
                          <Link to="#">
                            <Image
                              className="user-info-icon"
                              src={
                                window.location.origin +
                                "/assets/images/new-home/icon/scale.svg"
                              }
                            />
                            <span>{props.profile.data.height_formatted}</span>
                          </Link>
                        </Media>
                      ) : null}
                      {props.profile.data.weight ? (
                        <Media as="li">
                          <Link to="#">
                            <Image
                              className="user-info-icon"
                              src={
                                window.location.origin +
                                "/assets/images/new-home/icon/weight.svg"
                              }
                            />
                            <span>{props.profile.data.weight_formatted}</span>
                          </Link>
                        </Media>
                      ) : null}
                      {props.profile.data.address ? (
                        <Media as="li">
                          <Link to="#">
                            <Image
                              className="user-info-icon"
                              src={
                                window.location.origin +
                                "/assets/images/new-settings/map-marker-icon.svg"
                              }
                            />
                            <span>{props.profile.data.address}</span>
                          </Link>
                        </Media>
                      ) : null}
                    </ul>
                  </div>
                </div>

                {/* <div className="user-subscription-plans-details subscribe-frame">
                  <h3>{t("my_plans")}</h3>
                  {props.profile.data.payment_info?.is_free_account == "0" ? (
                    <div className="user-subscription-btn-sec">
                      <div className="profile-subscription-btn">
                        {
                          props.profile.data.payment_info?.subscription_info
                            ?.monthly_amount_formatted
                        }{" "}
                        /Month
                      </div>
                      <div className="profile-subscription-btn">
                        {
                          props.profile.data.payment_info?.subscription_info
                            ?.yearly_amount_formatted
                        }{" "}
                        /Year
                      </div>
                    </div>
                  ) : (
                    <div className="user-subscription-btn-sec">
                      <div className="profile-subscription-btn">
                        {t("free_subscription")}
                      </div>
                    </div>
                  )}
                </div> */}
              </div>
              <div className="mobile-display">
                {props.profile.data.is_content_creator == 2 ? (
                  <>
                    <Link
                      to="/schedule-calendar"
                      className="custome-today-call-card-wrapped profile-sidebar-broadcast-wrapped"
                    >
                      <div className="custome-today-call-card-start">
                        <h3>Schedule Virtual Experience</h3>
                        <Button className="custome-date-schedule">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            data-name="Layer 1"
                            viewBox="0 0 24 24"
                            fill="#000"
                          >
                            <path d="M17 10.039c-3.859 0-7 3.14-7 7C10 20.877 13.141 24 17 24s7-3.14 7-7c0-3.838-3.141-6.961-7-6.961zM17 22c-2.757 0-5-2.226-5-4.961 0-2.757 2.243-5 5-5s5 2.226 5 4.961c0 2.757-2.243 5-5 5zm1.707-4.707a.999.999 0 11-1.414 1.414l-1-1A1 1 0 0116 17v-2a1 1 0 112 0v1.586l.707.707zM24 7v2a1 1 0 11-2 0V7c0-1.654-1.346-3-3-3H5C3.346 4 2 5.346 2 7v1h9a1 1 0 010 2H2v9c0 1.654 1.346 3 3 3h4a1 1 0 010 2H5c-2.757 0-5-2.243-5-5V7c0-2.757 2.243-5 5-5h1V1a1 1 0 012 0v1h8V1a1 1 0 112 0v1h1c2.757 0 5 2.243 5 5z"></path>
                          </svg>
                        </Button>
                      </div>
                    </Link>
                    <Link
                      to="/schedule-calendar-one-on-one"
                      className="custome-today-call-card-wrapped profile-sidebar-broadcast-wrapped"
                    >
                      <div className="custome-today-call-card-start">
                        <h3>Schedule One On One Virtual Experience</h3>
                        <Button className="custome-date-schedule">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            data-name="Layer 1"
                            viewBox="0 0 24 24"
                            fill="#000"
                          >
                            <path d="M17 10.039c-3.859 0-7 3.14-7 7C10 20.877 13.141 24 17 24s7-3.14 7-7c0-3.838-3.141-6.961-7-6.961zM17 22c-2.757 0-5-2.226-5-4.961 0-2.757 2.243-5 5-5s5 2.226 5 4.961c0 2.757-2.243 5-5 5zm1.707-4.707a.999.999 0 11-1.414 1.414l-1-1A1 1 0 0116 17v-2a1 1 0 112 0v1.586l.707.707zM24 7v2a1 1 0 11-2 0V7c0-1.654-1.346-3-3-3H5C3.346 4 2 5.346 2 7v1h9a1 1 0 010 2H2v9c0 1.654 1.346 3 3 3h4a1 1 0 010 2H5c-2.757 0-5-2.243-5-5V7c0-2.757 2.243-5 5-5h1V1a1 1 0 012 0v1h8V1a1 1 0 112 0v1h1c2.757 0 5 2.243 5 5z"></path>
                          </svg>
                        </Button>
                      </div>
                    </Link>
                  </>
                ) : null}

                <div className="sidebar-links profile-sidebar-broadcast-links">
                  <Button
                    className="default-btn profile-sidebar-broadcast-btn mb-3"
                    type="submit"
                    onClick={() => setBroadCast(true)}
                  >
                    Broadcast
                    <Image
                      className="broadcast-icon"
                      src={
                        window.location.origin +
                        "/assets/images/new-chat/broadcast-icon.svg"
                      }
                    />
                  </Button>
                  {/* <Button
                    className="default-btn profile-sidebar-broadcast-btn"
                    type="button"
                    onClick={() => history.push("/personalized-request")}
                  >
                    Personalized Request
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      fill="#fff"
                      height="18"
                      data-name="Layer 1"
                      viewBox="0 0 24 24"
                    >
                      <path d="M7 14c2.21 0 4-1.79 4-4S9.21 6 7 6s-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm7 15c0 .55-.45 1-1 1s-1-.45-1-1c0-2.76-2.24-5-5-5s-5 2.24-5 5c0 .55-.45 1-1 1s-1-.45-1-1c0-3.86 3.14-7 7-7s7 3.14 7 7zM24 5v8c0 2.76-2.24 5-5 5h-4c-.55 0-1-.45-1-1s.45-1 1-1h4c1.65 0 3-1.35 3-3V5c0-1.65-1.35-3-3-3H9.46c-1.07 0-2.06.58-2.6 1.5-.28.48-.89.64-1.37.37a.998.998 0 01-.36-1.37C6.03.96 7.69 0 9.46 0H19c2.76 0 5 2.24 5 5zm-10.33 5.92L16.59 8H15c-.55 0-1-.45-1-1s.45-1 1-1h3c1.1 0 2 .9 2 2v3c0 .55-.45 1-1 1s-1-.45-1-1V9.41l-2.92 2.92a2.424 2.424 0 01-2.37.62.997.997 0 01-.69-1.23c.15-.53.7-.84 1.24-.69.12.03.28.02.41-.11z"></path>
                    </svg>
                  </Button> */}
                </div>
                <div className="sidebar-links">
                  <ul className="list-unstyled">
                    <Media as="li">
                      <Link to={"/edit-profile"}>
                        <span>
                          <Image
                            className="sidebar-links-icon"
                            src={
                              window.location.origin +
                              "/assets/images/new-home/icon/edit-profile-theme.svg"
                            }
                          />
                        </span>
                        {t("edit_profile")}
                      </Link>
                    </Media>
                    <Media as="li">
                      <Link to={"/live-videos"}>
                        <span>
                          <Image
                            className="sidebar-links-icon"
                            src={
                              window.location.origin +
                              "/assets/images/new-home/icon/live-video-theme.svg"
                            }
                          />
                        </span>
                        {t("live_video")}
                      </Link>
                    </Media>
                    <Media as="li">
                      <Link to="#" onClick={handleShareClick}>
                        <span>
                          <Image
                            className="sidebar-links-icon"
                            src={
                              window.location.origin +
                              "/assets/images/new-home/icon/share-theme.svg"
                            }
                          />
                        </span>
                        {t("share")}
                      </Link>
                    </Media>
                    {props.profile.data.is_content_creator == 2 ? (
                      <Media as="li">
                        <Link to="/dashboard">
                          <span>
                            <Image
                              className="sidebar-links-icon"
                              src={
                                window.location.origin +
                                "/assets/images/new-home/icon/dashboard-theme.svg"
                              }
                            />
                          </span>
                          {t("dashboard")}
                        </Link>
                      </Media>
                    ) : (
                      <Media as="li">
                        <Link to="/become-a-content-creator">
                          <span>
                            <Image
                              className="sidebar-links-icon"
                              src={
                                window.location.origin +
                                "/assets/images/new-home/icon/become-content-creator.svg"
                              }
                            />
                          </span>
                          {t("become-a-content-creator")}
                        </Link>
                      </Media>
                    )}
                  </ul>
                </div>
                {props.profile.data.youtube_link ||
                  props.profile.data.pinterest_link ||
                  props.profile.data.linkedin_link ||
                  props.profile.data.snapchat_link ||
                  props.profile.data.twitter_link ||
                  props.profile.data.instagram_link ||
                  props.profile.data.amazon_wishlist ||
                  props.profile.data.facebook_link ||
                  props.profile.data.twitch_link ||
                  props.profile.data.website ? (
                  <div className="sidebar-social-links">
                    <ul className="list-unstyled">
                      {props.profile.data.youtube_link && (
                        <Media as="li">
                          <a
                            href={props.profile.data.youtube_link}
                            target="_blank"
                          >
                            <Image
                              className="sidebar-social-links-icon"
                              src={
                                window.location.origin +
                                "/assets/images/new-home/icon/you-tube.png"
                              }
                            />
                          </a>
                        </Media>
                      )}
                      {props.profile.data.pinterest_link && (
                        <Media as="li">
                          <a
                            href={props.profile.data.pinterest_link}
                            target="_blank"
                          >
                            <Image
                              className="sidebar-social-links-icon"
                              src={
                                window.location.origin +
                                "/assets/images/new-home/icon/pintrest.png"
                              }
                            />
                          </a>
                        </Media>
                      )}
                      {props.profile.data.linkedin_link && (
                        <Media as="li">
                          <a
                            href={props.profile.data.linkedin_link}
                            target="_blank"
                          >
                            <Image
                              className="sidebar-social-links-icon"
                              src={
                                window.location.origin +
                                "/assets/images/new-home/icon/linked-in.png"
                              }
                            />
                          </a>
                        </Media>
                      )}
                      {props.profile.data.snapchat_link && (
                        <Media as="li">
                          <a
                            href={props.profile.data.snapchat_link}
                            target="_blank"
                          >
                            <Image
                              className="sidebar-social-links-icon"
                              src={
                                window.location.origin +
                                "/assets/images/new-home/icon/snap-chat.png"
                              }
                            />
                          </a>
                        </Media>
                      )}
                      {props.profile.data.twitter_link && (
                        <Media as="li">
                          <a
                            href={props.profile.data.twitter_link}
                            target="_blank"
                          >
                            <Image
                              className="sidebar-social-links-icon"
                              src={
                                window.location.origin +
                                "/assets/images/new-home/icon/twitter.png"
                              }
                            />
                          </a>
                        </Media>
                      )}
                      {props.profile.data.instagram_link && (
                        <Media as="li">
                          <a
                            href={props.profile.data.instagram_link}
                            target="_blank"
                          >
                            <Image
                              className="sidebar-social-links-icon"
                              src={
                                window.location.origin +
                                "/assets/images/new-home/icon/instagram.png"
                              }
                            />
                          </a>
                        </Media>
                      )}
                      {props.profile.data.amazon_wishlist && (
                        <Media as="li">
                          <a
                            href={props.profile.data.amazon_wishlist}
                            target="_blank"
                          >
                            <Image
                              className="sidebar-social-links-icon"
                              src={
                                window.location.origin +
                                "/assets/images/new-home/icon/amazon.png"
                              }
                            />
                          </a>
                        </Media>
                      )}
                      {props.profile.data.facebook_link && (
                        <Media as="li">
                          <a
                            href={props.profile.data.facebook_link}
                            target="_blank"
                          >
                            <Image
                              className="sidebar-social-links-icon"
                              src={
                                window.location.origin +
                                "/assets/images/new-home/icon/facebook.png"
                              }
                            />
                          </a>
                        </Media>
                      )}
                      {props.profile.data.twitch_link && (
                        <Media as="li">
                          <a
                            href={props.profile.data.twitch_link}
                            target="_blank"
                          >
                            <Image
                              className="sidebar-social-links-icon"
                              src={
                                window.location.origin +
                                "/assets/images/new-home/icon/twitch.png"
                              }
                            />
                          </a>
                        </Media>
                      )}
                      {props.profile.data.website && (
                        <Media as="li">
                          <a href={props.profile.data.website} target="_blank">
                            <Image
                              className="sidebar-social-links-icon"
                              src={
                                window.location.origin +
                                "/assets/images/new-home/icon/website.png"
                              }
                            />
                          </a>
                        </Media>
                      )}
                    </ul>
                  </div>
                ) : null}
              </div>
              <div className="profile-tab-sec">
                <Tab.Container id="left-tabs-example" defaultActiveKey="all">
                  <Row>
                    <Col sm={12}>
                      <Nav variant="pills" className="grid-four-col">
                        <Nav.Item>
                          <Nav.Link
                            eventKey="all"
                            onClick={(event) => setActiveSection(event, "all")}
                          >
                            <span>
                              <Image
                                className="profile-post-tab-icon"
                                src={
                                  window.location.origin +
                                  "/assets/images/new-home/icon/all-post-1.svg"
                                }
                              />
                            </span>
                            <span className="resp-display-none">
                              {t("all")}
                            </span>
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link
                            eventKey="media"
                            onClick={(event) =>
                              setActiveSection(event, "media")
                            }
                          >
                            <span>
                              <Image
                                className="profile-post-tab-icon"
                                src={
                                  window.location.origin +
                                  "/assets/images/new-home/icon/audio-post-1.svg"
                                }
                              />
                            </span>
                            <span className="resp-display-none">Media</span>
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link
                            eventKey="shop"
                            onClick={(event) => setActiveSection(event, "shop")}
                          >
                            <span>
                              <Image
                                className="profile-post-tab-icon"
                                src={
                                  window.location.origin +
                                  "/assets/images/icons/bag.svg"
                                }
                              />
                            </span>
                            <span className="resp-display-none">Shopping</span>
                          </Nav.Link>
                        </Nav.Item>
                        {props.profile.data.is_content_creator == 2 ? (
                          <Nav.Item>
                            <Nav.Link
                              eventKey="folders"
                              onClick={(event) =>
                                setActiveSection(event, "folders")
                              }
                            >
                              <span>
                                <Image
                                  className="profile-post-tab-icon"
                                  src={
                                    window.location.origin +
                                    "/assets/images/new-home/icon/premium-folder.svg"
                                  }
                                />
                              </span>
                              <span className="resp-display-none">
                                Premium Folders
                              </span>
                            </Nav.Link>
                          </Nav.Item>
                        ) : null}
                        {props.profile.data.is_content_creator == 2 ? (
                          <Nav.Item>
                            <Nav.Link
                              eventKey="virtual"
                              onClick={(event) =>
                                setActiveSection(event, "virtual")
                              }
                            >
                              <span>
                                <Image
                                  className="profile-post-tab-icon"
                                  src={
                                    window.location.origin +
                                    "/assets/images/new-home/icon/video-post-1.svg"
                                  }
                                />
                              </span>
                              <span className="resp-display-none">
                                Virtual Experience
                              </span>
                            </Nav.Link>
                          </Nav.Item>
                        ) : null}
                        {/* <Nav.Item>
                          <Nav.Link
                            eventKey="image"
                            onClick={(event) =>
                              setActiveSection(event, "image")
                            }
                          >
                            <span>
                              <Image
                                className="profile-post-tab-icon"
                                src={
                                  window.location.origin +
                                  "/assets/images/new-home/icon/image-post-1.svg"
                                }
                              />
                            </span>
                            <span className="resp-display-none">
                              {t("images")}
                            </span>
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link
                            eventKey="video"
                            onClick={(event) =>
                              setActiveSection(event, "video")
                            }
                          >
                            <span>
                              <Image
                                className="profile-post-tab-icon"
                                src={
                                  window.location.origin +
                                  "/assets/images/new-home/icon/video-post-1.svg"
                                }
                              />
                            </span>
                            <span className="resp-display-none">
                              {t("videos")}
                            </span>
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link
                            eventKey="audio"
                            onClick={(event) =>
                              setActiveSection(event, "audio")
                            }
                          >
                            <span>
                              <Image
                                className="profile-post-tab-icon"
                                src={
                                  window.location.origin +
                                  "/assets/images/new-home/icon/audio-post-1.svg"
                                }
                              />
                            </span>
                            <span className="resp-display-none">
                              {t("musics")}
                            </span>
                          </Nav.Link>
                        </Nav.Item> */}
                      </Nav>
                    </Col>
                    <Col md={12}>
                      {activeSec == "all" ? (
                        props.posts.loading ? (
                          <div className="profile-new-feed-post-box">
                            {[...Array(8)].map((i, key) => (
                              <Skeleton
                                className="profile-post-card-loader"
                                key={key}
                              />
                            ))}
                          </div>
                        ) : (
                          <>
                            {props.posts.data.posts.length > 0 ? (
                              <InfiniteScroll
                                dataLength={props.posts.data.posts.length}
                                next={fetchMorePost}
                                hasMore={
                                  props.posts.data.posts.length <
                                  props.posts.data.total
                                }
                                loader={
                                  <div className="profile-new-feed-post-box">
                                    {[...Array(4)].map(() => (
                                      <Skeleton className="profile-post-card-loader" />
                                    ))}
                                  </div>
                                }
                                style={{ height: "auto", overflow: "hidden" }}
                              >
                                <div className="profile-new-feed-post-box">
                                  {props.posts.data.posts.map((post, index) => (
                                    <>
                                      {/* {post.postFiles &&
                                        post.postFiles.length > 0 && (
                                          // post.postFiles.map((postFile, index) =>
                                          <ProfileSinglePost post={post} />
                                        )} */}
                                      <NewProfileFeedCard
                                        post={post}
                                        key={index}
                                        index={index}
                                      />
                                    </>
                                  ))}
                                </div>
                                {/* for Virtual Experience 
                                                           {/* <VirtualExperiencsProduct /> */}
                              </InfiniteScroll>
                            ) : (
                              <NoDataFound />
                            )}
                          </>
                        )
                      ) : activeSec == "media" ? (
                        <>
                          <div
                            className="select-lang-drop-down"
                            style={{ width: "10em" }}
                          >
                            <select
                              className="form-control mw-200 mb-3"
                              name="lang"
                              onChange={(e) => setType(e.target.value)}
                              value={type}
                            >
                              <option value="image">{t("image")}</option>
                              <option value="audio">{t("audio")}</option>
                              <option value="video">{t("videos")}</option>
                            </select>
                          </div>
                          {props.posts.loading ? (
                            <div className="profile-all-post-box">
                              {[...Array(8)].map(() => (
                                <Skeleton className="profile-post-card-loader" />
                              ))}
                            </div>
                          ) : (
                            <>
                              {props.posts.data.posts.length > 0 ? (
                                <InfiniteScroll
                                  dataLength={props.posts.data.posts.length}
                                  next={fetchMorePost}
                                  hasMore={
                                    props.posts.data.posts.length <
                                    props.posts.data.total
                                  }
                                  loader={
                                    <div className="profile-all-post-box">
                                      {[...Array(4)].map(() => (
                                        <Skeleton className="profile-post-card-loader" />
                                      ))}
                                    </div>
                                  }
                                  style={{ height: "auto", overflow: "hidden" }}
                                >
                                  <div className="profile-all-post-box">
                                    {props.posts.data.posts.map((post) => (
                                      <>
                                        {post.postFiles &&
                                          post.postFiles.length > 0 && (
                                            // post.postFiles.map((postFile, index) =>
                                            <ProfileSinglePost post={post} />
                                          )}
                                      </>
                                    ))}
                                  </div>
                                  {/* for Virtual Experience 
                                                            {/* <VirtualExperiencsProduct /> */}
                                </InfiniteScroll>
                              ) : (
                                <NoDataFound />
                              )}
                            </>
                          )}
                        </>
                      ) : activeSec == "folders" ?
                        <CreatorFolderList
                          premiumFolderList={premiumFolderList}
                          fetchMorePost={fetchMorePost}
                        />
                        : activeSec == "virtual" ? (
                          userVirtualExperienceCreatedList.loading ? (
                            <div className="profile-all-post-box">
                              {[...Array(8)].map(() => (
                                <Skeleton className="profile-post-card-loader" />
                              ))}
                            </div>
                          ) : (
                            <>
                              {userVirtualExperienceCreatedList.data &&
                                userVirtualExperienceCreatedList.data
                                  .virtual_experiences &&
                                userVirtualExperienceCreatedList.data
                                  .virtual_experiences.length > 0 ? (
                                <InfiniteScroll
                                  dataLength={
                                    userVirtualExperienceCreatedList.data
                                      .virtual_experiences.length
                                  }
                                  next={fetchMorePost}
                                  hasMore={
                                    userVirtualExperienceCreatedList.data
                                      .virtual_experiences.length <
                                    userVirtualExperienceCreatedList.data.total
                                  }
                                  loader={
                                    <div className="profile-all-post-box">
                                      {[...Array(8)].map(() => (
                                        <Skeleton className="profile-post-card-loader" />
                                      ))}
                                    </div>
                                  }
                                  style={{ height: "auto", overflow: "hidden" }}
                                >
                                  <div className="virtual-card-wrapped">
                                    {userVirtualExperienceCreatedList.data.virtual_experiences.map(
                                      (post) => (
                                        <VirtualExperiencsProduct post={post} />
                                      )
                                    )}
                                  </div>
                                </InfiniteScroll>
                              ) : (
                                <NoDataFound />
                              )}
                            </>
                          )
                        ) : null}
                    </Col>
                  </Row>
                </Tab.Container>
              </div>
            </div>
          </div>
        )}
      </div>
      {broadCast ? (
        <BroadCastModal
          broadCast={broadCast}
          closeBroadCastModal={closeBroadCastModal}
          setBroadCast={setBroadCast}
        />
      ) : null}
    </>
  );
};

const mapStateToPros = (state) => ({
  profile: state.users.profile,
  posts: state.post.posts,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(ProfileIndex));
