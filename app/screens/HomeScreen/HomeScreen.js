/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on February 12, 2020
 * HomeScreen - HomeScreen view
 */

import {
  View,
  Text,
  Image,
  FlatList,
  StatusBar,
  ScrollView,
  BackHandler,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import styles from "./styles";
import Login from "../LoginScreen";
import Modal from "react-native-modal";
import React, { Component } from "react";
import Images from "../../config/images";
import Constants from "../../config/constants";
import ProductCell2 from "../../components/productCell2";
import HudView from "../../components/hudView";
import ImageLoader from "react-native-image-progress";
import { translate } from "../../config/languageSwitching/index";
import { showSingleAlert } from "../../config/common";
import ProductCell3 from "../../components/productCell3";

import {
  normalizedHeight,
  normalizedWidth,
  showSimpleSnackbar,
  showAlertWithCallback,
} from "../../config/common";
import NavigationHeader2 from "../../components/NavigationHeaders/NavigationHeader2";

/** Adds Item Component */
const AddsItem = React.memo(({ item, index, didSelectAdd, props }) => {
  return (
    <TouchableOpacity
      activeOpacity={Constants.ACTIVE_OPACITY}
      onPress={() => {
        didSelectAdd(item);
      }}
    >
      <Image
        source={{ uri: Constants.APP_S3_BASE_URL + item.image }}
        style={{
          width: props.screenWidth - 30,
          height: normalizedHeight(200),
        }}
      />
    </TouchableOpacity>
  );
});

/** Catrgory Item Component */
const CategoryItem = React.memo(({ item, index, didTapOnItem }) => {
  let imageName = item.image1;
  imageName = imageName.replace("/pub/media/", "");

  return (
    <TouchableOpacity
      activeOpacity={Constants.ACTIVE_OPACITY}
      onPress={() => {
        didTapOnItem(item);
      }}
      style={{ alignItems: "center", marginHorizontal: 12 }}
    >
      <View
        style={{
          marginVertical: 7,
        }}
      >
        <Image
          source={{ uri: Constants.APP_S3_BASE_URL + imageName }}
          style={{
            width: normalizedWidth(72),
            height: normalizedWidth(72),
            borderRadius: 5,
            borderWidth: 0.5,
            borderColor: Constants.APP_GRAY_COLOR,
          }}
        />
      </View>
      <Text style={styles.categoryTitle}>{item.name}</Text>
    </TouchableOpacity>
  );
});

/** New Arrival Item Component */
const NewArrivalItem = React.memo(({ item, index, didTapOnItem, currency }) => {
  return (
    <TouchableOpacity
      activeOpacity={Constants.ACTIVE_OPACITY}
      onPress={() => {
        didTapOnItem(item);
      }}
      style={{
        backgroundColor: Constants.APP_WHITE_COLOR,
        marginRight: 15,
        marginLeft: index == 0 ? 15 : 0,
        marginVertical: 10,
      }}
    >
      <Image
        source={{ uri: Constants.APP_S3_BASE_URL + item.thumbnail }}
        resizeMode={"contain"}
        style={{
          width: normalizedWidth(124),
          height: normalizedWidth(124),
          borderRadius: 5,
          borderWidth: 1,
          borderColor: Constants.APP_SEPARATOR_COLOR,
        }}
      />
      <Text style={[styles.itemTitle, { width: normalizedWidth(124) }]}>
        {item.name}
      </Text>
      <Text style={styles.itemCost}>
        {item.final_price.toFixed(2) + " " + currency}
      </Text>
    </TouchableOpacity>
  );
});

/** Best Seller Item Component */
const BestSellerItem = React.memo(
  ({ item, index, didTapOnLikeButton, didTapOnItem, currency, likeActive }) => {
    return (
      <View
        style={{
          backgroundColor: Constants.APP_WHITE_COLOR,
          marginRight: 15,
          marginLeft: index == 0 ? 15 : 0,
          marginVertical: 10,
        }}
      >
        <TouchableOpacity
          activeOpacity={Constants.ACTIVE_OPACITY}
          onPress={() => didTapOnItem(item)}
        >
          <ImageLoader
            source={{ uri: Constants.APP_S3_BASE_URL + item.thumbnail }}
            resizeMode={"contain"}
            //defaultSource={Images.placeHolderProduct}
            style={{
              width: normalizedWidth(162),
              height: normalizedWidth(162),
              borderRadius: 5,
              borderWidth: 1,
              borderColor: Constants.APP_SEPARATOR_COLOR,
            }}
          />
          <Text style={[styles.itemTitle2, { width: normalizedWidth(162) }]}>
            {item.name}
          </Text>
          <Text style={styles.itemCost}>
            {item.final_price.toFixed(2) + " " + currency}
          </Text>
          <TouchableOpacity
            onPress={() => didTapOnLikeButton()}
            hitSlop={{ left: 20, top: 10, right: 10, bottom: 20 }}
            style={styles.wishListContainer}
          >
            <Image
              source={Images.wishlist}
              resizeMode={"contain"}
              style={{
                width: normalizedWidth(13),
                height: normalizedWidth(13),
                tintColor: likeActive ? Constants.APP_THEME_COLOR2 : null,
              }}
            />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    );
  }
);

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addsArray: [1, 2, 3, 4],
      visibleAddIndex: 0,
      selectedAdsIndex: 0,
      isLoginViewShow: false,
      countryFlag: "",
      bestSellerWishlist: [],
    };
  }

  componentDidMount() {
    const { bestSellersArray, wishList } = this.props;
    let mArray = [];
    // bestSellersArray.map(bestItem => {
    //   if (wishList.some(item => item.productId === bestItem.entity_id)) {
    //     mArray.push(bestItem.entity_id);
    //   }
    // });
    wishList.map((wishItem) => {
      mArray.push(wishItem.productId);
    });
    this.setState({ bestSellerWishlist: mArray });

    setInterval(() => {
      const { bannerArray } = this.props;
      const { selectedAdsIndex } = this.state;
      const isLastItem = bannerArray.length == selectedAdsIndex;
      this._scrollToIndex(
        selectedAdsIndex,
        bannerArray.length != selectedAdsIndex
      );
      this.setState({
        selectedAdsIndex:
          bannerArray.length - 1 == selectedAdsIndex ? 0 : selectedAdsIndex + 1,
      });
    }, 2000);

    this.willFocus = this.props.navigation.addListener(
      "willFocus",
      (payload) => {
        BackHandler.addEventListener(
          "hardwareBackPress",
          this.handleBackButtonClick
        );
      }
    );
    this.willBlur = this.props.navigation.addListener("willBlur", (payload) => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        this.handleBackButtonClick
      );
    });
  }

  componentWillUnmount() {
    this.willFocus.remove();
    this.willBlur.remove();
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  handleBackButtonClick() {
    BackHandler.exitApp();
    return true;
  }

  _didTapOnFlag = () => {
    this.props.navigation.navigate("CountrySelection");
  };

  _didTapOnSearch = () => {
    this.props.navigation.navigate("Search");
    // this.props.navigation.navigate('ProductList');
  };

  _ItemLoadMore() {
    // if (this.state.current_page + 1 <= this.state.total_pages) {
    //   if (this.keyword && this.keyword != '') {
    //     var page = this.state.current_page + 1;
    //     this.search(this.keyword, page);
    //   } else {
    //     this.loadMore(this.state.current_page + 1);
    //   }
    // }
  }

  _didTapOnCart = () => {
    this.props.navigation.navigate("Cart");
  };

  _onViewableItemsChanged = ({ viewableItems, changed }) => {
    if (viewableItems.length > 0)
      this.setState({
        visibleAddIndex: viewableItems[0].index,
        selectedAdsIndex: viewableItems[0].index,
      });
  };

  _getItemLayout = (data, index) => ({
    length: this.props.bannerArray.length,
    offset: (this.props.screenWidth - 30) * index,
    index,
  });

  _scrollToIndex = (index, animated) => {
    if (index < this.props.bannerArray.length && this.addsFlatListRef)
      this.addsFlatListRef.scrollToIndex({ animated: animated, index: index });
  };

  addToBestSellerWishlistState = (productId) => {
    this.setState((prevState) => ({
      bestSellerWishlist: [...prevState.bestSellerWishlist, productId],
    }));
  };

  removeFromBestSellerWishlistState = (productId) => {
    this.setState((prevState) => ({
      bestSellerWishlist: prevState.bestSellerWishlist.filter(
        (item) => item !== productId
      ),
    }));
  };

  _didTapOnLikeButton = (likeValue, productId) => {
    const { userToken, onDislikeTap, onLikeTap } = this.props;
    if (userToken.length > 0) {
      if (likeValue) {
        this.removeFromBestSellerWishlistState(productId);
        onDislikeTap(productId, (status) => {
          if (status) {
            showSimpleSnackbar(translate("Item removed from wishlist"));
          } else {
            this.addToBestSellerWishlistState(productId);
          }
        });
      } else {
        this.addToBestSellerWishlistState(productId);
        onLikeTap(productId, (status) => {
          if (status) {
            showSimpleSnackbar(translate("Item added to wishlist"));
          } else {
            this.removeFromBestSellerWishlistState(productId);
          }
        });
      }
    } else {
      showAlertWithCallback(
        translate("user_not_login"),
        translate("Login"),
        translate("Cancel"),
        () => {
          this.setState({ isLoginViewShow: true });
        },
        null
      );
    }
  };

  render() {
    const { visibleAddIndex, isLoginViewShow, bestSellerWishlist } = this.state;
    const {
      topCategoryArray,
      bannerArray,
      loader,
      newProductsArray,
      topSalesArray,
      bestSellersArray,
      categoryList,
      currency,
      storeCode,
      cartArray,
    } = this.props;
    let countryFlagg = "";
    if (storeCode) {
      let country = storeCode.slice(0, 2);
      switch (country) {
        case "kw":
          countryFlagg = Images.flags.kuwait;
          break;
        case "bh":
          countryFlagg = Images.flags.beharin;
          break;
        case "sa":
          countryFlagg = Images.flags.ksa;
          break;
        case "qa":
          countryFlagg = Images.flags.qatar;
          break;
        case "om":
          countryFlagg = Images.flags.oman;
          break;
        case "ua":
          countryFlagg = Images.flags.uae;
          break;
        case "in":
          countryFlagg = Images.flags.globe;
          break;
      }
    }
    return (
      <SafeAreaView style={styles.safeContainer}>
        <StatusBar
          // barStyle="light-content"
          hidden={false}
          backgroundColor={Constants.APP_WHITE_COLOR}
          // translucent={true}
        />
        <NavigationHeader2
          didTapOnFlag={this._didTapOnFlag}
          didTapOnSearch={this._didTapOnSearch}
          didTapOnCart={this._didTapOnCart}
          isShowFlag={false}
          isDark={false}
          showCart={true}
          countryFlag={countryFlagg}
          cartItemsCount={cartArray.length}
        />
        {loader ? (
          <HudView />
        ) : (
          <ScrollView style={{ flex: 1 }}>
            <View style={styles.container}>
              <View
                style={{
                  marginTop: 10,
                  marginHorizontal: 15,
                  borderRadius: 5,
                  overflow: "hidden",
                }}
              >
                <FlatList
                  horizontal
                  pagingEnabled
                  ref={(ref) => {
                    this.addsFlatListRef = ref;
                  }}
                  style={{
                    marginVertical: 0,
                    backgroundColor: Constants.APP_BLACK_COLOR,
                  }}
                  contentContainerStyle={{ alignSelf: "flex-start" }}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  data={bannerArray}
                  onViewableItemsChanged={this._onViewableItemsChanged}
                  viewabilityConfig={{
                    itemVisiblePercentThreshold: 50,
                  }}
                  getItemLayout={this._getItemLayout}
                  renderItem={({ item, index }) => (
                    <AddsItem
                      item={item}
                      index={index}
                      props={this.props}
                      didSelectAdd={(item) => {
                        //TODO: did select ads
                      }}
                    />
                  )}
                />
                <View style={styles.pagerContainer}>
                  {bannerArray.map((item, index) => (
                    <View
                      style={[
                        styles.pagerItem,
                        {
                          backgroundColor:
                            index == visibleAddIndex
                              ? Constants.APP_WHITE_COLOR
                              : "rgba(255,255,255,0.3)",
                        },
                      ]}
                    />
                  ))}
                </View>
              </View>

              <View style={styles.categoryListContainer}>
                <FlatList
                  horizontal
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  data={topCategoryArray}
                  renderItem={({ item, index }) => (
                    <CategoryItem
                      item={item}
                      index={index}
                      didTapOnItem={(item) => {
                        console.log("categoryList", categoryList);
                        console.log("categoryList item", item);
                        const selectedCategory = categoryList.filter(
                          (category) => {
                            return category.id == item.entity_id;
                          }
                        );
                        if (selectedCategory.length === 0) {
                          showSingleAlert(
                            "No product found in this category",
                            "OK"
                          );
                        } else {
                          this.props.navigation.navigate("ProductList", {
                            subCategories: selectedCategory[0].subCategories,
                            categoryName: selectedCategory[0].title,
                          });
                        }
                      }}
                    />
                  )}
                />
              </View>

              <View style={styles.separatorView} />

              <View>
                <Text style={styles.sectionTitle}>
                  {translate("NEW COLLECTIONS")}
                </Text>
                <FlatList
                  horizontal
                  contentContainerStyle={{ alignSelf: "flex-start" }}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  data={newProductsArray}
                  renderItem={({ item, index }) => {
                    let likeValue = false;
                    if (bestSellerWishlist.includes(item.entity_id)) {
                      likeValue = true;
                    }
                    return (
                      <View style={{ width: normalizedWidth(170) }}>
                        <ProductCell3
                          data={item}
                          index={index}
                          screenWidth={Constants.SCREEN_WIDTH}
                          numOfColumns={2}
                          currency={currency}
                          likeActive={likeValue}
                          didTapOnLikeButton={(value) => {
                            this._didTapOnLikeButton(likeValue, item.entity_id);
                          }}
                          didSelectAdd={(item) =>
                            this.props.navigation.navigate("ProductDetail", {
                              sku: item.sku,
                            })
                          }
                        />
                      </View>
                    );
                  }}
                  onEndReachedThreshold={1}
                  onEndReached={({ distanceFromEnd }) => {
                    this._ItemLoadMore();
                  }}
                />
              </View>
              <View>
                <Text style={styles.sectionTitle}>
                  {translate("BEST SELLING")}
                </Text>
                <FlatList
                  horizontal
                  contentContainerStyle={{ alignSelf: "flex-start" }}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  data={bestSellersArray}
                  extraData={bestSellerWishlist}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }) => {
                    let likeValue = false;
                    if (bestSellerWishlist.includes(item.entity_id)) {
                      likeValue = true;
                    }
                    return (
                      <View style={{ width: normalizedWidth(170) }}>
                        <ProductCell3
                          data={item}
                          index={index}
                          screenWidth={Constants.SCREEN_WIDTH}
                          numOfColumns={2}
                          currency={currency}
                          likeActive={likeValue}
                          didTapOnLikeButton={(value) => {
                            this._didTapOnLikeButton(likeValue, item.entity_id);
                          }}
                          didSelectAdd={(item) =>
                            this.props.navigation.navigate("ProductDetail", {
                              sku: item.sku,
                            })
                          }
                        />
                      </View>
                    );
                  }}
                />
              </View>
              <View>
                <Text style={styles.sectionTitle}>
                  {translate("Value Deals")}
                </Text>
                <FlatList
                  horizontal
                  contentContainerStyle={{ alignSelf: "flex-start" }}
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  data={topSalesArray}
                  renderItem={({ item, index }) => {
                    let likeValue = false;
                    if (bestSellerWishlist.includes(item.entity_id)) {
                      likeValue = true;
                    }
                    return (
                      <View style={{ width: normalizedWidth(170) }}>
                        <ProductCell3
                          data={item}
                          index={index}
                          screenWidth={Constants.SCREEN_WIDTH}
                          numOfColumns={2}
                          currency={currency}
                          likeActive={likeValue}
                          didTapOnLikeButton={(value) => {
                            this._didTapOnLikeButton(likeValue, item.entity_id);
                          }}
                          didSelectAdd={(item) =>
                            this.props.navigation.navigate("ProductDetail", {
                              sku: item.sku,
                            })
                          }
                        />
                      </View>
                    );
                  }}
                />
              </View>
            </View>
          </ScrollView>
        )}
        <Modal
          onBackButtonPress={() => this.setState({ isLoginViewShow: false })}
          isVisible={isLoginViewShow}
        >
          <View style={{ flex: 1 }}>
            <Login
              didTapOnclose={() => this.setState({ isLoginViewShow: false })}
            />
          </View>
        </Modal>
      </SafeAreaView>
    );
  }
}

export default HomeScreen;
