import _Object$getOwnPropertyNames from "core-js/library/fn/object/get-own-property-names.js";
import _Object$getOwnPropertyDescriptor from "core-js/library/fn/object/get-own-property-descriptor.js";
import _Object$defineProperty from "core-js/library/fn/object/define-property.js";
export default function _defaults(obj, defaults) {
  var keys = _Object$getOwnPropertyNames(defaults);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var value = _Object$getOwnPropertyDescriptor(defaults, key);
    if (value && value.configurable && obj[key] === undefined) {
      _Object$defineProperty(obj, key, value);
    }
  }
  return obj;
}