import React, { Component } from "react";
import { createBrowserHistory as createHistory } from "history";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthLayout, { OtherProfileLayout } from "../layouts/AuthLayout";
import OldEditProfile from "../Accounts/Profile/OldEditProfile";
import OldProfileIndex from "../Accounts/Profile/OldProfileIndex";
import NotFoundIndex from "../NotFound/NotFoundIndex";
import { Helmet } from "react-helmet";
import configuration from "react-global-configuration";
import { apiConstants } from "../Constant/constants";
import LandingPageLoader from "../Loader/LandingPageLoader";
import EmptyLayout from "../layouts/EmptyLayout";
import LandingPageIndex from "../LandingPageIndex/LandingPageIndex";
import HomePageIndex from "../Home/HomePageIndex";
import MessageIndex from "../Messages/MessageIndex";
import BookmarksIndex from "../Bookmarks/BookmarksIndex";
import BookmarkPhoto from "../Bookmarks/BookmarkPhoto";
import BookmarkVideo from "../Bookmarks/BookmarkVideo";
import BookmarkAudio from "../Bookmarks/BookmarkAudio";
import ModelViewProfile from "../Model/ModelViewProfile";
import FollowingIndex from "../Accounts/FansFollowing/Following/FollowingIndex";
import ListIndex from "../Accounts/List/ListIndex";
import NotificationIndex from "../Notification/NotificationIndex";
import CreatePostIndex from "../Post/CreatePost/CreatePostIndex";
import FavoritesIndex from "../Accounts/Favorites/FavoritesIndex";
import PaymentsIndex from "../Accounts/Payments/PaymentsIndex";
import BankingIndex from "../Accounts/Payments/BankingIndex";
import CardsIndex from "../Accounts/Payments/CardsIndex";
import AddBankIndex from "../Accounts/Payments/AddBankIndex";
import Logout from "../Accounts/Logout";
import Wallet from "../Wallet/Wallet";
import BillingAccountIndex from "../Accounts/Payments/BillingAccountIndex";
import DocumentUploadIndex from "../DocumentUpload/DocumentUploadIndex";
import StaticPage from "../StaticPage/StaticPage";
import FanIndex from "../Accounts/FansFollowing/Fans/FanIndex";
import PostView from "../Post/PostView";
import CategoryUsers from "../Categories/CategoryUsers";
import ResetPassword from "../LandingPageIndex/ResetPassword";
import UploadProfilePicture from "../Accounts/Profile/UploadProfilePicture";
import UserChatIndex from "../UserChat/UserChatIndex";
import UserChatMobileRoom from "../UserChat/UserChatMobileRoom";
import CategoryListingIndex from "../CategoryListing/CategoryListingIndex";
import SingleProfile from "../Accounts/Profile/SingleProfile";
import Explore from "../Post/Explore/Explore";
import DashboardContentCreator from "../DashboardContentCreator/DashboardContentCreator";
import BecomeAContentCreatorIndex from "../BecomeAContentCreator/BecomeAContentCreatorIndex";
import EcomIndex from "../Ecom/EcomIndex";
import EcomCartIndex from "../Ecom/EcomCartIndex";
import EcomPaymentIndex from "../Ecom/EcomPaymentIndex";
import EcomPaymentMethod from "../Ecom/EcomPaymentMethod";
import EcomCategoryIndex from "../Ecom/EcomCategoryIndex";
import SingleProduct from "../Ecom/Product/SingleProduct";
import OrderList from "../Ecom/Orders/OrderList";
import OrderView from "../Ecom/Orders/OrderView";
import OrderTransaction from "../Ecom/Orders/OrderTransaction";
import AddProduct from "../Ecom/Product/AddProduct";
import EditProduct from "../Ecom/Product/EditProduct";
import ProductList from "../Ecom/Product/ProductList";
import ExploreIndex from "../Post/Explore/ExploreIndex";
import StoriesIndex from "../Home/Stories/StoriesIndex";
import VerificationIndex from "../Verification/VerificationIndex";
import RegisterVerifyIndex from "../Verification/RegisterVerifyIndex";

