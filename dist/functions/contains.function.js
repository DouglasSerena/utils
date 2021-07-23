(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./remove-accents.function"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.contains = void 0;
    var remove_accents_function_1 = require("./remove-accents.function");
    function contains(work, compare, options) {
        options = Object.assign({}, {
            removeSpace: true,
            removeAccents: true,
            caseSensitive: false,
        }, options);
        if (options === null || options === void 0 ? void 0 : options.removeAccents) {
            work = remove_accents_function_1.removeAccents(work);
            if (typeof compare === "string") {
                compare = remove_accents_function_1.removeAccents(compare);
            }
        }
        if (!(options === null || options === void 0 ? void 0 : options.caseSensitive)) {
            work = work.toLowerCase();
            if (typeof compare === "string") {
                compare = compare.toLowerCase();
            }
        }
        if (options === null || options === void 0 ? void 0 : options.removeSpace) {
            work = work.replace(/ +/g, "");
            if (typeof compare === "string") {
                compare = compare.replace(/ +/g, "");
            }
        }
        return (work === null || work === void 0 ? void 0 : work.match(compare)) !== null;
    }
    exports.contains = contains;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGFpbnMuZnVuY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZnVuY3Rpb25zL2NvbnRhaW5zLmZ1bmN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztJQUFBLHFFQUEwRDtJQVExRCxTQUFnQixRQUFRLENBQ3RCLElBQVksRUFDWixPQUF3QixFQUN4QixPQUF5QjtRQUV6QixPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FDckIsRUFBRSxFQUNGO1lBQ0UsV0FBVyxFQUFFLElBQUk7WUFDakIsYUFBYSxFQUFFLElBQUk7WUFDbkIsYUFBYSxFQUFFLEtBQUs7U0FDRixFQUNwQixPQUFPLENBQ1IsQ0FBQztRQUNGLElBQUksT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLGFBQWEsRUFBRTtZQUMxQixJQUFJLEdBQUcsdUNBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMzQixJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVEsRUFBRTtnQkFDL0IsT0FBTyxHQUFHLHVDQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDbEM7U0FDRjtRQUNELElBQUksQ0FBQyxDQUFBLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxhQUFhLENBQUEsRUFBRTtZQUMzQixJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQzFCLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxFQUFFO2dCQUMvQixPQUFPLEdBQUcsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQ2pDO1NBQ0Y7UUFDRCxJQUFJLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRSxXQUFXLEVBQUU7WUFDeEIsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQy9CLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxFQUFFO2dCQUMvQixPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7YUFDdEM7U0FDRjtRQUVELE9BQU8sQ0FBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFLLElBQUksQ0FBQztJQUN2QyxDQUFDO0lBbENELDRCQWtDQyJ9