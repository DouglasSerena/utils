export declare type ColorScheme = "dark" | "light" | "no-preference";
export interface ITheme {
    dark?: {
        [key: string]: IColors | string;
    };
    light?: {
        [key: string]: IColors | string;
    };
    "no-preference"?: {
        [key: string]: IColors | string;
    };
}
export interface IColors {
    default?: string;
    [key: string]: string;
}
export interface IThemeConfig {
    disableChangeScheme?: boolean;
    use?: ColorScheme;
    _style?: string;
    _element?: HTMLStyleElement;
}
