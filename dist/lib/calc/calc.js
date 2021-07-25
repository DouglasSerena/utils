"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calc = exports.calc = void 0;
var math_calc_1 = require("./math.calc");
var validate_validation_1 = require("../validations/validate.validation");
var parse_number_function_1 = require("../functions/parse-number.function");
var _config = {
    decimal: ",",
    thousands: ".",
    error: false,
    precision: 2,
    increment: 0,
    round: "round",
};
function calc(value, config) {
    return new Calc(value, config);
}
exports.calc = calc;
var Calc = /** @class */ (function () {
    function Calc(value, config) {
        var _a;
        this.config = Object.assign({}, _config, config);
        this.precision = Math.pow(10, (_a = this.config) === null || _a === void 0 ? void 0 : _a.precision);
        this.save(value);
    }
    Calc.prototype.parse = function (value) {
        if (validate_validation_1.validate(value).isInstanceof(Calc)) {
            value = value.valueRaw;
        }
        else {
            value = parse_number_function_1.parseNumber(value, this.config);
        }
        return value;
    };
    Calc.prototype.save = function (value) {
        if (validate_validation_1.validate(value).isInstanceof(Calc)) {
            this.valueRaw = value.valueRaw;
        }
        else {
            this.valueRaw = parse_number_function_1.parseNumber(value, this.config);
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
calc.config = function (config) {
    Object.assign(_config, config);
};
calc.isCalc = function (prop) { return validate_validation_1.validate(prop).isInstanceof(Calc); };
//# sourceMappingURL=calc.js.map