/**
 * Created by Tinoy for iLeaf Solutions Pvt.Ltd
 * on March 21, 2020
 * ChatContainer -
 */

import ChatView from "./ChatView";
import { connect } from "react-redux";
import React, { Component } from "react";

class ChatContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <ChatView {...this.props} />;
  }
}

function mapStateToProps(state) {
  return {
    selectedLanguage: state.appReducer.selectedLanguage,
    userInfo: state.loginReducer.userInfo,
    isLoading: state.loadingReducer.isLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatContainer);
