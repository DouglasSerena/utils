export declare type ColorScheme = "dark" | "light" | "no-preference";
export interface ITheme {
    global?: {
        [key: string]: IColors | string;
    };
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
    [key: string]: string;
}
export interface IConfigTheme {
    use?: ColorScheme;
    prefix?: string;
    _style?: string;
    _element?: HTMLStyleElement;
    disableSystemBasedColorShift?: boolean;
}
