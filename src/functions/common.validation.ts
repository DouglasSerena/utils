import { isCnpj } from "../validations/common/is-cnpj.validation";
import { isCpf } from "../validations/common/is-cpf.validation";
import { isEmpty } from "../validations/common/is-empty.validation";
import { contains, IContainsOption } from "./contains.function";

export type Typeof =
  | "string"
  | "number"
  | "bigint"
  | "boolean"
  | "symbol"
  | "undefined"
  | "object"
  | "function";

export const noContains = <T = string>(
  value: T,
  compare: string | RegExp,
  options?: IContainsOption
): boolean => !contains(value, compare, options);

export const isEqual = (value: unknown, compare: unknown): boolean => value === compare;
export const isDifferent = (value: unknown, compare: unknown): boolean => value !== compare;

export const isEqualNotStrict = (value: unknown, compare: unknown): boolean => value == compare;

export const isDifferentNotStrict = (value: unknown, compare: unknown): boolean => value != compare;

export const isFill = <T = unknown>(item: T | Array<T>): boolean => !isEmpty<T>(item);

export const isTypeof = <GuardType = unknown>(value: unknown, type: Typeof): value is GuardType =>
  typeof value === type;

export const wasFound = (value: number): boolean => value > -1;
export const wasNotFound = (value: number): boolean => value === -1;

export const notIsTypeof = <GuardType = unknown, T = unknown>(
  value: T,
  type: Typeof
): value is Exclude<T, GuardType> => !isTypeof<GuardType>(value, type);

export const isInstanceof = <T>(value: unknown, instance: T): value is T[keyof T] =>
  value instanceof (instance as any);

export const notIsInstanceof = <U, T>(value: U, instance: T): value is Exclude<U, T[keyof T]> =>
  !isInstanceof(value, instance);

export const isTruthy = (value: unknown): boolean => !!value;
export const isFalsy = (value: unknown): boolean => !!value;

export const isFalse = (value: unknown): boolean => isFalsy(value);
export const isTrue = (value: unknown): boolean => isTruthy(value);

export const isString = (value: unknown): value is string =>
  isTypeof(value, "string") || isInstanceof(value, String);

export const isObject = <T>(value: T): value is T =>
  isTypeof(value, "object") || isInstanceof(value, Object);

export const isArray = <T = unknown>(value: T): value is T =>
  isTypeof(value, "object") && isInstanceof(value, Array);

export const isFunction = <T = unknown>(value: unknown): value is T =>
  isTypeof(value, "function") || isInstanceof(value, Function);

export const isBoolean = (value: unknown): value is boolean =>
  isTypeof(value, "boolean") || isInstanceof(value, Boolean);

export const isNull = (value: unknown): value is null => value === null;

export const isUndefined = (value: unknown): value is undefined =>
  isTypeof(value, "undefined") || value === undefined;

export const isCpfOrCnpj = (value: string): boolean => {
  value = value.replace(/\D/g, "");
  return value.length <= 11 ? isCpf(value) : isCnpj(value);
};
