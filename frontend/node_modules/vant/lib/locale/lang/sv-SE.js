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
  name: "Namn",
  tel: "Telefon",
  save: "Spara",
  clear: "Klar",
  cancel: "Avbryt",
  confirm: "Bekr\xE4fta",
  delete: "Radera",
  loading: "Laddar...",
  noCoupon: "Inga kuponger",
  nameEmpty: "V\xE4nligen fyll i namnet",
  addContact: "L\xE4gg till kontakt",
  telInvalid: "Felformat telefonnummer",
  vanCalendar: {
    end: "Slut",
    start: "Start",
    title: "Kalender",
    weekdays: ["s\xF6n", "m\xE5n", "tis", "ons", "tors", "fre", "l\xF6r"],
    monthTitle: (year, month) => `${year}/${month}`,
    rangePrompt: (maxRange) => `V\xE4lj h\xF6gst ${maxRange} dagar`
  },
  vanCascader: {
    select: "V\xE4lj"
  },
  vanPagination: {
    prev: "F\xF6reg\xE5ende",
    next: "N\xE4sta"
  },
  vanPullRefresh: {
    pulling: "Dra f\xF6r att uppdatera...",
    loosing: "L\xF6s f\xF6r att uppdatera..."
  },
  vanSubmitBar: {
    label: "Totalt:"
  },
  vanCoupon: {
    unlimited: "Obegr\xE4nsat",
    discount: (discount) => `${discount * 10}% rabatt`,
    condition: (condition) => `Minst ${condition}`
  },
  vanCouponCell: {
    title: "Kupong",
    count: (count) => `Du har ${count} kuponger`
  },
  vanCouponList: {
    exchange: "Utbyta",
    close: "St\xE4ng",
    enable: "Tillg\xE4ngliga",
    disabled: "Inte tillg\xE4nglig",
    placeholder: "Kupongkod"
  },
  vanAddressEdit: {
    area: "Omr\xE5de",
    areaEmpty: "V\xE4lj ett mottagningsomr\xE5de",
    addressEmpty: "Adressen f\xE5r inte vara tom",
    addressDetail: "Adress",
    defaultAddress: "Ange som standardadress"
  },
  vanAddressList: {
    add: "L\xE4gg till ny adress"
  }
};
