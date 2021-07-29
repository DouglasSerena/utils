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
    Calc.prototype.toString = function () {
        return this.value.toString();
    };
    Calc.prototype.toJson = function () {
        return this.value;
    };
    return Calc;
}());
exports.Calc = Calc;
calc.config = function (config) {
    Object.assign(_config, config);
};
calc.isCalc = function (prop) { return validate_validation_1.validate(prop).isInstanceof(Calc); };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jYWxjL2NhbGMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQSx5Q0FBcUY7QUFFckYsMEVBQThEO0FBQzlELDRFQUFpRTtBQUVqRSxJQUFNLE9BQU8sR0FBZ0I7SUFDM0IsT0FBTyxFQUFFLEdBQUc7SUFDWixTQUFTLEVBQUUsR0FBRztJQUNkLEtBQUssRUFBRSxLQUFLO0lBQ1osU0FBUyxFQUFFLENBQUM7SUFDWixTQUFTLEVBQUUsQ0FBQztJQUNaLEtBQUssRUFBRSxPQUFPO0NBQ2YsQ0FBQztBQUVGLFNBQWdCLElBQUksQ0FBQyxLQUFxQixFQUFFLE1BQW9CO0lBQzlELE9BQU8sSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ2pDLENBQUM7QUFGRCxvQkFFQztBQUVEO0lBTUUsY0FBWSxLQUFxQixFQUFFLE1BQW9COztRQUNyRCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLE1BQUEsSUFBSSxDQUFDLE1BQU0sMENBQUUsU0FBUyxDQUFDLENBQUM7UUFFdEQsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuQixDQUFDO0lBRU8sb0JBQUssR0FBYixVQUFjLEtBQXFCO1FBQ2pDLElBQUksOEJBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDdEMsS0FBSyxHQUFJLEtBQWMsQ0FBQyxRQUFRLENBQUM7U0FDbEM7YUFBTTtZQUNMLEtBQUssR0FBRyxtQ0FBVyxDQUFDLEtBQWUsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDbkQ7UUFDRCxPQUFPLEtBQUss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