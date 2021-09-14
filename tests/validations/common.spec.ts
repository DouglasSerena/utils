import {
  contains,
  isArray,
  isCnpj,
  isCpf,
  isCpfOrCnpj,
  isEmpty,
  isFalsy,
  isFill,
  isNull,
  isPassword,
  isTruthy,
  isUndefined,
} from "./../../src/utils";

describe("Function validate common", () => {
  it("Valida with value null", () => {
    expect(isCnpj(null)).toBe(false);
    expect(isCnpj(undefined)).toBe(false);
    expect(isCnpj("")).toBe(false);
  });
  it("Is contais", () => {
    expect(contains("000.000.000-00", "000.000")).toBe(true);
    expect(contains("000.000.00000", "000000")).toBe(false);
  });
  it("Is password", () => {
    expect(isPassword("Do@1234567")).toBe(true);
    expect(isPassword("Do5661234567")).toBe(false);
  });
  it("Is fill", () => {
    expect(isFill([""])).toBe(true);
    expect(isFill([])).toBe(false);
  });
  it("Is empty", () => {
    expect(isEmpty([])).toBe(true);
    expect(isEmpty([""])).toBe(false);
  });
  it("Is array", () => {
    expect(isArray([])).toBe(true);
    expect(isArray({})).toBe(false);
    expect(isArray("")).toBe(false);
  });
  it("Is falsy", () => {
    expect(isFalsy(" ")).toBe(false);
    expect(isFalsy(0)).toBe(true);
    expect(isFalsy("")).toBe(true);
    expect(isFalsy(null)).toBe(true);
    expect(isFalsy(undefined)).toBe(true);
  });
  it("Is truthy", () => {
    expect(isTruthy(" ")).toBe(true);
    expect(isTruthy(0)).toBe(false);
    expect(isTruthy("")).toBe(false);
    expect(isTruthy(null)).toBe(false);
    expect(isTruthy(undefined)).toBe(false);
  });
  it("Is null", () => {
    expect(isNull(null)).toBe(true);
    expect(isNull("")).toBe(false);
  });
  it("Is undefined", () => {
    expect(isUndefined(undefined)).toBe(true);
    expect(isUndefined(false)).toBe(false);
  });
  it("Is cpf", () => {
    expect(isCpf("282.979.880-58")).toBe(true);
    expect(isCpf("000.000.000-00")).toBe(false);
  });
  it("Is cnpj", () => {
    expect(isCnpj("67.354.806/0001-59")).toBe(true);
    expect(isCnpj("00.000.000/0000-00")).toBe(false);
  });
  it("Is cpf or cnpj", () => {
    expect(isCpfOrCnpj("67.354.806/0001-59")).toBe(true);
    expect(isCpfOrCnpj("00.000.000/0000-00")).toBe(false);
    expect(isCpfOrCnpj("282.979.880-58")).toBe(true);
    expect(isCpfOrCnpj("000.000.000-00")).toBe(false);
  });
});
