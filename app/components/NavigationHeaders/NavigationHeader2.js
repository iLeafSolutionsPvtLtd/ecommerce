/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on February 17, 2020
 * NavigationHeader - Navigation header component.
 */

import styles from "./styles";
import React, { Component } from "react";
import Images from "../../config/images";
import Constants from "../../config/constants";
import { View, TouchableOpacity, Image, Text } from "react-native";
import { normalizedHeight, normalizedWidth } from "../../config/common";

class NavigationHeader1 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      title,
      didTapOnSearch,
      didTapOnCart,
      hideBottomLine,
      didTapOnFlag,
      isShowFlag,
      isDark,
      showBackButton,
      didTapOnBackButton,
      showFilter,
      didTapOnFilter,
      isRTL,
      showShare,
      resetButton,
      didTapOnReset,
      hideSearch,
      didTapOnShare,
      showCart,
      countryFlag,
      cartItemsCount,
      isFilterApplied,
    } = this.props;
    return (
      <View>
        <View
          style={[
            styles.container,
            {
              backgroundColor: isDark
                ? Constants.APP_BLACK_COLOR
                : Constants.APP_WHITE_COLOR,
              borderBottomWidth: hideBottomLine ? 0 : 1,
            },
          ]}
        >
          <View style={{ height: 40, justifyContent: "center" }}>
            {showBackButton ? (
              <TouchableOpacity
                onPress={didTapOnBackButton && didTapOnBackButton}
                hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}
              >
                <Image
                  source={Images.backButton}
                  resizeMode={"contain"}
                  style={{
                    marginLeft: 20,
                    width: 17,
                    height: 17,
                    transform: [{ rotate: isRTL ? "180deg" : "0deg" }],
                  }}
                />
              </TouchableOpacity>
            ) : (
              // <Image
              //   source={Images.logo}
              //   resizeMode={'contain'}
              //   style={{
              //     marginLeft: 20,
              //     width: 150,
              //     height: 40,
              //   }}
              // />
              <Text
                style={{
                  marginLeft: 20,
                  fontFamily: Constants.Fonts.BOLD,
                  fontSize: 18,
                  color: Constants.APP_BLACK_COLOR,
                }}
              >
                E Commerce
              </Text>
            )}
          </View>
          {title && title.length > 0 ? (
            <Text style={styles.titleText}>{title}</Text>
          ) : (
            <Text style={styles.titleText}>{""}</Text>
          )}
          {showFilter && (
            <TouchableOpacity
              style={{
                height: 40,
                width: 35,
                alignItems: "center",
                justifyContent: "center",
              }}
              hitSlop={{ top: 20, bottom: 20, left: 5, right: 5 }}
              onPress={didTapOnFilter && didTapOnFilter}
            >
              <View
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor:
                    Object.keys(isFilterApplied).length > 1
                      ? Constants.APP_THEME_COLOR
                      : Constants.APP_WHITE_COLOR,
                }}
              >
                <Image
                  source={Images.filter}
                  resizeMode={"cover"}
                  style={{
                    width: 18,
                    height: 18,
                  }}
                />
              </View>
            </TouchableOpacity>
          )}
          {isShowFlag && (
            <TouchableOpacity
              style={{
                height: 40,
                width: 35,
                alignItems: "center",
                justifyContent: "center",
              }}
              hitSlop={{ top: 20, bottom: 20, left: 5, right: 5 }}
              onPress={didTapOnFlag && didTapOnFlag}
            >
              <Image
                source={countryFlag}
                resizeMode={"cover"}
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 18 / 2,
                  borderColor: Constants.APP_GRAY_COLOR2,
                  borderWidth: 1,
                }}
              />
            </TouchableOpacity>
          )}

          {!hideSearch && (
            <TouchableOpacity
              style={{
                height: 40,
                width: 35,
                alignItems: "center",
                justifyContent: "center",
                marginLeft: 10,
              }}
              hitSlop={{ top: 20, bottom: 20, left: 5, right: 5 }}
              onPress={didTapOnSearch && didTapOnSearch}
            >
              <Image
                source={Images.search}
                resizeMode={"center"}
                style={{
                  tintColor: isDark
                    ? Constants.APP_GRAY_COLOR2
                    : Constants.APP_BLACK_COLOR,
                  width: 18,
                  height: 18,
                }}
              />
            </TouchableOpacity>
          )}
          {resetButton && (
            <TouchableOpacity
              style={{
                height: 30,
                width: 60,
                alignItems: "center",
                justifyContent: "center",
                marginRight: 30,
                borderRadius: 15,
                borderWidth: 1,
                borderColor: Constants.APP_BOX_BACKGROUND_GREY,
              }}
              onPress={didTapOnReset && didTapOnReset}
            >
              <Text
                style={{
                  color: Constants.APP_GREY_TEXT_COLOR,
                  fontFamily: Constants.Fonts.REGULAR,
                }}
              >
                RESET
              </Text>
            </TouchableOpacity>
          )}

          {showCart && (
            <TouchableOpacity
              style={{
                height: 40,
                width: 35,
                alignItems: "center",
                justifyContent: "center",
                marginRight: showShare ? 0 : 10,
                marginLeft: 10,
              }}
              hitSlop={{ top: 20, bottom: 20, left: 5, right: 5 }}
              onPress={didTapOnCart && didTapOnCart}
            >
              <Image
                source={Images.cart}
                resizeMode={"contain"}
                style={{
                  tintColor: isDark
                    ? Constants.APP_GRAY_COLOR2
                    : Constants.APP_BLACK_COLOR,
                  width: 18,
                  height: 18,
                }}
              />
              {cartItemsCount > 0 && (
                <View
                  style={{
                    position: "absolute",
                    bottom: 5,
                    right: 0,
                    flex: 1,
                    height: 18,
                    borderRadius: 9,
                    backgroundColor: Constants.APP_THEME_COLOR,
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: 18,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: Constants.Fonts.BOLD,
                      fontSize: 12,
                      color: Constants.APP_BLACK_COLOR,
                    }}
                  >
                    {cartItemsCount}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          )}

          {showShare && (
            <TouchableOpacity
              style={{
                height: 40,
                width: 35,
                alignItems: "center",
                justifyContent: "center",
                marginRight: 10,
                marginLeft: 10,
              }}
              hitSlop={{ top: 20, bottom: 20, left: 5, right: 5 }}
              onPress={didTapOnShare && didTapOnShare}
            >
              <Image
                source={Images.share}
                resizeMode={"contain"}
                style={{
                  tintColor: isDark
                    ? Constants.APP_GRAY_COLOR2
                    : Constants.APP_BLACK_COLOR,
                  width: 18,
                  height: 18,
                }}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}
export default NavigationHeader1;
