import { MaskVanillaMasker, maskVanillaMasker } from "../../src/utils";
import { writeOnePerOne } from "../mocks/write-one-per-one";

describe(`Class ${MaskVanillaMasker.name}`, () => {
  it("Mask default 'format' & 'unformed'", () => {
    const mask = maskVanillaMasker();
    expect(mask.mask("1234.56")).toBe("1.234,56");
    expect(mask.unmask("1.234,56")).toBe(1234.56);
  });

  it("Mask with config 'format' & 'unformed'", () => {
    const mask = maskVanillaMasker({
      precision: 3,
      separator: ".",
      delimiter: "",
    });
    expect(mask.mask(".010")).toBe("0.010");
    expect(mask.mask("10")).toBe("10.000");
    expect(mask.unmask("123.200")).toBe(123.2);
    expect(mask.unmask("123.201")).toBe(123.201);
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
