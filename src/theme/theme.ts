import { getNode } from "../functions/object/get-node.function";
import { $extends } from "../functions/object/extends.function";
import { themeSystem } from "../functions/theme-system.function";
import { ColorScheme, IColors, ITheme, IConfigTheme } from "./theme.type";
import { isFalsy } from "../utils";

let _config: IConfigTheme = {
  prefix: "color",
  use: themeSystem() || "light",
  disableSystemBasedColorShift: false,
  _element: document.createElement("style"),
};

window?.matchMedia?.("(prefers-color-scheme: dark)")?.addEventListener("change", (event) => {
  if (isFalsy(_config.disableSystemBasedColorShift)) {
    theme().change(themeSystem() || "light");
  }
});

export function theme(themes?: ITheme, config?: IConfigTheme): Theme {
  return new Theme(themes, config);
}

export class Theme {
  public static _themes: ITheme = {};

  /**
   * @public
   * @description Este observador é nativo do javascript então
   * você ficar responsavel por destruir este observador
   * @example Theme.destroyChangeTheme(listener) */
  public static onChangeTheme: typeof MediaQueryList["prototype"]["addEventListener"] = window
    ?.matchMedia?.("(prefers-color-scheme: dark)")
    ?.addEventListener.bind(window);

  /**
   * @public
   * @description Este metodo é usado para destruir os observador usados no onChangeTheme */
  public static destroyChangeTheme = (
    listener: (this: MediaQueryList, ev: MediaQueryListEvent) => any
  ): void =>
    window?.matchMedia?.("(prefers-color-scheme: dark)")?.removeEventListener("change", listener);

  public get themes(): ITheme {
    return Theme._themes;
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
    $extends(Theme._themes, themes);
    $extends(_config, config);

    if (!document.head.contains(this.element)) {
      document.head.appendChild(this.element);
    }
  }

  public get isDark(): boolean {
    return this.use === "dark";
  }
  public get isLight(): boolean {
    return this.use === "light";
  }
  public get isNoPreference(): boolean {
    return this.use === "no-preference";
  }

  /**
   * @private
   * @description Reseta todo o estilo */
  reset(): void {
    Theme._themes = {} as ITheme;
    _config = {
      use: this.themeSystem,
      _style: "",
      prefix: "color",
      disableChangeScheme: false,
      _element: _config._element,
    } as IConfigTheme;
  }

  /**
   * @private
   * @description Altera o tema do sistema podendo ser dark light ou o padrão */
  change(theme: ColorScheme): void {
    _config.use = theme;
    this.createStyle();
  }

  /**
   * @private
   * @description Cria todo o estilo baseado nas cores passadas no construtor */
  createStyle(): void {
    _config._style = this._generatorStyle();
    _config._element.innerHTML = this.style;
    document.body.classList.remove("theme-dark", "theme-light", "theme-no-preference");
    document.body.classList.add(`theme-${_config.use}`);
  }

  /**
   * @private
   * @description Pega a cor passada por paramento
   * @example getColor("dark.primary.light") */
  getColor(colors: string, currentTheme = true): string {
    const nodes = colors.split(".");
    if (currentTheme) {
      nodes.unshift(this.use);
    }
    const color = getNode<IColors | string>(this.themes, nodes);
    if (typeof color === "object") {
      return (color as IColors).default;
    }
    return color as string;
  }

  /**
   * @private
   * @description Gera o conteudo da tag de estilo */
  private _generatorStyle(): string {
    let style = [`color-scheme: ${this.use}`];
    const colors = Theme._themes[this.use];

    if (typeof Theme._themes.global === "object") {
      style = style.concat(this._generatorStyleVariables(Theme._themes.global));
    }
    if (typeof colors === "object") {
      style = style.concat(this._generatorStyleVariables(colors));
    }

    return `:root{${style.join(";")};}`;
  }

  /**
   * @private
   * @description Gera todas as variavel de estilo passadas pelo paramento */
  private _generatorStyleVariables(colors: { [key: string]: string | IColors }) {
    return Object.keys(colors).reduce((prev, colorType) => {
      if (typeof colors[colorType] === "string") {
        prev.push(`--${this.prefix}-${colorType}: ${colors[colorType]}`);
      } else {
        Object.keys(colors[colorType]).forEach((colorName) => {
          const value = colors[colorType][colorName];
          if (colorName === "default") {
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
  $extends(Theme._themes, themes);
};

export const isTheme = (prop: unknown): prop is Theme => prop instanceof Theme;
theme.isTheme = isTheme;
