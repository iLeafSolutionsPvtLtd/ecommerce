/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on February 26, 2020
 * ProductDetailView - Product details are shown here
 */

import {
  Text,
  View,
  Image,
  FlatList,
  TextInput,
  StatusBar,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import styles from "./styles";
import Login from "../LoginScreen";
import Image360 from "../image360";
import Share from "react-native-share";
import Modal from "react-native-modal";
import React, { Component } from "react";
import Images from "../../config/images";
import HTMLView from "react-native-htmlview";
import Constants from "../../config/constants";
import HudView from "../../components/hudView";
import ImageView from "react-native-image-view";
import NetInfo from "@react-native-community/netinfo";
import { showSingleAlert } from "../../config/common";
import ImageLoader from "react-native-image-progress";
import ProductCell2 from "../../components/productCell2";
import { translate } from "../../config/languageSwitching/index";
import RefreshButtonView from "../../components/RefreshButtonView";
import { normalizedHeight, normalizedWidth } from "../../config/common";
import { showAlertWithCallback, showSimpleSnackbar } from "../../config/common";
import NavigationHeader2 from "../../components/NavigationHeaders/NavigationHeader2";

/** Product Image Component */
const ProductImageItem = React.memo(({ item, index, didTapOnItem, props }) => {
  let itemImage = { uri: Constants.APP_S3_BASE_URL + item };
  return (
    <TouchableOpacity
      activeOpacity={Constants.ACTIVE_OPACITY}
      onPress={() => {
        didTapOnItem(item, index);
      }}
      style={{ alignItems: "center" }}
    >
      <View style={{ backgroundColor: Constants.APP_WHITE_COLOR }}>
        <ImageLoader
          source={itemImage}
          resizeMode={"contain"}
          style={{
            width: props.screenWidth,
            height: normalizedHeight(557),
          }}
        />
      </View>
    </TouchableOpacity>
  );
});

/** Product Color Item Component */
const ColorItem = React.memo(
  ({
    item,
    index,
    didTapOnItem,
    selectedColorIndex,
    props,
    numberOfColumnsOfColorsCell,
  }) => {
    let attributeDict = item.attributes;
    let colorDicts = attributeDict.color;
    let attributeValue = colorDicts.attribute_value;

    let productsColors = props.productsColors;
    let filterdproductsColors = productsColors.filter((obj) => {
      return obj.value === String(attributeValue);
    });

    let colorDict =
      filterdproductsColors && filterdproductsColors.length > 0
        ? filterdproductsColors[0]
        : null;
    let colorImage = colorDict ? colorDict.image_code : "";
    let colorImageUrl = Constants.APP_S3_BASE_URL + colorImage;

    return (
      <TouchableOpacity
        activeOpacity={Constants.ACTIVE_OPACITY}
        onPress={() => {
          didTapOnItem(item, index);
        }}
        style={{
          alignItems: "center",
          width: props.screenWidth / 5,
        }}
      >
        <View style={styles.child_color_view}>
          <ImageBackground
            source={{ uri: colorImageUrl }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: Constants.APP_GRAY_COLOR2,
              overflow: "hidden",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {selectedColorIndex == index ? (
              <Image
                source={Images.whiteTick}
                style={[
                  styles.checkbox_icon,
                  // { tintColor: Constants.APP_WHITE_COLOR },
                ]}
              />
            ) : null}
          </ImageBackground>
        </View>
      </TouchableOpacity>
    );
  }
);

/** Product Size Item Component */
const SizeItem = React.memo(
  ({ item, index, didTapOnItem, selectedSizeIndex, props }) => {
    let attributeDict = item.attributes;
    let sizeDicts = attributeDict.size;
    let attributeValue = sizeDicts.attribute_value;

    let productsSizes = props.productsSizes;
    let filterdproductsSizes = productsSizes.filter((obj) => {
      return obj.value === String(attributeValue);
    });

    let sizeDict =
      filterdproductsSizes && filterdproductsSizes.length > 0
        ? filterdproductsSizes[0]
        : null;

    let size = sizeDict ? sizeDict.label : "";

    return (
      <TouchableOpacity
        activeOpacity={Constants.ACTIVE_OPACITY}
        onPress={() => {
          didTapOnItem(item, index);
        }}
        style={{
          alignItems: "center",
          width: (props.screenWidth - 40) / 4,
        }}
      >
        <View
          style={{
            marginVertical: 7,
            // borderColor: "rgba(112,112,112,0.3)",
            // selectedSizeIndex == index
            //   ? Constants.APP_THEME_COLOR
            //   : "rgba(112,112,112,0.3)",
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
            // borderWidth: selectedSizeIndex == index ? 2 : 1,
            height: 40,
            width: (props.screenWidth - 80) / 4,
            backgroundColor:
              selectedSizeIndex == index
                ? Constants.APP_THEME_COLOR
                : "rgb(233,241,249)",
          }}
        >
          <Text
            style={[
              styles.sizeText,
              {
                color:
                  selectedSizeIndex == index
                    ? Constants.APP_WHITE_COLOR
                    : Constants.APP_BLACK_COLOR,
              },
            ]}
          >
            {" "}
            {size}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
);

class ProductDetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productImagesArray: [],
      visibleImageIndex: 0,
      selectedSizeIndex: 0,
      productCount: 1,
      selectedColorIndex: 0,
      isLoginViewShow: false,
      productDetails: null,
      is360ViewShow: false,
      isLiked: false,
      sizeArray: [],
      colorArray: [],
      selectedProductDict: null,
      isProductGetAPICalling: false,
      isSizeChartShow: false,
      modalVisible: false,
      imagesArray360: [],
      isImageViewVisible: false,
      imagePopUpArray: [],
      ipmagePopUpIndex: 0,
      isRefreshing: false,
      noInterNetView: false,
    };
  }

  componentDidMount() {
    const sku = this.props.navigation.state.params
      ? this.props.navigation.state.params.sku
      : "";
    const { isNetworkAvailable } = this.props;

    if (sku) {
      this.unsubscribe = NetInfo.addEventListener((state) => {
        let networkStatus = state.isConnected;
        if (networkStatus) {
          this.props.getProductDetail(sku, this._productDetailsCallback);
          this.setState({ isProductGetAPICalling: true });
          this.setState({ noInterNetView: false });
        } else {
          this.setState({ noInterNetView: true });
          this.setState({ isProductGetAPICalling: false });
        }
      });
      // this.props.getProductDetail(sku, this._productDetailsCallback);
      // this.setState({isProductGetAPICalling: true});
    }
  }

  _productDetailsCallback = (productDetails) => {
    if (productDetails) {
      let imageDict = productDetails.image;
      let imageGallery = imageDict ? imageDict.gallery : null;
      let productImagesArray = imageGallery ? imageGallery.images : [];

      this.setState({
        productDetails,
        productImagesArray,
        isProductGetAPICalling: false,
      });
      this.props.wishList.map((item) => {
        if (item.productId === productDetails.entity_id.toString()) {
          this.setState({ isLiked: true });
        }
      });

      let children = productDetails.children ? productDetails.children : [];

      if (children.length > 0) {
        const newSizeArray2 = [];
        const newColorArray2 = [];
        children.forEach((obj) => {
          if (
            !newSizeArray2.some(
              (o) =>
                o.attributes.size.attribute_value ===
                obj.attributes.size.attribute_value
            )
            // && obj.attributes.size.attribute_value
          ) {
            newSizeArray2.push({ ...obj });
          }

          if (
            !newColorArray2.some(
              (o) =>
                o.attributes.color.attribute_value ===
                obj.attributes.color.attribute_value
            )
          ) {
            newColorArray2.push({ ...obj });
          }
        });

        let selectedProductDict = children[0];

        console.log("SIZE ARRAY", newSizeArray2);

        this.setState(
          {
            sizeArray: newSizeArray2,
            colorArray: newColorArray2,
            selectedProductDict,
          },
          () => {
            this._didSelectVarient(selectedProductDict, 0);
          }
        );
      }
    }
  };

  _didPullToRefresh = () => {
    const { isNetworkAvailable } = this.props;
    this.setState({ isRefreshing: true });

    setTimeout(() => {
      this.setState({ isRefreshing: false });
    }, 1000);
    if (!isNetworkAvailable) {
      showSingleAlert(translate("No internet connection"));
      return;
    }

    const sku = this.props.navigation.state.params
      ? this.props.navigation.state.params.sku
      : "";

    if (sku) {
      this.props.getProductDetail(sku, this._productDetailsCallback);
      this.setState({ isProductGetAPICalling: true });
    }
  };

  _didTapOnCart = () => {
    this.props.navigation.navigate("Cart");
  };

  _didTapOnBackButton = () => {
    this.props.navigation.goBack();
  };

  _didTapOnShare = () => {
    const url = "";
    const title = Constants.APP_NAME;
    const message = "Please check this out.";
    const options = Platform.select({
      ios: {
        activityItemSources: [
          {
            placeholderItem: { type: "url", content: url },
            item: {
              default: { type: "url", content: url },
            },
            subject: {
              default: title,
            },
            linkMetadata: { originalUrl: url, url, title },
          },
          {
            placeholderItem: { type: "text", content: message },
            item: {
              default: { type: "text", content: message },
              message: null, // Specify no text to share via Messages app.
            },
          },
        ],
      },
      default: {
        title,
        subject: title,
        message: `${message} ${url}`,
      },
    });
    Share.open(options);
  };

  _onViewableItemsChanged = ({ viewableItems, changed }) => {
    if (viewableItems.length > 0)
      this.setState({
        visibleImageIndex: viewableItems[0].index,
      });
  };

  _didTapOnDecrement = () => {
    const { productCount } = this.state;
    if (productCount > 1) {
      this.setState({ productCount: productCount - 1 });
    }
  };

  _didTapOnIncrement = () => {
    const { productCount } = this.state;

    if (productCount >= Constants.MAX_PRODUCT_COUNT) {
      return;
    }
    this.setState({ productCount: productCount + 1 });
  };

  _didTapOnAddToCart = (isBuyNow) => {
    const { userToken, guestToken, quoteID, cartArray } = this.props;
    const {
      productCount,
      productDetails,
      selectedColorIndex,
      selectedSizeIndex,
      selectedProductDict,
    } = this.state;

    if (cartArray.length >= Constants.MAX_CART_SIZE) {
      showSingleAlert(
        translate("cart count exceeds1") +
          Constants.MAX_CART_SIZE +
          translate("cart count exceeds2")
      );
      return;
    }

    let isProductInCart = false;
    let cartProductInfo;
    if (cartArray.length > 0) {
      cartArray.map((item) => {
        // productDetails.children.map((childItem) => {
        //   if (childItem.sku === item.sku) {
        //     isProductInCart = true;
        //   }
        // });
        if (
          (selectedProductDict && selectedProductDict.sku === item.sku) ||
          productDetails.sku === item.sku
        ) {
          isProductInCart = true;
          cartProductInfo = item;
        }
      });
    }

    if (isProductInCart) {
      let cartProductCount = cartProductInfo.qty;
      if (cartProductCount + productCount > Constants.MAX_PRODUCT_COUNT) {
        showSingleAlert(translate("product count max in detail screen"));
        return;
      }
    }

    // let colorId = '';
    // let sizeId = '';

    // let attributes = selectedProductDict.attributes;
    // colorId = attributes.color.attribute_value;
    // sizeId = attributes.size.attribute_value;

    let isOutOfStock = false;
    if (selectedProductDict && selectedProductDict.is_in_stock) {
      isOutOfStock = !selectedProductDict.is_in_stock;
    }

    if (isOutOfStock) {
      showSingleAlert(
        translate("Out of stock description") + " " + translate("Out of stock")
      );
      return;
    }

    if (userToken) {
      let colorId = "";
      let sizeId = "";
      let product_option = null;

      if (selectedProductDict && selectedProductDict.attributes) {
        let attributes = selectedProductDict.attributes;
        colorId = attributes.color.attribute_value;
        sizeId = attributes.size.attribute_value;

        product_option = {
          extension_attributes: {
            configurable_item_options: [
              { option_id: "93", option_value: colorId },
              {
                option_id: "178",
                option_value: sizeId,
              },
            ],
          },
        };
      }

      let params = {
        cart_item: {
          quote_id: quoteID,
          sku: productDetails.sku,
          qty: productCount,
        },
      };

      if (product_option) {
        params.cart_item["product_option"] = product_option;
      }

      this.props.addPtoCartForLoggedUser(params, (status) =>
        this._userAddedPtoCartCallback(status, isBuyNow)
      );
    } else if (guestToken) {
      let colorId = "";
      let sizeId = "";
      let product_option = null;

      if (selectedProductDict && selectedProductDict.attributes) {
        let attributes = selectedProductDict.attributes;
        colorId = attributes.color.attribute_value;
        sizeId = attributes.size.attribute_value;

        product_option = {
          extension_attributes: {
            configurable_item_options: [
              { option_id: "93", option_value: colorId },
              {
                option_id: "178",
                option_value: sizeId,
              },
            ],
          },
        };
      }

      let params = {
        cart_item: {
          quote_id: guestToken,
          sku: productDetails.sku,
          qty: productCount,
        },
      };

      if (product_option) {
        params.cart_item["product_option"] = product_option;
      }

      this.props.guestAddToCart(params, (status) =>
        this._guestAddToCartCallback(status, isBuyNow)
      );
    } else {
      this.props.createGuestCart((status) =>
        this._createGuestCartCallback(status, isBuyNow)
      );
    }
  };

  _createGuestCartCallback = (status, isBuyNow) => {
    setTimeout(() => {
      if (status) this._didTapOnAddToCart(isBuyNow);
    }, 500);
  };

  _userAddedPtoCartCallback = (status, isBuyNow) => {
    if (isBuyNow) {
      this.props.getTotalCost((totalCostDict) => {
        console.log("totalCostDict", totalCostDict);
        this.props.navigation.navigate("Checkout", {
          totalCost: totalCostDict,
        });
      });
    } else {
      if (status) {
        showSimpleSnackbar(translate("Product added to cart"));
        // showSingleAlert(translate('Product added to cart'));
      }
    }
  };

  _guestAddToCartCallback = (status, isBuyNow) => {
    if (isBuyNow) {
      this.props.getTotalCost((totalCostDict) => {
        console.log("totalCostDict", totalCostDict);

        this.props.navigation.navigate("Checkout", {
          totalCost: totalCostDict,
        });
      });
    } else {
      if (status) {
        showSimpleSnackbar(translate("Product added to cart"));
        // showSingleAlert(translate('Product added to cart'));
      }
    }
  };

  _didTapOnBuyNow = () => {
    const { selectedProductDict } = this.state;
    const { userToken, guestInfo, cartArray } = this.props;
    // let isOutOfStock = !selectedProductDict.is_in_stock;

    let isOutOfStock = false;
    if (selectedProductDict && selectedProductDict.is_in_stock) {
      isOutOfStock = !selectedProductDict.is_in_stock;
    }

    if (isOutOfStock) {
      showSingleAlert(
        translate("Out of stock description") + " " + translate("Out of stock")
      );
      return;
    }

    if (cartArray.length >= Constants.MAX_CART_SIZE) {
      showSingleAlert(
        translate("cart count exceeds1") +
          Constants.MAX_CART_SIZE +
          translate("cart count exceeds2")
      );
      return;
    }

    if (userToken.length > 0) {
      this._didTapOnAddToCart(true);
    } else {
      if (!guestInfo) {
        this.setState({ isLoginViewShow: true });
      } else {
        this._didTapOnAddToCart(true);
      }
    }
  };

  // _likeCallback = status => {
  //   const {isLiked} = this.state;
  //   if (!status) {
  //     this.setState({isLiked: !isLiked});
  //   }
  // };

  // _dislikeCallback = status => {
  //   const {isLiked} = this.state;
  //   if (!status) {
  //     this.setState({isLiked: !isLiked});
  //   }
  // };

  _didTapOnLikeButton = (productId) => {
    const { userToken, onLikeTap, onDislikeTap } = this.props;
    if (userToken.length > 0) {
      if (this.state.isLiked) {
        onDislikeTap(productId, (status) => {
          if (status) {
            showSimpleSnackbar(translate("Item removed from wishlist"));
            this.setState({ isLiked: false });
          } else {
            this.setState({ isLiked: true });
          }
        });

        this.setState({ isLiked: false });
      } else {
        onLikeTap(productId, (status) => {
          if (status) {
            showSimpleSnackbar(translate("Item added to wishlist"));
            this.setState({ isLiked: true });
          } else {
            this.setState({ isLiked: false });
          }
        });
        this.setState({ isLiked: true });
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

  _openVideoPlayer = (item) => {
    this.props.navigation.navigate("VideoPlayer", { vimeoUrl: item });
  };

  _didTapOn360 = () => {
    const { productDetails, imagesArray360 } = this.state;
    if (imagesArray360.length > 0) {
      this.setState({ is360ViewShow: true });
    } else {
      //'WT01'  sku for getting sample 360 images
      this.props.get360Images(productDetails.sku, (imagesArray360) => {
        this.setState({ imagesArray360 }, () => {
          this.setState({ is360ViewShow: true });
        });
      });
    }
  };

  _didSelectVarient = (item, index) => {
    const {
      sizeArray,
      colorArray,
      productDetails,
      selectedSizeIndex,
      selectedColorIndex,
    } = this.state;
    let children = productDetails.children ? productDetails.children : [];
    let isItemAvailable = false;
    let sizeObj = sizeArray[selectedSizeIndex];
    let colorObj = colorArray[selectedColorIndex];
    let selectedProductItem;

    children.map((i, j) => {
      if (
        i.attributes.size.attribute_value ===
          sizeObj.attributes.size.attribute_value &&
        i.attributes.color.attribute_value ===
          colorObj.attributes.color.attribute_value
      ) {
        isItemAvailable = true;
        selectedProductItem = i;
      }
    });

    if (isItemAvailable) {
      let imageDict = selectedProductItem.image;
      let imageGallery = imageDict ? imageDict.gallery : null;
      let productImagesArray = imageGallery ? imageGallery.images : [];
      this.setState({
        selectedProductDict: selectedProductItem,
        productImagesArray,
      });
    }
  };

  _didTapOnSizeChart = () => {
    this.setState({ isSizeChartShow: true });
  };

  _didSelectProductImage = (item, index) => {
    const { productImagesArray } = this.state;
    let popUpImagearray = [];
    productImagesArray.map((item) => {
      let dict = {
        source: {
          uri: Constants.APP_S3_BASE_URL + item,
        },
      };
      popUpImagearray.push(dict);
    });

    this.setState({
      isImageViewVisible: true,
      ipmagePopUpIndex: index,
      imagePopUpArray: popUpImagearray,
    });
  };

  render() {
    const {
      isRTL,
      isLoading,
      currency,
      cartArray,
      isNetworkAvailable,
    } = this.props;
    const {
      productDetails,
      productCount,
      productImagesArray,
      visibleImageIndex,
      selectedSizeIndex,
      selectedColorIndex,
      isLoginViewShow,
      is360ViewShow,
      sizeArray,
      colorArray,
      selectedProductDict,
      isProductGetAPICalling,
      isSizeChartShow,
      modalVisible,
      imagesArray360,
      isImageViewVisible,
      ipmagePopUpIndex,
      imagePopUpArray,
      isRefreshing,
      noInterNetView,
    } = this.state;

    let numberOfColumnsOfColorsCell = 5;
    let relatedProducts = [];
    let productdescription = "";
    let hasVideo = false;
    let productName = "";
    let productFinalPrice = "";
    let productActualPrice = "";
    let productId = "";
    let percentage = 0;
    let videoDict = null;
    let shortDescription = "";
    let isProductHas360Image = false;
    let outOfStock = false;
    let sizeChartImage = "";

    if (productDetails) {
      productId = productDetails.entity_id;
      productName = productDetails.name;
      productFinalPrice = productDetails.finalPrice;
      productActualPrice = productDetails.regularPrice;
      relatedProducts = productDetails.related ? productDetails.related : [];
      shortDescription = productDetails.short_description;
      isProductHas360Image = productDetails["360View"];
      sizeChartImage = productDetails.chart;

      percentage = Math.floor(
        ((productActualPrice - productFinalPrice) / productActualPrice) * 100
      );

      productdescription = productDetails.description;
      let productMediaarray = productDetails.image;
      let gallery = productMediaarray.gallery;

      if (gallery && gallery.videos && gallery.videos.length > 0) {
        hasVideo = true;
        videoDict = gallery.videos[0];
      }
    }

    if (selectedProductDict) {
      productName = selectedProductDict.name;
      productFinalPrice = selectedProductDict.finalPrice;
      productActualPrice = selectedProductDict.price;

      percentage = Math.floor(
        ((productActualPrice - productFinalPrice) / productActualPrice) * 100
      );
      outOfStock = !selectedProductDict.is_in_stock;
    }

    // outOfStock = true;
    // percentage = "12";
    // isProductHas360Image = true;
    // shortDescription = "wfewfwfwf wefwfwfw fwefewfwef wefwefwfwf ewfewfewfwef ";

    return (
      <SafeAreaView style={styles.safeContainer}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor={Constants.APP_WHITE_COLOR}
          // translucent={true}
        />
        <NavigationHeader2
          hideBottomLine
          didTapOnCart={this._didTapOnCart}
          showBackButton={true}
          didTapOnBackButton={this._didTapOnBackButton}
          didTapOnShare={this._didTapOnShare}
          isRTL={isRTL}
          showShare={true}
          hideSearch={true}
          showCart={true}
          cartItemsCount={cartArray.length}
        />
        {noInterNetView ? (
          <View style={{ flex: 1, backgroundColor: Constants.APP_WHITE_COLOR }}>
            {!isNetworkAvailable && (
              <RefreshButtonView
                didTapOnRefresh={() => {
                  if (!isNetworkAvailable) {
                    showSingleAlert(translate("No internet connection"));
                  }
                }}
              />
            )}
          </View>
        ) : (
          <View style={{ flex: 1 }}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
                  onRefresh={this._didPullToRefresh}
                />
              }
            >
              {isProductGetAPICalling ? (
                <View />
              ) : (
                <View style={styles.scrollContainer}>
                  <View>
                    <FlatList
                      horizontal
                      pagingEnabled
                      showsVerticalScrollIndicator={false}
                      showsHorizontalScrollIndicator={false}
                      data={productImagesArray}
                      onViewableItemsChanged={this._onViewableItemsChanged}
                      viewabilityConfig={{
                        itemVisiblePercentThreshold: 50,
                      }}
                      renderItem={({ item, index }) => (
                        <ProductImageItem
                          item={item}
                          index={index}
                          props={this.props}
                          didTapOnItem={(item, index) => {
                            this._didSelectProductImage(item, index);
                          }}
                        />
                      )}
                    />

                    {productImagesArray && productImagesArray.length > 1 && (
                      <View
                        style={[
                          styles.pagerContainer,
                          {
                            transform: [{ rotate: isRTL ? "180deg" : "0deg" }],
                          },
                        ]}
                      >
                        {productImagesArray.map((item, index) => (
                          <View
                            style={[
                              styles.pagerItem,
                              {
                                width: index == visibleImageIndex ? 17 : 7,
                                backgroundColor:
                                  index == visibleImageIndex
                                    ? Constants.APP_GRAY_COLOR
                                    : Constants.APP_GRAY_COLOR,
                              },
                            ]}
                          />
                        ))}
                      </View>
                    )}

                    {isProductHas360Image && (
                      <TouchableOpacity
                        onPress={this._didTapOn360}
                        hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}
                        style={styles.imageRottationContainer}
                      >
                        <Image
                          source={Images.image360}
                          resizeMode={"contain"}
                          style={styles.likeButtonImage}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                  {hasVideo && (
                    <TouchableOpacity
                      activeOpacity={Constants.ACTIVE_OPACITY}
                      style={styles.watchVideoContainer}
                      onPress={() => this._openVideoPlayer(videoDict.url)}
                    >
                      <Image
                        source={Images.videoPlay}
                        style={{ width: 15, height: 15 }}
                      />
                      <Text style={styles.videoText}>
                        {translate("WATCH VIDEO")}
                      </Text>
                    </TouchableOpacity>
                  )}
                  <View style={styles.productInfoContainer}>
                    <View style={styles.curveView} />
                    {outOfStock && (
                      <Text
                        style={[
                          styles.productInfoText,
                          { fontSize: 16, marginTop: 20, marginBottom: 0 },
                        ]}
                      >
                        {translate("Out of stock description")}
                        <Text style={{ color: "#B51818" }}>
                          {" " + translate("Out of stock")}
                        </Text>
                      </Text>
                    )}
                    <View style={styles.productCostContainer}>
                      <View style={{ flexDirection: "row", flex: 1 }}>
                        <Text style={styles.productCost}>
                          {productFinalPrice + " " + currency}
                        </Text>
                        {percentage !== 0 && (
                          <Text style={styles.productCostOffer}>
                            {productActualPrice + " " + currency}
                          </Text>
                        )}
                        {percentage !== 0 && (
                          <Text style={styles.productCostOfferPercantage}>
                            {percentage + "% OFF"}
                          </Text>
                        )}
                      </View>
                      <TouchableOpacity
                        onPress={() => {
                          this._didTapOnLikeButton(productId);
                        }}
                        hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}
                        style={styles.wishListContainer}
                      >
                        <Image
                          source={
                            this.state.isLiked
                              ? Images.likeButtonWithShade
                              : Images.unLikeImageWithShade
                          }
                          resizeMode={"contain"}
                          style={[styles.likeButtonImage]}
                        />
                      </TouchableOpacity>
                    </View>
                    <Text style={[styles.productInfoText, { marginTop: 0 }]}>
                      {productName}
                    </Text>
                    {shortDescription && shortDescription !== "" ? (
                      <Text
                        style={[
                          styles.productInfoText,
                          { color: Constants.APP_GRAY_COLOR },
                        ]}
                      >
                        {shortDescription}
                      </Text>
                    ) : null}

                    <View style={styles.quantityControlContainer}>
                      <TouchableOpacity
                        onPress={this._didTapOnDecrement}
                        style={styles.incrementButton}
                      >
                        <Text style={styles.quantityButtonTitle}>-</Text>
                      </TouchableOpacity>
                      <TextInput
                        style={styles.quantityText}
                        value={productCount.toString()}
                      />
                      <TouchableOpacity
                        onPress={this._didTapOnIncrement}
                        style={{
                          width: "30%",
                          height: 30,
                          justifyContent: "center",
                          alignItems: "center",
                          borderLeftColor: Constants.APP_GRAY_COLOR,
                          borderLeftWidth: 1,
                        }}
                      >
                        <Text style={styles.quantityButtonTitle}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  {colorArray.length > 0 && (
                    <View style={styles.chooseColorContainer}>
                      <Text style={styles.sectionTitle}>
                        {translate("COLORS")}
                      </Text>
                      <FlatList
                        style={{ marginVertical: 15 }}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        numColumns={numberOfColumnsOfColorsCell}
                        data={colorArray}
                        renderItem={({ item, index }) => (
                          <ColorItem
                            item={item}
                            index={index}
                            props={this.props}
                            numberOfColumnsOfColorsCell={
                              numberOfColumnsOfColorsCell
                            }
                            selectedColorIndex={selectedColorIndex}
                            didTapOnItem={(item, index) => {
                              this.setState(
                                { selectedColorIndex: index },
                                () => {
                                  this._didSelectVarient(item, index);
                                }
                              );
                            }}
                          />
                        )}
                      />
                    </View>
                  )}
                  <View style={styles.chooseColorContainer}>
                    {sizeArray.length > 0 && (
                      <View>
                        <View style={{ flexDirection: "row" }}>
                          <Text style={styles.sectionTitle}>
                            {translate("Sizes")}
                          </Text>
                          {sizeChartImage.length > 0 && (
                            <TouchableOpacity onPress={this._didTapOnSizeChart}>
                              <Text style={styles.sizeChart}>
                                {translate("Size Chart")}
                              </Text>
                            </TouchableOpacity>
                          )}
                        </View>

                        <FlatList
                          style={{ marginTop: 15, marginHorizontal: 20 }}
                          contentContainerStyle={{
                            // alignItems: 'center',
                            justifyContent: "center",
                          }}
                          showsVerticalScrollIndicator={false}
                          showsHorizontalScrollIndicator={false}
                          numColumns={4}
                          data={sizeArray}
                          renderItem={({ item, index }) => (
                            <SizeItem
                              item={item}
                              index={index}
                              props={this.props}
                              selectedSizeIndex={selectedSizeIndex}
                              didTapOnItem={(item, index) => {
                                this.setState(
                                  { selectedSizeIndex: index },
                                  () => {
                                    this._didSelectVarient(item, index);
                                  }
                                );
                              }}
                            />
                          )}
                        />
                      </View>
                    )}
                  </View>
                  <View style={styles.chooseColorContainer}>
                    <Text style={styles.sectionTitle}>
                      {translate("Product Description")}
                    </Text>
                    <HTMLView
                      value={productdescription}
                      style={styles.productDescription}
                    />
                    {relatedProducts.length > 0 && (
                      <View>
                        <Text style={styles.sectionTitle}>
                          {translate("Similar Products")}
                        </Text>
                        <FlatList
                          horizontal
                          contentContainerStyle={{ alignSelf: "flex-start" }}
                          showsVerticalScrollIndicator={false}
                          showsHorizontalScrollIndicator={false}
                          data={relatedProducts}
                          renderItem={({ item, index }) => (
                            <ProductCell2
                              item={item}
                              index={index}
                              isFromProductDetail={true}
                              currency={currency}
                              didTapOnItem={(item) => {
                                this.props.navigation.push("ProductDetail", {
                                  sku: item.sku,
                                });
                              }}
                            />
                          )}
                        />
                      </View>
                    )}
                  </View>
                </View>
              )}
            </ScrollView>
            {isProductGetAPICalling ? (
              <View />
            ) : (
              <View style={styles.bottomButtonContainer}>
                <TouchableOpacity
                  style={styles.addTocartButton}
                  activeOpacity={Constants.activeOpacity}
                  onPress={() => this._didTapOnAddToCart(false)}
                >
                  <Text style={styles.addToCartText}>
                    {translate("ADD TO CART")}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buyNowButton}
                  activeOpacity={Constants.activeOpacity}
                  onPress={this._didTapOnBuyNow}
                >
                  <Text style={styles.buyNowText}>{translate("BUY NOW")}</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
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
        <Modal
          isVisible={is360ViewShow}
          onBackdropPress={() => this.setState({ is360ViewShow: false })}
          onBackButtonPress={() => this.setState({ is360ViewShow: false })}
          animationIn="zoomInDown"
          animationOut="zoomOutUp"
          animationInTiming={600}
          animationOutTiming={600}
          backdropTransitionInTiming={600}
          backdropTransitionOutTiming={600}
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: Constants.APP_TRANSPARENT_COLOR,
            }}
          >
            <Image360
              imagesArray360={imagesArray360}
              didTapOnclose={() => this.setState({ is360ViewShow: false })}
            />
          </View>
        </Modal>

        <Modal
          isVisible={isSizeChartShow}
          onBackdropPress={() => this.setState({ isSizeChartShow: false })}
          onBackButtonPress={() => this.setState({ isSizeChartShow: false })}
          animationIn="zoomInDown"
          animationOut="zoomOutUp"
          animationInTiming={600}
          animationOutTiming={600}
          backdropTransitionInTiming={600}
          backdropTransitionOutTiming={600}
          style={{
            flex: 1,
          }}
        >
          <View style={styles.sizeChartContainerView}>
            <Image
              style={styles.sizeChartImageView}
              source={{ uri: Constants.APP_S3_BASE_URL + sizeChartImage }}
            />
            <TouchableOpacity
              onPress={() => {
                this.setState({ isSizeChartShow: false });
              }}
              style={styles.sizeChartView}
            >
              <Image source={Images.close} style={{ width: 15, height: 15 }} />
            </TouchableOpacity>
          </View>
        </Modal>

        <Modal
          onBackButtonPress={() => this.setState({ modalVisible: false })}
          isVisible={modalVisible}
        >
          <View style={{ flex: 1 }}>
            <Login
              isGuestLogin={true}
              didTapOnclose={() => this.setState({ modalVisible: false })}
              guestInfoAddedCallback={() => {
                this.setState({ modalVisible: false });
                this._didTapOnAddToCart(true);
              }}
            />
          </View>
        </Modal>

        <ImageView
          glideAlways
          images={imagePopUpArray}
          imageIndex={ipmagePopUpIndex}
          animationType="fade"
          isVisible={isImageViewVisible}
          // renderFooter={this.renderFooter}
          onClose={() => this.setState({ isImageViewVisible: false })}
          onImageChange={(index) => {
            console.log(index);
          }}
        />

        {isLoading && <HudView />}
      </SafeAreaView>
    );
  }
}

export default ProductDetailView;
