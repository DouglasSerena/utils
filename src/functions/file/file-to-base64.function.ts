export async function fileToBase64(file: File): Promise<string | ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onerror = reject;
    fileReader.onload = () => resolve(fileReader.result);

    fileReader.readAsDataURL(file);
  });
}
