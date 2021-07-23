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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydC1hc2MuZnVuY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZnVuY3Rpb25zL29iamVjdC9zb3J0LWFzYy5mdW5jdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7SUFBQSx5REFBOEM7SUFFOUMsU0FBZ0IsT0FBTyxDQUFDLE1BQWEsRUFBRSxNQUFjO1FBQ25ELElBQU0sZ0JBQWdCLEdBQUcsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM1QyxJQUFNLElBQUksR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVqQyxNQUFNLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFN0IsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQUMsQ0FBTSxFQUFFLENBQU07WUFDaEMsSUFBTSxNQUFNLEdBQUcsMkJBQU8sQ0FBQyxDQUFDLEVBQUUsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQzlDLElBQU0sTUFBTSxHQUFHLDJCQUFPLENBQUMsQ0FBQyxFQUFFLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUU5QyxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUU7Z0JBQzVELE9BQU8sTUFBTSxHQUFHLE1BQU0sQ0FBQzthQUN4QjtpQkFBTSxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBRTtnQkFDckMsSUFBSSxNQUFNLENBQUMsaUJBQWlCLEVBQUUsR0FBRyxNQUFNLENBQUMsaUJBQWlCLEVBQUUsRUFBRTtvQkFDM0QsT0FBTyxDQUFDLENBQUMsQ0FBQztpQkFDWDtnQkFDRCxJQUFJLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxHQUFHLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRSxFQUFFO29CQUMzRCxPQUFPLENBQUMsQ0FBQztpQkFDVjthQUNGO1lBQ0QsT0FBTyxDQUFDLENBQUM7UUFDWCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUF0QkQsMEJBc0JDIn0=