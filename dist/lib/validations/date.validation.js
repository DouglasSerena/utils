"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDifferentDate = exports.isEqualDate = exports.isBirthDateValid = exports.isBetweenDate = exports.isBeforeDate = exports.isAfterDate = exports.isDateValid = void 0;
var dayjs_1 = __importDefault(require("dayjs"));
var isBetween_1 = __importDefault(require("dayjs/plugin/isBetween"));
var isSameOrAfter_1 = __importDefault(require("dayjs/plugin/isSameOrAfter"));
var isSameOrBefore_1 = __importDefault(require("dayjs/plugin/isSameOrBefore"));
dayjs_1.default.extend(isBetween_1.default);
dayjs_1.default.extend(isSameOrAfter_1.default);
dayjs_1.default.extend(isSameOrBefore_1.default);
var isDateValid = function (value) { return dayjs_1.default(value).isValid(); };
exports.isDateValid = isDateValid;
var isAfterDate = function (date, dataAfter, options) { return dayjs_1.default(date).isAfter(dayjs_1.default(dataAfter), options); };
exports.isAfterDate = isAfterDate;
var isBeforeDate = function (date, dataBefore, options) { return dayjs_1.default(date).isBefore(dayjs_1.default(dataBefore), options); };
exports.isBeforeDate = isBeforeDate;
var isBetweenDate = function (date, range, options, d) {
    return dayjs_1.default(date).isBetween(dayjs_1.default((range === null || range === void 0 ? void 0 : range.start) || new Date()), dayjs_1.default((range === null || range === void 0 ? void 0 : range.end) || new Date()), options, d);
};
exports.isBetweenDate = isBetweenDate;
var isBirthDateValid = function (birchDay, year) {
    var _a, _b, _c;
    if (!(year === null || year === void 0 ? void 0 : year.max)) {
        year.min = Number.parseInt((_a = year === null || year === void 0 ? void 0 : year.min) === null || _a === void 0 ? void 0 : _a.toString());
        return dayjs_1.default(birchDay).isSameOrBefore(dayjs_1.default().subtract(year.min, "years"));
    }
    year.max = Number.parseInt((_b = year === null || year === void 0 ? void 0 : year.max) === null || _b === void 0 ? void 0 : _b.toString());
    year.min = Number.parseInt((_c = year === null || year === void 0 ? void 0 : year.min) === null || _c === void 0 ? void 0 : _c.toString());
    return (dayjs_1.default(birchDay).isSameOrAfter(dayjs_1.default().subtract(year.max, "years")) &&
        dayjs_1.default(birchDay).isSameOrBefore(dayjs_1.default().subtract(year.min || 0, "years")));
};
exports.isBirthDateValid = isBirthDateValid;
var isEqualDate = function (date, dateDifferent, options) { return dayjs_1.default(date).isSame(dayjs_1.default(dateDifferent), options); };
exports.isEqualDate = isEqualDate;
var isDifferentDate = function (date, dateDifferent, options) { return !exports.isEqualDate(date, dateDifferent, options); };
exports.isDifferentDate = isDifferentDate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS52YWxpZGF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3ZhbGlkYXRpb25zL2RhdGUudmFsaWRhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxnREFBMEI7QUFDMUIscUVBQStDO0FBQy9DLDZFQUF1RDtBQUN2RCwrRUFBeUQ7QUFFekQsZUFBSyxDQUFDLE1BQU0sQ0FBQyxtQkFBUyxDQUFDLENBQUM7QUFDeEIsZUFBSyxDQUFDLE1BQU0sQ0FBQyx1QkFBYSxDQUFDLENBQUM7QUFDNUIsZUFBSyxDQUFDLE1BQU0sQ0FBQyx3QkFBYyxDQUFDLENBQUM7QUFNdEIsSUFBTSxXQUFXLEdBQUcsVUFBQyxLQUFjLElBQWMsT0FBQSxlQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQXRCLENBQXNCLENBQUM7QUFBbEUsUUFBQSxXQUFXLGVBQXVEO0FBRXhFLElBQU0sV0FBVyxHQUFHLFVBQ3pCLElBQWEsRUFDYixTQUFrQixFQUNsQixPQUEwQixJQUNkLE9BQUEsZUFBSyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxlQUFLLENBQUMsU0FBUyxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQTlDLENBQThDLENBQUM7QUFKaEQsUUFBQSxXQUFXLGVBSXFDO0FBRXRELElBQU0sWUFBWSxHQUFHLFVBQzFCLElBQWEsRUFDYixVQUFtQixFQUNuQixPQUEwQixJQUNkLE9BQUEsZUFBSyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxlQUFLLENBQUMsVUFBVSxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQWhELENBQWdELENBQUM7QUFKbEQsUUFBQSxZQUFZLGdCQUlzQztBQUV4RCxJQUFNLGFBQWEsR0FBRyxVQUMzQixJQUFhLEVBQ2IsS0FBZ0IsRUFDaEIsT0FBMEIsRUFDMUIsQ0FBNkI7SUFFN0IsT0FBQSxlQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUNuQixlQUFLLENBQUMsQ0FBQSxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUUsS0FBSyxLQUFJLElBQUksSUFBSSxFQUFFLENBQUMsRUFDakMsZUFBSyxDQUFDLENBQUEsS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFFLEdBQUcsS0FBSSxJQUFJLElBQUksRUFBRSxDQUFDLEVBQy9CLE9BQU8sRUFDUCxDQUFDLENBQ0Y7QUFMRCxDQUtDLENBQUM7QUFYUyxRQUFBLGFBQWEsaUJBV3RCO0FBRUcsSUFBTSxnQkFBZ0IsR0FBRyxVQUFDLFFBQWlCLEVBQUUsSUFBWTs7SUFDOUQsSUFBSSxDQUFDLENBQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLEdBQUcsQ0FBQSxFQUFFO1FBQ2QsSUFBSSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLEdBQUcsMENBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUNsRCxPQUFPLGVBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxjQUFjLENBQUMsZUFBSyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztLQUM1RTtJQUNELElBQUksQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxHQUFHLDBDQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDbEQsSUFBSSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLEdBQUcsMENBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUVsRCxPQUFPLENBQ0wsZUFBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxlQUFLLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNsRSxlQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsY0FBYyxDQUFDLGVBQUssRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUN6RSxDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBWlcsUUFBQSxnQkFBZ0Isb0JBWTNCO0FBRUssSUFBTSxXQUFXLEdBQUcsVUFDekIsSUFBYSxFQUNiLGFBQXNCLEVBQ3RCLE9BQTBCLElBQ2QsT0FBQSxlQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLGVBQUssQ0FBQyxhQUFhLENBQUMsRUFBRSxPQUFPLENBQUMsRUFBakQsQ0FBaUQsQ0FBQztBQUpuRCxRQUFBLFdBQVcsZUFJd0M7QUFFekQsSUFBTSxlQUFlLEdBQUcsVUFDN0IsSUFBYSxFQUNiLGFBQXNCLEVBQ3RCLE9BQTBCLElBQ2QsT0FBQSxDQUFDLG1CQUFXLENBQUMsSUFBSSxFQUFFLGFBQWEsRUFBRSxPQUFPLENBQUMsRUFBMUMsQ0FBMEMsQ0FBQztBQUo1QyxRQUFBLGVBQWUsbUJBSTZCIn0=