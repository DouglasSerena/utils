import { AnyFile, BitSizesKeys, ErrosFile, FileInvalid } from ".";
export declare type ErrosMinSize = ErrosFile | "SIZE";
export interface FileInvalidMinSize extends FileInvalid<ErrosMinSize> {
    fileSizeInBytes?: number;
}
interface Return {
    minSize: number;
    typeDefined: BitSizesKeys;
    valid: boolean;
    filesInvalid: FileInvalidMinSize[];
}
export declare const minSize: (files: AnyFile, min: number, type?: BitSizesKeys) => Return;
export {};
