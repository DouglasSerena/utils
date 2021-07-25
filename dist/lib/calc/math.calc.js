"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.distribute = exports.increment = exports.divide = exports.multiply = exports.subtract = exports.add = void 0;
var functions_1 = require("../functions");
var convertValues = function (value, twoValue) {
    value = functions_1.parseNumber(value);
    twoValue = functions_1.parseNumber(twoValue);
    return [value, twoValue];
};
var add = function (value, twoValue) {
    var _a = convertValues(value, twoValue), one = _a[0], two = _a[1];
    return one + two;
};
exports.add = add;
var subtract = function (value, twoValue) {
    var _a = convertValues(value, twoValue), one = _a[0], two = _a[1];
    return one - two;
};
exports.subtract = subtract;
var multiply = function (value, twoValue) {
    var _a = convertValues(value, twoValue), one = _a[0], two = _a[1];
    return one * two;
};
exports.multiply = multiply;
var divide = function (value, twoValue) {
    var _a = convertValues(value, twoValue), one = _a[0], two = _a[1];
    return one / two;
};
exports.divide = divide;
var increment = function (value, increment) {
    var _a = convertValues(value, increment), _value = _a[0], _increment = _a[1];
    return _increment > 0 ? Math.round(_value / _increment) * _increment : _value;
};
exports.increment = increment;
var distribute = function (value, number) {
    var _a = convertValues(value, number), _valueInit = _a[0], _number = _a[1];
    var array = [];
    var index = _number;
    var _value = exports.divide(_valueInit, number);
    for (; index > 0; index--) {
        if (index === 1) {
            array.push(exports.subtract(_valueInit, exports.multiply(_value, _number - 1)));
        }
        else {
            array.push(_value);
        }
    }
    return array;
};
exports.distribute = distribute;
//# sourceMappingURL=math.calc.js.map