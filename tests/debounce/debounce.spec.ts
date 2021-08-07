import { Debounce, debounce as _debounce, stackCallback } from "./../../src/utils";

describe("function debounce", () => {
  let debounce: Debounce;
  beforeAll(() => {
    debounce = _debounce();
  });

  it("Test debounce auto invocate", (done) => {
    const time = new Date().getTime();
    _debounce(() => {
      expect(new Date().getTime() - time >= 250).toBeTruthy();
      done();
    });
  });

  it("Test debounce auto invocate cancel", (done) => {
    _debounce(() => expect(false).toBeTruthy()).cancel();
    stackCallback(() => done(), 250);
  });

  it("Test debounce", (done) => {
    const time = new Date().getTime();
    debounce.run(() => {
      expect(new Date().getTime() - time >= 250).toBeTruthy();
      done();
    });
  });

  it("Test debounce cancel", (done) => {
    debounce.run(() => expect(false).toBeTruthy()); //.cancel()
    debounce.cancel();
    stackCallback(() => done(), 250);
  });

  it("Test debounce with time custom", (done) => {
    const time = new Date().getTime();
    debounce.run(() => {
      expect(new Date().getTime() - time >= 10).toBeTruthy();
      done();
    }, 10);
  });

  it("Test debounce with multi functions", (done) => {
    const time = new Date().getTime();
    let value = "Douglas";
    debounce
      .run(() => {
        value = `${value} serena`;
      })
      .run(() => {
        value = `${value} serena 2`;
      })
      .run(() => {
        expect(value).toBe("Douglas");
        done();
      });
  });
});
