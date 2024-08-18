var stdin_default = {
  name: "Nafn",
  tel: "S\xEDmi",
  save: "Vista",
  clear: "Hreinsa",
  cancel: "h\xE6tta vi\xF0",
  confirm: "Sta\xF0festa",
  delete: "Ey\xF0a",
  loading: "Hle\xF0ur...",
  noCoupon: "Engin afsl\xE1ttarmi\xF0a",
  nameEmpty: "Vinsamlegast fylltu \xFAt nafn",
  addContact: "B\xE6ta vi\xF0 tengili\xF0",
  telInvalid: "Ganga\xF0 s\xEDman\xFAmer",
  vanCalendar: {
    end: "Enda",
    start: "Byrja",
    title: "Dagatal",
    weekdays: [
      "sunnudag",
      "M\xE1nudagur",
      "\xFEri\xF0judag",
      "mi\xF0vikudag",
      "fimmtudag",
      "f\xF6studag",
      "laugardag"
    ],
    monthTitle: (year, month) => `${year}/${month}`,
    rangePrompt: (maxRange) => `Veldu ekki fleiri en ${maxRange} daga`
  },
  vanCascader: {
    select: "Velja"
  },
  vanPagination: {
    prev: "Fyrri",
    next: "N\xE6st"
  },
  vanPullRefresh: {
    pulling: "Dreg\xF0u til a\xF0 endurn\xFDja...",
    loosing: "Loose to refresh..."
  },
  vanSubmitBar: {
    label: "Samtals:"
  },
  vanCoupon: {
    unlimited: "\xD3takmarka\xF0",
    discount: (discount) => `${discount * 10}% afsl\xE1ttur`,
    condition: (condition) => `A\xF0 minnsta kosti ${condition}`
  },
  vanCouponCell: {
    title: "Afsl\xE1ttarmi\xF0i",
    count: (count) => `\xDE\xFA \xE1tt ${count} afsl\xE1ttarmi\xF0a`
  },
  vanCouponList: {
    exchange: "Skipti",
    close: "Loka",
    enable: "Laus",
    disabled: "\xD3tilt\xE6kt",
    placeholder: "Afsl\xE1ttarmi\xF0ak\xF3\xF0i"
  },
  vanAddressEdit: {
    area: "Sv\xE6\xF0i",
    areaEmpty: "Vinsamlega veldu m\xF3tt\xF6kusv\xE6\xF0i",
    addressEmpty: "Heimilisfang m\xE1 ekki vera t\xF3mt",
    addressDetail: "Heimilisfang",
    defaultAddress: "Setja sem sj\xE1lfgefi\xF0 heimilisfang"
  },
  vanAddressList: {
    add: "B\xE6ta vi\xF0 n\xFDju heimilisfangi"
  }
};
export {
  stdin_default as default
};
