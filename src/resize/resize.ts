// import { IConfigResize } from "./resize.type";

// const defaultConfig: IConfigResize = {
//   direction: "horizontal",
// };

// export function resize(element: HTMLElement, config: Partial<IConfigResize>): Resize {
//   return new Resize(element, config);
// }

// export class Resize {
//   private config: IConfigResize = {} as IConfigResize;
//   private parent: HTMLElement;
//   private next: HTMLElement;
//   private prev: HTMLElement;

//   private x = 0;
//   private y = 0;
//   private width = 0;
//   private height = 0;

//   constructor(public element: HTMLElement, config: Partial<IConfigResize>) {
//     Object.assign(this.config, defaultConfig, config);

//     element.addEventListener("mousedown", this.down);
//   }

//   public up = (): void => {
//     this.element.style.removeProperty("cursor");
//     document.body.style.removeProperty("cursor");

//     this.prev.style.removeProperty("user-select");
//     this.prev.style.removeProperty("pointer-events");

//     this.next.style.removeProperty("user-select");
//     this.next.style.removeProperty("pointer-events");

//     document.removeEventListener("mousemove", this.move);
//     document.removeEventListener("mouseup", this.up);
//   };

//   public move = (event: MouseEvent): void => {
//     const offsetX = event.clientX - this.x;
//     const offsetY = event.clientY - this.y;

//     this.resize(offsetX, offsetY);

//     const cursor = this.config.direction === "horizontal" ? "col-resize" : "row-resize";
//     this.element.style.cursor = cursor;
//     document.body.style.cursor = cursor;

//     this.prev.style.userSelect = "none";
//     this.prev.style.pointerEvents = "none";

//     this.next.style.userSelect = "none";
//     this.next.style.pointerEvents = "none";
//   };

//   public down = (event: MouseEvent): void => {
//     this.x = event.clientX;
//     this.y = event.clientY;

//     this.parent = this.element.parentElement as HTMLElement;
//     this.next = this.element.nextElementSibling as HTMLElement;
//     this.prev = this.element.previousElementSibling as HTMLElement;

//     const { width, height } = this.prev.getBoundingClientRect();

//     this.width = width;
//     this.height = height;

//     document.addEventListener("mousemove", this.move);
//     document.addEventListener("mouseup", this.up);
//   };

//   public destroy(): void {
//     this.up();
//     this.element.removeEventListener("mousedown", this.down);
//   }

//   private resize(offsetX: number, offsetY: number) {
//     const directions = {
//       vertical: () => {
//         const height = ((this.height + offsetY) * 100) / this.parent.getBoundingClientRect().height;

//         this.prev.style.height = `${height}%`;
//       },
//       horizontal: () => {
//         const width = ((this.width + offsetX) * 100) / this.parent.getBoundingClientRect().width;
//         this.prev.style.width = `${width}%`;
//       },
//     };
//     directions[this.config.direction]();
//   }
// }

import { $extends } from "../functions/object/extends.function";
import { IConfigResize, TTypeResize } from "./resize.type";

export function resize(element: HTMLElement, config?: Partial<IConfigResize>): Resize {
  return new Resize(element, config);
}

export class Resize {
  private _overlay = document.createElement("div");
  private _control = document.createElement("div");
  private _config: IConfigResize = {
    height: { max: 5000, min: 20 },
    width: { max: 5000, min: 20 },
    resize: [],
    positionControl: -3,
    size: 6,
  };
  private _controls = [];
  public isDisabled = false;

  constructor(private element: HTMLElement, config?: Partial<IConfigResize>) {
    this._config = $extends({}, this._config, config);

    this._init();
  }

  /**
   * @public
   * @description Inicia o redimensionamento */
  private _init() {
    this._createOverlay();
    this._control.style.pointerEvents = "all";
    this._control.style.position = "absolute";
    this._control.style.userSelect = "none";
    this._control.style.zIndex = "1000";

    this.update();
  }

  /**
   * @public
   * @description Atualiza os controladores, e aceita novos */
  public update(resize: TTypeResize[] = []): void {
    this._config.resize = this._config.resize
      .concat(resize)
      .filter((value, _, list) => list.includes(value));

    this.destroy();

    for (const type of this._config.resize) {
      this._createControl(type);
    }
  }

  /**
   * @public
   * @description Desabilita o redimensionamento */
  public disabled(): void {
    if (this.isDisabled) {
      this.isDisabled = false;
      this.update();
    } else {
      this.isDisabled = true;
      this.destroy();
    }
  }

  /**
   * @public
   * @description Destroi todos os controladores de redimensionamento */
  public destroy(): void {
    if (this._controls.length > 0) {
      for (const { control, mousemove } of this._controls) {
        control.remove();
        control.removeEventListener("mousemove", mousemove);
      }
      this._overlay.remove();
      this._controls = [];
    }
  }

