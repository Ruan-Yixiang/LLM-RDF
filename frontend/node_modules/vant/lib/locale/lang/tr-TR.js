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
  name: "\u0130sim",
  tel: "Telefon",
  save: "Kaydet",
  clear: "Temizlemek",
  cancel: "\u0130ptal",
  confirm: "Onayla",
  delete: "Sil",
  loading: "Y\xFCkleniyor...",
  noCoupon: "Kupon yok",
  nameEmpty: "L\xFCtfen isim giriniz",
  addContact: "Yeni ki\u015Fi ekle",
  telInvalid: "Ge\xE7ersiz tel. numaras\u0131",
  vanCalendar: {
    end: "Son",
    start: "Ba\u015Flat",
    title: "Takvim",
    weekdays: ["Paz", "Pzt", "Sal", "\xC7ar", "Per", "Cum", "Cmt"],
    monthTitle: (year, month) => `${year}/${month}`,
    rangePrompt: (maxRange) => `En fazla ${maxRange} g\xFCn se\xE7in`
  },
  vanCascader: {
    select: "Se\xE7iniz"
  },
  vanPagination: {
    prev: "\xD6nceki",
    next: "Sonraki"
  },
  vanPullRefresh: {
    pulling: "Yenilemek i\xE7in \xE7ekin...",
    loosing: "Yenilemek i\xE7in b\u0131rak\u0131n..."
  },
  vanSubmitBar: {
    label: "Toplam:"
  },
  vanCoupon: {
    unlimited: "S\u0131n\u0131rs\u0131z",
    discount: (discount) => `%${discount * 10} indirim`,
    condition: (condition) => `En az ${condition}`
  },
  vanCouponCell: {
    title: "Kupon",
    count: (count) => `${count} adet teklif var`
  },
  vanCouponList: {
    exchange: "Takas",
    close: "Kapat",
    enable: "Mevcut",
    disabled: "Mevcut de\u011Fil",
    placeholder: "Kupon kodu"
  },
  vanAddressEdit: {
    area: "Alan",
    areaEmpty: "L\xFCtfen al\u0131c\u0131 alan\u0131n\u0131 se\xE7in",
    addressEmpty: "Adres bo\u015F olamaz!",
    addressDetail: "Adres",
    defaultAddress: "Varsay\u0131lan adres olarak ayarla"
  },
  vanAddressList: {
    add: "Yeni adres ekle"
  }
};
