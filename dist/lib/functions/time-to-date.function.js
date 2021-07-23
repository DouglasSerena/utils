"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeToDate = void 0;
var dayjs_1 = __importDefault(require("dayjs"));
var time_regex_1 = require("./../regex/time.regex");
function timeToDate(time) {
    if (time) {
        var validTime = time.match(time_regex_1.REGEX_TIME) !== null;
        return validTime
            ? dayjs_1.default().format("YYYY-MM-DDT" + time + "Z")
            : dayjs_1.default().format("YYYY-MM-DDTHH:mm:ssZ");
    }
    return time;
}
exports.timeToDate = timeToDate;
//# sourceMappingURL=time-to-date.function.js.map