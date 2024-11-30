import {
	USER_VIP_VE_BOOKING_LIST_START,
	USER_VIP_VE_BOOKING_LIST_SUCCESS,
	USER_VIP_VE_BOOKING_LIST_FAILURE,
	USER_VIP_VE_BOOKING_VIEW_START,
	USER_VIP_VE_BOOKING_VIEW_SUCCESS,
	USER_VIP_VE_BOOKING_VIEW_FAILURE,
	USER_VIP_VE_BOOKING_CANCEL_START,
	USER_VIP_VE_BOOKING_CANCEL_SUCCESS,
	USER_VIP_VE_BOOKING_CANCEL_FAILURE,
	USER_VIP_VE_LIST_START,
	USER_VIP_VE_LIST_SUCCESS,
	USER_VIP_VE_LIST_FAILURE,
	USER_VIP_VE_VIEW_SUCCESS,
	USER_VIP_VE_VIEW_FAILURE,
	USER_VIP_VE_BOOKING_SUCCESS,
	USER_VIP_VE_BOOKING_FAILURE,
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

const UserOneOnOneVEReducer = (state = initialState, action) => {
	switch (action.type) {
		case USER_VIP_VE_BOOKING_LIST_START:
			return {
				...state,
				userVirtualBookingList: {
					data: {},
					loading: true,
					error: false,
				},
			};

		case USER_VIP_VE_BOOKING_LIST_SUCCESS:
			return {
				...state,
				userVirtualBookingList: {
					data: action.data.data,
					loading: false,
					error: false,
				},
			};

		case USER_VIP_VE_BOOKING_LIST_FAILURE:
			return {
				...state,
				userVirtualBookingList: {
					data: {},
					loading: false,
					error: action.error,
				},
			};

		case USER_VIP_VE_BOOKING_VIEW_START:
			return {
				...state,
				userVirtualBookingView: {
					data: {},
					loading: true,
					error: false,
				},
			};

		case USER_VIP_VE_BOOKING_VIEW_SUCCESS:
			return {
				...state,
				userVirtualBookingView: {
					data: action.data.data,
					loading: false,
					error: false,
				},
			};

		case USER_VIP_VE_BOOKING_VIEW_FAILURE:
			return {
				...state,
				userVirtualBookingView: {
					data: {},
					loading: false,
					error: action.error,
				},
			};
		case USER_VIP_VE_BOOKING_CANCEL_START:
			return {
				...state,
				userVirtualBookingCancel: {
					data: action.data,
					loading: false,
					error: false,
				},
			};
		case USER_VIP_VE_BOOKING_CANCEL_SUCCESS:
			return {
				...state,
				userVirtualBookingCancel: {
					data: action.data,
					loading: false,
					error: false,
				},
			};
		case USER_VIP_VE_BOOKING_CANCEL_FAILURE:
			return {
				...state,
				userVirtualBookingCancel: {
					data: action.data,
					loading: false,
					error: action.error,
				},
			};
		case USER_VIP_VE_LIST_START:
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
		case USER_VIP_VE_LIST_SUCCESS:
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
		case USER_VIP_VE_LIST_FAILURE:
			return {
				...state,
				userVirtualVhList: {
					data: action.data,
					loading: false,
					error: action.error,
				},
			};
		case USER_VIP_VE_VIEW_SUCCESS:
			return {
				...state,
				userVirtualVhView: {
					data: action.data,
					loading: false,
					error: action.error,
				},
			};
		case USER_VIP_VE_VIEW_FAILURE:
			return {
				...state,
				userVirtualVhView: {
					data: action.data,
					loading: false,
					error: action.error,
				},
			};
		case USER_VIP_VE_BOOKING_SUCCESS:
			return {
				...state,
				userVirtualVhBooking: {
					data: action.data,
					loading: false,
					error: action.error,
				},
			};
		case USER_VIP_VE_BOOKING_FAILURE:
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

export default UserOneOnOneVEReducer;