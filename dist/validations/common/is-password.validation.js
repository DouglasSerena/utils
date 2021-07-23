(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../functions", "../../regex"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isPassword = void 0;
    var functions_1 = require("../../functions");
    var regex_1 = require("../../regex");
    function isPassword(value, disabled, minLength) {
        if (minLength === void 0) { minLength = 9; }
        var resultUpperCase = (disabled === null || disabled === void 0 ? void 0 : disabled.charUpperCase) ||
            functions_1.contains(value, regex_1.REGEX_UPPER_CASE, { caseSensitive: true });
        var resultMinLength = (value === null || value === void 0 ? void 0 : value.length) >= minLength;
        var resultCharSpecial = (disabled === null || disabled === void 0 ? void 0 : disabled.charSpecial) || functions_1.contains(value, regex_1.REGEX_CHAR_SPECIAL);
        var resultNumber = (disabled === null || disabled === void 0 ? void 0 : disabled.number) || functions_1.contains(value, regex_1.REGEX_NUMBER);
        return (resultUpperCase && resultMinLength && resultCharSpecial && resultNumber);
    }
    exports.isPassword = isPassword;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXMtcGFzc3dvcmQudmFsaWRhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy92YWxpZGF0aW9ucy9jb21tb24vaXMtcGFzc3dvcmQudmFsaWRhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7SUFBQSw2Q0FBMkM7SUFDM0MscUNBSXFCO0lBRXJCLFNBQWdCLFVBQVUsQ0FDeEIsS0FBYSxFQUNiLFFBSUMsRUFDRCxTQUFhO1FBQWIsMEJBQUEsRUFBQSxhQUFhO1FBRWIsSUFBTSxlQUFlLEdBQ25CLENBQUEsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLGFBQWE7WUFDdkIsb0JBQVEsQ0FBQyxLQUFLLEVBQUUsd0JBQWdCLEVBQUUsRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUU3RCxJQUFNLGVBQWUsR0FBRyxDQUFBLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRSxNQUFNLEtBQUksU0FBUyxDQUFDO1FBRW5ELElBQU0saUJBQWlCLEdBQ3JCLENBQUEsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLFdBQVcsS0FBSSxvQkFBUSxDQUFDLEtBQUssRUFBRSwwQkFBa0IsQ0FBQyxDQUFDO1FBRS9ELElBQU0sWUFBWSxHQUFHLENBQUEsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLE1BQU0sS0FBSSxvQkFBUSxDQUFDLEtBQUssRUFBRSxvQkFBWSxDQUFDLENBQUM7UUFFdkUsT0FBTyxDQUNMLGVBQWUsSUFBSSxlQUFlLElBQUksaUJBQWlCLElBQUksWUFBWSxDQUN4RSxDQUFDO0lBQ0osQ0FBQztJQXZCRCxnQ0F1QkMifQ==