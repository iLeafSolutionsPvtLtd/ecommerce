/**
 * Created by Tinoy for iLeaf Solutions Pvt.Ltd
 * on February 28, 2020
 * CountrySelectionContainer -
 */

import { connect } from "react-redux";
import React, { Component } from "react";
import * as appActions from "../../actions/appActions";
import CountrySelectionView from "./CountrySelectionView";

class CountrySelectionContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <CountrySelectionView {...this.props} />;
  }
}

function mapStateToProps(state) {
  return {
    isLoading: state.loadingReducer.isLoading,
    userToken: state.appReducer.userToken,
    selectedLanguage: state.appReducer.selectedLanguage,
    storeCode: state.appReducer.storeCode,
    stores: state.appReducer.stores,
    storesView: state.appReducer.storesView,
    storeConfiguration: state.appReducer.storeConfiguration,
    isRTL: state.appReducer.selectedLanguage === "ar" ? true : false,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    didChangeLAnguage: (language) => {
      dispatch(appActions.onChangeLanguage(language));
    },
    storeCodeUpdated: (code) => {
      dispatch(appActions.onstoreCodeUpdated(code));
    },
    updateCurrency: (currency) => {
      dispatch(appActions.updateCurrency(currency));
    },
    getLoggedUserCartId: (getLoggedUserCartIdCallback) => {
      dispatch(appActions.getLoggedUserCartId(getLoggedUserCartIdCallback));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CountrySelectionContainer);
