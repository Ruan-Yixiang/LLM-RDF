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
  name: "\uC774\uB984",
  tel: "\uD578\uB4DC\uD3F0",
  save: "\uAD6C\uD558\uB2E4",
  clear: "\uBD84\uBA85\uD55C",
  cancel: "\uCDE8\uC18C",
  confirm: "\uD655\uC778",
  delete: "\uC0AD\uC81C",
  loading: "\uB85C\uB529 \uC911...",
  noCoupon: "\uCFE0\uD3F0 \uC5C6\uC74C",
  nameEmpty: "\uC774\uB984\uC744 \uAE30\uC785\uD574\uC8FC\uC138\uC694",
  addContact: "\uC0C8 \uC5F0\uB77D\uCC98 \uCD94\uAC00",
  telInvalid: "\uC798\uBABB\uB41C \uC804\uD654\uBC88\uD638",
  vanCalendar: {
    end: "\uB05D",
    start: "\uC2DC\uC791",
    title: "\uB2EC\uB825",
    weekdays: [
      "\uC77C\uC694\uC77C",
      "\uC6D4\uC694\uC77C",
      "\uD654\uC694\uC77C",
      "\uC218\uC694\uC77C",
      "\uBAA9\uC694\uC77C",
      "\uAE08\uC694\uC77C",
      "\uD1A0\uC694\uC77C"
    ],
    monthTitle: (year, month) => `${year}/${month}`,
    rangePrompt: (maxRange) => `${maxRange} \uC77C \uC774\uB0B4\uB85C \uC120\uD0DD`
  },
  vanCascader: {
    select: "\uC120\uD0DD\uD558\uB2E4"
  },
  vanPagination: {
    prev: "\uC774\uC804\uC758",
    next: "\uB2E4\uC74C"
  },
  vanPullRefresh: {
    pulling: "\uB2F9\uACA8\uC11C \uC0C8\uB85C\uACE0\uCE68...",
    loosing: "\uC0C8\uB85C \uACE0\uCE68..."
  },
  vanSubmitBar: {
    label: "\uCD1D:"
  },
  vanCoupon: {
    unlimited: "\uC81C\uD55C \uC5C6\uB294",
    discount: (discount) => `${discount * 10}% \uD560\uC778`,
    condition: (condition) => `\uCD5C\uC18C ${condition}`
  },
  vanCouponCell: {
    title: "\uCFE0\uD3F0",
    count: (count) => `${count} \uAC1C\uC758 \uCFE0\uD3F0\uC774 \uC788\uC2B5\uB2C8\uB2E4`
  },
  vanCouponList: {
    exchange: "\uAD50\uD658",
    close: "\uB2EB\uB2E4",
    enable: "\uC0AC\uC6A9 \uAC00\uB2A5",
    disabled: "\uC5C6\uB294",
    placeholder: "\uCFE0\uD3F0 \uCF54\uB4DC"
  },
  vanAddressEdit: {
    area: "\uC9C0\uC5ED",
    areaEmpty: "\uC811\uC218\uC9C0\uC5ED\uC744 \uC120\uD0DD\uD574\uC8FC\uC138\uC694",
    addressEmpty: "\uC8FC\uC18C\uB294 \uBE44\uC6CC\uB458 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4",
    addressDetail: "\uC8FC\uC18C",
    defaultAddress: "\uAE30\uBCF8 \uC8FC\uC18C\uB85C \uC124\uC815"
  },
  vanAddressList: {
    add: "\uC0C8 \uC8FC\uC18C \uCD94\uAC00"
  }
};
