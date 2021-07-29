import { AnyMaskedOptions, InputMask, MaskElement } from "imask";
import { IServiceMask } from "../masked.type";
import { IConfigMaskIMask } from "./mask-imask.type";
export declare function maskIMask(pattern: string | AnyMaskedOptions, config?: IConfigMaskIMask): MaskIMask;
export declare class MaskIMask implements IServiceMask {
    element: HTMLElement | MaskElement;
    inputMask: InputMask<AnyMaskedOptions>;
    private pattern;
    private config;
    constructor(pattern: string | IConfigMaskIMask, config?: IConfigMaskIMask);
    bind(element: HTMLElement, config?: IConfigMaskIMask): MaskIMask;
    update(value: string): MaskIMask;
    mask(value: string, config?: IConfigMaskIMask): string;
    unmask(value: string, config?: IConfigMaskIMask): string;
    private createMask;
}
