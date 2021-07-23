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
export interface FileInvalid<Error = ErrosFile> {
    error: Error;
    filename?: string;
    mimeType?: string;
}
declare const isFile: (file: any) => boolean;
export { isFile };
export * from "./is-allow-extension.validation";
export * from "./min-size.validation";
export * from "./max-size.validation";
