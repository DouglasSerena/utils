(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", ".", "../functions", "../validations"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.distribute = exports.increment = exports.divide = exports.multiply = exports.subtract = exports.add = void 0;
    var _1 = require(".");
    var functions_1 = require("../functions");
    var validations_1 = require("../validations");
    var convertValues = function (value, twoValue) {
        if (validations_1.isInstance(value, _1.Calc)) {
            value = value.valueRaw;
        }
        else {
            value = functions_1.parseNumber(value);
        }
        if (validations_1.isInstance(twoValue, _1.Calc)) {
            twoValue = twoValue.valueRaw;
        }
        else {
            twoValue = functions_1.parseNumber(twoValue);
        }
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0aC5jYWxjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NhbGMvbWF0aC5jYWxjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztJQUFBLHNCQUFrQztJQUNsQywwQ0FBMkM7SUFDM0MsOENBQTRDO0lBRTVDLElBQU0sYUFBYSxHQUFHLFVBQUMsS0FBYyxFQUFFLFFBQWlCO1FBQ3RELElBQUksd0JBQVUsQ0FBQyxLQUFLLEVBQUUsT0FBSSxDQUFDLEVBQUU7WUFDM0IsS0FBSyxHQUFJLEtBQWMsQ0FBQyxRQUFRLENBQUM7U0FDbEM7YUFBTTtZQUNMLEtBQUssR0FBRyx1QkFBVyxDQUFDLEtBQWUsQ0FBQyxDQUFDO1NBQ3RDO1FBQ0QsSUFBSSx3QkFBVSxDQUFDLFFBQVEsRUFBRSxPQUFJLENBQUMsRUFBRTtZQUM5QixRQUFRLEdBQUksUUFBaUIsQ0FBQyxRQUFRLENBQUM7U0FDeEM7YUFBTTtZQUNMLFFBQVEsR0FBRyx1QkFBVyxDQUFDLFFBQWtCLENBQUMsQ0FBQztTQUM1QztRQUNELE9BQU8sQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDM0IsQ0FBQyxDQUFDO0lBRUssSUFBTSxHQUFHLEdBQUcsVUFBQyxLQUFjLEVBQUUsUUFBaUI7UUFDN0MsSUFBQSxLQUFhLGFBQWEsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLEVBQTFDLEdBQUcsUUFBQSxFQUFFLEdBQUcsUUFBa0MsQ0FBQztRQUNsRCxPQUFPLEdBQUcsR0FBRyxHQUFHLENBQUM7SUFDbkIsQ0FBQyxDQUFDO0lBSFcsUUFBQSxHQUFHLE9BR2Q7SUFFSyxJQUFNLFFBQVEsR0FBRyxVQUFDLEtBQWMsRUFBRSxRQUFpQjtRQUNsRCxJQUFBLEtBQWEsYUFBYSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsRUFBMUMsR0FBRyxRQUFBLEVBQUUsR0FBRyxRQUFrQyxDQUFDO1FBQ2xELE9BQU8sR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUNuQixDQUFDLENBQUM7SUFIVyxRQUFBLFFBQVEsWUFHbkI7SUFFSyxJQUFNLFFBQVEsR0FBRyxVQUFDLEtBQWMsRUFBRSxRQUFpQjtRQUNsRCxJQUFBLEtBQWEsYUFBYSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsRUFBMUMsR0FBRyxRQUFBLEVBQUUsR0FBRyxRQUFrQyxDQUFDO1FBQ2xELE9BQU8sR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUNuQixDQUFDLENBQUM7SUFIVyxRQUFBLFFBQVEsWUFHbkI7SUFFSyxJQUFNLE1BQU0sR0FBRyxVQUFDLEtBQWMsRUFBRSxRQUFpQjtRQUNoRCxJQUFBLEtBQWEsYUFBYSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsRUFBMUMsR0FBRyxRQUFBLEVBQUUsR0FBRyxRQUFrQyxDQUFDO1FBQ2xELE9BQU8sR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUNuQixDQUFDLENBQUM7SUFIVyxRQUFBLE1BQU0sVUFHakI7SUFFSyxJQUFNLFNBQVMsR0FBRyxVQUFDLEtBQWMsRUFBRSxTQUFrQjtRQUNwRCxJQUFBLEtBQXVCLGFBQWEsQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLEVBQXJELE1BQU0sUUFBQSxFQUFFLFVBQVUsUUFBbUMsQ0FBQztRQUU3RCxPQUFPLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO0lBQ2hGLENBQUMsQ0FBQztJQUpXLFFBQUEsU0FBUyxhQUlwQjtJQUVLLElBQU0sVUFBVSxHQUFHLFVBQUMsS0FBYyxFQUFFLE1BQWU7UUFDbEQsSUFBQSxLQUF3QixhQUFhLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxFQUFuRCxVQUFVLFFBQUEsRUFBRSxPQUFPLFFBQWdDLENBQUM7UUFDM0QsSUFBTSxLQUFLLEdBQWEsRUFBRSxDQUFDO1FBQzNCLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQztRQUVwQixJQUFNLE1BQU0sR0FBRyxjQUFNLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzFDLE9BQU8sS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRTtZQUN6QixJQUFJLEtBQUssS0FBSyxDQUFDLEVBQUU7Z0JBQ2YsS0FBSyxDQUFDLElBQUksQ0FBQyxnQkFBUSxDQUFDLFVBQVUsRUFBRSxnQkFBUSxDQUFDLE1BQU0sRUFBRSxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2pFO2lCQUFNO2dCQUNMLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDcEI7U0FDRjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQyxDQUFDO0lBZFcsUUFBQSxVQUFVLGNBY3JCIn0=