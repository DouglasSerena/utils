import { calc } from "./calc";

describe("Function calc", () => {
  it("Parse", () => {
    let result = calc("100.2123123123123123123");
    expect(result.value).toBe(100.21);
    expect(result.valueRaw).toBe(100.2123123123123123123);

    result = calc("100.2123123123123123123", { increment: 0.05 });
    expect(result.value).toBe(100.2);
    expect(result.valueRaw).toBe(100.2123123123123123123);
  });

  it("Config", () => {
    calc.config({ increment: 0.05 });

    const result = calc(calc("100.2123123123123123123"));
    expect(result.value).toBe(100.2);
    expect(result.valueRaw).toBe(100.2123123123123123123);

    calc.config({ increment: 0 });
  });

  it("Pass Calc to function calc", () => {
    let result = calc(calc("100.2123123123123123123"));
    expect(result.value).toBe(100.21);
    expect(result.valueRaw).toBe(100.2123123123123123123);

    result = calc(calc("100.2123123123123123123"), { increment: 0.05 });
    expect(result.value).toBe(100.2);
    expect(result.valueRaw).toBe(100.2123123123123123123);
  });

  it("Precision", () => {
    let result = calc("100.2123123123123123123", { precision: 3 });
    expect(result.value).toBe(100.212);
    expect(result.valueRaw).toBe(100.2123123123123123123);

    result = calc("100.2123123123123123123", { precision: 3, increment: 0.05 });
    expect(result.value).toBe(100.2);
    expect(result.valueRaw).toBe(100.2123123123123123123);
  });

  it("Add", () => {
    let result = calc("100.215").add("100.2154");
    expect(result.value).toBe(200.43);
    expect(result.valueRaw).toBe(200.43040000000002);

    result = calc("100.215", { increment: 0.05 }).add("100.2154");
    expect(result.value).toBe(200.45);
    expect(result.valueRaw).toBe(200.43040000000002);
  });

  it("Subtract", () => {
    let result = calc("100.2154").subtract("100.2153");
    expect(result.value).toBe(0);
    expect(result.valueRaw).toBe(0.00010000000000331966);

    result = calc("100.2154", { increment: 0.05 }).subtract("100.2153");
    expect(result.value).toBe(0);
    expect(result.valueRaw).toBe(0.00010000000000331966);

    result = calc("100.2454", { increment: 0.05 }).subtract("100.2153");
    expect(result.value).toBe(0.05);
    expect(result.valueRaw).toBe(0.030100000000004457);
  });

  it("Multiply", () => {
    let result = calc("100.2153").multiply("2");
    expect(result.value).toBe(200.43);
    expect(result.valueRaw).toBe(200.4306);

    result = calc("100.2153", { increment: 0.05 }).multiply("2");
    expect(result.value).toBe(200.45);
    expect(result.valueRaw).toBe(200.4306);
  });

  it("Divide", () => {
    let result = calc("100.215").divide("2");
    expect(result.value).toBe(50.11);
    expect(result.valueRaw).toBe(50.1075);

    result = calc("100.215", { increment: 0.05 }).divide("2");
    expect(result.value).toBe(50.1);
    expect(result.valueRaw).toBe(50.1075);
  });

  it("Distribute", () => {
    let result = calc("100").distribute("3");
    expect(result).toEqual([33.33, 33.33, 33.34]);

    result = calc("76").distribute("3");
    expect(result).toEqual([25.33, 25.33, 25.34]);

    result = calc("76", { increment: 0.05 }).distribute("3");
    expect(result).toEqual([25.35, 25.35, 25.3]);

    result = calc("6115.95", { increment: 0.05 }).distribute("1");
    expect(result).toEqual([6115.95]);
  });

  it("Keep between", () => {
    let result = calc("100.215").keepBetween({ min: 50, max: 100 });
    expect(result.value).toBe(100);
    expect(result.valueRaw).toBe(100);

    result = calc("42.32").keepBetween(100, 50);
    expect(result.value).toBe(50);
    expect(result.valueRaw).toBe(50);
  });
});
