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
  name: "naam",
  tel: "Telefoon",
  save: "Opslaan",
  clear: "Duidelijk",
  cancel: "Annuleren",
  confirm: "Bevestigen",
  delete: "Verwijderen",
  loading: "Bezig met laden...",
  noCoupon: "Geen coupons",
  nameEmpty: "Vul de naam in",
  addContact: "Contact toevoegen",
  telInvalid: "Onjuist opgemaakt telefoonnummer",
  vanCalendar: {
    end: "Einde",
    start: "Beginnen",
    title: "Kalender",
    weekdays: ["Zon", "Maan", "Dins", "Woens", "Donder", "Vrij", "Zater"],
    monthTitle: (year, month) => `${year}/${month}`,
    rangePrompt: (maxRange) => `Kies niet meer dan ${maxRange} dagen`
  },
  vanCascader: {
    select: "Selecteer"
  },
  vanPagination: {
    prev: "Vorige",
    next: "Volgende"
  },
  vanPullRefresh: {
    pulling: "Trekken om te vernieuwen...",
    loosing: "Los om te verversen..."
  },
  vanSubmitBar: {
    label: "Totaal:"
  },
  vanCoupon: {
    unlimited: "Onbeperkt",
    discount: (discount) => `${discount * 10}% korting`,
    condition: (condition) => `Ten minste ${condition}`
  },
  vanCouponCell: {
    title: "Waardebon",
    count: (count) => `Je hebt ${count} coupons`
  },
  vanCouponList: {
    exchange: "Uitwisselen",
    close: "Sluiten",
    enable: "Beschikbaar",
    disabled: "Niet beschikbaar",
    placeholder: "Couponcode"
  },
  vanAddressEdit: {
    area: "Gebied",
    areaEmpty: "Selecteer een ontvangstgebied",
    addressEmpty: "Adres mag niet leeg zijn",
    addressDetail: "Adres",
    defaultAddress: "Instellen als standaardadres"
  },
  vanAddressList: {
    add: "Nieuw adres toevoegen"
  }
};
