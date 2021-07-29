declare module "simple-mask-money" {
  export interface SimpleMaskMoneyConfig {
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
  export let args: SimpleMaskMoneyConfig;
  export function formatToCurrency(value: string | number, args?: SimpleMaskMoneyConfig): string;
  export function formatToMask(value: string | number, args?: SimpleMaskMoneyConfig): string;
  export function formatToNumber(value: string, args?: SimpleMaskMoneyConfig): number;

  export function setMask(
    element: string | HTMLElement,
    args?: SimpleMaskMoneyConfig
  ): { formatToNumber(): number };
}
