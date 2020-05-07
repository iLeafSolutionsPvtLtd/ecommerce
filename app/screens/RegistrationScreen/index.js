/**
 * Created by Tinoy for iLeaf Solutions Pvt.Ltd
 * on February 19, 2020
 * RegistrationScreen - RegistrationScreen Container
 */

import React, { Component } from "react";
import RegistrationScreen from "./RegistrationScreen";
import { connect } from "react-redux";
import * as navigationActions from "../../actions/navigationActions";
import * as loginActions from "../../actions/loginActions";

class RegistrationContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <RegistrationScreen {...this.props} />;
  }
}

function mapStateToProps(state) {
  return {
    registerResponse: state.loginReducer.response,
    isLoading: state.loadingReducer.isLoading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    navigateToHomeScreen: () => {
      navigationActions.navigateToHomeScreen;
    },
    onRegisterUser: (
      firstName,
      lastName,
      email,
      password,
      registerCallback
    ) => {
      dispatch(
        loginActions.requestRegister(
          firstName,
          lastName,
          email,
          password,
          registerCallback
        )
      );
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegistrationContainer);
