var stdin_default = {
  name: "\u59D3\u540D",
  tel: "\u96FB\u8A71",
  save: "\u5132\u5B58",
  clear: "\u6E05\u7A7A",
  cancel: "\u53D6\u6D88",
  confirm: "\u78BA\u8A8D",
  delete: "\u522A\u9664",
  loading: "\u8F09\u5165\u4E2D...",
  noCoupon: "\u66AB\u7121\u512A\u60E0\u5238",
  nameEmpty: "\u8ACB\u586B\u5BEB\u59D3\u540D",
  addContact: "\u5EFA\u7ACB\u806F\u7D61\u4EBA",
  telInvalid: "\u8ACB\u586B\u5BEB\u6B63\u78BA\u7684\u96FB\u8A71",
  vanCalendar: {
    end: "\u7D50\u675F",
    start: "\u958B\u59CB",
    title: "\u65E5\u671F\u9078\u64C7",
    weekdays: ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D"],
    monthTitle: (year, month) => `${year}\u5E74${month}\u6708`,
    rangePrompt: (maxRange) => `\u6700\u591A\u9078\u64C7 ${maxRange} \u5929`
  },
  vanCascader: {
    select: "\u8ACB\u9078\u64C7"
  },
  vanPagination: {
    prev: "\u4E0A\u4E00\u9801",
    next: "\u4E0B\u4E00\u9801"
  },
  vanPullRefresh: {
    pulling: "\u4E0B\u62C9\u5373\u53EF\u5237\u65B0...",
    loosing: "\u91CB\u653E\u5373\u53EF\u5237\u65B0..."
  },
  vanSubmitBar: {
    label: "\u5408\u8A08:"
  },
  vanCoupon: {
    unlimited: "\u7121\u9580\u6ABB",
    discount: (discount) => `${discount}\u6298`,
    condition: (condition) => `\u6EFF${condition}\u5143\u53EF\u7528`
  },
  vanCouponCell: {
    title: "\u512A\u60E0\u5238",
    count: (count) => `${count}\u5F35\u53EF\u7528`
  },
  vanCouponList: {
    exchange: "\u514C\u63DB",
    close: "\u4E0D\u4F7F\u7528",
    enable: "\u53EF\u4F7F\u7528\u512A\u60E0\u5238",
    disabled: "\u4E0D\u53EF\u4F7F\u7528\u512A\u60E0\u5238",
    placeholder: "\u8F38\u5165\u512A\u60E0\u4EE3\u78BC"
  },
  vanAddressEdit: {
    area: "\u5730\u5340",
    areaEmpty: "\u8ACB\u9078\u64C7\u5730\u5340",
    addressEmpty: "\u8ACB\u586B\u5BEB\u8A73\u7D30\u5730\u5740",
    addressDetail: "\u8A73\u7D30\u5730\u5740",
    defaultAddress: "\u8A2D\u70BA\u9810\u8A2D\u6536\u8CA8\u5730\u5740"
  },
  vanAddressList: {
    add: "\u65B0\u589E\u5730\u5740"
  }
};
export {
  stdin_default as default
};
