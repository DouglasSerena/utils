"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBeforeNumber = exports.isLessOrEqual = exports.isLess = exports.isMoreOrEqual = exports.isMore = exports.isFloat = exports.isNumber = exports.isNumeric = exports.isDifferentNumber = exports.isEqualNumber = void 0;
var isEqualNumber = function (value, compare) { return value === compare; };
exports.isEqualNumber = isEqualNumber;
var isDifferentNumber = function (value, compare) { return value !== compare; };
exports.isDifferentNumber = isDifferentNumber;
var isNumeric = function (value) { return !isNaN(parseInt(value)) && isFinite(value); };
exports.isNumeric = isNumeric;
var isNumber = function (value) {
    return !isNaN(parseInt(value)) && isFinite(value) && typeof value === "number";
};
exports.isNumber = isNumber;
var isFloat = function (value) { return exports.isNumeric(value) && !Number.isInteger(value); };
exports.isFloat = isFloat;
var isMore = function (value, compare) { return value > compare; };
exports.isMore = isMore;
var isMoreOrEqual = function (value, compare) { return value >= compare; };
exports.isMoreOrEqual = isMoreOrEqual;
var isLess = function (value, compare) { return value < compare; };
exports.isLess = isLess;
var isLessOrEqual = function (value, compare) { return value <= compare; };
exports.isLessOrEqual = isLessOrEqual;
var isBeforeNumber = function (value, range) {
    value = Number.parseInt(value.toString());
    return value >= (range.start || 0) && value <= range.end;
};
exports.isBeforeNumber = isBeforeNumber;
//# sourceMappingURL=number.validation.js.map