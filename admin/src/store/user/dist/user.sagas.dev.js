"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSnapshotFromAuth = getSnapshotFromAuth;
exports.signInWithGoogle = signInWithGoogle;
exports.signInWithFacebook = signInWithFacebook;
exports.signInWithPhoneNumber = signInWithPhoneNumber;
exports.signInWithEmail = signInWithEmail;
exports.signOut = signOut;
exports.onSignOutStart = onSignOutStart;
exports.isUserAuthenticated = isUserAuthenticated;
exports.onEmailSignInStart = onEmailSignInStart;
exports.onGoogleSignInStart = onGoogleSignInStart;
exports.onFacebookSignInStart = onFacebookSignInStart;
exports.onCheckUserSessions = onCheckUserSessions;
exports.signInAfterSignUp = signInAfterSignUp;
exports.signUp = signUp;
exports.onSignUpStart = onSignUpStart;
exports.onSignUpSuccess = onSignUpSuccess;
exports.userSagas = userSagas;

var _effects = require("redux-saga/effects");

var _user = _interopRequireDefault(require("./user.type"));

var _firebase = require("../../firebase/firebase.util");

var _user2 = require("./user.action");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(getSnapshotFromAuth),
    _marked2 =
/*#__PURE__*/
regeneratorRuntime.mark(signInWithGoogle),
    _marked3 =
/*#__PURE__*/
regeneratorRuntime.mark(signInWithFacebook),
    _marked4 =
/*#__PURE__*/
regeneratorRuntime.mark(signInWithPhoneNumber),
    _marked5 =
/*#__PURE__*/
regeneratorRuntime.mark(signInWithEmail),
    _marked6 =
/*#__PURE__*/
regeneratorRuntime.mark(signOut),
    _marked7 =
/*#__PURE__*/
regeneratorRuntime.mark(onSignOutStart),
    _marked8 =
/*#__PURE__*/
regeneratorRuntime.mark(isUserAuthenticated),
    _marked9 =
/*#__PURE__*/
regeneratorRuntime.mark(onEmailSignInStart),
    _marked10 =
/*#__PURE__*/
regeneratorRuntime.mark(onGoogleSignInStart),
    _marked11 =
/*#__PURE__*/
regeneratorRuntime.mark(onFacebookSignInStart),
    _marked12 =
/*#__PURE__*/
regeneratorRuntime.mark(onCheckUserSessions),
    _marked13 =
/*#__PURE__*/
regeneratorRuntime.mark(signInAfterSignUp),
    _marked14 =
/*#__PURE__*/
regeneratorRuntime.mark(signUp),
    _marked15 =
/*#__PURE__*/
regeneratorRuntime.mark(onSignUpStart),
    _marked16 =
/*#__PURE__*/
regeneratorRuntime.mark(onSignUpSuccess),
    _marked17 =
/*#__PURE__*/
regeneratorRuntime.mark(userSagas);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getSnapshotFromAuth(userAuth, additionalData) {
  var userRef, userSnapShot;
  return regeneratorRuntime.wrap(function getSnapshotFromAuth$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return (0, _effects.call)(_firebase.createUserProfileDocument, userAuth, additionalData);

        case 3:
          userRef = _context.sent;
          _context.next = 6;
          return userRef.get();

        case 6:
          userSnapShot = _context.sent;
          console.log(userRef);
          _context.next = 10;
          return (0, _effects.put)((0, _user2.signInSuccess)(_objectSpread({
            id: userSnapShot.id
          }, userSnapShot.data())));

        case 10:
          _context.next = 16;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](0);
          _context.next = 16;
          return (0, _effects.put)((0, _user2.signInFailure)({
            err: _context.t0
          }));

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[0, 12]]);
}

