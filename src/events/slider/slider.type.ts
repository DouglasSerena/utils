export interface ISliderEvent extends MouseEvent {
  slider: {
    offsetX: number;
    offsetY: number;

    width: number;
    height: number;

    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}
