import { IMaskCustom } from "./masked.type";

export const CUSTOM_MASKS: { [key: string]: IMaskCustom } = {
  TEL: {
    type: "IMASK",
    config: {
      mask: [{ mask: "(00) 0000-0000" }, { mask: "(00) 0 0000-0000" }],
    },
  },
  CPF: {
    type: "IMASK",
    config: {
      mask: "000.000.000-00",
    },
  },
  CNPJ: {
    type: "IMASK",
    config: {
      mask: "00.000.000/0000-00",
    },
  },
  CPF_CNPJ: {
    type: "IMASK",
    config: {
      mask: [{ mask: "000.000.000-00" }, { mask: "00.000.000/0000-00" }],
    },
  },
  RG: {
    type: "IMASK",
    config: {
      mask: [{ mask: "00.000.000-0" }, { mask: "00000000000000" }],
    },
  },
  ESTADUAL: {
    type: "IMASK",
    config: {
      mask: "00.0.000.0000000-0",
    },
  },
  RG_ESTADUAL: {
    type: "IMASK",
    config: {
      mask: [{ mask: "00.000.000-0" }, { mask: "00.0.000.0000000-0" }, { mask: "00000000000000" }],
    },
  },
  CEP: {
    type: "IMASK",
    config: {
      mask: "00000-000",
    },
  },
  CURRENCY: {
    type: "SIMPLE_MASK_MONEY",
    config: {
      cursor: "end",
      fractionDigits: 2,
      decimalSeparator: ".",
      thousandsSeparator: ",",
    },
  },
  CURRENCY_BRL: {
    type: "SIMPLE_MASK_MONEY",
    config: {
      cursor: "end",
      fractionDigits: 2,
      decimalSeparator: ",",
      thousandsSeparator: ".",
    },
  },
  AMOUNT: {
    type: "SIMPLE_MASK_MONEY",
    config: {
      cursor: "end",
      fractionDigits: 3,
      decimalSeparator: ".",
      thousandsSeparator: "",
    },
  },
  PERCENT: {
    type: "SIMPLE_MASK_MONEY",
    config: {
      cursor: "end",
      fractionDigits: 2,
      decimalSeparator: ",",
      thousandsSeparator: "",
    },
  },
};
