import {
  FETCH_USER_DETAILS_START,
  FETCH_USER_DETAILS_SUCCESS,
  FETCH_USER_DETAILS_FAILURE,
  EDIT_USER_DETAILS,
  UPDATE_USER_DETAILS_START,
  UPDATE_USER_SUBSCRIPTION_DETAILS_START,
  UPDATE_USER_DETAILS_SUCCESS,
  UPDATE_USER_DETAILS_FAILURE,
  CHANGE_PASSWORD_START,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAILURE,
  EDIT_CHANGE_PASSWORD,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  GET_LOGIN_DETAILS,
  GET_REGISTER_DETAILS,
  FORGOT_PASSWORD_START,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  DELETE_ACCOUNT_START,
  DELETE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_FAILURE,
  REGISTER_VERIFY_START,
  REGISTER_VERIFY_SUCCESS,
  REGISTER_VERIFY_FAILURE,
  REGISTER_VERIFY_RESEND_START,
  REGISTER_VERIFY_RESEND_SUCCESS,
  REGISTER_VERIFY_RESEND_FAILURE,
  NOTIFICATION_STATUS_UPDATE_START,
  NOTIFICATION_STATUS_UPDATE_SUCCESS,
  NOTIFICATION_STATUS_UPDATE_FAILURE,
  GET_FORGOT_PASSWORD_DETAILS,
  FETCH_PAYMENTS_START,
  FETCH_PAYMENTS_SUCCESS,
  FETCH_PAYMENTS_FAILURE,
  SAVE_BLOCK_USER_START,
  SAVE_BLOCK_USER_SUCCESS,
  SAVE_BLOCK_USER_FAILURE,
  FETCH_BLOCK_USERS_START,
  FETCH_BLOCK_USERS_SUCCESS,
  FETCH_BLOCK_USERS_FAILURE,
  USER_VERIFY_BADGE_STATUS_START,
  USER_VERIFY_BADGE_STATUS_SUCCESS,
  USER_VERIFY_BADGE_STATUS_FAILURE,
  RESET_PASSWORD_START,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  USERNAME_VALIDATION_START,
  USERNAME_VALIDATION_SUCCESS,
  USERNAME_VALIDATION_FAILURE,
  REFERRAL_VALIDATION_START,
  REFERRAL_VALIDATION_SUCCESS,
  REFERRAL_VALIDATION_FAILURE,
  FETCH_CONTENT_CREATOR_DASHBOARD_START,
  FETCH_CONTENT_CREATOR_DASHBOARD_SUCCESS,
  FETCH_CONTENT_CREATOR_DASHBOARD_FAILURE,
  TWO_STEP_AUTH_UPDATE_START,
  TWO_STEP_AUTH_UPDATE_SUCCESS,
  TWO_STEP_AUTH_UPDATE_FAILURE,
  TWO_STEP_AUTHENTICATION_LOGIN_START,
  TWO_STEP_AUTHENTICATION_LOGIN_SUCCESS,
  TWO_STEP_AUTHENTICATION_LOGIN_FAILURE,
  TWO_STEP_AUTHENTICATION_CODE_RESEND_START,
  TWO_STEP_AUTHENTICATION_CODE_RESEND_SUCCESS,
  TWO_STEP_AUTHENTICATION_CODE_RESEND_FAILURE,
  SAVE_FEATURE_STORY_START,
  SAVE_FEATURE_STORY_SUCCESS,
  SAVE_FEATURE_STORY_FAILURE,
  DELETE_FEATURE_STORY_START,
  DELETE_FEATURE_STORY_SUCCESS,
  DELETE_FEATURE_STORY_FAILURE,
  HIDE_FOLLOWERS_START,
  HIDE_FOLLOWERS_SUCCESS,
  HIDE_FOLLOWERS_FAILURE,
} from "./ActionConstant";

// Get user details actions.

export function fetchUserDetailsStart(data) {
  return {
    type: FETCH_USER_DETAILS_START,
    data,
  };
}

export function fetchUserDetailsSuccess(data) {
  return {
    type: FETCH_USER_DETAILS_SUCCESS,
    data,
  };
}

export function fetchUserDetailsFailure(error) {
  return {
    type: FETCH_USER_DETAILS_FAILURE,
    error,
  };
}

// Edit user details action.

export function editUserDetails(name, value) {
  return {
    type: EDIT_USER_DETAILS,
    name,
    value,
  };
}

// Update user detatils actions

export function updateUserDetailsStart(data) {
  return {
    type: UPDATE_USER_DETAILS_START,
    data,
  };
}

export function updateUserSubscriptionStart(data) {
  return {
    type: UPDATE_USER_SUBSCRIPTION_DETAILS_START,
    data,
  };
}

export function updateUserDetailsSuccess(data) {
  return {
    type: UPDATE_USER_DETAILS_SUCCESS,
    data,
  };
}

export function updateUserDetailsFailure(error) {
  return {
    type: UPDATE_USER_DETAILS_FAILURE,
    error,
  };
}

// change password edit option

