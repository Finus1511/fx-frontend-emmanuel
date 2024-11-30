import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";

import {
	CREATOR_VIP_VE_BOOKING_LIST_START,
	CREATOR_VIP_VE_BOOKING_RECEIVED_LIST_START,
	CREATOR_VIP_VE_VIEW_ANSWER_START,
	CREATOR_VIP_VE_BOOKING_VIEW_START,
	CREATOR_VIP_VE_BOOKING_REJECT_START,
	CREATOR_VIP_VE_BOOKING_ACCEPT_START,
	CREATOR_VIP_VE_BOOKING_START_START,
	CREATOR_VIP_VE_LIST_START,
	CREATOR_VIP_VE_FILE_SAVE_START,
	CREATOR_VIP_VE_UPDATE_ANSWER_START,
	CREATOR_VIP_VE_FILE_DELETE_START,
	CREATOR_VIP_VE_SAVE_START,
	CREATOR_VIP_VE_DELETE_START,
	CREATOR_VIP_VE_VIEW_START,
	CREATOR_VIP_VE_STATUS_START,

} from "../actions/ActionConstant";

import { createNotification } from "react-redux-notify";
import {
	getSuccessNotificationMessage,
	getErrorNotificationMessage,
} from "../../components/helper/NotificationMessage";

import {
	creatorVirtualBookingListSuccess,
	creatorVirtualBookingListFailure,
	creatorVirtualBookingReceivedListSuccess,
	creatorVirtualBookingReceivedListFailure,
	creatorVirtualViewAnswerSuccess,
	creatorVirtualViewAnswerFailure,
	creatorVirtualBookingViewSuccess,
	creatorVirtualBookingViewFailure,
	creatorVirtualBookingRejectSuccess,
	creatorVirtualBookingRejectFailure,
	creatorVirtualBookingAcceptSuccess,
	creatorVirtualBookingAcceptFailure,
	creatorVirtualBookingStartSuccess,
  creatorVirtualBookingStartFailure,
	creatorVirtualExperienceListSuccess,
	creatorVirtualExperienceListFailure,
	creatorVipVEFileSaveSuccess,
	creatorVipVEFileSaveFailure,
	creatorVipVEUpdateAnswerSuccess,
	creatorVipVEUpdateAnswerFailure,
	creatorVirtualExperienceFileDeleteSuccess,
	creatorVirtualExperienceFileDeleteFailure,
	creatorVirtualExperienceSaveSuccess,
	creatorVirtualExperienceSaveFailure,
	creatorVirtualExperienceDeleteSuccess,
	creatorVirtualExperienceDeleteFailure,
	creatorVirtualExperienceViewSuccess,
	creatorVirtualExperienceViewFailure,
	creatorVirtualExperienceStatusSuccess,
	creatorVirtualExperienceStatusFailure,
	creatorVirtualExperienceSaveStart,

} from "../actions/CreatorVipVEAction";

function* fetchCreatorBookingListAPI(action) {
	try {
		const response = yield api.postMethod("vip_ve_bookings/bookings_list", action.data);

		if (response.data.success) {
			yield put(creatorVirtualBookingListSuccess(response.data));
		} else {
			yield put(creatorVirtualBookingListFailure(response.data.error));
			const notificationMessage = getErrorNotificationMessage(
				response.data.error
			);
			yield put(createNotification(notificationMessage));
		}
	} catch (error) {
		yield put(creatorVirtualBookingListFailure(error));
		const notificationMessage = getErrorNotificationMessage(error.message);
		yield put(createNotification(notificationMessage));
	}
}

function* fetchCreatorBookingReceivedListAPI(action) {
	try {
		const response = yield api.postMethod("vip_ve_bookings/received_bookings_list", action.data);

		if (response.data.success) {
			yield put(creatorVirtualBookingReceivedListSuccess(response.data));
		} else {
			yield put(creatorVirtualBookingReceivedListFailure(response.data.error));
			const notificationMessage = getErrorNotificationMessage(
				response.data.error
			);
			yield put(createNotification(notificationMessage));
		}
	} catch (error) {
		yield put(creatorVirtualBookingReceivedListFailure(error));
		const notificationMessage = getErrorNotificationMessage(error.message);
		yield put(createNotification(notificationMessage));
	}
}

