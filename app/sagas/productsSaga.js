/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on March 02, 2020
 * ProductsSaga - handles listing products
 */

import {
  getProductDetailAPI,
  getSearchProductsAPI,
  get360DegreeImagesAPI,
  getCategoryProductsAPI,
} from "../api/apiMethods";
import { showSingleAlert } from "../config/common";
import { put, call, select } from "redux-saga/effects";
import { translate } from "../config/languageSwitching";
import * as searchActions from "../actions/searchActions";
import * as loadingActions from "../actions/loadingActions";
import * as productsActions from "../actions/productsActions";

export function* getProductsListSaga(action) {
  const { isNetworkAvailable, adminToken, storeCode } = yield select(
    (state) => state.appReducer
  );

  if (!isNetworkAvailable) {
    showSingleAlert(translate("No internet connection"));
    return;
  }

  yield put(loadingActions.enableLoader());

  try {
    let params = {
      "searchCriteria[current_page]": action.pageIndex,
      "searchCriteria[page_size]": action.pageCount,
    };
    const response = yield call(
      getSearchProductsAPI,
      params,
      storeCode,
      adminToken
    );
    console.log("API RESPONSE OF GET PRODUCTS ", response);
    yield put(loadingActions.disableLoader({}));

    if (response && response.items && response.items) {
      const { productsList } = yield select(
        (state) => state.productsListReducer
      );
      yield put(
        searchActions.updateProductSearchList([
          ...productsList,
          ...response.items,
        ])
      );
      if (action.getProductListCallback) {
        action.getProductListCallback(true);
      }
    } else {
      if (action.getProductListCallback) {
        action.getProductListCallback(false);
      }
    }

    // if (response.success) {
    //   yield put(loginActions.onLoginResponse(response.data));
    //   setTimeout(() => {
    //     Snackbar.show({
    //       title: 'You Have Successfully Logged In',
    //       duration: Snackbar.LENGTH_SHORT,
    //     });
    //   }, 200);
    //   yield call(navigationActions.navigateToHomeScreen);
    //   yield put(loginActions.disableLoader({}));
    // } else {
    //   yield put(loginActions.loginFailed());
    //   yield put(loginActions.disableLoader({}));
    //   setTimeout(() => {
    //     Snackbar.show({
    //       title: response.Message,
    //       duration: Snackbar.LENGTH_SHORT,
    //     });
    //   }, 200);
    // }
  } catch (error) {
    console.log("API ERROR!!!!", error);
    yield put(loadingActions.disableLoader({}));
  }
}

export function* getProductDetailSaga(action) {
  const { isNetworkAvailable, adminToken, storeCode } = yield select(
    (state) => state.appReducer
  );
  if (!isNetworkAvailable) {
    showSingleAlert(translate("No internet connection"));
    return;
  }

  yield put(loadingActions.enableLoader());

  try {
    const response = yield call(
      getProductDetailAPI,
      action.productId,
      storeCode,
      adminToken
    );
    console.log("API RESPONSE OF PRODUCTS DETAIL", response);
    yield put(loadingActions.disableLoader({}));

    if (response && response.length > 0 && response[0].entity_id) {
      // yield put(productsActions.updateProductDetails(response[0]));
      if (action.productDetailsCallback) {
        action.productDetailsCallback(response[0]);
      }
    } else {
      showSingleAlert(translate("API_Failed"));
    }
  } catch (error) {
    console.log("API ERROR!!!!", error);
    showSingleAlert(translate("API_Failed"));
    yield put(loadingActions.disableLoader({}));
  }
}

