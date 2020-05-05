/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on February 19, 2020
 * CategoriesView - Categories and subcategories list
 */

import styles from "./styles";
import React, { Component } from "react";
import Constants from "../../config/constants";
import {
  View,
  SafeAreaView,
  Dimensions,
  StatusBar,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import NavigationHeader2 from "../../components/NavigationHeaders/NavigationHeader2";
import { FlatList } from "react-native-gesture-handler";
import Images from "../../config/images";
import ImageLoader from "react-native-image-progress";
import { normalizedHeight, normalizedWidth } from "../../config/common";
import { translate } from "../../config/languageSwitching/index";

const isPotrait = () => {
  const { width, height } = Dimensions.get("window");
  return height >= width;
};

class CategoriesView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialIndex: 1,
      renderSubCategories: [],
      selectedTitle: "",
      orientation: isPotrait() ? "potrait" : "landscape",
      headerCategories: props.categoryLists,
    };
    Dimensions.addEventListener("change", () => {
      this.setState({ orientation: isPotrait() ? "potrait" : "landScape" });
    });
  }

  _didTapOnSearch = () => {
    this.props.navigation.navigate("Search");
  };

  _didTapOnCart = () => {
    this.props.navigation.navigate("Cart");
  };

  didTapOnItem = (item, selectedindex) => {
    this.state.headerCategories.map((item, index) => {
      if (index === selectedindex) {
        item.selected = true;
      } else {
        item.selected = false;
      }
      return item;
    });
    console.log("item", item);
    this.setState({
      renderSubCategories: item.subCategories,
      selectedTitle: item.title,
    });
  };

  componentDidMount() {
    this.state.headerCategories.map((item, index) => {
      if (index === 0) {
        item.selected = true;
      } else {
        item.selected = false;
      }
      return item;
    });
    this.setState({
      renderSubCategories: this.state.headerCategories[0].subCategories || [],
      selectedTitle: this.state.headerCategories[0].title || "",
    });
  }

  render() {
    const { renderSubCategories, headerCategories } = this.state;
    const { cartArray } = this.props;
    console.log(
      Constants.APP_S3_BASE_URL +
        headerCategories[1].home_image.replace("/pub/media/", ""),
      "headerCategories"
    );
    return (
      <SafeAreaView style={styles.safeContainer}>
        <StatusBar
          hidden={false}
          backgroundColor={Constants.APP_WHITE_COLOR}
          // translucent={false}
        />
        <NavigationHeader2
          hideSearch
          hideBottomLine
          // didTapOnFlag={this._didTapOnFlag}
          // didTapOnSearch={this._didTapOnSearch}
          didTapOnCart={this._didTapOnCart}
          isShowFlag={false}
          isDark={false}
          showCart={true}
          cartItemsCount={cartArray.length}
        />
        <Text style={styles.titleStyle}>{translate("Categories")}</Text>
        <View
          style={{
            paddingTop: normalizedHeight(10),
            paddingBottom: normalizedHeight(16),
            backgroundColor: Constants.APP_WHITE_COLOR,
          }}
        >
          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={headerCategories}
            // style={{ paddingHorizontal: 20 }}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                activeOpacity={Constants.ACTIVE_OPACITY}
                onPress={() => this.didTapOnItem(item, index)}
                style={{
                  alignItems: "center",
                  paddingHorizontal: normalizedWidth(14),
                  marginLeft: index == 0 ? 10 : 0,
                  marginRight: index == headerCategories.length - 1 ? 10 : 0,
                }}
              >
                <View
                  style={{
                    marginVertical: 7,
                  }}
                >
                  <ImageLoader
                    source={{
                      uri:
                        Constants.APP_S3_BASE_URL +
                        item.home_image.replace("/pub/media/", ""),
                    }}
                    style={{
                      overflow: "hidden",
                      width: normalizedWidth(82),
                      height: normalizedWidth(82),
                      borderRadius: 5,
                      borderWidth: item.selected ? 4 : 0,
                      borderWidth: 0.5,
                      borderColor: item.selected
                        ? Constants.APP_THEME_COLOR
                        : Constants.APP_GRAY_COLOR,
                    }}
                  />
                </View>
                <Text
                  style={
                    item.selected
                      ? styles.categorySelectedTitle
                      : styles.categoryTitle
                  }
                >
                  {item.title}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
        <View
          style={{
            flex: 1,
            // padding: 12,
            backgroundColor: "rgba(255,255,255,0.9)",
          }}
        >
          <FlatList
            data={renderSubCategories}
            extraData={this.state}
            renderItem={this.renderSubCategories}
            style={{ marginHorizontal: 20, marginTop: 10 }}
            // numColumns={3}
          />
        </View>
      </SafeAreaView>
    );
  }

  renderSubCategories = ({ item, index }) => {
    const imagesUri =
      Constants.APP_S3_BASE_URL +
      item.home_page_slider_image.replace("/pub/media/", "");
    console.log("images uri ... ", imagesUri);
    return (
      //
      <View
        style={{
          marginTop: 20,
          height: 130,
        }}
      >
        <TouchableOpacity
          style={{ justifyContent: "center" }}
          onPress={() => this.navigateProductDetail(index)}
        >
          <View
            style={{
              height: 98,
              backgroundColor: Constants.APP_WHITE_COLOR,
              shadowOffset: { width: 0, height: 2 },
              shadowColor: "rgba(46,69,187,0.56)",
              shadowOpacity: 0.2,
              shadowRadius: 2,
              borderRadius: 5,
              borderColor: "rgba(110,110,110,0.1)",
              borderWidth: 1,
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                textAlign: "left",
                fontSize: 15,
                fontFamily: Constants.Fonts.MEDIUM,
                color: Constants.APP_BLACK_COLOR,
                marginTop: 10,
                marginLeft: 120,
              }}
            >
              {item.name.toUpperCase()}
            </Text>
          </View>

          <ImageLoader
            style={{
              overflow: "hidden",
              height: 113,
              width: 100,
              borderRadius: 5,
              borderWidth: 0.5,
              borderColor: Constants.APP_SEPARATOR_COLOR,
              position: "absolute",
              left: 3,
              bottom: 3,
              backgroundColor: Constants.APP_WHITE_COLOR,
            }}
            //defaultSource={Images.placeHolderProduct}
            source={{ uri: imagesUri }}
          />
          <View
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: 30,
              height: 30,
              backgroundColor: Constants.APP_THEME_COLOR,
              borderTopRightRadius: 5,
              borderBottomLeftRadius: 5,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={Images.arrowRight}
              style={{
                width: 7,
                height: 13,
                tintColor: Constants.APP_WHITE_COLOR,
                transform: [{ rotate: this.props.isRTL ? "180deg" : "0deg" }],
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
      // </TouchableOpacity>
    );
  };

  navigateProductDetail = (index) => {
    this.props.navigation.navigate("ProductListFromCategory", {
      subCategories: this.state.renderSubCategories,
      categoryName: this.state.selectedTitle,
      selectedSubCategoryIndex: index,
    });
  };
}

export default CategoriesView;
