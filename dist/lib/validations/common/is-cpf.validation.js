"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCpf = void 0;
function isCpf(cpf) {
    cpf = cpf.replace(/\D/g, "");
    var cpfInvalid = __spreadArray(__spreadArray(__spreadArray([], ["00000000000", "11111111111", "22222222222", "33333333333"]), ["44444444444", "55555555555", "66666666666", "77777777777"]), ["88888888888", "99999999999"]);
    if (cpfInvalid.includes(cpf) || cpf.length !== 11) {
        return false;
    }
    var initPart = cpf.substr(0, 9).split("");
    var firstDigit = Number.parseInt(cpf.charAt(9));
    var firstDigitGenerated = calcDigit(initPart, 10);
    if (firstDigit !== firstDigitGenerated) {
        return false;
    }
    var secondaryPart = cpf.substr(0, 10).split("");
    var secondaryDigit = Number.parseInt(cpf.charAt(10));
    var secondaryDigitGenerated = calcDigit(secondaryPart, 11);
    if (secondaryDigit !== secondaryDigitGenerated) {
        return false;
    }
    return true;
}
exports.isCpf = isCpf;
function calcDigit(parteCPF, multi) {
    var generatedDigit = 0;
    var valueTotal = 0;
    valueTotal = parteCPF.reduce(function (result, currentNumber) {
        return result + Number.parseInt(currentNumber) * multi--;
    }, 0);
    generatedDigit = 11 - (valueTotal % 11);
    if (generatedDigit > 9) {
        generatedDigit = 0;
    }
    return generatedDigit;
}
//# sourceMappingURL=is-cpf.validation.js.map