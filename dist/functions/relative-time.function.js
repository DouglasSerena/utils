(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "dayjs/plugin/relativeTime", "dayjs"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.relativeTime = void 0;
    var _relativeTime = require("dayjs/plugin/relativeTime");
    var dayjs = require("dayjs");
    dayjs.extend(_relativeTime);
    function relativeTime(value, time) {
        if (time === void 0) { time = "future"; }
        value = dayjs(value);
        if (time === "future") {
            return dayjs(Date.now()).to(value);
        }
        return dayjs(value).to(Date.now());
    }
    exports.relativeTime = relativeTime;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVsYXRpdmUtdGltZS5mdW5jdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9mdW5jdGlvbnMvcmVsYXRpdmUtdGltZS5mdW5jdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7SUFBQSx5REFBMkQ7SUFDM0QsNkJBQStCO0lBRS9CLEtBQUssQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7SUFFNUIsU0FBZ0IsWUFBWSxDQUMxQixLQUFrQyxFQUNsQyxJQUFrQztRQUFsQyxxQkFBQSxFQUFBLGVBQWtDO1FBRWxDLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckIsSUFBSSxJQUFJLEtBQUssUUFBUSxFQUFFO1lBQ3JCLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNwQztRQUNELE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBVEQsb0NBU0MifQ==