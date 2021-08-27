import { cancelStackCallback, stackCallback } from "../functions/stack-callback.function";
import { IConfigDebounce } from "./debounce.type";

const _config: IConfigDebounce = {
  time: 250,
  _lastRef: 0,
};

export function debounce(callbackOrTime?: () => void | number, time?: number): Debounce {
  return new Debounce(callbackOrTime, time);
}

export class Debounce {
  config: IConfigDebounce;

  constructor(callbackOrTime?: () => void | number, time?: number) {
    if (typeof callbackOrTime === "function") {
      this.config = Object.assign({}, _config);
      if (time) {
        Object.assign(this.config, { time });
      }
      this.run(callbackOrTime);
    } else {
      this.config = Object.assign({}, _config);
      if (callbackOrTime) {
        Object.assign(this.config, { callbackOrTime });
      }
    }
  }

  run(callback: () => void, time?: number): Debounce {
    this.cancel();
    this.config._lastRef = stackCallback(callback, time || this.config.time);
    return this;
  }

  cancel(): Debounce {
    if (this.config._lastRef) {
      cancelStackCallback(this.config._lastRef);
      this.config._lastRef = undefined;
    }
    return this;
  }
}

debounce.config = (config: Partial<IConfigDebounce>): void => {
  Object.assign(_config, config);
};
