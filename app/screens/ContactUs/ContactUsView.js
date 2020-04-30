/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on March 16, 2020
 * ContactUsView -
 */

import {
  View,
  Text,
  Image,
  Linking,
  TextInput,
  StatusBar,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import styles from "./styles";
import React, { Component } from "react";
import Images from "../../config/images";
import Constants from "../../config/constants";
import HudView from "../../components/hudView";
import { translate } from "../../config/languageSwitching/index";
import { checkEMailValidation, showSingleAlert } from "../../config/common";
import NavigationHeader1 from "../../components/NavigationHeaders/NavigationHeader1";

class ContactUsView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.userInfo
        ? props.userInfo.firstname + " " + props.userInfo.lastname
        : "",
      email: props.userInfo ? props.userInfo.email : "",
      phone: "",
      onMyMind: "",
      emailError: "",
      nameError: "",
      phoneError: "",
      feedbackError: "",
    };
  }

  componentDidMount() {}

  callBack = (status) => {
    if (status) {
      this.setState({
        phone: "",
        onMyMind: "",
      });
      showSingleAlert(
        translate("Message sent succesfully"),
        translate("Ok"),
        null
      );
    }
  };

  _isFieldsValid() {
    const { name, email, phone, onMyMind } = this.state;

    if (name === "") {
      showSingleAlert(translate("Please enter your name"));
      return;
    }

    if (email === "") {
      showSingleAlert(translate("Please enter your email address"));
      return;
    }

    if (phone === "") {
      showSingleAlert(translate("Please enter your phone number"));
      return;
    }

    if (!checkEMailValidation(email)) {
      showSingleAlert(translate("Please enter a valid email address"));
      return;
    }

    if (onMyMind.trim().length == 0) {
      showSingleAlert(translate("Please enter your comment"));
      return;
    }

    return true;
    // let isValid = true;
    // if (name.length == 0) {
    //   this.setState({ nameError: "Name required" });
    //   isValid = false;
    // } else {
    //   this.setState({ nameError: "" });
    // }
    // if (email.length == 0) {
    //   this.setState({ emailError: "Email required" });
    //   isValid = false;
    // } else {
    //   if (checkEMailValidation(email)) {
    //     this.setState({ emailError: "" });
    //   } else {
    //     this.setState({ emailError: "Invalid email" });
    //     isValid = false;
    //   }
    // }
    // if (phone.length == 0) {
    //   this.setState({ phoneError: "Phone no. required" });
    //   isValid = false;
    // } else {
    //   this.setState({ phoneError: "" });
    // }
    // if (onMyMind.trim().length == 0) {
    //   this.setState({ feedbackError: "Please fill this field" });
    //   isValid = false;
    // } else {
    //   this.setState({ feedbackError: "" });
    // }
    // return isValid;
  }

  _didTapOnUpdate = () => {
    const { name, email, phone, onMyMind } = this.state;
    if (this._isFieldsValid()) {
      this.props.onFeedbackSubmit(name, email, phone, onMyMind, this.callBack);
    }

    // const {onProfileUpdate, userInfo} = this.props;
    // const {oldPassword, newPassword, confirmPassword} = this.state;
    // if (newPassword === confirmPassword) {
    //   userInfo.firstname = this.state.firstName;
    //   userInfo.lastname = this.state.lastName;
    //   userInfo.email = this.state.email;
    //   onProfileUpdate(
    //     userInfo,
    //     oldPassword,
    //     newPassword,
    //     this._profileUpdateCallback,
    //   );
    // } else {
    //   showSingleAlert(translate('password_mismatch'), translate('Ok'), null);
    // }
  };

  _openWhatsapp = (phone) => {
    let link = `whatsapp://send?&phone=${phone}`;
    Linking.canOpenURL(link)
      .then((supported) => {
        if (!supported) {
          showSingleAlert(translate("install_whatsapp"));
        } else {
          return Linking.openURL(link);
        }
      })
      .catch((err) => console.log("whatsapp error occurred", err));
  };

  _didTapOnPhoneCall = (phone) => {
    let phoneNumber = "";
    if (Platform.OS === "android") {
      phoneNumber = `tel:${phone}`;
    } else {
      phoneNumber = `telprompt:${phone}`;
    }
    Linking.canOpenURL(phoneNumber)
      .then((supported) => {
        if (!supported) showSingleAlert(translate("Call not supported"));
        else return Linking.openURL(phoneNumber);
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { isLoading, isRTL } = this.props;
    const phoneNumber = "+918098311826";
    const whatsappNo = "+918098311826";
    const emailAddress = "someone@example.com";
    return (
      <SafeAreaView style={styles.safeContainer}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor={Constants.APP_WHITE_COLOR}
        />
        <NavigationHeader1
          hideBottomLine
          // title={translate('Contact Us')}
          didTapOnLeftButton={() => this.props.navigation.goBack()}
          isRTL={this.props.isRTL}
        />
        <Text style={styles.titleStyle}>{translate("Contact Us")}</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.scrollContainer}>
            <View style={styles.contactInfoContainer}>
              <Text style={[styles.contactAddressText, { marginLeft: 0 }]}>
                {translate("Contact Address")}
              </Text>
              <View style={styles.line} />
              <Text
                style={[
                  styles.subTitle,
                  { marginVertical: 16, lineHeight: 30 },
                ]}
              >
                {"Forrest Ray\n191-103 Integer Rd.\nNew Mexico 08219"}
              </Text>
              <TouchableOpacity
                onPress={() => Linking.openURL(`mailto:${emailAddress}`)}
                style={[styles.contactWrapper, { marginTop: 18 }]}
              >
                <Image
                  style={styles.contactIcon}
                  resizeMode="center"
                  source={Images.mail}
                />
                <Text style={styles.contactText}>{emailAddress}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this._didTapOnPhoneCall(phoneNumber)}
                style={styles.contactWrapper}
              >
                <Image
                  style={[styles.contactIcon]}
                  source={Images.addressPhone}
                />
                <Text style={styles.contactText}>{phoneNumber}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this._openWhatsapp(whatsappNo);
                }}
                style={[styles.contactWrapper, { marginBottom: 24 }]}
              >
                <Image style={[styles.contactIcon]} source={Images.watsapp} />
                <Text style={styles.contactText}>{whatsappNo}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.passwordContainer}>
              <Text style={styles.contactAddressText}>
                {translate("Write Us")}
              </Text>

              <View style={styles.holderView}>
                <View style={styles.iconContainer}>
                  <Image source={Images.addressUser} />
                </View>

                <TextInput
                  placeholder={translate("Name")}
                  style={[
                    styles.inputs,
                    { textAlign: isRTL ? "right" : "left" },
                  ]}
                  keyboardType="default"
                  returnKeyType={"next"}
                  value={this.state.name}
                  onSubmitEditing={() => this.emailInput.focus()}
                  onChangeText={(value) => this.setState({ name: value })}
                  underlineColorAndroid="transparent"
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.holderView}>
                <View style={styles.iconContainer}>
                  <Image source={Images.mail} />
                </View>

                <TextInput
                  placeholder={translate("Email")}
                  style={[
                    styles.inputs,
                    { textAlign: isRTL ? "right" : "left" },
                  ]}
                  keyboardType="email-address"
                  returnKeyType={"next"}
                  value={this.state.email}
                  ref={(input) => (this.emailInput = input)}
                  onSubmitEditing={() => this.phoneInput.focus()}
                  onChangeText={(value) => this.setState({ email: value })}
                  underlineColorAndroid="transparent"
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.holderView}>
                <View style={styles.iconContainer}>
                  <Image source={Images.addressPhone} />
                </View>

                <TextInput
                  style={[
                    styles.inputs,
                    { textAlign: isRTL ? "right" : "left" },
                  ]}
                  placeholder={translate("Phone Number")}
                  keyboardType="phone-pad"
                  returnKeyType={"next"}
                  value={this.state.phone}
                  ref={(input) => (this.phoneInput = input)}
                  onSubmitEditing={() => this.mindInput.focus()}
                  onChangeText={(value) => this.setState({ phone: value })}
                  underlineColorAndroid="transparent"
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.holderView}>
                <View style={[styles.iconContainer]}>
                  <Image source={Images.notepad} />
                </View>

                <TextInput
                  style={[
                    styles.inputs,
                    {
                      height: 120,
                      textAlignVertical: "top",
                      textAlign: isRTL ? "right" : "left",
                    },
                  ]}
                  placeholder={translate("Whats on your mind?")}
                  multiline={true}
                  keyboardType="default"
                  returnKeyType={"done"}
                  value={this.state.onMyMind}
                  ref={(input) => (this.mindInput = input)}
                  onChangeText={(value) => this.setState({ onMyMind: value })}
                  underlineColorAndroid="transparent"
                />
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonOutlineContainer}
            activeOpacity={Constants.activeOpacity}
            onPress={() => {
              this._didTapOnUpdate();
            }}
          >
            <Text style={styles.updateText}>{translate("Submit")}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Chat")}
          style={styles.fabStyle}
        >
          <Image style={styles.fabIcon} source={Images.comment} />
        </TouchableOpacity>

        {isLoading && <HudView />}
      </SafeAreaView>
    );
  }
}

export default ContactUsView;
