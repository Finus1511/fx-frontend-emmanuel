import {
  PRODUCT_LIVE_STREAM_START,
  PRODUCT_LIVE_STREAM_SUCCESS,
  PRODUCT_LIVE_STREAM_FAILURE,
  PRODUCT_LIVE_STREAM_VIEW_START,
  PRODUCT_LIVE_STREAM_VIEW_SUCCESS,
  PRODUCT_LIVE_STREAM_VIEW_FAILURE,
  PRODUCT_LIVE_STREAM_LIST_START,
  PRODUCT_LIVE_STREAM_LIST_SUCCESS,
  PRODUCT_LIVE_STREAM_LIST_FAILURE,
  PRODUCT_SCHEDULED_STREAM_LIST_START,
  PRODUCT_SCHEDULED_STREAM_LIST_SUCCESS,
  PRODUCT_SCHEDULED_STREAM_LIST_FAILURE,
  PRODUCT_LIVE_STREAM_HISTORY_LIST_START,
  PRODUCT_LIVE_STREAM_HISTORY_LIST_SUCCESS,
  PRODUCT_LIVE_STREAM_HISTORY_LIST_FAILURE,
  PRODUCT_ORDER_LIST_START,
  PRODUCT_ORDER_LIST_SUCCESS,
  PRODUCT_ORDER_LIST_FAILURE,
  PRODUCT_SINGLE_ORDER_VIEW_START,
  PRODUCT_SINGLE_ORDER_VIEW_SUCCESS,
  PRODUCT_SINGLE_ORDER_VIEW_FAILURE,
  PRODUCT_SINGLE_ORDER_UPDATE_START,
  PRODUCT_LIVE_STREAM_ORDER_PAYMENT_START,
  PRODUCT_LIVE_STREAM_ORDER_PAYMENT_SUCCESS,
  PRODUCT_LIVE_STREAM_ORDER_PAYMENT_FAILURE,
  PRODUCT_LIVE_STREAM_PAYMENT_START,
  PRODUCT_LIVE_STREAM_PAYMENT_SUCCESS,
  PRODUCT_LIVE_STREAM_PAYMENT_FAILURE,
  PRODUCT_SCHEDULED_STREAM_LIST_UPDATE,
  FETCH_PRODUCT_DELIVERY_ADDRESS_START,
  FETCH_PRODUCT_DELIVERY_ADDRESS_SUCCESS,
  FETCH_PRODUCT_DELIVERY_ADDRESS_FAILURE,
  SAVE_DELIVERY_ADDRESS_START,
  SAVE_DELIVERY_ADDRESS_SUCCESS,
  SAVE_DELIVERY_ADDRESS_FAILURE,
  DELETE_DELIVERY_ADDRESS_START,
  DELETE_DELIVERY_ADDRESS_SUCCESS,
  DELETE_DELIVERY_ADDRESS_FAILURE,
  SET_DEFAULT_DELIVERY_ADDRESS_START,
  SET_DEFAULT_DELIVERY_ADDRESS_SUCCESS,
  SET_DEFAULT_DELIVERY_ADDRESS_FAILURE,
  PRODUCT_LIVE_STREAM_END_START,
  PRODUCT_LIVE_STREAM_END_SUCCESS,
  PRODUCT_LIVE_STREAM_END_FAILURE,
  LSS_PRODUCT_ORDERS_RECIEVED_LIST_START,
  LSS_PRODUCT_ORDERS_RECIEVED_LIST_SUCCESS,
  LSS_PRODUCT_ORDERS_RECIEVED_LIST_FAILURE,
  LIVE_STREAM_SHOPPINGS_PRODUCTS_LIST_START,
  LIVE_STREAM_SHOPPINGS_PRODUCTS_LIST_SUCCESS,
  LIVE_STREAM_SHOPPINGS_PRODUCTS_LIST_FAILURE,
  CREATOR_UPDATE_SHIPPING_URL_START,
  CREATOR_UPDATE_SHIPPING_URL_SUCCESS,
  CREATOR_UPDATE_SHIPPING_URL_FAILURE,
  LIVE_VIDEO_MESSAGE_CONTENT,
  FETCH_LIVE_VIDEO_MESSAGE_START,
  FETCH_LIVE_VIDEO_MESSAGE_SUCCESS,
  FETCH_LIVE_VIDEO_MESSAGE_FAILURE,
  CREATOR_LIVE_STREAM_SHOPPINGS_LIST_START,
  CREATOR_LIVE_STREAM_SHOPPINGS_LIST_SUCCESS,
  CREATOR_LIVE_STREAM_SHOPPINGS_LIST_FAILURE,
  DELIVERY_CONFIRMATION_START,
  DELIVERY_CONFIRMATION_SUCCESS,
  DELIVERY_CONFIRMATION_FAILURE,
  LIVESTREAM_USER_END_START,
  LIVESTREAM_USER_END_SUCCESS,
  LIVESTREAM_USER_END_FAILURE,
} from "./ActionConstant";

