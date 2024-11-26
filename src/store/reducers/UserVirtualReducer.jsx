import {
  USER_VIRTUAL_BOOKING_LIST_START,
  USER_VIRTUAL_BOOKING_LIST_SUCCESS,
  USER_VIRTUAL_BOOKING_LIST_FAILURE,
  USER_VIRTUAL_BOOKING_VIEW_START,
  USER_VIRTUAL_BOOKING_VIEW_SUCCESS,
  USER_VIRTUAL_BOOKING_VIEW_FAILURE,
  USER_VIRTUAL_BOOKING_CANCEL_START,
  USER_VIRTUAL_BOOKING_CANCEL_SUCCESS,
  USER_VIRTUAL_BOOKING_CANCEL_FAILURE,
  USER_VIRTUAL_BOOKING_JOIN_START,
  USER_VIRTUAL_BOOKING_JOIN_SUCCESS,
  USER_VIRTUAL_BOOKING_JOIN_FAILURE,
  USER_VIRTUAL_BOOKING_EXIT_START,
  USER_VIRTUAL_BOOKING_EXIT_SUCCESS,
  USER_VIRTUAL_BOOKING_EXIT_FAILURE,
  USER_VIRTUAL_VH_LIST_START,
  USER_VIRTUAL_VH_LIST_SUCCESS,
  USER_VIRTUAL_VH_LIST_FAILURE,
  USER_VIRTUAL_VH_VIEW_SUCCESS,
  USER_VIRTUAL_VH_VIEW_FAILURE,
  USER_VIRTUAL_VH_BOOKING_SUCCESS,
  USER_VIRTUAL_VH_BOOKING_FAILURE,
} from "../actions/ActionConstant";

const initialState = {
  userVirtualBookingList: {
    data: {},
    loading: true,
    error: false,
  },
  userVirtualBookingView: {
    data: {},
    loading: true,
    error: false,
  },
  userVirtualBookingCancel: {
    data: {},
    loading: true,
    error: false,
  },
  userVirtualBookingJoin: {
    data: {},
    loading: true,
    error: false,
  },
  userVirtualBookingExit: {
    data: {},
    loading: true,
    error: false,
  },
  userVirtualVhList: {
    data: {},
    loading: true,
    error: false,
  },
  userVirtualVhView: {
    data: {},
    loading: true,
    error: false,
  },
  userVirtualVhBooking: {
    data: {},
    loading: true,
    error: false,
  },
};

const UserVirualReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_VIRTUAL_BOOKING_LIST_START:
      return {
        ...state,
        userVirtualBookingList: {
          data: {},
          loading: true,
          error: false,
        },
      };

    case USER_VIRTUAL_BOOKING_LIST_SUCCESS:
      return {
        ...state,
        userVirtualBookingList: {
          data: action.data.data,
          loading: false,
          error: false,
        },
      };

    case USER_VIRTUAL_BOOKING_LIST_FAILURE:
      return {
        ...state,
        userVirtualBookingList: {
          data: {},
          loading: false,
          error: action.error,
        },
      };

    case USER_VIRTUAL_BOOKING_VIEW_START:
      return {
        ...state,
        userVirtualBookingView: {
          data: {},
          loading: true,
          error: false,
        },
      };

    case USER_VIRTUAL_BOOKING_VIEW_SUCCESS:
      return {
        ...state,
        userVirtualBookingView: {
          data: action.data.data,
          loading: false,
          error: false,
        },
      };

    case USER_VIRTUAL_BOOKING_VIEW_FAILURE:
      return {
        ...state,
        userVirtualBookingView: {
          data: {},
          loading: false,
          error: action.error,
        },
      };
    case USER_VIRTUAL_BOOKING_CANCEL_START:
      return {
        ...state,
        userVirtualBookingCancel: {
          data: action.data,
          loading: false,
          error: false,
        },
      };
    case USER_VIRTUAL_BOOKING_CANCEL_SUCCESS:
      return {
        ...state,
        userVirtualBookingCancel: {
          data: action.data,
          loading: false,
          error: false,
        },
      };
    case USER_VIRTUAL_BOOKING_CANCEL_FAILURE:
      return {
        ...state,
        userVirtualBookingCancel: {
          data: action.data,
          loading: false,
          error: action.error,
        },
      };
    case USER_VIRTUAL_BOOKING_JOIN_START:
      return {
        ...state,
        userVirtualBookingJoin: {
          data: action.data,
          loading: false,
          error: false,
        },
      };
    case USER_VIRTUAL_BOOKING_JOIN_SUCCESS:
      return {
        ...state,
        userVirtualBookingJoin: {
          data: action.data,
          loading: false,
          error: false,
        },
      };
    case USER_VIRTUAL_BOOKING_JOIN_FAILURE:
      return {
        ...state,
        userVirtualBookingJoin: {
          data: action.data,
          loading: false,
          error: action.error,
        },
      };
    case USER_VIRTUAL_BOOKING_EXIT_START:
      return {
        ...state,
        userVirtualBookingExit: {
          data: action.data,
          loading: false,
          error: false,
        },
      };
    case USER_VIRTUAL_BOOKING_EXIT_SUCCESS:
      return {
        ...state,
        userVirtualBookingExit: {
          data: action.data,
          loading: false,
          error: false,
        },
      };
    case USER_VIRTUAL_BOOKING_EXIT_FAILURE:
      return {
        ...state,
        userVirtualBookingExit: {
          data: action.data,
          loading: false,
          error: action.error,
        },
      };
    case USER_VIRTUAL_VH_LIST_START:
      return {
        ...state,
        userVirtualVhList: {
          data: {
            ...state.userVirtualVhList.data,
            virtual_experiences: action.data.append
              ? state.userVirtualVhList.data.virtual_experiences
              : [],
          },
          loading: action.data.append ? false : true,
          error: {},
        },
      };
    case USER_VIRTUAL_VH_LIST_SUCCESS:
      return {
        ...state,
        userVirtualVhList: {
          data: {
            virtual_experiences: [
              ...state.userVirtualVhList.data.virtual_experiences,
              ...action.data.virtual_experiences,
            ],
            total: action.data.total,
          },
          loading: false,
          error: action.error,
        },
      };
    case USER_VIRTUAL_VH_LIST_FAILURE:
      return {
        ...state,
        userVirtualVhList: {
          data: action.data,
          loading: false,
          error: action.error,
        },
      };
    case USER_VIRTUAL_VH_VIEW_SUCCESS:
      return {
        ...state,
        userVirtualVhView: {
          data: action.data,
          loading: false,
          error: action.error,
        },
      };
    case USER_VIRTUAL_VH_VIEW_FAILURE:
      return {
        ...state,
        userVirtualVhView: {
          data: action.data,
          loading: false,
          error: action.error,
        },
      };
    case USER_VIRTUAL_VH_BOOKING_SUCCESS:
      return {
        ...state,
        userVirtualVhBooking: {
          data: action.data,
          loading: false,
          error: action.error,
        },
      };
    case USER_VIRTUAL_VH_BOOKING_FAILURE:
      return {
        ...state,
        userVirtualVhBooking: {
          data: action.data,
          loading: false,
          error: action.error,
        },
      };

    default:
      return state;
  }
};

export default UserVirualReducer;
