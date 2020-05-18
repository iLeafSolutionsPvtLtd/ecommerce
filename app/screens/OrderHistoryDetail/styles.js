import { StyleSheet } from "react-native";
import AppStyles from "../../config/styles";
import Constants from "../../config/constants";

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: Constants.APP_WHITE_COLOR,
  },
  scrollContainer: {
    marginTop: 5,
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
    marginVertical: 5,
  },
  underLineStyle2: {
    borderBottomWidth: 1,
    borderBottomColor: Constants.APP_SEPARATOR_COLOR,
    marginTop: 18,
    marginBottom: 3,
    marginHorizontal: 18,
  },
  orderNumberText: {
    fontSize: 14,
    color: Constants.APP_BLACK_COLOR,
    fontFamily: Constants.Fonts.MEDIUM,
    textAlign: "left",
    width: 110,
  },
  deliveryStatusText: {
    fontSize: 14,
    fontFamily: Constants.Fonts.REGULAR,
    textAlign: "left",
    marginTop: 4,
  },
  normalText: {
    fontSize: 14,
    fontFamily: Constants.Fonts.REGULAR,
    color: Constants.APP_GRAY_COLOR3,
    textAlign: "left",
  },
  textBlue: {
    fontSize: 14,
    flex: 1,
    fontFamily: Constants.Fonts.MEDIUM,
    color: "rgb(92,115,207)",
    textAlign: "right",
  },
  normalTextBold: {
    fontSize: 14,
    fontFamily: Constants.Fonts.MEDIUM,
    color: "rgb(0,0,0)",
    textAlign: "left",
    marginBottom: 10,
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
    marginHorizontal: 20,
    marginTop: 12,
  },
  addressText: {
    fontSize: 14,
    marginTop: 10,
    marginBottom: 12,
    fontFamily: Constants.Fonts.REGULAR,
    color: Constants.APP_GRAY_COLOR3,
    textAlign: "left",
    marginBottom: 20,
  },
  cardWrapper: {
    marginTop: 8,
    paddingBottom: 18,
    paddingVertical: 4,
    backgroundColor: Constants.APP_WHITE_COLOR,
    margin: 20,
    shadowOffset: { width: 0, height: 5 },
    shadowColor: "rgba(46,69,187,0.56)",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    borderRadius: 5,
    paddingBottom: 5,
    elevation: 3,
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
});

export default styles;
