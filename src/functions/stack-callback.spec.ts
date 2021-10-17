import { stackCallback, cancelStackCallback } from "./../../src/functions/stack-callback.function";

describe("Function stackCallback", () => {
  it("Create stackCallback in background async", (done) => {
    let name = "Douglas";
    stackCallback(() => {
      name = `${name} Serena`;
      expect(name).toBe("Douglas Serena");
      done();
    });
    expect(name).toBe("Douglas");
  });

  it("Cancel stackCallback", () => {
    const name = "Douglas";
    const stackCallbackId = stackCallback(() => {
      expect(name).toBe(false);
    });
    cancelStackCallback(stackCallbackId);
    expect(name).toBe("Douglas");
  });
});
