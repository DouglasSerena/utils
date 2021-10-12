import { add, distribute, divide, increment, multiply, subtract } from "./calculator.calc";
import { TAnyCalc as CalcAny, IConfigCalc } from "./calc.type";
import { parseNumber } from "../functions/parse-number.function";
import { Global } from "../utils";

const _config = Global.defined("CALCULATOR", {
  decimal: ",",
  thousands: ".",
  error: false,
  precision: 2,
  increment: 0,
  round: "round",
});

export function calc(value?: CalcAny | Calc, config?: Partial<IConfigCalc>): Calc {
  return new Calc(value, config);
}

export class Calc {
  public valueRaw: number;
  public precision: number;
  public config: IConfigCalc;

  public get value(): number {
    return this._roundingNumber(this.valueRaw);
  }

  constructor(value?: CalcAny | Calc, config?: Partial<IConfigCalc>) {
    this.config = Object.assign({}, _config, config);
    this.precision = Math.pow(10, this.config?.precision);

    this._save(value);
  }

  /**
   * @public
   * @description Converte um valor do tipo string ou Calc para um number
   * @param {CalcAny | Calc} value
   * @returns {number} */
  private _parse(value: CalcAny | Calc): number {
    if (isCalc(value)) {
      value = value.valueRaw;
    } else {
      value = parseNumber(value as string, this.config);
    }
    return value;
  }

  /**
   * @public
   * @description Salva o valor verificando que tipo que ele é
   * @param {CalcAny | Calc} value */
  private _save(value: CalcAny | Calc): void {
    if (isCalc(value)) {
      this.valueRaw = value.valueRaw;
    } else {
      this.valueRaw = parseNumber(value as string, this.config);
    }
  }

  /**
   * @public
   * @description Arredonda o valor usando a configuração da classe
   * @param {number | string} value */
  private _roundingNumber(value: number | string): number {
    value = Number(value) * this.precision;
    value = Number(value.toFixed(4));

    const mathRound = Math[this.config.round];
    value = mathRound(value as number) / this.precision;

    if (this.config.increment) {
      /**
       * @description Faz um incremento de valor
       * @example */
      value = increment(value, this.config.increment) * this.precision;
      value = mathRound(value as number) / this.precision;
    }

    return value;
  }

  /**
   * @public
   * @description Faz a adição do valor passado via parametro no valor salvo na classe
   * @param {CalcAny | Calc} value
   * @returns {Calc}  */
  public add(value: CalcAny | Calc): Calc {
    this.valueRaw = add(this.valueRaw, this._parse(value));

    return this;
  }

  /**
   * @public
   * @description Faz a subtração do valor passado via parametro no valor salvo na classe
   * @param {CalcAny | Calc} value
   * @returns {Calc} */
  public subtract(value: CalcAny | Calc): Calc {
    this.valueRaw = subtract(this.valueRaw, this._parse(value));

    return this;
  }

  /**
   * @public
   * @description Faz a multiplicação do valor passado via parametro no valor salvo na classe
   * @param {CalcAny | Calc} value
   * @returns {Calc} */
  public multiply(value: CalcAny | Calc): Calc {
    this.valueRaw = multiply(this.valueRaw, this._parse(value));

    return this;
  }

  /**
   * @public
   * @description Faz a divisão do valor passado via parametro no valor salvo na classe
   * @param {CalcAny | Calc} value
   * @returns {Calc} */
  public divide(value: CalcAny | Calc): Calc {
    this.valueRaw = divide(this.valueRaw, this._parse(value));

    return this;
  }

  /**
   * @public
   * @description Distribui o valor salvo na classe igualmente entre a quantidade passada
   * @param {CalcAny | Calc} value
   * @returns {number[]} */
  public distribute(amount: CalcAny | Calc): number[] {
    const result = distribute(this.valueRaw, this._parse(amount)).map((value) => {
      return this._roundingNumber(value);
    });
    const rest = this._roundingNumber(
      subtract(this.valueRaw, multiply(result.pop(), result.length))
    );
    return [...result, rest];
  }

  /**
   * @public
   * @description Manter o valor entre o range
   * @returns {string} */
  public keepBetween(max: number, min?: number): Calc;
  public keepBetween(range: { max: number; min: number }): Calc;
  public keepBetween(rangeOrMax: { min: number; max: number } | number, min = 0): Calc {
    if (typeof rangeOrMax !== "number") {
      this.valueRaw = Math.max(Math.min(this.valueRaw, rangeOrMax.max), rangeOrMax.min);
    } else {
      this.valueRaw = Math.max(Math.min(this.valueRaw, rangeOrMax as number), min);
    }
    return this;
  }

  /**
   * @public
   * @description Transforma o valor em um string
   * @returns {string} */
  public toString(): string {
    return this.value.toString();
  }

  /**
   * @public
   * @description Transforma o valor do calculo em um json {value: 21.2}
   * @returns {number} */
  public toJson(): number {
    return this.value;
  }
}

/**
 * @public
 * @description Configura as opções padrão da classe Calc
 * @param {Partial<IConfigCalc>} config */
calc.config = (config: Partial<IConfigCalc>): void => {
  Object.assign(_config, config);
};

/**
 * @public
 * @description Verifica se o parametro é do tipo Calc
 * @param {unknown} prop
 * @returns {prop is Calc} */
export const isCalc = (prop: unknown): prop is Calc => prop instanceof Calc;

calc.isCalc = isCalc;
