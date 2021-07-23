export type NumberRange = { start?: number; end: number };

export const isEqualNumber = (value: any, compare: any): boolean => value === compare;
export const isDifferentNumber = (value: any, compare: any): boolean => value !== compare;
export const isNumeric = (value: any): boolean => !isNaN(parseInt(value)) && isFinite(value);
export const isNumber = (value: any): boolean =>
  !isNaN(parseInt(value)) && isFinite(value) && typeof value === "number";
export const isFloat = (value: any): boolean => isNumeric(value) && !Number.isInteger(value);
export const isMore = (value: any, compare: any): boolean => value > compare;
export const isMoreOrEqual = (value: any, compare: any): boolean => value >= compare;
export const isLess = (value: any, compare: any): boolean => value < compare;
export const isLessOrEqual = (value: any, compare: any): boolean => value <= compare;
export const isBeforeNumber = (value: number | string, range: NumberRange): boolean => {
  value = Number.parseInt(value.toString());
  return value >= (range.start || 0) && value <= range.end;
};
