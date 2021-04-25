"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filterSort = exports.filterPrice = exports.filterColor = exports.filterBrand = void 0;

var _filter = _interopRequireDefault(require("./filter.type"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var filterBrand = function filterBrand(brand) {
  return {
    type: _filter["default"].FILTER_BRAND,
    brand: brand
  };
};

exports.filterBrand = filterBrand;

var filterColor = function filterColor(color) {
  return {
    type: _filter["default"].FILTER_COLOR,
    color: color
  };
};

exports.filterColor = filterColor;

var filterPrice = function filterPrice(price) {
  return {
    type: _filter["default"].FILTER_PRICE,
    price: price
  };
};

exports.filterPrice = filterPrice;

var filterSort = function filterSort(sort_by) {
  return {
    type: _filter["default"].SORT_BY,
    sort_by: sort_by
  };
};

exports.filterSort = filterSort;