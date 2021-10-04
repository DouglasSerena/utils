export function monitoring(): Monitoring {
  return new Monitoring();
}

export class Monitoring {}

monitoring.isDesktop = (() => window?.matchMedia?.("(min-width: 960px)").matches)();
monitoring.isTable = (() => window?.matchMedia?.("(min-width: 720px)").matches)();
monitoring.isMobile = (() => window?.matchMedia?.("(max-width: 540px)").matches)();
monitoring.isDark = (() => window?.matchMedia?.("(prefers-color-scheme: dark)").matches)();
monitoring.isLight = (() => window?.matchMedia?.("(prefers-color-scheme: light)").matches)();
