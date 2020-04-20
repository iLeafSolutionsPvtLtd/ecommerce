/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on February 17, 2020
 * AccountScreen - Account Screen view
 */

import {
  translate,
  changeLanguage,
  setI18nConfigSecondTime,
} from '../../config/languageSwitching/index';
import {I18nManager} from 'react-native';

import {
  Text,
  View,
  Image,
  StatusBar,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import Login from '../LoginScreen';
import Modal from 'react-native-modal';
import React, {Component} from 'react';
import Images from '../../config/images';
import RNRestart from 'react-native-restart';
import Constants from '../../config/constants';
import ActionSheet from 'react-native-actionsheet';
import SignUp from '../../screens/RegistrationScreen';
import {showAlertWithCallback} from '../../config/common';
import NavigationHeader2 from '../../components/NavigationHeaders/NavigationHeader2';

class AccountScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoginViewShow: false,
      isRegisterViewShow: false,
    };
  }

  _didLanguageChange = lang => {
    const {
      selectedLanguage,
      didChangeLAnguage,
      storesView,
      storeCode,
      storeConfiguration,
    } = this.props;
    if (selectedLanguage === lang) {
      return;
    }

    let groupId = -1;
    let newStoreCode = '';
    if (storesView && storesView.length > 0) {
      storesView.map(item => {
        if (item.code === storeCode) {
          groupId = item.store_group_id;
        }
      });
      let savedLang = storeCode.slice(-2);
      const newLang = savedLang === 'en' ? 'Arabic' : 'English';
      storesView.map(item => {
        if (
          item.name.toUpperCase() === newLang.toUpperCase() &&
          item.store_group_id === groupId
        ) {
          newStoreCode = item.code;
        }
      });
      this.props.storeCodeUpdated(newStoreCode);
      storeConfiguration.map(storeConfigItem => {
        if (storeConfigItem.code === newStoreCode) {
          this.props.updateCurrency(
            storeConfigItem.default_display_currency_code,
          );
        }
      });
    }
    didChangeLAnguage(selectedLanguage === 'ar' ? 'en' : 'ar');

    if (lang === 'ar') {
      I18nManager.forceRTL(true);
    } else {
      I18nManager.forceRTL(false);
    }

    setTimeout(() => {
      // setI18nConfigSecondTime(selectedLanguage);
      RNRestart.Restart();
    }, 100);
  };

  _didTapOnCart = () => {
    this.props.navigation.navigate('Cart');
  };

  _showActionSheet = () => {
    this.ActionSheet.show();
  };

  _didTapOnLogOut = () => {
    showAlertWithCallback(
      translate('Are you sure you want to logout?'),
      translate('Yes'),
      translate('No'),
      () => {
        this.props.userDidLogOut();
        this.props.navigation.navigate('LoginScreen');
      },
      null,
    );
  };

  render() {
    const {
      selectedLanguage,
      isRTL,
      userToken,
      userInfo,
      cartArray,
      storeCode,
    } = this.props;
    const {isLoginViewShow, isRegisterViewShow} = this.state;
    return (
      <SafeAreaView style={styles.safeContainer}>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor={Constants.APP_BLACK_COLOR}
          // translucent={true}
        />
        <NavigationHeader2
          didTapOnFlag={this._didTapOnFlag}
          didTapOnCart={this._didTapOnCart}
          isShowFlag={false}
          isDark={true}
          isRTL={isRTL}
          showCart={true}
          hideSearch={true}
          cartItemsCount={cartArray.length}
        />
        <ScrollView
          style={{flex: 1, backgroundColor: Constants.APP_WHITE_COLOR}}
          showsVerticalScrollIndicator={false}>
          <View style={styles.scrollContainer}>
            {userToken && userToken.length > 0 && userInfo ? (
              <View style={styles.userInfoContainer}>
                <Text style={styles.userNameText}>
                  {userInfo.firstname + ' ' + userInfo.lastname}
                </Text>
                <Text style={styles.userEmailText}>{userInfo.email}</Text>
                <TouchableOpacity
                  style={styles.editIconContainer}
                  hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}
                  onPress={() =>
                    this.props.navigation.navigate('ProfileDetails')
                  }>
                  <Image
                    source={Images.edit}
                    resizeMode={'contain'}
                    style={styles.editImage}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.noUserContainer}>
                <TouchableOpacity
                  onPress={() => this.setState({isLoginViewShow: true})}
                  style={styles.buttonLogin}>
                  <Text style={styles.socialName}>{translate('Login')}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.setState({isRegisterViewShow: true})}
                  style={styles.buttonSignup}>
                  <Text style={styles.socialName}>{translate('Signup')}</Text>
                </TouchableOpacity>
              </View>
            )}

            {userInfo && (
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('AddressListScreen');
                }}
                style={styles.itemContainer}>
                <Text style={styles.itemText}>{translate('Address Book')}</Text>
                <Image
                  source={Images.arrowRight}
                  resizeMode={'contain'}
                  style={[
                    styles.itemImage,
                    {transform: [{rotate: isRTL ? '180deg' : '0deg'}]},
                  ]}
                />
              </TouchableOpacity>
            )}

            {userInfo && (
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('OrderHistory')}
                style={styles.itemContainer}>
                <Text style={styles.itemText}>
                  {translate('Order History')}
                </Text>
                <Image
                  source={Images.arrowRight}
                  resizeMode={'contain'}
                  style={[
                    styles.itemImage,
                    {transform: [{rotate: isRTL ? '180deg' : '0deg'}]},
                  ]}
                />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('CountrySelection')}
              style={styles.itemContainer}>
              <Text style={styles.itemText}>{translate('Country')}</Text>
              <Image
                source={Images.arrowRight}
                resizeMode={'contain'}
                style={[
                  styles.itemImage,
                  {transform: [{rotate: isRTL ? '180deg' : '0deg'}]},
                ]}
              />
            </TouchableOpacity>
            {storeCode !== 'intstoreen' && (
              <TouchableOpacity
                onPress={() => this._showActionSheet()}
                style={styles.itemContainer}>
                <Text style={styles.itemText}>{translate('Language')}</Text>
                <Image
                  source={Images.arrowRight}
                  resizeMode={'contain'}
                  style={[
                    styles.itemImage,
                    {transform: [{rotate: isRTL ? '180deg' : '0deg'}]},
                  ]}
                />
              </TouchableOpacity>
            )}
            {/* <TouchableOpacity style={styles.itemContainer}>
              <Text style={styles.itemText}>{translate('About Us')}</Text>
              <Image
                source={Images.arrowRight}
                resizeMode={'contain'}
                style={[
                  styles.itemImage,
                  {transform: [{rotate: isRTL ? '180deg' : '0deg'}]},
                ]}
              />
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('ContactUs')}
              style={styles.itemContainer}>
              <Text style={styles.itemText}>{translate('Contact Us')}</Text>
              <Image
                source={Images.arrowRight}
                resizeMode={'contain'}
                style={[
                  styles.itemImage,
                  {transform: [{rotate: isRTL ? '180deg' : '0deg'}]},
                ]}
              />
            </TouchableOpacity>
            {userInfo && (
              <TouchableOpacity style={styles.itemContainer}>
                <Text style={styles.itemText}>
                  {translate('Notifications')}
                </Text>
                <Image
                  source={Images.arrowRight}
                  resizeMode={'contain'}
                  style={[
                    styles.itemImage,
                    {transform: [{rotate: isRTL ? '180deg' : '0deg'}]},
                  ]}
                />
              </TouchableOpacity>
            )}
            {userInfo && (
              <TouchableOpacity
                style={styles.itemContainer}
                onPress={this._didTapOnLogOut}>
                <Text style={styles.itemText}>{translate('Logout')}</Text>
                <Image
                  source={Images.arrowRight}
                  resizeMode={'contain'}
                  style={[
                    styles.itemImage,
                    {transform: [{rotate: isRTL ? '180deg' : '0deg'}]},
                  ]}
                />
              </TouchableOpacity>
            )}
            <View style={styles.line} />
            {/* <TouchableOpacity
              style={{margin: 12, width: '100%', alignItems: 'center'}}
              onPress={this._didLanguageChange}>
              <Text>
                {'Change to ' +
                  (selectedLanguage == 'en' ? 'Arabic' : 'English')}
              </Text>
            </TouchableOpacity> */}
          </View>
        </ScrollView>
        <Modal
          onBackButtonPress={() => this.setState({isLoginViewShow: false})}
          isVisible={isLoginViewShow}>
          <View style={{flex: 1}}>
            <Login
              didTapOnclose={() => this.setState({isLoginViewShow: false})}
            />
          </View>
        </Modal>
        <Modal
          onBackButtonPress={() => this.setState({isRegisterViewShow: false})}
          isVisible={isRegisterViewShow}>
          <View style={{flex: 1}}>
            <SignUp
              didTapOnclose={() => this.setState({isRegisterViewShow: false})}
              showLogin={false}
            />
          </View>
        </Modal>
        {/* <ActionSheet
          ref={o => (this.ActionSheet = o)}
          title={
            <Text style={styles.actionSheetTitle}>
              {translate('Select your language')}
            </Text>
          }
          options={['English', 'Arabic', translate('Cancel')]}
          cancelButtonIndex={2}
          tintColor="rgb(185,128,43)"
          onPress={index => {
            switch (index) {
              case 0: {
                this._didLanguageChange('en');
                break;
              }
              case 1: {
                this._didLanguageChange('ar');
                break;
              }
            }
          }}
        /> */}
        <ActionSheet
          ref={o => (this.ActionSheet = o)}
          title={translate('Select your language')}
          options={['English', translate('ARABIC'), translate('Cancel')]}
          cancelButtonIndex={2}
          // destructiveButtonIndex={2}
          tintColor={Constants.APP_THEME_COLOR}
          onPress={index => {
            switch (index) {
              case 0: {
                this._didLanguageChange('en');
                break;
              }
              case 1: {
                this._didLanguageChange('ar');
                break;
              }
            }
          }}
        />
      </SafeAreaView>
    );
  }
}

export default AccountScreen;
