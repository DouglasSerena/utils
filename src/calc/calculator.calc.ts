import { parseNumber as pn } from "../functions/parse-number.function";

type TAnyValue = string | number;

export const add = (one: TAnyValue, two: TAnyValue): number => pn(one) + pn(two);
export const subtract = (one: TAnyValue, two: TAnyValue): number => pn(one) - pn(two);
export const multiply = (one: TAnyValue, two: TAnyValue): number => pn(one) * pn(two);
export const divide = (one: TAnyValue, two: TAnyValue): number => pn(one) / pn(two);

export const increment = (value: TAnyValue, increment: TAnyValue): number => {
  value = pn(value);
  increment = pn(increment);

  return increment > 0 ? Math.round(value / increment) * increment : value;
};

export const distribute = (value: TAnyValue, count: TAnyValue): number[] => {
  value = pn(value);
  count = pn(count);

  const array: number[] = [];
  let index = count;

  const _value = divide(value, count);
  for (; index > 0; index--) {
    if (index === 1) {
      array.push(subtract(value, multiply(_value, count - 1)));
    } else {
      array.push(_value);
    }
  }
  return array;
};
