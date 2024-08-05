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
  fetchSingleUserProfileStart,
  fetchSingleUserPostsStart,
} from "../../../store/actions/OtherUserAction";
import { connect, useSelector } from "react-redux";
import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../../helper/NotificationMessage";
import { createNotification } from "react-redux-notify/lib/modules/Notifications";
import { translate, t } from "react-multi-lang";
import configuration from "react-global-configuration";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
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
import { saveChatUserStart } from "../../../store/actions/ChatAction";
import SendTipModal from "../../helper/SendTipModal";
import PaymentModal from "../../helper/PaymentModal";
import PrivateCallModal from "../../helper/PrivateCallModal";
import PrivateAudioCallModal from "../../helper/PrivateAudioCallModal";
import { subscriptionPaymentStripeStart } from "../../../store/actions/SubscriptionAction";
import { unFollowUserStart } from "../../../store/actions/FollowAction";
import InfiniteScroll from "react-infinite-scroll-component";
import NoDataFound from "../../NoDataFound/NoDataFound";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ProfileLoader from "../../Loader/ProfileLoader";
import { saveBlockUserStart } from "../../../store/actions/UserAction";
import ModelProfileStoreSec from "../../Model/ModelProfileStoreSec";
import SendTipPaymentModal from "../../Model/PaymentModal/SendTipPaymentModal";
import SubscriptionPaymentModal from "../../Model/PaymentModal/SubscriptionPaymentModal";
import UserCalendarSchedule from "./UserCalendarSchedule";
import UserVirtualExperiencsProduct from "./UserVirtualExperienceProduct";
import { creatorVirtualExperienceListStart } from "../../../store/actions/CreatorVirtualAction";
import { userVirtualVhListStart } from "../../../store/actions/UserVirtualActions";
import BookingModal from "../../VirtualExperience/BookingModal";
import NewProfileFeedCard from "../../helper/NewProfileFeedCard";
import ChatMessagePaymentModal from "../../Model/PaymentModal/ChatMessagePaymentModal";
import { addFavoriteStart } from "../../../store/actions/FavoriteAction";
import UserFolderList from "../../Phase4/UserFolderList";
import { fetchMorepremiumFolderListStart, premiumFolderListStart } from "../../../store/actions/PremiumFolderAction";