function signInWithGoogle() {
  var _ref, user;

  return regeneratorRuntime.wrap(function signInWithGoogle$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return _firebase.auth.signInWithPopup(_firebase.googleProvider);

        case 3:
          _ref = _context2.sent;
          user = _ref.user;
          _context2.next = 7;
          return getSnapshotFromAuth(user);

        case 7:
          _context2.next = 13;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          _context2.next = 13;
          return (0, _effects.put)((0, _user2.signInFailure)({
            err: _context2.t0
          }));

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, null, [[0, 9]]);
}

function signInWithFacebook() {
  var _ref2, user;

  return regeneratorRuntime.wrap(function signInWithFacebook$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return _firebase.auth.signInWithPopup(_firebase.facebookProvider);

        case 3:
          _ref2 = _context3.sent;
          user = _ref2.user;
          console.log(user);
          _context3.next = 8;
          return getSnapshotFromAuth(user);

        case 8:
          _context3.next = 14;
          break;

        case 10:
          _context3.prev = 10;
          _context3.t0 = _context3["catch"](0);
          _context3.next = 14;
          return (0, _effects.put)((0, _user2.signInFailure)({
            err: _context3.t0
          }));

        case 14:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3, null, [[0, 10]]);
}

function signInWithPhoneNumber() {
  return regeneratorRuntime.wrap(function signInWithPhoneNumber$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
        case "end":
          return _context4.stop();
      }
    }
  }, _marked4);
}

function signInWithEmail(_ref3) {
  var _ref3$payload, email, password, _ref4, user;

  return regeneratorRuntime.wrap(function signInWithEmail$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _ref3$payload = _ref3.payload, email = _ref3$payload.email, password = _ref3$payload.password;
          _context5.prev = 1;
          _context5.next = 4;
          return _firebase.auth.signInWithEmailAndPassword(email, password);

        case 4:
          _ref4 = _context5.sent;
          user = _ref4.user;
          _context5.next = 8;
          return getSnapshotFromAuth(user);

        case 8:
          _context5.next = 14;
          break;

        case 10:
          _context5.prev = 10;
          _context5.t0 = _context5["catch"](1);
          _context5.next = 14;
          return (0, _effects.put)((0, _user2.signInFailure)(_context5.t0));

        case 14:
        case "end":
          return _context5.stop();
      }
    }
  }, _marked5, null, [[1, 10]]);
}

function signOut() {
  return regeneratorRuntime.wrap(function signOut$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          _context6.next = 3;
          return _firebase.auth.signOut();

        case 3:
          _context6.next = 5;
          return (0, _effects.put)((0, _user2.signOutSuccess)());

        case 5:
          _context6.next = 11;
          break;

        case 7:
          _context6.prev = 7;
          _context6.t0 = _context6["catch"](0);
          _context6.next = 11;
          return (0, _effects.put)((0, _user2.signOutFailure)(_context6.t0));

        case 11:
        case "end":
          return _context6.stop();
      }
    }
  }, _marked6, null, [[0, 7]]);
}

function onSignOutStart() {
  return regeneratorRuntime.wrap(function onSignOutStart$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return (0, _effects.takeLatest)(_user["default"].SIGN_OUT_START, signOut);

        case 2:
        case "end":
          return _context7.stop();
      }
    }
  }, _marked7);
}

function isUserAuthenticated() {
  var userAuth;
  return regeneratorRuntime.wrap(function isUserAuthenticated$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return (0, _firebase.getCurrentUser)();

        case 3:
          userAuth = _context8.sent;

          if (userAuth) {
            _context8.next = 6;
            break;
          }

          return _context8.abrupt("return");

        case 6:
          _context8.next = 8;
          return getSnapshotFromAuth(userAuth);

        case 8:
          _context8.next = 14;
          break;

        case 10:
          _context8.prev = 10;
          _context8.t0 = _context8["catch"](0);
          _context8.next = 14;
          return (0, _effects.put)((0, _user2.signInFailure)(_context8.t0));

        case 14:
        case "end":
          return _context8.stop();
      }
    }
  }, _marked8, null, [[0, 10]]);
}

