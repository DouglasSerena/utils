import { isCnpj } from "./is-cnpj.validation";
import { isCpf } from "./is-cpf.validation";
import { isEmpty } from "./is-empty.validation";

const isEqual = (value: any, compare: any): boolean => value === compare;
const isDifferent = (value: any, compare: any): boolean => value !== compare;

const isEqualNotStrict = (value: any, compare: any): boolean => value == compare;
const isDifferentNotStrict = (value: any, compare: any): boolean => value != compare;

const isFill = <T = any>(item: T | Array<T>): boolean => !isEmpty<T>(item);
const isInstanceOf = (value: any, instance: any) => value instanceof instance;
const notIsInstanceOf = (value: any, instance: any) => !isInstanceOf(value, instance);
const isString = (value: any) => typeof value === "string";
const isNull = (value: any): boolean => value === null;
const isUndefined = (value: any): boolean => typeof value === "undefined";
const isCpfOrCnpj = (value: string): boolean => {
  value = value.replace(/\D/g, "");
  return value.length <= 11 ? isCpf(value) : isCnpj(value);
};

export {
  isFill,
  isInstanceOf,
  notIsInstanceOf,
  isString,
  isUndefined,
  isCpfOrCnpj,
  isNull,
  isEqual,
  isDifferent,
  isEqualNotStrict,
  isDifferentNotStrict,
};
