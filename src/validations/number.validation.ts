type Range = { start?: number; end?: number };

const isNumeric = (value: any): boolean =>
  !isNaN(parseInt(value)) && isFinite(value);

const isFloat = (value: any): boolean =>
  isNumeric(value) && !Number.isInteger(value);

const isMore = (value: any, verify: any): boolean => value > verify;

const isMoreOrEqual = (value: any, verify: any): boolean => value >= verify;

const isLess = (value: any, verify: any): boolean => value < verify;

const isLessOrEqual = (value: any, verify: any): boolean => value <= verify;

function isBeforeNumber(value: number | string, range?: Range): boolean {
  value = Number.parseInt(value.toString());
  return value >= (range.start || 0) && value <= (range.end || 0);
}

export {
  isNumeric,
  isFloat,
  isBeforeNumber,
  isLessOrEqual,
  isLess,
  isMore,
  isMoreOrEqual,
};
