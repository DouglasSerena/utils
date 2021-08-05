"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCpfOrCnpj = exports.isUndefined = exports.isNull = exports.isBoolean = exports.isFunction = exports.isArray = exports.isObject = exports.isString = exports.isTrue = exports.isFalse = exports.notIsInstanceof = exports.isInstanceof = exports.isTypeof = exports.isFill = exports.isDifferentNotStrict = exports.isEqualNotStrict = exports.isDifferent = exports.isEqual = exports.noContains = void 0;
var contains_validation_1 = require("./contains.validation");
var is_cnpj_validation_1 = require("./is-cnpj.validation");
var is_cpf_validation_1 = require("./is-cpf.validation");
var is_empty_validation_1 = require("./is-empty.validation");
var noContains = function (value, compare, options) { return !contains_validation_1.contains(value, compare, options); };
exports.noContains = noContains;
var isEqual = function (value, compare) { return value === compare; };
exports.isEqual = isEqual;
var isDifferent = function (value, compare) { return value !== compare; };
exports.isDifferent = isDifferent;
var isEqualNotStrict = function (value, compare) { return value == compare; };
exports.isEqualNotStrict = isEqualNotStrict;
var isDifferentNotStrict = function (value, compare) { return value != compare; };
exports.isDifferentNotStrict = isDifferentNotStrict;
var isFill = function (item) { return !is_empty_validation_1.isEmpty(item); };
exports.isFill = isFill;
var isTypeof = function (value, type) {
    return typeof value === type;
};
exports.isTypeof = isTypeof;
var isInstanceof = function (value, instance) {
    return value instanceof instance;
};
exports.isInstanceof = isInstanceof;
var notIsInstanceof = function (value, instance) {
    return !exports.isInstanceof(value, instance);
};
exports.notIsInstanceof = notIsInstanceof;
var isFalse = function (value) { return !value; };
exports.isFalse = isFalse;
var isTrue = function (value) { return !!value; };
exports.isTrue = isTrue;
var isString = function (value) {
    return exports.isTypeof(value, "string") || exports.isInstanceof(value, String);
};
exports.isString = isString;
var isObject = function (value) {
    return exports.isTypeof(value, "object") || exports.isInstanceof(value, Object);
};
exports.isObject = isObject;
var isArray = function (value) {
    return exports.isTypeof(value, "object") && exports.isInstanceof(value, Array);
};
exports.isArray = isArray;
var isFunction = function (value) {
    return exports.isTypeof(value, "function") || exports.isInstanceof(value, Function);
};
exports.isFunction = isFunction;
var isBoolean = function (value) {
    return exports.isTypeof(value, "boolean") || exports.isInstanceof(value, Boolean);
};
exports.isBoolean = isBoolean;
var isNull = function (value) { return value === null; };
exports.isNull = isNull;
var isUndefined = function (value) {
    return exports.isTypeof(value, "undefined") || value === undefined;
};
exports.isUndefined = isUndefined;
var isCpfOrCnpj = function (value) {
    value = value.replace(/\D/g, "");
    return value.length <= 11 ? is_cpf_validation_1.isCpf(value) : is_cnpj_validation_1.isCnpj(value);
};
exports.isCpfOrCnpj = isCpfOrCnpj;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLnZhbGlkYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdmFsaWRhdGlvbnMvY29tbW9uL2NvbW1vbi52YWxpZGF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZEQUFrRTtBQUNsRSwyREFBOEM7QUFDOUMseURBQTRDO0FBQzVDLDZEQUFnRDtBQVl6QyxJQUFNLFVBQVUsR0FBRyxVQUN4QixLQUFRLEVBQ1IsT0FBd0IsRUFDeEIsT0FBeUIsSUFDYixPQUFBLENBQUMsOEJBQVEsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxFQUFsQyxDQUFrQyxDQUFDO0FBSnBDLFFBQUEsVUFBVSxjQUkwQjtBQUUxQyxJQUFNLE9BQU8sR0FBRyxVQUFDLEtBQWMsRUFBRSxPQUFnQixJQUFjLE9BQUEsS0FBSyxLQUFLLE9BQU8sRUFBakIsQ0FBaUIsQ0FBQztBQUEzRSxRQUFBLE9BQU8sV0FBb0U7QUFDakYsSUFBTSxXQUFXLEdBQUcsVUFBQyxLQUFjLEVBQUUsT0FBZ0IsSUFBYyxPQUFBLEtBQUssS0FBSyxPQUFPLEVBQWpCLENBQWlCLENBQUM7QUFBL0UsUUFBQSxXQUFXLGVBQW9FO0FBRXJGLElBQU0sZ0JBQWdCLEdBQUcsVUFBQyxLQUFjLEVBQUUsT0FBZ0IsSUFBYyxPQUFBLEtBQUssSUFBSSxPQUFPLEVBQWhCLENBQWdCLENBQUM7QUFBbkYsUUFBQSxnQkFBZ0Isb0JBQW1FO0FBRXpGLElBQU0sb0JBQW9CLEdBQUcsVUFBQyxLQUFjLEVBQUUsT0FBZ0IsSUFBYyxPQUFBLEtBQUssSUFBSSxPQUFPLEVBQWhCLENBQWdCLENBQUM7QUFBdkYsUUFBQSxvQkFBb0Isd0JBQW1FO0FBRTdGLElBQU0sTUFBTSxHQUFHLFVBQWMsSUFBa0IsSUFBYyxPQUFBLENBQUMsNkJBQU8sQ0FBSSxJQUFJLENBQUMsRUFBakIsQ0FBaUIsQ0FBQztBQUF6RSxRQUFBLE1BQU0sVUFBbUU7QUFF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