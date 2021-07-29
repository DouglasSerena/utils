import { AnyMaskedOptions } from "imask";
import { ISimpleMaskMoneyConfig } from "./simple-mask-money/mask-simple-mask-money.type";
export declare type ConfigMask = AnyMaskedOptions | ISimpleMaskMoneyConfig;
export interface IServiceMask {
    element: unknown;
    update(value: string): IServiceMask;
    bind(el: unknown, config?: unknown): IServiceMask;
    unmask(value: string, config?: unknown): unknown;
    mask(value: string, config?: unknown): string;
}
export interface IMaskCustom {
    type: "IMASK" | "SIMPLE_MASK_MONEY";
    config: ConfigMask;
}
