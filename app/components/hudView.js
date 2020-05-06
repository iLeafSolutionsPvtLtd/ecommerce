/**
 * Created by ILeaf solutions
 * on July 03, 2019
 * HudView - App loading screen.
 */

import React, { Component } from "react";
import Constants from "../config/constants";
import { View, ActivityIndicator } from "react-native";

export default class hudView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { styles, parentStyle } = this.props;
    return (
      <View
        style={[
          {
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          },
          parentStyle ? parentStyle : null,
        ]}
      >
        <View
          style={[
            {
              width: 80,
              height: 80,
              backgroundColor: "rgba(255,255,255,1)",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 5,
              overflow: "hidden",
            },
            styles ? styles : null,
          ]}
        >
          <ActivityIndicator size="large" color={Constants.APP_THEME_COLOR} />
        </View>
      </View>
    );
  }
}
