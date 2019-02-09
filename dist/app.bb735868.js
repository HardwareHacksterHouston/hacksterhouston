// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"link.jsx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Link =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Link, _React$Component);

  function Link(props) {
    var _this;

    _classCallCheck(this, Link);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Link).call(this, props));
    _this.state = {
      form: !_this.props.link.id,
      confirm: false,
      link: _this.props.link
    };
    return _this;
  }

  _createClass(Link, [{
    key: "loginState",
    value: function loginState() {
      return this.props.list.state.loginState;
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("div", {
        className: "row hackster-link mb-4"
      }, React.createElement("div", {
        className: "card col-md-8 offset-md-2 col-sm-12"
      }, this.errorMessage(), this.cardContent()));
    }
  }, {
    key: "cardContent",
    value: function cardContent() {
      var _this2 = this;

      if (this.state.form) {
        return React.createElement("div", {
          className: "card-text mt-2"
        }, React.createElement("form", null, React.createElement("div", {
          className: "form-group"
        }, React.createElement("input", {
          type: "text",
          className: "form-control",
          value: this.state.editedName,
          placeholder: "Name",
          onChange: function onChange(e) {
            return _this2.setState({
              editedName: e.target.value
            });
          }
        })), React.createElement("div", {
          className: "form-group"
        }, React.createElement("input", {
          type: "text",
          className: "form-control",
          value: this.state.editedUrl,
          placeholder: "http://example.com",
          onChange: function onChange(e) {
            return _this2.setState({
              editedUrl: e.target.value
            });
          }
        })), React.createElement("div", {
          className: "form-group"
        }, React.createElement("input", {
          type: "text",
          className: "form-control",
          value: this.state.editedDescription,
          placeholder: "Description",
          onChange: function onChange(e) {
            return _this2.setState({
              editedDescription: e.target.value
            });
          }
        })), React.createElement("button", {
          type: "button",
          className: "btn btn-primary mr-1",
          onClick: function onClick() {
            return _this2.saveLink();
          }
        }, "Save"), React.createElement("button", {
          type: "button",
          className: "btn btn-secondary",
          onClick: function onClick() {
            return _this2.setState({
              form: false,
              error: null
            });
          }
        }, "Cancel"), this.savingIndicator()));
      } else {
        return React.createElement(React.Fragment, null, React.createElement("h4", {
          className: "card-title"
        }, this.editLink(), React.createElement("a", {
          href: this.state.link.url
        }, this.state.link.name)), React.createElement("h6", {
          className: "card-subtitle mb-2 text-muted"
        }, this.state.link.url), React.createElement("p", {
          className: "card-text"
        }, this.state.link.description));
      }
    }
  }, {
    key: "savingIndicator",
    value: function savingIndicator() {
      if (this.state.saving) {
        return React.createElement("span", {
          className: "float-right"
        }, "Saving...");
      }
    }
  }, {
    key: "errorMessage",
    value: function errorMessage() {
      if (this.state.error) {
        return React.createElement("div", {
          className: "alert alert-danger mt-2",
          role: "alert"
        }, this.state.error);
      }
    }
  }, {
    key: "deleteControl",
    value: function deleteControl() {
      var _this3 = this;

      if (this.state.deleting) {
        return 'deleting...';
      } else if (this.state.confirm) {
        return React.createElement(React.Fragment, null, React.createElement("span", {
          className: "mr-2"
        }, "are you sure?"), React.createElement("a", {
          className: "mr-2",
          onClick: function onClick() {
            return _this3.deleteLink();
          }
        }, "yes"), React.createElement("a", {
          onClick: function onClick() {
            return _this3.setState({
              confirm: false
            });
          }
        }, "no"));
      } else if (this.props.link.id) {
        return React.createElement("a", {
          onClick: function onClick() {
            return _this3.setState({
              confirm: true
            });
          }
        }, "delete");
      } else {
        return '---';
      }
    }
  }, {
    key: "editLink",
    value: function editLink() {
      var _this4 = this;

      if (this.loginState().loggedIn) {
        return React.createElement("span", {
          className: "small float-right"
        }, React.createElement("a", {
          onClick: function onClick() {
            return _this4.openForm();
          }
        }, "edit"), "\xA0|\xA0", this.deleteControl());
      } else {
        return null;
      }
    }
  }, {
    key: "saveLink",
    value: function saveLink() {
      var _this5 = this;

      this.setState({
        saving: true
      });
      fetch(this.props.link.id ? '/link' : '/create', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: this.state.editedName,
          url: this.state.editedUrl,
          description: this.state.editedDescription,
          id: this.props.link.id
        })
      }).then(function (response) {
        if (response.ok) {
          response.json().then(function (link) {
            return _this5.setState({
              link: link
            });
          });

          _this5.setState({
            saving: false,
            error: null,
            form: false
          });
        } else {
          response.text().then(function (err) {
            return _this5.setState({
              saving: false,
              error: err
            });
          });
        }
      });
    }
  }, {
    key: "deleteLink",
    value: function deleteLink() {
      var _this6 = this;

      this.setState({
        deleting: true
      });
      fetch("/delete/".concat(this.state.link.id), {
        method: 'post'
      }).then(function (response) {
        if (response.ok) {
          populateLinks();
        } else {
          response.text().then(function (err) {
            return _this6.setState({
              deleting: false,
              confirm: false,
              error: err
            });
          });
        }
      });
    }
  }, {
    key: "openForm",
    value: function openForm() {
      this.setState({
        form: true,
        editedName: this.props.link.name,
        editedUrl: this.props.link.url,
        editedDescription: this.props.link.description
      });
    }
  }]);

  return Link;
}(React.Component);

