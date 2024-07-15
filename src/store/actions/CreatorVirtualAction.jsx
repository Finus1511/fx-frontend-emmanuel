import {
    CREATOR_VIRTUAL_BOOKING_LIST_START,
    CREATOR_VIRTUAL_BOOKING_LIST_SUCCESS,
    CREATOR_VIRTUAL_BOOKING_LIST_FAILURE,
    CREATOR_VIRTUAL_BOOKING_VIEW_START,
    CREATOR_VIRTUAL_BOOKING_VIEW_SUCCESS,
    CREATOR_VIRTUAL_BOOKING_VIEW_FAILURE,
    CREATOR_VIRTUAL_BOOKING_REJECT_START,
    CREATOR_VIRTUAL_BOOKING_REJECT_SUCCESS,
    CREATOR_VIRTUAL_BOOKING_REJECT_FAILURE,
    CREATOR_VIRTUAL_BOOKING_START_START,
    CREATOR_VIRTUAL_BOOKING_START_SUCCESS,
    CREATOR_VIRTUAL_BOOKING_START_FAILURE,
    CREATOR_VIRTUAL_BOOKING_END_START,
    CREATOR_VIRTUAL_BOOKING_END_SUCCESS,
    CREATOR_VIRTUAL_BOOKING_END_FAILURE,
    CREATOR_VIRTUAL_VH_LIST_START,
    CREATOR_VIRTUAL_VH_LIST_SUCCESS,
    CREATOR_VIRTUAL_VH_LIST_FAILURE,
    CREATOR_VIRTUAL_VH_FILE_SAVE_START,
    CREATOR_VIRTUAL_VH_FILE_SAVE_SUCCESS,
    CREATOR_VIRTUAL_VH_FILE_SAVE_FAILURE,
    CREATOR_VIRTUAL_VH_FILE_DELETE_START,
    CREATOR_VIRTUAL_VH_FILE_DELETE_SUCCESS,
    CREATOR_VIRTUAL_VH_FILE_DELETE_FAILURE,
    CREATOR_VIRTUAL_VH_SAVE_START,
    CREATOR_VIRTUAL_VH_SAVE_SUCCESS,
    CREATOR_VIRTUAL_VH_SAVE_FAILURE,
    CREATOR_VIRTUAL_VH_DELETE_START,
    CREATOR_VIRTUAL_VH_DELETE_SUCCESS,
    CREATOR_VIRTUAL_VH_DELETE_FAILURE,
    CREATOR_VIRTUAL_VH_VIEW_START,
    CREATOR_VIRTUAL_VH_VIEW_SUCCESS,
    CREATOR_VIRTUAL_VH_VIEW_FAILURE,
    CREATOR_VIRTUAL_VH_STATUS_START,
    CREATOR_VIRTUAL_VH_STATUS_SUCCESS,
    CREATOR_VIRTUAL_VH_STATUS_FAILURE,
    SLOT_AVAILABLE_START,
    SLOT_AVAILABLE_SUCCESS,
    SLOT_AVAILABLE_FAILURE,
    START_VIRTUAL_EXPERIENCE_START,
    START_VIRTUAL_EXPERIENCE_SUCCESS,
    START_VIRTUAL_EXPERIENCE_FAILURE,
    END_VIRTUAL_EXPERIENCE_START,
    END_VIRTUAL_EXPERIENCE_SUCCESS,
    END_VIRTUAL_EXPERIENCE_FAILURE,
    VIRTUAL_EXPERIENCE_HOST_UPDATE_START,
    VIRTUAL_EXPERIENCE_HOST_UPDATE_SUCCESS,
    VIRTUAL_EXPERIENCE_HOST_UPDATE_FAILURE,
} from './ActionConstant'


export function creatorVirtualBookingListStart(data) {
    return {
        type: CREATOR_VIRTUAL_BOOKING_LIST_START,
        data,
    };
}

