import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";

import {
  CREATE_COUPON_CODE_START,
  GENERATE_COUPON_CODE_START,
  COUPON_CODE_LIST_START,
  FETCH_MORE_COUPON_CODE_LIST_START,
  COUPON_CODE_VALIDATION_START,
  DELETE_COUPON_CODE_START,
  PREMIUM_FOLDER_LIST_START,
  FETCH_MORE_PREMIUM_FOLDER_LIST_START,
  PREMIUM_FOLDER_PAYMENT_START,
  CREATE_PREMIUM_FOLDER_START,
  UPLOAD_FILES_PREMIUM_FOLDER_START,
  PREMIUM_FOLDER_FILES_LIST_START,
  PROMO_CODE_STATUS_UPDATE_START,
  SINGLE_VIEW_COUPON_CODE_START,
  DELETE_FOLDER_FILE_START,
  FOLDER_FILE_VIEW_START,
  FOLDER_FILES_REMOVE_START,
  FOLDER_FILES_LIST_START,
  FETCH_MORE_FOLDER_FILES_LIST_START,
  FOLDER_FILES_LIST_FOR_OTHERS_START,
  FETCH_MORE_FOLDER_FILES_LIST_FOR_OTHERS_START
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
  deleteCouponCodeSuccess,
  deleteCouponCodeFailure,
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
  promoCodeStatusUpdateSuccess,
  promoCodeStatusUpdateFailure,
  singleViewCouponCodeSuccess,
  singleViewCouponCodeFailure,
  deleteFolderFileSuccess,
  deleteFolderFileFailure,
  folderFileViewSuccess,
  folderFileViewFailure,
  folderFilesRemoveSuccess,
  folderFilesRemoveFailure,
  folderFilesListSuccess,
  folderFilesListFailure,
  folderFilesListForOthersSuccess,
  folderFilesListForOthersFailure,
} from "../actions/PremiumFolderAction";

