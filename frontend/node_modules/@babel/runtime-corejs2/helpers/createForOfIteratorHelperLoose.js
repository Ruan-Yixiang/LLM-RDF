var _Symbol = require("core-js/library/fn/symbol/index.js");
var _Symbol$iterator = require("core-js/library/fn/symbol/iterator.js");
var _Array$isArray = require("core-js/library/fn/array/is-array.js");
var unsupportedIterableToArray = require("./unsupportedIterableToArray.js");
function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof _Symbol !== "undefined" && o[_Symbol$iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);
  if (_Array$isArray(o) || (it = unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length) return {
        done: true
      };
      return {
        done: false,
        value: o[i++]
      };
    };
  }
  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _createForOfIteratorHelperLoose, module.exports.__esModule = true, module.exports["default"] = module.exports;