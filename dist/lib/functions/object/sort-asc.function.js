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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydC1hc2MuZnVuY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZnVuY3Rpb25zL29iamVjdC9zb3J0LWFzYy5mdW5jdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx5REFBOEM7QUFFOUMsU0FBZ0IsT0FBTyxDQUFDLE1BQWlCLEVBQUUsTUFBYztJQUN2RCxJQUFNLGdCQUFnQixHQUFHLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDNUMsSUFBTSxJQUFJLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFakMsTUFBTSxHQUFHLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRTdCLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFDLENBQVUsRUFBRSxDQUFVO1FBQ3hDLElBQU0sTUFBTSxHQUFHLDJCQUFPLENBQVMsQ0FBQyxFQUFFLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN0RCxJQUFNLE1BQU0sR0FBRywyQkFBTyxDQUFTLENBQUMsRUFBRSxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFdEQsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxFQUFFO1lBQzVELE9BQU8sTUFBTSxHQUFHLE1BQU0sQ0FBQztTQUN4QjthQUFNLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxFQUFFO1lBQ3JDLElBQUksTUFBTSxDQUFDLGlCQUFpQixFQUFFLEdBQUcsTUFBTSxDQUFDLGlCQUFpQixFQUFFLEVBQUU7Z0JBQzNELE9BQU8sQ0FBQyxDQUFDLENBQUM7YUFDWDtZQUNELElBQUksTUFBTSxDQUFDLGlCQUFpQixFQUFFLEdBQUcsTUFBTSxDQUFDLGlCQUFpQixFQUFFLEVBQUU7Z0JBQzNELE9BQU8sQ0FBQyxDQUFDO2FBQ1Y7U0FDRjtRQUNELE9BQU8sQ0FBQyxDQUFDO0lBQ1gsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBdEJELDBCQXNCQyJ9