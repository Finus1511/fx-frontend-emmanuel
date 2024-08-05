import {
  CREATE_COUPON_CODE_START,
  CREATE_COUPON_CODE_SUCCESS,
  CREATE_COUPON_CODE_FAILURE,
  GENERATE_COUPON_CODE_START,
  GENERATE_COUPON_CODE_SUCCESS,
  GENERATE_COUPON_CODE_FAILURE,
  COUPON_CODE_LIST_START,
  FETCH_MORE_COUPON_CODE_LIST_START,
  COUPON_CODE_LIST_SUCCESS,
  COUPON_CODE_LIST_FAILURE,
  COUPON_CODE_VALIDATION_START,
  COUPON_CODE_VALIDATION_SUCCESS,
  COUPON_CODE_VALIDATION_FAILURE,
  DELETE_COUPON_CODE_START,
  DELETE_COUPON_CODE_SUCCESS,
  DELETE_COUPON_CODE_FAILURE,
  PROMO_CODE_STATUS_UPDATE_START,
  PROMO_CODE_STATUS_UPDATE_SUCCESS,
  PROMO_CODE_STATUS_UPDATE_FAILURE,
  SINGLE_VIEW_COUPON_CODE_START,
  SINGLE_VIEW_COUPON_CODE_SUCCESS,
  SINGLE_VIEW_COUPON_CODE_FAILURE,
  PREMIUM_FOLDER_LIST_START,
  FETCH_MORE_PREMIUM_FOLDER_LIST_START,
  PREMIUM_FOLDER_LIST_SUCCESS,
  PREMIUM_FOLDER_LIST_FAILURE,
  PREMIUM_FOLDER_PAYMENT_START,
  PREMIUM_FOLDER_PAYMENT_SUCCESS,
  PREMIUM_FOLDER_PAYMENT_FAILURE,
  CREATE_PREMIUM_FOLDER_START,
  CREATE_PREMIUM_FOLDER_SUCCESS,
  CREATE_PREMIUM_FOLDER_FAILURE,
  UPLOAD_FILES_PREMIUM_FOLDER_START,
  UPLOAD_FILES_PREMIUM_FOLDER_SUCCESS,
  UPLOAD_FILES_PREMIUM_FOLDER_FAILURE,
  PREMIUM_FOLDER_FILES_LIST_START,
  PREMIUM_FOLDER_FILES_LIST_SUCCESS,
  PREMIUM_FOLDER_FILES_LIST_FAILURE,
  DELETE_FOLDER_FILE_START,
  DELETE_FOLDER_FILE_SUCCESS,
  DELETE_FOLDER_FILE_FAILURE,
  FOLDER_FILE_VIEW_START,
  FOLDER_FILE_VIEW_SUCCESS,
  FOLDER_FILE_VIEW_FAILURE,
  FOLDER_FILES_REMOVE_START,
  FOLDER_FILES_REMOVE_SUCCESS,
  FOLDER_FILES_REMOVE_FAILURE,
  FOLDER_FILES_LIST_START,
  FETCH_MORE_FOLDER_FILES_LIST_START,
  FOLDER_FILES_LIST_SUCCESS,
  FOLDER_FILES_LIST_FAILURE,
  FOLDER_FILES_LIST_FOR_OTHERS_START,
  FETCH_MORE_FOLDER_FILES_LIST_FOR_OTHERS_START,
  FOLDER_FILES_LIST_FOR_OTHERS_SUCCESS,
  FOLDER_FILES_LIST_FOR_OTHERS_FAILURE
} from "./ActionConstant";

export function createCouponCodeStart(data) {
  return {
    type: CREATE_COUPON_CODE_START,
    data,
  };
}

export function createCouponCodeSuccess(data) {
  return {
    type: CREATE_COUPON_CODE_SUCCESS,
    data,
  };
}

export function createCouponCodeFailure(error) {
  return {
    type: CREATE_COUPON_CODE_FAILURE,
    error,
  };
}

export function generatCouponCodeStart(data) {
  return {
    type: GENERATE_COUPON_CODE_START,
    data,
  };
}

export function generatCouponCodeSuccess(data) {
  return {
    type: GENERATE_COUPON_CODE_SUCCESS,
    data,
  };
}

export function generatCouponCodeFailure(error) {
  return {
    type: GENERATE_COUPON_CODE_FAILURE,
    error,
  };
}

export function couponCodeListStart(data) {
  return {
    type: COUPON_CODE_LIST_START,
    data,
  };
}

export function fetchMoreCouponCodeListStart(data) {
  return {
    type: FETCH_MORE_COUPON_CODE_LIST_START,
    data,
  };
}

export function couponCodeListSuccess(data) {
  return {
    type: COUPON_CODE_LIST_SUCCESS,
    data,
  };
}

export function couponCodeListFailure(error) {
  return {
    type: COUPON_CODE_LIST_FAILURE,
    error,
  };
}

export function couponCodeValidationStart(data) {
  return {
    type: COUPON_CODE_VALIDATION_START,
    data,
  };
}

export function couponCodeValidationSuccess(data) {
  return {
    type: COUPON_CODE_VALIDATION_SUCCESS,
    data,
  };
}

export function couponCodeValidationFailure(error) {
  return {
    type: COUPON_CODE_VALIDATION_FAILURE,
    error,
  };
}

export function deleteCouponCodeStart(data) {
  return {
    type: DELETE_COUPON_CODE_START,
    data,
  };
}

export function deleteCouponCodeSuccess(data) {
  return {
    type: DELETE_COUPON_CODE_SUCCESS,
    data,
  };
}

