declare type Range = {
    start?: number;
    end?: number;
};
declare const isNumeric: (value: any) => boolean;
declare const isFloat: (value: any) => boolean;
declare const isMore: (value: any, verify: any) => boolean;
declare const isMoreOrEqual: (value: any, verify: any) => boolean;
declare const isLess: (value: any, verify: any) => boolean;
declare const isLessOrEqual: (value: any, verify: any) => boolean;
declare function isBeforeNumber(value: number | string, range?: Range): boolean;
export { isNumeric, isFloat, isBeforeNumber, isLessOrEqual, isLess, isMore, isMoreOrEqual, };
