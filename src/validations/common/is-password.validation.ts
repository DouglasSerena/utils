import { REGEX_CHAR_SPECIAL, REGEX_NUMBER, REGEX_UPPER_CASE } from "../../regex";
import { contains } from "../../functions/contains.function";

export interface IPasswordOptionsDisabled {
  charUpperCase?: boolean;
  charSpecial?: boolean;
  number?: boolean;
}

export function isPassword<T = string>(
  value: T,
  disabled?: IPasswordOptionsDisabled,
  minLength = 9
): boolean {
  if (!value) return false;
  const _value = value.toString();

  const resultUpperCase =
    disabled?.charUpperCase || contains(_value, REGEX_UPPER_CASE, { caseSensitive: true });

  const resultMinLength = _value?.length >= minLength;

  const resultCharSpecial = disabled?.charSpecial || contains(_value, REGEX_CHAR_SPECIAL);

  const resultNumber = disabled?.number || contains(_value, REGEX_NUMBER);

  return resultUpperCase && resultMinLength && resultCharSpecial && resultNumber;
}
