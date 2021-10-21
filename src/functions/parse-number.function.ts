import { isNegative, isNumeric } from "../validations/number.validation";

export interface IConfigParseNumber {
  decimal: string;
  thousands: string;
  error: boolean;
}

const _config: IConfigParseNumber = {
  decimal: ".",
  thousands: null,
  error: false,
};

/**
 * @description Faz a conversão do valor em um tipo numerico
 * @param {number|string} value
 * @param {Partial<IConfigParseNumber>} [config]
 * @returns {number} */
export function parseNumber(value: number | string, config?: Partial<IConfigParseNumber>): number {
  config = Object.assign({}, _config, config);
  if (!isNumeric(value) && typeof value === "string") {
    const negative = isNegative(value);
    const decimalStr = new RegExp(`\\${config?.decimal}`, "g");
    if (config.thousands) {
      const thousandsStr = new RegExp(`\\${config?.thousands}`, "g");
      value = value.toString().replace(thousandsStr, "");
    }

    value = value.toString().replace(decimalStr, ".");

    let [prefix, sufixa] = value.split("."); // eslint-disable-line prefer-const
    value = prefix?.replace(/\D/g, "");

    if (sufixa) {
      sufixa = sufixa?.replace(/\D/g, "");
      value += `.${sufixa}`;
    }

    value = Number(value) || 0;
    if (negative) {
      value = -value;
    }
  } else {
    if (config?.error) new Error("Invalid Input.");
  }

  return Number(value);
}
