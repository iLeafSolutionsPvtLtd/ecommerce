import { StyleSheet } from "react-native";
import Constants from "../../config/constants";
import { normalizedHeight, normalizedWidth } from "../../config/common";

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Constants.APP_WHITE_COLOR },
  text_align: { textAlign: "center" },
  emptylist: { flex: 1, alignItems: "center", justifyContent: "center" },
  addressCardContainer: {
    flex: 1,
    padding: 10,
    marginHorizontal: 20,
    backgroundColor: "rgba(194,198,209,0.2)",
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 50,
  },
  addAddressBtn: {
    // flex: 1,
    justifyContent: "flex-end",
    padding: 10,
    marginTop: 0,
  },
  btn_touchable_style: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Constants.APP_THEME_COLOR,
    alignSelf: "center",
    width: "80%",
    marginBottom: 10,
    borderRadius: normalizedHeight(54 / 2),
    height: normalizedHeight(54),
  },
  card_name_row: { flexDirection: "row" },
  checkmark: { width: 10, height: 7 },
  button_left_container: { flexDirection: "row", flex: 1 },
  btn_set_default: {
    width: 125,
    height: 26,
    backgroundColor: "#dbb85a",
    borderWidth: 1,
    borderColor: "#dbb85a",
    paddingTop: 3,
    borderRadius: 26 / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  btn_bottom_touchable_style: {
    position: "absolute",
    bottom: -20,
    right: 0,
  },
  button_container: {
    flexDirection: "row",
    marginTop: 10,
    marginLeft: 10,
    justifyContent: "space-between",
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