import UserLiveVideosIndex from "../LiveVideos/UserLiveVideosIndex";
import LiveVideosIndex from "../LiveVideos/LiveVideosIndex";
import SingleLiveVideosIndex from "../LiveVideos/SingleLiveVideosIndex";
import JoinLiveVideoIndex from "../LiveVideos/JoinLiveVideoIndex";
import AudioCallRequestSentIndex from "../OneToOneStreaming/AudioCallRequestList/AudioCallRequestSentIndex";
import VideoCallRequestSentIndex from "../OneToOneStreaming/VideoCallRequestList/VideoCallRequestSentIndex";
import VideoCallHistoryIndex from "../OneToOneStreaming/VideoCallRequestList/VideoCallHistoryIndex";
import AudioCallHistoryIndex from "../OneToOneStreaming/AudioCallRequestList/AudioCallHistoryIndex";
import AudioCallRequestReceivedIndex from "../OneToOneStreaming/AudioCallRequestList/AudioCallRequestReceivedIndex";
import VideoCallRequestReceivedIndex from "../OneToOneStreaming/VideoCallRequestList/VideoCallRequestReceivedIndex";
import VideoCallIndex from "../OneToOneStreaming/VideoCallIndex";
import AudioCallIndex from "../OneToOneStreaming/AudioCallRequestList/AudioCallIndex";
import ReferralsIndex from "../Referrals/ReferralsIndex";
import BlockedUserIndex from "../Accounts/BlockedUser/BlockedUserIndex";

import ProfileIndex from "../Accounts/Profile/ProfileIndex";
import EditProfile from "../Accounts/Profile/EditProfile";
import MobileEditProfileIndex from "../Accounts/Profile/MobileEditProfileIndex";
import ChangePassword from "../Accounts/Profile/ChangePassword";
import DeleteAccount from "../Accounts/Profile/DeleteAccount";
import TwoStepAuthentication from "../Accounts/Profile/TwoStepAuthentication";
import SessionManagement from "../Accounts/Profile/SessionManagement";
import AvailabilityStatus from "../Accounts/Profile/AvailabilityStatus";
import AddDeliveryAddress from "../PersonalizedRequest/AddDeliveryAddress";
import DeliveryAddressList from "../PersonalizedRequest/DeliveryAddressList";
import HideFollowers from "../Accounts/Profile/HideFollowers";
import PersonalizedRequest from "../PersonalizedRequest/PersonalizedRequest";
import PersonalRequestTable from "../PersonalizedRequest/PersonalRequestTable";
import ProductDetails from "../PersonalizedRequest/ProductDetails";
import CreaterFlowTable from "../PersonalizedRequest/CreaterFlow/CreaterFlowTable";
import CreaterProductDetail from "../PersonalizedRequest/CreaterFlow/CreaterProductDetail";
import CreaterFlowProduct from "../PersonalizedRequest/CreaterFlow/CreaterFlowProduct";
import GoLiveProduct from "../ECommerceStreaming/GoLiveProduct";
import ProductStream from "../ECommerceStreaming/ProductStream";
import ProductOnliveStream from "../ECommerceStreaming/ProductOnliveStream";
import LiveHistoryTable from "../ECommerceStreaming/LiveHistoryTable";
import OrderPlacedDetail from "../ECommerceStreaming/OrderPlacedDetail";
import OrderRecievedDetail from "../ECommerceStreaming/OrderRecievedDetail";
import OrderProductDetail from "../ECommerceStreaming/OrderProductDetail";
import LiveStreamOrdersTable from "../ECommerceStreaming/LiveStreamOrdersTable";
import LiveStreamOrderProduct from "../ECommerceStreaming/LiveStreamOrderProduct";
import SingleOrderView from "../ECommerceStreaming/SingleOrderView";
import CreateCoupon from "../Phase4/CreateCoupon";
import CouponDetailsTable from "../Phase4/CouponDetailsTable";
import PremiumFolderDetail from "../Phase4/PremiumFolderDetail";
import PremiumFolderFile from "../Phase4/PremiumFolderFile";
import FavoriteList from "../Phase4/FavoriteList";

