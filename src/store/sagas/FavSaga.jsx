import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";
import { createNotification } from "react-redux-notify";
import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../../components/helper/NotificationMessage";
import {
  deleteFavFailure,
  deleteFavSuccess,
  fetchFavFailure,
  fetchFavSuccess,
  saveFavFailure,
  saveFavSuccess,
} from "../actions/FavAction";
import {
  DELETE_FAV_START,
  FETCH_FAV_START,
  FETCH_MORE_FAV_START,
  SAVE_FAV_START,
} from "../actions/ActionConstant";
import {
  checkLogoutStatus,
} from "../actions/ErrorAction";

function* fetchFavAPI(action) {
  let favListData = yield select((state) => state.fav.fav.data);
  try {
    const response = yield api.postMethod("fav_users",action.data);
    if (response.data.success) {
      if (Object.keys(favListData).length > 0) {
        yield put(fetchFavSuccess({
          fav_users: [...favListData.fav_users, ...response.data.data.fav_users],
          total: response.data.data.total
        }));
      } else {
        yield put(fetchFavSuccess(response.data.data));
      }
    } else {
      yield put(fetchFavFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchFavFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* saveFavAPI() {
  try {
    const inputData = yield select((state) => state.fav.saveFav.inputData);
    const response = yield api.postMethod("fav_users_save", inputData);
    if (response.data.success) {
      yield put(saveFavSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(saveFavFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(saveFavFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* deleteFavAPI() {
  try {
    const inputData = yield select((state) => state.fav.deleteFav.inputData);
    const response = yield api.postMethod("fav_users_delete", inputData);
    if (response.data.success) {
      yield put(deleteFavSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    } else {
      yield put(deleteFavFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(deleteFavFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

export default function* pageSaga() {
  yield all([yield takeLatest(FETCH_FAV_START, fetchFavAPI)]);
  yield all([yield takeLatest(FETCH_MORE_FAV_START, fetchFavAPI)]);
  yield all([yield takeLatest(SAVE_FAV_START, saveFavAPI)]);
  yield all([yield takeLatest(DELETE_FAV_START, deleteFavAPI)]);
}
