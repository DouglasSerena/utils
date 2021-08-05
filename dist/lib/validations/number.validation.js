"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBeforeNumber = exports.isLessOrEqual = exports.isLess = exports.isMoreOrEqual = exports.isMore = exports.isFloat = exports.isNumber = exports.isNumeric = exports.isDifferentNumber = exports.isEqualNumber = exports.isNegative = void 0;
var contains_validation_1 = require("./common/contains.validation");
var isNegative = function (value) { return contains_validation_1.contains(value.toString(), "-"); };
exports.isNegative = isNegative;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyLnZhbGlkYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdmFsaWRhdGlvbnMvbnVtYmVyLnZhbGlkYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsb0VBQXdEO0FBSWpELElBQU0sVUFBVSxHQUFHLFVBQUMsS0FBc0IsSUFBYyxPQUFBLDhCQUFRLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUEvQixDQUErQixDQUFDO0FBQWxGLFFBQUEsVUFBVSxjQUF3RTtBQUV4RixJQUFNLGFBQWEsR0FBRyxVQUFDLEtBQWMsRUFBRSxPQUFnQixJQUFjLE9BQUEsS0FBSyxLQUFLLE9BQU8sRUFBakIsQ0FBaUIsQ0FBQztBQUFqRixRQUFBLGFBQWEsaUJBQW9FO0FBRXZGLElBQU0saUJBQWlCLEdBQUcsVUFBQyxLQUFjLEVBQUUsT0FBZ0IsSUFBYyxPQUFBLEtBQUssS0FBSyxPQUFPLEVBQWpCLENBQWlCLENBQUM7QUFBckYsUUFBQSxpQkFBaUIscUJBQW9FO0FBRTNGLElBQU0sU0FBUyxHQUFHLFVBQUMsS0FBVSxJQUFjLE9BQUEsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUExQyxDQUEwQyxDQUFDO0FBQWhGLFFBQUEsU0FBUyxhQUF1RTtBQUV0RixJQUFNLFFBQVEsR0FBRyxVQUFDLEtBQWM7SUFDckMsT0FBQSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBZSxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsS0FBZSxDQUFDLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUTtBQUEzRixDQUEyRixDQUFDO0FBRGpGLFFBQUEsUUFBUSxZQUN5RTtBQUV2RixJQUFNLE9BQU8sR0FBRyxVQUFDLEtBQWMsSUFBYyxPQUFBLGlCQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUE1QyxDQUE0QyxDQUFDO0FBQXBGLFFBQUEsT0FBTyxXQUE2RTtBQUUxRixJQUFNLE1BQU0sR0FBRyxVQUFDLEtBQWMsRUFBRSxPQUFnQixJQUFjLE9BQUEsS0FBSyxHQUFHLE9BQU8sRUFBZixDQUFlLENBQUM7QUFBeEUsUUFBQSxNQUFNLFVBQWtFO0FBRTlFLElBQU0sYUFBYSxHQUFHLFVBQUMsS0FBYyxFQUFFLE9BQWdCLElBQWMsT0FBQSxLQUFLLElBQUksT0FBTyxFQUFoQixDQUFnQixDQUFDO0FBQWhGLFFBQUEsYUFBYSxpQkFBbUU7QUFFdEYsSUFBTSxNQUFNLEdBQUcsVUFBQyxLQUFjLEVBQUUsT0FBZ0IsSUFBYyxPQUFBLEtBQUssR0FBRyxPQUFPLEVBQWYsQ0FBZSxDQUFDO0FBQXhFLFFBQUEsTUFBTSxVQUFrRTtBQUU5RSxJQUFNLGFBQWEsR0FBRyxVQUFDLEtBQWMsRUFBRSxPQUFnQixJQUFjLE9BQUEsS0FBSyxJQUFJLE9BQU8sRUFBaEIsQ0FBZ0IsQ0FBQztBQUFoRixRQUFBLGFBQWEsaUJBQW1FO0FBRXRGLElBQU0sY0FBYyxHQUFHLFVBQUMsS0FBc0IsRUFBRSxLQUFrQjtJQUN2RSxLQUFLLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUMxQyxPQUFPLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUM7QUFDM0QsQ0FBQyxDQUFDO0FBSFcsUUFBQSxjQUFjLGtCQUd6QiJ9