var _default = {
  Link: Link
};
exports.default = _default;
},{}],"linkList.jsx":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _link = _interopRequireDefault(require("./link.jsx"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var LinkList =
/*#__PURE__*/
function (_React$Component) {
  _inherits(LinkList, _React$Component);

  function LinkList(props) {
    var _this;

    _classCallCheck(this, LinkList);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LinkList).call(this, props));
    _this.state = {
      loginState: {}
    };
    PubSub.subscribe('loggedIn', function (_, loginState) {
      return _this.setState({
        loginState: loginState
      });
    });
    _this.newCount = 0;
    return _this;
  }

  _createClass(LinkList, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var links = [];
      this.props.links.forEach(function (link) {
        links.push(React.createElement(_link.default, {
          link: link,
          list: _this2,
          key: link.id || link.newCount
        }));
      });
      return React.createElement("div", null, links, this.createControl());
    }
  }, {
    key: "createControl",
    value: function createControl() {
      var _this3 = this;

      if (this.state.loginState.loggedIn) {
        return React.createElement("div", {
          className: "row hackster-link mb-4"
        }, React.createElement("div", {
          className: "card col-md-8 offset-md-2 col-sm-12"
        }, React.createElement("p", {
          className: "card-text text-center"
        }, React.createElement("a", {
          onClick: function onClick() {
            return _this3.createLink();
          }
        }, "Add new link"))));
      }
    }
  }, {
    key: "createLink",
    value: function createLink() {
      this.setState({
        links: this.props.links.concat([{
          newCount: "new-".concat(++this.newCount)
        }])
      });
    }
  }]);

  return LinkList;
}(React.Component);