export function editChangePassword(name, value) {
  return {
    type: EDIT_CHANGE_PASSWORD,
    name,
    value,
  };
}

// Change password actions.

export function changePasswordStart(data) {
  return {
    type: CHANGE_PASSWORD_START,
    data,
  };
}

export function changePasswordSuccess(data) {
  return {
    type: CHANGE_PASSWORD_SUCCESS,
    data,
  };
}

export function changePasswordFailure(error) {
  return {
    type: CHANGE_PASSWORD_FAILURE,
    error,
  };
}

// Get login Input

export function getLoginInputData(name, value) {
  return {
    type: GET_LOGIN_DETAILS,
    name,
    value,
  };
}

// User login actions.

export function userLoginStart(data) {
  return {
    type: LOGIN_START,
    data,
  };
}

export function userLoginSuccess(data) {
  return {
    type: LOGIN_SUCCESS,
    data,
  };
}

export function userLoginFailure(error) {
  return {
    type: LOGIN_FAILURE,
    error,
  };
}

// Get register Input

export function getRegisterInputData(name, value) {
  return {
    type: GET_REGISTER_DETAILS,
    name,
    value,
  };
}

// User Register actions.

export function userRegisterStart(data) {
  return {
    type: REGISTER_START,
    data,
  };
}

export function userRegisterSuccess(data) {
  return {
    type: REGISTER_SUCCESS,
    data,
  };
}

export function userRegisterFailure(error) {
  return {
    type: REGISTER_FAILURE,
    error,
  };
}

// Get forgot password Input

export function getForgotPasswordInputData(name, value) {
  return {
    type: GET_FORGOT_PASSWORD_DETAILS,
    name,
    value,
  };
}

// User FORGOT_PASSWORD actions.

export function forgotPasswordStart(data) {
  return {
    type: FORGOT_PASSWORD_START,
    data,
  };
}

export function forgotPasswordSuccess(data) {
  return {
    type: FORGOT_PASSWORD_SUCCESS,
    data,
  };
}

export function forgotPasswordFailure(error) {
  return {
    type: FORGOT_PASSWORD_FAILURE,
    error,
  };
}

// User Delete Account actions.

export function deleteAccountStart(data) {
  return {
    type: DELETE_ACCOUNT_START,
    data,
  };
}

export function deleteAccountSuccess(data) {
  return {
    type: DELETE_ACCOUNT_SUCCESS,
    data,
  };
}

export function deleteAccountFailure(error) {
  return {
    type: DELETE_ACCOUNT_FAILURE,
    error,
  };
}

// User Delete Account actions.

export function registerVerifyStart(data) {
  return {
    type: REGISTER_VERIFY_START,
    data,
  };
}

export function registerVerifySuccess(data) {
  return {
    type: REGISTER_VERIFY_SUCCESS,
    data,
  };
}

export function registerVerifyFailure(error) {
  return {
    type: REGISTER_VERIFY_FAILURE,
    error,
  };
}

export function registerVerifyResendStart(data) {
  return {
    type: REGISTER_VERIFY_RESEND_START,
    data,
  };
}

export function registerVerifyResendSuccess(data) {
  return {
    type: REGISTER_VERIFY_RESEND_SUCCESS,
    data,
  };
}

export function registerVerifyResendFailure(error) {
  return {
    type: REGISTER_VERIFY_RESEND_FAILURE,
    error,
  };
}

export function notificationStatusUpdateStart(data) {
  return {
    type: NOTIFICATION_STATUS_UPDATE_START,
    data,
  };
}

export function notificationStatusUpdateSuccess(data) {
  return {
    type: NOTIFICATION_STATUS_UPDATE_SUCCESS,
    data,
  };
}

export function notificationStatusUpdateFailure(error) {
  return {
    type: NOTIFICATION_STATUS_UPDATE_FAILURE,
    error,
  };
}

// Get Payments actions.

export function fetchPaymentsStart(data) {
  return {
    type: FETCH_PAYMENTS_START,
    data,
  };
}

export function fetchPaymentsSuccess(data) {
  return {
    type: FETCH_PAYMENTS_SUCCESS,
    data,
  };
}

export function fetchPaymentsFailure(error) {
  return {
    type: FETCH_PAYMENTS_FAILURE,
    error,
  };
}

export function saveBlockUserStart(data) {
  return {
    type: SAVE_BLOCK_USER_START,
    data,
  };
}

export function saveBlockUserSuccess(data) {
  return {
    type: SAVE_BLOCK_USER_SUCCESS,
    data,
  };
}

export function saveBlockUserFailure(error) {
  return {
    type: SAVE_BLOCK_USER_FAILURE,
    error,
  };
}

export function fetchBlockUsersStart(data) {
  return {
    type: FETCH_BLOCK_USERS_START,
    data,
  };
}

export function fetchBlockUsersSuccess(data) {
  return {
    type: FETCH_BLOCK_USERS_SUCCESS,
    data,
  };
}

export function fetchBlockUsersFailure(error) {
  return {
    type: FETCH_BLOCK_USERS_FAILURE,
    error,
  };
}

