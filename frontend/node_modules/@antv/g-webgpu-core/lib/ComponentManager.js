"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComponentManager = exports.Component = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _Entity = require("./Entity");
var Component = /*#__PURE__*/(0, _createClass2.default)(function Component(data) {
  (0, _classCallCheck2.default)(this, Component);
} //
);
/**
 * 管理某一类 Component，尽可能做到 AoS 而非 SoA
 * @see https://wickedengine.net/2019/09/29/entity-component-system/
 * @see https://github.com/turanszkij/WickedEngine/blob/master/WickedEngine/wiECS.h
 */
// tslint:disable-next-line:max-classes-per-file
exports.Component = Component;
var ComponentManager = /*#__PURE__*/function () {
  /**
   * 不在 Entity 中维护拥有的 Component 列表，反之亦然
   */

  function ComponentManager(clazz) {
    (0, _classCallCheck2.default)(this, ComponentManager);
    this.clazz = void 0;
    this.components = [];
    this.entities = [];
    this.lookup = {};
    this.clazz = clazz;
  }
  (0, _createClass2.default)(ComponentManager, [{
    key: "clear",
    value: function clear() {
      this.components = [];
      this.entities = [];
      this.lookup = {};
    }
  }, {
    key: "contains",
    value: function contains(entity) {
      return this.lookup[entity] > -1;
    }
  }, {
    key: "create",
    value: function create(entity, data) {
      this.lookup[entity] = this.components.length;
      var component = new this.clazz(data || {});
      this.components.push(component);
      this.entities.push(entity);
      return component;
    }
  }, {
    key: "remove",
    value: function remove(entity) {
      var componentIndex = this.lookup[entity];
      if (componentIndex > -1) {
        if (componentIndex < this.components.length - 1) {
          // 将待删除元素和最后一个元素交换
          // C++ 中有 std::move 这样的操作，避免数据的拷贝
          // @see https://github.com/turanszkij/WickedEngine/blob/master/WickedEngine/wiECS.h#L169
          this.components[componentIndex] = this.components[this.components.length - 1];
          this.entities[componentIndex] = this.entities[this.entities.length - 1];
          this.lookup[this.entities[componentIndex]] = componentIndex;
        }
      }

      // 待删除元素已经移动到了最后一个
      this.components.pop();
      this.entities.pop();
      delete this.lookup[entity];
    }
  }, {
    key: "removeKeepSorted",
    value: function removeKeepSorted(entity) {
      var componentIndex = this.lookup[entity];
      if (componentIndex > -1) {
        var entity2 = this.entities[componentIndex];
        if (componentIndex < this.components.length - 1) {
          // Move every component left by one that is after this element:
          for (var _i = componentIndex + 1; _i < this.components.length; ++_i) {
            this.components[_i - 1] = this.components[_i];
          }
          // Move every entity left by one that is after this element and update lut:
          for (var _i2 = componentIndex + 1; _i2 < this.entities.length; ++_i2) {
            this.entities[_i2 - 1] = this.entities[_i2];
            this.lookup[this.entities[_i2 - 1]] = _i2 - 1;
          }
        }
        this.components.pop();
        this.entities.pop();
        delete this.lookup[entity2];
      }
    }
  }, {
    key: "moveItem",
    value: function moveItem(srcIndex, destIndex) {
      if (srcIndex === destIndex) {
        return;
      }

      // Save the moved component and entity:
      var srcComponent = this.components[srcIndex];
      var srcEntity = this.entities[srcIndex];

      // Every other entity-component that's in the way gets moved by one and lut is kept updated:
      var direction = srcIndex < destIndex ? 1 : -1;
      for (var _i3 = srcIndex; _i3 !== destIndex; _i3 += direction) {
        var next = _i3 + direction;
        this.components[_i3] = this.components[next];
        this.entities[_i3] = this.entities[next];
        this.lookup[this.entities[_i3]] = _i3;
      }

      // Saved entity-component moved to the required position:
      this.components[destIndex] = srcComponent;
      this.entities[destIndex] = srcEntity;
      this.lookup[srcEntity] = destIndex;
    }
  }, {
    key: "getEntity",
    value: function getEntity(index) {
      return this.entities[index];
    }

    /**
     * 由于缺少类似 C++ 的重载操作符，没法通过 [下标] 直接访问。因此只能增加该方法用于遍历。
     */
  }, {
    key: "getComponent",
    value: function getComponent(index) {
      return this.components[index];
    }
  }, {
    key: "getComponentByEntity",
    value: function getComponentByEntity(entity) {
      var componentIndex = this.lookup[entity];
      if (componentIndex > -1) {
        return this.components[componentIndex];
      }
      return null;
    }
  }, {
    key: "getCount",
    value: function getCount() {
      return this.components.length;
    }
  }, {
    key: "getEntityByComponentIndex",
    value: function getEntityByComponentIndex(componentIdx) {
      for (var _i4 = 0, _Object$keys = Object.keys(this.lookup); _i4 < _Object$keys.length; _i4++) {
        var _entity = _Object$keys[_i4];
        var entityInNum = Number(_entity);
        if (this.lookup[entityInNum] === componentIdx) {
          return entityInNum;
        }
      }
      return _Entity.EMPTY;
    }
  }, {
    key: "find",
    value: function find(callback) {
      for (var _i5 = 0; _i5 < this.getCount(); _i5++) {
        var _component = this.getComponent(_i5);
        if (callback(_component, _i5)) {
          return _component;
        }
      }
      return null;
    }
  }, {
    key: "findIndex",
    value: function findIndex(callback) {
      for (var _i6 = 0; _i6 < this.getCount(); _i6++) {
        var _component2 = this.getComponent(_i6);
        if (callback(_component2, _i6)) {
          return _i6;
        }
      }
      return -1;
    }
  }, {
    key: "forEach",
    value: function forEach(callback) {
      for (var _i7 = 0, _Object$keys2 = Object.keys(this.lookup); _i7 < _Object$keys2.length; _i7++) {
        var _entity2 = _Object$keys2[_i7];
        var entityInNum = Number(_entity2);
        var componentIndex = this.lookup[entityInNum];
        callback(entityInNum, this.getComponent(componentIndex));
      }
    }
  }, {
    key: "forEachAsync",
    value: function () {
      var _forEachAsync = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(callback) {
        var _i8, _Object$keys3, _entity3, entityInNum, componentIndex;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _i8 = 0, _Object$keys3 = Object.keys(this.lookup);
              case 1:
                if (!(_i8 < _Object$keys3.length)) {
                  _context.next = 10;
                  break;
                }
                _entity3 = _Object$keys3[_i8];
                entityInNum = Number(_entity3);
                componentIndex = this.lookup[entityInNum];
                _context.next = 7;
                return callback(entityInNum, this.getComponent(componentIndex));
              case 7:
                _i8++;
                _context.next = 1;
                break;
              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function forEachAsync(_x) {
        return _forEachAsync.apply(this, arguments);
      }
      return forEachAsync;
    }()
  }, {
    key: "map",
    value: function map(callback) {
      var result = [];
      for (var _i9 = 0, _Object$keys4 = Object.keys(this.lookup); _i9 < _Object$keys4.length; _i9++) {
        var _entity4 = _Object$keys4[_i9];
        var entityInNum = Number(_entity4);
        var componentIndex = this.lookup[entityInNum];
        result.push(callback(entityInNum, this.getComponent(componentIndex)));
      }
      return result;
    }
  }]);
  return ComponentManager;
}();
exports.ComponentManager = ComponentManager;
//# sourceMappingURL=ComponentManager.js.map