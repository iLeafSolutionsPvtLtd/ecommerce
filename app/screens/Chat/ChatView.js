/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on March 16, 2020
 * ChatView -
 */

import styles from "./styles";
import React, { Component } from "react";
import Constants from "../../config/constants";
import { WebView } from "react-native-webview";
import HudView from "../../components/hudView";
import { translate } from "../../config/languageSwitching/index";
import { View, StatusBar, SafeAreaView, Text } from "react-native";
import NavigationHeader1 from "../../components/NavigationHeaders/NavigationHeader1";

class ChatView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaderVisible: true,
    };
  }

  componentDidMount() {}

  render() {
    const { isRTL } = this.props;
    return (
      <SafeAreaView style={styles.safeContainer}>
        <StatusBar hidden={false} backgroundColor={Constants.APP_WHITE_COLOR} />
        <NavigationHeader1
          hideBottomLine
          didTapOnLeftButton={() => this.props.navigation.goBack()}
        />
        <Text style={styles.titleStyle}>{translate("Chat")}</Text>
        <View style={styles.safeContainer}>
          <WebView
            source={{
              uri: "https://tawk.to/chat/5e562c20298c395d1ce9db01/default",
            }}
            onLoadStart={() => this.setState({ loaderVisible: true })}
            onLoadEnd={() => this.setState({ loaderVisible: false })}
          />
        </View>
        {this.state.loaderVisible && <HudView />}
      </SafeAreaView>
    );
  }
}

export default ChatView;
