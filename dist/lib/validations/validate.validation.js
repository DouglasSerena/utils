"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validate = exports.validate = void 0;
var functions_1 = require("../functions");
var common_1 = require("./common");
var date_validation_1 = require("./date.validation");
var file_1 = require("./file");
var number_validation_1 = require("./number.validation");
function validate(value) {
    return new Validate(value);
}
exports.validate = validate;
var Validate = /** @class */ (function () {
    function Validate(value) {
        var _this = this;
        this.value = value;
        // COMMON
        this.isFalse = function () { return common_1.isFalse(_this.value); };
        this.isTrue = function () { return common_1.isTrue(_this.value); };
        this.isEqual = function (compare) { return common_1.isEqual(_this.value, compare); };
        this.isDifferent = function (compare) { return common_1.isDifferent(_this.value, compare); };
        this.isEqualNotStrict = function (compare) { return common_1.isEqualNotStrict(_this.value, compare); };
        this.isDifferentNotStrict = function (compare) {
            return common_1.isDifferentNotStrict(_this.value, compare);
        };
        this.isFill = function () { return !common_1.isEmpty(_this.value); };
        this.isEmpty = function () { return common_1.isEmpty(_this.value); };
        this.isInstanceOf = function (instance) { return common_1.isInstanceOf(_this.value, instance); };
        this.notIsInstanceOf = function (instance) { return common_1.notIsInstanceOf(_this.value, instance); };
        this.isString = function () { return common_1.isString(_this.value); };
        this.isObject = function () { return common_1.isObject(_this.value); };
        this.isFunction = function () { return common_1.isFunction(_this.value); };
        this.isBoolean = function () { return common_1.isBoolean(_this.value); };
        this.isNull = function () { return common_1.isNull(_this.value); };
        this.isUndefined = function () { return common_1.isUndefined(_this.value); };
        this.isCnpj = function () { return common_1.isCnpj(_this.value); };
        this.isCpf = function () { return common_1.isCpf(_this.value); };
        this.isCpfOrCnpj = function () { return common_1.isCpfOrCnpj(_this.value); };
        // VALIDATION FILE
        this.isFile = function () { return file_1.isFile(_this.value); };
        this.maxHeightFile = function (max) { return __awaiter(_this, void 0, void 0, function () { var _a; return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = number_validation_1.isMoreOrEqual;
                    return [4 /*yield*/, functions_1.getSizeImage(this.value)];
                case 1: return [2 /*return*/, _a.apply(void 0, [(_b.sent()).height, max])];
            }
        }); }); };
        this.minHeightFile = function (min) { return __awaiter(_this, void 0, void 0, function () { var _a; return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = number_validation_1.isLessOrEqual;
                    return [4 /*yield*/, functions_1.getSizeImage(this.value)];
                case 1: return [2 /*return*/, _a.apply(void 0, [(_b.sent()).height, min])];
            }
        }); }); };
        this.maxWidthFile = function (max) { return __awaiter(_this, void 0, void 0, function () { var _a; return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = number_validation_1.isMoreOrEqual;
                    return [4 /*yield*/, functions_1.getSizeImage(this.value)];
                case 1: return [2 /*return*/, _a.apply(void 0, [(_b.sent()).width, max])];
            }
        }); }); };
        this.minWidthFile = function (min) { return __awaiter(_this, void 0, void 0, function () { var _a; return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = number_validation_1.isLessOrEqual;
                    return [4 /*yield*/, functions_1.getSizeImage(this.value)];
                case 1: return [2 /*return*/, _a.apply(void 0, [(_b.sent()).width, min])];
            }
        }); }); };
        this.maxSizeFile = function (max, type) {
            return file_1.maxSize(_this.value, max, type).valid;
        };
        this.minSizeFile = function (min, type) {
            return file_1.minSize(_this.value, min, type).valid;
        };
        this.isAllowExtensionsFile = function (extensions) {
            return file_1.isAllowExtensions(_this.value, extensions).valid;
        };
        // VALIDATIONS NUMBER
        this.isNumeric = function () { return number_validation_1.isNumeric(_this.value); };
        this.isNumber = function () { return number_validation_1.isNumber(_this.value); };
        this.isFloat = function () { return number_validation_1.isFloat(_this.value); };
        this.isEqualNumber = function (compare) { return number_validation_1.isEqualNumber(_this.value, compare); };
        this.isDifferentNumber = function (compare) { return number_validation_1.isDifferentNumber(_this.value, compare); };
        this.isBeforeNumber = function (range) { return number_validation_1.isBeforeNumber(_this.value, range); };
        this.isLessOrEqual = function (value) { return number_validation_1.isLessOrEqual(_this.value, value); };
        this.isLess = function (value) { return number_validation_1.isLess(_this.value, value); };
        this.isMore = function (value) { return number_validation_1.isMore(_this.value, value); };
        this.isMoreOrEqual = function (value) { return number_validation_1.isMoreOrEqual(_this.value, value); };
        // VALIDATION DATE
        this.isDate = function () { return date_validation_1.isDate(_this.value); };
        this.isAfterDate = function (date, options) {
            return date_validation_1.isAfterDate(_this.value, date, options);
        };
        this.isBeforeDate = function (date, options) {
            return date_validation_1.isBeforeDate(_this.value, date, options);
        };
        this.isBetweenDate = function (range, options, d) { return date_validation_1.isBetweenDate(_this.value, range, options, d); };
        this.isBirthDateValidation = function (year) {
            return date_validation_1.isBirthDateValidation(_this.value, year);
        };
        this.isEqualDate = function (date, options) {
            return date_validation_1.isEqualDate(_this.value, date, options);
        };
        this.isDifferentDate = function (date, options) {
            return date_validation_1.isDifferentDate(_this.value, date, options);
        };
    }
    return Validate;
}());
exports.Validate = Validate;
//# sourceMappingURL=validate.validation.js.map