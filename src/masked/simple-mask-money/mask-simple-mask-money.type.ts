export interface ISimpleMaskMoneyConfig {
  afterFormat?(result: string): void;
  beforeFormat?(value: string | number): void;
  allowNegative?: boolean;
  negativeSignAfter?: boolean;
  prefix?: string;
  suffix?: string;
  fixed?: boolean;
  fractionDigits?: number;
  decimalSeparator?: string;
  thousandsSeparator?: string;
  cursor?: "move" | "start" | "end";
}
