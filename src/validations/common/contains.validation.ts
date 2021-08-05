import { removeAccents } from "../../functions/remove-accents.function";

export interface IContainsOption {
  removeAccents?: boolean;
  caseSensitive?: boolean;
  removeSpace?: boolean;
}

export function contains<T = string>(
  value: T,
  compare: string | RegExp,
  options?: IContainsOption
): boolean {
  if (!value) return false;
  let _value = value.toString();

  options = Object.assign(
    {},
    {
      removeSpace: true,
      removeAccents: true,
      caseSensitive: false,
    } as IContainsOption,
    options
  );
  if (options?.removeAccents) {
    _value = removeAccents(_value);
    if (typeof compare === "string") {
      compare = removeAccents(compare);
    }
  }
  if (!options?.caseSensitive) {
    _value = _value.toLowerCase();
    if (typeof compare === "string") {
      compare = compare.toLowerCase();
    }
  }
  if (options?.removeSpace) {
    _value = _value.replace(/ +/g, "");
    if (typeof compare === "string") {
      compare = compare.replace(/ +/g, "");
    }
  }

  const match = _value?.match(compare);

  return !!match;
}
