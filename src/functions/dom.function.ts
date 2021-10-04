const transform = (value: any) => {
  if (typeof value === "function") {
    return value();
  }

  if (typeof value === "boolean" || value === null || value === undefined) {
    return "";
  }
  return value.toString();
};

export function html(strings: TemplateStringsArray, ...values: any[]): string {
  const html = values.reduce((html, value, index) => {
    return html + transform(value) + strings[index + 1];
  }, strings[0]);

  return html;
}
export function css(strings: TemplateStringsArray, ...values: any[]): string {
  const css: string = values.reduce((css, value, index) => {
    return css + transform(value) + strings[index + 1];
  }, strings[0] as string);

  return css;
}
