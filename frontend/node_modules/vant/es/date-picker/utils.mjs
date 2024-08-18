import {
  extend,
  padZero,
  makeArrayProp,
  clamp
} from "../utils/index.mjs";
import { pickerSharedProps } from "../picker/Picker.mjs";
const sharedProps = extend({}, pickerSharedProps, {
  modelValue: makeArrayProp(),
  filter: Function,
  formatter: {
    type: Function,
    default: (type, option) => option
  }
});
const pickerInheritKeys = Object.keys(pickerSharedProps);
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
    const value = padZero(min + index);
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
    return padZero(clamp(+value, minValue, maxValue));
  }
  return value;
});
export {
  formatValueRange,
  genOptions,
  getMonthEndDay,
  pickerInheritKeys,
  sharedProps,
  times
};
