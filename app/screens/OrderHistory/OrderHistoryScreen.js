import {
  Text,
  View,
  FlatList,
  StatusBar,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import styles from "./styles";
import React, { Component } from "react";
import Images from "../../config/images";
import { isEmpty } from "../../config/common";
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
    didTapOnItem,
    props,
  }) => {
    const orderCell = item.items.map((orderedItem) => {
      let itemData = orderedItem.parent_item
        ? orderedItem.parent_item
        : orderedItem;

      if (itemData) {
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
            <ItemCell
              item={itemData}
              addProductToWishList={addProductToWishList}
              index={index}
              productsSizes={productsSizes}
              productsColors={productsColors}
              allowAddOption={true}
              showQuantity={false}
              currency={props.currency}
              itemTotalCost={itemData.row_total}
            />
          </View>
        );
      }
    });

    return (
      <TouchableOpacity
        activeOpacity={Constants.ACTIVE_OPACITY}
        onPress={() => {
          didTapOnItem(item, index);
        }}
        style={{
          marginTop: 3,
          backgroundColor: Constants.APP_WHITE_COLOR,
          marginBottom: 10,
        }}
      >
        <View style={{ marginHorizontal: 20, marginTop: 10 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.orderNumberText}>
                {translate("Order Number")}
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
                  color: item.status === "pending" ? "green" : "red",
                },
              ]}
            >
              {item.status}
            </Text>
          </View>
        </View>
        {orderCell}
      </TouchableOpacity>
    );
  }
);

class OrderHistoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderList: "",
    };
  }

  componentDidMount() {
    this.props.getOrderHistory((response) => {
      response.items.map((orderedItem) => {
        let arr = [];
        arr = orderedItem.items.filter((subItem) => {
          return subItem.product_type === "simple";
        });
        orderedItem.items = arr;
      });
      console.log("order history after ", response);

      this.setState({ orderList: response.items });
    });
  }

  _didTapOnBackButton = () => {
    this.props.navigation.goBack();
  };

  _didTapOnListItem = (item, index) => {
    this.props.navigation.navigate("OrderHistoryDetail", { orderItem: item });
  };

  render() {
    const {
      selectedLanguage,
      cartArray,
      guestCartArray,
      userToken,
      productsSizes,
      productsColors,
      isLoading,
      isRTL,
      currency,
    } = this.props;
    const { orderList } = this.state;
    const isUserLoggedIn = isEmpty(userToken);
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

        <Text style={styles.titleStyle}>{translate("Order History")}</Text>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: Constants.APP_WHITE_COLOR }}
        >
          <View style={styles.scrollContainer}>
            {orderList.length > 0 && (
              <FlatList
                data={orderList}
                extraData={this.props}
                renderItem={({ item, index }) => (
                  <ListItem
                    item={item}
                    index={index}
                    productsSizes={productsSizes}
                    productsColors={productsColors}
                    didTapOnItem={() => this._didTapOnListItem(item, index)}
                    props={this.props}
                  />
                )}
              />
            )}
          </View>
        </ScrollView>
        {!isLoading && orderList.length == 0 && (
          <View style={{ alignSelf: "center" }}>
            <EmptyDataPlaceholder
              titleText={translate("Your order history is empty")}
              descriptionText={translate("order_history_empty_placeholder")}
              placeHolderImage={Images.noWishlist}
            />
          </View>
        )}
        {isLoading && <HudView />}
      </SafeAreaView>
    );
  }
}

export default OrderHistoryScreen;
