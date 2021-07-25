import { theme } from "./../../src/theme";

describe("Function theme", () => {
  it("Create theme", () => {
    theme({
      dark: {
        primary: {
          default: "#333",
        },
        secondary: "#553",
      },
    }).createStyle();

    expect(theme().style).toEqual(
      `:root{color-scheme: dark;--color-primary: #333;--color-secondary: #553;}`
    );

    theme({
      dark: {
        primary: {
          light: "#21312",
        },
      },
    }).createStyle();

    expect(theme().style).toEqual(
      `:root{color-scheme: dark;--color-primary: #333;--color-primary-light: #21312;--color-secondary: #553;}`
    );
  });

  it("Change", () => {
    theme().reset();
    theme(
      {
        dark: { primary: "#000" },
        light: { primary: "#fff" },
        "no-preference": { primary: "#777" },
      },
      { use: "light" }
    ).createStyle();

    expect(theme().style).toEqual(`:root{color-scheme: light;--color-primary: #fff;}`);

    theme().change("dark");
    expect(theme().style).toEqual(`:root{color-scheme: dark;--color-primary: #000;}`);

    theme().change("no-preference");
    expect(theme().style).toEqual(`:root{color-scheme: no-preference;--color-primary: #777;}`);
  });

  it("is theme", () => {
    theme().reset();
    theme(
      {
        dark: { primary: "#000" },
        light: { primary: "#fff" },
        "no-preference": { primary: "#777" },
      },
      { use: "light" }
    ).createStyle();

    expect(theme().isLight).toBe(true);
    expect(theme().isDark).toBe(false);
    expect(theme().isNoPreference).toBe(false);

    theme().change("dark");
    expect(theme().isLight).toBe(false);
    expect(theme().isDark).toBe(true);
    expect(theme().isNoPreference).toBe(false);

    theme().change("no-preference");
    expect(theme().isLight).toBe(false);
    expect(theme().isDark).toBe(false);
    expect(theme().isNoPreference).toBe(true);
  });
});
