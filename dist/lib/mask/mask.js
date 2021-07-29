"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.masked = void 0;
var custom_mask_1 = require("./custom.mask");
var mask_imask_1 = require("./imask/mask-imask");
var mask_simple_mask_money_1 = require("./simple-mask-money/mask-simple-mask-money");
function masked(pattern, config) {
    var custoMaskKeys = Object.keys(custom_mask_1.CUSTOM_MASKS);
    if (custoMaskKeys.includes(pattern)) {
        var CUSTOM_MASK = custom_mask_1.CUSTOM_MASKS[pattern];
        if (CUSTOM_MASK.type === "IMASK") {
            config = Object.assign({}, CUSTOM_MASK.config, config);
            return new mask_imask_1.MaskIMask(config);
        }
        else {
            config = Object.assign({}, CUSTOM_MASK.config, config);
            return new mask_simple_mask_money_1.MaskSimpleMaskMoney(config);
        }
    }
    return new mask_imask_1.MaskIMask(pattern, config);
}
exports.masked = masked;
masked.custom = function (name, mask) { return (custom_mask_1.CUSTOM_MASKS[name] = mask); };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFzay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tYXNrL21hc2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBSUEsNkNBQTZDO0FBQzdDLGlEQUErQztBQUUvQyxxRkFBaUY7QUFFakYsU0FBZ0IsTUFBTSxDQUNwQixPQUFlLEVBQ2YsTUFBaUQ7SUFFakQsSUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQywwQkFBWSxDQUFDLENBQUM7SUFDaEQsSUFBSSxhQUFhLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ25DLElBQU0sV0FBVyxHQUFHLDBCQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFMUMsSUFBSSxXQUFXLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBRTtZQUNoQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsV0FBVyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztZQUN2RCxPQUFPLElBQUksc0JBQVMsQ0FBQyxNQUEwQixDQUFDLENBQUM7U0FDbEQ7YUFBTTtZQUNMLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxXQUFXLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ3ZELE9BQU8sSUFBSSw0Q0FBbUIsQ0FBQyxNQUErQixDQUFDLENBQUM7U0FDakU7S0FDRjtJQUVELE9BQU8sSUFBSSxzQkFBUyxDQUFDLE9BQU8sRUFBRSxNQUEwQixDQUFDLENBQUM7QUFDNUQsQ0FBQztBQWxCRCx3QkFrQkM7QUFFRCxNQUFNLENBQUMsTUFBTSxHQUFHLFVBQUMsSUFBWSxFQUFFLElBQWlCLElBQUssT0FBQSxDQUFDLDBCQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQTNCLENBQTJCLENBQUMifQ==