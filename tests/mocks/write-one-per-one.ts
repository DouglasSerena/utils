export function writeOnePerOne(element: HTMLElement, value: string | number): void {
  const event = document.createEvent("HTMLEvents");
  for (let i = 0; i < value.toString().length; i++) {
    event.initEvent("input", false, true);
    if (element instanceof HTMLInputElement) {
      element.value = element.value + value[i];
      element.dispatchEvent(event);
    } else {
      element.textContent = element.textContent + value[i];
      element.dispatchEvent(event);
    }
  }
}
