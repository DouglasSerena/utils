export interface IContainsOption {
    removeAccents?: boolean;
    caseSensitive?: boolean;
    removeSpace?: boolean;
}
export declare function contains(value: string, compare: string | RegExp, options?: IContainsOption): boolean;
