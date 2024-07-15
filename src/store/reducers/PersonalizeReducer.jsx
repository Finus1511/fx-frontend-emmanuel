import {
  PR_STORE_START,
  PR_STORE_SUCCESS,
  PR_STORE_FAILURE,
  PR_CREATE_USER_PRODUCT_START,
  PR_CREATE_USER_PRODUCT_SUCCESS,
  PR_CREATE_USER_PRODUCT_FAILURE,
  PR_REQUEST_LIST_START,
  PR_REQUEST_LIST_SUCCESS,
  PR_REQUEST_LIST_FAILURE,
  PR_REQUEST_LIST_UPDATE,
  PR_UPDATE_ACCEPT_REJECT_START,
  PR_UPDATE_ACCEPT_REJECT_SUCCESS,
  PR_UPDATE_ACCEPT_REJECT_FAILURE,
  PR_USER_REJECT_REQUEST_START,
  PR_USER_REJECT_REQUEST_SUCCESS,
  PR_USER_REJECT_REQUEST_FAILURE,
  PR_USER_PAYMENT_BY_WALLET_START,
  PR_USER_PAYMENT_BY_WALLET_SUCCESS,
  PR_USER_PAYMENT_BY_WALLET_FAILURE,
  PR_RECEIVED_LIST_START,
  PR_RECEIVED_LIST_SUCCESS,
  PR_RECEIVED_LIST_FAILURE,
  PR_PRODUCT_FILES_UPLOAD_START,
  PR_PRODUCT_FILES_UPLOAD_SUCCESS,
  PR_PRODUCT_FILES_UPLOAD_FAILURE,
  PR_PRODUCT_FILES_REMOVE_START,
  PR_PRODUCT_FILES_REMOVE_SUCCESS,
  PR_PRODUCT_FILES_REMOVE_FAILURE,
  PR_REQUEST_VIEW_START,
  PR_REQUEST_VIEW_SUCCESS,
  PR_REQUEST_VIEW_FAILURE,
  PR_RECEIVED_LIST_UPDATE,
  PR_CREATOR_UPDATE_REQUEST_FILE_START,
  PR_CREATOR_UPDATE_REQUEST_FILE_SUCCESS,
  PR_CREATOR_UPDATE_REQUEST_FILE_FAILURE,
  PR_CREATOR_EDIT_REQUEST_START,
  PR_CREATOR_EDIT_REQUEST_SUCCESS,
  PR_CREATOR_EDIT_REQUEST_FAILURE,
  PR_DELIVERY_ADDRESS_LIST_START,
  PR_DELIVERY_ADDRESS_LIST_SUCCESS,
  PR_DELIVERY_ADDRESS_LIST_FAILURE,
  PR_USER_CANCEL_REQUEST_START,
  PR_USER_CANCEL_REQUEST_SUCCESS,
  PR_USER_CANCEL_REQUEST_FAILURE,
} from "../actions/ActionConstant";

const initialState = {
  prStore: {
    data: {},
    loading: false,
    error: false,
  },
  createUserProduct: {
    data: {},
    loading: false,
    error: false,
  },
  requestList: {
    data: {},
    loading: false,
    error: false,
  },
  receivedList: {
    data: {},
    loading: false,
    error: false,
  },
  updateAcceptReject: {
    data: {},
    loading: false,
    error: false,
  },
  userRejectRequest: {
    data: {},
    loading: false,
    buttonDisable: false,
    error: false,
  },
  userPaymentByWallet: {
    data: {},
    loading: false,
    error: false,
  },
  productFilesUpload: {
    data: {},
    loading: false,
    error: false,
    loadingButtonContent: null,
    buttonDisable: false,
  },
  productFilesRemove: {
    data: {},
    loading: false,
    error: false,
    loadingButtonContent: null,
    buttonDisable: false,
  },
  requestView: {
    data: {},
    loading: false,
    error: false,
  },
  deliveryAddressList: {
    data: {},
    loading: false,
    error: false,
  },
  creatorUpdateRequestFile: {
    data: {},
    loading: false,
    error: false,
  },
  creatorEditRequest: {
    data: {},
    loading: false,
    error: false,
  },
  userCancelRequest: {
    data: {},
    loading: false,
    buttonDisable: false,
    error: false,
  },
};

