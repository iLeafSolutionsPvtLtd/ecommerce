/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on February 18, 2020
 * Search View - Search UI
 */

import {
  View,
  Text,
  Image,
  Keyboard,
  FlatList,
  TextInput,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import styles from "./styles";
import React, { Component } from "react";
import Images from "../../config/images";
import Constants from "../../config/constants";
import { translate } from "../../config/languageSwitching/index";
import EmptyDataPlaceholder from "../../components/emptyDataPlaceholder";

class SearchView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      keyboardHeight: 0,
    };
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this._keyboardDidHide
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = (e) => {
    this.setState({ keyboardHeight: e.endCoordinates.height });
  };

  _keyboardDidHide = () => {
    this.setState({ keyboardHeight: 0 });
  };

  _didTapOnLeftButton = () => {
    this.props.navigation.goBack();
    this.props.clearSearchResult();
  };

  _didSearchSubmit = () => {};

  _searchHistoryItem = (query) => {
    const { searchHistoryarray } = this.props;
    if (query === "" || searchHistoryarray.length == 0) {
      return [];
    }

    const regex = new RegExp(`${query.trim()}`, "i");
    return searchHistoryarray.filter((item) => item.name.search(regex) >= 0);
  };

  _clearSearchHistory = () => {
    this.props.updateSearchHistory([]);
  };

  _didSelectProduct = (item, isFromHistory) => {
    const { searchHistoryarray } = this.props;
    if (!isFromHistory) {
      let filterdArray = searchHistoryarray.filter((dd) => item.id == dd.id);
      if (filterdArray.length == 0)
        this.props.updateSearchHistory([...searchHistoryarray, ...[item]]);
    }

    this.props.navigation.navigate("ProductDetail", {
      sku: item.sku,
    });
  };

  render() {
    const {
      isRTL,
      isLoading,
      screenWidth,
      onSearchTextChange,
      searchResultArray,
    } = this.props;
    const { query, keyboardHeight } = this.state;
    const searchHistoryArray = this._searchHistoryItem(query);
    const comp = (a, b) =>
      a.toLowerCase().trim() === b.name.toLowerCase().trim();

    return (
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.searchContainer}>
          <TouchableOpacity onPress={this._didTapOnLeftButton}>
            <Image
              source={Images.backButton}
              resizeMode={"contain"}
              style={{
                marginLeft: 20,
                width: 17,
                height: 17,
                transform: [{ rotate: isRTL ? "180deg" : "0deg" }],
              }}
            />
          </TouchableOpacity>
          <TextInput
            placeholder={translate("Search")}
            clearButtonMode
            returnKeyType={"search"}
            // onSubmitEditing={this._didSearchSubmit}
            defaultValue={query}
            onChangeText={(text) => {
              this.setState({ query: text });
              if (text.length > 3) onSearchTextChange(text);
              if (text.length == 0) this.props.clearSearchResult();
            }}
            style={{
              textAlign: isRTL ? "right" : "left",
              fontSize: 15,
              flex: 1,
              textAlign: "left",
              marginLeft: 35,
              fontFamily: Constants.Fonts.REGULAR,
              color: Constants.APP_GRAY_COLOR3,
              placeholderTextColor: Constants.APP_GRAY_COLOR3,
            }}
          />
          <TouchableOpacity style={styles.searchButton} onPress={() => {}}>
            <Image style={{ width: 18, height: 18 }} source={Images.search} />
          </TouchableOpacity>
        </View>
        <View style={styles.separatorView} />
        {isLoading && <ActivityIndicator style={{ marginTop: 10 }} />}

        {searchHistoryArray.length > 0 || searchResultArray.length > 0 ? (
          <ScrollView>
            <View>
              <FlatList
                contentContainerStyle={{ alignSelf: "flex-start" }}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                style={{ marginHorizontal: 20, flex: 1 }}
                data={searchResultArray}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={{
                      height: 40,
                      alignItems: "center",
                      flexDirection: "row",
                      borderBottomColor: Constants.APP_SEPARATOR_COLOR,
                      borderBottomWidth: 1,
                      width: screenWidth - 40,
                    }}
                    onPress={() => this._didSelectProduct(item, false)}
                  >
                    <Image
                      style={{
                        width: 11,
                        height: 11,
                        tintColor: Constants.APP_GRAY_COLOR3,
                      }}
                      source={Images.search}
                    />
                    <Text style={styles.searchHistoryText}>{item.name}</Text>
                  </TouchableOpacity>
                )}
                keyboardShouldPersistTaps={"handled"}
              />
              {searchHistoryArray.length > 0 && (
                <View style={styles.searchHistoryTitleContainer}>
                  <Text style={styles.recentSearchTitle}>
                    {translate("Recent Searches")}
                  </Text>
                  <TouchableOpacity
                    onPress={this._clearSearchHistory}
                    style={{}}
                  >
                    <Text style={styles.clearButonText}>
                      {translate("Clear")}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              <FlatList
                contentContainerStyle={{ alignSelf: "flex-start" }}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                style={{ marginHorizontal: 20, flex: 1 }}
                data={
                  searchHistoryArray.length === 1 &&
                  comp(query, searchHistoryArray[0])
                    ? []
                    : searchHistoryArray
                }
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={{
                      height: 40,
                      alignItems: "center",
                      flexDirection: "row",
                      borderBottomColor: Constants.APP_SEPARATOR_COLOR,
                      borderBottomWidth: 1,
                      width: screenWidth - 40,
                    }}
                    onPress={() => this._didSelectProduct(item, true)}
                  >
                    <Image
                      style={{
                        width: 11,
                        height: 11,
                        tintColor: Constants.APP_GRAY_COLOR3,
                      }}
                      source={Images.search}
                    />
                    <Text style={styles.searchHistoryText}>{item.name}</Text>
                  </TouchableOpacity>
                )}
                keyboardShouldPersistTaps={"handled"}
              />
              <View
                style={{
                  height: Constants.IS_ANDROID ? 0 : keyboardHeight - 50,
                }}
              />
            </View>
          </ScrollView>
        ) : (
          query.length > 0 &&
          !isLoading && (
            <EmptyDataPlaceholder
              titleText={translate("No matching search results")}
              descriptionText={translate("search_result_empty_placeholder")}
              placeHolderImage={Images.emptySearchResult}
            />
          )
        )}
      </SafeAreaView>
    );
  }
}

export default SearchView;