export function updateVerifyBadgeStatusStart(data) {
  return {
    type: USER_VERIFY_BADGE_STATUS_START,
    data,
  };
}

export function updateVerifyBadgeStatusSuccess(data) {
  return {
    type: USER_VERIFY_BADGE_STATUS_SUCCESS,
    data,
  };
}

export function updateVerifyBadgeStatusFailure(error) {
  return {
    type: USER_VERIFY_BADGE_STATUS_FAILURE,
    error,
  };
}

// User RESET_PASWORD actions.

export function resetPasswordStart(data) {
  return {
    type: RESET_PASSWORD_START,
    data,
  };
}

export function resetPasswordSuccess(data) {
  return {
    type: RESET_PASSWORD_SUCCESS,
    data,
  };
}

export function resetPasswordFailure(error) {
  return {
    type: RESET_PASSWORD_FAILURE,
    error,
  };
}

export function usernameValidationStart(data) {
  return {
    type: USERNAME_VALIDATION_START,
    data,
  };
}

export function usernameValidationSuccess(data) {
  return {
    type: USERNAME_VALIDATION_SUCCESS,
    data,
  };
}

export function usernameValidationFailure(error) {
  return {
    type: USERNAME_VALIDATION_FAILURE,
    error,
  };
}

export function referralValidationStart(data) {
  return {
    type: REFERRAL_VALIDATION_START,
    data,
  };
}

export function referralValidationSuccess(data) {
  return {
    type: REFERRAL_VALIDATION_SUCCESS,
    data,
  };
}

export function referralValidationFailure(error) {
  return {
    type: REFERRAL_VALIDATION_FAILURE,
    error,
  };
}

export function fetchContentCreatorDashboardStart(data) {
  return {
    type: FETCH_CONTENT_CREATOR_DASHBOARD_START,
    data,
  };
}

export function fetchContentCreatorDashboardSuccess(data) {
  return {
    type: FETCH_CONTENT_CREATOR_DASHBOARD_SUCCESS,
    data,
  };
}

export function fetchContentCreatorDashboardFailure(error) {
  return {
    type: FETCH_CONTENT_CREATOR_DASHBOARD_FAILURE,
    error,
  };
}

export function twoStepAuthUpdateStart(data) {
  return {
    type: TWO_STEP_AUTH_UPDATE_START,
    data,
  };
}

export function twoStepAuthUpdateSuccess(data) {
  return {
    type: TWO_STEP_AUTH_UPDATE_SUCCESS,
    data,
  };
}

export function twoStepAuthUpdateFAilure(error) {
  return {
    type: TWO_STEP_AUTH_UPDATE_FAILURE,
    error,
  };
}

export function twoStepAuthenticationLoginStart(data) {
  return {
    type: TWO_STEP_AUTHENTICATION_LOGIN_START,
    data,
  };
}

export function twoStepAuthenticationLoginSuccess(data) {
  return {
    type: TWO_STEP_AUTHENTICATION_LOGIN_SUCCESS,
    data,
  };
}

export function twoStepAuthenticationLoginFailure(error) {
  return {
    type: TWO_STEP_AUTHENTICATION_LOGIN_FAILURE,
    error,
  };
}

export function twoStepAuthenticationCodeResendStart(data) {
  return {
    type: TWO_STEP_AUTHENTICATION_CODE_RESEND_START,
    data,
  };
}

export function twoStepAuthenticationCodeResendSuccess(data) {
  return {
    type: TWO_STEP_AUTHENTICATION_CODE_RESEND_SUCCESS,
    data,
  };
}

export function twoStepAuthenticationCodeResendFailure(error) {
  return {
    type: TWO_STEP_AUTHENTICATION_CODE_RESEND_FAILURE,
    error,
  };
}

export function saveFeatureStoryStart(data) {
  return {
    type: SAVE_FEATURE_STORY_START,
    data,
  };
}

export function saveFeatureStorySuccess(data) {
  return {
    type: SAVE_FEATURE_STORY_SUCCESS,
    data,
  };
}

export function saveFeatureStoryFailure(error) {
  return {
    type: SAVE_FEATURE_STORY_FAILURE,
    error,
  };
}

export function deleteFeatureStoryStart(data) {
  return {
    type: DELETE_FEATURE_STORY_START,
    data,
  };
}

export function deleteFeatureStorySuccess(data) {
  return {
    type: DELETE_FEATURE_STORY_SUCCESS,
    data,
  };
}

export function deleteFeatureStoryFailure(error) {
  return {
    type: DELETE_FEATURE_STORY_FAILURE,
    error,
  };
}

export function hideFollowersStart(data) {
  return {
    type: HIDE_FOLLOWERS_START,
    data,
  };
}

export function hideFollowersSuccess(data) {
  return {
    type: HIDE_FOLLOWERS_SUCCESS,
    data,
  };
}

export function hideFollowersFailure(error) {
  return {
    type: HIDE_FOLLOWERS_FAILURE,
    error,
  };
}

