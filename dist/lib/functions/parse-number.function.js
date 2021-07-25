"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseNumber = exports.parseNumberOptions = void 0;
var common_validation_1 = require("../validations/common/common.validation");
var number_validation_1 = require("../validations/number.validation");
exports.parseNumberOptions = {
    decimal: ",",
    thousands: ".",
    error: false,
};
function parseNumber(value, options) {
    options = Object.assign({}, exports.parseNumberOptions, options);
    if (!number_validation_1.isNumeric(value) && common_validation_1.isString(value)) {
        var decimalStr = new RegExp("\\" + (options === null || options === void 0 ? void 0 : options.decimal), "g");
        var thousandsStr = new RegExp("\\" + (options === null || options === void 0 ? void 0 : options.thousands), "g");
        value = value.toString().replace(thousandsStr, "").replace(decimalStr, ".");
        value = Number(value) || 0;
    }
    else {
        if (options === null || options === void 0 ? void 0 : options.error)
            new Error("Invalid Input.");
    }
    return Number(value);
}
exports.parseNumber = parseNumber;
//# sourceMappingURL=parse-number.function.js.map