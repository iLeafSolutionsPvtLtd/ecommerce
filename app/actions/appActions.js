/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on February 12, 2020
 * AppAction - Common actions for App
 */

import * as types from './types';

export function onChangeNetworkStatus(networkStatus) {
  return {
    type: types.APP_NETWORK_STATUS,
    networkStatus,
  };
}

export function onChangeLanguage(language) {
  return {
    type: types.APP_LANGUAGE_CHANGE,
    language,
  };
}

export function onstoreCodeUpdated(code) {
  return {
    type: types.APP_STORE_CODE_CHANGE,
    code,
  };
}

export function updateCurrency(currency) {
  return {
    type: types.APP_UPDATE_CURRENCY,
    currency,
  };
}

export function onChangeOrientation(screenWidth, screenHeight, orientation) {
  return {
    type: types.ORIENTATION_CHANGE,
    screenWidth,
    screenHeight,
    orientation,
  };
}

export function updateDeviceType(deviceType) {
  return {
    type: types.UPDATE_DEVICE_TYPE,
    deviceType,
  };
}

export function getLoggedUserCartId(getLoggedUserCartIdCallback) {
  return {
    type: types.GET_LOGGED_USER_CART_ID,
    getLoggedUserCartIdCallback,
  };
}
