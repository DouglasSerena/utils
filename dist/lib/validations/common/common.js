"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDifferentNotStrict = exports.isEqualNotStrict = exports.isDifferent = exports.isEqual = exports.isNull = exports.isCpfOrCnpj = exports.isCpf = exports.isCnpj = exports.isUndefined = exports.isString = exports.notIsInstance = exports.isInstance = exports.isFill = exports.isEmpty = void 0;
var is_cnpj_validation_1 = require("./is-cnpj.validation");
Object.defineProperty(exports, "isCnpj", { enumerable: true, get: function () { return is_cnpj_validation_1.isCnpj; } });
var is_cpf_validation_1 = require("./is-cpf.validation");
Object.defineProperty(exports, "isCpf", { enumerable: true, get: function () { return is_cpf_validation_1.isCpf; } });
var is_empty_validation_1 = require("./is-empty.validation");
Object.defineProperty(exports, "isEmpty", { enumerable: true, get: function () { return is_empty_validation_1.isEmpty; } });
var isEqual = function (value, verify) { return value === verify; };
exports.isEqual = isEqual;
var isDifferent = function (value, verify) { return value !== verify; };
exports.isDifferent = isDifferent;
var isEqualNotStrict = function (value, verify) { return value == verify; };
exports.isEqualNotStrict = isEqualNotStrict;
var isDifferentNotStrict = function (value, verify) { return value != verify; };
exports.isDifferentNotStrict = isDifferentNotStrict;
var isFill = function (item) { return !is_empty_validation_1.isEmpty(item); };
exports.isFill = isFill;
var isInstance = function (value, instance) { return value instanceof instance; };
exports.isInstance = isInstance;
var notIsInstance = function (value, instance) { return !isInstance(value, instance); };
exports.notIsInstance = notIsInstance;
var isString = function (value) { return typeof value === "string"; };
exports.isString = isString;
var isNull = function (value) { return value === null; };
exports.isNull = isNull;
var isUndefined = function (value) { return typeof value === "undefined"; };
exports.isUndefined = isUndefined;
var isCpfOrCnpj = function (value) {
    value = value.replace(/\D/g, "");
    return value.length <= 11 ? is_cpf_validation_1.isCpf(value) : is_cnpj_validation_1.isCnpj(value);
};
exports.isCpfOrCnpj = isCpfOrCnpj;
__exportStar(require("./is-rg-sp.validation"), exports);
__exportStar(require("./is-password.validation"), exports);
//# sourceMappingURL=common.js.map