export function deleteCouponCodeFailure(error) {
  return {
    type: DELETE_COUPON_CODE_FAILURE,
    error,
  };
}

export function premiumFolderListStart(data) {
  return {
    type: PREMIUM_FOLDER_LIST_START,
    data,
  };
}

export function fetchMorepremiumFolderListStart(data) {
  return {
    type: FETCH_MORE_PREMIUM_FOLDER_LIST_START,
    data,
  };
}

export function premiumFolderListSuccess(data) {
  return {
    type: PREMIUM_FOLDER_LIST_SUCCESS,
    data,
  };
}

export function premiumFolderListFailure(error) {
  return {
    type: PREMIUM_FOLDER_LIST_FAILURE,
    error,
  };
}

export function premiumFolderPaymentStart(data) {
  return {
    type: PREMIUM_FOLDER_PAYMENT_START,
    data,
  };
}

export function premiumFolderPaymentSuccess(data) {
  return {
    type: PREMIUM_FOLDER_PAYMENT_SUCCESS,
    data,
  };
}

export function premiumFolderPaymentFailure(error) {
  return {
    type: PREMIUM_FOLDER_PAYMENT_FAILURE,
    error,
  };
}

export function createPremiumFolderStart(data) {
  return {
    type: CREATE_PREMIUM_FOLDER_START,
    data,
  };
}

export function createPremiumFolderSuccess(data) {
  return {
    type: CREATE_PREMIUM_FOLDER_SUCCESS,
    data,
  };
}

export function createPremiumFolderFailure(error) {
  return {
    type: CREATE_PREMIUM_FOLDER_FAILURE,
    error,
  };
}

export function uploadFilesPremiumFolderStart(data) {
  return {
    type: UPLOAD_FILES_PREMIUM_FOLDER_START,
    data,
  };
}

export function uploadFilesPremiumFolderSuccess(data) {
  return {
    type: UPLOAD_FILES_PREMIUM_FOLDER_SUCCESS,
    data,
  };
}

export function uploadFilesPremiumFolderFailure(error) {
  return {
    type: UPLOAD_FILES_PREMIUM_FOLDER_FAILURE,
    error,
  };
}

export function premiumFolderFilesListStart(data) {
  return {
    type: PREMIUM_FOLDER_FILES_LIST_START,
    data,
  };
}

export function premiumFolderFilesListSuccess(data) {
  return {
    type: PREMIUM_FOLDER_FILES_LIST_SUCCESS,
    data,
  };
}

export function premiumFolderFilesListFailure(error) {
  return {
    type: PREMIUM_FOLDER_FILES_LIST_FAILURE,
    error,
  };
}

export function promoCodeStatusUpdateStart(data) {
  return {
    type: PROMO_CODE_STATUS_UPDATE_START,
    data,
  };
}

export function promoCodeStatusUpdateSuccess(data) {
  return {
    type: PROMO_CODE_STATUS_UPDATE_SUCCESS,
    data,
  };
}

export function promoCodeStatusUpdateFailure(error) {
  return {
    type: PROMO_CODE_STATUS_UPDATE_FAILURE,
    error,
  };
}

export function singleViewCouponCodeStart(data) {
  return {
    type:SINGLE_VIEW_COUPON_CODE_START,
    data,
  };
}

export function singleViewCouponCodeSuccess(data) {
  return {
    type: SINGLE_VIEW_COUPON_CODE_SUCCESS,
    data,
  };
}

export function singleViewCouponCodeFailure(error) {
  return {
    type: SINGLE_VIEW_COUPON_CODE_FAILURE,
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
export function folderFileViewStart(data) {
  return {
    type: FOLDER_FILE_VIEW_START,
    data,
  };
}
export function folderFileViewSuccess(data) {
  return {
    type: FOLDER_FILE_VIEW_SUCCESS,
    data,
  };
}
export function folderFileViewFailure(error) {
  return {
    type: FOLDER_FILE_VIEW_FAILURE,
    error,
  };
}

export function folderFilesRemoveStart(data) {
  return {
    type: FOLDER_FILES_REMOVE_START,
    data,
  };
}

export function folderFilesRemoveSuccess(data) {
  return {
    type: FOLDER_FILES_REMOVE_SUCCESS,
    data,
  };
}

export function folderFilesRemoveFailure(error) {
  return {
    type: FOLDER_FILES_REMOVE_FAILURE,
    error,
  };
}

export function folderFilesListStart(data) {
  return {
    type: FOLDER_FILES_LIST_START,
    data,
  };
}

export function fetchMorefolderFilesListStart(data) {
  return {
    type: FETCH_MORE_FOLDER_FILES_LIST_START,
    data,
  };
}

export function folderFilesListSuccess(data) {
  return {
    type: FOLDER_FILES_LIST_SUCCESS,
    data,
  };
}

export function folderFilesListFailure(error) {
  return {
    type: FOLDER_FILES_LIST_FAILURE,
    error,
  };
}

export function folderFilesListForOthersStart(data) {
  return {
    type: FOLDER_FILES_LIST_FOR_OTHERS_START,
    data,
  };
}

export function fetchMorefolderFilesListForOthersStart(data) {
  return {
    type: FETCH_MORE_FOLDER_FILES_LIST_FOR_OTHERS_START,
    data,
  };
}

export function folderFilesListForOthersSuccess(data) {
  return {
    type: FOLDER_FILES_LIST_FOR_OTHERS_SUCCESS,
    data,
  };
}

export function folderFilesListForOthersFailure(error) {
  return {
    type: FOLDER_FILES_LIST_FOR_OTHERS_FAILURE,
    error,
  };
}