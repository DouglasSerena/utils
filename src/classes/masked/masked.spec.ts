import { masked } from "./masked";
import { writeAll } from "../../utils-test/write-all";
import { writeOnePerOne } from "../../utils-test/write-one-per-one";

describe("Function masked", () => {
  it("Mask with string 'format' & 'unformed'", () => {
    const mask = masked("000.000");
    expect(mask.mask("123456")).toBe("123.456");
    expect(mask.unmask("123.456")).toBe("123456");
  });

  it("Mask with mask custom 'format' & 'unformed'", () => {
    const mask = masked("TEL", { lazy: false });
    expect(mask.mask("11932152532")).toBe("(11) 9 3215-2532");
    expect(mask.unmask("(11) 9 3215-2532")).toBe("11932152532");
  });

  it("Mask with config mask send by pattern (imaks) 'format' & 'unformed'", () => {
    const mask = masked({ mask: "(00) 0 0000-0000" });
    expect(mask.mask("11932152532")).toBe("(11) 9 3215-2532");
    expect(mask.unmask("(11) 9 3215-2532")).toBe("11932152532");
  });

  it("Mask with config mask send by pattern (money) 'format' & 'unformed'", () => {
    const mask = masked({ separator: ",", delimiter: "." });
    expect(mask.mask(100.4)).toBe("100,40");
    expect(mask.unmask("100,40")).toBe(100.4);
    expect(mask.mask("1030.2")).toBe("1.030,20");
    expect(mask.unmask("1.030,20")).toBe(1030.2);
    expect(mask.mask("100.000,02")).toBe("100.000,02");
    expect(mask.unmask("100.000,02")).toBe(100000.02);
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
    input.value = "100000";
    mask.update();
    expect(input.value).toBe("1,000.00");
  });

  it("Mask with mask CURRENCY", () => {
    const input = document.createElement("input");
    const mask = masked("CURRENCY");
    mask.bind(input);
    writeOnePerOne(input, "100000");
    expect(input.value).toBe("1,000.00");
  });

  it("Mask with mask AMOUNT", () => {
    const input = document.createElement("input");
    const mask = masked("AMOUNT");
    mask.bind(input);
    writeOnePerOne(input, "1000000");
    expect(input.value).toBe("1000.000");
  });

  it("Mask with mask percent", () => {
    const input = document.createElement("input");
    const mask = masked("percent");
    mask.bind(input);
    writeOnePerOne(input, "100000");
    expect(input.value).toBe("1000,00");
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
