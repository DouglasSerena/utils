import * as dayjs from "dayjs";
import * as isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

type IDateAny = Date | string | dayjs.Dayjs | number;
type Range = { start?: IDateAny; end?: IDateAny };
type MaxMin = { min?: string | number; max?: string | number };

const isDate = (value: IDateAny): boolean => dayjs(value).isValid();

const isAfterDate = (
  date: IDateAny,
  dataAfter: IDateAny,
  options?: dayjs.OpUnitType
): boolean => dayjs(date).isAfter(dayjs(dataAfter), options);

const isBeforeDate = (
  date: IDateAny,
  dataBefore: IDateAny,
  options?: dayjs.OpUnitType
): boolean => dayjs(date).isBefore(dayjs(dataBefore), options);

const isBetweenDate = (
  date: IDateAny,
  range?: Range,
  options?: dayjs.OpUnitType,
  d?: "()" | "[]" | "[)" | "(]"
): boolean =>
  dayjs(date).isBetween(
    dayjs(range?.start || new Date()),
    dayjs(range?.end || new Date()),
    options,
    d
  );

const isBirthDateValidation = (birchDay: IDateAny, year?: MaxMin): boolean => {
  year.min = Number.parseInt(year?.min?.toString() || "0");
  year.max = Number.parseInt(year?.max?.toString() || "200");

  return dayjs(birchDay).isBetween(
    dayjs().subtract(year.min, "years"),
    dayjs().subtract(year.max, "years")
  );
};

const isEqualDate = (
  date: IDateAny,
  dateDifferent: IDateAny,
  options?: dayjs.OpUnitType
): boolean => dayjs(date).isSame(dayjs(dateDifferent), options);

const isDifferentDate = (
  date: IDateAny,
  dateDifferent: IDateAny,
  options?: dayjs.OpUnitType
): boolean => !isEqualDate(date, dateDifferent, options);

export {
  isDate,
  isAfterDate,
  isBeforeDate,
  isBetweenDate,
  isBirthDateValidation,
  isDifferentDate,
  isEqualDate,
};