export function productLiveStreamStart(data) {
  return {
    type: PRODUCT_LIVE_STREAM_START,
    data,
  };
}

export function productLiveStreamSuccess(data) {
  return {
    type: PRODUCT_LIVE_STREAM_SUCCESS,
    data,
  };
}

export function productLiveStreamFailure(error) {
  return {
    type: PRODUCT_LIVE_STREAM_FAILURE,
    error,
  };
}

export function productLiveStreamViewStart(data) {
  return {
    type: PRODUCT_LIVE_STREAM_VIEW_START,
    data,
  };
}

export function productLiveStreamViewSuccess(data) {
  return {
    type: PRODUCT_LIVE_STREAM_VIEW_SUCCESS,
    data,
  };
}

export function productLiveStreamViewFailure(error) {
  return {
    type: PRODUCT_LIVE_STREAM_VIEW_FAILURE,
    error,
  };
}

export function productLiveStreamListStart(data) {
  return {
    type: PRODUCT_LIVE_STREAM_LIST_START,
    data,
  };
}

export function productLiveStreamListSuccess(data) {
  return {
    type: PRODUCT_LIVE_STREAM_LIST_SUCCESS,
    data,
  };
}

export function productLiveStreamListFailure(error) {
  return {
    type: PRODUCT_LIVE_STREAM_LIST_FAILURE,
    error,
  };
}

export function productScheduledStreamListStart(data) {
  return {
    type: PRODUCT_SCHEDULED_STREAM_LIST_START,
    data,
  };
}

export function productScheduledStreamListSuccess(data) {
  return {
    type: PRODUCT_SCHEDULED_STREAM_LIST_SUCCESS,
    data,
  };
}

export function productScheduledStreamListFailure(error) {
  return {
    type: PRODUCT_SCHEDULED_STREAM_LIST_FAILURE,
    error,
  };
}

export function productLiveStreamHistoryListStart(data) {
  return {
    type: PRODUCT_LIVE_STREAM_HISTORY_LIST_START,
    data,
  };
}

export function productLiveStreamHistoryListSuccess(data) {
  return {
    type: PRODUCT_LIVE_STREAM_HISTORY_LIST_SUCCESS,
    data,
  };
}

export function productLiveStreamHistoryListFailure(error) {
  return {
    type: PRODUCT_LIVE_STREAM_HISTORY_LIST_FAILURE,
    error,
  };
}

export function productOrderListStart(data) {
  return {
    type: PRODUCT_ORDER_LIST_START,
    data,
  };
}

export function productOrderListSuccess(data) {
  return {
    type: PRODUCT_ORDER_LIST_SUCCESS,
    data,
  };
}

export function productOrderListFailure(error) {
  return {
    type: PRODUCT_ORDER_LIST_FAILURE,
    error,
  };
}

export function productSingleOrderViewStart(data) {
  return {
    type: PRODUCT_SINGLE_ORDER_VIEW_START,

    data,
  };
}

