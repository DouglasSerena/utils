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
    return this.rounding(this.valueRaw);
  }

  constructor(value?: CalcAny | Calc, config?: Partial<IConfigCalc>) {
    this.config = Object.assign({}, _config, config);
    this.precision = Math.pow(10, this.config?.precision);

    this.valueRaw = calc.isCalc(value) ? value.valueRaw : parseNumber(value as string, this.config);
  }

  /**
   * @public
   * @description Arredonda o valor usando a configuração da classe */
  public rounding(value: number | string): number {
    value = Number(value) * this.precision;
    value = Number(value.toFixed(4));

    const mathRound = Math[this.config.round];
    value = mathRound(value as number) / this.precision;

    if (this.config.increment) {
      value = calc.increment(value, this.config.increment) * this.precision;
      value = mathRound(value as number) / this.precision;
    }

    return value;
  }

  /**
   * @public
   * @description Faz a adição do valor passado via parametro no valor salvo na classe */
  public add(value: CalcAny | Calc): Calc {
    return (this.valueRaw += calc.parse(value, this.config)) && this;
  }

  /**
   * @public
   * @description Faz a subtração do valor passado via parametro no valor salvo na classe */
  public subtract(value: CalcAny | Calc): Calc {
    return (this.valueRaw -= calc.parse(value, this.config)) && this;
  }

  /**
   * @public
   * @description Faz a multiplicação do valor passado via parametro no valor salvo na classe */
  public multiply(value: CalcAny | Calc): Calc {
    return (this.valueRaw *= calc.parse(value, this.config)) && this;
  }

  /**
   * @public
   * @description Faz a divisão do valor passado via parametro no valor salvo na classe */
  public divide(value: CalcAny | Calc): Calc {
    return (this.valueRaw /= calc.parse(value, this.config)) && this;
  }

  /**
   * @public
   * @description Distribui o valor salvo na classe igualmente entre a quantidade passada*/
  public distribute(amount: CalcAny | Calc): number[] {
    amount = calc.parse(amount, this.config);

    const values: number[] = [];
    let index = amount;
    let value = this.valueRaw / amount;

    for (; index > 0; index--) {
      if (index === 1) {
        value = this.rounding(this.valueRaw - value * (amount - 1));
        values.push(this.rounding(this.valueRaw - value * values.length));
      } else {
        values.push(this.rounding(value));
      }
    }

    return values;
  }

  /**
   * @public
   * @description Manter o valor entre o range */
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
   * @description Transforma o valor em um string */
  public toString(): string {
    return this.value.toString();
  }

  /**
   * @public
   * @description Transforma o valor do calculo em um json {value: 21.2} */
  public toJson(): number {
    return this.value;
  }
}

/**
 * @public
 * @description Configura as opções padrão da classe Calc */
calc.config = (config: Partial<IConfigCalc>): void => {
  Object.assign(_config, config);
};

/**
 * @public
 * @description Verifica se o parametro é do tipo Calc */
calc.isCalc = (prop: unknown): prop is Calc => prop instanceof Calc;

/**
 * @public
 * @description Converte um valor do tipo string ou Calc para um number */
calc.parse = (value: CalcAny | Calc, config?: Partial<IConfigCalc>): number => {
  config = Object.assign({}, _config, config);
  return calc.isCalc(value) ? value.valueRaw : parseNumber(value, config);
};

calc.increment = (value: CalcAny | Calc, increment: number): number =>
  increment > 0 ? Math.round(calc.parse(value) / increment) * increment : calc.parse(value);
