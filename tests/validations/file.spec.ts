import { validate } from "./../../src/validations/validate.validation";
import { base64toFile } from "../../src/functions";
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
    expect(validate(file).isFile()).toBe(true);
  });
  it("Is allow extensions", () => {
    expect(validate(file).isAllowExtensionsFile(["png"])).toBe(true);
    expect(validate(file).isAllowExtensionsFile(["jpg"])).toBe(false);
  });
  it("Max size", () => {
    expect(validate(file).maxSizeFile(1000)).toBe(true);
    expect(validate(file).maxSizeFile(100)).toBe(false);
  });

  it("Min size", () => {
    expect(validate(file).minSizeFile(100)).toBe(true);
    expect(validate(file).minSizeFile(1000)).toBe(false);
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
