import { AnyMaskedOptions } from "imask";
import { SimpleMaskMoneyConfig } from "simple-mask-money";
import { IMaskCustom, IServiceMask } from "./mask.interface";
export declare function masked(pattern: string, config?: AnyMaskedOptions | SimpleMaskMoneyConfig): IServiceMask;
export declare namespace masked {
    var custom: (name: string, mask: IMaskCustom) => IMaskCustom;
}
