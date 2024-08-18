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
  name: "\u304A\u540D\u524D",
  tel: "\u96FB\u8A71\u756A\u53F7",
  save: "\u30BB\u30FC\u30D6",
  clear: "\u30AF\u30EA\u30A2",
  cancel: "\u30AD\u30E3\u30F3\u30BB\u30EB",
  confirm: "\u78BA\u8A8D",
  delete: "\u524A\u9664",
  loading: "\u8AAD\u307F\u8FBC\u307F\u4E2D...",
  noCoupon: "\u30AF\u30FC\u30DD\u30F3\u306F\u3042\u308A\u307E\u305B\u3093",
  nameEmpty: "\u540D\u524D\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044",
  addContact: "\u9023\u7D61\u5148\u3092\u8FFD\u52A0",
  telInvalid: "\u6B63\u3057\u3044\u96FB\u8A71\u756A\u53F7\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044",
  vanCalendar: {
    end: "\u7D42\u4E86",
    start: "\u958B\u59CB",
    title: "\u65E5\u4ED8\u9078\u629E",
    weekdays: ["\u65E5", "\u6708", "\u706B", "\u6C34", "\u6728", "\u91D1", "\u571F"],
    monthTitle: (year, month) => `${year}\u5E74${month}\u6708`,
    rangePrompt: (maxRange) => `${maxRange}\u65E5\u307E\u3067\u9078\u629E`
  },
  vanCascader: {
    select: "\u9078\u629E\u3059\u308B"
  },
  vanPagination: {
    prev: "\u524D\u306E\u30DA\u30FC\u30B8",
    next: "\u6B21\u306E\u30DA\u30FC\u30B8"
  },
  vanPullRefresh: {
    pulling: "\u30D7\u30EB\u30C0\u30A6\u30F3\u3057\u3066\u66F4\u65B0...",
    loosing: "\u30EA\u30EA\u30FC\u30B9\u6642\u306B\u66F4\u65B0..."
  },
  vanSubmitBar: {
    label: "\u5408\u8A08:"
  },
  vanCoupon: {
    unlimited: "\u7121\u5236\u9650",
    discount: (discount) => `${10 - discount}\u5272\u5F15`,
    condition: (condition) => `${condition}\u5186\u4EE5\u4E0A\u3067\u5229\u7528\u53EF\u80FD`
  },
  vanCouponCell: {
    title: "\u30AF\u30FC\u30DD\u30F3",
    count: (count) => `${count}\u679A\u304C\u5229\u7528\u53EF\u80FD`
  },
  vanCouponList: {
    exchange: "\u4E21\u66FF",
    close: "\u4F7F\u7528\u7981\u6B62",
    enable: "\u5229\u7528\u53EF\u80FD",
    disabled: "\u5229\u7528\u3067\u304D\u307E\u305B\u3093",
    placeholder: "\u5272\u5F15\u30B3\u30FC\u30C9\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044"
  },
  vanAddressEdit: {
    area: "\u5730\u57DF",
    areaEmpty: "\u5730\u57DF\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044",
    addressEmpty: "\u8A73\u3057\u3044\u4F4F\u6240\u3092\u5165\u529B\u3057\u3066\u304F\u3060\u3055\u3044",
    addressDetail: "\u8A73\u3057\u3044\u4F4F\u6240",
    defaultAddress: "\u30C7\u30D5\u30A9\u30EB\u30C8\u306E\u4F4F\u6240\u306B\u8A2D\u5B9A"
  },
  vanAddressList: {
    add: "\u4F4F\u6240\u3092\u8FFD\u52A0"
  }
};
