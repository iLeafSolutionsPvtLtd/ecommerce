/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on February 12, 2020
 * Sagas -  Redux saga class init.
 */

import {
  addAddressSaga,
  editAddressSaga,
  deleteAddressSaga,
} from "./addAddressSaga";
import {
  loginUserSaga,
  profileUpdateSaga,
  submitFeedbackSaga,
  addWishlistItemSaga,
  removeWishlistItemSaga,
} from "./loginSaga";
import {
  getCartSaga,
  addProductToCartSaga,
  getTotalCartCostSaga,
  getLoggedUserCartIdSaga,
} from "./cartSaga";
import {
  get360ImagesSaga,
  getProductsListSaga,
  getProductDetailSaga,
  getCategoryProductsListSaga,
} from "./productsSaga";
import {
  removeProductUserCart,
  removeProductGuestCart,
} from "./removeCartProducts";
import {
  setShipmentSaga,
  applyVoucherCodeSaga,
  getPaymentAndShipmentMethodsSaga,
} from "./checkoutSaga";
import * as types from "../actions/types";
import { getStoresSaga } from "./storeSaga";
import { getHomeDetails } from "./homeSaga";
import { registerUserSaga } from "./registerSaga";
import { getOrderHistory } from "./orderHistorySaga";
import { getFilterDetails } from "./getAllFiltersSaga";
import { getFilterProducts } from "./filterResultSaga";
import { getAllCategoriesSaga } from "./categoriesSaga";
import { getProductsBySearchTextSaga } from "./searchSaga";
import { takeEvery, all, takeLatest } from "redux-saga/effects";
import { addWishlistFromCartSaga } from "./addWishlistFromCartSaga";
import { createGuestCartSaga, guestAddToCartSaga } from "./guestSaga";
import { updateLoggedinUserCart, updateGuestCart } from "./updateCartProducts";

export default function* watch() {
  yield all([
    takeLatest(types.LOGIN_REQUEST, loginUserSaga),
    takeLatest(types.GET_ALL_CATEGORIES, getAllCategoriesSaga),
    takeLatest(types.SEARCH_TEXT_CHANGE, getProductsBySearchTextSaga),
    takeLatest(types.REGISTER_REQUEST, registerUserSaga),
    takeLatest(types.GET_STORES, getStoresSaga),
    takeLatest(types.GET_HOME_REQUEST, getHomeDetails),
    takeLatest(types.GET_PRODUCTS_LIST, getProductsListSaga),
    takeLatest(types.GET_PRODUCT_DETAIL, getProductDetailSaga),
    takeLatest(types.FILTER_REQUEST, getFilterProducts),
    takeLatest(types.LOAD_FILTER_REQUEST, getFilterDetails),
    takeLatest(types.GET_CATEGORY_PRODUCTS_LIST, getCategoryProductsListSaga),
    takeLatest(types.PROFILE_UPDATE_REQUEST, profileUpdateSaga),
    takeLatest(types.CREATE_GUEST_CART, createGuestCartSaga),
    takeLatest(types.GUEST_ADD_TO_CART, guestAddToCartSaga),
    takeLatest(types.REMOVE_WISHLIST_ITEM, removeWishlistItemSaga),
    takeLatest(types.ADD_WISHLIST_ITEM, addWishlistItemSaga),
    takeLatest(types.ADD_ADDRESS_REQUEST, addAddressSaga),
    takeLatest(types.EDIT_ADDRESS_REQUEST, editAddressSaga),
    takeLatest(types.GET_PRODUCTS_IN_CART, getCartSaga),
    takeLatest(types.ADD_CART_PRODUCT_TO_WISHLIST, addWishlistFromCartSaga),
    takeLatest(types.ADD_PRODUCT_TO_CART_LOGGEDUSER, addProductToCartSaga),
    takeLatest(types.UPDATE_USER_CART, updateLoggedinUserCart),
    takeLatest(types.UPDATE_GUEST_CART, updateGuestCart),
    takeLatest(types.REMOVE_GUEST_CART, removeProductGuestCart),
    takeLatest(types.REMOVE_USER_CART, removeProductUserCart),
    takeLatest(types.SET_SHIPMENT_INFO, setShipmentSaga),
    takeLatest(types.GET_TOTAL_CART_COST, getTotalCartCostSaga),
    takeLatest(types.GET_ORDER_HISTORY, getOrderHistory),
    takeLatest(types.GET_ROTTATION_IMGAGES_ARRAY, get360ImagesSaga),
    takeLatest(types.SUBMIT_CONTACT_US, submitFeedbackSaga),
    takeLatest(types.DELETE_ADDRESS, deleteAddressSaga),
    takeLatest(types.APPLY_VOUCHER_CODE, applyVoucherCodeSaga),
    takeEvery(
      types.GET_PAYMENT_AND_SHIPPING_METHODS,
      getPaymentAndShipmentMethodsSaga
    ),
    takeLatest(types.GET_LOGGED_USER_CART_ID, getLoggedUserCartIdSaga),
  ]);
}
