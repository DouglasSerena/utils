import { AnyCalc, CalcOptions } from "./calc.type";
export declare const calc: {
    (value: AnyCalc, config?: CalcOptions): Calc;
    config(config: CalcOptions): void;
    isCalc(prop: any): boolean;
};
export declare class Calc {
    value: number;
    valueRaw: number;
    precision: number;
    config: CalcOptions;
    constructor(value: AnyCalc, config?: CalcOptions);
    private parse;
    private save;
    private roundingNumber;
    add(value: AnyCalc): Calc;
    subtract(value: AnyCalc): Calc;
    multiply(value: AnyCalc): Calc;
    divide(value: AnyCalc): Calc;
    distribute(value: AnyCalc): number[];
}
