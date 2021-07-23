import { AnyFile, BitSizesKeys, ErrosFile, FileInvalid } from ".";
export declare type ErrosMaxSize = ErrosFile | "SIZE";
export interface FileInvalidMaxSize extends FileInvalid<ErrosMaxSize> {
    fileSizeInBytes?: number;
}
interface Return {
    maxSize: number;
    typeDefined: BitSizesKeys;
    valid: boolean;
    filesInvalid: FileInvalidMaxSize[];
}
export declare const maxSize: (files: AnyFile, max: number, type?: BitSizesKeys) => Return;
export {};
