import { AnyMaskedOptions } from "imask";
import { SimpleMaskMoneyConfig } from "simple-mask-money";
export interface IServiceMask {
    bind(el: unknown, config: unknown): IServiceMask;
    unmask(value: string, config?: unknown): unknown;
    mask(value: string, config?: unknown): string;
}
export interface IMaskCustom {
    type: "IMASK" | "SIMPLE_MASK_MONEY";
    config: AnyMaskedOptions | SimpleMaskMoneyConfig;
}
