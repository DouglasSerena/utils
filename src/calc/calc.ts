import { parseNumber } from "../functions";
import { add, distribute, divide, increment, multiply, subtract } from "./math.calc";
import { isInstanceOf } from "../validations";
import { AnyCalc, calcOptions, CalcOptions } from "./calc.type";

export function calc(value: AnyCalc, settings?: CalcOptions): Calc {
  return new Calc(value, settings);
}

export class Calc {
  value: number;
  valueRaw: number;
  settings: CalcOptions;
  precision: number;

  constructor(value: AnyCalc, settings?: CalcOptions) {
    this.settings = Object.assign({}, this.settings, calcOptions, settings);
    this.precision = Math.pow(10, this.settings?.precision);

    this.save(value);
  }

  private parse(value: AnyCalc) {
    if (isInstanceOf(value, Calc)) {
      value = (value as Calc).valueRaw;
    } else {
      value = parseNumber(value as string, this.settings);
    }
    return value;
  }

  private save(value: AnyCalc): void {
    if (isInstanceOf(value, Calc)) {
      this.valueRaw = (value as Calc).valueRaw;
    } else {
      this.valueRaw = parseNumber(value as string, this.settings);
    }
    this.value = this.roundingNumber(this.valueRaw);
  }

  private roundingNumber(value: number | string): number {
    value = Number(value) * this.precision;
    value = Number(value.toFixed(4));

    const mathRound = Math[this.settings.round];
    value = mathRound(value as number) / this.precision;

    if (this.settings.increment) {
      value = increment(value, this.settings.increment) * this.precision;
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
