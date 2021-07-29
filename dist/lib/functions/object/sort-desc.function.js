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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydC1kZXNjLmZ1bmN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Z1bmN0aW9ucy9vYmplY3Qvc29ydC1kZXNjLmZ1bmN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHlEQUE4QztBQUU5QyxTQUFnQixRQUFRLENBQUMsTUFBaUIsRUFBRSxNQUFjO0lBQ3hELElBQU0sZ0JBQWdCLEdBQUcsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM1QyxJQUFNLElBQUksR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVqQyxNQUFNLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0IsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQUMsQ0FBVSxFQUFFLENBQVU7UUFDeEMsSUFBTSxNQUFNLEdBQUcsMkJBQU8sQ0FBUyxDQUFDLEVBQUUsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3RELElBQU0sTUFBTSxHQUFHLDJCQUFPLENBQVMsQ0FBQyxFQUFFLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUV0RCxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQUU7WUFDNUQsSUFBTSxNQUFNLEdBQUcsTUFBTSxHQUFHLE1BQU0sQ0FBQztZQUMvQixPQUFPLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM5QzthQUFNLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxFQUFFO1lBQ3JDLElBQUksTUFBTSxDQUFDLGlCQUFpQixFQUFFLEdBQUcsTUFBTSxDQUFDLGlCQUFpQixFQUFFLEVBQUU7Z0JBQzNELE9BQU8sQ0FBQyxDQUFDLENBQUM7YUFDWDtZQUNELElBQUksTUFBTSxDQUFDLGlCQUFpQixFQUFFLEdBQUcsTUFBTSxDQUFDLGlCQUFpQixFQUFFLEVBQUU7Z0JBQzNELE9BQU8sQ0FBQyxDQUFDO2FBQ1Y7U0FDRjtRQUNELE9BQU8sQ0FBQyxDQUFDO0lBQ1gsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBdEJELDRCQXNCQyJ9