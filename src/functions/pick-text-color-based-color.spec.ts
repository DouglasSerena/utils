import { pickTextColorBasedColor } from "./pick-text-color-based-color";

describe(`function ${pickTextColorBasedColor.name}`, () => {
  it("Get text color light or dark with based color (black)", () => {
    const textColor = pickTextColorBasedColor("#e53935");

    expect(textColor).toBe("#000000");
  });

  it("Get text color with based color (white)", () => {
    const textColor = pickTextColorBasedColor("#d32f2f");

    expect(textColor).toBe("#ffffff");
  });

  it("Get text color light or dark custom with based color (#d32f2f)", () => {
    const textColor = pickTextColorBasedColor("#d32f2f", "#d32f2f", "#e53935");

    expect(textColor).toBe("#d32f2f");
  });
});
