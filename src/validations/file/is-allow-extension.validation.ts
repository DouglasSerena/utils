import { isEmpty } from "../common/is-empty.validation";
import { TAnyFile, TErrosFile, IFileInvalid } from "./file.type";
import { isFile } from "./file.validation";

type ErrosAllowExtension = "INVALID_EXTENSION" | "WITHOUT_EXTENSION" | TErrosFile;
interface IFileInvalidExtension extends IFileInvalid<ErrosAllowExtension> {
  extension?: string;
}
export interface IReturnExtension {
  allowedExtensions: string[];
  valid: boolean;
  filesInvalid: IFileInvalidExtension[];
}

export const isAllowExtensions = (files: TAnyFile, extensions: string[]): IReturnExtension => {
  const filesInvalid: IFileInvalidExtension[] = [];
  files = files || [];

  if (isFile(files)) {
    files = [files as File];
  }

  for (const file of Array.from(files)) {
    let type = [];

    if (!isFile(file)) {
      filesInvalid.push({ error: "NOT_FILE" });
    }

    for (const extension of extensions) {
      type = file.name.split(".");

      if (type.length < 2) {
        filesInvalid.push({
          filename: file.name,
          mimeType: file.type,
          error: "WITHOUT_EXTENSION",
        });
      }

      if (extension !== type[type.length - 1]) {
        filesInvalid.push({
          filename: file.name,
          mimeType: file.type,
          extension: type[type.length - 1],
          error: null,
        });
      }
    }
  }

  return {
    allowedExtensions: extensions,
    valid: isEmpty(filesInvalid),
    filesInvalid,
  };
};
