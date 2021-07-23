"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEqualDate = exports.isDifferentDate = exports.isBirthDateValidation = exports.isBetweenDate = exports.isBeforeDate = exports.isAfterDate = exports.isDate = void 0;
var dayjs_1 = __importDefault(require("dayjs"));
var isBetween_1 = __importDefault(require("dayjs/plugin/isBetween"));
dayjs_1.default.extend(isBetween_1.default);
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
    var _a, _b;
    year.min = Number.parseInt(((_a = year === null || year === void 0 ? void 0 : year.min) === null || _a === void 0 ? void 0 : _a.toString()) || "0");
    year.max = Number.parseInt(((_b = year === null || year === void 0 ? void 0 : year.max) === null || _b === void 0 ? void 0 : _b.toString()) || "200");
    return dayjs_1.default(birchDay).isBetween(dayjs_1.default().subtract(year.min, "years"), dayjs_1.default().subtract(year.max, "years"));
};
exports.isBirthDateValidation = isBirthDateValidation;
var isEqualDate = function (date, dateDifferent, options) { return dayjs_1.default(date).isSame(dayjs_1.default(dateDifferent), options); };
exports.isEqualDate = isEqualDate;
var isDifferentDate = function (date, dateDifferent, options) { return !isEqualDate(date, dateDifferent, options); };
exports.isDifferentDate = isDifferentDate;
//# sourceMappingURL=date.validation.js.map