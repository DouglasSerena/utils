import IMask, { AnyMaskedOptions, InputMask } from "imask";
import { IServiceMask } from "../masked.type";
import { IConfigMaskIMask } from "./mask-imask.type";

export function maskIMask(
  pattern: string | AnyMaskedOptions,
  config?: IConfigMaskIMask
): MaskIMask {
  return new MaskIMask(pattern, config);
}

export class MaskIMask implements IServiceMask {
  public element: HTMLElement;
  public inputMask: InputMask<AnyMaskedOptions>;
  private pattern: string;
  private config: IConfigMaskIMask;

  constructor(pattern: string | IConfigMaskIMask, config?: IConfigMaskIMask) {
    this.config = Object.assign({}, this.config, config);

    if (typeof pattern === "string") {
      this.pattern = pattern as string;
      const patterns = this.pattern.split("||").sort((one, two) => one.length - two.length);
      this.config.mask =
        patterns.length > 1
          ? patterns.map((pattern) => Object.assign({}, this.config, { mask: pattern }))
          : patterns[0];
    } else {
      Object.assign(this.config, pattern);
    }
  }

  bind(element: HTMLElement, config?: IConfigMaskIMask): MaskIMask {
    config = Object.assign({}, this.config, config);
    this.element = element;

    this.inputMask = IMask(this.element, config as any);
    this.update(this.inputMask.value);

    return this;
  }

  update(value?: string, config?: IConfigMaskIMask): MaskIMask {
    config = Object.assign({}, this.config, config);

    if (!value) {
      value =
        this.element instanceof HTMLInputElement ? this.element.value : this.element.textContent;
    }
    if (this.element && value) {
      this.inputMask.value = this.mask(value, config);
      this.inputMask.updateValue();
    }
    return this;
  }

  mask(value: string | number, config?: IConfigMaskIMask): string {
    config = Object.assign({}, this.config, config);

    const imask = this.createMask(value?.toString() || "", config);
    return imask.value;
  }

  unmask(value: string | number, config?: IConfigMaskIMask): string {
    config = Object.assign({}, this.config, config);

    const imask = this.createMask(value?.toString() || "", config);
    return imask.unmaskedValue;
  }

  private createMask(value: string, config?: IConfigMaskIMask): IMask.MaskedDynamic {
    const createMask = IMask.createMask({ ...config } as any);
    createMask.resolve(value);
    return createMask as IMask.MaskedDynamic;
  }
}
