/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on February 19, 2020
 * Welcom styles -
 */

import { StyleSheet } from "react-native";
import AppStyles from "../../config/styles";
import Constants from "../../config/constants";
import { normalizedHeight, normalizedWidth } from "../../config/common";

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: Constants.APP_THEME_COLOR,
  },
  container: {
    backgroundColor: AppStyles.color.COLOR_WHITE,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  topContainer: {
    height: "20%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  middleContainer: {
    height: "60%",
    alignItems: "center",
    justifyContent: "center",
  },
  languageContainer: {
    flexDirection: "row",
    height: "20%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  languageButton: {
    width: "40%",
    height: normalizedHeight(48),
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Constants.APP_THEME_DARK_YELLOW,
    alignItems: "center",
    justifyContent: "center",
  },
  languageText: {
    fontSize: 16,
    color: Constants.APP_WHITE_COLOR,
  },
  countryContainer: {
    flexDirection: "row",
    width: "100%",
    marginVertical: 12,
    justifyContent: "space-around",
  },
  countryItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  countryIcon: {
    height: normalizedWidth(60),
    width: normalizedWidth(60),
    borderRadius: normalizedWidth(60) / 2,
    overflow: "hidden",
    borderWidth: 4,
    borderColor: "rgb(164, 164, 164)",
    alignItems: "center",
    justifyContent: "center",
  },
  countryText: {
    fontSize: 14,
    marginTop: 10,
    color: Constants.APP_WHITE_COLOR,
    alignItems: "center",
    justifyContent: "center",
  },
  internationalText: {
    color: Constants.APP_WHITE_COLOR,
    fontSize: 16,
    marginTop: 8,
    textDecorationLine: "underline",
  },
  chooseCountryText: {
    color: Constants.APP_WHITE_COLOR,
    fontSize: 18,
    margin: 18,
    fontFamily: Constants.Fonts.BOLD,
  },
  logo: {
    width: normalizedWidth(150),
    height: normalizedHeight(150),
    marginBottom: 20,
  },
});

export default styles;
