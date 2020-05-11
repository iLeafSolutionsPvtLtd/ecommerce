/**
 * Created by Arun for iLeaf Solutions Pvt.Ltd
 * on March 15, 2020
 * CartSaga - handles search history state
 */

import {
  getCartID,
  getCartProducts,
  addProductToCart,
  getGuestCartTotalCostAPI,
  getLoggedUserCartTotalCostAPI,
} from "../api/apiMethods";
import { showSingleAlert } from "../config/common";
import * as cartActions from "../actions/cartActions";
import { put, call, select } from "redux-saga/effects";
import * as loginActions from "../actions/loginActions";
import * as loadingActions from "../actions/loadingActions";

export function* getCartSaga(action) {
  const { isNetworkAvailable, userToken } = yield select(
    (state) => state.appReducer
  );

  if (!isNetworkAvailable) {
    showSingleAlert(translate("No internet connection"));
    return;
  }

  yield put(loadingActions.enableLoader());
  try {
    const response = yield call(getCartProducts, userToken);
    console.log("response from cart list", response);
    if (response.length > 0) {
      yield put(cartActions.cartProductsList(response));
      yield put(loadingActions.disableLoader({}));
    } else if (response.message) {
      alert(JSON.stringify(response.message));
    }
  } catch (error) {
    console.log("API ERROR!!!!", error);
    yield put(cartActions.cartProductsCallFailed());
    yield put(loadingActions.disableLoader({}));
  }
}

export function* addProductToCartSaga(action) {
  const { isNetworkAvailable, userToken, storeCode } = yield select(
    (state) => state.appReducer
  );
  if (!isNetworkAvailable) {
    showSingleAlert(translate("No internet connection"));
    return;
  }

  yield put(loadingActions.enableLoader());
  try {
    const { cartArray } = yield select((state) => state.cartReducer);
    const response = yield call(addProductToCart, action.params, userToken); //userToken
    console.log("+++++++  response from add product ++++++++ ", response);

    if (response && response.item_id) {
      const updatedArray = yield call(getCartProducts, userToken);
      console.log(
        "++++++++++ updated array for logged user ++++++ ",
        updatedArray
      );
      yield put(cartActions.updateCartProducts(updatedArray));
      yield put(loadingActions.disableLoader({}));
      if (action.callback) {
        action.callback(true);
      }
    } else if (response.message) {
      alert(JSON.stringify(response.message));
      yield put(loadingActions.disableLoader({}));
    }
  } catch (error) {
    console.log("API ERROR!!!!", error);
    yield put(cartActions.cartProductsCallFailed());
    yield put(loadingActions.disableLoader({}));
  }
}

export function* getTotalCartCostSaga(action) {
  const {
    isNetworkAvailable,
    userToken,
    storeCode,
    adminToken,
    guestToken,
  } = yield select((state) => state.appReducer);
  if (!isNetworkAvailable) {
    showSingleAlert(translate("No internet connection"));
    return;
  }

  yield put(loadingActions.enableLoader());
  try {
    let response;
    if (userToken.length > 0) {
      response = yield call(
        getLoggedUserCartTotalCostAPI,
        storeCode,
        userToken
      );
    } else {
      response = yield call(
        getGuestCartTotalCostAPI,
        storeCode,
        guestToken,
        adminToken
      );
    }

    console.log("GET CART TOTAL COST RESPONSE==>>>", response);

    if (response && response.grand_total) {
      if (userToken.length > 0) {
        const cartresponse = yield call(getCartProducts, userToken); //userToken
        console.log("response from cart list", cartresponse);
        if (response && !response.message) {
          yield put(cartActions.cartProductsList(cartresponse));
        }
      }
      if (action.getTotalCostCallback) {
        action.getTotalCostCallback(response);
      }
    } else if (response.message) {
      if (action.getTotalCostCallback) {
        action.getTotalCostCallback(null);
      }
      alert(JSON.stringify(response.message));
    }
    yield put(loadingActions.disableLoader({}));
  } catch (error) {
    console.log("API ERROR!!!!", error);
    yield put(cartActions.cartProductsCallFailed());
    yield put(loadingActions.disableLoader({}));
  }
}

export function* getLoggedUserCartIdSaga(action) {
  const { isNetworkAvailable, userToken, storeCode } = yield select(
    (state) => state.appReducer
  );
  if (!isNetworkAvailable) {
    showSingleAlert(translate("No internet connection"));
    return;
  }

  yield put(loadingActions.enableLoader());
  try {
    const cartIDResponse = yield call(getCartID, userToken, storeCode);

    console.log("LOGGED USER CART ID RESPONSE", cartIDResponse);

    if (cartIDResponse && cartIDResponse.message) {
      console.log("CART LIST ID RESPONSE ERROR::: ", cartIDResponse.message);
      if (action.getLoggedUserCartIdCallback) {
        action.getLoggedUserCartIdCallback(false);
      }
    } else {
      yield put(loginActions.updateCartId(cartIDResponse));
      if (action.getLoggedUserCartIdCallback) {
        action.getLoggedUserCartIdCallback(true);
      }
    }
    yield put(loadingActions.disableLoader({}));
  } catch (error) {
    console.log("API ERROR!!!!", error);
    yield put(cartActions.cartProductsCallFailed());
    yield put(loadingActions.disableLoader({}));
  }
}
