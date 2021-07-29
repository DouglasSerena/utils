import { SimpleMaskMoneyConfig } from "simple-mask-money";
import { IServiceMask } from "../mask.interface";
export declare function maskSimpleMaskMoney(config?: SimpleMaskMoneyConfig): MaskSimpleMaskMoney;
export declare class MaskSimpleMaskMoney implements IServiceMask {
    private config;
    constructor(config?: SimpleMaskMoneyConfig);
    bind(element: HTMLElement, config?: SimpleMaskMoneyConfig): MaskSimpleMaskMoney;
    mask(value: string, config?: SimpleMaskMoneyConfig): string;
    unmask(value: string, config?: SimpleMaskMoneyConfig): number;
}
