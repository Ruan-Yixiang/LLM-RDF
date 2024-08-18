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
  AREA_EMPTY_CODE: () => AREA_EMPTY_CODE,
  INHERIT_PROPS: () => INHERIT_PROPS,
  INHERIT_SLOTS: () => INHERIT_SLOTS,
  formatDataForCascade: () => formatDataForCascade
});
module.exports = __toCommonJS(stdin_exports);
const AREA_EMPTY_CODE = "000000";
const INHERIT_SLOTS = [
  "title",
  "cancel",
  "confirm",
  "toolbar",
  "columns-top",
  "columns-bottom"
];
const INHERIT_PROPS = [
  "title",
  "loading",
  "readonly",
  "optionHeight",
  "swipeDuration",
  "visibleOptionNum",
  "cancelButtonText",
  "confirmButtonText"
];
const makeOption = (text = "", value = AREA_EMPTY_CODE, children = void 0) => ({
  text,
  value,
  children
});
function formatDataForCascade({
  areaList,
  columnsNum,
  columnsPlaceholder: placeholder
}) {
  const {
    city_list: city = {},
    county_list: county = {},
    province_list: province = {}
  } = areaList;
  const showCity = +columnsNum > 1;
  const showCounty = +columnsNum > 2;
  const getProvinceChildren = () => {
    if (showCity) {
      return placeholder.length ? [
        makeOption(
          placeholder[0],
          AREA_EMPTY_CODE,
          showCounty ? [] : void 0
        )
      ] : [];
    }
  };
  const provinceMap = /* @__PURE__ */ new Map();
  Object.keys(province).forEach((code) => {
    provinceMap.set(
      code.slice(0, 2),
      makeOption(province[code], code, getProvinceChildren())
    );
  });
  const cityMap = /* @__PURE__ */ new Map();
  if (showCity) {
    const getCityChildren = () => {
      if (showCounty) {
        return placeholder.length ? [makeOption(placeholder[1])] : [];
      }
    };
    Object.keys(city).forEach((code) => {
      const option = makeOption(city[code], code, getCityChildren());
      cityMap.set(code.slice(0, 4), option);
      const province2 = provinceMap.get(code.slice(0, 2));
      if (province2) {
        province2.children.push(option);
      }
    });
  }
  if (showCounty) {
    Object.keys(county).forEach((code) => {
      const city2 = cityMap.get(code.slice(0, 4));
      if (city2) {
        city2.children.push(makeOption(county[code], code));
      }
    });
  }
  const options = Array.from(provinceMap.values());
  if (placeholder.length) {
    const county2 = showCounty ? [makeOption(placeholder[2])] : void 0;
    const city2 = showCity ? [makeOption(placeholder[1], AREA_EMPTY_CODE, county2)] : void 0;
    options.unshift(makeOption(placeholder[0], AREA_EMPTY_CODE, city2));
  }
  return options;
}
