import { removeAccents } from "../../functions";

export interface IContainsOption {
  removeAccents?: boolean;
  caseSensitive?: boolean;
  removeSpace?: boolean;
}

export function contains(
  value: string,
  compare: string | RegExp,
  options?: IContainsOption
): boolean {
  if (!value) return false;

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
    value = removeAccents(value);
    if (typeof compare === "string") {
      compare = removeAccents(compare);
    }
  }
  if (!options?.caseSensitive) {
    value = value.toLowerCase();
    if (typeof compare === "string") {
      compare = compare.toLowerCase();
    }
  }
  if (options?.removeSpace) {
    value = value.replace(/ +/g, "");
    if (typeof compare === "string") {
      compare = compare.replace(/ +/g, "");
    }
  }

  return value?.match(compare) !== null;
}
