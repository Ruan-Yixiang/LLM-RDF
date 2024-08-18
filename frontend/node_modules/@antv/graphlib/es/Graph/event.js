function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

import Graph from '.';
export var GraphWithEvent = /*#__PURE__*/function (_Graph) {
  _inherits(GraphWithEvent, _Graph);

  var _super = _createSuper(GraphWithEvent);

  function GraphWithEvent() {
    var _this;

    _classCallCheck(this, GraphWithEvent);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.eventPool = {};
    return _this;
  }

  _createClass(GraphWithEvent, [{
    key: "appendEvent",
    value:
    /**
     * @description Add an event listener.
     * @description.zh-CN 添加事件监听器。
     */
    function appendEvent(type, callback) {
      if (!this.eventPool[type]) {
        this.eventPool[type] = [];
      }

      this.eventPool[type].push(callback);
    }
    /**
     * @description remove an event listener.
     * @description.zh-CN 移除事件监听器。
     */

  }, {
    key: "removeEvent",
    value: function removeEvent(type, callback) {
      if (!this.eventPool[type]) {
        return;
      }

      var index = this.eventPool[type].indexOf(callback);

      if (index > -1) {
        this.eventPool[type].splice(index, 1);
      }
    }
    /**
     * @description trigger an event.
     * @description.zh-CN 触发事件。
     */

  }, {
    key: "emitEvent",
    value: function emitEvent(type) {
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      if (!this.eventPool[type]) {
        return;
      }

      this.eventPool[type].forEach(function (callback) {
        callback.apply(void 0, args);
      });
    }
  }, {
    key: "setNode",
    value: function setNode(node, value) {
      _get(_getPrototypeOf(GraphWithEvent.prototype), "setNode", this).call(this, node, value);

      this.emitEvent('nodeAdd', node, value);
      return this;
    }
  }, {
    key: "removeNode",
    value: function removeNode(node) {
      _get(_getPrototypeOf(GraphWithEvent.prototype), "removeNode", this).call(this, node);

      this.emitEvent('nodeRemove', node);
      return this;
    }
  }, {
    key: "setEdge",
    value: function setEdge(v_, w_, value, name) {
      _get(_getPrototypeOf(GraphWithEvent.prototype), "setEdge", this).call(this, v_, w_, value, name);

      this.emitEvent('edgeAdd', v_, w_, value, name);
      return this;
    }
  }, {
    key: "removeEdge",
    value: function removeEdge(v_, w_, name) {
      _get(_getPrototypeOf(GraphWithEvent.prototype), "removeEdge", this).call(this, v_, w_, name);

      this.emitEvent('edgeRemove', v_, w_, name);
      return this;
    }
  }]);

  return GraphWithEvent;
}(Graph);