import { isCnpj } from "./is-cnpj.validation";
import { isCpf } from "./is-cpf.validation";
import { isEmpty } from "./is-empty.validation";

export const isFill = <T = unknown>(item: T | Array<T>): boolean => !isEmpty<T>(item);
export const isTruthy = (value: unknown): boolean => !!value;
export const isFalsy = (value: unknown): boolean => !value;
export const isArray = (value: unknown): value is [] =>
  typeof value === "object" && value instanceof Array;
export const isNull = (value: unknown): value is null => value === null;
export const isUndefined = (value: unknown): value is undefined => value === undefined;

export const isCpfOrCnpj = (value: string): boolean => {
  value = value.replace(/\D/g, "");
  return value.length <= 11 ? isCpf(value) : isCnpj(value);
};