function* fetchCreatorViewAnswerAPI(action) {
	try {
		const response = yield api.postMethod("vip_ve/view_answer", action.data);

		if (response.data.success) {
			yield put(creatorVirtualViewAnswerSuccess(response.data));
		} else {
			yield put(creatorVirtualViewAnswerFailure(response.data.error));
			const notificationMessage = getErrorNotificationMessage(
				response.data.error
			);
			yield put(createNotification(notificationMessage));
		}
	} catch (error) {
		yield put(creatorVirtualViewAnswerFailure(error));
		const notificationMessage = getErrorNotificationMessage(error.message);
		yield put(createNotification(notificationMessage));
	}
}

function* fetchCreatorBookingViewAPI(action) {
	try {
		const response = yield api.postMethod("vip_ve_bookings/view", action.data);

		if (response.data.success) {
			yield put(creatorVirtualBookingViewSuccess(response.data));
		} else {
			yield put(creatorVirtualBookingViewFailure(response.data.error));
			const notificationMessage = getErrorNotificationMessage(
				response.data.error
			);
			yield put(createNotification(notificationMessage));
		}
	} catch (error) {
		yield put(creatorVirtualBookingViewFailure(error));
		const notificationMessage = getErrorNotificationMessage(error.message);
		yield put(createNotification(notificationMessage));
	}
}

function* creatorBookingRejectAPI(action) {
	try {
		const response = yield api.postMethod("vip_ve_bookings/bookings_cancel", action.data);

		if (response.data.success) {
			yield put(creatorVirtualBookingRejectSuccess(response.data));
		} else {
			yield put(creatorVirtualBookingRejectFailure(response.data.error));
			const notificationMessage = getErrorNotificationMessage(
				response.data.error
			);
			yield put(createNotification(notificationMessage));
		}
	} catch (error) {
		yield put(creatorVirtualBookingRejectFailure(error));
		const notificationMessage = getErrorNotificationMessage(error.message);
		yield put(createNotification(notificationMessage));
	}
}

function* creatorBookingAcceptAPI(action) {
	try {
		const response = yield api.postMethod("vip_ve_bookings/bookings_accept", action.data);
		console.log(response.data)
		if (response.data.success) {
			yield put(creatorVirtualBookingAcceptSuccess(response.data));
		} else {
			yield put(creatorVirtualBookingAcceptFailure(response.data.error));
			const notificationMessage = getErrorNotificationMessage(
				response.data.error
			);
			yield put(createNotification(notificationMessage));
		}
	} catch (error) {
		yield put(creatorVirtualBookingAcceptFailure(error));
		const notificationMessage = getErrorNotificationMessage(error.message);
		yield put(createNotification(notificationMessage));
	}
}

function* creatorBookingStartAPI(action) {
    try {
        const response = yield api.postMethod("user_vip_ve/virtual_experience_booking", action.data);

        if (response.data.success) {
            yield put(creatorVirtualBookingStartSuccess(response.data.data));
            const notificationMessage = getSuccessNotificationMessage(
                response.data.message
            );
            yield put(createNotification(notificationMessage));
        } else {
            yield put(creatorVirtualBookingStartFailure(response.data.error));
            const notificationMessage = getErrorNotificationMessage(
                response.data.error
            );
            yield put(createNotification(notificationMessage));
        }
    } catch (error) {
        yield put(creatorVirtualBookingStartFailure(error));
        const notificationMessage = getErrorNotificationMessage(error.message);
        yield put(createNotification(notificationMessage));
    }
}

