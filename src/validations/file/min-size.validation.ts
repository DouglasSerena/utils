import {
  AnyFile,
  BitSizesKeys,
  BIT_SIZES,
  ErrosFile,
  IFileInvalid,
  isFile,
} from "./file.validation";
import { isInstanceof } from "../common/common.validation";
import { isLess } from "../number.validation";
import { isEmpty } from "../common/is-empty.validation";

export type ErrosMinSize = ErrosFile | "SIZE";
export interface IFileInvalidMinSize extends IFileInvalid<ErrosMinSize> {
  fileSizeInBytes?: number;
}
interface IReturnMinSize {
  minSize: number;
  typeDefined: BitSizesKeys;
  valid: boolean;
  filesInvalid: IFileInvalidMinSize[];
}

export const minSize = (files: AnyFile, min: number, type: BitSizesKeys = "KB"): IReturnMinSize => {
  const filesInvalid: IFileInvalidMinSize[] = [];
  files = files || [];

  let size = BIT_SIZES[type] || BIT_SIZES.B;
  size = size * min;

  if (isInstanceof(files, File)) {
    files = [files as File];
  }

  for (const file of Array.from(files as FileList)) {
    if (!isFile(file)) {
      filesInvalid.push({ error: "NOT_FILE" });
    }

    if (isLess(file.size, size)) {
      filesInvalid.push({
        filename: file.name,
        fileSizeInBytes: file.size,
        mimeType: file.type,
        error: "SIZE",
      });
    }
  }

  return {
    minSize: size,
    typeDefined: type,
    valid: isEmpty(filesInvalid),
    filesInvalid,
  };
};
