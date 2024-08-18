import { get } from "./basic.mjs";
import { camelize } from "./format.mjs";
import { isFunction } from "./validate.mjs";
import locale from "../locale/index.mjs";
function createTranslate(name) {
  const prefix = camelize(name) + ".";
  return (path, ...args) => {
    const messages = locale.messages();
    const message = get(messages, prefix + path) || get(messages, path);
    return isFunction(message) ? message(...args) : message;
  };
}
function genBem(name, mods) {
  if (!mods) {
    return "";
  }
  if (typeof mods === "string") {
    return ` ${name}--${mods}`;
  }
  if (Array.isArray(mods)) {
    return mods.reduce(
      (ret, item) => ret + genBem(name, item),
      ""
    );
  }
  return Object.keys(mods).reduce(
    (ret, key) => ret + (mods[key] ? genBem(name, key) : ""),
    ""
  );
}
function createBEM(name) {
  return (el, mods) => {
    if (el && typeof el !== "string") {
      mods = el;
      el = "";
    }
    el = el ? `${name}__${el}` : name;
    return `${el}${genBem(el, mods)}`;
  };
}
function createNamespace(name) {
  const prefixedName = `van-${name}`;
  return [
    prefixedName,
    createBEM(prefixedName),
    createTranslate(prefixedName)
  ];
}
export {
  createBEM,
  createNamespace,
  createTranslate
};
