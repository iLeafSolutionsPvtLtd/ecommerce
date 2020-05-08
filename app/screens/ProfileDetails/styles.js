/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on February 19, 2020
 * Cart styles -
 */

import { StyleSheet, I18nManager } from "react-native";
import AppStyles from "../../config/styles";
import Constants from "../../config/constants";
import { normalizedHeight, normalizedWidth } from "../../config/common";

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: Constants.APP_WHITE_COLOR
  },
  scrollContainer: {
    backgroundColor: Constants.APP_WHITE_COLOR
  },
  accountInfoContainer: {
    marginTop: 8,
    backgroundColor: Constants.APP_WHITE_COLOR
  },
  userNameText: {
    fontSize: 16,
    fontFamily: Constants.Fonts.MEDIUM,
    color: Constants.APP_BLACK_COLOR,
    marginTop: 16,
    textAlign: "left",
    marginHorizontal: 20,
    marginBottom: 10
  },
  line: {
    marginVertical: 15,
    height: 1,
    width: "100%",
    alignSelf: "center",
    backgroundColor: "rgb(241, 243, 246)"
  },
  subTitle: {
    fontSize: 14,
    fontFamily: Constants.Fonts.REGULAR,
    color: "rgb(120,120,120)",
    marginTop: 5,
    textAlign: "left"
  },
  inputs: {
    flex: 1,
    marginLeft: 10,
    height: normalizedHeight(48),
    marginVertical: 8,
    paddingHorizontal: 10,
    color: "rgb(42,42,42)",
    backgroundColor: "rgb(244, 246, 248)",
    borderBottomColor: "#FFFFFF",
    width: "100%",
    fontSize: 15,
    textAlign: I18nManager.isRTL ? "right" : "left",
    alignSelf: "center",
    fontFamily: Constants.Fonts.REGULAR,
    height: 45,
    borderRadius: 2
  },
  passwordContainer: {
    marginVertical: 8,
    backgroundColor: Constants.APP_WHITE_COLOR
  },
  buttonContainer: {
    backgroundColor: Constants.APP_WHITE_COLOR
  },
  buttonOutlineContainer: {
    marginVertical: 12,
    marginHorizontal: 14,
    borderRadius: normalizedHeight(54 / 2),
    height: normalizedHeight(54),
    backgroundColor: Constants.APP_THEME_COLOR,
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    alignSelf: "center",
    marginBottom: 30
  },
  updateText: {
    fontFamily: Constants.Fonts.MEDIUM,
    fontSize: 15,
    color: Constants.APP_WHITE_COLOR
  },
  titleStyle: {
    // marginTop: 20,
    textAlign: "left",
    marginLeft: 20,
    marginBottom: 10,
    fontSize: 18,
    color: Constants.APP_THEME_COLOR,
    fontFamily: Constants.Fonts.MEDIUM
  },
  holderView: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginVertical: 5,
    alignItems: "center"
  },
  iconContainer: {
    // width: 25,
    height: 45,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default styles;
