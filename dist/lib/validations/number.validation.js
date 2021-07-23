"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMoreOrEqual = exports.isMore = exports.isLess = exports.isLessOrEqual = exports.isBeforeNumber = exports.isFloat = exports.isNumeric = void 0;
var isNumeric = function (value) {
    return !isNaN(parseInt(value)) && isFinite(value);
};
exports.isNumeric = isNumeric;
var isFloat = function (value) {
    return isNumeric(value) && !Number.isInteger(value);
};
exports.isFloat = isFloat;
var isMore = function (value, verify) { return value > verify; };
exports.isMore = isMore;
var isMoreOrEqual = function (value, verify) { return value >= verify; };
exports.isMoreOrEqual = isMoreOrEqual;
var isLess = function (value, verify) { return value < verify; };
exports.isLess = isLess;
var isLessOrEqual = function (value, verify) { return value <= verify; };
exports.isLessOrEqual = isLessOrEqual;
function isBeforeNumber(value, range) {
    value = Number.parseInt(value.toString());
    return value >= (range.start || 0) && value <= (range.end || 0);
}
exports.isBeforeNumber = isBeforeNumber;
//# sourceMappingURL=number.validation.js.map