export declare const parseNumberOptions: IParseNumberOptions;
export interface IParseNumberOptions {
    decimal?: string;
    thousands?: string;
    error?: boolean;
}
export declare function parseNumber(value: number | string, options?: IParseNumberOptions): number;
