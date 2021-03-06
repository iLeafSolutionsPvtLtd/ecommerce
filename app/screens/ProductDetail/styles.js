/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on February 19, 2020
 * Cart styles -
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
    backgroundColor: AppStyles.color.COLOR_WHITE,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  wishListContainer: {
    width: normalizedWidth(37),
    height: normalizedWidth(37),
    // position: "absolute",
    // top: 0, //normalizedWidth(10),
    // right: 0,
    backgroundColor: "rgba(255,255,255,0.0)",
    borderRadius: normalizedWidth(37) / 2,
    alignItems: "center",
    justifyContent: "center"
  },
  imageRottationContainer: {
    width: normalizedWidth(41),
    height: normalizedWidth(20),
    position: "absolute",
    bottom: normalizedWidth(25),
    right: normalizedWidth(20),
    backgroundColor: "rgba(255,255,255,1.0)",
    borderRadius: normalizedWidth(20) / 2,
    alignItems: "center",
    justifyContent: "center"
  },
  pagerContainer: {
    position: "absolute",
    bottom: 25,
    left: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  pagerItem: {
    width: 7,
    height: 7,
    backgroundColor: "rgba(255,255,255,0.3)",
    margin: 2,
    borderRadius: 3.5
  },
  likeButtonImage: {
    width: 46, //normalizedWidth(30),
    height: 46 // normalizedWidth(25),
    // tintColor: Constants.APP_RED_COLOR,
  },
  scrollContainer: {
    backgroundColor: Constants.APP_GRAY_COLOR2
  },
  watchVideoContainer: {
    height: normalizedHeight(70),
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: Constants.APP_WHITE_COLOR
  },
  videoText: {
    fontFamily: Constants.Fonts.MEDIUM,
    fontSize: 13,
    color: Constants.APP_BLACK_COLOR,
    marginLeft: 10
  },
  productInfoContainer: {
    // marginTop: 5,
    backgroundColor: Constants.APP_WHITE_COLOR
  },
  productInfoText: {
    fontSize: 15,
    fontFamily: Constants.Fonts.MEDIUM,
    color: Constants.APP_BLACK_COLOR,
    marginHorizontal: 20,
    marginTop: 5,
    marginBottom: 10,
    textAlign: "left"
  },
  productCostContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
    // marginVertical: 15,
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center"
  },
  productCost: {
    // flex: 1,
    fontSize: 15,
    fontFamily: Constants.Fonts.MEDIUM,
    color: "rgb(203,39,100)"
  },
  productCostOffer: {
    fontSize: 15,
    fontFamily: Constants.Fonts.REGULAR,
    color: Constants.APP_GRAY_COLOR3,
    marginLeft: 15,
    textDecorationLine: "line-through",
    textDecorationStyle: "solid"
  },
  productCostOfferPercantage: {
    fontSize: 12,
    fontFamily: Constants.Fonts.REGULAR,
    color: Constants.APP_GRAY_COLOR3,
    marginLeft: 15
  },
  chooseColorContainer: {
    // marginTop: 5,
    backgroundColor: Constants.APP_WHITE_COLOR
  },
  sectionTitle: {
    flex: 1,
    fontSize: 15,
    fontFamily: Constants.Fonts.MEDIUM,
    color: Constants.APP_BLACK_COLOR,
    marginLeft: 20,
    marginTop: 10,
    textAlign: "left"
  },
  sizeChart: {
    fontSize: 15,
    fontFamily: Constants.Fonts.REGULAR,
    color: Constants.APP_BLACK_COLOR,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    textAlign: "left"
  },
  sizeText: {
    fontSize: 13,
    fontFamily: Constants.Fonts.REGULAR,
    color: Constants.APP_BLACK_COLOR
  },
  quantityContainer: {
    flexDirection: "row",
    marginLeft: 20,
    marginVertical: 10
  },
  quantityButton: {
    width: 21,
    height: 21,
    borderWidth: 1,
    borderColor: Constants.APP_GRAY_COLOR3,
    alignItems: "center",
    justifyContent: "center"
  },
  quantityButtonText: {
    fontSize: 15,
    fontFamily: Constants.Fonts.BOLD,
    color: Constants.APP_GRAY_COLOR3
  },
  countText: {
    fontSize: 18,
    fontFamily: Constants.Fonts.MEDIUM,
    color: Constants.APP_BLACK_COLOR,
    marginHorizontal: 20
  },
  productDescription: {
    marginHorizontal: 20,
    marginVertical: 10,
    fontSize: 13,
    fontFamily: Constants.Fonts.REGULAR,
    color: Constants.APP_GRAY_COLOR3,
    lineHeight: 22,
    textAlign: "left"
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
    borderRadius: normalizedHeight(54 / 2),
    height: normalizedHeight(54),
    borderWidth: 1,
    marginLeft: 20,
    marginRight: 10,
    borderColor: Constants.APP_THEME_COLOR,
    alignItems: "center",
    justifyContent: "center"
  },
  buyNowButton: {
    flex: 1,
    borderRadius: normalizedHeight(54 / 2),
    height: normalizedHeight(54),
    marginRight: 20,
    marginLeft: 10,
    backgroundColor: Constants.APP_THEME_COLOR,
    alignItems: "center",
    justifyContent: "center"
  },
  addToCartText: {
    fontFamily: Constants.Fonts.REGULAR,
    fontSize: 15,
    color: Constants.APP_THEME_COLOR
  },
  buyNowText: {
    fontFamily: Constants.Fonts.MEDIUM,
    fontSize: 15,
    color: Constants.APP_WHITE_COLOR
  },
  sizeChartView: {
    position: "absolute",
    top: 10,
    left: 0,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  sizeChartImageView: {
    width: Constants.SCREEN_WIDTH - 20,
    height: Constants.SCREEN_WIDTH - 20
  },
  sizeChartContainerView: {
    flex: 1,
    backgroundColor: Constants.APP_TRANSPARENT_COLOR,
    alignItems: "center",
    justifyContent: "center"
  },
  curveView: {
    position: "absolute",
    left: -1,
    right: -1,
    height: 50,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderColor: Constants.APP_GRAY_COLOR,
    borderWidth: 1,
    borderBottomColor: Constants.APP_TRANSPARENT_COLOR
  },
  quantityControlContainer: {
    flexDirection: "row",
    height: 30,
    width: 100,
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
    borderColor: Constants.APP_GRAY_COLOR
  },
  incrementButton: {
    width: "30%",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderRightColor: Constants.APP_GRAY_COLOR
  },
  quantityText: {
    width: "40%",
    textAlign: "center",
    fontSize: 16,
    height: 50,
    fontFamily: Constants.Fonts.MEDIUM,
    color: Constants.APP_BLACK_COLOR
  },
  quantityButtonTitle: {
    color: Constants.APP_GREY_TEXT_COLOR,
    fontFamily: Constants.Fonts.REGULAR,
    fontSize: 16
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
    borderBottomColor: Constants.APP_BOX_BACKGROUND_GREY
    // backgroundColor:Constants.APP_BOX_BACKGROUND_GREY
  }
});

export default styles;
