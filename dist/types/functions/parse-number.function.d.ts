export interface IConfigParseNumber {
    decimal?: string;
    thousands?: string;
    error?: boolean;
}
export declare function parseNumber(value: number | string, config?: IConfigParseNumber): number;
