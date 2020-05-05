/**
 * Created by iLeaf Solutions Pvt.Ltd
 * on February 19, 2020
 * AddressListView - Address List View will show the Addresses of user.
 */

import {
  View,
  Text,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Styles from "./style";
import Images from "../../config/images";
import constants from "../../config/constants";
import Countries from "../../lib/countires.js";
import HudView from "../../components/hudView";
import React, { Component, memo } from "react";
import { showAlertWithCallback } from "../../config/common";
import { translate } from "../../config/languageSwitching/index";
import EmptyDataPlaceholder from "../../components/emptyDataPlaceholder";
import NavigationHeader2 from "../../components/NavigationHeaders/NavigationHeader2";

class AddressListScreen extends Component {
  newDefaultAddress = (selectedIndex) => {
    let addressListArray = this.props.addressList;
    addressListArray.map((item) => {
      item["default_billing"] = false;
    });

    let addressDict = addressListArray[selectedIndex];
    addressDict["default_billing"] = true;
    addressListArray[selectedIndex] = addressDict;

    let userInfo = this.props.userInfo;
    userInfo["addresses"] = addressListArray;
    this.props.editAddressUser({ customer: userInfo }, () => {
      console.log("SUCCESS");
    });
  };

  removeAddressFromList = (selectedIndex) => {
    let addressArray = this.props.addressList;
    let selectedAddressDict = addressArray[selectedIndex];
    showAlertWithCallback(
      translate("removeAddress"),
      translate("Yes"),
      translate("No"),
      () => {
        this.props.removeAddress(selectedAddressDict.id, selectedIndex);
      },
      null
    );
  };

  didTapOnBackButton = () => {
    this.props.navigation.goBack();
  };

  render() {
    const { addressList, isLoading } = this.props;
    return (
      <SafeAreaView style={Styles.container}>
        <NavigationHeader2
          hideBottomLine
          hideSearch={true}
          showBackButton={true}
          didTapOnBackButton={this.didTapOnBackButton}
          isRTL={this.props.isRTL}
        />
        <Text style={Styles.titleStyle}>{translate("Address Book")}</Text>
        {addressList && addressList.length == 0 ? (
          <View style={{ flex: 1 }}>
            <EmptyDataPlaceholder
              titleText={translate("Your address list is empty")}
              descriptionText={translate(
                "Please add your Billing/Shipping address"
              )}
              placeHolderImage={Images.addressEmpty}
              imageStyle={{ width: 100, height: 100, marginBottom: 30 }}
            />
          </View>
        ) : (
          <View style={{ flex: 1, backgroundColor: constants.APP_WHITE_COLOR }}>
            <FlatList
              data={addressList}
              style={{ flex: 1 }}
              renderItem={({ item, index }) => (
                <AdressListComponent
                  setDefaultAddress={this.newDefaultAddress}
                  removeAddressFromList={this.removeAddressFromList}
                  list={addressList}
                  item={item}
                  index={index}
                  props={this.props}
                />
              )}
              extraData={this.props}
            />
          </View>
        )}
        <View style={Styles.addAddressBtn}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("AddAddressScreen", {
                details: {},
              });
            }}
            style={Styles.btn_touchable_style}
          >
            <Text
              style={{
                color: constants.APP_WHITE_COLOR,
                fontFamily: constants.Fonts.MEDIUM,
                fontSize: 15,
              }}
            >
              {translate("ADD NEW ADDRESS")}
            </Text>
          </TouchableOpacity>
        </View>
        {isLoading && <HudView />}
      </SafeAreaView>
    );
  }
}

/** Value Deals Item Component */
const AdressListComponent = memo(
  ({ item, props, index, setDefaultAddress, removeAddressFromList }) => {
    let a = item.default_billing;
    const onChoose = (selectedIndex) => {
      setDefaultAddress(selectedIndex);
    };
    const countryName = Countries[item.country_id].name.common;
    const removeAddress = (selectedIndex) => {
      removeAddressFromList(selectedIndex);
    };
    return (
      <TouchableOpacity
        style={Styles.addressCardContainer}
        onPress={() => {
          let didSelectUserAddress = props.navigation.state.params
            ? props.navigation.state.params.didSelectUserAddress
            : null;
          if (didSelectUserAddress) {
            didSelectUserAddress(item, index);
            props.navigation.goBack();
          }
        }}
      >
        {/* <View style={Styles.addressCardContainer}> */}
        <View style={[Styles.card_name_row]}>
          <TouchableOpacity
            hitSlop={{ left: 10, top: 10, bottom: 10, right: 10 }}
            onPress={() => {
              if (!a) onChoose(index);
            }}
          >
            <View
              style={{
                width: 20,
                height: 20,
                marginTop: 5,
                borderRadius: 10,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: a
                  ? constants.APP_THEME_COLOR
                  : constants.APP_GRAY_COLOR,
              }}
            >
              <Image
                source={Images.tick}
                style={[
                  Styles.checkmark,
                  {
                    tintColor: constants.APP_WHITE_COLOR,
                  },
                ]}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
          <View style={{ marginLeft: 30 }}>
            <Text
              style={{
                fontFamily: constants.Fonts.BOLD,
                color: constants.APP_BLACK_COLOR,
                marginBottom: 5,
                marginTop: 5,
              }}
            >
              {item.firstname} {item.lastname}
            </Text>
            <Text
              style={{
                color: "#787878",
                fontFamily: constants.Fonts.REGULAR,
                marginBottom: 3,
                textAlign: "left",
              }}
            >
              {item.street[0]}
            </Text>
            {item.street[1] ? (
              <Text
                style={{
                  color: "#787878",
                  fontFamily: constants.Fonts.REGULAR,
                  marginBottom: 3,
                  textAlign: "left",
                }}
              >
                {item.street[1]}
              </Text>
            ) : null}
            {item.street[2] ? (
              <Text
                style={{
                  color: "#787878",
                  fontFamily: constants.Fonts.REGULAR,
                  marginBottom: 3,
                }}
              >
                {item.street[2]}
              </Text>
            ) : null}
            <Text
              style={{ color: "#787878", fontFamily: constants.Fonts.REGULAR }}
            >
              {item.city}
              {", "}
              {/* {CountryData[0].full_name_english} */}
              {countryName}
            </Text>
          </View>
        </View>
        <View style={{ marginVertical: 10, marginLeft: 50 }}>
          <Text
            style={{
              color: "#787878",
              textAlign: "left",
              fontFamily: constants.Fonts.REGULAR,
            }}
          >
            {item.telephone}
          </Text>
        </View>
        <TouchableOpacity
          hitSlop={{ left: 20, right: 20, top: 20, bottom: 20 }}
          onPress={() => {
            props.navigation.navigate("AddAddressScreen", {
              details: item,
              edit: true,
            });
          }}
          style={Styles.btn_bottom_touchable_style}
        >
          <Text
            style={[
              {
                fontFamily: constants.Fonts.MEDIUM,
                color: constants.APP_THEME_COLOR,
              },
              Styles.text_align,
            ]}
          >
            {translate("Edit")}
          </Text>
        </TouchableOpacity>
        {/* </View> */}
        <TouchableOpacity
          onPress={() => removeAddress(index)}
          hitSlop={{ left: 20, top: 20, bottom: 20, right: 20 }}
          style={{
            position: "absolute",
            right: -5,
            top: -5,
            width: 20,
            height: 20,
            borderRadius: 10,
            backgroundColor: constants.APP_THEME_COLOR,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image source={Images.close} style={{ width: 7, height: 7 }} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
);

export default AddressListScreen;
