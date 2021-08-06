export function cancelStackCallback(stackId: number): void {
  clearTimeout(stackId);
}
export function stackCallback(handler: () => void, time = 0): number {
  return setTimeout(() => handler(), time) as any;
}
