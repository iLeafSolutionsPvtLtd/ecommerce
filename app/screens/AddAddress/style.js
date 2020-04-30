import { StyleSheet } from "react-native";
import Constants from "../../config/constants";
import { normalizedHeight, normalizedWidth } from "../../config/common";

const Styles = StyleSheet.create({
  text_input_style: {
    backgroundColor: "#f4f6f8",
    height: 45,
    paddingLeft: 10,
    borderRadius: 2,
    fontFamily: Constants.Fonts.REGULAR,
    fontSize: 15,
    color: Constants.APP_BLACK_COLOR,
  },
  text_input_style_country: {
    backgroundColor: "#f4f6f8",
    height: 45,
    paddingLeft: 2,
    borderRadius: 5,
    paddingTop: 12,
  },
  text_input_style_error: {
    backgroundColor: "#f4f6f8",
    height: 45,
    paddingLeft: 10,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: "red",
    fontFamily: Constants.Fonts.REGULAR,
    fontSize: 15,
    color: Constants.APP_BLACK_COLOR,
  },
  text_input_style_textarea: {
    backgroundColor: "#f4f6f8",
    height: 120,
    paddingLeft: 10,
    borderRadius: 2,
    lineHeight: 25,
    textAlignVertical: "top",
    fontFamily: Constants.Fonts.REGULAR,
    fontSize: 15,
    color: Constants.APP_BLACK_COLOR,
  },
  text_input_style_textarea_error: {
    backgroundColor: "#f4f6f8",
    height: 120,
    paddingLeft: 2,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: "red",
    fontFamily: Constants.Fonts.REGULAR,
    fontSize: 15,
    color: Constants.APP_BLACK_COLOR,
  },
  addAddressBtn: {
    flex: 1,
    justifyContent: "flex-end",
    marginTop: 40,
    marginBottom: 20,
  },
  btn_touchable_style: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: Constants.APP_THEME_COLOR,
    borderRadius: normalizedHeight(54 / 2),
    height: normalizedHeight(54),
  },
  textTile: {
    fontFamily: Constants.Fonts.REGULAR,
    fontSize: 16,
    color: Constants.APP_BLACK_COLOR,
  },
  titleStyle: {
    // marginTop: 20,
    marginLeft: 20,
    marginBottom: 10,
    fontSize: 18,
    color: Constants.APP_THEME_COLOR,
    fontFamily: Constants.Fonts.MEDIUM,
  },
  holderView: {
    flexDirection: "row",
    marginHorizontal: 10,
    marginVertical: 12,
  },
  iconContainer: {
    width: 25,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Styles;
