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
  name: "\u0418\u043C\u044F",
  tel: "\u0422\u0435\u043B\u0435\u0444\u043E\u043D",
  save: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C",
  clear: "\u041F\u0440\u043E\u0437\u0440\u0430\u0447\u043D\u044B\u0439",
  cancel: "\u041E\u0442\u043C\u0435\u043D\u0430",
  confirm: "\u041F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C",
  delete: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C",
  loading: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430...",
  noCoupon: "\u041D\u0435\u0442 \u043A\u0443\u043F\u043E\u043D\u043E\u0432",
  nameEmpty: "\u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430 \u0443\u043A\u0430\u0436\u0438\u0442\u0435 \u0438\u043C\u044F",
  addContact: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u043A\u043E\u043D\u0442\u0430\u043A\u0442",
  telInvalid: "\u041D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0439 \u043D\u043E\u043C\u0435\u0440 \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u0430",
  vanCalendar: {
    end: "\u041A\u043E\u043D\u0435\u0446",
    start: "\u041D\u0430\u0447\u0430\u043B\u043E",
    title: "\u041A\u0430\u043B\u0435\u043D\u0434\u0430\u0440\u044C",
    weekdays: ["\u0412\u0421", "\u041F\u041D", "\u0412\u0422", "\u0421\u0420", "\u0427\u0422", "\u041F\u0422", "\u0421\u0411"],
    monthTitle: (year, month) => `${year}/${month}`,
    rangePrompt: (maxRange) => `\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u0431\u043E\u043B\u0435\u0435 ${maxRange} \u0434\u043D\u0435\u0439`
  },
  vanCascader: {
    select: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C"
  },
  vanPagination: {
    prev: "\u041D\u0430\u0437\u0430\u0434",
    next: "\u0412\u043F\u0435\u0440\u0435\u0434"
  },
  vanPullRefresh: {
    pulling: "\u041F\u043E\u0442\u044F\u043D\u0438\u0442\u0435 \u0434\u043B\u044F \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F...",
    loosing: "\u041E\u0442\u043F\u0443\u0441\u0442\u0438\u0442\u0435 \u0434\u043B\u044F \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0438\u044F..."
  },
  vanSubmitBar: {
    label: "\u0412\u0441\u0435\u0433\u043E:"
  },
  vanCoupon: {
    unlimited: "\u0411\u0435\u0437\u043B\u0438\u043C\u0438\u0442\u043D\u044B\u0439",
    discount: (discount) => `${discount * 10}% \u0441\u043A\u0438\u0434\u043A\u0430`,
    condition: (condition) => `\u041A\u0430\u043A \u043C\u0438\u043D\u0438\u043C\u0443\u043C ${condition}`
  },
  vanCouponCell: {
    title: "\u041A\u0443\u043F\u043E\u043D",
    count: (count) => `\u0423 \u0432\u0430\u0441 \u0435\u0441\u0442\u044C ${count} \u043A\u0443\u043F\u043E\u043D\u043E\u0432`
  },
  vanCouponList: {
    exchange: "\u041E\u0431\u043C\u0435\u043D",
    close: "\u0417\u0430\u043A\u0440\u044B\u0442\u044C",
    enable: "\u0414\u043E\u0441\u0442\u0443\u043F\u043D\u043E",
    disabled: "\u041D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u043E",
    placeholder: "\u041A\u043E\u0434 \u043A\u0443\u043F\u043E\u043D\u0430"
  },
  vanAddressEdit: {
    area: "\u041E\u0431\u043B\u0430\u0441\u0442\u044C",
    areaEmpty: "\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u0437\u043E\u043D\u0443 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438",
    addressEmpty: "\u0410\u0434\u0440\u0435\u0441 \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043F\u0443\u0441\u0442\u044B\u043C",
    addressDetail: "\u0410\u0434\u0440\u0435\u0441",
    defaultAddress: "\u0421\u0434\u0435\u043B\u0430\u0442\u044C \u0430\u0434\u0440\u0435\u0441\u043E\u043C \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E"
  },
  vanAddressList: {
    add: "\u041D\u043E\u0432\u044B\u0439 \u0430\u0434\u0440\u0435\u0441"
  }
};
