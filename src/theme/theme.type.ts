export type ColorScheme = "dark" | "light" | "no-preference";

export interface ITheme {
  global?: { [key: string]: IColors | string };
  dark?: { [key: string]: IColors | string };
  light?: { [key: string]: IColors | string };
  "no-preference"?: { [key: string]: IColors | string };
}

export interface IColors {
  default?: string;
  [key: string]: string;
}

export interface IThemeConfig {
  use?: ColorScheme;
  prefix?: string;
  _style?: string;
  _element?: HTMLStyleElement;
  disableSystemBasedColorShift?: boolean;
}
