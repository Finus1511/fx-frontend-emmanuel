import {
	CREATOR_ONE_ON_ONE_VE_BOOKING_LIST_START,
	CREATOR_ONE_ON_ONE_VE_BOOKING_LIST_SUCCESS,
	CREATOR_ONE_ON_ONE_VE_BOOKING_LIST_FAILURE,
	CREATOR_ONE_ON_ONE_VE_BOOKING_VIEW_START,
	CREATOR_ONE_ON_ONE_VE_BOOKING_VIEW_SUCCESS,
	CREATOR_ONE_ON_ONE_VE_BOOKING_VIEW_FAILURE,
	CREATOR_ONE_ON_ONE_VE_BOOKING_REJECT_START,
	CREATOR_ONE_ON_ONE_VE_BOOKING_REJECT_SUCCESS,
	CREATOR_ONE_ON_ONE_VE_BOOKING_REJECT_FAILURE,
	CREATOR_ONE_ON_ONE_VE_BOOKING_START_START,
	CREATOR_ONE_ON_ONE_VE_BOOKING_START_SUCCESS,
	CREATOR_ONE_ON_ONE_VE_BOOKING_START_FAILURE,
	CREATOR_ONE_ON_ONE_VE_BOOKING_END_START,
	CREATOR_ONE_ON_ONE_VE_BOOKING_END_SUCCESS,
	CREATOR_ONE_ON_ONE_VE_BOOKING_END_FAILURE,
	CREATOR_ONE_ON_ONE_VE_LIST_START,
	CREATOR_ONE_ON_ONE_VE_LIST_SUCCESS,
	CREATOR_ONE_ON_ONE_VE_LIST_FAILURE,
	CREATOR_ONE_ON_ONE_VE_FILE_SAVE_START,
	CREATOR_ONE_ON_ONE_VE_FILE_SAVE_SUCCESS,
	CREATOR_ONE_ON_ONE_VE_FILE_SAVE_FAILURE,
	CREATOR_ONE_ON_ONE_VE_FILE_DELETE_START,
	CREATOR_ONE_ON_ONE_VE_FILE_DELETE_SUCCESS,
	CREATOR_ONE_ON_ONE_VE_FILE_DELETE_FAILURE,
	CREATOR_ONE_ON_ONE_VE_SAVE_START,
	CREATOR_ONE_ON_ONE_VE_SAVE_SUCCESS,
	CREATOR_ONE_ON_ONE_VE_SAVE_FAILURE,
	CREATOR_ONE_ON_ONE_VE_DELETE_START,
	CREATOR_ONE_ON_ONE_VE_DELETE_SUCCESS,
	CREATOR_ONE_ON_ONE_VE_DELETE_FAILURE,
	CREATOR_ONE_ON_ONE_VE_VIEW_START,
	CREATOR_ONE_ON_ONE_VE_VIEW_SUCCESS,
	CREATOR_ONE_ON_ONE_VE_VIEW_FAILURE,
	CREATOR_ONE_ON_ONE_VE_STATUS_START,
	CREATOR_ONE_ON_ONE_VE_STATUS_SUCCESS,
	CREATOR_ONE_ON_ONE_VE_STATUS_FAILURE

} from "../actions/ActionConstant";

const initialState = {
	creatorVirtualBookingList: {
		data: {},
		loading: true,
		error: false,
	},
	creatorVirtualBookingView: {
		data: {},
		loading: true,
		error: false,
	},
	creatorVirtualBookingReject: {
		data: {

		},
		loading: true,
		error: false,
	},
	creatorVirtualBookingStart: {
		data: {

		},
		loading: true,
		buttonDisable: false,
		error: false,
	},
	creatorVirtualBookingEnd: {
		data: {
		},
		loading: true,
		error: false,
	},
	userVirtualExperienceCreatedList: {
		data: {
			virtual_experiences: [],
			total: 0
		},
		loading: true,
		error: false,
	},
	creatorVirtualExperienceFileSave: {
		data: {
		},
		loading: true,
		error: false,
	},
	creatorVirtualExperienceFileDelete: {
		data: {
		},
		loading: true,
		error: false,
	},
	creatorVirtualExperienceSave: {
		data: {
		},
		loading: true,
		error: false,
	},
	creatorVirtualExperienceDelete: {
		data: {
		},
		loading: true,
		error: false,
	},
	creatorVirtualExperienceView: {
		data: {
		},
		loading: true,
		error: false,
	},
	creatorVirtualExperienceStatus: {
		data: {
		},
		loading: true,
		error: false,
	}
};

