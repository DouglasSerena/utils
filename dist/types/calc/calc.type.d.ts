import { IParseNumberOptions } from "../functions/parse-number.function";
import { Calc } from "./calc";
export declare type AnyCalc = Calc | string | number;
export interface CalcOptions extends IParseNumberOptions {
    round?: "ceil" | "floor" | "round";
    precision?: number;
    increment?: number;
}
