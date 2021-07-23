"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeAccents = void 0;
function removeAccents(work) {
    var accents = {
        â: "a",
        Â: "A",
        à: "a",
        À: "A",
        á: "a",
        Á: "A",
        ã: "a",
        Ã: "A",
        ê: "e",
        Ê: "E",
        è: "e",
        È: "E",
        é: "e",
        É: "E",
        î: "i",
        Î: "I",
        ì: "i",
        Ì: "I",
        í: "i",
        Í: "I",
        õ: "o",
        Õ: "O",
        ô: "o",
        Ô: "O",
        ò: "o",
        Ò: "O",
        ó: "o",
        Ó: "O",
        ü: "u",
        Ü: "U",
        û: "u",
        Û: "U",
        ú: "u",
        Ú: "U",
        ù: "u",
        Ù: "U",
        ç: "c",
        Ç: "C",
    };
    return work === null || work === void 0 ? void 0 : work.replace(/[\W\[\] ]/g, function (char) { return accents[char] || char; });
}
exports.removeAccents = removeAccents;
//# sourceMappingURL=remove-accents.function.js.map