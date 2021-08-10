import dayjs from "dayjs";
import {
  isAfterDate,
  isBeforeDate,
  isBetweenDate,
  isBirthDateValid,
  isDateValid,
  isDifferentDate,
  isEqualDate,
} from "../../src/utils";

describe("Function validate date", () => {
  it("Is date", () => {
    expect(isDateValid("2021-06-05")).toBe(true);
    expect(isDateValid(new Date())).toBe(true);
    expect(isDateValid(dayjs())).toBe(true);
    expect(isDateValid(2)).toBe(true);
  });

  it("Is after date", () => {
    expect(isAfterDate("99999-01-01", new Date())).toBe(true);
    expect(isAfterDate("0001-01-01", new Date())).toBe(false);
  });

  it("Is before date", () => {
    expect(isBeforeDate("0001-01-01", new Date())).toBe(true);
    expect(isBeforeDate("99999-01-01", new Date())).toBe(false);
  });

  it("Is between date", () => {
    expect(isBetweenDate("0001-01-02", { start: "0001-01-01", end: new Date() })).toBe(true);
    expect(isBetweenDate("0001-01-03", { start: "0001-01-01", end: "0001-01-02" })).toBe(false);
  });

  it("Is between date", () => {
    expect(isBirthDateValid(dayjs().subtract(18, "years"), { min: 18 })).toBe(true);
    expect(isBirthDateValid(dayjs().subtract(18, "years"), { max: 10 })).toBe(false);
    expect(isBirthDateValid(dayjs().subtract(101, "years"), { min: 18, max: 100 })).toBe(false);
    expect(isBirthDateValid(dayjs().subtract(21, "years"), { min: 18, max: 100 })).toBe(true);
  });

  it("Is equal date", () => {
    expect(isEqualDate(dayjs(), new Date())).toBe(true);
    expect(isEqualDate(dayjs().add(1, "day"), dayjs())).toBe(false);
  });

  it("Is different date", () => {
    expect(isDifferentDate(dayjs().add(1, "day"), dayjs())).toBe(true);
    expect(isDifferentDate(dayjs(), new Date())).toBe(false);
  });
});
