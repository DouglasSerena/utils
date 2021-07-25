import { AnyCalc, ICalcOptions } from "./calc.type";
export declare function calc(value: AnyCalc | Calc, config?: ICalcOptions): Calc;
export declare namespace calc {
    var config: (config: ICalcOptions) => void;
    var isCalc: (prop: any) => boolean;
}
export declare class Calc {
    value: number;
    valueRaw: number;
    precision: number;
    config: ICalcOptions;
    constructor(value: AnyCalc | Calc, config?: ICalcOptions);
    private parse;
    private save;
    private roundingNumber;
    add(value: AnyCalc | Calc): Calc;
    subtract(value: AnyCalc | Calc): Calc;
    multiply(value: AnyCalc | Calc): Calc;
    divide(value: AnyCalc | Calc): Calc;
    distribute(value: AnyCalc | Calc): number[];
}
