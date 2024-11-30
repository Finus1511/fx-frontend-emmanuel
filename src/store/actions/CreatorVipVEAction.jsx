import {
    CREATOR_VIP_VE_BOOKING_LIST_START,
    CREATOR_VIP_VE_BOOKING_LIST_SUCCESS,
    CREATOR_VIP_VE_BOOKING_LIST_FAILURE,
    CREATOR_VIP_VE_BOOKING_RECEIVED_LIST_START,
    CREATOR_VIP_VE_BOOKING_RECEIVED_LIST_SUCCESS,
    CREATOR_VIP_VE_BOOKING_RECEIVED_LIST_FAILURE,
    CREATOR_VIP_VE_VIEW_ANSWER_START,
    CREATOR_VIP_VE_VIEW_ANSWER_SUCCESS,
    CREATOR_VIP_VE_VIEW_ANSWER_FAILURE,
    CREATOR_VIP_VE_BOOKING_VIEW_START,
    CREATOR_VIP_VE_BOOKING_VIEW_SUCCESS,
    CREATOR_VIP_VE_BOOKING_VIEW_FAILURE,
    CREATOR_VIP_VE_BOOKING_REJECT_START,
    CREATOR_VIP_VE_BOOKING_REJECT_SUCCESS,
    CREATOR_VIP_VE_BOOKING_REJECT_FAILURE,
    CREATOR_VIP_VE_BOOKING_ACCEPT_START,
    CREATOR_VIP_VE_BOOKING_ACCEPT_SUCCESS,
    CREATOR_VIP_VE_BOOKING_ACCEPT_FAILURE,
    CREATOR_VIP_VE_BOOKING_START_START,
    CREATOR_VIP_VE_BOOKING_START_SUCCESS,
    CREATOR_VIP_VE_BOOKING_START_FAILURE,
    CREATOR_VIP_VE_LIST_START,
    CREATOR_VIP_VE_LIST_SUCCESS,
    CREATOR_VIP_VE_LIST_FAILURE,
    CREATOR_VIP_VE_FILE_SAVE_START,
    CREATOR_VIP_VE_FILE_SAVE_SUCCESS,
    CREATOR_VIP_VE_FILE_SAVE_FAILURE,
    CREATOR_VIP_VE_UPDATE_ANSWER_START,
    CREATOR_VIP_VE_UPDATE_ANSWER_SUCCESS,
    CREATOR_VIP_VE_UPDATE_ANSWER_FAILURE,
    CREATOR_VIP_VE_FILE_DELETE_START,
    CREATOR_VIP_VE_FILE_DELETE_SUCCESS,
    CREATOR_VIP_VE_FILE_DELETE_FAILURE,
    CREATOR_VIP_VE_SAVE_START,
    CREATOR_VIP_VE_SAVE_SUCCESS,
    CREATOR_VIP_VE_SAVE_FAILURE,
    CREATOR_VIP_VE_DELETE_START,
    CREATOR_VIP_VE_DELETE_SUCCESS,
    CREATOR_VIP_VE_DELETE_FAILURE,
    CREATOR_VIP_VE_VIEW_START,
    CREATOR_VIP_VE_VIEW_SUCCESS,
    CREATOR_VIP_VE_VIEW_FAILURE,
    CREATOR_VIP_VE_STATUS_START,
    CREATOR_VIP_VE_STATUS_SUCCESS,
    CREATOR_VIP_VE_STATUS_FAILURE,
} from './ActionConstant'


export function creatorVirtualBookingListStart(data) {
    return {
        type: CREATOR_VIP_VE_BOOKING_LIST_START,
        data,
    };
}

export function creatorVirtualBookingListSuccess(data) {
    return {
        type: CREATOR_VIP_VE_BOOKING_LIST_SUCCESS,
        data,
    };
}
export function creatorVirtualBookingListFailure(error) {
    return {
        type: CREATOR_VIP_VE_BOOKING_LIST_FAILURE,
        error,
    };
}

export function creatorVirtualBookingReceivedListStart(data) {
    return {
        type: CREATOR_VIP_VE_BOOKING_RECEIVED_LIST_START,
        data,
    };
}

export function creatorVirtualBookingReceivedListSuccess(data) {
    return {
        type: CREATOR_VIP_VE_BOOKING_RECEIVED_LIST_SUCCESS,
        data,
    };
}
export function creatorVirtualBookingReceivedListFailure(error) {
    return {
        type: CREATOR_VIP_VE_BOOKING_RECEIVED_LIST_FAILURE,
        error,
    };
}

export function creatorVirtualViewAnswerStart(data) {
    return {
        type: CREATOR_VIP_VE_VIEW_ANSWER_START,
        data,
    };
}

export function creatorVirtualViewAnswerSuccess(data) {
    return {
        type: CREATOR_VIP_VE_VIEW_ANSWER_SUCCESS,
        data,
    };
}
export function creatorVirtualViewAnswerFailure(error) {
    return {
        type: CREATOR_VIP_VE_VIEW_ANSWER_FAILURE,
        error,
    };
}

export function creatorVirtualBookingViewStart(data) {
    return {
        type: CREATOR_VIP_VE_BOOKING_VIEW_START,
        data,
    };
}

export function creatorVirtualBookingViewSuccess(data) {
    return {
        type: CREATOR_VIP_VE_BOOKING_VIEW_SUCCESS,
        data,
    };
}

export function creatorVirtualBookingViewFailure(error) {
    return {
        type: CREATOR_VIP_VE_BOOKING_VIEW_FAILURE,
        error,
    };
}

