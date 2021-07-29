import { masked } from "../../src/utils";

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

  it("Mask with mask custom with update 'format' & 'unformed'", () => {
    const input = document.createElement("input");
    const mask = masked("TEL");
    mask.bind(input);
    input.value = "11932152532";
    expect(input.value).toBe("11932152532");
    mask.update("11932152532");
    expect(input.value).toBe("(11) 9 3215-2532");
  });

  it("Mask with mask custom with update 'format' & 'unformed'", () => {
    const input = document.createElement("input");
    const mask = masked("TEL");
    mask.bind(input);
    writeAll(input, "11932152532");
    expect(input.value).toBe("(11) 9 3215-2532");
  });
});
