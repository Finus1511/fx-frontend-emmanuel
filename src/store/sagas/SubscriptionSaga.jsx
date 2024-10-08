import React, { Component } from "react";
import { call, select, put, takeLatest, all } from "redux-saga/effects";
import {
  fetchSubscriptionSuccess,
  fetchSubscriptionFailure,
  fetchMySubscriptionSuccess,
  fetchMySubscriptionFailure,
  fetchSingleSubscriptionSuccess,
  fetchSingleSubscriptionFailure,
  subscriptionSaveSuccess,
  subscriptionSaveFailure,
  subscriptionDeleteSuccess,
  subscriptionDeleteFailure,
  subscriptionAutoRenewalSuccess,
  subscriptionAutoRenewalFailure,
  subscriptionPaymentStripeFailure,
  subscriptionPaymentStripeSuccess,
  subscriptionPaymentWalletSuccess,
  subscriptionPaymentWalletFailure,
  subscriptionPaymentPaypalSuccess,
  subscriptionPaymentPaypalFailure,
  subscriptionPaymentCCBillSuccess,
  subscriptionPaymentCCBillFailure,
  subscriptionPaymentCoinPaymentSuccess,
  subscriptionPaymentCoinPaymentFailure,
} from "../actions/SubscriptionAction";

import api from "../../Environment";
import {
  FETCH_SUBSCRIPTION_START,
  FETCH_MY_SUBSCRIPTION_START,
  FETCH_SINGLE_SUBSCRIPTION_START,
  SUBSCRIPTION_SAVE_START,
  SUBSCRIPTION_DELETE_START,
  SUBSCRIPTION_PAYMENT_STRIPE_START,
  SUBSCRIPTION_AUTO_RENEWAL_START,
  SUBSCRIPTION_PAYMENT_WALLET_START,
  SUBSCRIPTION_PAYMENT_PAYPAL_START,
  SUBSCRIPTION_PAYMENT_CCBILL_START,
  SUBSCRIPTION_PAYMENT_COINPAYMENT_START,
} from "../actions/ActionConstant";

import { createNotification } from "react-redux-notify";

import {
  getSuccessNotificationMessage,
  getErrorNotificationMessage,
} from "../../components/helper/NotificationMessage";

import {
  checkLogoutStatus,
} from "../actions/ErrorAction";
import { updateUserDetailsSuccess } from "../actions/UserAction";

