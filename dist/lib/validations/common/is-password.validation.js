"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPassword = void 0;
var contains_function_1 = require("../../functions/contains.function");
var regex_1 = require("../../regex");
function isPassword(value, disabled, minLength) {
    if (minLength === void 0) { minLength = 9; }
    var resultUpperCase = (disabled === null || disabled === void 0 ? void 0 : disabled.charUpperCase) || contains_function_1.contains(value, regex_1.REGEX_UPPER_CASE, { caseSensitive: true });
    var resultMinLength = (value === null || value === void 0 ? void 0 : value.length) >= minLength;
    var resultCharSpecial = (disabled === null || disabled === void 0 ? void 0 : disabled.charSpecial) || contains_function_1.contains(value, regex_1.REGEX_CHAR_SPECIAL);
    var resultNumber = (disabled === null || disabled === void 0 ? void 0 : disabled.number) || contains_function_1.contains(value, regex_1.REGEX_NUMBER);
    return resultUpperCase && resultMinLength && resultCharSpecial && resultNumber;
}
exports.isPassword = isPassword;
//# sourceMappingURL=is-password.validation.js.map