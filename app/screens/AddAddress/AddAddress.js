import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {translate} from '../../config/languageSwitching/index';
import NavigationHeader2 from '../../components/NavigationHeaders/NavigationHeader2';
import {isEmpty} from '../../config/common';
import Styles from './style';
import Countries from '../../lib/countires.js';
import {showSingleAlert} from '../../config/common';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HudView from '../../components/hudView';
import constants from '../../config/constants';
// import CountryPicker from 'react-native-country-picker-modal';

import CountryPicker, {
  getAllCountries,
  getCallingCode,
} from 'react-native-country-picker-modal';

let countryFromAddress = '';
class AddAddress extends Component {
  constructor(props) {
    super(props);
    const {details, edit} = props.navigation.state.params;

    const {storeCode} = props;

    console.log('details', details);

    let streetAddress = '';
    // edit
    //   ? details.street.join().replace(new RegExp(',', 'g'), ' \n ')
    //   : '';
    if (edit)
      details.street.map(item => {
        streetAddress = streetAddress + item + '\n';
      });

    if (
      props.navigation.state.params.isFromGuestCheckout &&
      details &&
      details.street
    ) {
      details.street.map(item => {
        streetAddress = streetAddress + item + '\n';
      });
    }

    let countryName = '';
    let countryCode = '';

    if (storeCode === 'kwstoreen' || storeCode === 'kwstorear') {
      countryName = 'Kuwait';
      countryCode = 'KW';
    } else if (storeCode === 'bhstoreen' || storeCode === 'bhstorear') {
      countryName = 'Bahrain';
      countryCode = 'BH';
    } else if (storeCode === 'sastoreen' || storeCode === 'sastorear') {
      countryName = 'KSA';
      countryCode = 'SA';
    } else if (storeCode === 'qastoreen' || storeCode === 'qastorear') {
      countryName = 'Qatar';
      countryCode = 'QA';
    } else if (storeCode === 'omstoreen' || storeCode === 'omstorear') {
      countryName = 'Oman';
      countryCode = 'OM';
    } else if (storeCode === 'uastoreen' || storeCode === 'uastorear') {
      countryName = 'UAE';
      countryCode = 'AE';
    } else {
      countryName = '';
      countryCode = '';
    }

    if (details.country_id && details.country_id !== '') {
      // const c_select = Countries.filter(item => {
      //   return item.id === details.country_id;
      // });
      // countryFromAddress = c_select[0].full_name_english;

      countryCode = details.country_id;
      console.log('CODE', countryCode);
      countryName = Countries[countryCode].name.common;
      console.log('COUNTRY DICT == ', countryName);
    }

    console.log('DETAILS===', details);
    console.log('COUNTRY===', countryName);
    console.log('COUNTRY CODE===', countryCode);

    this.state = {
      availableCountries: [],
      availableRegions: [],
      countryRegions: [],
      isFormValid: true,
      regionID: '',
      isEdit: edit,
      isShowCountryPicker: false,
      countryName: countryName,
      countryCode: countryCode,

      formFeilds: {
        firstname: {
          text: details.firstname || '',
          valid:
            details.firstname && !isEmpty(details.firstname) ? true : false,
        },
        lastname: {
          text: details.lastname || '',
          valid: details.lastname && !isEmpty(details.lastname) ? true : false,
        },
        city: {
          text: details.city || '',
          valid: details.city && !isEmpty(details.city) ? true : false,
        },
        address: {
          text: details && details.street ? streetAddress : '',
          valid:
            details && details.street && streetAddress.length > 0
              ? true
              : false,
        },
        zipcode: {
          text: details.postcode || '',
          valid: details.postcode && !isEmpty(details.postcode) ? true : false,
        },
        mobile: {
          text: details.telephone || '',
          valid:
            details.telephone && !isEmpty(details.telephone) ? true : false,
        },
        country_state: {
          text: details.country_state || '',
          valid: true,
        },
        country: {
          text: countryFromAddress || '',
          countryID: details.country_id || '',
          valid: countryName !== '',
          // countryFromAddress && !isEmpty(countryFromAddress) ? true : false,
        },
      },
    };
  }

