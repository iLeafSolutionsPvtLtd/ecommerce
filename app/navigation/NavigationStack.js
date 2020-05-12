/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on February 12, 2020
 * Navigation - Navigation methods
 */

import { Image } from "react-native";
import React, { Component } from "react";

/** Navigation Classes */
import {
  createAppContainer,
  createSwitchNavigator,
  createCompatNavigatorFactory,
} from "@react-navigation/compat";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

/** Screens */
import Account from "../screens/Account";
import AddAddressScreen from "../screens/AddAddress";
import AddressListScreen from "../screens/AddressList";
import Categories from "../screens/Categories";
import Cart from "../screens/CartScreen";
// import Cart from '../screens/Cart';
import Chat from "../screens/Chat";
import Search from "../screens/Search";
import Welcome from "../screens/Welcome";
import WishList from "../screens/WishList";
import ContactUs from "../screens/ContactUs";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import ProfileDetails from "../screens/ProfileDetails";
import VideoPlayer from "../screens/VideoPlayerScreen";
import OrderHistory from "../screens/OrderHistory";
import OrderCompletion from "../screens/OrderCompletion";
import OrderHistoryDetail from "../screens/OrderHistoryDetail";
import CountrySelection from "../screens/CountrySelection";
import RegistrationScreen from "../screens/RegistrationScreen";
import ProductList from "../screens/ProductList";
import ProductDetail from "../screens/ProductDetail";
import ProductListFromCategory from "../screens/ProductListFromCategory";
import FilterScreen from "../screens/Filter";
import PreLoaderScreen from "../screens/PreLoaderScreen";
import Checkout from "../screens/Checkout";

/** Others */
import Images from "../config/images";
import Constants from "../config/constants";
import { translate } from "../config/languageSwitching";

const LoginStack = createCompatNavigatorFactory(createStackNavigator)(
  {
    LoginScreen: LoginScreen,
    RegistrationScreen: RegistrationScreen,
    Welcome: Welcome,
  },
  {
    initialRouteName: "Welcome",
    //initialRouteName: 'RegistrationScreen',
    //initialRouteName: 'LoginScreen',
    navigationOptions: {
      gesturesEnabled: false,
    },
    headerMode: "none",
  }
);

const TabNavigator = createBottomTabNavigator();

const HomeStack = createCompatNavigatorFactory(createStackNavigator)(
  {
    Home: HomeScreen,
    Search: Search,
    ProductList: ProductList,
    // FilterScreen: FilterScreen,
  },
  { headerMode: "none" }
);

const CategoriesStack = createCompatNavigatorFactory(createStackNavigator)(
  {
    Categories,
    Search,
    ProductListFromCategory,
  },
  { headerMode: "none" }
);

const WishListStack = createCompatNavigatorFactory(createStackNavigator)(
  {
    WishList,
    Search,
  },
  { headerMode: "none" }
);

function Tab() {
  return (
    <TabNavigator.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          var iconName;
          switch (route.name) {
            case translate("Home"):
              iconName = Images.home;
              break;
            case translate("CATEGORIES"):
              iconName = Images.categories;
              break;
            case translate("WISHLIST"):
              iconName = Images.wishlist;
              break;
            default:
              iconName = Images.addressUser;
              break;
          }
          return (
            <Image
              source={iconName}
              resizeMode={"contain"}
              style={{
                width: 20,
                height: 20,
                tintColor: focused
                  ? Constants.APP_THEME_COLOR
                  : Constants.APP_GRAY_COLOR3,
              }}
            />
          );
        },
      })}
      tabBarOptions={{
        style: {
          backgroundColor: Constants.APP_WHITE_COLOR,
        },
        activeTintColor: Constants.APP_THEME_COLOR,
        inactiveTintColor: Constants.APP_GRAY_COLOR3,
      }}
    >
      <TabNavigator.Screen name={translate("Home")} component={HomeStack} />
      <TabNavigator.Screen
        name={translate("CATEGORIES")}
        // component={AddressStack}
        component={CategoriesStack}
      />
      <TabNavigator.Screen
        name={translate("WISHLIST")}
        component={WishListStack}
      />
      <TabNavigator.Screen name={translate("ACCOUNT")} component={Account} />
    </TabNavigator.Navigator>
  );
}

const TabStack = createCompatNavigatorFactory(createStackNavigator)(
  {
    Tab,
    Cart,
    ProductDetail,
    Checkout,
    ProfileDetails,
    FilterScreen,
    VideoPlayer,
    CountrySelection,
    AddressListScreen,
    AddAddressScreen,
    ContactUs,
    OrderHistory,
    OrderCompletion,
    OrderHistoryDetail,
    Chat,
  },
  {
    headerMode: "none",
    navigationOptions: {
      // swipeEnabled: false,
    },
  }
);

const SwitchNavigator = createSwitchNavigator(
  {
    PreLoaderScreen: PreLoaderScreen,
    HomeScreen: HomeScreen,
    LoginScreen: LoginStack,
    Tab: TabStack,
  },
  { headerMode: "none", initialRouteName: "PreLoaderScreen" }
);

function App() {
  return (
    <NavigationContainer>
      <SwitchNavigator />
    </NavigationContainer>
  );
}

export default App;
