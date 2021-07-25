import { REGEX_CHAR_SPECIAL, REGEX_NUMBER, REGEX_UPPER_CASE } from "../../regex";
import { contains } from "./contains.validation";

export interface IPasswordOptionsDisabled {
  charUpperCase?: boolean;
  charSpecial?: boolean;
  number?: boolean;
}

export function isPassword(
  value: string,
  disabled?: IPasswordOptionsDisabled,
  minLength = 9
): boolean {
  if (!value) return false;

  const resultUpperCase =
    disabled?.charUpperCase || contains(value, REGEX_UPPER_CASE, { caseSensitive: true });

  const resultMinLength = value?.length >= minLength;

  const resultCharSpecial = disabled?.charSpecial || contains(value, REGEX_CHAR_SPECIAL);

  const resultNumber = disabled?.number || contains(value, REGEX_NUMBER);

  return resultUpperCase && resultMinLength && resultCharSpecial && resultNumber;
}
