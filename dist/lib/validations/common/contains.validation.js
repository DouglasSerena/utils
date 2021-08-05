"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contains = void 0;
var remove_accents_function_1 = require("../../functions/remove-accents.function");
function contains(value, compare, options) {
    if (!value)
        return false;
    var _value = value.toString();
    options = Object.assign({}, {
        removeSpace: true,
        removeAccents: true,
        caseSensitive: false,
    }, options);
    if (options === null || options === void 0 ? void 0 : options.removeAccents) {
        _value = remove_accents_function_1.removeAccents(_value);
        if (typeof compare === "string") {
            compare = remove_accents_function_1.removeAccents(compare);
        }
    }
    if (!(options === null || options === void 0 ? void 0 : options.caseSensitive)) {
        _value = _value.toLowerCase();
        if (typeof compare === "string") {
            compare = compare.toLowerCase();
        }
    }
    if (options === null || options === void 0 ? void 0 : options.removeSpace) {
        _value = _value.replace(/ +/g, "");
        if (typeof compare === "string") {
            compare = compare.replace(/ +/g, "");
        }
    }
    var match = _value === null || _value === void 0 ? void 0 : _value.match(compare);
    return !!match;
}
exports.contains = contains;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGFpbnMudmFsaWRhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy92YWxpZGF0aW9ucy9jb21tb24vY29udGFpbnMudmFsaWRhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtRkFBd0U7QUFReEUsU0FBZ0IsUUFBUSxDQUN0QixLQUFRLEVBQ1IsT0FBd0IsRUFDeEIsT0FBeUI7SUFFekIsSUFBSSxDQUFDLEtBQUs7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUN6QixJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7SUFFOUIsT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQ3JCLEVBQUUsRUFDRjtRQUNFLFdBQVcsRUFBRSxJQUFJO1FBQ2pCLGFBQWEsRUFBRSxJQUFJO1FBQ25CLGFBQWEsRUFBRSxLQUFLO0tBQ0YsRUFDcEIsT0FBTyxDQUNSLENBQUM7SUFDRixJQUFJLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxhQUFhLEVBQUU7UUFDMUIsTUFBTSxHQUFHLHVDQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDL0IsSUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRLEVBQUU7WUFDL0IsT0FBTyxHQUFHLHVDQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDbEM7S0FDRjtJQUNELElBQUksQ0FBQyxDQUFBLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxhQUFhLENBQUEsRUFBRTtRQUMzQixNQUFNLEdBQUcsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzlCLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxFQUFFO1lBQy9CLE9BQU8sR0FBRyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDakM7S0FDRjtJQUNELElBQUksT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLFdBQVcsRUFBRTtRQUN4QixNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDbkMsSUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRLEVBQUU7WUFDL0IsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQ3RDO0tBQ0Y7SUFFRCxJQUFNLEtBQUssR0FBRyxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRXJDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQztBQUNqQixDQUFDO0FBdkNELDRCQXVDQyJ9