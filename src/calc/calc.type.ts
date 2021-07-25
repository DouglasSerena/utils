import { IParseNumberOptions } from "../functions/parse-number.function";

export type AnyCalc = string | number;

export interface ICalcOptions extends IParseNumberOptions {
  round?: "ceil" | "floor" | "round";
  precision?: number;
  increment?: number;
}
