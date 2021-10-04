import { TKeyboardListener } from "./types/keyboard-listener.type";
import { TKeyboardTarget } from "./types/keyboard-target.type";

export interface IShortcutGroup {
  group: string;
  shortcuts: { keys: string; description: string }[];
}

export interface IShortcut {
  keys: string;
  icon?: string;
  group?: string;
  hidden?: boolean;
  disabled?: boolean;
  description?: string;
  targets: TKeyboardTarget;
  listener: TKeyboardListener;
}

export interface IConfigKeyboard extends Omit<IShortcut, "keys"> {
  allow: string[];
  excluded: string[];
  preventDefault: boolean;
  stopPropagation: boolean;
  handle: (event: KeyboardEvent) => void;
  trigger: "keydown" | "keyup" | "keypress";
}
