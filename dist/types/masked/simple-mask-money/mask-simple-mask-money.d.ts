import { IServiceMask } from "../masked.type";
import { ISimpleMaskMoneyConfig } from "./mask-simple-mask-money.type";
export declare function maskSimpleMaskMoney(config?: ISimpleMaskMoneyConfig): MaskSimpleMaskMoney;
export declare class MaskSimpleMaskMoney implements IServiceMask {
    private config;
    element: HTMLElement;
    constructor(config?: ISimpleMaskMoneyConfig);
    bind(element: HTMLElement, config?: ISimpleMaskMoneyConfig): MaskSimpleMaskMoney;
    update(value: string): MaskSimpleMaskMoney;
    mask(value: string, config?: ISimpleMaskMoneyConfig): string;
    unmask(value: string, config?: ISimpleMaskMoneyConfig): number;
}
