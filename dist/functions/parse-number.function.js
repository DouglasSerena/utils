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
    exports.parseNumber = exports.parseNumberOptions = void 0;
    var validations_1 = require("../validations");
    exports.parseNumberOptions = {
        decimal: ",",
        thousands: ".",
        error: false,
    };
    function parseNumber(value, options) {
        options = Object.assign({}, exports.parseNumberOptions, options);
        if (!validations_1.isNumeric(value) && validations_1.isString(value)) {
            var decimalStr = new RegExp("\\" + (options === null || options === void 0 ? void 0 : options.decimal), "g");
            var thousandsStr = new RegExp("\\" + (options === null || options === void 0 ? void 0 : options.thousands), "g");
            value = value.toString().replace(thousandsStr, "").replace(decimalStr, ".");
            value = Number(value) || 0;
        }
        else {
            if (options === null || options === void 0 ? void 0 : options.error)
                new Error("Invalid Input.");
        }
        return Number(value);
    }
    exports.parseNumber = parseNumber;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2UtbnVtYmVyLmZ1bmN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Z1bmN0aW9ucy9wYXJzZS1udW1iZXIuZnVuY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0lBQUEsOENBQXFEO0lBRXhDLFFBQUEsa0JBQWtCLEdBQXdCO1FBQ3JELE9BQU8sRUFBRSxHQUFHO1FBQ1osU0FBUyxFQUFFLEdBQUc7UUFDZCxLQUFLLEVBQUUsS0FBSztLQUNiLENBQUM7SUFRRixTQUFnQixXQUFXLENBQ3pCLEtBQXNCLEVBQ3RCLE9BQTZCO1FBRTdCLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSwwQkFBa0IsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsdUJBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxzQkFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3hDLElBQU0sVUFBVSxHQUFHLElBQUksTUFBTSxDQUFDLFFBQUssT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLE9BQU8sQ0FBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQzVELElBQU0sWUFBWSxHQUFHLElBQUksTUFBTSxDQUFDLFFBQUssT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLFNBQVMsQ0FBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBRWhFLEtBQUssR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBRTVFLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzVCO2FBQU07WUFDTCxJQUFJLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxLQUFLO2dCQUFFLElBQUksS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7U0FDakQ7UUFFRCxPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN2QixDQUFDO0lBakJELGtDQWlCQyJ9