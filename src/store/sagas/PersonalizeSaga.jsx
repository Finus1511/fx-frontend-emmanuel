import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";
import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../../components/helper/NotificationMessage";
import {
  PR_STORE_START,
  PR_CREATE_USER_PRODUCT_START,
  PR_REQUEST_LIST_START,
  PR_RECEIVED_LIST_START,
  PR_UPDATE_ACCEPT_REJECT_START,
  PR_USER_REJECT_REQUEST_START,
  PR_USER_PAYMENT_BY_WALLET_START,
  PR_PRODUCT_FILES_UPLOAD_START,
  PR_PRODUCT_FILES_REMOVE_START,
  PR_REQUEST_VIEW_START,
  PR_CREATOR_UPDATE_REQUEST_FILE_START,
  PR_CREATOR_EDIT_REQUEST_START,
  PR_DELIVERY_ADDRESS_LIST_START,
  PR_USER_CANCEL_REQUEST_START,
} from "../actions/ActionConstant";
import {
  prStoreSuccess,
  prStoreFailure,
  prCreateUserProductSuccess,
  prCreateUserProductFailure,
  prRequestListSuccess,
  prRequestListFailure,
  prReceivedListSuccess,
  prReceivedListFailure,
  prUpdateAcceptRejectSuccess,
  prUpdateAcceptRejectFailure,
  prUserRejectRequestSuccess,
  prUserRejectRequestFailure,
  prUserPaymentByWalletSuccess,
  prUserPaymentByWalletFailure,
  prProductFilesUploadSuccess,
  prProductFilesUploadFailure,
  prProductFilesRemoveSuccess,
  prProductFilesRemoveFailure,
  prRequestViewSuccess,
  prRequestViewFailure,
  prReceivedListUpdate,
  prRequestListUpdate,
  prCreatorUpdateRequestFileSuccess,
  prCreatorUpdateRequestFileFailure,
  prCreatorEditRequestSuccess,
  prCreatorEditRequestFailure,
  prDeliveyAddressListSuccess,
  prDeliveyAddressListFailure,
  prUserCancelRequestSuccess,
  prUserCancelRequestFailure,
} from "../actions/PersonalizeAction";
import { createNotification } from "react-redux-notify";
import { error } from "jquery";

