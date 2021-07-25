"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contains = void 0;
var remove_accents_function_1 = require("./remove-accents.function");
function contains(work, compare, options) {
    options = Object.assign({}, {
        removeSpace: true,
        removeAccents: true,
        caseSensitive: false,
    }, options);
    if (options === null || options === void 0 ? void 0 : options.removeAccents) {
        work = remove_accents_function_1.removeAccents(work);
        if (typeof compare === "string") {
            compare = remove_accents_function_1.removeAccents(compare);
        }
    }
    if (!(options === null || options === void 0 ? void 0 : options.caseSensitive)) {
        work = work.toLowerCase();
        if (typeof compare === "string") {
            compare = compare.toLowerCase();
        }
    }
    if (options === null || options === void 0 ? void 0 : options.removeSpace) {
        work = work.replace(/ +/g, "");
        if (typeof compare === "string") {
            compare = compare.replace(/ +/g, "");
        }
    }
    return (work === null || work === void 0 ? void 0 : work.match(compare)) !== null;
}
exports.contains = contains;
//# sourceMappingURL=contains.function.js.map