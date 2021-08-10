import {
  isBeforeNumber,
  isDifferentNumber,
  isEqualNumber,
  isFloat,
  isLess,
  isLessOrEqual,
  isMore,
  isMoreOrEqual,
  isNegative,
  isNumber,
  isNumeric,
} from "./../../src/validations/number.validation";

describe("Function validate date", () => {
  it("Is numeric", () => {
    expect(isNumeric(2)).toBe(true);
    expect(isNumeric(2.2)).toBe(true);
    expect(isNumeric("2")).toBe(true);
    expect(isNumeric("d")).toBe(false);
    expect(isNumeric([])).toBe(false);
    expect(isNumeric({})).toBe(false);
    expect(isNumeric(true)).toBe(false);
  });

  it("Is number", () => {
    expect(isNumber(2)).toBe(true);
    expect(isNumber("2")).toBe(false);
  });

  it("Is float", () => {
    expect(isFloat(2)).toBe(false);
    expect(isFloat(2.2)).toBe(true);
    expect(isFloat("2")).toBe(false);
    expect(isFloat("2.2")).toBe(true);
  });

  it("Is negative", () => {
    expect(isNegative(2)).toBe(false);
    expect(isNegative(-2)).toBe(true);
    expect(isNegative("-2")).toBe(true);
  });

  it("Is equal number", () => {
    expect(isEqualNumber(2, 3)).toBe(false);
    expect(isEqualNumber(2.2, 2.2)).toBe(true);
  });

  it("Is different number", () => {
    expect(isDifferentNumber(2.2, 2.2)).toBe(false);
    expect(isDifferentNumber(2, 3)).toBe(true);
  });

  it("Is more", () => {
    expect(isMore(2, 4)).toBe(false);
    expect(isMore(2.2, 2)).toBe(true);

    expect(isMoreOrEqual(0.5, 1)).toBe(false);
    expect(isMoreOrEqual(3, 3)).toBe(true);
  });

  it("Is less", () => {
    expect(isLess(2, 1)).toBe(false);
    expect(isLess(2.2, 3)).toBe(true);

    expect(isLessOrEqual(2, 1)).toBe(false);
    expect(isLessOrEqual(3, 3)).toBe(true);
  });

  it("Is before number", () => {
    expect(isBeforeNumber(2, { end: 10 })).toBe(true);
    expect(isBeforeNumber(15, { start: 10, end: 20 })).toBe(true);
    expect(isBeforeNumber(2, { start: 3, end: 10 })).toBe(false);
  });
});
