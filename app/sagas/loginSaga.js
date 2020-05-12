/* Redux saga class
 * logins the user into the app
 * requires username and password.
 */
import {
  getCartID,
  loginUser,
  getWishlist,
  profileUpdate,
  passwordUpdate,
  submitFeedback,
  getUserInfoAPI,
  addWishlistItem,
  getCartProducts,
  removeWishlistItem,
} from "../api/apiMethods";
import { showSingleAlert } from "../config/common";
import * as cartActions from "../actions/cartActions";
import { put, call, select } from "redux-saga/effects";
import * as loginActions from "../actions/loginActions";
import { translate } from "../config/languageSwitching";
import * as loadingActions from "../actions/loadingActions";
import * as addAddressAction from "../actions/addAddressAction";

export function* loginUserSaga(action) {
  const { isNetworkAvailable, userToken, adminToken, storeCode } = yield select(
    (state) => state.appReducer
  );
  if (!isNetworkAvailable) {
    showSingleAlert(translate("No internet connection"));
    return;
  }

  let loginState = false,
    userInfoState = false,
    wishListState = false,
    cartIdState = false,
    cartListState = false;
  yield put(loadingActions.enableLoader());
  try {
    const response = yield call(loginUser, action.username, action.password);
    console.log("API RESPONSE OF LOGIN::: ", response);
    if (response && response.message) {
      yield put(loadingActions.disableLoader({}));
      if (userToken === "") {
        //showSingleAlert(response.message);
        showSingleAlert(translate("login_error"));
      }
      if (action.loginCallback) {
        action.loginCallback(false, userToken === "" ? false : true);
      }
    } else if (response && response.length > 0) {
      loginState = true;
      yield put(loginActions.onLoginResponse(response));

      // Get user info
      const userInfoResponse = yield call(getUserInfoAPI, response);
      console.log("==========userInfoResponse====", userInfoResponse);
      if (userInfoResponse && userInfoResponse.id) {
        userInfoState = true;
        yield put(
          loginActions.updateUserInfo(
            userInfoResponse,
            action.username,
            action.password
          )
        );
        yield put(
          addAddressAction.addAddressResponse(userInfoResponse.addresses)
        );
      } else {
        yield put(loginActions.updateUserInfo(null));
      }

      // Get wish list
      const wishListResponse = yield call(getWishlist, response);
      if (wishListResponse && wishListResponse.message) {
        console.log("WISHLIST API RESPONSE ERROR:::", wishListResponse.message);
      } else {
        wishListState = true;
        console.log("WISHLIST API RESPONSE:::", wishListResponse);
        yield put(loginActions.updateWishList(wishListResponse));
      }

      const cartIDResponse = yield call(getCartID, response, storeCode);
      console.log("+++++++++ cartID RESPONSE ++++++++++", cartIDResponse);
      if (cartIDResponse && cartIDResponse.message) {
        // yield put(loginActions.cartProductsCallFailed());
        console.log("CART LIST ID RESPONSE ERROR::: ", cartIDResponse.message);
      } else {
        cartIdState = true;
        yield put(loginActions.updateCartId(cartIDResponse));
        console.log("CART LIST ID RESPONSE::: ", cartIDResponse);
      }

      // Get cart list
      const cartResponse = yield call(getCartProducts, response);
      if (cartResponse && cartResponse.message) {
        yield put(cartActions.cartProductsCallFailed());
        console.log("CART LIST RESPONSE ERROR::: ", cartResponse.message);
      } else {
        cartListState = true;
        yield put(cartActions.cartProductsList(cartResponse));
        console.log("CART LIST RESPONSE::: ", cartResponse);
      }
      // clear guest cart
      yield put(loginActions.clearGuestCart());

      yield put(loadingActions.disableLoader({}));
      if (action.loginCallback) {
        if (
          loginState &&
          userInfoState &&
          wishListState &&
          cartIdState &&
          cartListState
        ) {
          action.loginCallback(true, false);
        } else {
          action.loginCallback(false, true);
        }
      }
    }
  } catch (error) {
    console.log("LOGIN API ERROR!!!!", error);
    yield put(loginActions.loginFailed());
    yield put(loadingActions.disableLoader({}));
  }
}

