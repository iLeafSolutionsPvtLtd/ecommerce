/**
 * Created by Jebin for iLeaf Solutions Pvt.Ltd
 * on February 28, 2020
 * SearchActions - Actions for search products
 */

import * as types from './types';

export function onSearchTextChange(searchText) {
  return {
    type: types.SEARCH_TEXT_CHANGE,
    searchText,
  };
}

export function updateProductSearchList(searchResultArray) {
  return {
    type: types.UPDATE_SEARCH_RESULT,
    searchResultArray,
  };
}

export function clearSearchResult() {
  return {
    type: types.CLEAR_SEARCH_RESULT,
  };
}