import {
  setTranslations,
  setDefaultLanguage,
  translate,
  setLanguage,
} from "react-multi-lang";
import en from "../translations/en.json";
import es from "../translations/es.json";
import VideoCallList from "../VideoCalls/VideoCallList";
import StoriesSliderModal from "../Home/StoriesSliderModal";
import ScrollToTop from "../helper/ScrollToTop";
import SingleProductOrders from "../Ecom/Product/SingleProductOrders";
import ProductGallery from "../Ecom/Product/ProductGallery";
import { onMessageListener } from "../../firebase";
import NewExploreIndex from "../Post/NewExplore/NewExploreIndex";
import NewExploreCategoryIndex from "../Post/NewExplore/NewExploreCategoryIndex";
import LiveStreamingIndex from "../LiveStreaming/LiveStreamingIndex";
import LiveStreamingFreeUser from "../LiveStreaming/LiveStreamingFreeUser";
import LiveStreamingPaidUser from "../LiveStreaming/LiveStreamingPaidUser";
import LiveStreamingFreeModal from "../LiveStreaming/Modal/LiveStreamingFreeModal";
import LiveStreamingPaidModal from "../LiveStreaming/Modal/LiveStreamingPaidModal";
import NewVideoCallIndex from "../VideoAudioCall/NewVideoCallIndex";
import NewAudioCallIndex from "../VideoAudioCall/NewAudioCallIndex";
import NewAudioCallChatIndex from "../VideoAudioCall/NewAudioCallChatIndex";
import NewAudioCallChatUserDetailsIndex from "../VideoAudioCall/NewAudioCallChatUserDetailsIndex";
import NewHomeIndex from "../NewHome/NewHomeIndex";

import AllLiveStreaming from "../LiveStreaming/AllLiveStreaming";
import NewJoinLiveVideoIndex from "../LiveStreaming/NewJoinLiveVideoIndex";
import NewSingleCommentIndex from "../NewHome/NewSingleView/NewSingleCommentIndex";
import NewEcomIndex from "../NewEcom/NewEcomIndex";
import NewChatIndex from "../Chat/NewChatIndex";
import MobileChatRoom from "../Chat/MobileChatRoom";
import VideoAudioCallRequestIndex from "../LiveStreaming/VideoAudioCallRequest/VideoAudioCallRequestIndex";
import NewWalletIndex from "../NewWallet/NewWalletIndex";
import AdminBookingList from "../Accounts/Profile/AdminBookingList";
import ScheduleCalendar from "../Accounts/Profile/ScheduleCalendar";
import NewLandingPageIndex from "../NewLandingPage/NewLandingPageIndex";
import LandingLayout from "../layouts/LandingLayout";
import UserVirtualDetails from "../Accounts/Profile/UserVirtualDetails";
import NewLiveVideosIndex from "../VirtualExperience/NewLiveVideosIndex";
import VitrualExperienceList from "../Accounts/Profile/VitrualExperienceList";
import NewJoinVEIndex from "../VirtualExperience/NewJoinVEIndex";
import HomeLoader from "../Loader/HomeLoader";
import PageLoader from "../Loader/PageLoader";

setTranslations({ en, es });

const history = createHistory();
const $ = window.$;

const AppRoute = ({
  component: Component,
  layout: Layout,
  screenProps: ScreenProps,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => (
      <Layout screenProps={ScreenProps} {...props}>
        <Component {...props} />
      </Layout>
    )}
    isAuthed
  />
);

