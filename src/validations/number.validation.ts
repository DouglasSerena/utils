import { contains } from "./common/contains.validation";

export type NumberRange = { start?: number; end: number };

export const isNegative = (value: string | number): boolean => contains(value.toString(), "-");

export const isEqualNumber = (value: unknown, compare: unknown): boolean => value === compare;

export const isDifferentNumber = (value: unknown, compare: unknown): boolean => value !== compare;

export const isNumeric = (value: any): boolean => !isNaN(parseInt(value)) && isFinite(value);

export const isNumber = (value: unknown): value is number =>
  !isNaN(parseInt(value as string)) && isFinite(value as number) && typeof value === "number";

export const isFloat = (value: unknown): boolean => isNumeric(value) && !Number.isInteger(value);

export const isMore = (value: unknown, compare: unknown): boolean => value > compare;

export const isMoreOrEqual = (value: unknown, compare: unknown): boolean => value >= compare;

export const isLess = (value: unknown, compare: unknown): boolean => value < compare;

export const isLessOrEqual = (value: unknown, compare: unknown): boolean => value <= compare;

export const isBeforeNumber = (value: number | string, range: NumberRange): boolean => {
  value = Number.parseInt(value.toString());
  return value >= (range.start || 0) && value <= range.end;
};
