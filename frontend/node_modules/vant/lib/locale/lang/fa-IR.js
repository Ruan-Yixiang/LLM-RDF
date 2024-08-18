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
  name: "\u0646\u0627\u0645",
  tel: "\u062A\u0644\u0641\u0646",
  save: "\u0630\u062E\u06CC\u0631\u0647",
  clear: "\u067E\u0627\u06A9 \u06A9\u0631\u062F\u0646",
  cancel: "\u0627\u0646\u0635\u0631\u0627\u0641",
  confirm: "\u062A\u0627\u06CC\u06CC\u062F",
  delete: "\u062D\u0630\u0641",
  loading: "\u062F\u0631 \u062D\u0627\u0644 \u0628\u0627\u0631\u06AF\u0632\u0627\u0631\u06CC ...",
  noCoupon: "\u0628\u062F\u0648\u0646 \u06A9\u0648\u067E\u0646",
  nameEmpty: "\u0644\u0637\u0641\u0627 \u0646\u0627\u0645 \u0631\u0627 \u0648\u0627\u0631\u062F \u06A9\u0646\u06CC\u062F",
  addContact: "\u0627\u0641\u0632\u0648\u062F\u0646 \u0645\u062E\u0627\u0637\u0628",
  telInvalid: "\u0634\u0645\u0627\u0631\u0647 \u062A\u0644\u0641\u0646 \u0646\u0627\u0642\u0635",
  vanCalendar: {
    end: "\u067E\u0627\u06CC\u0627\u0646",
    start: "\u0634\u0631\u0648\u0639",
    title: "\u062A\u0642\u0648\u06CC\u0645",
    weekdays: [
      "\u0634\u0646\u0628\u0647",
      "\u06CC\u06A9\u0634\u0646\u0628\u0647",
      "\u062F\u0648\u0634\u0646\u0628\u0647",
      "\u0633\u0647\u200C\u0634\u0646\u0628\u0647",
      "\u0686\u0647\u0627\u0631\u0634\u0646\u0628\u0647",
      "\u067E\u0646\u062C\u200C\u0634\u0646\u0628\u0647",
      "\u062C\u0645\u0639\u0647"
    ],
    monthTitle: (year, month) => `${year}/${month}`,
    rangePrompt: (maxRange) => `\u0628\u06CC\u0634\u062A\u0631 \u0627\u0632 ${maxRange} \u0631\u0648\u0632 \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646\u06CC\u062F`
  },
  vanCascader: {
    select: "\u0627\u0646\u062A\u062E\u0627\u0628"
  },
  vanPagination: {
    prev: "\u0642\u0628\u0644\u06CC",
    next: "\u0628\u0639\u062F\u06CC"
  },
  vanPullRefresh: {
    pulling: "\u0628\u06A9\u0634\u06CC\u062F \u062A\u0627 \u062A\u0627\u0632\u0647 \u0634\u0648\u062F ...",
    loosing: "\u0631\u0647\u0627 \u06A9\u0646\u06CC\u062F \u062A\u0627 \u062A\u0627\u0632\u0647 \u0634\u0648\u062F ..."
  },
  vanSubmitBar: {
    label: "\u0645\u062C\u0645\u0648\u0639:"
  },
  vanCoupon: {
    unlimited: "\u0646\u0627\u0645\u062D\u062F\u0648\u062F",
    discount: (discount) => `${discount * 10}% \u062A\u062E\u0641\u06CC\u0641`,
    condition: (condition) => `\u062D\u062F\u0627\u0642\u0644 ${condition}`
  },
  vanCouponCell: {
    title: "\u06A9\u0648\u067E\u0646",
    count: (count) => `\u0634\u0645\u0627 ${count} \u06A9\u0648\u067E\u0646 \u062F\u0627\u0631\u06CC\u062F`
  },
  vanCouponList: {
    exchange: "\u062A\u0628\u0627\u062F\u0644",
    close: "\u0628\u0633\u062A\u0646",
    enable: "\u0645\u0648\u062C\u0648\u062F",
    disabled: "\u0646\u0627\u0645\u0648\u062C\u0648\u062F",
    placeholder: "\u06A9\u062F \u06A9\u0648\u067E\u0646"
  },
  vanAddressEdit: {
    area: "\u0645\u062D\u062F\u0648\u062F\u0647",
    postal: "\u06A9\u062F \u067E\u0633\u062A\u06CC",
    areaEmpty: "\u0644\u0637\u0641\u0627 \u06CC\u06A9 \u0645\u0646\u0637\u0642\u0647 \u0628\u0631\u0627\u06CC \u062F\u0631\u06CC\u0627\u0641\u062A \u0627\u0646\u062A\u062E\u0627\u0628 \u06A9\u0646\u06CC\u062F",
    addressEmpty: "\u0622\u062F\u0631\u0633 \u0646\u0645\u06CC\u200C\u062A\u0648\u0627\u0646\u062F \u062E\u0627\u0644\u06CC \u0628\u0627\u0634\u062F",
    postalEmpty: "\u06A9\u062F \u067E\u0633\u062A\u06CC \u0646\u0627\u0645\u0639\u062A\u0628\u0631 \u0627\u0633\u062A",
    addressDetail: "\u0622\u062F\u0631\u0633",
    defaultAddress: "\u062A\u0646\u0638\u06CC\u0645 \u0628\u0647 \u0639\u0646\u0648\u0627\u0646 \u0622\u062F\u0631\u0633 \u067E\u06CC\u0634 \u0641\u0631\u0636"
  },
  vanAddressList: {
    add: "\u0627\u0641\u0632\u0648\u062F\u0646 \u0622\u062F\u0631\u0633 \u062C\u062F\u06CC\u062F"
  }
};
