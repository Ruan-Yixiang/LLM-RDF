import _Symbol from "core-js/library/fn/symbol/index.js";
import _Symbol$iterator from "core-js/library/fn/symbol/iterator.js";
import _Array$isArray from "core-js/library/fn/array/is-array.js";
import unsupportedIterableToArray from "./unsupportedIterableToArray.js";
export default function _createForOfIteratorHelperLoose(o, allowArrayLike) {
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