const SingleProfile = (props) => {

  const [modalShow, setModalShow] = React.useState(false);

  const history = useHistory();

  const [skipRender, setSkipRender] = useState(true);
  const [badgeStatus, setBadgeStatus] = useState(0);
  const [activeSec, setActiveSec] = useState("all");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [requestVideoCall, setRequestVideoCall] = useState(false);
  const [requestAudioCall, setRequestAudioCall] = useState(false);
  const [sendTip, setSendTip] = useState(false);
  const [subscrptionPayment, setPaymentModal] = useState(false);
  const [showUnfollow, setShowUnfollow] = useState(false);
  const userVirtualVhList = useSelector((state) => state.userVirtual.userVirtualVhList);
  const chatMessagePayWallet = useSelector((state) => state.chat.chatMessagePayWallet);
  const premiumFolderList = useSelector((state) => state.folder.premiumFolderList);
  const [makePaymentModel, setMakePaymentModel] = useState(false);
  const [favStatus, setFavStatus] = useState("");
  const [modelUser, setModelUser] = useState({
    user_id: "",
    amount: ""
  });

  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(12);
  const [type, setType] = useState("image");

  const closeChatPaymentModal = () => {
    setMakePaymentModel(false);
  };


  const [subscriptionData, setSubscriptionData] = useState({
    is_free: 0,
    plan_type: "months",
    amount: 0,
    amount_formatted: 0,
    subscription_id: 0,
  });

  const toggleVisibility = () => { };

  useEffect(() => {
    props.dispatch(
      fetchSingleUserProfileStart({
        user_unique_id: props.match.params.username,
      })
    );
    props.dispatch(
      fetchSingleUserPostsStart({
        user_unique_id: props.match.params.username,
        type: "all",
        skip: 0,
        take: take,
      })
    );
    setSkip(take);

    window.addEventListener("scroll", toggleVisibility);
  }, []);

  useEffect(() => {
    if (
      !skipRender &&
      !props.saveChatUser.loading &&
      Object.keys(props.saveChatUser.data).length > 0
    ) {
      history.push("/inbox");
    }
    setSkipRender(false);
  }, [props.saveChatUser]);

  // const setActiveSection = (event, key) => {
  //   setActiveSec(key);
  //   if (key !== "product") {
  //     props.dispatch(
  //       fetchSingleUserPostsStart({
  //         type: key,
  //         user_unique_id: props.match.params.username,
  //         skip: 0,
  //         take: take,
  //       })
  //     );
  //     setSkip(take);
  //   }
  // };

  const setActiveSection = (event, key) => {
    setActiveSec(key);
    switch (key) {
      case "all":
        props.dispatch(fetchSingleUserPostsStart({ type: key, skip: 0, take: take, user_unique_id: props.match.params.username }));
        setSkip(take);
        break;
      case "folders":
        props.dispatch(
          premiumFolderListStart({ skip: 0, take: 12, user_unique_id: props.match.params.username })
        );

        break;
      case "virtual":
        props.dispatch(userVirtualVhListStart({ skip: 0, take: 12, user_unique_id: props.match.params.username }));
        setSkip(take);
        break;
      case "media":
        props.dispatch(fetchSingleUserPostsStart({ type: type, skip: 0, take: take, user_unique_id: props.match.params.username }));
        setSkip(take);
        break;

      default:
        break;
    }
  };

  const fetchMorePost = () => {
    props.dispatch(
      fetchSingleUserPostsStart({
        type: activeSec,
        user_unique_id: props.match.params.username,
        append: true,
        skip: skip,
        take: take,
      })
    );
    setSkip(skip + take);
  };

  const fetchMoreVE = () => {
    props.dispatch(
      userVirtualVhListStart({
        user_unique_id: props.match.params.username,
        skip: skip,
        take: take,
        append: true,
      })
    );
    setSkip(take);
  };

  const fetchMoreCollections = () => {
    props.dispatch(
      fetchMorepremiumFolderListStart({
        user_unique_id: props.match.params.username,
        skip: premiumFolderList.data.collections.length,
        take: 12,
      })
    )
  };

  const onCopy = (event) => {
    const notificationMessage = getSuccessNotificationMessage(
      t("profile_link_copied")
    );
    props.dispatch(createNotification(notificationMessage));
  };

  const handleUnfollow = (event, user_id) => {
    event.preventDefault();
    props.dispatch(
      unFollowUserStart({
        user_id: user_id,
      })
    );
  };

  const handleChatUser = (event, user_id, amount, user_needs_pay_chat_message) => {
    event.preventDefault();
    if (!localStorage.getItem("userId")) {
      const notificationMessage = getErrorNotificationMessage(
        t("login_to_continue")
      );
      props.dispatch(createNotification(notificationMessage));
    } else if (user_needs_pay_chat_message == 0) {
      props.dispatch(
        saveChatUserStart({
          from_user_id: localStorage.getItem("userId"),
          to_user_id: user_id,
        })
      );
    }
    else {
      setModelUser({
        ...modelUser,
        user_id: user_id,
        amount: amount
      })
      setMakePaymentModel(true)
    }
  };

  const subscriptionPayment = (
    event,
    plan_type,
    amount,
    amount_formatted,
    subscription_id,
    is_free = 0
  ) => {
    event.preventDefault();
    if (localStorage.getItem("userId")) {
      setSubscriptionData({
        ...subscriptionData,
        is_free: is_free,
        plan_type: plan_type,
        amount: amount,
        amount_formatted: amount_formatted,
        subscription_id: subscription_id
      });
      setPaymentModal(true);
    } else {
      const notificationMessage = getErrorNotificationMessage(
        t("login_to_continue")
      );
      props.dispatch(createNotification(notificationMessage));
    }
  };


  useEffect(() => {
    if (
      !skipRender &&
      !chatMessagePayWallet.loading &&
      Object.keys(chatMessagePayWallet.data).length > 0
    ) {
      closeChatPaymentModal();
      props.dispatch(
        saveChatUserStart({
          from_user_id: localStorage.getItem("userId"),
          to_user_id: modelUser.user_id,
        })
      );
    }
    setSkipRender(false);
  }, [chatMessagePayWallet]);

  const handleBlockUser = (event, user_id) => {
    event.preventDefault();
    props.dispatch(
      saveBlockUserStart({
        user_id: user_id,
        is_other_profile: 1,
      })
    );
  };

  const handleUnfollowModalClose = () => setShowUnfollow(false);
  const handleUnfollowModalShow = () => setShowUnfollow(true);

  const { userDetails } = props;

  const closePrivateCallModal = () => {
    setRequestVideoCall(false);
    setRequestAudioCall(false);
  };

  const handleShareClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const closeSendTipModal = () => {
    setSendTip(false);
  };

  const closePaymentModal = () => {
    setPaymentModal(false);
  };

  const open = Boolean(anchorEl);
  const popoverId = open ? "simple-popover" : undefined;

  useEffect(() => {
    if (!skipRender && !props.userPosts.loading) {
      props.dispatch(fetchSingleUserPostsStart({
        type: type, skip: 0,
        take: take, user_unique_id: props.match.params.username
      }));
    }
    setSkipRender(false);
  }, [type]);

  const handleStar = (event, status, user_id) => {
    event.preventDefault();
    setFavStatus(status);
    props.dispatch(
      addFavoriteStart({
        user_id: user_id,
      })
    );
  };


  return (
    <>
      <div className="new-home-sec">
        {userDetails.loading ? (
          <ProfileLoader />
        ) : (
          <div className="new-home-box">
            <div className="new-home-sidebar">
              <div className="profile-logo-sec">
                <Image
                  className="profile-logo-img"
                  src={configuration.get("configData.site_logo")}
                />
              </div>
              <div className="add-model-fav">
              </div>
              <div className="sibebar-header-sec">
                {userDetails.data.user.featured_story ? (
                  <div className="sidebar-user-img-sec">
                    <div
                      data-fancybox="gallery"
                      href={userDetails.data.user.featured_story}
                    >
                      <Image
                        className="sidebar-user-img profile-image"
                        src={userDetails.data.user.picture}
                        alt={userDetails.data.user.name}
                      />
                    </div>
                    {userDetails.data.user.is_user_live === 1 && (
                      <Link
                        to={`/join/${userDetails.data.user.ongoing_live_video.live_video_unique_id}`}
                        className="sidebar-live-btn"
                      >
                        {t("live")}
                      </Link>
                    )}
                    {userDetails.data.user.is_online_status === 1 &&
                      userDetails.data.user.is_user_online === 1 && (
                        <div className="dot-circle"></div>
                      )}
                  </div>
                ) : (
                  <div className="sidebar-user-no-fea-img-sec">
                    <Image
                      className="sidebar-user-img profile-image"
                      src={userDetails.data.user.picture}
                      alt={userDetails.data.user.name}
                    />
                    {userDetails.data.user.is_user_live === 1 && (
                      <Link
                        to={`/join/${userDetails.data.user.ongoing_live_video.live_video_unique_id}`}
                        className="sidebar-live-btn"
                      >
                        {t("live")}
                      </Link>
                    )}
                    {userDetails.data.user.is_online_status === 1 &&
                      userDetails.data.user.is_user_online === 1 && (
                        <div className="dot-circle"></div>
                      )}
                  </div>
                )}
                <h4>
                  {userDetails.data.user.name}
                  <span>
                    {userDetails.data.user.is_verified_badge == 1 && (
                      <Image
                        className="sidebar-verified-icon"
                        src={
                          window.location.origin +
                          "/assets/images/new-home/verified-icon.png"
                        }
                      />
                    )}
                  </span>
                </h4>
                <Link to="#" className="sidebar-user-name">
                  @{userDetails.data.user.username}
                </Link>
                <div className="swiper-favorite story">
                  {favStatus !== "" ? (
                    <>
                      <>
                        {favStatus === "added" ? (
                          <Link
                            type="button"
                            className="swiper-btn-fav"
                            onClick={(event) => handleStar(event, "removed", userDetails.data.user.user_id)}
                          >
                            <Image
                              src="assets/images/icons/star-active.svg"
                              className="svg-clone my-p-icons"
                              width="12"
                            />
                            {t("remove_from_favorites")}
                          </Link>
                        ) : null}
                      </>
                      <>
                        {favStatus === "removed" ? (
                          <Link
                            type="button"
                            className="swiper-btn-fav"
                            onClick={(event) => handleStar(event, "added", userDetails.data.user.user_id)}
                          >
                            <Image
                              src="assets/images/icons/star.svg"
                              className="svg-clone my-p-icons"
                              width="12"
                            />
                            {t("add_to_favorites")}
                          </Link>
                        ) : null}
                      </>
                    </>
                  ) : userDetails.data.is_favuser == 1 ? (
                    <Link
                      type="button"
                      className="swiper-btn-fav"
                      onClick={(event) => handleStar(event, "removed", userDetails.data.user.user_id)}
                    >
                      <Image
                        src="assets/images/icons/star-active.svg"
                        className="svg-clone my-p-icons"
                        width="12"
                      />
                      {t("remove_from_favorites")}
                    </Link>
                  ) : (
                    <Link
                      type="button"
                      className="swiper-btn-fav"
                      onClick={(event) => handleStar(event, "added", userDetails.data.user.user_id)}
                    >
                      <Image
                        src="assets/images/icons/star.svg"
                        className="svg-clone my-p-icons"
                        width="12"
                      />
                      {t("add_to_favorites")}
                    </Link>
                  )}
                </div>
                <div className="sidebar-total-count-info-box" style={{ gridTemplateColumns: userDetails.data.user.show_followings ? "repeat(3, 1fr)" : "repeat(1, 1fr)" }}>
                  <div className="sidebar-total-count-card">
                    <h5>{userDetails.data.user.total_posts}</h5>
                    <p>{t("posts")}</p>
                  </div>
                  {userDetails.data.user.show_followings == 1 ? <React.Fragment>
                    <div className="sidebar-total-count-card">
                      <h5>{userDetails.data.user.total_followers}</h5>
                      <p>{t("fans")}</p>
                    </div>
                    <div className="sidebar-total-count-card">
                      <h5>{userDetails.data.user.total_followings}</h5>
                      <p>{t("following")}</p>
                    </div>
                  </React.Fragment> : null}
                </div>
                {userDetails.data.user.is_content_creator == 2 ? <Button
                  className="default-btn profile-sidebar-broadcast-btn"
                  type="button"
                  onClick={() => history.push(`/personalized-request/${userDetails.data.user.user_id}`)}
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
                </Button> : null}
              </div>
              {userDetails.data.is_block_user === 0 ? (
                <div className="sidebar-links">
                  <ul className="list-unstyled">
                    <Media as="li">
                      <Link
                        to="#"
                        onClick={() => {
                          if (localStorage.getItem("userId")) {
                            setRequestVideoCall(true);
                          } else {
                            const notificationMessage =
                              getErrorNotificationMessage(
                                t("login_to_continue")
                              );
                            props.dispatch(
                              createNotification(notificationMessage)
                            );
                          }
                        }}
                      >
                        <span>
                          <Image
                            className="sidebar-links-icon"
                            src={
                              window.location.origin +
                              "/assets/images/new-home/icon/video-call-1.svg"
                            }
                          />
                        </span>
                        {t("video_call")}
                      </Link>
                    </Media>
                    <Media as="li">
                      <Link
                        to="#"
                        onClick={() => {
                          if (localStorage.getItem("userId")) {
                            setRequestAudioCall(true);
                          } else {
                            const notificationMessage =
                              getErrorNotificationMessage(
                                t("login_to_continue")
                              );
                            props.dispatch(
                              createNotification(notificationMessage)
                            );
                          }
                        }}
                      >
                        <span>
                          <Image
                            className="sidebar-links-icon"
                            src={
                              window.location.origin +
                              "/assets/images/new-home/icon/audio-call-1.svg"
                            }
                          />
                        </span>
                        {t("voice_call")}
                      </Link>
                    </Media>
                    <Media as="li">
                      <Link
                        to="#"
                        onClick={() => {
                          if (localStorage.getItem("userId")) {
                            setSendTip(true);
                          } else {
                            const notificationMessage =
                              getErrorNotificationMessage(
                                t("login_to_continue")
                              );
                            props.dispatch(
                              createNotification(notificationMessage)
                            );
                          }
                        }}
                      >
                        <span>
                          <Image
                            className="sidebar-links-icon"
                            src={
                              window.location.origin +
                              "/assets/images/new-home/icon/sent-tip-1.svg"
                            }
                          />
                        </span>
                        {t("tip_me")}
                      </Link>
                    </Media>
                    <Media as="li">
                      <Link
                        to="#"
                        onClick={(event) =>
                          handleChatUser(event,
                            userDetails.data.user.user_id,
                            userDetails.data.user.chat_message_amount,
                            userDetails.data.payment_info.user_needs_pay_chat_message,
                          )
                        }
                      >
                        <span>
                          <Image
                            className="sidebar-links-icon"
                            src={
                              window.location.origin +
                              "/assets/images/new-home/icon/message-1.svg"
                            }
                          />
                        </span>
                        {t("message")}
                      </Link>
                    </Media>
                    <Media as="li">
                      <Link to="#" onClick={handleShareClick}>
                        <span>
                          <Image
                            className="sidebar-links-icon"
                            src={
                              window.location.origin +
                              "/assets/images/new-home/icon/share-theme-1.svg"
                            }
                          />
                        </span>
                        {t("share")}
                      </Link>
                    </Media>
                    <Popover
                      id={popoverId}
                      open={open}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                      }}
                    >
                      <Typography>
                        <div className="social-share-sec m-3">
                          <div className="text-center social-link">
                            <div className="Demo__some-network">
                              <EmailShareButton
                                url={userDetails.data.user.share_link}
                                subject={configuration.get(
                                  "configData.site_name"
                                )}
                                body={userDetails.data.user.share_message}
                                className="Demo__some-network__share-button"
                              >
                                <EmailIcon size={32} round />
                              </EmailShareButton>
                            </div>
                            {/* <h6 className="social-desc">{t("email")}</h6> */}
                          </div>
                          <div className="text-center social-link">
                            <WhatsappShareButton
                              url={userDetails.data.user.share_link}
                              title={userDetails.data.user.share_message}
                              separator=":: "
                              className="Demo__some-network__share-button"
                            >
                              <WhatsappIcon size={32} round />
                            </WhatsappShareButton>
                            {/* <h6 className="social-desc">{t("whatsapp")}</h6> */}
                          </div>
                          <div className="text-center social-link">
                            <FacebookShareButton
                              url={userDetails.data.user.share_link}
                              quote={userDetails.data.user.share_message}
                              className="Demo__some-network__share-button"
                            >
                              <FacebookIcon size={32} round />
                            </FacebookShareButton>
                            {/* <h6 className="social-desc">{t("facebook")}</h6> */}
                          </div>
                          <div className="text-center social-link">
                            <TwitterShareButton
                              url={userDetails.data.user.share_link}
                              title={userDetails.data.user.share_message}
                              className="Demo__some-network__share-button"
                            >
                              <TwitterIcon size={32} round />
                            </TwitterShareButton>
                            {/* <h6 className="social-desc">{t("twitter")}</h6> */}
                          </div>
                          <div className="text-center social-link">
                            <RedditShareButton
                              url={userDetails.data.user.share_link}
                              title={userDetails.data.user.share_message}
                              windowWidth={660}
                              windowHeight={460}
                              className="Demo__some-network__share-button"
                            >
                              <RedditIcon size={32} round />
                            </RedditShareButton>
                            {/* <h6 className="social-desc">{t("reddit")}</h6> */}
                          </div>
                          <div className="text-center social-link">
                            <TelegramShareButton
                              url={userDetails.data.user.share_link}
                              title={userDetails.data.user.share_message}
                              windowWidth={660}
                              windowHeight={460}
                              className="Demo__some-network__share-button"
                            >
                              <TelegramIcon size={32} round />
                            </TelegramShareButton>
                            {/* <h6 className="social-desc">{t("telegram")}</h6> */}
                          </div>
                          <div className="text-center social-link">
                            <CopyToClipboard
                              onCopy={onCopy}
                              text={userDetails.data.user.share_link}
                              windowWidth={660}
                              windowHeight={460}
                              className="Demo__some-network__share-button"
                            >
                              <button className="react-share__ShareButton Demo__some-network__share-button primary-share-btn">
                                <i className="fas fa-copy"></i>
                              </button>
                            </CopyToClipboard>
                          </div>
                        </div>
                      </Typography>
                    </Popover>
                  </ul>
                </div>
              ) : null}
              {userDetails.data.youtube_link ||
                userDetails.data.pinterest_link ||
                userDetails.data.linkedin_link ||
                userDetails.data.snapchat_link ||
                userDetails.data.twitter_link ||
                userDetails.data.instagram_link ||
                userDetails.data.amazon_wishlist ||
                userDetails.data.facebook_link ||
                userDetails.data.twitch_link ||
                userDetails.data.website ? (
                <div className="sidebar-social-links">
                  <ul className="list-unstyled">
                    {userDetails.data.youtube_link && (
                      <Media as="li">
                        <a href={userDetails.data.youtube_link} target="_blank">
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
                    {userDetails.data.pinterest_link && (
                      <Media as="li">
                        <a
                          href={userDetails.data.pinterest_link}
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
                    {userDetails.data.linkedin_link && (
                      <Media as="li">
                        <a
                          href={userDetails.data.linkedin_link}
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
                    {userDetails.data.snapchat_link && (
                      <Media as="li">
                        <a
                          href={userDetails.data.snapchat_link}
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
                    {userDetails.data.twitter_link && (
                      <Media as="li">
                        <a href={userDetails.data.twitter_link} target="_blank">
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
                    {userDetails.data.instagram_link && (
                      <Media as="li">
                        <a
                          href={userDetails.data.instagram_link}
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
                    {userDetails.data.amazon_wishlist && (
                      <Media as="li">
                        <a
                          href={userDetails.data.amazon_wishlist}
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
                    {userDetails.data.facebook_link && (
                      <Media as="li">
                        <a
                          href={userDetails.data.facebook_link}
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
                    {userDetails.data.twitch_link && (
                      <Media as="li">
                        <a href={userDetails.data.twitch_link} target="_blank">
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
                    {userDetails.data.website && (
                      <Media as="li">
                        <a href={userDetails.data.website} target="_blank">
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

            <div className="new-home-main-wrapper">
              <div className="user-cover-img-sec">
                <Image
                  className="user-cover-img"
                  src={userDetails.data.user.cover}
                  alt={userDetails.data.user.name}
                />
                <div className="website-hide-sec">
                  {userDetails.data.user.featured_story ? (
                    <a
                      data-fancybox="gallery"
                      href={userDetails.data.user.featured_story}
                    >
                      <Image
                        src={userDetails.data.user.picture}
                        alt={userDetails.data.user.name}
                        className="single-profile-user-img border-red"
                      />
                    </a>
                  ) : (
                    <Image
                      src={userDetails.data.user.picture}
                      alt={userDetails.data.user.name}
                      className="single-profile-user-img"
                    />
                  )}
                </div>
              </div>
              <div className="user-right-content-sec">
                <div className="user-right-info">
                  <div className="website-hide-sec">
                    <div className="mobile-header-sec">
                      <h4>
                        {userDetails.data.user.name}
                        <span>
                          {userDetails.data.user.is_verified_badge == 1 && (
                            <Image
                              className="sidebar-verified-icon"
                              src={
                                window.location.origin +
                                "/assets/images/new-home/verified-icon.png"
                              }
                            />
                          )}
                        </span>
                      </h4>
                      {/* <Link to="#" className="sidebar-user-name">
                        {userDetails.data.user.email}
                      </Link> */}
                      <div className="sidebar-total-count-info-box" style={{ gridTemplateColumns: userDetails.data.user.show_followings ? "repeat(3, 1fr)" : "repeat(1, 1fr)" }}>
                        <div className="sidebar-total-count-card">
                          <h5>{userDetails.data.user.total_posts}</h5>
                          <p>{t("posts")}</p>
                        </div>
                        {userDetails.data.user.show_followings == 1 ? <React.Fragment>
                          <div className="sidebar-total-count-card">
                            <h5>{userDetails.data.user.total_followers}</h5>
                            <p>{t("fans")}</p>
                          </div>
                          <div className="sidebar-total-count-card">
                            <h5>{userDetails.data.user.total_followings}</h5>
                            <p>{t("following")}</p>
                          </div>
                        </React.Fragment> : null}
                      </div>
                    </div>
                  </div>
                  <div className="user-info-desc">
                    <p>
                      {userDetails.data.user.about_formatted}
                      {/* <a href="#">Read More</a> */}
                    </p>
                  </div>
                  <div className="user-info-list">
                    <ul className="list-unstyled">
                      {userDetails.data.user.selected_category &&
                        userDetails.data.user.selected_category.name && (
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
                                {userDetails.data.user.selected_category.name}
                              </span>
                            </Link>
                          </Media>
                        )}
                      {userDetails.data.user.date_of_birth && (
                        <Media as="li">
                          <Link to="#">
                            <Image
                              className="user-info-icon"
                              src={
                                window.location.origin +
                                "/assets/images/new-home/icon/date-icon.svg"
                              }
                            />
                            <span>{userDetails.data.user.date_of_birth}</span>
                          </Link>
                        </Media>
                      )}
                      {userDetails.data.user.gender &&
                        userDetails.data.user.gender != "rather-not-select" && (
                          <Media as="li">
                            <Link to="#">
                              <Image
                                className="user-info-icon"
                                src={
                                  window.location.origin +
                                  "/assets/images/new-home/icon/gender.svg"
                                }
                              />
                              <span>{userDetails.data.user.gender}</span>
                            </Link>
                          </Media>
                        )}
                      {userDetails.data.user.eyes_color_formatted && (
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
                              {userDetails.data.user.eyes_color_formatted}
                            </span>
                          </Link>
                        </Media>
                      )}
                      {userDetails.data.user.height ? (
                        <Media as="li">
                          <Link to="#">
                            <Image
                              className="user-info-icon"
                              src={
                                window.location.origin +
                                "/assets/images/new-home/icon/scale.svg"
                              }
                            />
                            <span>
                              {userDetails.data.user.height_formatted}
                            </span>
                          </Link>
                        </Media>
                      ) : null}
                      {userDetails.data.user.weight ? (
                        <Media as="li">
                          <Link to="#">
                            <Image
                              className="user-info-icon"
                              src={
                                window.location.origin +
                                "/assets/images/new-home/icon/weight.svg"
                              }
                            />
                            <span>
                              {userDetails.data.user.weight_formatted}
                            </span>
                          </Link>
                        </Media>
                      ) : null}
                      {userDetails.data.user.address ? (
                        <Media as="li">
                          <Link to="#">
                            <Image
                              className="user-info-icon"
                              src={
                                window.location.origin +
                                "/assets/images/new-settings/map-marker-icon.svg"
                              }
                            />
                            <span>{userDetails.data.user.address}</span>
                          </Link>
                        </Media>
                      ) : null}
                    </ul>
                  </div>

                </div>




                {userDetails.data.is_block_user == 0 ? (
                  <div className="user-subscription-plans-details">
                    <h3>{t("subscription_plans")}</h3>
                    {userDetails.data.payment_info.is_user_needs_pay == 1 &&
                      userDetails.data.payment_info.unsubscribe_btn_status ==
                      0 ? (
                      userDetails.data.payment_info.is_free_account == 0 ? (
                        <div className="user-subscription-btn-sec">
                          <div
                            className="subscription-outline-btn"
                            onClick={(event) =>
                              subscriptionPayment(
                                event,
                                "months",
                                userDetails.data.payment_info.subscription_info
                                  .monthly_amount,
                                userDetails.data.payment_info.subscription_info
                                  .monthly_amount_formatted,
                                userDetails.data.payment_info.subscription_info.user_subscription_id
                              )
                            }
                          >
                            {
                              userDetails.data.payment_info.subscription_info
                                .monthly_amount_formatted
                            }{" "}
                            /{t("month")}
                          </div>
                          <div
                            className="subscription-btn"
                            onClick={(event) =>
                              subscriptionPayment(
                                event,
                                "years",
                                userDetails.data.payment_info.subscription_info
                                  .yearly_amount,
                                userDetails.data.payment_info.subscription_info
                                  .yearly_amount_formatted
                              )
                            }
                          >
                            {
                              userDetails.data.payment_info.subscription_info
                                .yearly_amount_formatted
                            }{" "}
                            /{t("year")}
                          </div>
                        </div>
                      ) : (
                        <div className="user-subscription-btn-sec">
                          <div
                            className="subscription-btn"
                            onClick={(event) => {
                              if (localStorage.getItem("userId")) {
                                props.dispatch(
                                  subscriptionPaymentStripeStart({
                                    user_unique_id:
                                      userDetails.data.user.user_unique_id,
                                    plan_type: "months",
                                    is_free: 0,
                                  })
                                );
                              } else {
                                const notificationMessage =
                                  getErrorNotificationMessage(
                                    t("login_to_continue")
                                  );
                                props.dispatch(
                                  createNotification(notificationMessage)
                                );
                              }
                            }}
                          >
                            {t("subscribe_for_free")}
                          </div>
                        </div>
                      )
                    ) : null}

                    {userDetails.data.payment_info.unsubscribe_btn_status ==
                      1 && (
                        <>
                          <div className="user-subscription-btn-sec">
                            <div
                              className="subscription-btn"
                              onClick={() => handleUnfollowModalShow()}
                            >
                              {t("unfollow")}
                            </div>
                          </div>
                          <Modal
                            show={showUnfollow}
                            onHide={handleUnfollowModalClose}
                            backdrop="static"
                            keyboard={false}
                            centered
                            className={`${localStorage.getItem("theme") !== "" &&
                              localStorage.getItem("theme") !== null &&
                              localStorage.getItem("theme") !== undefined &&
                              localStorage.getItem("theme") === "dark"
                              ? "dark-theme-modal"
                              : ""
                              }
        `}
                          >
                            <Modal.Header closeButton>
                              <Modal.Title>{t("unsubscribe")}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              {t("cancel_subscription_conformation")}
                            </Modal.Body>
                            <Modal.Footer>
                              <Button
                                variant="secondary"
                                size="lg"
                                onClick={handleUnfollowModalClose}
                              >
                                {t("close")}
                              </Button>
                              <Button
                                variant="primary"
                                size="lg"
                                onClick={(event) =>
                                  handleUnfollow(
                                    event,
                                    userDetails.data.user.user_id
                                  )
                                }
                              >
                                {t("yes")}
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        </>
                      )}
                  </div>
                ) : (
                  <div className="user-subscription-plans-details">
                    <div className="user-subscription-btn-sec">
                      <div
                        className="subscription-btn"
                        onClick={(event) =>
                          handleBlockUser(event, userDetails.data.user.user_id)
                        }
                      >
                        {t("unblock_the_user")}
                      </div>
                    </div>
                  </div>
                )}

                <UserCalendarSchedule show={modalShow}
                  onHide={() => setModalShow(false)} />
              </div>
              <div className="mobile-display">
                {userDetails.data.is_block_user === 0 ? (
                  <div className="sidebar-links">
                    <ul className="list-unstyled">
                      <Media as="li">
                        <Link
                          to="#"
                          onClick={() => {
                            if (localStorage.getItem("userId")) {
                              setRequestVideoCall(true);
                            } else {
                              const notificationMessage =
                                getErrorNotificationMessage(
                                  t("login_to_continue")
                                );
                              props.dispatch(
                                createNotification(notificationMessage)
                              );
                            }
                          }}
                        >
                          <span>
                            <Image
                              className="sidebar-links-icon"
                              src={
                                window.location.origin +
                                "/assets/images/new-home/icon/video-call.svg"
                              }
                            />
                          </span>
                          {t("video_call")}
                        </Link>
                      </Media>
                      <Media as="li">
                        <Link
                          to="#"
                          onClick={() => {
                            if (localStorage.getItem("userId")) {
                              setRequestAudioCall(true);
                            } else {
                              const notificationMessage =
                                getErrorNotificationMessage(
                                  t("login_to_continue")
                                );
                              props.dispatch(
                                createNotification(notificationMessage)
                              );
                            }
                          }}
                        >
                          <span>
                            <Image
                              className="sidebar-links-icon"
                              src={
                                window.location.origin +
                                "/assets/images/new-home/icon/audio-call.svg"
                              }
                            />
                          </span>
                          {"voice_call"}
                        </Link>
                      </Media>
                      <Media as="li">
                        <Link
                          to="#"
                          onClick={() => {
                            if (localStorage.getItem("userId")) {
                              setSendTip(true);
                            } else {
                              const notificationMessage =
                                getErrorNotificationMessage(
                                  t("login_to_continue")
                                );
                              props.dispatch(
                                createNotification(notificationMessage)
                              );
                            }
                          }}
                        >
                          <span>
                            <Image
                              className="sidebar-links-icon"
                              src={
                                window.location.origin +
                                "/assets/images/new-home/icon/sent-tip.svg"
                              }
                            />
                          </span>
                          {t("tip_me")}
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
                      <Media as="li">
                        <Link
                          to="#"
                          onClick={(event) =>
                            handleChatUser(event, userDetails.data.user.user_id, userDetails.data.user.chat_message_amount)
                          }
                        >
                          <span>
                            <Image
                              className="sidebar-links-icon"
                              src={
                                window.location.origin +
                                "/assets/images/new-home/icon/message.svg"
                              }
                            />
                          </span>
                          {t("message")}
                        </Link>
                      </Media>
                    </ul>
                  </div>
                ) : null}
                {userDetails.data.youtube_link ||
                  userDetails.data.pinterest_link ||
                  userDetails.data.linkedin_link ||
                  userDetails.data.snapchat_link ||
                  userDetails.data.twitter_link ||
                  userDetails.data.instagram_link ||
                  userDetails.data.amazon_wishlist ||
                  userDetails.data.facebook_link ||
                  userDetails.data.twitch_link ||
                  userDetails.data.website ? (
                  <div className="sidebar-social-links">
                    <ul className="list-unstyled">
                      {userDetails.data.youtube_link && (
                        <Media as="li">
                          <a
                            href={userDetails.data.youtube_link}
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
                      {userDetails.data.pinterest_link && (
                        <Media as="li">
                          <a
                            href={userDetails.data.pinterest_link}
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
                      {userDetails.data.linkedin_link && (
                        <Media as="li">
                          <a
                            href={userDetails.data.linkedin_link}
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
                      {userDetails.data.snapchat_link && (
                        <Media as="li">
                          <a
                            href={userDetails.data.snapchat_link}
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
                      {userDetails.data.twitter_link && (
                        <Media as="li">
                          <a
                            href={userDetails.data.twitter_link}
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
                      {userDetails.data.instagram_link && (
                        <Media as="li">
                          <a
                            href={userDetails.data.instagram_link}
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
                      {userDetails.data.amazon_wishlist && (
                        <Media as="li">
                          <a
                            href={userDetails.data.amazon_wishlist}
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
                      {userDetails.data.facebook_link && (
                        <Media as="li">
                          <a
                            href={userDetails.data.facebook_link}
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
                      {userDetails.data.twitch_link && (
                        <Media as="li">
                          <a
                            href={userDetails.data.twitch_link}
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
                      {userDetails.data.website && (
                        <Media as="li">
                          <a href={userDetails.data.website} target="_blank">
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
              {userDetails.data.is_block_user == 0 && (
                <div className="profile-tab-sec">
                  <Tab.Container id="left-tabs-example" defaultActiveKey="all">
                    <Row>
                      <Col sm={12}>
                        <Nav
                          variant="pills"
                          className={
                            userDetails.data.user.is_content_creator == 2
                              ? "grid-five-col"
                              : "grid-four-col"
                          }
                        >
                          <Nav.Item>
                            <Nav.Link
                              eventKey="all"
                              onClick={(event) =>
                                setActiveSection(event, "all")
                              }
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
                              <span className="resp-display-none">
                                Media
                              </span>
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item>
                            <Nav.Link
                              eventKey="image"
                              onClick={(event) =>
                                setActiveSection(event, "shop")
                              }
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
                              <span className="resp-display-none">
                                Shopping
                              </span>
                            </Nav.Link>
                          </Nav.Item>
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
                              <span className="resp-display-none text-nowrap">
                                Premium Folders
                              </span>
                            </Nav.Link>
                          </Nav.Item>
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
                              <span className="resp-display-none text-nowrap">
                                Virtual Experience
                              </span>
                            </Nav.Link>
                          </Nav.Item>
                          {/* <Nav.Item>
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
                          {/* {userDetails.data.user.is_content_creator == 2 && (
                            <Nav.Item>
                              <Nav.Link
                                eventKey="product"
                                onClick={(event) =>
                                  setActiveSection(event, "product")
                                }
                              >
                                <span>
                                  <Image
                                    className="profile-post-tab-icon"
                                    src={
                                      window.location.origin +
                                      "/assets/images/new-home/icon/store-icon-1.svg"
                                    }
                                  />
                                </span>
                                <span className="resp-display-none">
                                  {t("store")}
                                </span>
                              </Nav.Link>
                            </Nav.Item>
                          )} */}
                        </Nav>
                      </Col>
                      {activeSec === "shop" ? (
                        <Col md={12}>
                          <ModelProfileStoreSec
                            activeSec={activeSec}
                            setActiveSec={setActiveSec}
                            products={props.products}
                            otherUserUniquId={props.match.params.username}
                          />
                        </Col>
                      ) : activeSec == "media" ? (
                        <Col md={12}>
                          <div className="select-lang-drop-down" style={{ width: "10em" }}>
                            <select className="form-control mw-200 mb-3"
                              name="lang"
                              onChange={(e) => setType(e.target.value)}
                              value={type}
                            >
                              <option value="image">
                                {t("image")}
                              </option>
                              <option value="audio">
                                {t("audio")}
                              </option>
                              <option value="video">
                                {t("videos")}
                              </option>
                            </select>
                          </div>
                          {props.userPosts.loading ? (
                            <div className="profile-all-post-box">
                              {[...Array(8)].map(() => (
                                <Skeleton className="profile-post-card-loader" />
                              ))}
                            </div>
                          ) : (
                            <>
                              {props.userPosts.data.posts.length > 0 ? (
                                <InfiniteScroll
                                  dataLength={props.userPosts.data.posts.length}
                                  next={fetchMorePost}
                                  hasMore={
                                    props.userPosts.data.posts.length <
                                    props.userPosts.data.total
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
                                    {props.userPosts.data.posts.map((post) => (
                                      <>
                                        {post.postFiles &&
                                          post.postFiles.length > 0 && (
                                            // post.postFiles.map((postFile, index) =>
                                            <ProfileSinglePost post={post} />
                                          )}
                                      </>
                                    ))}
                                  </div>
                                </InfiniteScroll>
                              ) : (
                                <NoDataFound />
                              )}
                            </>
                          )}
                        </Col>
                      ) : activeSec == "folders" ?
                        <Col md={12}>
                          <UserFolderList
                            premiumFolderList={premiumFolderList}
                            fetchMorePost={fetchMoreCollections}
                          />
                        </Col>
                        :
                        activeSec == "virtual" ? userVirtualVhList.loading ? (
                          <Col md={12}>
                            <div className="profile-all-post-box">
                              {[...Array(8)].map(() => (
                                <Skeleton className="profile-post-card-loader" />
                              ))}
                            </div>
                          </Col>
                        ) : (
                          <Col md={12}>
                            {userVirtualVhList.data?.virtual_experiences?.length > 0 ? (
                              <InfiniteScroll
                                dataLength={userVirtualVhList.data.virtual_experiences.length}
                                next={fetchMoreVE}
                                hasMore={userVirtualVhList.data.virtual_experiences.length < userVirtualVhList.data.total}
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
                                  {userVirtualVhList.data.virtual_experiences.map(
                                    (post) => (
                                      <UserVirtualExperiencsProduct post={post} />
                                    )
                                  )}
                                </div>
                              </InfiniteScroll>
                            ) : (
                              <NoDataFound />
                            )}
                          </Col>
                        ) : activeSec == "all" ? props.userPosts.loading ? (
                          <Col md={12}>
                            <div className="profile-new-feed-post-box">
                              {[...Array(8)].map(() => (
                                <Skeleton className="profile-post-card-loader" />
                              ))}
                            </div>
                          </Col>
                        ) : (
                          <Col md={12}>
                            {props.userPosts.data.posts.length > 0 ? (
                              <InfiniteScroll
                                dataLength={props.userPosts.data.posts.length}
                                next={fetchMorePost}
                                hasMore={
                                  props.userPosts.data.posts.length <
                                  props.userPosts.data.total
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
                                  {props.userPosts.data.posts.map((post, index) => (
                                    <>
                                      {/* {post.postFiles &&
                                      post.postFiles.length > 0 && (
                                        // post.postFiles.map((postFile, index) =>
                                        <ProfileSinglePost post={post} />
                                      )} */}
                                      <NewProfileFeedCard post={post} key={index} index={index} />
                                    </>
                                  ))}
                                </div>
                              </InfiniteScroll>
                            ) : (
                              <NoDataFound />
                            )}
                          </Col>
                        ) : null}
                    </Row>
                  </Tab.Container>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {userDetails.loading ? (
        t("loading")
      ) : localStorage.getItem("userId") !== "" &&
        localStorage.getItem("userId") !== null &&
        localStorage.getItem("userId") !== undefined ? (
        <>
          {/* <SendTipModal
              sendTip={sendTip}
              closeSendTipModal={closeSendTipModal}
              username={userDetails.data.user.username}
              userPicture={userDetails.data.user.picture}
              name={userDetails.data.user.name}
              post_id={null}
              user_id={userDetails.data.user.user_id}
          /> */}
          {sendTip ? (
            <SendTipPaymentModal
              paymentsModal={sendTip}
              closepaymentsModal={closeSendTipModal}
              user_id={userDetails.data.user.user_id}
              type="profile"
            />
          ) : null}
          {/* <PaymentModal
                subscrptionPayment={subscrptionPayment}
                closePaymentModal={closePaymentModal}
                userPicture={userDetails.data.user.picture}
                name={userDetails.data.user.name}
                user_unique_id={userDetails.data.user.user_unique_id}
                subscriptionData={subscriptionData}
                username={userDetails.data.user.username}
            /> */}
          {subscrptionPayment ? (
            <SubscriptionPaymentModal
              paymentsModal={subscrptionPayment}
              closepaymentsModal={closePaymentModal}
              name={userDetails.data.user.name}
              user_unique_id={userDetails.data.user.user_unique_id}
              subscriptionData={subscriptionData}
            />
          ) : null}
          <PrivateCallModal
            requestVideoCall={requestVideoCall}
            closePrivateCallModal={closePrivateCallModal}
            username={userDetails.data.user.username}
            userPicture={userDetails.data.user.picture}
            videoAmount={userDetails.data.user.video_call_amount_formatted}
            name={userDetails.data.user.name}
            post_id={null}
            user_id={userDetails.data.user.user_id}
          />
          <PrivateAudioCallModal
            requestAudioCall={requestAudioCall}
            closePrivateCallModal={closePrivateCallModal}
            username={userDetails.data.user.username}
            userPicture={userDetails.data.user.picture}
            AudioAmount={userDetails.data.user.audio_call_amount_formatted}
            name={userDetails.data.user.name}
            post_id={null}
            user_id={userDetails.data.user.user_id}
          />
          {makePaymentModel &&
            <ChatMessagePaymentModal
              paymentsModal={makePaymentModel}
              closeChatPaymentModal={closeChatPaymentModal}
              modelUser={modelUser}
            />
          }
        </>
      ) : null}
    </>
  );
};

const mapStateToPros = (state) => ({
  comments: state.comment.comments,
  saveChatUser: state.chat.saveChatUser,
  userDetails: state.otherUser.userDetails,
  userPosts: state.otherUser.userPosts,
  products: state.userProducts.otherModelProducts,
});

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToPros,
  mapDispatchToProps
)(translate(SingleProfile));
