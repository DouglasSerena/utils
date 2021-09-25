export class SliderEvent extends Event {
  constructor(offsetX, offsetY) {
    super("slider", { bubbles: true, cancelable: true });
    this.offsetX = offsetX;
    this.offsetY = offsetY;
  }
}