export function creatorVirtualBookingRejectStart(data) {
    return {
        type: CREATOR_VIP_VE_BOOKING_REJECT_START,
        data,
    };
}

export function creatorVirtualBookingRejectSuccess(data) {
    return {
        type: CREATOR_VIP_VE_BOOKING_REJECT_SUCCESS,
        data,
    };
}

export function creatorVirtualBookingRejectFailure(error) {
    return {
        type: CREATOR_VIP_VE_BOOKING_REJECT_FAILURE,
        error,
    };
}

export function creatorVirtualBookingAcceptStart(data) {
    return {
        type: CREATOR_VIP_VE_BOOKING_ACCEPT_START,
        data,
    };
}

export function creatorVirtualBookingAcceptSuccess(data) {
    return {
        type: CREATOR_VIP_VE_BOOKING_ACCEPT_SUCCESS,
        data,
    };
}

export function creatorVirtualBookingAcceptFailure(error) {
    return {
        type: CREATOR_VIP_VE_BOOKING_ACCEPT_FAILURE,
        error,
    };
}

export function creatorVirtualBookingStartStart(data) {
    return {
        type: CREATOR_VIP_VE_BOOKING_START_START,
        data,
    };
}

export function creatorVirtualBookingStartSuccess(data) {
    return {
        type: CREATOR_VIP_VE_BOOKING_START_SUCCESS,
        data,
    };
}

export function creatorVirtualBookingStartFailure(error) {
    return {
        type: CREATOR_VIP_VE_BOOKING_START_FAILURE,
        error,
    };
}

export function creatorVirtualExperienceListStart(data) {
    return {
        type: CREATOR_VIP_VE_LIST_START,
        data,
    };
}

export function creatorVirtualExperienceListSuccess(data) {
    return {
        type: CREATOR_VIP_VE_LIST_SUCCESS,
        data,
    };
}

export function creatorVirtualExperienceListFailure(error) {
    return {
        type: CREATOR_VIP_VE_LIST_FAILURE,
        error,
    };
}

export function creatorVipVEFileSaveStart(data) {
    return {
        type: CREATOR_VIP_VE_FILE_SAVE_START,
        data,
    };
}

export function creatorVipVEFileSaveSuccess(data) {
    return {
        type: CREATOR_VIP_VE_FILE_SAVE_SUCCESS,
        data,
    };
}

export function creatorVipVEFileSaveFailure(error) {
    return {
        type: CREATOR_VIP_VE_FILE_SAVE_FAILURE,
        error,
    };
}

export function creatorVipVEUpdateAnswerStart(data) {
    return {
        type: CREATOR_VIP_VE_UPDATE_ANSWER_START,
        data,
    };
}

export function creatorVipVEUpdateAnswerSuccess(data) {
    return {
        type: CREATOR_VIP_VE_UPDATE_ANSWER_SUCCESS,
        data,
    };
}

export function creatorVipVEUpdateAnswerFailure(error) {
    return {
        type: CREATOR_VIP_VE_UPDATE_ANSWER_FAILURE,
        error,
    };
}

export function creatorVirtualExperienceFileDeleteStart(data) {
    return {
        type: CREATOR_VIP_VE_FILE_DELETE_START,
        data,
    };
}

export function creatorVirtualExperienceFileDeleteSuccess(data) {
    return {
        type: CREATOR_VIP_VE_FILE_DELETE_SUCCESS,
        data,
    };
}

export function creatorVirtualExperienceFileDeleteFailure(error) {
    return {
        type: CREATOR_VIP_VE_FILE_DELETE_FAILURE,
        error,
    };
}

export function creatorVirtualExperienceSaveStart(data) {
    return {
        type: CREATOR_VIP_VE_SAVE_START,
        data,
    };
}

export function creatorVirtualExperienceSaveSuccess(data) {
    return {
        type: CREATOR_VIP_VE_SAVE_SUCCESS,
        data,
    };
}

export function creatorVirtualExperienceSaveFailure(error) {
    return {
        type: CREATOR_VIP_VE_SAVE_FAILURE,
        error,
    };
}

export function creatorVirtualExperienceDeleteStart(data) {
    return {
        type: CREATOR_VIP_VE_DELETE_START,
        data,
    };
}

export function creatorVirtualExperienceDeleteSuccess(data) {
    return {
        type: CREATOR_VIP_VE_DELETE_SUCCESS,
        data,
    };
}

export function creatorVirtualExperienceDeleteFailure(error) {
    return {
        type: CREATOR_VIP_VE_DELETE_FAILURE,
        error,
    };
}

export function creatorVirtualExperienceViewStart(data) {
    return {
        type: CREATOR_VIP_VE_VIEW_START,
        data,
    };
}

export function creatorVirtualExperienceViewSuccess(data) {
    return {
        type: CREATOR_VIP_VE_VIEW_SUCCESS,
        data,
    };
}

export function creatorVirtualExperienceViewFailure(error) {
    return {
        type: CREATOR_VIP_VE_VIEW_FAILURE,
        error,
    };
}

export function creatorVirtualExperienceStatusStart(data) {
    return {
        type: CREATOR_VIP_VE_STATUS_START,
        data,
    };
}

export function creatorVirtualExperienceStatusSuccess(data) {
    return {
        type: CREATOR_VIP_VE_STATUS_SUCCESS,
        data,
    };
}

export function creatorVirtualExperienceStatusFailure(error) {
    return {
        type: CREATOR_VIP_VE_STATUS_FAILURE,
        error,
    };
}

