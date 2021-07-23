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
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../functions", "../validations", "./math.calc"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Calc = exports.calcOptions = void 0;
    var functions_1 = require("../functions");
    var validations_1 = require("../validations");
    var math_calc_1 = require("./math.calc");
    exports.calcOptions = __assign(__assign({}, functions_1.parseNumberOptions), { precision: 2, increment: 0, round: "round" });
    function calc(value, settings) {
        return new Calc(value, settings);
    }
    var Calc = /** @class */ (function () {
        function Calc(value, settings) {
            var _a;
            this.settings = Object.assign({}, this.settings, exports.calcOptions, settings);
            this.precision = Math.pow(10, (_a = this.settings) === null || _a === void 0 ? void 0 : _a.precision);
            this.save(value);
        }
        Calc.prototype.save = function (value) {
            if (validations_1.isInstance(value, Calc)) {
                this.valueRaw = value.valueRaw;
            }
            else {
                this.valueRaw = functions_1.parseNumber(value, this.settings);
            }
            this.value = this.roundingNumber(this.valueRaw);
        };
        Calc.prototype.roundingNumber = function (value) {
            value = Number(value) * this.precision;
            value = Number(value.toFixed(4));
            var mathRound = Math[this.settings.round];
            value = mathRound(value) / this.precision;
            if (this.settings.increment) {
                value = math_calc_1.increment(value, this.settings.increment) * this.precision;
                value = mathRound(value) / this.precision;
            }
            return value;
        };
        Calc.prototype.add = function (value) {
            this.valueRaw = math_calc_1.add(this.valueRaw, value);
            this.value = this.roundingNumber(this.valueRaw);
            return this;
        };
        Calc.prototype.subtract = function (value) {
            this.valueRaw = math_calc_1.subtract(this.valueRaw, value);
            this.value = this.roundingNumber(this.valueRaw);
            return this;
        };
        Calc.prototype.multiply = function (value) {
            this.valueRaw = math_calc_1.multiply(this.valueRaw, value);
            this.value = this.roundingNumber(this.valueRaw);
            return this;
        };
        Calc.prototype.divide = function (value) {
            this.valueRaw = math_calc_1.divide(this.valueRaw, value);
            this.value = this.roundingNumber(this.valueRaw);
            return this;
        };
        Calc.prototype.distribute = function (value) {
            var _this = this;
            var result = math_calc_1.distribute(this.valueRaw, value).map(function (value) {
                return _this.roundingNumber(value);
            });
            var rest = this.roundingNumber(math_calc_1.subtract(this.valueRaw, math_calc_1.multiply(result.pop(), result.length)));
            return __spreadArray(__spreadArray([], result), [rest]);
        };
        return Calc;
    }());
    exports.Calc = Calc;
    exports.default = calc;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY2FsYy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQUEsMENBSXNCO0lBQ3RCLDhDQUE0QztJQUM1Qyx5Q0FPcUI7SUFRUixRQUFBLFdBQVcseUJBQ25CLDhCQUFrQixLQUNyQixTQUFTLEVBQUUsQ0FBQyxFQUNaLFNBQVMsRUFBRSxDQUFDLEVBQ1osS0FBSyxFQUFFLE9BQU8sSUFDZDtJQUVGLFNBQVMsSUFBSSxDQUFDLEtBQWMsRUFBRSxRQUFzQjtRQUNsRCxPQUFPLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQ7UUFNRSxjQUFZLEtBQWMsRUFBRSxRQUFzQjs7WUFDaEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLG1CQUFXLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDeEUsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxNQUFBLElBQUksQ0FBQyxRQUFRLDBDQUFFLFNBQVMsQ0FBQyxDQUFDO1lBRXhELElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkIsQ0FBQztRQUVPLG1CQUFJLEdBQVosVUFBYSxLQUFjO1lBQ3pCLElBQUksd0JBQVUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEVBQUU7Z0JBQzNCLElBQUksQ0FBQyxRQUFRLEdBQUksS0FBYyxDQUFDLFFBQVEsQ0FBQzthQUMxQztpQkFBTTtnQkFDTCxJQUFJLENBQUMsUUFBUSxHQUFHLHVCQUFXLENBQUMsS0FBZSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUM3RDtZQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMs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