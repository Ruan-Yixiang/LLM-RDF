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
  name: "\u0418\u043C\u0435",
  tel: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D",
  save: "\u0417\u0430\u043F\u0430\u0437\u0432\u0430\u043D\u0435",
  clear: "\u044F\u0441\u043D\u043E",
  cancel: "\u041E\u0442\u043A\u0430\u0437",
  confirm: "\u041F\u043E\u0442\u0432\u044A\u0440\u0434\u0438",
  delete: "\u0418\u0437\u0442\u0440\u0438\u0432\u0430\u043D\u0435",
  loading: "\u0417\u0430\u0440\u0435\u0436\u0434\u0430\u043D\u0435...",
  noCoupon: "\u0411\u0435\u0437 \u043A\u0443\u043F\u043E\u043D\u0438",
  nameEmpty: "\u041C\u043E\u043B\u044F, \u043F\u043E\u043F\u044A\u043B\u043D\u0435\u0442\u0435 \u0438\u043C\u0435\u0442\u043E",
  addContact: "\u0414\u043E\u0431\u0430\u0432\u044F\u043D\u0435 \u043D\u0430 \u043A\u043E\u043D\u0442\u0430\u043A\u0442",
  telInvalid: "\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u043D\u043E \u0444\u043E\u0440\u043C\u0438\u0440\u0430\u043D \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0435\u043D \u043D\u043E\u043C\u0435\u0440",
  vanCalendar: {
    end: "\u041A\u0440\u0430\u0439",
    start: "\u0421\u0442\u0430\u0440\u0442",
    title: "\u041A\u0430\u043B\u0435\u043D\u0434\u0430\u0440",
    weekdays: [
      "\u043D\u0435\u0434\u0435\u043B\u044F",
      "\u043F\u043E\u043D\u0435\u0434\u0435\u043B\u043D\u0438\u043A",
      "\u0432\u0442\u043E\u0440\u043D\u0438\u043A",
      "\u0441\u0440\u044F\u0434\u0430",
      "\u0447\u0435\u0442\u0432\u044A\u0440\u0442\u044A\u043A",
      "\u043F\u0435\u0442\u044A\u043A",
      "\u0441\u044A\u0431\u043E\u0442\u0430"
    ],
    monthTitle: (year, month) => `${year}/${month}`,
    rangePrompt: (maxRange) => `\u0418\u0437\u0431\u0435\u0440\u0435\u0442\u0435 \u043D\u0435 \u043F\u043E\u0432\u0435\u0447\u0435 \u043E\u0442 ${maxRange} \u0434\u043D\u0438`
  },
  vanCascader: {
    select: "\u0418\u0437\u0431\u043E\u0440"
  },
  vanPagination: {
    prev: "\u041F\u0440\u0435\u0434\u0438\u0448\u043D\u0430",
    next: "\u041D\u0430\u043F\u0440\u0435\u0434"
  },
  vanPullRefresh: {
    pulling: "\u0418\u0437\u0434\u044A\u0440\u043F\u0430\u0439\u0442\u0435 \u0437\u0430 \u043E\u043F\u0440\u0435\u0441\u043D\u044F\u0432\u0430\u043D\u0435...",
    loosing: "\u0420\u0430\u0437\u0445\u043B\u0430\u0431\u0435\u043D \u0437\u0430 \u043E\u043F\u0440\u0435\u0441\u043D\u044F\u0432\u0430\u043D\u0435..."
  },
  vanSubmitBar: {
    label: "\u041E\u0431\u0449\u043E:"
  },
  vanCoupon: {
    unlimited: "\u041D\u0435\u043E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D",
    discount: (discount) => `${discount * 10}% \u043E\u0442\u0441\u0442\u044A\u043F\u043A\u0430`,
    condition: (condition) => `\u041F\u043E\u043D\u0435 ${condition}`
  },
  vanCouponCell: {
    title: "\u041A\u0443\u043F\u043E\u043D",
    count: (count) => `\u0418\u043C\u0430\u0442\u0435 ${count} \u043A\u0443\u043F\u043E\u043D\u0438`
  },
  vanCouponList: {
    exchange: "\u0420\u0430\u0437\u043C\u044F\u043D\u0430",
    close: "\u0417\u0430\u0442\u0432\u043E\u0440\u0438",
    enable: "\u041D\u0430\u043B\u0438\u0447\u043D\u043E",
    disabled: "\u041D\u0435\u0434\u043E\u0441\u0442\u044A\u043F\u043D\u043E",
    placeholder: "\u041A\u043E\u0434 \u043D\u0430 \u043A\u0443\u043F\u043E\u043D"
  },
  vanAddressEdit: {
    area: "\u041F\u043B\u043E\u0449",
    postal: "\u041F\u043E\u0449\u0435\u043D\u0441\u043A\u0438",
    areaEmpty: "\u041C\u043E\u043B\u044F, \u0438\u0437\u0431\u0435\u0440\u0435\u0442\u0435 \u0437\u043E\u043D\u0430 \u0437\u0430 \u043F\u043E\u043B\u0443\u0447\u0430\u0432\u0430\u043D\u0435",
    addressEmpty: "\u0410\u0434\u0440\u0435\u0441\u044A\u0442 \u043D\u0435 \u043C\u043E\u0436\u0435 \u0434\u0430 \u0431\u044A\u0434\u0435 \u043F\u0440\u0430\u0437\u0435\u043D",
    postalEmpty: "\u0413\u0440\u0435\u0448\u0435\u043D \u043F\u043E\u0449\u0435\u043D\u0441\u043A\u0438 \u043A\u043E\u0434",
    addressDetail: "\u0410\u0434\u0440\u0435\u0441",
    defaultAddress: "\u0417\u0430\u0434\u0430\u0432\u0430\u043D\u0435 \u043A\u0430\u0442\u043E \u0430\u0434\u0440\u0435\u0441 \u043F\u043E \u043F\u043E\u0434\u0440\u0430\u0437\u0431\u0438\u0440\u0430\u043D\u0435"
  },
  vanAddressList: {
    add: "\u0414\u043E\u0431\u0430\u0432\u044F\u043D\u0435 \u043D\u0430 \u043D\u043E\u0432 \u0430\u0434\u0440\u0435\u0441"
  }
};
