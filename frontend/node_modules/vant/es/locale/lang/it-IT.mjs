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
export {
  stdin_default as default
};
