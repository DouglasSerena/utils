import { theme } from "./../../src/theme";

describe("Function theme", () => {
  it("Create theme", () => {
    theme({
      light: {
        primary: {
          default: "#333",
        },
        secondary: "#553",
      },
    }).createStyle();

    expect(theme().style).toEqual(
      `:root{color-scheme: light;--color-primary: #333;--color-secondary: #553;}`
    );

    theme({
      light: {
        primary: {
          light: "#21312",
        },
      },
    }).createStyle();

    expect(theme().style).toEqual(
      `:root{color-scheme: light;--color-primary: #333;--color-primary-light: #21312;--color-secondary: #553;}`
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

  it("Var Global", () => {
    theme().reset();
    theme({
      global: { text: { light: "#212" } },
      dark: { primary: "#000" },
      light: { primary: "#fff" },
    }).createStyle();

    expect(theme().style).toEqual(
      `:root{color-scheme: light;--color-text-light: #212;--color-primary: #fff;}`
    );

    theme().change("dark");
    expect(theme().style).toEqual(
      `:root{color-scheme: dark;--color-text-light: #212;--color-primary: #000;}`
    );
  });

  it("Var prefix", () => {
    theme().reset();
    theme(
      {
        global: { text: { light: "#212" } },
        light: { primary: "#000" },
      },
      { prefix: "app" }
    ).createStyle();

    expect(theme().style).toEqual(
      `:root{color-scheme: light;--app-text-light: #212;--app-primary: #000;}`
    );
  });

  it("Theme system", () => {
    theme().reset();
    theme({
      global: { text: { light: "#212" } },
      dark: { primary: "#000" },
    }).createStyle();

    expect(theme().themeSystem).toEqual(`light`);
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
