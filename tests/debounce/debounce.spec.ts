import { Debounce, debounce as _debounce, stackCallback } from "./../../src/utils";

describe("function debounce", () => {
  let debounce: Debounce;
  beforeAll(() => {
    debounce = _debounce();
  });

  it("Test debounce auto invocate", (done) => {
    const time = new Date().getTime();
    _debounce(() => {
      expect(new Date().getTime() - time > 200).toBeTruthy();
      done();
    });
  });

  it("Test debounce auto invocate cancel", (done) => {
    _debounce(() => {
      expect(false).toBeTruthy();
    }, 250).cancel();
    stackCallback(() => done(), 300);
  });

  it("Test debounce", (done) => {
    const time = new Date().getTime();
    debounce.run(() => {
      expect(new Date().getTime() - time > 200).toBeTruthy();
      done();
    });
  });

  it("Test debounce cancel", (done) => {
    _debounce()
      .run(() => {
        expect(false).toBeTruthy();
      }, 250)
      .cancel();
    stackCallback(() => done(), 300);
  });

  it("Test debounce with time custom", (done) => {
    const time = new Date().getTime();
    debounce.run(() => {
      expect(new Date().getTime() - time > 5).toBeTruthy();
      done();
    }, 10);
  });

  it("Test debounce with multi functions", (done) => {
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
