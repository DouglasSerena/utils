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
var get_size_image_function_1 = require("../functions/file/get-size-image.function");
var common_validation_1 = require("./common/common.validation");
var contains_validation_1 = require("./common/contains.validation");
var is_cnpj_validation_1 = require("./common/is-cnpj.validation");
var is_cpf_validation_1 = require("./common/is-cpf.validation");
var is_empty_validation_1 = require("./common/is-empty.validation");
var is_password_validation_1 = require("./common/is-password.validation");
var test_pattern_validation_1 = require("./common/test-pattern.validation");
var date_validation_1 = require("./date.validation");
var file_validation_1 = require("./file/file.validation");
var is_allow_extension_validation_1 = require("./file/is-allow-extension.validation");
var max_size_validation_1 = require("./file/max-size.validation");
var min_size_validation_1 = require("./file/min-size.validation");
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
        this.contains = function (pattern, options) {
            return contains_validation_1.contains(_this.value, pattern, options);
        };
        this.noContains = function (pattern, options) {
            return common_validation_1.noContains(_this.value, pattern, options);
        };
        this.testPattern = function (pattern) { return test_pattern_validation_1.testPattern(_this.value, pattern); };
        this.isPassword = function (disabled, minLength) {
            return is_password_validation_1.isPassword(_this.value, disabled, minLength);
        };
        this.isTypeof = function (type) { return common_validation_1.isTypeof(_this.value, type); };
        this.isFalse = function () { return common_validation_1.isFalse(_this.value); };
        this.isTrue = function () { return common_validation_1.isTrue(_this.value); };
        this.isEqual = function (compare) { return common_validation_1.isEqual(_this.value, compare); };
        this.isDifferent = function (compare) { return common_validation_1.isDifferent(_this.value, compare); };
        this.isEqualNotStrict = function (compare) { return common_validation_1.isEqualNotStrict(_this.value, compare); };
        this.isDifferentNotStrict = function (compare) {
            return common_validation_1.isDifferentNotStrict(_this.value, compare);
        };
        this.isFill = function () { return common_validation_1.isFill(_this.value); };
        this.isEmpty = function () { return is_empty_validation_1.isEmpty(_this.value); };
        this.isInstanceof = function (instance) { return common_validation_1.isInstanceof(_this.value, instance); };
        this.notIsInstanceOf = function (instance) { return common_validation_1.notIsInstanceof(_this.value, instance); };
        this.isString = function () { return common_validation_1.isString(_this.value); };
        this.isArray = function () { return common_validation_1.isArray(_this.value); };
        this.isObject = function () { return common_validation_1.isObject(_this.value); };
        this.isFunction = function () { return common_validation_1.isFunction(_this.value); };
        this.isBoolean = function () { return common_validation_1.isBoolean(_this.value); };
        this.isNull = function () { return common_validation_1.isNull(_this.value); };
        this.isUndefined = function () { return common_validation_1.isUndefined(_this.value); };
        this.isCnpj = function () { return is_cnpj_validation_1.isCnpj(_this.value); };
        this.isCpf = function () { return is_cpf_validation_1.isCpf(_this.value); };
        this.isCpfOrCnpj = function () { return common_validation_1.isCpfOrCnpj(_this.value); };
        // VALIDATION FILE
        this.isFile = function () { return file_validation_1.isFile(_this.value); };
        this.maxHeightFile = function (max) { return __awaiter(_this, void 0, void 0, function () { var _a; return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = number_validation_1.isMoreOrEqual;
                    return [4 /*yield*/, get_size_image_function_1.getSizeImage(this.value)];
                case 1: return [2 /*return*/, _a.apply(void 0, [(_b.sent()).height, max])];
            }
        }); }); };
        this.minHeightFile = function (min) { return __awaiter(_this, void 0, void 0, function () { var _a; return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = number_validation_1.isLessOrEqual;
                    return [4 /*yield*/, get_size_image_function_1.getSizeImage(this.value)];
                case 1: return [2 /*return*/, _a.apply(void 0, [(_b.sent()).height, min])];
            }
        }); }); };
        this.maxWidthFile = function (max) { return __awaiter(_this, void 0, void 0, function () { var _a; return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = number_validation_1.isMoreOrEqual;
                    return [4 /*yield*/, get_size_image_function_1.getSizeImage(this.value)];
                case 1: return [2 /*return*/, _a.apply(void 0, [(_b.sent()).width, max])];
            }
        }); }); };
        this.minWidthFile = function (min) { return __awaiter(_this, void 0, void 0, function () { var _a; return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = number_validation_1.isLessOrEqual;
                    return [4 /*yield*/, get_size_image_function_1.getSizeImage(this.value)];
                case 1: return [2 /*return*/, _a.apply(void 0, [(_b.sent()).width, min])];
            }
        }); }); };
        this.maxSizeFile = function (max, type) {
            return max_size_validation_1.maxSize(_this.value, max, type).valid;
        };
        this.minSizeFile = function (min, type) {
            return min_size_validation_1.minSize(_this.value, min, type).valid;
        };
        this.isAllowExtensionsFile = function (extensions) {
            return is_allow_extension_validation_1.isAllowExtensions(_this.value, extensions).valid;
        };
        // VALIDATIONS NUMBER
        this.isNaN = function () { return isNaN(parseInt(_this.value)); };
        this.isNegative = function () { return number_validation_1.isNegative(_this.value); };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGUudmFsaWRhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy92YWxpZGF0aW9ucy92YWxpZGF0ZS52YWxpZGF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHFGQUF5RTtBQUN6RSxnRUFxQm9DO0FBQ3BDLG9FQUF5RTtBQUN6RSxrRUFBcUQ7QUFDckQsZ0VBQW1EO0FBQ25ELG9FQUF1RDtBQUN2RCwwRUFBdUY7QUFDdkYsNEVBQStEO0FBQy9ELHFEQVcyQjtBQUMzQiwwREFBOEQ7QUFDOUQsc0ZBQXlFO0FBQ3pFLGtFQUFxRDtBQUNyRCxrRUFBcUQ7QUFDckQseURBYTZCO0FBRTdCLFNBQWdCLFFBQVEsQ0FBQyxLQUFVO0lBQ2pDLE9BQU8sSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDN0IsQ0FBQztBQUZELDRCQUVDO0FBRUQ7SUFDRSxrQkFBbUIsS0FBVTtRQUE3QixpQkFBaUM7UUFBZCxVQUFLLEdBQUwsS0FBSyxDQUFLO1FBRTdCLFNBQVM7UUFDRixhQUFRLEdBQUcsVUFBQyxPQUF3QixFQUFFLE9BQXlCO1lBQ3BFLE9BQUEsOEJBQVEsQ0FBQyxLQUFJLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUM7UUFBdEMsQ0FBc0MsQ0FBQztRQUNsQyxlQUFVLEdBQUcsVUFBQyxPQUF3QixFQUFFLE9BQXlCO1lBQ3RFLE9BQUEsOEJBQVUsQ0FBQyxLQUFJLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUM7UUFBeEMsQ0FBd0MsQ0FBQztRQUVwQyxnQkFBVyxHQUFHLFVBQUMsT0FBd0IsSUFBYyxPQUFBLHFDQUFXLENBQUMsS0FBSSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsRUFBaEMsQ0FBZ0MsQ0FBQztRQUN0RixlQUFVLEdBQUcsVUFBQyxRQUFtQyxFQUFFLFNBQWtCO1lBQzFFLE9BQUEsbUNBQVUsQ0FBQyxLQUFJLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUM7UUFBM0MsQ0FBMkMsQ0FBQztRQUV2QyxhQUFRLEdBQUcsVUFBQyxJQUFZLElBQWMsT0FBQSw0QkFBUSxDQUFDLEtBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEVBQTFCLENBQTBCLENBQUM7UUFDakUsWUFBTyxHQUFHLGNBQWUsT0FBQSwyQkFBTyxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsRUFBbkIsQ0FBbUIsQ0FBQztRQUM3QyxXQUFNLEdBQUcsY0FBZSxPQUFBLDBCQUFNLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxFQUFsQixDQUFrQixDQUFDO1FBQzNDLFlBQU8sR0FBRyxVQUFDLE9BQWdCLElBQWMsT0FBQSwyQkFBTyxDQUFDLEtBQUksQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLEVBQTVCLENBQTRCLENBQUM7UUFDdEUsZ0JBQVcsR0FBRyxVQUFDLE9BQWdCLElBQWMsT0FBQSwrQkFBVyxDQUFDLEtBQUksQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLEVBQWhDLENBQWdDLENBQUM7UUFDOUUscUJBQWdCLEdBQUcsVUFBQyxPQUFnQixJQUFjLE9BQUEsb0NBQWdCLENBQUMsS0FBSSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsRUFBckMsQ0FBcUMsQ0FBQztRQUN4Rix5QkFBb0IsR0FBRyxVQUFDLE9BQWdCO1lBQzdDLE9BQUEsd0NBQW9CLENBQUMsS0FBSSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUM7UUFBekMsQ0FBeUMsQ0FBQztRQUNyQyxXQUFNLEdBQUcsY0FBNEIsT0FBQSwwQkFBTSxDQUFJLEtBQUksQ0FBQyxLQUFLLENBQUMsRUFBckIsQ0FBcUIsQ0FBQztRQUMzRCxZQUFPLEdBQUcsY0FBNEIsT0FBQSw2QkFBTyxDQUFJLEtBQUksQ0FBQyxLQUFLLENBQUMsRUFBdEIsQ0FBc0IsQ0FBQztRQUM3RCxpQkFBWSxHQUFHLFVBQUMsUUFBaUIsSUFBYyxPQUFBLGdDQUFZLENBQUMsS0FBSSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsRUFBbEMsQ0FBa0MsQ0FBQztRQUNsRixvQkFBZSxHQUFHLFVBQUMsUUFBaUIsSUFBYyxPQUFBLG1DQUFlLENBQUMsS0FBSSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsRUFBckMsQ0FBcUMsQ0FBQztRQUN4RixhQUFRLEdBQUcsY0FBZSxPQUFBLDRCQUFRLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxFQUFwQixDQUFvQixDQUFDO1FBQy9DLFlBQU8sR0FBRyxjQUFlLE9BQUEsMkJBQU8sQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLEVBQW5CLENBQW1CLENBQUM7UUFDN0MsYUFBUSxHQUFHLGNBQWUsT0FBQSw0QkFBUSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsRUFBcEIsQ0FBb0IsQ0FBQztRQUMvQyxlQUFVLEdBQUcsY0FBZSxPQUFBLDhCQUFVLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxFQUF0QixDQUFzQixDQUFDO1FBQ25ELGNBQVMsR0FBRyxjQUFlLE9BQUEsNkJBQVMsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLEVBQXJCLENBQXFCLENBQUM7UUFDakQsV0FBTSxHQUFHLGNBQWUsT0FBQSwwQkFBTSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsRUFBbEIsQ0FBa0IsQ0FBQztRQUMzQyxnQkFBVyxHQUFHLGNBQWUsT0FBQSwrQkFBVyxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsRUFBdkIsQ0FBdUIsQ0FBQztRQUNyRCxXQUFNLEdBQUcsY0FBZSxPQUFBLDJCQUFNLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxFQUFsQixDQUFrQixDQUFDO1FBQzNDLFVBQUssR0FBRyxjQUFlLE9BQUEseUJBQUssQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLEVBQWpCLENBQWlCLENBQUM7UUFDekMsZ0JBQVcsR0FBRyxjQUFlLE9BQUEsK0JBQVcsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLEVBQXZCLENBQXVCLENBQUM7UUFFNUQsa0JBQWtCO1FBQ1gsV0FBTSxHQUFHLGNBQWUsT0FBQSx3QkFBTSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsRUFBbEIsQ0FBa0IsQ0FBQztRQUUzQyxrQkFBYSxHQUFHLFVBQU8sR0FBVzs7O29CQUN2QyxLQUFBLGlDQUFhLENBQUE7b0JBQUUscUJBQU0sc0NBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUE7d0JBQTdDLHNCQUFBLGtCQUFjLENBQUMsU0FBOEIsQ0FBQyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUMsRUFBQTs7aUJBQUEsQ0FBQztRQUV2RCxrQkFBYSxHQUFHLFVBQU8sR0FBVzs7O29CQUN2QyxLQUFBLGlDQUFhLENBQUE7b0JBQUUscUJBQU0sc0NBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUE7d0JBQTdDLHNCQUFBLGtCQUFjLENBQUMsU0FBOEIsQ0FBQyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUMsRUFBQTs7aUJBQUEsQ0FBQztRQUV2RCxpQkFBWSxHQUFHLFVBQU8sR0FBVzs7O29CQUN0QyxLQUFBLGlDQUFhLENBQUE7b0JBQUUscUJBQU0sc0NBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUE7d0JBQTdDLHNCQUFBLGtCQUFjLENBQUMsU0FBOEIsQ0FBQyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUMsRUFBQTs7aUJBQUEsQ0FBQztRQUV0RCxpQkFBWSxHQUFHLFVBQU8sR0FBVzs7O29CQUN0QyxLQUFBLGlDQUFhLENBQUE7b0JBQUUscUJBQU0sc0NBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUE7d0JBQTdDLHNCQUFBLGtCQUFjLENBQUMsU0FBOEIsQ0FBQyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUMsRUFBQTs7aUJBQUEsQ0FBQztRQUV0RCxnQkFBVyxHQUFHLFVBQUMsR0FBVyxFQUFFLElBQW1CO1lBQ3BELE9BQUEsNkJBQU8sQ0FBQyxLQUFJLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxLQUFLO1FBQXBDLENBQW9DLENBQUM7UUFFaEMsZ0JBQVcsR0FBRyxVQUFDLEdBQVcsRUFBRSxJQUFtQjtZQUNwRCxPQUFBLDZCQUFPLENBQUMsS0FBSSxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsS0FBSztRQUFwQyxDQUFvQyxDQUFDO1FBRWhDLDBCQUFxQixHQUFHLFVBQUMsVUFBb0I7WUFDbEQsT0FBQSxpREFBaUIsQ0FBQyxLQUFJLENBQUMsS0FBSyxFQUFFLFVBQVUsQ0FBQyxDQUFDLEtBQUs7UUFBL0MsQ0FBK0MsQ0FBQztRQUVsRCxxQkFBcUI7UUFDZCxVQUFLLEdBQUcsY0FBZSxPQUFBLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQTNCLENBQTJCLENBQUM7UUFDbkQsZUFBVSxHQUFHLGNBQWUsT0FBQSw4QkFBVSxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsRUFBdEIsQ0FBc0IsQ0FBQztRQUNuRCxjQUFTLEdBQUcsY0FBZSxPQUFBLDZCQUFTLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxFQUFyQixDQUFxQixDQUFDO1FBQ2pELGFBQVEsR0FBRyxjQUFlLE9BQUEsNEJBQVEsQ0FBQyxLQUFJLENBQUMsS0FBSyxDQUFDLEVBQXBCLENBQW9CLENBQUM7UUFDL0MsWUFBTyxHQUFHLGNBQWUsT0FBQSwyQkFBTyxDQUFDLEtBQUksQ0FBQyxLQUFLLENBQUMsRUFBbkIsQ0FBbUIsQ0FBQztRQUM3QyxrQkFBYSxHQUFHLFVBQUMsT0FBZSxJQUFjLE9BQUEsaUNBQWEsQ0FBQyxLQUFJLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxFQUFsQyxDQUFrQyxDQUFDO1FBQ2pGLHNCQUFpQixHQUFHLFVBQUMsT0FBZSxJQUFjLE9BQUEscUNBQWlCLENBQUMsS0FBSSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsRUFBdEMsQ0FBc0MsQ0FBQztRQUN6RixtQkFBYyxHQUFHLFVBQUMsS0FBa0IsSUFBYyxPQUFBLGtDQUFjLENBQUMsS0FBSSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsRUFBakMsQ0FBaUMsQ0FBQztRQUNwRixrQkFBYSxHQUFHLFVBQUMsS0FBYSxJQUFjLE9BQUEsaUNBQWEsQ0FBQyxLQUFJLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxFQUFoQyxDQUFnQyxDQUFDO1FBQzdFLFdBQU0sR0FBRyxVQUFDLEtBQWEsSUFBYyxPQUFBLDBCQUFNLENBQUMsS0FBSSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsRUFBekIsQ0FBeUIsQ0FBQztRQUMvRCxXQUFNLEdBQUcsVUFBQyxLQUFhLElBQWMsT0FBQSwwQkFBTSxDQUFDLEtBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEVBQXpCLENBQXlCLENBQUM7UUFDL0Qsa0JBQWEsR0FBRyxVQUFDLEtBQWEsSUFBYyxPQUFBLGlDQUFhLENBQUMsS0FBSSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsRUFBaEMsQ0FBZ0MsQ0FBQztRQUVwRixrQkFBa0I7UUFDWCxXQUFNLEdBQUcsY0FBZSxPQUFBLHdCQUFNLENBQUMsS0FBSSxDQUFDLEtBQUssQ0FBQyxFQUFsQixDQUFrQixDQUFDO1FBQzNDLGdCQUFXLEdBQUcsVUFBQyxJQUFhLEVBQUUsT0FBb0I7WUFDdkQsT0FBQSw2QkFBVyxDQUFDLEtBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQztRQUF0QyxDQUFzQyxDQUFDO1FBRWxDLGlCQUFZLEdBQUcsVUFBQyxJQUFhLEVBQUUsT0FBb0I7WUFDeEQsT0FBQSw4QkFBWSxDQUFDLEtBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQztRQUF2QyxDQUF1QyxDQUFDO1FBRW5DLGtCQUFhLEdBQUcsVUFDckIsS0FBZ0IsRUFDaEIsT0FBb0IsRUFDcEIsQ0FBNkIsSUFDakIsT0FBQSwrQkFBYSxDQUFDLEtBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBNUMsQ0FBNEMsQ0FBQztRQUVwRCwwQkFBcUIsR0FBRyxVQUFDLElBQWE7WUFDM0MsT0FBQSx1Q0FBcUIsQ0FBQyxLQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQztRQUF2QyxDQUF1QyxDQUFDO1FBRW5DLGdCQUFXLEdBQUcsVUFBQyxJQUFhLEVBQUUsT0FBb0I7WUFDdkQsT0FBQSw2QkFBVyxDQUFDLEtBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQztRQUF0QyxDQUFzQyxDQUFDO1FBRWxDLG9CQUFlLEdBQUcsVUFBQyxJQUFhLEVBQUUsT0FBb0I7WUFDM0QsT0FBQSxpQ0FBZSxDQUFDLEtBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQztRQUExQyxDQUEwQyxDQUFDO0lBOUZiLENBQUM7SUErRm5DLGVBQUM7QUFBRCxDQUFDLEFBaEdELElBZ0dDO0FBaEdZLDRCQUFRIn0=