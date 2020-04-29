import React, { Component, useState, useEffect, memo } from "react";
import {
  SafeAreaView,
  TextInput,
  StatusBar,
  Text,
  View,
  FlatList,
  Dimensions,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import Constants from "../../config/constants";
import Images from "../../config/images";
import HudView from "../../components/hudView";
import Icon from "react-native-vector-icons/MaterialIcons";
import Styles from "./style";
import NavigationHeader2 from "../../components/NavigationHeaders/NavigationHeader2";
import { translate } from "../../config/languageSwitching/index";
import { showSingleAlert } from "../../config/common";
const { width } = Dimensions.get("window");

/** Accordion Component */
let finalObj = {};
let sortValue = "";
let accordionRef = React.createRef();
const AccordionComponent = memo(
  ({
    item,
    index,
    collectSelectedData,
    selectSortData,
    setPriceRange,
    didSelectDiscount,
    props,
    reset,
    isDiscountSelected,
  }) => {
    console.log("isDiscountSelected!!!!!!", isDiscountSelected);

    const [expanded, setexpanded] = useState(false);
    const [discount, setDiscount] = useState(isDiscountSelected);
    const [dummy, setDummy] = useState(false);
    const [resetData, setResetData] = useState(reset);
    const [minimumAmt, setminimumAmt] = useState(
      props.selectedFilters.filter_attributes
        ? props.selectedFilters.filter_attributes.price_from
        : ""
    );
    const [maximumAmt, setmaximumAmt] = useState(
      props.selectedFilters.filter_attributes
        ? props.selectedFilters.filter_attributes.price_to
        : ""
    );
    const { title } = item;
    const numCol = title === "Grade" || item.title === "Size" ? 4 : 1;

    function toggleExpand() {
      setexpanded(!expanded);
    }

    useEffect(() => {
      setResetData(reset);
      emptyArray();
      if (reset) {
        setDiscount(false);
        setminimumAmt("");
        setmaximumAmt("");
      }
    }, [reset]);

    function emptyArray() {
      console.log("12344");
    }

    const { currency } = props;

    const multiSort = (childindex) => {
      setDummy(!dummy);
      const tempArray = item.keys;
      const newArray = tempArray.map((key, keyIndex) => {
        if (keyIndex === childindex) {
          key.togglevalue = !key.togglevalue;
        }
        return key;
      });
      item.keys = newArray;
      collectSelectedData(item);
    };

    function getPrice(key, value) {
      setPriceRange(key, value);
    }

    const sortedIndex = (childindex) => {
      setDummy(!dummy);
      const tempArray = item.keys;
      const newArray = tempArray.map((key, keyIndex) => {
        if (keyIndex === childindex) {
          key.togglevalue = !key.togglevalue;
        } else {
          key.togglevalue = false;
        }
        return key;
      });
      item.keys = newArray;
      selectSortData(item);
    };

    function setDiscountBool() {
      setDiscount(!discount);
      didSelectDiscount(!discount);
    }

    let screenWidth = Constants.SCREEN_WIDTH - 40;
    let numberOfColumns = screenWidth / 65;
    numberOfColumns = Math.round(numberOfColumns);

    return (
      <View
        style={{ paddingBottom: 0, backgroundColor: Constants.APP_GRAY_COLOR2 }}
      >
        {title !== "Discount" && title !== "Price" && title !== "Choose Color" && (
          <View style={{ backgroundColor: "white", paddingHorizontal: 20 }}>
            <TouchableOpacity
              style={Styles.sub_container_view}
              onPress={toggleExpand}
            >
              <Text style={{ fontFamily: Constants.Fonts.MEDIUM }}>
                {item.title}
              </Text>
              <Icon
                name={expanded ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                size={20}
                color={"black"}
              />
            </TouchableOpacity>
            {expanded && (
              <View style={{ marginBottom: 10 }}>
                <FlatList
                  data={item.keys}
                  numColumns={numCol}
                  scrollEnabled={false}
                  extraData={item}
                  renderItem={({ item, index }) => (
                    <ChildComponent
                      title={title}
                      childItem={item}
                      childIndex={index}
                      sortedIndex={sortedIndex}
                      multiSort={multiSort}
                      props={props}
                    />
                  )}
                />
              </View>
            )}
          </View>
        )}

        {title === "Choose Color" && (
          <View style={{ backgroundColor: "white", paddingHorizontal: 20 }}>
            <TouchableOpacity
              style={Styles.sub_container_view}
              onPress={toggleExpand}
            >
              <Text style={{ fontFamily: Constants.Fonts.MEDIUM }}>
                {item.title}
              </Text>
              <Icon
                name={expanded ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                size={20}
                color={"black"}
              />
            </TouchableOpacity>
            {expanded && (
              <View style={{ marginBottom: 10 }}>
                <FlatList
                  style={{ flex: 1 }}
                  data={item.keys}
                  numColumns={numberOfColumns}
                  scrollEnabled={false}
                  extraData={item}
                  // horizontal
                  renderItem={({ item, index }) => (
                    <ChildComponent2
                      title={title}
                      childItem={item}
                      childIndex={index}
                      sortedIndex={sortedIndex}
                      multiSort={multiSort}
                      props={props}
                    />
                  )}
                />
              </View>
            )}
          </View>
        )}

        {title === "Discount" && (
          <TouchableOpacity
            style={{ backgroundColor: "white", paddingHorizontal: 20 }}
            onPress={setDiscountBool}
          >
            <View style={Styles.discount_conatiner_view}>
              <Text style={{ fontFamily: Constants.Fonts.MEDIUM }}>
                {item.title}
              </Text>

              <Image
                source={
                  !discount
                    ? Images.filterIcons.check_outline
                    : Images.filterIcons.check_tick
                }
                style={{
                  width: 20,
                  height: 20,
                  tintColor: Constants.APP_BLACK_COLOR,
                  paddingRight: 5,
                }}
              />
            </View>
          </TouchableOpacity>
        )}
        {title === "Price" && (
          <View style={{ backgroundColor: "white", paddingHorizontal: 20 }}>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                height: 56,
                alignItems: "center",
                // margin: 3,

                backgroundColor: "white",
              }}
              onPress={toggleExpand}
            >
              <Text style={{ fontFamily: Constants.Fonts.MEDIUM }}>
                {item.title}
              </Text>
              <Icon
                name={expanded ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                size={20}
                color={"black"}
              />
            </TouchableOpacity>
            {expanded && (
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "center",
                  marginBottom: 20,
                }}
              >
                <View style={Styles.view_textinputs}>
                  <TextInput
                    placeholder={"Minimum"}
                    keyboardType={"decimal-pad"}
                    style={{ width: 80 }}
                    onChangeText={(minimumAmt) => {
                      setminimumAmt(minimumAmt);
                    }}
                    value={minimumAmt}
                    onBlur={getPrice("price_from", minimumAmt)}
                  />
                  <Text
                    style={{
                      marginLeft: 8,
                      color: Constants.APP_GREY_TEXT_COLOR,
                    }}
                  >
                    {currency}
                  </Text>
                </View>
                <View style={Styles.view_textinputs}>
                  <TextInput
                    placeholder={"Maximum"}
                    style={{ width: 80 }}
                    keyboardType={"decimal-pad"}
                    onChangeText={(maximumAmt) => {
                      setmaximumAmt(maximumAmt);
                    }}
                    value={maximumAmt}
                    onBlur={getPrice("price_to", maximumAmt)}
                  />
                  <Text
                    style={{
                      marginLeft: 8,
                      color: Constants.APP_GREY_TEXT_COLOR,
                    }}
                  >
                    {currency}
                  </Text>
                </View>
              </View>
            )}
          </View>
        )}
      </View>
    );
  }
);

