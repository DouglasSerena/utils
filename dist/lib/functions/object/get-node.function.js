"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNode = void 0;
function getNode(object, keys) {
    if (typeof keys === "string") {
        keys = keys === null || keys === void 0 ? void 0 : keys.split(".");
    }
    keys = keys === null || keys === void 0 ? void 0 : keys.filter(function (key) { return key; });
    if ((keys === null || keys === void 0 ? void 0 : keys.length) === 0) {
        return object;
    }
    var key = keys[0];
    keys === null || keys === void 0 ? void 0 : keys.shift();
    if ((keys === null || keys === void 0 ? void 0 : keys.length) === 0) {
        return object === null || object === void 0 ? void 0 : object[key];
    }
    else {
        return getNode(object === null || object === void 0 ? void 0 : object[key], keys);
    }
}
exports.getNode = getNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LW5vZGUuZnVuY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZnVuY3Rpb25zL29iamVjdC9nZXQtbm9kZS5mdW5jdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxTQUFnQixPQUFPLENBQWMsTUFBZSxFQUFFLElBQXVCO0lBQzNFLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFFO1FBQzVCLElBQUksR0FBRyxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ3pCO0lBQ0QsSUFBSSxHQUFHLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxNQUFNLENBQUMsVUFBQyxHQUFHLElBQUssT0FBQSxHQUFHLEVBQUgsQ0FBRyxDQUFDLENBQUM7SUFFbEMsSUFBSSxDQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxNQUFNLE1BQUssQ0FBQyxFQUFFO1FBQ3RCLE9BQU8sTUFBVyxDQUFDO0tBQ3BCO0lBRUQsSUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BCLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxLQUFLLEVBQUUsQ0FBQztJQUVkLElBQUksQ0FBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsTUFBTSxNQUFLLENBQUMsRUFBRTtRQUN0QixPQUFPLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRyxHQUFHLENBQUMsQ0FBQztLQUN0QjtTQUFNO1FBQ0wsT0FBTyxPQUFPLENBQUMsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFHLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQ3JDO0FBQ0gsQ0FBQztBQWxCRCwwQkFrQkMifQ==