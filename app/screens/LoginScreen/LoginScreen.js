/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on February 12, 2020
 * LoginScreen - LoginScreen View
 */

import {
  View,
  Text,
  Image,
  StatusBar,
  TextInput,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import {
  isEmpty,
  showSingleAlert,
  checkEMailValidation,
  showAlertWithCallback,
} from "../../config/common";
import {
  statusCodes,
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-community/google-signin";
import appleAuth, {
  AppleButton,
  AppleAuthError,
  AppleAuthRequestScope,
  AppleAuthRealUserStatus,
  AppleAuthCredentialState,
  AppleAuthRequestOperation,
} from "@invertase/react-native-apple-authentication";
import styles from "./styles";
import Modal from "react-native-modal";
import Images from "../../config/images";
import React, { Component } from "react";
import HudView from "../../components/hudView";
import Constants from "../../config/constants";
import { LoginManager } from "react-native-fbsdk";
import SignUp from "../../screens/RegistrationScreen";
import { BlurView } from "@react-native-community/blur";
import LinearGradient from "react-native-linear-gradient";
import { TextField } from "react-native-material-textfield";
import { LoginButton, AccessToken } from "react-native-fbsdk";
import { translate } from "../../config/languageSwitching/index";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

class LoginScreen extends Component {
  constructor(props) {
    super(props);

    let isGuestLogin = props.isGuestLogin ? this.props.isGuestLogin : false;

    // this.authCredentialListener = null;
    this.user = null;
    this.state = {
      credentialStateForUser: -1,
      email: "",
      password: "",
      isLogin: !isGuestLogin,
      isSignUpViewShow: false,
      isForgotPasswordShow: false,
      firstName: "",
      lastName: "",
      showClose: true,
      forgotEmail: "",
      forgotEmailError: "",
      isTermsChecked: false,
      secureTextEntry: true,
    };

    this.onFocus = this.onFocus.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
    this.onSubmitEmail = this.onSubmitEmail.bind(this);
    this.emailRef = this.updateRef.bind(this, "email");
    this.passwordRef = this.updateRef.bind(this, "password");
    this.onAccessoryPress = this.onAccessoryPress.bind(this);
    this.onSubmitPassword = this.onSubmitPassword.bind(this);
    this.onSubmitFirstName = this.onSubmitFirstName.bind(this);
    this.onSubmitLastName = this.onSubmitLastName.bind(this);
    this.onSubmitGuestEmail = this.onSubmitGuestEmail.bind(this);
    this.lastnameRef = this.updateRef.bind(this, "lastname");
    this.firstnameRef = this.updateRef.bind(this, "firstname");
    this.guestEmailRef = this.updateRef.bind(this, "guestEmail");
    this.renderPasswordAccessory = this.renderPasswordAccessory.bind(this);
  }

  componentDidMount() {
    // GoogleSignin.configure();
    console.log("VESRION===", Constants.IOS_VERSION);

    GoogleSignin.configure({
      hostedDomain: "",
      loginHint: "",
      forceConsentPrompt: true,
      accountName: "",
      iosClientId:
        "855821477319-lof8mcnb5v133mt0ptpnk3rcgqie169e.apps.googleusercontent.com",
    });

    // /**
    //  * subscribe to credential updates.This returns a function which can be used to remove the event listener
    //  * when the component unmounts.
    //  */
    // this.authCredentialListener = appleAuth.onCredentialRevoked(async () => {
    //   console.warn('Credential Revoked');
    //   this.fetchAndUpdateCredentialState().catch(error => {
    //     console.log('===fetchAndUpdateCredentialState==', error);

    //     this.setState({credentialStateForUser: `Error: ${error.code}`});
    //   });
    // });

    // this.fetchAndUpdateCredentialState()
    //   .then(res => {
    //     this.setState({credentialStateForUser: res});
    //     console.log('000000fetchAndUpdateCredentialState---', res);
    //   })
    //   .catch(error => {
    //     console.log('===fetchAndUpdateCredentialState==XXX', error);
    //     this.setState({credentialStateForUser: `Error: ${error.code}`});
    //   });
  }

  componentWillUnmount() {}

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
    ["email", "password", "lastname", "firstname", "guestEmail"]
      .map((name) => ({ name, ref: this[name] }))
      .forEach(({ name, ref }) => {
        if (ref && ref.isFocused()) {
          this.setState({ [name]: text });
        }
      });
  }

  onSubmitEmail() {
    this.password.focus();
  }

  onSubmitPassword() {
    this.password.blur();
  }

  onSubmitFirstName() {
    this.lastname.focus();
  }

  onSubmitLastName() {
    this.guestEmail.focus();
  }

  onSubmitGuestEmail() {
    this.guestEmail.blur();
  }

  /** FB Login */
  onFBLoginPress = () => {
    // this.props.navigateToHomeScreen();
    // this.props.navigation.navigate('HomeScreen');
    LoginManager.logOut();
    LoginManager.logInWithPermissions(["public_profile", "email"]).then(
      function(result) {
        console.log("FB LOGIN RESULT===", result);

        if (result.isCancelled) {
          console.log("Login cancelled");
        } else {
          console.log(
            "Login success with permissions: " +
              result.grantedPermissions.toString()
          );
          AccessToken.getCurrentAccessToken().then((data) => {
            console.log(data.accessToken.toString());

            let token = data.accessToken.toString();

            fetch(
              "https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=" +
                token
            )
              .then((response) => response.json())
              .then((json) => {
                console.log("DATA RESPONSE ==", json);

                alert("Login success");

                // // Some user object has been set up somewhere, build that user here
                // user.name = json.name;
                // user.id = json.id;
                // user.user_friends = json.friends;
                // user.email = json.email;
                // user.username = json.name;
                // user.loading = false;
                // user.loggedIn = true;
                // user.avatar = setAvatar(json.id);
              })
              .catch(() => {
                reject("ERROR GETTING DATA FROM FACEBOOK");
              });
          });
        }
      },
      function(error) {
        console.log("Login fail with error: " + error);
      }
    );
  };

  /** Google Login */
  onGoogleLoginPress = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log("userInfo", userInfo);
      alert("Login success");
    } catch (error) {
      console.log("ERROR", error);

      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  /** Apple Login */
  onAppleLoginPress = async () => {
    console.warn("Beginning Apple Authentication");

    // start a login request
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: AppleAuthRequestOperation.LOGIN,
        requestedScopes: [
          AppleAuthRequestScope.EMAIL,
          AppleAuthRequestScope.FULL_NAME,
        ],
      });

      console.log("appleAuthRequestResponse", appleAuthRequestResponse);

      const {
        user: newUser,
        email,
        nonce,
        identityToken,
        realUserStatus /* etc */,
      } = appleAuthRequestResponse;

      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user
      );
      console.log("credentialState====----->>>", credentialState);

      if (credentialState === AppleAuthCredentialState.AUTHORIZED) {
        alert("SUCCESS");
      }

      this.user = newUser;

      // this.fetchAndUpdateCredentialState()
      //   .then(res => {
      //     this.setState({credentialStateForUser: res});
      //     console.log('fetchAndUpdateCredentialState===', res);
      //   })
      //   .catch(error => {
      //     this.setState({credentialStateForUser: `Error: ${error.code}`});
      //     console.log('fetchAndUpdateCredentialState ERROR ===>>', error);
      //   });

      if (identityToken) {
        // e.g. sign in with Firebase Auth using `nonce` & `identityToken`
        console.log(nonce, identityToken);
      } else {
        // no token - failed sign-in?
      }

      if (realUserStatus === AppleAuthRealUserStatus.LIKELY_REAL) {
        console.log("I'm a real person!");
      }

      console.warn(`Apple Authentication Completed, ${this.user}, ${email}`);
    } catch (error) {
      console.log("!!!ERROR", error);

      if (error.code === AppleAuthError.CANCELED) {
        console.warn("User canceled Apple Sign in.");
      } else {
        console.error(error);
      }
    }
  };

  // fetchAndUpdateCredentialState = async () => {
  //   if (this.user === null) {
  //     this.setState({credentialStateForUser: 'N/A'});
  //   } else {
  //     const credentialState = await appleAuth.getCredentialStateForUser(
  //       this.user,
  //     );
  //     if (credentialState === AppleAuthCredentialState.AUTHORIZED) {
  //       this.setState({credentialStateForUser: 'AUTHORIZED'});
  //     } else {
  //       this.setState({credentialStateForUser: credentialState});
  //     }
  //   }
  // };

  _loginCallback = (status, showAlert) => {
    if (status) {
      this.props.didTapOnclose();
    } else {
      if (showAlert) {
        showAlertWithCallback(
          "Something went wrong, please login again",
          "Ok",
          "Continue as guest",
          () => {},
          () => {
            this.props.didTapOnclose();
          }
        );
      }
      this.props.userDidLogOut();
      this.password.clear();
    }
  };

  _didSubmitForgotPwd = () => {
    const { forgotEmail } = this.state;
    let valid = true;
    if (isEmpty(forgotEmail)) {
      this.setState({ forgotEmailError: translate("Email required") });
      valid = false;
    } else {
      this.setState({ forgotEmailError: "" });
      if (checkEMailValidation(forgotEmail)) {
        this.setState({ forgotEmailError: "" });
      } else {
        this.setState({ forgotEmailError: translate("Invalid Email") });
        valid = false;
      }
    }
    if (valid) {
      this.setState({ forgotEmail: "" });
      showSingleAlert(
        translate("Message sent succesfully"),
        translate("Ok"),
        () => this.setState({ isForgotPasswordShow: false })
      );
    }
  };

  onSubmit() {
    let errors = {};
    let isValid = true;
    ["email", "password"].forEach((name) => {
      let value = this[name].value();
      if ("email" === name) {
        if (!value) {
          errors[name] = translate("Email required");
          isValid = false;
        } else if (!checkEMailValidation(value)) {
          errors[name] = translate("Invalid Email");
          isValid = false;
        }
      }
      if ("password" === name && !value) {
        errors[name] = translate("Password required");
        isValid = false;
      }
    });
    this.setState({ errors });

    if (isValid) {
      const { onLoginUser } = this.props;
      onLoginUser(
        this["email"].value(),
        this["password"].value(),
        this._loginCallback
      );
    }
  }

  onSubmitGuest() {
    let errors = {};
    let isValid = true;
    ["lastname", "firstname", "guestEmail"].forEach((name) => {
      let value = this[name].value();
      if ("lastname" === name && !value) {
        errors[name] = translate("Last name required");
        isValid = false;
      }
      if ("firstname" === name && !value) {
        errors[name] = translate("First name required");
        isValid = false;
      }
      if ("guestEmail" === name) {
        if (!value) {
          errors[name] = translate("Email required");
          isValid = false;
        } else if (!checkEMailValidation(value)) {
          errors[name] = translate("Invalid Email");
          isValid = false;
        }
      }
    });
    this.setState({ errors });

    if (isValid) {
      let params = {
        firstName: this["firstname"].value(),
        lastName: this["lastname"].value(),
        email: this["guestEmail"].value(),
      };
      this.props.updateGuestInfo(params);
      if (this.props.guestInfoAddedCallback) {
        this.props.guestInfoAddedCallback();
      } else {
        this.props.didTapOnclose();
      }
    }
  }

  onAccessoryPress() {
    this.setState(({ secureTextEntry }) => ({
      secureTextEntry: !secureTextEntry,
    }));
  }

  renderPasswordAccessory() {
    let { secureTextEntry } = this.state;
    let name = secureTextEntry ? "visibility-off" : "visibility";
    return (
      <MaterialIcon
        style={{
          paddingStart: 10,
          paddingEnd: 6,
          paddingBottom: 2,
          paddingTop: 16,
        }}
        size={22}
        name={name}
        color={TextField.defaultProps.baseColor}
        onPress={this.onAccessoryPress}
        suppressHighlighting={true}
      />
    );
  }

  render() {
    const {
      isSignUpViewShow,
      isForgotPasswordShow,
      forgotEmailError,
      isTermsChecked,
      secureTextEntry,
      errors = {},
    } = this.state;
    const { isLoading } = this.props;

    return (
      <SafeAreaView style={styles.safeContainer}>
        <StatusBar backgroundColor={Constants.APP_THEME_DARK_GRAY} />
        <ScrollView
          style={{ flex: 1 }}
          scrollEventThrottle={16}
          onScroll={(event) => {
            if (event.nativeEvent.contentOffset.y > 100) {
              this.setState({ showClose: false });
            } else {
              this.setState({ showClose: true });
            }
          }}
        >
          {/* login section */}
          {this.state.isLogin && (
            <View style={styles.container}>
              <Text style={styles.welcomText}>
                {translate("Hello welcome")}
              </Text>
              <Image
                source={Images.womenShopping}
                resizeMode="contain"
                style={styles.girlImage}
              />
              <View style={styles.container2}>
                {/* <BlurView
                blurType="light"
                blurAmount={1}
                blurRadius={1}
                style={styles.blurCard}
              /> */}
                {/* <Text style={styles.subText}>{translate("Email")}</Text> */}

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
                  style={{
                    alignSelf: "flex-end",
                    marginHorizontal: 12,
                    marginVertical: 6,
                  }}
                  onPress={() => this.setState({ isForgotPasswordShow: true })}
                >
                  <Text style={styles.forgotPassword}>
                    {translate("Forgot Password")}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.submitButtonStyle}
                  activeOpacity={0.7}
                  onPress={() => {
                    this.onSubmit();
                  }}
                >
                  <Text style={styles.submitText}>{translate("SIGN IN")}</Text>
                </TouchableOpacity>
                <View style={styles.footerContainer}>
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
                </View>
                <View style={styles.footerContainer}>
                  <TouchableOpacity
                    onPress={() =>
                      // this.props.navigation.navigate('RegistrationScreen')
                      this.setState({ isLogin: false })
                    }
                  >
                    <Text style={styles.guestButton}>
                      {translate("Continue as guest")}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}

          {/* Guest section */}
          {!this.state.isLogin && (
            <View style={styles.container}>
              <Text style={styles.welcomText}>
                {translate("Hello welcome")}
              </Text>
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
                  ref={this.guestEmailRef}
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
                  onSubmitEditing={this.onSubmitGuestEmail}
                  returnKeyType="done"
                  label={translate("Email")}
                  error={errors.guestEmail}
                  blurOnSubmit={false}
                />

                <TouchableOpacity
                  style={[styles.submitButtonStyle, { marginTop: 35 }]}
                  activeOpacity={0.7}
                  onPress={() => {
                    this.onSubmitGuest();
                  }}
                >
                  <Text style={styles.submitText}>
                    {translate("Continue as guest")}
                  </Text>
                </TouchableOpacity>
                <View style={[styles.footerContainer, { marginBottom: 26 }]}>
                  <Text style={styles.forgotPassword}>
                    {translate("AlreadyHaveAccount")}
                  </Text>
                  <TouchableOpacity
                    onPress={() =>
                      // this.props.navigation.navigate('RegistrationScreen')
                      this.setState({ isLogin: true })
                    }
                  >
                    <Text style={styles.signup}>{translate("Login")}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
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

        <Modal
          onBackButtonPress={() => this.setState({ isSignUpViewShow: false })}
          isVisible={isSignUpViewShow}
        >
          <View style={{ flex: 1 }}>
            <SignUp
              didTapOnclose={() => this.setState({ isSignUpViewShow: false })}
              showLogin={true}
            />
          </View>
        </Modal>

        <Modal
          isVisible={isForgotPasswordShow}
          //onBackdropPress={() => this.setState({ isForgotPasswordShow: false })}
          backdropOpacity={0.6}
          onBackButtonPress={() =>
            this.setState({ isForgotPasswordShow: false })
          }
        >
          <View style={styles.passwordModalWrapper}>
            <View style={styles.passwordCardWrapper}>
              <Text style={styles.forgotPwdTxt}>
                {translate("Forgot your password?")}
              </Text>
              <View style={styles.inputContainerFull}>
                <TextInput
                  style={styles.forgotPwdinputs}
                  placeholder={translate("Enter your email Address")}
                  keyboardType="email-address"
                  returnKeyType={"done"}
                  onChangeText={(value) =>
                    this.setState({ forgotEmail: value })
                  }
                  underlineColorAndroid="transparent"
                />
              </View>
              {forgotEmailError !== "" && (
                <Text style={styles.errorText}>
                  {this.state.forgotEmailError}
                </Text>
              )}
              <View style={styles.pwdSubmitWrapper}>
                <TouchableOpacity
                  onPress={() => this.setState({ isForgotPasswordShow: false })}
                  style={styles.pwdCancelWrapper}
                >
                  <Text style={styles.pwdCancelTxt}>{translate("Cancel")}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this._didSubmitForgotPwd()}
                  style={styles.pwdSubmitBtnWrapper}
                >
                  <Text style={styles.pwdSubmitTxt}>
                    {translate("Continue")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {isLoading && <HudView />}
      </SafeAreaView>
    );
  }
}

export default LoginScreen;
