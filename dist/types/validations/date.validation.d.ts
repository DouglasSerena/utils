import dayjs from "dayjs";
declare type IDateAny = Date | string | dayjs.Dayjs | number;
declare type Range = {
    start?: IDateAny;
    end?: IDateAny;
};
declare type MaxMin = {
    min?: string | number;
    max?: string | number;
};
declare const isDate: (value: IDateAny) => boolean;
declare const isAfterDate: (date: IDateAny, dataAfter: IDateAny, options?: dayjs.OpUnitType) => boolean;
declare const isBeforeDate: (date: IDateAny, dataBefore: IDateAny, options?: dayjs.OpUnitType) => boolean;
declare const isBetweenDate: (date: IDateAny, range?: Range, options?: dayjs.OpUnitType, d?: "()" | "[]" | "[)" | "(]") => boolean;
declare const isBirthDateValidation: (birchDay: IDateAny, year?: MaxMin) => boolean;
declare const isEqualDate: (date: IDateAny, dateDifferent: IDateAny, options?: dayjs.OpUnitType) => boolean;
declare const isDifferentDate: (date: IDateAny, dateDifferent: IDateAny, options?: dayjs.OpUnitType) => boolean;
export { isDate, isAfterDate, isBeforeDate, isBetweenDate, isBirthDateValidation, isDifferentDate, isEqualDate, };
