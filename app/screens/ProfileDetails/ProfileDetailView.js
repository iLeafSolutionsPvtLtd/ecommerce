/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on February 19, 2020
 * ProfileDetailView -
 */

import {
  View,
  Text,
  Image,
  Keyboard,
  StatusBar,
  TextInput,
  ScrollView,
  SafeAreaView,
  TouchableOpacity
} from "react-native";
import styles from "./styles";
import React, { Component } from "react";
import Images from "../../config/images";
import HudView from "../../components/hudView";
import Constants from "../../config/constants";
import { translate } from "../../config/languageSwitching/index";
import { showSingleAlert, checkPasswordValid } from "../../config/common";
import NavigationHeader1 from "../../components/NavigationHeaders/NavigationHeader1";

class ProfileDetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      isChanged: false
    };
  }

  componentDidMount() {
    const { userInfo } = this.props;
    this.setState({
      firstName: userInfo.firstname,
      lastName: userInfo.lastname,
      email: userInfo.email
    });
  }

  componentDidUpdate() {
    const {
      firstName,
      lastName,
      isChanged,
      oldPassword,
      newPassword,
      confirmPassword
    } = this.state;
    const { userInfo } = this.props;
    if (firstName !== userInfo.firstname || lastName !== userInfo.lastname) {
      if (oldPassword !== "" || newPassword !== "" || confirmPassword !== "") {
        if (
          oldPassword.length > 0 &&
          newPassword.length > 0 &&
          confirmPassword.length > 0
        ) {
          if (!isChanged) {
            this.setState({ isChanged: true });
          }
        } else {
          if (isChanged) {
            this.setState({ isChanged: false });
          }
        }
      } else {
        if (!isChanged) {
          this.setState({ isChanged: true });
        }
      }
    } else if (
      oldPassword !== "" ||
      newPassword !== "" ||
      confirmPassword !== ""
    ) {
      if (
        oldPassword.length > 0 &&
        newPassword.length > 0 &&
        confirmPassword.length > 0
      ) {
        if (!isChanged) {
          this.setState({ isChanged: true });
        }
      } else {
        if (isChanged) {
          this.setState({ isChanged: false });
        }
      }
    } else {
      if (isChanged) {
        this.setState({ isChanged: false });
      }
    }
  }

  _profileUpdateCallback = status => {
    if (status) {
      showSingleAlert(translate("profile_updated"), translate("Ok"), () => {
        this.props.navigation.goBack();
      });
    } else {
      this.setState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
        isChanged: false
      });
      this.newPassword.clear();
      this.oldPassword.clear();
      this.confirmPassword.clear();
    }
  };

  _callUpdateApi = () => {
    const { onProfileUpdate, userInfo } = this.props;
    const { oldPassword, newPassword } = this.state;
    const { firstName, lastName, email } = this.state;
    userInfo.firstname = firstName;
    userInfo.lastname = lastName;
    userInfo.email = email;
    onProfileUpdate(
      userInfo,
      oldPassword,
      newPassword,
      this._profileUpdateCallback
    );
  };

  _didTapOnUpdate = () => {
    Keyboard.dismiss();
    const { newPassword, confirmPassword } = this.state;
    if (newPassword === confirmPassword) {
      if (newPassword.length > 0) {
        if (checkPasswordValid(newPassword)) {
          this._callUpdateApi();
        } else {
          showSingleAlert(translate("password_invalid"), translate("Ok"), null);
        }
      } else {
        this._callUpdateApi();
      }
    } else {
      showSingleAlert(translate("password_mismatch"), translate("Ok"), null);
    }
  };

  render() {
    const { selectedLanguage, isLoading } = this.props;
    const { isChanged } = this.state;
    const { isRTL } = this.props;
    return (
      <SafeAreaView style={styles.safeContainer}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor={Constants.APP_WHITE_COLOR}
        />
        <NavigationHeader1
          hideBottomLine
          didTapOnLeftButton={() => this.props.navigation.goBack()}
        />
        <Text style={styles.titleStyle}>{translate("Profile Details")}</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.scrollContainer}>
            <View style={styles.accountInfoContainer}>
              <Text style={styles.userNameText}>
                {translate("Account Information")}
              </Text>

              <View style={styles.holderView}>
                <View style={styles.iconContainer}>
                  <Image source={Images.addressUser} />
                </View>
                <TextInput
                  placeholder={translate("First Name")}
                  style={styles.inputs}
                  keyboardType="name-phone-pad"
                  returnKeyType={"next"}
                  onSubmitEditing={() => this.lastName.focus()}
                  onChangeText={value => this.setState({ firstName: value })}
                  value={this.state.firstName}
                  underlineColorAndroid="transparent"
                  blurOnSubmit={false}
                />
                <TextInput
                  placeholder={translate("Last Name")}
                  style={styles.inputs}
                  ref={input => (this.lastName = input)}
                  keyboardType="name-phone-pad"
                  returnKeyType={"done"}
                  onSubmitEditing={() => this.lastName.blur()}
                  onChangeText={value => this.setState({ lastName: value })}
                  value={this.state.lastName}
                  underlineColorAndroid="transparent"
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.holderView}>
                <View style={styles.iconContainer}>
                  <Image source={Images.mail} />
                </View>
                <TextInput
                  style={[styles.inputs, { color: "rgba(110,110,110,0.5)" }]}
                  placeholder={translate("Email")}
                  ref={input => (this.emailInput = input)}
                  keyboardType="email-address"
                  returnKeyType={"done"}
                  editable={false}
                  onChangeText={value => this.setState({ email: value })}
                  value={this.state.email}
                  underlineColorAndroid="transparent"
                />
              </View>
            </View>

            <View style={styles.passwordContainer}>
              <Text style={styles.userNameText}>
                {translate("Change Password")}
              </Text>

              <View style={styles.holderView}>
                <View style={styles.iconContainer}>
                  <Image source={Images.lock} />
                </View>
                <TextInput
                  placeholder={translate("Current Password")}
                  style={styles.inputs}
                  keyboardType="default"
                  secureTextEntry={true}
                  returnKeyType={"next"}
                  ref={input => (this.oldPassword = input)}
                  onSubmitEditing={() => this.newPassword.focus()}
                  onChangeText={value => this.setState({ oldPassword: value })}
                  underlineColorAndroid="transparent"
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.holderView}>
                <View style={styles.iconContainer}>
                  <Image source={Images.lock} />
                </View>
                <TextInput
                  placeholder={translate("New Password")}
                  style={styles.inputs}
                  ref={input => (this.newPassword = input)}
                  keyboardType="default"
                  returnKeyType={"next"}
                  secureTextEntry={true}
                  onSubmitEditing={() => this.confirmPassword.focus()}
                  onChangeText={value => this.setState({ newPassword: value })}
                  underlineColorAndroid="transparent"
                  blurOnSubmit={false}
                />
              </View>

              <View style={styles.holderView}>
                <View style={styles.iconContainer}>
                  <Image source={Images.lock} />
                </View>
                <TextInput
                  placeholder={translate("Confirm Password")}
                  style={[styles.inputs]}
                  ref={input => (this.confirmPassword = input)}
                  keyboardType="default"
                  returnKeyType={"done"}
                  secureTextEntry={true}
                  onChangeText={value =>
                    this.setState({ confirmPassword: value })
                  }
                  underlineColorAndroid="transparent"
                />
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            disabled={!isChanged}
            style={[
              styles.buttonOutlineContainer,
              { opacity: isChanged ? 1 : 0.7 }
            ]}
            activeOpacity={Constants.activeOpacity}
            onPress={() => {
              this._didTapOnUpdate();
            }}
          >
            <Text style={styles.updateText}>{translate("UPDATE")}</Text>
          </TouchableOpacity>
        </View>
        {isLoading && <HudView />}
      </SafeAreaView>
    );
  }
}

export default ProfileDetailView;
