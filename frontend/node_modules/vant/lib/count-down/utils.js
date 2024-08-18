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
  parseFormat: () => parseFormat
});
module.exports = __toCommonJS(stdin_exports);
var import_utils = require("../utils");
function parseFormat(format, currentTime) {
  const { days } = currentTime;
  let { hours, minutes, seconds, milliseconds } = currentTime;
  if (format.includes("DD")) {
    format = format.replace("DD", (0, import_utils.padZero)(days));
  } else {
    hours += days * 24;
  }
  if (format.includes("HH")) {
    format = format.replace("HH", (0, import_utils.padZero)(hours));
  } else {
    minutes += hours * 60;
  }
  if (format.includes("mm")) {
    format = format.replace("mm", (0, import_utils.padZero)(minutes));
  } else {
    seconds += minutes * 60;
  }
  if (format.includes("ss")) {
    format = format.replace("ss", (0, import_utils.padZero)(seconds));
  } else {
    milliseconds += seconds * 1e3;
  }
  if (format.includes("S")) {
    const ms = (0, import_utils.padZero)(milliseconds, 3);
    if (format.includes("SSS")) {
      format = format.replace("SSS", ms);
    } else if (format.includes("SS")) {
      format = format.replace("SS", ms.slice(0, 2));
    } else {
      format = format.replace("S", ms.charAt(0));
    }
  }
  return format;
}
