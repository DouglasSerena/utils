import { AnyFile, ErrosFile, FileInvalid } from "./file.validation";
import { isDifferent, isInstanceOf, notIsInstanceOf } from "../common/common.validation";
import { isLess } from "../number.validation";
import { isEmpty } from "../common";

type ErrosAllowExtension = "INVALID_EXTENSION" | "WITHOUT_EXTENSION" | ErrosFile;
interface FileInvalidExtension extends FileInvalid<ErrosAllowExtension> {
  extension?: string;
}
export interface ReturnExtension {
  allowedExtensions: string[];
  valid: boolean;
  filesInvalid: FileInvalidExtension[];
}

export const isAllowExtensions = (files: AnyFile, extensions: string[]): ReturnExtension => {
  const filesInvalid: FileInvalidExtension[] = [];
  files = files || [];

  if (isInstanceOf(files, File)) {
    files = [files as File];
  }

  for (const file of Array.from(files as FileList)) {
    let type = [];

    if (notIsInstanceOf(file, File)) {
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
