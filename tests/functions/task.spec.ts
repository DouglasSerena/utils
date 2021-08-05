import { task, cancelTask } from "./../../src/functions/task.function";

describe("Function task", () => {
  it("Create task in background async", (done) => {
    let name = "Douglas";
    task(() => {
      name = `${name} Serena`;
      expect(name).toBe("Douglas Serena");
      done();
    });
    expect(name).toBe("Douglas");
  });

  it("Cancel task", () => {
    const name = "Douglas";
    const taskId = task(() => {
      expect(name).toBe(false);
    });
    cancelTask(taskId);
    expect(name).toBe("Douglas");
  });
});
