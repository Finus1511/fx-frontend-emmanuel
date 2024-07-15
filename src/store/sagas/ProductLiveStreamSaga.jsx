import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";
import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../../components/helper/NotificationMessage";
import {
  PRODUCT_LIVE_STREAM_START,
  PRODUCT_LIVE_STREAM_VIEW_START,
  PRODUCT_LIVE_STREAM_LIST_START,
  PRODUCT_SCHEDULED_STREAM_LIST_START,
  PRODUCT_LIVE_STREAM_HISTORY_LIST_START,
  PRODUCT_ORDER_LIST_START,
  PRODUCT_SINGLE_ORDER_VIEW_START,
  PRODUCT_LIVE_STREAM_ORDER_PAYMENT_START,
  PRODUCT_LIVE_STREAM_PAYMENT_START,
  FETCH_PRODUCT_DELIVERY_ADDRESS_START,
  SAVE_DELIVERY_ADDRESS_START,
  DELETE_DELIVERY_ADDRESS_START,
  SET_DEFAULT_DELIVERY_ADDRESS_START,
  PRODUCT_LIVE_STREAM_END_START,
  LSS_PRODUCT_ORDERS_RECIEVED_LIST_START,
  LIVE_STREAM_SHOPPINGS_PRODUCTS_LIST_START,
  CREATOR_UPDATE_SHIPPING_URL_START,
  FETCH_LIVE_VIDEO_MESSAGE_START,
  CREATOR_LIVE_STREAM_SHOPPINGS_LIST_START,
  DELIVERY_CONFIRMATION_START,
  LIVESTREAM_USER_END_START,
} from "../actions/ActionConstant";
import {
  productLiveStreamSuccess,
  productLiveStreamFailure,
  productLiveStreamViewSuccess,
  productLiveStreamViewFailure,
  productLiveStreamListSuccess,
  productLiveStreamListFailure,
  productScheduledStreamListSuccess,
  productScheduledStreamListFailure,
  productLiveStreamHistoryListSuccess,
  productLiveStreamHistoryListFailure,
  productOrderListSuccess,
  productOrderListFailure,
  productSingleOrderViewSuccess,
  productSingleOrderViewFailure,
  productSingleOrderViewUpdate,
  productLiveStreamOrderPaymentSuccess,
  productLiveStreamOrderPaymentFailure,
  productLiveStreamPaymentSuccess,
  productLiveStreamPaymentFailure,
  productScheduledStreamListUpdate,
  fetchDeliveryAddressSuccess,
  fetchDeliveryAddressFailure,
  saveDeliveryAddressSuccess,
  saveDeliveryAddressFailure,
  deleteDeliveryAddressSuccess,
  deleteDeliveryAddressFailure,
  setDefaultDeliveryAddressSuccess,
  setDefaultDeliveryAddressFailure,
  fetchDeliveryAddressStart,
  productLiveStreamEndSuccess,
  productLiveStreamEndFailure,
  lssProductOrdersRecievedListSuccess,
  lssProductOrdersRecievedListFailure,
  liveStreamShoppingsProuctsListSuccess,
  liveStreamShoppingsProuctsListFailure,
  creatorUpdateShippingUrlSuccess,
  creatorUpdateShippingUrlFailure,
  fetchLiveVideoMessageFailure,
  fetchLiveVideoMessageSuccess,
  creatorLiveStreamShoppingsListSuccess,
  creatorLiveStreamShoppingsListFailure,
  deliveryConfirmationFailure,
  deliveryConfirmationSuccess,
  liveStreamUserCountSuccess,
  liveStreamUserCountFailure,
} from "../actions/ProductLiveStreamAction";
import { createNotification } from "react-redux-notify";
import { fetchUserDetailsStart } from "../actions/UserAction";

