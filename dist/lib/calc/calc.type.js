"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcOptions = void 0;
var parse_number_function_1 = require("../functions/parse-number.function");
exports.calcOptions = __assign(__assign({}, parse_number_function_1.parseNumberOptions), { precision: 2, increment: 0, round: "round" });
//# sourceMappingURL=calc.type.js.map