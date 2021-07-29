import { OpUnitType } from "dayjs";
import { getSizeImage } from "../functions/file/get-size-image.function";
import {
  isArray,
  isBoolean,
  isCpfOrCnpj,
  isDifferent,
  isDifferentNotStrict,
  isEqual,
  isEqualNotStrict,
  isFalse,
  isFill,
  isFunction,
  isInstanceof,
  isNull,
  isObject,
  isString,
  isTrue,
  isTypeof,
  isUndefined,
  noContains,
  notIsInstanceof,
  Typeof,
} from "./common/common.validation";
import { contains, IContainsOption } from "./common/contains.validation";
import { isCnpj } from "./common/is-cnpj.validation";
import { isCpf } from "./common/is-cpf.validation";
import { isEmpty } from "./common/is-empty.validation";
import { IPasswordOptionsDisabled, isPassword } from "./common/is-password.validation";
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
import { BitSizesKeys, isFile } from "./file/file.validation";
import { isAllowExtensions } from "./file/is-allow-extension.validation";
import { maxSize } from "./file/max-size.validation";
import { minSize } from "./file/min-size.validation";
import {
  isBeforeNumber,
  isDifferentNumber,
  isEqualNumber,
  isFloat,
  isLess,
  isLessOrEqual,
  isMore,
  isMoreOrEqual,
  isNegative,
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
  public noContains = (pattern: string | RegExp, options?: IContainsOption): boolean =>
    noContains(this.value, pattern, options);

  public testPattern = (pattern: string | RegExp): boolean => testPattern(this.value, pattern);
  public isPassword = (disabled?: IPasswordOptionsDisabled, minLength?: number): boolean =>
    isPassword(this.value, disabled, minLength);

  public isTypeof = (type: Typeof): boolean => isTypeof(this.value, type);
  public isFalse = (): boolean => isFalse(this.value);
  public isTrue = (): boolean => isTrue(this.value);
  public isEqual = (compare: unknown): boolean => isEqual(this.value, compare);
  public isDifferent = (compare: unknown): boolean => isDifferent(this.value, compare);
  public isEqualNotStrict = (compare: unknown): boolean => isEqualNotStrict(this.value, compare);
  public isDifferentNotStrict = (compare: unknown): boolean =>
    isDifferentNotStrict(this.value, compare);
  public isFill = <T = unknown>(): boolean => isFill<T>(this.value);
  public isEmpty = <T = unknown>(): boolean => isEmpty<T>(this.value);
  public isInstanceof = (instance: unknown): boolean => isInstanceof(this.value, instance);
  public notIsInstanceOf = (instance: unknown): boolean => notIsInstanceof(this.value, instance);
  public isString = (): boolean => isString(this.value);
  public isArray = (): boolean => isArray(this.value);
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
  public isNaN = (): boolean => isNaN(parseInt(this.value));
  public isNegative = (): boolean => isNegative(this.value);
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
