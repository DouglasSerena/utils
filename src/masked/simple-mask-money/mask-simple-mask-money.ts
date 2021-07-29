import SimpleMaskMoney from "simple-mask-money";
import { validate } from "../../validations/validate.validation";
import { IServiceMask } from "../masked.type";
import { ISimpleMaskMoneyConfig } from "./mask-simple-mask-money.type";

export function maskSimpleMaskMoney(config?: ISimpleMaskMoneyConfig): MaskSimpleMaskMoney {
  return new MaskSimpleMaskMoney(config);
}

export class MaskSimpleMaskMoney implements IServiceMask {
  private config: ISimpleMaskMoneyConfig;
  public element: HTMLElement;

  constructor(config?: ISimpleMaskMoneyConfig) {
    this.config = Object.assign({}, this.config, config);
  }

  bind(element: HTMLElement, config?: ISimpleMaskMoneyConfig): MaskSimpleMaskMoney {
    config = Object.assign({}, this.config, config);
    this.element = element as any;

    if (validate(element).isInstanceof(HTMLInputElement)) {
      this.update((this.element as HTMLInputElement).value);
      SimpleMaskMoney.setMask(element, config);
    } else {
      this.update(this.element.textContent);
      element.addEventListener("input", () => {
        element.textContent = this.mask(element.textContent, config);

        const range = document.createRange();
        range.selectNodeContents(element);
        range.collapse(false);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
      });
    }
    return this;
  }

  update(value: string): MaskSimpleMaskMoney {
    if (this.element && !!value) {
      if (this.element instanceof HTMLInputElement) {
        this.element.value = this.mask(value);
      } else {
        this.element.textContent = this.mask(value);
      }
    }
    return this;
  }

  mask(value: string, config?: ISimpleMaskMoneyConfig): string {
    config = Object.assign({}, this.config, config);
    return SimpleMaskMoney.formatToMask(value, config);
  }
  unmask(value: string, config?: ISimpleMaskMoneyConfig): number {
    config = Object.assign({}, this.config, config);
    return SimpleMaskMoney.formatToNumber(value, config);
  }
}
