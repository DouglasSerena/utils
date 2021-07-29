"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.base64toFile = void 0;
function base64toFile(base64, filename) {
    var _a, _b;
    var array = base64 === null || base64 === void 0 ? void 0 : base64.split(",");
    var mime = ((_b = (_a = array[0]) === null || _a === void 0 ? void 0 : _a.match(/:(.*?);/)) === null || _b === void 0 ? void 0 : _b[1]) || "image/png";
    var _atob = atob(array[1] || array[0]);
    var length = _atob.length;
    var uint8array = new Uint8Array(length);
    while (length--) {
        uint8array[length] = _atob.charCodeAt(length);
    }
    return new File([uint8array], filename, { type: mime });
}
exports.base64toFile = base64toFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZTY0LXRvLWZpbGUuZnVuY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZnVuY3Rpb25zL2ZpbGUvYmFzZTY0LXRvLWZpbGUuZnVuY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsU0FBZ0IsWUFBWSxDQUFDLE1BQWMsRUFBRSxRQUFnQjs7SUFDM0QsSUFBTSxLQUFLLEdBQUcsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNqQyxJQUFNLElBQUksR0FBRyxDQUFBLE1BQUEsTUFBQSxLQUFLLENBQUMsQ0FBQyxDQUFDLDBDQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsMENBQUcsQ0FBQyxDQUFDLEtBQUksV0FBVyxDQUFDO0lBQzVELElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekMsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztJQUMxQixJQUFNLFVBQVUsR0FBRyxJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUUxQyxPQUFPLE1BQU0sRUFBRSxFQUFFO1FBQ2YsVUFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDL0M7SUFFRCxPQUFPLElBQUksSUFBSSxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUUsUUFBUSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7QUFDMUQsQ0FBQztBQVpELG9DQVlDIn0=