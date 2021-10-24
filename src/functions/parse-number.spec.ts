import { parseNumber } from "./parse-number.function";

describe("function parseNumber", () => {
  it("String to number", () => {
    expect(parseNumber("10.25")).toBe(10.25);
  });

  it("String to number with decimal ','", () => {
    expect(parseNumber("10,254312312", { decimal: "," })).toBe(10.254312312);
  });

  it("String to number with prefix", () => {
    expect(parseNumber("R$ 10,25", { decimal: "," })).toBe(10.25);
    expect(parseNumber("R$ 512.3 awd10,25 dawd", { decimal: ",", thousands: "." })).toBe(512310.25);
  });

  it("String to number with decimal ',' and thousands '.'", () => {
    expect(parseNumber("1.000.100,254312312", { thousands: ".", decimal: "," })).toBe(
      1000100.254312312
    );
  });

  it("String to number with decimal '.' and thousands ','", () => {
    expect(parseNumber("1,000,100.254312312", { thousands: ",", decimal: "." })).toBe(
      1000100.254312312
    );
  });

  it("String to number with decimal ',' and thousands '.'", () => {
    expect(parseNumber("1.000.100,254312312", { thousands: ".", decimal: "," })).toBe(
      1000100.254312312
    );
  });

  it("String to number with decimal ',' and thousands '.'", () => {
    expect(parseNumber("1.000.100,254312312", { thousands: ".", decimal: "," })).toBe(
      1000100.254312312
    );
  });
});
