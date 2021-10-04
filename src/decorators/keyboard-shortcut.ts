import { KeyboardShortcut } from "../keyboard-shortcut/keyboard-shortcut";
import { IConfigKeyboard } from "../keyboard-shortcut/keyboard-shortcut.type";

type TShortcut = {
  shortcut: string[] | string;
  config: Partial<IConfigKeyboard>;
};

const symbol = Symbol("Keyboardshortcut"); // just to be sure there won't be collisions

export const Shortcut = (shortcut: string[] | string, config?: Partial<IConfigKeyboard>) => {
  return function (target: any, propertyKey: string) {
    target[symbol] = target[symbol] || new Map();
    target[symbol].set(propertyKey, { shortcut, config });
  };
};

export const Keyboard = (destroyMethod = "destroy") => {
  return (constructor: any): any => {
    return class extends constructor {
      constructor(...args: any[]) {
        super(...args);
        const target = constructor.prototype;

        if (!target.__keyboardDestroy) {
          target.__keyboardDestroy = () => {
            target.__recycleKeyboard.forEach((keyboard: KeyboardShortcut, index: number) => {
              keyboard.unbindShortcut();
              delete target.__recycleKeyboard[index];
            });
          };
          const original = target[destroyMethod];
          target[destroyMethod] = function (...args: any) {
            target.__keyboardDestroy();
            original?.call(this, ...args);
          };
        }

        const keyboardShortcut = target[symbol];

        if (!target.__recycleKeyboard) {
          target.__recycleKeyboard = [];
        }

        if (keyboardShortcut) {
          keyboardShortcut.forEach((shortcut: TShortcut, method: string) => {
            console.log(shortcut);
            const unbind = new KeyboardShortcut(shortcut.shortcut, {
              ...shortcut.config,
              listener: (event) => (this as any)[method](event),
            });

            target.__recycleKeyboard.push(unbind);
          });
        }
      }
    };
  };
};
