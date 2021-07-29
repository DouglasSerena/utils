"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaskIMask = exports.maskMoney = void 0;
var imask_1 = __importDefault(require("imask"));
var validate_validation_1 = require("../../validations/validate.validation");
function maskMoney(pattern, config) {
    return new MaskIMask(pattern, config);
}
exports.maskMoney = maskMoney;
var MaskIMask = /** @class */ (function () {
    function MaskIMask(pattern, config) {
        this.config = Object.assign({}, this.config, config);
        if (validate_validation_1.validate(pattern).isString()) {
            this.pattern = pattern;
            var patterns = this.pattern.split("||").sort(function (one, two) { return one.length - two.length; });
            this.config.mask = validate_validation_1.validate(patterns.length).isMore(1)
                ? patterns.map(function (pattern) { return ({ mask: pattern }); })
                : patterns[0];
        }
        else {
            Object.assign(this.config, pattern);
        }
    }
    MaskIMask.prototype.bind = function (el, config) {
        config = Object.assign({}, this.config, config);
        imask_1.default(el, __assign({}, config));
        return this;
    };
    MaskIMask.prototype.mask = function (value, config) {
        config = Object.assign({}, this.config, config);
        var imask = this.createMask(value, config);
        return imask.value;
    };
    MaskIMask.prototype.unmask = function (value, config) {
        config = Object.assign({}, this.config, config);
        var imask = this.createMask(value, config);
        return imask.unmaskedValue;
    };
    MaskIMask.prototype.createMask = function (value, config) {
        var createMask = imask_1.default.createMask(__assign({}, config));
        createMask.resolve(value);
        return createMask;
    };
    return MaskIMask;
}());
exports.MaskIMask = MaskIMask;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFzay1pbWFzay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tYXNrL2ltYXNrL21hc2staW1hc2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnREFBNkQ7QUFDN0QsNkVBQWlFO0FBR2pFLFNBQWdCLFNBQVMsQ0FDdkIsT0FBa0MsRUFDbEMsTUFBeUI7SUFFekIsT0FBTyxJQUFJLFNBQVMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDeEMsQ0FBQztBQUxELDhCQUtDO0FBRUQ7SUFJRSxtQkFBWSxPQUFrQyxFQUFFLE1BQXlCO1FBQ3ZFLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztRQUVyRCxJQUFJLDhCQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFpQixDQUFDO1lBQ2pDLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLEdBQUcsRUFBRSxHQUFHLElBQUssT0FBQSxHQUFHLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQXZCLENBQXVCLENBQUMsQ0FBQztZQUN0RixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRyw4QkFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNwRCxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFDLE9BQU8sSUFBSyxPQUFBLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBbkIsQ0FBbUIsQ0FBQztnQkFDaEQsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNqQjthQUFNO1lBQ0wsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQ3JDO0lBQ0gsQ0FBQztJQUVELHdCQUFJLEdBQUosVUFBSyxFQUE2QixFQUFFLE1BQXdCO1FBQzFELE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ2hELGVBQUssQ0FBQyxFQUFFLGVBQU8sTUFBTSxFQUFHLENBQUM7UUFFekIsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsd0JBQUksR0FBSixVQUFLLEtBQWEsRUFBRSxNQUF5QjtRQUMzQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztRQUVoRCxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztRQUM3QyxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUM7SUFDckIsQ0FBQztJQUNELDBCQUFNLEdBQU4sVUFBTyxLQUFhLEVBQUUsTUFBeUI7UUFDN0MsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFaEQsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDN0MsT0FBTyxLQUFLLENBQUMsYUFBYSxDQUFDO0lBQzdCLENBQUM7SUFFTyw4QkFBVSxHQUFsQixVQUFtQixLQUFhLEVBQUUsTUFBeUI7UUFDekQsSUFBTSxVQUFVLEdBQUcsZUFBSyxDQUFDLFVBQVUsY0FBTSxNQUFNLEVBQUcsQ0FBQztRQUNuRCxVQUFVLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFCLE9BQU8sVUFBaUMsQ0FBQztJQUMzQyxDQUFDO0lBQ0gsZ0JBQUM7QUFBRCxDQUFDLEFBM0NELElBMkNDO0FBM0NZLDhCQUFTIn0=