import { contains } from "./contains.function";

describe("Function contains", () => {
  it("Contain 'sao' in 'São paulo'", () => {
    expect(contains("São paulo", "sao")).toBe(true);
  });
  it("Case sensitive true 'sao' in 'São paulo'", () => {
    expect(contains("São paulo", "sao", { caseSensitive: true })).toBe(false);
  });
  it("Case sensitive false 'sao' in 'São paulo'", () => {
    expect(contains("São paulo", "sao", { caseSensitive: false })).toBe(true);
  });
  it("Remove assents true 'São' in 'São paulo'", () => {
    expect(contains("São paulo", "São", { removeAccents: true })).toBe(true);
  });
  it("Remove assents false 'Sao' in 'São paulo'", () => {
    expect(contains("São paulo", "Sao", { removeAccents: false })).toBe(false);
  });
  it("Remove space true 'Sãop' in 'São paulo'", () => {
    expect(contains("São paulo", "Sãop", { removeSpace: true })).toBe(true);
  });
  it("Remove space false 'Sãop' in 'São paulo'", () => {
    expect(contains("São paulo", "Sãop", { removeSpace: false })).toBe(false);
  });
});
