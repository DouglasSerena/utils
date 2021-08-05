"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.task = exports.cancelTask = void 0;
window["requestIdleCallback"] =
    window["requestIdleCallback"] ||
        function (handler) {
            var startTime = Date.now();
            return setTimeout(function () {
                handler({
                    didTimeout: false,
                    timeRemaining: function () {
                        return Math.max(0, 50.0 - (Date.now() - startTime));
                    },
                });
            }, 1);
        };
window["cancelIdleCallback"] =
    window["cancelIdleCallback"] ||
        function (id) {
            clearTimeout(id);
        };
function cancelTask(taskId) {
    window["cancelIdleCallback"](taskId);
}
exports.cancelTask = cancelTask;
function task(handler) {
    return window["requestIdleCallback"](handler);
}
exports.task = task;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFzay5mdW5jdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mdW5jdGlvbnMvdGFzay5mdW5jdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxNQUFNLENBQUMscUJBQXFCLENBQUM7SUFDM0IsTUFBTSxDQUFDLHFCQUFxQixDQUFDO1FBQzdCLFVBQVUsT0FBNkU7WUFDckYsSUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBRTdCLE9BQU8sVUFBVSxDQUFDO2dCQUNoQixPQUFPLENBQUM7b0JBQ04sVUFBVSxFQUFFLEtBQUs7b0JBQ2pCLGFBQWEsRUFBRTt3QkFDYixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDO29CQUN0RCxDQUFDO2lCQUNGLENBQUMsQ0FBQztZQUNMLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNSLENBQUMsQ0FBQztBQUVKLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQztJQUMxQixNQUFNLENBQUMsb0JBQW9CLENBQUM7UUFDNUIsVUFBVSxFQUFVO1lBQ2xCLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNuQixDQUFDLENBQUM7QUFFSixTQUFnQixVQUFVLENBQUMsTUFBYztJQUN2QyxNQUFNLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN2QyxDQUFDO0FBRkQsZ0NBRUM7QUFDRCxTQUFnQixJQUFJLENBQ2xCLE9BQWlGO0lBRWpGLE9BQU8sTUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDaEQsQ0FBQztBQUpELG9CQUlDIn0=