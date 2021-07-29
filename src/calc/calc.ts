import { add, distribute, divide, increment, multiply, subtract } from "./math.calc";
import { AnyCalc, IConfigCalc } from "./calc.type";
import { validate } from "../validations/validate.validation";
import { parseNumber } from "../functions/parse-number.function";

const _config: IConfigCalc = {
  decimal: ",",
  thousands: ".",
  error: false,
  precision: 2,
  increment: 0,
  round: "round",
};

export function calc(value: AnyCalc | Calc, config?: IConfigCalc): Calc {
  return new Calc(value, config);
}

export class Calc {
  value: number;
  valueRaw: number;
  precision: number;
  config: IConfigCalc;

  constructor(value: AnyCalc | Calc, config?: IConfigCalc) {
    this.config = Object.assign({}, _config, config);
    this.precision = Math.pow(10, this.config?.precision);

    this.save(value);
  }

  private parse(value: AnyCalc | Calc) {
    if (validate(value).isInstanceof(Calc)) {
      value = (value as Calc).valueRaw;
    } else {
      value = parseNumber(value as string, this.config);
    }
    return value;
  }

  private save(value: AnyCalc | Calc): void {
    if (validate(value).isInstanceof(Calc)) {
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

  public add(value: AnyCalc | Calc): Calc {
    this.valueRaw = add(this.valueRaw, this.parse(value));
    this.value = this.roundingNumber(this.valueRaw);

    return this;
  }

  public subtract(value: AnyCalc | Calc): Calc {
    this.valueRaw = subtract(this.valueRaw, this.parse(value));
    this.value = this.roundingNumber(this.valueRaw);

    return this;
  }

  public multiply(value: AnyCalc | Calc): Calc {
    this.valueRaw = multiply(this.valueRaw, this.parse(value));
    this.value = this.roundingNumber(this.valueRaw);

    return this;
  }

  public divide(value: AnyCalc | Calc): Calc {
    this.valueRaw = divide(this.valueRaw, this.parse(value));
    this.value = this.roundingNumber(this.valueRaw);

    return this;
  }

  public distribute(value: AnyCalc | Calc): number[] {
    const result = distribute(this.valueRaw, this.parse(value)).map((value) => {
      return this.roundingNumber(value);
    });
    const rest = this.roundingNumber(
      subtract(this.valueRaw, multiply(result.pop(), result.length))
    );
    return [...result, rest];
  }

  public toString(): string {
    return this.value.toString();
  }
  public toJson(): number {
    return this.value;
  }
}

calc.config = (config: IConfigCalc) => {
  Object.assign(_config, config);
};
calc.isCalc = (prop: any): boolean => validate(prop).isInstanceof(Calc);
