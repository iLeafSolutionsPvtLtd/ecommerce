import { StyleSheet } from "react-native";
import Constants from "../../config/constants";
import constants from "../../config/constants";

const styles = StyleSheet.create({
  child_view: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    height: 45,
    borderBottomWidth: 0.5,
    borderBottomColor: Constants.APP_GRAY_COLOR,
  },
  child_color_view: {
    flex: 1,
    // margin: 3,
    alignItems: "center",
    flexDirection: "row",
    // paddingLeft: 10,
    paddingHorizontal: 10,
    height: 60,
    // borderBottomWidth: 1,
    borderBottomColor: Constants.APP_BOX_BACKGROUND_GREY,
    // backgroundColor:Constants.APP_BOX_BACKGROUND_GREY
  },
  sub_container_view: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 56,
    alignItems: "center",
    // margin: 3,
  },
  discount_conatiner_view: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 56,
    alignItems: "center",
    // margin: 3,
  },
  btn_touchable_style: {
    // width: '100%',
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: constants.APP_THEME_COLOR,
    borderRadius: 25,
    marginTop: 20,
    marginHorizontal: 35,
    marginVertical: 20,
  },
  addAddressBtn: { justifyContent: "flex-end" },
  checkbox_icon: {
    // width: 20,
    // height: 20,
    // tintColor: Constants.APP_THEME_COLOR,
  },
  view_textinputs: {
    borderWidth: 1,
    width: "40%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
    borderRadius: 8,
    height: 40,
    borderColor: Constants.APP_BOX_BACKGROUND_GREY,
  },
  titleStyle: {
    textAlign: "left",
    marginTop: 10,
    marginLeft: 20,
    fontSize: 18,
    color: Constants.APP_THEME_COLOR,
    fontFamily: Constants.Fonts.MEDIUM,
  },
  // style_view:{
  // 	flex: 1,
  // 	margin:3,
  // 	flexDirection: 'row',

  // 	height: 40,
  // 	backgroundColor:Constants.APP_BOX_BACKGROUND_GREY
  // },
  // choose_color_view:{ flex: 1, flexDirection: 'row',margin:3, height: 40,backgroundColor:Constants.APP_BOX_BACKGROUND_GREY   }
});

export default styles;
