import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";

import {
    CREATOR_VIRTUAL_BOOKING_LIST_START,
    CREATOR_VIRTUAL_BOOKING_VIEW_START,
    CREATOR_VIRTUAL_BOOKING_REJECT_START,
    CREATOR_VIRTUAL_BOOKING_START_START,
    CREATOR_VIRTUAL_BOOKING_END_START,
    CREATOR_VIRTUAL_VH_LIST_START,
    CREATOR_VIRTUAL_VH_FILE_SAVE_START,
    CREATOR_VIRTUAL_VH_FILE_DELETE_START,
    CREATOR_VIRTUAL_VH_SAVE_START,
    CREATOR_VIRTUAL_VH_DELETE_START,
    CREATOR_VIRTUAL_VH_VIEW_START,
    CREATOR_VIRTUAL_VH_STATUS_START,
    SLOT_AVAILABLE_START,
    START_VIRTUAL_EXPERIENCE_START,
    END_VIRTUAL_EXPERIENCE_START,
    VIRTUAL_EXPERIENCE_HOST_UPDATE_START,

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
    creatorVirtualExperienceFileSaveSuccess,
    creatorVirtualExperienceFileSaveFailure,
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
    slotAvailableSuccess,
    slotAvailableFailure,
    creatorVirtualExperienceSaveStart,
    startVirtualExperienceSuccess,
    startVirtualExperienceFailure,
    endVirtualExperienceSuccess,
    endVirtualExperienceFailure,
    virtualExperienceHostUpdateSuccess,
    virtualExperienceHostUpdateFailure

} from "../actions/CreatorVirtualAction";

