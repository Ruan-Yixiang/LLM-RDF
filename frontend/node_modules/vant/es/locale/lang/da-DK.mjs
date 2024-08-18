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
export {
  stdin_default as default
};