export function* getCategoryProductsListSaga(action) {
  const { isNetworkAvailable, adminToken, storeCode } = yield select(
    (state) => state.appReducer
  );

  if (!isNetworkAvailable) {
    showSingleAlert(translate("No internet connection"));
    return;
  }

  // yield put(loadingActions.enableLoader());
  yield put(loadingActions.enableProductListLoader());

  try {
    let params = {
      category_id: action.categoryId,
      sort_field: "price",
      sort_orer: action.filterParams.sort_orer || "asc",
      page: action.pageIndex,
      page_size: action.pageCount,
      filter_attributes: action.filterParams.filter_attributes || {},
    };

    console.log("params !!!!!!!!", params);

    const response = yield call(
      getCategoryProductsAPI,
      params,
      storeCode,
      adminToken
    );
    console.log("API RESPONSE OF CATEGORY PRODUCTS LIST ", response);
    yield put(loadingActions.disableProductListLoader({}));

    if (response && response.length >= 0 && response[0].products) {
      // if (action.fromHome) {
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
      } = action.fromHome
        ? yield select((state) => state.productsListReducer)
        : yield select((state) => state.productListFromCategoryReducer);

      let selectedCategoryProductArray = [];
      let newProductArray = response[0].products;

      switch (action.categoryType) {
        case "categoryType1":
          selectedCategoryProductArray = [
            ...productsListOnCategory1,
            ...newProductArray,
          ];
          break;
        case "categoryType2":
          selectedCategoryProductArray = [
            ...productsListOnCategory2,
            ...newProductArray,
          ];
          break;
        case "categoryType3":
          selectedCategoryProductArray = [
            ...productsListOnCategory3,
            ...newProductArray,
          ];
          break;
        case "categoryType4":
          selectedCategoryProductArray = [
            ...productsListOnCategory4,
            ...newProductArray,
          ];
          break;
        case "categoryType5":
          selectedCategoryProductArray = [
            ...productsListOnCategory5,
            ...newProductArray,
          ];
          break;
        case "categoryType6":
          selectedCategoryProductArray = [
            ...productsListOnCategory6,
            ...newProductArray,
          ];
          break;
        case "categoryType7":
          selectedCategoryProductArray = [
            ...productsListOnCategory7,
            ...newProductArray,
          ];
          break;
        case "categoryType8":
          selectedCategoryProductArray = [
            ...productsListOnCategory8,
            ...newProductArray,
          ];
          break;
        case "categoryType9":
          selectedCategoryProductArray = [
            ...productsListOnCategory9,
            ...newProductArray,
          ];
          break;
        case "categoryType10":
          selectedCategoryProductArray = [
            ...productsListOnCategory10,
            ...newProductArray,
          ];
          break;
      }

      console.log("selectedCategoryProductArray", selectedCategoryProductArray);

      if (action.fromHome) {
        yield put(
          productsActions.updateCategoryProductList(
            selectedCategoryProductArray,
            action.categoryType
          )
        );

        if (action.getCategoryProductsListCallback) {
          let obj = response[0];
          let isPendingDataAvailable =
            obj.total_count > selectedCategoryProductArray.length
              ? true
              : false;
          console.log("######### TOTAL", obj.total_count);
          console.log("######### ARRAY", selectedCategoryProductArray.length);
          console.log("######### STATUS", isPendingDataAvailable);

          action.getCategoryProductsListCallback(true, isPendingDataAvailable);
        }
      } else {
        yield put(
          productsActions.updateCategoryProductListFromCategory(
            selectedCategoryProductArray,
            action.categoryType
          )
        );
        if (action.getCategoryProductsListCallback) {
          let obj = response[0];
          let isPendingDataAvailable =
            obj.total_count > selectedCategoryProductArray.length
              ? true
              : false;
          console.log("######### TOTAL", obj.total_count);
          console.log("######### ARRAY", selectedCategoryProductArray.length);
          console.log("######### STATUS", isPendingDataAvailable);

          action.getCategoryProductsListCallback(true, isPendingDataAvailable);
        }
      }
    } else {
      // showSingleAlert(translate('API_Failed'));
      yield put(
        productsActions.updateCategoryProductList([], action.categoryType)
      );
    }
  } catch (error) {
    console.log("API ERROR!!!!", error);
    yield put(loadingActions.disableProductListLoader({}));
  }
}

export function* get360ImagesSaga(action) {
  const { isNetworkAvailable, adminToken, storeCode } = yield select(
    (state) => state.appReducer
  );
  if (!isNetworkAvailable) {
    showSingleAlert(translate("No internet connection"));
    return;
  }

  yield put(loadingActions.enableLoader());

  try {
    const response = yield call(
      get360DegreeImagesAPI,
      action.productId,
      storeCode,
      adminToken
    );
    console.log("API RESPONSE OF 360 degree Images array", response);
    yield put(loadingActions.disableLoader({}));

    if (response && response.length > 0 && response[0].id) {
      if (action.callback) {
        action.callback(response);
      }
    } else {
      showSingleAlert(translate("API_Failed"));
    }
  } catch (error) {
    console.log("API ERROR!!!!", error);
    yield put(loadingActions.disableLoader({}));
  }
}
