export type TAnyFile = File[] | FileList | File;
export type TBitSizesKeys = "B" | "KB" | "MB" | "GB" | "TB";
export type TErrosFile = null | "NOT_FILE";

export interface IFileInvalid<Error = TErrosFile> {
  error: Error;
  filename?: string;
  mimeType?: string;
}