export function productSingleOrderViewSuccess(data) {
  return {
    type: PRODUCT_SINGLE_ORDER_VIEW_SUCCESS,
    data,
  };
}

export function productSingleOrderViewFailure(error) {
  return {
    type: PRODUCT_SINGLE_ORDER_VIEW_FAILURE,
    error,
  };
}

export function productSingleOrderViewUpdate(data) {
  return {
    type: PRODUCT_SINGLE_ORDER_UPDATE_START,
    data,
  };
}

export function productLiveStreamOrderPaymentStart(data) {
  return {
    type: PRODUCT_LIVE_STREAM_ORDER_PAYMENT_START,

    data,
  };
}

export function productLiveStreamOrderPaymentSuccess(data) {
  return {
    type: PRODUCT_LIVE_STREAM_ORDER_PAYMENT_SUCCESS,
    data,
  };
}

export function productLiveStreamOrderPaymentFailure(error) {
  return {
    type: PRODUCT_LIVE_STREAM_ORDER_PAYMENT_FAILURE,
    error,
  };
}

export function productLiveStreamPaymentStart(data) {
  return {
    type: PRODUCT_LIVE_STREAM_PAYMENT_START,
    data,
  };
}

export function productLiveStreamPaymentSuccess(data) {
  return {
    type: PRODUCT_LIVE_STREAM_PAYMENT_SUCCESS,
    data,
  };
}

export function productLiveStreamPaymentFailure(error) {
  return {
    type: PRODUCT_LIVE_STREAM_PAYMENT_FAILURE,
    error,
  };
}

export function productScheduledStreamListUpdate(data) {
  return {
    type: PRODUCT_SCHEDULED_STREAM_LIST_UPDATE,
    data,
  };
}

export function fetchDeliveryAddressStart(data) {
  return {
    type: FETCH_PRODUCT_DELIVERY_ADDRESS_START,
    data,
  };
}

export function fetchDeliveryAddressSuccess(data) {
  return {
    type: FETCH_PRODUCT_DELIVERY_ADDRESS_SUCCESS,
    data,
  };
}

export function fetchDeliveryAddressFailure(error) {
  return {
    type: FETCH_PRODUCT_DELIVERY_ADDRESS_FAILURE,
    error,
  };
}

export function saveDeliveryAddressStart(data) {
  return {
    type: SAVE_DELIVERY_ADDRESS_START,
    data,
  };
}

export function saveDeliveryAddressSuccess(data) {
  return {
    type: SAVE_DELIVERY_ADDRESS_SUCCESS,
    data,
  };
}

export function saveDeliveryAddressFailure(error) {
  return {
    type: SAVE_DELIVERY_ADDRESS_FAILURE,
    error,
  };
}

export function deleteDeliveryAddressStart(data) {
  return {
    type: DELETE_DELIVERY_ADDRESS_START,
    data,
  };
}

export function deleteDeliveryAddressSuccess(data) {
  return {
    type: DELETE_DELIVERY_ADDRESS_SUCCESS,
    data,
  };
}

export function deleteDeliveryAddressFailure(error) {
  return {
    type: DELETE_DELIVERY_ADDRESS_FAILURE,
    error,
  };
}

export function setDefaultDeliveryAddressStart(data) {
  return {
    type: SET_DEFAULT_DELIVERY_ADDRESS_START,
    data,
  };
}

export function setDefaultDeliveryAddressSuccess(data) {
  return {
    type: SET_DEFAULT_DELIVERY_ADDRESS_SUCCESS,
    data,
  };
}

export function setDefaultDeliveryAddressFailure(error) {
  return {
    type: SET_DEFAULT_DELIVERY_ADDRESS_FAILURE,
    error,
  };
}

export function productLiveStreamEndStart(data) {
  return {
    type: PRODUCT_LIVE_STREAM_END_START,
    data,
  };
}

