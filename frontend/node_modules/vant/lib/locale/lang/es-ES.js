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
  name: "Nombre",
  tel: "Tel\xE9fono",
  save: "Guardar",
  clear: "Claro",
  cancel: "Cancelar",
  confirm: "Confirmar",
  delete: "Eliminar",
  loading: "Cargando...",
  noCoupon: "Sin cupones",
  nameEmpty: "Por favor rellena el nombre",
  addContact: "A\xF1adi contacto",
  telInvalid: "Tel\xE9fono inv\xE1lido",
  vanCalendar: {
    end: "Fin",
    start: "Inicio",
    title: "Calendario",
    weekdays: ["Dom", "Lun", "Mar", "Mi\xE9", "Jue", "Vie", "S\xE1b"],
    monthTitle: (year, month) => `${year}/${month}`,
    rangePrompt: (maxRange) => `Elija no m\xE1s de ${maxRange} d\xEDas`
  },
  vanCascader: {
    select: "Seleccione"
  },
  vanPagination: {
    prev: "Anterior",
    next: "Siguiente"
  },
  vanPullRefresh: {
    pulling: "Tira para recargar...",
    loosing: "Suelta para recargar..."
  },
  vanSubmitBar: {
    label: "Total:"
  },
  vanCoupon: {
    unlimited: "Ilimitado",
    discount: (discount) => `${discount * 10}% de descuento`,
    condition: (condition) => `Al menos ${condition}`
  },
  vanCouponCell: {
    title: "Cup\xF3n",
    count: (count) => `You have ${count} coupons`
  },
  vanCouponList: {
    exchange: "Intercambio",
    close: "Cerrar",
    enable: "Disponible",
    disabled: "No disponible",
    placeholder: "C\xF3digo del cup\xF3n"
  },
  vanAddressEdit: {
    area: "\xC1rea",
    areaEmpty: "Por favor selecciona una \xE1rea de recogida",
    addressEmpty: "La direcci\xF3n no puede estar vacia",
    addressDetail: "Direcci\xF3n",
    defaultAddress: "Establecer como direcci\xF3n por defecto"
  },
  vanAddressList: {
    add: "Anadir direcci\xF3n"
  }
};
