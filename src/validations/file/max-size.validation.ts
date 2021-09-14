import { BIT_SIZES, isFile } from "./file.validation";
import { isEmpty } from "../common/is-empty.validation";
import { TAnyFile, TBitSizesKeys, TErrosFile, IFileInvalid } from "./file.type";

export type ErrosMaxSize = TErrosFile | "SIZE";
export interface IFileInvalidMaxSize extends IFileInvalid<ErrosMaxSize> {
  fileSizeInBytes?: number;
}
interface IReturnMaxSize {
  maxSize: number;
  typeDefined: TBitSizesKeys;
  valid: boolean;
  filesInvalid: IFileInvalidMaxSize[];
}

export const maxSize = (
  files: TAnyFile,
  max: number,
  type: TBitSizesKeys = "KB"
): IReturnMaxSize => {
  const filesInvalid: IFileInvalidMaxSize[] = [];
  files = files || [];

  let size = BIT_SIZES[type] || BIT_SIZES.B;
  size = size * max;

  if (isFile(files)) {
    files = [files as File];
  }

  for (const file of Array.from(files)) {
    if (!isFile(file)) {
      filesInvalid.push({ error: "NOT_FILE" });
    }

    if (file.size > size) {
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
