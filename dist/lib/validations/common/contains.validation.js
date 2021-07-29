"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contains = void 0;
var remove_accents_function_1 = require("../../functions/remove-accents.function");
function contains(value, compare, options) {
    if (!value)
        return false;
    value = value.toString();
    options = Object.assign({}, {
        removeSpace: true,
        removeAccents: true,
        caseSensitive: false,
    }, options);
    if (options === null || options === void 0 ? void 0 : options.removeAccents) {
        value = remove_accents_function_1.removeAccents(value);
        if (typeof compare === "string") {
            compare = remove_accents_function_1.removeAccents(compare);
        }
    }
    if (!(options === null || options === void 0 ? void 0 : options.caseSensitive)) {
        value = value.toLowerCase();
        if (typeof compare === "string") {
            compare = compare.toLowerCase();
        }
    }
    if (options === null || options === void 0 ? void 0 : options.removeSpace) {
        value = value.replace(/ +/g, "");
        if (typeof compare === "string") {
            compare = compare.replace(/ +/g, "");
        }
    }
    var match = value === null || value === void 0 ? void 0 : value.match(compare);
    return !!match;
}
exports.contains = contains;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGFpbnMudmFsaWRhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy92YWxpZGF0aW9ucy9jb21tb24vY29udGFpbnMudmFsaWRhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtRkFBd0U7QUFReEUsU0FBZ0IsUUFBUSxDQUN0QixLQUFhLEVBQ2IsT0FBd0IsRUFDeEIsT0FBeUI7SUFFekIsSUFBSSxDQUFDLEtBQUs7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUN6QixLQUFLLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBRXpCLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUNyQixFQUFFLEVBQ0Y7UUFDRSxXQUFXLEVBQUUsSUFBSTtRQUNqQixhQUFhLEVBQUUsSUFBSTtRQUNuQixhQUFhLEVBQUUsS0FBSztLQUNGLEVBQ3BCLE9BQU8sQ0FDUixDQUFDO0lBQ0YsSUFBSSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsYUFBYSxFQUFFO1FBQzFCLEtBQUssR0FBRyx1Q0FBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzdCLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxFQUFFO1lBQy9CLE9BQU8sR0FBRyx1Q0FBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ2xDO0tBQ0Y7SUFDRCxJQUFJLENBQUMsQ0FBQSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsYUFBYSxDQUFBLEVBQUU7UUFDM0IsS0FBSyxHQUFHLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM1QixJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVEsRUFBRTtZQUMvQixPQUFPLEdBQUcsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ2pDO0tBQ0Y7SUFDRCxJQUFJLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxXQUFXLEVBQUU7UUFDeEIsS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2pDLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxFQUFFO1lBQy9CLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztTQUN0QztLQUNGO0lBRUQsSUFBTSxLQUFLLEdBQUcsS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUVwQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUM7QUFDakIsQ0FBQztBQXZDRCw0QkF1Q0MifQ==