/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on February 25, 2020
 * Product Cell - Product basic info are display here
 */

import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { Component } from "react";
import Constants from "../config/constants";
import Images from "../config/images";
import { normalizedHeight, normalizedWidth } from "../config/common";
import { translate } from "../config/languageSwitching/index";

import ImageLoader from "react-native-image-progress";

const ProductCell3 = React.memo(
  ({
    data,
    index,
    didSelectAdd,
    didTapOnLikeButton,
    screenWidth,
    numOfColumns,
    currency,
    likeActive,
  }) => {
    let imageUrl = Constants.APP_BASE_URL + "/pub/media/" + data.thumbnail;
    let actualPrice = parseFloat(data.price);
    let finalPrice = data.final_price;
    let itemWidth = Constants.IS_ANDROID
      ? (screenWidth - 32) / numOfColumns
      : (screenWidth - 38) / numOfColumns; //32
    let percentage = Math.floor(
      ((actualPrice - finalPrice) / actualPrice) * 100
    );

    return (
      <TouchableOpacity
        activeOpacity={Constants.ACTIVE_OPACITY}
        style={{
          marginLeft: index == 0 ? 15 : 5,
          margin: 5,
          // height: normalizedHeight(280),
        }}
        onPress={() => {
          didSelectAdd(data);
        }}
      >
        <View
          style={{
            backgroundColor: Constants.APP_WHITE_COLOR,
            borderWidth: 0.5,
            borderColor: Constants.APP_GRAY_COLOR,
            borderRadius: 5,
            height: normalizedHeight(260),
          }}
        >
          <View style={{ overflow: "hidden" }}>
            <ImageLoader
              source={{ uri: imageUrl }}
              resizeMode={"contain"}
              // defaultSource={Images.placeHolderProduct}
              style={{
                // width: 100, //(screenWidth - 32) / numOfColumns, //(Constants.SCREEN_WIDTH - 50) / 2,
                height: normalizedHeight(150),
                marginTop: 20,
              }}
            />

            {/* {data.is_variants && (
              <View style={styles.variantsContainer}>
                <View style={styles.varientView}>
                  <Image
                    source={Images.variants}
                    resizeMode={"contain"}
                    style={{
                      width: 13, //normalizedWidth(13),
                      height: 13, //normalizedWidth(13),
                    }}
                  />
                  <Text style={styles.variantsText}>
                    {translate("variants")}
                  </Text>
                </View>
              </View>
            )} */}
            {/* {!data.is_in_stock && (
              <View style={[styles.overlay, { width: itemWidth - 4 }]} />
            )}
            {!data.is_in_stock && (
              <Text style={styles.outOfStockText}>
                {translate("Out of stock")}
              </Text>
            )} */}
          </View>
          <TouchableOpacity
            onPress={() => {
              didTapOnLikeButton(likeActive);
            }}
            style={styles.wishListContainer}
          >
            <Image
              source={Images.likeImage}
              resizeMode={"contain"}
              style={{
                width: 15,
                height: 15,
                tintColor: likeActive ? Constants.APP_THEME_COLOR2 : null,
              }}
            />
          </TouchableOpacity>
          <View
            style={{
              // backgroundColor: "red",
              position: "absolute",
              left: 5,
              right: 5,
              bottom: 5,
              flex: 1,
            }}
          >
            <Text style={[styles.productName]}>{data.name}</Text>
            <View style={{ flexDirection: "row", marginTop: 5 }}>
              <Text style={[styles.cost]}>{finalPrice + " " + currency}</Text>
              {actualPrice !== finalPrice && (
                <Text style={styles.offerText}>
                  {actualPrice + " " + currency}
                </Text>
              )}
            </View>
          </View>
          {percentage > 0 && (
            <View
              style={{
                // height: 20,
                backgroundColor: Constants.APP_BLACK_COLOR,
                position: "absolute",
                top: 10,
                left: 10,
                borderRadius: 3,
              }}
            >
              <Text style={styles.offerTextPercent}>
                {percentage + "% OFF"}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  productName: {
    fontFamily: Constants.Fonts.REGULAR,
    fontSize: 14,
    color: Constants.APP_BLACK_COLOR,
    marginTop: 5,
    marginHorizontal: 3,
    textAlign: "left",
  },
  outOfStockText: {
    color: "rgb(181,24,24)",
    position: "absolute",
    width: "93%",
    fontSize: 16,
    fontFamily: Constants.Fonts.MEDIUM,
    textAlign: "center",
    textAlignVertical: "center",
    height: normalizedHeight(36),
    alignSelf: "center",
    backgroundColor: "rgba(255,255,255,0.7)",
    bottom: normalizedHeight(30),
    elevation: 3,
  },
  overlay: {
    backgroundColor: "rgba(255,255,255, 0.7)",
    position: "absolute",
    top: 0,
    // marginLeft: 3,
    // marginBottom: 5,
    borderRadius: 10,
    right: 5,
    // height: normalizedHeight(298),
    bottom: 0,
    elevation: 3,
  },
  cost: {
    fontFamily: Constants.Fonts.REGULAR,
    fontSize: 12,
    color: Constants.APP_THEME_COLOR,
    flex: 1,
    marginStart: 3,
    textAlign: "left",
  },
  offerText: {
    fontFamily: Constants.Fonts.REGULAR,
    fontSize: 12,
    color: Constants.APP_GRAY_COLOR3,
    textDecorationLine: "line-through",
    // marginRight: 20,
    // flex: 1,
  },
  offerTextPercent: {
    fontFamily: Constants.Fonts.REGULAR,
    fontSize: 12,
    color: Constants.APP_WHITE_COLOR,
    margin: 2,
    // marginRight: 20,
    // flex: 1,
  },
  wishListContainer: {
    width: 26, //normalizedWidth(26),
    height: 26, //normalizedWidth(26),
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0)",
    borderRadius: 26 / 2, //normalizedWidth(26) / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  variantsContainer: {
    // width: normalizedWidth(26),
    // height: normalizedWidth(26),
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    backgroundColor: "transparent",
    borderRadius: 26 / 2, //normalizedWidth(26) / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  varientView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(244,246,248,1)",
    height: 18, //normalizedHeight(20),
    width: 70, //normalizedWidth(75),
    borderRadius: 18 / 2, // normalizedHeight(20) / 2,
    borderWidth: 0.5,
    borderColor: "rgba(110,110,110,0.3)",
  },
  variantsText: {
    fontFamily: Constants.Fonts.REGULAR,
    fontSize: 10,
    color: Constants.APP_GRAY_COLOR3,
    marginLeft: 5,
  },
});

export default ProductCell3;
