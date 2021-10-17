export function writeAll(element: HTMLElement, value: string | number): void {
  const event = document.createEvent("HTMLEvents");
  event.initEvent("input", false, true);
  if (element instanceof HTMLInputElement) {
    element.value = element.value + value;
    element.dispatchEvent(event);
  } else {
    element.textContent = element.textContent + value;
    element.dispatchEvent(event);
  }
}
