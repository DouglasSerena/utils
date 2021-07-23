import { AnyCalc, CalcOptions } from "./calc.type";
export declare function calc(value: AnyCalc, settings?: CalcOptions): Calc;
export declare class Calc {
    value: number;
    valueRaw: number;
    settings: CalcOptions;
    precision: number;
    constructor(value: AnyCalc, settings?: CalcOptions);
    private parse;
    private save;
    private roundingNumber;
    add(value: AnyCalc): Calc;
    subtract(value: AnyCalc): Calc;
    multiply(value: AnyCalc): Calc;
    divide(value: AnyCalc): Calc;
    distribute(value: AnyCalc): number[];
}
