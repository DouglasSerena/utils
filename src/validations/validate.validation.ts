import { OpUnitType } from "dayjs";
import { getSizeImage } from "../functions";
import {
  isBoolean,
  isCnpj,
  isCpf,
  isCpfOrCnpj,
  isDifferent,
  isDifferentNotStrict,
  isEmpty,
  isEqual,
  isEqualNotStrict,
  isFalse,
  isFunction,
  isInstanceOf,
  isNull,
  isObject,
  isString,
  isTrue,
  isUndefined,
  notIsInstanceOf,
} from "./common";
import { contains, IContainsOption } from "./common/contains.validation";
import { testPattern } from "./common/test-pattern.validation";
import {
  DateRange,
  DateAny,
  isAfterDate,
  isBeforeDate,
  isBetweenDate,
  isBirthDateValidation,
  isDate,
  isDifferentDate,
  isEqualDate,
  MaxMin,
} from "./date.validation";
import { BitSizesKeys, isAllowExtensions, isFile, maxSize, minSize } from "./file";
import {
  isBeforeNumber,
  isDifferentNumber,
  isEqualNumber,
  isFloat,
  isLess,
  isLessOrEqual,
  isMore,
  isMoreOrEqual,
  isNumber,
  isNumeric,
  NumberRange,
} from "./number.validation";

export function validate(value: any): Validate {
  return new Validate(value);
}

export class Validate {
  constructor(public value: any) {}

  // COMMON
  public contains = (pattern: string | RegExp, options?: IContainsOption): boolean =>
    contains(this.value, pattern, options);

  public testPattern = (pattern: string | RegExp): boolean => testPattern(this.value, pattern);

  public isFalse = (): boolean => isFalse(this.value);
  public isTrue = (): boolean => isTrue(this.value);
  public isEqual = (compare: unknown): boolean => isEqual(this.value, compare);
  public isDifferent = (compare: unknown): boolean => isDifferent(this.value, compare);
  public isEqualNotStrict = (compare: unknown): boolean => isEqualNotStrict(this.value, compare);
  public isDifferentNotStrict = (compare: unknown): boolean =>
    isDifferentNotStrict(this.value, compare);
  public isFill = <T = unknown>(): boolean => !isEmpty<T>(this.value);
  public isEmpty = <T = unknown>(): boolean => isEmpty<T>(this.value);
  public isInstanceOf = (instance: unknown): boolean => isInstanceOf(this.value, instance);
  public notIsInstanceOf = (instance: unknown): boolean => notIsInstanceOf(this.value, instance);
  public isString = (): boolean => isString(this.value);
  public isObject = (): boolean => isObject(this.value);
  public isFunction = (): boolean => isFunction(this.value);
  public isBoolean = (): boolean => isBoolean(this.value);
  public isNull = (): boolean => isNull(this.value);
  public isUndefined = (): boolean => isUndefined(this.value);
  public isCnpj = (): boolean => isCnpj(this.value);
  public isCpf = (): boolean => isCpf(this.value);
  public isCpfOrCnpj = (): boolean => isCpfOrCnpj(this.value);

  // VALIDATION FILE
  public isFile = (): boolean => isFile(this.value);

  public maxHeightFile = async (max: number): Promise<boolean> =>
    isMoreOrEqual((await getSizeImage(this.value)).height, max);

  public minHeightFile = async (min: number): Promise<boolean> =>
    isLessOrEqual((await getSizeImage(this.value)).height, min);

  public maxWidthFile = async (max: number): Promise<boolean> =>
    isMoreOrEqual((await getSizeImage(this.value)).width, max);

  public minWidthFile = async (min: number): Promise<boolean> =>
    isLessOrEqual((await getSizeImage(this.value)).width, min);

  public maxSizeFile = (max: number, type?: BitSizesKeys): boolean =>
    maxSize(this.value, max, type).valid;

  public minSizeFile = (min: number, type?: BitSizesKeys): boolean =>
    minSize(this.value, min, type).valid;

  public isAllowExtensionsFile = (extensions: string[]): boolean =>
    isAllowExtensions(this.value, extensions).valid;

  // VALIDATIONS NUMBER
  public isNumeric = (): boolean => isNumeric(this.value);
  public isNumber = (): boolean => isNumber(this.value);
  public isFloat = (): boolean => isFloat(this.value);
  public isEqualNumber = (compare: number): boolean => isEqualNumber(this.value, compare);
  public isDifferentNumber = (compare: number): boolean => isDifferentNumber(this.value, compare);
  public isBeforeNumber = (range: NumberRange): boolean => isBeforeNumber(this.value, range);
  public isLessOrEqual = (value: number): boolean => isLessOrEqual(this.value, value);
  public isLess = (value: number): boolean => isLess(this.value, value);
  public isMore = (value: number): boolean => isMore(this.value, value);
  public isMoreOrEqual = (value: number): boolean => isMoreOrEqual(this.value, value);

  // VALIDATION DATE
  public isDate = (): boolean => isDate(this.value);
  public isAfterDate = (date: DateAny, options?: OpUnitType): boolean =>
    isAfterDate(this.value, date, options);

  public isBeforeDate = (date: DateAny, options?: OpUnitType): boolean =>
    isBeforeDate(this.value, date, options);

  public isBetweenDate = (
    range: DateRange,
    options?: OpUnitType,
    d?: "()" | "[]" | "[)" | "(]"
  ): boolean => isBetweenDate(this.value, range, options, d);

  public isBirthDateValidation = (year?: MaxMin): boolean =>
    isBirthDateValidation(this.value, year);

  public isEqualDate = (date: DateAny, options?: OpUnitType): boolean =>
    isEqualDate(this.value, date, options);

  public isDifferentDate = (date: DateAny, options?: OpUnitType): boolean =>
    isDifferentDate(this.value, date, options);
}
