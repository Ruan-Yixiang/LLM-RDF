var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  formatValueRange: () => formatValueRange,
  genOptions: () => genOptions,
  getMonthEndDay: () => getMonthEndDay,
  pickerInheritKeys: () => pickerInheritKeys,
  sharedProps: () => sharedProps,
  times: () => times
});
module.exports = __toCommonJS(stdin_exports);
var import_utils = require("../utils");
var import_Picker = require("../picker/Picker");
const sharedProps = (0, import_utils.extend)({}, import_Picker.pickerSharedProps, {
  modelValue: (0, import_utils.makeArrayProp)(),
  filter: Function,
  formatter: {
    type: Function,
    default: (type, option) => option
  }
});
const pickerInheritKeys = Object.keys(import_Picker.pickerSharedProps);
function times(n, iteratee) {
  if (n < 0) {
    return [];
  }
  const result = Array(n);
  let index = -1;
  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}
const getMonthEndDay = (year, month) => 32 - new Date(year, month - 1, 32).getDate();
const genOptions = (min, max, type, formatter, filter, values) => {
  const options = times(max - min + 1, (index) => {
    const value = (0, import_utils.padZero)(min + index);
    return formatter(type, {
      text: value,
      value
    });
  });
  return filter ? filter(type, options, values) : options;
};
const formatValueRange = (values, columns) => values.map((value, index) => {
  const column = columns[index];
  if (column.length) {
    const minValue = +column[0].value;
    const maxValue = +column[column.length - 1].value;
    return (0, import_utils.padZero)((0, import_utils.clamp)(+value, minValue, maxValue));
  }
  return value;
});
