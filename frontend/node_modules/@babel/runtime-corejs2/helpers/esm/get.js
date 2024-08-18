import _Reflect$get from "core-js/library/fn/reflect/get.js";
import _Object$getOwnPropertyDescriptor from "core-js/library/fn/object/get-own-property-descriptor.js";
import superPropBase from "./superPropBase.js";
export default function _get() {
  if (typeof Reflect !== "undefined" && _Reflect$get) {
    _get = _Reflect$get.bind();
  } else {
    _get = function _get(target, property, receiver) {
      var base = superPropBase(target, property);
      if (!base) return;
      var desc = _Object$getOwnPropertyDescriptor(base, property);
      if (desc.get) {
        return desc.get.call(arguments.length < 3 ? target : receiver);
      }
      return desc.value;
    };
  }
  return _get.apply(this, arguments);
}