import {
  FETCH_CHAT_USERS_START,
  FETCH_CHAT_USERS_SUCCESS,
  FETCH_CHAT_USERS_FAILURE,
  FETCH_CHAT_MESSAGE_START,
  FETCH_CHAT_MESSAGE_SUCCESS,
  FETCH_CHAT_MESSAGE_FAILURE,
  SAVE_CHAT_USERS_START,
  SAVE_CHAT_USERS_SUCCESS,
  SAVE_CHAT_USERS_FAILURE,
  ADD_MESSAGE_CONTENT,
  ADD_MESSAGE_CONTENT_START,
  ADD_MESSAGE_CONTENT_SUCCESS,
  CHANGE_CHAT_AUDIO,
  FETCH_CHAT_MESSAGES_START,
  FETCH_CHAT_MESSAGES_SUCCESS,
  FETCH_CHAT_MESSAGES_FAILURE,
  FETCH_USER_CHAT_ASSETS_START,
  FETCH_USER_CHAT_ASSETS_SUCCESS,
  FETCH_USER_CHAT_ASSETS_FAILURE,
  FETCH_MORE_CHAT_MESSAGES_START,
  UPDATE_CHAT_MESSAGES_SUCCESS,
  FORCE_CHAT_MESSAGES_SUCCESS,
  CHAT_USER,
  CHAT_ASSET_FILES_UPLOAD_START,
  CHAT_ASSET_FILES_UPLOAD_SUCCESS,
  CHAT_ASSET_FILES_UPLOAD_FAILURE,
  FETCH_MORE_USER_CHAT_ASSETS_START,
  FETCH_MORE_CHAT_USERS_START,
  FORCE_CHAT_USERS_SUCCESS,
  FORCE_USER_CHAT_ASSETS_SUCCESS,
  BROADCAST_MESSAGE_START,
  BROADCAST_MESSAGE_SUCCESS,
  BROADCAST_MESSAGE_FAILURE,
  CHAT_MESSAGE_DELETE_START,
  CHAT_MESSAGE_DELETE_SUCCESS,
  CHAT_MESSAGE_DELETE_FAILURE,
  CHAT_BROADCAST_ASSET_SAVE_START,
  CHAT_BROADCAST_ASSET_SAVE_SUCCESS,
  CHAT_BROADCAST_ASSET_SAVE_FAILURE,
  CHAT_MESSAGE_PAYMENT_BY_WALLET_START,
  CHAT_MESSAGE_PAYMENT_BY_WALLET_SUCCESS,
  CHAT_MESSAGE_PAYMENT_BY_WALLET_FAILURE,
} from "./ActionConstant";

export function fetchChatUsersStart(data) {
  return {
    type: FETCH_CHAT_USERS_START,
    data,
  };
}

export function fetchMoreChatUsersStart(data) {
  return {
    type: FETCH_MORE_CHAT_USERS_START,
    data,
  }
}

export function fetchChatUsersSuccess(data) {
  return {
    type: FETCH_CHAT_USERS_SUCCESS,
    data,
  };
}

export function forceChatUsersSuccess(data) {
  return {
    type: FORCE_CHAT_USERS_SUCCESS,
    data,
  }
}

export function fetchChatUsersFailure(error) {
  return {
    type: FETCH_CHAT_USERS_FAILURE,
    error,
  };
}

export function fetchChatMessageStart(data) {
  return {
    type: FETCH_CHAT_MESSAGE_START,
    data,
  };
}

export function fetchChatMessageSuccess(data) {
  return {
    type: FETCH_CHAT_MESSAGE_SUCCESS,
    data,
  };
}

export function fetchChatMessageFailure(error) {
  return {
    type: FETCH_CHAT_MESSAGE_FAILURE,
    error,
  };
}

export function addMessageContent(data) {
  return {
    type: ADD_MESSAGE_CONTENT,
    data,
  };
}

export function saveChatUserStart(data) {
  return {
    type: SAVE_CHAT_USERS_START,
    data,
  };
}

export function saveChatUserSuccess(data) {
  return {
    type: SAVE_CHAT_USERS_SUCCESS,
    data,
  };
}

export function saveChatUserFailure(error) {
  return {
    type: SAVE_CHAT_USERS_FAILURE,
    error,
  };
}
export function fetchChatMoreDataStart(data) {
  return {
    type: ADD_MESSAGE_CONTENT_START,
    data,
  };
}

