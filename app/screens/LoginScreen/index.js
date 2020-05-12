/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on February 12, 2020
 * LoginScreen - LoginScreen Container
 */

import { connect } from "react-redux";
import LoginScreen from "./LoginScreen";
import React, { Component } from "react";
import * as loginActions from "../../actions/loginActions";
import * as navigationActions from "../../actions/navigationActions";

class LoginContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <LoginScreen {...this.props} />;
  }
}

function mapStateToProps(state) {
  return {
    loginResponse: state.loginReducer.response,
    isLoading: state.loadingReducer.isLoading,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    navigateToHomeScreen: () => {
      navigationActions.navigateToHomeScreen;
    },
    onLoginUser: (email, password, loginCallback) => {
      dispatch(loginActions.requestLogin(email, password, loginCallback));
    },
    userDidLogOut: () => {
      dispatch(loginActions.userDidLogOut());
    },
    updateGuestInfo: (params) => {
      dispatch(loginActions.updateGuestInfo(params));
    },
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);
