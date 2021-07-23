"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortAsc = void 0;
var get_node_function_1 = require("./get-node.function");
function sortAsc(object, filter) {
    var arrayFilterLabel = filter === null || filter === void 0 ? void 0 : filter.split("|");
    var pipe = arrayFilterLabel[1];
    filter = arrayFilterLabel[0];
    return object.sort(function (a, b) {
        var node_a = get_node_function_1.getNode(a, filter === null || filter === void 0 ? void 0 : filter.split("."));
        var node_b = get_node_function_1.getNode(b, filter === null || filter === void 0 ? void 0 : filter.split("."));
        if (typeof node_a === "number" && typeof node_b === "number") {
            return node_a - node_b;
        }
        else if (typeof node_a === "string") {
            if (node_a.toLocaleUpperCase() < node_b.toLocaleUpperCase()) {
                return -1;
            }
            if (node_b.toLocaleUpperCase() < node_a.toLocaleUpperCase()) {
                return 1;
            }
        }
        return 0;
    });
}
exports.sortAsc = sortAsc;
//# sourceMappingURL=sort-asc.function.js.map