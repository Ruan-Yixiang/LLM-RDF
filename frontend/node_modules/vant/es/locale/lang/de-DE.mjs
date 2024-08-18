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
export {
  stdin_default as default
};
