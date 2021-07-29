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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVsYXRpdmUtdGltZS5mdW5jdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mdW5jdGlvbnMvcmVsYXRpdmUtdGltZS5mdW5jdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSwyRUFBc0Q7QUFDdEQsZ0RBQTBCO0FBRTFCLGVBQUssQ0FBQyxNQUFNLENBQUMsc0JBQWEsQ0FBQyxDQUFDO0FBRTVCLFNBQWdCLFlBQVksQ0FDMUIsS0FBa0MsRUFDbEMsSUFBa0M7SUFBbEMscUJBQUEsRUFBQSxlQUFrQztJQUVsQyxLQUFLLEdBQUcsZUFBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JCLElBQUksSUFBSSxLQUFLLFFBQVEsRUFBRTtRQUNyQixPQUFPLGVBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDcEM7SUFDRCxPQUFPLGVBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7QUFDckMsQ0FBQztBQVRELG9DQVNDIn0=