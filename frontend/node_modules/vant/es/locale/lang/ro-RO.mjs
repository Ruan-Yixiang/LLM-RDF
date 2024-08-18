var stdin_default = {
  name: "Nume",
  tel: "Telefon",
  save: "Salveaz\u0103",
  clear: "Clar",
  cancel: "Anuleaz\u0103",
  confirm: "Confirm\u0103",
  delete: "\u0218terge",
  loading: "\xCEnc\u0103rcare...",
  noCoupon: "F\u0103r\u0103 cupoane",
  nameEmpty: "Te rug\u0103m s\u0103 completezi numele",
  addContact: "Adaug\u0103 contact nou",
  telInvalid: "Num\u0103r de telefon invalid",
  vanCalendar: {
    end: "Sf\xE2r\u0219it",
    start: "\xCEnceput",
    title: "Calendar",
    weekdays: ["Dum", "Lun", "Mar", "Mie", "Joi", "Vin", "S\xE2m"],
    monthTitle: (year, month) => `${year}/${month}`,
    rangePrompt: (maxRange) => `Alege maxim ${maxRange} zile`
  },
  vanCascader: {
    select: "Selecta\u021Bi"
  },
  vanPagination: {
    prev: "Precedenta",
    next: "Urmatoarea"
  },
  vanPullRefresh: {
    pulling: "Trage pentru a da \xEEmprosp\u0103ta...",
    loosing: "Elibereaz\u0103 pentru a \xEEmprosp\u0103ta..."
  },
  vanSubmitBar: {
    label: "Total:"
  },
  vanCoupon: {
    unlimited: "Nelimitat",
    discount: (discount) => `${discount * 10}% discount`,
    condition: (condition) => `Cel pu\u021Bin ${condition}`
  },
  vanCouponCell: {
    title: "Cupon",
    count: (count) => `Ai ${count} cupoane`
  },
  vanCouponList: {
    exchange: "Schimb\u0103",
    close: "\xCEnchide",
    enable: "Disponibil",
    disabled: "Indisponibil",
    placeholder: "Cod cupon"
  },
  vanAddressEdit: {
    area: "Zon\u0103",
    areaEmpty: "Te rug\u0103m sa selectezi o zona de primire",
    addressEmpty: "Adresa nu poate fi goal\u0103",
    addressDetail: "Adres\u0103",
    defaultAddress: "Seteaz\u0103 ca adres\u0103 de pornire"
  },
  vanAddressList: {
    add: "Adaug\u0103 adres\u0103 nou\u0103"
  }
};
export {
  stdin_default as default
};
