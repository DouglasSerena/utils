import { MaskVanillaMasker, maskVanillaMasker } from "../../src/utils";
import { writeOnePerOne } from "../mocks/write-one-per-one";

describe(`Class ${MaskVanillaMasker.name}`, () => {
  it("Test value null", () => {
    const mask = maskVanillaMasker();
    expect(mask.mask(null)).toBe("0,00");
    expect(mask.unmask(null)).toBe(0);
  });

  it("Test value string", () => {
    const mask = maskVanillaMasker();
    expect(mask.mask("10")).toBe("10,00");
    expect(mask.mask("10.32")).toBe("10,32");
    expect(mask.unmask("10.32")).toBe(10.32);
  });

  it("Test value string empty", () => {
    const mask = maskVanillaMasker();
    expect(mask.mask("")).toBe("0,00");
    expect(mask.unmask("")).toBe(0);
  });

  it("Test value number", () => {
    const mask = maskVanillaMasker();
    expect(mask.mask(10)).toBe("10,00");
    expect(mask.mask(10.32)).toBe("10,32");
    expect(mask.unmask(10.32)).toBe(10.32);
  });

  it("Mask default 'format' & 'unformed'", () => {
    const mask = maskVanillaMasker();
    expect(mask.mask(1234.56)).toBe("1.234,56");
    expect(mask.mask("1234.56")).toBe("1.234,56");
    expect(mask.unmask("1.234,56")).toBe(1234.56);
  });

  it("Mask with config 'format' & 'unformed'", () => {
    const mask = maskVanillaMasker({
      precision: 2,
      separator: ".",
      delimiter: ",",
    });
    expect(mask.mask(1224.2)).toBe("1,224.20");
    expect(mask.mask(12.32)).toBe("12.32");
    expect(mask.mask(".010")).toBe("0.01");
    expect(mask.mask("10")).toBe("10.00");
    expect(mask.unmask("123.200")).toBe(123.2);
    expect(mask.unmask("3,123.201")).toBe(3123.201);
  });

  it("Mask with config 'format' & 'unformed'", () => {
    const mask = maskVanillaMasker({
      precision: 2,
      separator: ",",
      delimiter: ".",
    });
    expect(mask.mask(1224.2)).toBe("1.224,20");
    expect(mask.mask(12.32)).toBe("12,32");
    expect(mask.mask("0.010")).toBe("0,01");
    expect(mask.mask("10")).toBe("10,00");
    expect(mask.unmask("123,200")).toBe(123.2);
    expect(mask.unmask("3.123,201")).toBe(3123.201);
  });

  it("Mask bind input text", () => {
    const input = document.createElement("input");
    const mask = maskVanillaMasker();
    mask.bind(input);
    writeOnePerOne(input, "1231");
    expect((mask.element as HTMLInputElement).value).toBe("12,31");
  });

  it("Mask bind input text", () => {
    const input = document.createElement("input");
    const mask = maskVanillaMasker();
    mask.bind(input);
    expect((mask.element as HTMLInputElement).value).toBe("0,00");
  });
});
