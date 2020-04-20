import {
  translate,
  changeLanguage,
  setI18nConfigSecondTime,
} from '../../config/languageSwitching/index';
import styles from './styles';
import React, {Component} from 'react';
import Images from '../../config/images';
import Constants from '../../config/constants';
import {
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
  FlatList,
} from 'react-native';
import HudView from '../../components/hudView';
import EmptyDataPlaceholder from '../../components/emptyDataPlaceholder';
import NavigationHeader2 from '../../components/NavigationHeaders/NavigationHeader2';
import OrderHistoryCell from '../../components/orderHistoryCell';
import {isEmpty} from '../../config/common';

const ListItem = React.memo(
  ({
    item,
    index,
    productsColors,
    productsSizes,
    addProductToWishList,
    props,
  }) => {
    // function getQuantity(quantityValue) {
    //   console.log('quantityValue', quantityValue);
    //   setTotalGross(quantityValue * item.price);
    // }

    // const attributesColor = item.product_option.extension_attributes.configurable_item_options.filter(
    //   color => {
    //     return color.option_id === '93';
    //   },
    // );
    // const attributesSize = item.product_option.extension_attributes.configurable_item_options.filter(
    //   size => {
    //     return size.option_id === '178';
    //   },
    // );
    // const colorID = attributesColor[0].option_value.toString();
    // const sizeID = attributesSize[0].option_value.toString();

    // const colorName = productsColors.filter(item => {
    //   return colorID === item.value;
    // });
    // const sizeName = productsSizes.filter(item => {
    //   return sizeID === item.value;
    // });

    const orderCell = item.items.map(orderedItem => {
      if (orderedItem.parent_item) {
        return (
          <View style={{marginHorizontal: 0}}>
            <OrderHistoryCell
              item={orderedItem.parent_item}
              addProductToWishList={addProductToWishList}
              index={index}
              productsSizes={productsSizes}
              productsColors={productsColors}
              allowAddOption={false}
              showQuantity={true}
              currency={item.order_currency_code}
            />
          </View>
        );
      }
    });

    return (
      <View
        style={{
          marginTop: 3,
          backgroundColor: Constants.APP_WHITE_COLOR,
        }}>
        <View style={{marginHorizontal: 20, marginTop: 10}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.orderNumberText}>
                {translate('Order Number :') + ' '}
              </Text>
              <Text style={styles.orderNumberText}>{item.increment_id}</Text>
            </View>
            {/* <Image
              source={Images.arrowRight}
              resizeMode={'contain'}
              style={[
                styles.itemImage,
                {transform: [{rotate: props.isRTL ? '180deg' : '0deg'}]},
              ]}
            /> */}
          </View>
          <Text
            style={[
              styles.deliveryStatusText,
              {color: item.status === 'pending' ? 'green' : 'red'},
            ]}>
            {item.status}
          </Text>
          <View style={styles.underLineStyle} />
        </View>
        {orderCell}
      </View>
    );
  },
);

class OrderHistoryDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderItem: '',
    };
  }

  componentDidMount() {
    const orderItem = this.props.navigation.state.params
      ? this.props.navigation.state.params.orderItem
      : '';
    if (orderItem) {
      console.log('orderitem::: ', orderItem);
      this.setState({orderItem: orderItem});
    }

    // this.props.getOrderHistory(response => {
    //   response.items.map(orderedItem => {
    //     let arr = [];
    //     arr = orderedItem.items.filter(subItem => {
    //       return subItem.product_type === 'simple';
    //     });
    //     orderedItem.items = arr;
    //   });
    //   console.log('order history after ', response);

    //   this.setState({orderList: response.items});
    // });
  }

  _didTapOnBackButton = () => {
    this.props.navigation.goBack();
  };

  _getShippingAddress = orderItem => {
    return (
      orderItem.billing_address.firstname +
      ' ' +
      orderItem.billing_address.lastname +
      '\n' +
      orderItem.billing_address.street[0] +
      '\n' +
      orderItem.billing_address.city +
      '\n' +
      orderItem.billing_address.postcode +
      '\nmob: ' +
      orderItem.billing_address.telephone
    );
  };

  render() {
    const {
      selectedLanguage,
      userToken,
      productsSizes,
      productsColors,
      isLoading,
      isRTL,
      currency,
    } = this.props;
    const {orderItem} = this.state;
    const paymethod =
      orderItem.payment &&
      orderItem.payment.additional_information &&
      orderItem.payment.additional_information.length > 0
        ? orderItem.payment.additional_information[0]
        : '';

    return (
      <SafeAreaView style={styles.safeContainer}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor={Constants.APP_WHITE_COLOR}
        />
        <NavigationHeader2
          title={`Order Number : ${orderItem.increment_id}`}
          showBackButton={true}
          didTapOnBackButton={this._didTapOnBackButton}
          hideBottomLine={false}
          isRTL={selectedLanguage === 'ar' ? true : false}
          hideSearch={true}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{backgroundColor: Constants.APP_GRAY_COLOR2}}>
          <View style={styles.scrollContainer}>
            {orderItem.increment_id && (
              <ListItem
                item={orderItem}
                index={0}
                productsSizes={productsSizes}
                productsColors={productsColors}
                props={this.props}
              />
            )}

            {orderItem.status === 'pending' && (
              <TouchableOpacity
                activeOpacity={Constants.ACTIVE_OPACITY}
                style={{
                  marginTop: 8,
                  backgroundColor: '#FFFFFF',
                  paddingVertical: 4,
                }}>
                <View style={[styles.wrapper, {justifyContent: 'flex-start'}]}>
                  <Text style={styles.normalText}>
                    {translate('Order Tracking Number') + ' '}
                  </Text>
                  <Text style={styles.textBlue}>{98790890879876}</Text>
                </View>
                <View style={styles.wrapper}></View>
              </TouchableOpacity>
            )}

            <View style={styles.cardWrapper}>
              <View style={styles.wrapper}>
                <Text style={styles.normalText}>{translate('Cart Total')}</Text>
                <Text style={styles.normalText}>
                  {orderItem.subtotal + ' ' + orderItem.order_currency_code}
                </Text>
              </View>
              <View style={styles.wrapper}>
                <Text style={styles.normalText}>
                  {translate('Shipping Charges')}
                </Text>
                <Text style={styles.normalText}>
                  {orderItem.shipping_amount +
                    ' ' +
                    orderItem.order_currency_code}
                </Text>
              </View>
              <View style={[styles.underLineStyle2]} />
              <View style={styles.wrapper}>
                <Text style={styles.normalTextBold}>
                  {translate('TOTAL PAYMENT')}
                </Text>
                <Text style={styles.normalTextBold}>
                  {orderItem.grand_total + ' ' + orderItem.order_currency_code}
                </Text>
              </View>
            </View>

            <View
              style={{
                backgroundColor: '#FFFFFF',
                marginTop: 8,
                paddingBottom: 4,
              }}>
              <View style={styles.wrapperColumn}>
                <Text style={styles.largeTextBold}>
                  {translate('Shipping Address')}
                </Text>
                <Text style={styles.addressText}>
                  {orderItem.billing_address
                    ? this._getShippingAddress(orderItem)
                    : ''}
                </Text>
                <Text style={styles.largeTextBold}>
                  {translate('Delivery Address')}
                </Text>
                <Text style={styles.addressText}>
                  {orderItem.billing_address
                    ? this._getShippingAddress(orderItem)
                    : ''}
                </Text>
              </View>
            </View>

            <View style={styles.cardWrapper}>
              <View style={styles.wrapperColumn}>
                <Text style={styles.largeTextBold}>
                  {translate('Payment Details')}
                </Text>
                <View style={[styles.underLineStyle, {marginVertical: 12}]} />
                <Text style={styles.addressText}>
                  {translate('Payment Method') + ' - ' + paymethod}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
        {!orderItem.increment_id && (
          <View style={{alignSelf: 'center'}}>
            <EmptyDataPlaceholder
              titleText={translate('Your order history is empty')}
              descriptionText={
                'Lorem Ipsum is simply dummy text of the printing'
              }
              placeHolderImage={Images.noWishlist}
            />
          </View>
        )}
        {isLoading && <HudView />}
      </SafeAreaView>
    );
  }
}

export default OrderHistoryDetailScreen;
