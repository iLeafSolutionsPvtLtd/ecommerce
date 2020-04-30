import { StyleSheet } from "react-native";
import AppStyles from "../../config/styles";
import Constants from "../../config/constants";
import { normalizedHeight, normalizedWidth } from "../../config/common";

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: Constants.APP_WHITE_COLOR,
  },
  scrollContainer: {
    marginTop: 5,
    marginBottom: 9,
  },
  itemImage: {
    width: 14,
    height: 14,
    // marginEnd: 18,
    alignSelf: "center",
  },
  underLineStyle: {
    borderBottomWidth: 1,
    borderBottomColor: Constants.APP_SEPARATOR_COLOR,
    marginTop: 10,
  },
  underLineStyle2: {
    borderBottomWidth: 1,
    borderBottomColor: Constants.APP_SEPARATOR_COLOR,
    marginTop: 18,
    marginBottom: 3,
    marginHorizontal: 18,
  },
  orderConfirmationText: {
    fontSize: 20,
    marginTop: 12,
    color: "rgb(46,199,107)",
    fontFamily: Constants.Fonts.REGULAR,
    textAlign: "left",
  },
  orderConfirmationSubText: {
    fontSize: 16,
    marginVertical: 10,
    color: "rgb(120,120,120)",
    fontFamily: Constants.Fonts.REGULAR,
    textAlign: "left",
  },
  deliveryStatusText: {
    fontSize: 14,
    marginVertical: 5,
    fontFamily: Constants.Fonts.REGULAR,
    textAlign: "left",
  },
  normalText: {
    fontSize: 14,
    fontFamily: Constants.Fonts.REGULAR,
    color: Constants.APP_GRAY_COLOR3,
    textAlign: "left",
  },
  textBlue: {
    fontSize: 14,
    fontFamily: Constants.Fonts.MEDIUM,
    color: "rgb(92,115,207)",
    textAlign: "left",
  },
  normalTextBold: {
    fontSize: 14,
    fontFamily: Constants.Fonts.MEDIUM,
    color: "rgb(0,0,0)",
    textAlign: "left",
  },
  largeTextBold: {
    fontSize: 15,
    marginTop: 4,
    fontFamily: Constants.Fonts.MEDIUM,
    color: "rgb(0,0,0)",
    textAlign: "left",
  },
  wrapper: {
    flexDirection: "row",
    marginHorizontal: 18,
    marginTop: 12,
    justifyContent: "space-between",
  },
  wrapperColumn: {
    marginHorizontal: 18,
    marginTop: 12,
  },
  addressText: {
    fontSize: 14,
    marginTop: 7,
    marginBottom: 12,
    fontFamily: Constants.Fonts.REGULAR,
    color: Constants.APP_GRAY_COLOR3,
    textAlign: "left",
  },
  cardWrapper: {
    marginTop: 8,
    backgroundColor: "#FFFFFF",
    paddingBottom: 18,
  },
  buttonOutlineContainer: {
    width: "80%",
    alignSelf: "center",
    marginVertical: 10,
    marginHorizontal: 18,
    borderRadius: normalizedHeight(54 / 2),
    height: normalizedHeight(54),
    backgroundColor: Constants.APP_THEME_COLOR,
    alignItems: "center",
    justifyContent: "center",
  },
  updateText: {
    fontFamily: Constants.Fonts.MEDIUM,
    fontSize: 15,
    color: Constants.APP_WHITE_COLOR,
  },
  titleStyle: {
    // marginTop: 20,
    marginLeft: 20,
    marginBottom: 10,
    fontSize: 18,
    color: Constants.APP_THEME_COLOR,
    fontFamily: Constants.Fonts.MEDIUM,
  },
});

export default styles;
