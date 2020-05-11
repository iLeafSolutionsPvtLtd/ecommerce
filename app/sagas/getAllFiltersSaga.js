/**
 * Created by ARUN for iLeaf Solutions Pvt.Ltd
 * on MARCH 3, 2020
 * Filter Fetch - handles all datas of filters for different categories
 */

import { getAllFilters } from "../api/apiMethods";
import filterArray from "../lib/filterManipulation";
import { put, call, select } from "redux-saga/effects";
import { translate } from "../config/languageSwitching";
import { showSingleAlert, isEmpty } from "../config/common";
import * as loadingActions from "../actions/loadingActions";
import * as filterResultAction from "../actions/filterResultAction";

// Our worker Saga that logins the user
export function* getFilterDetails(action) {
  let grade_array,
    color_array,
    size_array,
    attachment_array,
    brand_array,
    size_inch_array,
    styles_array,
    final_array = [];
  let grade_obj,
    color_obj,
    size_obj,
    attachment_obj,
    brand_obj,
    size_inch_obj,
    style_obj = {};
  const {
    isNetworkAvailable,
    adminToken,
    storeCode,
    productsSizes,
    productsColors,
    productsGrades,
    productsStyles,
    productsAttachments,
    productsBrands,
    productsStylesInch,
  } = yield select((state) => state.appReducer);
  if (!isNetworkAvailable) {
    showSingleAlert(translate("No internet connection"));
    return;
  }
  yield put(loadingActions.enableLoader());
  try {
    const response = yield call(
      getAllFilters,
      action.categoryid,
      storeCode,
      adminToken
    );
    final_array.push(
      {
        title: "Sort By",
        keys: [
          { title: "New Arrival", value: "new" },
          { title: "Low To High", value: "asc" },
          { title: "High To Low", value: "desc" },
        ],
      }
      // {title: 'Discount'}, //for discount
      // {title: 'Price', price_from: '', price_to: ''},
    ); //for price

    console.log("FILTER OPTIONS RESPONSE", response);

    if (response.length > 0) {
      color_array = response[0].color ? response[0].color : [];
      size_array = response[0].size ? response[0].size : [];
      grade_array = response[0].grade ? response[0].grade : [];
      attachment_array = response[0].attachment_type
        ? response[0].attachment_type
        : [];
      brand_array = response[0].brand ? response[0].brand : [];
      size_inch_array = response[0].size_inch ? response[0].size_inch : [];
      styles_array = response[0].style ? response[0].style : [];

      const colorArray = filterArray(productsColors, color_array);
      const sizeArray = filterArray(productsSizes, size_array);
      const gradeArray = filterArray(productsGrades, grade_array);
      const attachmentArray = filterArray(
        productsAttachments,
        attachment_array
      );
      const sizeInchArray = filterArray(productsStylesInch, size_inch_array);
      const brandArray = filterArray(productsBrands, brand_array);
      const styleArray = filterArray(productsStyles, styles_array);

      if (!isEmpty(styles_array)) {
        //for styles
        style_obj = {
          title: "Style",
          key: "style",
          keys: styleArray,
        };
        final_array.push(style_obj);
      }

      if (!isEmpty(color_array)) {
        // for color
        color_obj = {
          title: "Choose Color",
          key: "color",
          keys: colorArray,
        };
        final_array.push(color_obj);
      }

      if (!isEmpty(attachment_array)) {
        //for attachment
        attachment_obj = {
          title: "Attachment Type",
          key: "attachment_type",
          keys: attachmentArray,
        };
        final_array.push(attachment_obj);
      }

      if (!isEmpty(size_inch_array)) {
        //for size(inch)
        size_inch_obj = {
          title: "Size (Inch)",
          key: "size_inch",
          keys: sizeInchArray,
        };
        final_array.push(size_inch_obj);
      }

      //for price
      final_array.push({ title: "Price", price_from: "", price_to: "" });

      //for discount
      final_array.push({ title: "Discount" });

      if (!isEmpty(size_array)) {
        //for size
        size_obj = {
          title: "Size",
          key: "size",
          keys: sizeArray,
        };
        final_array.push(size_obj);
      }

      if (!isEmpty(brand_array)) {
        //for brand
        brand_obj = {
          title: "Brand",
          key: "brand",
          keys: brandArray,
        };
        final_array.push(brand_obj);
      }

      if (!isEmpty(grade_array)) {
        // for grade
        grade_obj = {
          title: "Grade",
          key: "grade",
          keys: gradeArray,
        };
        final_array.push(grade_obj);
      }
    } else {
      //for price
      final_array.push({ title: "Price", price_from: "", price_to: "" });

      //for discount
      final_array.push({ title: "Discount" });
    }
    yield put(filterResultAction.loadFilterList(final_array));
    yield put(loadingActions.disableLoader({}));
  } catch (error) {
    console.log("API ERROR!!!!", error);
    yield put(filterResultAction.loadFilterFailure());
    yield put(loadingActions.disableLoader({}));
  }
}