function* getSubscriptionAPI(action) {
  try {
    const response = yield api.postMethod("subscriptions_index", action.data);
    
    if (response.data.success) {
      yield put(fetchSubscriptionSuccess(response.data.data));
    } else {
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchSubscriptionFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* getMySubscriptionAPI() {
  try {
    const response = yield api.postMethod("subscriptions_history");
    yield put(fetchMySubscriptionSuccess(response.data.data));
    if (response.data.success) {
      // Do nothing
    } else {
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchMySubscriptionFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* getSingleSubscriptionAPI(action) {
  try {

    const response = yield api.postMethod("subscriptions_view",action.data);

    if (response.data.success) {
      yield put(fetchSingleSubscriptionSuccess(response.data.data));
    } else {
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(fetchSingleSubscriptionFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* subscriptionSaveAPI(action) {
  try {
    let profile = yield select((state) => state.users.profile);
    const response = yield api.postMethod("subscriptions_store",action.data);

    if (response.data.success) {
      yield put(subscriptionSaveSuccess(response.data.data));
      localStorage.setItem('is_content_creator', 2)
      yield put(updateUserDetailsSuccess({
        ...profile,
        data: {
          ...profile.data,
          user_account_type: 1,
          is_content_creator: 2,
          content_creator_step: 5,
        }
      }));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
    } else {
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(subscriptionSaveFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* subscriptionDeleteAPI(action) {
  try {
    let subscriptionList = yield select((state) => state.subscriptions.subscription.data);
    const response = yield api.postMethod("subscriptions_delete",action.data);

    if (response.data.success) {
      yield put(subscriptionDeleteSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      if (Object.keys(subscriptionList).length > 0) {
        yield put(fetchSubscriptionSuccess({
          subscriptions: subscriptionList.subscriptions.filter(subscription =>
            subscription.subscription_id !== action.data.subscription_id
          ),
          total_subscriptions: subscriptionList.total_subscriptions - 1
        }));
      }
    } else {
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(subscriptionDeleteFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* subscriptionPaymentStripeAPI() {
  try {
    const subscriptioDetails = yield select(
      (state) => state.subscriptions.subPayStripe.inputData
    );
    const response = yield api.postMethod(
      "user_subscriptions_payment_by_stripe",
      subscriptioDetails
    );
    if (response.data.success) {
      yield put(subscriptionPaymentStripeSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      localStorage.setItem(
        "total_followers",
        JSON.stringify(response.data.data.total_followers)
      );
      localStorage.setItem(
        "total_followings",
        JSON.stringify(response.data.data.total_followings)
      );
      window.location.assign(`${subscriptioDetails.user_unique_id}`);
    } else {
      yield put(subscriptionPaymentStripeFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      // yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(subscriptionPaymentStripeFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* subscriptionPaymentPaypalAPI() {
  try {
    const subscriptioDetails = yield select(
      (state) => state.subscriptions.subPayPaypal.inputData
    );
    const response = yield api.postMethod(
      "user_subscriptions_payment_by_paypal",
      subscriptioDetails
    );
    if (response.data.success) {
      yield put(subscriptionPaymentPaypalSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      localStorage.setItem(
        "total_followers",
        JSON.stringify(response.data.data.total_followers)
      );
      localStorage.setItem(
        "total_followings",
        JSON.stringify(response.data.data.total_followings)
      );
      window.location.assign(`${subscriptioDetails.user_unique_id}`);
    } else {
      yield put(subscriptionPaymentPaypalFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(subscriptionPaymentPaypalFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* subscriptionPaymentWalletAPI() {
  try {
    const subscriptioDetails = yield select(
      (state) => state.subscriptions.subPayWallet.inputData
    );
    const response = yield api.postMethod(
      "subscriptions_payment_by_wallet",
      subscriptioDetails
    );

    if (response.data.success) {
      yield put(subscriptionPaymentWalletSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      localStorage.setItem(
        "total_followers",
        JSON.stringify(response.data.data.total_followers)
      );
      localStorage.setItem(
        "total_followings",
        JSON.stringify(response.data.data.total_followings)
      );
      window.location.assign(`${subscriptioDetails.user_unique_id}`);
    } else {
      yield put(subscriptionPaymentWalletFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(subscriptionPaymentWalletFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* subscriptionAutoRenewalAPI() {
  try {
    const subscriptioDetails = yield select(
      (state) => state.subscriptions.subscriptionRenew.inputData
    );
    const response = yield api.postMethod(
      "subscriptions_autorenewal_status",
      subscriptioDetails
    );
    yield put(subscriptionAutoRenewalSuccess(response.data.data));
    if (response.data.success) {
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      yield put(subscriptionAutoRenewalFailure(response.data.error));
    } else {
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(subscriptionAutoRenewalFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* subscriptionPaymentCCBillAPI() {
  try {
    const subscriptioDetails = yield select(
      (state) => state.subscriptions.subPayCCBill.inputData
    );
    const response = yield api.postMethod(
      "user_subscriptions_payment_by_ccbill",
      subscriptioDetails
    );
    if (response.data.success) {
      yield put(subscriptionPaymentCCBillSuccess(response.data.data));
      window.location.assign(`${response.data.data.redirect_web_url}`);
    } else {
      yield put(subscriptionPaymentCCBillFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(subscriptionPaymentCCBillFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

function* subscriptionPaymentCoinPaymentAPI() {
  try {
    const subscriptioDetails = yield select(
      (state) => state.subscriptions.subPayCoinPayment.inputData
    );
    const response = yield api.postMethod(
      "user_subscriptions_payment_by_coinpayment",
      subscriptioDetails
    );
    if (response.data.success) {
      yield put(subscriptionPaymentCoinPaymentSuccess(response.data.data));
      const notificationMessage = getSuccessNotificationMessage(
        response.data.message
      );
      yield put(createNotification(notificationMessage));
      setTimeout(() => {
        window.location.assign(`${response.data.data.redirect_web_url}`);
      }, 3000);
    } else {
      yield put(subscriptionPaymentCoinPaymentFailure(response.data.error));
      const notificationMessage = getErrorNotificationMessage(
        response.data.error
      );
      yield put(checkLogoutStatus(response.data));
      yield put(createNotification(notificationMessage));
    }
  } catch (error) {
    yield put(subscriptionPaymentCoinPaymentFailure(error));
    const notificationMessage = getErrorNotificationMessage(error.message);
    yield put(createNotification(notificationMessage));
  }
}

export default function* pageSaga() {
  yield all([yield takeLatest(FETCH_SUBSCRIPTION_START, getSubscriptionAPI)]);
  yield all([
    yield takeLatest(FETCH_MY_SUBSCRIPTION_START, getMySubscriptionAPI),
  ]);
  yield all([
    yield takeLatest(FETCH_SINGLE_SUBSCRIPTION_START, getSingleSubscriptionAPI),
  ]);
  yield all([yield takeLatest(SUBSCRIPTION_SAVE_START, subscriptionSaveAPI)]);
  yield all([yield takeLatest(SUBSCRIPTION_DELETE_START, subscriptionDeleteAPI)]);
  yield all([
    yield takeLatest(
      SUBSCRIPTION_PAYMENT_STRIPE_START,
      subscriptionPaymentStripeAPI
    ),
  ]);
  yield all([
    yield takeLatest(
      SUBSCRIPTION_PAYMENT_WALLET_START,
      subscriptionPaymentWalletAPI
    ),
  ]);
  yield all([
    yield takeLatest(
      SUBSCRIPTION_AUTO_RENEWAL_START,
      subscriptionAutoRenewalAPI
    ),
  ]);
  yield all([
    yield takeLatest(
      SUBSCRIPTION_PAYMENT_PAYPAL_START,
      subscriptionPaymentPaypalAPI
    ),
  ]);
  yield all([
    yield takeLatest(
      SUBSCRIPTION_PAYMENT_CCBILL_START,
      subscriptionPaymentCCBillAPI
    ),
  ]);
  yield all([
    yield takeLatest(
      SUBSCRIPTION_PAYMENT_COINPAYMENT_START,
      subscriptionPaymentCoinPaymentAPI
    ),
  ]);
}
