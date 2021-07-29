import { contains, IContainsOption } from "./contains.validation";
import { isCnpj } from "./is-cnpj.validation";
import { isCpf } from "./is-cpf.validation";
import { isEmpty } from "./is-empty.validation";

export type Typeof =
  | "string"
  | "number"
  | "bigint"
  | "boolean"
  | "symbol"
  | "undefined"
  | "object"
  | "function";

export const noContains = (value: any, compare: any, options?: IContainsOption) =>
  !contains(value, compare, options);

export const isEqual = (value: any, compare: any): boolean => value === compare;
export const isDifferent = (value: any, compare: any): boolean => value !== compare;

export const isEqualNotStrict = (value: any, compare: any): boolean => value == compare;
export const isDifferentNotStrict = (value: any, compare: any): boolean => value != compare;

export const isFill = <T = any>(item: T | Array<T>): boolean => !isEmpty<T>(item);

export const isTypeof = (value: any, type: Typeof) => typeof value === type;
export const isInstanceof = (value: any, instance: any) => value instanceof instance;
export const notIsInstanceof = (value: any, instance: any) => !isInstanceof(value, instance);

export const isFalse = (value: any) => !value;
export const isTrue = (value: any) => !!value;

export const isString = (value: any) => typeof value === "string" || isInstanceof(value, String);
export const isObject = (value: any) => typeof value === "object" || isInstanceof(value, Object);
export const isArray = (value: any) => typeof value === "object" && isInstanceof(value, Array);
export const isFunction = (value: any) =>
  typeof value === "function" || isInstanceof(value, Function);
export const isBoolean = (value: any) => typeof value === "boolean" || isInstanceof(value, Boolean);
export const isNull = (value: any): boolean => value === null;
export const isUndefined = (value: any): boolean => typeof value === "undefined";

export const isCpfOrCnpj = (value: string): boolean => {
  value = value.replace(/\D/g, "");
  return value.length <= 11 ? isCpf(value) : isCnpj(value);
};
