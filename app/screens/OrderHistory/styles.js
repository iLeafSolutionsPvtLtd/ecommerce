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
