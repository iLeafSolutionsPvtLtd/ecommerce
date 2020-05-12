/**
 * Created by Tinoy for iLeaf Solutions Pvt.Ltd
 * on February 28, 2020
 * ContactUsContainer -
 */

import { connect } from "react-redux";
import React, { Component } from "react";
import ContactUsView from "./ContactUsView";
import * as loginActions from "../../actions/loginActions";

class ContactUsContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <ContactUsView {...this.props} />;
  }
}

function mapStateToProps(state) {
  return {
    selectedLanguage: state.appReducer.selectedLanguage,
    userInfo: state.loginReducer.userInfo,
    isLoading: state.loadingReducer.isLoading,
    isRTL: state.appReducer.selectedLanguage === "ar" ? true : false,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onFeedbackSubmit: (name, email, phone, onMyMind, callBack) => {
      dispatch(
        loginActions.onFeedbackSubmit(name, email, phone, onMyMind, callBack)
      );
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactUsContainer);
