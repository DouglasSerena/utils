import { ZoomEvent } from "./_zoom.event.js";
import { IZoomEvent } from "./zoom.type";

export class OnZoom {
  constructor(private element: HTMLElement, private listener?: (event: IZoomEvent) => void) {
    element.addEventListener("wheel", this.wheel);
  }

  private wheel = (event: WheelEvent) => {
    if (event.ctrlKey) {
      event.preventDefault();

      const zoomEvent = new ZoomEvent(event);

      this.element.dispatchEvent(zoomEvent);
      this.listener?.(zoomEvent);
    }
  };

  public destroy(): void {
    this.element.removeEventListener("wheel", this.wheel);
  }
}
