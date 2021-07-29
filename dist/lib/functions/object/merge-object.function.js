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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVyZ2Utb2JqZWN0LmZ1bmN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Z1bmN0aW9ucy9vYmplY3QvbWVyZ2Utb2JqZWN0LmZ1bmN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZFQUFpRTtBQUVqRSxTQUFnQixXQUFXLENBQWMsV0FBb0I7SUFBRSxpQkFBcUI7U0FBckIsVUFBcUIsRUFBckIscUJBQXFCLEVBQXJCLElBQXFCO1FBQXJCLGdDQUFxQjs7SUFDbEYsSUFBSSw4QkFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1FBQzlCLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQyxNQUFNO1lBQ3JCLElBQUksOEJBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtnQkFDN0IsS0FBSyxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQzthQUM1QjtRQUNILENBQUMsQ0FBQyxDQUFDO0tBQ0o7SUFDRCxPQUFPLFdBQWdCLENBQUM7QUFDMUIsQ0FBQztBQVRELGtDQVNDO0FBRUQsU0FBZ0IsS0FBSyxDQUFDLFdBQW9CLEVBQUUsTUFBZTtJQUN6RCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQUMsSUFBSSxFQUFFLEdBQUc7UUFDMUMsSUFBSSw4QkFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxJQUFJLDhCQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFO1lBQ2hGLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQzNDO2FBQU07WUFDTCxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3pCO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDLEVBQUUsV0FBVyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBQ3hCLENBQUM7QUFURCxzQkFTQyJ9