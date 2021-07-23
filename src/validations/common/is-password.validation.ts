import { contains } from "../../functions";
import {
  REGEX_CHAR_SPECIAL,
  REGEX_NUMBER,
  REGEX_UPPER_CASE,
} from "../../regex";

export function isPassword(
  value: string,
  disabled?: {
    charUpperCase?: boolean;
    charSpecial?: boolean;
    number?: boolean;
  },
  minLength = 9
): boolean {
  const resultUpperCase =
    disabled?.charUpperCase ||
    contains(value, REGEX_UPPER_CASE, { caseSensitive: true });

  const resultMinLength = value?.length >= minLength;

  const resultCharSpecial =
    disabled?.charSpecial || contains(value, REGEX_CHAR_SPECIAL);

  const resultNumber = disabled?.number || contains(value, REGEX_NUMBER);

  return (
    resultUpperCase && resultMinLength && resultCharSpecial && resultNumber
  );
}
