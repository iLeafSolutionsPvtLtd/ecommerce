/**
 * Created by ARUN for iLeaf Solutions Pvt.Ltd
 * on MARCH 3, 2020
 * CategorySaga - handles search history state
 */

import { showSingleAlert } from "../config/common";
import { put, call, select } from "redux-saga/effects";
import { translate } from "../config/languageSwitching";
import { getCategoryProductsAPI } from "../api/apiMethods";
import * as loadingActions from "../actions/loadingActions";
import * as filterResultAction from "../actions/filterResultAction";

// Our worker Saga that logins the user
export function* getFilterProducts(action) {
  const { isNetworkAvailable, adminToken, storeCode } = yield select(
    (state) => state.appReducer
  );
  if (!isNetworkAvailable) {
    showSingleAlert(translate("No internet connection"));
    return;
  }
  yield put(loadingActions.enableLoader());
  try {
    const response = yield call(
      getCategoryProductsAPI,
      action.params,
      storeCode,
      adminToken
    );
    console.log("response in filter products", response);
    if (response && response.items) {
      yield put(filterResultAction.filterResponse(response));
      yield put(loadingActions.disableLoader({}));
    } else {
      yield put(filterResultAction.filterFailed());
      yield put(loadingActions.disableLoader({}));
    }
  } catch (error) {
    console.log("API ERROR!!!!", error);
    yield put(loadingActions.disableLoader({}));
  }
}
