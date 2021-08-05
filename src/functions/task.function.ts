window["requestIdleCallback"] =
  window["requestIdleCallback"] ||
  function (handler: (data: { didTimeout: boolean; timeRemaining: () => number }) => void) {
    const startTime = Date.now();

    return setTimeout(function () {
      handler({
        didTimeout: false,
        timeRemaining: function () {
          return Math.max(0, 50.0 - (Date.now() - startTime));
        },
      });
    }, 1);
  };

window["cancelIdleCallback"] =
  window["cancelIdleCallback"] ||
  function (id: number) {
    clearTimeout(id);
  };

export function cancelTask(taskId: number): void {
  window["cancelIdleCallback"](taskId);
}
export function task(
  handler: (options?: { didTimeout: boolean; timeRemaining: () => number }) => void
): number {
  return window["requestIdleCallback"](handler);
}
