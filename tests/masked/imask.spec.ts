import { MaskIMask, maskIMask } from "./../../src/utils";

function writeAll(element: HTMLElement, value: string | number) {
  const event = document.createEvent("HTMLEvents");
  event.initEvent("input", false, true);
  if (element instanceof HTMLInputElement) {
    element.value = element.value + value;
    element.dispatchEvent(event);
  } else {
    element.textContent = element.textContent + value;
    element.dispatchEvent(event);
  }
}

describe(`Class ${MaskIMask.name}`, () => {
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
});
