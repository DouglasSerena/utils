import { AnyCalc, IConfigCalc } from "./calc.type";
export declare function calc(value: AnyCalc | Calc, config?: IConfigCalc): Calc;
export declare namespace calc {
    var config: (config: IConfigCalc) => void;
    var isCalc: (prop: any) => boolean;
}
export declare class Calc {
    value: number;
    valueRaw: number;
    precision: number;
    config: IConfigCalc;
    constructor(value: AnyCalc | Calc, config?: IConfigCalc);
    private parse;
    private save;
    private roundingNumber;
    add(value: AnyCalc | Calc): Calc;
    subtract(value: AnyCalc | Calc): Calc;
    multiply(value: AnyCalc | Calc): Calc;
    divide(value: AnyCalc | Calc): Calc;
    distribute(value: AnyCalc | Calc): number[];
    toString(): string;
    toJson(): number;
}