function* creatorVirtualExperienceListAPI(action) {
	try {
		const response = yield api.postMethod("vip_ve/list", action.data);
		if (response.data.success) {
			yield put(creatorVirtualExperienceListSuccess(response.data.data));
		} else {
			yield put(creatorVirtualExperienceListFailure(response.data.error));
			const notificationMessage = getErrorNotificationMessage(
				response.data.error
			);
			yield put(createNotification(notificationMessage));
		}
	} catch (error) {
		yield put(creatorVirtualExperienceListFailure(error));
		const notificationMessage = getErrorNotificationMessage(error.message);
		yield put(createNotification(notificationMessage));
	}
}

function* creatorVirtualExperienceFileSaveAPI(action) {
	try {
		const response = yield api.postMethod("vip_ve/files_save", action.data.file_ids);

		if (response.data.success) {
			yield put(creatorVipVEFileSaveSuccess(response.data.data));
			yield put(creatorVirtualExperienceSaveStart({ ...action.data, "file_ids": response.data.data.virtual_experience_file_ids }));

		} else {
			yield put(creatorVipVEFileSaveFailure(response.data.error));
			const notificationMessage = getErrorNotificationMessage(
				response.data.error
			);
			yield put(createNotification(notificationMessage));
		}
	} catch (error) {
		yield put(creatorVipVEFileSaveFailure(error));
		const notificationMessage = getErrorNotificationMessage(error.message);
		yield put(createNotification(notificationMessage));
	}
}

function* creatorVirtualExperienceUpdateAnswerAPI(action) {
	try {
		const response = yield api.postMethod("vip_ve/update_answer", action.data);

		if (response.data.success) {
			yield put(creatorVipVEUpdateAnswerSuccess(response.data.data));

		} else {
			yield put(creatorVipVEUpdateAnswerFailure(response.data.error));
			const notificationMessage = getErrorNotificationMessage(
				response.data.error
			);
			yield put(createNotification(notificationMessage));
		}
	} catch (error) {
		yield put(creatorVipVEUpdateAnswerFailure(error));
		const notificationMessage = getErrorNotificationMessage(error.message);
		yield put(createNotification(notificationMessage));
	}
}

function* creatorVirtualExperienceFileDeleteAPI(action) {
	try {
		const response = yield api.postMethod("vip_ve/", action.data);

		if (response.data.success) {
			yield put(creatorVirtualExperienceFileDeleteSuccess(response.data.data));
		} else {
			yield put(creatorVirtualExperienceFileDeleteFailure(response.data.error));
			const notificationMessage = getErrorNotificationMessage(
				response.data.error
			);
			yield put(createNotification(notificationMessage));
		}
	} catch (error) {
		yield put(creatorVirtualExperienceFileDeleteFailure(error));
		const notificationMessage = getErrorNotificationMessage(error.message);
		yield put(createNotification(notificationMessage));
	}
}

function* creatorVirtualExperienceSaveAPI(action) {
	try {
		const response = yield api.postMethod("vip_ve/save", action.data);
		if (response.data.success) {
			yield put(creatorVirtualExperienceSaveSuccess(response.data.data));
			const notificationMessage = getSuccessNotificationMessage(
				response.data.message
			);
			yield put(createNotification(notificationMessage));
		} else {
			yield put(creatorVirtualExperienceSaveFailure(response.data.error));
			const notificationMessage = getErrorNotificationMessage(
				response.data.error
			);
			yield put(createNotification(notificationMessage));
		}
	} catch (error) {
		yield put(creatorVirtualExperienceSaveFailure(error));
		const notificationMessage = getErrorNotificationMessage(error.message);
		yield put(createNotification(notificationMessage));
	}
}

