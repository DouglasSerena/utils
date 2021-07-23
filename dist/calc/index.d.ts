import { IParseNumberOptions } from "../functions";
export declare type AnyCalc = Calc | string | number;
export interface CalcOptions extends IParseNumberOptions {
    round?: "ceil" | "floor" | "round";
    precision?: number;
    increment?: number;
}
export declare const calcOptions: CalcOptions;
declare function calc(value: AnyCalc, settings?: CalcOptions): Calc;
declare class Calc {
    value: number;
    valueRaw: number;
    settings: CalcOptions;
    precision: number;
    constructor(value: AnyCalc, settings?: CalcOptions);
    private save;
    private roundingNumber;
    add(value: AnyCalc): Calc;
    subtract(value: AnyCalc): Calc;
    multiply(value: AnyCalc): Calc;
    divide(value: AnyCalc): Calc;
    distribute(value: AnyCalc): number[];
}
export { Calc };
export default calc;
