"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPassword = void 0;
var regex_1 = require("../../regex");
var contains_validation_1 = require("./contains.validation");
function isPassword(value, disabled, minLength) {
    if (minLength === void 0) { minLength = 9; }
    if (!value)
        return false;
    var resultUpperCase = (disabled === null || disabled === void 0 ? void 0 : disabled.charUpperCase) || contains_validation_1.contains(value, regex_1.REGEX_UPPER_CASE, { caseSensitive: true });
    var resultMinLength = (value === null || value === void 0 ? void 0 : value.length) >= minLength;
    var resultCharSpecial = (disabled === null || disabled === void 0 ? void 0 : disabled.charSpecial) || contains_validation_1.contains(value, regex_1.REGEX_CHAR_SPECIAL);
    var resultNumber = (disabled === null || disabled === void 0 ? void 0 : disabled.number) || contains_validation_1.contains(value, regex_1.REGEX_NUMBER);
    return resultUpperCase && resultMinLength && resultCharSpecial && resultNumber;
}
exports.isPassword = isPassword;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXMtcGFzc3dvcmQudmFsaWRhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy92YWxpZGF0aW9ucy9jb21tb24vaXMtcGFzc3dvcmQudmFsaWRhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBaUY7QUFDakYsNkRBQWlEO0FBUWpELFNBQWdCLFVBQVUsQ0FDeEIsS0FBYSxFQUNiLFFBQW1DLEVBQ25DLFNBQWE7SUFBYiwwQkFBQSxFQUFBLGFBQWE7SUFFYixJQUFJLENBQUMsS0FBSztRQUFFLE9BQU8sS0FBSyxDQUFDO0lBRXpCLElBQU0sZUFBZSxHQUNuQixDQUFBLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxhQUFhLEtBQUksOEJBQVEsQ0FBQyxLQUFLLEVBQUUsd0JBQWdCLEVBQUUsRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUV4RixJQUFNLGVBQWUsR0FBRyxDQUFBLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRSxNQUFNLEtBQUksU0FBUyxDQUFDO0lBRW5ELElBQU0saUJBQWlCLEdBQUcsQ0FBQSxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsV0FBVyxLQUFJLDhCQUFRLENBQUMsS0FBSyxFQUFFLDBCQUFrQixDQUFDLENBQUM7SUFFdkYsSUFBTSxZQUFZLEdBQUcsQ0FBQSxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsTUFBTSxLQUFJLDhCQUFRLENBQUMsS0FBSyxFQUFFLG9CQUFZLENBQUMsQ0FBQztJQUV2RSxPQUFPLGVBQWUsSUFBSSxlQUFlLElBQUksaUJBQWlCLElBQUksWUFBWSxDQUFDO0FBQ2pGLENBQUM7QUFqQkQsZ0NBaUJDIn0=