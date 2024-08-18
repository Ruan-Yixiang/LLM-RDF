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
  name: "\u041D\u044D\u0440",
  tel: "\u0423\u0442\u0430\u0441",
  save: "\u0425\u0430\u0434\u0433\u0430\u043B\u0430\u0445",
  clear: "\u0422\u043E\u0434\u043E\u0440\u0445\u043E\u0439",
  cancel: "\u0426\u0443\u0446\u043B\u0430\u0445",
  confirm: "\u0411\u0430\u0442\u0430\u043B\u0433\u0430\u0430\u0436\u0443\u0443\u043B\u0430\u0445",
  delete: "\u0423\u0441\u0442\u0433\u0430\u0445",
  loading: "\u0410\u0447\u0430\u0430\u0436 \u0431\u0430\u0439\u043D\u0430...",
  noCoupon: "\u041A\u0443\u043F\u043E\u043D \u0431\u0430\u0439\u0445\u0433\u04AF\u0439",
  nameEmpaty: "\u041D\u044D\u0440\u044D\u044D \u043E\u0440\u0443\u0443\u043B\u043D\u0430 \u0443\u0443",
  addContact: "\u0425\u0430\u0440\u0438\u043B\u0446\u0430\u0433\u0447 \u043D\u044D\u043C\u044D\u0445",
  telInvalid: "\u0413\u0430\u0437\u0430\u0440 \u0443\u0442\u0430\u0441\u043D\u044B \u0434\u0443\u0433\u0430\u0430\u0440",
  vanCalendar: {
    end: "\u0422\u04E9\u0433\u0441\u0433\u04E9\u043B",
    start: "\u042D\u0445\u043B\u044D\u0445",
    title: "\u0425\u0443\u0430\u043D\u043B\u0438",
    weekdays: ["\u041D\u044F\u043C", "\u0414\u0430\u0432\u0430\u0430", "\u041C\u044F\u0433\u043C\u0430\u0440", "\u041B\u0445\u0430\u0433\u0432\u0430", "\u041F\u04AF\u0440\u044D\u0432", "\u0411\u0430\u0430\u0441\u0430\u043D", "\u0411\u044F\u043C\u0431\u0430"],
    monthTitle: (year, month) => `${year}/${month}`,
    rangePrompt: (maxRange) => `${maxRange} \u0445\u043E\u043D\u043E\u0433\u043E\u043E\u0441 \u0438\u043B\u04AF\u04AF\u0433\u04AF\u0439 \u0441\u043E\u043D\u0433\u043E\u0445`
  },
  vanCascader: {
    select: "\u0421\u043E\u043D\u0433\u043E\u0445"
  },
  vanPagination: {
    prev: "\u04E8\u043C\u043D\u04E9\u0445",
    next: "\u0414\u0430\u0440\u0430\u0430\u0433\u0438\u0439\u043D"
  },
  vanPullRefresh: {
    pulling: "\u0421\u044D\u0440\u0433\u044D\u044D\u0445\u0438\u0439\u043D \u0442\u0443\u043B\u0434 \u0442\u0430\u0442\u0430\u0445...",
    loosing: "\u0421\u044D\u0440\u0433\u044D\u044D\u0445\u0438\u0439\u043D \u0442\u0443\u043B\u0434 \u0441\u0443\u043B..."
  },
  vanSubmitBar: {
    label: "\u041D\u0438\u0439\u0442:"
  },
  vanCoupon: {
    unlimited: "\u0425\u044F\u0437\u0433\u0430\u0430\u0440\u0433\u04AF\u0439",
    discount: (discount) => `${discount * 10}% \u0445\u044F\u043C\u0434\u0440\u0430\u043B`,
    condition: (condition) => `\u0425\u0430\u043C\u0433\u0438\u0439\u043D \u0431\u0430\u0433\u0430\u0434\u0430\u0430 ${condition}`
  },
  vanCouponCell: {
    title: "\u041A\u0443\u043F\u043E\u043D",
    count: (count) => `\u0422\u0430\u043D\u0434 ${count} \u043A\u0443\u043F\u043E\u043D \u0431\u0430\u0439\u043D\u0430`
  },
  vanCouponList: {
    exchange: "\u0441\u043E\u043B\u0438\u043B\u0446\u043E\u043E",
    close: "\u0445\u0430\u0430\u0445",
    enable: "\u0411\u043E\u043B\u043E\u043C\u0436\u0442\u043E\u0439",
    disabled: "\u0411\u043E\u043B\u043E\u043C\u0436\u0433\u04AF\u0439",
    placeholder: "\u041A\u0443\u043F\u043E\u043D \u043A\u043E\u0434"
  },
  vanAddressEdit: {
    area: "\u0422\u0430\u043B\u0431\u0430\u0439",
    areaEmpty: "\u0425\u04AF\u043B\u044D\u044D\u043D \u0430\u0432\u0430\u0445 \u0431\u04AF\u0441\u044D\u044D \u0441\u043E\u043D\u0433\u043E\u043D\u043E \u0443\u0443",
    addressEmpty: "\u0425\u0430\u044F\u0433 \u0445\u043E\u043E\u0441\u043E\u043D \u0431\u0430\u0439\u0436 \u0431\u043E\u043B\u043E\u0445\u0433\u04AF\u0439",
    addressDetail: "\u0425\u0430\u044F\u0433",
    defaultAddress: "\u04E8\u0433\u04E9\u0433\u0434\u043C\u04E9\u043B \u0445\u0430\u044F\u0433\u0430\u0430\u0440 \u0442\u043E\u0445\u0438\u0440\u0443\u0443\u043B\u0430\u0445"
  },
  vanAddressList: {
    add: "\u0428\u0438\u043D\u044D \u0445\u0430\u044F\u0433 \u043D\u044D\u043C\u044D\u0445"
  }
};