function onEmailSignInStart() {
  return regeneratorRuntime.wrap(function onEmailSignInStart$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return (0, _effects.takeLatest)(_user["default"].EMAIL_SIGN_IN_START, signInWithEmail);

        case 2:
        case "end":
          return _context9.stop();
      }
    }
  }, _marked9);
}

function onGoogleSignInStart() {
  return regeneratorRuntime.wrap(function onGoogleSignInStart$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return (0, _effects.takeLatest)(_user["default"].GOOGLE_SIGN_IN_START, signInWithGoogle);

        case 2:
        case "end":
          return _context10.stop();
      }
    }
  }, _marked10);
}

function onFacebookSignInStart() {
  return regeneratorRuntime.wrap(function onFacebookSignInStart$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return (0, _effects.takeLatest)(_user["default"].FACEBOOK_SIGN_IN_START, signInWithFacebook);

        case 2:
        case "end":
          return _context11.stop();
      }
    }
  }, _marked11);
}

function onCheckUserSessions() {
  return regeneratorRuntime.wrap(function onCheckUserSessions$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.next = 2;
          return (0, _effects.takeLatest)(_user["default"].CHECK_USER_SESSION, isUserAuthenticated);

        case 2:
        case "end":
          return _context12.stop();
      }
    }
  }, _marked12);
}

function signInAfterSignUp(_ref5) {
  var _ref5$payload, user, additionalData;

  return regeneratorRuntime.wrap(function signInAfterSignUp$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _ref5$payload = _ref5.payload, user = _ref5$payload.user, additionalData = _ref5$payload.additionalData;
          _context13.next = 3;
          return getSnapshotFromAuth(user, additionalData);

        case 3:
        case "end":
          return _context13.stop();
      }
    }
  }, _marked13);
}

function signUp(_ref6) {
  var _ref6$payload, email, password, displayName, _ref7, user;

  return regeneratorRuntime.wrap(function signUp$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          _ref6$payload = _ref6.payload, email = _ref6$payload.email, password = _ref6$payload.password, displayName = _ref6$payload.displayName;
          _context14.prev = 1;
          _context14.next = 4;
          return _firebase.auth.createUserWithEmailAndPassword(email, password);

        case 4:
          _ref7 = _context14.sent;
          user = _ref7.user;
          _context14.next = 8;
          return (0, _effects.put)((0, _user2.signUpSuccess)({
            user: user,
            additionalData: {
              displayName: displayName
            }
          }));

        case 8:
          _context14.next = 14;
          break;

        case 10:
          _context14.prev = 10;
          _context14.t0 = _context14["catch"](1);
          _context14.next = 14;
          return (0, _effects.put)((0, _user2.signUpFailure)(_context14.t0));

        case 14:
        case "end":
          return _context14.stop();
      }
    }
  }, _marked14, null, [[1, 10]]);
}

function onSignUpStart() {
  return regeneratorRuntime.wrap(function onSignUpStart$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          _context15.next = 2;
          return (0, _effects.takeLatest)(_user["default"].SIGN_UP_START, signUp);

        case 2:
        case "end":
          return _context15.stop();
      }
    }
  }, _marked15);
}

function onSignUpSuccess() {
  return regeneratorRuntime.wrap(function onSignUpSuccess$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          _context16.next = 2;
          return (0, _effects.takeLatest)(_user["default"].SIGN_UP_SUCCESS, signInAfterSignUp);

        case 2:
        case "end":
          return _context16.stop();
      }
    }
  }, _marked16);
}

function userSagas() {
  return regeneratorRuntime.wrap(function userSagas$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          _context17.next = 2;
          return (0, _effects.all)([(0, _effects.call)(onGoogleSignInStart), (0, _effects.call)(onFacebookSignInStart), (0, _effects.call)(onEmailSignInStart), (0, _effects.call)(onCheckUserSessions), (0, _effects.call)(onSignOutStart), (0, _effects.call)(onSignUpStart), (0, _effects.call)(onSignUpSuccess)]);

        case 2:
        case "end":
          return _context17.stop();
      }
    }
  }, _marked17);
}