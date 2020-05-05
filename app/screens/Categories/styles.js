/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on February 19, 2020
 * Categories styles -
 */

import { StyleSheet } from "react-native";
import AppStyles from "../../config/styles";
import Constants from "../../config/constants";

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
  categorySelectedTitle: {
    fontSize: 14,
    fontFamily: Constants.Fonts.BOLD,
    textTransform: "uppercase",
    color: Constants.APP_THEME_COLOR,
  },
  categoryTitle: {
    fontSize: 14,
    textTransform: "uppercase",
    fontFamily: Constants.Fonts.REGULAR,
  },
  titleStyle: {
    textAlign: "left",
    marginTop: 20,
    marginLeft: 20,
    fontSize: 18,
    color: Constants.APP_THEME_COLOR,
    fontFamily: Constants.Fonts.MEDIUM,
  },
});

export default styles;
