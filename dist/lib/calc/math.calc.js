"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.distribute = exports.increment = exports.divide = exports.multiply = exports.subtract = exports.add = void 0;
var parse_number_function_1 = require("../functions/parse-number.function");
var convertValues = function (value, twoValue) {
    value = parse_number_function_1.parseNumber(value);
    twoValue = parse_number_function_1.parseNumber(twoValue);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0aC5jYWxjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NhbGMvbWF0aC5jYWxjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDRFQUFpRTtBQUVqRSxJQUFNLGFBQWEsR0FBRyxVQUFDLEtBQXNCLEVBQUUsUUFBeUI7SUFDdEUsS0FBSyxHQUFHLG1DQUFXLENBQUMsS0FBZSxDQUFDLENBQUM7SUFDckMsUUFBUSxHQUFHLG1DQUFXLENBQUMsUUFBa0IsQ0FBQyxDQUFDO0lBQzNDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDM0IsQ0FBQyxDQUFDO0FBRUssSUFBTSxHQUFHLEdBQUcsVUFBQyxLQUFzQixFQUFFLFFBQXlCO0lBQzdELElBQUEsS0FBYSxhQUFhLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxFQUExQyxHQUFHLFFBQUEsRUFBRSxHQUFHLFFBQWtDLENBQUM7SUFDbEQsT0FBTyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQ25CLENBQUMsQ0FBQztBQUhXLFFBQUEsR0FBRyxPQUdkO0FBRUssSUFBTSxRQUFRLEdBQUcsVUFBQyxLQUFzQixFQUFFLFFBQXlCO0lBQ2xFLElBQUEsS0FBYSxhQUFhLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxFQUExQyxHQUFHLFFBQUEsRUFBRSxHQUFHLFFBQWtDLENBQUM7SUFDbEQsT0FBTyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQ25CLENBQUMsQ0FBQztBQUhXLFFBQUEsUUFBUSxZQUduQjtBQUVLLElBQU0sUUFBUSxHQUFHLFVBQUMsS0FBc0IsRUFBRSxRQUF5QjtJQUNsRSxJQUFBLEtBQWEsYUFBYSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsRUFBMUMsR0FBRyxRQUFBLEVBQUUsR0FBRyxRQUFrQyxDQUFDO0lBQ2xELE9BQU8sR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUNuQixDQUFDLENBQUM7QUFIVyxRQUFBLFFBQVEsWUFHbkI7QUFFSyxJQUFNLE1BQU0sR0FBRyxVQUFDLEtBQXNCLEVBQUUsUUFBeUI7SUFDaEUsSUFBQSxLQUFhLGFBQWEsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLEVBQTFDLEdBQUcsUUFBQSxFQUFFLEdBQUcsUUFBa0MsQ0FBQztJQUNsRCxPQUFPLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFDbkIsQ0FBQyxDQUFDO0FBSFcsUUFBQSxNQUFNLFVBR2pCO0FBRUssSUFBTSxTQUFTLEdBQUcsVUFBQyxLQUFzQixFQUFFLFNBQTBCO0lBQ3BFLElBQUEsS0FBdUIsYUFBYSxDQUFDLEtBQUssRUFBRSxTQUFTLENBQUMsRUFBckQsTUFBTSxRQUFBLEVBQUUsVUFBVSxRQUFtQyxDQUFDO0lBRTdELE9BQU8sVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7QUFDaEYsQ0FBQyxDQUFDO0FBSlcsUUFBQSxTQUFTLGFBSXBCO0FBRUssSUFBTSxVQUFVLEdBQUcsVUFBQyxLQUFzQixFQUFFLE1BQXVCO0lBQ2xFLElBQUEsS0FBd0IsYUFBYSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsRUFBbkQsVUFBVSxRQUFBLEVBQUUsT0FBTyxRQUFnQyxDQUFDO0lBQzNELElBQU0sS0FBSyxHQUFhLEVBQUUsQ0FBQztJQUMzQixJQUFJLEtBQUssR0FBRyxPQUFPLENBQUM7SUFFcEIsSUFBTSxNQUFNLEdBQUcsY0FBTSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUMxQyxPQUFPLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUU7UUFDekIsSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFO1lBQ2YsS0FBSyxDQUFDLElBQUksQ0FBQyxnQkFBUSxDQUFDLFVBQVUsRUFBRSxnQkFBUSxDQUFDLE1BQU0sRUFBRSxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2pFO2FBQU07WUFDTCxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3BCO0tBQ0Y7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUMsQ0FBQztBQWRXLFFBQUEsVUFBVSxjQWNyQiJ9