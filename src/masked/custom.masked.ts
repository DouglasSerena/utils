import dayjs from "dayjs";
import { MaskedEnum, MaskedRange } from "imask";
import { IMaskCustom } from "./masked.type";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export const BLOCKS_DATE = {
  DD: {
    mask: MaskedRange,
    from: 1,
    to: 31,
    maxLength: 2,
    placeholderChar: "d",
  },
  MM: {
    mask: MaskedRange,
    from: 1,
    to: 12,
    maxLength: 2,
    placeholderChar: "m",
  },
  YYYY: {
    mask: MaskedRange,
    from: 0,
    to: 9999,
    placeholderChar: "y",
  },
  HH: {
    mask: MaskedRange,
    from: 0,
    to: 23,
    placeholderChar: "-",
  },
  H: {
    mask: MaskedRange,
    from: 0,
    to: 12,
    placeholderChar: "-",
  },
  mm: {
    mask: MaskedRange,
    from: 0,
    to: 59,
    placeholderChar: "-",
  },
  ss: {
    mask: MaskedRange,
    from: 0,
    to: 59,
    placeholderChar: "-",
  },
  A: {
    mask: MaskedEnum,
    enum: ["AM", "PM"],
    prepare: (str): string => str.toUpperCase(),
    placeholderChar: "-",
  },
  aa: {
    mask: MaskedEnum,
    enum: ["am", "pm"],
    prepare: (str): string => str.toUpperCase(),
    placeholderChar: "-",
  },
};

export const CUSTOM_MASKS: { [key: string]: IMaskCustom } = {
  TEL: {
    type: "MASK",
    config: {
      mask: [{ mask: "(00) 0000-0000" }, { mask: "(00) 0 0000-0000" }],
    },
  },
  CPF: {
    type: "MASK",
    config: {
      mask: "000.000.000-00",
    },
  },
  CNPJ: {
    type: "MASK",
    config: {
      mask: "00.000.000/0000-00",
    },
  },
  CPF_CNPJ: {
    type: "MASK",
    config: {
      mask: [{ mask: "000.000.000-00" }, { mask: "00.000.000/0000-00" }],
    },
  },
  RG: {
    type: "MASK",
    config: {
      mask: [{ mask: "00.000.000-0" }, { mask: "00000000000000" }],
    },
  },
  ESTADUAL: {
    type: "MASK",
    config: {
      mask: "00.0.000.0000000-0",
    },
  },
  RG_ESTADUAL: {
    type: "MASK",
    config: {
      mask: [{ mask: "00.000.000-0" }, { mask: "00.0.000.0000000-0" }, { mask: "00000000000000" }],
    },
  },
  CEP: {
    type: "MASK",
    config: {
      mask: "00000-000",
    },
  },
  DATE: {
    type: "MASK",
    config: {
      mask: Date,
      lazy: false,
      pattern: "DD/MM/YYYY",
      blocks: BLOCKS_DATE,
      format: (date) => dayjs(date).format("DD/MM/YYYY"),
      parse: (str) => dayjs(str, "DD/MM/YYYY").toDate(),
    },
  },
  DATE_TIME: {
    type: "MASK",
    config: {
      mask: Date,
      lazy: false,
      pattern: "DD/MM/YYYY HH:mm",
      blocks: BLOCKS_DATE,
      format: (date) => dayjs(date).format("DD/MM/YYYY HH:mm"),
      parse: (str) => dayjs(str, "DD/MM/YYYY HH:mm").toDate(),
    },
  },
  DATE_TIME_12: {
    type: "MASK",
    config: {
      mask: Date,
      lazy: false,
      pattern: "DD/MM/YYYY H:mm A",
      blocks: BLOCKS_DATE,
      format: (date) => dayjs(date).format("DD/MM/YYYY H:mm A"),
      parse: (str) => dayjs(str, "DD/MM/YYYY H:mm A").toDate(),
    },
  },
  MONTH: {
    type: "MASK",
    config: {
      mask: Date,
      lazy: false,
      pattern: "MM/YYYY",
      blocks: BLOCKS_DATE,
      format: (date) => dayjs(date).format("MM/YYYY"),
      parse: (str) => dayjs(str, "MM/YYYY").toDate(),
    },
  },
  TIME: {
    type: "MASK",
    config: {
      mask: Date,
      lazy: false,
      pattern: "HH:mm",
      blocks: BLOCKS_DATE,
      format: (date) => dayjs(date).format("HH:mm"),
      parse: (str) => dayjs(str, "HH:mm").toDate(),
    },
  },
  TIME_12: {
    type: "MASK",
    config: {
      mask: Date,
      lazy: false,
      pattern: "H:mm A",
      blocks: BLOCKS_DATE,
      format: (date) => dayjs(date).format("H:mm A"),
      parse: (str) => dayjs(str, "H:mm A").toDate(),
    },
  },
  CURRENCY: {
    type: "MASK_MONEY",
    config: {
      precision: 2,
      delimiter: ",",
      separator: ".",
    },
  },
  CURRENCY_BRL: {
    type: "MASK_MONEY",
    config: {
      precision: 2,
      delimiter: ".",
      separator: ",",
    },
  },
  AMOUNT: {
    type: "MASK_MONEY",
    config: {
      precision: 3,
      delimiter: "",
      separator: ".",
    },
  },
  PERCENT: {
    type: "MASK_MONEY",
    config: {
      precision: 2,
      delimiter: "",
      separator: ",",
    },
  },
};
