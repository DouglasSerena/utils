interface IContainsOption {
    removeAccents?: boolean;
    caseSensitive?: boolean;
    removeSpace?: boolean;
}
export declare function contains(work: string, compare: string | RegExp, options?: IContainsOption): boolean;
export {};
