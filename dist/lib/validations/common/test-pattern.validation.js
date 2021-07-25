"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testPattern = void 0;
var common_validation_1 = require("./common.validation");
function testPattern(value, pattern) {
    if (!value)
        return false;
    if (common_validation_1.isString(pattern)) {
        pattern = new RegExp(pattern);
    }
    return pattern.test(value);
}
exports.testPattern = testPattern;
//# sourceMappingURL=test-pattern.validation.js.map