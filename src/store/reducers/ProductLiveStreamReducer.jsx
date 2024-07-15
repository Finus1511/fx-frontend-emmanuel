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
  PRODUCT_LIVE_STREAM_PAYMENT_START,
  PRODUCT_LIVE_STREAM_PAYMENT_SUCCESS,
  PRODUCT_LIVE_STREAM_PAYMENT_FAILURE,
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
} from "../actions/ActionConstant";
import { deliveryConfirmationStart } from "../actions/ProductLiveStreamAction";

const initialState = {
  productLiveStream: {
    data: {},
    loading: false,
    error: false,
    buttonDisabled: false,
  },
  productLiveStreamView: {
    data: {},
    loading: false,
    error: false,
    buttonDisabled: false,
  },
  productLiveStreamList: {
    data: {},
    loading: false,
    error: false,
    buttonDisabled: false,
  },
  productScheduledStreamList: {
    data: {},
    loading: false,
    error: false,
    buttonDisabled: false,
  },
  productLiveStreamHistoryList: {
    data: {},
    loading: false,
    error: false,
    buttonDisabled: false,
  },
  productOrderList: {
    data: {},
    loading: false,
    error: false,
    buttonDisabled: false,
  },
  productSingleOrderView: {
    data: {},
    loading: false,
    error: false,
    buttonDisabled: false,
  },
  productLiveStreamOrderPayment: {
    data: {},
    loading: false,
    error: false,
    buttonDisabled: false,
  },
  liveStreamPayment: {
    data: {},
    loading: false,
    error: false,
    buttonDisabled: false,
  },
  deliveryAddress: {
    data: {},
    loading: true,
    error: false,
  },
  deliveryAddressSave: {
    data: {},
    loading: true,
    error: false,
    loadingButtonContent: "",
    buttonDisable: false,
  },
  deliveryAddressDelete: {
    data: {},
    loading: true,
    error: false,
    loadingButtonContent: "",
    buttonDisable: false,
  },
  defaultDeliveryAddress: {
    data: {},
    loading: true,
    error: false,
    loadingButtonContent: "",
  },
  lssProductOrdersRecievedList: {
    data: {},
    loading: false,
    error: false,
    buttonDisabled: false,
  },
  lssProductsList: {
    data: {},
    loading: false,
    error: false,
    buttonDisabled: false,
  },
  lssProductOrdersRecievedList: {
    data: {},
    loading: false,
    error: false,
    buttonDisabled: false,
  },
  lssProductsList: {
    data: {},
    loading: false,
    error: false,
    buttonDisabled: false,
  },
  updateShippingUrl: {
    data: {},
    loading: false,
    error: false,
    buttonDisabled: false,
  },
  productLiveStreamEnd: {
    data: {},
    loading: false,
    error: false,
    buttonDisabled: false,
  },
  liveVideoChat: {
    data: {
      messages: [],
    },
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  creatorLiveStreamList: {
    data: {},
    loading: false,
    error: false,
    buttonDisabled: false,
  },
  deliveryConfirmation: {
    data: {},
    loading: false,
    error: false,
    buttonDisabled: false,
  },
  liveStreamUserCount: {
    data: {},
    loading: false,
    error: false,
    buttonDisabled: false,
  },
};

const ProductLiveStreamReducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_LIVE_STREAM_START:
      return {
        ...state,
        productLiveStream: {
          data: {},
          loading: true,
          error: false,
          buttonDisabled: true,
        },
      };

    case PRODUCT_LIVE_STREAM_SUCCESS:
      return {
        ...state,
        productLiveStream: {
          data: action.data,
          loading: false,
          error: false,
          buttonDisabled: false,
        },
      };

    case PRODUCT_LIVE_STREAM_FAILURE:
      return {
        ...state,
        productLiveStream: {
          data: {},
          loading: false,
          error: action.error,
          buttonDisabled: false,
        },
      };

    case PRODUCT_LIVE_STREAM_VIEW_START:
      return {
        ...state,
        productLiveStreamView: {
          data: {},
          loading: true,
          error: false,
          buttonDisabled: true,
        },
      };

    case PRODUCT_LIVE_STREAM_VIEW_SUCCESS:
      return {
        ...state,
        productLiveStreamView: {
          data: action.data,
          loading: false,
          error: false,
          buttonDisabled: false,
        },
      };

    case PRODUCT_LIVE_STREAM_VIEW_FAILURE:
      return {
        ...state,
        productLiveStreamView: {
          data: {},
          loading: false,
          error: action.error,
          buttonDisabled: false,
        },
      };

    case PRODUCT_LIVE_STREAM_LIST_START:
      return {
        ...state,
        productLiveStreamList: {
          data: {
            ...state.productLiveStreamList.data,
            live_stream_shoppings_onlive:
              action.data.skip > 0
                ? state.productLiveStreamList.data.live_stream_shoppings_onlive
                : [],
          },
          loading: action.data.skip > 0 ? false : true,
          infiniteLoading: true,
          error: false,
          buttonDisabled: true,
        },
      };

    case PRODUCT_LIVE_STREAM_LIST_SUCCESS:
      return {
        ...state,
        productLiveStreamList: {
          data: {
            live_stream_shoppings_onlive: [
              ...state.productLiveStreamList.data.live_stream_shoppings_onlive,
              ...action.data.live_stream_shoppings_onlive,
            ],
            total: action.data.total,
          },
          loading: false,
          infiniteLoading: false,
          error: false,
          buttonDisabled: false,
        },
      };

    case PRODUCT_LIVE_STREAM_LIST_FAILURE:
      return {
        ...state,
        productLiveStreamList: {
          data: {},
          loading: false,
          infiniteLoading: false,
          error: action.error,
          buttonDisabled: false,
        },
      };

    case PRODUCT_SCHEDULED_STREAM_LIST_START:
      return {
        ...state,
        productScheduledStreamList: {
          data: {
            ...state.productScheduledStreamList.data,
            scheduled_live_stream_shoppings:
              action.data.skip > 0
                ? state.productScheduledStreamList.data
                    .scheduled_live_stream_shoppings
                : [],
          },
          loading: action.data.skip > 0 ? false : true,
          infiniteLoading: true,
          error: false,
          buttonDisabled: true,
        },
      };

    case PRODUCT_SCHEDULED_STREAM_LIST_SUCCESS:
      return {
        ...state,
        productScheduledStreamList: {
          data: {
            scheduled_live_stream_shoppings: [
              ...state.productScheduledStreamList.data
                .scheduled_live_stream_shoppings,
              ...action.data.scheduled_live_stream_shoppings,
            ],
            total: action.data.total,
          },
          loading: false,
          infiniteLoading: false,
          error: false,
          buttonDisabled: false,
        },
      };

    case PRODUCT_SCHEDULED_STREAM_LIST_FAILURE:
      return {
        ...state,
        productScheduledStreamList: {
          data: {},
          loading: false,
          infiniteLoading: false,
          error: action.error,
          buttonDisabled: false,
        },
      };

    case PRODUCT_SCHEDULED_STREAM_LIST_UPDATE:
      return {
        ...state,
        productScheduledStreamList: {
          data: action.data,
          loading: false,
          infiniteLoading: false,
          error: false,
          buttonDisabled: false,
        },
      };

    case PRODUCT_LIVE_STREAM_HISTORY_LIST_START:
      return {
        ...state,
        productLiveStreamHistoryList: {
          data: {
            ...state.productLiveStreamHistoryList.data,
            live_stream_shoppings_history:
              action.data.skip > 0
                ? state.productLiveStreamHistoryList.data
                    .live_stream_shoppings_history
                : [],
          },
          loading: action.data.skip > 0 ? false : true,
          infiniteLoading: true,
          error: false,
          buttonDisabled: true,
        },
      };

    case PRODUCT_LIVE_STREAM_HISTORY_LIST_SUCCESS:
      return {
        ...state,
        productLiveStreamHistoryList: {
          data: {
            live_stream_shoppings_history: [
              ...state.productLiveStreamHistoryList.data
                .live_stream_shoppings_history,
              ...action.data.live_stream_shoppings_history,
            ],
            total: action.data.total,
          },
          loading: false,
          infiniteLoading: false,
          error: false,
          buttonDisabled: false,
        },
      };

    case PRODUCT_LIVE_STREAM_HISTORY_LIST_FAILURE:
      return {
        ...state,
        productLiveStreamHistoryList: {
          data: {},
          loading: false,
          error: action.error,
          buttonDisabled: false,
        },
      };

    case PRODUCT_ORDER_LIST_START:
      return {
        ...state,
        productOrderList: {
          data: {
            ...state.productOrderList.data,
            live_stream_shopping_orders:
              action.data.skip > 0
                ? state.productOrderList.data.live_stream_shopping_orders
                : [],
          },
          loading: action.data.skip > 0 ? false : true,
          infiniteLoading: true,
          error: false,
          buttonDisabled: true,
        },
      };

    case PRODUCT_ORDER_LIST_SUCCESS:
      return {
        ...state,
        productOrderList: {
          data: {
            live_stream_shopping_orders: [
              ...state.productOrderList.data.live_stream_shopping_orders,
              ...action.data.live_stream_shopping_orders,
            ],
            total: action.data.total,
          },
          loading: false,
          infiniteLoading: false,
          error: false,
          buttonDisabled: false,
        },
      };

    case PRODUCT_ORDER_LIST_FAILURE:
      return {
        ...state,
        productOrderList: {
          data: {},
          loading: false,
          infiniteLoading: false,
          error: action.error,
          buttonDisabled: false,
        },
      };

    case PRODUCT_SINGLE_ORDER_VIEW_START:
      return {
        ...state,
        productSingleOrderView: {
          data: {},
          loading: true,
          error: false,
          buttonDisabled: true,
        },
      };

    case PRODUCT_SINGLE_ORDER_VIEW_SUCCESS:
      return {
        ...state,
        productSingleOrderView: {
          data: action.data,
          loading: false,
          error: false,
          buttonDisabled: false,
        },
      };

    case PRODUCT_SINGLE_ORDER_VIEW_FAILURE:
      return {
        ...state,
        productSingleOrderView: {
          data: {},
          loading: false,
          error: action.error,
          buttonDisabled: false,
        },
      };
    case PRODUCT_SINGLE_ORDER_UPDATE_START:
      return {
        ...state,
        productSingleOrderView: {
          data: action.data,
          loading: false,
          error: false,
          buttonDisabled: false,
        },
      };

    case PRODUCT_LIVE_STREAM_ORDER_PAYMENT_START:
      return {
        ...state,
        productLiveStreamOrderPayment: {
          data: {},
          loading: true,
          error: false,
          buttonDisabled: true,
        },
      };

    case PRODUCT_LIVE_STREAM_ORDER_PAYMENT_SUCCESS:
      return {
        ...state,
        productLiveStreamOrderPayment: {
          data: action.data,
          loading: false,
          error: false,
          buttonDisabled: false,
        },
      };

    case PRODUCT_LIVE_STREAM_ORDER_PAYMENT_FAILURE:
      return {
        ...state,
        productLiveStreamOrderPayment: {
          data: {},
          loading: false,
          error: action.error,
          buttonDisabled: false,
        },
      };

    case LSS_PRODUCT_ORDERS_RECIEVED_LIST_START:
      return {
        ...state,
        lssProductOrdersRecievedList: {
          data: {
            ...state.lssProductOrdersRecievedList.data,
            lss_products_recieved_order_details:
              action.data.skip > 0
                ? state.lssProductOrdersRecievedList.data
                    .lss_products_recieved_order_details
                : [],
          },
          loading: action.data.skip > 0 ? false : true,
          infiniteLoading: true,
          error: false,
          buttonDisabled: true,
        },
      };

    case LSS_PRODUCT_ORDERS_RECIEVED_LIST_SUCCESS:
      return {
        ...state,
        lssProductOrdersRecievedList: {
          data: {
            lss_products_recieved_order_details: [
              ...state.lssProductOrdersRecievedList.data
                .lss_products_recieved_order_details,
              ...action.data.lss_products_recieved_order_details,
            ],
            total: action.data.total,
          },
          loading: false,
          infiniteLoading: false,
          error: false,
          buttonDisabled: false,
        },
      };

    case LSS_PRODUCT_ORDERS_RECIEVED_LIST_FAILURE:
      return {
        ...state,
        lssProductOrdersRecievedList: {
          data: {},
          loading: false,
          infiniteLoading: false,
          error: action.error,
          buttonDisabled: false,
        },
      };

    case LIVE_STREAM_SHOPPINGS_PRODUCTS_LIST_START:
      return {
        ...state,
        lssProductsList: {
          data: {},
          loading: true,
          error: false,
          buttonDisabled: true,
        },
      };

    case LIVE_STREAM_SHOPPINGS_PRODUCTS_LIST_SUCCESS:
      return {
        ...state,
        lssProductsList: {
          data: action.data,
          loading: false,
          error: false,
          buttonDisabled: false,
        },
      };

    case LIVE_STREAM_SHOPPINGS_PRODUCTS_LIST_FAILURE:
      return {
        ...state,
        lssProductsList: {
          data: {},
          loading: false,
          error: action.error,
          buttonDisabled: false,
        },
      };

    case PRODUCT_LIVE_STREAM_PAYMENT_START:
      return {
        ...state,
        liveStreamPayment: {
          data: {},
          loading: true,
          error: false,
          buttonDisabled: true,
        },
      };

    case PRODUCT_LIVE_STREAM_PAYMENT_SUCCESS:
      return {
        ...state,
        liveStreamPayment: {
          data: action.data,
          loading: false,
          error: false,
          buttonDisabled: false,
        },
      };

    case PRODUCT_LIVE_STREAM_PAYMENT_FAILURE:
      return {
        ...state,
        liveStreamPayment: {
          data: {},
          loading: false,
          error: action.error,
          buttonDisabled: false,
        },
      };
    case FETCH_PRODUCT_DELIVERY_ADDRESS_START:
      return {
        ...state,
        deliveryAddress: {
          data: {},
          loading: true,
          error: false,
        },
      };
    case FETCH_PRODUCT_DELIVERY_ADDRESS_SUCCESS:
      return {
        ...state,
        deliveryAddress: {
          data: action.data,
          loading: false,
          error: false,
        },
      };
    case FETCH_PRODUCT_DELIVERY_ADDRESS_FAILURE:
      return {
        ...state,
        deliveryAddress: {
          data: {},
          loading: true,
          error: action.error,
        },
      };
    case SAVE_DELIVERY_ADDRESS_START:
      return {
        ...state,
        deliveryAddressSave: {
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "Loading",
          buttonDisable: true,
        },
      };
    case SAVE_DELIVERY_ADDRESS_SUCCESS:
      return {
        ...state,
        deliveryAddressSave: {
          data: action.data,
          loading: false,
          loadingButtonContent: "",
          error: false,
        },
      };
    case SAVE_DELIVERY_ADDRESS_FAILURE:
      return {
        ...state,
        deliveryAddressSave: {
          data: {},
          loading: false,
          loadingButtonContent: "",
          error: action.error,
        },
      };
    case DELETE_DELIVERY_ADDRESS_START:
      return {
        ...state,
        deliveryAddressDelete: {
          data: {},
          loading: true,
          loadingButtonContent: "Loading",
          error: false,
        },
      };
    case DELETE_DELIVERY_ADDRESS_SUCCESS:
      return {
        ...state,
        deliveryAddressDelete: {
          data: action.data,
          loading: false,
          loadingButtonContent: "",
          error: false,
        },
      };
    case DELETE_DELIVERY_ADDRESS_FAILURE:
      return {
        ...state,
        deliveryAddressDelete: {
          data: {},
          loading: false,
          loadingButtonContent: "",
          error: action.error,
        },
      };
    case SET_DEFAULT_DELIVERY_ADDRESS_START:
      return {
        ...state,
        defaultDeliveryAddress: {
          data: {},
          loading: true,
          loadingButtonContent: "Loading",
          error: false,
        },
      };
    case SET_DEFAULT_DELIVERY_ADDRESS_SUCCESS:
      return {
        ...state,
        defaultDeliveryAddress: {
          data: action.data,
          loading: false,
          loadingButtonContent: "",
          error: false,
        },
      };
    case SET_DEFAULT_DELIVERY_ADDRESS_FAILURE:
      return {
        ...state,
        defaultDeliveryAddress: {
          data: {},
          loading: false,
          loadingButtonContent: "",
          error: action.error,
        },
      };

    case LSS_PRODUCT_ORDERS_RECIEVED_LIST_START:
      return {
        ...state,
        lssProductOrdersRecievedList: {
          data: {
            ...state.lssProductOrdersRecievedList.data,
            lss_products_recieved_order_details:
              action.data.skip > 0
                ? state.lssProductOrdersRecievedList.data
                    .lss_products_recieved_order_details
                : [],
          },
          loading: action.data.skip > 0 ? false : true,
          infiniteLoading: true,
          error: false,
          buttonDisabled: true,
        },
      };

    case LSS_PRODUCT_ORDERS_RECIEVED_LIST_SUCCESS:
      return {
        ...state,
        lssProductOrdersRecievedList: {
          data: {
            lss_products_recieved_order_details: [
              ...state.lssProductOrdersRecievedList.data
                .lss_products_recieved_order_details,
              ...action.data.lss_products_recieved_order_details,
            ],
            total: action.data.total,
          },
          loading: false,
          infiniteLoading: false,
          error: false,
          buttonDisabled: false,
        },
      };

    case LSS_PRODUCT_ORDERS_RECIEVED_LIST_FAILURE:
      return {
        ...state,
        lssProductOrdersRecievedList: {
          data: {},
          loading: false,
          infiniteLoading: false,
          error: action.error,
          buttonDisabled: false,
        },
      };

    case LIVE_STREAM_SHOPPINGS_PRODUCTS_LIST_START:
      return {
        ...state,
        lssProductsList: {
          data: {},
          loading: true,
          error: false,
          buttonDisabled: true,
        },
      };

    case LIVE_STREAM_SHOPPINGS_PRODUCTS_LIST_SUCCESS:
      return {
        ...state,
        lssProductsList: {
          data: action.data,
          loading: false,
          error: false,
          buttonDisabled: false,
        },
      };

    case LIVE_STREAM_SHOPPINGS_PRODUCTS_LIST_FAILURE:
      return {
        ...state,
        lssProductsList: {
          data: {},
          loading: false,
          error: action.error,
          buttonDisabled: false,
        },
      };

    case CREATOR_UPDATE_SHIPPING_URL_START:
      return {
        ...state,
        updateShippingUrl: {
          data: {},
          loading: true,
          error: false,
          buttonDisabled: true,
        },
      };

    case CREATOR_UPDATE_SHIPPING_URL_SUCCESS:
      return {
        ...state,
        updateShippingUrl: {
          data: action.data,
          loading: false,
          error: false,
          buttonDisabled: false,
        },
      };

    case CREATOR_UPDATE_SHIPPING_URL_FAILURE:
      return {
        ...state,
        updateShippingUrl: {
          data: {},
          loading: false,
          error: action.error,
          buttonDisabled: false,
        },
      };

    case PRODUCT_LIVE_STREAM_END_START:
      return {
        ...state,
        productLiveStreamEnd: {
          data: {},
          loading: true,
          error: false,
          buttonDisabled: true,
        },
      };

    case PRODUCT_LIVE_STREAM_END_SUCCESS:
      return {
        ...state,
        productLiveStreamEnd: {
          data: action.data,
          loading: false,
          error: false,
          buttonDisabled: false,
        },
      };

    case PRODUCT_LIVE_STREAM_END_FAILURE:
      return {
        ...state,
        productLiveStreamEnd: {
          data: {},
          loading: false,
          error: action.error,
          buttonDisabled: false,
        },
      };

    case FETCH_LIVE_VIDEO_MESSAGE_START:
      return {
        ...state,
        liveVideoChat: {
          inputData: action.data,
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "Loading... Please wait",
          buttonDisable: true,
        },
      };
    case FETCH_LIVE_VIDEO_MESSAGE_SUCCESS:
      return {
        ...state,
        liveVideoChat: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case FETCH_LIVE_VIDEO_MESSAGE_FAILURE:
      return {
        ...state,
        liveVideoChat: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };

    case LIVE_VIDEO_MESSAGE_CONTENT:
      return {
        ...state,
        liveVideoChat: {
          data: {
            messages: [...state.liveVideoChat.data.messages, ...action.data],
          },
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };

    case CREATOR_LIVE_STREAM_SHOPPINGS_LIST_START:
      return {
        ...state,
        creatorLiveStreamList: {
          data: {
            ...state.creatorLiveStreamList.data,
            creator_live_stream_shoppings:
              action.data.skip > 0
                ? state.creatorLiveStreamList.data.creator_live_stream_shoppings
                : [],
          },
          loading: action.data.skip > 0 ? false : true,
          infiniteLoading: true,
          error: false,
          buttonDisabled: true,
        },
      };

    case CREATOR_LIVE_STREAM_SHOPPINGS_LIST_SUCCESS:
      return {
        ...state,
        creatorLiveStreamList: {
          data: {
            creator_live_stream_shoppings: [
              ...state.creatorLiveStreamList.data.creator_live_stream_shoppings,
              ...action.data.creator_live_stream_shoppings,
            ],
            total: action.data.total,
          },
          loading: false,
          infiniteLoading: false,
          error: false,
          buttonDisabled: false,
        },
      };

    case CREATOR_LIVE_STREAM_SHOPPINGS_LIST_FAILURE:
      return {
        ...state,
        creatorLiveStreamList: {
          data: {},
          loading: false,
          infiniteLoading: false,
          error: action.error,
          buttonDisabled: false,
        },
      };
    case DELIVERY_CONFIRMATION_START:
      return {
        ...state,
        deliveryConfirmation: {
          inputData: action.data,
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "Loading... Please wait",
          buttonDisable: true,
        },
      };
    case DELIVERY_CONFIRMATION_SUCCESS:
      return {
        ...state,
        deliveryConfirmation: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case DELIVERY_CONFIRMATION_FAILURE:
      return {
        ...state,
        deliveryConfirmation: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };

    case LIVESTREAM_USER_END_START:
      return {
        ...state,
        liveStreamUserCount: {
          inputData: action.data,
          data: {},
          loading: true,
          error: false,
          loadingButtonContent: "Loading... Please wait",
          buttonDisable: true,
        },
      };
    case LIVESTREAM_USER_END_SUCCESS:
      return {
        ...state,
        liveStreamUserCount: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case LIVESTREAM_USER_END_FAILURE:
      return {
        ...state,
        liveStreamUserCount: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    default:
      return state;
  }
};

export default ProductLiveStreamReducer;
