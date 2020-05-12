import {
  View,
  Text,
  FlatList,
  StatusBar,
  ScrollView,
  BackHandler,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import styles from "./styles";
import React, { Component } from "react";
import Constants from "../../config/constants";
import ItemCell from "../../components/itemCell";
import { StackActions } from "@react-navigation/native";
import { translate } from "../../config/languageSwitching/index";
import NavigationHeader2 from "../../components/NavigationHeaders/NavigationHeader2";

const CategoryCall = React.memo(
  ({
    item,
    index,
    productsColors,
    productsSizes,
    addProductToWishList,
    currency,
    totalCost,
  }) => {
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
          paddingBottom: 5,
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
            allowAddOption={false}
            showQuantity={true}
            currency={currency}
            totalCost={totalCost}
          />
        </View>
      </View>
    );
  }
);

class OrderCompletionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addressDict: "",
      totalCostDict: "",
      itemArray: "",
      shippingAmount: "",
    };
  }

  componentDidMount() {
    const addressDict = this.props.navigation.state.params.addressDict;
    const totalCostDict = this.props.navigation.state.params.totalCostDict;
    const itemArray = this.props.navigation.state.params.itemArray;
    const shippingAmount = this.props.navigation.state.params.shippingAmount;

    this.setState({ addressDict: addressDict });
    this.setState({ totalCostDict: totalCostDict });
    this.setState({ itemArray: itemArray });
    this.setState({ shippingAmount });

    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
  }

  handleBackButtonClick = () => {
    this.props.navigation.dispatch(StackActions.popToTop());
    return true;
  };

  _didTapOnBackButton = () => {
    //this.props.navigation.navigate('Cart');
    this.props.navigation.dispatch(StackActions.popToTop());
  };

  _getShippingAddress = (orderItem) => {
    return (
      orderItem.billing_address.firstname +
      " " +
      orderItem.billing_address.lastname +
      "\n" +
      orderItem.billing_address.street[0] +
      "\n" +
      orderItem.billing_address.city +
      "\n" +
      orderItem.billing_address.postcode +
      "\nmob: " +
      orderItem.billing_address.telephone
    );
  };

  render() {
    const {
      selectedLanguage,
      userToken,
      productsSizes,
      productsColors,
      isLoading,
      isRTL,
      currency,
      navigation,
    } = this.props;
    const {
      itemArray,
      addressDict,
      totalCostDict,
      shippingAmount,
    } = this.state;

    return (
      <SafeAreaView style={styles.safeContainer}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor={Constants.APP_WHITE_COLOR}
        />
        <NavigationHeader2
          hideBottomLine
          showBackButton={true}
          didTapOnBackButton={this._didTapOnBackButton}
          isRTL={selectedLanguage === "ar" ? true : false}
          hideSearch={true}
        />
        <Text style={styles.titleStyle}>{translate("Order confirmation")}</Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: Constants.APP_WHITE_COLOR }}
        >
          <View style={styles.scrollContainer}>
            {/* <View
              style={{
                paddingHorizontal: 20,
                marginTop: 2,
                backgroundColor: "#FFFFFF",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.orderConfirmationText}>
                  {translate("Order confirmation")}
                </Text>
              </View>
              <Text style={styles.orderConfirmationSubText}>
                {
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. "
                }
              </Text>
              <View style={styles.underLineStyle} />
            </View> */}

            <FlatList
              style={{ flex: 1, backgroundColor: Constants.APP_WHITE_COLOR }}
              data={itemArray}
              extraData={itemArray}
              renderItem={({ item, index }) => (
                <CategoryCall
                  item={item}
                  index={index}
                  productsSizes={productsSizes}
                  productsColors={productsColors}
                  currency={currency}
                  totalCost={totalCostDict}
                />
              )}
            />

            <View style={styles.cardWrapper}>
              <View style={styles.wrapper}>
                <Text style={styles.normalText}>
                  {translate("Order subtotal")}
                </Text>
                <Text style={styles.normalText}>
                  {totalCostDict.subtotal + " " + currency}
                </Text>
              </View>
              <View style={styles.wrapper}>
                <Text style={styles.normalText}>{translate("Shipping")}</Text>
                <Text style={styles.normalText}>
                  {shippingAmount + " " + currency}
                </Text>
              </View>
              {/* <View style={[styles.underLineStyle2]} /> */}
              <View style={styles.wrapper}>
                <Text style={styles.normalTextBold}>{translate("TOTAL")}</Text>
                <Text style={styles.normalTextBold}>
                  {totalCostDict.grand_total + " " + currency}
                </Text>
              </View>
            </View>

            <View
              style={{
                backgroundColor: "#FFFFFF",
                marginTop: 8,
                paddingBottom: 4,
              }}
            >
              <View style={styles.wrapperColumn}>
                <Text style={styles.largeTextBold}>
                  {translate("SHIPPING AND DELIVERY ADDRESS")}
                </Text>
                <Text style={styles.addressText}>
                  {//  'Cecilia Chapman \n711-2880 Nulla St. \nMankato Mississippi 96522 \n(257) 563-7401'
                  addressDict.firstname +
                    " " +
                    addressDict.lastname +
                    "\n" +
                    addressDict.street +
                    "\n" +
                    addressDict.city +
                    "\n" +
                    addressDict.postcode +
                    "\nmob: " +
                    addressDict.telephone}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>

        <View
          style={{
            backgroundColor: "#FFFFFF",
          }}
        >
          <TouchableOpacity
            activeOpacity={Constants.ACTIVE_OPACITY}
            style={styles.buttonOutlineContainer}
            activeOpacity={Constants.activeOpacity}
            onPress={() => {
              navigation.dispatch(StackActions.popToTop());
            }}
          >
            <Text style={styles.updateText}>
              {translate("CONTINUE SHOPPING")}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

export default OrderCompletionScreen;
