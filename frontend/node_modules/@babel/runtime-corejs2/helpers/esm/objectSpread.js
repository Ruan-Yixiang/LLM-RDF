import _Object$keys from "core-js/library/fn/object/keys.js";
import _Object$getOwnPropertySymbols from "core-js/library/fn/object/get-own-property-symbols.js";
import _Object$getOwnPropertyDescriptor from "core-js/library/fn/object/get-own-property-descriptor.js";
import defineProperty from "./defineProperty.js";
export default function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? Object(arguments[i]) : {};
    var ownKeys = _Object$keys(source);
    if (typeof _Object$getOwnPropertySymbols === 'function') {
      ownKeys.push.apply(ownKeys, _Object$getOwnPropertySymbols(source).filter(function (sym) {
        return _Object$getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }
    ownKeys.forEach(function (key) {
      defineProperty(target, key, source[key]);
    });
  }
  return target;
}