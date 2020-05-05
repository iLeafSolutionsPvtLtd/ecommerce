/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on February 19, 2020
 * CategoriesContainer -
 */

import {connect} from 'react-redux';
import React, {Component} from 'react';
import CategoriesView from './CategoriesView';
import * as appActions from '../../actions/appActions';
import * as categoryActions from '../../actions/categoryActions';

class CategoriesContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <CategoriesView {...this.props} />;
  }
}

function mapStateToProps(state) {
  return {
    isRTL: state.appReducer.selectedLanguage === 'ar' ? true : false,
    currency: state.appReducer.currency,
    selectedLanguage: state.appReducer.selectedLanguage,
    isLoading: state.loadingReducer.isLoading,
    categoryLists: state.categoryListReducer.category_list,
    screenWidth: state.appReducer.screenWidth,
    cartArray:
      state.appReducer.userToken.length > 0
        ? state.cartReducer.cartArray
        : state.cartReducer.guestCartArray,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllCategories: () => {
      dispatch(categoryActions.getAllCategories());
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoriesContainer);
