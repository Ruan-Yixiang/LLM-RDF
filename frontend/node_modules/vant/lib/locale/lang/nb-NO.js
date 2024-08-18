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
  name: "Navn",
  tel: "Telefon",
  save: "Lagre",
  clear: "Klar",
  cancel: "Avbryt",
  confirm: "Bekreft",
  delete: "Slett",
  loading: "Laster...",
  noCoupon: "Ingen kuponger",
  nameEmpty: "Vennligst fyll inn navn",
  addContact: "Legg til ny kontakt",
  telInvalid: "Ugyldig telefonnummer",
  vanCalendar: {
    end: "Slutt",
    start: "Start",
    title: "Kalendar",
    weekdays: ["S\xF8n", "Man", "Tir", "Ons", "Tor", "Fre", "L\xF8r"],
    monthTitle: (year, month) => `${year}/${month}`,
    rangePrompt: (maxRange) => `Maks. ${maxRange} dager`
  },
  vanCascader: {
    select: "Plukke ut"
  },
  vanPagination: {
    prev: "Forrige",
    next: "Neste"
  },
  vanPullRefresh: {
    pulling: "Dra for oppdatering...",
    loosing: "Mist for oppdatering..."
  },
  vanSubmitBar: {
    label: "Totalt:"
  },
  vanCoupon: {
    unlimited: "Uendelig",
    discount: (discount) => `${discount * 10}% avslag`,
    condition: (condition) => `Minst ${condition}`
  },
  vanCouponCell: {
    title: "Kupong",
    count: (count) => `Du har ${count} kuponger`
  },
  vanCouponList: {
    exchange: "Bytte",
    close: "Lukk",
    enable: "Tilgjengelig",
    disabled: "Utilgjengelig",
    placeholder: "Kupong kode"
  },
  vanAddressEdit: {
    area: "Omr\xE5de",
    areaEmpty: "Vennligst fyll inn omr\xE5de",
    addressEmpty: "Addresse kan ikke v\xE6re tomt",
    addressDetail: "Adresse",
    defaultAddress: "Sett som standard adresse"
  },
  vanAddressList: {
    add: "Legg til ny adresse"
  }
};
