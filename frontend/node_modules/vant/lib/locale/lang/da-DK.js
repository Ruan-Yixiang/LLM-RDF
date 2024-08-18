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
  name: "navn",
  tel: "Telefon",
  save: "Gem",
  clear: "Klar",
  cancel: "Annuller",
  confirm: "Bekr\xE6ft",
  delete: "Slet",
  loading: "Indl\xE6ser...",
  noCoupon: "Ingen kuponer",
  nameEmpty: "Fyld venligst navnet",
  addContact: "Tilf\xF8j kontakt",
  telInvalid: "Forkert telefonnummer",
  vanCalendar: {
    end: "Ende",
    start: "Start",
    title: "Kalender",
    weekdays: ["S\xF8n", "Man", "tirs", "ons", "tors", "Fre", "l\xF8r"],
    monthTitle: (year, month) => `${year}/${month}`,
    rangePrompt: (maxRange) => `V\xE6lg ikke mere end ${maxRange} dage`
  },
  vanCascader: {
    select: "V\xE6lg"
  },
  vanPagination: {
    prev: "Forrige",
    next: "N\xE6ste"
  },
  vanPullRefresh: {
    pulling: "Tr\xE6k for at opdatere...",
    loosing: "L\xF8s for at opdatere..."
  },
  vanSubmitBar: {
    label: "I alt:"
  },
  vanCoupon: {
    unlimited: "Ubegr\xE6nset",
    discount: (discount) => `${discount * 10}% rabat`,
    condition: (condition) => `Mindst ${condition}`
  },
  vanCouponCell: {
    title: "Kupon",
    count: (count) => `Du har ${count} kuponer`
  },
  vanCouponList: {
    exchange: "Udveksling",
    close: "Luk",
    enable: "Ledig",
    disabled: "Utilg\xE6ngelig",
    placeholder: "Kuponkode"
  },
  vanAddressEdit: {
    area: "ArOmr\xE5deea",
    postal: "Post",
    areaEmpty: "V\xE6lg venligst et modtageomr\xE5de",
    addressEmpty: "Adressen m\xE5 ikke v\xE6re tom",
    postalEmpty: "Forkert postnummer",
    addressDetail: "Adresse",
    defaultAddress: "S\xE6t som standardadresse"
  },
  vanAddressList: {
    add: "Tilf\xF8j ny adresse"
  }
};
