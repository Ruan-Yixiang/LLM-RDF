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
  name: "Nome",
  tel: "Telefono",
  save: "Salva",
  clear: "Chiaro",
  cancel: "Annulla",
  confirm: "Conferma",
  delete: "Elimina",
  loading: "Caricamento in corso...",
  noCoupon: "Nessun coupon",
  nameEmpty: "Inserisci il nome",
  addContact: "Aggiungi contatto",
  telInvalid: "Numero di telefono non valido",
  vanCalendar: {
    end: "Fine",
    start: "Inizio",
    title: "Calendario",
    weekdays: ["dom", "lun", "mar", "mer", "gio", "ven", "sab"],
    monthTitle: (year, month) => `${year}/${month}`,
    rangePrompt: (maxRange) => `Scegli non pi\xF9 di ${maxRange} giorni`
  },
  vanCascader: {
    select: "Seleziona"
  },
  vanPagination: {
    prev: "Precedente",
    next: "Successivo"
  },
  vanPullRefresh: {
    pulling: "Tira per aggiornare...",
    loosing: "Rilascia per aggiornare..."
  },
  vanSubmitBar: {
    label: "Totale:"
  },
  vanCoupon: {
    unlimited: "Illimitato",
    discount: (discount) => `${discount * 10}% di sconto`,
    condition: (condition) => `Almeno ${condition}`
  },
  vanCouponCell: {
    title: "Coupon",
    count: (count) => `Hai ${count} coupon`
  },
  vanCouponList: {
    exchange: "Scambio",
    close: "Chiudi",
    enable: "Disponibile",
    disabled: "Non disponibile",
    placeholder: "Codice coupon"
  },
  vanAddressEdit: {
    area: "Area",
    areaEmpty: "Seleziona un'area di ricezione",
    addressEmpty: "L'indirizzo non pu\xF2 essere vuoto",
    addressDetail: "Indirizzo",
    defaultAddress: "Imposta come indirizzo predefinito"
  },
  vanAddressList: {
    add: "Aggiungi nuovo indirizzo"
  }
};
