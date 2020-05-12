/* Redux saga class
 * Registers the user into the app
 * requires firstname, lastname, email and password.
 */

import { registerUser } from "../api/apiMethods";
import { showSingleAlert } from "../config/common";
import { put, call, select } from "redux-saga/effects";
import { translate } from "../config/languageSwitching";
import * as loginActions from "../actions/loginActions";
import * as loadingActions from "../actions/loadingActions";

export function* registerUserSaga(action) {
  console.log("register saga call", action);
  const { isNetworkAvailable, storeCode, storesView } = yield select(
    (state) => state.appReducer
  );
  if (!isNetworkAvailable) {
    showSingleAlert(translate("No internet connection"));
    return;
  }

  yield put(loadingActions.enableLoader());

  try {
    let storeId = 0;
    storesView.map((item) => {
      if (item.code === storeCode) {
        storeId = item.id;
      }
    });
    const response = yield call(
      registerUser,
      action.firstName,
      action.lastName,
      action.email,
      storeId,
      action.password
    );
    console.log("API RESPONSE OF REGISTER ", response);
    yield put(loadingActions.disableLoader({}));

    if (response && response.message) {
      yield put(loginActions.registerFailed());
      showSingleAlert(response.message);
    } else if (response && response.id) {
      console.log("REGISTER :::", response);
      // yield put(loginActions.onRegisterResponse(response));
      if (action.registerCallback) {
        action.registerCallback(true);
      }
    }
  } catch (error) {
    console.log("REGISTER API ERROR!!!!", error);
    yield put(loginActions.registerFailed());
    yield put(loadingActions.disableLoader({}));
  }
}
