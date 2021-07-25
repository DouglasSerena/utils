import {
  AnyFile,
  BitSizesKeys,
  BIT_SIZES,
  ErrosFile,
  IFileInvalid,
  isFile,
} from "./file.validation";
import { isInstanceof } from "../common/common.validation";
import { isMore } from "../number.validation";
import { isEmpty } from "../common/is-empty.validation";

export type ErrosMaxSize = ErrosFile | "SIZE";
export interface IFileInvalidMaxSize extends IFileInvalid<ErrosMaxSize> {
  fileSizeInBytes?: number;
}
interface IReturnMaxSize {
  maxSize: number;
  typeDefined: BitSizesKeys;
  valid: boolean;
  filesInvalid: IFileInvalidMaxSize[];
}

export const maxSize = (files: AnyFile, max: number, type: BitSizesKeys = "KB"): IReturnMaxSize => {
  const filesInvalid: IFileInvalidMaxSize[] = [];
  files = files || [];

  let size = BIT_SIZES[type] || BIT_SIZES.B;
  size = size * max;

  if (isInstanceof(files, File)) {
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
