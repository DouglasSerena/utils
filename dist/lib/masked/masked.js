"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.masked = void 0;
var custom_masked_1 = require("./custom.masked");
var mask_imask_1 = require("./imask/mask-imask");
var mask_simple_mask_money_1 = require("./simple-mask-money/mask-simple-mask-money");
function masked(pattern, config) {
    var custoMaskKeys = Object.keys(custom_masked_1.CUSTOM_MASKS);
    if (custoMaskKeys.includes(pattern)) {
        var CUSTOM_MASK = custom_masked_1.CUSTOM_MASKS[pattern];
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
masked.custom = function (name, mask) { return (custom_masked_1.CUSTOM_MASKS[name] = mask); };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFza2VkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21hc2tlZC9tYXNrZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsaURBQStDO0FBQy9DLGlEQUErQztBQUUvQyxxRkFBaUY7QUFFakYsU0FBZ0IsTUFBTSxDQUFDLE9BQWUsRUFBRSxNQUFtQjtJQUN6RCxJQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLDRCQUFZLENBQUMsQ0FBQztJQUNoRCxJQUFJLGFBQWEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDbkMsSUFBTSxXQUFXLEdBQUcsNEJBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUUxQyxJQUFJLFdBQVcsQ0FBQyxJQUFJLEtBQUssT0FBTyxFQUFFO1lBQ2hDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxXQUFXLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ3ZELE9BQU8sSUFBSSxzQkFBUyxDQUFDLE1BQTBCLENBQUMsQ0FBQztTQUNsRDthQUFNO1lBQ0wsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFdBQVcsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDdkQsT0FBTyxJQUFJLDRDQUFtQixDQUFDLE1BQStCLENBQUMsQ0FBQztTQUNqRTtLQUNGO0lBRUQsT0FBTyxJQUFJLHNCQUFTLENBQUMsT0FBTyxFQUFFLE1BQTBCLENBQUMsQ0FBQztBQUM1RCxDQUFDO0FBZkQsd0JBZUM7QUFFRCxNQUFNLENBQUMsTUFBTSxHQUFHLFVBQUMsSUFBWSxFQUFFLElBQWlCLElBQUssT0FBQSxDQUFDLDRCQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQTNCLENBQTJCLENBQUMifQ==