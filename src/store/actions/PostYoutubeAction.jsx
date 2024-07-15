import {
    POST_YOUTUBE_LINK_START,
    POST_YOUTUBE_LINK_SUCCESS,
    POST_YOUTUBE_LINK_FAILURE,
} from "./ActionConstant";

export function postYoutubeLinkStart(data) {
    return {
        type: POST_YOUTUBE_LINK_START,
        data,
    };
}

export function postYoutubeLinkSuccess(data) {
    return {
        type: POST_YOUTUBE_LINK_SUCCESS,
        data,
    };
}

export function postYoutubeLinkFailure(error) {
    return {
        type: POST_YOUTUBE_LINK_FAILURE,
        error,
    };
}
