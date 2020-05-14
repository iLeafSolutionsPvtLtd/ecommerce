/**
 * Created by iLeaf Solutions Pvt.Ltd
 * on February 19, 2020
 * CartView - Cart View will show the cart items added by the user.
 */

import {
  View,
  Text,
  Image,
  FlatList,
  StatusBar,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import {
  isEmpty,
  showSingleAlert,
  showSimpleSnackbar,
  showAlertWithCallback,
} from "../../config/common";
import styles from "./styles.js";
import Login from "../LoginScreen";
import Modal from "react-native-modal";
import Images from "../../config/images";
import Constants from "../../config/constants";
import HudView from "../../components/hudView";
import ItemCell from "../../components/itemCell";
import { useSelector, useDispatch } from "react-redux";
import * as CartActions from "../../actions/cartActions";
import { translate } from "../../config/languageSwitching";
import React, { useState, useCallback, memo, useEffect } from "react";
import EmptyDataPlaceholder from "../../components/emptyDataPlaceholder";
import NavigationHeader2 from "../../components/NavigationHeaders/NavigationHeader2";

const QuantityControl = ({
  quantiryItem,
  getQuantity,
  updateCartProduct,
  isNetworkAvailable,
}) => {
  const [quantityValue, setQuantity] = useState(quantiryItem.qty);

  function incrementQuantity() {
    if (!isNetworkAvailable) {
      showSingleAlert(translate("No internet connection"));
      return;
    }
    if (quantityValue >= Constants.MAX_PRODUCT_COUNT) {
      showSimpleSnackbar(
        translate("Product maximum count is") +
          " " +
          Constants.MAX_PRODUCT_COUNT
      );
      return;
    }

    setQuantity(quantityValue + 1);
    getQuantity(quantityValue + 1);
    updateCartProduct(quantityValue + 1);
  }

  function decrementQuantity() {
    if (!isNetworkAvailable) {
      showSingleAlert(translate("No internet connection"));
      return;
    }
    if (quantityValue - 1 >= 1) {
      setQuantity(quantityValue - 1);
      getQuantity(quantityValue - 1);
      updateCartProduct(quantityValue - 1);
    }
  }

  return (
    <View
      style={{
        flexDirection: "row",
        // marginVertical: 10,
        height: 30,
        width: 100,
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 5,
        marginLeft: 10,
        borderColor: Constants.APP_GRAY_COLOR,
      }}
    >
      <TouchableOpacity
        onPress={decrementQuantity}
        style={{
          width: "30%",
          height: 30,
          justifyContent: "center",
          alignItems: "center",
          borderRightWidth: 1,
          borderRightColor: Constants.APP_GRAY_COLOR,
        }}
      >
        <Text
          style={{
            color: Constants.APP_GREY_TEXT_COLOR,
            fontFamily: Constants.Fonts.REGULAR,
            fontSize: 16,
          }}
        >
          -
        </Text>
      </TouchableOpacity>
      <TextInput
        style={{
          // marginHorizontal: 14,
          width: "40%",
          textAlign: "center",
          fontSize: 16,
          height: 50,
          fontFamily: Constants.Fonts.MEDIUM,
          color: Constants.APP_BLACK_COLOR,
        }}
        value={quantityValue.toString()}
      />

      <TouchableOpacity
        onPress={incrementQuantity}
        style={{
          width: "30%",
          height: 30,
          justifyContent: "center",
          alignItems: "center",
          borderLeftColor: Constants.APP_GRAY_COLOR,
          borderLeftWidth: 1,
        }}
      >
        <Text
          style={{
            color: Constants.APP_GREY_TEXT_COLOR,
            fontFamily: Constants.Fonts.REGULAR,
            fontSize: 16,
          }}
        >
          +
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const CategoryCall = memo(
  ({
    item,
    index,
    productsColors,
    removeItemFromCart,
    productsSizes,
    addProductToWishList,
    updateCartProductContainer,
    currency,
    totalCost,
    userToken,
    loginCallback,
    isNetworkAvailable,
  }) => {
    function removeFromCart() {
      if (!isNetworkAvailable) {
        showSingleAlert(translate("No internet connection"));
        return;
      }
      removeItemFromCart(item, index);
    }
    function addToWishList() {
      if (userToken.length > 0) {
        addProductToWishList(item);
      } else {
        showAlertWithCallback(
          translate("user_not_login"),
          translate("Login"),
          translate("Cancel"),
          () => {
            loginCallback(true);
          },
          null
        );
      }
    }

    const totalProductGross = item.price * item.qty;
    const [totalGross, setTotalGross] = useState(totalProductGross);

    function getQuantity(quantityValue) {
      setTotalGross(quantityValue * item.price);
    }

    function updateCartProduct(qty) {
      updateCartProductContainer(qty, item, index);
    }

    return (
      <View
        style={{
          backgroundColor: Constants.APP_WHITE_COLOR,
          margin: 20,
          shadowOffset: { width: 0, height: 5 },
          shadowColor: "rgba(46,69,187,0.56)",
          shadowOpacity: 0.3,
          shadowRadius: 5,
          borderRadius: 5,
          elevation: 3,
        }}
      >
        <View style={{ marginHorizontal: 0 }}>
          <ItemCell
            item={item}
            addProductToWishList={addProductToWishList}
            index={index}
            productsSizes={productsSizes}
            productsColors={productsColors}
            allowAddOption={true}
            showQuantity={false}
            currency={currency}
            updateCartProductToParent={updateCartProduct}
            totalCost={totalCost}
            isNetworkAvailable={isNetworkAvailable}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            height: 50,
            borderTopColor: Constants.APP_GRAY_COLOR,
            borderTopWidth: 0.5,
            alignItems: "center",
          }}
        >
          <View style={{ flex: 1 }}>
            <QuantityControl
              quantiryItem={item}
              getQuantity={getQuantity}
              updateCartProduct={updateCartProduct}
              isNetworkAvailable={isNetworkAvailable}
            />
          </View>
          <TouchableOpacity
            activeOpacity={Constants.ACTIVE_OPACITY}
            onPress={removeFromCart}
          >
            <View
              style={{
                width: 36,
                height: 30,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: Constants.APP_GRAY_COLOR,
                alignItems: "center",
                justifyContent: "center",
                marginRight: 10,
              }}
            >
              <Image
                source={Images.close}
                style={{
                  tintColor: Constants.APP_GRAY_COLOR,
                  width: 10,
                  height: 10,
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
);

export default function CartScreen(props) {
  const isRTL = useSelector((state) =>
    state.appReducer.selectedLanguage === "ar" ? true : false
  );
  const isNetworkAvailable = useSelector(
    (state) => state.appReducer.isNetworkAvailable
  );
  const productsSizes = useSelector((state) => state.appReducer.productsSizes);
  const currency = useSelector((state) => state.appReducer.currency);
  const productsColors = useSelector(
    (state) => state.appReducer.productsColors
  );
  const cartList = useSelector((state) => state.cartReducer.cartArray);
  const guestcartList = useSelector(
    (state) => state.cartReducer.guestCartArray
  );
  const userToken = useSelector((state) => state.appReducer.userToken);
  const guestToken = useSelector((state) => state.appReducer.guestToken);
  const isLoading = useSelector((state) => state.loadingReducer.isLoading);
  const cartId = useSelector((state) => state.loginReducer.cartID);
  const guestInfo = useSelector((state) => state.loginReducer.guestInfo);

  const isUserLoggedIn = isEmpty(userToken);
  const [modalVisible, setModalVisible] = useState(false);
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [totalCost, setTotalCost] = useState(false);
  const [finalPrice, setFinalPrice] = useState(0);
  const [productTotal, setProductTotal] = useState(0);
  const [shippingPrice, setShippingPrice] = useState(0);

  const arrLength =
    userToken.length > 0 ? cartList.length : guestcartList.length;
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("commonTotalPriceUpdate();", arrLength);
    if (arrLength > 0) {
      commonTotalPriceUpdate();
    }
  }, []);

  function addProductToWishList(product) {
    let dict = product.extension_attributes;
    let entityId = dict.entity_id;
    dispatch(
      CartActions.addProductFromCartToWishList(
        entityId,
        product.item_id,
        (status) => {
          alert(status);
          if (status) {
            commonTotalPriceUpdate();
          }
        }
      )
    );
  }

  function commonTotalPriceUpdate() {
    dispatch(
      CartActions.getTotalCost((totalCostDict) => {
        if (totalCostDict) {
          setTotalCost(totalCostDict);
          setProductTotal(totalCostDict.subtotal_with_discount);
          setShippingPrice(totalCostDict.shipping_amount);
          setFinalPrice(
            totalCostDict.total_segments.length > 0
              ? totalCostDict.grand_total
              : 0
          );
        }
      })
    );
  }

  function updateCartProductContainer(qty, item, index) {
    if (!isNetworkAvailable) {
      return;
    }

    let guestparams = {
      cart_item: {
        sku: item.sku,
        qty: qty,
        quote_id: userToken === "" ? guestToken : cartId,
        item_id: item.item_id,
      },
    };

    if (userToken === "") {
      dispatch(
        CartActions.updateGuestCart(
          item.item_id,
          updateGuestCartCallback,
          guestparams,
          index
        )
      );
    } else {
      dispatch(
        CartActions.updateUserCart(guestparams, updateCallback, item.item_id)
      );
    }
  }

  function removeItemFromCartContainer(item, index) {
    showAlertWithCallback(
      translate("product remove confirmation"),
      translate("Yes"),
      translate("No"),
      () => {
        if (userToken === "") {
          dispatch(
            CartActions.removeGuestCart(
              item.item_id,
              removeGuestCartCallback,
              index
            )
          );
        } else {
          dispatch(
            CartActions.removeUserCart(item.item_id, removeUserCartCallback)
          );
        }
      },
      null
    );
  }

  function updateGuestCartCallback(status) {
    console.log("updateGuestCartCallback status", status);
    if (status) {
      commonTotalPriceUpdate();
    }
  }
  function removeGuestCartCallback(status) {
    console.log("removeGuestCartCallback status", status);
    if (status) {
      commonTotalPriceUpdate();
    }
  }
  function removeUserCartCallback(status) {
    console.log("removeUserCartCallback status", status);
    if (status) {
      commonTotalPriceUpdate();
    }
  }

  function updateCallback(status) {
    if (status) {
      commonTotalPriceUpdate();
    }
  }

  function _didTapOnContinueShopping() {
    props.navigation.navigate("Home");
  }

  function _didTapOnCheckOut() {
    let cartData = isUserLoggedIn ? guestcartList : cartList;

    if (cartData.length > Constants.MAX_CART_SIZE) {
      showSingleAlert(
        translate("cart count exceeds1") +
          Constants.MAX_CART_SIZE +
          translate("cart count exceeds2")
      );
      return;
    }

    let isOverItem = false;
    cartData.map((item) => {
      if (item.qty > Constants.MAX_PRODUCT_COUNT) {
        isOverItem = true;
      }
    });

    if (isOverItem) {
      showSingleAlert(
        translate("products maximum count exceeds1") +
          Constants.MAX_PRODUCT_COUNT +
          translate("products maximum count exceeds2")
      );
      return;
    }

    if (userToken.length > 0) {
      props.navigation.navigate("Checkout", { totalCost });
    } else {
      if (!guestInfo) {
        setModalVisible(true);
      } else {
        props.navigation.navigate("Checkout", { totalCost });
      }
    }
  }

  function _didTapOnBackButton() {
    props.navigation.goBack();
  }

  const renderFooter = () => {
    return (
      <View>
        <View style={styles.returnPolicyView}>
          <View
            style={{ flexDirection: "row", alignItems: "center", height: 85 }}
          >
            <Image
              style={{ width: 25, height: 25, marginLeft: 15 }}
              source={Images.refreshIcon}
            />
            <View style={{ marginHorizontal: 15 }}>
              <Text style={styles.sendBackTitleText}>
                {translate("FREE AND EASY  RETURNS")}
              </Text>
              <Text style={styles.sendBackText}>
                {translate("Send_back_order")}
              </Text>
              <Text style={styles.moreinfo}>{translate("More info")}</Text>
            </View>
          </View>
        </View>

        <View
          style={[styles.returnPolicyView, { marginTop: 20, marginBottom: 8 }]}
        >
          {shippingPrice > 0 && (
            <View style={{ flexDirection: "row" }}>
              <Text style={[styles.orderInfo, { flex: 1 }]}>
                {translate("Order subtotal")}
              </Text>
              <Text style={styles.orderInfo}>
                {productTotal} {currency}
              </Text>
            </View>
          )}
          {shippingPrice > 0 && (
            <View style={{ flexDirection: "row" }}>
              <Text style={[styles.orderInfo, { flex: 1 }]}>
                {translate("Shipping")}{" "}
              </Text>
              <Text style={styles.orderInfo}>
                {shippingPrice} {currency}
              </Text>
            </View>
          )}
          <View style={{ flexDirection: "row" }}>
            <Text
              style={[
                styles.orderInfo,
                {
                  flex: 1,
                  color: Constants.APP_BLACK_COLOR,
                  fontFamily: Constants.Fonts.MEDIUM,
                  marginBottom: 10,
                },
              ]}
            >
              {translate("TOTAL")}
            </Text>
            <Text
              style={[
                styles.orderInfo,
                {
                  color: Constants.APP_BLACK_COLOR,
                  fontFamily: Constants.Fonts.MEDIUM,
                },
              ]}
            >
              {finalPrice} {currency}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: Constants.APP_WHITE_COLOR }}
    >
      {/* <StatusBar
        // barStyle="light-content"
        hidden={false}
        backgroundColor={Constants.APP_WHITE_COLOR}
        translucent={false}
      /> */}

      <NavigationHeader2
        title={""}
        showBackButton={true}
        didTapOnBackButton={_didTapOnBackButton}
        hideBottomLine={true}
        isRTL={isRTL}
        hideSearch={true}
      />

      {!arrLength ? (
        <View style={{ flex: 1 }}>
          <Text style={styles.titleStyle}>{translate("Your Cart")}</Text>
          <EmptyDataPlaceholder
            titleText={translate("Your Cart is empty")}
            descriptionText={translate("cart_empty_list_placeholder")}
            placeHolderImage={Images.cartEmpty}
          />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          {totalCost && (
            <Text style={styles.titleStyle}>{translate("Your Cart")}</Text>
          )}
          <View style={{ backgroundColor: "white", flex: 1 }}>
            {totalCost && (
              <FlatList
                style={{
                  flex: 1,
                  backgroundColor: Constants.APP_WHITE_COLOR,
                }}
                data={isUserLoggedIn ? guestcartList : cartList}
                extraData={isUserLoggedIn ? guestcartList : cartList}
                renderItem={({ item, index }) => (
                  <CategoryCall
                    item={item}
                    addProductToWishList={addProductToWishList}
                    index={index}
                    productsSizes={productsSizes}
                    productsColors={productsColors}
                    removeItemFromCart={removeItemFromCartContainer}
                    updateCartProductContainer={updateCartProductContainer}
                    currency={currency}
                    totalCost={totalCost}
                    userToken={userToken}
                    loginCallback={(value) => setLoginModalVisible(value)}
                    isNetworkAvailable={isNetworkAvailable}
                  />
                )}
                ListFooterComponent={renderFooter}
              />
            )}
          </View>
          {totalCost && (
            <View style={styles.bottomButtonContainer}>
              {/* <TouchableOpacity
                style={styles.addTocartButton}
                activeOpacity={Constants.activeOpacity}
                onPress={_didTapOnContinueShopping}
              >
                <Text style={styles.addToCartText}>
                  {translate("CONTINUE SHOPPING")}
                </Text>
              </TouchableOpacity> */}
              <TouchableOpacity
                style={styles.buyNowButton}
                activeOpacity={Constants.activeOpacity}
                onPress={_didTapOnCheckOut}
              >
                <Text style={styles.buyNowText}>{translate("CHECKOUT")}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
      <Modal
        onBackButtonPress={() => setModalVisible(false)}
        isVisible={modalVisible}
      >
        <View style={{ flex: 1 }}>
          <Login
            isGuestLogin={true}
            didTapOnclose={() => setModalVisible(false)}
            guestInfoAddedCallback={() => {
              setModalVisible(false);
              props.navigation.navigate("Checkout", { totalCost });
            }}
          />
        </View>
      </Modal>
      <Modal
        onBackButtonPress={() => setLoginModalVisible(false)}
        isVisible={loginModalVisible}
      >
        <View style={{ flex: 1 }}>
          <Login didTapOnclose={() => setLoginModalVisible(false)} />
        </View>
      </Modal>

      {isLoading && <HudView />}
    </SafeAreaView>
  );
}
