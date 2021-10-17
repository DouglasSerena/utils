import {
  isBeforeNumber,
  isFloat,
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

  it("Is before number", () => {
    expect(isBeforeNumber(2, { end: 10 })).toBe(true);
    expect(isBeforeNumber(15, { start: 10, end: 20 })).toBe(true);
    expect(isBeforeNumber(2, { start: 3, end: 10 })).toBe(false);
  });
});
