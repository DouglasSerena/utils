"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmpty = void 0;
function isEmpty(item) {
    var _a;
    if (!item) {
        return true;
    }
    if (item instanceof Array) {
        return (item === null || item === void 0 ? void 0 : item.length) === 0;
    }
    if (typeof item === "string") {
        return item.length === 0;
    }
    if (typeof item === "number") {
        return item === 0;
    }
    return ((_a = Object.keys(item)) === null || _a === void 0 ? void 0 : _a.length) === 0;
}
exports.isEmpty = isEmpty;
//# sourceMappingURL=is-empty.validation.js.map