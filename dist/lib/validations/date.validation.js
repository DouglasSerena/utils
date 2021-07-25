"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEqualDate = exports.isDifferentDate = exports.isBirthDateValidation = exports.isBetweenDate = exports.isBeforeDate = exports.isAfterDate = exports.isDate = void 0;
var dayjs_1 = __importDefault(require("dayjs"));
var isBetween_1 = __importDefault(require("dayjs/plugin/isBetween"));
var isSameOrAfter_1 = __importDefault(require("dayjs/plugin/isSameOrAfter"));
var isSameOrBefore_1 = __importDefault(require("dayjs/plugin/isSameOrBefore"));
dayjs_1.default.extend(isBetween_1.default);
dayjs_1.default.extend(isSameOrAfter_1.default);
dayjs_1.default.extend(isSameOrBefore_1.default);
var isDate = function (value) { return dayjs_1.default(value).isValid(); };
exports.isDate = isDate;
var isAfterDate = function (date, dataAfter, options) {
    return dayjs_1.default(date).isAfter(dayjs_1.default(dataAfter), options);
};
exports.isAfterDate = isAfterDate;
var isBeforeDate = function (date, dataBefore, options) {
    return dayjs_1.default(date).isBefore(dayjs_1.default(dataBefore), options);
};
exports.isBeforeDate = isBeforeDate;
var isBetweenDate = function (date, range, options, d) {
    return dayjs_1.default(date).isBetween(dayjs_1.default((range === null || range === void 0 ? void 0 : range.start) || new Date()), dayjs_1.default((range === null || range === void 0 ? void 0 : range.end) || new Date()), options, d);
};
exports.isBetweenDate = isBetweenDate;
var isBirthDateValidation = function (birchDay, year) {
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
exports.isBirthDateValidation = isBirthDateValidation;
var isEqualDate = function (date, dateDifferent, options) { return dayjs_1.default(date).isSame(dayjs_1.default(dateDifferent), options); };
exports.isEqualDate = isEqualDate;
var isDifferentDate = function (date, dateDifferent, options) { return !isEqualDate(date, dateDifferent, options); };
exports.isDifferentDate = isDifferentDate;
//# sourceMappingURL=date.validation.js.map