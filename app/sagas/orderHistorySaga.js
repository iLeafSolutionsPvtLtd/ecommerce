/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on March 19, 2020
 * Order history Saga - handles Order history operations
 */

import { showSingleAlert } from "../config/common";
import { put, call, select } from "redux-saga/effects";
import { getOrderHistoryApi } from "../api/apiMethods";
import { translate } from "../config/languageSwitching";
import * as loadingActions from "../actions/loadingActions";

export function* getOrderHistory(action) {
  const { isNetworkAvailable, adminToken } = yield select(
    (state) => state.appReducer
  );
  const { userInfo } = yield select((state) => state.loginReducer);
  if (!isNetworkAvailable) {
    showSingleAlert(translate("No internet connection"));
    return;
  }

  yield put(loadingActions.enableLoader());
  try {
    let params = {
      searchCriteria: "all",
      "searchCriteria[filterGroups][0][filters][0][field]": "customer_email",
      "searchCriteria[filterGroups][0][filters][0][value]": userInfo.email, //'jithesh.pk@gmail.com' ,
    };

    const response = yield call(
      getOrderHistoryApi,
      params,
      adminToken
      //'pi97uov11pk3gzyavah0xsiiaqaxby8v',
    );
    console.log("API RESPONSE OF ORDER HISTORY", response);
    yield put(loadingActions.disableLoader({}));

    if (response && response.message) {
      showSingleAlert(response.message);
    } else if (response) {
      if (action.callback) {
        action.callback(response);
      }
    }
  } catch (error) {
    console.log("ORDER HISTORY API ERROR!!!!", error);
    yield put(loadingActions.disableLoader({}));
  }
}
