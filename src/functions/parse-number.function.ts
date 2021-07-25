import { isString } from "../validations/common/common.validation";
import { isNumeric } from "../validations/number.validation";

const _config: IParseNumberOptions = {
  decimal: ",",
  thousands: ".",
  error: false,
};

export interface IParseNumberOptions {
  decimal?: string;
  thousands?: string;
  error?: boolean;
}

export function parseNumber(value: number | string, config?: IParseNumberOptions): number {
  config = Object.assign({}, _config, config);
  if (!isNumeric(value) && isString(value)) {
    const decimalStr = new RegExp(`\\${config?.decimal}`, "g");
    const thousandsStr = new RegExp(`\\${config?.thousands}`, "g");

    value = value.toString().replace(thousandsStr, "").replace(decimalStr, ".");

    value = Number(value) || 0;
  } else {
    if (config?.error) new Error("Invalid Input.");
  }

  return Number(value);
}
