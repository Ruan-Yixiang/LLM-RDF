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
  name: "Nome",
  tel: "Fone",
  save: "Salvar",
  clear: "Claro",
  cancel: "Cancelar",
  confirm: "Confirmar",
  delete: "Excluir",
  loading: "Carregando...",
  noCoupon: "Nenhum cupom",
  nameEmpty: "Por favor, preencha o nome",
  addContact: "Adicionar novo contato",
  telInvalid: "Telefone em formato inv\xE1lido",
  vanCalendar: {
    end: "Fim",
    start: "In\xEDcio",
    title: "Calend\xE1rio",
    weekdays: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "S\xE1b"],
    monthTitle: (year, month) => `${month}/${year}`,
    rangePrompt: (maxRange) => `Escolha no m\xE1ximo ${maxRange} dias`
  },
  vanCascader: {
    select: "Selecione"
  },
  vanPagination: {
    prev: "Anterior",
    next: "Pr\xF3ximo"
  },
  vanPullRefresh: {
    pulling: "Puxe para atualizar...",
    loosing: "Solte para atualizar..."
  },
  vanSubmitBar: {
    label: "Total:"
  },
  vanCoupon: {
    unlimited: "Ilimitado",
    discount: (discount) => `${discount * 10}% de desconto`,
    condition: (condition) => `Pelo menos ${condition}`
  },
  vanCouponCell: {
    title: "Cupom",
    count: (count) => `Voc\xEA possui ${count} cupom(ns)`
  },
  vanCouponList: {
    exchange: "Usar",
    close: "Fechar",
    enable: "Dispon\xEDvel",
    disabled: "Indispon\xEDvel",
    placeholder: "C\xF3digo do cupom"
  },
  vanAddressEdit: {
    area: "\xC1rea",
    areaEmpty: "Por favor, selecione uma \xE1rea de recebimento",
    addressEmpty: "Endere\xE7o n\xE3o pode ser vazio",
    addressDetail: "Endere\xE7o",
    defaultAddress: "Usar como endere\xE7o padr\xE3o"
  },
  vanAddressList: {
    add: "Adicionar novo endere\xE7o"
  }
};
