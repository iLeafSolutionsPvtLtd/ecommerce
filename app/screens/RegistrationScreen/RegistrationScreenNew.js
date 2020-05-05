/**
 * Created by Tinoy for iLeaf Solutions Pvt.Ltd
 * on February 19, 2020
 * RegistrationScreen - RegistrationScreen View
 */

import React, { Component } from "react";
import {
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Text,
  Keyboard,
  ScrollView,
  Image
} from "react-native";
import styles from "./styles";
import { TextField } from "react-native-material-textfield";
import LinearGradient from "react-native-linear-gradient";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { translate } from "../../config/languageSwitching/index";
import Constants from "../../config/constants";
import {
  isEmpty,
  checkEMailValidation,
  checkPasswordValid
} from "../../config/common";
import Images from "../../config/images";
import HudView from "../../components/hudView";
import { navigateToHomeScreen } from "../../actions/navigationActions";
import { showSingleAlert } from "../../config/common";

class RegistrationScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPwd: "",
      firstNameError: "",
      lastNameError: "",
      emailError: "",
      passwordError: "",
      passwordMismatchError: "",
      showClose: true,
      secureTextEntry: true
    };

    this.onFocus = this.onFocus.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onSubmitEmail = this.onSubmitEmail.bind(this);
    this.onSubmitPassword = this.onSubmitPassword.bind(this);
    this.onSubmitFirstName = this.onSubmitFirstName.bind(this);
    this.onSubmitLastName = this.onSubmitLastName.bind(this);
    this.onAccessoryPress = this.onAccessoryPress.bind(this);
    this.renderPasswordAccessory = this.renderPasswordAccessory.bind(this);

    this.lastnameRef = this.updateRef.bind(this, "lastname");
    this.firstnameRef = this.updateRef.bind(this, "firstname");
    this.emailRef = this.updateRef.bind(this, "email");
    this.passwordRef = this.updateRef.bind(this, "password");
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide
    );
  }

  componentWillUnmount() {
    /**
     * cleans up event listener
     */
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  updateRef(name, ref) {
    this[name] = ref;
  }

  onFocus() {
    let { errors = {} } = this.state;
    for (let name in errors) {
      let ref = this[name];
      if (ref && ref.isFocused()) {
        delete errors[name];
      }
    }
    this.setState({ errors });
  }

  onChangeText(text) {
    ["email", "password", "lastname", "firstname"]
      .map(name => ({ name, ref: this[name] }))
      .forEach(({ name, ref }) => {
        if (ref && ref.isFocused()) {
          this.setState({ [name]: text });
        }
      });
  }

  onSubmitFirstName() {
    this.lastname.focus();
  }

  onSubmitLastName() {
    this.email.focus();
  }

  onSubmitEmail() {
    this.password.focus();
  }

  onSubmitPassword() {
    this.password.blur();
  }

  _keyboardDidShow() {}

  _keyboardDidHide() {}

  _onSubmit() {
    const { onRegisterUser } = this.props;
    let errors = {};
    let isValid = true;
    ["firstname", "lastname", "email", "password"].forEach(name => {
      let value = this[name].value();
      if ("firstname" === name && !value) {
        errors[name] = "First name required";
        isValid = false;
      }
      if ("lastname" === name && !value) {
        errors[name] = "Last name required";
        isValid = false;
      }
      if ("email" === name) {
        if (!value) {
          errors[name] = "Email required";
          isValid = false;
        } else if (!checkEMailValidation(value)) {
          errors[name] = "Invalid Email";
          isValid = false;
        }
      }
      if ("password" === name && !value) {
        errors[name] = "Password required";
        isValid = false;
      }
    });
    this.setState({ errors });

    if (isValid) {
      if (checkPasswordValid(this["password"].value())) {
        //onRegisterUser('abc4', 'def4', 'abcdef4@test.com', 'abcdef');
        onRegisterUser(
          this["firstname"].value(),
          this["lastname"].value(),
          this["email"].value(),
          this["password"].value(),
          this._registerCallback
        );
      } else {
        showSingleAlert(translate("password_invalid"), translate("Ok"), null);
      }
    }
  }

  _registerCallback = status => {
    if (status) {
      showSingleAlert(
        translate("registration_complete_success"),
        translate("Ok"),
        () => {
          this.props.didTapOnclose();
        }
      );
    }
  };

  onAccessoryPress() {
    this.setState(({ secureTextEntry }) => ({
      secureTextEntry: !secureTextEntry
    }));
  }

  renderPasswordAccessory() {
    let { secureTextEntry } = this.state;
    let name = secureTextEntry ? "visibility-off" : "visibility";
    return (
      <MaterialIcon
        size={22}
        name={name}
        color={TextField.defaultProps.baseColor}
        onPress={this.onAccessoryPress}
        suppressHighlighting={true}
      />
    );
  }

  render() {
    const { isLoading, showLogin } = this.props;
    const { secureTextEntry, errors = {} } = this.state;
    return (
      <SafeAreaView style={styles.safeContainer}>
        <StatusBar backgroundColor={Constants.APP_THEME_DARK_GRAY} />
        <ScrollView
          scrollEventThrottle={16}
          onScroll={event => {
            if (event.nativeEvent.contentOffset.y > 100) {
              this.setState({ showClose: false });
            } else {
              this.setState({ showClose: true });
            }
          }}
        >
          <View style={styles.container}>
            <Text style={styles.welcomText}>{translate("Hello welcome")}</Text>
            <Image
              source={Images.womenShopping}
              resizeMode="contain"
              style={styles.girlImage}
            />
            <View style={styles.container2}>
              <TextField
                ref={this.firstnameRef}
                containerStyle={styles.containerStyle}
                labelTextStyle={styles.inpuLabelTextStyle}
                labelFontSize={15}
                fontSize={16}
                textColor={"rgb(40,40,40)"}
                labelOffset={{ x0: 0, y0: 0, x1: 0, y1: -9 }}
                activeLineWidth={1.5}
                lineWidth={1}
                tintColor={"rgb(142, 142, 142)"}
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                onFocus={this.onFocus}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onSubmitFirstName}
                returnKeyType="next"
                label={translate("First name")}
                error={errors.firstname}
                blurOnSubmit={false}
              />
              <TextField
                ref={this.lastnameRef}
                containerStyle={styles.containerStyle}
                labelTextStyle={styles.inpuLabelTextStyle}
                labelFontSize={15}
                fontSize={16}
                textColor={"rgb(40,40,40)"}
                labelOffset={{ x0: 0, y0: 0, x1: 0, y1: -9 }}
                activeLineWidth={1.5}
                lineWidth={1}
                tintColor={"rgb(142, 142, 142)"}
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                onFocus={this.onFocus}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onSubmitLastName}
                returnKeyType="next"
                label={translate("Last name")}
                error={errors.lastname}
                blurOnSubmit={false}
              />
              <TextField
                ref={this.emailRef}
                containerStyle={styles.containerStyle}
                labelTextStyle={styles.inpuLabelTextStyle}
                labelFontSize={15}
                fontSize={16}
                textColor={"rgb(40,40,40)"}
                labelOffset={{ x0: 0, y0: 0, x1: 0, y1: -9 }}
                activeLineWidth={1.5}
                lineWidth={1}
                tintColor={"rgb(142, 142, 142)"}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                onFocus={this.onFocus}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onSubmitEmail}
                returnKeyType="next"
                label={translate("Email")}
                error={errors.email}
                blurOnSubmit={false}
              />
              <TextField
                ref={this.passwordRef}
                secureTextEntry={secureTextEntry}
                containerStyle={styles.containerStyle}
                labelTextStyle={styles.inpuLabelTextStyle}
                labelFontSize={15}
                fontSize={16}
                textColor={"rgb(40,40,40)"}
                labelOffset={{ x0: 0, y0: 0, x1: 0, y1: -9 }}
                activeLineWidth={1.5}
                lineWidth={1}
                tintColor={"rgb(142,142,142)"}
                autoCapitalize="none"
                autoCorrect={false}
                enablesReturnKeyAutomatically={true}
                onFocus={this.onFocus}
                onChangeText={this.onChangeText}
                onSubmitEditing={this.onSubmitPassword}
                renderRightAccessory={this.renderPasswordAccessory}
                returnKeyType="done"
                label={translate("Password")}
                error={errors.password}
              />

              <TouchableOpacity
                style={styles.submitButtonStyle}
                activeOpacity={0.7}
                onPress={() => {
                  this._onSubmit();
                }}
              >
                <Text style={styles.submitText}>{translate("SIGN UP")}</Text>
              </TouchableOpacity>
              {/* <View style={styles.footerContainer}>
                <Text style={styles.forgotPassword}>
                  {translate("Dont have an account?")}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    // this.props.navigation.navigate('RegistrationScreen')
                    this.setState({ isSignUpViewShow: true })
                  }
                >
                  <Text style={styles.signup}>{translate("Signup")}</Text>
                </TouchableOpacity>
              </View> */}
            </View>
          </View>
        </ScrollView>
        {this.state.showClose && (
          <TouchableOpacity
            onPress={() => {
              this.props.didTapOnclose();
            }}
            style={styles.closeButtonView}
          >
            <Image
              source={Images.close}
              style={{ width: 15, height: 15, tintColor: "rgb(0,0,0)" }}
            />
          </TouchableOpacity>
        )}
        {isLoading && <HudView />}
      </SafeAreaView>
    );
  }
}

export default RegistrationScreen;
