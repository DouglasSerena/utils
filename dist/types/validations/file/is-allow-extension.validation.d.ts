import { AnyFile, ErrosFile, FileInvalid } from "./file.validation";
declare type ErrosAllowExtension = "INVALID_EXTENSION" | "WITHOUT_EXTENSION" | ErrosFile;
interface FileInvalidExtension extends FileInvalid<ErrosAllowExtension> {
    extension?: string;
}
interface Return {
    allowedExtensions: string[];
    valid: boolean;
    filesInvalid: FileInvalidExtension[];
}
export declare const isAllowExtensions: (files: AnyFile, extensions: string[]) => Return;
export {};
