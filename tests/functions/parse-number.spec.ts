import { parseNumber } from "./../../src/functions";

describe("function parseNumber", () => {
  it("String to number", () => {
    expect(parseNumber("10.25")).toBe(10.25);
  });

  it("String to number with decimal ','", () => {
    expect(parseNumber("10,254312312", { decimal: "," })).toBe(10.254312312);
  });

  it("String to number with decimal ',' and thousands '.'", () => {
    expect(
      parseNumber("1.000.100,254312312", { thousands: ".", decimal: "," })
    ).toBe(1000100.254312312);
  });

  it("String to number with decimal '.' and thousands ','", () => {
    expect(
      parseNumber("1,000,100.254312312", { thousands: ",", decimal: "." })
    ).toBe(1000100.254312312);
  });

  it("String to number with decimal ',' and thousands '.'", () => {
    expect(
      parseNumber("1.000.100,254312312", { thousands: ".", decimal: "," })
    ).toBe(1000100.254312312);
  });

  it("String to number with decimal ',' and thousands '.'", () => {
    expect(
      parseNumber("1.000.100,254312312", { thousands: ".", decimal: "," })
    ).toBe(1000100.254312312);
  });
});
