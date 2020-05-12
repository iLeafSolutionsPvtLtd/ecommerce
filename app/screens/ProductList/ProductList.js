/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on February 25, 2020
 * ProductList - Products list based on the category
 */

import {
  Text,
  View,
  StatusBar,
  Dimensions,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import {
  normalizedWidth,
  normalizedHeight,
  showSimpleSnackbar,
  showAlertWithCallback,
} from "../../config/common";
import {
  DataProvider,
  LayoutProvider,
  RecyclerListView,
} from "recyclerlistview";
import React from "react";
import styles from "./styles";
import Login from "../LoginScreen";
import Modal from "react-native-modal";
import Images from "../../config/images";
import Constants from "../../config/constants";
import HudView from "../../components/hudView";
import commonStyles from "../../config/commonStyles";
import NetInfo from "@react-native-community/netinfo";
import { translate } from "../../config/languageSwitching";
import ProductCell from "../../components/productCell";
import { TabBar, TabView, SceneMap } from "react-native-tab-view";
import EmptyDataPlaceholder from "../../components/emptyDataPlaceholder";
import NavigationHeader2 from "../../components/NavigationHeaders/NavigationHeader2";

const renderTabBar = (props) => (
  <TabBar
    {...props}
    scrollEnabled
    indicatorStyle={{ backgroundColor: Constants.APP_THEME_COLOR }}
    style={{ backgroundColor: Constants.APP_WHITE_COLOR, height: 42 }}
    renderLabel={({ route, focused, color }) => (
      <Text
        style={{
          color: Constants.APP_BLACK_COLOR,
          fontSize: Constants.Fonts.REGULAR,
          fontSize: 13,
        }}
      >
        {route.title}
      </Text>
    )}
  />
);

const initialLayout = { width: Constants.SCREEN_WIDTH };

const ViewTypes = {
  FULL: 0,
  HALF_LEFT: 1,
  HALF_RIGHT: 2,
};

let dataProvider = new DataProvider((r1, r2) => {
  return r1 !== r2;
});

class ProductList extends React.Component {
  constructor(args) {
    super(args);
    this._layoutProvider = new LayoutProvider(
      (index) => {
        return ViewTypes.FULL;
      },
      (type, dim) => {
        dim.width = (Constants.SCREEN_WIDTH - 41) / 2; //width / 2.01;
        dim.height = normalizedHeight(420);
      }
    );

    const { subCategories } = this.props.navigation.state.params;
    let routsArray = [];
    subCategories.map((item) => {
      let dict = { key: item.id, title: item.name };
      routsArray.push(dict);
    });

    this.state = {
      dataProvider: dataProvider.cloneWithRows(this._generateArray(0)),
      index: 0,
      setIndex: 0,
      isLoginViewShow: false,
      routes: routsArray,
      filterParams: {},
      wishlistItems: [],
      parent_id: subCategories.length > 0 ? subCategories[0].id : "",
      pageIndexCategory1: 0,
      pageIndexCategory2: 0,
      pageIndexCategory3: 0,
      pageIndexCategory4: 0,
      pageIndexCategory5: 0,
      pageIndexCategory6: 0,
      pageIndexCategory7: 0,
      pageIndexCategory8: 0,
      pageIndexCategory9: 0,
      pageIndexCategory10: 0,

      isAPILoadingCategory1: false,
      isAPILoadingCategory2: false,
      isAPILoadingCategory3: false,
      isAPILoadingCategory4: false,
      isAPILoadingCategory5: false,
      isAPILoadingCategory6: false,
      isAPILoadingCategory7: false,
      isAPILoadingCategory8: false,
      isAPILoadingCategory9: false,
      isAPILoadingCategory10: false,

      isLoadMoreCategory1: true,
      isLoadMoreCategory2: true,
      isLoadMoreCategory3: true,
      isLoadMoreCategory4: true,
      isLoadMoreCategory5: true,
      isLoadMoreCategory6: true,
      isLoadMoreCategory7: true,
      isLoadMoreCategory8: true,
      isLoadMoreCategory9: true,
      isLoadMoreCategory10: true,

      isAPICalledCategory1: false,
      isAPICalledCategory2: false,
      isAPICalledCategory3: false,
      isAPICalledCategory4: false,
      isAPICalledCategory5: false,
      isAPICalledCategory6: false,
      isAPICalledCategory7: false,
      isAPICalledCategory8: false,
      isAPICalledCategory9: false,
      isAPICalledCategory10: false,
    };
  }

  _generateArray(n) {
    let arr = [];
    for (let i = 0; i < 10; i++) {
      arr.push({ id: i, releaseYear: "1977", title: "Star Wars" });
    }

    return arr;
  }

  componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener((state) => {
      let networkStatus = state.isConnected;
      if (networkStatus) {
        this._onIndexChange(this.state.index, true);
      }
    });

    const { wishList } = this.props;
    let mArray = [];
    wishList.map((item) => {
      mArray.push(item.productId);
    });
    this.setState({ wishlistItems: mArray });
  }

  _didTapOnBackButton = () => {
    this.props.clearFilters();
    this.props.clearCategoryProducts();
    this.props.navigation.goBack();
  };

  _didTapOnSearch = () => {
    this.props.navigation.navigate("Search");
  };

  _didTapOnCart = () => {
    this.props.navigation.navigate("Cart");
  };

  _didTapOnFilter = () => {
    const { routes, index } = this.state;
    let categoryId = routes[index].key;

    console.log("FILTER DAT ===", categoryId);

    this.props.navigation.navigate("FilterScreen", {
      didTapOnApplyFilter: this.didTapOnApplyFilter,
      category_id: categoryId, //this.state.parent_id,
    });
  };

  didTapOnApplyFilter = (params) => {
    console.log("FILTER PARAMS=>>>>>", params);

    this.props.clearCategoryProducts();
    this.setState(
      {
        filterParams: params,
        pageIndexCategory1: 0,
        pageIndexCategory2: 0,
        pageIndexCategory3: 0,
        pageIndexCategory4: 0,
        pageIndexCategory5: 0,
        pageIndexCategory6: 0,
        pageIndexCategory7: 0,
        pageIndexCategory8: 0,
        pageIndexCategory9: 0,
        pageIndexCategory10: 0,

        isAPILoadingCategory1: false,
        isAPILoadingCategory2: false,
        isAPILoadingCategory3: false,
        isAPILoadingCategory4: false,
        isAPILoadingCategory5: false,
        isAPILoadingCategory6: false,
        isAPILoadingCategory7: false,
        isAPILoadingCategory8: false,
        isAPILoadingCategory9: false,
        isAPILoadingCategory10: false,

        isLoadMoreCategory1: true,
        isLoadMoreCategory2: true,
        isLoadMoreCategory3: true,
        isLoadMoreCategory4: true,
        isLoadMoreCategory5: true,
        isLoadMoreCategory6: true,
        isLoadMoreCategory7: true,
        isLoadMoreCategory8: true,
        isLoadMoreCategory9: true,
        isLoadMoreCategory10: true,

        isAPICalledCategory1: false,
        isAPICalledCategory2: false,
        isAPICalledCategory3: false,
        isAPICalledCategory4: false,
        isAPICalledCategory5: false,
        isAPICalledCategory6: false,
        isAPICalledCategory7: false,
        isAPICalledCategory8: false,
        isAPICalledCategory9: false,
        isAPICalledCategory10: false,
      },
      () => this._onIndexChange(this.state.index, true)
    );
  };

  _loadMoreProductsInCategory = (indexVal) => {
    const { routes, filterParams } = this.state;
    let categoryId = routes[indexVal].key;
    let index = indexVal + 1;
    let pageIndex = this.state["pageIndexCategory" + index];
    let isAPILoading = this.state["isAPILoadingCategory" + index];
    let isLoadMore = this.state["isLoadMoreCategory" + index];

    if (isAPILoading) return;

    if (!isLoadMore) return;

    this.props.getCategoryProductsList(
      pageIndex + 1,
      Constants.PRODUCTS_PAGE_COUNT,
      "categoryType" + index,
      categoryId,
      filterParams,
      (status, isLoadMore) => {
        this._getCategoryProductsListCallback(status, index, isLoadMore);
      }
    );

    let dict = {};
    dict["isAPILoadingCategory" + index] = true;
    this.setState(dict);
  };

  _getCategoryProductsListCallback = (status, index, isLoadMore) => {
    let dict = {};
    let pageIndex = this.state["pageIndexCategory" + index];
    let newIndex = pageIndex + 1;
    dict["pageIndexCategory" + index] = newIndex;
    dict["isAPILoadingCategory" + index] = false;
    dict["isLoadMoreCategory" + index] = isLoadMore;
    dict["isAPICalledCategory" + index] = true;
    this.setState(dict);
  };

  addToWishlistState = (productId) => {
    this.setState((prevState) => ({
      wishlistItems: [...prevState.wishlistItems, productId],
    }));
  };

  removeFromWishlistState = (productId) => {
    this.setState((prevState) => ({
      wishlistItems: prevState.wishlistItems.filter(
        (item) => item !== productId
      ),
    }));
  };

  _didTapOnLikeButton = (isLiked, data) => {
    const { onDislikeTap, onLikeTap, userToken } = this.props;
    if (userToken.length > 0) {
      if (isLiked) {
        this.removeFromWishlistState(data.entity_id);
        onDislikeTap(data.entity_id, (status) => {
          if (status) {
            showSimpleSnackbar(translate("Item removed from wishlist"));
          } else {
            this.addToWishlistState(data.entity_id);
          }
        });
      } else {
        this.addToWishlistState(data.entity_id);
        onLikeTap(data.entity_id, (status) => {
          if (status) {
            showSimpleSnackbar(translate("Item added to wishlist"));
          } else {
            this.removeFromWishlistState(data.entity_id);
          }
        });
      }
    } else {
      showAlertWithCallback(
        translate("user_not_login"),
        translate("Login"),
        translate("Cancel"),
        () => {
          this.setState({ isLoginViewShow: true });
        },
        null
      );
    }
  };

  _renderScene = ({ route }) => {
    const { routes, wishlistItems } = this.state;
    const {
      // screenWidth,
      currency,
      isLoadingProductList,
      selectedFilters,
    } = this.props;

    let screenWidth = Dimensions.get("window").width;
    // let isLoadingProductList = false;

    const index = routes.findIndex((obj) => obj.key === route.key);
    let indexVal = index + 1;
    let isShowBottomLoader = this.state["isAPILoadingCategory" + indexVal];

    const {
      productsListOnCategory1,
      productsListOnCategory2,
      productsListOnCategory3,
      productsListOnCategory4,
      productsListOnCategory5,
      productsListOnCategory6,
      productsListOnCategory7,
      productsListOnCategory8,
      productsListOnCategory9,
      productsListOnCategory10,
      isHandset,
    } = this.props;

    let dataListArray = [];
    let isDataEmpty = true;

    switch (index) {
      case 0:
        dataListArray = dataProvider.cloneWithRows(productsListOnCategory1);
        isDataEmpty = productsListOnCategory1.length == 0;
        break;
      case 1:
        dataListArray = dataProvider.cloneWithRows(productsListOnCategory2);
        isDataEmpty = productsListOnCategory2.length == 0;
        break;
      case 2:
        dataListArray = dataProvider.cloneWithRows(productsListOnCategory3);
        isDataEmpty = productsListOnCategory3.length == 0;
        break;
      case 3:
        dataListArray = dataProvider.cloneWithRows(productsListOnCategory4);
        isDataEmpty = productsListOnCategory4.length == 0;
        break;
      case 4:
        dataListArray = dataProvider.cloneWithRows(productsListOnCategory5);
        isDataEmpty = productsListOnCategory5.length == 0;
        break;
      case 5:
        dataListArray = dataProvider.cloneWithRows(productsListOnCategory6);
        isDataEmpty = productsListOnCategory6.length == 0;
        break;
      case 6:
        dataListArray = dataProvider.cloneWithRows(productsListOnCategory7);
        isDataEmpty = productsListOnCategory7.length == 0;
        break;
      case 7:
        dataListArray = dataProvider.cloneWithRows(productsListOnCategory8);
        isDataEmpty = productsListOnCategory8.length == 0;
        break;
      case 8:
        dataListArray = dataProvider.cloneWithRows(productsListOnCategory9);
        isDataEmpty = productsListOnCategory9.length == 0;
        break;
      case 9:
        dataListArray = dataProvider.cloneWithRows(productsListOnCategory10);
        isDataEmpty = productsListOnCategory10.length == 0;
        break;
    }

    let numOfColums = isHandset ? 2 : 3;
    let cellWidth = (screenWidth - 32) / numOfColums;
    if (
      isDataEmpty &&
      !isLoadingProductList &&
      Object.keys(selectedFilters).length > 0
    ) {
      return (
        <EmptyDataPlaceholder
          titleText={translate("No matching product found")}
          descriptionText={translate("Check your filter options and try again")}
          placeHolderImage={Images.emptyFilterResult}
        />
      );
    }
    if (isDataEmpty && !isLoadingProductList) {
      return (
        <EmptyDataPlaceholder
          titleText={translate("No product found")}
          descriptionText={translate("No products found in this category")}
          placeHolderImage={Images.noProductFoundPlaceholder}
        />
      );
    }

    if (isLoadingProductList && !isShowBottomLoader) {
      return <View />;
    }

    return (
      <View style={{ flex: 1 }}>
        <RecyclerListView
          style={{
            // paddingTop: 20,
            paddingHorizontal: 14,
            backgroundColor: Constants.APP_GRAY_COLOR2,
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
          dataProvider={dataListArray}
          canChangeSize={true}
          extendedState={wishlistItems}
          rowRenderer={(param1, data, index) => {
            let likeValue = false;
            if (wishlistItems.includes(data.entity_id)) {
              likeValue = true;
            }
            return (
              <ProductCell
                data={data}
                index={index}
                screenWidth={screenWidth}
                numOfColumns={numOfColums}
                currency={currency}
                likeActive={likeValue}
                didTapOnLikeButton={(value) => {
                  this._didTapOnLikeButton(value, data);
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
          onEndReached={() => {
            this._loadMoreProductsInCategory(index);
          }}
          onEndReachedThreshold={0.5}
          // disableRecycling={true}
          // itemAnimator={'shift'}
        />

        {isShowBottomLoader && (
          <View
            style={{
              width: "100%",
              height: 50,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ActivityIndicator />
          </View>
        )}
      </View>
    );
  };

  _onIndexChange = (index, isFromFilterApply) => {
    const { routes } = this.state;

    let filterParams = this.state.filterParams;
    if (!isFromFilterApply) {
      this.props.clearFilters();
      this.setState({ filterParams: {} });
      filterParams = {};
    }
    this.setState({ setIndex: index, index: index });

    let categoryId = routes[index].key;

    switch (index) {
      case 0:
        if (!this.state.isAPICalledCategory1)
          this.props.getCategoryProductsList(
            0,
            Constants.PRODUCTS_PAGE_COUNT,
            "categoryType1",
            categoryId,
            filterParams,
            (status, isLoadMore) => {
              this._getCategoryProductsListCallback(
                status,
                index + 1,
                isLoadMore
              );
            }
          );
        break;
      case 1:
        if (!this.state.isAPICalledCategory2)
          this.props.getCategoryProductsList(
            0,
            Constants.PRODUCTS_PAGE_COUNT,
            "categoryType2",
            categoryId,
            filterParams,
            (status, isLoadMore) => {
              this._getCategoryProductsListCallback(
                status,
                index + 1,
                isLoadMore
              );
            }
          );
        break;
      case 2:
        if (!this.state.isAPICalledCategory3)
          this.props.getCategoryProductsList(
            0,
            Constants.PRODUCTS_PAGE_COUNT,
            "categoryType3",
            categoryId,
            filterParams,
            (status, isLoadMore) => {
              this._getCategoryProductsListCallback(
                status,
                index + 1,
                isLoadMore
              );
            }
          );
        break;
      case 3:
        if (!this.state.isAPICalledCategory4)
          this.props.getCategoryProductsList(
            0,
            Constants.PRODUCTS_PAGE_COUNT,
            "categoryType4",
            categoryId,
            filterParams,
            (status, isLoadMore) => {
              this._getCategoryProductsListCallback(
                status,
                index + 1,
                isLoadMore
              );
            }
          );
        break;
      case 4:
        if (!this.state.isAPICalledCategory5)
          this.props.getCategoryProductsList(
            0,
            Constants.PRODUCTS_PAGE_COUNT,
            "categoryType5",
            categoryId,
            filterParams,
            (status, isLoadMore) => {
              this._getCategoryProductsListCallback(
                status,
                index + 1,
                isLoadMore
              );
            }
          );
        break;
      case 5:
        if (!this.state.isAPICalledCategory6)
          this.props.getCategoryProductsList(
            0,
            Constants.PRODUCTS_PAGE_COUNT,
            "categoryType6",
            categoryId,
            filterParams,
            (status, isLoadMore) => {
              this._getCategoryProductsListCallback(
                status,
                index + 1,
                isLoadMore
              );
            }
          );
        break;
      case 6:
        if (!this.state.isAPICalledCategory7)
          this.props.getCategoryProductsList(
            0,
            Constants.PRODUCTS_PAGE_COUNT,
            "categoryType7",
            categoryId,
            filterParams,
            (status, isLoadMore) => {
              this._getCategoryProductsListCallback(
                status,
                index + 1,
                isLoadMore
              );
            }
          );
        break;
      case 7:
        if (!this.state.isAPICalledCategory8)
          this.props.getCategoryProductsList(
            0,
            Constants.PRODUCTS_PAGE_COUNT,
            "categoryType8",
            categoryId,
            filterParams,
            (status) => {
              this._getCategoryProductsListCallback(status, index + 1);
            }
          );
        break;
      case 8:
        if (!this.state.isAPICalledCategory9)
          this.props.getCategoryProductsList(
            0,
            Constants.PRODUCTS_PAGE_COUNT,
            "categoryType9",
            categoryId,
            filterParams,
            (status, isLoadMore) => {
              this._getCategoryProductsListCallback(
                status,
                index + 1,
                isLoadMore
              );
            }
          );
        break;
      case 9:
        if (!this.state.isAPICalledCategory10)
          this.props.getCategoryProductsList(
            0,
            Constants.PRODUCTS_PAGE_COUNT,
            "categoryType10",
            categoryId,
            filterParams,
            (status, isLoadMore) => {
              this._getCategoryProductsListCallback(
                status,
                index + 1,
                isLoadMore
              );
            }
          );
        break;
    }
  };

  render() {
    const { index, routes, setIndex, parent_id, isLoginViewShow } = this.state;
    const {
      isRTL,
      isLoadingProductList,
      cartArray,
      selectedFilters,
    } = this.props;
    const { categoryName } = this.props.navigation.state.params;

    let isAPICalled = this.state["isAPICalledCategory" + (index + 1)];

    return (
      <SafeAreaView style={styles.safeContainer}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor={Constants.APP_WHITE_COLOR}
          // translucent={true}
        />
        <NavigationHeader2
          didTapOnSearch={this._didTapOnSearch}
          didTapOnCart={this._didTapOnCart}
          showBackButton={true}
          showFilter={parent_id === "" ? false : true}
          didTapOnBackButton={this._didTapOnBackButton}
          didTapOnFilter={this._didTapOnFilter}
          hideBottomLine={true}
          isRTL={isRTL}
          showCart={true}
          cartItemsCount={cartArray.length}
          isFilterApplied={selectedFilters}
        />
        <Text style={styles.titleStyle}>{categoryName}</Text>
        <View style={{ flex: 1, backgroundColor: Constants.APP_GRAY_COLOR2 }}>
          {routes.length > 0 ? (
            <TabView
              navigationState={{ index, routes }}
              renderScene={this._renderScene}
              onIndexChange={(index) => this._onIndexChange(index, false)}
              initialLayout={initialLayout}
              renderTabBar={renderTabBar}
            />
          ) : (
            <View style={commonStyles.noDataFoundContainer}>
              <Text style={commonStyles.noDataFoundText}>
                {translate("No products found")}
              </Text>
            </View>
          )}
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

        {isLoadingProductList && !isAPICalled && <HudView />}
      </SafeAreaView>
    );
  }
}

export default ProductList;
