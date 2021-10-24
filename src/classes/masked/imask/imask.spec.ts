import { maskIMask, MaskIMask } from "./mask-imask";
import { writeAll } from "../../../utils-test/write-all";
import { sleep } from "./../../../functions/sleep.function";

describe(`Class ${MaskIMask.name}`, () => {
  it("Test value null", () => {
    const mask = maskIMask({ mask: "(00) 0 0000-0000" });
    expect(mask.mask(null)).toBe("");
    expect(mask.unmask(null)).toBe("");
  });

  it("Test value string", () => {
    const mask = maskIMask({ mask: "(00) 0 0000-0000" });
    expect(mask.mask("10")).toBe("(10");
    expect(mask.mask("10.32")).toBe("(10) 3 2");
    expect(mask.unmask("(10) 3 2")).toBe("1032");
  });

  it("Test value string empty", () => {
    const mask = maskIMask({ mask: "(00) 0 0000-0000" });
    expect(mask.mask("")).toBe("");
    expect(mask.unmask("")).toBe("");
  });

  it("Test value number", () => {
    const mask = maskIMask({ mask: "(00) 0 0000-0000" });
    expect(mask.mask(10)).toBe("(10");
    expect(mask.mask(10.32)).toBe("(10) 3 2");
    expect(mask.unmask(10.32)).toBe("1032");
  });

  it("Mask with string 'format' & 'unformed'", () => {
    const mask = maskIMask("000.000");
    expect(mask.mask("123456")).toBe("123.456");
    expect(mask.unmask("123.456")).toBe("123456");
  });

  it("Mask with mask dynamic 'format' & 'unformed'", () => {
    const mask = maskIMask("000.000||00-00.0000");
    expect(mask.mask("123456")).toBe("123.456");
    expect(mask.unmask("123.456")).toBe("123456");

    expect(mask.mask("1234567")).toBe("12-34.567");
    expect(mask.unmask("12-34.567")).toBe("1234567");
  });

  it("Mask with mask send config 'format' & 'unformed'", () => {
    const mask = maskIMask({ mask: [{ mask: "000.000" }, { mask: "00-00.0000" }] });
    expect(mask.mask("123456")).toBe("123.456");
    expect(mask.unmask("123.456")).toBe("123456");

    expect(mask.mask("1234567")).toBe("12-34.567");
    expect(mask.unmask("12-34.567")).toBe("1234567");
  });

  it("Mask with string and placeholder 'format' & 'unformed'", () => {
    const mask = maskIMask("000.000", { lazy: false });
    expect(mask.mask("12")).toBe("12_.___");
    expect(mask.unmask("123.456")).toBe("123456");
  });

  it("Mask bind input text", () => {
    const input = document.createElement("input");
    const mask = maskIMask("000.000.000-00");
    mask.bind(input);
    writeAll(input, "3125743232");
    expect((mask.element as HTMLInputElement).value).toBe("312.574.323-2");
  });

  it("Mask bind input text update", async () => {
    const input = document.createElement("input");
    const mask = maskIMask("000.000.000-00");
    mask.bind(input);
    await sleep();
    input.value = "3125743232";
    mask.update();
    expect((mask.element as HTMLInputElement).value).toBe("312.574.323-2");
  });
});
