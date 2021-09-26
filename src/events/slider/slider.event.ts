import { SliderEvent } from "./_slider.event.js";
import { ISliderEvent } from "./slider.type";

export class OnSlider {
  constructor(private element: HTMLElement, private listener?: (event: ISliderEvent) => void) {
    element.addEventListener("mousedown", this.down);
    element.addEventListener("touchstart", this.down);
  }

  private up = () => {
    window.removeEventListener("mouseup", this.up);
    window.removeEventListener("mousemove", this.move);

    window.removeEventListener("touchend", this.up);
    window.removeEventListener("touchmove", this.move);
  };

  private move = (event: MouseEvent | TouchEvent) => {
    const { top, right, bottom, left, width, height } = this.element.getBoundingClientRect();

    const x = event instanceof MouseEvent ? event.x : event.touches[0].clientX;
    const y = event instanceof MouseEvent ? event.y : event.touches[0].clientY;

    const offsetX = x - left;
    const offsetY = y - top;

    const slider = {
      offsetX,
      offsetY,
      top,
      right,
      bottom,
      left,
      width,
      height,
    };
    if (event instanceof TouchEvent) {
      const sliderEvent = new SliderEvent({ ...event, ...event.touches[0] }, slider);

      this.element.dispatchEvent(sliderEvent);
      this.listener?.(sliderEvent);
    } else {
      const sliderEvent = new SliderEvent(event, slider);

      this.element.dispatchEvent(sliderEvent);
      this.listener?.(sliderEvent);
    }
  };

  private down = () => {
    window.addEventListener("touchend", this.up);
    window.addEventListener("touchmove", this.move);

    window.addEventListener("mouseup", this.up);
    window.addEventListener("mousemove", this.move);
  };

  public destroy(): void {
    this.element.removeEventListener("mousedown", this.down);
    this.element.removeEventListener("touchstart", this.down);

    window.removeEventListener("mouseup", this.up);
    window.removeEventListener("mousemove", this.move);

    window.removeEventListener("touchend", this.up);
    window.removeEventListener("touchmove", this.move);
  }
}
