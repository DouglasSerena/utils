import { isDifferent } from "../../validations";
import { isFile } from "../../validations/file";
import { fileToBase64 } from "./file-to-base64.function";

export const getSizeImage = async (
  file: File
): Promise<{ height: number; width: number }> => {
  const type = file.type.split("/");

  if (!isFile(file)) {
    throw new Error("file is not instance of File");
  }

  if (isDifferent(type[0], "image")) {
    throw new Error("File is not image");
  }

  const image = new Image();
  const base64 = await fileToBase64(file);

  return new Promise((resolve, reject) => {
    image.onerror = (error) => {
      reject(error);
    };
    image.onload = () => {
      resolve({
        height: image.height,
        width: image.width,
      });
    };

    image.src = base64 as string;
  });
};