const PrivateRoute = ({
  component: Component,
  layout: Layout,
  screenProps: ScreenProps,
  authentication,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      authentication === true ? (
        <Layout screenProps={ScreenProps}>
          <Component {...props} authRoute={true} />
        </Layout>
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

class App extends Component {
  constructor(props) {
    super(props);
    let userId = localStorage.getItem("userId");
    let accessToken = localStorage.getItem("accessToken");
    this.state = {
      loading: true,
      configLoading: true,
      authentication: userId && accessToken ? true : false,
    };

    history.listen((location, action) => {
      userId = localStorage.getItem("userId");

      accessToken = localStorage.getItem("accessToken");

      this.setState({
        loading: true,
        authentication: userId && accessToken ? true : false,
      });

      document.body.scrollTop = 0;
    });
  }

  componentDidMount() {
    this.fetchConfig();
    let userLanguage = localStorage.getItem("lang")
      ? localStorage.getItem("lang")
      : "en";
    // console.log(userLanguage);
    localStorage.setItem("lang", userLanguage);
    setLanguage(userLanguage);
  }

  async fetchConfig() {
    try {
      const response = await fetch(apiConstants.settingsUrl);
      const configValue = await response.json();

      configuration.set({ configData: configValue.data }, { freeze: false });
      //  console.log(configValue.data);
      this.setState({ configLoading: false });
    } catch (error) {
      configuration.set({ configData: [] }, { freeze: false });
      this.setState({ configLoading: false });
    }

    $("#google_analytics").html(
      configuration.get("configData.google_analytics")
    );

    $("#header_scripts").html(configuration.get("configData.header_scripts"));

    $("#body_scripts").html(configuration.get("configData.body_scripts"));
  }

  render() {
    const isLoading = this.state.configLoading;

    return (
      <>
        {isLoading ? (
          <PageLoader />
        ) : (
          <React.Fragment>
            <Helmet>
              <title>{configuration.get("configData.site_name")}</title>
              <link
                rel="icon"
                type="image/png"
                href={configuration.get("configData.site_icon")}
                // sizes="16x16"
              />
            </Helmet>
            <ScrollToTop />
            <Switch>
              <AppRoute
                path={"/"}
                component={NewLandingPageIndex}
                exact
                layout={AuthLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/old-home"}
                component={HomePageIndex}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/inbox-old"}
                component={UserChatIndex}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/add-post"}
                component={CreatePostIndex}
                layout={MainLayout}
              />
              <PrivateRoute
                authentication={this.state.authentication}
                path={"/old-post/:post_unique_id"}
                component={PostView}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/bookmarks"}
                component={BookmarksIndex}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/bookmark-photo"}
                component={BookmarkPhoto}
                layout={MainLayout}
              />
              <PrivateRoute
                authentication={this.state.authentication}
                path={"/bookmark-video"}
                component={BookmarkVideo}
                layout={MainLayout}
              />
              <PrivateRoute
                authentication={this.state.authentication}
                path={"/bookmark-audio"}
                component={BookmarkAudio}
                layout={MainLayout}
              />
              <PrivateRoute
                authentication={this.state.authentication}
                path={"/following"}
                component={FollowingIndex}
                layout={MainLayout}
              />
              <PrivateRoute
                authentication={this.state.authentication}
                path={"/fans"}
                component={FanIndex}
                layout={MainLayout}
              />
              <PrivateRoute
                authentication={this.state.authentication}
                path={"/blocked-users"}
                component={BlockedUserIndex}
                layout={MainLayout}
              />
              <PrivateRoute
                authentication={this.state.authentication}
                path={"/favorites"}
                component={FavoritesIndex}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/list"}
                component={ListIndex}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/edit-profile"}
                component={EditProfile}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/old-profile"}
                component={OldProfileIndex}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/notification"}
                component={NotificationIndex}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/payments"}
                component={PaymentsIndex}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/billing-accounts"}
                component={BillingAccountIndex}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/cards"}
                component={CardsIndex}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/add-bank"}
                component={AddBankIndex}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/banking"}
                component={BankingIndex}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/wallet"}
                component={Wallet}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/document-upload"}
                component={DocumentUploadIndex}
                layout={MainLayout}
              />

              <AppRoute
                path={"/page/:title"}
                component={StaticPage}
                layout={AuthLayout}
              />

              <AppRoute
                path={"/reset-password/:token"}
                component={ResetPassword}
                layout={AuthLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/upload-profile-picture"}
                component={UploadProfilePicture}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/user-chat"}
                component={UserChatIndex}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/user-chat-room/:from_user_id/:to_user_id"}
                component={UserChatMobileRoom}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/video-calls-sent"}
                component={VideoCallRequestSentIndex}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/video-calls-history"}
                component={VideoCallHistoryIndex}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/audio-calls-sent"}
                component={AudioCallRequestSentIndex}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/audio-calls-received"}
                component={AudioCallRequestReceivedIndex}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/audio-calls-history"}
                component={AudioCallHistoryIndex}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/old-explore"}
                component={ExploreIndex}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/stories"}
                component={StoriesIndex}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/video-calls-received"}
                component={VideoCallRequestReceivedIndex}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/category-listing"}
                component={CategoryListingIndex}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/private-call/:video_call_request_unique_id"}
                component={VideoCallIndex}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/private-audio-call/:audio_call_request_unique_id"}
                component={AudioCallIndex}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/single-profile"}
                component={SingleProfile}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/live-videos-history"}
                component={LiveVideosIndex}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/live-video/:live_video_unique_id"}
                component={SingleLiveVideosIndex}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/live-videos-old"}
                component={UserLiveVideosIndex}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/join/:live_video_unique_id"}
                component={JoinLiveVideoIndex}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/join-live/:live_video_unique_id"}
                component={NewJoinLiveVideoIndex}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/join-virtual-experience/:virtual_experience_unique_id"}
                component={NewJoinVEIndex}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/referrals"}
                component={ReferralsIndex}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/logout"}
                component={Logout}
                layout={AuthLayout}
              />
              <PrivateRoute
                authentication={this.state.authentication}
                path={"/category/:category_unique_id"}
                component={CategoryUsers}
                layout={MainLayout}
              />
              <PrivateRoute
                authentication={this.state.authentication}
                path={"/dashboard"}
                component={DashboardContentCreator}
                layout={MainLayout}
              />
              <PrivateRoute
                authentication={this.state.authentication}
                path={"/become-a-content-creator"}
                component={BecomeAContentCreatorIndex}
                layout={MainLayout}
              />
              <PrivateRoute
                authentication={this.state.authentication}
                path={"/ecom"}
                component={EcomIndex}
                layout={MainLayout}
              />
              <PrivateRoute
                authentication={this.state.authentication}
                path={"/ecom-cart"}
                component={EcomCartIndex}
                layout={MainLayout}
              />
              <PrivateRoute
                authentication={this.state.authentication}
                path={"/ecom-payment"}
                component={EcomPaymentIndex}
                layout={MainLayout}
              />
              <PrivateRoute
                authentication={this.state.authentication}
                path={"/ecom-payment-method"}
                component={EcomPaymentMethod}
                layout={MainLayout}
              />
              <PrivateRoute
                authentication={this.state.authentication}
                path={"/ecom-category/:search_key"}
                component={EcomCategoryIndex}
                layout={MainLayout}
              />
              <PrivateRoute
                authentication={this.state.authentication}
                path={"/single-product/:product_unique_id"}
                component={SingleProduct}
                layout={MainLayout}
              />
              <PrivateRoute
                authentication={this.state.authentication}
                path={"/add-product"}
                component={AddProduct}
                layout={MainLayout}
              />
              <PrivateRoute
                authentication={this.state.authentication}
                path={"/edit-product/:user_product_id"}
                component={EditProduct}
                layout={MainLayout}
              />
              <PrivateRoute
                authentication={this.state.authentication}
                path={"/product-list"}
                component={ProductList}
                layout={MainLayout}
              />
              <PrivateRoute
                authentication={this.state.authentication}
                path={"/order-list"}
                component={OrderList}
                layout={MainLayout}
              />
              <PrivateRoute
                authentication={this.state.authentication}
                path={"/order-view/:id"}
                component={OrderView}
                layout={MainLayout}
              />
              <PrivateRoute
                authentication={this.state.authentication}
                path={"/order-transaction"}
                component={OrderTransaction}
                layout={MainLayout}
              />
              <AppRoute
                path={"/verification"}
                component={VerificationIndex}
                layout={AuthLayout}
              />

              <AppRoute
                path={"/register/verify"}
                component={RegisterVerifyIndex}
                layout={AuthLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/view-order/:u_id/:id"}
                component={SingleProductOrders}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/product-gallery/:u_id/:id"}
                component={ProductGallery}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/profile"}
                component={ProfileIndex}
                layout={MainLayout}
              />
              <PrivateRoute
                authentication={this.state.authentication}
                path={"/admin-booking-list"}
                component={AdminBookingList}
                layout={MainLayout}
              />
              <PrivateRoute
                authentication={this.state.authentication}
                path={"/schedule-calendar"}
                component={ScheduleCalendar}
                layout={MainLayout}
              />
              <PrivateRoute
                authentication={this.state.authentication}
                path={"/user-created-list"}
                component={VitrualExperienceList}
                layout={MainLayout}
              />
              <PrivateRoute
                authentication={this.state.authentication}
                path={"/creator-booking-list"}
                component={VitrualExperienceList}
                layout={MainLayout}
              />
              <PrivateRoute
                authentication={this.state.authentication}
                path={"/user-virtual-details/:unique_id"}
                component={UserVirtualDetails}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/new-landing-page"}
                component={NewLandingPageIndex}
                layout={LandingLayout}
              />
              <PrivateRoute
                authentication={this.state.authentication}
                path={"/old-edit-profile"}
                component={OldEditProfile}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/mobile-edit-profile"}
                component={MobileEditProfileIndex}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/change-password"}
                component={ChangePassword}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/delete-account"}
                component={DeleteAccount}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/two-step-auth"}
                component={TwoStepAuthentication}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/session-management"}
                component={SessionManagement}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/availability-status"}
                component={AvailabilityStatus}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/hide-followers"}
                component={HideFollowers}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/explore"}
                component={NewExploreIndex}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/explore-categories"}
                component={NewExploreCategoryIndex}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/live-videos/:type"}
                component={AllLiveStreaming}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/live-videos"}
                component={LiveStreamingIndex}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/live-streaming-free-user"}
                component={LiveStreamingFreeUser}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/live-streaming-paid-user"}
                component={LiveStreamingPaidUser}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/live-streaming-free-modal"}
                component={LiveStreamingFreeModal}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/live-streaming-paid-modal"}
                component={LiveStreamingPaidModal}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/video-call/:video_call_request_unique_id"}
                component={NewVideoCallIndex}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/audio-call/:audio_call_request_unique_id"}
                component={NewAudioCallIndex}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/audio-call-chat"}
                component={NewAudioCallChatIndex}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/audio-call-chat-user"}
                component={NewAudioCallChatUserDetailsIndex}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/home"}
                component={NewHomeIndex}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/post/:post_unique_id"}
                component={NewSingleCommentIndex}
                layout={MainLayout}
              />
              <PrivateRoute
                authentication={this.state.authentication}
                path={"/new-ecom"}
                component={NewEcomIndex}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/inbox"}
                component={NewChatIndex}
                layout={MainLayout}
                showFooter={false}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/chat-room"}
                component={MobileChatRoom}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/request-page"}
                component={VideoAudioCallRequestIndex}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/new-wallet"}
                component={NewWalletIndex}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/new-landing-page"}
                component={NewLandingPageIndex}
                layout={LandingLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/new-live-videos"}
                component={NewLiveVideosIndex}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/personalized-request/:id"}
                component={PersonalizedRequest}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/personal-request-table"}
                component={PersonalRequestTable}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/delivery-address"}
                component={AddDeliveryAddress}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/product-details/:uniqueId"}
                component={ProductDetails}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/your-address"}
                component={DeliveryAddressList}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/creater-flow-table"}
                component={CreaterFlowTable}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/creater-product-detail/:id"}
                component={CreaterProductDetail}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/creater-flow-product/"}
                component={CreaterFlowProduct}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/go-live-product"}
                component={GoLiveProduct}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/product-stream"}
                component={ProductStream}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/product-onlive-stream/:id"}
                component={ProductOnliveStream}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/live-history-detail"}
                component={LiveHistoryTable}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/order-placed-detail"}
                component={OrderPlacedDetail}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/order-recieved-detail/:unique_id"}
                component={OrderRecievedDetail}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/single-order-view/:unique_id"}
                component={SingleOrderView}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/order-product-detail/:id"}
                component={OrderProductDetail}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/lives-stream-orders-table"}
                component={LiveStreamOrdersTable}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/lives-stream-order-product"}
                component={LiveStreamOrderProduct}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/create-coupon"}
                component={CreateCoupon}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/edit-coupon/:promo_code_unique_id"}
                component={CreateCoupon}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/coupon-details-table"}
                component={CouponDetailsTable}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/premium-folder-detail"}
                component={PremiumFolderDetail}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/premium-folder-file"}
                component={PremiumFolderFile}
                layout={MainLayout}
              />

              <PrivateRoute
                authentication={this.state.authentication}
                path={"/favorite-list"}
                component={FavoriteList}
                layout={MainLayout}
              />

              {/* Dont move this route to top */}
              <AppRoute
                authentication={this.state.authentication}
                path={"/:username"}
                component={SingleProfile}
                layout={OtherProfileLayout}
              />
              <Route path="*" component={NotFoundIndex} />
            </Switch>
          </React.Fragment>
        )}
      </>
    );
  }
}

export default App;
