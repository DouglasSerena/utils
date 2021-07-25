import { ColorScheme, ITheme, IThemeConfig } from "./theme.type";
export declare function theme(themes?: ITheme, config?: IThemeConfig): Theme;
export declare namespace theme {
    var config: (config: IThemeConfig) => void;
    var theme: (themes: ITheme) => void;
    var isTheme: (prop: any) => boolean;
}
export declare class Theme {
    get themes(): ITheme;
    get prefix(): string;
    get style(): string;
    get use(): ColorScheme;
    get config(): IThemeConfig;
    get element(): HTMLStyleElement;
    get themeSystem(): "dark" | "light";
    constructor(themes?: ITheme, config?: IThemeConfig);
    get isDark(): boolean;
    get isLight(): boolean;
    get isNoPreference(): boolean;
    reset(): void;
    change(theme: ColorScheme): void;
    createStyle(): void;
    getColor(colors: string, currentTheme?: boolean): string;
    private generatorStyle;
    private generatorStyleContent;
}
