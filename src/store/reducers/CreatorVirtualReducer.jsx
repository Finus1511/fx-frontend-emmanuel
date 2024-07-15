import {
    CREATOR_VIRTUAL_BOOKING_LIST_START,
    CREATOR_VIRTUAL_BOOKING_LIST_SUCCESS,
    CREATOR_VIRTUAL_BOOKING_LIST_FAILURE,
    CREATOR_VIRTUAL_BOOKING_VIEW_START,
    CREATOR_VIRTUAL_BOOKING_VIEW_SUCCESS,
    CREATOR_VIRTUAL_BOOKING_VIEW_FAILURE,
    CREATOR_VIRTUAL_BOOKING_REJECT_START,
    CREATOR_VIRTUAL_BOOKING_REJECT_SUCCESS,
    CREATOR_VIRTUAL_BOOKING_REJECT_FAILURE,
    CREATOR_VIRTUAL_BOOKING_START_START,
    CREATOR_VIRTUAL_BOOKING_START_SUCCESS,
    CREATOR_VIRTUAL_BOOKING_START_FAILURE,
    CREATOR_VIRTUAL_BOOKING_END_START,
    CREATOR_VIRTUAL_BOOKING_END_SUCCESS,
    CREATOR_VIRTUAL_BOOKING_END_FAILURE,
    CREATOR_VIRTUAL_VH_LIST_START,
    CREATOR_VIRTUAL_VH_LIST_SUCCESS,
    CREATOR_VIRTUAL_VH_LIST_FAILURE,
    CREATOR_VIRTUAL_VH_FILE_SAVE_START,
    CREATOR_VIRTUAL_VH_FILE_SAVE_SUCCESS,
    CREATOR_VIRTUAL_VH_FILE_SAVE_FAILURE,
    CREATOR_VIRTUAL_VH_FILE_DELETE_START,
    CREATOR_VIRTUAL_VH_FILE_DELETE_SUCCESS,
    CREATOR_VIRTUAL_VH_FILE_DELETE_FAILURE,
    CREATOR_VIRTUAL_VH_SAVE_START,
    CREATOR_VIRTUAL_VH_SAVE_SUCCESS,
    CREATOR_VIRTUAL_VH_SAVE_FAILURE,
    CREATOR_VIRTUAL_VH_DELETE_START,
    CREATOR_VIRTUAL_VH_DELETE_SUCCESS,
    CREATOR_VIRTUAL_VH_DELETE_FAILURE,
    CREATOR_VIRTUAL_VH_VIEW_START,
    CREATOR_VIRTUAL_VH_VIEW_SUCCESS,
    CREATOR_VIRTUAL_VH_VIEW_FAILURE,
    CREATOR_VIRTUAL_VH_STATUS_START,
    CREATOR_VIRTUAL_VH_STATUS_SUCCESS,
    CREATOR_VIRTUAL_VH_STATUS_FAILURE,
    SLOT_AVAILABLE_START,
    SLOT_AVAILABLE_SUCCESS,
    SLOT_AVAILABLE_FAILURE,
    START_VIRTUAL_EXPERIENCE_START,
    START_VIRTUAL_EXPERIENCE_SUCCESS,
    START_VIRTUAL_EXPERIENCE_FAILURE,
    END_VIRTUAL_EXPERIENCE_START,
    END_VIRTUAL_EXPERIENCE_SUCCESS,
    END_VIRTUAL_EXPERIENCE_FAILURE,
    VIRTUAL_EXPERIENCE_HOST_UPDATE_START,
    VIRTUAL_EXPERIENCE_HOST_UPDATE_FAILURE,
    VIRTUAL_EXPERIENCE_HOST_UPDATE_SUCCESS,

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
    },
    slotAvailable: {
        data: {
        },
        loading: true,
        error: false,
    },
    startVirtualExperience: {
        data: {},
        loading: true,
        error: false,
    },
    endVirtualExperience: {
        data: {},
        loading: true,
        error: false,
    },
    virtualExperienceHostUpdate: {
        data: {},
        loading: true,
        error: false,
    },
};

const CreatorVirualReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATOR_VIRTUAL_BOOKING_LIST_START:
            return {
                ...state,
                creatorVirtualBookingList: {
                    data: {},
                    loading: true,
                    error: false,
                },
            };

        case CREATOR_VIRTUAL_BOOKING_LIST_SUCCESS:
            return {
                ...state,
                creatorVirtualBookingList: {
                    data: action.data.data,
                    loading: false,
                    error: false,
                },
            };

        case CREATOR_VIRTUAL_BOOKING_LIST_FAILURE:
            return {
                ...state,
                creatorVirtualBookingList: {
                    data: {},
                    loading: false,
                    error: action.error,
                },
            };

        case CREATOR_VIRTUAL_BOOKING_VIEW_START:
            return {
                ...state,
                creatorVirtualBookingView: {
                    data: {},
                    loading: true,
                    error: false,
                },
            };

        case CREATOR_VIRTUAL_BOOKING_VIEW_SUCCESS:
            return {
                ...state,
                creatorVirtualBookingView: {
                    data: action.data.data,
                    loading: false,
                    error: false,
                },
            };

        case CREATOR_VIRTUAL_BOOKING_VIEW_FAILURE:
            return {
                ...state,
                creatorVirtualBookingView: {
                    data: action.data.data,
                    loading: false,
                    error: false,
                },
            };

        case CREATOR_VIRTUAL_BOOKING_REJECT_START:
            return {
                ...state,
                creatorVirtualBookingReject: {
                    data: action.data.data,
                    loading: false,
                    error: false,
                },
            };
        case CREATOR_VIRTUAL_BOOKING_REJECT_SUCCESS:
            return {
                ...state,
                creatorVirtualBookingReject: {
                    data: action.data.data,
                    loading: false,
                    error: false,
                },
            };

        case CREATOR_VIRTUAL_BOOKING_REJECT_FAILURE:
            return {
                ...state,
                creatorVirtualBookingReject: {
                    data: action.data.data,
                    loading: false,
                    error: false,
                },
            };

        case CREATOR_VIRTUAL_BOOKING_START_START:
            return {
                ...state,
                creatorVirtualBookingStart: {
                    data: {},
                    loading: false,
                    error: false,
                    buttonDisable: true,
                },
            };

        case CREATOR_VIRTUAL_BOOKING_START_SUCCESS:
            return {
                ...state,
                creatorVirtualBookingStart: {
                    data: action.data,
                    loading: false,
                    error: false,
                    buttonDisable: false,
                },
            };

        case CREATOR_VIRTUAL_BOOKING_START_FAILURE:
            return {
                ...state,
                creatorVirtualBookingStart: {
                    data: action.error,
                    loading: false,
                    error: true,
                    buttonDisable: false,
                },
            };

        case CREATOR_VIRTUAL_BOOKING_END_START:
            return {
                ...state,
                creatorVirtualBookingEnd: {
                    data: action.data.data,
                    loading: false,
                    error: false,
                },
            };

        case CREATOR_VIRTUAL_BOOKING_END_SUCCESS:
            return {
                ...state,
                creatorVirtualBookingEnd: {
                    data: action.data.data,
                    loading: false,
                    error: false,
                },
            };

        case CREATOR_VIRTUAL_BOOKING_END_FAILURE:
            return {
                ...state,
                creatorVirtualBookingEnd: {
                    data: action.data.data,
                    loading: false,
                    error: false,
                },
            };


        case CREATOR_VIRTUAL_VH_LIST_START:
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

        case CREATOR_VIRTUAL_VH_LIST_SUCCESS:
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

        case CREATOR_VIRTUAL_VH_LIST_FAILURE:
            return {
                ...state,
                userVirtualExperienceCreatedList: {
                    data: {},
                    loading: false,
                    error: action.error,
                }
            };
        case CREATOR_VIRTUAL_VH_FILE_SAVE_START:
            return {
                ...state,
                creatorVirtualExperienceFileSave: {
                    data: action.data,
                    buttonDisable: true,
                    loading: false,
                    error: action.error,
                }
            };

        case CREATOR_VIRTUAL_VH_FILE_SAVE_SUCCESS:
            return {
                ...state,
                creatorVirtualExperienceFileSave: {
                    data: action.data,
                    buttonDisable: false,
                    loading: false,
                    error: action.error,
                }
            };

        case CREATOR_VIRTUAL_VH_FILE_SAVE_FAILURE:
            return {
                ...state,
                creatorVirtualExperienceFileSave: {
                    data: action.data,
                    buttonDisable: false,
                    loading: false,
                    error: action.error,
                }
            };

        case CREATOR_VIRTUAL_VH_FILE_DELETE_START:
            return {
                ...state,
                creatorVirtualExperienceFileDelete: {
                    data: action.data,
                    loading: false,
                    error: action.error,
                }
            };

        case CREATOR_VIRTUAL_VH_FILE_DELETE_SUCCESS:
            return {
                ...state,
                creatorVirtualExperienceFileDelete: {
                    data: action.data,
                    loading: false,
                    error: action.error,
                }
            };
        case CREATOR_VIRTUAL_VH_FILE_DELETE_FAILURE:
            return {
                ...state,
                creatorVirtualExperienceFileDelete: {
                    data: action.data,
                    loading: false,
                    error: action.error,
                }
            };

        case CREATOR_VIRTUAL_VH_SAVE_START:
            return {
                ...state,
                creatorVirtualExperienceSave: {
                    data: {},
                    buttonDisable: true,
                    loading: true,
                    error: action.error,
                }
            };
        case CREATOR_VIRTUAL_VH_SAVE_SUCCESS:
            return {
                ...state,
                creatorVirtualExperienceSave: {
                    data: action.data,
                    buttonDisable: false,
                    loading: false,
                    error: action.error,
                }
            };

        case CREATOR_VIRTUAL_VH_SAVE_FAILURE:
            return {
                ...state,
                creatorVirtualExperienceSave: {
                    data: {},
                    buttonDisable: false,
                    loading: false,
                    error: action.error,
                }
            };

        case CREATOR_VIRTUAL_VH_DELETE_START:
            return {
                ...state,
                creatorVirtualExperienceDelete: {
                    data: action.data,
                    loading: false,
                    error: action.error,
                }
            };

        case CREATOR_VIRTUAL_VH_DELETE_SUCCESS:
            return {
                ...state,
                creatorVirtualExperienceDelete: {
                    data: action.data,
                    loading: false,
                    error: action.error,
                }
            };

        case CREATOR_VIRTUAL_VH_DELETE_FAILURE:
            return {
                ...state,
                creatorVirtualExperienceDelete: {
                    data: action.data,
                    loading: false,
                    error: action.error,
                }
            };

        case CREATOR_VIRTUAL_VH_VIEW_START:
            return {
                ...state,
                creatorVirtualExperienceView: {
                    data: {},
                    loading: true,
                    error: false,
                }
            };

        case CREATOR_VIRTUAL_VH_VIEW_SUCCESS:
            return {
                ...state,
                creatorVirtualExperienceView: {
                    data: action.data,
                    loading: false,
                    error: false,
                }
            };

        case CREATOR_VIRTUAL_VH_VIEW_FAILURE:
            return {
                ...state,
                creatorVirtualExperienceView: {
                    data: {},
                    loading: false,
                    error: action.error,
                }
            };

        case CREATOR_VIRTUAL_VH_STATUS_START:
            return {
                ...state,
                creatorVirtualExperienceStatus: {
                    data: action.data,
                    loading: false,
                    error: action.error,
                }
            };

        case CREATOR_VIRTUAL_VH_STATUS_SUCCESS:
            return {
                ...state,
                creatorVirtualExperienceStatus: {
                    data: action.data,
                    loading: false,
                    error: action.error,
                }
            };

        case CREATOR_VIRTUAL_VH_STATUS_FAILURE:
            return {
                ...state,
                creatorVirtualExperienceStatus: {
                    data: action.data,
                    loading: false,
                    error: action.error,
                }
            };

        case SLOT_AVAILABLE_START:
            return {
                ...state,
                slotAvailable: {
                    data: {},
                    loading: true,
                    error: action.error,
                }
            };

        case SLOT_AVAILABLE_SUCCESS:
            return {
                ...state,
                slotAvailable: {
                    data: action.data,
                    loading: false,
                    error: action.error,
                }
            };

        case SLOT_AVAILABLE_FAILURE:
            return {
                ...state,
                slotAvailable: {
                    data: {},
                    loading: false,
                    error: action.error,
                }
            };

        case START_VIRTUAL_EXPERIENCE_START:
            return {
                ...state,
                startVirtualExperience: {
                    data: {},
                    loading: true,
                    error: false,
                },
            };
        case START_VIRTUAL_EXPERIENCE_SUCCESS:
            return {
                ...state,
                startVirtualExperience: {
                    data: {
                        status: "SUCCESS"
                    },
                    loading: false,
                    error: false,
                },
            };
        case START_VIRTUAL_EXPERIENCE_FAILURE:
            return {
                ...state,
                startVirtualExperience: {
                    data: {},
                    loading: false,
                    error: action.error,
                },
        };

        case END_VIRTUAL_EXPERIENCE_START:
            return {
                ...state,
                endVirtualExperience: {
                    data: {},
                    loading: true,
                    error: false,
                },
            };
        case END_VIRTUAL_EXPERIENCE_SUCCESS:
            return {
                ...state,
                endVirtualExperience: {
                    data: {
                        status: "SUCCESS"
                    },
                    loading: false,
                    error: false,
                },
            };
        case END_VIRTUAL_EXPERIENCE_FAILURE:
            return {
                ...state,
                endVirtualExperience: {
                    data: {},
                    loading: false,
                    error: action.error,
                },
        };
        
        case VIRTUAL_EXPERIENCE_HOST_UPDATE_START:
            return {
                ...state,
                virtualExperienceHostUpdate: {
                    data: {},
                    loading: true,
                    error: false,
                },
            };
        case VIRTUAL_EXPERIENCE_HOST_UPDATE_SUCCESS:
            return {
                ...state,
                virtualExperienceHostUpdate: {
                    data: action.data,
                    loading: false,
                    error: false,
                },
            };
        case VIRTUAL_EXPERIENCE_HOST_UPDATE_FAILURE:
            return {
                ...state,
                virtualExperienceHostUpdate: {
                    data: {},
                    loading: false,
                    error: action.error,
                },
        };

        default:
            return state;
    }
};

export default CreatorVirualReducer;
