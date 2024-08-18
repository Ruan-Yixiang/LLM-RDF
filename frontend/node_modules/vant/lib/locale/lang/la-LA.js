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
  name: "\u0E8A\u0EB7\u0EC8",
  tel: "\u0EC2\u0E97\u0EA5\u0EB0\u0EAA\u0EB1\u0E9A",
  save: "\u0E9A\u0EB1\u0E99\u0E97\u0EB6\u0E81",
  clear: "\u0E88\u0EB0\u0EC1\u0E88\u0EC9\u0E87",
  cancel: "\u0E8D\u0EBB\u0E81\u0EC0\u0EA5\u0EB5\u0E81",
  confirm: "\u0EA2\u0EB6\u0E99\u0EA2\u0EB1\u0E99",
  delete: "\u0EA5\u0EB7\u0E9A",
  loading: "\u0E81\u0EB3\u0EA5\u0EB1\u0E87\u0EC2\u0EAB\u0EBC\u0E94...",
  noCoupon: "\u0E9A\u0ECD\u0EC8\u0EA1\u0EB5\u0E84\u0EB9\u0E9B\u0EAD\u0E87",
  nameEmpty: "\u0E81\u0EB0\u0EA5\u0EB8\u0E99\u0EB2\u0E9B\u0EC9\u0EAD\u0E99\u0E8A\u0EB7\u0EC8",
  addContact: "\u0EC0\u0E9E\u0EB5\u0EC8\u0EA1\u0E9C\u0EB9\u0EC9\u0E95\u0EB4\u0E94\u0E95\u0ECD\u0EC8",
  telInvalid: "\u0EC0\u0E9A\u0EB5\u0EC2\u0E97\u0EA5\u0EB0\u0EAA\u0EB1\u0E9A\u0E9A\u0ECD\u0EC8\u0E96\u0EB7\u0E81\u0E95\u0EC9\u0EAD\u0E87",
  vanCalendar: {
    end: "\u0E88\u0EBB\u0E9A",
    start: "\u0EC0\u0EA5\u0EB5\u0EC8\u0EA1",
    title: "\u0E81\u0EB2\u0E99\u0EC0\u0EA5\u0EB7\u0EAD\u0E81\u0EA7\u0EB1\u0E99\u0E97\u0EB5\u0EC8",
    weekdays: ["\u0EAD\u0EB2", "\u0E88", "\u0EAD", "\u0E9E", "\u0E9E\u0EAB", "\u0EAA", "\u0EAA"],
    monthTitle: (year, month) => `${year}\u0E9B\u0EB5${month}\u0EC0\u0E94\u0EB7\u0EAD\u0E99`,
    rangePrompt: (maxRange) => `\u0E88\u0EB3\u0E99\u0EAD\u0E99\u0EA7\u0EB1\u0E99\u0E97\u0EB5\u0EC8\u0EC0\u0EA5\u0EB7\u0EAD\u0E81\u0E95\u0EC9\u0EAD\u0E87\u0E9A\u0ECD\u0EC8\u0EC0\u0E81\u0EB5\u0E99 ${maxRange} \u0EA7\u0EB1\u0E99`
  },
  vanCascader: {
    select: "\u0E81\u0EB0\u0EA5\u0EB8\u0E99\u0EB2\u0EC0\u0EA5\u0EB7\u0EAD\u0E81"
  },
  vanPagination: {
    prev: "\u0EDC\u0EC9\u0EB2\u0E97\u0EB5\u0EC8\u0EC1\u0EA5\u0EC9\u0EA7",
    next: "\u0EDC\u0EC9\u0EB2\u0E95\u0ECD\u0EC8\u0EC4\u0E9B"
  },
  vanPullRefresh: {
    pulling: "\u0E94\u0EB7\u0E87\u0EA5\u0EBB\u0E87\u0EC0\u0E9E\u0EB7\u0EC8\u0EAD\u0EA3\u0EB5\u0EC0\u0E9F\u0EAA...",
    loosing: "\u0E9B\u0EC8\u0EAD\u0E8D\u0EC0\u0E9E\u0EB7\u0EC8\u0EAD\u0EA3\u0EB5\u0EC0\u0E9F\u0EAA..."
  },
  vanSubmitBar: {
    label: "\u0EA5\u0EA7\u0EA1:"
  },
  vanCoupon: {
    unlimited: "\u0E9A\u0ECD\u0EC8 \u0E88\u0EB3\u0E81\u0EB1\u0E94",
    discount: (discount) => `\u0EA5\u0EBB\u0E94${discount}`,
    condition: (condition) => `\u0EA1\u0EB5\u0E88\u0EB3\u0EDC\u0EC8\u0EB2\u0E8D\u0EC3\u0E99\u0EA5\u0EB2\u0E84\u0EB2 ${condition} \u0E81\u0EA7\u0EC8\u0EB2\u0EAB\u0E8D\u0EA7\u0E99`
  },
  vanCouponCell: {
    title: "\u0E84\u0EB9\u0E9B\u0EAD\u0E87",
    count: (count) => `\u0EA1\u0EB5\u0EAE\u0EB9\u0E9A\u0E9E\u0EB2\u0E9A ${count} \u0EAE\u0EB9\u0E9A`
  },
  vanCouponList: {
    exchange: "\u0EC1\u0EA5\u0E81\u0E9B\u0EC8\u0EBD\u0E99",
    close: "\u0E9A\u0ECD\u0EC8\u0EC4\u0E94\u0EC9\u0EC3\u0E8A\u0EC9",
    enable: "\u0E9E\u0EC9\u0EAD\u0EA1\u0EC3\u0E8A\u0EC9\u0E87\u0EB2\u0E99",
    disabled: "\u0E9A\u0ECD\u0EC8\u0E9E\u0EC9\u0EAD\u0EA1\u0EC3\u0E8A\u0EC9\u0E87\u0EB2\u0E99",
    placeholder: "\u0E81\u0EB0\u0EA5\u0EB8\u0E99\u0EB2\u0E9B\u0EC9\u0EAD\u0E99\u0E84\u0EB9\u0E9B\u0EAD\u0E87"
  },
  vanAddressEdit: {
    area: "\u0E9E\u0EB7\u0EC9\u0E99\u0E97\u0EB5\u0EC8",
    areaEmpty: "\u0E81\u0EB0\u0EA5\u0EB8\u0E99\u0EB2\u0EC0\u0EA5\u0EB7\u0EAD\u0E81\u0E9E\u0EB7\u0EC9\u0E99\u0E97\u0EB5\u0EC8",
    addressEmpty: "\u0E81\u0EB0\u0EA5\u0EB8\u0E99\u0EB2\u0E9B\u0EC9\u0EAD\u0E99\u0E97\u0EB5\u0EC8\u0EA2\u0EB9\u0EC8",
    addressDetail: "\u0E97\u0EB5\u0EC8\u0EA2\u0EB9\u0EC8",
    defaultAddress: "\u0E95\u0EB1\u0EC9\u0E87\u0EC0\u0E9B\u0EB1\u0E99\u0E97\u0EB5\u0EC8\u0EA2\u0EB9\u0EC8\u0EC0\u0EA5\u0EB5\u0EC8\u0EA1\u0E95\u0EBB\u0EC9\u0E99"
  },
  vanAddressList: {
    add: "\u0EC0\u0E9E\u0EB5\u0EC8\u0EA1\u0E97\u0EB5\u0EC8\u0EA2\u0EB9\u0EC8"
  }
};
