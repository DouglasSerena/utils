import { ColorScheme, ITheme, IConfigTheme } from "./theme.type";
export declare function theme(themes?: ITheme, config?: IConfigTheme): Theme;
export declare namespace theme {
    var config: (config: IConfigTheme) => void;
    var theme: (themes: ITheme) => void;
    var isTheme: (prop: unknown) => prop is Theme;
}
export declare class Theme {
    get themes(): ITheme;
    get prefix(): string;
    get style(): string;
    get use(): ColorScheme;
    get config(): IConfigTheme;
    get element(): HTMLStyleElement;
    get themeSystem(): "dark" | "light";
    constructor(themes?: ITheme, config?: IConfigTheme);
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
