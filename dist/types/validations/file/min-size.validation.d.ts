import { AnyFile, BitSizesKeys, ErrosFile, IFileInvalid } from "./file.validation";
export declare type ErrosMinSize = ErrosFile | "SIZE";
export interface IFileInvalidMinSize extends IFileInvalid<ErrosMinSize> {
    fileSizeInBytes?: number;
}
interface IReturnMinSize {
    minSize: number;
    typeDefined: BitSizesKeys;
    valid: boolean;
    filesInvalid: IFileInvalidMinSize[];
}
export declare const minSize: (files: AnyFile, min: number, type?: BitSizesKeys) => IReturnMinSize;
export {};
