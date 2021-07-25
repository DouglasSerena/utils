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
declare const isDate: (value: DateAny) => boolean;
declare const isAfterDate: (date: DateAny, dataAfter: DateAny, options?: dayjs.OpUnitType) => boolean;
declare const isBeforeDate: (date: DateAny, dataBefore: DateAny, options?: dayjs.OpUnitType) => boolean;
declare const isBetweenDate: (date: DateAny, range: DateRange, options?: dayjs.OpUnitType, d?: "()" | "[]" | "[)" | "(]") => boolean;
declare const isBirthDateValidation: (birchDay: DateAny, year: MaxMin) => boolean;
declare const isEqualDate: (date: DateAny, dateDifferent: DateAny, options?: dayjs.OpUnitType) => boolean;
declare const isDifferentDate: (date: DateAny, dateDifferent: DateAny, options?: dayjs.OpUnitType) => boolean;
export { isDate, isAfterDate, isBeforeDate, isBetweenDate, isBirthDateValidation, isDifferentDate, isEqualDate, };
