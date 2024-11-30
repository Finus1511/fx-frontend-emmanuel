import {
    USER_VIP_VE_BOOKING_LIST_START,
    USER_VIP_VE_BOOKING_LIST_SUCCESS,
    USER_VIP_VE_BOOKING_LIST_FAILURE,
    USER_VIP_VE_BOOKING_VIEW_START,
    USER_VIP_VE_BOOKING_VIEW_SUCCESS,
    USER_VIP_VE_BOOKING_VIEW_FAILURE,
    USER_VIP_VE_BOOKING_CANCEL_START,
    USER_VIP_VE_BOOKING_CANCEL_SUCCESS,
    USER_VIP_VE_BOOKING_CANCEL_FAILURE,
    USER_VIP_VE_LIST_START,
    USER_VIP_VE_LIST_SUCCESS,
    USER_VIP_VE_LIST_FAILURE,
    USER_VIP_VE_VIEW_START,
    USER_VIP_VE_VIEW_SUCCESS,
    USER_VIP_VE_VIEW_FAILURE,
    USER_VIP_VE_BOOKING_START,
    USER_VIP_VE_BOOKING_SUCCESS,
    USER_VIP_VE_BOOKING_FAILURE,
} from './ActionConstant'


export function fetchUserBookingListStart(data) {
    return {
        type: USER_VIP_VE_BOOKING_LIST_START,
        data,
    };
}

export function fetchUserBookingListSuccess(data) {
    return {
        type: USER_VIP_VE_BOOKING_LIST_SUCCESS,
        data,
    };
}

export function fetchUserBookingListFailure(error) {
    return {
        type: USER_VIP_VE_BOOKING_LIST_FAILURE,
        error,
    };
}

export function fetchUserBookingViewStart(data) {
    return {
        type: USER_VIP_VE_BOOKING_VIEW_START,
        data,
    };
}

export function fetchUserBookingViewSuccess(data) {
    return {
        type: USER_VIP_VE_BOOKING_VIEW_SUCCESS,
        data,
    };
}

export function fetchUserBookingViewFailure(error) {
    return {
        type: USER_VIP_VE_BOOKING_VIEW_FAILURE,
        error,
    };
}


export function userBookingCancelStart(data) {
    return {
        type: USER_VIP_VE_BOOKING_CANCEL_START,
        data,
    };
}

export function userBookingCancelSuccess(data) {
    return {
        type: USER_VIP_VE_BOOKING_CANCEL_SUCCESS,
        data,
    };
}

export function userBookingCancelFailure(error) {
    return {
        type: USER_VIP_VE_BOOKING_CANCEL_FAILURE,
        error,
    };
}

export function userVirtualVhListStart(data) {
    return {
        type: USER_VIP_VE_LIST_START,
        data,
    };
}

export function userVirtualVhListSuccess(data) {
    return {
        type: USER_VIP_VE_LIST_SUCCESS,
        data,
    };
}

export function userVirtualVhListFailure(error) {
    return {
        type: USER_VIP_VE_LIST_FAILURE,
        error,
    };
}

export function userVirtualVhViewStart(data) {
    return {
        type: USER_VIP_VE_VIEW_START,
        data,
    };
}

export function userVirtualVhViewSuccess(data) {
    return {
        type: USER_VIP_VE_VIEW_SUCCESS,
        data,
    };
}

export function userVirtualVhViewFailure(error) {
    return {
        type: USER_VIP_VE_VIEW_FAILURE,
        error,
    };
}
export function userVirtualVhBookingStart(data) {
    return {
        type: USER_VIP_VE_BOOKING_START,
        data,
    };
}

export function userVirtualVhBookingSuccess(data) {
    return {
        type: USER_VIP_VE_BOOKING_SUCCESS,
        data,
    };
}

export function userVirtualVhBookingFailure(error) {
    return {
        type: USER_VIP_VE_BOOKING_FAILURE,
        error,
    };
}