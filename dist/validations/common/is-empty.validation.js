(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXMtZW1wdHkudmFsaWRhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy92YWxpZGF0aW9ucy9jb21tb24vaXMtZW1wdHkudmFsaWRhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7SUFBQSxTQUFnQixPQUFPLENBQVUsSUFBa0I7O1FBQ2pELElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDVCxPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsSUFBSSxJQUFJLFlBQVksS0FBSyxFQUFFO1lBQ3pCLE9BQU8sQ0FBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsTUFBTSxNQUFLLENBQUMsQ0FBQztTQUMzQjtRQUNELElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFFO1lBQzVCLE9BQU8sSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUM7U0FDMUI7UUFDRCxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtZQUM1QixPQUFPLElBQUksS0FBSyxDQUFDLENBQUM7U0FDbkI7UUFDRCxPQUFPLENBQUEsTUFBQSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQywwQ0FBRSxNQUFNLE1BQUssQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFkRCwwQkFjQyJ9