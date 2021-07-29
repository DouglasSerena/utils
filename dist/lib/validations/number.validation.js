"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBeforeNumber = exports.isLessOrEqual = exports.isLess = exports.isMoreOrEqual = exports.isMore = exports.isFloat = exports.isNumber = exports.isNumeric = exports.isDifferentNumber = exports.isEqualNumber = exports.isNegative = void 0;
var contains_validation_1 = require("./common/contains.validation");
var isNegative = function (value) { return contains_validation_1.contains(value, "-"); };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyLnZhbGlkYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdmFsaWRhdGlvbnMvbnVtYmVyLnZhbGlkYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsb0VBQXdEO0FBSWpELElBQU0sVUFBVSxHQUFHLFVBQUMsS0FBYSxJQUFLLE9BQUEsOEJBQVEsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLEVBQXBCLENBQW9CLENBQUM7QUFBckQsUUFBQSxVQUFVLGNBQTJDO0FBQzNELElBQU0sYUFBYSxHQUFHLFVBQUMsS0FBVSxFQUFFLE9BQVksSUFBYyxPQUFBLEtBQUssS0FBSyxPQUFPLEVBQWpCLENBQWlCLENBQUM7QUFBekUsUUFBQSxhQUFhLGlCQUE0RDtBQUMvRSxJQUFNLGlCQUFpQixHQUFHLFVBQUMsS0FBVSxFQUFFLE9BQVksSUFBYyxPQUFBLEtBQUssS0FBSyxPQUFPLEVBQWpCLENBQWlCLENBQUM7QUFBN0UsUUFBQSxpQkFBaUIscUJBQTREO0FBQ25GLElBQU0sU0FBUyxHQUFHLFVBQUMsS0FBVSxJQUFjLE9BQUEsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUExQyxDQUEwQyxDQUFDO0FBQWhGLFFBQUEsU0FBUyxhQUF1RTtBQUN0RixJQUFNLFFBQVEsR0FBRyxVQUFDLEtBQVU7SUFDakMsT0FBQSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUTtBQUF2RSxDQUF1RSxDQUFDO0FBRDdELFFBQUEsUUFBUSxZQUNxRDtBQUNuRSxJQUFNLE9BQU8sR0FBRyxVQUFDLEtBQVUsSUFBYyxPQUFBLGlCQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUE1QyxDQUE0QyxDQUFDO0FBQWhGLFFBQUEsT0FBTyxXQUF5RTtBQUN0RixJQUFNLE1BQU0sR0FBRyxVQUFDLEtBQVUsRUFBRSxPQUFZLElBQWMsT0FBQSxLQUFLLEdBQUcsT0FBTyxFQUFmLENBQWUsQ0FBQztBQUFoRSxRQUFBLE1BQU0sVUFBMEQ7QUFDdEUsSUFBTSxhQUFhLEdBQUcsVUFBQyxLQUFVLEVBQUUsT0FBWSxJQUFjLE9BQUEsS0FBSyxJQUFJLE9BQU8sRUFBaEIsQ0FBZ0IsQ0FBQztBQUF4RSxRQUFBLGFBQWEsaUJBQTJEO0FBQzlFLElBQU0sTUFBTSxHQUFHLFVBQUMsS0FBVSxFQUFFLE9BQVksSUFBYyxPQUFBLEtBQUssR0FBRyxPQUFPLEVBQWYsQ0FBZSxDQUFDO0FBQWhFLFFBQUEsTUFBTSxVQUEwRDtBQUN0RSxJQUFNLGFBQWEsR0FBRyxVQUFDLEtBQVUsRUFBRSxPQUFZLElBQWMsT0FBQSxLQUFLLElBQUksT0FBTyxFQUFoQixDQUFnQixDQUFDO0FBQXhFLFFBQUEsYUFBYSxpQkFBMkQ7QUFDOUUsSUFBTSxjQUFjLEdBQUcsVUFBQyxLQUFzQixFQUFFLEtBQWtCO0lBQ3ZFLEtBQUssR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQzFDLE9BQU8sS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQztBQUMzRCxDQUFDLENBQUM7QUFIVyxRQUFBLGNBQWMsa0JBR3pCIn0=