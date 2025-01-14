import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";
import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../../components/helper/NotificationMessage";
import {
  FETCH_COMMUNITY_USERS_START,
  FETCH_MORE_COMMUNITY_USERS_START,
  FETCH_USER_COMMUNITY_ASSETS_START,
  FETCH_MORE_USER_COMMUNITY_ASSETS_START,
  FETCH_COMMUNITY_MESSAGES_START,
  FETCH_MORE_COMMUNITY_MESSAGES_START,
  COMMUNITY_ASSET_FILES_UPLOAD_START,
  UPDATE_COMMUNITY_DETAILS_START,
  COMMUNITY_MESSAGE_DELETE_START,
} from "../actions/ActionConstant";
import {
  communityAssetFilesUploadFailure,
  communityAssetFilesUploadSuccess,
  fetchCommunityMessagesFailure,
  fetchCommunityMessagesSuccess,
  fetchCommunityUsersFailure,
  fetchCommunityUsersSuccess,
  fetchUserCommunityAssetsFailure,
  fetchUserCommunityAssetsSuccess,
  communityMessageDeleteFailure,
  communityMessageDeleteSuccess,
  updateCommunityDetailsFailure,
  updateCommunityDetailsSuccess,
  communityUser,
} from "../actions/CommunityAction";
import { createNotification } from "react-redux-notify";

function* fetchCommunityUserAPI(action) {
  let communityUsersData = yield select((state) => state.community.communityUsers.data);
  try {
    const response = yield api.postMethod("user_communities", action.data);
    if (response.data.success) {
      if (Object.keys(communityUsersData).length > 0) {
        yield put(fetchCommunityUsersSuccess({
          communities: [...communityUsersData.communities, ...response.data.data.communities],
          total: response.data.data.total
        }));
      } else {
        yield put(fetchCommunityUsersSuccess(response.data.data));
      }
    } else {
      yield put(fetchCommunityUsersFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(response.data.error);
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchCommunityUsersFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* fetchCommunityAssetsAPI(action) {
  try {
    const response = yield api.postMethod("user_community_assets", action.data);
    if (response.data.success) {
      yield put(fetchUserCommunityAssetsSuccess(response.data.data));
    } else {
      yield put(fetchUserCommunityAssetsFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(response.data.error);
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchUserCommunityAssetsFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* fetchCommunityMessagesAPI(action) {
  try {
    const response = yield api.postMethod("community_messages_index", {
      ...action.data,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
    if (response.data.success) {
      yield put(fetchCommunityMessagesSuccess(response.data.data));
    } else {
      yield put(fetchCommunityMessagesFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(response.data.error);
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchCommunityMessagesFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* communityAssetFilesUploadAPI(action) {
  try {
    const response = yield api.postMethod("community_asset_files_upload", action.data);
    if (response.data.success) {
      yield put(communityAssetFilesUploadSuccess(response.data.data));
    } else {
      yield put(communityAssetFilesUploadFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(response.data.error);
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(communityAssetFilesUploadFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* communityMessageDeleteAPI(action) {
  try {
    const response = yield api.postMethod(`community_message_delete`, action.data);
    if (response.data.success) {
      yield put(communityMessageDeleteSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(response.data.message);
      yield put(createNotification(notificationMessage));
    } else {
      yield put(communityMessageDeleteFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(response.data.error);
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(communityMessageDeleteFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* updateCommunityDetailsAPI(action) {
  try {
    let communityUsersData = yield select((state) => state.community.communityUsers.data);
    const response = yield api.postMethod("update_community", action.data);
    if (response.data.success) {
      yield put(updateCommunityDetailsSuccess(response.data.data));
      yield put(communityUser(response.data.data.community))
      if (Object.keys(communityUsersData).length > 0) {
        yield put(fetchCommunityUsersSuccess({
          ...communityUsersData,
          communities: communityUsersData.communities.map((community) => community.community_id === action.data.community_id ? response.data.data.community : community),
        }));
      }
    } else {
      yield put(updateCommunityDetailsFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(response.data.error);
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(updateCommunityDetailsFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

export default function* CommunitySaga() {
  yield all([
    yield takeLatest(FETCH_COMMUNITY_USERS_START, fetchCommunityUserAPI),
    yield takeLatest(FETCH_MORE_COMMUNITY_USERS_START, fetchCommunityUserAPI),
    yield takeLatest(FETCH_USER_COMMUNITY_ASSETS_START, fetchCommunityAssetsAPI),
    yield takeLatest(FETCH_MORE_USER_COMMUNITY_ASSETS_START, fetchCommunityAssetsAPI),
    yield takeLatest(FETCH_COMMUNITY_MESSAGES_START, fetchCommunityMessagesAPI),
    yield takeLatest(FETCH_MORE_COMMUNITY_MESSAGES_START, fetchCommunityMessagesAPI),
    yield takeLatest(COMMUNITY_ASSET_FILES_UPLOAD_START, communityAssetFilesUploadAPI),
    yield takeLatest(UPDATE_COMMUNITY_DETAILS_START, updateCommunityDetailsAPI),
    yield takeLatest(COMMUNITY_MESSAGE_DELETE_START, communityMessageDeleteAPI),
  ]);
}

