import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";

import {
    CREATOR_ONE_ON_ONE_VE_BOOKING_LIST_START,
    CREATOR_ONE_ON_ONE_VE_BOOKING_VIEW_START,
    CREATOR_ONE_ON_ONE_VE_BOOKING_REJECT_START,
    CREATOR_ONE_ON_ONE_VE_BOOKING_START_START,
    CREATOR_ONE_ON_ONE_VE_BOOKING_END_START,
    CREATOR_ONE_ON_ONE_VE_LIST_START,
    CREATOR_ONE_ON_ONE_VE_FILE_SAVE_START,
    CREATOR_ONE_ON_ONE_VE_FILE_DELETE_START,
    CREATOR_ONE_ON_ONE_VE_SAVE_START,
    CREATOR_ONE_ON_ONE_VE_DELETE_START,
    CREATOR_ONE_ON_ONE_VE_VIEW_START,
    CREATOR_ONE_ON_ONE_VE_STATUS_START,

} from "../actions/ActionConstant";

import { createNotification } from "react-redux-notify";
import {
    getSuccessNotificationMessage,
    getErrorNotificationMessage,
} from "../../components/helper/NotificationMessage";

import {
    creatorVirtualBookingListSuccess,
    creatorVirtualBookingListFailure,
    creatorVirtualBookingViewSuccess,
    creatorVirtualBookingViewFailure,
    creatorVirtualBookingRejectSuccess,
    creatorVirtualBookingRejectFailure,
    creatorVirtualBookingStartSuccess,
    creatorVirtualBookingStartFailure,
    creatorVirtualBookingEndSuccess,
    creatorVirtualBookingEndFailure,
    creatorVirtualExperienceListSuccess,
    creatorVirtualExperienceListFailure,
    creatorOneOnOneVEFileSaveSuccess,
    creatorOneOnOneVEFileSaveFailure,
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

} from "../actions/CreatorOneOnOneVEAction";

function* fetchCreatorBookingListAPI(action) {
    try {
        const response = yield api.postMethod("one_on_one_ve_bookings/bookings_list", action.data);

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

function* fetchCreatorBookingViewAPI(action) {
    try {
        const response = yield api.postMethod("one_on_one_ve_bookings/view", action.data);

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
        const response = yield api.postMethod("user_one_on_one_ve_bookings/cancel", action.data);

        if (response.data.success) {
            yield put(creatorVirtualBookingRejectSuccess(response.data.data));
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

function* creatorBookingStartAPI(action) {
    try {
        const response = yield api.postMethod("user_one_on_one_ve/virtual_experience_booking", action.data);

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

function* creatorBookingEndAPI(action) {
    try {
        const response = yield api.postMethod("user_one_on_one_ve_bookings/exit", action.data);

        if (response.data.success) {
            yield put(creatorVirtualBookingEndSuccess(response.data.data));
        } else {
            yield put(creatorVirtualBookingEndFailure(response.data.error));
            const notificationMessage = getErrorNotificationMessage(
                response.data.error
            );
            yield put(createNotification(notificationMessage));
        }
    } catch (error) {
        yield put(creatorVirtualBookingEndFailure(error));
        const notificationMessage = getErrorNotificationMessage(error.message);
        yield put(createNotification(notificationMessage));
    }
}

function* creatorVirtualExperienceListAPI(action) {
    try {
        const response = yield api.postMethod("one_on_one_ve/list", action.data);
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
        const response = yield api.postMethod("one_on_one_ve/files_save", action.data.file_ids);

        if (response.data.success) {
            yield put(creatorOneOnOneVEFileSaveSuccess(response.data.data));
            yield put(creatorVirtualExperienceSaveStart({ ...action.data, "file_ids": response.data.data.virtual_experience_file_ids }));

        } else {
            yield put(creatorOneOnOneVEFileSaveFailure(response.data.error));
            const notificationMessage = getErrorNotificationMessage(
                response.data.error
            );
            yield put(createNotification(notificationMessage));
        }
    } catch (error) {
        yield put(creatorOneOnOneVEFileSaveFailure(error));
        const notificationMessage = getErrorNotificationMessage(error.message);
        yield put(createNotification(notificationMessage));
    }
}

function* creatorVirtualExperienceFileDeleteAPI(action) {
    try {
        const response = yield api.postMethod("one_on_one_ve/", action.data);

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
        const response = yield api.postMethod("one_on_one_ve/save", action.data);
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
        const response = yield api.postMethod("one_on_one_ve/delete", action.data);

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
        const response = yield api.postMethod("one_on_one_ve/view", action.data);

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
        const response = yield api.postMethod("one_on_one_ve/delete", action.data);

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

export default function* CreatorOneOnOneVESaga() {
    yield all([yield takeLatest(CREATOR_ONE_ON_ONE_VE_BOOKING_LIST_START, fetchCreatorBookingListAPI)]);
    yield all([yield takeLatest(CREATOR_ONE_ON_ONE_VE_BOOKING_VIEW_START, fetchCreatorBookingViewAPI)]);
    yield all([yield takeLatest(CREATOR_ONE_ON_ONE_VE_BOOKING_REJECT_START, creatorBookingRejectAPI)]);
    yield all([yield takeLatest(CREATOR_ONE_ON_ONE_VE_BOOKING_START_START, creatorBookingStartAPI)]);
    yield all([yield takeLatest(CREATOR_ONE_ON_ONE_VE_BOOKING_END_START, creatorBookingEndAPI)]);
    yield all([yield takeLatest(CREATOR_ONE_ON_ONE_VE_LIST_START, creatorVirtualExperienceListAPI)]);
    yield all([yield takeLatest(CREATOR_ONE_ON_ONE_VE_FILE_SAVE_START, creatorVirtualExperienceFileSaveAPI)]);
    yield all([yield takeLatest(CREATOR_ONE_ON_ONE_VE_FILE_DELETE_START, creatorVirtualExperienceFileDeleteAPI)]);
    yield all([yield takeLatest(CREATOR_ONE_ON_ONE_VE_SAVE_START, creatorVirtualExperienceSaveAPI)]);
    yield all([yield takeLatest(CREATOR_ONE_ON_ONE_VE_DELETE_START, creatorVirtualExperienceDeleteAPI)]);
    yield all([yield takeLatest(CREATOR_ONE_ON_ONE_VE_VIEW_START, creatorVirtualExperienceViewAPI)]);
    yield all([yield takeLatest(CREATOR_ONE_ON_ONE_VE_STATUS_START, creatorVirtualExperienceStatusAPI)]);
}