var _default = {
  LinkList: LinkList
};
exports.default = _default;
},{"./link.jsx":"link.jsx"}],"loginLink.jsx":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var LoginLink =
/*#__PURE__*/
function (_React$Component) {
  _inherits(LoginLink, _React$Component);

  function LoginLink(props) {
    var _this;

    _classCallCheck(this, LoginLink);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(LoginLink).call(this, props));
    _this.state = {
      loginState: _this.props.loginState
    };
    return _this;
  }

  _createClass(LoginLink, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      PubSub.publish('loggedIn', this.state.loginState);

      if (this.state.loginState.loggedIn) {
        return React.createElement("a", {
          href: "#",
          className: "hackster-logout-link",
          onClick: function onClick() {
            return _this2.logout();
          }
        }, "Logout ", this.state.loginState.currentUser);
      } else {
        var link = React.createElement("a", {
          href: "#",
          className: "hackster-login-link mt-2",
          onClick: function onClick() {
            return $('#loginModal').modal();
          }
        }, "Login");
        var modal = React.createElement("div", {
          className: "modal fade",
          id: "loginModal",
          tabIndex: "-1",
          role: "dialog",
          "aria-hidden": "true"
        }, React.createElement("div", {
          className: "modal-dialog",
          role: "document"
        }, React.createElement("div", {
          className: "modal-content"
        }, React.createElement("div", {
          className: "modal-body"
        }, this.errorMessage(), this.loginForm()))));
        return React.createElement("div", null, link, modal);
      }
    }
  }, {
    key: "errorMessage",
    value: function errorMessage() {
      if (this.state.error) {
        return React.createElement("div", {
          className: "alert alert-danger",
          role: "alert"
        }, this.state.error);
      }
    }
  }, {
    key: "loginForm",
    value: function loginForm() {
      var _this3 = this;

      return React.createElement("form", null, React.createElement("div", {
        className: "form-group"
      }, React.createElement("input", {
        type: "text",
        className: "form-control",
        id: "username",
        placeholder: "Username",
        onChange: function onChange(e) {
          return _this3.setState({
            username: e.target.value
          });
        }
      })), React.createElement("div", {
        className: "form-group"
      }, React.createElement("input", {
        type: "password",
        className: "form-control",
        id: "password",
        placeholder: "Password",
        onChange: function onChange(e) {
          return _this3.setState({
            password: e.target.value
          });
        }
      })), React.createElement("button", {
        type: "button",
        className: "btn btn-primary",
        onClick: function onClick() {
          return _this3.login();
        }
      }, "Login"));
    }
  }, {
    key: "login",
    value: function () {
      var _login = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return this.props.controller.login(this.state.username, this.state.password);

              case 3:
                $('#loginModal').modal('hide');
                this.controller.setState({
                  loginState: {
                    loggedIn: true,
                    currentUser: this.state.username
                  },
                  error: null
                });
                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);
                this.setState({
                  error: _context.t0
                });

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 7]]);
      }));

      function login() {
        return _login.apply(this, arguments);
      }

      return login;
    }()
  }, {
    key: "logout",
    value: function logout() {
      var _this4 = this;

      fetch('/logout', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function (response) {
        if (response.ok) {
          _this4.setState({
            loginState: {
              loggedIn: false,
              currentUser: null
            }
          });
        }
      });
    }
  }]);

  return LoginLink;
}(React.Component);

module.exports = {
  LoginLink: LoginLink
};
},{}],"app.jsx":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

//import LinkList from './linkList.jsx';
//import LoginLink from './loginLink.jsx';
var _require = require('./linkList.jsx'),
    LinkList = _require.LinkList;

var _require2 = require('./loginLink.jsx'),
    LoginLink = _require2.LoginLink;

var Controller =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Controller, _React$Component);

  function Controller(props) {
    var _this;

    _classCallCheck(this, Controller);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Controller).call(this, props));
    _this.state = {
      links: [],
      loginState: {}
    };

    _this.fetchLinks();

    return _this;
  }

  _createClass(Controller, [{
    key: "fetchLinks",
    value: function fetchLinks() {
      var _this2 = this;

      fetch('/links').then(function (response) {
        return response.json();
      }).then(function (links) {
        return _this2.setState({
          links: links
        });
      });
    }
  }, {
    key: "fetchLogin",
    value: function fetchLogin() {
      var _this3 = this;

      fetch('/loginStatus').then(function (response) {
        return response.json();
      }).then(function (status) {
        return _this3.setState({
          loginState: status
        });
      });
    }
  }, {
    key: "postJson",
    value: function () {
      var _postJson = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(path, obj) {
        var response, text;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return fetch(path, {
                  method: 'post',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(obj)
                });

              case 2:
                response = _context.sent;
                _context.next = 5;
                return response.text();

              case 5:
                text = _context.sent;

                if (!response.ok) {
                  _context.next = 10;
                  break;
                }

                return _context.abrupt("return", text);

              case 10:
                throw text;

              case 11:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function postJson(_x, _x2) {
        return _postJson.apply(this, arguments);
      }

      return postJson;
    }()
  }, {
    key: "login",
    value: function login(username, password) {
      return this.postJson('/login', {
        username: username,
        password: password
      });
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(React.Fragment, null, React.createElement(LinkList, {
        links: this.state.links,
        controller: this
      }), React.createElement(LoginLink, {
        loginState: this.state.loginState,
        controller: this
      }));
    }
  }]);

  return Controller;
}(React.Component); //ReactDOM.render(<Controller/>, document.getElementById('links'));
},{"./linkList.jsx":"linkList.jsx","./loginLink.jsx":"loginLink.jsx"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "39033" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.jsx"], null)
//# sourceMappingURL=/app.bb735868.map