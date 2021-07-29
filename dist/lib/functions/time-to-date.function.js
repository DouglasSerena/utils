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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS10by1kYXRlLmZ1bmN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2Z1bmN0aW9ucy90aW1lLXRvLWRhdGUuZnVuY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsZ0RBQTBCO0FBQzFCLG9EQUFtRDtBQUVuRCxTQUFnQixVQUFVLENBQUMsSUFBWTtJQUNyQyxJQUFJLElBQUksRUFBRTtRQUNSLElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsdUJBQVUsQ0FBQyxLQUFLLElBQUksQ0FBQztRQUVsRCxPQUFPLFNBQVM7WUFDZCxDQUFDLENBQUMsZUFBSyxFQUFFLENBQUMsTUFBTSxDQUFDLGdCQUFjLElBQUksTUFBRyxDQUFDO1lBQ3ZDLENBQUMsQ0FBQyxlQUFLLEVBQUUsQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsQ0FBQztLQUM1QztJQUNELE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQVRELGdDQVNDIn0=