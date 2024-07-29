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
} from "../actions/ActionConstant";

const initialState = {
  createCouponCode: {
    data: {},
    loading: false,
    error: false,
  },
  generateCouponCode: {
    data: {},
    loading: false,
    error: false,
  },
  couponCodeList: {
    data: {},
    loading: true,
    error: false,
  },
  couponCodeValidation: {
    data: {},
    loading: false,
    error: false,
  },
  deleteCouponCode: {
    data: {},
    loading: false,
    error: false,
  },
  promoCodeStatus: {
    data: {},
    loading: false,
    error: false,
  },
  couponCodeView: {
    data: {},
    loading: false,
    error: false,
  },
  premiumFolderList: {
    data: {},
    loading: false,
    error: false,
  },

  premiumFolderPayment: {
    data: {},
    loading: false,
    error: false,
  },
  createPremiumFolder: {
    data: {},
    loading: false,
    error: false,
  },
  uploadFilePremiumFolder: {
    data: {},
    loading: false,
    error: false,
  },
  premiumFolderFilesList: {
    data: {},
    loading: false,
    error: false,
  },
};

const PremiumFolderReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_COUPON_CODE_START:
      return {
        ...state,
        createCouponCode: {
          data: {},
          loading: true,
          error: false,
        },
      };

    case CREATE_COUPON_CODE_SUCCESS:
      return {
        ...state,
        createCouponCode: {
          data: action.data,
          loading: false,
          error: false,
        },
      };

    case CREATE_COUPON_CODE_FAILURE:
      return {
        ...state,
        createCouponCode: {
          data: {},
          loading: false,
          error: action.error,
        },
      };

    case GENERATE_COUPON_CODE_START:
      return {
        ...state,
        generateCouponCode: {
          data: {},
          loading: true,
          error: false,
        },
      };

    case GENERATE_COUPON_CODE_SUCCESS:
      return {
        ...state,
        generateCouponCode: {
          data: action.data,
          loading: false,
          error: false,
        },
      };

    case GENERATE_COUPON_CODE_FAILURE:
      return {
        ...state,
        generateCouponCode: {
          data: {},
          loading: false,
          error: action.error,
        },
      };

    case COUPON_CODE_LIST_START:
      return {
        ...state,
        couponCodeList: {
          data: {},
          loading: true,
          error: false,
        },
      };

    case COUPON_CODE_LIST_SUCCESS:
      return {
        ...state,
        couponCodeList: {
          data: action.data,
          loading: false,
          error: false,
        },
      };

    case COUPON_CODE_LIST_FAILURE:
      return {
        ...state,
        couponCodeList: {
          data: {},
          loading: false,
          error: action.error,
        },
      };

    case FETCH_MORE_COUPON_CODE_LIST_START:
      return state;

    case COUPON_CODE_VALIDATION_START:
      return {
        ...state,
        couponCodeValidation: {
          data: {},
          loading: true,
          error: false,
        },
      };

    case COUPON_CODE_VALIDATION_SUCCESS:
      return {
        ...state,
        couponCodeValidation: {
          data: action.data,
          loading: false,
          error: false,
        },
      };

    case COUPON_CODE_VALIDATION_FAILURE:
      return {
        ...state,
        couponCodeValidation: {
          data: {},
          loading: false,
          error: action.error,
        },
      };

    case DELETE_COUPON_CODE_START:
      return {
        ...state,
        deleteCouponCode: {
          data: {},
          loading: true,
          error: false,
        },
      };

    case DELETE_COUPON_CODE_SUCCESS:
      return {
        ...state,
        deleteCouponCode: {
          data: action.data,
          loading: false,
          error: false,
        },
      };

    case DELETE_COUPON_CODE_FAILURE:
      return {
        ...state,
        deleteCouponCode: {
          data: {},
          loading: false,
          error: action.error,
        },
      };

    case PROMO_CODE_STATUS_UPDATE_START:
      return {
        ...state,
        promoCodeStatus: {
          data: {},
          loading: true,
          error: false,
        },
      };

    case PROMO_CODE_STATUS_UPDATE_SUCCESS:
      return {
        ...state,
        promoCodeStatus: {
          data: action.data,
          loading: false,
          error: false,
        },
      };

    case PROMO_CODE_STATUS_UPDATE_FAILURE:
      return {
        ...state,
        promoCodeStatus: {
          data: {},
          loading: false,
          error: action.error,
        },
      };

      case SINGLE_VIEW_COUPON_CODE_START:
        return {
          ...state,
          couponCodeView: {
            data: {},
            loading: true,
            error: false,
          },
        };
  
      case SINGLE_VIEW_COUPON_CODE_SUCCESS:
        return {
          ...state,
          couponCodeView: {
            data: action.data,
            loading: false,
            error: false,
          },
        };
  
      case SINGLE_VIEW_COUPON_CODE_FAILURE:
        return {
          ...state,
          couponCodeView: {
            data: {},
            loading: false,
            error: action.error,
          },
        };

    case PREMIUM_FOLDER_LIST_START:
      return {
        ...state,
        premiumFolderList: {
          data: {},
          loading: true,
          error: false,
        },
      };

    case PREMIUM_FOLDER_LIST_SUCCESS:
      return {
        ...state,
        premiumFolderList: {
          data: action.data,
          loading: false,
          error: false,
        },
      };

    case PREMIUM_FOLDER_LIST_FAILURE:
      return {
        ...state,
        premiumFolderList: {
          data: {},
          loading: false,
          error: action.error,
        },
      };

    case PREMIUM_FOLDER_PAYMENT_START:
      return {
        ...state,
        premiumFolderPayment: {
          data: {},
          loading: true,
          error: false,
        },
      };

    case PREMIUM_FOLDER_PAYMENT_SUCCESS:
      return {
        ...state,
        premiumFolderPayment: {
          data: action.data,
          loading: false,
          error: false,
        },
      };

    case PREMIUM_FOLDER_PAYMENT_FAILURE:
      return {
        ...state,
        premiumFolderPayment: {
          data: {},
          loading: false,
          error: action.error,
        },
      };

    case CREATE_PREMIUM_FOLDER_START:
      return {
        ...state,
        createPremiumFolder: {
          data: {},
          loading: true,
          error: false,
        },
      };

    case CREATE_PREMIUM_FOLDER_SUCCESS:
      return {
        ...state,
        createPremiumFolder: {
          data: action.data,
          loading: false,
          error: false,
        },
      };

    case CREATE_PREMIUM_FOLDER_FAILURE:
      return {
        ...state,
        createPremiumFolder: {
          data: {},
          loading: false,
          error: action.error,
        },
      };

    case UPLOAD_FILES_PREMIUM_FOLDER_START:
      return {
        ...state,
        uploadFilePremiumFolder: {
          data: {},
          loading: true,
          error: false,
        },
      };

    case UPLOAD_FILES_PREMIUM_FOLDER_SUCCESS:
      return {
        ...state,
        uploadFilePremiumFolder: {
          data: action.data,
          loading: false,
          error: false,
        },
      };

    case UPLOAD_FILES_PREMIUM_FOLDER_FAILURE:
      return {
        ...state,
        uploadFilePremiumFolder: {
          data: {},
          loading: false,
          error: action.error,
        },
      };

    case PREMIUM_FOLDER_FILES_LIST_START:
      return {
        ...state,
        premiumFolderFilesList: {
          data: {},
          loading: true,
          error: false,
        },
      };

    case PREMIUM_FOLDER_FILES_LIST_SUCCESS:
      return {
        ...state,
        premiumFolderFilesList: {
          data: action.data,
          loading: false,
          error: false,
        },
      };

    case PREMIUM_FOLDER_FILES_LIST_FAILURE:
      return {
        ...state,
        premiumFolderFilesList: {
          data: {},
          loading: false,
          error: action.error,
        },
      };

    default:
      return state;
  }
};

export default PremiumFolderReducer;
