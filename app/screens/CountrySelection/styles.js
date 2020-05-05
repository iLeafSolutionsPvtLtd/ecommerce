/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on February 19, 2020
 * Country Selection styles -
 */

import { StyleSheet } from "react-native";
import Constants from "../../config/constants";
import { normalizedWidth } from "../../config/common";

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: Constants.APP_WHITE_COLOR,
  },
  scrollContainer: {
    backgroundColor: Constants.APP_WHITE_COLOR,
  },
  countryContainer: {
    flexDirection: "row",
    backgroundColor: "rgba(200,200,200,0.1)",
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 5,
    height: 50,
  },
  countryIcon: {
    height: 25,
    width: 25,
    borderRadius: 25 / 2,
    marginHorizontal: 20,
    marginVertical: 14,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "rgba(164, 164, 164, 0.6)",
    alignItems: "center",
    justifyContent: "center",
  },
  countryText: {
    fontSize: 14,
    color: "rgb(42,42,42)",
    alignSelf: "center",
    fontFamily: Constants.Fonts.REGULAR,
    justifyContent: "center",
  },
  tickIcon: {
    height: 23,
    width: 23,
    marginHorizontal: 24,
    marginVertical: 12,
    position: "absolute",
    right: 0,
    alignSelf: "center",
    tintColor: Constants.APP_THEME_COLOR,
  },
  line: {
    height: 1,
    width: "90%",
    alignSelf: "center",
    backgroundColor: "rgb(241, 243, 246)",
  },
  titleStyle: {
    // marginTop: 20,
    textAlign: "left",
    marginLeft: 20,
    marginBottom: 10,
    fontSize: 18,
    color: Constants.APP_THEME_COLOR,
    fontFamily: Constants.Fonts.MEDIUM,
  },
  tickContainer: {
    width: 20,
    height: 20,
    marginTop: 5,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: constants.APP_THEME_COLOR,
    position: "absolute",
    right: 10,
    alignSelf: "center",
  },
  tickImage: {
    width: 10,
    height: 7,
    tintColor: constants.APP_WHITE_COLOR,
  },
});

export default styles;
