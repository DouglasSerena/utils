export class SliderEvent extends MouseEvent {
  constructor(eventInitDict, slider) {
    super("slider", eventInitDict);
    this.slider = slider;
  }
}
