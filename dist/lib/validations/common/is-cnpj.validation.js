"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCnpj = void 0;
function isCnpj(cnpj) {
    if (!cnpj)
        return false;
    cnpj = cnpj.replace(/\D/g, "");
    var cpfInvalid = __spreadArray(__spreadArray(__spreadArray([], ["00000000000000", "11111111111111", "22222222222222", "33333333333333"]), ["44444444444444", "55555555555555", "66666666666666", "77777777777777"]), ["88888888888888", "99999999999999"]);
    if (cpfInvalid.includes(cnpj) || cnpj.length !== 14) {
        return false;
    }
    var initPart = cnpj.substr(0, 12).split("");
    var firstDigit = Number.parseInt(cnpj.charAt(12));
    var firstDigitGenerated = calcDigit(initPart, 5);
    if (firstDigit !== firstDigitGenerated) {
        return false;
    }
    var secondaryPart = cnpj.substr(0, 13).split("");
    var secondaryDigit = Number.parseInt(cnpj.charAt(13));
    var secondaryDigitGenerated = calcDigit(secondaryPart, 6);
    if (secondaryDigit !== secondaryDigitGenerated) {
        return false;
    }
    return true;
}
exports.isCnpj = isCnpj;
function calcDigit(parteCNPJ, multi) {
    var generatedDigit = 0;
    var valueTotal = 0;
    valueTotal = parteCNPJ.reduce(function (result, currentNumber) {
        result += Number.parseInt(currentNumber) * multi--;
        if (multi < 2) {
            multi = 9;
        }
        return result;
    }, 0);
    if (valueTotal % 11 < 2) {
        generatedDigit = 0;
    }
    else {
        generatedDigit = 11 - (valueTotal % 11);
    }
    return generatedDigit;
}
//# sourceMappingURL=is-cnpj.validation.js.map