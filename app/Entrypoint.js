/**
 * Created by Jebin for iLeaf Solutions
 * on February 12, 2020
 * Entrypoint - Everthing starts from the entrypoint.
 */

import Navigator from "./navigation";
import { Provider } from "react-redux";
import React, { Component } from "react";
import DeviceInfo from "react-native-device-info";
import Orientation from "react-native-orientation";
import configureStore from "./store/configureStore";
import { PersistGate } from "redux-persist/es/integration/react";
import { ActivityIndicator, Text, TextInput } from "react-native";

const { persistor, store } = configureStore();

export default class Entrypoint extends Component {
  constructor(props) {
    super(props);
    Text.defaultProps = Text.defaultProps || {};
    Text.defaultProps.allowFontScaling = false;
    TextInput.defaultProps = TextInput.defaultProps || {};
    TextInput.defaultProps.allowFontScaling = false;
  }

  componentDidMount() {
    console.disableYellowBox = true;
    let type = DeviceInfo.getDeviceType();
    console.log("********DEVICE TYPE*******", type);
    if (type === "Handset") {
      Orientation.lockToPortrait();
    }
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
          <Navigator />
        </PersistGate>
      </Provider>
    );
  }
}