export function creatorVirtualBookingListSuccess(data) {
    return {
        type: CREATOR_VIRTUAL_BOOKING_LIST_SUCCESS,
        data,
    };
}
export function creatorVirtualBookingListFailure(error) {
    return {
        type: CREATOR_VIRTUAL_BOOKING_LIST_FAILURE,
        error,
    };
}

export function creatorVirtualBookingViewStart(data) {
    return {
        type: CREATOR_VIRTUAL_BOOKING_VIEW_START,
        data,
    };
}

export function creatorVirtualBookingViewSuccess(data) {
    return {
        type: CREATOR_VIRTUAL_BOOKING_VIEW_SUCCESS,
        data,
    };
}

export function creatorVirtualBookingViewFailure(error) {
    return {
        type: CREATOR_VIRTUAL_BOOKING_VIEW_FAILURE,
        error,
    };
}

export function creatorVirtualBookingRejectStart(data) {
    return {
        type: CREATOR_VIRTUAL_BOOKING_REJECT_START,
        data,
    };
}

export function creatorVirtualBookingRejectSuccess(data) {
    return {
        type: CREATOR_VIRTUAL_BOOKING_REJECT_SUCCESS,
        data,
    };
}

export function creatorVirtualBookingRejectFailure(error) {
    return {
        type: CREATOR_VIRTUAL_BOOKING_REJECT_FAILURE,
        error,
    };
}

export function creatorVirtualBookingStartStart(data) {
    return {
        type: CREATOR_VIRTUAL_BOOKING_START_START,
        data,
    };
}

export function creatorVirtualBookingStartSuccess(data) {
    return {
        type: CREATOR_VIRTUAL_BOOKING_START_SUCCESS,
        data,
    };
}

export function creatorVirtualBookingStartFailure(error) {
    return {
        type: CREATOR_VIRTUAL_BOOKING_START_FAILURE,
        error,
    };
}

export function creatorVirtualBookingEndStart(data) {
    return {
        type: CREATOR_VIRTUAL_BOOKING_END_START,
        data,
    };
}

export function creatorVirtualBookingEndSuccess(data) {
    return {
        type: CREATOR_VIRTUAL_BOOKING_END_SUCCESS,
        data,
    };
}

export function creatorVirtualBookingEndFailure(error) {
    return {
        type: CREATOR_VIRTUAL_BOOKING_END_FAILURE,
        error,
    };
}

export function creatorVirtualExperienceListStart(data) {
    return {
        type: CREATOR_VIRTUAL_VH_LIST_START,
        data,
    };
}

export function creatorVirtualExperienceListSuccess(data) {
    return {
        type: CREATOR_VIRTUAL_VH_LIST_SUCCESS,
        data,
    };
}

export function creatorVirtualExperienceListFailure(error) {
    return {
        type: CREATOR_VIRTUAL_VH_LIST_FAILURE,
        error,
    };
}

export function creatorVirtualExperienceFileSaveStart(data) {
    return {
        type: CREATOR_VIRTUAL_VH_FILE_SAVE_START,
        data,
    };
}

export function creatorVirtualExperienceFileSaveSuccess(data) {
    return {
        type: CREATOR_VIRTUAL_VH_FILE_SAVE_SUCCESS,
        data,
    };
}

export function creatorVirtualExperienceFileSaveFailure(error) {
    return {
        type: CREATOR_VIRTUAL_VH_FILE_SAVE_FAILURE,
        error,
    };
}

export function creatorVirtualExperienceFileDeleteStart(data) {
    return {
        type: CREATOR_VIRTUAL_VH_FILE_DELETE_START,
        data,
    };
}

export function creatorVirtualExperienceFileDeleteSuccess(data) {
    return {
        type: CREATOR_VIRTUAL_VH_FILE_DELETE_SUCCESS,
        data,
    };
}

export function creatorVirtualExperienceFileDeleteFailure(error) {
    return {
        type: CREATOR_VIRTUAL_VH_FILE_DELETE_FAILURE,
        error,
    };
}

