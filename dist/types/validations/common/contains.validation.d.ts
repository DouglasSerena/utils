export interface IContainsOption {
    removeAccents?: boolean;
    caseSensitive?: boolean;
    removeSpace?: boolean;
}
export declare function contains<T = string>(value: T, compare: string | RegExp, options?: IContainsOption): boolean;
