/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on February 19, 2020
 * WishList styles -
 */

import { StyleSheet } from "react-native";
import AppStyles from "../../config/styles";
import Constants from "../../config/constants";
import { normalizedHeight, normalizedWidth } from "../../config/common";

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: Constants.APP_WHITE_COLOR,
  },
  container: {
    backgroundColor: AppStyles.color.COLOR_WHITE,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonLogin: {
    borderRadius: 14,
    width: "65%",
    backgroundColor: Constants.APP_THEME_COLOR,
    height: normalizedHeight(44),
    marginVertical: normalizedHeight(20),
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
  socialName: {
    fontSize: 15,
    color: Constants.APP_WHITE_COLOR,
    fontFamily: Constants.Fonts.MEDIUM,
  },
  loginContentText: {
    alignSelf: "center",
    fontSize: 14,
    color: "rgb(164,164,164)",
    fontFamily: Constants.Fonts.REGULAR,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    marginBottom: 24,
    alignSelf: "center",
  },
  titleStyle: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: 18,
    color: Constants.APP_THEME_COLOR,
    fontFamily: Constants.Fonts.MEDIUM,
  },
});

export default styles;
