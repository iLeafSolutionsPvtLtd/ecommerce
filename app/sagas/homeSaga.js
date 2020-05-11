/**
 * Created by ARUN for iLeaf Solutions Pvt.Ltd
 * on MARCH 3, 2020
 * CategorySaga - handles search history state
 */

import { showSingleAlert } from "../config/common";
import { getCartProducts } from "../api/apiMethods";
import * as homeAction from "../actions/homeAction";
import * as cartActions from "../actions/cartActions";
import { put, call, select } from "redux-saga/effects";
import { getHomePageDetails } from "../api/apiMethods";
import * as loadingActions from "../actions/loadingActions";

// Our worker Saga that logins the user
export function* getHomeDetails(action) {
  console.log("ACTION IN HOME RESPONSE", action);
  const { isNetworkAvailable, adminToken, storeCode, userToken } = yield select(
    (state) => state.appReducer
  );
  if (!isNetworkAvailable) {
    showSingleAlert(translate("No internet connection"));
    return;
  }
  yield put(loadingActions.enableLoader());
  try {
    const response = yield call(getHomePageDetails, storeCode, adminToken);
    if (userToken !== "" && response.length > 0) {
      const cartresponse = yield call(getCartProducts, userToken); //userToken
      console.log("HOME RESPONSE", response);
      console.log("response from cart list", cartresponse);
      yield put(loadingActions.disableLoader({}));
      if (cartresponse.length >= 0) {
        yield put(cartActions.cartProductsList(cartresponse));
        yield put(homeAction.homeResponse(response));
      }
    } else {
      yield put(homeAction.homeResponse(response));
      yield put(loadingActions.disableLoader({}));
    }
  } catch (error) {
    console.log("API ERROR!!!!", error);
    yield put(loadingActions.disableLoader({}));
  }
}
