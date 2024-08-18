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
  name: "Nomo",
  tel: "Telefonnumero",
  save: "Konservi",
  clear: "Klara",
  cancel: "Rezigni",
  confirm: "Konfirmi",
  delete: "Forigi",
  loading: "Bonvolu atendi...",
  noCoupon: "Neniu kupono",
  nameEmpty: "Plenigu la nomon",
  addContact: "Aldoni kontakton",
  telInvalid: "Nevalida telefonnumero",
  vanCalendar: {
    end: "Fino",
    start: "Komenco",
    title: "Kalendaro",
    weekdays: ["Dim", "Lun", "Mar", "Mer", "\u0134a\u016D", "Ven", "Sab"],
    monthTitle: (year, month) => `${year}/${month}`,
    rangePrompt: (maxRange) => `Elektu maksimume ${maxRange} tagojn`
  },
  vanCascader: {
    select: "Elekti"
  },
  vanPagination: {
    prev: "Anta\u016Da",
    next: "Sekva"
  },
  vanPullRefresh: {
    pulling: "Tiri por refre\u015Digi...",
    loosing: "Lasi por refre\u015Digi..."
  },
  vanSubmitBar: {
    label: "Sumo:"
  },
  vanCoupon: {
    unlimited: "Senlima",
    discount: (discount) => `${discount * 10}%-a rabato`,
    condition: (condition) => `Minimume ${condition}`
  },
  vanCouponCell: {
    title: "Kupono",
    count: (count) => `Vi havas ${count} kuponojn`
  },
  vanCouponList: {
    exchange: "Inter\u015Dan\u011Di",
    close: "Fermi",
    enable: "Disponebla",
    disabled: "Nedisponebla",
    placeholder: "Kupon-kodo"
  },
  vanAddressEdit: {
    area: "Areo",
    areaEmpty: "Elektu ricevan areon",
    addressEmpty: "La adreso ne povas esti malplena",
    addressDetail: "Adreso",
    defaultAddress: "Agordi kiel defa\u016Dltan adreson"
  },
  vanAddressList: {
    add: "Aldoni novan adreson"
  }
};