function* createCouponCodeAPI(action) {
  try {
    const response = yield api.postMethod("promo_code_save", action.data);

    if (response.data.success) {
      yield put(createCouponCodeSuccess(response.data.data));
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
  let couponCodeListData = yield select((state) => state.folder.couponCodeList.data);
  try {
    const response = yield api.postMethod("promo_code_index", action.data);
    if (response.data.success) {
      if (Object.keys(couponCodeListData).length > 0) {
        yield put(couponCodeListSuccess({
          promocode: [...couponCodeListData.promocode, ...response.data.data.promocode],
          total: response.data.data.total
        }));
      } else {
        yield put(couponCodeListSuccess(response.data.data));
      }
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
    const response = yield api.postMethod("promo_code_validate", action.data);
    if (response.data.success) {
      yield put(couponCodeValidationSuccess(response.data.data));
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

function* deleteCouponCodeAPI(action) {
  let couponCodeListData = yield select((state) => state.folder.couponCodeList.data);
  try {
    const response = yield api.postMethod("promo_code_delete", action.data);
    if (response.data.success) {
      yield put(deleteCouponCodeSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      if (Object.keys(couponCodeListData).length > 0) {
        yield put(couponCodeListSuccess({
          promocode: couponCodeListData.promocode.filter(code =>
            code.promo_code_unique_id !== action.data.promo_code_unique_id
          ),
          total: couponCodeListData.total - 1
        }));
      }
    } else {
      yield put(deleteCouponCodeFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(deleteCouponCodeFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}


function* promoCodeStatusAPI(action) {
  let couponCodeListData = yield select((state) => state.folder.couponCodeList.data);
  try {
    const response = yield api.postMethod("promo_code_status_update", action.data);

    if (response.data.success) {
      yield put(promoCodeStatusUpdateSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      if (Object.keys(couponCodeListData).length > 0) {
        yield put(couponCodeListSuccess({
          ...couponCodeListData,
          promocode: couponCodeListData.promocode.map((account) =>
            account.promo_code_unique_id === action.data.promo_code_unique_id ?
              response.data.data.promo_code
              : account
          ),
        }));
      }
    } else {
      yield put(promoCodeStatusUpdateFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(promoCodeStatusUpdateFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}


function* singeViewCouponCodeAPI(action) {
  try {
    const response = yield api.postMethod("promo_code_view", action.data);

    if (response.data.success) {
      yield put(singleViewCouponCodeSuccess(response.data.data));
    } else {
      yield put(singleViewCouponCodeFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(singleViewCouponCodeFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}


function* premiumFolderListAPI(action) {
  let premiumFolderListData = yield select((state) => state.folder.premiumFolderList.data);
  try {
    const response = yield api.postMethod("collections", action.data);

    if (response.data.success) {
      if (Object.keys(premiumFolderListData).length > 0) {
        yield put(premiumFolderListSuccess({
          collections: [...premiumFolderListData.collections, ...response.data.data.collections],
          total: response.data.data.total
        }));
      } else {
        yield put(premiumFolderListSuccess(response.data.data));
      }
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
  let premiumFolderListData = yield select((state) => state.folder.premiumFolderList.data);
  try {
    const response = yield api.postMethod("collections/collections_payment_by_wallet", action.data);
    if (response.data.success) {
      yield put(premiumFolderPaymentSuccess(response.data));
      const notificationMessage = getSuccessNotificationMessage(response.data.message);
      yield put(createNotification(notificationMessage));
      console.log("act", action.data)
      if (Object.keys(premiumFolderListData).length > 0) {
        yield put(premiumFolderListSuccess({
          ...premiumFolderListData,
          collections: premiumFolderListData.collections.map(collection =>
            collection.unique_id == action.data.collection_unique_id
              ? { ...collection, user_needs_to_pay: 0 } : collection)
        }));
      }
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
  let premiumFolderListData = yield select((state) => state.folder.premiumFolderList.data);
  try {
    const response = yield api.postMethod("collections/store", action.data);
    if (response.data.success) {
      yield put(createPremiumFolderSuccess(response.data));
      const notificationMessage = getSuccessNotificationMessage(response.data.message);
      yield put(createNotification(notificationMessage));
      if (Object.keys(premiumFolderListData).length > 0) {
        yield put(premiumFolderListSuccess({
          ...premiumFolderListData,
          collections: [response.data.data.collection, ...premiumFolderListData.collections]
        }));
      }
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

function* deleteFolderFileAPI(action) {
  let premiumFolderListData = yield select((state) => state.folder.premiumFolderList.data);
  try {
    const response = yield api.postMethod("collections/destroy", action.data);
    if (response.data.success) {
      yield put(deleteFolderFileSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(response.data.message);
      yield put(createNotification(notificationMessage));
      if (Object.keys(premiumFolderListData).length > 0) {
        yield put(premiumFolderListSuccess({
          collections: premiumFolderListData.collections.filter(code =>
            code.unique_id !== action.data.collection_unique_id
          ),
          total: premiumFolderListData.total - 1
        }));
      }
    } else {
      yield put(deleteFolderFileFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(response.data.error);
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(deleteFolderFileFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* folderFileViewAPI(action) {
  try {
    const response = yield api.postMethod("collections/view", action.data);

    if (response.data.success) {
      yield put(folderFileViewSuccess(response.data.data));
    } else {
      yield put(folderFileViewFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(folderFileViewFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* uploadFilesPremiumFolderAPI(action) {
  let folderFilesListData = yield select((state) => state.folder.folderFilesList.data);
  try {
    const response = yield api.postMethod("collections/files_upload", action.data);
    if (response.data.success) {
      yield put(uploadFilesPremiumFolderSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(response.data.message);
      yield put(createNotification(notificationMessage));
      if (Object.keys(folderFilesListData).length > 0) {
        yield put(folderFilesListSuccess({
          collection_files: [...folderFilesListData.collection_files, ...response.data.data.collection_files],
        }));
      }
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

function* folderFilesRemoveAPI(action) {
  let folderFilesListData = yield select((state) => state.folder.folderFilesList.data);
  try {
    const response = yield api.postMethod("collections/files_remove", action.data);
    if (response.data.success) {
      yield put(folderFilesRemoveSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(response.data.message);
      yield put(createNotification(notificationMessage));
      if (Object.keys(folderFilesListData).length > 0) {
        yield put(folderFilesListSuccess({
          collection_files: folderFilesListData.collection_files.filter(code =>
            code.unique_id != action.data.collection_file_unique_id
          ),
          total: folderFilesListData.total - 1
        }));
      }
    } else {
      yield put(folderFilesRemoveFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(response.data.error);
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(folderFilesRemoveFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* folderFilesListAPI(action) {
  let folderFilesListData = yield select((state) => state.folder.folderFilesList.data);
  try {
    const response = yield api.postMethod("collections/files_list", action.data);
    if (response.data.success) {
      if (Object.keys(folderFilesListData).length > 0) {
        yield put(folderFilesListSuccess({
          collection_files: [...folderFilesListData.collection_files, ...response.data.data.collection_files],
          total: response.data.data.total
        }));
      } else {
        yield put(folderFilesListSuccess(response.data.data));
      }
    } else {
      yield put(folderFilesListFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(folderFilesListFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* folderFilesListForOthersAPI(action) {
  let folderFilesListData = yield select((state) => state.folder.folderFilesListForOthers.data);
  try {
    const response = yield api.postMethod("collections/files_list_for_others", action.data);
    if (response.data.success) {
      if (Object.keys(folderFilesListData).length > 0) {
        yield put(folderFilesListForOthersSuccess({
          collection_files: [...folderFilesListData.collection_files, ...response.data.data.collection_files],
          total: response.data.data.total
        }));
      } else {
        yield put(folderFilesListForOthersSuccess(response.data.data));
      }
    } else {
      yield put(folderFilesListForOthersFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(folderFilesListForOthersFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

export default function* PremiumFolderSaga() {
  yield all([yield takeLatest(CREATE_COUPON_CODE_START, createCouponCodeAPI)]);
  yield all([yield takeLatest(GENERATE_COUPON_CODE_START, generatCouponCodeAPI)]);
  yield all([yield takeLatest(COUPON_CODE_LIST_START, couponCodeListAPI)]);
  yield all([yield takeLatest(FETCH_MORE_COUPON_CODE_LIST_START, couponCodeListAPI)]);
  yield all([yield takeLatest(COUPON_CODE_VALIDATION_START, couponCodeValidationAPI)]);
  yield all([yield takeLatest(DELETE_COUPON_CODE_START, deleteCouponCodeAPI)]);
  yield all([yield takeLatest(PROMO_CODE_STATUS_UPDATE_START, promoCodeStatusAPI)]);
  yield all([yield takeLatest(SINGLE_VIEW_COUPON_CODE_START, singeViewCouponCodeAPI)]);
  yield all([yield takeLatest(PREMIUM_FOLDER_LIST_START, premiumFolderListAPI)]);
  yield all([yield takeLatest(FETCH_MORE_PREMIUM_FOLDER_LIST_START, premiumFolderListAPI)]);
  yield all([yield takeLatest(PREMIUM_FOLDER_PAYMENT_START, premiumFolderPaymentAPI)]);
  yield all([yield takeLatest(CREATE_PREMIUM_FOLDER_START, createPremiumFolderAPI)]);
  yield all([yield takeLatest(UPLOAD_FILES_PREMIUM_FOLDER_START, uploadFilesPremiumFolderAPI)]);
  yield all([yield takeLatest(PREMIUM_FOLDER_FILES_LIST_START, premiumFolderFilesListAPI)]);
  yield all([yield takeLatest(DELETE_FOLDER_FILE_START, deleteFolderFileAPI)]);
  yield all([yield takeLatest(FOLDER_FILE_VIEW_START, folderFileViewAPI)]);
  yield all([yield takeLatest(FOLDER_FILES_REMOVE_START, folderFilesRemoveAPI)]);
  yield all([yield takeLatest(FOLDER_FILES_LIST_START, folderFilesListAPI)]);
  yield all([yield takeLatest(FETCH_MORE_FOLDER_FILES_LIST_START, folderFilesListAPI)]);
  yield all([yield takeLatest(FOLDER_FILES_LIST_FOR_OTHERS_START, folderFilesListForOthersAPI)]);
  yield all([yield takeLatest(FETCH_MORE_FOLDER_FILES_LIST_FOR_OTHERS_START, folderFilesListForOthersAPI)]);
}

