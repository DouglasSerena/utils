import { validate } from "./../../src/utils";

describe("Function validate date", () => {
  it("Is numeric", () => {
    expect(validate(2).isNumeric()).toBe(true);
    expect(validate(2.2).isNumeric()).toBe(true);
    expect(validate("2").isNumeric()).toBe(true);
    expect(validate("d").isNumeric()).toBe(false);
    expect(validate([]).isNumeric()).toBe(false);
    expect(validate({}).isNumeric()).toBe(false);
    expect(validate(true).isNumeric()).toBe(false);
  });

  it("Is number", () => {
    expect(validate(2).isNumber()).toBe(true);
    expect(validate("2").isNumber()).toBe(false);
  });

  it("Is float", () => {
    expect(validate(2).isFloat()).toBe(false);
    expect(validate(2.2).isFloat()).toBe(true);
  });

  it("Is equal number", () => {
    expect(validate(2).isEqualNumber(3)).toBe(false);
    expect(validate(2.2).isEqualNumber(2.2)).toBe(true);
  });

  it("Is different number", () => {
    expect(validate(2.2).isDifferentNumber(2.2)).toBe(false);
    expect(validate(2).isDifferentNumber(3)).toBe(true);
  });

  it("Is more", () => {
    expect(validate(2).isMore(4)).toBe(false);
    expect(validate(2.2).isMore(2)).toBe(true);

    expect(validate(0.5).isMoreOrEqual(1)).toBe(false);
    expect(validate(3).isMoreOrEqual(3)).toBe(true);
  });

  it("Is less", () => {
    expect(validate(2).isLess(1)).toBe(false);
    expect(validate(2.2).isLess(3)).toBe(true);

    expect(validate(2).isLessOrEqual(1)).toBe(false);
    expect(validate(3).isLessOrEqual(3)).toBe(true);
  });

  it("Is before number", () => {
    expect(validate(2).isBeforeNumber({ end: 10 })).toBe(true);
    expect(validate(15).isBeforeNumber({ start: 10, end: 20 })).toBe(true);
    expect(validate(2).isBeforeNumber({ start: 3, end: 10 })).toBe(false);
  });
});
