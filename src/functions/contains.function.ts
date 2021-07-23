import { removeAccents } from "./remove-accents.function";

interface IContainsOption {
  removeAccents?: boolean;
  caseSensitive?: boolean;
  removeSpace?: boolean;
}

export function contains(
  work: string,
  compare: string | RegExp,
  options?: IContainsOption
): boolean {
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
    work = removeAccents(work);
    if (typeof compare === "string") {
      compare = removeAccents(compare);
    }
  }
  if (!options?.caseSensitive) {
    work = work.toLowerCase();
    if (typeof compare === "string") {
      compare = compare.toLowerCase();
    }
  }
  if (options?.removeSpace) {
    work = work.replace(/ +/g, "");
    if (typeof compare === "string") {
      compare = compare.replace(/ +/g, "");
    }
  }

  return work?.match(compare) !== null;
}
