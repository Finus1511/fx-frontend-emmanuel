import {
  FETCH_SINGLE_USER_PROFILE_START,
  FETCH_SINGLE_USER_PROFILE_SUCCESS,
  FETCH_SINGLE_USER_PROFILE_FAILURE,
  FETCH_SINGLE_USER_POSTS_START,
  FETCH_SINGLE_USER_POSTS_SUCCESS,
  FETCH_SINGLE_USER_POSTS_FAILURE,
  SEARCH_USER_POST_START,
  SEARCH_USER_POST_SUCCESS,
  SEARCH_USER_POST_FAILURE,
  UPDATE_SINGLE_USER_POSTS_SUCCESS,
} from "./ActionConstant";

export function fetchSingleUserProfileStart(data) {
  return {
    type: FETCH_SINGLE_USER_PROFILE_START,
    data,
  };
}

export function fetchSingleUserProfileSuccess(data) {
  return {
    type: FETCH_SINGLE_USER_PROFILE_SUCCESS,
    data,
  };
}

export function fetchSingleUserProfileFailure(error) {
  return {
    type: FETCH_SINGLE_USER_PROFILE_FAILURE,
    error,
  };
}

export function fetchSingleUserPostsStart(data) {
  return {
    type: FETCH_SINGLE_USER_POSTS_START,
    data,
  };
}

export function fetchSingleUserPostsSuccess(data) {
  return {
    type: FETCH_SINGLE_USER_POSTS_SUCCESS,
    data,
  };
}

export function fetchSingleUserPostsFailure(error) {
  return {
    type: FETCH_SINGLE_USER_POSTS_FAILURE,
    error,
  };
}

export function updateSingleUserPostsSuccess(data) {
  return {
    type: UPDATE_SINGLE_USER_POSTS_SUCCESS,
    data,
  };
}

export function searchUserPostStart(data) {
  return {
    type: SEARCH_USER_POST_START,
    data,
  };
}

export function searchUserPostSuccess(data) {
  return {
    type: SEARCH_USER_POST_SUCCESS,
    data,
  };
}

export function searchUserPostFailure(error) {
  return {
    type: SEARCH_USER_POST_FAILURE,
    error,
  };
}