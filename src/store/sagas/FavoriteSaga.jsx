import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";
import { createNotification } from "react-redux-notify";
import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../../components/helper/NotificationMessage";
import {
  fetchFavoriteListSuccess,
  fetchFavoriteListFailure,
  addFavoriteSuccess,
  addFavoriteFailure,
  deleteFavoiteSuccess,
  deleteFavoiteFailure
} from "../actions/FavoriteAction";

import {
  FAVORITE_LIST_START,
  ADD_FAVORITE_START,
  DELETE_FAVORITE_START,
  MORE_FAVORITE_LIST_START
} from "../actions/ActionConstant";
import {
  checkLogoutStatus,
} from "../actions/ErrorAction";

function* fetchFavoriteListAPI(action) {
  try {
    const response = yield api.postMethod("fav_users", action.data);
    if (response.data.success) {
      yield put(fetchFavoriteListSuccess(response.data.data));
    } else {
      yield put(fetchFavoriteListFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(response.data.error);
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchFavoriteListFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* addFavoriteAPI(action) {
  let favoriteListData = yield select((state) => state.favorite.favoriteList.data);
  try {
    const response = yield api.postMethod("fav_users_save", action.data);
    if (response.data.success) {
      yield put(addFavoriteSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(response.data.message);
      yield put(createNotification(notificationMessage));
      if (Object.keys(favoriteListData).length > 0) {
        yield put(fetchFavoriteListSuccess({
          ...favoriteListData,
          fav_users: favoriteListData.fav_users.filter(follower =>
            (follower.fav_user_id != action.data.user_id)),
        }));
      }
    } else {
      yield put(addFavoriteFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(response.data.error);
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(addFavoriteFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* deleteFavoriteAPI(action) {
  try {
    const response = yield api.postMethod("fav_users_delete", action.data);
    if (response.data.success) {
      yield put(deleteFavoiteSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(response.data.message);
      yield put(createNotification(notificationMessage));
    } else {
      yield put(deleteFavoiteFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(response.data.error);
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(deleteFavoiteFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}


export default function* FavoriteSaga() {
  yield all([yield takeLatest(FAVORITE_LIST_START, fetchFavoriteListAPI)]);
  yield all([yield takeLatest(MORE_FAVORITE_LIST_START, fetchFavoriteListAPI)]);
  yield all([yield takeLatest(ADD_FAVORITE_START, addFavoriteAPI)]);
  yield all([yield takeLatest(DELETE_FAVORITE_START, deleteFavoriteAPI)]);
}
