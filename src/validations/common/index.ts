import { isCnpj } from "./is-cnpj.validation";
import { isCpf } from "./is-cpf.validation";
import { isEmpty } from "./is-empty.validation";

const isEqual = (value: any, verify: any): boolean => value === verify;
const isDifferent = (value: any, verify: any): boolean => value !== verify;

const isEqualNotStrict = (value: any, verify: any): boolean => value == verify;
const isDifferentNotStrict = (value: any, verify: any): boolean =>
  value != verify;

const isFill = <T = any>(item: T | Array<T>): boolean => !isEmpty<T>(item);
const isInstance = (value: any, instance: any) => value instanceof instance;
const notIsInstance = (value: any, instance: any) =>
  !isInstance(value, instance);
const isString = (value: any) => typeof value === "string";
const isNull = (value: any): boolean => value === null;
const isUndefined = (value: any): boolean => typeof value === "undefined";
const isCpfOrCnpj = (value: string): boolean => {
  value = value.replace(/\D/g, "");
  return value.length <= 11 ? isCpf(value) : isCnpj(value);
};

export * from "./is-rg-sp.validation";
export * from "./is-password.validation";
export {
  isEmpty,
  isFill,
  isInstance,
  notIsInstance,
  isString,
  isUndefined,
  isCnpj,
  isCpf,
  isCpfOrCnpj,
  isNull,
  isEqual,
  isDifferent,
  isEqualNotStrict,
  isDifferentNotStrict,
};