  componentDidMount() {
    // const availableCountries = Countries.map(country => {
    //   return country.full_name_locale;
    // });
    // this.setState({availableCountries: availableCountries.sort()});
  }

  componentWillUnmount() {
    countryFromAddress = '';
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

    const {isShowCountryPicker, countryName} = this.state;
    const {isRTL} = this.props;

    const {isFormValid, countryRegions, isEdit, availableRegions} = this.state;

    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <NavigationHeader2
          title={isEdit ? translate('Edit Address') : translate('Add Address')}
          hideSearch={true}
          showBackButton={true}
          didTapOnBackButton={this.didTapOnBackButton}
          isRTL={isRTL}
        />
        <ScrollView style={{padding: 10}}>
          {/* first name */}
          <View style={{paddingVertical: 5, flexDirection: 'row'}}>
            <Text style={Styles.textTile}>{translate('First Name')}</Text>
            {!firstname.valid && !isFormValid && (
              <Text style={{marginLeft: 5, color: 'red'}}>
                {translate('This feild is required*')}
              </Text>
            )}
          </View>
          <View style={{paddingVertical: 5}}>
            <TextInput
              value={firstname.text}
              onChangeText={text => {
                this.validateInput(text, 'firstname');
              }}
              maxLength={30}
              returnKeyType={'next'}
              onSubmitEditing={() => this.lastNameRef.focus()}
              style={
                !firstname.valid && !isFormValid
                  ? [
                      Styles.text_input_style_error,
                      {textAlign: isRTL ? 'right' : 'left'},
                    ]
                  : [
                      Styles.text_input_style,
                      {textAlign: isRTL ? 'right' : 'left'},
                    ]
              }
            />
          </View>
          {/* last name */}
          <View style={{paddingVertical: 5, flexDirection: 'row'}}>
            <Text style={Styles.textTile}>{translate('Last Name')}</Text>
            {!lastname.valid && !isFormValid && (
              <Text style={{marginLeft: 5, color: 'red'}}>
                {translate('This feild is required*')}
              </Text>
            )}
          </View>
          <View style={{paddingVertical: 5}}>
            <TextInput
              value={lastname.text}
              onChangeText={text => {
                this.validateInput(text, 'lastname');
              }}
              ref={ref => (this.lastNameRef = ref)}
              maxLength={30}
              returnKeyType={'next'}
              onSubmitEditing={() => this.addressRef.focus()}
              style={
                !lastname.valid && !isFormValid
                  ? [
                      Styles.text_input_style_error,
                      {textAlign: isRTL ? 'right' : 'left'},
                    ]
                  : [
                      Styles.text_input_style,
                      {textAlign: isRTL ? 'right' : 'left'},
                    ]
              }
            />
          </View>
          <View style={{paddingVertical: 5, flexDirection: 'row'}}>
            <Text style={Styles.textTile}>{translate('Address')}</Text>
            {!address.valid && !isFormValid && (
              <Text style={{marginLeft: 5, color: 'red'}}>
                {translate('This feild is required*')}
              </Text>
            )}
          </View>
          <View style={{paddingVertical: 5}}>
            <TextInput
              value={address.text}
              multiline={true}
              numberOfLines={4}
              onChangeText={text => {
                this.validateInput(text, 'address');
              }}
              ref={ref => (this.addressRef = ref)}
              maxLength={250}
              returnKeyType={'next'}
              style={
                !address.valid && !isFormValid
                  ? [
                      Styles.text_input_style_textarea_error,
                      {textAlign: isRTL ? 'right' : 'left'},
                    ]
                  : [
                      Styles.text_input_style_textarea,
                      {textAlign: isRTL ? 'right' : 'left'},
                    ]
              }
            />
          </View>
          <View style={{paddingVertical: 5, flexDirection: 'row'}}>
            <Text style={Styles.textTile}>{translate('City/Emirate')}</Text>
            {!city.valid && !isFormValid && (
              <Text style={{marginLeft: 5, color: 'red'}}>
                {translate('This feild is required*')}
              </Text>
            )}
          </View>
          <View style={{paddingVertical: 5}}>
            <TextInput
              value={city.text}
              onChangeText={text => {
                this.validateInput(text, 'city');
              }}
              ref={ref => (this.cityRef = ref)}
              maxLength={30}
              returnKeyType={'next'}
              onSubmitEditing={() => this.zipCodeRef.focus()}
              style={
                !city.valid && !isFormValid
                  ? [
                      Styles.text_input_style_error,
                      {textAlign: isRTL ? 'right' : 'left'},
                    ]
                  : [
                      Styles.text_input_style,
                      {textAlign: isRTL ? 'right' : 'left'},
                    ]
              }
            />
          </View>
          <View style={{paddingVertical: 5, flexDirection: 'row'}}>
            <Text style={Styles.textTile}>{translate('Zip')}</Text>
            {!zipcode.valid && !isFormValid && (
              <Text style={{marginLeft: 5, color: 'red'}}>
                {translate('This feild is required*')}
              </Text>
            )}
          </View>
          <View style={{paddingVertical: 5}}>
            <TextInput
              value={zipcode.text}
              keyboardType={'numeric'}
              onChangeText={text => {
                this.validateInput(text, 'zipcode');
              }}
              ref={ref => (this.zipCodeRef = ref)}
              maxLength={10}
              returnKeyType={'next'}
              style={
                !zipcode.valid && !isFormValid
                  ? [
                      Styles.text_input_style_error,
                      {textAlign: isRTL ? 'right' : 'left'},
                    ]
                  : [
                      Styles.text_input_style,
                      {textAlign: isRTL ? 'right' : 'left'},
                    ]
              }
            />
          </View>

          {/* <View style={{paddingVertical: 5, flexDirection: 'row'}}>
            <Text style={Styles.textTile}>{translate('Country')}</Text>
            {!country.valid && !isFormValid && (
              <Text style={{marginLeft: 5, color: 'red'}}>
                {translate('This feild is required*')}
              </Text>
            )}
          </View>
         <View style={{paddingVertical: 5}}>
             <ModalDropdown
              style={
                !country.valid && !isFormValid
                  ? Styles.text_input_style_error
                  : Styles.text_input_style_country
              }
              defaultValue={country.text}
              options={this.state.availableCountries}
              onSelect={this.selectedCountry}
            /> 
            <Icon
              name={'keyboard-arrow-down'}
              size={20}
              color={'black'}
              style={{position: 'absolute', right: 0, top: 15}}
            />
          </View> */}

          <View style={{paddingVertical: 5, flexDirection: 'row'}}>
            <Text style={Styles.textTile}>{translate('Country')}</Text>
            {!country.valid && !isFormValid && (
              <Text style={{marginLeft: 5, color: 'red'}}>
                {translate('This feild is required*')}
              </Text>
            )}
          </View>
          <View style={{paddingVertical: 5}}>
            <TouchableOpacity
              onPress={() => {
                this.setState({isShowCountryPicker: true});
              }}
              style={
                !country.valid && !isFormValid
                  ? [Styles.text_input_style_error]
                  : {
                      backgroundColor: '#f4f6f8',
                      height: 40,
                      paddingLeft: 2,
                      borderRadius: 5,
                      justifyContent: 'center',
                    }
              }
              // style={{
              //   backgroundColor: '#f4f6f8',
              //   height: 40,
              //   paddingLeft: 2,
              //   borderRadius: 5,
              //   justifyContent: 'center',
              // }}
            >
              <Text
                style={{
                  fontFamily: constants.Fonts.REGULAR,
                  fontSize: 15,
                  textAlign: 'left',
                  color: constants.APP_BLACK_COLOR,
                }}>
                {countryName}
              </Text>
            </TouchableOpacity>
          </View>

          {/* {this.state.availableRegions.length > 0 && (
            <SearchableComponent
              regionData={country_state}
              validFeid={isFormValid}
              countryRegions={countryRegions}
              selectedRegion={this.selectedRegion}
              isFormValid={isFormValid}
              regions={availableRegions}
            />
          )} */}

          <View style={{paddingVertical: 5, flexDirection: 'row'}}>
            <Text style={Styles.textTile}>{translate('Mobile Number')}</Text>
            {!mobile.valid && !isFormValid && (
              <Text style={{marginLeft: 5, color: 'red'}}>
                {translate('This feild is required*')}
              </Text>
            )}
          </View>
          <View style={{paddingVertical: 5}}>
            <TextInput
              value={mobile.text}
              keyboardType={'phone-pad'}
              onChangeText={text => {
                this.validateInput(text, 'mobile');
              }}
              ref={ref => (this.phoneNoRef = ref)}
              maxLength={12}
              returnKeyType={'next'}
              style={
                !mobile.valid && !isFormValid
                  ? [
                      Styles.text_input_style_error,
                      {textAlign: isRTL ? 'right' : 'left'},
                    ]
                  : [
                      Styles.text_input_style,
                      {textAlign: isRTL ? 'right' : 'left'},
                    ]
              }
            />
          </View>

          <View style={Styles.addAddressBtn}>
            <TouchableOpacity
              onPress={this.saveAddress}
              style={Styles.btn_touchable_style}>
              <Text
                style={{
                  color: constants.APP_THEME_COLOR,
                  fontFamily: constants.Fonts.REGULAR,
                  fontSize: 16,
                }}>
                {isEdit ? translate('UPDATE') : translate('SAVE ADDRESS')}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <CountryPicker
          {...{
            withFilter: true,
            withCountryNameButton: true,
            withAlphaFilter: true,
            onSelect: data => {
              console.log(('SELECTED COUNTRY DATA', data));
              this.setState({countryName: data.name, countryCode: data.cca2});
              this.validateInput(data.name, 'country');
            },
            placeholder: '',
            onClose: () => {
              this.setState({isShowCountryPicker: false});
            },
          }}
          style={{width: 0, height: 0}}
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
    this.setState({formFeilds: formfeilds});
  };

