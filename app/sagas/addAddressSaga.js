/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on February 20, 2020
 * AddAddressSaga - handles add address API saga
 */

import {
  addAddressAPI,
  getUserInfoAPI,
  deleteAddressAPI,
} from "../api/apiMethods";
import { showSingleAlert } from "../config/common";
import { put, call, select } from "redux-saga/effects";
import { translate } from "../config/languageSwitching";
import * as loadingActions from "../actions/loadingActions";
import * as addAddressAction from "../actions/addAddressAction";
import * as navigationActions from "../actions/navigationActions";

// Our worker Saga that logins the user
export function* addAddressSaga(action) {
  const { isNetworkAvailable, userToken } = yield select(
    (state) => state.appReducer
  );

  if (!isNetworkAvailable) {
    showSingleAlert(translate("No internet connection"));
    return;
  }

  yield put(loadingActions.enableLoader());
  try {
    const response = yield call(addAddressAPI, action.params, userToken);
    console.log("++++++ add address response ++++++ ", response);
    if (response.message) {
      console.log("API ERROR MESSAGE", response.message);
      yield put(loadingActions.disableLoader({}));
      showSingleAlert(translate("API_Failed"));
    } else {
      const userInfoResponse = yield call(getUserInfoAPI, userToken);
      console.log("++++++ update address response ++++++ ", userInfoResponse);
      yield put(addAddressAction.updateAddress(userInfoResponse.addresses));
      yield put(loadingActions.disableLoader({}));
      if (action.addAddressCallback) {
        action.addAddressCallback(true);
      }
    }
  } catch (error) {
    console.log("API ERROR!!!!", error);
    yield put(addAddressAction.addAddressFailed());
    yield put(loadingActions.disableLoader({}));
  }
}

export function* editAddressSaga(action) {
  const { isNetworkAvailable, userToken } = yield select(
    (state) => state.appReducer
  );

  if (!isNetworkAvailable) {
    showSingleAlert(translate("No internet connection"));
    return;
  }

  yield put(loadingActions.enableLoader());
  try {
    const response = yield call(addAddressAPI, action.params, userToken);

    if (response.message) {
      console.log("API ERROR MESSAGE", response.message);
      yield put(loadingActions.disableLoader({}));
    } else {
      const userInfoResponse = yield call(getUserInfoAPI, userToken);
      yield put(addAddressAction.updateAddress(userInfoResponse.addresses));
      yield put(loadingActions.disableLoader({}));
      if (action.editAddressCallback) {
        action.editAddressCallback(true);
      }
    }
  } catch (error) {
    console.log("API ERROR!!!!", error);
    yield put(addAddressAction.addAddressFailed());
    yield put(loadingActions.disableLoader({}));
  }
}

export function* deleteAddressSaga(action) {
  const { isNetworkAvailable, userToken } = yield select(
    (state) => state.appReducer
  );

  if (!isNetworkAvailable) {
    showSingleAlert(translate("No internet connection"));
    return;
  }

  yield put(loadingActions.enableLoader());
  try {
    const response = yield call(deleteAddressAPI, action.addressId, userToken);

    console.log("DELETE USER ADDRESS RESPONSE==", response);

    if (response.message) {
      console.log("API ERROR MESSAGE", response.message);
      showSingleAlert(translate("API_Failed"));
      yield put(loadingActions.disableLoader({}));
    } else {
      const { addressList } = yield select((state) => state.addAddressReducer);
      let addressArray = addressList;
      addressArray.splice(action.addressIndex, 1);
      yield put(addAddressAction.updateAddress(addressArray));
      yield put(loadingActions.disableLoader({}));
    }
  } catch (error) {
    console.log("API ERROR!!!!", error);
    yield put(addAddressAction.addAddressFailed());
    yield put(loadingActions.disableLoader({}));
  }
}
