import { AnyMaskedOptions, MaskElement } from "imask";
import { IServiceMask } from "./../mask.interface";
export declare function maskMoney(pattern: string | AnyMaskedOptions, config?: AnyMaskedOptions): MaskIMask;
export declare class MaskIMask implements IServiceMask {
    private pattern;
    private config;
    constructor(pattern: string | AnyMaskedOptions, config?: AnyMaskedOptions);
    bind(el: HTMLElement | MaskElement, config: AnyMaskedOptions): MaskIMask;
    mask(value: string, config?: AnyMaskedOptions): string;
    unmask(value: string, config?: AnyMaskedOptions): string;
    private createMask;
}
