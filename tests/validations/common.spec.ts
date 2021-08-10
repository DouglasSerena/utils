import {
  contains,
  isArray,
  isBoolean,
  isCnpj,
  isCpf,
  isCpfOrCnpj,
  isDifferent,
  isDifferentNotStrict,
  isEmpty,
  isEqual,
  isEqualNotStrict,
  isFill,
  isFunction,
  isInstanceof,
  isNull,
  isObject,
  isPassword,
  isString,
  isTypeof,
  isUndefined,
  notIsInstanceof,
  REGEX_CPF,
  testPattern,
} from "./../../src/utils";

describe("Function validate common", () => {
  it("Is equal", () => {
    expect(isEqual(10, 10)).toBe(true);
    expect(isEqual(10, "10")).toBe(false);
    expect(isEqual(20, 10)).toBe(false);
  });
  it("Is different", () => {
    expect(isDifferent(10, 11)).toBe(true);
    expect(isDifferent(10, "10")).toBe(true);
    expect(isDifferent(10, 10)).toBe(false);
  });
  it("Is equal not strict", () => {
    expect(isEqualNotStrict(10, 10)).toBe(true);
    expect(isEqualNotStrict(10, "10")).toBe(true);
    expect(isEqualNotStrict(10, 12)).toBe(false);
  });
  it("Is different not strict", () => {
    expect(isDifferentNotStrict(10, 11)).toBe(true);
    expect(isDifferentNotStrict(10, "11")).toBe(true);
    expect(isDifferentNotStrict(10, "10")).toBe(false);
    expect(isDifferentNotStrict(10, 10)).toBe(false);
  });
  it("Valida with value null", () => {
    expect(isCnpj(null)).toBe(false);
    expect(isCnpj(undefined)).toBe(false);
    expect(isCnpj("")).toBe(false);
  });
  it("Is test pattern", () => {
    expect(testPattern("000.000.000-00", REGEX_CPF)).toBe(true);
    expect(testPattern("000.000.00000", REGEX_CPF)).toBe(false);
  });
  it("Is contais", () => {
    expect(contains("000.000.000-00", "000.000")).toBe(true);
    expect(contains("000.000.00000", "000000")).toBe(false);
  });
  it("Is typeof", () => {
    expect(isTypeof("000.000.000-00", "string")).toBe(true);
    expect(isTypeof("000.000.00000", "number")).toBe(false);
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
  it("Is instance of", () => {
    expect(isInstanceof(new Date(), Date)).toBe(true);
    expect(isInstanceof(new Date(), HTMLElement)).toBe(false);
  });
  it("Not is instance of", () => {
    expect(notIsInstanceof(new Date(), HTMLElement)).toBe(true);
    expect(notIsInstanceof(new Date(), Date)).toBe(false);
  });
  it("Is string", () => {
    expect(isString("wad")).toBe(true);
    expect(isString(3)).toBe(false);
  });
  it("Is array", () => {
    expect(isArray([])).toBe(true);
    expect(isArray({})).toBe(false);
    expect(isArray("")).toBe(false);
  });
  it("Is object", () => {
    expect(isObject({})).toBe(true);
    expect(isObject([])).toBe(true);
    expect(isObject("")).toBe(false);
  });
  it("Is boolean", () => {
    expect(isBoolean(false)).toBe(true);
    expect(isBoolean("")).toBe(false);
  });
  it("Is function", () => {
    expect(isFunction(() => false)).toBe(true);
    expect(isFunction("")).toBe(false);
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
