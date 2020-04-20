/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on February 12, 2020
 * LoginScreen - LoginScreen Styles
 */

import {StyleSheet, I18nManager} from 'react-native';
import Constants from '../../config/constants';
import {normalizedHeight, normalizedWidth} from '../../config/common';

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: Constants.SCREEN_HEIGHT + 50,
  },
  overlay: {
    position: 'absolute',
    opacity: 0.88,
    backgroundColor: '#2A2A2A',
    width: '100%',
    height: '100%',
  },
  logoContainer: {
    width: '100%',
    height: '90%',
    justifyContent: 'center',
    position: 'absolute',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  appLogo: {
    width: '60%',
    height: '60%',
    alignSelf: 'center',
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'column',
    borderTopStartRadius: 15,
    borderTopEndRadius: 15,
    marginTop: -15,
    backgroundColor: '#ffffff',
  },
  loginText: {
    color: 'rgb(42,42,42)',
    fontSize: 20,
    marginTop: 18,
    marginHorizontal: 22,
    marginBottom: 14,
    alignSelf: 'flex-start',
    fontFamily: Constants.Fonts.MEDIUM,
  },
  uline: {
    backgroundColor: 'rgb(42,42,42)',
    height: 2,
    width: 145,
  },
  guestText: {
    color: 'rgb(42,42,42)',
    fontSize: 20,
    marginTop: 18,
    marginHorizontal: 22,
    marginBottom: 14,
    alignSelf: 'flex-end',
    fontFamily: Constants.Fonts.MEDIUM,
  },
  gradient: {
    marginTop: 25,
    height: normalizedHeight(51),
    width: '91%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontFamily: Constants.Fonts.REGULAR,
  },
  footerContainer: {
    flexDirection: 'row',
    marginTop: 14,
    alignSelf: 'center',
  },
  forgotPassword: {
    fontSize: 16,
    color: 'rgb(164, 164, 164)',
    fontFamily: Constants.Fonts.REGULAR,
  },
  signup: {
    marginStart: 18,
    fontSize: 16,
    color: 'rgb(42, 42, 42)',
    textDecorationLine: 'underline',
    fontFamily: Constants.Fonts.REGULAR,
  },
  or: {
    fontSize: 16,
    margin: 26,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: 'rgb(42,42,42)',
    fontFamily: Constants.Fonts.MEDIUM,
  },
  buttonHalf: {
    borderWidth: 1,
    borderColor: 'rgb(164, 164, 164)',
    borderRadius: 15,
    width: '48%',
    height: normalizedHeight(48),
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonFull: {
    borderWidth: 1,
    borderColor: 'rgb(164, 164, 164)',
    borderRadius: 15,
    width: '91%',
    height: normalizedHeight(48),
    marginTop: 24,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialLogo: {
    width: normalizedWidth(17),
    height: normalizedWidth(17),
    alignSelf: 'center',
  },
  socialName: {
    fontSize: 16,
    marginStart: 12,
    color: 'rgb(42,42,42)',
    fontFamily: Constants.Fonts.MEDIUM,
  },
  tabContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },

  safeContainer: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    marginBottom: 34,
    marginStart: 32,
    fontWeight: 'bold',
    color: '#1c385c',
  },
  containerHalf: {
    flexDirection: 'row',
    width: '91%',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  inputContainerHalf: {
    borderWidth: 1,
    borderColor: 'rgb(164, 164, 164)',
    borderRadius: 15,
    //width: '48%',
    height: normalizedHeight(48),
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainerFull: {
    borderWidth: 1,
    borderColor: 'rgb(164, 164, 164)',
    borderRadius: 15,
    width: '91%',
    height: normalizedHeight(48),
    marginTop: 10,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
  },
  inputs: {
    height: normalizedHeight(45),
    margin: 14,
    borderBottomColor: '#FFFFFF',
    flex: 1,
    color: 'rgb(164, 164,164)',
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    fontFamily: Constants.Fonts.LIGHT,
  },
  rowContainer: {
    flexDirection: 'row',
    marginTop: 18,
    alignSelf: 'center',
  },
  errorText: {
    marginHorizontal: 24,
    height: normalizedHeight(20),
    fontSize: 12,
    marginTop: 4,
    textAlign: 'left',
    color: 'red',
  },
  closeButtonView: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  passwordModalWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  passwordCardWrapper: {
    backgroundColor: 'rgb(255,255,255)',
    borderRadius: 15,
    width: '94%',
  },
  forgotPwdTxt: {
    margin: 22,
    fontFamily: Constants.Fonts.MEDIUM,
    alignSelf: 'center',
    color: 'rgb(42,42,42)',
    fontSize: 17,
  },
  pwdSubmitWrapper: {
    flexDirection: 'row',
    width: '91%',
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    marginTop: 32,
    marginBottom: 26,
  },
  pwdCancelWrapper: {
    height: normalizedHeight(40),
    width: '45%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 13,
    borderWidth: 1,
    borderColor: 'rgb(112,112,112)',
  },
  pwdCancelTxt: {
    fontFamily: Constants.Fonts.MEDIUM,
    color: 'rgb(42,42,42)',
  },
  pwdSubmitBtnWrapper: {
    height: normalizedHeight(40),
    width: '45%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 13,
    backgroundColor: 'rgb(42,42,42)',
  },
  pwdSubmitTxt: {
    fontFamily: Constants.Fonts.MEDIUM,
    color: 'rgb(219,184,90)',
  },
  termsWrapper: {
    flexDirection: 'row',
    marginTop: 36,
    alignItems: 'center',
    marginStart: normalizedWidth(30),
  },
  termsTick: {
    width: 18,
    height: 18,
    alignSelf: 'center',
  },
  termsText: {
    marginStart: 12,
    fontSize: 13,
    textAlign: 'left',
    color: 'rgb(120, 120, 120)',
    fontFamily: Constants.Fonts.REGULAR,
  },
  termsTextColored: {
    fontSize: 13,
    textAlign: 'left',
    color: 'rgb(100, 171, 235)',
    fontFamily: Constants.Fonts.REGULAR,
  },
});

export default styles;
