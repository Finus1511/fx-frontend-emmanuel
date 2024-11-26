import {
    CREATOR_ONE_ON_ONE_VE_BOOKING_LIST_START,
    CREATOR_ONE_ON_ONE_VE_BOOKING_LIST_SUCCESS,
    CREATOR_ONE_ON_ONE_VE_BOOKING_LIST_FAILURE,
    CREATOR_ONE_ON_ONE_VE_BOOKING_VIEW_START,
    CREATOR_ONE_ON_ONE_VE_BOOKING_VIEW_SUCCESS,
    CREATOR_ONE_ON_ONE_VE_BOOKING_VIEW_FAILURE,
    CREATOR_ONE_ON_ONE_VE_BOOKING_REJECT_START,
    CREATOR_ONE_ON_ONE_VE_BOOKING_REJECT_SUCCESS,
    CREATOR_ONE_ON_ONE_VE_BOOKING_REJECT_FAILURE,
    CREATOR_ONE_ON_ONE_VE_BOOKING_START_START,
    CREATOR_ONE_ON_ONE_VE_BOOKING_START_SUCCESS,
    CREATOR_ONE_ON_ONE_VE_BOOKING_START_FAILURE,
    CREATOR_ONE_ON_ONE_VE_BOOKING_END_START,
    CREATOR_ONE_ON_ONE_VE_BOOKING_END_SUCCESS,
    CREATOR_ONE_ON_ONE_VE_BOOKING_END_FAILURE,
    CREATOR_ONE_ON_ONE_VE_LIST_START,
    CREATOR_ONE_ON_ONE_VE_LIST_SUCCESS,
    CREATOR_ONE_ON_ONE_VE_LIST_FAILURE,
    CREATOR_ONE_ON_ONE_VE_FILE_SAVE_START,
    CREATOR_ONE_ON_ONE_VE_FILE_SAVE_SUCCESS,
    CREATOR_ONE_ON_ONE_VE_FILE_SAVE_FAILURE,
    CREATOR_ONE_ON_ONE_VE_FILE_DELETE_START,
    CREATOR_ONE_ON_ONE_VE_FILE_DELETE_SUCCESS,
    CREATOR_ONE_ON_ONE_VE_FILE_DELETE_FAILURE,
    CREATOR_ONE_ON_ONE_VE_SAVE_START,
    CREATOR_ONE_ON_ONE_VE_SAVE_SUCCESS,
    CREATOR_ONE_ON_ONE_VE_SAVE_FAILURE,
    CREATOR_ONE_ON_ONE_VE_DELETE_START,
    CREATOR_ONE_ON_ONE_VE_DELETE_SUCCESS,
    CREATOR_ONE_ON_ONE_VE_DELETE_FAILURE,
    CREATOR_ONE_ON_ONE_VE_VIEW_START,
    CREATOR_ONE_ON_ONE_VE_VIEW_SUCCESS,
    CREATOR_ONE_ON_ONE_VE_VIEW_FAILURE,
    CREATOR_ONE_ON_ONE_VE_STATUS_START,
    CREATOR_ONE_ON_ONE_VE_STATUS_SUCCESS,
    CREATOR_ONE_ON_ONE_VE_STATUS_FAILURE,
} from './ActionConstant'


export function creatorVirtualBookingListStart(data) {
    return {
        type: CREATOR_ONE_ON_ONE_VE_BOOKING_LIST_START,
        data,
    };
}

export function creatorVirtualBookingListSuccess(data) {
    return {
        type: CREATOR_ONE_ON_ONE_VE_BOOKING_LIST_SUCCESS,
        data,
    };
}
export function creatorVirtualBookingListFailure(error) {
    return {
        type: CREATOR_ONE_ON_ONE_VE_BOOKING_LIST_FAILURE,
        error,
    };
}

export function creatorVirtualBookingViewStart(data) {
    return {
        type: CREATOR_ONE_ON_ONE_VE_BOOKING_VIEW_START,
        data,
    };
}

export function creatorVirtualBookingViewSuccess(data) {
    return {
        type: CREATOR_ONE_ON_ONE_VE_BOOKING_VIEW_SUCCESS,
        data,
    };
}

export function creatorVirtualBookingViewFailure(error) {
    return {
        type: CREATOR_ONE_ON_ONE_VE_BOOKING_VIEW_FAILURE,
        error,
    };
}

export function creatorVirtualBookingRejectStart(data) {
    return {
        type: CREATOR_ONE_ON_ONE_VE_BOOKING_REJECT_START,
        data,
    };
}

export function creatorVirtualBookingRejectSuccess(data) {
    return {
        type: CREATOR_ONE_ON_ONE_VE_BOOKING_REJECT_SUCCESS,
        data,
    };
}

export function creatorVirtualBookingRejectFailure(error) {
    return {
        type: CREATOR_ONE_ON_ONE_VE_BOOKING_REJECT_FAILURE,
        error,
    };
}

