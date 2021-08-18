window["requestIdleCallback"] =
  window["requestIdleCallback"] ||
  (function (handler: (data: { didTimeout: boolean; timeRemaining: () => number }) => void) {
    const startTime = Date.now();

    return setTimeout(function () {
      handler({
        didTimeout: false,
        timeRemaining: function () {
          return Math.max(0, 50.0 - (Date.now() - startTime));
        },
      });
    }, 1);
  } as any);

window["cancelIdleCallback"] =
  window["cancelIdleCallback"] ||
  function (id: number) {
    clearTimeout(id);
  };

export function cancelIdleCallback(stackId: number): void {
  window["cancelIdleCallback"](stackId);
}
export function idleCallback(
  handler: (options?: { didTimeout: boolean; timeRemaining: () => number }) => void
): number {
  return window["requestIdleCallback"](handler);
}
