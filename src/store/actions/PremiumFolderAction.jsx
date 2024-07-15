import {
  CREATE_COUPON_CODE_START,
  CREATE_COUPON_CODE_SUCCESS,
  CREATE_COUPON_CODE_FAILURE,
  GENERATE_COUPON_CODE_START,
  GENERATE_COUPON_CODE_SUCCESS,
  GENERATE_COUPON_CODE_FAILURE,
  COUPON_CODE_LIST_START,
  COUPON_CODE_LIST_SUCCESS,
  COUPON_CODE_LIST_FAILURE,
  COUPON_CODE_VALIDATION_START,
  COUPON_CODE_VALIDATION_SUCCESS,
  COUPON_CODE_VALIDATION_FAILURE,
  PREMIUM_FOLDER_LIST_START,
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

export function premiumFolderListStart(data) {
  return {
    type: PREMIUM_FOLDER_LIST_START,
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