export function productLiveStreamEndSuccess(data) {
  return {
    type: PRODUCT_LIVE_STREAM_END_SUCCESS,
    data,
  };
}

export function productLiveStreamEndFailure(error) {
  return {
    type: PRODUCT_LIVE_STREAM_END_FAILURE,
    error,
  };
}

export function lssProductOrdersRecievedListStart(data) {
  return {
    type: LSS_PRODUCT_ORDERS_RECIEVED_LIST_START,

    data,
  };
}

export function lssProductOrdersRecievedListSuccess(data) {
  return {
    type: LSS_PRODUCT_ORDERS_RECIEVED_LIST_SUCCESS,
    data,
  };
}

export function lssProductOrdersRecievedListFailure(error) {
  return {
    type: LSS_PRODUCT_ORDERS_RECIEVED_LIST_FAILURE,
    error,
  };
}

export function liveStreamShoppingsProuctsListStart(data) {
  return {
    type: LIVE_STREAM_SHOPPINGS_PRODUCTS_LIST_START,

    data,
  };
}

export function liveStreamShoppingsProuctsListSuccess(data) {
  return {
    type: LIVE_STREAM_SHOPPINGS_PRODUCTS_LIST_SUCCESS,
    data,
  };
}

export function liveStreamShoppingsProuctsListFailure(error) {
  return {
    type: LIVE_STREAM_SHOPPINGS_PRODUCTS_LIST_FAILURE,
    error,
  };
}

export function creatorUpdateShippingUrlStart(data) {
  return {
    type: CREATOR_UPDATE_SHIPPING_URL_START,

    data,
  };
}

export function creatorUpdateShippingUrlSuccess(data) {
  return {
    type: CREATOR_UPDATE_SHIPPING_URL_SUCCESS,
    data,
  };
}

export function creatorUpdateShippingUrlFailure(error) {
  return {
    type: CREATOR_UPDATE_SHIPPING_URL_FAILURE,
    error,
  };
}

export function liveVideoMessageContent(data) {
  return {
    type: LIVE_VIDEO_MESSAGE_CONTENT,
    data,
  };
}

export function fetchLiveVideoMessageStart(data) {
  return {
    type: FETCH_LIVE_VIDEO_MESSAGE_START,
    data,
  };
}

export function fetchLiveVideoMessageSuccess(data) {
  return {
    type: FETCH_LIVE_VIDEO_MESSAGE_SUCCESS,
    data,
  };
}

export function fetchLiveVideoMessageFailure(error) {
  return {
    type: FETCH_LIVE_VIDEO_MESSAGE_FAILURE,
    error,
  };
}

export function deliveryConfirmationStart(data) {
  return {
    type: DELIVERY_CONFIRMATION_START,
    data,
  };
}

export function deliveryConfirmationSuccess(data) {
  return {
    type: DELIVERY_CONFIRMATION_SUCCESS,
    data,
  };
}
export function deliveryConfirmationFailure(error) {
  return {
    type: DELIVERY_CONFIRMATION_FAILURE,
    error,
  };
}

export function creatorLiveStreamShoppingsListStart(data) {
  return {
    type: CREATOR_LIVE_STREAM_SHOPPINGS_LIST_START,
    data,
  };
}
export function creatorLiveStreamShoppingsListSuccess(data) {
  return {
    type: CREATOR_LIVE_STREAM_SHOPPINGS_LIST_SUCCESS,
    data,
  };
}
export function creatorLiveStreamShoppingsListFailure(error) {
  return {
    type: CREATOR_LIVE_STREAM_SHOPPINGS_LIST_FAILURE,
    error,
  };
}

export function liveStreamUserCountStart(data) {
  return {
    type: LIVESTREAM_USER_END_START,
    data,
  };
}
export function liveStreamUserCountSuccess(data) {
  return {
    type: LIVESTREAM_USER_END_SUCCESS,
    data,
  };
}
export function liveStreamUserCountFailure(error) {
  return {
    type: LIVESTREAM_USER_END_FAILURE,
    error,
  };
}
