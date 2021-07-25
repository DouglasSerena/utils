"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contains = void 0;
var functions_1 = require("../../functions");
function contains(work, compare, options) {
    options = Object.assign({}, {
        removeSpace: true,
        removeAccents: true,
        caseSensitive: false,
    }, options);
    if (options === null || options === void 0 ? void 0 : options.removeAccents) {
        work = functions_1.removeAccents(work);
        if (typeof compare === "string") {
            compare = functions_1.removeAccents(compare);
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
//# sourceMappingURL=contains.validation.js.map