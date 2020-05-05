/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on February 19, 2020
 * CountrySelectionView -
 */

import {
  View,
  Text,
  Image,
  StatusBar,
  ScrollView,
  I18nManager,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import styles from "./styles";
import React, { Component } from "react";
import Images from "../../config/images";
import RNRestart from "react-native-restart";
import Constants from "../../config/constants";
import HudView from "../../components/hudView";
import { translate } from "../../config/languageSwitching/index";
import { showAlertWithCallback, showSingleAlert } from "../../config/common";
import NavigationHeader1 from "../../components/NavigationHeaders/NavigationHeader1";

class CountrySelectionView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: "",
      countryName: "",
      storeName: "",
    };
  }

  componentDidMount() {
    const { storeCode } = this.props;
    if (storeCode) {
      let country = storeCode.slice(0, 2);
      switch (country) {
        case "kw":
          this.setState({ countryName: "KUWAIT" });
          break;
        case "bh":
          this.setState({ countryName: "BAHRAIN" });
          break;
        case "sa":
          this.setState({ countryName: "KSA" });
          break;
        case "qa":
          this.setState({ countryName: "QATAR" });
          break;
        case "om":
          this.setState({ countryName: "OMAN" });
          break;
        case "ua":
          this.setState({ countryName: "UAE" });
          break;
        case "in":
          this.setState({ countryName: "INTERNATIONAL" });
          break;
      }
    }
    if (storeCode) {
      let lang = storeCode.slice(-2);
      const type = lang === "en" ? "English" : "Arabic";
      this.setState({ language: type });
    }
  }

  _userChangeTheCountry = (country) => {
    const { stores, storesView, storeConfiguration } = this.props;
    let countryId = 0;
    if (stores && stores.length > 0) {
      stores.map((item) => {
        if (item.name.toUpperCase() === country.toUpperCase()) {
          countryId = item.id;
          this.setState({ countryName: country });
        }
      });
      if (storesView && storesView.length > 0) {
        storesView.map((item) => {
          if (item.store_group_id === countryId) {
            if (
              item.name === this.state.language ||
              country === "INTERNATIONAL"
            ) {
              this.props.storeCodeUpdated(item.code);
              storeConfiguration.map((storeConfigItem) => {
                if (storeConfigItem.code === item.code) {
                  this.props.updateCurrency(
                    storeConfigItem.default_display_currency_code
                  );
                }
              });
            }
          }
        });
      }
    }
  };

  _didCountrySelected(country) {
    const { userToken, selectedLanguage } = this.props;
    const oldCountryName = this.state.countryName;
    if (oldCountryName === country) {
      return;
    }

    if (userToken && userToken.length > 0) {
      setTimeout(() => {
        this.props.getLoggedUserCartId((status) => {
          if (status) {
            if (country === "INTERNATIONAL" && selectedLanguage == "ar") {
              this.props.didChangeLAnguage("en");
              I18nManager.forceRTL(false);
            }
            setTimeout(() => {
              RNRestart.Restart();
            }, 100);
          } else {
            showSingleAlert(translate("API_Failed"));
            this._userChangeTheCountry(oldCountryName);
          }
        });
      }, 1000);

      this._userChangeTheCountry(country);
    } else {
      showAlertWithCallback(
        translate("change_country_confirmation_guest"),
        translate("Yes"),
        translate("No"),
        () => {
          this._userChangeTheCountry(country);
          if (country === "INTERNATIONAL" && selectedLanguage == "ar") {
            this.props.didChangeLAnguage("en");
            I18nManager.forceRTL(false);
          }
          setTimeout(() => {
            RNRestart.Restart();
          }, 500);
        },
        null
      );
    }
  }

  render() {
    const { selectedLanguage, isRTL, isLoading } = this.props;
    return (
      <SafeAreaView style={styles.safeContainer}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor={Constants.APP_WHITE_COLOR}
        />
        <NavigationHeader1
          hideBottomLine
          isRTL={isRTL}
          didTapOnLeftButton={() => this.props.navigation.goBack()}
        />
        <Text style={styles.titleStyle}>{translate("Country")}</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.scrollContainer}>
            <TouchableOpacity
              onPress={() => this._didCountrySelected("KUWAIT")}
              style={styles.countryContainer}
            >
              <Image
                style={[styles.countryIcon]}
                source={Images.flags.kuwait}
              />
              <Text style={styles.countryText}>{translate("KUWAIT-KWD")}</Text>
              {this.state.countryName === "KUWAIT" && (
                <View style={styles.tickContainer}>
                  <Image
                    source={Images.tick}
                    style={styles.tickImage}
                    resizeMode="contain"
                  />
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this._didCountrySelected("KSA")}
              style={styles.countryContainer}
            >
              <Image style={[styles.countryIcon]} source={Images.flags.ksa} />
              <Text style={styles.countryText}>{translate("KSA-SAR")}</Text>
              {this.state.countryName === "KSA" && (
                <View style={styles.tickContainer}>
                  <Image
                    source={Images.tick}
                    style={styles.tickImage}
                    resizeMode="contain"
                  />
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this._didCountrySelected("OMAN")}
              style={styles.countryContainer}
            >
              <Image style={[styles.countryIcon]} source={Images.flags.oman} />
              <Text style={styles.countryText}>{translate("OMAN-OMR")}</Text>
              {this.state.countryName === "OMAN" && (
                <View style={styles.tickContainer}>
                  <Image
                    source={Images.tick}
                    style={styles.tickImage}
                    resizeMode="contain"
                  />
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this._didCountrySelected("BAHRAIN")}
              style={styles.countryContainer}
            >
              <Image
                style={[styles.countryIcon]}
                source={Images.flags.beharin}
              />
              <Text style={styles.countryText}>{translate("BAHRAIN-BHD")}</Text>
              {this.state.countryName === "BAHRAIN" && (
                <View style={styles.tickContainer}>
                  <Image
                    source={Images.tick}
                    style={styles.tickImage}
                    resizeMode="contain"
                  />
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this._didCountrySelected("UAE")}
              style={styles.countryContainer}
            >
              <Image style={[styles.countryIcon]} source={Images.flags.uae} />
              <Text style={styles.countryText}>{translate("UAE-AED")}</Text>
              {this.state.countryName === "UAE" && (
                <View style={styles.tickContainer}>
                  <Image
                    source={Images.tick}
                    style={styles.tickImage}
                    resizeMode="contain"
                  />
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this._didCountrySelected("QATAR")}
              style={styles.countryContainer}
            >
              <Image style={[styles.countryIcon]} source={Images.flags.qatar} />
              <Text style={styles.countryText}>{translate("QATAR-QAR")}</Text>
              {this.state.countryName === "QATAR" && (
                <View style={styles.tickContainer}>
                  <Image
                    source={Images.tick}
                    style={styles.tickImage}
                    resizeMode="contain"
                  />
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this._didCountrySelected("INTERNATIONAL")}
              style={styles.countryContainer}
            >
              <Image style={[styles.countryIcon]} source={Images.flags.globe} />
              <Text style={styles.countryText}>
                {translate("INTERNATIONAL-USD")}
              </Text>
              {this.state.countryName === "INTERNATIONAL" && (
                <View style={styles.tickContainer}>
                  <Image
                    source={Images.tick}
                    style={styles.tickImage}
                    resizeMode="contain"
                  />
                </View>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
        {isLoading && <HudView />}
      </SafeAreaView>
    );
  }
}

export default CountrySelectionView;
