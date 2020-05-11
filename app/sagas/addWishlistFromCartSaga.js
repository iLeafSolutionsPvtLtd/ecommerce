/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on February 20, 2020
 * AddWishListFromCart - handles add wish list from cart saga
 */

import { showSingleAlert } from "../config/common";
import { put, call, select } from "redux-saga/effects";
import { translate } from "../config/languageSwitching";
import * as cartActions from "../actions/cartActions";
import * as loginActions from "../actions/loginActions";
import * as loadingActions from "../actions/loadingActions";
import { getWishlist, addWishlistItem } from "../api/apiMethods";

export function* addWishlistFromCartSaga(action) {
  const { isNetworkAvailable, userToken } = yield select(
    (state) => state.appReducer
  );
  if (!isNetworkAvailable) {
    showSingleAlert(translate("No internet connection"));
    return;
  }
  yield put(loadingActions.enableLoader({}));
  try {
    const response = yield call(addWishlistItem, action.entityId, userToken);
    console.log("API RESPONSE OF ADD ITEM TO WISH LIST ", response);
    if (response) {
      if (response.message) {
        showSingleAlert(response.message);
        yield put(loadingActions.disableLoader({}));
        if (action.addProductToWishListCallback) {
          action.addProductToWishListCallback(false);
        }
      } else {
        const wishListResponse = yield call(getWishlist, userToken);
        if (wishListResponse && wishListResponse.message) {
          console.log(
            "WISHLIST API RESPONSE ERROR:::",
            wishListResponse.message
          );
          yield put(loadingActions.disableLoader({}));
        } else {
          console.log("WISHLIST API RESPONSE:::", wishListResponse);
          yield put(loginActions.updateWishList(wishListResponse));
          yield put(cartActions.removeUserCart(action.productId));
          yield put(loadingActions.disableLoader({}));

          if (action.addProductToWishListCallback) {
            action.addProductToWishListCallback(true);
          }
        }
      }
    }
  } catch (error) {
    console.log("ADD ITEM API ERROR!!!!", error);
    yield put(loadingActions.disableLoader({}));
  }
}
