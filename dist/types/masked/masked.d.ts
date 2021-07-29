import { ConfigMask, IMaskCustom, IServiceMask } from "./masked.type";
export declare function masked(pattern: string, config?: ConfigMask): IServiceMask;
export declare namespace masked {
    var custom: (name: string, mask: IMaskCustom) => IMaskCustom;
}
