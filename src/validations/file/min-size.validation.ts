import {
  AnyFile,
  BitSizesKeys,
  BIT_SIZES,
  ErrosFile,
  FileInvalid,
  isFile,
} from ".";
import { isEmpty, isInstance } from "../common";
import { isLess } from "../number.validation";

export type ErrosMinSize = ErrosFile | "SIZE";
export interface FileInvalidMinSize extends FileInvalid<ErrosMinSize> {
  fileSizeInBytes?: number;
}
interface Return {
  minSize: number;
  typeDefined: BitSizesKeys;
  valid: boolean;
  filesInvalid: FileInvalidMinSize[];
}

export const minSize = (
  files: AnyFile,
  min: number,
  type: BitSizesKeys = "KB"
): Return => {
  const filesInvalid: FileInvalidMinSize[] = [];
  files = files || [];

  let size = BIT_SIZES[type] || BIT_SIZES.B;
  size = size * min;

  if (isInstance(files, File)) {
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
