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
export {
  stdin_default as default
};