const ChildComponent = memo(
  ({ childItem, childIndex, title, sortedIndex, multiSort, props }) => {
    let imgSrc = "";
    console.log("childItem");
    if (title === "Choose Color") {
      imgSrc =
        "https://staging.saloonaat.com/pub/media/" + childItem.image_code;
    }
    const [sortItem, setsortItem] = useState(false);

    function selectSort(key, value) {
      sortedIndex(childIndex);
    }

    function multiSelect() {
      multiSort(childIndex);
    }

    const { selectedFilters } = props;

    return (
      <View>
        {title === "Sort By" && (
          <TouchableOpacity onPress={selectSort} activeOpacity={0.7}>
            <View style={Styles.child_view}>
              <Text
                style={{
                  flex: 1,
                  fontSize: 15,
                  fontFamily: Constants.Fonts.REGULAR,
                  color: Constants.APP_GREY_TEXT_COLOR,
                }}
              >
                {childItem.title}
              </Text>
              {childItem.togglevalue && (
                <Image source={Images.tick} style={Styles.checkbox_icon} />
              )}
            </View>
          </TouchableOpacity>
        )}
        {title === "Style" && (
          <TouchableOpacity onPress={multiSelect} activeOpacity={0.7}>
            <View style={Styles.child_view}>
              <Text
                style={{
                  flex: 1,
                  fontSize: 15,
                  fontFamily: Constants.Fonts.REGULAR,
                  color: Constants.APP_GREY_TEXT_COLOR,
                }}
              >
                {childItem.label}
              </Text>
              {childItem.togglevalue && (
                <Image source={Images.tick} style={Styles.checkbox_icon} />
              )}
            </View>
          </TouchableOpacity>
        )}
        {title === "Choose Color" && (
          <TouchableOpacity onPress={multiSelect} activeOpacity={0.7}>
            <View style={Styles.child_color_view}>
              <Image
                source={{ uri: imgSrc }}
                style={
                  childItem.togglevalue
                    ? {
                        width: 44,
                        height: 44,
                        borderRadius: 22,
                        borderWidth: 4,
                        borderColor: Constants.APP_THEME_COLOR,
                      }
                    : {
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        borderWidth: 1,
                        borderColor: Constants.APP_GRAY_COLOR2,
                      }
                }
              />
              {/* <Text
                style={{
                  marginLeft: 30,
                  fontSize: 16,
                  marginVertical: 10,
                  fontFamily: Constants.Fonts.REGULAR,
                  color: Constants.APP_GREY_TEXT_COLOR,
                }}
              >
                {childItem.label}
              </Text> */}
            </View>
          </TouchableOpacity>
        )}
        {title === "Attachment Type" && (
          <TouchableOpacity onPress={multiSelect} activeOpacity={0.7}>
            <View style={Styles.child_view}>
              <Image
                source={
                  !childItem.togglevalue
                    ? Images.filterIcons.check_outline
                    : Images.filterIcons.check_tick
                }
                style={Styles.checkbox_icon}
              />

              <Text
                style={{
                  marginLeft: 30,
                  fontSize: 16,
                  fontFamily: Constants.Fonts.REGULAR,
                  color: Constants.APP_GREY_TEXT_COLOR,
                }}
              >
                {childItem.label}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        {title === "Size" && (
          <View style={{ flex: 1, justifyContent: "center" }}>
            <TouchableOpacity
              onPress={multiSelect}
              style={{
                height: 40,
                width: width / 4 - 15,
                borderWidth: 1,
                borderRadius: 5,
                borderColor: childItem.togglevalue
                  ? Constants.APP_THEME_COLOR
                  : Constants.APP_BOX_BACKGROUND_GREY,
                margin: 5,
              }}
            >
              <Text
                style={{
                  flex: 1,
                  fontSize: 16,
                  textAlign: "center",
                  paddingVertical: 10,
                  color: Constants.APP_GREY_TEXT_COLOR,
                }}
              >
                {childItem.label}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {title === "Grade" && (
          <View style={{ flex: 1 }}>
            <TouchableOpacity
              onPress={multiSelect}
              style={{
                height: 40,
                width: width / 4 - 15,
                borderWidth: 1,
                borderRadius: 5,
                borderColor: childItem.togglevalue
                  ? Constants.APP_THEME_COLOR
                  : Constants.APP_BOX_BACKGROUND_GREY,
                margin: 5,
              }}
            >
              <Text
                style={{
                  flex: 1,
                  fontSize: 16,
                  textAlign: "center",
                  paddingVertical: 10,
                  color: Constants.APP_GREY_TEXT_COLOR,
                }}
              >
                {childItem.label}
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {title === "Brand" && (
          <TouchableOpacity onPress={multiSelect} activeOpacity={0.7}>
            <View style={Styles.child_view}>
              <Text
                style={{
                  flex: 1,
                  fontSize: 15,
                  fontFamily: Constants.Fonts.REGULAR,
                  color: Constants.APP_GREY_TEXT_COLOR,
                }}
              >
                {childItem.label}
              </Text>
              {childItem.togglevalue && (
                <Image source={Images.tick} style={Styles.checkbox_icon} />
              )}
            </View>
          </TouchableOpacity>
        )}
        {title === "Size (Inch)" && (
          <TouchableOpacity onPress={multiSelect} activeOpacity={0.7}>
            <View style={Styles.child_view}>
              <Text
                style={{
                  flex: 1,
                  fontSize: 15,
                  fontFamily: Constants.Fonts.REGULAR,
                  color: Constants.APP_GREY_TEXT_COLOR,
                }}
              >
                {childItem.label}
              </Text>
              {childItem.togglevalue && (
                <Image source={Images.tick} style={Styles.checkbox_icon} />
              )}
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  }
);

const ChildComponent2 = memo(
  ({ childItem, childIndex, title, sortedIndex, multiSort, props }) => {
    let imgSrc = "";
    console.log("childItem");
    if (title === "Choose Color") {
      imgSrc =
        "https://staging.saloonaat.com/pub/media/" + childItem.image_code;
    }
    const [sortItem, setsortItem] = useState(false);

    function selectSort(key, value) {
      sortedIndex(childIndex);
    }

    function multiSelect() {
      multiSort(childIndex);
    }

    const { selectedFilters } = props;

    return (
      <View style={{}}>
        {title === "Choose Color" && (
          <TouchableOpacity onPress={multiSelect} activeOpacity={0.7}>
            <View style={Styles.child_color_view}>
              <ImageBackground
                source={{ uri: imgSrc }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: Constants.APP_GRAY_COLOR2,
                  overflow: "hidden",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {childItem.togglevalue && (
                  <Image
                    source={Images.whiteTick}
                    style={[
                      Styles.checkbox_icon,
                      // { tintColor: Constants.APP_WHITE_COLOR },
                    ]}
                  />
                )}
              </ImageBackground>
              {/* <Text
                style={{
                  marginLeft: 30,
                  fontSize: 16,
                  marginVertical: 10,
                  fontFamily: Constants.Fonts.REGULAR,
                  color: Constants.APP_GREY_TEXT_COLOR,
                }}
              >
                {childItem.label}
              </Text> */}
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  }
);

class FilterScreen extends Component {
  constructor(props) {
    super(props);

    console.log("selectedFilters====:::>>>", props.selectedFilters);

    let filter_attributes = props.selectedFilters.filter_attributes
      ? props.selectedFilters.filter_attributes
      : null;

    this.state = {
      reset: "",
      isDiscountSelected:
        filter_attributes && filter_attributes.sale ? true : false,
    };
  }

  _didTapOnBackButton = () => {
    this.props.navigation.goBack();
  };

  componentDidMount() {
    const { selectedFilters } = this.props;
    let sortOrder = selectedFilters.sort_orer ? selectedFilters.sort_orer : "";

    console.log("=====isDiscountSelected====", this.state.isDiscountSelected);
    this.props.filterArray.map((datas) => {
      if (!!datas.keys) {
        datas.keys.map((val) => {
          switch (datas.title) {
            case "Sort By":
              console.log("=====>>", val);
              console.log("==++++===>>", sortOrder);

              val.togglevalue = val.value === sortOrder ? true : false;
              break;
            // case
          }

          return val;
        });
      }
      return datas;
    });

    sortValue = selectedFilters.sort_orer ? selectedFilters.sort_orer : "";
  }

  componentWillUnmount() {
    finalObj = {};
    sortValue = "";
  }
  resetData = () => {
    this.props.clearSelectedFilters();
    this.props.filterArray.map((datas) => {
      if (!!datas.keys) {
        datas.keys.map((val) => {
          return (val.togglevalue = false);
        });
      }
      return datas;
    });
    this.setState({ isDiscountSelected: false }, () => {
      this.setState({ reset: !this.state.reset });
    });
    sortValue = "";
  };
  render() {
    const { isDiscountSelected } = this.state;

    const { loader, currency, isRTL } = this.props;
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: Constants.APP_WHITE_COLOR }}
      >
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor={Constants.APP_BLACK_COLOR}
          translucent={false}
        />
        <NavigationHeader2
          hideBottomLine
          showBackButton={true}
          didTapOnBackButton={this._didTapOnBackButton}
          resetButton={true}
          didTapOnReset={this.resetData}
          title={""}
          hideSearch={true}
          isShowFlag={false}
          showCart={false}
          isDark={false}
          isRTL={isRTL}
        />
        {loader ? (
          <HudView />
        ) : (
          <View style={{ flex: 1 }}>
            <Text style={Styles.titleStyle}>{translate("Filter")}</Text>

            <FlatList
              style={{ flex: 1 }}
              data={this.props.filterArray}
              renderItem={({ item, index }) => (
                <AccordionComponent
                  ref={accordionRef}
                  item={item}
                  index={index}
                  collectSelectedData={this.collectSelectedData}
                  selectSortData={this.selectSortData}
                  setPriceRange={this.setPriceRange}
                  isDiscountSelected={isDiscountSelected}
                  didSelectDiscount={this.didSelectDiscount}
                  props={this.props}
                  reset={this.state.reset}
                />
              )}
              extraData={this.props.filterArray || this.state}
            />
            <TouchableOpacity
              onPress={this.applyFilters}
              style={Styles.btn_touchable_style}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontFamily: Constants.Fonts.MEDIUM,
                  color: Constants.APP_WHITE_COLOR,
                }}
              >
                {translate("APPLY")}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    );
  }

  collectSelectedData = (items) => {
    let obj = {};
    let sizeKey = items.key;
    const a = items.keys.filter((q) => {
      return q.togglevalue;
    });
    const result = a.map((i) => {
      return parseInt(i.value);
    });
    obj[sizeKey] = result;
    finalObj = { ...finalObj, ...obj };
  };

  selectSortData = (keyarray) => {
    console.log("=====####", keyarray);

    const a = keyarray.keys.filter((q) => {
      return q.togglevalue;
    });
    const result = a.map((i) => {
      return i.value;
    });
    sortValue = result.length > 0 ? result[0] : "";
  };

  setPriceRange = (key, value) => {
    let obj = {};
    if (value) obj[key] = value;
    finalObj = { ...finalObj, ...obj };
  };

  didSelectDiscount = (value) => {
    console.log("DISCOUNT VAL", value);
    this.setState({ isDiscountSelected: value });
  };

  applyFilters = () => {
    const { isDiscountSelected } = this.state;
    if (isDiscountSelected) {
      finalObj["sale"] = [1];
    }
    let filters = {
      // category_id: 38,
      sort_field: "name",
      sort_orer: sortValue.toString(),
      page: 1,
      page_size: 50,
      filter_attributes: finalObj,
    };

    console.log("--------filters-------", filters);

    // if (
    //   Object.keys(filters.filter_attributes) == 0 &&
    //   filters.sort_orer === ''
    // ) {
    //   showSingleAlert(translate('Please select any filter option'));
    //   this.props.clearSelectedFilters();
    //   return;
    // }
    this.props.updateFilters(filters);
    this.props.navigation.state.params.didTapOnApplyFilter(filters);
    this.props.navigation.goBack();
  };
}

export default FilterScreen;
