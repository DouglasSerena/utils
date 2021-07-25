import { isCnpj } from "./is-cnpj.validation";
import { isCpf } from "./is-cpf.validation";
import { isEmpty } from "./is-empty.validation";

export const isEqual = (value: any, compare: any): boolean => value === compare;
export const isDifferent = (value: any, compare: any): boolean => value !== compare;

export const isEqualNotStrict = (value: any, compare: any): boolean => value == compare;
export const isDifferentNotStrict = (value: any, compare: any): boolean => value != compare;

export const isFill = <T = any>(item: T | Array<T>): boolean => !isEmpty<T>(item);

export const isInstanceOf = (value: any, instance: any) => value instanceof instance;
export const notIsInstanceOf = (value: any, instance: any) => !isInstanceOf(value, instance);

export const isFalse = (value: any) => !value;
export const isTrue = (value: any) => !!value;

export const isString = (value: any) => typeof value === "string";
export const isObject = (value: any) => typeof value === "object";
export const isFunction = (value: any) => typeof value === "function";
export const isBoolean = (value: any) => typeof value === "boolean";
export const isNull = (value: any): boolean => value === null;
export const isUndefined = (value: any): boolean => typeof value === "undefined";

export const isCpfOrCnpj = (value: string): boolean => {
  value = value.replace(/\D/g, "");
  return value.length <= 11 ? isCpf(value) : isCnpj(value);
};
