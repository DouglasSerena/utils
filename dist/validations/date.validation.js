(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "dayjs", "dayjs/plugin/isBetween"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isEqualDate = exports.isDifferentDate = exports.isBirthDateValidation = exports.isBetweenDate = exports.isBeforeDate = exports.isAfterDate = exports.isDate = void 0;
    var dayjs = require("dayjs");
    var isBetween = require("dayjs/plugin/isBetween");
    dayjs.extend(isBetween);
    var isDate = function (value) { return dayjs(value).isValid(); };
    exports.isDate = isDate;
    var isAfterDate = function (date, dataAfter, options) { return dayjs(date).isAfter(dayjs(dataAfter), options); };
    exports.isAfterDate = isAfterDate;
    var isBeforeDate = function (date, dataBefore, options) { return dayjs(date).isBefore(dayjs(dataBefore), options); };
    exports.isBeforeDate = isBeforeDate;
    var isBetweenDate = function (date, range, options, d) {
        return dayjs(date).isBetween(dayjs((range === null || range === void 0 ? void 0 : range.start) || new Date()), dayjs((range === null || range === void 0 ? void 0 : range.end) || new Date()), options, d);
    };
    exports.isBetweenDate = isBetweenDate;
    var isBirthDateValidation = function (birchDay, year) {
        var _a, _b;
        year.min = Number.parseInt(((_a = year === null || year === void 0 ? void 0 : year.min) === null || _a === void 0 ? void 0 : _a.toString()) || "0");
        year.max = Number.parseInt(((_b = year === null || year === void 0 ? void 0 : year.max) === null || _b === void 0 ? void 0 : _b.toString()) || "200");
        return dayjs(birchDay).isBetween(dayjs().subtract(year.min, "years"), dayjs().subtract(year.max, "years"));
    };
    exports.isBirthDateValidation = isBirthDateValidation;
    var isEqualDate = function (date, dateDifferent, options) { return dayjs(date).isSame(dayjs(dateDifferent), options); };
    exports.isEqualDate = isEqualDate;
    var isDifferentDate = function (date, dateDifferent, options) { return !isEqualDate(date, dateDifferent, options); };
    exports.isDifferentDate = isDifferentDate;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS52YWxpZGF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3ZhbGlkYXRpb25zL2RhdGUudmFsaWRhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7SUFBQSw2QkFBK0I7SUFDL0Isa0RBQW9EO0lBRXBELEtBQUssQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7SUFNeEIsSUFBTSxNQUFNLEdBQUcsVUFBQyxLQUFlLElBQWMsT0FBQSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQXRCLENBQXNCLENBQUM7SUFrRGxFLHdCQUFNO0lBaERSLElBQU0sV0FBVyxHQUFHLFVBQ2xCLElBQWMsRUFDZCxTQUFtQixFQUNuQixPQUEwQixJQUNkLE9BQUEsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQTlDLENBQThDLENBQUM7SUE2QzNELGtDQUFXO0lBM0NiLElBQU0sWUFBWSxHQUFHLFVBQ25CLElBQWMsRUFDZCxVQUFvQixFQUNwQixPQUEwQixJQUNkLE9BQUEsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQWhELENBQWdELENBQUM7SUF3QzdELG9DQUFZO0lBdENkLElBQU0sYUFBYSxHQUFHLFVBQ3BCLElBQWMsRUFDZCxLQUFhLEVBQ2IsT0FBMEIsRUFDMUIsQ0FBNkI7UUFFN0IsT0FBQSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUNuQixLQUFLLENBQUMsQ0FBQSxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUUsS0FBSyxLQUFJLElBQUksSUFBSSxFQUFFLENBQUMsRUFDakMsS0FBSyxDQUFDLENBQUEsS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFFLEdBQUcsS0FBSSxJQUFJLElBQUksRUFBRSxDQUFDLEVBQy9CLE9BQU8sRUFDUCxDQUFDLENBQ0Y7SUFMRCxDQUtDLENBQUM7SUE0QkYsc0NBQWE7SUExQmYsSUFBTSxxQkFBcUIsR0FBRyxVQUFDLFFBQWtCLEVBQUUsSUFBYTs7UUFDOUQsSUFBSSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUEsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsR0FBRywwQ0FBRSxRQUFRLEVBQUUsS0FBSSxHQUFHLENBQUMsQ0FBQztRQUN6RCxJQUFJLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxHQUFHLDBDQUFFLFFBQVEsRUFBRSxLQUFJLEtBQUssQ0FBQyxDQUFDO1FBRTNELE9BQU8sS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsQ0FDOUIsS0FBSyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLEVBQ25DLEtBQUssRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUNwQyxDQUFDO0lBQ0osQ0FBQyxDQUFDO0lBbUJBLHNEQUFxQjtJQWpCdkIsSUFBTSxXQUFXLEdBQUcsVUFDbEIsSUFBYyxFQUNkLGFBQXVCLEVBQ3ZCLE9BQTBCLElBQ2QsT0FBQSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBakQsQ0FBaUQsQ0FBQztJQWU5RCxrQ0FBVztJQWJiLElBQU0sZUFBZSxHQUFHLFVBQ3RCLElBQWMsRUFDZCxhQUF1QixFQUN2QixPQUEwQixJQUNkLE9BQUEsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLGFBQWEsRUFBRSxPQUFPLENBQUMsRUFBMUMsQ0FBMEMsQ0FBQztJQVF2RCwwQ0FBZSJ9