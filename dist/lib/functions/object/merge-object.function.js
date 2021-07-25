"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.merge = exports.mergeObject = void 0;
var validate_validation_1 = require("../../validations/validate.validation");
function mergeObject(objectMerge) {
    var objects = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        objects[_i - 1] = arguments[_i];
    }
    if (validate_validation_1.validate(objects).isFill()) {
        objects.forEach(function (object) {
            if (validate_validation_1.validate(object).isFill()) {
                merge(objectMerge, object);
            }
        });
    }
    return objectMerge;
}
exports.mergeObject = mergeObject;
function merge(objectMerge, object) {
    return Object.keys(object).reduce(function (prev, key) {
        if (validate_validation_1.validate(object[key]).isObject() && validate_validation_1.validate(object[key].name).isUndefined()) {
            prev[key] = merge(prev[key], object[key]);
        }
        else {
            prev[key] = object[key];
        }
        return prev;
    }, objectMerge || {});
}
exports.merge = merge;
//# sourceMappingURL=merge-object.function.js.map