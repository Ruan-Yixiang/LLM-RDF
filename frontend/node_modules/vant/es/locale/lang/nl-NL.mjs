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
export {
  stdin_default as default
};
