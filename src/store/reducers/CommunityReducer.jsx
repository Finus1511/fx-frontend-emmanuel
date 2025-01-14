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
  UPDATE_COMMUNITY_MESSAGES_SUCCESS,
  FORCE_COMMUNITY_MESSAGES_SUCCESS,
  FETCH_MORE_COMMUNITY_MESSAGES_START,
  COMMUNITY_ASSET_FILES_UPLOAD_START,
  COMMUNITY_ASSET_FILES_UPLOAD_SUCCESS,
  COMMUNITY_ASSET_FILES_UPLOAD_FAILURE,
  UPDATE_COMMUNITY_DETAILS_START,
  UPDATE_COMMUNITY_DETAILS_SUCCESS,
  UPDATE_COMMUNITY_DETAILS_FAILURE,
  COMMUNITY_MESSAGE_DELETE_START,
  COMMUNITY_MESSAGE_DELETE_SUCCESS,
  COMMUNITY_MESSAGE_DELETE_FAILURE,
} from "../actions/ActionConstant";

const initialState = {
  communityUsers: {
    data: {},
    loading: true,
    error: false,
  },
  communityAssets: {
    data: {},
    loading: true,
    error: false,
  },
  communityMessages: {
    data: {},
    loading: true,
    error: false,
  },
  communityUser: null,
  communityFilesUpload: {
    data: {},
    loading: true,
    error: false,
    loadingButtonContent: null,
    buttonDisable: false,
  },
  communityMessageDelete: {
    data: {},
    loading: true,
    error: false,
    loadingButtonContent: null,
    buttonDisable: false,
  },
  communityUpdate: {
    data: {},
    loading: true,
    error: false,
    loadingButtonContent: null,
    buttonDisable: false,
  },
};

const CommunityReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMMUNITY_USER:
      return {
        ...state,
        communityUser: action.data,
      }

    case FETCH_COMMUNITY_USERS_START:
      return {
        ...state,
        communityUsers: {
          data: {},
          loading: true,
          error: false,
        },
      };
    case FETCH_MORE_COMMUNITY_USERS_START:
      return state;
    case FETCH_COMMUNITY_USERS_SUCCESS:
      return {
        ...state,
        communityUsers: {
          data: action.data,
          loading: false,
          error: false,
        }
      };
    case FETCH_COMMUNITY_USERS_FAILURE:
      return {
        ...state,
        communityUsers: {
          data: {},
          loading: false,
          error: action.error,
        }
      }
    case FETCH_USER_COMMUNITY_ASSETS_START:
      return {
        ...state,
        communityAssets: {
          data: {
            chat_assets: [],
            total: 0
          },
          loading: true,
          error: false,
        }
      }
    case FETCH_MORE_USER_COMMUNITY_ASSETS_START:
      return state;
    case FETCH_USER_COMMUNITY_ASSETS_SUCCESS:
      return {
        ...state,
        communityAssets: {
          data: {
            chat_assets: [...state.communityAssets.data.chat_assets, ...action.data.chat_assets],
            total: action.data.total,
          },
          loading: false,
          error: false,
        }
      }
    case FETCH_USER_COMMUNITY_ASSETS_FAILURE:
      return {
        ...state,
        communityAssets: {
          data: {},
          loading: false,
          error: action.error,
        }
      }
    case FETCH_COMMUNITY_MESSAGES_START:
      return {
        ...state,
        communityMessages: {
          data: {
            messages: [],
          },
          loading: true,
          error: false,
        }
      }
    case FETCH_MORE_COMMUNITY_MESSAGES_START:
      return state;
    case FETCH_COMMUNITY_MESSAGES_SUCCESS:
      return {
        ...state,
        communityMessages: {
          data: {
            messages: [...state.communityMessages.data.messages, ...action.data.messages],
            is_block_user: action.data.is_block_user,
            total: action.data.total,
            user: action.data.user,
          },
          loading: false,
          error: false,
        }
      }
    case UPDATE_COMMUNITY_MESSAGES_SUCCESS:
      return {
        ...state,
        communityMessages: {
          data: {
            ...state.communityMessages.data,
            messages: action.data.delete ? action.data.messages : [action.data, ...state.communityMessages.data.messages],
            total: state.communityMessages.data?.total + 1
          },
          loading: false,
          error: false,
        }
      }
    case FORCE_COMMUNITY_MESSAGES_SUCCESS:
      return {
        ...state,
        communityUsers: {
          data: action.data,
          loading: false,
          error: false,
        }
      }

    case FETCH_COMMUNITY_MESSAGES_FAILURE:
      return {
        ...state,
        communityMessages: {
          data: {},
          loading: false,
          error: action.error,
        }
      }

    case COMMUNITY_ASSET_FILES_UPLOAD_START:
      return {
        ...state,
        communityFilesUpload: {
          data: {},
          loading: true,
          error: false,
          buttonDisable: true,
          loadingButtonContent: "Uploading",
        }
      }
    case COMMUNITY_ASSET_FILES_UPLOAD_SUCCESS:
      return {
        ...state,
        communityFilesUpload: {
          data: action.data,
          loading: false,
          error: false,
          buttonDisable: false,
          loadingButtonContent: null,
        }
      }
    case COMMUNITY_ASSET_FILES_UPLOAD_FAILURE:
      return {
        ...state,
        communityFilesUpload: {
          data: {},
          loading: false,
          error: action.error,
          buttonDisable: false,
          loadingButtonContent: null,
        }
      }
    case COMMUNITY_MESSAGE_DELETE_START:
      return {
        ...state,
        communityMessageDelete: {
          data: {},
          loading: true,
          error: false,
          buttonDisable: true,
          loadingButtonContent: "Deleting",
        },
      };
    case COMMUNITY_MESSAGE_DELETE_SUCCESS:
      return {
        ...state,
        communityMessageDelete: {
          data: action.data,
          loading: false,
          error: false,
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case COMMUNITY_MESSAGE_DELETE_FAILURE:
      return {
        ...state,
        communityMessageDelete: {
          data: {},
          loading: false,
          error: action.error,
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case UPDATE_COMMUNITY_DETAILS_START:
      return {
        ...state,
        communityUpdate: {
          data: {},
          loading: true,
          error: false,
          buttonDisable: true,
          loadingButtonContent: "Updating",
        }
      }
    case UPDATE_COMMUNITY_DETAILS_SUCCESS:
      return {
        ...state,
        communityUpdate: {
          data: action.data,
          loading: false,
          error: false,
          buttonDisable: false,
          loadingButtonContent: null,
        }
      }
    case UPDATE_COMMUNITY_DETAILS_FAILURE:
      return {
        ...state,
        communityUpdate: {
          data: {},
          loading: false,
          error: action.error,
          buttonDisable: false,
          loadingButtonContent: null,
        }
      }

    default: return state;
  }
}

export default CommunityReducer;
