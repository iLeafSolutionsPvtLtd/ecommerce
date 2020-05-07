/**
 * Created by Jebin for ILeaf Solutions Pvt. Ltd.
 * on February 12, 2020
 * Common - Common functions in the App.
 */

import { Alert } from "react-native";
import Constants from "./constants";
import Snackbar from "react-native-snackbar";

// Method to check object is empty/null
export function isEmpty(obj) {
  // null and undefined are "empty"
  if (obj == null) return true;

  // Assume if it has a length property with a non-zero value
  // that that property is correct.
  if (obj.length > 0) return false;
  if (obj.length === 0) return true;

  // If it isn't an object at this point
  // it is empty, but it can't be anything *but* empty
  // Is it empty?  Depends on your application.
  if (typeof obj !== "object") return true;

  // Otherwise, does it have any properties of its own?
  // Note that this doesn't handle
  // toString and valueOf enumeration bugs in IE < 9
  for (var key in obj) {
    if (hasOwnProperty.call(obj, key)) return false;
  }
  return true;
}

//Method to check if the given dictionaries are sam
export function isEqualDictionaries(map1, map2) {
  var testVal;
  if (map1.size !== map2.size) {
    return false;
  }
  for (var [key, val] of map1) {
    testVal = map2.get(key);
    if (testVal !== val || (testVal === undefined && !map2.has(key))) {
      return false;
    }
  }
  return true;
}

// Method to show single alert message with 'OK' callback
export function showSingleAlert(alertMessage, okText, callbackFunction) {
  setTimeout(function() {
    Alert.alert(Constants.APP_NAME, alertMessage, [
      {
        text: okText ? okText : "Ok",
        onPress: () => {
          callbackFunction ? callbackFunction() : null;
        },
      },
    ]);
  }, 100);
}

// Method to show alert with callback
export function showAlertWithCallback(
  titleMessage,
  okText,
  cancelText,
  okCallbackFunction,
  cancelCallbackFunction
) {
  setTimeout(function() {
    Alert.alert(
      Constants.APP_NAME,
      titleMessage,
      [
        {
          text: cancelText,
          style: "cancel",
          onPress: () => {
            cancelCallbackFunction ? cancelCallbackFunction() : null;
          },
        },
        {
          text: okText,
          onPress: () => {
            okCallbackFunction ? okCallbackFunction() : null;
          },
        },
      ],
      { cancelable: true }
    );
  }, 100);
}

// Method to show snackbar with short duration
export function showSimpleSnackbar(alertMessage) {
  Snackbar.show({
    text: alertMessage,
    duration: Snackbar.LENGTH_SHORT,
    backgroundColor: Constants.APP_THEME_DARK_GRAY,
  });
}

// Method to show snackbar with long duration
export function showLongSnackbar(alertMessage) {
  Snackbar.show({
    text: alertMessage,
    duration: Snackbar.LENGTH_LONG,
    backgroundColor: Constants.APP_THEME_DARK_GRAY,
  });
}

//Check if the email is valid or not
export function checkEMailValidation(email) {
  //var re = /^(([^<>()\[\]\\.,;:\s@“]+(\.[^<>()\[\]\\.,;:\s@“]+)*)|(“.+“))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var re = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}/g;
  return re.test(email);
}

//Check if the phone number is valid or not
export function checkPhoneNumberValid(phone) {
  if (phone.match(/(^[0-9( )+-]*)$/)) {
    return true;
  }
  return false;
}

//Format phone number
export function formatMobileNumber(text) {
  var cleaned = ("" + text).replace(/\D/g, "");
  var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    var intlCode = match[1] ? "+1 " : "",
      number = [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join(
        ""
      );
    return number;
  }
  return text;
}

//Check if password is valid or not
//Min 8 letter with at least a special char, upper and lower case, letters and a number
export function checkPasswordValid(password) {
  if (password.match(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)) {
    return true;
  }
  return false;
}

/** Calculate the expected width of the UI */
export function normalizedWidth(value) {
  if (Constants.SCREEN_WIDTH > Constants.SCREEN_HEIGHT) {
    return (value / Constants.APP_BASE_WIDTH) * Constants.SCREEN_HEIGHT;
  }
  return (value / Constants.APP_BASE_WIDTH) * Constants.SCREEN_WIDTH;
}

/** Calculate the expected height of the UI */
export function normalizedHeight(value) {
  if (Constants.SCREEN_WIDTH > Constants.SCREEN_HEIGHT) {
    return (value / Constants.APP_BASE_HEIGHT) * Constants.SCREEN_WIDTH;
  }
  return (value / Constants.APP_BASE_HEIGHT) * Constants.SCREEN_HEIGHT;
}