export function* profileUpdateSaga(action) {
  const { isNetworkAvailable, userToken } = yield select(
    (state) => state.appReducer
  );
  if (!isNetworkAvailable) {
    showSingleAlert(translate("No internet connection"));
    return;
  }
  yield put(loadingActions.enableLoader());
  try {
    const response = yield call(profileUpdate, action.userInfo, userToken);
    console.log("API RESPONSE OF UPDATE PROFILE ", response);
    if (response) {
      if (response.message) {
        showSingleAlert(response.message);
        yield put(loadingActions.disableLoader({}));
      } else {
        if (action.newPassword.length > 0) {
          const passwordResponse = yield call(
            passwordUpdate,
            action.oldPassword,
            action.newPassword,
            userToken
          );
          console.log("API RESPONSE OF PASSWORD UPDATE ", passwordResponse);
          if (passwordResponse) {
            if (passwordResponse.message) {
              showSingleAlert(passwordResponse.message);
              yield put(loadingActions.disableLoader({}));
              if (action.profileUpdateCallback) {
                action.profileUpdateCallback(false);
              }
            } else {
              yield put(loginActions.onProfileUpdateResponse(response));
              yield put(loadingActions.disableLoader({}));
              if (action.profileUpdateCallback) {
                action.profileUpdateCallback(true);
              }
            }
          }
        } else {
          yield put(loginActions.onProfileUpdateResponse(response));
          yield put(loadingActions.disableLoader({}));
          if (action.profileUpdateCallback) {
            action.profileUpdateCallback(true);
          }
        }
      }
    }
  } catch (error) {
    console.log("PROFILE UPDATE API ERROR!!!!", error);
    yield put(loadingActions.disableLoader({}));
  }
}

export function* removeWishlistItemSaga(action) {
  const { isNetworkAvailable, userToken } = yield select(
    (state) => state.appReducer
  );
  if (!isNetworkAvailable) {
    showSingleAlert(translate("No internet connection"));
    if (action.removeCallback) {
      action.removeCallback(false);
    }
    return;
  }
  try {
    const response = yield call(
      removeWishlistItem,
      action.productId,
      userToken
    );
    console.log("API RESPONSE OF REMOVE ITEM ", response);
    if (response) {
      if (response.message) {
        showSingleAlert(response.message);
        if (action.removeCallback) {
          action.removeCallback(false);
        }
      } else {
        if (action.removeCallback) {
          action.removeCallback(true);
        }
        const wishListResponse = yield call(getWishlist, userToken);
        if (wishListResponse && wishListResponse.message) {
          console.log(
            "WISHLIST API RESPONSE ERROR:::",
            wishListResponse.message
          );
        } else {
          console.log("WISHLIST API RESPONSE:::", wishListResponse);
          yield put(loginActions.updateWishList(wishListResponse));
        }
      }
    }
  } catch (error) {
    console.log("REMOVE ITEM API ERROR!!!!", error);
    if (action.removeCallback) {
      action.removeCallback(false);
    }
  }
}

export function* addWishlistItemSaga(action) {
  const { isNetworkAvailable, userToken } = yield select(
    (state) => state.appReducer
  );
  if (!isNetworkAvailable) {
    showSingleAlert(translate("No internet connection"));
    if (action.addCallback) {
      action.addCallback(false);
    }
    return;
  }
  try {
    const response = yield call(addWishlistItem, action.productId, userToken);
    console.log("API RESPONSE OF ADD ITEM ", response);
    if (response) {
      if (response.message) {
        showSingleAlert(response.message);
        if (action.addCallback) {
          action.addCallback(false);
        }
      } else {
        if (action.addCallback) {
          action.addCallback(true);
        }
        const wishListResponse = yield call(getWishlist, userToken);
        if (wishListResponse && wishListResponse.message) {
          console.log(
            "WISHLIST API RESPONSE ERROR:::",
            wishListResponse.message
          );
        } else {
          console.log("WISHLIST API RESPONSE:::", wishListResponse);
          yield put(loginActions.updateWishList(wishListResponse));
        }
      }
    }
  } catch (error) {
    console.log("ADD ITEM API ERROR!!!!", error);
    if (action.addCallback) {
      action.addCallback(false);
    }
  }
}

export function* submitFeedbackSaga(action) {
  const { isNetworkAvailable } = yield select((state) => state.appReducer);
  if (!isNetworkAvailable) {
    showSingleAlert(translate("No internet connection"));
    return;
  }
  yield put(loadingActions.enableLoader());
  try {
    const response = yield call(
      submitFeedback,
      action.name,
      action.email,
      action.phone,
      action.onMyMind
    );
    console.log("API RESPONSE OF SUBMIT FEEDBACK ", response);
    yield put(loadingActions.disableLoader());
    if (response) {
      if (response.message) {
        showSingleAlert(response.message);
        if (action.callBack) {
          console.log("callbackkkk1");
          action.callBack(false);
        }
      } else {
        if (action.callBack) {
          console.log("callbackkkk2");
          action.callBack(true);
        }
      }
    }
  } catch (error) {
    yield put(loadingActions.disableLoader());
    console.log("SUBMIT FEEDBACK API ERROR!!!!", error);
  }
}
