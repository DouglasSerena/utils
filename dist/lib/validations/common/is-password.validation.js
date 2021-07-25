"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPassword = void 0;
var regex_1 = require("../../regex");
var contains_validation_1 = require("./contains.validation");
function isPassword(value, disabled, minLength) {
    if (minLength === void 0) { minLength = 9; }
    var resultUpperCase = (disabled === null || disabled === void 0 ? void 0 : disabled.charUpperCase) || contains_validation_1.contains(value, regex_1.REGEX_UPPER_CASE, { caseSensitive: true });
    var resultMinLength = (value === null || value === void 0 ? void 0 : value.length) >= minLength;
    var resultCharSpecial = (disabled === null || disabled === void 0 ? void 0 : disabled.charSpecial) || contains_validation_1.contains(value, regex_1.REGEX_CHAR_SPECIAL);
    var resultNumber = (disabled === null || disabled === void 0 ? void 0 : disabled.number) || contains_validation_1.contains(value, regex_1.REGEX_NUMBER);
    return resultUpperCase && resultMinLength && resultCharSpecial && resultNumber;
}
exports.isPassword = isPassword;
//# sourceMappingURL=is-password.validation.js.map