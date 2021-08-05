export declare type NumberRange = {
    start?: number;
    end: number;
};
export declare const isNegative: (value: string | number) => boolean;
export declare const isEqualNumber: (value: unknown, compare: unknown) => boolean;
export declare const isDifferentNumber: (value: unknown, compare: unknown) => boolean;
export declare const isNumeric: (value: any) => boolean;
export declare const isNumber: (value: unknown) => value is number;
export declare const isFloat: (value: unknown) => boolean;
export declare const isMore: (value: unknown, compare: unknown) => boolean;
export declare const isMoreOrEqual: (value: unknown, compare: unknown) => boolean;
export declare const isLess: (value: unknown, compare: unknown) => boolean;
export declare const isLessOrEqual: (value: unknown, compare: unknown) => boolean;
export declare const isBeforeNumber: (value: number | string, range: NumberRange) => boolean;