export function creatorVirtualExperienceSaveStart(data) {
    return {
        type: CREATOR_VIRTUAL_VH_SAVE_START,
        data,
    };
}

export function creatorVirtualExperienceSaveSuccess(data) {
    return {
        type: CREATOR_VIRTUAL_VH_SAVE_SUCCESS,
        data,
    };
}

export function creatorVirtualExperienceSaveFailure(error) {
    return {
        type: CREATOR_VIRTUAL_VH_SAVE_FAILURE,
        error,
    };
}

export function creatorVirtualExperienceDeleteStart(data) {
    return {
        type: CREATOR_VIRTUAL_VH_DELETE_START,
        data,
    };
}

export function creatorVirtualExperienceDeleteSuccess(data) {
    return {
        type: CREATOR_VIRTUAL_VH_DELETE_SUCCESS,
        data,
    };
}

export function creatorVirtualExperienceDeleteFailure(error) {
    return {
        type: CREATOR_VIRTUAL_VH_DELETE_FAILURE,
        error,
    };
}

export function creatorVirtualExperienceViewStart(data) {
    return {
        type: CREATOR_VIRTUAL_VH_VIEW_START,
        data,
    };
}

export function creatorVirtualExperienceViewSuccess(data) {
    return {
        type: CREATOR_VIRTUAL_VH_VIEW_SUCCESS,
        data,
    };
}

export function creatorVirtualExperienceViewFailure(error) {
    return {
        type: CREATOR_VIRTUAL_VH_VIEW_FAILURE,
        error,
    };
}

export function creatorVirtualExperienceStatusStart(data) {
    return {
        type: CREATOR_VIRTUAL_VH_STATUS_START,
        data,
    };
}

export function creatorVirtualExperienceStatusSuccess(data) {
    return {
        type: CREATOR_VIRTUAL_VH_STATUS_SUCCESS,
        data,
    };
}

export function creatorVirtualExperienceStatusFailure(error) {
    return {
        type: CREATOR_VIRTUAL_VH_STATUS_FAILURE,
        error,
    };
}


export function slotAvailableStart(data) {
    return {
        type: SLOT_AVAILABLE_START,
        data,
    };
}

export function slotAvailableSuccess(data) {
    return {
        type: SLOT_AVAILABLE_SUCCESS,
        data,
    };
}

export function slotAvailableFailure(error) {
    return {
        type: SLOT_AVAILABLE_FAILURE,
        error,
    };
}

export function startVirtualExperienceStart(data) {
    return {
        type: START_VIRTUAL_EXPERIENCE_START,
        data,
    };
}

export function startVirtualExperienceSuccess(data) {
    return {
        type: START_VIRTUAL_EXPERIENCE_SUCCESS,
        data,
    };
}

export function startVirtualExperienceFailure(error) {
    return {
        type: START_VIRTUAL_EXPERIENCE_FAILURE,
        error,
    };
}

export function endVirtualExperienceStart(data) {
    return {
        type: END_VIRTUAL_EXPERIENCE_START,
        data,
    };
}

export function endVirtualExperienceSuccess(data) {
    return {
        type: END_VIRTUAL_EXPERIENCE_SUCCESS,
        data,
    };
}

export function endVirtualExperienceFailure(error) {
    return {
        type: END_VIRTUAL_EXPERIENCE_FAILURE,
        error,
    };
}

export function virtualExperienceHostUpdateStart(data) {
    return {
        type: VIRTUAL_EXPERIENCE_HOST_UPDATE_START,
        data,
    };
}

export function virtualExperienceHostUpdateSuccess(data) {
    return {
        type: VIRTUAL_EXPERIENCE_HOST_UPDATE_SUCCESS,
        data,
    };
}

export function virtualExperienceHostUpdateFailure(error) {
    return {
        type: VIRTUAL_EXPERIENCE_HOST_UPDATE_FAILURE,
        error,
    };
}

