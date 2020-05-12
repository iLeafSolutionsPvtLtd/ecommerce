/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on March 18, 2020
 * Checkout Container -
 */

import { connect } from "react-redux";
import React, { Component } from "react";
import CheckoutView from "./CheckoutView";
import * as appActions from "../../actions/appActions";
import * as cartActions from "../../actions/cartActions";
import * as checkoutActions from "../../actions/checkoutActions";
import * as historyActions from "../../actions/historyActions";

class CheckoutContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <CheckoutView {...this.props} />;
  }
}

function mapStateToProps(state) {
  return {
    isLoading: state.loadingReducer.isLoading,
    selectedLanguage: state.appReducer.selectedLanguage,
    isRTL: state.appReducer.selectedLanguage === "ar" ? true : false,
    searchHistoryarray: state.searchHistoryReducer.searchHistoryarray,
    screenWidth: state.appReducer.screenWidth,
    screenHeight: state.appReducer.screenHeight,
    orientation: state.appReducer.orientation,
    searchResultArray: state.searchResultReducer.searchResultArray,
    productsSizes: state.appReducer.productsSizes,
    productsColors: state.appReducer.productsColors,
    cartList: state.cartReducer.cartArray,
    guestcartList: state.cartReducer.guestCartArray,
    userToken: state.appReducer.userToken,
    currency: state.appReducer.currency,
    guestInfo: state.loginReducer.guestInfo,
    userInfo: state.loginReducer.userInfo,
    storeCode: state.appReducer.storeCode,
    addressList: state.addAddressReducer.addressList || [],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setShipmentInfo: (params, isPlaceOrder, orderPlacedCallback) => {
      dispatch(
        checkoutActions.setShipmentInfo(
          params,
          isPlaceOrder,
          orderPlacedCallback
        )
      );
    },
    applyVoucher: (voucherCode, apllyCodeCallback) => {
      dispatch(checkoutActions.applyVoucher(voucherCode, apllyCodeCallback));
    },
    getPaymentAndShippingMethods: (getPaymentAndShippingMethodsCallback) => {
      dispatch(
        checkoutActions.getPaymentAndShippingMethods(
          getPaymentAndShippingMethodsCallback
        )
      );
    },
    getTotalCost: (getTotalCostCallback) => {
      dispatch(cartActions.getTotalCost(getTotalCostCallback));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckoutContainer);