function* productLiveStreamAPI(action) {
  try {
    const response = yield api.postMethod(
      "live_stream_shoppings/create_live_stream",
      action.data
    );
    if (response.data.success) {
      yield put(productLiveStreamSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(productLiveStreamFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(productLiveStreamFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* productLiveStreamViewAPI(action) {
  try {
    const response = yield api.postMethod(
      "live_stream_shoppings/live_stream_shoppings_view",
      action.data
    );
    if (response.data.success) {
      yield put(productLiveStreamViewSuccess(response.data.data));
    } else {
      yield put(productLiveStreamViewFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(productLiveStreamViewFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* productLiveStreamListAPI(action) {
  try {
    const response = yield api.postMethod(
      "live_stream_shoppings/ongoing_live_stream_shopping",
      action.data
    );
    if (response.data.success) {
      yield put(productLiveStreamListSuccess(response.data.data));
    } else {
      yield put(productLiveStreamListFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(productLiveStreamListFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* productScheduledStreamListAPI(action) {
  try {
    const response = yield api.postMethod(
      "live_stream_shoppings/scheduled_live_stream_shoppings",
      action.data
    );
    if (response.data.success) {
      yield put(productScheduledStreamListSuccess(response.data.data));
    } else {
      yield put(productScheduledStreamListFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(productScheduledStreamListFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* productLiveStreamHistoryListAPI(action) {
  try {
    const response = yield api.postMethod(
      "live_stream_shoppings/live_stream_shoppings_history",
      action.data
    );
    if (response.data.success) {
      yield put(productLiveStreamHistoryListSuccess(response.data.data));
    } else {
      yield put(productLiveStreamHistoryListFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(productLiveStreamHistoryListFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* productOrderListAPI(action) {
  try {
    const response = yield api.postMethod(
      "live_stream_shoppings/lss_product_orders_list",
      action.data
    );
    if (response.data.success) {
      yield put(productOrderListSuccess(response.data.data));
    } else {
      yield put(productOrderListFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(productOrderListFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* productSingleOrderViewAPI(action) {
  try {
    const response = yield api.postMethod(
      "live_stream_shoppings/lss_order_products_view",
      action.data
    );
    if (response.data.success) {
      yield put(productSingleOrderViewSuccess(response.data.data));
    } else {
      yield put(productSingleOrderViewFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(productSingleOrderViewFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* productLiveStreamOrderPaymentAPI(action) {
  try {
    const response = yield api.postMethod(
      "live_stream_shoppings/lss_product_payment_by_wallet",
      action.data
    );
    if (response.data.success) {
      yield put(productLiveStreamOrderPaymentSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(productLiveStreamOrderPaymentFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(productLiveStreamOrderPaymentFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* LiveStreamPaymentAPI(action) {
  try {
    const response = yield api.postMethod(
      "live_stream_shoppings/live_stream_shopping_payment_by_wallet",
      action.data
    );
    if (response.data.success) {
      let productScheduledStreamList = yield select(
        (state) => state.productLiveStream.productScheduledStreamList.data
      );
      if (Object.keys(productScheduledStreamList).length > 0) {
        productScheduledStreamList = {
          ...productScheduledStreamList,
          scheduled_live_stream_shoppings:
            productScheduledStreamList.scheduled_live_stream_shoppings.map(
              (item) =>
                item.unique_id ===
                response.data.data.lss_payment.live_stream_shopping_details
                  .unique_id
                  ? response.data.data.lss_payment.live_stream_shopping_details
                  : item
            ),
        };
        yield put(productScheduledStreamListUpdate(productScheduledStreamList));
      }
      yield put(productLiveStreamPaymentSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(productLiveStreamPaymentFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(productLiveStreamPaymentFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* fetchDeliveryAddressAPI() {
  try {
    const response = yield api.postMethod(
      "live_stream_shoppings/lss_delivery_address_list"
    );
    if (response.data.success) {
      yield put(fetchDeliveryAddressSuccess(response.data.data));
    } else {
      yield put(fetchDeliveryAddressFailure(response.data.error));
      yield call(getErrorNotificationMessage, response.data.error);
    }
  } catch (error) {
    yield put(fetchDeliveryAddressFailure(error));
    yield call(getErrorNotificationMessage, error.message);
  }
}

function* saveDeliveryAddressAPI(action) {
  try {
    const response = yield api.postMethod(
      "live_stream_shoppings/lss_delivery_address_store",
      action.data
    );

    if (response.data.success) {
      yield put(saveDeliveryAddressSuccess(response.data.data));
      yield put(productLiveStreamPaymentSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(saveDeliveryAddressFailure(response.data.error));
      yield call(getErrorNotificationMessage, response.data.error);
    }
  } catch (error) {
    yield put(saveDeliveryAddressFailure(error));
    yield call(getErrorNotificationMessage, error.message);
  }
}

function* deleteDeliveryAddressAPI(action) {
  try {
    const response = yield api.postMethod(
      "live_stream_shoppings/lss_delivery_addrees_delete",
      action.data
    );

    if (response.data.success) {
      yield put(deleteDeliveryAddressSuccess(response.data.data));
      yield call(getSuccessNotificationMessage, response.data.error);
      yield put(fetchDeliveryAddressStart());
    } else {
      yield put(deleteDeliveryAddressFailure(response.data.error));
      yield call(getErrorNotificationMessage, response.data.error);
    }
  } catch (error) {
    yield put(deleteDeliveryAddressFailure(error));
    yield call(getErrorNotificationMessage, error.message);
  }
}

function* setDefaultDeliveryAddressAPI(action) {
  try {
    const response = yield api.postMethod(
      "live_stream_shoppings/lss_delivery_addrees_make_as_default",
      action.data
    );

    if (response.data.success) {
      yield put(setDefaultDeliveryAddressSuccess(response.data.data));
      yield call(getSuccessNotificationMessage, response.data.error);
      yield put(fetchDeliveryAddressStart());
    } else {
      yield put(setDefaultDeliveryAddressFailure(response.data.error));
      yield call(getErrorNotificationMessage, response.data.error);
    }
  } catch (error) {
    yield put(setDefaultDeliveryAddressFailure(error));
    yield call(getErrorNotificationMessage, error.message);
  }
}

function* productLiveStreamEndAPI(action) {
  try {
    const response = yield api.postMethod(
      "live_stream_shoppings/live_stream_shopping_end",
      action.data
    );
    if (response.data.success) {
      yield put(productLiveStreamEndSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(productLiveStreamEndFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(productLiveStreamEndFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* lssProductOrdersRecievedListAPI(action) {
  try {
    const response = yield api.postMethod(
      "live_stream_shoppings/lss_product_orders_recieved_list",
      action.data
    );
    if (response.data.success) {
      yield put(lssProductOrdersRecievedListSuccess(response.data.data));
    } else {
      yield put(lssProductOrdersRecievedListFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(productLiveStreamEndFailure(error));
    yield put(lssProductOrdersRecievedListFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* liveStreamShoppingsProductsListAPI(action) {
  try {
    const response = yield api.postMethod(
      "live_stream_shoppings/live_stream_shopping_products",
      action.data
    );
    if (response.data.success) {
      yield put(liveStreamShoppingsProuctsListSuccess(response.data.data));
    } else {
      yield put(liveStreamShoppingsProuctsListFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(liveStreamShoppingsProuctsListFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* creatorUpdateShippingUrlAPI(action) {
  try {
    const response = yield api.postMethod(
      "live_stream_shoppings/creator_update_shipping_url",
      action.data
    );
    if (response.data.success) {
      yield put(creatorUpdateShippingUrlSuccess(response.data.data));
      let productSingleOrderView = {
        lss_order_product: response.data.data.live_stream_shopping_payment,
      };
      yield put(productSingleOrderViewUpdate(productSingleOrderView));

      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(creatorUpdateShippingUrlFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(creatorUpdateShippingUrlFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* liveVideoChatAPI(action) {
  try {
    const response = yield api.postMethod(
      "live_stream_chat_messages_list",
      action.data
    );
    if (response.data.success) {
      yield put(fetchLiveVideoMessageSuccess(response.data.data));
    } else {
      yield put(fetchLiveVideoMessageFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchLiveVideoMessageFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* deliveryConfirmationAPI(action) {
  try {
    const response = yield api.postMethod(
      "live_stream_shoppings/update_shipping_status",
      action.data
    );
    if (response.data.success) {
      let productSingleOrderView = {
        lss_order_product: response.data.data.live_stream_shopping_payment,
      };
      yield put(productSingleOrderViewUpdate(productSingleOrderView));
      yield put(deliveryConfirmationSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      yield put(deliveryConfirmationFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(deliveryConfirmationFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* creatorLivestreamShoppingsListAPI(action) {
  try {
    const response = yield api.postMethod(
      "live_stream_shoppings/creator_live_stream_shoppings",
      action.data
    );
    if (response.data.success) {
      yield put(creatorLiveStreamShoppingsListSuccess(response.data.data));
    } else {
      yield put(fetchLiveVideoMessageFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(creatorLiveStreamShoppingsListFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* liveStreamUserCountAPI(action) {
  try {
    const response = yield api.postMethod(
      "live_stream_shoppings/lss_update_viewer_count",
      action.data
    );
    if (response.data.success) {
      yield put(liveStreamUserCountSuccess(response.data.data));
    } else {
      yield put(liveStreamUserCountFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(liveStreamUserCountFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

export default function* ProductLiveStreamSaga() {
  yield all([
    yield takeLatest(PRODUCT_LIVE_STREAM_START, productLiveStreamAPI),
    yield takeLatest(PRODUCT_LIVE_STREAM_VIEW_START, productLiveStreamViewAPI),
    yield takeLatest(PRODUCT_LIVE_STREAM_LIST_START, productLiveStreamListAPI),
    yield takeLatest(
      PRODUCT_SCHEDULED_STREAM_LIST_START,
      productScheduledStreamListAPI
    ),
    yield takeLatest(
      PRODUCT_LIVE_STREAM_HISTORY_LIST_START,
      productLiveStreamHistoryListAPI
    ),
    yield takeLatest(PRODUCT_ORDER_LIST_START, productOrderListAPI),
    yield takeLatest(
      PRODUCT_SINGLE_ORDER_VIEW_START,
      productSingleOrderViewAPI
    ),
    yield takeLatest(
      PRODUCT_LIVE_STREAM_ORDER_PAYMENT_START,
      productLiveStreamOrderPaymentAPI
    ),
    yield takeLatest(PRODUCT_LIVE_STREAM_PAYMENT_START, LiveStreamPaymentAPI),
    yield takeLatest(
      FETCH_PRODUCT_DELIVERY_ADDRESS_START,
      fetchDeliveryAddressAPI
    ),
    yield takeLatest(SAVE_DELIVERY_ADDRESS_START, saveDeliveryAddressAPI),
    yield takeLatest(DELETE_DELIVERY_ADDRESS_START, deleteDeliveryAddressAPI),
    yield takeLatest(PRODUCT_LIVE_STREAM_END_START, productLiveStreamEndAPI),
    yield takeLatest(
      SET_DEFAULT_DELIVERY_ADDRESS_START,
      setDefaultDeliveryAddressAPI
    ),
    yield takeLatest(
      LSS_PRODUCT_ORDERS_RECIEVED_LIST_START,
      lssProductOrdersRecievedListAPI
    ),
    yield takeLatest(
      LIVE_STREAM_SHOPPINGS_PRODUCTS_LIST_START,
      liveStreamShoppingsProductsListAPI
    ),
    yield takeLatest(
      CREATOR_UPDATE_SHIPPING_URL_START,
      creatorUpdateShippingUrlAPI
    ),
    yield takeLatest(FETCH_LIVE_VIDEO_MESSAGE_START, liveVideoChatAPI),
    yield takeLatest(
      CREATOR_LIVE_STREAM_SHOPPINGS_LIST_START,
      creatorLivestreamShoppingsListAPI
    ),
    yield takeLatest(DELIVERY_CONFIRMATION_START, deliveryConfirmationAPI),
    yield takeLatest(LIVESTREAM_USER_END_START, liveStreamUserCountAPI),
  ]);
}
