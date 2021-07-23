import { IParseNumberOptions, parseNumberOptions } from "../functions/parse-number.function";
import { Calc } from "./calc";

export type AnyCalc = Calc | string | number;

export interface CalcOptions extends IParseNumberOptions {
  round?: "ceil" | "floor" | "round";
  precision?: number;
  increment?: number;
}

export const calcOptions: CalcOptions = {
  ...parseNumberOptions,
  precision: 2,
  increment: 0,
  round: "round",
};
