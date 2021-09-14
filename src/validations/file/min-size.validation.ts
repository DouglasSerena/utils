import { BIT_SIZES, isFile } from "./file.validation";
import { isEmpty } from "../common/is-empty.validation";
import { IFileInvalid, TAnyFile, TBitSizesKeys, TErrosFile } from "./file.type";

export type ErrosMinSize = TErrosFile | "SIZE";
export interface IFileInvalidMinSize extends IFileInvalid<ErrosMinSize> {
  fileSizeInBytes?: number;
}
interface IReturnMinSize {
  minSize: number;
  typeDefined: TBitSizesKeys;
  valid: boolean;
  filesInvalid: IFileInvalidMinSize[];
}

export const minSize = (
  files: TAnyFile,
  min: number,
  type: TBitSizesKeys = "KB"
): IReturnMinSize => {
  const filesInvalid: IFileInvalidMinSize[] = [];
  files = files || [];

  let size = BIT_SIZES[type] || BIT_SIZES.B;
  size = size * min;

  if (isFile(files)) {
    files = [files as File];
  }

  for (const file of Array.from(files)) {
    if (!isFile(file)) {
      filesInvalid.push({ error: "NOT_FILE" });
    }

    if (file.size < size) {
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
