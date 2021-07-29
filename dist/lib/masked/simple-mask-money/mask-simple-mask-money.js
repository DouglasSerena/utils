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
        this.element = element;
        if (validate_validation_1.validate(element).isInstanceof(HTMLInputElement)) {
            this.update(this.element.value);
            simple_mask_money_1.default.setMask(element, config);
        }
        else {
            this.update(this.element.textContent);
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
    MaskSimpleMaskMoney.prototype.update = function (value) {
        if (this.element && !!value) {
            if (this.element instanceof HTMLInputElement) {
                this.element.value = this.mask(value);
            }
            else {
                this.element.textContent = this.mask(value);
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFzay1zaW1wbGUtbWFzay1tb25leS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tYXNrZWQvc2ltcGxlLW1hc2stbW9uZXkvbWFzay1zaW1wbGUtbWFzay1tb25leS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSx3RUFBZ0Q7QUFDaEQsNkVBQWlFO0FBSWpFLFNBQWdCLG1CQUFtQixDQUFDLE1BQStCO0lBQ2pFLE9BQU8sSUFBSSxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN6QyxDQUFDO0FBRkQsa0RBRUM7QUFFRDtJQUlFLDZCQUFZLE1BQStCO1FBQ3pDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQsa0NBQUksR0FBSixVQUFLLE9BQW9CLEVBQUUsTUFBK0I7UUFBMUQsaUJBcUJDO1FBcEJDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBYyxDQUFDO1FBRTlCLElBQUksOEJBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtZQUNwRCxJQUFJLENBQUMsTUFBTSxDQUFFLElBQUksQ0FBQyxPQUE0QixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3RELDJCQUFlLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztTQUMxQzthQUFNO1lBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3RDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7Z0JBQ2hDLE9BQU8sQ0FBQyxXQUFXLEdBQUcsS0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUU3RCxJQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ3JDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDbEMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDdEIsSUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDO2dCQUN4QyxTQUFTLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBQzVCLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDNUIsQ0FBQyxDQUFDLENBQUM7U0FDSjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELG9DQUFNLEdBQU4sVUFBTyxLQUFhO1FBQ2xCLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFO1lBQzNCLElBQUksSUFBSSxDQUFDLE9BQU8sWUFBWSxnQkFBZ0IsRUFBRTtnQkFDNUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN2QztpQkFBTTtnQkFDTCxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzdDO1NBQ0Y7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxrQ0FBSSxHQUFKLFVBQUssS0FBYSxFQUFFLE1BQStCO1FBQ2pELE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ2hELE9BQU8sMkJBQWUsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFDRCxvQ0FBTSxHQUFOLFVBQU8sS0FBYSxFQUFFLE1BQStCO1FBQ25ELE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ2hELE9BQU8sMkJBQWUsQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFDSCwwQkFBQztBQUFELENBQUMsQUFsREQsSUFrREM7QUFsRFksa0RBQW1CIn0=