import { getNode } from "../functions/object/get-node.function";
import { $extends } from "../functions/object/extends.function";
import { themeSystem } from "../functions/theme-system.function";
import {
  isEqual,
  isFalse,
  isInstanceof,
  isObject,
  isString,
} from "../validations/common/common.validation";
import { ColorScheme, IColors, ITheme, IConfigTheme } from "./theme.type";

let _themes: ITheme = {};
let _config: IConfigTheme = {
  prefix: "color",
  use: themeSystem() || "light",
  disableSystemBasedColorShift: false,
  _element: document.createElement("style"),
};

window?.matchMedia?.("(prefers-color-scheme: dark)")?.addEventListener("change", (event) => {
  if (isFalse(_config.disableSystemBasedColorShift)) {
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
    $extends(_themes, themes);
    $extends(_config, config);

    if (!document.head.contains(this.element)) {
      document.head.appendChild(this.element);
    }
  }

  public get isDark(): boolean {
    return isEqual(this.use, "dark");
  }
  public get isLight(): boolean {
    return isEqual(this.use, "light");
  }
  public get isNoPreference(): boolean {
    return isEqual(this.use, "no-preference");
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
    if (isObject(color)) {
      return (color as IColors).default;
    }
    return color as string;
  }

  private generatorStyle(): string {
    let style = [`color-scheme: ${this.use}`];
    const colors = _themes[this.use];

    if (isObject(_themes.global)) {
      style = style.concat(this.generatorStyleContent(_themes.global));
    }
    if (isObject(colors)) {
      style = style.concat(this.generatorStyleContent(colors));
    }

    return `:root{${style.join(";")};}`;
  }
  private generatorStyleContent(colors: { [key: string]: string | IColors }) {
    return Object.keys(colors).reduce((prev, colorType) => {
      if (isString(colors[colorType])) {
        prev.push(`--${this.prefix}-${colorType}: ${colors[colorType]}`);
      } else {
        Object.keys(colors[colorType]).forEach((colorName) => {
          const value = colors[colorType][colorName];
          if (isEqual(colorName, "default")) {
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
  $extends(_config, config);
};
theme.theme = (themes: ITheme): void => {
  $extends(_themes, themes);
};
theme.isTheme = (prop: unknown): prop is Theme => isInstanceof(prop, Theme);
