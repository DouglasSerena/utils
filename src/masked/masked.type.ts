import { AnyMaskedOptions } from "imask";
import { MoneyOptions } from "./vanilla-masker/vanilla-masker.type";

export type ConfigMask = AnyMaskedOptions | MoneyOptions;

export interface IServiceMask {
  element: unknown;
  update(value?: string, config?: unknown): IServiceMask;
  bind(el: unknown, config?: unknown): IServiceMask;
  unmask(value: string, config?: unknown): unknown;
  mask(value: string | number, config?: unknown): string;
}

export interface IMaskCustom {
  type: "MASK" | "MASK_MONEY";
  config: ConfigMask;
}
