"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contains = void 0;
var remove_accents_function_1 = require("../../functions/remove-accents.function");
function contains(value, compare, options) {
    if (!value)
        return false;
    options = Object.assign({}, {
        removeSpace: true,
        removeAccents: true,
        caseSensitive: false,
    }, options);
    if (options === null || options === void 0 ? void 0 : options.removeAccents) {
        value = remove_accents_function_1.removeAccents(value);
        if (typeof compare === "string") {
            compare = remove_accents_function_1.removeAccents(compare);
        }
    }
    if (!(options === null || options === void 0 ? void 0 : options.caseSensitive)) {
        value = value.toLowerCase();
        if (typeof compare === "string") {
            compare = compare.toLowerCase();
        }
    }
    if (options === null || options === void 0 ? void 0 : options.removeSpace) {
        value = value.replace(/ +/g, "");
        if (typeof compare === "string") {
            compare = compare.replace(/ +/g, "");
        }
    }
    return (value === null || value === void 0 ? void 0 : value.match(compare)) !== null;
}
exports.contains = contains;
//# sourceMappingURL=contains.validation.js.map