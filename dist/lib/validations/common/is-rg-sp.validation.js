"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRgSp = void 0;
function isRgSp(rg) {
    if (!rg)
        return false;
    rg = rg.replace(/\D/g, "");
    var partRg = rg.substr(0, 8).split("");
    var digitRg = Number(rg.charAt(8));
    var digitGenerated = calcDigit(partRg);
    return digitRg === digitGenerated;
}
exports.isRgSp = isRgSp;
function calcDigit(parteCPF, multi) {
    if (multi === void 0) { multi = 9; }
    var generatedDigit = 0;
    var valueTotal = 0;
    valueTotal = parteCPF.reduce(function (result, currentNumber) { return result + Number.parseInt(currentNumber) * multi--; }, 0);
    generatedDigit = valueTotal % 11;
    if (generatedDigit > 9) {
        generatedDigit = 0;
    }
    return generatedDigit;
}
//# sourceMappingURL=is-rg-sp.validation.js.map