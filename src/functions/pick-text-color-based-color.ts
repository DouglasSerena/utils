/**
 * @description Verifica qual é a tonalidade que a cor passada via paramentos esta mais proxima
 * @param {string} color
 * @param {string} [lightColor="#ffffff"]
 * @param {string} [darkColor="#000000"]
 * @return {number} */
export function pickTextColorBasedColor(
  color: string,
  lightColor = "#ffffff",
  darkColor = "#000000"
): string {
  color = color.charAt(0) === "#" ? color.substring(1, 7) : color;
  const r = parseInt(color.substring(0, 2), 16); // hexToR
  const g = parseInt(color.substring(2, 4), 16); // hexToG
  const b = parseInt(color.substring(4, 6), 16); // hexToB
  const uicolors = [r / 255, g / 255, b / 255];
  const c = uicolors.map((col) => {
    if (col <= 0.03928) {
      return col / 12.92;
    }
    return Math.pow((col + 0.055) / 1.055, 2.4);
  });
  const L = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  return L > 0.179 ? darkColor : lightColor;
}
