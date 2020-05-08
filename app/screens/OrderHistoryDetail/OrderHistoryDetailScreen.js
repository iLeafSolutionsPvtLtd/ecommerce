import {
  View,
  Text,
  StatusBar,
  ScrollView,
  SafeAreaView,
  TouchableOpacity
} from "react-native";
import styles from "./styles";
import React, { Component } from "react";
import Images from "../../config/images";
import Constants from "../../config/constants";
import HudView from "../../components/hudView";
import ItemCell from "../../components/itemCell";
import { translate } from "../../config/languageSwitching/index";
import EmptyDataPlaceholder from "../../components/emptyDataPlaceholder";
import NavigationHeader2 from "../../components/NavigationHeaders/NavigationHeader2";

const ListItem = React.memo(
  ({
    item,
    index,
    productsColors,
    productsSizes,
    addProductToWishList,
    props
  }) => {
    const orderCell = item.items.map(orderedItem => {
      if (orderedItem.parent_item) {
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
              elevation: 3
            }}
          >
            <ItemCell
              item={orderedItem.parent_item}
              addProductToWishList={addProductToWishList}
              index={index}
              productsSizes={productsSizes}
              productsColors={productsColors}
              allowAddOption={true}
              showQuantity={false}
              currency={props.currency}
              itemTotalCost={orderedItem.parent_item.row_total}
            />
          </View>
        );
      }
    });

    return (
      <View
        style={{
          marginTop: 3,
          backgroundColor: Constants.APP_WHITE_COLOR
        }}
      >
        <View style={{ marginHorizontal: 20, marginTop: 10 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.orderNumberText}>
                {translate("Order Number") + " "}
              </Text>
              <Text>{" : "}</Text>
              <Text style={styles.orderNumberText}>{item.increment_id}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", marginTop: 10 }}>
            <Text style={styles.orderNumberText}>{translate("Status")}</Text>
            <Text>{" : "}</Text>
            <Text
              style={[
                styles.deliveryStatusText,
                {
                  color: item.status === "pending" ? "green" : "red"
                }
              ]}
            >
              {item.status}
            </Text>
          </View>
        </View>
        {orderCell}
      </View>
    );
  }
);

class OrderHistoryDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderItem: ""
    };
  }

  componentDidMount() {
    const orderItem = this.props.navigation.state.params
      ? this.props.navigation.state.params.orderItem
      : "";
    if (orderItem) {
      console.log("orderitem::: ", orderItem);
      this.setState({ orderItem: orderItem });
    }
  }

  _didTapOnBackButton = () => {
    this.props.navigation.goBack();
  };

  _getShippingAddress = orderItem => {
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
      currency
    } = this.props;
    const { orderItem } = this.state;
    const paymethod =
      orderItem.payment &&
      orderItem.payment.additional_information &&
      orderItem.payment.additional_information.length > 0
        ? orderItem.payment.additional_information[0]
        : "";

    return (
      <SafeAreaView style={styles.safeContainer}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor={Constants.APP_WHITE_COLOR}
        />
        <NavigationHeader2
          // title={`Order Number : ${orderItem.increment_id}`}
          showBackButton={true}
          didTapOnBackButton={this._didTapOnBackButton}
          hideBottomLine
          isRTL={selectedLanguage === "ar" ? true : false}
          hideSearch={true}
        />
        <Text style={styles.titleStyle}>{translate("Order History")}</Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: Constants.APP_WHITE_COLOR }}
        >
          <View style={styles.scrollContainer}>
            {orderItem.increment_id && (
              <ListItem
                item={orderItem}
                index={0}
                productsSizes={productsSizes}
                productsColors={productsColors}
                props={this.props}
              />
            )}

            {orderItem.status === "pending" && (
              <TouchableOpacity
                activeOpacity={Constants.ACTIVE_OPACITY}
                style={{
                  marginTop: 8,
                  paddingVertical: 4,
                  backgroundColor: Constants.APP_WHITE_COLOR,
                  margin: 20,
                  shadowOffset: { width: 0, height: 5 },
                  shadowColor: "rgba(46,69,187,0.56)",
                  shadowOpacity: 0.3,
                  shadowRadius: 5,
                  borderRadius: 5,
                  paddingBottom: 5,
                  elevation: 3
                }}
              >
                <View
                  style={[styles.wrapper, { justifyContent: "flex-start" }]}
                >
                  <Text style={styles.normalText}>
                    {translate("Order Tracking Number") + " "}
                  </Text>
                  <Text style={styles.textBlue}>{98790890879876}</Text>
                </View>
                <View style={styles.wrapper} />
              </TouchableOpacity>
            )}

            <View style={styles.cardWrapper}>
              <View style={styles.wrapper}>
                <Text style={styles.normalText}>
                  {translate("Order subtotal")}
                </Text>
                <Text style={styles.normalText}>
                  {orderItem.subtotal + " " + orderItem.order_currency_code}
                </Text>
              </View>
              <View style={styles.wrapper}>
                <Text style={styles.normalText}>{translate("Shipping")}</Text>
                <Text style={styles.normalText}>
                  {orderItem.shipping_amount +
                    " " +
                    orderItem.order_currency_code}
                </Text>
              </View>
              <View style={styles.wrapper}>
                <Text style={styles.normalTextBold}>{translate("TOTAL")}</Text>
                <Text style={styles.normalTextBold}>
                  {orderItem.grand_total + " " + orderItem.order_currency_code}
                </Text>
              </View>
            </View>

            <View
              style={{
                backgroundColor: "#FFFFFF",
                paddingBottom: 4
              }}
            >
              <View style={styles.wrapperColumn}>
                <Text style={styles.largeTextBold}>
                  {translate("SHIPPING ADDRESS")}
                </Text>
                <Text style={styles.addressText}>
                  {orderItem.billing_address
                    ? this._getShippingAddress(orderItem)
                    : ""}
                </Text>
              </View>
            </View>

            <View style={{ marginHorizontal: 20 }}>
              <Text style={styles.largeTextBold}>
                {translate("Payment Details")}
              </Text>
              <View style={[styles.underLineStyle, { marginVertical: 10 }]} />
              <Text style={[styles.addressText, { marginBottom: 50 }]}>
                {translate("Payment Method") + " - " + paymethod}
              </Text>
            </View>
          </View>
        </ScrollView>

        {!orderItem.increment_id && (
          <View style={{ alignSelf: "center" }}>
            <EmptyDataPlaceholder
              titleText={translate("Your order history is empty")}
              descriptionText={
                "Lorem Ipsum is simply dummy text of the printing"
              }
              placeHolderImage={Images.noWishlist}
            />
          </View>
        )}
        {isLoading && <HudView />}
      </SafeAreaView>
    );
  }
}

export default OrderHistoryDetailScreen;
