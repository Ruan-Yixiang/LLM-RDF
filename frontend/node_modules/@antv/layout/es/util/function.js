import { isArray, isObject } from ".";
import { isNumber } from "./number";
export const isFunction = (val) => typeof val === 'function';
export const getFunc = (value, defaultValue, func) => {
    let resultFunc;
    if (func) {
        resultFunc = func;
    }
    else if (isNumber(value)) {
        resultFunc = () => value;
    }
    else {
        resultFunc = () => defaultValue;
    }
    return resultFunc;
};
export const getFuncByUnknownType = (defaultValue, value, resultIsNumber = true) => {
    if (!value && value !== 0) {
        return (d) => {
            if (d.size) {
                if (isArray(d.size))
                    return d.size[0] > d.size[1] ? d.size[0] : d.size[1];
                if (isObject(d.size))
                    return d.size.width > d.size.height ? d.size.width : d.size.height;
                return d.size;
            }
            return defaultValue;
        };
    }
    if (isFunction(value)) {
        return value;
    }
    if (isNumber(value)) {
        return () => value;
    }
    if (isArray(value)) {
        return () => {
            if (resultIsNumber) {
                const max = Math.max(...value);
                return isNaN(max) ? defaultValue : max;
            }
            return value;
        };
    }
    if (isObject(value)) {
        return () => {
            if (resultIsNumber) {
                const max = Math.max(value.width, value.height);
                return isNaN(max) ? defaultValue : max;
            }
            return [value.width, value.height];
        };
    }
    return () => defaultValue;
};
//# sourceMappingURL=function.js.map