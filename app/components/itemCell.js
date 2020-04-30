/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on March 18, 2020
 * item Cell -
 */

import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState, Component } from "react";
import Constants from "../config/constants";
import Images from "../config/images";
import {
  normalizedHeight,
  normalizedWidth,
  showSingleAlert,
  showSimpleSnackbar,
} from "../config/common";
import { translate } from "../config/languageSwitching/index";

import ImageLoader from "react-native-image-progress";
let colorName = [];
let sizeName = [];
const KeyText = ({ itemKey, itemValue, keylabel, currency }) => {
  let value =
    itemKey === "TOTAL PRICE" || itemKey === "Unit Price"
      ? keylabel + " " + currency
      : keylabel;
  return (
    <View
      style={{
        marginTop: 10,
        flexDirection: "row",
        // justifyContent: 'flex-start',
      }}
    >
      <View style={{ width: "40%" }}>
        <Text
          style={{
            fontSize: 13,
            fontFamily: Constants.Fonts.REGULAR,
            color:
              itemKey === "TOTAL PRICE"
                ? Constants.APP_BLACK_COLOR
                : Constants.APP_GRAY_COLOR3,
            textAlign: "left",
          }}
        >
          {itemValue}
        </Text>
      </View>
      <View style={{ width: "50%", height: 20 }}>
        <Text
          style={{
            fontSize: 13,
            fontFamily:
              itemKey === "TOTAL PRICE"
                ? Constants.Fonts.MEDIUM
                : Constants.Fonts.REGULAR,
            textAlign: "left",
            color:
              itemKey === "TOTAL PRICE"
                ? Constants.APP_THEME_COLOR
                : Constants.APP_GRAY_COLOR3,
          }}
        >
          {value}
        </Text>
      </View>
    </View>
  );
};

