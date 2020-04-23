/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on February 12, 2020
 * HomeScreen - HomeScreen Styles
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
    backgroundColor: Constants.APP_WHITE_COLOR,
    flex: 1,
  },
  sectionTitle: {
    marginLeft: 15,
    marginTop: 11,
    marginBottom: 5,
    textAlign: "left",
    fontFamily: Constants.Fonts.MEDIUM,
    fontSize: 15,
    color: Constants.APP_THEME_COLOR,
  },
  pagerContainer: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  pagerItem: {
    width: 17,
    height: 3,
    backgroundColor: "rgba(255,255,255,0.3)",
    margin: 2,
    borderRadius: 1.5,
  },
  categoryListContainer: {
    // height: normalizedHeight(162),
    width: "100%",
    backgroundColor: Constants.APP_WHITE_COLOR,
    marginTop: 10,
  },
  categoryTitle: {
    marginVertical: 10,
    fontFamily: Constants.Fonts.MEDIUM,
    fontSize: 14,
    textTransform: "uppercase",
    color: Constants.APP_GRAY_COLOR3,
  },
  itemTitle: {
    fontSize: 12,
    fontFamily: Constants.Fonts.REGULAR,
    color: Constants.APP_GRAY_COLOR3,
    marginTop: 10,
    textAlign: "left",
  },
  itemTitle2: {
    fontSize: 14,
    fontFamily: Constants.Fonts.REGULAR,
    color: Constants.APP_GRAY_COLOR3,
    marginTop: 10,
    textAlign: "left",
  },
  itemCost: {
    fontSize: 12,
    fontFamily: Constants.Fonts.REGULAR,
    color: Constants.APP_THEME_COLOR2,
    marginTop: 5,
    textAlign: "left",
  },
  separatorView: {
    height: 1,
    marginHorizontal: 15,
    // marginTop: 5,
    marginBottom: 10,
    backgroundColor: Constants.APP_SEPARATOR_COLOR,
  },
  wishListContainer: {
    width: normalizedWidth(26),
    height: normalizedWidth(26),
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: Constants.APP_WHITE_COLOR,
    borderRadius: normalizedWidth(26) / 2,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default styles;
