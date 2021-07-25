import { AnyCalc, ICalcOptions } from "./calc.type";
export declare function calc(value: AnyCalc, config?: ICalcOptions): Calc;
export declare namespace calc {
    var config: (config: ICalcOptions) => void;
    var isCalc: (prop: any) => boolean;
}
export declare class Calc {
    value: number;
    valueRaw: number;
    precision: number;
    config: ICalcOptions;
    constructor(value: AnyCalc, config?: ICalcOptions);
    private parse;
    private save;
    private roundingNumber;
    add(value: AnyCalc): Calc;
    subtract(value: AnyCalc): Calc;
    multiply(value: AnyCalc): Calc;
    divide(value: AnyCalc): Calc;
    distribute(value: AnyCalc): number[];
}
