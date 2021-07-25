import { parseNumber } from "../functions/parse-number.function";

const convertValues = (value: string | number, twoValue: string | number): [number, number] => {
  value = parseNumber(value as number);
  twoValue = parseNumber(twoValue as number);
  return [value, twoValue];
};

export const add = (value: string | number, twoValue: string | number): number => {
  const [one, two] = convertValues(value, twoValue);
  return one + two;
};

export const subtract = (value: string | number, twoValue: string | number): number => {
  const [one, two] = convertValues(value, twoValue);
  return one - two;
};

export const multiply = (value: string | number, twoValue: string | number): number => {
  const [one, two] = convertValues(value, twoValue);
  return one * two;
};

export const divide = (value: string | number, twoValue: string | number): number => {
  const [one, two] = convertValues(value, twoValue);
  return one / two;
};

export const increment = (value: string | number, increment: string | number): number => {
  const [_value, _increment] = convertValues(value, increment);

  return _increment > 0 ? Math.round(_value / _increment) * _increment : _value;
};

export const distribute = (value: string | number, number: string | number): number[] => {
  const [_valueInit, _number] = convertValues(value, number);
  const array: number[] = [];
  let index = _number;

  const _value = divide(_valueInit, number);
  for (; index > 0; index--) {
    if (index === 1) {
      array.push(subtract(_valueInit, multiply(_value, _number - 1)));
    } else {
      array.push(_value);
    }
  }
  return array;
};
