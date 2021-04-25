"use strict";

var _reselect = require("reselect");

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var selectFilter = function selectFilter(state) {
  return state.filter;
};