/**
 * Created by Jebin for ILeaf Solutions Pvt. Ltd.
 * on February 12, 2020
 * Constants - Constant data of the App.
 */

import { Dimensions, Platform } from "react-native";
const { width, height } = Dimensions.get("window");

const isProduction = false; //Change here  for converting 'PRODUCTION' or 'STAGING'

export default (constants = {
  APP_NAME: "Saloonaat",

  APP_BASE_URL: isProduction
    ? "https://staging.saloonaat.com"
    : "https://staging.saloonaat.com",

  APP_S3_BASE_URL: isProduction
    ? "https://elogics-media.s3-eu-west-1.amazonaws.com/"
    : "https://elogics-media.s3-eu-west-1.amazonaws.com/",

  APP_BASE_HEIGHT: 896,
  APP_BASE_WIDTH: 414,

  Fonts: {
    BOLD: Platform.OS === "ios" ? "Roboto-Bold" : "Roboto_Bold",
    LIGHT: Platform.OS === "ios" ? "Roboto-Light" : "Roboto_Light",
    MEDIUM: Platform.OS === "ios" ? "Roboto-Medium" : "Roboto_Medium",
    REGULAR: Platform.OS === "ios" ? "Roboto-Regular" : "Roboto_Regular",
  },

  PRIVACY_POLICY_URL: "",
  TERMS_AND_CONDITIONS_URL: "",

  APP_THEME_COLOR: "#F14935",
  APP_THEME_COLOR2: "rgb(203,39,100)",
  APP_GRAY_COLOR: "rgb(177,177,177)",
  APP_GRAY_COLOR2: "rgb(241,243,246)",
  APP_GRAY_COLOR3: "rgb(120,120,120)",
  APP_WHITE_COLOR: "#FFFFFF",
  APP_TEXT_PINK_COLOR: "rgb(203,39,100)",
  APP_BLACK_COLOR: "#282828",
  APP_THEME_DARK_GRAY: "rgb(26, 26, 24)",
  APP_THEME_DARK_YELLOW: "rgb(207, 155, 61)",
  APP_SEPARATOR_COLOR: "#E7E6E6",
  APP_GREY_TEXT_COLOR: "rgb(104,108,126)",
  APP_BOX_BACKGROUND_GREY: "rgb(244,246,248)",
  APP_RED_COLOR: "rgb(227,100,108)",
  APP_TRANSPARENT_COLOR: "transparent",
  APP_OUT_OF_STOCK_TEXT: "#b51818",

  SCREEN_WIDTH: width,
  SCREEN_HEIGHT: height,

  ACTIVE_OPACITY: 0.7,

  PRODUCTS_PAGE_COUNT: 20,

  IS_ANDROID: Platform.OS === "ios" ? false : true,

  IOS_VERSION: parseInt(Platform.Version, 10),

  MAX_PRODUCT_COUNT: 5,
  MAX_CART_SIZE: 20,
});
