import { AnyFile, ErrosFile, IFileInvalid } from "./file.validation";
import { isDifferent, isInstanceof, notIsInstanceof } from "../common/common.validation";
import { isLess } from "../number.validation";
import { isEmpty } from "../common";

type ErrosAllowExtension = "INVALID_EXTENSION" | "WITHOUT_EXTENSION" | ErrosFile;
interface IFileInvalidExtension extends IFileInvalid<ErrosAllowExtension> {
  extension?: string;
}
export interface IReturnExtension {
  allowedExtensions: string[];
  valid: boolean;
  filesInvalid: IFileInvalidExtension[];
}

export const isAllowExtensions = (files: AnyFile, extensions: string[]): IReturnExtension => {
  const filesInvalid: IFileInvalidExtension[] = [];
  files = files || [];

  if (isInstanceof(files, File)) {
    files = [files as File];
  }

  for (const file of Array.from(files as FileList)) {
    let type = [];

    if (notIsInstanceof(file, File)) {
      filesInvalid.push({ error: "NOT_FILE" });
    }

    for (const extension of extensions) {
      type = file.name.split(".");

      if (isLess(type.length, 2)) {
        filesInvalid.push({
          filename: file.name,
          mimeType: file.type,
          error: "WITHOUT_EXTENSION",
        });
      }

      if (isDifferent(extension, type[type.length - 1])) {
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
