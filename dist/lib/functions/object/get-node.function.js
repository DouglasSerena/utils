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
//# sourceMappingURL=get-node.function.js.map