export function creatorVirtualBookingStartStart(data) {
    return {
        type: CREATOR_ONE_ON_ONE_VE_BOOKING_START_START,
        data,
    };
}

export function creatorVirtualBookingStartSuccess(data) {
    return {
        type: CREATOR_ONE_ON_ONE_VE_BOOKING_START_SUCCESS,
        data,
    };
}

export function creatorVirtualBookingStartFailure(error) {
    return {
        type: CREATOR_ONE_ON_ONE_VE_BOOKING_START_FAILURE,
        error,
    };
}

export function creatorVirtualBookingEndStart(data) {
    return {
        type: CREATOR_ONE_ON_ONE_VE_BOOKING_END_START,
        data,
    };
}

export function creatorVirtualBookingEndSuccess(data) {
    return {
        type: CREATOR_ONE_ON_ONE_VE_BOOKING_END_SUCCESS,
        data,
    };
}

export function creatorVirtualBookingEndFailure(error) {
    return {
        type: CREATOR_ONE_ON_ONE_VE_BOOKING_END_FAILURE,
        error,
    };
}

export function creatorVirtualExperienceListStart(data) {
    return {
        type: CREATOR_ONE_ON_ONE_VE_LIST_START,
        data,
    };
}

export function creatorVirtualExperienceListSuccess(data) {
    return {
        type: CREATOR_ONE_ON_ONE_VE_LIST_SUCCESS,
        data,
    };
}

export function creatorVirtualExperienceListFailure(error) {
    return {
        type: CREATOR_ONE_ON_ONE_VE_LIST_FAILURE,
        error,
    };
}

export function creatorOneOnOneVEFileSaveStart(data) {
    return {
        type: CREATOR_ONE_ON_ONE_VE_FILE_SAVE_START,
        data,
    };
}

export function creatorOneOnOneVEFileSaveSuccess(data) {
    return {
        type: CREATOR_ONE_ON_ONE_VE_FILE_SAVE_SUCCESS,
        data,
    };
}

export function creatorOneOnOneVEFileSaveFailure(error) {
    return {
        type: CREATOR_ONE_ON_ONE_VE_FILE_SAVE_FAILURE,
        error,
    };
}

export function creatorVirtualExperienceFileDeleteStart(data) {
    return {
        type: CREATOR_ONE_ON_ONE_VE_FILE_DELETE_START,
        data,
    };
}

export function creatorVirtualExperienceFileDeleteSuccess(data) {
    return {
        type: CREATOR_ONE_ON_ONE_VE_FILE_DELETE_SUCCESS,
        data,
    };
}

export function creatorVirtualExperienceFileDeleteFailure(error) {
    return {
        type: CREATOR_ONE_ON_ONE_VE_FILE_DELETE_FAILURE,
        error,
    };
}

export function creatorVirtualExperienceSaveStart(data) {
    return {
        type: CREATOR_ONE_ON_ONE_VE_SAVE_START,
        data,
    };
}

export function creatorVirtualExperienceSaveSuccess(data) {
    return {
        type: CREATOR_ONE_ON_ONE_VE_SAVE_SUCCESS,
        data,
    };
}

export function creatorVirtualExperienceSaveFailure(error) {
    return {
        type: CREATOR_ONE_ON_ONE_VE_SAVE_FAILURE,
        error,
    };
}

export function creatorVirtualExperienceDeleteStart(data) {
    return {
        type: CREATOR_ONE_ON_ONE_VE_DELETE_START,
        data,
    };
}

export function creatorVirtualExperienceDeleteSuccess(data) {
    return {
        type: CREATOR_ONE_ON_ONE_VE_DELETE_SUCCESS,
        data,
    };
}

export function creatorVirtualExperienceDeleteFailure(error) {
    return {
        type: CREATOR_ONE_ON_ONE_VE_DELETE_FAILURE,
        error,
    };
}

export function creatorVirtualExperienceViewStart(data) {
    return {
        type: CREATOR_ONE_ON_ONE_VE_VIEW_START,
        data,
    };
}

export function creatorVirtualExperienceViewSuccess(data) {
    return {
        type: CREATOR_ONE_ON_ONE_VE_VIEW_SUCCESS,
        data,
    };
}

export function creatorVirtualExperienceViewFailure(error) {
    return {
        type: CREATOR_ONE_ON_ONE_VE_VIEW_FAILURE,
        error,
    };
}

export function creatorVirtualExperienceStatusStart(data) {
    return {
        type: CREATOR_ONE_ON_ONE_VE_STATUS_START,
        data,
    };
}

export function creatorVirtualExperienceStatusSuccess(data) {
    return {
        type: CREATOR_ONE_ON_ONE_VE_STATUS_SUCCESS,
        data,
    };
}

export function creatorVirtualExperienceStatusFailure(error) {
    return {
        type: CREATOR_ONE_ON_ONE_VE_STATUS_FAILURE,
        error,
    };
}

