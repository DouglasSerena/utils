import { getNode } from "../functions/object/get-node.function";
import { mergeObject } from "../functions/object/merge-object.function";
import { themeSystem } from "../functions/theme-system.function";
import { validate } from "../validations/validate.validation";
import { ColorScheme, IColors, ITheme, IConfigTheme } from "./theme.type";

let _themes: ITheme = {};
let _config: IConfigTheme = {
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

export function theme(themes?: ITheme, config?: IConfigTheme): Theme {
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
  public get config(): IConfigTheme {
    return _config;
  }
  public get element(): HTMLStyleElement {
    return _config._element;
  }
  get themeSystem(): "dark" | "light" {
    return themeSystem() || "light";
  }

  constructor(themes?: ITheme, config?: IConfigTheme) {
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

  reset(): void {
    _themes = {} as ITheme;
    _config = {
      use: this.themeSystem,
      _style: "",
      prefix: "color",
      disableChangeScheme: false,
      _element: _config._element,
    } as IConfigTheme;
  }

  change(theme: ColorScheme): void {
    _config.use = theme;
    this.createStyle();
  }

  createStyle(): void {
    _config._style = this.generatorStyle();
    _config._element.innerHTML = this.style;
    document.body.classList.remove("theme-dark", "theme-light", "theme-no-preference");
    document.body.classList.add(`theme-${_config.use}`);
  }

  getColor(colors: string, currentTheme = true): string {
    const nodes = colors.split(".");
    if (currentTheme) {
      nodes.unshift(this.use);
    }
    const color = getNode<IColors | string>(this.themes, nodes);
    if (validate(color).isObject()) {
      return (color as IColors).default;
    }
    return color as string;
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

theme.config = (config: IConfigTheme): void => {
  mergeObject(_config, config);
};
theme.theme = (themes: ITheme): void => {
  mergeObject(_themes, themes);
};
theme.isTheme = (prop: unknown): prop is Theme => validate(prop).isInstanceof(Theme);
