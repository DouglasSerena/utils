import { IConfigParseNumber } from "../functions/parse-number.function";

export type TAnyCalc = string | number;

export interface IConfigCalc extends IConfigParseNumber {
  round: "ceil" | "floor" | "round";
  precision: number;
  increment: number;
}
