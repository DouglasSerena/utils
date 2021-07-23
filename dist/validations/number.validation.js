(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isMoreOrEqual = exports.isMore = exports.isLess = exports.isLessOrEqual = exports.isBeforeNumber = exports.isFloat = exports.isNumeric = void 0;
    var isNumeric = function (value) {
        return !isNaN(parseInt(value)) && isFinite(value);
    };
    exports.isNumeric = isNumeric;
    var isFloat = function (value) {
        return isNumeric(value) && !Number.isInteger(value);
    };
    exports.isFloat = isFloat;
    var isMore = function (value, verify) { return value > verify; };
    exports.isMore = isMore;
    var isMoreOrEqual = function (value, verify) { return value >= verify; };
    exports.isMoreOrEqual = isMoreOrEqual;
    var isLess = function (value, verify) { return value < verify; };
    exports.isLess = isLess;
    var isLessOrEqual = function (value, verify) { return value <= verify; };
    exports.isLessOrEqual = isLessOrEqual;
    function isBeforeNumber(value, range) {
        value = Number.parseInt(value.toString());
        return value >= (range.start || 0) && value <= (range.end || 0);
    }
    exports.isBeforeNumber = isBeforeNumber;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyLnZhbGlkYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdmFsaWRhdGlvbnMvbnVtYmVyLnZhbGlkYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0lBRUEsSUFBTSxTQUFTLEdBQUcsVUFBQyxLQUFVO1FBQzNCLE9BQUEsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQztJQUExQyxDQUEwQyxDQUFDO0lBbUIzQyw4QkFBUztJQWpCWCxJQUFNLE9BQU8sR0FBRyxVQUFDLEtBQVU7UUFDekIsT0FBQSxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQztJQUE1QyxDQUE0QyxDQUFDO0lBaUI3QywwQkFBTztJQWZULElBQU0sTUFBTSxHQUFHLFVBQUMsS0FBVSxFQUFFLE1BQVcsSUFBYyxPQUFBLEtBQUssR0FBRyxNQUFNLEVBQWQsQ0FBYyxDQUFDO0lBbUJsRSx3QkFBTTtJQWpCUixJQUFNLGFBQWEsR0FBRyxVQUFDLEtBQVUsRUFBRSxNQUFXLElBQWMsT0FBQSxLQUFLLElBQUksTUFBTSxFQUFmLENBQWUsQ0FBQztJQWtCMUUsc0NBQWE7SUFoQmYsSUFBTSxNQUFNLEdBQUcsVUFBQyxLQUFVLEVBQUUsTUFBVyxJQUFjLE9BQUEsS0FBSyxHQUFHLE1BQU0sRUFBZCxDQUFjLENBQUM7SUFjbEUsd0JBQU07SUFaUixJQUFNLGFBQWEsR0FBRyxVQUFDLEtBQVUsRUFBRSxNQUFXLElBQWMsT0FBQSxLQUFLLElBQUksTUFBTSxFQUFmLENBQWUsQ0FBQztJQVcxRSxzQ0FBYTtJQVRmLFNBQVMsY0FBYyxDQUFDLEtBQXNCLEVBQUUsS0FBYTtRQUMzRCxLQUFLLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUMxQyxPQUFPLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBS0Msd0NBQWMifQ==