import { call, select, put, takeLatest, all } from "redux-saga/effects";
import api from "../../Environment";
import {
  FETCH_POST_LIKED_START,
  SAVE_POST_LIKE_START,
} from "../actions/ActionConstant";
import { createNotification } from "react-redux-notify";
import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../../components/helper/NotificationMessage";
import {
  fetchPostLikedFailure,
  fetchPostLikedSuccess,
  savePostLikeFailure,
  savePostLikeSuccess,
} from "../actions/PostLikesAction";
import {
  checkLogoutStatus,
} from "../actions/ErrorAction";
import { homePostsSuccess } from "../actions/HomeAction";
import { fetchSinglePostSuccess, updatePostsSuccess } from "../actions/PostAction";
import { updateSingleUserPostsSuccess } from "../actions/OtherUserAction";

function* savePostLikesAPI(action) {
  try {
    // const inputData = yield select(
    //   (state) => state.postLike.saveLike.inputData
    // );
    const response = yield api.postMethod("post_likes_save", action.data);
    if (response.data.success) {
      yield put(savePostLikeSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      let homeData = yield select((state) => state.home.homePost.data);
      homeData = {
        ...homeData,
        posts: homeData.posts.map((post) => post.post_unique_id === response.data.data.post_unique_id ? response.data.data : post)
      }
      yield put(homePostsSuccess(homeData));
      let singlePostData = yield select((state) => state.post.singlePost.data);
      if(Object.keys(singlePostData).length>0){
        if(singlePostData.post.post_unique_id === response.data.data.post_unique_id) {
          yield put(fetchSinglePostSuccess({ post: response.data.data }));
        }
      }
      // New Profile Update Saga
      let userPosts = yield select((state) => state.post.posts.data);
        if (Object.keys(userPosts).length > 0) {
          userPosts = {
            ...userPosts,
            posts: userPosts.posts.map((post) => post.post_unique_id === response.data.data.post_unique_id ? response.data.data : post)
          }
          yield put(updatePostsSuccess(userPosts));
        }
      let otherUserPosts = yield select((state) => state.otherUser.userPosts.data);
        if (Object.keys(otherUserPosts).length > 0) {
          otherUserPosts = {
            ...otherUserPosts,
            posts: otherUserPosts.posts.map((post) => post.post_unique_id === response.data.data.post_unique_id ? response.data.data : post)
          }
          yield put(updateSingleUserPostsSuccess(otherUserPosts));
        }
    } else {
      yield put(savePostLikeFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(savePostLikeFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* fetchPostLikesAPI() {
  try {
    const inputData = yield select(
      (state) => state.postLike.saveLike.inputData
    );
    const response = yield api.postMethod("post_likes", inputData);
    if (response.data.success) {
      yield put(fetchPostLikedSuccess(response.data.data));
    } else {
      yield put(fetchPostLikedFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchPostLikedFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

export default function* pageSaga() {
  yield all([yield takeLatest(SAVE_POST_LIKE_START, savePostLikesAPI)]);
  yield all([yield takeLatest(FETCH_POST_LIKED_START, fetchPostLikesAPI)]);
}
