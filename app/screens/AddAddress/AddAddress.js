/**
 * Created by iLeaf Solutions Pvt.Ltd
 * on February 19, 2020
 * AddAddressView - In this screen user can add/edit their address.
 */

import {
  View,
  Text,
  Image,
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Styles from "./style";
import React, { Component } from "react";
import Images from "../../config/images";
import { isEmpty } from "../../config/common";
import Countries from "../../lib/countires.js";
import HudView from "../../components/hudView";
import constants from "../../config/constants";
import CountryPicker from "react-native-country-picker-modal";
import { translate } from "../../config/languageSwitching/index";
import { showSingleAlert, checkPhoneNumberValid } from "../../config/common";
import NavigationHeader2 from "../../components/NavigationHeaders/NavigationHeader2";

let countryFromAddress = "";
class AddAddress extends Component {
  constructor(props) {
    super(props);
    const { details, edit } = props.navigation.state.params;
    const { storeCode } = props;
    console.log("details", details);
    let streetAddress = "";

    if (edit)
      details.street.map((item) => {
        streetAddress = streetAddress + item + "\n";
      });

    if (
      props.navigation.state.params.isFromGuestCheckout &&
      details &&
      details.street
    ) {
      details.street.map((item) => {
        streetAddress = streetAddress + item + "\n";
      });
    }

    let countryName = "";
    let countryCode = "";

    if (storeCode === "kwstoreen" || storeCode === "kwstorear") {
      countryName = "Kuwait";
      countryCode = "KW";
    } else if (storeCode === "bhstoreen" || storeCode === "bhstorear") {
      countryName = "Bahrain";
      countryCode = "BH";
    } else if (storeCode === "sastoreen" || storeCode === "sastorear") {
      countryName = "KSA";
      countryCode = "SA";
    } else if (storeCode === "qastoreen" || storeCode === "qastorear") {
      countryName = "Qatar";
      countryCode = "QA";
    } else if (storeCode === "omstoreen" || storeCode === "omstorear") {
      countryName = "Oman";
      countryCode = "OM";
    } else if (storeCode === "uastoreen" || storeCode === "uastorear") {
      countryName = "UAE";
      countryCode = "AE";
    } else {
      countryName = "";
      countryCode = "";
    }

    if (details.country_id && details.country_id !== "") {
      countryCode = details.country_id;
      console.log("CODE", countryCode);
      countryName = Countries[countryCode].name.common;
      console.log("COUNTRY DICT == ", countryName);
    }

    this.state = {
      availableCountries: [],
      availableRegions: [],
      countryRegions: [],
      isFormValid: true,
      regionID: "",
      isEdit: edit,
      isShowCountryPicker: false,
      countryName: countryName,
      countryCode: countryCode,

      formFeilds: {
        firstname: {
          text: details.firstname || "",
          valid:
            details.firstname && !isEmpty(details.firstname) ? true : false,
        },
        lastname: {
          text: details.lastname || "",
          valid: details.lastname && !isEmpty(details.lastname) ? true : false,
        },
        city: {
          text: details.city || "",
          valid: details.city && !isEmpty(details.city) ? true : false,
        },
        address: {
          text: details && details.street ? streetAddress : "",
          valid:
            details && details.street && streetAddress.length > 0
              ? true
              : false,
        },
        zipcode: {
          text: details.postcode || "",
          valid: details.postcode && !isEmpty(details.postcode) ? true : false,
        },
        mobile: {
          text: details.telephone || "",
          valid:
            details.telephone && !isEmpty(details.telephone) ? true : false,
        },
        country_state: {
          text: details.country_state || "",
          valid: true,
        },
        country: {
          text: countryFromAddress || "",
          countryID: details.country_id || "",
          valid: countryName !== "",
          // countryFromAddress && !isEmpty(countryFromAddress) ? true : false,
        },
      },
    };
  }

  componentDidMount() {}

  componentWillUnmount() {
    countryFromAddress = "";
  }
  didTapOnBackButton = () => {
    this.props.navigation.goBack();
  };

  render() {
    const {
      firstname,
      lastname,
      city,
      address,
      zipcode,
      mobile,
      country_state,
      country,
    } = this.state.formFeilds;

    const { isShowCountryPicker, countryName } = this.state;
    const { isRTL } = this.props;

    const {
      isFormValid,
      countryRegions,
      isEdit,
      availableRegions,
    } = this.state;

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <NavigationHeader2
          hideBottomLine
          hideSearch={true}
          showBackButton={true}
          didTapOnBackButton={this.didTapOnBackButton}
          isRTL={isRTL}
        />
        <Text style={Styles.titleStyle}>
          {isEdit ? translate("Edit Address") : translate("Add Address")}
        </Text>
        <ScrollView style={{ padding: 10 }}>
          <View style={Styles.holderView}>
            <View style={Styles.iconContainer}>
              <Image source={Images.addressUser} />
            </View>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <TextInput
                value={firstname.text}
                onChangeText={(text) => {
                  this.validateInput(text, "firstname");
                }}
                placeholder={translate("First Name")}
                maxLength={30}
                returnKeyType={"next"}
                onSubmitEditing={() => this.lastNameRef.focus()}
                style={
                  !firstname.valid && !isFormValid
                    ? [
                        Styles.text_input_style_error,
                        { textAlign: isRTL ? "right" : "left" },
                      ]
                    : [
                        Styles.text_input_style,
                        { textAlign: isRTL ? "right" : "left" },
                      ]
                }
              />
            </View>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <TextInput
                value={lastname.text}
                onChangeText={(text) => {
                  this.validateInput(text, "lastname");
                }}
                placeholder={translate("Last Name")}
                ref={(ref) => (this.lastNameRef = ref)}
                maxLength={30}
                returnKeyType={"next"}
                onSubmitEditing={() => this.addressRef.focus()}
                style={
                  !lastname.valid && !isFormValid
                    ? [
                        Styles.text_input_style_error,
                        { textAlign: isRTL ? "right" : "left" },
                      ]
                    : [
                        Styles.text_input_style,
                        { textAlign: isRTL ? "right" : "left" },
                      ]
                }
              />
            </View>
          </View>

          <View style={Styles.holderView}>
            <View style={Styles.iconContainer}>
              <Image source={Images.addressLocation} />
            </View>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <TextInput
                value={address.text}
                multiline={true}
                numberOfLines={4}
                onChangeText={(text) => {
                  this.validateInput(text, "address");
                }}
                placeholder={translate("Address")}
                ref={(ref) => (this.addressRef = ref)}
                maxLength={250}
                returnKeyType={"next"}
                style={
                  !address.valid && !isFormValid
                    ? [
                        Styles.text_input_style_textarea_error,
                        { textAlign: isRTL ? "right" : "left" },
                      ]
                    : [
                        Styles.text_input_style_textarea,
                        { textAlign: isRTL ? "right" : "left" },
                      ]
                }
              />
            </View>
          </View>

          <View style={Styles.holderView}>
            <View style={{ width: 25, height: 45, backgroundColor: "white" }} />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <TextInput
                value={city.text}
                onChangeText={(text) => {
                  this.validateInput(text, "city");
                }}
                placeholder={translate("City/Emirate")}
                ref={(ref) => (this.cityRef = ref)}
                maxLength={30}
                returnKeyType={"next"}
                onSubmitEditing={() => this.zipCodeRef.focus()}
                style={
                  !city.valid && !isFormValid
                    ? [
                        Styles.text_input_style_error,
                        { textAlign: isRTL ? "right" : "left" },
                      ]
                    : [
                        Styles.text_input_style,
                        { textAlign: isRTL ? "right" : "left" },
                      ]
                }
              />
            </View>

            <View style={{ flex: 1, marginLeft: 10 }}>
              <TextInput
                value={zipcode.text}
                keyboardType={"numeric"}
                onChangeText={(text) => {
                  this.validateInput(text, "zipcode");
                }}
                placeholder={translate("Zip")}
                ref={(ref) => (this.zipCodeRef = ref)}
                maxLength={10}
                returnKeyType={"next"}
                style={
                  !zipcode.valid && !isFormValid
                    ? [
                        Styles.text_input_style_error,
                        { textAlign: isRTL ? "right" : "left" },
                      ]
                    : [
                        Styles.text_input_style,
                        { textAlign: isRTL ? "right" : "left" },
                      ]
                }
              />
            </View>
          </View>

          <View style={Styles.holderView}>
            <View style={{ width: 25, height: 45, backgroundColor: "white" }} />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ isShowCountryPicker: true });
                }}
                style={
                  !country.valid && !isFormValid
                    ? [Styles.text_input_style_error]
                    : {
                        backgroundColor: "#f4f6f8",
                        height: 45,
                        paddingLeft: 10,
                        borderRadius: 5,
                        justifyContent: "center",
                      }
                }
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    style={{
                      flex: 1,
                      fontFamily: constants.Fonts.REGULAR,
                      fontSize: 15,
                      textAlign: "left",
                      color: constants.APP_BLACK_COLOR,
                    }}
                  >
                    {countryName}
                  </Text>
                  <Image
                    style={{
                      transform: [{ rotate: "90deg" }],
                      // posision: "absolute",
                      marginRight: 10,
                      // width: 10,
                      // height: 10,
                      tintColor: constants.APP_THEME_COLOR,
                    }}
                    source={Images.arrowRight}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={Styles.holderView}>
            <View style={Styles.iconContainer}>
              <Image source={Images.addressPhone} />
            </View>
            <View style={{ marginLeft: 10, flex: 1 }}>
              <TextInput
                value={mobile.text}
                keyboardType={"phone-pad"}
                onChangeText={(text) => {
                  this.validateInput(text, "mobile");
                }}
                placeholder={translate("Mobile Number")}
                ref={(ref) => (this.phoneNoRef = ref)}
                maxLength={12}
                returnKeyType={"next"}
                style={
                  !mobile.valid && !isFormValid
                    ? [
                        Styles.text_input_style_error,
                        { textAlign: isRTL ? "right" : "left" },
                      ]
                    : [
                        Styles.text_input_style,
                        { textAlign: isRTL ? "right" : "left" },
                      ]
                }
              />
            </View>
          </View>

          <View style={Styles.addAddressBtn}>
            <TouchableOpacity
              onPress={this.saveAddress}
              style={Styles.btn_touchable_style}
            >
              <Text
                style={{
                  color: constants.APP_WHITE_COLOR,
                  fontFamily: constants.Fonts.MEDIUM,
                  fontSize: 15,
                }}
              >
                {isEdit ? translate("UPDATE") : translate("SAVE ADDRESS")}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <CountryPicker
          {...{
            withFilter: true,
            withCountryNameButton: true,
            withAlphaFilter: true,
            onSelect: (data) => {
              console.log(("SELECTED COUNTRY DATA", data));
              this.setState({ countryName: data.name, countryCode: data.cca2 });
              this.validateInput(data.name, "country");
            },
            placeholder: "",
            onClose: () => {
              this.setState({ isShowCountryPicker: false });
            },
          }}
          style={{ width: 0, height: 0 }}
          visible={isShowCountryPicker}
        />
        {this.props.isLoading && <HudView />}
      </SafeAreaView>
    );
  }

  validateInput = (text, fieldname) => {
    let stateObject = {
      text: text,
      valid: text.length !== 0,
    };
    let formfeilds = this.state.formFeilds;
    formfeilds[fieldname] = stateObject;
    this.setState({ formFeilds: formfeilds });
  };

  selectedRegion = (region) => {
    let stateObject = {
      text: region[0].name.toString(),
      id: region[0].id,
      valid: true,
    };

    let formfeilds = this.state.formFeilds;
    formfeilds["country_state"] = stateObject;
    this.setState({ formFeilds: formfeilds, regionID: region[0].id });
  };

  saveAddress = () => {
    console.log("address", this.state.formFeilds);
    let isFromGuestCheckout = this.props.navigation.state.params
      .isFromGuestCheckout
      ? this.props.navigation.state.params.isFromGuestCheckout
      : false;

    if (isFromGuestCheckout) {
      const {
        firstname,
        lastname,
        city,
        address,
        zipcode,
        mobile,
        country_state,
        country,
      } = this.state.formFeilds;

      const { countryCode } = this.state;

      console.log("address", this.state.formFeilds);

      let newAddress = {
        region_id: country_state.id || 0,
        country_id: countryCode,
        street: [address.text],
        firstname: firstname.text,
        lastname: lastname.text,
        company: "",
        telephone: mobile.text,
        city: city.text,
        postcode: zipcode.text,
      };
      const filledFeilds = Object.keys(this.state.formFeilds).filter((item) => {
        return !this.state.formFeilds[item].valid;
      });
      this.setState({ isFormValid: filledFeilds.length > 0 ? false : true });

      if (filledFeilds.length === 0) {
        if (!checkPhoneNumberValid(mobile.text) || mobile.text.length < 8) {
          showSingleAlert(translate("Please enter a valid phone number"));
          return;
        }
      }
      if (filledFeilds.length === 0) {
        this.props.navigation.state.params.addAddressCallback(newAddress);
        this.props.navigation.goBack();
      } else {
        showSingleAlert(translate("Please fill the mandatory fields"));
      }
    } else {
      const { mobile } = this.state.formFeilds;

      const { countryCode } = this.state;
      const filledFeilds = Object.keys(this.state.formFeilds).filter((item) => {
        return !this.state.formFeilds[item].valid;
      });
      this.setState({ isFormValid: filledFeilds.length > 0 ? false : true });

      if (filledFeilds.length === 0) {
        if (!checkPhoneNumberValid(mobile.text) || mobile.text.length < 8) {
          showSingleAlert(translate("Please enter a valid phone number"));
          return;
        }
      }

      if (filledFeilds.length === 0) {
        this.callAddressAction();
      } else {
        showSingleAlert(translate("Please fill the mandatory fields"));
      }
    }
  };

  callAddressAction = () => {
    const { storeCode, storeView, userInfo, addressList } = this.props;
    const { isEdit } = this.state;
    const { details } = this.props.navigation.state.params;
    let userAddress = [];
    const storeIDArray = storeView.filter((item) => {
      return item.code === storeCode;
    });
    const store_id = storeIDArray[0].id;
    const {
      firstname,
      lastname,
      city,
      address,
      zipcode,
      mobile,
      country_state,
      country,
    } = this.state.formFeilds;
    const { countryCode } = this.state;

    let textArray = address.text.split("↵");
    let textArray2 = address.text.split("\n");

    let stringarray = [];
    textArray2.forEach((element) => {
      if (element.length > 0) {
        stringarray.push(element.trim());
      }
    });

    if (stringarray.length > 3) {
      showSingleAlert(translate("Address cannot contain more than 3 lines"));
      return;
    }

    let newAddress = {
      region_id: country_state.id || 0,
      country_id: countryCode, //country.countryID.trim(),
      street: stringarray,
      firstname: firstname.text.trim(),
      lastname: lastname.text.trim(),
      company: "",
      telephone: mobile.text.trim(),
      city: city.text.trim(),
      postcode: zipcode.text.trim(),
      default_billing: addressList.length > 0 ? false : true,
    };

    if (isEdit) {
      let itemIndex;
      userAddress = addressList;
      userAddress.map((item, i) => {
        if (item.id === details.id) itemIndex = i;
      });

      newAddress["default_billing"] = details["default_billing"];
      userAddress[itemIndex] = newAddress;
    }

    const addresses = [...addressList, newAddress];
    const editAddresses = userAddress; //[...userAddress]; //[{...newAddress}];
    console.log("addresses", addresses);

    let request = {
      customer: {
        email: userInfo.email || "",
        firstname: userInfo.firstname || "",
        lastname: userInfo.lastname || "",
        store_id: store_id,
        website_id: 1,
        addresses: isEdit ? editAddresses : addresses,
      },
    };
    console.log("addresses", addresses);
    if (isEdit) {
      this.props.editAddressUser(request, this.editAddressCallback);
    } else {
      this.props.addAddressUser(request, this.addAddressCallback);
    }
  };

  editAddressCallback = (status) => {
    if (status) {
      showSingleAlert("Successfully Updated", "OK", () => {
        this.props.navigation.goBack();
      });
    }
  };

  addAddressCallback = (status) => {
    if (status) {
      showSingleAlert("Successfully Added", "OK", () => {
        this.props.navigation.goBack();
      });
    }
  };
}

export default AddAddress;
