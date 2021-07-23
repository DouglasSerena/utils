(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../validations"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseNumber = void 0;
    var validations_1 = require("../validations");
    function parseNumber(value, options) {
        var precision = Math.pow(10, (options === null || options === void 0 ? void 0 : options.precision) || 2);
        if (!validations_1.isNumeric(value) && validations_1.isString(value)) {
            var decimalStr = new RegExp("\\" + ((options === null || options === void 0 ? void 0 : options.decimal) || ","), "g");
            var thousandsStr = new RegExp("\\" + ((options === null || options === void 0 ? void 0 : options.thousands) || "."), "g");
            value = value.toString().replace(thousandsStr, "").replace(decimalStr, ".");
            value = Number(value) || 0;
        }
        else {
            if (options === null || options === void 0 ? void 0 : options.error)
                new Error("Invalid Input.");
        }
        value = Number(value) * precision;
        value = Number(value.toFixed(4));
        var round = Math[(options === null || options === void 0 ? void 0 : options.round) || "ceil"];
        return (options === null || options === void 0 ? void 0 : options.rounding) || validations_1.isUndefined(options === null || options === void 0 ? void 0 : options.rounding)
            ? round(value) / precision
            : round(value);
    }
    exports.parseNumber = parseNumber;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2UtbnVtYmVyLmZ1bmN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Z1bmN0aW9ucy9wYXJzZS1udW1iZXIuZnVuY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0lBQUEsOENBQWtFO0lBWWxFLFNBQWdCLFdBQVcsQ0FDekIsS0FBc0IsRUFDdEIsT0FBNkI7UUFFN0IsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsU0FBUyxLQUFJLENBQUMsQ0FBQyxDQUFDO1FBRXhELElBQUksQ0FBQyx1QkFBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLHNCQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDeEMsSUFBTSxVQUFVLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBSyxDQUFBLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxPQUFPLEtBQUksR0FBRyxDQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDbkUsSUFBTSxZQUFZLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBSyxDQUFBLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxTQUFTLEtBQUksR0FBRyxDQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFFdkUsS0FBSyxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFFNUUsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDNUI7YUFBTTtZQUNMLElBQUksT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLEtBQUs7Z0JBQUUsSUFBSSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztTQUNqRDtRQUVELEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsU0FBUyxDQUFDO1FBQ2xDLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWpDLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFBLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxLQUFLLEtBQUksTUFBTSxDQUFDLENBQUM7UUFFN0MsT0FBTyxDQUFBLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxRQUFRLEtBQUkseUJBQVcsQ0FBQyxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsUUFBUSxDQUFDO1lBQ3hELENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsU0FBUztZQUMxQixDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25CLENBQUM7SUF6QkQsa0NBeUJDIn0=