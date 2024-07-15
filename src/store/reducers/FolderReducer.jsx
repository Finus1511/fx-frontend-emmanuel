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
  DELETE_FOLDER_FILE_FAILURE,
} from "../actions/ActionConstant";

const initialState = {
  createFolder: {
    data: {},
    loading: true,
    error: false,
  },
  folderUserList: {
    data: {
      folder_list: [],
      total: 0,
    },
    loading: true,
    error: false,
  },
  downloadFolderFile: {
    data: {},
    loading: true,
    error: false,
  },
  deleteFolderFile: {
    data: {},
    loading: true,
    error: false,
  },
};

const FolderReducer = (state = initialState, action) => {
  switch (action.type) {

    case CREATE_FOLDER_START:
      return {
        ...state,
        createFolder: {
          data: {},
          loading: true,
          error: false,
        },
      };
    case CREATE_FOLDER_SUCCESS:
      return {
        ...state,
        createFolder: {
          data: action.data,
          loading: false,
          error: false,
        },
      };
    case CREATE_FOLDER_FAILURE:
      return {
        ...state,
        createFolder: {
          data: {},
          loading: true,
          error: action.error,
        },
      };

    case FOLDER_USER_LIST_START:
      return {
        ...state,
        folderUserList: {
          data: {
            folder_list: [],
            total: 0,
          },
          loading: true,
          error: false,
        },
      };
    case FOLDER_USER_LIST_SUCCESS:
      return {
        ...state,
        folderUserList: {
          data: {
            folder_list: [...state.folderUserList.data.folder_list, ...action.data.folder_list],
            total: action.data.total,
          },
          loading: false,
          error: false,
        },
      };
    case FOLDER_USER_LIST_FAILURE:
      return {
        ...state,
        folderUserList: {
          data: {},
          loading: true,
          error: action.error,
        },
      };

    case MORE_FOLDER_USER_LIST_START:
      return state;
      
      case DOWNLOAD_FOLDER_FILE_START:
        return {
          ...state,
          downloadFolderFile: {
            data: {},
            loading: true,
            error: false,
          },
        };
      case DOWNLOAD_FOLDER_FILE_SUCCESS:
        return {
          ...state,
          downloadFolderFile: {
            data: action.data,
            loading: false,
            error: false,
          },
        };
      case DOWNLOAD_FOLDER_FILE_FAILURE:
        return {
          ...state,
          downloadFolderFile: {
            data: {},
            loading: true,
            error: action.error,
          },
        };

        case DELETE_FOLDER_FILE_START:
          return {
            ...state,
            deleteFolderFile: {
              data: {},
              loading: true,
              error: false,
            },
          };
        case DELETE_FOLDER_FILE_SUCCESS:
          return {
            ...state,
            deleteFolderFile: {
              data: action.data,
              loading: false,
              error: false,
            },
          };
        case DELETE_FOLDER_FILE_FAILURE:
          return {
            ...state,
            deleteFolderFile: {
              data: {},
              loading: true,
              error: action.error,
            },
          };

    default:
      return state;
  }
};

export default FolderReducer;
