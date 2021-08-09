import { masked } from "../../src/utils";
import { writeAll } from "../mocks/write-all";
import { writeOnePerOne } from "../mocks/write-one-per-one";

describe("Function masked", () => {
  it("Mask with string 'format' & 'unformed'", () => {
    const mask = masked("000.000");
    expect(mask.mask("123456")).toBe("123.456");
    expect(mask.unmask("123.456")).toBe("123456");
  });

  it("Mask with mask custom 'format' & 'unformed'", () => {
    const mask = masked("TEL");
    expect(mask.mask("11932152532")).toBe("(11) 9 3215-2532");
    expect(mask.unmask("(11) 9 3215-2532")).toBe("11932152532");
  });

  it("Mask with mask TEL bind input", () => {
    const input = document.createElement("input");
    const mask = masked("TEL");
    mask.bind(input);
    input.value = "11932152532";
    expect(input.value).toBe("11932152532");
    mask.update("11932152532");
    expect(input.value).toBe("(11) 9 3215-2532");
  });

  it("Mask with mask CURRENCY bind input", () => {
    const input = document.createElement("input");
    const mask = masked("CURRENCY");
    mask.bind(input);
    input.value = "1000";
    mask.update();
    expect(input.value).toBe("10.00");
  });

  it("Mask with mask CURRENCY", () => {
    const input = document.createElement("input");
    const mask = masked("CURRENCY");
    mask.bind(input);
    writeOnePerOne(input, "1000");
    expect(input.value).toBe("10.00");
  });

  it("Mask with mask AMOUNT", () => {
    const input = document.createElement("input");
    const mask = masked("AMOUNT");
    mask.bind(input);
    writeOnePerOne(input, "1000");
    expect(input.value).toBe("1.000");
  });

  it("Mask with mask percent", () => {
    const input = document.createElement("input");
    const mask = masked("percent");
    mask.bind(input);
    writeOnePerOne(input, "100000");
    expect(input.value).toBe("1\u200B000,00");
  });

  it("Mask with mask PERCENT", () => {
    const input = document.createElement("input");
    const mask = masked("PERCENT");
    mask.bind(input);
    writeOnePerOne(input, "1000");
    expect(input.value).toBe("10,00");
  });

  it("Mask with mask DATE", () => {
    const input = document.createElement("input");
    const mask = masked("DATE", { lazy: true });
    mask.bind(input);
    writeAll(input, "31122001");
    expect(input.value).toBe("31/12/2001");
  });

  it("Mask with mask DATE TIME", () => {
    const input = document.createElement("input");
    const mask = masked("DATE_TIME", { lazy: true });
    mask.bind(input);
    writeAll(input, "311220011230");
    expect(input.value).toBe("31/12/2001 12:30");
  });

  it("Mask with mask MONTH", () => {
    const input = document.createElement("input");
    const mask = masked("MONTH", { lazy: true });
    mask.bind(input);
    writeAll(input, "122001");
    expect(input.value).toBe("12/2001");
  });
});
