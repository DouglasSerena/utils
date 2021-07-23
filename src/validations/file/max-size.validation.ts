import {
  AnyFile,
  BitSizesKeys,
  BIT_SIZES,
  ErrosFile,
  FileInvalid,
  isFile,
} from "./file.validation";
import { isInstanceOf } from "../common/common.validation";
import { isMore } from "../number.validation";
import { isEmpty } from "../common";

export type ErrosMaxSize = ErrosFile | "SIZE";
export interface FileInvalidMaxSize extends FileInvalid<ErrosMaxSize> {
  fileSizeInBytes?: number;
}
interface Return {
  maxSize: number;
  typeDefined: BitSizesKeys;
  valid: boolean;
  filesInvalid: FileInvalidMaxSize[];
}

export const maxSize = (files: AnyFile, max: number, type: BitSizesKeys = "KB"): Return => {
  const filesInvalid: FileInvalidMaxSize[] = [];
  files = files || [];

  let size = BIT_SIZES[type] || BIT_SIZES.B;
  size = size * max;

  if (isInstanceOf(files, File)) {
    files = [files as File];
  }

  for (const file of Array.from(files as FileList)) {
    if (!isFile(file)) {
      filesInvalid.push({ error: "NOT_FILE" });
    }

    if (isMore(file.size, size)) {
      filesInvalid.push({
        filename: file.name,
        fileSizeInBytes: file.size,
        mimeType: file.type,
        error: "SIZE",
      });
    }
  }

  return {
    maxSize: size,
    typeDefined: type,
    valid: isEmpty(filesInvalid),
    filesInvalid,
  };
};
