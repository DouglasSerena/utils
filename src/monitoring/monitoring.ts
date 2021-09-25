export class Monitoring {
  public get isDesktop(): boolean {
    return window?.matchMedia?.("(min-width: 960px)").matches;
  }
  public get isTable(): boolean {
    return window?.matchMedia?.("(min-width: 720px)").matches;
  }
  public get isMobile(): boolean {
    return window?.matchMedia?.("(max-width: 540px)").matches;
  }
  public get isDark(): boolean {
    return window?.matchMedia?.("(prefers-color-scheme: dark)").matches;
  }
  public get isLight(): boolean {
    return window?.matchMedia?.("(prefers-color-scheme: light)").matches;
  }
}
