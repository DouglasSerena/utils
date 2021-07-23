(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../validations"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.merge = exports.mergeObject = void 0;
    var validations_1 = require("../../validations");
    function mergeObject(objectMerge) {
        var objects = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            objects[_i - 1] = arguments[_i];
        }
        if (!validations_1.isEmpty(objects)) {
            objects.forEach(function (object) {
                if (!validations_1.isEmpty(object)) {
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVyZ2Utb2JqZWN0LmZ1bmN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2Z1bmN0aW9ucy9vYmplY3QvbWVyZ2Utb2JqZWN0LmZ1bmN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztJQUFBLGlEQUE0QztJQUU1QyxTQUFnQixXQUFXLENBQUMsV0FBbUI7UUFBRSxpQkFBb0I7YUFBcEIsVUFBb0IsRUFBcEIscUJBQW9CLEVBQXBCLElBQW9CO1lBQXBCLGdDQUFvQjs7UUFDbkUsSUFBSSxDQUFDLHFCQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDckIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFDLE1BQU07Z0JBQ3JCLElBQUksQ0FBQyxxQkFBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO29CQUNwQixLQUFLLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2lCQUM1QjtZQUNILENBQUMsQ0FBQyxDQUFDO1NBQ0o7UUFDRCxPQUFPLFdBQVcsQ0FBQztJQUNyQixDQUFDO0lBVEQsa0NBU0M7SUFFRCxTQUFnQixLQUFLLENBQUMsV0FBbUIsRUFBRSxNQUFjO1FBQ3ZELE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBQyxJQUFJLEVBQUUsR0FBRzs7WUFDMUMsSUFBSSxDQUFBLE1BQUEsTUFBTSxDQUFDLEdBQUcsQ0FBQywwQ0FBRSxXQUFXLE1BQUssTUFBTSxFQUFFO2dCQUN2QyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUNsRDtpQkFBTTtnQkFDTCxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ3pCO1lBQ0QsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDLEVBQUUsV0FBVyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFURCxzQkFTQyJ9