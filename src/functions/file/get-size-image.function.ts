import { isFile } from "../../validations/file/file.validation";
import { base64toFile } from "./base64-to-file.function";
import { fileToBase64 } from "./file-to-base64.function";

export const getSizeImage = async (file: File): Promise<{ height: number; width: number }> => {
  const type = file.type.split("/");

  if (!isFile(file) && typeof file === "string") {
    file = base64toFile(file as any, "unnamed.png");
  }

  if (type[0] !== "image") {
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
