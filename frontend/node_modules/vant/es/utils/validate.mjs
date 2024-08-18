import { inBrowser } from "./basic.mjs";
const isDef = (val) => val !== void 0 && val !== null;
const isFunction = (val) => typeof val === "function";
const isObject = (val) => val !== null && typeof val === "object";
const isPromise = (val) => isObject(val) && isFunction(val.then) && isFunction(val.catch);
const isDate = (val) => Object.prototype.toString.call(val) === "[object Date]" && !Number.isNaN(val.getTime());
function isMobile(value) {
  value = value.replace(/[^-|\d]/g, "");
  return /^((\+86)|(86))?(1)\d{10}$/.test(value) || /^0[0-9-]{10,13}$/.test(value);
}
const isNumeric = (val) => typeof val === "number" || /^\d+(\.\d+)?$/.test(val);
const isIOS = () => inBrowser ? /ios|iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase()) : false;
export {
  isDate,
  isDef,
  isFunction,
  isIOS,
  isMobile,
  isNumeric,
  isObject,
  isPromise
};
