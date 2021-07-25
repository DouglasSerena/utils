import { AnyFile, ErrosFile, IFileInvalid } from "./file.validation";
declare type ErrosAllowExtension = "INVALID_EXTENSION" | "WITHOUT_EXTENSION" | ErrosFile;
interface IFileInvalidExtension extends IFileInvalid<ErrosAllowExtension> {
    extension?: string;
}
export interface IReturnExtension {
    allowedExtensions: string[];
    valid: boolean;
    filesInvalid: IFileInvalidExtension[];
}
export declare const isAllowExtensions: (files: AnyFile, extensions: string[]) => IReturnExtension;
export {};
