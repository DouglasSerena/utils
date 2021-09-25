import { SliderEvent } from "./slider-event.js";

export class Slider {
  constructor(private element: HTMLElement, private listener: (event: SliderEvent) => void) {
    element.addEventListener("mousedown", this.down.bind(this));
    element.addEventListener("touchstart", this.down.bind(this));
  }

  private up() {
    window.removeEventListener("mouseup", this.up.bind(this));
    window.removeEventListener("mousemove", this.move.bind(this));

    window.removeEventListener("touchend", this.up.bind(this));
    window.removeEventListener("touchmove", this.move.bind(this));
  }

  private move(event: MouseEvent | TouchEvent) {
    const { left, top } = this.element.getBoundingClientRect();

    const x = event instanceof MouseEvent ? event.x : event.touches[0].clientX;
    const y = event instanceof MouseEvent ? event.y : event.touches[0].clientY;

    const offsetX = x - left;
    const offsetY = y - top;

    if (event instanceof TouchEvent) {
      event = { ...event, ...event.touches };
    }

    const sliderEvent = new SliderEvent(offsetX, offsetY);

    this.element.dispatchEvent(sliderEvent);
    this.listener(sliderEvent);
  }

  private down() {
    window.addEventListener("touchend", this.up.bind(this));
    window.addEventListener("touchmove", this.move.bind(this));

    window.addEventListener("mouseup", this.up.bind(this));
    window.addEventListener("mousemove", this.move.bind(this));
  }

  public destroy(): void {
    this.element.removeEventListener("mousedown", this.down.bind(this));
    this.element.removeEventListener("touchstart", this.down.bind(this));

    this.up();
  }
}
