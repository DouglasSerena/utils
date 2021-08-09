import VMasker from "vanilla-masker";
import { parseNumber } from "../../functions/parse-number.function";
import { isFloat } from "../../validations/number.validation";
import { IServiceMask } from "../masked.type";
import { MoneyOptions } from "./vanilla-masker.type";

const _config = {
  separator: ",",
  delimiter: ".",
};

export function maskVanillaMasker(config?: MoneyOptions): MaskVanillaMasker {
  return new MaskVanillaMasker(config);
}

export class MaskVanillaMasker implements IServiceMask {
  private config: MoneyOptions;
  public element: HTMLElement;

  constructor(config?: MoneyOptions) {
    this.config = Object.assign({}, _config, config);
  }

  bind(element: HTMLElement, config?: MoneyOptions): MaskVanillaMasker {
    this.element = element;
    this.config.dispatchEvent = true;
    config = Object.assign({}, this.config, { ...config, dispatchEvent: true });

    this.update(null, config);

    this.element.addEventListener("input", () => {
      this.update(null, config);
      if (!(this.element instanceof HTMLInputElement)) {
        const range = document.createRange();
        range.selectNodeContents(this.element);
        range.collapse(false);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
      }
    });

    return this;
  }

  update(value?: string, config?: MoneyOptions): MaskVanillaMasker {
    config = Object.assign({}, this.config, config);

    if (!value) {
      value =
        this.element instanceof HTMLInputElement ? this.element.value : this.element.textContent;
    }

    if (this.element) {
      if (this.element instanceof HTMLInputElement) {
        this.element.value = this.mask(value, config);
      } else {
        this.element.textContent = this.mask(value, config);
      }
    }
    return this;
  }

  mask(value: string | number, config?: MoneyOptions): string {
    config = Object.assign({}, this.config, config);
    if (!isFloat(value) && !config.dispatchEvent) {
      value = parseNumber(value).toFixed(config.precision);
    }

    return VMasker.toMoney(value, config);
  }

  unmask(value: string | number, config?: MoneyOptions): number {
    config = Object.assign({}, this.config, config);
    return parseNumber(value, {
      decimal: config.separator,
      thousands: config.delimiter,
    });
  }
}

maskVanillaMasker.config = (config: Partial<MoneyOptions>) => {
  Object.assign(_config, config);
};