function* fetchCreatorBookingListAPI(action) {
    try {
        const response = yield api.postMethod("virtual_experience_bookings/bookings_list", action.data);

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
        const response = yield api.postMethod("virtual_experience_bookings/view", action.data);

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
        const response = yield api.postMethod("user_vh_bookings/cancel", action.data);

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
        const response = yield api.postMethod("user_virtual_experiences/virtual_experience_booking", action.data);

        if (response.data.success) {
            yield put(creatorVirtualBookingStartSuccess(response.data.data));
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
        const response = yield api.postMethod("user_vh_bookings/exit", action.data);

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
        const response = yield api.postMethod("virtual_experiences/list", action.data);
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
        const response = yield api.postMethod("virtual_experiences/files_save", action.data.file_ids);

        if (response.data.success) {
            yield put(creatorVirtualExperienceFileSaveSuccess(response.data.data));
            yield put(creatorVirtualExperienceSaveStart({ ...action.data, "file_ids": response.data.data.virtual_experience_file_ids }));

        } else {
            yield put(creatorVirtualExperienceFileSaveFailure(response.data.error));
            const notificationMessage = getErrorNotificationMessage(
                response.data.error
            );
            yield put(createNotification(notificationMessage));
        }
    } catch (error) {
        yield put(creatorVirtualExperienceFileSaveFailure(error));
        const notificationMessage = getErrorNotificationMessage(error.message);
        yield put(createNotification(notificationMessage));
    }
}

function* creatorVirtualExperienceFileDeleteAPI(action) {
    try {
        const response = yield api.postMethod("virtual_experiences/", action.data);

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
        const response = yield api.postMethod("virtual_experiences/save", action.data);
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
        const response = yield api.postMethod("virtual_experiences/delete", action.data);

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
        const response = yield api.postMethod("virtual_experiences/view", action.data);

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
        const response = yield api.postMethod("virtual_experiences/delete", action.data);

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

function* slotAvailableAPI(action) {
    try {
        const response = yield api.postMethod("virtual_experience_bookings/creator_availabilities", action.data);

        if (response.data.success) {
            yield put(slotAvailableSuccess(response.data.data));
        } else {
            yield put(slotAvailableFailure(response.data.error));
            const notificationMessage = getErrorNotificationMessage(
                response.data.error
            );
            yield put(createNotification(notificationMessage));
        }
    } catch (error) {
        yield put(slotAvailableFailure(error));
        const notificationMessage = getErrorNotificationMessage(error.message);
        yield put(createNotification(notificationMessage));
    }
}

function* startVirtualExperienceAPI(action) {
    try {
        const response = yield api.postMethod("virtual_experience_bookings/start_virtual_experience", action.data);
        if (response.data.success) {
            yield put(startVirtualExperienceSuccess(response.data.data));
        } else {
            yield put(startVirtualExperienceFailure(response.data.error));
            const notificationMessage = getErrorNotificationMessage(
                response.data.error
            );
            yield put(createNotification(notificationMessage));
        }
    } catch (error) {
        yield put(startVirtualExperienceFailure(error));
        const notificationMessage = getErrorNotificationMessage(error.message);
        yield put(createNotification(notificationMessage));
    }
}

function* endVirtualExperienceAPI(action) {
    try {
        const response = yield api.postMethod("virtual_experience_bookings/end_virtual_experience", action.data);
        if (response.data.success) {
            yield put(endVirtualExperienceSuccess(response.data.data));
        } else {
            yield put(endVirtualExperienceFailure(response.data.error));
            const notificationMessage = getErrorNotificationMessage(
                response.data.error
            );
            yield put(createNotification(notificationMessage));
        }
    } catch (error) {
        yield put(endVirtualExperienceFailure(error));
        const notificationMessage = getErrorNotificationMessage(error.message);
        yield put(createNotification(notificationMessage));
    }
}

function* virtualExperienceHostUpdateAPI(action) {
    try {
        const response = yield api.postMethod("virtual_experiences/virtual_experience_host_update", action.data);
        if (response.data.success) {
            yield put(virtualExperienceHostUpdateSuccess(response.data.data));
        } else {
            yield put(virtualExperienceHostUpdateFailure(response.data.data));
            const notificationMessage = getErrorNotificationMessage(
                response.data.error
            );
            yield put(createNotification(notificationMessage));
        }
    } catch (error) {
        yield put(virtualExperienceHostUpdateFailure(error));
        const notificationMessage = getErrorNotificationMessage(error.message);
        yield put(createNotification(notificationMessage));
    }

}


export default function* CreatorVirtualSaga() {
    yield all([yield takeLatest(CREATOR_VIRTUAL_BOOKING_LIST_START, fetchCreatorBookingListAPI)]);
    yield all([yield takeLatest(CREATOR_VIRTUAL_BOOKING_VIEW_START, fetchCreatorBookingViewAPI)]);
    yield all([yield takeLatest(CREATOR_VIRTUAL_BOOKING_REJECT_START, creatorBookingRejectAPI)]);
    yield all([yield takeLatest(CREATOR_VIRTUAL_BOOKING_START_START, creatorBookingStartAPI)]);
    yield all([yield takeLatest(CREATOR_VIRTUAL_BOOKING_END_START, creatorBookingEndAPI)]);
    yield all([yield takeLatest(CREATOR_VIRTUAL_VH_LIST_START, creatorVirtualExperienceListAPI)]);
    yield all([yield takeLatest(CREATOR_VIRTUAL_VH_FILE_SAVE_START, creatorVirtualExperienceFileSaveAPI)]);
    yield all([yield takeLatest(CREATOR_VIRTUAL_VH_FILE_DELETE_START, creatorVirtualExperienceFileDeleteAPI)]);
    yield all([yield takeLatest(CREATOR_VIRTUAL_VH_SAVE_START, creatorVirtualExperienceSaveAPI)]);
    yield all([yield takeLatest(CREATOR_VIRTUAL_VH_DELETE_START, creatorVirtualExperienceDeleteAPI)]);
    yield all([yield takeLatest(CREATOR_VIRTUAL_VH_VIEW_START, creatorVirtualExperienceViewAPI)]);
    yield all([yield takeLatest(CREATOR_VIRTUAL_VH_STATUS_START, creatorVirtualExperienceStatusAPI)]);
    yield all([yield takeLatest(SLOT_AVAILABLE_START, slotAvailableAPI)]);
    yield all([yield takeLatest(START_VIRTUAL_EXPERIENCE_START, startVirtualExperienceAPI)]);
    yield all([yield takeLatest(END_VIRTUAL_EXPERIENCE_START, endVirtualExperienceAPI)]);
    yield all([yield takeLatest(VIRTUAL_EXPERIENCE_HOST_UPDATE_START, virtualExperienceHostUpdateAPI)]);
}