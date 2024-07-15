import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";

import {
  CREATE_COUPON_CODE_START,
  GENERATE_COUPON_CODE_START,
  COUPON_CODE_LIST_START,
  COUPON_CODE_VALIDATION_START,
  PREMIUM_FOLDER_LIST_START,
  PREMIUM_FOLDER_PAYMENT_START,
  CREATE_PREMIUM_FOLDER_START,
  UPLOAD_FILES_PREMIUM_FOLDER_START,
  PREMIUM_FOLDER_FILES_LIST_START,
} from "../actions/ActionConstant";

import { createNotification } from "react-redux-notify";
import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../../components/helper/NotificationMessage";

import {
  createCouponCodeSuccess,
  createCouponCodeFailure,
  generatCouponCodeFailure,
  generatCouponCodeSuccess,
  couponCodeListSuccess,
  couponCodeListFailure,
  couponCodeValidationSuccess,
  couponCodeValidationFailure,
  premiumFolderListSuccess,
  premiumFolderListFailure,
  premiumFolderPaymentSuccess,
  premiumFolderPaymentFailure,
  createPremiumFolderSuccess,
  createPremiumFolderFailure,
  uploadFilesPremiumFolderSuccess,
  uploadFilesPremiumFolderFailure,
  premiumFolderFilesListSuccess,
  premiumFolderFilesListFailure,
} from "../actions/PremiumFolderAction";

function* createCouponCodeAPI(action) {
  try {
    const response = yield api.postMethod("create_coupon", action.data);

    if (response.data.success) {
      yield put(createCouponCodeSuccess(response.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(createCouponCodeFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(createCouponCodeFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* generatCouponCodeAPI(action) {
  try {
    // const response = yield api.postMethod("generate_coupon");

    // if (response.data.success) {
    //   yield put(generatCouponCodeSuccess(response.data));
    //   const notificationMessage = getSuccessNotificationMessage(
    //     response.data.message
    //   );
    //   yield put(createNotification(notificationMessage));
    // } else {
    //   yield put(generatCouponCodeFailure(response.data.error));
    //   const notificationMessage = getErrorNotificationMessage(
    //     response.data.error
    //   );
    //   yield put(createNotification(notificationMessage));
    // }

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    for (let i = 0; i < action.data; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    yield put(generatCouponCodeSuccess({ coupon_code: result }));
  } catch (error) {
    yield put(generatCouponCodeFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* couponCodeListAPI(action) {
  try {
    const response = yield api.postMethod("coupon_code/list", action.data);

    if (response.data.success) {
      yield put(couponCodeListSuccess(response.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(couponCodeListFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(couponCodeListFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* couponCodeValidationAPI(action) {
  try {
    const response = yield api.postMethod(
      "create_coupon_code_validation",
      action.data
    );

    if (response.data.success) {
      yield put(couponCodeValidationSuccess(response.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(couponCodeValidationFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(couponCodeValidationFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* premiumFolderListAPI(action) {
  try {
    const response = yield api.postMethod("premium_folder_list", action.data);

    if (response.data.success) {
      yield put(premiumFolderListSuccess(response.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(premiumFolderListFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(premiumFolderListFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* premiumFolderPaymentAPI(action) {
  try {
    const response = yield api.postMethod(
      "premium_folder_payment",
      action.data
    );

    if (response.data.success) {
      yield put(premiumFolderPaymentSuccess(response.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(premiumFolderPaymentFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(premiumFolderPaymentFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* createPremiumFolderAPI(action) {
  try {
    const response = yield api.postMethod("create_premium_folder", action.data);

    if (response.data.success) {
      yield put(createPremiumFolderSuccess(response.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(createPremiumFolderFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(createPremiumFolderFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* uploadFilesPremiumFolderAPI(action) {
  try {
    const response = yield api.postMethod("upload_files", action.data);

    if (response.data.success) {
      yield put(uploadFilesPremiumFolderSuccess(response.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(uploadFilesPremiumFolderFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(uploadFilesPremiumFolderFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* premiumFolderFilesListAPI(action) {
  try {
    const response = yield api.postMethod("folder-files-list", action.data);

    if (response.data.success) {
      yield put(premiumFolderFilesListSuccess(response.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(premiumFolderFilesListFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(premiumFolderFilesListFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

export default function* PremiumFolderSaga() {
  yield all([yield takeLatest(CREATE_COUPON_CODE_START, createCouponCodeAPI)]);
  yield all([
    yield takeLatest(GENERATE_COUPON_CODE_START, generatCouponCodeAPI),
  ]);
  yield all([yield takeLatest(COUPON_CODE_LIST_START, couponCodeListAPI)]);
  yield all([
    yield takeLatest(COUPON_CODE_VALIDATION_START, couponCodeValidationAPI),
  ]);
  yield all([
    yield takeLatest(PREMIUM_FOLDER_LIST_START, premiumFolderListAPI),
  ]);
  yield all([
    yield takeLatest(PREMIUM_FOLDER_PAYMENT_START, premiumFolderPaymentAPI),
  ]);
  yield all([
    yield takeLatest(CREATE_PREMIUM_FOLDER_START, createPremiumFolderAPI),
  ]);
  yield all([
    yield takeLatest(
      UPLOAD_FILES_PREMIUM_FOLDER_START,
      uploadFilesPremiumFolderAPI
    ),
  ]);
  yield all([
    yield takeLatest(
      PREMIUM_FOLDER_FILES_LIST_START,
      premiumFolderFilesListAPI
    ),
  ]);
}
