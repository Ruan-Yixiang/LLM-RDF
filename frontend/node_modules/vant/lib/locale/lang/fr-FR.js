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
  name: "Nom",
  tel: "Telephone",
  save: "Sauvegarder",
  clear: "Clair",
  cancel: "Annuler",
  confirm: "Confirmer",
  delete: "Suprimer",
  loading: "Chargement...",
  noCoupon: "Pas de coupons",
  nameEmpty: "Veuillez remplir le nom",
  addContact: "Ajouter contact",
  telInvalid: "Num\xE9ro de t\xE9l\xE9phone incorrect",
  vanCalendar: {
    end: "Fin",
    start: "D\xE9but",
    title: "Calendrier",
    weekdays: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
    monthTitle: (year, month) => `${year}/${month}`,
    rangePrompt: (maxRange) => `Choisir pas plus de ${maxRange} jours`
  },
  vanCascader: {
    select: "S\xE9lectionner"
  },
  vanPagination: {
    prev: "Pr\xE9c\xE9dent",
    next: "Suivant"
  },
  vanPullRefresh: {
    pulling: "Tirer pour actualiser ...",
    loosing: "Rel\xE2chez pour actualiser..."
  },
  vanSubmitBar: {
    label: "Total:"
  },
  vanCoupon: {
    unlimited: "Illimit\xE9",
    discount: (discount) => `${discount * 10}% de r\xE9duction`,
    condition: (condition) => `Au moins ${condition}`
  },
  vanCouponCell: {
    title: "Coupon",
    count: (count) => `Vous avez ${count} coupons`
  },
  vanCouponList: {
    exchange: "Exchange",
    close: "Fermer",
    enable: "Disponible",
    disabled: "Indisponible",
    placeholder: "Code coupon"
  },
  vanAddressEdit: {
    area: "Zone",
    areaEmpty: "Veuillez s\xE9lectionner une zone de r\xE9ception",
    addressEmpty: "L'adresse ne peut pas \xEAtre vide",
    addressDetail: "Adresse",
    defaultAddress: "D\xE9finir comme adresse par d\xE9faut"
  },
  vanAddressList: {
    add: "Ajouter une nouvelle adresse"
  }
};
