import { REGEX_CPF } from "../../src/regex";
import { Validate, validate } from "./../../src/validations";

describe("Function validate common", () => {
  it("Is equal", () => {
    expect(validate(10).isEqual(10)).toBe(true);
    expect(validate(10).isEqual("10")).toBe(false);
    expect(validate(20).isEqual(10)).toBe(false);
  });
  it("Is different", () => {
    expect(validate(10).isDifferent(11)).toBe(true);
    expect(validate(10).isDifferent("10")).toBe(true);
    expect(validate(10).isDifferent(10)).toBe(false);
  });
  it("Is equal not strict", () => {
    expect(validate(10).isEqualNotStrict(10)).toBe(true);
    expect(validate(10).isEqualNotStrict("10")).toBe(true);
    expect(validate(10).isEqualNotStrict(12)).toBe(false);
  });
  it("Is different not strict", () => {
    expect(validate(10).isDifferentNotStrict(11)).toBe(true);
    expect(validate(10).isDifferentNotStrict("11")).toBe(true);
    expect(validate(10).isDifferentNotStrict("10")).toBe(false);
    expect(validate(10).isDifferentNotStrict(10)).toBe(false);
  });
  it("Valida with value null", () => {
    expect(validate(null).isCnpj()).toBe(false);
    expect(validate(undefined).isCnpj()).toBe(false);
    expect(validate("").isCnpj()).toBe(false);
  });
  it("Is test pattern", () => {
    expect(validate("000.000.000-00").testPattern(REGEX_CPF)).toBe(true);
    expect(validate("000.000.00000").testPattern(REGEX_CPF)).toBe(false);
  });
  it("Is contais", () => {
    expect(validate("000.000.000-00").contains("000.000")).toBe(true);
    expect(validate("000.000.00000").contains("000000")).toBe(false);
  });
  it("Is typeof", () => {
    expect(validate("000.000.000-00").isTypeof("string")).toBe(true);
    expect(validate("000.000.00000").isTypeof("number")).toBe(false);
  });
  it("Is password", () => {
    expect(validate("Do@1234567").isPassword()).toBe(true);
    expect(validate("Do5661234567").isPassword()).toBe(false);
  });
  it("Is fill", () => {
    expect(validate([""]).isFill()).toBe(true);
    expect(validate([]).isFill()).toBe(false);
  });
  it("Is empty", () => {
    expect(validate([]).isEmpty()).toBe(true);
    expect(validate([""]).isEmpty()).toBe(false);
  });
  it("Is instance of", () => {
    expect(validate(validate(0)).isInstanceOf(Validate)).toBe(true);
    expect(validate(validate(0)).isInstanceOf(Date)).toBe(false);
  });
  it("Not is instance of", () => {
    expect(validate(validate(0)).notIsInstanceOf(Date)).toBe(true);
    expect(validate(validate(0)).notIsInstanceOf(Validate)).toBe(false);
  });
  it("Is string", () => {
    expect(validate("").isString()).toBe(true);
    expect(validate(0).isString()).toBe(false);
  });
  it("Is null", () => {
    expect(validate(null).isNull()).toBe(true);
    expect(validate("").isNull()).toBe(false);
  });
  it("Is undefined", () => {
    expect(validate(undefined).isUndefined()).toBe(true);
    expect(validate("").isUndefined()).toBe(false);
  });
  it("Is cpf", () => {
    expect(validate("282.979.880-58").isCpf()).toBe(true);
    expect(validate("000.000.000-00").isCpf()).toBe(false);
  });
  it("Is cnpj", () => {
    expect(validate("67.354.806/0001-59").isCnpj()).toBe(true);
    expect(validate("00.000.000/0000-00").isCnpj()).toBe(false);
  });
  it("Is cpf or cnpj", () => {
    expect(validate("67.354.806/0001-59").isCpfOrCnpj()).toBe(true);
    expect(validate("00.000.000/0000-00").isCpfOrCnpj()).toBe(false);
    expect(validate("282.979.880-58").isCpfOrCnpj()).toBe(true);
    expect(validate("000.000.000-00").isCpfOrCnpj()).toBe(false);
  });
});