const PersonalizeReducer = (state = initialState, action) => {
  switch (action.type) {
    case PR_STORE_START:
      return {
        ...state,
        prStore: {
          data: {},
          loading: true,
          error: false,
        },
      };

    case PR_STORE_SUCCESS:
      return {
        ...state,
        prStore: {
          data: action.data,
          loading: false,
          error: false,
        },
      };

    case PR_STORE_FAILURE:
      return {
        ...state,
        prStore: {
          data: {},
          loading: false,
          error: action.error,
        },
      };

    case PR_CREATE_USER_PRODUCT_START:
      return {
        ...state,
        createUserProduct: {
          data: {},
          loading: true,
          error: false,
        },
      };

    case PR_CREATE_USER_PRODUCT_SUCCESS:
      return {
        ...state,
        createUserProduct: {
          data: action.data,
          loading: false,
          error: false,
        },
      };

    case PR_CREATE_USER_PRODUCT_FAILURE:
      return {
        ...state,
        createUserProduct: {
          data: {},
          loading: false,
          error: action.error,
        },
      };

    case PR_REQUEST_LIST_START:
      return {
        ...state,
        requestList: {
          data: {
            ...state.requestList.data,
            personalized_requests:
              action.data.skip > 0
                ? state.requestList.data.personalized_requests
                : [],
          },
          loading: action.data.skip > 0 ? false : true,
          infiniteLoading: true,
          error: false,
        },
      };

    case PR_REQUEST_LIST_SUCCESS:
      return {
        ...state,
        requestList: {
          data: {
            personalized_requests: [
              ...state.requestList.data.personalized_requests,
              ...action.data.personalized_requests,
            ],
            total: action.data.total,
          },
          loading: false,
          infiniteLoading: false,
          error: false,
        },
      };

    case PR_REQUEST_LIST_FAILURE:
      return {
        ...state,
        requestList: {
          data: {},
          loading: false,
          infiniteLoading: false,
          error: action.error,
        },
      };

    case PR_REQUEST_LIST_UPDATE:
      return {
        ...state,
        requestList: {
          data: {
            personalized_requests: action.data.personalized_requests,
            total: action.data.total,
          },
          loading: false,
          error: false,
        },
      };

    case PR_RECEIVED_LIST_START:
      return {
        ...state,
        receivedList: {
          data: {
            ...state.receivedList.data,
            personalized_creator_requests:
              action.data.skip > 0
                ? state.receivedList.data.personalized_creator_requests
                : [],
          },
          infiniteLoading: true,
          loading: action.data.skip > 0 ? false : true,
          error: {},
        },
      };

    case PR_RECEIVED_LIST_SUCCESS:
      return {
        ...state,
        receivedList: {
          data: {
            personalized_creator_requests: [
              ...state.receivedList.data.personalized_creator_requests,
              ...action.data.personalized_creator_requests,
            ],
            total: action.data.total,
          },
          loading: false,
          infiniteLoading: false,
          error: false,
        },
      };

    case PR_RECEIVED_LIST_UPDATE:
      return {
        ...state,
        receivedList: {
          data: {
            personalized_creator_requests:
              action.data.personalized_creator_requests,
            total: action.data.total,
          },
          loading: false,
          error: false,
        },
      };

    case PR_RECEIVED_LIST_FAILURE:
      return {
        ...state,
        receivedList: {
          data: {},
          loading: false,
          infiniteLoading: false,
          error: action.error,
        },
      };

    case PR_UPDATE_ACCEPT_REJECT_START:
      return {
        ...state,
        updateAcceptReject: {
          data: {},
          loading: true,
          error: false,
        },
      };

    case PR_UPDATE_ACCEPT_REJECT_SUCCESS:
      return {
        ...state,
        updateAcceptReject: {
          data: action.data,
          loading: false,
          error: false,
        },
      };

    case PR_UPDATE_ACCEPT_REJECT_FAILURE:
      return {
        ...state,
        updateAcceptReject: {
          data: {},
          loading: false,
          error: action.error,
        },
      };

    case PR_USER_REJECT_REQUEST_START:
      return {
        ...state,
        userRejectRequest: {
          data: {},
          buttonDisable: true,
          loading: true,
          error: false,
        },
      };

    case PR_USER_REJECT_REQUEST_SUCCESS:
      return {
        ...state,
        userRejectRequest: {
          data: action.data,
          buttonDisable: false,
          loading: false,
          error: false,
        },
      };

    case PR_USER_REJECT_REQUEST_FAILURE:
      return {
        ...state,
        userRejectRequest: {
          data: {},
          buttonDisable: false,
          loading: false,
          error: action.error,
        },
      };

    case PR_USER_PAYMENT_BY_WALLET_START:
      return {
        ...state,
        userPaymentByWallet: {
          data: {},
          loading: true,
          error: false,
        },
      };

    case PR_USER_PAYMENT_BY_WALLET_SUCCESS:
      return {
        ...state,
        userPaymentByWallet: {
          data: action.data,
          loading: false,
          error: false,
        },
      };

    case PR_USER_PAYMENT_BY_WALLET_FAILURE:
      return {
        ...state,
        userPaymentByWallet: {
          data: {},
          loading: false,
          error: action.error,
        },
      };

    case PR_PRODUCT_FILES_UPLOAD_START:
      return {
        ...state,
        productFilesUpload: {
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "File Uploading....",
          buttonDisable: true,
        },
      };

    case PR_PRODUCT_FILES_UPLOAD_SUCCESS:
      return {
        ...state,
        productFilesUpload: {
          data: action.data,
          loading: false,
          error: false,
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };

    case PR_PRODUCT_FILES_UPLOAD_FAILURE:
      return {
        ...state,
        productFilesUpload: {
          data: {},
          loading: false,
          error: action.error,
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };

    case PR_PRODUCT_FILES_REMOVE_START:
      return {
        ...state,
        productFilesRemove: {
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "File Removing....",
          buttonDisable: true,
        },
      };

    case PR_PRODUCT_FILES_REMOVE_SUCCESS:
      return {
        ...state,
        productFilesRemove: {
          data: action.data,
          loading: false,
          error: false,
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };

    case PR_PRODUCT_FILES_REMOVE_FAILURE:
      return {
        ...state,
        productFilesRemove: {
          data: {},
          loading: false,
          error: action.error,
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };

    case PR_REQUEST_VIEW_START:
      return {
        ...state,
        requestView: {
          data: {},
          loading: true,
          error: false,
        },
      };

    case PR_REQUEST_VIEW_SUCCESS:
      return {
        ...state,
        requestView: {
          data: action.data,
          loading: false,
          error: false,
        },
      };

    case PR_REQUEST_VIEW_FAILURE:
      return {
        ...state,
        requestView: {
          data: {},
          loading: false,
          error: action.error,
        },
      };

    case PR_CREATOR_UPDATE_REQUEST_FILE_START:
      return {
        ...state,
        creatorUpdateRequestFile: {
          data: {},
          loading: true,
          error: false,
        },
      };

    case PR_CREATOR_UPDATE_REQUEST_FILE_SUCCESS:
      return {
        ...state,
        creatorUpdateRequestFile: {
          data: action.data,
          loading: false,
          error: false,
        },
      };

    case PR_CREATOR_UPDATE_REQUEST_FILE_FAILURE:
      return {
        ...state,
        creatorUpdateRequestFile: {
          data: {},
          loading: false,
          error: action.error,
        },
      };

    case PR_CREATOR_EDIT_REQUEST_START:
      return {
        ...state,
        creatorEditRequest: {
          data: {},
          loading: true,
          error: false,
        },
      };

    case PR_CREATOR_EDIT_REQUEST_SUCCESS:
      return {
        ...state,
        creatorEditRequest: {
          data: action.data,
          loading: false,
          error: false,
        },
      };

    case PR_CREATOR_EDIT_REQUEST_FAILURE:
      return {
        ...state,
        creatorEditRequest: {
          data: {},
          loading: false,
          error: action.error,
        },
      };

    case PR_DELIVERY_ADDRESS_LIST_START:
      return {
        ...state,
        deliveryAddressList: {
          data: {},
          loading: true,
          error: false,
        },
      };

    case PR_DELIVERY_ADDRESS_LIST_SUCCESS:
      return {
        ...state,
        deliveryAddressList: {
          data: action.data,
          loading: false,
          error: false,
        },
      };

    case PR_DELIVERY_ADDRESS_LIST_FAILURE:
      return {
        ...state,
        deliveryAddressList: {
          data: {},
          loading: false,
          error: action.error,
        },
      };

    case PR_USER_CANCEL_REQUEST_START:
      return {
        ...state,
        userCancelRequest: {
          data: {},
          buttonDisable: true,
          loading: true,
          error: false,
        },
      };

    case PR_USER_CANCEL_REQUEST_SUCCESS:
      return {
        ...state,
        userCancelRequest: {
          data: action.data,
          buttonDisable: false,
          loading: false,
          error: false,
        },
      };

    case PR_USER_CANCEL_REQUEST_SUCCESS:
      return {
        ...state,
        userCancelRequest: {
          data: {},
          buttonDisable: false,
          loading: false,
          error: action.error,
        },
      };

    default:
      return state;
  }
};

export default PersonalizeReducer;
