import { combineReducers } from "redux";

import UserReducer from "./UserReducer";
import ChangePasswordReducer from "./ChangePasswordReducer";
import notifyReducer from "react-redux-notify";
import SubscriptionReducer from "./SubscriptionReducer";
import CardsReducer from "./CardsReducer";
import BankAccountReducer from "./BankAccountReducer";
import KycDocumentReducer from "./KycDocumentReducer";
import WalletReducer from "./WalletReducer";
import TransactionReducer from "./TransactionReducer";
import WithDrawReducer from "./WithDrawReducer";
import PageReducer from "./PageReducer";
import ErrorReducer from "./ErrorReducer";
import ProductOwnerReducer from "./ProductOwnerReducer";
import PostReducer from "./PostReducer";
import FollowReducer from "./FollowReducer";
import VerificationDocumentReducer from "./VerificationDocumentReducer";
import CommentsReducer from "./CommentsReducer";
import FavReducer from "./FavReducer";
import BookmarkReducer from "./BookmarkReducer";
import SendTipReducer from "./SendTipReducer";
import HomeReducer from "./HomeReducer";
import OtherUserReducer from "./OtherUserReducer";
import PostLikesReducer from "./PostLikesReducer";
import ChatReducer from "./ChatReducer";
import CommunityReducer from "./CommunityReducer";
import NotificationReducer from "./NotificationReducer";
import VideoCallReducer from "./VideoCallReducer";
import LiveVideoReducer from "./LiveVideoReducer";
import PrivateCallReducer from "./PrivateCallReducer";
import CategoryReducer from "./CategoryReducer";
import ReferralReducer from "./ReferralReducer";
import ChatAssetReducer from "./ChatAssetReducer";
import UserCategoryReducer from "./UserCategoryReducer";
import StoriesReducer from "./StoriesReducer";
import ProductsReducer from "./ProductsReducer";
import VodVideosReducer from "./VodVideosReducer";
import SessionReducer from "./SessionReducer";
import UserVirualReducer from "./UserVirtualReducer";
import UserOneOnOneVEReducer from "./UserOneOnOneVEReducer";
import CreatorVirualReducer from "./CreatorVirtualReducer";
import CreatorOneOnOneVEReducer from "./CreatorOneOnOneVEReducer";
import UserVipVEReducer from "./UserVipVEReducer";
import CreatorVipVEReducer from "./CreatorVipVEReducer";
import PersonalizeReducer from "./PersonalizeReducer";
import ProductLiveStreamReducer from "./ProductLiveStreamReducer";
import PremiumFolderReducer from "./PremiumFolderReducer";
import FavoriteReducer from "./FavoriteReducer";
import PostYoutubeReducer from "./PostYoutubeReducer";
import FolderReducer from "./FolderReducer";

export default combineReducers({
  users: UserReducer,
  changePassword: ChangePasswordReducer,
  notifications: notifyReducer,
  subscriptions: SubscriptionReducer,
  cards: CardsReducer,
  bankAccount: BankAccountReducer,
  kycDocument: KycDocumentReducer,
  wallet: WalletReducer,
  transaction: TransactionReducer,
  withDraw: WithDrawReducer,
  page: PageReducer,
  errorDetails: ErrorReducer,
  proOwner: ProductOwnerReducer,
  post: PostReducer,
  follow: FollowReducer,
  docs: VerificationDocumentReducer,
  comment: CommentsReducer,
  fav: FavReducer,
  bookmark: BookmarkReducer,
  tip: SendTipReducer,
  home: HomeReducer,
  otherUser: OtherUserReducer,
  postLike: PostLikesReducer,
  chat: ChatReducer,
  community: CommunityReducer,
  notification: NotificationReducer,
  videocall: VideoCallReducer,
  liveVideo: LiveVideoReducer,
  privateCall: PrivateCallReducer,
  category: CategoryReducer,
  referral: ReferralReducer,
  chatAsset: ChatAssetReducer,
  userCategory: UserCategoryReducer,
  userStories: StoriesReducer,
  userProducts: ProductsReducer,
  vodVideos: VodVideosReducer,
  sessions: SessionReducer,
  userVirtual: UserVirualReducer,
  userOneOnOneVirtual: UserOneOnOneVEReducer,
  creatorVirtual: CreatorVirualReducer,
  creatorOneOnOneVE: CreatorOneOnOneVEReducer,
  userVipVirtual: UserVipVEReducer,
  creatorVipVE: CreatorVipVEReducer,
  personalize: PersonalizeReducer,
  productLiveStream: ProductLiveStreamReducer,
  folder: PremiumFolderReducer,
  favorite: FavoriteReducer,
  postYoutube: PostYoutubeReducer,
  folderUser: FolderReducer,
});