  selectedCountry = (item, index) => {
    // const selectedC = Countries.filter((citem, cindex) => {
    //   // return index.toString() == citem.full_name_english;
    // });
    // let stateObject = {
    //   text: index.toString(),
    //   countryID: selectedC[0].id,
    //   valid: true,
    // };
    // let regionObject = {
    //   text: '',
    //   id: 0,
    //   valid: false,
    // };
    // let formfeilds = this.state.formFeilds;
    // formfeilds['country'] = stateObject;
    // formfeilds['country_state'] = regionObject;
    // this.setState({formFeilds: formfeilds});
    // if (
    //   selectedC[0].available_regions &&
    //   selectedC[0].available_regions.length > 0
    // ) {
    //   const regions = selectedC[0].available_regions.map(item => {
    //     return item.name;
    //   });
    //   this.setState({
    //     availableRegions: regions,
    //     countryRegions: selectedC[0].available_regions,
    //   });
    // } else {
    //   regionObject = {
    //     text: '',
    //     id: 0,
    //     valid: true,
    //   };
    //   formfeilds['country_state'] = regionObject;
    //   this.setState({
    //     formFeilds: formfeilds,
    //     availableRegions: [],
    //     regionID: 0,
    //   });
    // }
  };

  selectedRegion = region => {
    let stateObject = {
      text: region[0].name.toString(),
      id: region[0].id,
      valid: true,
    };

    let formfeilds = this.state.formFeilds;
    formfeilds['country_state'] = stateObject;
    this.setState({formFeilds: formfeilds, regionID: region[0].id});
  };

