(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./get-node.function"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.sortDesc = void 0;
    var get_node_function_1 = require("./get-node.function");
    function sortDesc(object, filter) {
        var arrayFilterLabel = filter === null || filter === void 0 ? void 0 : filter.split("|");
        var pipe = arrayFilterLabel[1];
        filter = arrayFilterLabel[0];
        return object.sort(function (a, b) {
            var node_a = get_node_function_1.getNode(a, filter === null || filter === void 0 ? void 0 : filter.split("."));
            var node_b = get_node_function_1.getNode(b, filter === null || filter === void 0 ? void 0 : filter.split("."));
            if (typeof node_a === "number" && typeof node_b === "number") {
                var result = node_a - node_b;
                return result > 0 ? -1 : result == 0 ? 0 : 1;
            }
            else if (typeof node_a === "string") {
                if (node_a.toLocaleUpperCase() > node_b.toLocaleUpperCase()) {
                    return -1;
                }
                if (node_b.toLocaleUpperCase() > node_a.toLocaleUpperCase()) {
                    return 1;
                }
            }
            return 0;
        });
    }
    exports.sortDesc = sortDesc;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydC1kZXNjLmZ1bmN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2Z1bmN0aW9ucy9vYmplY3Qvc29ydC1kZXNjLmZ1bmN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztJQUFBLHlEQUE4QztJQUU5QyxTQUFnQixRQUFRLENBQUMsTUFBYSxFQUFFLE1BQWM7UUFDcEQsSUFBTSxnQkFBZ0IsR0FBRyxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzVDLElBQU0sSUFBSSxHQUFHLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWpDLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3QixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBQyxDQUFNLEVBQUUsQ0FBTTtZQUNoQyxJQUFNLE1BQU0sR0FBRywyQkFBTyxDQUFDLENBQUMsRUFBRSxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDOUMsSUFBTSxNQUFNLEdBQUcsMkJBQU8sQ0FBQyxDQUFDLEVBQUUsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBRTlDLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBRTtnQkFDNUQsSUFBTSxNQUFNLEdBQUcsTUFBTSxHQUFHLE1BQU0sQ0FBQztnQkFDL0IsT0FBTyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDOUM7aUJBQU0sSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUU7Z0JBQ3JDLElBQUksTUFBTSxDQUFDLGlCQUFpQixFQUFFLEdBQUcsTUFBTSxDQUFDLGlCQUFpQixFQUFFLEVBQUU7b0JBQzNELE9BQU8sQ0FBQyxDQUFDLENBQUM7aUJBQ1g7Z0JBQ0QsSUFBSSxNQUFNLENBQUMsaUJBQWlCLEVBQUUsR0FBRyxNQUFNLENBQUMsaUJBQWlCLEVBQUUsRUFBRTtvQkFDM0QsT0FBTyxDQUFDLENBQUM7aUJBQ1Y7YUFDRjtZQUNELE9BQU8sQ0FBQyxDQUFDO1FBQ1gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBdEJELDRCQXNCQyJ9