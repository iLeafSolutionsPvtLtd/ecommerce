import Style from "./styles";
import React, { Component } from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

export default class SearchableComponent extends Component {
  render() {
    const { regions, regionData, isFormValid } = this.props;
    console.log(
      "regionData",
      regionData.valid,
      isFormValid,
      regionData.valid && !isFormValid
    );
    const condition = regionData.valid || isFormValid;

    return (
      <View>
        <View style={{ paddingVertical: 5 }}>
          <Text>{"State"}</Text>
        </View>
        <View style={{ paddingVertical: 5 }}>
          {/* <ModalDropdown
            style={ condition
              ? Style.text_input_style_country
              : Style.text_input_style_error}
            options={regions}
            onSelect={this.selectedRegion}
          /> */}
          <Icon
            name={"keyboard-arrow-down"}
            size={20}
            color={"black"}
            style={{ position: "absolute", right: 0, top: 15 }}
          />
        </View>
      </View>
    );
  }

  selectedRegion = (item, index) => {
    const { regions, countryRegions } = this.props;
    const selectedC = countryRegions.filter((citem, cindex) => {
      return index.toString() == citem.name;
    });
    this.props.selectedRegion(selectedC);
  };
}