  saveAddress = () => {
    console.log('address', this.state.formFeilds);
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

      const {countryCode} = this.state;

      console.log('address', this.state.formFeilds);

      let newAddress = {
        region_id: country_state.id || 0,
        country_id: countryCode,
        street: [address.text],
        firstname: firstname.text,
        lastname: lastname.text,
        company: '',
        telephone: mobile.text,
        city: city.text,
        postcode: zipcode.text,
      };
      const filledFeilds = Object.keys(this.state.formFeilds).filter(item => {
        return !this.state.formFeilds[item].valid;
      });
      this.setState({isFormValid: filledFeilds.length > 0 ? false : true});
      if (filledFeilds.length === 0) {
        this.props.navigation.state.params.addAddressCallback(newAddress);
        this.props.navigation.goBack();
      }
    } else {
      const filledFeilds = Object.keys(this.state.formFeilds).filter(item => {
        return !this.state.formFeilds[item].valid;
      });
      this.setState({isFormValid: filledFeilds.length > 0 ? false : true});

      if (filledFeilds.length === 0) {
        this.callAddressAction();
      }
    }
  };

  callAddressAction = () => {
    const {storeCode, storeView, userInfo, addressList} = this.props;
    const {isEdit} = this.state;
    const {details} = this.props.navigation.state.params;
    let userAddress = [];
    const storeIDArray = storeView.filter(item => {
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
    const {countryCode} = this.state;

    let textArray = address.text.split('↵');
    let textArray2 = address.text.split('\n');

    let stringarray = [];
    textArray2.forEach(element => {
      if (element.length > 0) {
        stringarray.push(element.trim());
      }
    });

    if (stringarray.length > 3) {
      showSingleAlert(translate('Address cannot contain more than 3 lines'));
      return;
    }

    let newAddress = {
      region_id: country_state.id || 0,
      country_id: countryCode, //country.countryID.trim(),
      street: stringarray,
      firstname: firstname.text.trim(),
      lastname: lastname.text.trim(),
      company: '',
      telephone: mobile.text.trim(),
      city: city.text.trim(),
      postcode: zipcode.text.trim(),
      default_billing: addressList.length > 0 ? false : true,
    };

    // if (addressList.length > 0) {
    //   let obj = {};
    //   userAddress = addressList.map(item => {
    //     if (isEdit && details.id === item.id) {
    //       return newAddress;
    //     } else {
    //       obj['region_id'] = item.region_id;
    //       obj['country_id'] = item.country_id;
    //       obj['firstname'] = item.firstname;
    //       obj['lastname'] = item.lastname;
    //       obj['telephone'] = item.telephone;
    //       obj['city'] = item.city;
    //       obj['postcode'] = item.postcode;
    //       obj['company'] = '';
    //       obj['street'] = item.street;
    //       obj['default_billing'] = item.default_billing;
    //       return obj;
    //     }
    //   });
    // }

    if (isEdit) {
      let itemIndex;
      userAddress = addressList;
      userAddress.map((item, i) => {
        if (item.id === details.id) itemIndex = i;
      });

      newAddress['default_billing'] = details['default_billing'];
      userAddress[itemIndex] = newAddress;
    }

    const addresses = [...addressList, newAddress];
    const editAddresses = userAddress; //[...userAddress]; //[{...newAddress}];
    console.log('addresses', addresses);

    let request = {
      customer: {
        email: userInfo.email || '',
        firstname: userInfo.firstname || '',
        lastname: userInfo.lastname || '',
        store_id: store_id,
        website_id: 1,
        addresses: isEdit ? editAddresses : addresses,
      },
    };
    console.log('addresses', addresses);
    if (isEdit) {
      this.props.editAddressUser(request, this.editAddressCallback);
    } else {
      this.props.addAddressUser(request, this.addAddressCallback);
    }
  };

  editAddressCallback = status => {
    if (status) {
      showSingleAlert('Successfully Updated', 'OK', () => {
        this.props.navigation.goBack();
      });
    }
  };

  addAddressCallback = status => {
    if (status) {
      showSingleAlert('Successfully Added', 'OK', () => {
        this.props.navigation.goBack();
      });
    }
  };
}

export default AddAddress;
