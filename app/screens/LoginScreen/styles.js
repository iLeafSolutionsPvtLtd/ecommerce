/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on February 12, 2020
 * LoginScreen - LoginScreen Styles
 */

import { StyleSheet, I18nManager } from "react-native";
import Constants from "../../config/constants";
import { normalizedHeight, normalizedWidth } from "../../config/common";

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //height: Constants.SCREEN_HEIGHT,
    height: Constants.SCREEN_HEIGHT < 800 ? 700 : 800,
    backgroundColor: "rgb(255,255,255)",
  },
  container2: {
    position: "absolute",
    backgroundColor: "#FCFAF9",
    paddingTop: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(112,112,112,0.25)",
    margin: 14,
    bottom: 0,
    left: 0,
    right: 0,
  },
  welcomText: {
    color: "rgb(40,40,40)",
    fontSize: 28,
    marginTop: 136,
    marginStart: 16,
    textAlign: "left",
    alignSelf: "flex-start",
    letterSpacing: 1.4,
    fontFamily: Constants.Fonts.MEDIUM,
  },
  girlImage: {
    width: "86%",
    position: "absolute",
    right: "-16%",
    top: "4%",
  },
  blurCard: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  subText: {
    color: "rgb(142,142,142)",
    fontSize: 15,
    marginTop: 65,
    marginStart: 14,
    textAlign: "left",
    alignSelf: "flex-start",
    fontFamily: Constants.Fonts.REGULAR,
  },
  containerStyle: {
    marginHorizontal: 12,
    marginTop: 8,
  },
  inpuLabelTextStyle: {
    textAlign: "left",
    fontFamily: Constants.Fonts.REGULAR,
  },
  forgotPassword: {
    fontSize: 14,
    textAlign: "left",
    color: "rgb(40,40,40)",
    fontFamily: Constants.Fonts.REGULAR,
  },
  submitButtonStyle: {
    marginTop: 32,
    width: "90%",
    height: 47,
    marginHorizontal: "5%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
    backgroundColor: "rgb(241,73,53)",
  },
  submitText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontFamily: Constants.Fonts.MEDIUM,
  },
  footerContainer: {
    flexDirection: "row",
    marginTop: 18,
    alignSelf: "center",
  },
  signup: {
    marginStart: 6,
    fontSize: 14,
    color: "rgb(241,73,53)",
    fontFamily: Constants.Fonts.REGULAR,
  },
  guestButton: {
    marginTop: 8,
    marginBottom: 26,
    fontSize: 13,
    color: "rgb(241,73,53)",
    textDecorationLine: "underline",
    fontFamily: Constants.Fonts.MEDIUM,
  },
  forgotPwdinputs: {
    height: normalizedHeight(45),
    margin: 14,
    borderBottomColor: "#FFFFFF",
    flex: 1,
    color: "rgb(164, 164,164)",
    textAlign: I18nManager.isRTL ? "right" : "left",
    fontFamily: Constants.Fonts.LIGHT,
  },
  inputContainerFull: {
    borderWidth: 1,
    borderColor: "rgb(164, 164, 164)",
    borderRadius: 15,
    width: "91%",
    height: normalizedHeight(48),
    marginTop: 10,
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
  },

  safeContainer: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    marginBottom: 34,
    marginStart: 32,
    fontWeight: "bold",
    color: "#1c385c",
  },

  errorText: {
    marginHorizontal: 24,
    height: normalizedHeight(20),
    fontSize: 12,
    marginTop: 4,
    textAlign: "left",
    color: "red",
  },
  closeButtonView: {
    position: "absolute",
    top: 10,
    left: 10,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  passwordModalWrapper: {
    //flex: 1,
    width: Constants.SCREEN_WIDTH,
    height: Constants.SCREEN_HEIGHT,
    paddingHorizontal: 5,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
  passwordCardWrapper: {
    backgroundColor: "rgb(255,255,255)",
    borderRadius: 15,
    width: "94%",
  },
  forgotPwdTxt: {
    margin: 22,
    fontFamily: Constants.Fonts.MEDIUM,
    alignSelf: "center",
    color: "rgb(42,42,42)",
    fontSize: 17,
  },
  pwdSubmitWrapper: {
    flexDirection: "row",
    width: "91%",
    alignSelf: "center",
    justifyContent: "space-evenly",
    marginTop: 32,
    marginBottom: 26,
  },
  pwdCancelWrapper: {
    height: normalizedHeight(40),
    width: "45%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "rgb(112,112,112)",
  },
  pwdCancelTxt: {
    fontFamily: Constants.Fonts.MEDIUM,
    color: "rgb(42,42,42)",
  },
  pwdSubmitBtnWrapper: {
    height: normalizedHeight(40),
    width: "45%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 13,
    backgroundColor: "rgb(241,73,53)",
  },
  pwdSubmitTxt: {
    fontFamily: Constants.Fonts.MEDIUM,
    color: "rgb(255,255,255)",
  },
  termsWrapper: {
    flexDirection: "row",
    marginTop: 36,
    alignItems: "center",
    marginStart: normalizedWidth(30),
  },
  termsTick: {
    width: 18,
    height: 18,
    alignSelf: "center",
  },
  termsText: {
    marginStart: 12,
    fontSize: 13,
    textAlign: "left",
    color: "rgb(120, 120, 120)",
    fontFamily: Constants.Fonts.REGULAR,
  },
  termsTextColored: {
    fontSize: 13,
    textAlign: "left",
    color: "rgb(100, 171, 235)",
    fontFamily: Constants.Fonts.REGULAR,
  },
});

export default styles;
