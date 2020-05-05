/**
 * Created by Tinoy for iLeaf Solutions Pvt.Ltd
 * on February 19, 2020
 * RegistrationScreen - RegistrationScreen Styles
 */

import { StyleSheet, I18nManager } from "react-native";
import Constants from "../../config/constants";
import { normalizedHeight, normalizedWidth } from "../../config/common";

const styles = StyleSheet.create({
  container: {
    height: Constants.SCREEN_HEIGHT - 30,
    backgroundColor: "rgb(255,255,255)"
  },
  safeContainer: {
    flex: 1
  },
  container2: {
    position: "absolute",
    backgroundColor: "#FCFAF9",
    paddingTop: 24,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(112,112,112,0.25)",
    margin: 14,
    bottom: 0,
    left: 0,
    right: 0
  },
  welcomText: {
    color: "rgb(40,40,40)",
    fontSize: 28,
    marginTop: 136,
    marginStart: 16,
    textAlign: "left",
    alignSelf: "flex-start",
    letterSpacing: 1.4,
    fontFamily: Constants.Fonts.MEDIUM
  },
  girlImage: {
    width: "86%",
    position: "absolute",
    right: "-16%",
    top: "3%"
  },
  blurCard: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  subText: {
    color: "rgb(142,142,142)",
    fontSize: 15,
    marginTop: 65,
    marginStart: 14,
    textAlign: "left",
    alignSelf: "flex-start",
    fontFamily: Constants.Fonts.REGULAR
  },
  containerStyle: {
    marginHorizontal: 12,
    marginTop: 2
  },
  inpuLabelTextStyle: {
    textAlign: "left",
    fontFamily: Constants.Fonts.REGULAR
  },
  forgotPassword: {
    fontSize: 14,
    textAlign: "left",
    color: "rgb(40,40,40)",
    fontFamily: Constants.Fonts.REGULAR
  },
  submitButtonStyle: {
    marginTop: 42,
    marginBottom: 42,
    width: "90%",
    height: 48,
    marginHorizontal: "5%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
    backgroundColor: "rgb(241,73,53)"
  },
  submitText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontFamily: Constants.Fonts.MEDIUM
  },
  footerContainer: {
    flexDirection: "row",
    marginTop: 18,
    alignSelf: "center"
  },
  signup: {
    marginStart: 6,
    fontSize: 14,
    color: "rgb(241,73,53)",
    fontFamily: Constants.Fonts.REGULAR
  },
  forgotPwdinputs: {
    height: normalizedHeight(45),
    margin: 14,
    borderBottomColor: "#FFFFFF",
    flex: 1,
    color: "rgb(164, 164,164)",
    textAlign: I18nManager.isRTL ? "right" : "left",
    fontFamily: Constants.Fonts.LIGHT
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
    alignItems: "center"
  },

  closeButtonView: {
    position: "absolute",
    top: normalizedHeight(10),
    left: 10,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default styles;