const CreatorOneOnOneVEReducer = (state = initialState, action) => {
	switch (action.type) {
		case CREATOR_ONE_ON_ONE_VE_BOOKING_LIST_START:
			return {
				...state,
				creatorVirtualBookingList: {
					data: {},
					loading: true,
					error: false,
				},
			};

		case CREATOR_ONE_ON_ONE_VE_BOOKING_LIST_SUCCESS:
			return {
				...state,
				creatorVirtualBookingList: {
					data: action.data.data,
					loading: false,
					error: false,
				},
			};

		case CREATOR_ONE_ON_ONE_VE_BOOKING_LIST_FAILURE:
			return {
				...state,
				creatorVirtualBookingList: {
					data: {},
					loading: false,
					error: action.error,
				},
			};

		case CREATOR_ONE_ON_ONE_VE_BOOKING_VIEW_START:
			return {
				...state,
				creatorVirtualBookingView: {
					data: {},
					loading: true,
					error: false,
				},
			};

		case CREATOR_ONE_ON_ONE_VE_BOOKING_VIEW_SUCCESS:
			return {
				...state,
				creatorVirtualBookingView: {
					data: action.data.data,
					loading: false,
					error: false,
				},
			};

		case CREATOR_ONE_ON_ONE_VE_BOOKING_VIEW_FAILURE:
			return {
				...state,
				creatorVirtualBookingView: {
					data: action.data.data,
					loading: false,
					error: false,
				},
			};

		case CREATOR_ONE_ON_ONE_VE_BOOKING_REJECT_START:
			return {
				...state,
				creatorVirtualBookingReject: {
					data: action.data.data,
					loading: false,
					error: false,
				},
			};
		case CREATOR_ONE_ON_ONE_VE_BOOKING_REJECT_SUCCESS:
			return {
				...state,
				creatorVirtualBookingReject: {
					data: action.data.data,
					loading: false,
					error: false,
				},
			};

		case CREATOR_ONE_ON_ONE_VE_BOOKING_REJECT_FAILURE:
			return {
				...state,
				creatorVirtualBookingReject: {
					data: action.data.data,
					loading: false,
					error: false,
				},
			};

		case CREATOR_ONE_ON_ONE_VE_BOOKING_START_START:
			return {
				...state,
				creatorVirtualBookingStart: {
					data: {},
					loading: false,
					error: false,
					buttonDisable: true,
				},
			};

		case CREATOR_ONE_ON_ONE_VE_BOOKING_START_SUCCESS:
			return {
				...state,
				creatorVirtualBookingStart: {
					data: action.data,
					loading: false,
					error: false,
					buttonDisable: false,
				},
			};

		case CREATOR_ONE_ON_ONE_VE_BOOKING_START_FAILURE:
			return {
				...state,
				creatorVirtualBookingStart: {
					data: action.error,
					loading: false,
					error: true,
					buttonDisable: false,
				},
			};

		case CREATOR_ONE_ON_ONE_VE_BOOKING_END_START:
			return {
				...state,
				creatorVirtualBookingEnd: {
					data: action.data.data,
					loading: false,
					error: false,
				},
			};

		case CREATOR_ONE_ON_ONE_VE_BOOKING_END_SUCCESS:
			return {
				...state,
				creatorVirtualBookingEnd: {
					data: action.data.data,
					loading: false,
					error: false,
				},
			};

		case CREATOR_ONE_ON_ONE_VE_BOOKING_END_FAILURE:
			return {
				...state,
				creatorVirtualBookingEnd: {
					data: action.data.data,
					loading: false,
					error: false,
				},
			};


		case CREATOR_ONE_ON_ONE_VE_LIST_START:
			return {
				...state,
				userVirtualExperienceCreatedList: {
					data: {
						...state.userVirtualExperienceCreatedList.data,
						virtual_experiences: action.data.append ? state.userVirtualExperienceCreatedList.data.virtual_experiences : [],
					},
					loading: action.data.append ? false : true,
					error: {},
				}
			};

		case CREATOR_ONE_ON_ONE_VE_LIST_SUCCESS:
			return {
				...state,
				userVirtualExperienceCreatedList: {
					data: {
						virtual_experiences: [...state.userVirtualExperienceCreatedList.data.virtual_experiences, ...action.data.virtual_experiences],
						total: action.data.total
					},
					loading: false,
					error: {},
				}
			};

		case CREATOR_ONE_ON_ONE_VE_LIST_FAILURE:
			return {
				...state,
				userVirtualExperienceCreatedList: {
					data: {},
					loading: false,
					error: action.error,
				}
			};
		case CREATOR_ONE_ON_ONE_VE_FILE_SAVE_START:
			return {
				...state,
				creatorVirtualExperienceFileSave: {
					data: action.data,
					buttonDisable: true,
					loading: false,
					error: action.error,
				}
			};

		case CREATOR_ONE_ON_ONE_VE_FILE_SAVE_SUCCESS:
			return {
				...state,
				creatorVirtualExperienceFileSave: {
					data: action.data,
					buttonDisable: false,
					loading: false,
					error: action.error,
				}
			};

		case CREATOR_ONE_ON_ONE_VE_FILE_SAVE_FAILURE:
			return {
				...state,
				creatorVirtualExperienceFileSave: {
					data: action.data,
					buttonDisable: false,
					loading: false,
					error: action.error,
				}
			};

		case CREATOR_ONE_ON_ONE_VE_FILE_DELETE_START:
			return {
				...state,
				creatorVirtualExperienceFileDelete: {
					data: action.data,
					loading: false,
					error: action.error,
				}
			};

		case CREATOR_ONE_ON_ONE_VE_FILE_DELETE_SUCCESS:
			return {
				...state,
				creatorVirtualExperienceFileDelete: {
					data: action.data,
					loading: false,
					error: action.error,
				}
			};
		case CREATOR_ONE_ON_ONE_VE_FILE_DELETE_FAILURE:
			return {
				...state,
				creatorVirtualExperienceFileDelete: {
					data: action.data,
					loading: false,
					error: action.error,
				}
			};

		case CREATOR_ONE_ON_ONE_VE_SAVE_START:
			return {
				...state,
				creatorVirtualExperienceSave: {
					data: {},
					buttonDisable: true,
					loading: true,
					error: action.error,
				}
			};
		case CREATOR_ONE_ON_ONE_VE_SAVE_SUCCESS:
			return {
				...state,
				creatorVirtualExperienceSave: {
					data: action.data,
					buttonDisable: false,
					loading: false,
					error: action.error,
				}
			};

		case CREATOR_ONE_ON_ONE_VE_SAVE_FAILURE:
			return {
				...state,
				creatorVirtualExperienceSave: {
					data: {},
					buttonDisable: false,
					loading: false,
					error: action.error,
				}
			};

		case CREATOR_ONE_ON_ONE_VE_DELETE_START:
			return {
				...state,
				creatorVirtualExperienceDelete: {
					data: action.data,
					loading: false,
					error: action.error,
				}
			};

		case CREATOR_ONE_ON_ONE_VE_DELETE_SUCCESS:
			return {
				...state,
				creatorVirtualExperienceDelete: {
					data: action.data,
					loading: false,
					error: action.error,
				}
			};

		case CREATOR_ONE_ON_ONE_VE_DELETE_FAILURE:
			return {
				...state,
				creatorVirtualExperienceDelete: {
					data: action.data,
					loading: false,
					error: action.error,
				}
			};

		case CREATOR_ONE_ON_ONE_VE_VIEW_START:
			return {
				...state,
				creatorVirtualExperienceView: {
					data: {},
					loading: true,
					error: false,
				}
			};

		case CREATOR_ONE_ON_ONE_VE_VIEW_SUCCESS:
			return {
				...state,
				creatorVirtualExperienceView: {
					data: action.data,
					loading: false,
					error: false,
				}
			};

		case CREATOR_ONE_ON_ONE_VE_VIEW_FAILURE:
			return {
				...state,
				creatorVirtualExperienceView: {
					data: {},
					loading: false,
					error: action.error,
				}
			};

		case CREATOR_ONE_ON_ONE_VE_STATUS_START:
			return {
				...state,
				creatorVirtualExperienceStatus: {
					data: action.data,
					loading: false,
					error: action.error,
				}
			};

		case CREATOR_ONE_ON_ONE_VE_STATUS_SUCCESS:
			return {
				...state,
				creatorVirtualExperienceStatus: {
					data: action.data,
					loading: false,
					error: action.error,
				}
			};

		case CREATOR_ONE_ON_ONE_VE_STATUS_FAILURE:
			return {
				...state,
				creatorVirtualExperienceStatus: {
					data: action.data,
					loading: false,
					error: action.error,
				}
			};

		default:
			return state;
	}
};

export default CreatorOneOnOneVEReducer;
