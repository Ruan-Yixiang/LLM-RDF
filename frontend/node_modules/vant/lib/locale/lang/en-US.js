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
  name: "Name",
  tel: "Phone",
  save: "Save",
  clear: "Clear",
  cancel: "Cancel",
  confirm: "Confirm",
  delete: "Delete",
  loading: "Loading...",
  noCoupon: "No coupons",
  nameEmpty: "Please fill in the name",
  addContact: "Add contact",
  telInvalid: "Malformed phone number",
  vanCalendar: {
    end: "End",
    start: "Start",
    title: "Calendar",
    weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    monthTitle: (year, month) => `${year}/${month}`,
    rangePrompt: (maxRange) => `Choose no more than ${maxRange} days`
  },
  vanCascader: {
    select: "Select"
  },
  vanPagination: {
    prev: "Previous",
    next: "Next"
  },
  vanPullRefresh: {
    pulling: "Pull to refresh...",
    loosing: "Loose to refresh..."
  },
  vanSubmitBar: {
    label: "Total:"
  },
  vanCoupon: {
    unlimited: "Unlimited",
    discount: (discount) => `${discount * 10}% off`,
    condition: (condition) => `At least ${condition}`
  },
  vanCouponCell: {
    title: "Coupon",
    count: (count) => `You have ${count} coupons`
  },
  vanCouponList: {
    exchange: "Exchange",
    close: "Close",
    enable: "Available",
    disabled: "Unavailable",
    placeholder: "Coupon code"
  },
  vanAddressEdit: {
    area: "Area",
    areaEmpty: "Please select a receiving area",
    addressEmpty: "Address can not be empty",
    addressDetail: "Address",
    defaultAddress: "Set as the default address"
  },
  vanAddressList: {
    add: "Add new address"
  }
};
