import { validate } from "../validations/validate.validation";

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

export function parseNumber(value: number | string, config?: Partial<IConfigParseNumber>): number {
  config = Object.assign({}, _config, config);
  if (!validate(value).isNumeric() && validate(value).isString()) {
    const isNegative = validate(value).isNegative();
    const decimalStr = new RegExp(`\\${config?.decimal}`, "g");
    if (config.thousands) {
      const thousandsStr = new RegExp(`\\${config?.thousands}`, "g");
      value = value.toString().replace(thousandsStr, "");
    }

    value = value.toString().replace(decimalStr, ".");

    let [prefix, sufixa] = value.split(".");
    prefix = prefix?.replace(/\D/g, "");
    sufixa = sufixa?.replace(/\D/g, "");

    value = Number(`${prefix}.${sufixa}`) || 0;
    if (isNegative) {
      value = -value;
    }
  } else {
    if (config?.error) new Error("Invalid Input.");
  }

  return Number(value);
}
