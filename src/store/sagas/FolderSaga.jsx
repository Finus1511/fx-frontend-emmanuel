import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";
import { createNotification } from "react-redux-notify";
import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../../components/helper/NotificationMessage";

import {
  createFolderSuccess,
  createFolderFailure,
  folderUserListSuccess,
  folderUserListFailure,
  downloadFolderFileSuccess,
  downloadFolderFileFailure,
  deleteFolderFileSuccess,
  deleteFolderFileFailure,
} from "../actions/FolderAction";

import {
  CREATE_FOLDER_START,
  FOLDER_USER_LIST_START,
  MORE_FOLDER_USER_LIST_START,
  DOWNLOAD_FOLDER_FILE_START,
  DELETE_FOLDER_FILE_START,
} from "../actions/ActionConstant";

function* createFolderAPI(action) {
  try {
    const response = yield api.postMethod("fav_users", action.data);
    if (response.data.success) {
      yield put(createFolderSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(response.data.message);
      yield put(createNotification(notificationMessage));
    } else {
      yield put(createFolderFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(response.data.error);
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(createFolderFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* folderUserListAPI(action) {
  try {
    const response = yield api.postMethod("fav_users", action.data);
    if (response.data.success) {
      yield put(folderUserListSuccess(response.data.data));
    } else {
      yield put(folderUserListFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(response.data.error);
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(folderUserListFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* downloadFolderFileAPI(action) {
  try {
    const response = yield api.postMethod("fav_users", action.data);
    if (response.data.success) {
      yield put(downloadFolderFileSuccess(response.data.data));
    } else {
      yield put(downloadFolderFileFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(response.data.error);
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(downloadFolderFileFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* deleteFolderFileAPI(action) {
  try {
    const response = yield api.postMethod("fav_users", action.data);
    if (response.data.success) {
      yield put(deleteFolderFileSuccess(response.data.data));
    } else {
      yield put(deleteFolderFileFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(response.data.error);
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(deleteFolderFileFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

export default function* FolderSaga() {
  yield all([yield takeLatest(CREATE_FOLDER_START, createFolderAPI)]);
  yield all([yield takeLatest(FOLDER_USER_LIST_START, folderUserListAPI)]);
  yield all([yield takeLatest(MORE_FOLDER_USER_LIST_START, folderUserListAPI)]);
  yield all([yield takeLatest(DOWNLOAD_FOLDER_FILE_START, downloadFolderFileAPI)]);
  yield all([yield takeLatest(DELETE_FOLDER_FILE_START, deleteFolderFileAPI)]);
}
