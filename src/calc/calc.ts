import { parseNumber, parseNumberOptions } from "../functions";
import { add, distribute, divide, increment, multiply, subtract } from "./math.calc";
import { isInstanceOf, validate } from "../validations";
import { AnyCalc, CalcOptions } from "./calc.type";

const configGlobal: CalcOptions = {
  ...parseNumberOptions,
  precision: 2,
  increment: 0,
  round: "round",
};

export const calc = (value: AnyCalc, config?: CalcOptions): Calc => {
  return new Calc(value, config);
};

export class Calc {
  value: number;
  valueRaw: number;
  precision: number;
  config: CalcOptions;

  constructor(value: AnyCalc, config?: CalcOptions) {
    this.config = Object.assign({}, configGlobal, config);
    this.precision = Math.pow(10, this.config?.precision);

    this.save(value);
  }

  private parse(value: AnyCalc) {
    if (isInstanceOf(value, Calc)) {
      value = (value as Calc).valueRaw;
    } else {
      value = parseNumber(value as string, this.config);
    }
    return value;
  }

  private save(value: AnyCalc): void {
    if (isInstanceOf(value, Calc)) {
      this.valueRaw = (value as Calc).valueRaw;
    } else {
      this.valueRaw = parseNumber(value as string, this.config);
    }
    this.value = this.roundingNumber(this.valueRaw);
  }

  private roundingNumber(value: number | string): number {
    value = Number(value) * this.precision;
    value = Number(value.toFixed(4));

    const mathRound = Math[this.config.round];
    value = mathRound(value as number) / this.precision;

    if (this.config.increment) {
      value = increment(value, this.config.increment) * this.precision;
      value = mathRound(value as number) / this.precision;
    }

    return value;
  }

  public add(value: AnyCalc): Calc {
    this.valueRaw = add(this.valueRaw, this.parse(value));
    this.value = this.roundingNumber(this.valueRaw);

    return this;
  }

  public subtract(value: AnyCalc): Calc {
    this.valueRaw = subtract(this.valueRaw, this.parse(value));
    this.value = this.roundingNumber(this.valueRaw);

    return this;
  }

  public multiply(value: AnyCalc): Calc {
    this.valueRaw = multiply(this.valueRaw, this.parse(value));
    this.value = this.roundingNumber(this.valueRaw);

    return this;
  }

  public divide(value: AnyCalc): Calc {
    this.valueRaw = divide(this.valueRaw, this.parse(value));
    this.value = this.roundingNumber(this.valueRaw);

    return this;
  }

  public distribute(value: AnyCalc): number[] {
    const result = distribute(this.valueRaw, this.parse(value)).map((value) => {
      return this.roundingNumber(value);
    });
    const rest = this.roundingNumber(
      subtract(this.valueRaw, multiply(result.pop(), result.length))
    );
    return [...result, rest];
  }
}

calc.config = (config: CalcOptions) => {
  Object.assign(configGlobal, config);
};
calc.isCalc = (prop: any): boolean => validate(prop).isInstanceOf(Calc);
