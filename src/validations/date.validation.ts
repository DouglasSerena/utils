import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isBetween);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export type DateAny = Date | string | dayjs.Dayjs | number;
export type DateRange = { start: DateAny; end: DateAny };
export type MaxMin = { min?: string | number; max?: string | number };

const isDate = (value: DateAny): boolean => dayjs(value).isValid();

const isAfterDate = (date: DateAny, dataAfter: DateAny, options?: dayjs.OpUnitType): boolean =>
  dayjs(date).isAfter(dayjs(dataAfter), options);

const isBeforeDate = (date: DateAny, dataBefore: DateAny, options?: dayjs.OpUnitType): boolean =>
  dayjs(date).isBefore(dayjs(dataBefore), options);

const isBetweenDate = (
  date: DateAny,
  range: DateRange,
  options?: dayjs.OpUnitType,
  d?: "()" | "[]" | "[)" | "(]"
): boolean =>
  dayjs(date).isBetween(
    dayjs(range?.start || new Date()),
    dayjs(range?.end || new Date()),
    options,
    d
  );

const isBirthDateValidation = (birchDay: DateAny, year: MaxMin): boolean => {
  if (!year?.max) {
    year.min = Number.parseInt(year?.min?.toString());
    return dayjs(birchDay).isSameOrBefore(dayjs().subtract(year.min, "years"));
  }
  year.max = Number.parseInt(year?.max?.toString());
  year.min = Number.parseInt(year?.min?.toString());

  return (
    dayjs(birchDay).isSameOrAfter(dayjs().subtract(year.max, "years")) &&
    dayjs(birchDay).isSameOrBefore(dayjs().subtract(year.min || 0, "years"))
  );
};

const isEqualDate = (
  date: DateAny,
  dateDifferent: DateAny,
  options?: dayjs.OpUnitType
): boolean => dayjs(date).isSame(dayjs(dateDifferent), options);

const isDifferentDate = (
  date: DateAny,
  dateDifferent: DateAny,
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
