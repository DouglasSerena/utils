import { contains } from "../functions/contains.function";
import { TRange } from "../types/range.type";

export const isNegative = (value: string | number): boolean => contains(value.toString(), "-");

export const isNumeric = (value: unknown): boolean =>
  !isNaN(parseInt(value as string)) && isFinite(value as number);

export const isNumber = (value: unknown): value is number =>
  !isNaN(parseInt(value as string)) && isFinite(value as number) && typeof value === "number";

export const isFloat = (value: unknown): boolean =>
  isNumeric(value) && !Number.isInteger(Number(value));

export const isBeforeNumber = (value: number | string, range: TRange): boolean => {
  value = Number.parseInt(value.toString());
  return value >= (range.start || 0) && value <= range.end;
};
