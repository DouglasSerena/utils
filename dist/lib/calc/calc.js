"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calc = exports.calc = void 0;
var functions_1 = require("../functions");
var math_calc_1 = require("./math.calc");
var validations_1 = require("../validations");
var configGlobal = __assign(__assign({}, functions_1.parseNumberOptions), { precision: 2, increment: 0, round: "round" });
var calc = function (value, config) {
    return new Calc(value, config);
};
exports.calc = calc;
var Calc = /** @class */ (function () {
    function Calc(value, config) {
        var _a;
        this.config = Object.assign({}, configGlobal, config);
        this.precision = Math.pow(10, (_a = this.config) === null || _a === void 0 ? void 0 : _a.precision);
        this.save(value);
    }
    Calc.prototype.parse = function (value) {
        if (validations_1.isInstanceOf(value, Calc)) {
            value = value.valueRaw;
        }
        else {
            value = functions_1.parseNumber(value, this.config);
        }
        return value;
    };
    Calc.prototype.save = function (value) {
        if (validations_1.isInstanceOf(value, Calc)) {
            this.valueRaw = value.valueRaw;
        }
        else {
            this.valueRaw = functions_1.parseNumber(value, this.config);
        }
        this.value = this.roundingNumber(this.valueRaw);
    };
    Calc.prototype.roundingNumber = function (value) {
        value = Number(value) * this.precision;
        value = Number(value.toFixed(4));
        var mathRound = Math[this.config.round];
        value = mathRound(value) / this.precision;
        if (this.config.increment) {
            value = math_calc_1.increment(value, this.config.increment) * this.precision;
            value = mathRound(value) / this.precision;
        }
        return value;
    };
    Calc.prototype.add = function (value) {
        this.valueRaw = math_calc_1.add(this.valueRaw, this.parse(value));
        this.value = this.roundingNumber(this.valueRaw);
        return this;
    };
    Calc.prototype.subtract = function (value) {
        this.valueRaw = math_calc_1.subtract(this.valueRaw, this.parse(value));
        this.value = this.roundingNumber(this.valueRaw);
        return this;
    };
    Calc.prototype.multiply = function (value) {
        this.valueRaw = math_calc_1.multiply(this.valueRaw, this.parse(value));
        this.value = this.roundingNumber(this.valueRaw);
        return this;
    };
    Calc.prototype.divide = function (value) {
        this.valueRaw = math_calc_1.divide(this.valueRaw, this.parse(value));
        this.value = this.roundingNumber(this.valueRaw);
        return this;
    };
    Calc.prototype.distribute = function (value) {
        var _this = this;
        var result = math_calc_1.distribute(this.valueRaw, this.parse(value)).map(function (value) {
            return _this.roundingNumber(value);
        });
        var rest = this.roundingNumber(math_calc_1.subtract(this.valueRaw, math_calc_1.multiply(result.pop(), result.length)));
        return __spreadArray(__spreadArray([], result), [rest]);
    };
    return Calc;
}());
exports.Calc = Calc;
exports.calc.config = function (config) {
    Object.assign(configGlobal, config);
};
exports.calc.isCalc = function (prop) { return validations_1.validate(prop).isInstanceOf(Calc); };
//# sourceMappingURL=calc.js.map