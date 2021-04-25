"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signUpFailure = exports.signUpSuccess = exports.signUpStart = exports.checkUserSession = exports.signOutSuccess = exports.signOutFailure = exports.signOutStart = exports.signInFailure = exports.signInSuccess = exports.emailSignInStart = exports.facebookSignInStart = exports.googleSignInStart = void 0;

var _user = _interopRequireDefault(require("./user.type"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var googleSignInStart = function googleSignInStart() {
  return {
    type: _user["default"].GOOGLE_SIGN_IN_START
  };
};

exports.googleSignInStart = googleSignInStart;

var facebookSignInStart = function facebookSignInStart() {
  return {
    type: _user["default"].FACEBOOK_SIGN_IN_START
  };
};

exports.facebookSignInStart = facebookSignInStart;

var emailSignInStart = function emailSignInStart(emailAndPassword) {
  return {
    type: _user["default"].EMAIL_SIGN_IN_START,
    payload: emailAndPassword
  };
};

exports.emailSignInStart = emailSignInStart;

var signInSuccess = function signInSuccess(user) {
  return {
    type: _user["default"].SIGN_IN_SUCCESS,
    payload: user
  };
};

exports.signInSuccess = signInSuccess;

var signInFailure = function signInFailure(error) {
  return {
    type: _user["default"].SIGN_IN_FAILURE,
    payload: error
  };
};

exports.signInFailure = signInFailure;

var signOutStart = function signOutStart() {
  return {
    type: _user["default"].SIGN_OUT_START
  };
};

exports.signOutStart = signOutStart;

var signOutFailure = function signOutFailure(error) {
  return {
    type: _user["default"].SIGN_OUT_FAILURE,
    payload: error
  };
};

exports.signOutFailure = signOutFailure;

var signOutSuccess = function signOutSuccess() {
  return {
    type: _user["default"].SIGN_OUT_SUCCESS
  };
};

exports.signOutSuccess = signOutSuccess;

var checkUserSession = function checkUserSession() {
  return {
    type: _user["default"].CHECK_USER_SESSION
  };
};

exports.checkUserSession = checkUserSession;

var signUpStart = function signUpStart(userCredentials) {
  return {
    type: _user["default"].SIGN_UP_START,
    payload: userCredentials
  };
};

exports.signUpStart = signUpStart;

var signUpSuccess = function signUpSuccess(_ref) {
  var user = _ref.user,
      additionData = _ref.additionData;
  return {
    type: _user["default"].SIGN_UP_SUCCESS,
    payload: {
      user: user,
      additionData: additionData
    }
  };
};

exports.signUpSuccess = signUpSuccess;

var signUpFailure = function signUpFailure(error) {
  return {
    type: _user["default"].SIGN_UP_FAILURE,
    payload: error
  };
};

exports.signUpFailure = signUpFailure;