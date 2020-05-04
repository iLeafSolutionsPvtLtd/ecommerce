/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on February 12, 2020
 * Account - Account Styles
 */

import { StyleSheet } from "react-native";
import AppStyles from "../../config/styles";
import Constants from "../../config/constants";
import { normalizedHeight, normalizedWidth } from "../../config/common";

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: Constants.APP_BLACK_COLOR
  },
  scrollContainer: {
    backgroundColor: Constants.APP_GRAY_COLOR2
    //height: Constants.SCREEN_HEIGHT
  },
  userInfoContainer: {
    marginTop: 5,
    marginBottom: 4,
    backgroundColor: Constants.APP_WHITE_COLOR
  },
  noUserContainer: {
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 4,
    width: "100%",
    alignSelf: "center",
    justifyContent: "space-evenly",
    backgroundColor: Constants.APP_WHITE_COLOR
  },
  buttonSignup: {
    borderWidth: 1,
    borderColor: "rgb(241, 73, 53)",
    borderRadius: 25,
    width: "43%",
    height: normalizedHeight(46),
    marginVertical: normalizedHeight(32),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  buttonLogin: {
    borderRadius: 25,
    width: "43%",
    backgroundColor: "rgb(241, 73, 53)",
    height: normalizedHeight(46),
    marginVertical: normalizedHeight(32),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  socialName: {
    fontSize: 15,
    color: Constants.APP_WHITE_COLOR,
    fontFamily: Constants.Fonts.MEDIUM
  },
  userNameText: {
    fontSize: 18,
    fontFamily: Constants.Fonts.BOLD,
    color: "rgb(40,40,40)",
    marginHorizontal: 20,
    marginTop: 16,
    textAlign: "left"
  },
  userEmailText: {
    fontSize: 15,
    fontFamily: Constants.Fonts.REGULAR,
    color: "rgb(142,142,142)",
    marginHorizontal: 20,
    marginTop: 4,
    marginBottom: 20,
    textAlign: "left"
  },
  editIconContainer: {
    width: 120,
    height: 30,
    borderRadius: 5,
    backgroundColor: "rgb(241, 73, 53)",
    marginStart: 20,
    marginBottom: 22,
    alignItems: "center",
    justifyContent: "center"
  },
  editProfileText: {
    fontSize: 13,
    fontFamily: Constants.Fonts.REGULAR,
    color: "rgb(255,255,255)"
  },
  editImage: {
    width: 20,
    height: 20
  },
  itemContainer: {
    flexDirection: "row",
    backgroundColor: Constants.APP_WHITE_COLOR
  },
  itemText: {
    fontSize: 15,
    fontFamily: Constants.Fonts.REGULAR,
    color: "rgb(142,142,142)",
    margin: 17,
    textAlign: "left"
  },
  itemImage: {
    width: 16,
    height: 16,
    marginEnd: 18,
    marginStart: 40,
    alignSelf: "center"
  },
  line: {
    height: 36,
    width: "100%",
    backgroundColor: Constants.APP_WHITE_COLOR
  },
  actionSheetTitle: {
    color: "rgb(154,154,154)",
    fontSize: 18,
    fontFamily: Constants.Fonts.REGULAR
  }
});

export default styles;
