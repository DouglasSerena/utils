"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.merge = exports.mergeObject = void 0;
var is_empty_validation_1 = require("../../validations/common/is-empty.validation");
function mergeObject(objectMerge) {
    var objects = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        objects[_i - 1] = arguments[_i];
    }
    if (!is_empty_validation_1.isEmpty(objects)) {
        objects.forEach(function (object) {
            if (!is_empty_validation_1.isEmpty(object)) {
                merge(objectMerge, object);
            }
        });
    }
    return objectMerge;
}
exports.mergeObject = mergeObject;
function merge(objectMerge, object) {
    return Object.keys(object).reduce(function (prev, key) {
        var _a;
        if (((_a = object[key]) === null || _a === void 0 ? void 0 : _a.constructor) === Object) {
            prev[key] = merge(objectMerge[key], object[key]);
        }
        else {
            prev[key] = object[key];
        }
        return prev;
    }, objectMerge || {});
}
exports.merge = merge;
//# sourceMappingURL=merge-object.function.js.map