(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "dayjs", "./../regex/time.regex"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.timeToDate = void 0;
    var dayjs = require("dayjs");
    var time_regex_1 = require("./../regex/time.regex");
    function timeToDate(time) {
        if (time) {
            var validTime = time.match(time_regex_1.REGEX_TIME) !== null;
            return validTime
                ? dayjs().format("YYYY-MM-DDT" + time + "Z")
                : dayjs().format("YYYY-MM-DDTHH:mm:ssZ");
        }
        return time;
    }
    exports.timeToDate = timeToDate;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZS10by1kYXRlLmZ1bmN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Z1bmN0aW9ucy90aW1lLXRvLWRhdGUuZnVuY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0lBQUEsNkJBQStCO0lBQy9CLG9EQUFtRDtJQUVuRCxTQUFnQixVQUFVLENBQUMsSUFBWTtRQUNyQyxJQUFJLElBQUksRUFBRTtZQUNSLElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsdUJBQVUsQ0FBQyxLQUFLLElBQUksQ0FBQztZQUVsRCxPQUFPLFNBQVM7Z0JBQ2QsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLE1BQU0sQ0FBQyxnQkFBYyxJQUFJLE1BQUcsQ0FBQztnQkFDdkMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1NBQzVDO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBVEQsZ0NBU0MifQ==