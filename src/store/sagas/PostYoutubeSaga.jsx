import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";
import { createNotification } from "react-redux-notify";
import {
    getSuccessNotificationMessage,
    getErrorNotificationMessage,
} from "../../components/helper/NotificationMessage";
import {
    postYoutubeLinkSuccess,
    postYoutubeLinkFailure
} from "../actions/PostYoutubeAction";

import {
    POST_YOUTUBE_LINK_START
} from "../actions/ActionConstant";
import {
    checkLogoutStatus,
} from "../actions/ErrorAction";

function* postYoutubeLinkAPI(action) {
    try {
        const response = yield api.postMethod("fav_users", action.data);
        if (response.data.success) {
            yield put(postYoutubeLinkSuccess(response.data));
            const notificationMessage = getSuccessNotificationMessage(response.data.message);
            yield put(createNotification(notificationMessage));
        } else {
            yield put(postYoutubeLinkFailure(response.data.error));
            const notificationMessage = getErrorNotificationMessage(response.data.error);
            yield put(createNotification(notificationMessage));
        }
    } catch (error) {
        yield put(postYoutubeLinkFailure(error));
        const notificationMessage = getErrorNotificationMessage(error.message);
        yield put(createNotification(notificationMessage));
    }
}



export default function* PostYoutubeSaga() {
    yield all([yield takeLatest(POST_YOUTUBE_LINK_START, postYoutubeLinkAPI)]);
}
