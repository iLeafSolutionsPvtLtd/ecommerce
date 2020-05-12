/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on February 20, 2020
 * CategorySaga - handles search history state
 */

import {
  getCartProducts,
  updateGuestCartAPI,
  updateGuestProductsAPI,
  updateLoggedUserCartAPI,
} from "../api/apiMethods";
import * as cartActions from "../actions/cartActions";
import { put, call, select } from "redux-saga/effects";
import * as loadingActions from "../actions/loadingActions";

export function* updateLoggedinUserCart(action) {
  const { isNetworkAvailable, adminToken, userToken } = yield select(
    (state) => state.appReducer
  );
  yield put(loadingActions.enableLoader());
  try {
    const response = yield call(
      updateLoggedUserCartAPI,
      action.params,
      action.productid,
      userToken
    );
    console.log(
      "+++++++++++ response from logged in user cart +++++++",
      response
    );
    if (response && response.item_id) {
      const updatedArray = yield call(getCartProducts, userToken);
      yield put(cartActions.updateCartProducts(updatedArray));
      if (action.updateCallback) {
        action.updateCallback(true);
      }
    } else {
      if (action.updateCallback) {
        action.updateCallback(false);
      }
    }
    yield put(loadingActions.disableLoader({}));
  } catch (error) {
    console.log("API ERROR!!!!", error);
    yield put(loadingActions.disableLoader({}));
  }
}

export function* updateGuestCart(action) {
  const { isNetworkAvailable, guestToken, adminToken } = yield select(
    (state) => state.appReducer
  );
  const { guestCartArray, cartArray } = yield select(
    (state) => state.cartReducer
  );

  yield put(loadingActions.enableLoader());
  try {
    const response = yield call(
      updateGuestCartAPI,
      action.params,
      guestToken,
      action.productid,
      adminToken
    );
    console.log(
      " ====== response from updateGuestCart ========",
      response,
      response.item_id
    );
    if (response && response.item_id) {
      const updatedArray = yield call(
        updateGuestProductsAPI,
        guestToken,
        adminToken
      );
      console.log(" ====== response from updatedArray ========", updatedArray);
      yield put(cartActions.updateGuestCartProducts(updatedArray));
      if (action.updateGuestCartCallback) {
        action.updateGuestCartCallback(true);
      }
    } else {
      if (actions.updateGuestCartCallback) {
        action.updateGuestCartCallback(false);
      }
    }
    yield put(loadingActions.disableLoader({}));
  } catch (error) {
    console.log("API ERROR updateGuestCart.js!!!!", error);
    // yield put(addAddressAction.addAddressFailed());
    yield put(loadingActions.disableLoader({}));
  }
}
