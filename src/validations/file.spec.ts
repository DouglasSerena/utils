import { isFile } from "./file/file.validation";
import { isAllowExtensions } from "./file/is-allow-extension.validation";
import { maxSize } from "./file/max-size.validation";
import { minSize } from "./file/min-size.validation";
import { base64toFile } from "./../functions/file/base64-to-file.function";
import path from "path";
import fs from "fs";

describe("Validation File", () => {
  let file: File;
  let base64: string;
  beforeAll(async () => {
    const buffer = fs.readFileSync(path.resolve(__dirname, "unnamed.png"));
    base64 = buffer.toString("base64");
    file = base64toFile(base64, "unnamed.png");
  });

  it("Is File", () => {
    const file = new File([], "");
    expect(isFile(file)).toBe(true);
  });
  it("Is allow extensions", () => {
    expect(isAllowExtensions(file, ["png"]).valid).toBe(true);
    expect(isAllowExtensions(file, ["jpg"]).valid).toBe(false);
  });
  it("Max size", () => {
    expect(maxSize(file, 1000).valid).toBe(true);
    expect(maxSize(file, 100).valid).toBe(false);
  });

  it("Min size", () => {
    expect(minSize(file, 100).valid).toBe(true);
    expect(minSize(file, 1000).valid).toBe(false);
  });

  // it("Min Height", () => {
  //   // expect(validate(file).minHeightFile(300)).toBe(true);
  //   // expect(validate(file).minHeightFile(700)).toBe(false);
  // });

  // it("Min Width", async () => {
  //   // expect(validate(file).minWidthFile(100)).toBe(true);
  //   // expect(validate(file).minWidthFile(700)).toBe(false);
  // });
});
