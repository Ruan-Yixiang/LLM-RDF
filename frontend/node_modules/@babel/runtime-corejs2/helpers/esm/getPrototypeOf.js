import _Object$setPrototypeOf from "core-js/library/fn/object/set-prototype-of.js";
import _Object$getPrototypeOf from "core-js/library/fn/object/get-prototype-of.js";
export default function _getPrototypeOf(o) {
  _getPrototypeOf = _Object$setPrototypeOf ? _Object$getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || _Object$getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}