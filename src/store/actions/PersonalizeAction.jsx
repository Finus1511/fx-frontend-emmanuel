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
  PR_RECEIVED_LIST_START,
  PR_RECEIVED_LIST_SUCCESS,
  PR_RECEIVED_LIST_FAILURE,
  PR_UPDATE_ACCEPT_REJECT_START,
  PR_UPDATE_ACCEPT_REJECT_SUCCESS,
  PR_UPDATE_ACCEPT_REJECT_FAILURE,
  PR_USER_REJECT_REQUEST_START,
  PR_USER_REJECT_REQUEST_SUCCESS,
  PR_USER_REJECT_REQUEST_FAILURE,
  PR_USER_PAYMENT_BY_WALLET_START,
  PR_USER_PAYMENT_BY_WALLET_SUCCESS,
  PR_USER_PAYMENT_BY_WALLET_FAILURE,
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
  PR_REQUEST_LIST_UPDATE,
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
} from "./ActionConstant";

export function prStoreStart(data) {
  return {
    type: PR_STORE_START,
    data,
  };
}

export function prStoreSuccess(data) {
  return {
    type: PR_STORE_SUCCESS,
    data,
  };
}

export function prStoreFailure(error) {
  return {
    type: PR_STORE_FAILURE,
    error,
  };
}

export function prCreateUserProductStart(data) {
  return {
    type: PR_CREATE_USER_PRODUCT_START,
    data,
  };
}

export function prCreateUserProductSuccess(data) {
  return {
    type: PR_CREATE_USER_PRODUCT_SUCCESS,
    data,
  };
}

export function prCreateUserProductFailure(error) {
  return {
    type: PR_CREATE_USER_PRODUCT_FAILURE,
    error,
  };
}

export function prRequestListStart(data) {
  return {
    type: PR_REQUEST_LIST_START,
    data,
  };
}

export function prRequestListSuccess(data) {
  return {
    type: PR_REQUEST_LIST_SUCCESS,
    data,
  };
}

export function prRequestListFailure(error) {
  return {
    type: PR_REQUEST_LIST_FAILURE,
    error,
  };
}

export function prRequestListUpdate(data) {
  return {
    type: PR_REQUEST_LIST_UPDATE,
    data,
  };
}

export function prReceivedListStart(data) {
  return {
    type: PR_RECEIVED_LIST_START,
    data,
  };
}

export function prReceivedListSuccess(data) {
  return {
    type: PR_RECEIVED_LIST_SUCCESS,
    data,
  };
}

export function prReceivedListUpdate(data) {
  return {
    type: PR_RECEIVED_LIST_UPDATE,
    data,
  };
}

export function prReceivedListFailure(error) {
  return {
    type: PR_RECEIVED_LIST_FAILURE,
    error,
  };
}

export function prUpdateAcceptRejectStart(data) {
  return {
    type: PR_UPDATE_ACCEPT_REJECT_START,
    data,
  };
}

export function prUpdateAcceptRejectSuccess(data) {
  return {
    type: PR_UPDATE_ACCEPT_REJECT_SUCCESS,
    data,
  };
}

export function prUpdateAcceptRejectFailure(error) {
  return {
    type: PR_UPDATE_ACCEPT_REJECT_FAILURE,
    error,
  };
}

export function prUserRejectRequestStart(data) {
  return {
    type: PR_USER_REJECT_REQUEST_START,
    data,
  };
}

export function prUserRejectRequestSuccess(data) {
  return {
    type: PR_USER_REJECT_REQUEST_SUCCESS,
    data,
  };
}

export function prUserRejectRequestFailure(error) {
  return {
    type: PR_USER_REJECT_REQUEST_FAILURE,
    error,
  };
}

export function prUserPaymentByWalletStart(data) {
  return {
    type: PR_USER_PAYMENT_BY_WALLET_START,
    data,
  };
}

export function prUserPaymentByWalletSuccess(data) {
  return {
    type: PR_USER_PAYMENT_BY_WALLET_SUCCESS,
    data,
  };
}

export function prUserPaymentByWalletFailure(error) {
  return {
    type: PR_USER_PAYMENT_BY_WALLET_FAILURE,
    error,
  };
}

export function prProductFilesUploadStart(data) {
  return {
    type: PR_PRODUCT_FILES_UPLOAD_START,
    data,
  };
}

export function prProductFilesUploadSuccess(data) {
  return {
    type: PR_PRODUCT_FILES_UPLOAD_SUCCESS,
    data,
  };
}

export function prProductFilesUploadFailure(error) {
  return {
    type: PR_PRODUCT_FILES_UPLOAD_FAILURE,
    error,
  };
}

export function prProductFilesRemoveStart(data) {
  return {
    type: PR_PRODUCT_FILES_REMOVE_START,
    data,
  };
}

export function prProductFilesRemoveSuccess(data) {
  return {
    type: PR_PRODUCT_FILES_REMOVE_SUCCESS,
    data,
  };
}

export function prProductFilesRemoveFailure(error) {
  return {
    type: PR_PRODUCT_FILES_REMOVE_FAILURE,
    error,
  };
}

export function prRequestViewStart(data) {
  return {
    type: PR_REQUEST_VIEW_START,
    data,
  };
}

export function prRequestViewSuccess(data) {
  return {
    type: PR_REQUEST_VIEW_SUCCESS,
    data,
  };
}

export function prRequestViewFailure(error) {
  return {
    type: PR_REQUEST_VIEW_FAILURE,
    error,
  };
}

export function prCreatorUpdateRequestFileStart(data) {
  return {
    type: PR_CREATOR_UPDATE_REQUEST_FILE_START,
    data,
  };
}

export function prCreatorUpdateRequestFileSuccess(data) {
  return {
    type: PR_CREATOR_UPDATE_REQUEST_FILE_SUCCESS,
    data,
  };
}

export function prCreatorUpdateRequestFileFailure(error) {
  return {
    type: PR_CREATOR_UPDATE_REQUEST_FILE_FAILURE,
    error,
  };
}

export function prCreatorEditRequestStart(data) {
  return {
    type: PR_CREATOR_EDIT_REQUEST_START,
    data,
  };
}

export function prCreatorEditRequestSuccess(data) {
  return {
    type: PR_CREATOR_EDIT_REQUEST_SUCCESS,
    data,
  };
}

export function prCreatorEditRequestFailure(error) {
  return {
    type: PR_CREATOR_EDIT_REQUEST_FAILURE,
    error,
  };
}

export function prDeliveyAddressListStart(data) {
  return {
    type: PR_DELIVERY_ADDRESS_LIST_START,
    data,
  };
}

export function prDeliveyAddressListSuccess(data) {
  return {
    type: PR_DELIVERY_ADDRESS_LIST_SUCCESS,
    data,
  };
}

export function prDeliveyAddressListFailure(error) {
  return {
    type: PR_DELIVERY_ADDRESS_LIST_FAILURE,
    error,
  };
}

export function prUserCancelRequestStart(data) {
  return {
    type: PR_USER_CANCEL_REQUEST_START,
    data,
  };
}

export function prUserCancelRequestSuccess(data) {
  return {
    type: PR_USER_CANCEL_REQUEST_SUCCESS,
    data,
  };
}

export function prUserCancelRequestFailure(error) {
  return {
    type: PR_USER_CANCEL_REQUEST_FAILURE,
    error,
  };
}
