var _Object$keys = require("core-js/library/fn/object/keys.js");
var _Object$defineProperty = require("core-js/library/fn/object/define-property.js");
function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  _Object$keys(descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;
  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }
  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);
  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }
  if (desc.initializer === void 0) {
    _Object$defineProperty(target, property, desc);
    desc = null;
  }
  return desc;
}
module.exports = _applyDecoratedDescriptor, module.exports.__esModule = true, module.exports["default"] = module.exports;