  /**
   * @private
   * @description Cria os controladores de redimensionamento */
  private _createControl(type: TTypeResize) {
    const control = this._control.cloneNode() as HTMLDivElement;
    control.classList.add("control-resize");
    const controlStyle = control.style;

    const controls = {
      TOP: () => {
        controlStyle.inset = `${this._config.positionControl}px 0 auto 0`;
        controlStyle.cursor = "n-resize";
        controlStyle.height = `${this._config.size}px`;
      },
      TOP_RIGHT: () => {
        controlStyle.inset = `${this._config.positionControl}px ${this._config.positionControl}px auto auto`;
        controlStyle.cursor = "ne-resize";
        controlStyle.height = `${this._config.size}px`;
        controlStyle.width = `${this._config.size}px`;
      },
      RIGHT: () => {
        controlStyle.inset = `0 ${this._config.positionControl}px 0 auto`;
        controlStyle.cursor = "e-resize";
        controlStyle.width = `${this._config.size}px`;
      },
      BOTTOM_RIGHT: () => {
        controlStyle.inset = `auto ${this._config.positionControl}px ${this._config.positionControl}px auto`;
        controlStyle.cursor = "se-resize";
        controlStyle.height = `${this._config.size}px`;
        controlStyle.width = `${this._config.size}px`;
      },
      BOTTOM: () => {
        controlStyle.inset = `auto 0 ${this._config.positionControl}px 0`;
        controlStyle.cursor = "s-resize";
        controlStyle.height = `${this._config.size}px`;
      },
      BOTTOM_LEFT: () => {
        controlStyle.inset = `auto auto ${this._config.positionControl}px ${this._config.positionControl}px`;
        controlStyle.cursor = "sw-resize";
        controlStyle.height = `${this._config.size}px`;
        controlStyle.width = `${this._config.size}px`;
      },
      LEFT: () => {
        controlStyle.inset = `0 auto 0 ${this._config.positionControl}px`;
        controlStyle.cursor = "w-resize";
        controlStyle.width = `${this._config.size}px`;
      },
      TOP_LEFT: () => {
        controlStyle.inset = `${this._config.positionControl}px auto auto  ${this._config.positionControl}px`;
        controlStyle.cursor = "nw-resize";
        controlStyle.height = `${this._config.size}px`;
        controlStyle.width = `${this._config.size}px`;
      },
    };

    controls[type]();

    this.element.appendChild(control);
    const mousemove = () => {
      this._overlay.style.cursor = controlStyle.cursor;
      document.body.appendChild(this._overlay);

      const mousemove = (event: MouseEvent) => {
        const rect = this._rect(type, event.x, event.y);

        this._setSize("width", rect.width);
        this._setSize("height", rect.height);

        this.element.dispatchEvent(new Event("resize"));
      };
      const mouseup = () => {
        this._overlay.remove();

        window.removeEventListener("mousemove", mousemove);
        window.removeEventListener("mouseup", mouseup);
      };
      window.addEventListener("mousemove", mousemove);
      window.addEventListener("mouseup", mouseup);
    };

    control.addEventListener("mousedown", mousemove);
    this._controls.push({ control, mousemove });
  }

  /**
   * @private
   * @description Cria um overlay para deixar em cima da tela para
   *  não haver cliques em local não desejado */
  private _createOverlay() {
    const overlayStyle = this._overlay.style;
    overlayStyle.userSelect = "none";
    overlayStyle.position = "fixed";
    overlayStyle.inset = "0";
  }

  /**
   * @private
   * @description Seta a largura ou altura do elemento, e valida se esta no maximo ou no minimo */
  private _setSize(type: "height" | "width", value: number): void {
    const { max, min } = this._config[type];

    if (value >= min && value <= max) {
      this.element.style[type] = `${value}px`;
    } else {
      this.element.style[type] = `${value < min ? min : max}px`;
    }
  }

  /**
   * @private
   * @description Calcula o novo tamanho do element */
  private _rect(
    operator: TTypeResize,
    clientX: number,
    clientY: number
  ): { width: number; height: number } {
    const { left, right, top, bottom, width, height } = this.element.getBoundingClientRect();

    /**
     *  @description Calculo principal:
     * Height: 200
     * AxisX: 100
     * MouseX: 110
     * Calculo TOP: 200 + (100 - 110) = 210
     * Este calculo varia dependendo da forma que for fazer a verificação */
    const operators = {
      TOP: () => ({ width, height: height + (top - clientY) }),
      TOP_RIGHT: () => ({ height: operators.TOP().height, width: operators.RIGHT().width }),
      RIGHT: () => ({ height, width: width - (right - clientX) }),
      BOTTOM_RIGHT: () => ({ height: operators.BOTTOM().height, width: operators.RIGHT().width }),
      BOTTOM: () => ({ width, height: height - (bottom - clientY) }),
      BOTTOM_LEFT: () => ({ height: operators.BOTTOM().height, width: operators.LEFT().width }),
      LEFT: () => ({ height, width: width + (left - clientX) }),
      TOP_LEFT: () => ({ height: operators.TOP().height, width: operators.LEFT().width }),
    };

    return operators[operator]();
  }
}
