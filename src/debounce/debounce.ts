import { cancelStackCallback, stackCallback } from "../functions/stack-callback.function";
import { IConfigDebounce } from "./debounce.type";

const _config: IConfigDebounce = {
  time: 250,
};

export function debounce(callbackOrTime?: () => void | number, time?: number): Debounce {
  return new Debounce(callbackOrTime, time);
}

export class Debounce {
  config: IConfigDebounce;
  ref: number;

  constructor(callbackOrTime?: () => void | number, time?: number) {
    if (typeof callbackOrTime === "function") {
      this.config = Object.assign({}, { time }, _config);
      this.run(callbackOrTime);
    } else {
      this.config = Object.assign({}, { time: callbackOrTime }, _config);
    }
  }

  run(callback: () => void, time?: number): Debounce {
    this.config = Object.assign({}, { time }, _config);

    this.cancel();
    this.ref = stackCallback(callback, this.config.time);
    return this;
  }

  cancel(): Debounce {
    if (this.ref) {
      cancelStackCallback(this.ref);
    }
    return this;
  }
}

debounce.config = (config: Partial<IConfigDebounce>): void => {
  Object.assign(_config, config);
};
