import {
  FAVORITE_LIST_START,
  MORE_FAVORITE_LIST_START,
  FAVORITE_LIST_SUCCESS,
  FAVORITE_LIST_FAILURE,
  ADD_FAVORITE_START,
  ADD_FAVORITE_SUCCESS,
  ADD_FAVORITE_FAILURE,
  DELETE_FAVORITE_START,
  DELETE_FAVORITE_SUCCESS,
  DELETE_FAVORITE_FAILURE,
} from "../actions/ActionConstant";

const initialState = {
  favoriteList: {
    data: {},
    loading: true,
    error: false,
  },
  addFavorite: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
  deleteFavorite: {
    data: {},
    loading: true,
    error: false,
    inputData: {},
    loadingButtonContent: null,
    buttonDisable: false,
  },
};

const FavoriteReducer = (state = initialState, action) => {
  switch (action.type) {
    case FAVORITE_LIST_START:
      return {
        ...state,
        favoriteList: {
          data: {},
          loading: true,
          error: false,
        },
      };
    case FAVORITE_LIST_SUCCESS:
      return {
        ...state,
        favoriteList: {
          data: action.data,
          loading: false,
          error: false,
        },
      };
    case FAVORITE_LIST_FAILURE:
      return {
        ...state,
        favoriteList: {
          data: {},
          loading: true,
          error: action.error,
        },
      };
    case MORE_FAVORITE_LIST_START:
      return state;

    case ADD_FAVORITE_START:
      return {
        ...state,
        addFavorite: {
          data: {},
          loading: true,
          error: false,
          inputData: action.data,
          loadingButtonContent: "Loading... Please wait.",
          buttonDisable: true,
        },
      };
    case ADD_FAVORITE_SUCCESS:
      return {
        ...state,
        addFavorite: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case ADD_FAVORITE_FAILURE:
      return {
        ...state,
        addFavorite: {
          data: {},
          loading: true,
          error: action.error,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case DELETE_FAVORITE_START:
      return {
        ...state,
        deleteFavorite: {
          data: {},
          loading: true,
          error: false,
          inputData: action.data,
          loadingButtonContent: "Loading...",
          buttonDisable: true,
        },
      };
    case DELETE_FAVORITE_SUCCESS:
      return {
        ...state,
        deleteFavorite: {
          data: action.data,
          loading: false,
          error: false,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };
    case DELETE_FAVORITE_FAILURE:
      return {
        ...state,
        deleteFavorite: {
          data: {},
          loading: true,
          error: action.data,
          inputData: {},
          loadingButtonContent: null,
          buttonDisable: false,
        },
      };

    default:
      return state;
  }
};

export default FavoriteReducer;
