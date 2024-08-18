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
  tel: "Telefon",
  save: "Speichern",
  clear: "Klar",
  cancel: "Abbrechen",
  confirm: "Best\xE4tigen",
  delete: "L\xF6schen",
  loading: "Laden...",
  noCoupon: "Keine Coupons",
  nameEmpty: "Bitte den Name angeben",
  addContact: "Neuen Kontakt hinzuf\xFCgen",
  telInvalid: "Ung\xFCltige Telefonnummer",
  vanCalendar: {
    end: "Ende",
    start: "Start",
    title: "Kalender",
    weekdays: ["So", "Mo", "Di", "Mo", "Do", "Fr", "Sa"],
    monthTitle: (year, month) => `${year}/${month}`,
    rangePrompt: (maxRange) => `W\xE4hle nicht mehr als ${maxRange} Tage`
  },
  vanCascader: {
    select: "W\xE4hlen"
  },
  vanPagination: {
    prev: "Vorherige",
    next: "N\xE4chste"
  },
  vanPullRefresh: {
    pulling: "Zum Aktualisieren herunterziehen...",
    loosing: "Loslassen zum Aktualisieren..."
  },
  vanSubmitBar: {
    label: "Total:"
  },
  vanCoupon: {
    unlimited: "Unbegrenzt",
    discount: (discount) => `${discount * 10}% Rabatt`,
    condition: (condition) => `Mindestens ${condition}`
  },
  vanCouponCell: {
    title: "Coupon",
    count: (count) => `Du hast ${count} Coupons`
  },
  vanCouponList: {
    exchange: "Austauschen",
    close: "Schlie\xDFen",
    enable: "Verf\xFCgbar",
    disabled: "Nicht verf\xFCgbar",
    placeholder: "Couponcode"
  },
  vanAddressEdit: {
    area: "Standort",
    areaEmpty: "Bitte deinen Ort angeben",
    addressEmpty: "Adresse darf nicht leer sein",
    addressDetail: "Adresse",
    defaultAddress: "Als Standardadresse festgelegen"
  },
  vanAddressList: {
    add: "Neue Adresse hinzuf\xFCgen"
  }
};
