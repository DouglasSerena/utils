import { AnyFile, ErrosFile, FileInvalid } from "./index";
import { isDifferent, isEmpty, isInstance, notIsInstance } from "../common";
import { isLess } from "../number.validation";

type ErrosAllowExtension =
  | "INVALID_EXTENSION"
  | "WITHOUT_EXTENSION"
  | ErrosFile;
interface FileInvalidExtension extends FileInvalid<ErrosAllowExtension> {
  extension?: string;
}
interface Return {
  allowedExtensions: string[];
  valid: boolean;
  filesInvalid: FileInvalidExtension[];
}

export const isAllowExtensions = (
  files: AnyFile,
  extensions: string[]
): Return => {
  const filesInvalid: FileInvalidExtension[] = [];
  files = files || [];

  if (isInstance(files, File)) {
    files = [files as File];
  }

  for (const file of Array.from(files as FileList)) {
    let type = [];

    if (notIsInstance(file, File)) {
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
