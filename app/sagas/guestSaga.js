/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on March 11, 2020
 * GuestSaga - handles guest saga methods
 */

import {
  guestAddToCartAPI,
  createGuestCartAPI,
  getGuestquoteIdAPI,
  updateGuestProductsAPI,
} from "../api/apiMethods";
import { showSingleAlert } from "../config/common";
import * as cartActions from "../actions/cartActions";
import { put, call, select } from "redux-saga/effects";
import { translate } from "../config/languageSwitching";
import * as guestActions from "../actions/guestActions";
import * as loadingActions from "../actions/loadingActions";

export function* createGuestCartSaga(action) {
  const { isNetworkAvailable, storeCode, adminToken } = yield select(
    (state) => state.appReducer
  );

  if (!isNetworkAvailable) {
    showSingleAlert(translate("No internet connection"));
    return;
  }

  yield put(loadingActions.enableLoader());
  try {
    const response = yield call(createGuestCartAPI, storeCode, adminToken);

    console.log("CREATE GUEST CART RESPONSE", response);
    if (response && response.length > 0) {
      const getGuestquoteResponse = yield call(
        getGuestquoteIdAPI,
        response,
        storeCode,
        adminToken
      );

      console.log("GUEST QUOTE GET RESPONSE", getGuestquoteResponse);

      if (getGuestquoteResponse && getGuestquoteResponse.id) {
        if (action.createGuestCartCallback) {
          action.createGuestCartCallback(true);
        }
        yield put(loadingActions.disableLoader({}));
        yield put(
          guestActions.onCreateGuestCart(response, getGuestquoteResponse.id)
        );
      } else {
        if (action.createGuestCartCallback)
          action.createGuestCartCallback(false);
        showSingleAlert(translate("API_Failed"));
        yield put(loadingActions.disableLoader({}));
      }
    } else {
      if (action.createGuestCartCallback) action.createGuestCartCallback(false);
      showSingleAlert(translate("API_Failed"));
      yield put(loadingActions.disableLoader({}));
    }
  } catch (error) {
    console.log("API ERROR!!!!", error);
    yield put(loadingActions.disableLoader({}));
    showSingleAlert(translate("API_Failed"));
  }
}

export function* guestAddToCartSaga(action) {
  const {
    isNetworkAvailable,
    storeCode,
    adminToken,
    quoteId,
    guestToken,
  } = yield select((state) => state.appReducer);

  if (!isNetworkAvailable) {
    showSingleAlert(translate("No internet connection"));
    return;
  }

  yield put(loadingActions.enableLoader());
  try {
    const response = yield call(
      guestAddToCartAPI,
      action.inputParams,
      quoteId,
      storeCode,
      adminToken
    );

    console.log("GUEST ADD TO CART RESPONSE", response);
    if (response && response.item_id) {
      const { guestCartArray } = yield select((state) => state.cartReducer);
      // yield put(guestActions.updateCartList([...guestCartArray, ...[response]]));
      const updatedArray = yield call(
        updateGuestProductsAPI,
        guestToken,
        adminToken
      );
      console.log(
        " ++++++ getCartArray from add to cart saga +++ ",
        updatedArray
      );
      yield put(cartActions.updateGuestCartProducts(updatedArray));
      yield put(loadingActions.disableLoader({}));
      if (action.guestAddToCartCallback) action.guestAddToCartCallback(true);
    } else {
      yield put(loadingActions.disableLoader({}));
      if (action.guestAddToCartCallback) action.guestAddToCartCallback(false);
      showSingleAlert(translate("API_Failed"));
    }
  } catch (error) {
    console.log("API ERROR!!!!", error);
    yield put(loadingActions.disableLoader({}));
    showSingleAlert(translate("API_Failed"));
  }
}
