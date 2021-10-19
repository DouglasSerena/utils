import { IConfigKeyboard, IShortcut, IShortcutGroup } from "./keyboard-shortcut.type";
import { TKeyboardListener } from "./types/keyboard-listener.type";
import { coerceArray } from "../functions/coerce-array.function";
import { hostPlatform } from "../functions/host-platform.function";
import { Global } from "../global/global";
import "./keyboard.polyfill.js";

Global.defined("SHORTCUT", new Map<string, IShortcut & IConfigKeyboard>());

const configDefault: Omit<IConfigKeyboard, "handle" | "listener"> = {
  allow: [],
  hidden: false,
  trigger: "keydown",
  preventDefault: true,
  stopPropagation: false,
  targets: document.documentElement,
  excluded: ["textarea", "input", "select", "[contenteditable]"],
};

/**
 * @function
 * @description Funções para deixa a teclas em um padrão */
function normalize(shortcuts: string | string[], platform = hostPlatform()): string | string[] {
  const normalize = (shortcut: string) => {
    shortcut = shortcut.toLowerCase();
    switch (platform) {
      case "pc":
        return shortcut
          .split(".")
          .map((shortcut) => (shortcut === "meta" ? "ctrl" : shortcut))
          .join(".");
      default:
        return shortcut;
    }
  };

  if (Array.isArray(shortcuts)) {
    return shortcuts.map((shortcut) => normalize(shortcut));
  } else {
    return normalize(shortcuts);
  }
}

export function keyboardShortcut(
  shortcuts: string | string[],
  config: Partial<IConfigKeyboard> & { listener: TKeyboardListener }
): KeyboardShortcut {
  return new KeyboardShortcut(shortcuts, config);
}

export class KeyboardShortcut {
  public shortcuts: (IShortcut & IConfigKeyboard)[] = [];
  private config: IConfigKeyboard = {} as IConfigKeyboard;

  constructor(
    shortcuts: string | string[],
    config: Partial<IConfigKeyboard> & { listener: TKeyboardListener }
  ) {
    shortcuts = coerceArray(normalize(shortcuts));
    shortcuts = shortcuts.filter((shortcut) => {
      if (Global.get("SHORTCUT").has(shortcut)) {
        console.warn(
          `[KEYBOARD] Shortcut key "${shortcut}" already registered, so it was built from the list`
        );
        return false;
      }
      return true;
    });

    if (shortcuts.length === 0) {
      throw new Error(`[KEYBOARD] Unable to continue due to lack of valid keys to register`);
    }

    this.config = Object.assign({}, configDefault, config) as IConfigKeyboard;

    this.config.excluded = this.config.excluded.filter(
      (excluded) => !this.config.allow.includes(excluded)
    );

    for (const shortcut of shortcuts) {
      const handle = (event: KeyboardEvent) => {
        if (this._checkKeyboardShortcut(shortcut, event)) {
          for (const selector of this.config.excluded) {
            if (document.activeElement.matches(selector)) {
              return;
            }
          }

          if (this.config.preventDefault) {
            event.preventDefault();
          }

          if (this.config.stopPropagation) {
            event.stopPropagation();
          }

          config.listener(event, shortcut, event.target as HTMLElement);
        }
      };

      for (const target of coerceArray(this.config.targets)) {
        target.addEventListener(this.config.trigger, handle);
        this.config.handle = handle;
      }

      Global.get("SHORTCUT").set(shortcut, { ...this.config, keys: shortcut });
      this.shortcuts.push(Global.get("SHORTCUT").get(shortcut));
    }
  }

  /**
   * @public
   * @description Desvincular um atalho de teclado */
  public unbindShortcut(): void {
    for (const shortcut of this.shortcuts) {
      keyboardShortcut.unbindShortcut(shortcut.keys);
    }
  }

  /**
   * @private
   * @description Checa se a tecla pressionada é valida */
  private _checkKeyboardShortcut(shortcut: string, event: KeyboardEvent) {
    const keysPress = () => {
      const keys: string[] = [event.key.replace(/Key/i, "").toLowerCase()];

      if (event.ctrlKey) keys.push("ctrl");
      if (event.altKey) keys.push("alt");
      if (event.metaKey) keys.push("meta");
      if (event.shiftKey) keys.push("shift");

      return keys.reduce((keys, key) => {
        if (keys.includes(key)) {
          return keys;
        }
        return keys.concat(key);
      }, []);
    };
    const shortcuts = shortcut.split(".");
    const keys = keysPress();

    console.log(keys, shortcuts);

    if (keys.length < shortcuts.length) {
      return false;
    }
    return keys.findIndex((key) => !shortcuts.includes(key)) === -1;
  }
}

keyboardShortcut.shortcuts = [] as (IShortcut & IConfigKeyboard)[];
Object.defineProperty(keyboardShortcut, "shortcuts", {
  get() {
    return Array.from(Global.get("SHORTCUT").values()).map((shortcut: IShortcut) => ({
      ...shortcut,
    }));
  },
});

keyboardShortcut.group = [] as IShortcutGroup[];
Object.defineProperty(keyboardShortcut, "group", {
  get() {
    const shortcuts: IShortcut[] = Array.from(Global.get("SHORTCUT").values());
    const groups: IShortcutGroup[] = [];

    for (const shortcut of shortcuts) {
      if (shortcut.hidden) {
        continue;
      }

      let group = groups.find((group) => group.group === shortcut.group);
      if (!group) {
        group = { group: shortcut.group, shortcuts: [] };
        groups.push(group);
      }

      const keys = normalize(shortcut.keys, hostPlatform()) as string;
      group.shortcuts.push({ keys, description: shortcut.description });
    }

    return groups;
  },
});

keyboardShortcut.unbindShortcut = (shortcuts: string | string[]) => {
  shortcuts = coerceArray(normalize(shortcuts));

  for (const shortcut of shortcuts) {
    if (!Global.get("SHORTCUT").has(shortcut)) {
      console.warn(`[KEYBOARD] Key shortcut "${shortcut}" has not been registered`);
      continue;
    }

    const config = Global.get("SHORTCUT").get(shortcut);
    for (const target of coerceArray(config.targets)) {
      target.removeEventListener(config.trigger, config.handle);
    }

    Global.get("SHORTCUT").delete(shortcut);
  }
};

keyboardShortcut.updateShortcut = (shortcutLast: string, shortcut: IShortcut & IConfigKeyboard) => {
  if (!Global.get("SHORTCUT").has(shortcutLast)) {
    throw new Error(`[KEYBOARD] Key shortcut "${shortcutLast}" has not been registered`);
  }

  const config = Global.get("SHORTCUT").get(shortcutLast);
  keyboardShortcut.unbindShortcut(shortcutLast);

  return new KeyboardShortcut(shortcut.keys || shortcutLast, config);
};
