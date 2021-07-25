export interface IParseNumberOptions {
    decimal?: string;
    thousands?: string;
    error?: boolean;
}
export declare function parseNumber(value: number | string, config?: IParseNumberOptions): number;
