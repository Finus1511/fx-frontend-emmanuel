import {
  FETCH_SUBSCRIPTION_START,
  FETCH_SUBSCRIPTION_SUCCESS,
  FETCH_SUBSCRIPTION_FAILURE,
  FETCH_MY_SUBSCRIPTION_START,
  FETCH_MY_SUBSCRIPTION_SUCCESS,
  FETCH_MY_SUBSCRIPTION_FAILURE,
  FETCH_SINGLE_SUBSCRIPTION_START,
  FETCH_SINGLE_SUBSCRIPTION_SUCCESS,
  FETCH_SINGLE_SUBSCRIPTION_FAILURE,
  SUBSCRIPTION_PAYMENT_STRIPE_START,
  SUBSCRIPTION_PAYMENT_STRIPE_SUCCESS,
  SUBSCRIPTION_PAYMENT_STRIPE_FAILURE,
  SUBSCRIPTION_PAYMENT_WALLET_START,
  SUBSCRIPTION_PAYMENT_WALLET_SUCCESS,
  SUBSCRIPTION_PAYMENT_WALLET_FAILURE,
  SUBSCRIPTION_AUTO_RENEWAL_START,
  SUBSCRIPTION_AUTO_RENEWAL_SUCCESS,
  SUBSCRIPTION_AUTO_RENEWAL_FAILURE,
  SUBSCRIPTION_PAYMENT_PAYPAL_START,
  SUBSCRIPTION_PAYMENT_PAYPAL_SUCCESS,
  SUBSCRIPTION_PAYMENT_PAYPAL_FAILURE,
  SUBSCRIPTION_PAYMENT_CCBILL_START,
  SUBSCRIPTION_PAYMENT_CCBILL_SUCCESS,
  SUBSCRIPTION_PAYMENT_CCBILL_FAILURE,
  SUBSCRIPTION_PAYMENT_COINPAYMENT_START,
  SUBSCRIPTION_PAYMENT_COINPAYMENT_SUCCESS,
  SUBSCRIPTION_PAYMENT_COINPAYMENT_FAILURE,
  SUBSCRIPTION_SAVE_START,
  SUBSCRIPTION_SAVE_SUCCESS,
  SUBSCRIPTION_SAVE_FAILURE,
  SUBSCRIPTION_DELETE_START,
  SUBSCRIPTION_DELETE_SUCCESS,
  SUBSCRIPTION_DELETE_FAILURE,
} from "../actions/ActionConstant";

const initialState = {
  subscription: {
    data: {},
    loading: true,
    error: false,
  },
  mySubscription: {
    data: {},
    loading: true,
    error: false,
  },
  singleSubscription: {
    data: {},
    loading: true,
    error: false,
  },
  subscriptionSave: {
    data: {},
    loading: false,
    error: false,
  },
  subscriptionDelete: {
    data: {},
    loading: false,
    error: false,
  },
  subPayStripe: {
    inputData: {},
    loading: true,
    error: false,
    success: {},
    buttonDisable: false,
    loadingButtonContent: null,
  },
  subPayWallet: {
    inputData: {},
    loading: true,
    error: false,
    success: {},
    buttonDisable: false,
    loadingButtonContent: null,
  },
  subscriptionRenew: {
    inputData: {},
    loading: true,
    error: false,
    success: {},
    buttonDisable: false,
    loadingButtonContent: null,
  },
  subPayCCBill: {
    inputData: {},
    loading: true,
    error: false,
    success: {},
    buttonDisable: false,
    loadingButtonContent: null,
  },
  subPayCoinPayment: {
    inputData: {},
    loading: true,
    error: false,
    success: {},
    buttonDisable: false,
    loadingButtonContent: null,
  },
};

const SubscriptionReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SUBSCRIPTION_START:
      return {
        ...state,
        subscription: {
          data: {},
          loading: true,
          error: false,
        },
      };
    case FETCH_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        subscription: {
          data: action.data,
          loading: false,
          error: false,
        },
      };
    case FETCH_SUBSCRIPTION_FAILURE:
      return {
        ...state,
        subscription: {
          data: {},
          loading: true,
          error: action.error,
        },
      };
    case FETCH_MY_SUBSCRIPTION_START:
      return {
        ...state,
        mySubscription: {
          data: {},
          loading: true,
          error: false,
        },
      };
    case FETCH_MY_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        mySubscription: {
          data: action.data,
          loading: false,
          error: false,
        },
      };
    case FETCH_MY_SUBSCRIPTION_FAILURE:
      return {
        ...state,
        mySubscription: {
          data: {},
          loading: true,
          error: action.error,
        },
      };
    case FETCH_SINGLE_SUBSCRIPTION_START:
      return {
        ...state,
        singleSubscription: {
          data: {},
          loading: true,
          error: false,
        }
      };
    case FETCH_SINGLE_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        singleSubscription: {
          data: action.data,
          loading: false,
          error: false,
        },
      };
    case FETCH_SINGLE_SUBSCRIPTION_FAILURE:
      return {
        ...state,
        singleSubscription: {
          data: {},
          loading: false,
          error: action.error,
        },
      };
    case SUBSCRIPTION_SAVE_START:
      return {
        ...state,
        subscriptionSave: {
          data: {},
          loading: true,
          error: false,
        }
      };
    case SUBSCRIPTION_SAVE_SUCCESS:
      return {
        ...state,
        subscriptionSave: {
          data: action.data,
          loading: false,
          error: false,
        },
      };
    case SUBSCRIPTION_SAVE_FAILURE:
      return {
        ...state,
        subscriptionSave: {
          data: {},
          loading: false,
          error: action.error,
        },
      };
    case SUBSCRIPTION_DELETE_START:
      return {
        ...state,
        subscriptionDelete: {
          data: action.data,
          loading: true,
          error: false,
        }
      };
    case SUBSCRIPTION_DELETE_SUCCESS:
      return {
        ...state,
        subscriptionDelete: {
          data: action.data,
          loading: false,
          error: false,
        },
      };
    case SUBSCRIPTION_DELETE_FAILURE:
      return {
        ...state,
        subscriptionDelete: {
          data: {},
          loading: false,
          error: action.error,
        },
      };
    case SUBSCRIPTION_PAYMENT_STRIPE_START:
      return {
        ...state,
        subPayStripe: {
          inputData: action.data,
          loading: true,
          error: false,
          success: {},
          buttonDisable: true,
          loadingButtonContent: "Processing.. Please wait...",
        },
      };
    case SUBSCRIPTION_PAYMENT_STRIPE_SUCCESS:
      return {
        ...state,
        subPayStripe: {
          loading: false,
          error: false,
          success: action.data,
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case SUBSCRIPTION_PAYMENT_STRIPE_FAILURE:
      return {
        ...state,
        subPayStripe: {
          loading: true,
          error: action.error,
          success: {},
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case SUBSCRIPTION_PAYMENT_WALLET_START:
      return {
        ...state,
        subPayWallet: {
          inputData: action.data,
          loading: true,
          error: false,
          success: {},
          buttonDisable: true,
          loadingButtonContent: "Processing.. Please wait...",
        },
      };
    case SUBSCRIPTION_PAYMENT_WALLET_SUCCESS:
      return {
        ...state,
        subPayWallet: {
          loading: false,
          error: false,
          success: action.data,
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case SUBSCRIPTION_PAYMENT_WALLET_FAILURE:
      return {
        ...state,
        subPayWallet: {
          loading: true,
          error: action.error,
          success: {},
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case SUBSCRIPTION_AUTO_RENEWAL_START:
      return {
        ...state,
        subscriptionRenew: {
          inputData: action.data,
          loading: true,
          error: false,
          success: {},
          buttonDisable: true,
          loadingButtonContent: "Processing.. Please wait...",
        },
      };
    case SUBSCRIPTION_AUTO_RENEWAL_SUCCESS:
      return {
        ...state,
        subscriptionRenew: {
          loading: false,
          error: false,
          success: action.data,
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case SUBSCRIPTION_AUTO_RENEWAL_FAILURE:
      return {
        ...state,
        subscriptionRenew: {
          loading: true,
          error: action.error,
          success: {},
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case SUBSCRIPTION_PAYMENT_PAYPAL_START:
      return {
        ...state,
        subPayPaypal: {
          inputData: action.data,
          loading: true,
          error: false,
          success: {},
          buttonDisable: true,
          loadingButtonContent: "Processing.. Please wait...",
        },
      };
    case SUBSCRIPTION_PAYMENT_PAYPAL_SUCCESS:
      return {
        ...state,
        subPayPaypal: {
          loading: false,
          error: false,
          success: action.data,
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
    case SUBSCRIPTION_PAYMENT_PAYPAL_FAILURE:
      return {
        ...state,
        subPayPaypal: {
          loading: true,
          error: action.error,
          success: {},
          buttonDisable: false,
          loadingButtonContent: null,
        },
      };
      case SUBSCRIPTION_PAYMENT_CCBILL_START:
        return {
          ...state,
          subPayCCBill: {
            inputData: action.data,
            loading: true,
            error: false,
            success: {},
            buttonDisable: true,
            loadingButtonContent: "Processing.. Please wait...",
          },
        };
      case SUBSCRIPTION_PAYMENT_CCBILL_SUCCESS:
        return {
          ...state,
          subPayCCBill: {
            loading: false,
            error: false,
            success: action.data,
            buttonDisable: false,
            loadingButtonContent: null,
          },
        };
      case SUBSCRIPTION_PAYMENT_CCBILL_FAILURE:
        return {
          ...state,
          subPayCCBill: {
            loading: true,
            error: action.error,
            success: {},
            buttonDisable: false,
            loadingButtonContent: null,
          },
        };
        case SUBSCRIPTION_PAYMENT_COINPAYMENT_START:
          return {
            ...state,
            subPayCoinPayment: {
              inputData: action.data,
              loading: true,
              error: false,
              success: {},
              buttonDisable: true,
              loadingButtonContent: "Processing.. Please wait...",
            },
          };
        case SUBSCRIPTION_PAYMENT_COINPAYMENT_SUCCESS:
          return {
            ...state,
            subPayCoinPayment: {
              loading: false,
              error: false,
              success: action.data,
              buttonDisable: false,
              loadingButtonContent: null,
            },
          };
        case SUBSCRIPTION_PAYMENT_COINPAYMENT_FAILURE:
          return {
            ...state,
            subPayCoinPayment: {
              loading: true,
              error: action.error,
              success: {},
              buttonDisable: false,
              loadingButtonContent: null,
            },
          };
    default:
      return state;
  }
};

export default SubscriptionReducer;
