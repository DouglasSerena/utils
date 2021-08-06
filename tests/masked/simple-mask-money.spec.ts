import { MaskSimpleMaskMoney, maskSimpleMaskMoney } from "../../src/utils";

function writeOnePerOne(element: HTMLElement, value: string | number) {
  const event = document.createEvent("HTMLEvents");
  for (let i = 0; i < value.toString().length; i++) {
    event.initEvent("input", false, true);
    if (element instanceof HTMLInputElement) {
      element.value = element.value + value[i];
      element.dispatchEvent(event);
    } else {
      element.textContent = element.textContent + value[i];
      element.dispatchEvent(event);
    }
  }
}

describe(`Class ${MaskSimpleMaskMoney.name}`, () => {
  it("Mask default 'format' & 'unformed'", () => {
    const mask = maskSimpleMaskMoney();
    expect(mask.mask("123456")).toBe("1.234,56");
    expect(mask.unmask("1.234,56")).toBe(1234.56);
  });

  it("Mask with config 'format' & 'unformed'", () => {
    const mask = maskSimpleMaskMoney({
      fractionDigits: 3,
      thousandsSeparator: "",
      decimalSeparator: ".",
    });
    expect(mask.mask(10)).toBe("0.010");
    expect(mask.mask("123456")).toBe("123.456");
    expect(mask.unmask("123.456")).toBe(123.456);
  });

  it("Mask bind input text", () => {
    const input = document.createElement("input");
    const mask = maskSimpleMaskMoney();
    mask.bind(input);
    writeOnePerOne(input, "1231");
    expect((mask.element as HTMLInputElement).value).toBe("12,31");
  });
});
