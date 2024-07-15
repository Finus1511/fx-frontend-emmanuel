import {
  POST_YOUTUBE_LINK_START,
  POST_YOUTUBE_LINK_SUCCESS,
  POST_YOUTUBE_LINK_FAILURE,
} from "../actions/ActionConstant";

const initialState = {
  postYoutubeLink: {
      data: {},
      loading: true,
      error: false,
  },
};

const FolderReducer = (state = initialState, action) => {
  switch (action.type) {

      case POST_YOUTUBE_LINK_START:
          return {
              ...state,
              postYoutubeLink: {
                  data: {},
                  loading: true,
                  error: false,
              },
          };
      case POST_YOUTUBE_LINK_SUCCESS:
          return {
              ...state,
              postYoutubeLink: {
                  data: action.data,
                  loading: false,
                  error: false,
              },
          };
      case POST_YOUTUBE_LINK_FAILURE:
          return {
              ...state,
              postYoutubeLink: {
                  data: {},
                  loading: true,
                  error: action.error,
              },
          };

      default:
          return state;
  }
};

export default FolderReducer;
