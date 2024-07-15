import {
    FAVORITE_LIST_START,
    MORE_FAVORITE_LIST_START,
    FAVORITE_LIST_SUCCESS,
    FAVORITE_LIST_FAILURE,
    ADD_FAVORITE_START,
    ADD_FAVORITE_SUCCESS,
    ADD_FAVORITE_FAILURE,
    DELETE_FAVORITE_START,
    DELETE_FAVORITE_SUCCESS,
    DELETE_FAVORITE_FAILURE,
} from "./ActionConstant";

export function fetchFavoriteListStart(data) {
    return {
        type: FAVORITE_LIST_START,
        data,
    };
}
export function fetchMoreFavoriteListStart(data) {
    return {
        type: MORE_FAVORITE_LIST_START,
        data,
    };
}

export function fetchFavoriteListSuccess(data) {
    return {
        type: FAVORITE_LIST_SUCCESS,
        data,
    };
}

export function fetchFavoriteListFailure(error) {
    return {
        type: FAVORITE_LIST_FAILURE,
        error,
    };
}

export function addFavoriteStart(data) {
    return {
        type: ADD_FAVORITE_START,
        data,
    };
}

export function addFavoriteSuccess(data) {
    return {
        type: ADD_FAVORITE_SUCCESS,
        data,
    };
}

export function addFavoriteFailure(error) {
    return {
        type: ADD_FAVORITE_FAILURE,
        error,
    };
}

export function deleteFavoiteStart(data) {
    return {
        type: DELETE_FAVORITE_START,
        data,
    };
}

export function deleteFavoiteSuccess(data) {
    return {
        type: DELETE_FAVORITE_SUCCESS,
        data,
    };
}

export function deleteFavoiteFailure(error) {
    return {
        type: DELETE_FAVORITE_FAILURE,
        error,
    };
}
