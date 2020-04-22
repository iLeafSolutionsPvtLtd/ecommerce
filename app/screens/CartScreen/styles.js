import { StyleSheet } from "react-native";
import { normalizedHeight, normalizedWidth } from "../../config/common";
import Constants from "../../config/constants";

const styles = StyleSheet.create({
  bottomButtonContainer: {
    height: normalizedHeight(100),
    marginHorizontal: 30,
    // width: "100%",
    backgroundColor: Constants.APP_WHITE_COLOR,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  addTocartButton: {
    flex: 1,
    borderRadius: 15,
    height: normalizedHeight(60),
    borderWidth: 1,
    marginLeft: 10,
    marginRight: 8,
    borderColor: Constants.APP_GRAY_COLOR3,
    alignItems: "center",
    justifyContent: "center",
  },
  buyNowButton: {
    flex: 1,
    borderRadius: normalizedHeight(30),
    height: normalizedHeight(60),
    marginRight: 10,
    marginLeft: 8,
    backgroundColor: Constants.APP_THEME_COLOR,
    alignItems: "center",
    justifyContent: "center",
  },
  addToCartText: {
    fontFamily: Constants.Fonts.REGULAR,
    fontSize: 14,
    color: Constants.APP_BLACK_COLOR,
    textAlign: "center",
  },
  buyNowText: {
    fontFamily: Constants.Fonts.MEDIUM,
    fontSize: 16,
    color: Constants.APP_WHITE_COLOR,
  },
  titleStyle: {
    marginTop: 10,
    marginLeft: 20,
    fontSize: 18,
    color: Constants.APP_THEME_COLOR,
    fontFamily: Constants.Fonts.MEDIUM,
  },
});

export default styles;
