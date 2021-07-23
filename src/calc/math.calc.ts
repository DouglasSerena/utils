import { AnyCalc, Calc } from ".";
import { parseNumber } from "../functions";
import { isInstance } from "../validations";

const convertValues = (value: AnyCalc, twoValue: AnyCalc): [number, number] => {
  if (isInstance(value, Calc)) {
    value = (value as Calc).valueRaw;
  } else {
    value = parseNumber(value as number);
  }
  if (isInstance(twoValue, Calc)) {
    twoValue = (twoValue as Calc).valueRaw;
  } else {
    twoValue = parseNumber(twoValue as number);
  }
  return [value, twoValue];
};

export const add = (value: AnyCalc, twoValue: AnyCalc): number => {
  const [one, two] = convertValues(value, twoValue);
  return one + two;
};

export const subtract = (value: AnyCalc, twoValue: AnyCalc): number => {
  const [one, two] = convertValues(value, twoValue);
  return one - two;
};

export const multiply = (value: AnyCalc, twoValue: AnyCalc): number => {
  const [one, two] = convertValues(value, twoValue);
  return one * two;
};

export const divide = (value: AnyCalc, twoValue: AnyCalc): number => {
  const [one, two] = convertValues(value, twoValue);
  return one / two;
};

export const increment = (value: AnyCalc, increment: AnyCalc): number => {
  const [_value, _increment] = convertValues(value, increment);

  return _increment > 0 ? Math.round(_value / _increment) * _increment : _value;
};

export const distribute = (value: AnyCalc, number: AnyCalc): number[] => {
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
