import { isObject } from "./validate.mjs";
function noop() {
}
const extend = Object.assign;
const inBrowser = typeof window !== "undefined";
function get(object, path) {
  const keys = path.split(".");
  let result = object;
  keys.forEach((key) => {
    var _a;
    result = isObject(result) ? (_a = result[key]) != null ? _a : "" : "";
  });
  return result;
}
function pick(obj, keys, ignoreUndefined) {
  return keys.reduce((ret, key) => {
    if (!ignoreUndefined || obj[key] !== void 0) {
      ret[key] = obj[key];
    }
    return ret;
  }, {});
}
const isSameValue = (newValue, oldValue) => JSON.stringify(newValue) === JSON.stringify(oldValue);
const toArray = (item) => Array.isArray(item) ? item : [item];
export {
  extend,
  get,
  inBrowser,
  isSameValue,
  noop,
  pick,
  toArray
};
