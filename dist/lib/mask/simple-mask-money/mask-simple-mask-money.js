"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaskSimpleMaskMoney = exports.maskSimpleMaskMoney = void 0;
var simple_mask_money_1 = __importDefault(require("simple-mask-money"));
var validate_validation_1 = require("../../validations/validate.validation");
function maskSimpleMaskMoney(config) {
    return new MaskSimpleMaskMoney(config);
}
exports.maskSimpleMaskMoney = maskSimpleMaskMoney;
var MaskSimpleMaskMoney = /** @class */ (function () {
    function MaskSimpleMaskMoney(config) {
        this.config = Object.assign({}, this.config, config);
    }
    MaskSimpleMaskMoney.prototype.bind = function (element, config) {
        var _this = this;
        config = Object.assign({}, this.config, config);
        if (validate_validation_1.validate(element).isInstanceof(HTMLInputElement)) {
            simple_mask_money_1.default.setMask(element, config);
        }
        else {
            element.textContent = this.mask(element.textContent, config);
            element.addEventListener("input", function () {
                element.textContent = _this.mask(element.textContent, config);
                var range = document.createRange();
                range.selectNodeContents(element);
                range.collapse(false);
                var selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
            });
        }
        return this;
    };
    MaskSimpleMaskMoney.prototype.mask = function (value, config) {
        config = Object.assign({}, this.config, config);
        return simple_mask_money_1.default.formatToMask(value, config);
    };
    MaskSimpleMaskMoney.prototype.unmask = function (value, config) {
        config = Object.assign({}, this.config, config);
        return simple_mask_money_1.default.formatToNumber(value, config);
    };
    return MaskSimpleMaskMoney;
}());
exports.MaskSimpleMaskMoney = MaskSimpleMaskMoney;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFzay1zaW1wbGUtbWFzay1tb25leS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tYXNrL3NpbXBsZS1tYXNrLW1vbmV5L21hc2stc2ltcGxlLW1hc2stbW9uZXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsd0VBQTJFO0FBQzNFLDZFQUFpRTtBQUdqRSxTQUFnQixtQkFBbUIsQ0FBQyxNQUE4QjtJQUNoRSxPQUFPLElBQUksbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDekMsQ0FBQztBQUZELGtEQUVDO0FBRUQ7SUFHRSw2QkFBWSxNQUE4QjtRQUN4QyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVELGtDQUFJLEdBQUosVUFBSyxPQUFvQixFQUFFLE1BQThCO1FBQXpELGlCQWtCQztRQWpCQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNoRCxJQUFJLDhCQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLEVBQUU7WUFDcEQsMkJBQWUsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQzFDO2FBQU07WUFDTCxPQUFPLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUM3RCxPQUFPLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFO2dCQUNoQyxPQUFPLENBQUMsV0FBVyxHQUFHLEtBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFFN0QsSUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUNyQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ2xDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3RCLElBQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQztnQkFDeEMsU0FBUyxDQUFDLGVBQWUsRUFBRSxDQUFDO2dCQUM1QixTQUFTLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzVCLENBQUMsQ0FBQyxDQUFDO1NBQ0o7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxrQ0FBSSxHQUFKLFVBQUssS0FBYSxFQUFFLE1BQThCO1FBQ2hELE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ2hELE9BQU8sMkJBQWUsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFDRCxvQ0FBTSxHQUFOLFVBQU8sS0FBYSxFQUFFLE1BQThCO1FBQ2xELE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ2hELE9BQU8sMkJBQWUsQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFDSCwwQkFBQztBQUFELENBQUMsQUFuQ0QsSUFtQ0M7QUFuQ1ksa0RBQW1CIn0=