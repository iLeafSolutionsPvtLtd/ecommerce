/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on March 19, 2020
 * Checkout Saga - handles checkout operations
 */

import {
  getCartID,
  placeOrderGuestAPI,
  setShipmentGuestAPI,
  placeOrderLoggedUserAPI,
  setShipmentLoggedUserAPI,
  applyVoucherCodeGuestAPI,
  getPaymentMethodsGuestAPI,
  getShipmentMethodsGuestAPI,
  applyVoucherCodeLoggedUserAPI,
  getPaymentMethodsLoggedUserAPI,
  getShipmentMethodsLoggedUserAPI,
} from "../api/apiMethods";
import { showSingleAlert } from "../config/common";
import * as cartActions from "../actions/cartActions";
import { translate } from "../config/languageSwitching";
import * as loginActions from "../actions/loginActions";
import * as guestActions from "../actions/guestActions";
import * as loadingActions from "../actions/loadingActions";
import { put, call, all, select } from "redux-saga/effects";

// Our worker Saga that logins the user
export function* setShipmentSaga(action) {
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
        setShipmentLoggedUserAPI,
        action.params,
        storeCode,
        userToken
      );
    } else {
      response = yield call(
        setShipmentGuestAPI,
        action.params,
        storeCode,
        guestToken,
        adminToken
      );
    }

    console.log("SET SHIPMENT RESPONSE", response);

    if (response && response.payment_methods && action.isPlaceOrder) {
      let createOrderParams = { paymentMethod: { method: "checkmo" } };

      let placeOrderResponse;

      if (userToken.length > 0) {
        placeOrderResponse = yield call(
          placeOrderLoggedUserAPI,
          createOrderParams,
          storeCode,
          userToken
        );
      } else {
        placeOrderResponse = yield call(
          placeOrderGuestAPI,
          createOrderParams,
          storeCode,
          guestToken,
          adminToken
        );
      }

      console.log("PLACE ORDER RESPONSE", placeOrderResponse);

      if (placeOrderResponse && !isNaN(placeOrderResponse)) {
        if (userToken.length > 0) {
          yield put(cartActions.updateCartProducts([]));
          const cartIDResponse = yield call(getCartID, userToken, storeCode);
          console.log("GET CARTID RESPONSE --- ", cartIDResponse);

          yield put(loadingActions.disableLoader({}));
          if (cartIDResponse && cartIDResponse.message) {
            // yield put(loginActions.cartProductsCallFailed());
            console.log(
              "CART LIST ID RESPONSE ERROR::: ",
              cartIDResponse.message
            );
            if (action.orderPlacedCallback) {
              action.orderPlacedCallback(false);
            }
          } else {
            yield put(loginActions.updateCartId(cartIDResponse));
            console.log("CART LIST ID RESPONSE::: ", cartIDResponse);
            if (action.orderPlacedCallback) {
              action.orderPlacedCallback(true);
            }
          }
        } else {
          yield put(loadingActions.disableLoader({}));
          if (action.orderPlacedCallback) {
            action.orderPlacedCallback(true);
          }
          yield put(guestActions.updateCartList([]));
          yield put(guestActions.clearQuoteId());
        }
      } else {
        yield put(loadingActions.disableLoader({}));
        showSingleAlert(translate("API_Failed"));
      }
    } else {
      if (
        response.message &&
        action.orderPlacedCallback &&
        !action.isPlaceOrder
      ) {
        action.orderPlacedCallback(false);
      } else if (action.orderPlacedCallback && !action.isPlaceOrder) {
        action.orderPlacedCallback(true);
      } else {
        showSingleAlert(translate("API_Failed"));
      }
      yield put(loadingActions.disableLoader({}));
    }
  } catch (error) {
    showSingleAlert(translate("API_Failed"));
    console.log("API ERROR!!!!", error);
    yield put(loadingActions.disableLoader({}));
  }
}

export function* applyVoucherCodeSaga(action) {
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
        applyVoucherCodeLoggedUserAPI,
        action.voucherCode,
        storeCode,
        userToken
      );
    } else {
      response = yield call(
        applyVoucherCodeGuestAPI,
        action.voucherCode,
        storeCode,
        guestToken,
        adminToken
      );
    }

    yield put(loadingActions.disableLoader({}));

    console.log("APPLY VOUCHER CODE RESPONSE", response);

    if (response && response.message) {
      if (action.apllyCodeCallback) action.apllyCodeCallback(false);
    } else {
      if (action.apllyCodeCallback) action.apllyCodeCallback(true);
    }

    // } else {
    //   yield put(loadingActions.disableLoader({}));
    //   showSingleAlert(translate('API_Failed'));
    // }
  } catch (error) {
    showSingleAlert(translate("API_Failed"));
    console.log("API ERROR!!!!", error);
    yield put(loadingActions.disableLoader({}));
  }
}

export function* getPaymentAndShipmentMethodsSaga(action) {
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

    let shipmentMethods = [];
    let paymentMethods = [];

    if (userToken.length > 0) {
      const { shipment, payment } = yield all({
        payment: call(getPaymentMethodsLoggedUserAPI, storeCode, userToken),
        shipment: call(getShipmentMethodsLoggedUserAPI, storeCode, userToken),
      });
      shipmentMethods = shipment;
      paymentMethods = payment;
    } else {
      const { shipment, payment } = yield all({
        payment: call(
          getPaymentMethodsGuestAPI,
          storeCode,
          guestToken,
          adminToken
        ),
        shipment: call(
          getShipmentMethodsGuestAPI,
          storeCode,
          guestToken,
          adminToken
        ),
      });
      shipmentMethods = shipment;
      paymentMethods = payment;
    }

    yield put(loadingActions.disableLoader({}));

    console.log("GET PAYMENT METHODS RESPONSE", paymentMethods);
    console.log("GET SHIPMENT METHODS RESPONSE", shipmentMethods);

    if (
      paymentMethods &&
      paymentMethods.length > 0 &&
      paymentMethods[0].code &&
      shipmentMethods &&
      shipmentMethods.length > 0 &&
      shipmentMethods[0].carrier_code
    ) {
      if (action.getPaymentAndShippingMethodsCallback)
        action.getPaymentAndShippingMethodsCallback(
          paymentMethods,
          shipmentMethods
        );
    } else {
      if (action.getPaymentAndShippingMethodsCallback)
        action.getPaymentAndShippingMethodsCallback([], []);
    }
  } catch (error) {
    // showSingleAlert(translate('API_Failed'));
    console.log("API ERROR!!!!", error);
    yield put(loadingActions.disableLoader({}));
    if (action.getPaymentAndShippingMethodsCallback)
      action.getPaymentAndShippingMethodsCallback([], []);
  }
}
