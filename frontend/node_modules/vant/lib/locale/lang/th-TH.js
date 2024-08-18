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
  default: () => stdin_default
});
module.exports = __toCommonJS(stdin_exports);
var stdin_default = {
  name: "\u0E0A\u0E37\u0E48\u0E2D",
  tel: "\u0E42\u0E17\u0E23\u0E28\u0E31\u0E1E\u0E17\u0E4C",
  save: "\u0E1A\u0E31\u0E19\u0E17\u0E36\u0E01",
  clear: "\u0E0A\u0E31\u0E14\u0E40\u0E08\u0E19",
  cancel: "\u0E22\u0E01\u0E40\u0E25\u0E34\u0E01",
  confirm: "\u0E22\u0E37\u0E19\u0E22\u0E31\u0E19",
  delete: "\u0E25\u0E1A",
  loading: "\u0E01\u0E33\u0E25\u0E31\u0E07\u0E42\u0E2B\u0E25\u0E14...",
  noCoupon: "\u0E44\u0E21\u0E48\u0E21\u0E35\u0E04\u0E39\u0E1B\u0E2D\u0E07",
  nameEmpty: "\u0E01\u0E23\u0E38\u0E13\u0E32\u0E01\u0E23\u0E2D\u0E01\u0E0A\u0E37\u0E48\u0E2D\u0E02\u0E2D\u0E07\u0E04\u0E38\u0E13",
  addContact: "\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E1C\u0E39\u0E49\u0E15\u0E34\u0E14\u0E15\u0E48\u0E2D",
  telInvalid: "\u0E01\u0E23\u0E38\u0E13\u0E32\u0E01\u0E23\u0E2D\u0E01\u0E2B\u0E21\u0E32\u0E22\u0E40\u0E25\u0E02\u0E42\u0E17\u0E23\u0E28\u0E31\u0E1E\u0E17\u0E4C\u0E17\u0E35\u0E48\u0E16\u0E39\u0E01\u0E15\u0E49\u0E2D\u0E07",
  vanCalendar: {
    end: "\u0E08\u0E1A",
    start: "\u0E40\u0E23\u0E34\u0E48\u0E21",
    title: "\u0E01\u0E32\u0E23\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48",
    weekdays: ["\u0E2D\u0E32", "\u0E08", "\u0E2D", "\u0E1E", "\u0E1E\u0E24", "\u0E28", "\u0E2A"],
    monthTitle: (year, month) => `${year}\u0E1B\u0E35${month}\u0E40\u0E14\u0E37\u0E2D\u0E19`,
    rangePrompt: (maxRange) => `\u0E08\u0E33\u0E19\u0E27\u0E19\u0E27\u0E31\u0E19\u0E17\u0E35\u0E48\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E15\u0E49\u0E2D\u0E07\u0E44\u0E21\u0E48\u0E40\u0E01\u0E34\u0E19 ${maxRange} \u0E27\u0E31\u0E19`
  },
  vanCascader: {
    select: "\u0E42\u0E1B\u0E23\u0E14\u0E40\u0E25\u0E37\u0E2D\u0E01"
  },
  vanPagination: {
    prev: "\u0E2B\u0E19\u0E49\u0E32\u0E17\u0E35\u0E48\u0E41\u0E25\u0E49\u0E27",
    next: "\u0E2B\u0E19\u0E49\u0E32\u0E15\u0E48\u0E2D\u0E44\u0E1B"
  },
  vanPullRefresh: {
    pulling: "\u0E14\u0E36\u0E07\u0E25\u0E07\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E23\u0E35\u0E40\u0E1F\u0E23\u0E0A...",
    loosing: "\u0E1B\u0E25\u0E48\u0E2D\u0E22\u0E40\u0E1E\u0E37\u0E48\u0E2D\u0E23\u0E35\u0E40\u0E1F\u0E23\u0E0A..."
  },
  vanSubmitBar: {
    label: "\u0E23\u0E27\u0E21:"
  },
  vanCoupon: {
    unlimited: "\u0E44\u0E21\u0E48 \u0E08\u0E33\u0E01\u0E31\u0E14",
    discount: (discount) => `\u0E25\u0E14${discount}`,
    condition: (condition) => `\u0E21\u0E35\u0E08\u0E33\u0E2B\u0E19\u0E48\u0E32\u0E22\u0E43\u0E19\u0E23\u0E32\u0E04\u0E32 ${condition} \u0E01\u0E27\u0E48\u0E32\u0E2B\u0E22\u0E27\u0E19`
  },
  vanCouponCell: {
    title: "\u0E04\u0E39\u0E1B\u0E2D\u0E07",
    count: (count) => `\u0E21\u0E35\u0E23\u0E39\u0E1B\u0E20\u0E32\u0E1E ${count} \u0E23\u0E39\u0E1B`
  },
  vanCouponList: {
    exchange: "\u0E41\u0E25\u0E01\u0E40\u0E1B\u0E25\u0E35\u0E48\u0E22\u0E19",
    close: "\u0E44\u0E21\u0E48\u0E44\u0E14\u0E49\u0E43\u0E0A\u0E49",
    enable: "\u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19",
    disabled: "\u0E44\u0E21\u0E48\u0E1E\u0E23\u0E49\u0E2D\u0E21\u0E43\u0E0A\u0E49\u0E07\u0E32\u0E19",
    placeholder: "\u0E01\u0E23\u0E38\u0E13\u0E32\u0E01\u0E23\u0E2D\u0E01\u0E23\u0E2B\u0E31\u0E2A\u0E04\u0E39\u0E1B\u0E2D\u0E07"
  },
  vanAddressEdit: {
    area: "\u0E1E\u0E37\u0E49\u0E19\u0E17\u0E35\u0E48",
    areaEmpty: "\u0E42\u0E1B\u0E23\u0E14\u0E40\u0E25\u0E37\u0E2D\u0E01\u0E20\u0E39\u0E21\u0E34\u0E20\u0E32\u0E04",
    addressEmpty: "\u0E01\u0E23\u0E38\u0E13\u0E32\u0E01\u0E23\u0E2D\u0E01\u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48\u0E42\u0E14\u0E22\u0E25\u0E30\u0E40\u0E2D\u0E35\u0E22\u0E14",
    addressDetail: "\u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48",
    defaultAddress: "\u0E15\u0E31\u0E49\u0E07\u0E40\u0E1B\u0E47\u0E19\u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48\u0E08\u0E31\u0E14\u0E2A\u0E48\u0E07\u0E40\u0E23\u0E34\u0E48\u0E21\u0E15\u0E49\u0E19"
  },
  vanAddressList: {
    add: "\u0E40\u0E1E\u0E34\u0E48\u0E21\u0E17\u0E35\u0E48\u0E2D\u0E22\u0E39\u0E48"
  }
};
