"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseNumber = void 0;
var validate_validation_1 = require("../validations/validate.validation");
var _config = {
    decimal: ".",
    thousands: null,
    error: false,
};
function parseNumber(value, config) {
    config = Object.assign({}, _config, config);
    if (!validate_validation_1.validate(value).isNumeric() && validate_validation_1.validate(value).isString()) {
        var isNegative = validate_validation_1.validate(value).isNegative();
        var decimalStr = new RegExp("\\" + (config === null || config === void 0 ? void 0 : config.decimal), "g");
        if (config.thousands) {
            var thousandsStr = new RegExp("\\" + (config === null || config === void 0 ? void 0 : config.thousands), "g");
            value = value.toString().replace(thousandsStr, "");
        }
        value = value.toString().replace(decimalStr, ".");
        var _a = value.split("."), prefix = _a[0], sufixa = _a[1];
        prefix = prefix === null || prefix === void 0 ? void 0 : prefix.replace(/\D/g, "");
        sufixa = sufixa === null || sufixa === void 0 ? void 0 : sufixa.replace(/\D/g, "");
        value = Number(prefix + "." + sufixa) || 0;
        if (isNegative) {
            value = -value;
        }
    }
    else {
        if (config === null || config === void 0 ? void 0 : config.error)
            new Error("Invalid Input.");
    }
    return Number(value);
}
exports.parseNumber = parseNumber;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2UtbnVtYmVyLmZ1bmN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2Z1bmN0aW9ucy9wYXJzZS1udW1iZXIuZnVuY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMEVBQThEO0FBUTlELElBQU0sT0FBTyxHQUF1QjtJQUNsQyxPQUFPLEVBQUUsR0FBRztJQUNaLFNBQVMsRUFBRSxJQUFJO0lBQ2YsS0FBSyxFQUFFLEtBQUs7Q0FDYixDQUFDO0FBRUYsU0FBZ0IsV0FBVyxDQUFDLEtBQXNCLEVBQUUsTUFBMkI7SUFDN0UsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztJQUM1QyxJQUFJLENBQUMsOEJBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLEVBQUUsSUFBSSw4QkFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1FBQzlELElBQU0sVUFBVSxHQUFHLDhCQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDaEQsSUFBTSxVQUFVLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBSyxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsT0FBTyxDQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDM0QsSUFBSSxNQUFNLENBQUMsU0FBUyxFQUFFO1lBQ3BCLElBQU0sWUFBWSxHQUFHLElBQUksTUFBTSxDQUFDLFFBQUssTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLFNBQVMsQ0FBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQy9ELEtBQUssR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxFQUFFLENBQUMsQ0FBQztTQUNwRDtRQUVELEtBQUssR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUU5QyxJQUFBLEtBQW1CLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQWxDLE1BQU0sUUFBQSxFQUFFLE1BQU0sUUFBb0IsQ0FBQztRQUN4QyxNQUFNLEdBQUcsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDcEMsTUFBTSxHQUFHLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRXBDLEtBQUssR0FBRyxNQUFNLENBQUksTUFBTSxTQUFJLE1BQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQyxJQUFJLFVBQVUsRUFBRTtZQUNkLEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQztTQUNoQjtLQUNGO1NBQU07UUFDTCxJQUFJLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxLQUFLO1lBQUUsSUFBSSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztLQUNoRDtJQUVELE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3ZCLENBQUM7QUF6QkQsa0NBeUJDIn0=