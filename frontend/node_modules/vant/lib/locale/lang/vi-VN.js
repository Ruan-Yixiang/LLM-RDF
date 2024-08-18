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
  name: "t\xEAn",
  tel: "\u0110i\u1EC7n tho\u1EA1i",
  save: "C\u1EE9u",
  clear: "Th\xF4ng tho\xE1ng",
  cancel: "H\u1EE7y b\u1ECF",
  confirm: "X\xE1c nh\u1EADn",
  delete: "X\xF3a",
  loading: "\u0110ang t\u1EA3i ...",
  noCoupon: "Kh\xF4ng c\xF3 phi\u1EBFu gi\u1EA3m gi\xE1",
  nameEmpty: "Vui l\xF2ng \u0111i\u1EC1n v\xE0o t\xEAn",
  addContact: "Th\xEAm li\xEAn h\u1EC7",
  telInvalid: "S\u1ED1 \u0111i\u1EC7n tho\u1EA1i kh\xF4ng \u0111\xFAng \u0111\u1ECBnh d\u1EA1ng",
  vanCalendar: {
    end: "K\u1EBFt th\xFAc",
    start: "B\u1EAFt \u200B\u200B\u0111\u1EA7u",
    title: "L\u1ECBch",
    weekdays: [
      "ch\u1EE7 nh\u1EADt",
      "th\u1EE9 hai",
      "th\u1EE9 ba",
      "Th\u1EE9 T\u01B0",
      "Th\u1EE9 n\u0103m",
      "Th\u1EE9 s\xE1u",
      "th\u1EE9 b\u1EA3y"
    ],
    monthTitle: (year, month) => `${year}/${month}`,
    rangePrompt: (maxRange) => `Ch\u1ECDn kh\xF4ng qu\xE1 ${maxRange} ng\xE0y`
  },
  vanCascader: {
    select: "Ch\u1ECDn"
  },
  vanPagination: {
    prev: "Tr\u01B0\u1EDBc \u0111\xF3",
    next: "Ti\u1EBFp theo"
  },
  vanPullRefresh: {
    pulling: "K\xE9o \u0111\u1EC3 l\xE0m m\u1EDBi ...",
    loosing: "Loose \u0111\u1EC3 l\xE0m m\u1EDBi ..."
  },
  vanSubmitBar: {
    label: "T\u1ED5ng:"
  },
  vanCoupon: {
    unlimited: "Kh\xF4ng gi\u1EDBi h\u1EA1n",
    discount: (discount) => `Chi\u1EBFt kh\u1EA5u ${discount * 10}%`,
    condition: (condition) => `\xCDt nh\u1EA5t ${condition}`
  },
  vanCouponCell: {
    title: "Phi\u1EBFu gi\u1EA3m gi\xE1",
    count: (count) => `B\u1EA1n c\xF3 ${count} phi\u1EBFu gi\u1EA3m gi\xE1`
  },
  vanCouponList: {
    exchange: "Trao \u0111\u1ED5i",
    close: "\u0110\xF3ng",
    enable: "C\xF3 s\u1EB5n",
    disabled: "Kh\xF4ng kh\u1EA3 d\u1EE5ng",
    placeholder: "M\xE3 phi\u1EBFu th\u01B0\u1EDFng"
  },
  vanAddressEdit: {
    area: "Khu v\u1EF1c",
    areaEmpty: "Vui l\xF2ng ch\u1ECDn khu v\u1EF1c nh\u1EADn h\xE0ng",
    addressEmpty: "\u0110\u1ECBa ch\u1EC9 kh\xF4ng \u0111\u01B0\u1EE3c \u0111\u1EC3 tr\u1ED1ng",
    addressDetail: "\u0110\u1ECBa ch\u1EC9",
    defaultAddress: "\u0110\u1EB7t l\xE0m \u0111\u1ECBa ch\u1EC9 m\u1EB7c \u0111\u1ECBnh"
  },
  vanAddressList: {
    add: "Th\xEAm \u0111\u1ECBa ch\u1EC9 m\u1EDBi"
  }
};