export function fetchChatMoreDataSucess(data) {
  return {
    type: ADD_MESSAGE_CONTENT_SUCCESS,
    data,
  };
}

// New Chat

export function changeChatAudio(data) {
  return {
    type: CHANGE_CHAT_AUDIO,
    data,
  }
}

export function fetchUserChatAssetsStart(data) {
  return {
    type: FETCH_USER_CHAT_ASSETS_START,
    data,
  }
}

export function fetchMoreUserChatAssetsStart(data) {
  return {
    type: FETCH_MORE_USER_CHAT_ASSETS_START,
    data,
  }
}

export function fetchUserChatAssetsSuccess(data) {
  return {
    type: FETCH_USER_CHAT_ASSETS_SUCCESS,
    data,
  }
}

export function forceUserChatAssetsSuccesss(data) {
  return {
    type: FORCE_USER_CHAT_ASSETS_SUCCESS,
    data,
  }
}

export function fetchUserChatAssetsFailure(error) {
  return {
    type: FETCH_USER_CHAT_ASSETS_FAILURE,
    error,
  }
}

export function fetchChatMessagesStart(data) {
  return {
    type: FETCH_CHAT_MESSAGES_START,
    data,
  }
}

export function fetchMoreChatMessagesStart(data) {
  return {
    type: FETCH_MORE_CHAT_MESSAGES_START,
    data,
  }
}

export function fetchCHatMessagesSuccess(data) {
  return {
    type: FETCH_CHAT_MESSAGES_SUCCESS,
    data,
  }
}

export function updateChatMessagesSuccess(data) {
  return {
    type: UPDATE_CHAT_MESSAGES_SUCCESS,
    data,
  }
}

export function forceChatMessagesSuccess(data) {
  return {
    type: FORCE_CHAT_MESSAGES_SUCCESS,
    data,
  }
}

export function fetchChatMessagesFailure(error) {
  return {
    type: FETCH_CHAT_MESSAGES_FAILURE,
    error,
  }
}

export function chatUser(data) {
  return {
    type: CHAT_USER,
    data,
  }
}

// Chat Assets Upload
export function chatAssetFilesUploadStart(data) {
  return {
    type: CHAT_ASSET_FILES_UPLOAD_START,
    data,
  }
}

export function chatAssetFilesUploadSuccess(data) {
  return {
    type: CHAT_ASSET_FILES_UPLOAD_SUCCESS,
    data,
  }
}

export function chatAssetFilesUploadFailure(error) {
  return {
    type: CHAT_ASSET_FILES_UPLOAD_FAILURE,
    error,
  }
}

// Broadcast message
export function broadcastMessageStart(data) {
  return {
    type: BROADCAST_MESSAGE_START,
    data,
  }
}

export function broadcastMessageSuccess(data) {
  return {
    type: BROADCAST_MESSAGE_SUCCESS,
    data,
  }
}

export function broadcastMessageFailure(error) {
  return {
    type: BROADCAST_MESSAGE_FAILURE,
    error,
  }
}

export function chatMessageDeleteStart(data) {
  return {
    type: CHAT_MESSAGE_DELETE_START,
    data,
  };
}

export function chatMessageDeleteSuccess(data) {
  return {
    type: CHAT_MESSAGE_DELETE_SUCCESS,
    data,
  };
}

export function chatMessageDeleteFailure(error) {
  return {
    type: CHAT_MESSAGE_DELETE_FAILURE,
    error,
  };
}

export function chatBroadcastAssetSaveStart(data) {
  return {
    type: CHAT_BROADCAST_ASSET_SAVE_START,
    data,
  };
}

export function chatBroadcastAssetSaveSuccess(data) {
  return {
    type: CHAT_BROADCAST_ASSET_SAVE_SUCCESS,
    data,
  };
}

export function chatBroadcastAssetSaveFailure(error) {
  return {
    type: CHAT_BROADCAST_ASSET_SAVE_FAILURE,
    error,
  };
}

export function chatMessagePaymentByWalletStart(data) {
  return {
    type: CHAT_MESSAGE_PAYMENT_BY_WALLET_START,
    data,
  };
}

export function chatMessagePaymentByWalletSuccess(data) {
  return {
    type: CHAT_MESSAGE_PAYMENT_BY_WALLET_SUCCESS,
    data,
  };
}

export function chatMessagePaymentByWalletFailure(error) {
  return {
    type: CHAT_MESSAGE_PAYMENT_BY_WALLET_FAILURE,
    error,
  };
}