function* creatorVirtualExperienceDeleteAPI(action) {
	try {
		const response = yield api.postMethod("vip_ve/delete", action.data);

		if (response.data.success) {
			yield put(creatorVirtualExperienceDeleteSuccess(response.data.data));
		} else {
			yield put(creatorVirtualExperienceDeleteFailure(response.data.error));
			const notificationMessage = getErrorNotificationMessage(
				response.data.error
			);
			yield put(createNotification(notificationMessage));
		}
	} catch (error) {
		yield put(creatorVirtualExperienceDeleteFailure(error));
		const notificationMessage = getErrorNotificationMessage(error.message);
		yield put(createNotification(notificationMessage));
	}
}

function* creatorVirtualExperienceViewAPI(action) {
	try {
		const response = yield api.postMethod("vip_ve/view", action.data);

		if (response.data.success) {
			yield put(creatorVirtualExperienceViewSuccess(response.data.data));
		} else {
			yield put(creatorVirtualExperienceViewFailure(response.data.error));
			const notificationMessage = getErrorNotificationMessage(
				response.data.error
			);
			yield put(createNotification(notificationMessage));
		}
	} catch (error) {
		yield put(creatorVirtualExperienceViewFailure(error));
		const notificationMessage = getErrorNotificationMessage(error.message);
		yield put(createNotification(notificationMessage));
	}
}

function* creatorVirtualExperienceStatusAPI(action) {
	try {
		const response = yield api.postMethod("vip_ve/delete", action.data);

		if (response.data.success) {
			yield put(creatorVirtualExperienceStatusSuccess(response.data.data));
		} else {
			yield put(creatorVirtualExperienceStatusFailure(response.data.error));
			const notificationMessage = getErrorNotificationMessage(
				response.data.error
			);
			yield put(createNotification(notificationMessage));
		}
	} catch (error) {
		yield put(creatorVirtualExperienceStatusFailure(error));
		const notificationMessage = getErrorNotificationMessage(error.message);
		yield put(createNotification(notificationMessage));
	}
}

export default function* CreatorVipVESaga() {
	yield all([yield takeLatest(CREATOR_VIP_VE_BOOKING_LIST_START, fetchCreatorBookingListAPI)]);
	yield all([yield takeLatest(CREATOR_VIP_VE_BOOKING_RECEIVED_LIST_START, fetchCreatorBookingReceivedListAPI)]);
	yield all([yield takeLatest(CREATOR_VIP_VE_VIEW_ANSWER_START, fetchCreatorViewAnswerAPI)]);
	yield all([yield takeLatest(CREATOR_VIP_VE_BOOKING_VIEW_START, fetchCreatorBookingViewAPI)]);
	yield all([yield takeLatest(CREATOR_VIP_VE_BOOKING_REJECT_START, creatorBookingRejectAPI)]);
	yield all([yield takeLatest(CREATOR_VIP_VE_BOOKING_ACCEPT_START, creatorBookingAcceptAPI)]);
	yield all([yield takeLatest(CREATOR_VIP_VE_BOOKING_START_START, creatorBookingStartAPI)]);
	yield all([yield takeLatest(CREATOR_VIP_VE_LIST_START, creatorVirtualExperienceListAPI)]);
	yield all([yield takeLatest(CREATOR_VIP_VE_FILE_SAVE_START, creatorVirtualExperienceFileSaveAPI)]);
	yield all([yield takeLatest(CREATOR_VIP_VE_UPDATE_ANSWER_START, creatorVirtualExperienceUpdateAnswerAPI)]);
	yield all([yield takeLatest(CREATOR_VIP_VE_FILE_DELETE_START, creatorVirtualExperienceFileDeleteAPI)]);
	yield all([yield takeLatest(CREATOR_VIP_VE_SAVE_START, creatorVirtualExperienceSaveAPI)]);
	yield all([yield takeLatest(CREATOR_VIP_VE_DELETE_START, creatorVirtualExperienceDeleteAPI)]);
	yield all([yield takeLatest(CREATOR_VIP_VE_VIEW_START, creatorVirtualExperienceViewAPI)]);
	yield all([yield takeLatest(CREATOR_VIP_VE_STATUS_START, creatorVirtualExperienceStatusAPI)]);
}