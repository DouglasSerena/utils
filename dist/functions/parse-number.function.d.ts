export interface IParseNumberOptions {
    decimal?: string;
    thousands?: string;
    precision?: number;
    /** @description Default: ceil */
    round?: "round" | "ceil" | "floor";
    rounding?: boolean;
    error?: boolean;
}
export declare function parseNumber(value: number | string, options?: IParseNumberOptions): number;
