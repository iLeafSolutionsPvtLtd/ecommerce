/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on February 19, 2020
 * WishListView - User selected items list out here
 */

import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import styles from "./styles";
import Login from "../LoginScreen";
import Modal from "react-native-modal";
import React, { Component } from "react";
import Images from "../../config/images";
import Constants from "../../config/constants";
import HudView from "../../components/hudView";
import ProductCell from "../../components/productCell";
import { translate } from "../../config/languageSwitching/index";
import EmptyDataPlaceholder from "../../components/emptyDataPlaceholder";
import {
  RecyclerListView,
  DataProvider,
  LayoutProvider,
} from "recyclerlistview";
import NavigationHeader2 from "../../components/NavigationHeaders/NavigationHeader2";
import {
  normalizedHeight,
  normalizedWidth,
  showSimpleSnackbar,
  showAlertWithCallback,
} from "../../config/common";
// import {FlatGrid} from 'react-native-super-grid';
import Orientation from "react-native-orientation";

const ViewTypes = {
  FULL: 0,
  HALF_LEFT: 1,
  HALF_RIGHT: 2,
};

let dataProvider = new DataProvider((r1, r2) => {
  return r1 !== r2;
});

class WishListView extends Component {
  constructor(props) {
    super(props);

    let dataProvider = new DataProvider((r1, r2) => {
      return r1 !== r2;
    });

    this._layoutProvider = new LayoutProvider(
      (index) => {
        return ViewTypes.FULL;
      },
      (type, dim) => {
        dim.width = (props.screenWidth - 40) / 3; //(Constants.SCREEN_WIDTH - 41) / 2; //width / 2.01;
        dim.height = 380; //normalizedHeight(420);
      }
    );

    // const {wishList} = this.props;
    // let list = dataProvider.cloneWithRows([]);
    // if (wishList && wishList.length > 0) {
    //   list = dataProvider.cloneWithRows(this.props.wishList);
    // }
    this.state = {
      //dataProvider: list,
      showLoader: false,
      pageIndex: 0,
      isAPILoading: false,
      isLoginViewShow: false,
    };
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps.productsList !== prevState.productsList) {
  //     return {dataProvider: dataProvider.cloneWithRows(nextProps.productsList)};
  //   } else return null;
  // }

  // componentWillReceiveProps(newProps) {
  //   const {productsList} = newProps;
  //   this.setState({
  //     dataProvider: this.state.dataProvider.cloneWithRows(productsList),
  //     isShowBottomLoader: false,
  //     pageIndex: 0,
  //   });
  // }

  componentDidMount() {
    // this._getProductList();
    // setTimeout(() => {
    //   fetch('https://staging-biotecnika.kinsta.cloud/app/webservice.php', {
    //     method: 'POST',
    //     body: JSON.stringify({
    //       authkey: 'df63h9ywem18tk2vs5oft',
    //       method: 'blogposts',
    //       countrycode: 'IN',
    //       categoryid: '',
    //       page: '1',
    //       per_page: '500',
    //       categorygroup: 'news',
    //       sortorder: '',
    //       userid: '7',
    //       searchkey: '',
    //     }),
    //   })
    //     .then(response => response.json())
    //     .then(responseJson => {
    //       console.log(responseJson);
    //       //console.log(responseJson.movies);
    //       this.setState(
    //         {
    //           dataProvider: this.state.dataProvider.cloneWithRows(
    //             responseJson.posts,
    //           ),
    //         },
    //         () => {
    //           // console.log('----------------', this.state.dataProvider);
    //         },
    //       );
    //     })
    //     .catch(error => {
    //       console.error(error);
    //     });
    // }, 2000);
  }

  componentWillUnmount() {}

  // _getProductList = () => {
  //   const {pageIndex, isAPILoading} = this.state;
  //   if (isAPILoading) return;
  //   this.setState({isShowBottomLoader: true, isAPILoading: true});
  //   this.props.getProductsList(
  //     pageIndex,
  //     Constants.PRODUCTS_PAGE_COUNT,
  //     this._getProductListCallback,
  //   );
  // };

  // _getProductListCallback = status => {
  //   this.setState({isShowBottomLoader: false, isAPILoading: false});

  //   const {pageIndex} = this.state;
  //   if (status) {
  //     this.setState({pageIndex: pageIndex + 1});
  //   }
  // };

  _didTapOnSearch = () => {
    this.props.navigation.navigate("Search");
  };

  _didTapOnCart = () => {
    this.props.navigation.navigate("Cart");
  };

  _removeCallback = (status) => {
    if (status) {
      showSimpleSnackbar(translate("Item removed from wishlist"));
    }
  };

  onRemoveCalled = (productId) => {
    showAlertWithCallback(
      translate("remove from wishlist?"),
      translate("Yes"),
      translate("No"),
      () => this.props.onRemoveTap(productId, this._removeCallback),
      null
    );
  };

  render() {
    const { isShowBottomLoader, isLoginViewShow } = this.state;
    const {
      selectedLanguage,
      screenWidth,
      screenHeight,
      orientation,
      currency,
      userToken,
      cartArray,
      wishList,
      isHandset,
    } = this.props;
    let numOfColums = isHandset ? 2 : 3; //screenWidth > 410 ? 3 : 2;
    let cellWidth = (this.props.screenWidth - 32) / numOfColums;

    //console.log('this.state.dataProvider', this.state.dataProvider);

    let subComponent = null;
    if (userToken && userToken.length > 0) {
      if (wishList && wishList.length > 0) {
        // show wishlist
        subComponent = (
          <View style={{ flex: 1 }}>
            <Text style={styles.titleStyle}>{translate("Wishlist")}</Text>
            <RecyclerListView
              style={{
                // paddingTop: 20,
                paddingHorizontal: 14,
                backgroundColor: Constants.APP_WHITE_COLOR,
                // height: normalizedHeight(1000),
              }}
              layoutProvider={
                new LayoutProvider(
                  (index) => {
                    return ViewTypes.FULL;
                  },
                  (type, dim) => {
                    dim.width = cellWidth; //(Constants.SCREEN_WIDTH - 41) / 2; //width / 2.01;
                    dim.height = normalizedHeight(400);
                  }
                )
              }
              //dataProvider={this.state.dataProvider}
              dataProvider={dataProvider.cloneWithRows(wishList)}
              canChangeSize={true}
              rowRenderer={(param1, data, index) => {
                data.name = data.productName;
                data.finalPrice = data.price;
                return (
                  <ProductCell
                    data={data}
                    index={index}
                    screenWidth={screenWidth}
                    numOfColumns={numOfColums}
                    currency={currency}
                    likeActive={true}
                    didTapOnLikeButton={() => {
                      this.onRemoveCalled(data.productId);
                    }}
                    didSelectAdd={(item) =>
                      this.props.navigation.navigate("ProductDetail", {
                        sku: item.sku,
                      })
                    }
                  />
                );
              }}
              renderAheadDistance={250}
            />
          </View>
        );
      } else {
        // no wishlist
        subComponent = (
          <EmptyDataPlaceholder
            titleText={translate("Your wishlist is empty")}
            descriptionText={translate("wish_list_empty_placeholder")}
            placeHolderImage={Images.noWishlist}
          />
        );
      }
    } else {
      // show login
      subComponent = (
        <View style={{ flex: 1 }}>
          <EmptyDataPlaceholder
            titleText={translate("wishlist not found")}
            descriptionText={""}
            placeHolderImage={Images.noWishlist}
          />
          <View style={styles.bottomContainer}>
            <Text style={styles.loginContentText}>
              {translate("Login below to see your wishlist")}
            </Text>
            <TouchableOpacity
              onPress={() => {
                this.setState({ isLoginViewShow: true });
              }}
              style={styles.buttonLogin}
            >
              <Text style={styles.socialName}>{translate("Login")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

    return (
      <SafeAreaView style={styles.safeContainer}>
        <StatusBar
          // barStyle="light-content"
          hidden={false}
          backgroundColor={Constants.APP_WHITE_COLOR}
          // translucent={true}
        />
        <View style={{ flex: 1, backgroundColor: Constants.APP_WHITE_COLOR }}>
          <NavigationHeader2
            hideSearch
            // title={translate("WishList")}
            didTapOnSearch={this._didTapOnSearch}
            didTapOnCart={this._didTapOnCart}
            isShowFlag={false}
            isDark={false}
            showCart={true}
            cartItemsCount={cartArray.length}
          />

          {subComponent}

          {/* <FlatGrid
            itemDimension={170}
            items={this.state.dataProvider._data}
            renderItem={({item, index}) => (
              <ProductCell
                data={item}
                index={index}
                screenWidth={screenWidth}
                numOfColumns={numOfColums + 0.1}
                didTapOnLikeButton={() => {
                  //TODO:
                }}
                didSelectAdd={item =>
                  this.props.navigation.navigate('ProductDetail')
                }
              />
            )}
          /> */}

          {/* {isShowBottomLoader && (
            <View
              style={{
                width: '100%',
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <ActivityIndicator />
            </View>
          )} */}
        </View>
        <Modal
          onBackButtonPress={() => this.setState({ isLoginViewShow: false })}
          isVisible={isLoginViewShow}
        >
          <View style={{ flex: 1 }}>
            <Login
              didTapOnclose={() => this.setState({ isLoginViewShow: false })}
            />
          </View>
        </Modal>
        {this.state.showLoader && <HudView />}
      </SafeAreaView>
    );
  }
}

export default WishListView;