function* prStoreAPI(action) {
  try {
    const response = yield api.postMethod(
      "personalize_requests/store",
      action.data
    );
    if (response.data.success) {
      yield put(prStoreSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(prStoreFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(prStoreFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* prCreateUserProductAPI(action) {
  try {
    const response = yield api.postMethod(
      "personalize_requests/create_product_for_personalize_request",
      action.data
    );
    if (response.data.success) {
      yield put(prCreateUserProductSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(prCreateUserProductFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(prCreateUserProductFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* prRequestListAPI(action) {
  try {
    const response = yield api.postMethod(
      "personalize_requests/personalized_request_sent",
      action.data
    );
    if (response.data.success) {
      yield put(prRequestListSuccess(response.data.data));
    } else {
      yield put(prRequestListFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(prRequestListFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* prReceivedListAPI(action) {
  try {
    const response = yield api.postMethod(
      "personalize_requests/personalized_request_received",
      action.data
    );
    if (response.data.success) {
      yield put(prReceivedListSuccess(response.data.data));
      // const notificationMessage = getSuccessNotificationMessage(
      //   response.data.message
      // );
      // yield put(createNotification(notificationMessage));
    } else {
      yield put(prReceivedListFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(prReceivedListFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* prUpdateAcceptRejectAPI(action) {
  try {
    const response = yield api.postMethod(
      "personalize_requests/personalized_request_status_update_by_creator",
      action.data
    );
    if (response.data.success) {
      yield put(prUpdateAcceptRejectSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      let receivedListData = yield select(
        (state) => state.personalize.receivedList.data
      );
      if (Object.keys(receivedListData).length > 0) {
        receivedListData = {
          ...receivedListData,
          personalized_creator_requests:
            receivedListData.personalized_creator_requests.map((item) =>
              item.unique_id ===
              response.data.data.personalized_requests.unique_id
                ? response.data.data.personalized_requests
                : item
            ),
        };
        yield put(prReceivedListUpdate(receivedListData));
      }
    } else {
      yield put(prUpdateAcceptRejectFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(prUpdateAcceptRejectFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* prUserRejectRequestAPI(action) {
  try {
    const response = yield api.postMethod(
      "personalize_requests/request_reject_by_user",
      action.data
    );
    if (response.data.success) {
      yield put(prUserRejectRequestSuccess(response.data.data));
      let requestList = yield select(
        (state) => state.personalize.requestList.data
      );
      if (Object.keys(requestList).length > 0) {
        requestList = {
          ...requestList,
          personalized_requests: requestList.personalized_requests.map((item) =>
            item.unique_id ===
            response.data.data.personalized_requests.unique_id
              ? response.data.data.personalized_requests
              : item
          ),
        };
        yield put(prRequestListUpdate(requestList));
      }
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(prUserRejectRequestFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(prUserRejectRequestFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* prUserPaymentByWalletAPI(action) {
  try {
    const response = yield api.postMethod(
      "personalize_requests/personalized_request_payment_by_wallet",
      action.data
    );
    if (response.data.success) {
      let requestList = yield select(
        (state) => state.personalize.requestList.data
      );
      if (Object.keys(requestList).length > 0) {
        requestList = {
          ...requestList,
          personalized_requests: requestList.personalized_requests.map((item) =>
            item.unique_id === response.data.data.personalized_request.unique_id
              ? response.data.data.personalized_request
              : item
          ),
        };
        yield put(prRequestListUpdate(requestList));
      }
      yield put(prUserPaymentByWalletSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(prUserPaymentByWalletFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(prUserPaymentByWalletFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* prProductFilesUploadAPI(action) {
  try {
    const response = yield api.postMethod(
      "personalize_requests/personalize_product_files_save",
      action.data
    );
    if (response.data.success) {
      yield put(prProductFilesUploadSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(prProductFilesUploadFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(prProductFilesUploadFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* prProductFilesRemoveAPI(action) {
  try {
    const response = yield api.postMethod(
      "personalize_requests/personalize_product_file_delete",
      action.data
    );
    if (response.data.success) {
      yield put(prProductFilesRemoveSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(prProductFilesRemoveFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(prProductFilesRemoveFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* prRequestViewAPI(action) {
  try {
    const response = yield api.postMethod(
      "personalize_requests/personalize_request_product_response",
      action.data
    );
    if (response.data.success) {
      yield put(prRequestViewSuccess(response.data.data));
    } else {
      yield put(prRequestViewFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(prRequestViewFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* prCreatorUpdateRequestFileAPI(action) {
  try {
    const response = yield api.postMethod(
      "personalize_requests/creator_update_request_file",
      action.data
    );
    if (response.data.success) {
      yield put(prCreatorUpdateRequestFileSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      let receivedListData = yield select(
        (state) => state.personalize.receivedList.data
      );
      if (Object.keys(receivedListData).length > 0) {
        receivedListData = {
          ...receivedListData,
          personalized_creator_requests:
            receivedListData.personalized_creator_requests.map((item) =>
              item.unique_id ===
              response.data.data.personalized_request.unique_id
                ? response.data.data.personalized_request
                : item
            ),
        };
        yield put(prReceivedListUpdate(receivedListData));
      }
    } else {
      yield put(prCreatorUpdateRequestFileFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(prCreatorUpdateRequestFileFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* prCreatorEditRequestAPI(action) {
  try {
    const response = yield api.postMethod(
      "personalize_requests/personalized_request_update_by_creator",
      action.data
    );
    if (response.data.success) {
      yield put(prCreatorEditRequestSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      let receivedListData = yield select(
        (state) => state.personalize.receivedList.data
      );
      if (Object.keys(receivedListData).length > 0) {
        receivedListData = {
          ...receivedListData,
          personalized_creator_requests:
            receivedListData.personalized_creator_requests.map((item) =>
              item.unique_id ===
              response.data.data.personalized_requests.unique_id
                ? response.data.data.personalized_requests
                : item
            ),
        };
        yield put(prReceivedListUpdate(receivedListData));
      }
    } else {
      yield put(prCreatorEditRequestFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(prCreatorEditRequestFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* prDeliveryAddressListAPI(action) {
  try {
    const response = yield api.postMethod(
      "personalize_requests/personalized_delivery_address_list",
      action.data
    );
    if (response.data.success) {
      yield put(prDeliveyAddressListSuccess(response.data.data));
    } else {
      yield put(prDeliveyAddressListFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(prDeliveyAddressListFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* prUserCancelRequestAPI(action) {
  try {
    const response = yield api.postMethod(
      "personalize_requests/request_cancel_by_user",
      action.data
    );
    if (response.data.success) {
      yield put(prUserCancelRequestSuccess(response.data.data));
      let requestList = yield select(
        (state) => state.personalize.requestList.data
      );
      if (Object.keys(requestList).length > 0) {
        requestList = {
          ...requestList,
          personalized_requests: requestList.personalized_requests.map((item) =>
            item.unique_id ===
            response.data.data.personalized_requests.unique_id
              ? response.data.data.personalized_requests
              : item
          ),
        };
        yield put(prRequestListUpdate(requestList));
      }
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(prUserCancelRequestFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(prUserCancelRequestFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

export default function* PersonalizeSaga() {
  yield all([
    yield takeLatest(PR_STORE_START, prStoreAPI),
    yield takeLatest(PR_CREATE_USER_PRODUCT_START, prCreateUserProductAPI),
    yield takeLatest(PR_REQUEST_LIST_START, prRequestListAPI),
    yield takeLatest(PR_RECEIVED_LIST_START, prReceivedListAPI),
    yield takeLatest(PR_UPDATE_ACCEPT_REJECT_START, prUpdateAcceptRejectAPI),
    yield takeLatest(PR_USER_REJECT_REQUEST_START, prUserRejectRequestAPI),
    yield takeLatest(PR_USER_PAYMENT_BY_WALLET_START, prUserPaymentByWalletAPI),
    yield takeLatest(PR_PRODUCT_FILES_UPLOAD_START, prProductFilesUploadAPI),
    yield takeLatest(PR_PRODUCT_FILES_REMOVE_START, prProductFilesRemoveAPI),
    yield takeLatest(PR_REQUEST_VIEW_START, prRequestViewAPI),
    yield takeLatest(
      PR_CREATOR_UPDATE_REQUEST_FILE_START,
      prCreatorUpdateRequestFileAPI
    ),
    yield takeLatest(PR_CREATOR_EDIT_REQUEST_START, prCreatorEditRequestAPI),
    yield takeLatest(PR_DELIVERY_ADDRESS_LIST_START, prDeliveryAddressListAPI),
    yield takeLatest(PR_USER_CANCEL_REQUEST_START, prUserCancelRequestAPI),
  ]);
}
