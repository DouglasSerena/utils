import dayjs from "dayjs";
export declare type DateAny = Date | string | dayjs.Dayjs | number;
export declare type DateRange = {
    start: DateAny;
    end: DateAny;
};
export declare type MaxMin = {
    min?: string | number;
    max?: string | number;
};
export declare const isDateValid: (value: DateAny) => boolean;
export declare const isAfterDate: (date: DateAny, dataAfter: DateAny, options?: dayjs.OpUnitType) => boolean;
export declare const isBeforeDate: (date: DateAny, dataBefore: DateAny, options?: dayjs.OpUnitType) => boolean;
export declare const isBetweenDate: (date: DateAny, range: DateRange, options?: dayjs.OpUnitType, d?: "()" | "[]" | "[)" | "(]") => boolean;
export declare const isBirthDateValid: (birchDay: DateAny, year: MaxMin) => boolean;
export declare const isEqualDate: (date: DateAny, dateDifferent: DateAny, options?: dayjs.OpUnitType) => boolean;
export declare const isDifferentDate: (date: DateAny, dateDifferent: DateAny, options?: dayjs.OpUnitType) => boolean;
