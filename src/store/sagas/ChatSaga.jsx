import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";
import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../../components/helper/NotificationMessage";
import {
  BROADCAST_MESSAGE_START,
  CHAT_ASSET_FILES_UPLOAD_START,
  CHAT_BROADCAST_ASSET_SAVE_START,
  CHAT_MESSAGE_DELETE_START,
  FETCH_CHAT_ASSETS_START,
  FETCH_CHAT_MESSAGES_START,
  FETCH_CHAT_USERS_START,
  FETCH_MORE_CHAT_MESSAGES_START,
  FETCH_MORE_CHAT_USERS_START,
  FETCH_MORE_USER_CHAT_ASSETS_START,
  FETCH_USER_CHAT_ASSETS_START,
  SAVE_CHAT_USERS_START,
  CHAT_MESSAGE_PAYMENT_BY_WALLET_START,
} from "../actions/ActionConstant";
import {
  broadcastMessageFailure,
  broadcastMessageSuccess,
  chatAssetFilesUploadFailure,
  chatAssetFilesUploadSuccess,
  chatBroadcastAssetSaveFailure,
  chatBroadcastAssetSaveSuccess,
  chatMessageDeleteFailure,
  chatMessageDeleteSuccess,
  chatUser,
  fetchChatMessagesFailure,
  fetchCHatMessagesSuccess,
  fetchChatUsersFailure,
  fetchChatUsersStart,
  fetchChatUsersSuccess,
  fetchUserChatAssetsFailure,
  fetchUserChatAssetsSuccess,
  saveChatUserFailure,
  saveChatUserSuccess,
  chatMessagePaymentByWalletSuccess,
  chatMessagePaymentByWalletFailure,
} from "../actions/ChatAction";
import { createNotification } from "react-redux-notify";
import store from '../index';

function* fetchChatUserAPI(action) {
  let chatUsersData = yield select((state) => state.chat.chatUsers.data);
  try {
    const response = yield api.postMethod("chat_users", action.data);
    if (response.data.success) {
      if (Object.keys(chatUsersData).length > 0) {
        yield put(fetchChatUsersSuccess({
          users: [...chatUsersData.users, ...response.data.data.users],
          total: response.data.data.total
        }));
      } else {
        yield put(fetchChatUsersSuccess(response.data.data));
      }
    } else {
      yield put(fetchChatUsersFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(response.data.error);
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchChatUsersFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* fetchChatAssetsAPI(action) {
  try {
    const response = yield api.postMethod("user_chat_assets", action.data);
    if (response.data.success) {
      yield put(fetchUserChatAssetsSuccess(response.data.data));
    } else {
      yield put(fetchUserChatAssetsFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(response.data.error);
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchUserChatAssetsFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* fetchChatMessagesAPI(action) {
  try {
    const response = yield api.postMethod("chat_messages_index", {
      ...action.data,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
    if (response.data.success) {
      yield put(fetchCHatMessagesSuccess(response.data.data));
    } else {
      yield put(fetchChatMessagesFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(response.data.error);
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchChatMessagesFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* saveChatUserAPI(action) {
  try {
    const response = yield api.postMethod("chat_users_save", action.data);
    if (response.data.success) {
      yield put(saveChatUserSuccess(response.data.data));
      yield put(chatUser(response.data.data.to_user));
    } else {
      yield put(saveChatUserFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(response.data.error);
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(saveChatUserFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* chatAssetFilesUploadAPI(action) {
  try {
    const response = yield api.postMethod("chat_asset_files_upload", action.data);
    if (response.data.success) {
      yield put(chatAssetFilesUploadSuccess(response.data.data));
    } else {
      yield put(chatAssetFilesUploadFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(response.data.error);
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(chatAssetFilesUploadFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* broadcastMessageAPI(action) {
  try {
    const response = yield api.postMethod("send_bulk_message", action.data);
    if (response.data.success) {
      yield put(broadcastMessageSuccess(response.data.data));
      yield put(fetchChatUsersStart());
      const notificationMessage = getSuccessNotificationMessage(response.data.message);
      yield put(createNotification(notificationMessage));
    } else {
      yield put(broadcastMessageFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(response.data.error);
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(broadcastMessageFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* chatMessageDeleteAPI(action) {
  try {
    const response = yield api.postMethod(`chat_assets_delete`, action.data);
    if (response.data.success) {
      yield put(chatMessageDeleteSuccess(response.data.data));
      // yield put(fetchCHatMessagesSuccess(response.data.data.chat_messages.data));
      const notificationMessage = getSuccessNotificationMessage(response.data.message);
      yield put(createNotification(notificationMessage));
    } else {
      yield put(chatMessageDeleteFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(response.data.error);
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(chatMessageDeleteFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* chatBroadcastAssetSaveAPI(action) {
  try {
    const response = yield api.postMethod(`chat_asset_broadcast_files_upload`, action.data);
    if (response.data.success) {
      yield put(chatBroadcastAssetSaveSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(response.data.message);
      yield put(createNotification(notificationMessage));
    } else {
      yield put(chatBroadcastAssetSaveFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(response.data.error);
      yield put(chatBroadcastAssetSaveFailure(notificationMessage));
    }
  } catch (error) {
    yield put(chatMessageDeleteFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* chatMessagePaymentByWalletAPI(action) {
  let chatUsersData = yield select((state) => state.chat.chatUsers.data);
  let chatUserData = yield select((state) => state.chat.chatUser);
  try {
    const response = yield api.postMethod("chat_message_payment_by_wallet", action.data);
    if (response.data.success) {
      yield put(chatMessagePaymentByWalletSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(response.data.message);
      yield put(createNotification(notificationMessage));
      if (Object.keys(chatUsersData).length > 0) {
        yield put(fetchChatUsersSuccess({
          ...chatUsersData,
          users: chatUsersData.users.map(user =>
            user.from_user_id == response.data.data.user_id
              ? {
                ...user, is_user_needs_pay: 0
              } : user
          )
        }));
        store.dispatch(chatUser({
          ...chatUserData,
          is_user_needs_pay: 0
        }))
      }
    } else {
      yield put(chatMessagePaymentByWalletFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(response.data.error);
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(chatMessagePaymentByWalletFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

export default function* ChatSaga() {
  yield all([
    yield takeLatest(FETCH_CHAT_USERS_START, fetchChatUserAPI),
    yield takeLatest(FETCH_MORE_CHAT_USERS_START, fetchChatUserAPI),
    yield takeLatest(FETCH_USER_CHAT_ASSETS_START, fetchChatAssetsAPI),
    yield takeLatest(FETCH_MORE_USER_CHAT_ASSETS_START, fetchChatAssetsAPI),
    yield takeLatest(FETCH_CHAT_MESSAGES_START, fetchChatMessagesAPI),
    yield takeLatest(FETCH_MORE_CHAT_MESSAGES_START, fetchChatMessagesAPI),
    yield takeLatest(SAVE_CHAT_USERS_START, saveChatUserAPI),
    yield takeLatest(CHAT_ASSET_FILES_UPLOAD_START, chatAssetFilesUploadAPI),
    yield takeLatest(BROADCAST_MESSAGE_START, broadcastMessageAPI),
    yield takeLatest(CHAT_MESSAGE_DELETE_START, chatMessageDeleteAPI),
    yield takeLatest(CHAT_BROADCAST_ASSET_SAVE_START, chatBroadcastAssetSaveAPI),
    yield takeLatest(CHAT_MESSAGE_PAYMENT_BY_WALLET_START, chatMessagePaymentByWalletAPI)

  ]);
}

