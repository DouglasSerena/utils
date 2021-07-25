export declare type NumberRange = {
    start?: number;
    end: number;
};
export declare const isEqualNumber: (value: any, compare: any) => boolean;
export declare const isDifferentNumber: (value: any, compare: any) => boolean;
export declare const isNumeric: (value: any) => boolean;
export declare const isNumber: (value: any) => boolean;
export declare const isFloat: (value: any) => boolean;
export declare const isMore: (value: any, compare: any) => boolean;
export declare const isMoreOrEqual: (value: any, compare: any) => boolean;
export declare const isLess: (value: any, compare: any) => boolean;
export declare const isLessOrEqual: (value: any, compare: any) => boolean;
export declare const isBeforeNumber: (value: number | string, range: NumberRange) => boolean;
