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
export {
  stdin_default as default
};
