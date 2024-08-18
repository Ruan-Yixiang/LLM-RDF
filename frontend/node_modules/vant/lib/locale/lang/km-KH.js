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
  name: "\u1788\u17D2\u1798\u17C4\u17C7",
  tel: "\u1791\u17BC\u179A\u179F\u17D0\u1796\u17D2\u1791",
  save: "\u179A\u1780\u17D2\u179F\u17B6\u1791\u17BB\u1780",
  clear: "\u1785\u17D2\u1794\u17B6\u179F\u17CB",
  cancel: "\u1794\u17C4\u17C7\u1794\u1784\u17CB",
  confirm: "\u1799\u179B\u17CB\u1796\u17D2\u179A\u1798",
  delete: "\u179B\u17BB\u1794",
  loading: "\u1780\u17C6\u1796\u17BB\u1784\u200B\u1795\u17D2\u1791\u17BB\u1780...",
  noCoupon: "\u1782\u17D2\u1798\u17B6\u1793\u1782\u17BC\u1794\u17C9\u17BB\u1784",
  nameEmpty: "\u179F\u17BC\u1798\u1794\u17C6\u1796\u17C1\u1789\u1788\u17D2\u1798\u17C4\u17C7",
  addContact: "\u1794\u1793\u17D2\u1790\u17C2\u1798\u1791\u17C6\u1793\u17B6\u1780\u17CB\u1791\u17C6\u1793\u1784",
  telInvalid: "\u179B\u17C1\u1781\u1791\u17BC\u179A\u179F\u17D0\u1796\u17D2\u1791\u1798\u17B7\u1793\u178F\u17D2\u179A\u17BC\u179C\u1791\u1798\u17D2\u179A\u1784\u17CB",
  vanCalendar: {
    end: "\u1794\u1789\u17D2\u1785\u1794\u17CB",
    start: "\u1785\u17B6\u1794\u17CB\u1796\u17B8",
    title: "\u1794\u17D2\u179A\u178F\u17B7\u1791\u17B7\u1793",
    weekdays: ["\u17A2\u17B6", "\u1785", "\u17A2", "\u1796", "\u1796\u17D2\u179A", "\u179F\u17BB", "\u179F\u17C5"],
    monthTitle: (year, month) => `${year}/${month}`,
    rangePrompt: (maxRange) => `\u1787\u17D2\u179A\u17BE\u179F\u179A\u17BE\u179F\u1798\u17B7\u1793\u179B\u17BE\u179F\u1796\u17B8 ${maxRange} \u1790\u17D2\u1784\u17C3`
  },
  vanCascader: {
    select: "\u1787\u17D2\u179A\u17BE\u179F\u179A\u17BE\u179F"
  },
  vanPagination: {
    prev: "\u1798\u17BB\u1793",
    next: "\u1794\u1793\u17D2\u1791\u17B6\u1794\u17CB"
  },
  vanPullRefresh: {
    pulling: "\u1791\u17B6\u1789\u178A\u17BE\u1798\u17D2\u1794\u17B8\u1785\u17B6\u1794\u17CB\u1795\u17D2\u178F\u17BE\u1798\u17A1\u17BE\u1784\u179C\u17B7\u1789...",
    loosing: "\u1796\u17D2\u179A\u179B\u17C2\u1784\u178A\u17BE\u1798\u17D2\u1794\u17B8\u1785\u17B6\u1794\u17CB\u1795\u17D2\u178F\u17BE\u1798\u17A1\u17BE\u1784\u179C\u17B7\u1789..."
  },
  vanSubmitBar: {
    label: "\u179F\u179A\u17BB\u1794:"
  },
  vanCoupon: {
    unlimited: "\u1782\u17D2\u1798\u17B6\u1793\u178A\u17C2\u1793\u1780\u17C6\u178E\u178F\u17CB",
    discount: (discount) => `\u1794\u1789\u17D2\u1785\u17BB\u17C7\u178F\u1798\u17D2\u179B\u17C3 ${discount * 10}%`,
    condition: (condition) => `\u1799\u17C9\u17B6\u1784\u178F\u17B7\u1785 ${condition}`
  },
  vanCouponCell: {
    title: "\u1782\u17BC\u1794\u17C9\u17BB\u1784",
    count: (count) => `\u17A2\u17D2\u1793\u1780\u1798\u17B6\u1793 ${count}\u1782\u17BC\u1794\u17C9\u17BB\u1784`
  },
  vanCouponList: {
    exchange: "\u1794\u17D2\u178A\u17BC\u179A",
    close: "\u1794\u17B7\u1791",
    enable: "\u1794\u17D2\u179A\u17BE\u1794\u17B6\u1793",
    disabled: "\u1798\u17B7\u1793\u17A2\u17B6\u1785\u1794\u17D2\u179A\u17BE\u1794\u17B6\u1793",
    placeholder: "\u179B\u17C1\u1781\u1780\u17BC\u178A\u1782\u17BC\u1794\u17C9\u17BB\u1784"
  },
  vanAddressEdit: {
    area: "\u1791\u17B8\u178F\u17B6\u17C6\u1784",
    areaEmpty: "\u179F\u17BC\u1798\u1787\u17D2\u179A\u17BE\u179F\u179A\u17BE\u179F\u1791\u17B8\u178F\u17B6\u17C6\u1784\u1791\u1791\u17BD\u179B",
    addressEmpty: "\u178F\u1798\u17D2\u179A\u17BC\u179C\u17A2\u17C4\u1799\u1798\u17B6\u1793\u17A2\u17B6\u179F\u1799\u178A\u17D2\u178B\u17B6\u1793",
    addressDetail: "\u17A2\u17B6\u179F\u1799\u178A\u17D2\u178B\u17B6\u1793",
    defaultAddress: "\u178A\u17B6\u1780\u17CB\u1787\u17B6\u17A2\u17B6\u179F\u1799\u178A\u17D2\u178B\u17B6\u1793\u178A\u17BE\u1798"
  },
  vanAddressList: {
    add: "\u1794\u1793\u17D2\u1790\u17C2\u1798\u17A2\u17B6\u179F\u1799\u178A\u17D2\u178B\u17B6\u1793\u1790\u17D2\u1798\u17B8"
  }
};
