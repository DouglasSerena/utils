import { mergeObject, themeSystem } from "../functions";
import { validate } from "../validations";
import { ColorScheme, IColors, ITheme, IThemeConfig } from "./theme.type";

let _themes: ITheme = {};
let _config: IThemeConfig = {
  prefix: "color",
  use: themeSystem() || "light",
  disableSystemBasedColorShift: false,
  _element: document.createElement("style"),
};

window?.matchMedia?.("(prefers-color-scheme: dark)")?.addEventListener("change", (event) => {
  if (validate(_config.disableSystemBasedColorShift).isFalse()) {
    theme().change(themeSystem() || "light");
  }
});

export function theme(themes?: ITheme, config?: IThemeConfig): Theme {
  return new Theme(themes, config);
}

export class Theme {
  public get themes(): ITheme {
    return _themes;
  }
  public get prefix(): string {
    return _config.prefix;
  }
  public get style(): string {
    return _config._style;
  }
  public get use(): ColorScheme {
    return _config.use;
  }
  public get config(): IThemeConfig {
    return _config;
  }
  public get element(): HTMLStyleElement {
    return _config._element;
  }
  get themeSystem(): "dark" | "light" {
    return themeSystem() || "light";
  }

  constructor(themes?: ITheme, config?: IThemeConfig) {
    mergeObject(_themes, themes);
    mergeObject(_config, config);

    if (!document.head.contains(this.element)) {
      document.head.appendChild(this.element);
    }
  }

  public get isDark(): boolean {
    return validate(this.use).isEqual("dark");
  }
  public get isLight(): boolean {
    return validate(this.use).isEqual("light");
  }
  public get isNoPreference(): boolean {
    return validate(this.use).isEqual("no-preference");
  }

  reset() {
    _themes = {} as ITheme;
    _config = {
      use: this.themeSystem,
      _style: "",
      prefix: "color",
      disableChangeScheme: false,
      _element: _config._element,
    } as IThemeConfig;
  }

  change(theme: ColorScheme): void {
    _config.use = theme;
    this.createStyle();
  }

  createStyle(): void {
    _config._style = this.generatorStyle();
    _config._element.innerHTML = this.style;
  }

  private generatorStyle(): string {
    let style = [`color-scheme: ${this.use}`];
    const colors = _themes[this.use];

    if (validate(_themes.global).isObject()) {
      style = style.concat(this.generatorStyleContent(_themes.global));
    }
    if (validate(colors).isObject()) {
      style = style.concat(this.generatorStyleContent(colors));
    }

    return `:root{${style.join(";")};}`;
  }
  private generatorStyleContent(colors: { [key: string]: string | IColors }) {
    return Object.keys(colors).reduce((prev, colorType) => {
      if (validate(colors[colorType]).isString()) {
        prev.push(`--${this.prefix}-${colorType}: ${colors[colorType]}`);
      } else {
        Object.keys(colors[colorType]).forEach((colorName) => {
          const value = colors[colorType][colorName];
          if (validate(colorName).isEqual("default")) {
            prev.push(`--${this.prefix}-${colorType}: ${value}`);
          } else {
            prev.push(`--${this.prefix}-${colorType}-${colorName}: ${value}`);
          }
        });
      }
      return prev;
    }, []);
  }
}

theme.config = (config: IThemeConfig): void => {
  mergeObject(_config, config);
};
theme.theme = (themes: ITheme): void => {
  mergeObject(_themes, themes);
};
theme.isTheme = (prop: any): boolean => validate(prop).isInstanceOf(Theme);
