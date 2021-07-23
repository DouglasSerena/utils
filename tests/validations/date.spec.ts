import dayjs from "dayjs";
import { validate } from "./../../src/validations";

describe("Function validate date", () => {
  it("Is date", () => {
    expect(validate("2021-06-05").isDate()).toBe(true);
    expect(validate(new Date()).isDate()).toBe(true);
    expect(validate(dayjs()).isDate()).toBe(true);
    expect(validate(2).isDate()).toBe(true);
  });

  it("Is after date", () => {
    expect(validate("99999-01-01").isAfterDate(new Date())).toBe(true);
    expect(validate("0001-01-01").isAfterDate(new Date())).toBe(false);
  });

  it("Is before date", () => {
    expect(validate("0001-01-01").isBeforeDate(new Date())).toBe(true);
    expect(validate("99999-01-01").isBeforeDate(new Date())).toBe(false);
  });

  it("Is between date", () => {
    expect(validate("0001-01-02").isBetweenDate({ start: "0001-01-01", end: new Date() })).toBe(
      true
    );
    expect(validate("0001-01-03").isBetweenDate({ start: "0001-01-01", end: "0001-01-02" })).toBe(
      false
    );
  });

  it("Is between date", () => {
    expect(validate(dayjs().subtract(18, "years")).isBirthDateValidation({ min: 18 })).toBe(true);
    expect(validate(dayjs().subtract(18, "years")).isBirthDateValidation({ max: 10 })).toBe(false);
    expect(
      validate(dayjs().subtract(101, "years")).isBirthDateValidation({ min: 18, max: 100 })
    ).toBe(false);
    expect(
      validate(dayjs().subtract(21, "years")).isBirthDateValidation({ min: 18, max: 100 })
    ).toBe(true);
  });

  it("Is equal date", () => {
    expect(validate(dayjs()).isEqualDate(new Date())).toBe(true);
    expect(validate(dayjs().add(1, "day")).isEqualDate(dayjs())).toBe(false);
  });

  it("Is different date", () => {
    expect(validate(dayjs().add(1, "day")).isDifferentDate(dayjs())).toBe(true);
    expect(validate(dayjs()).isDifferentDate(new Date())).toBe(false);
  });
});
