import { AnyFile, BitSizesKeys, ErrosFile, IFileInvalid } from "./file.validation";
export declare type ErrosMaxSize = ErrosFile | "SIZE";
export interface IFileInvalidMaxSize extends IFileInvalid<ErrosMaxSize> {
    fileSizeInBytes?: number;
}
interface IReturnMaxSize {
    maxSize: number;
    typeDefined: BitSizesKeys;
    valid: boolean;
    filesInvalid: IFileInvalidMaxSize[];
}
export declare const maxSize: (files: AnyFile, max: number, type?: BitSizesKeys) => IReturnMaxSize;
export {};
