export function base64toFile(base64: string, filename: string): File {
  const array = base64?.split(",");
  const mime = array[0]?.match(/:(.*?);/)?.[1] || "image/png";
  const _atob = atob(array[1] || array[0]);
  let length = _atob.length;
  const uint8array = new Uint8Array(length);

  while (length--) {
    uint8array[length] = _atob.charCodeAt(length);
  }

  return new File([uint8array], filename, { type: mime });
}
