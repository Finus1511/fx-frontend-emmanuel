import {
    CREATE_FOLDER_START,
    CREATE_FOLDER_SUCCESS,
    CREATE_FOLDER_FAILURE,
    FOLDER_USER_LIST_START,
    FOLDER_USER_LIST_SUCCESS,
    FOLDER_USER_LIST_FAILURE,
    MORE_FOLDER_USER_LIST_START,
    DOWNLOAD_FOLDER_FILE_START,
    DOWNLOAD_FOLDER_FILE_SUCCESS,
    DOWNLOAD_FOLDER_FILE_FAILURE,
    DELETE_FOLDER_FILE_START,
    DELETE_FOLDER_FILE_SUCCESS,
    DELETE_FOLDER_FILE_FAILURE
} from "./ActionConstant";

export function createFolderStart(data) {
    return {
        type: CREATE_FOLDER_START,
        data,
    };
}

export function createFolderSuccess(data) {
    return {
        type: CREATE_FOLDER_SUCCESS,
        data,
    };
}

export function createFolderFailure(error) {
    return {
        type: CREATE_FOLDER_FAILURE,
        error,
    };
}

export function folderUserListStart(data) {
    return {
        type: FOLDER_USER_LIST_START,
        data,
    };
}

export function fetchMoreFolderUserListStart(data) {
    return {
        type: MORE_FOLDER_USER_LIST_START,
        data,
    };
}

export function folderUserListSuccess(data) {
    return {
        type: FOLDER_USER_LIST_SUCCESS,
        data,
    };
}

export function folderUserListFailure(error) {
    return {
        type: FOLDER_USER_LIST_FAILURE,
        error,
    };
}

export function downloadFolderFileStart(data) {
    return {
        type: DOWNLOAD_FOLDER_FILE_START,
        data,
    };
}

export function downloadFolderFileSuccess(data) {
    return {
        type: DOWNLOAD_FOLDER_FILE_SUCCESS,
        data,
    };
}

export function downloadFolderFileFailure(error) {
    return {
        type: DOWNLOAD_FOLDER_FILE_FAILURE,
        error,
    };
}
export function deleteFolderFileStart(data) {
    return {
        type: DELETE_FOLDER_FILE_START,
        data,
    };
}

export function deleteFolderFileSuccess(data) {
    return {
        type: DELETE_FOLDER_FILE_SUCCESS,
        data,
    };
}

export function deleteFolderFileFailure(error) {
    return {
        type: DELETE_FOLDER_FILE_FAILURE,
        error,
    };
}
