"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.relativeTime = void 0;
var relativeTime_1 = __importDefault(require("dayjs/plugin/relativeTime"));
var dayjs_1 = __importDefault(require("dayjs"));
dayjs_1.default.extend(relativeTime_1.default);
function relativeTime(value, time) {
    if (time === void 0) { time = "future"; }
    value = dayjs_1.default(value);
    if (time === "future") {
        return dayjs_1.default(Date.now()).to(value);
    }
    return dayjs_1.default(value).to(Date.now());
}
exports.relativeTime = relativeTime;
//# sourceMappingURL=relative-time.function.js.map