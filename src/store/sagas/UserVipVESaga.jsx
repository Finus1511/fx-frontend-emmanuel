import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";

import {
	USER_VIP_VE_BOOKING_LIST_START,
	USER_VIP_VE_BOOKING_VIEW_START,
	USER_VIP_VE_BOOKING_CANCEL_START,
	USER_VIP_VE_LIST_START,
	USER_VIP_VE_VIEW_START,
	USER_VIP_VE_BOOKING_START,

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
	userVirtualVhListSuccess,
	userVirtualVhListFailure,
	userVirtualVhViewSuccess,
	userVirtualVhViewFailure,
	userVirtualVhBookingSuccess,
	userVirtualVhBookingFailure,
} from "../actions/UserVipVEAction";


function* fetchUserBookingListAPI() {
	try {
		const response = yield api.postMethod("user_vip_ve_bookings/list");

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
		const response = yield api.postMethod("user_vip_ve_bookings/view", action.data);

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
		const response = yield api.postMethod("user_vip_ve_bookings/cancel", action.data);

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

function* userVirtualVhListAPI(action) {
	try {
		const response = yield api.postMethod("user_vip_ve_bookings/other_user_virtual_experience_list", action.data);

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
		const response = yield api.postMethod("user_vip_ve/view", action.data);

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
		const response = yield api.postMethod("user_vip_ve/book", action.data);

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

export default function* UserVipVESaga() {
	yield all([yield takeLatest(USER_VIP_VE_BOOKING_LIST_START, fetchUserBookingListAPI)]);
	yield all([yield takeLatest(USER_VIP_VE_BOOKING_VIEW_START, fetchUserBookingViewAPI)]);
	yield all([yield takeLatest(USER_VIP_VE_BOOKING_CANCEL_START, userBookingCancelAPI)]);
	yield all([yield takeLatest(USER_VIP_VE_LIST_START, userVirtualVhListAPI)]);
	yield all([yield takeLatest(USER_VIP_VE_VIEW_START, userVirtualVhViewAPI)]);
	yield all([yield takeLatest(USER_VIP_VE_BOOKING_START, userVirtualVhBookingAPI)]);
}
