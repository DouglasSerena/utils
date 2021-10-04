// export interface IConfigResize {
//   direction: "horizontal" | "vertical";
// }

import { TMaxMin } from "../types/max-min.type";

export type TTypeResize =
  | "TOP"
  | "TOP_RIGHT"
  | "RIGHT"
  | "BOTTOM_RIGHT"
  | "BOTTOM"
  | "BOTTOM_LEFT"
  | "LEFT"
  | "TOP_LEFT";

export interface IConfigResize {
  height: TMaxMin<number>;
  width: TMaxMin<number>;
  resize: TTypeResize[];
  positionControl: number;
  size: number;
}
