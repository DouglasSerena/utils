import { isString } from "../validations/common/common.validation";
import { isNumeric } from "../validations/number.validation";

export const parseNumberOptions: IParseNumberOptions = {
  decimal: ",",
  thousands: ".",
  error: false,
};

export interface IParseNumberOptions {
  decimal?: string;
  thousands?: string;
  error?: boolean;
}

export function parseNumber(value: number | string, options?: IParseNumberOptions): number {
  options = Object.assign({}, parseNumberOptions, options);
  if (!isNumeric(value) && isString(value)) {
    const decimalStr = new RegExp(`\\${options?.decimal}`, "g");
    const thousandsStr = new RegExp(`\\${options?.thousands}`, "g");

    value = value.toString().replace(thousandsStr, "").replace(decimalStr, ".");

    value = Number(value) || 0;
  } else {
    if (options?.error) new Error("Invalid Input.");
  }

  return Number(value);
}