const QuantityControl = ({ quantiryItem, getQuantity, updateCartProduct }) => {
  const [quantityValue, setQuantity] = useState(quantiryItem.qty);

  function incrementQuantity() {
    if (quantityValue >= Constants.MAX_PRODUCT_COUNT) {
      showSimpleSnackbar(
        translate("Product maximum count is") +
          " " +
          Constants.MAX_PRODUCT_COUNT
      );

      // showSingleAlert(
      //   translate('Product maximum count is') +
      //     ' ' +
      //     Constants.MAX_PRODUCT_COUNT,
      // );
      return;
    }

    setQuantity(quantityValue + 1);
    getQuantity(quantityValue + 1);
    updateCartProduct(quantityValue + 1);
  }
  function decrementQuantity() {
    if (quantityValue - 1 >= 1) {
      setQuantity(quantityValue - 1);
      getQuantity(quantityValue - 1);
      updateCartProduct(quantityValue - 1);
    }
  }
  return (
    <View style={{ flexDirection: "row", marginTop: 15, alignItems: "center" }}>
      <TouchableOpacity
        onPress={decrementQuantity}
        style={{
          borderWidth: 1,
          borderColor: Constants.APP_GREY_TEXT_COLOR,
          width: 20,
          height: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: Constants.APP_GREY_TEXT_COLOR,
            fontFamily: Constants.Fonts.REGULAR,
          }}
        >
          -
        </Text>
      </TouchableOpacity>
      <TextInput
        style={{
          marginHorizontal: 14,
          width: 30,
          textAlign: "center",
          paddingVertical: 0,
          fontSize: 16,
          fontFamily: Constants.Fonts.MEDIUM,
          color: Constants.APP_BLACK_COLOR,
        }}
        value={quantityValue.toString()}
      />

      <TouchableOpacity
        onPress={incrementQuantity}
        style={{
          // marginLeft: 10,
          borderWidth: 1,
          borderColor: Constants.APP_GREY_TEXT_COLOR,
          width: 20,
          height: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: Constants.APP_GREY_TEXT_COLOR,
            fontFamily: Constants.Fonts.REGULAR,
          }}
        >
          +
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const ItemCell = React.memo(
  ({
    item,
    index,
    productsColors,
    productsSizes,
    addProductToWishList,
    allowAddOption,
    showQuantity,
    currency,
    updateCartProductToParent,
    totalCost,
    itemTotalCost,
  }) => {
    function removeFromCart() {}

    function addToWishList() {
      addProductToWishList(item);
    }

    function updateCartProduct(qty) {
      updateCartProductToParent(qty, item, index);
    }

    const totalProductGross = item.price * item.qty;
    const [totalGross, setTotalGross] = useState(totalProductGross);

    function getQuantity(quantityValue) {
      setTotalGross(quantityValue * item.price);
    }
    console.log("item inside", item);

    if (item.product_option && item.product_option.extension_attributes) {
      const attributesColor = item.product_option.extension_attributes.configurable_item_options.filter(
        (color) => {
          return color.option_id === "93";
        }
      );
      const attributesSize = item.product_option.extension_attributes.configurable_item_options.filter(
        (size) => {
          return size.option_id === "178";
        }
      );
      const colorID = attributesColor[0].option_value.toString();
      const sizeID = attributesSize[0].option_value.toString();

      colorName = productsColors.filter((item) => {
        return colorID === item.value;
      });
      sizeName = productsSizes.filter((item) => {
        return sizeID === item.value;
      });
      console.log("colorName,sizename \n", colorName, sizeName);
    } else {
      colorName = [];
      sizeName = [];
    }

    const imageSource =
      item.extension_attributes && item.extension_attributes.image
        ? { uri: Constants.APP_S3_BASE_URL + item.extension_attributes.image }
        : Images.placeHolderProduct;

    let unitPrice = item.price;

    let total = totalGross;

    if (totalCost && totalCost.items) {
      totalCost.items.map((dataItem, index) => {
        if (dataItem.item_id === item.item_id) {
          unitPrice = dataItem.price_incl_tax;
          total = dataItem.row_total;
        }
      });
    }

    if (itemTotalCost) {
      total = itemTotalCost;
    }

    return (
      <View
        style={{ marginTop: 0, backgroundColor: Constants.APP_WHITE_COLOR }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            padding: 10,
          }}
        >
          <Image
            source={imageSource}
            defaultSource={Images.placeHolderProduct}
            style={{
              width: 83, //normalizedWidth(102),
              height: 104, //normalizedWidth(143),
              borderRadius: 5,
              borderWidth: 0.5,
              borderColor: Constants.APP_GRAY_COLOR,
            }}
          />
          <View style={{ marginHorizontal: 20 }}>
            <Text
              multiline={true}
              numberOfLines={0}
              style={{
                flex: 1,
                fontFamily: Constants.Fonts.MEDIUM,
                fontSize: 15,
                color: Constants.APP_BLACK_COLOR,
                textAlign: "left",
              }}
            >
              {item.name}
            </Text>

            <View style={{ flex: 1 }}>
              {colorName.length > 0 && (
                <View
                  style={{
                    flexDirection: "row",
                    height: 30,
                    alignItems: "center",
                  }}
                >
                  <View style={{ width: 30 }}>
                    <Image
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                      }}
                      source={{
                        uri:
                          Constants.APP_S3_BASE_URL + colorName[0].image_code,
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: 13,
                      fontFamily: Constants.Fonts.REGULAR,
                      color: Constants.APP_GRAY_COLOR3,
                      textAlign: "left",
                      marginLeft: 10,
                    }}
                  >
                    {colorName[0].label}
                  </Text>
                </View>
              )}
              {sizeName.length > 0 && (
                // <KeyText
                //   itemKey={translate("Size")}
                //   keylabel={sizeName[0].label}
                //   currency={currency}
                // />
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      fontSize: 13,
                      fontFamily: Constants.Fonts.REGULAR,
                      color: Constants.APP_THEME_COLOR,
                      textAlign: "left",
                      width: 30,
                    }}
                  >
                    {sizeName[0].label}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: Constants.Fonts.REGULAR,
                      textAlign: "left",
                      color: Constants.APP_GRAY_COLOR3,
                      marginLeft: 10,
                    }}
                  >
                    {translate("Size")}
                  </Text>
                </View>
              )}

              {/* {showQuantity && (
                <KeyText
                  itemKey={translate("Quantity")}
                  keylabel={item.qty}
                  currency={currency}
                />
              )} */}
              <KeyText
                itemKey={"Unit Price"}
                itemValue={translate("Unit Price")}
                keylabel={unitPrice}
                currency={currency}
              />
              <KeyText
                itemKey={"TOTAL PRICE"}
                itemValue={translate("TOTAL PRICE")}
                keylabel={total.toFixed(2)}
                currency={currency}
              />
            </View>

            {/* {allowAddOption && (
              <QuantityControl
                quantiryItem={item}
                getQuantity={getQuantity}
                updateCartProduct={updateCartProduct}
              />
            )} */}
          </View>
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({});

export default ItemCell;
