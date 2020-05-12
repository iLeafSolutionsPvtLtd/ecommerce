/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on February 20, 2020
 * CategorySaga - handles search history state
 */

import {
  deleteCartAPI,
  getCartProducts,
  deleteGuestCartAPI,
  updateGuestProductsAPI,
} from "../api/apiMethods";
import * as cartActions from "../actions/cartActions";
import { put, call, select } from "redux-saga/effects";
import * as loadingActions from "../actions/loadingActions";

// Our worker Saga that logins the user
export function* removeProductUserCart(action) {
  const { userToken } = yield select((state) => state.appReducer);

  yield put(loadingActions.enableLoader());
  try {
    const response = yield call(deleteCartAPI, action.productid, userToken);
    console.log(
      "++++++++  response from delete user cart ++++++++++ ",
      response
    );
    if (response) {
      const updatedArray = yield call(getCartProducts, userToken);

      console.log("++++++++ remove user updated array ++++++ ", updatedArray);
      yield put(cartActions.updateCartProducts(updatedArray));
      if (action.removeUserCartCallback) {
        action.removeUserCartCallback(true);
      }
    } else {
      if (action.removeUserCartCallback) {
        action.removeUserCartCallback(false);
      }
    }
    yield put(loadingActions.disableLoader({}));
  } catch (error) {
    console.log("API ERROR!!!!", error);
    yield put(loadingActions.disableLoader({}));
  }
}

export function* removeProductGuestCart(action) {
  const { guestToken, adminToken } = yield select((state) => state.appReducer);

  yield put(loadingActions.enableLoader());
  try {
    const response = yield call(
      deleteGuestCartAPI,
      guestToken,
      action.productid,
      adminToken
    );
    if (response) {
      const updatedArray = yield call(
        updateGuestProductsAPI,
        guestToken,
        adminToken
      );

      yield put(cartActions.updateGuestCartProducts(updatedArray));
      if (action.removeGuestCartCallback) {
        action.removeGuestCartCallback(true);
      }
    } else {
      if (action.removeGuestCartCallback) {
        action.removeGuestCartCallback(false);
      }
    }
    yield put(loadingActions.disableLoader({}));
  } catch (error) {
    console.log("API ERROR updateGuestCart.js!!!!", error);
    yield put(loadingActions.disableLoader({}));
  }
}
