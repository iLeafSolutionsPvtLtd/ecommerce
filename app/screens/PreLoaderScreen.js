/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on February 12, 2020
 * PreLoaderScreen - UI starts from this screen (Initial data loading token updating, netinfo updating etc.)
 */

import {
  translate,
  setI18nConfig,
  setI18nConfigSecondTime,
} from "./../config/languageSwitching";
import {
  View,
  Dimensions,
  Animated,
  StatusBar,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import { connect } from "react-redux";
import React, { Component } from "react";
import NetInfo from "@react-native-community/netinfo";
import SplashScreen from "react-native-splash-screen";
import * as appActions from "./../actions/appActions";
import * as storeActions from "./../actions/storeActions";
import * as categoryActions from "./../actions/categoryActions";
import * as RNLocalize from "react-native-localize";
import DeviceInfo from "react-native-device-info";
import Login from "../screens/LoginScreen";
import Modal from "react-native-modal";

import { showSingleAlert, showAlertWithCallback } from "../config/common";
import * as loginActions from "../actions/loginActions";

import Images from "../config/images";

import Constants from "../config/constants";
import Orientation from "react-native-orientation";

class PreLoaderScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAPICalled: false,
      animationValue: new Animated.Value(150),
      isLoginViewShow: false,
    };
  }

  componentDidMount() {
    setTimeout(function() {
      SplashScreen.hide();
    }, 2000);

    let type = DeviceInfo.getDeviceType();
    this.props.updateDeviceType(type);

    if (this.props.selectedLanguage == "") {
      // setI18nConfig();
    } else {
      setI18nConfigSecondTime(this.props.selectedLanguage);
    }
    // RNLocalize.addEventListener('change', this.handleLocalizationChange);

    this.unsubscribe = NetInfo.addEventListener((state) => {
      this._handleConnectivityChange(state);
    });

    if (type != "Handset") {
      Orientation.addOrientationListener(this._orientationDidChange);
    }

    setInterval(() => {
      if (this.state.viewState == true) {
        Animated.timing(this.state.animationValue, {
          toValue: 150,
          useNativeDriver: false,
        }).start(() => {
          this.setState({ viewState: false });
        });
      } else {
        Animated.timing(this.state.animationValue, {
          toValue: 100,
          useNativeDriver: false,
        }).start(this.setState({ viewState: true }));
      }
    }, 600);
  }

  _getStoreInfoCallback = (status) => {
    if (status) {
      this._checkAppIntroStatus();
    } else {
      showSingleAlert(translate("API_Failed"), translate("Try Again"), () => {
        this.props.getStores(this._getStoreInfoCallback);
      });
    }
  };

  componentWillUnmount() {
    // RNLocalize.removeEventListener('change', this.handleLocalizationChange);
    // Orientation.removeOrientationListener(this._orientationDidChange);
  }

  // handleLocalizationChange = () => {
  //   console.log('LANGUAGE CHANGE=============================');
  //   setI18nConfig();
  //   this.forceUpdate();
  // };

  //Method to check whether user logged in or not.
  _checkAppIntroStatus() {
    const { userToken, userName, password, storeCode } = this.props;
    if (userToken !== "") {
      this.props.onLoginUser(userName, password, (status, showAlert) => {
        if (status) {
          this.props.navigation.navigate("Tab");
        } else {
          if (showAlert) {
            showAlertWithCallback(
              "User session expired, please login again",
              "Login",
              "Continue as guest",
              () => {
                this.setState({ isLoginViewShow: true });
              },
              () => {
                this.props.navigation.navigate("Tab");
              }
            );

            // showSingleAlert(
            //   'User session expired, please login again',
            //   'Ok',
            //   () => {
            //     this.props.navigation.navigate('Tab');
            //   },
            // );
          }
          this.props.userDidLogOut();
        }
      });
    } else {
      if (storeCode.length > 0) {
        this.props.navigation.navigate("Tab");
      } else {
        this.props.navigation.navigate("LoginScreen");
      }
    }
  }

  _handleConnectivityChange = (state) => {
    let networkStatus = state.isConnected;
    this.props.onChangeNetworkStatus(networkStatus);

    const { isAPICalled } = this.state;
    if (networkStatus && !isAPICalled) {
      this.setState({ isAPICalled: true });
      // if (this.props.stores && this.props.stores.length == 0) {
      this.props.getStores(this._getStoreInfoCallback);
      // } else {
      //   this._checkAppIntroStatus();
      // }
    } else if (!networkStatus && !isAPICalled) {
      showSingleAlert(
        translate("Please check your internet connection"),
        translate("Try Again"),
        () => {
          setTimeout(() => {
            this._handleConnectivityChange({ isConnected: false });
          }, 1000);
        }
      );
    }
  };

  _orientationDidChange = (orientation) => {
    console.log("ORIENTATION s", orientation);

    const { width, height } = Dimensions.get("window");
    console.log("NEW SCREEN WIDTH ", width);
    console.log("NEW SCREEN HEIGHT ", height);

    this.props.onChangeOrientation(width, height, orientation);

    if (orientation === "LANDSCAPE") {
    } else {
      // do something with portrait layout
    }
  };

  render() {
    const animatedStyle = {
      width: this.state.animationValue,
      height: this.state.animationValue,
    };
    const { isLoginViewShow } = this.state;
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: Constants.APP_THEME_COLOR }}
      >
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent={true}
        />

        <ImageBackground
          source={Images.splash}
          style={{
            width: Constants.screenWidth,
            height: Constants.SCREEN_HEIGHT,
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              // backgroundColor: Constants.APP_THEME_COLOR,
            }}
          >
            <Animated.Image
              style={[{ marginBottom: 100 }, animatedStyle]}
              source={Images.logoLarge}
              resizeMode={"contain"}
            />
          </View>
          <Modal isVisible={isLoginViewShow}>
            <View style={{ flex: 1 }}>
              <Login
                didTapOnclose={() => {
                  this.setState({ isLoginViewShow: false });
                  this.props.navigation.navigate("Tab");
                }}
              />
            </View>
          </Modal>
        </ImageBackground>
      </SafeAreaView>
    );
    // return (
    //   <View
    //     style={{
    //       flex: 1,
    //       alignItems: 'center',
    //       justifyContent: 'center',
    //       backgroundColor: Constants.APP_BLACK_COLOR,
    //     }}>
    //     <ActivityIndicator></ActivityIndicator>
    //   </View>
    // );
  }
}

function mapStateToProps(state) {
  return {
    loginReducer: state.loginReducer,
    selectedLanguage: state.appReducer.selectedLanguage,
    stores: state.appReducer.stores,
    storesView: state.appReducer.storesView,
    storeCode: state.appReducer.storeCode,
    userToken: state.appReducer.userToken,
    userName: state.loginReducer.userName,
    password: state.loginReducer.password,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateDeviceType: (devicetype) => {
      dispatch(appActions.updateDeviceType(devicetype));
    },
    onChangeNetworkStatus: (networkStatus) => {
      dispatch(appActions.onChangeNetworkStatus(networkStatus));
    },
    onChangeOrientation: (screenWidth, screenHeight, orientation) => {
      dispatch(
        appActions.onChangeOrientation(screenWidth, screenHeight, orientation)
      );
    },
    getStores: (getStoreInfoCallback) => {
      dispatch(storeActions.getStores(getStoreInfoCallback));
    },
    onLoginUser: (email, password, loginCallback) => {
      dispatch(loginActions.requestLogin(email, password, loginCallback));
    },
    userDidLogOut: () => {
      dispatch(loginActions.userDidLogOut());
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PreLoaderScreen);
