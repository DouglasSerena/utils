import { mergeObject } from "../functions";
import { validate } from "../validations";
import { ColorScheme, ITheme, IThemeConfig } from "./theme.type";

let _themes: ITheme = {};
const _config: IThemeConfig = {
  use: "dark",
  _element: document.createElement("style"),
};

export function theme(themes?: ITheme, config?: IThemeConfig): Theme {
  return new Theme(themes, config);
}

export class Theme {
  public get themes(): ITheme {
    return _themes;
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
    _themes = {};
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
    const style = [`color-scheme: ${this.use}`];
    const colors = _themes[this.use];
    Object.keys(colors).forEach((colorType) => {
      if (validate(colors[colorType]).isString()) {
        style.push(`--color-${colorType}: ${colors[colorType]}`);
      } else {
        Object.keys(colors[colorType]).forEach((colorName) => {
          const value = colors[colorType][colorName];
          if (validate(colorName).isEqual("default")) {
            style.push(`--color-${colorType}: ${value}`);
          } else {
            style.push(`--color-${colorType}-${colorName}: ${value}`);
          }
        });
      }
    });
    return `:root{${style.join(";")};}`;
  }
}

theme.config = (config: IThemeConfig): void => {
  mergeObject(_config, config);
};
theme.theme = (themes: ITheme): void => {
  mergeObject(_themes, themes);
};
theme.isTheme = (prop: any): boolean => validate(prop).isInstanceOf(Theme);
