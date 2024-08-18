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
  name: "Nama",
  tel: "Telepon",
  save: "Simpan",
  clear: "Jernih",
  cancel: "Batal",
  confirm: "Konfirmasi",
  delete: "Hapus",
  loading: "Memuat...",
  noCoupon: "Tidak ada kupon",
  nameEmpty: "Silakan isi nama",
  addContact: "Tambahkan kontak",
  telInvalid: "Nomor telepon salah format",
  vanCalendar: {
    end: "Akhir",
    start: "Mulai",
    title: "Kalender",
    weekdays: ["minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"],
    monthTitle: (year, month) => `${year}/${month}`,
    rangePrompt: (maxRange) => `Pilih tidak lebih dari ${maxRange} hari`
  },
  vanCascader: {
    select: "Pilih"
  },
  vanPagination: {
    prev: "Sebelumnya",
    next: "Selanjutnya"
  },
  vanPullRefresh: {
    pulling: "Tarik untuk menyegarkan...",
    loosing: "Loose untuk menyegarkan..."
  },
  vanSubmitBar: {
    label: "Jumlah:"
  },
  vanCoupon: {
    unlimited: "Tidak terbatas",
    discount: (discount) => `${discount * 10}% off`,
    condition: (condition) => `Setidaknya ${condition}`
  },
  vanCouponCell: {
    title: "Kupon",
    count: (count) => `Anda memiliki kupon ${count}`
  },
  vanCouponList: {
    exchange: "Pertukaran",
    close: "Tutup",
    enable: "Tersedia",
    disabled: "Tidak tersedia",
    placeholder: "Kode kupon"
  },
  vanAddressEdit: {
    area: "Daerah",
    areaEmpty: "Silakan pilih area penerima",
    addressEmpty: "Alamat tidak boleh kosong",
    addressDetail: "Alamat",
    defaultAddress: "Tetapkan sebagai alamat default"
  },
  vanAddressList: {
    add: "Tambahkan alamat baru"
  }
};
