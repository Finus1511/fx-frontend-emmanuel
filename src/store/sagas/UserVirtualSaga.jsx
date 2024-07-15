import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";

import {
    USER_VIRTUAL_BOOKING_LIST_START,
    USER_VIRTUAL_BOOKING_VIEW_START,
    USER_VIRTUAL_BOOKING_CANCEL_START,
    USER_VIRTUAL_BOOKING_JOIN_START,
    USER_VIRTUAL_BOOKING_EXIT_START,
    USER_VIRTUAL_VH_LIST_START,
    USER_VIRTUAL_VH_VIEW_START,
    USER_VIRTUAL_VH_BOOKING_START,

} from "../actions/ActionConstant";

import { createNotification } from "react-redux-notify";
import {
    getSuccessNotificationMessage,
    getErrorNotificationMessage,
} from "../../components/helper/NotificationMessage";

import {
    fetchUserBookingListSuccess,
    fetchUserBookingListFailure,
    fetchUserBookingViewSuccess,
    fetchUserBookingViewFailure,
    userBookingCancelSuccess,
    userBookingCancelFailure,
    userBookingJoinSuccess,
    userBookingJoinFailure,
    userBookingExitSuccess,
    userBookingExitFailure,
    userVirtualVhListSuccess,
    userVirtualVhListFailure,
    userVirtualVhViewSuccess,
    userVirtualVhViewFailure,
    userVirtualVhBookingSuccess,
    userVirtualVhBookingFailure,
} from "../actions/UserVirtualActions";


function* fetchUserBookingListAPI() {
    try {
        const response = yield api.postMethod("user_vh_bookings/list");

        if (response.data.success) {
            yield put(fetchUserBookingListSuccess(response.data));
        } else {
            yield put(fetchUserBookingListFailure(response.data.error));
            const notificationMessage = getErrorNotificationMessage(
                response.data.error
            );
            yield put(createNotification(notificationMessage));
        }
    } catch (error) {
        yield put(fetchUserBookingListFailure(error));
        const notificationMessage = getErrorNotificationMessage(error.message);
        yield put(createNotification(notificationMessage));
    }
}

function* fetchUserBookingViewAPI(action) {
    try {
        const response = yield api.postMethod("user_vh_bookings/view", action.data);

        if (response.data.success) {
            yield put(fetchUserBookingViewSuccess(response.data));
        } else {
            yield put(fetchUserBookingViewFailure(response.data.error));
            const notificationMessage = getErrorNotificationMessage(
                response.data.error
            );
            yield put(createNotification(notificationMessage));
        }
    } catch (error) {
        yield put(fetchUserBookingViewFailure(error));
        const notificationMessage = getErrorNotificationMessage(error.message);
        yield put(createNotification(notificationMessage));
    }
}

function* userBookingCancelAPI(action) {
    try {
        const response = yield api.postMethod("user_vh_bookings/cancel", action.data);

        if (response.data.success) {
            yield put(userBookingCancelSuccess(response.data.data));
        } else {
            yield put(userBookingCancelFailure(response.data.error));
            const notificationMessage = getErrorNotificationMessage(
                response.data.error
            );
            yield put(createNotification(notificationMessage));
        }
    } catch (error) {
        yield put(userBookingCancelFailure(error));
        const notificationMessage = getErrorNotificationMessage(error.message);
        yield put(createNotification(notificationMessage));
    }
}

function* userBookingJoinAPI(action) {
    try {
        const response = yield api.postMethod("user_vh_bookings/join", action.data);

        if (response.data.success) {
            yield put(userBookingJoinSuccess(response.data.data));
        } else {
            yield put(userBookingJoinFailure(response.data.error));
            const notificationMessage = getErrorNotificationMessage(
                response.data.error
            );
            yield put(createNotification(notificationMessage));
        }
    } catch (error) {
        yield put(userBookingJoinFailure(error));
        const notificationMessage = getErrorNotificationMessage(error.message);
        yield put(createNotification(notificationMessage));
    }
}

function* userBookingExitAPI(action) {
    try {
        const response = yield api.postMethod("user_vh_bookings/exit", action.data);

        if (response.data.success) {
            yield put(userBookingExitSuccess(response.data.data));
        } else {
            yield put(userBookingExitFailure(response.data.error));
            const notificationMessage = getErrorNotificationMessage(
                response.data.error
            );
            yield put(createNotification(notificationMessage));
        }
    } catch (error) {
        yield put(userBookingExitFailure(error));
        const notificationMessage = getErrorNotificationMessage(error.message);
        yield put(createNotification(notificationMessage));
    }
}

function* userVirtualVhListAPI(action) {
    try {
        const response = yield api.postMethod("user_vh_bookings/other_user_virtual_experience_list", action.data);

        if (response.data.success) {
            yield put(userVirtualVhListSuccess(response.data.data));
        } else {
            yield put(userVirtualVhListFailure(response.data.error));
            const notificationMessage = getErrorNotificationMessage(
                response.data.error
            );
            yield put(createNotification(notificationMessage));
        }
    } catch (error) {
        yield put(userVirtualVhListFailure(error));
        const notificationMessage = getErrorNotificationMessage(error.message);
        yield put(createNotification(notificationMessage));
    }
}

function* userVirtualVhViewAPI(action) {
    try {
        const response = yield api.postMethod("user_virtual_experiences/view", action.data);

        if (response.data.success) {
            yield put(userVirtualVhViewSuccess(response.data.data));
        } else {
            yield put(userVirtualVhViewFailure(response.data.error));
            const notificationMessage = getErrorNotificationMessage(
                response.data.error
            );
            yield put(createNotification(notificationMessage));
        }
    } catch (error) {
        yield put(userVirtualVhViewFailure(error));
        const notificationMessage = getErrorNotificationMessage(error.message);
        yield put(createNotification(notificationMessage));
    }
}

function* userVirtualVhBookingAPI(action) {
    try {
        const response = yield api.postMethod("user_virtual_experiences/book", action.data);

        if (response.data.success) {
            yield put(userVirtualVhBookingSuccess(response.data.data));
        } else {
            yield put(userVirtualVhBookingFailure(response.data.error));
            const notificationMessage = getErrorNotificationMessage(
                response.data.error
            );
            yield put(createNotification(notificationMessage));
        }
    } catch (error) {
        yield put(userVirtualVhBookingFailure(error));
        const notificationMessage = getErrorNotificationMessage(error.message);
        yield put(createNotification(notificationMessage));
    }
}

export default function* UserVirtualSaga() {
    yield all([yield takeLatest(USER_VIRTUAL_BOOKING_LIST_START, fetchUserBookingListAPI)]);
    yield all([yield takeLatest(USER_VIRTUAL_BOOKING_VIEW_START, fetchUserBookingViewAPI)]);
    yield all([yield takeLatest(USER_VIRTUAL_BOOKING_CANCEL_START, userBookingCancelAPI)]);
    yield all([yield takeLatest(USER_VIRTUAL_BOOKING_JOIN_START, userBookingJoinAPI)]);
    yield all([yield takeLatest(USER_VIRTUAL_BOOKING_EXIT_START, userBookingExitAPI)]);
    yield all([yield takeLatest(USER_VIRTUAL_VH_LIST_START, userVirtualVhListAPI)]);
    yield all([yield takeLatest(USER_VIRTUAL_VH_VIEW_START, userVirtualVhViewAPI)]);
    yield all([yield takeLatest(USER_VIRTUAL_VH_BOOKING_START, userVirtualVhBookingAPI)]);
}
