"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseNumber = void 0;
var common_validation_1 = require("../validations/common/common.validation");
var number_validation_1 = require("../validations/number.validation");
var _config = {
    decimal: ",",
    thousands: ".",
    error: false,
};
function parseNumber(value, config) {
    config = Object.assign({}, _config, config);
    if (!number_validation_1.isNumeric(value) && common_validation_1.isString(value)) {
        var decimalStr = new RegExp("\\" + (config === null || config === void 0 ? void 0 : config.decimal), "g");
        var thousandsStr = new RegExp("\\" + (config === null || config === void 0 ? void 0 : config.thousands), "g");
        value = value.toString().replace(thousandsStr, "").replace(decimalStr, ".");
        value = Number(value) || 0;
    }
    else {
        if (config === null || config === void 0 ? void 0 : config.error)
            new Error("Invalid Input.");
    }
    return Number(value);
}
exports.parseNumber = parseNumber;
//# sourceMappingURL=parse-number.function.js.map