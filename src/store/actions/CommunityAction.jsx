import {
  COMMUNITY_USER,
  FETCH_COMMUNITY_USERS_START,
  FETCH_COMMUNITY_USERS_SUCCESS,
  FETCH_COMMUNITY_USERS_FAILURE,
  FETCH_MORE_COMMUNITY_USERS_START,
  FETCH_USER_COMMUNITY_ASSETS_START,
  FETCH_USER_COMMUNITY_ASSETS_SUCCESS,
  FETCH_USER_COMMUNITY_ASSETS_FAILURE,
  FETCH_MORE_USER_COMMUNITY_ASSETS_START,
  FETCH_COMMUNITY_MESSAGES_START,
  FETCH_COMMUNITY_MESSAGES_SUCCESS,
  FETCH_COMMUNITY_MESSAGES_FAILURE,
  FETCH_MORE_COMMUNITY_MESSAGES_START,
  UPDATE_COMMUNITY_MESSAGES_SUCCESS,
  FORCE_COMMUNITY_MESSAGES_SUCCESS,
  COMMUNITY_ASSET_FILES_UPLOAD_START,
  COMMUNITY_ASSET_FILES_UPLOAD_SUCCESS,
  COMMUNITY_ASSET_FILES_UPLOAD_FAILURE,
  UPDATE_COMMUNITY_DETAILS_START,
  UPDATE_COMMUNITY_DETAILS_SUCCESS,
  UPDATE_COMMUNITY_DETAILS_FAILURE,
  COMMUNITY_MESSAGE_DELETE_START,
  COMMUNITY_MESSAGE_DELETE_SUCCESS,
  COMMUNITY_MESSAGE_DELETE_FAILURE,
} from "./ActionConstant";

export function communityUser(data) {
  return {
    type: COMMUNITY_USER,
    data,
  }
}

export function fetchCommunityUsersStart(data) {
  return {
    type: FETCH_COMMUNITY_USERS_START,
    data,
  };
}

export function fetchMoreCommunityUsersStart(data) {
  return {
    type: FETCH_MORE_COMMUNITY_USERS_START,
    data,
  }
}

export function fetchCommunityUsersSuccess(data) {
  return {
    type: FETCH_COMMUNITY_USERS_SUCCESS,
    data,
  };
}

export function fetchCommunityUsersFailure(error) {
  return {
    type: FETCH_COMMUNITY_USERS_FAILURE,
    error,
  };
}

export function fetchUserCommunityAssetsStart(data) {
  return {
    type: FETCH_USER_COMMUNITY_ASSETS_START,
    data,
  };
}

export function fetchMoreUserCommunityAssetsStart(data) {
  return {
    type: FETCH_MORE_USER_COMMUNITY_ASSETS_START,
    data,
  }
}

export function fetchUserCommunityAssetsSuccess(data) {
  return {
    type: FETCH_USER_COMMUNITY_ASSETS_SUCCESS,
    data,
  };
}

export function fetchUserCommunityAssetsFailure(error) {
  return {
    type: FETCH_USER_COMMUNITY_ASSETS_FAILURE,
    error,
  };
}

export function fetchCommunityMessagesStart(data) {
  return {
    type: FETCH_COMMUNITY_MESSAGES_START,
    data,
  };
}

export function fetchMoreCommunityMessagesStart(data) {
  return {
    type: FETCH_MORE_COMMUNITY_MESSAGES_START,
    data,
  }
}

export function fetchCommunityMessagesSuccess(data) {
  return {
    type: FETCH_COMMUNITY_MESSAGES_SUCCESS,
    data,
  };
}

export function fetchCommunityMessagesFailure(error) {
  return {
    type: FETCH_COMMUNITY_MESSAGES_FAILURE,
    error,
  };
}

export function updateCommunityMessagesSuccess(data) {
  return {
    type: UPDATE_COMMUNITY_MESSAGES_SUCCESS,
    data,
  }
}

export function forceCommunityMessagesSuccess(data) {
  return {
    type: FORCE_COMMUNITY_MESSAGES_SUCCESS,
    data,
  }
}

export function communityAssetFilesUploadStart(data) {
  return {
    type: COMMUNITY_ASSET_FILES_UPLOAD_START,
    data,
  };
}

export function communityAssetFilesUploadSuccess(data) {
  return {
    type: COMMUNITY_ASSET_FILES_UPLOAD_SUCCESS,
    data,
  };
}

export function communityAssetFilesUploadFailure(error) {
  return {
    type: COMMUNITY_ASSET_FILES_UPLOAD_FAILURE,
    error,
  };
}

export function communityMessageDeleteStart(data) {
  return {
    type: COMMUNITY_MESSAGE_DELETE_START,
    data,
  };
}

export function communityMessageDeleteSuccess(data) {
  return {
    type: COMMUNITY_MESSAGE_DELETE_SUCCESS,
    data,
  };
}

export function communityMessageDeleteFailure(error) {
  return {
    type: COMMUNITY_MESSAGE_DELETE_FAILURE,
    error,
  };
}

export function updateCommunityDetailsStart(data) {
  return {
    type: UPDATE_COMMUNITY_DETAILS_START,
    data,
  };
}

export function updateCommunityDetailsSuccess(data) {
  return {
    type: UPDATE_COMMUNITY_DETAILS_SUCCESS,
    data,
  };
}

export function updateCommunityDetailsFailure(error) {
  return {
    type: UPDATE_COMMUNITY_DETAILS_FAILURE,
    error,
  };
}