export declare type AnyFile = File[] | FileList | File;
export declare type BitSizesKeys = "B" | "KB" | "MB" | "GB" | "TB";
export declare const BIT_SIZES: {
    B: number;
    KB: number;
    MB: number;
    GB: number;
    TB: number;
};
export declare const RESOLUTION_WIDTH: {
    HD: number;
    HD_MORE: number;
    FULL_HD: number;
    QUAD_HD: number;
    UHD: number;
};
export declare const RESOLUTION_HEIGHT: {
    HD: number;
    HD_MORE: number;
    FULL_HD: number;
    QUAD_HD: number;
    UHD: number;
};
export declare type ErrosFile = null | "NOT_FILE";
export interface IFileInvalid<Error = ErrosFile> {
    error: Error;
    filename?: string;
    mimeType?: string;
}
export declare const isFile: (file: unknown) => file is File;
