import { $extends } from "./../../functions/object/extends.function";

export class Global {
  public static defined<T = unknown>(key: string, value: T): T {
    if (!window["__DOUGLAS_SERENA__"]) {
      window["__DOUGLAS_SERENA__"] = {};
    }
    window["__DOUGLAS_SERENA__"][key] = window["__DOUGLAS_SERENA__"][key] || value;

    return this.get<T>(key);
  }
  public static set<T = unknown>(key: string, value: T): T {
    if (!window["__DOUGLAS_SERENA__"]) {
      window["__DOUGLAS_SERENA__"] = {};
    }
    window["__DOUGLAS_SERENA__"][key] = value;

    return this.get<T>(key);
  }
  public static update<T = unknown>(key: string, value: T): T {
    $extends(this.get(key), value);
    return this.get<T>(key);
  }
  public static get<T = any>(key: string): T {
    return window["__DOUGLAS_SERENA__"][key];
  }

  // VARIABLES]
  public static get themeSystem(): "dark" | "light" {
    return window?.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  public static get isDesktop(): boolean {
    return window?.matchMedia?.("(min-width: 960px)").matches;
  }
  public static get isTable(): boolean {
    return window?.matchMedia?.("(min-width: 720px)").matches;
  }
  public static get isMobile(): boolean {
    return window?.matchMedia?.("(max-width: 540px)").matches;
  }
  public static get isDark(): boolean {
    return window?.matchMedia?.("(prefers-color-scheme: dark)").matches;
  }
  public static get isLight(): boolean {
    return window?.matchMedia?.("(prefers-color-scheme: light)").matches;
  }
}
