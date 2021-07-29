"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmpty = void 0;
function isEmpty(item) {
    var _a;
    if (!item) {
        return true;
    }
    if (item instanceof Array) {
        return (item === null || item === void 0 ? void 0 : item.length) === 0;
    }
    if (typeof item === "string") {
        return item.length === 0;
    }
    if (typeof item === "number") {
        return item === 0;
    }
    return ((_a = Object.keys(item)) === null || _a === void 0 ? void 0 : _a.length) === 0;
}
exports.isEmpty = isEmpty;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXMtZW1wdHkudmFsaWRhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy92YWxpZGF0aW9ucy9jb21tb24vaXMtZW1wdHkudmFsaWRhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxTQUFnQixPQUFPLENBQWMsSUFBa0I7O0lBQ3JELElBQUksQ0FBQyxJQUFJLEVBQUU7UUFDVCxPQUFPLElBQUksQ0FBQztLQUNiO0lBQ0QsSUFBSSxJQUFJLFlBQVksS0FBSyxFQUFFO1FBQ3pCLE9BQU8sQ0FBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsTUFBTSxNQUFLLENBQUMsQ0FBQztLQUMzQjtJQUNELElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFFO1FBQzVCLE9BQU8sSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUM7S0FDMUI7SUFDRCxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtRQUM1QixPQUFPLElBQUksS0FBSyxDQUFDLENBQUM7S0FDbkI7SUFDRCxPQUFPLENBQUEsTUFBQSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQywwQ0FBRSxNQUFNLE1BQUssQ0FBQyxDQUFDO0FBQ3pDLENBQUM7QUFkRCwwQkFjQyJ9