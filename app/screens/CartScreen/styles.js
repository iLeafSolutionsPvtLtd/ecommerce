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
    borderRadius: normalizedHeight(54 / 2),
    height: normalizedHeight(54),
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
    textAlign: "left",
    marginTop: 10,
    marginLeft: 20,
    fontSize: 18,
    color: Constants.APP_THEME_COLOR,
    fontFamily: Constants.Fonts.MEDIUM,
  },
  returnPolicyView: {
    minHeight: 50,
    borderRadius: 5,
    marginHorizontal: 20,
    // width: "100%",
    // flex: 1,
    backgroundColor: Constants.APP_WHITE_COLOR,
    shadowOffset: { width: 0, height: 5 },
    shadowColor: "rgba(46,69,187,0.56)",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    borderRadius: 5,
    elevation: 3,
  },
  sendBackText: {
    fontSize: 12,
    color: "rgb(142,142,142)",
    fontFamily: Constants.Fonts.REGULAR,
    marginVertical: 3,
  },
  sendBackTitleText: {
    fontSize: 13,
    color: Constants.APP_THEME_COLOR,
    fontFamily: Constants.Fonts.MEDIUM,
    marginVertical: 3,
  },
  moreinfo: {
    fontSize: 12,
    color: Constants.APP_THEME_COLOR,
    fontFamily: Constants.Fonts.REGULAR,
    textDecorationLine: "underline",
    marginVertical: 3,
  },
  orderInfo: {
    fontSize: 15,
    color: Constants.APP_GRAY_COLOR,
    fontFamily: Constants.Fonts.REGULAR,
    marginLeft: 15,
    marginTop: 15,
    marginRight: 10,
  },
});

export default styles;
