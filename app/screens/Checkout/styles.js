/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on March 18, 2020
 * Checkout style -
 */

import { StyleSheet } from "react-native";
import AppStyles from "../../config/styles";
import Constants from "../../config/constants";
import { normalizedHeight, normalizedWidth } from "../../config/common";

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: AppStyles.color.COLOR_WHITE
  },
  container: {
    backgroundColor: "rgb(241,243,246)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  searchContainer: {
    height: 44,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Constants.APP_WHITE_COLOR
  },
  titleText: {
    fontSize: 15,
    fontFamily: Constants.Fonts.REGULAR,
    flex: 1,
    textAlign: "left",
    marginLeft: 30,
    color: Constants.APP_GRAY_COLOR3
  },
  separatorView: {
    height: 10,
    backgroundColor: Constants.APP_GRAY_COLOR2
  },
  searchButton: {
    width: 60,
    alignItems: "center",
    justifyContent: "center"
  },
  searchHistoryText: {
    fontFamily: Constants.Fonts.REGULAR,
    fontSize: 14,
    color: Constants.APP_GRAY_COLOR3,
    textAlign: "left",
    marginLeft: 18
  },
  recentSearchTitle: {
    fontFamily: Constants.Fonts.MEDIUM,
    fontSize: 15,
    color: Constants.APP_BLACK_COLOR,
    textAlign: "left",
    flex: 1
  },
  clearButonText: {
    fontFamily: Constants.Fonts.LIGHT,
    fontSize: 15,
    color: Constants.APP_GRAY_COLOR
  },
  searchHistoryTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    marginHorizontal: 20
  },
  addVoucherCode: {
    fontSize: 15,
    fontFamily: Constants.Fonts.BOLD,
    color: Constants.APP_BLACK_COLOR,
    marginVertical: 10,
    textAlign: "left"
  },
  voucherInput: {
    flex: 1,
    fontSize: 13,
    fontFamily: Constants.Fonts.REGULAR,
    color: "rgb(164,164,164)",
    height: 42,
    borderRadius: 5,
    paddingLeft: 10,
    backgroundColor: "rgba(164,164,164,0.16)"
  },
  applyButton: {
    width: normalizedWidth(83),
    height: 42,
    backgroundColor: Constants.APP_BLACK_COLOR,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -10
  },
  applyText: {
    fontSize: 13,
    fontFamily: Constants.Fonts.MEDIUM,
    color: Constants.APP_WHITE_COLOR
  },
  itemCellContainer: {
    marginTop: 5,
    backgroundColor: Constants.APP_WHITE_COLOR,
    flex: 1
  },
  paymentMethodButton: {
    // backgroundColor: "rgb(244,246,248)",
    height: 45,
    alignItems: "center",
    marginBottom: 5,
    flexDirection: "row",

    backgroundColor: Constants.APP_WHITE_COLOR,
    // margin: 20,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "rgba(46,69,187,0.56)",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    borderRadius: 5,
    paddingBottom: 5,
    paddingTop: 5,
    elevation: 3
  },
  paymentOption: {
    marginLeft: 10,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Constants.APP_GRAY_COLOR3
  },
  paymentOption2: {
    width: 14,
    height: 14,
    borderRadius: 7
  },
  paymentText: {
    fontFamily: Constants.Fonts.REGULAR,
    fontSize: 14,
    color: Constants.APP_GRAY_COLOR3,
    marginLeft: 15,
    textAlign: "left",
    marginRight: 5
  },
  addressText: {
    marginVertical: 5,
    fontFamily: Constants.Fonts.REGULAR,
    fontSize: 14,
    color: Constants.APP_GRAY_COLOR3
  },
  titleLabel: {
    marginVertical: 8,
    fontFamily: Constants.Fonts.REGULAR,
    fontSize: 14,
    color: Constants.APP_GRAY_COLOR3,
    textAlign: "left"
  },
  titleValueLabel: {
    flex: 1,
    marginVertical: 5,
    fontFamily: Constants.Fonts.REGULAR,
    fontSize: 14,
    color: Constants.APP_GRAY_COLOR3,
    textAlign: "right"
  },
  bottomButtonContainer: {
    height: normalizedHeight(100),
    width: "100%",
    backgroundColor: Constants.APP_WHITE_COLOR,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  addTocartButton: {
    flex: 1,
    borderRadius: 15,
    height: normalizedHeight(60),
    borderWidth: 1,
    marginLeft: 20,
    marginRight: 10,
    borderColor: Constants.APP_GRAY_COLOR3,
    alignItems: "center",
    justifyContent: "center"
  },
  buyNowButton: {
    borderRadius: normalizedHeight(54 / 2),
    height: normalizedHeight(54),
    marginRight: 20,
    marginLeft: 10,
    backgroundColor: Constants.APP_THEME_COLOR,
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    alignSelf: "center"
  },
  buyNowText: {
    fontFamily: Constants.Fonts.MEDIUM,
    fontSize: 15,
    color: Constants.APP_WHITE_COLOR
  },
  tickSwitch: {
    width: 20,
    height: 20,
    tintColor: Constants.APP_BLACK_COLOR,
    paddingRight: 5
  },
  sameDayDeliveryPickerContainer: {
    height: 70,
    flex: 1,
    marginTop: 10
  },
  deliveryDateText: {
    fontFamily: Constants.Fonts.REGULAR,
    fontSize: 12,
    color: Constants.APP_GRAY_COLOR3
  },
  pickerButton: {
    borderWidth: 1,
    borderColor: Constants.APP_GRAY_COLOR3,
    height: 30,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    width: "80%"
  },
  dateText: {
    fontFamily: Constants.Fonts.REGULAR,
    fontSize: 12,
    color: Constants.APP_GRAY_COLOR3
  },
  shippingAndTotal: {
    backgroundColor: Constants.APP_WHITE_COLOR,
    // margin: 20,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "rgba(46,69,187,0.56)",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    borderRadius: 5,
    paddingBottom: 5,
    paddingTop: 5,
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
    elevation: 3
  }
});

export default styles;
