/**
 * Created by iLeaf Solutions Pvt.Ltd
 * on March 19, 2020
 * Checkout Saga - handles checkout operations
 */

import { showSingleAlert } from "../config/common";
import * as loadingActions from "../actions/loadingActions";
import { put, call, select, all } from "redux-saga/effects";
import { getStores, getStoresView } from "../api/apiMethods";
import * as countrySelectionActions from "../actions/countrySelectionActions";

export function* getStoresSaga(action) {
  const { isNetworkAvailable } = yield select((state) => state.appReducer);
  if (!isNetworkAvailable) {
    showSingleAlert(Strings.NO_INTERNET_CONNECTION);
    return;
  }

  yield put(loadingActions.enableLoader());

  try {
    const { stores, storesView } = yield all({
      stores: call(getStores),
      storesView: call(getStoresView),
    });
    console.log("API RESPONSE OF GET_STORES ", stores);
    console.log("API RESPONSE OF GET_STORES_VIEW ", storesView);
    yield put(loadingActions.disableLoader({}));

    if (stores && storesView) {
      yield put(countrySelectionActions.getStoresResponse(stores));
      yield put(countrySelectionActions.getStoresViewResponse(storesView));
    }
  } catch (error) {
    console.log("GET_STORES API ERROR!!", error);
    yield put(loadingActions.disableLoader({}));
  }
}
