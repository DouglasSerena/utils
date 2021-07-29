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
exports.MaskIMask = exports.maskIMask = void 0;
var imask_1 = __importDefault(require("imask"));
var validate_validation_1 = require("../../validations/validate.validation");
function maskIMask(pattern, config) {
    return new MaskIMask(pattern, config);
}
exports.maskIMask = maskIMask;
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
    MaskIMask.prototype.bind = function (element, config) {
        config = Object.assign({}, this.config, config);
        this.element = element;
        this.inputMask = imask_1.default(element, config);
        this.update(this.inputMask.value);
        return this;
    };
    MaskIMask.prototype.update = function (value) {
        if (this.element && value) {
            this.inputMask.value = this.mask(value, this.config);
            this.inputMask.updateValue();
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFzay1pbWFzay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tYXNrZWQvaW1hc2svbWFzay1pbWFzay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGdEQUF3RTtBQUN4RSw2RUFBaUU7QUFJakUsU0FBZ0IsU0FBUyxDQUN2QixPQUFrQyxFQUNsQyxNQUF5QjtJQUV6QixPQUFPLElBQUksU0FBUyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQztBQUN4QyxDQUFDO0FBTEQsOEJBS0M7QUFFRDtJQU1FLG1CQUFZLE9BQWtDLEVBQUUsTUFBeUI7UUFDdkUsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRXJELElBQUksOEJBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUNoQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQWlCLENBQUM7WUFDakMsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSyxPQUFBLEdBQUcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBdkIsQ0FBdUIsQ0FBQyxDQUFDO1lBQ3RGLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLDhCQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ3BELENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQUMsT0FBTyxJQUFLLE9BQUEsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFuQixDQUFtQixDQUFDO2dCQUNoRCxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2pCO2FBQU07WUFDTCxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDckM7SUFDSCxDQUFDO0lBRUQsd0JBQUksR0FBSixVQUFLLE9BQW9CLEVBQUUsTUFBeUI7UUFDbEQsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFFdkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxlQUFLLENBQUMsT0FBTyxFQUFFLE1BQWEsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVsQyxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCwwQkFBTSxHQUFOLFVBQU8sS0FBYTtRQUNsQixJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksS0FBSyxFQUFFO1lBQ3pCLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNyRCxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQzlCO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsd0JBQUksR0FBSixVQUFLLEtBQWEsRUFBRSxNQUF5QjtRQUMzQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztRQUVoRCxJQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztRQUM3QyxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUM7SUFDckIsQ0FBQztJQUVELDBCQUFNLEdBQU4sVUFBTyxLQUFhLEVBQUUsTUFBeUI7UUFDN0MsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFaEQsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDN0MsT0FBTyxLQUFLLENBQUMsYUFBYSxDQUFDO0lBQzdCLENBQUM7SUFFTyw4QkFBVSxHQUFsQixVQUFtQixLQUFhLEVBQUUsTUFBeUI7UUFDekQsSUFBTSxVQUFVLEdBQUcsZUFBSyxDQUFDLFVBQVUsQ0FBQyxhQUFLLE1BQU0sQ0FBUyxDQUFDLENBQUM7UUFDMUQsVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQixPQUFPLFVBQWlDLENBQUM7SUFDM0MsQ0FBQztJQUNILGdCQUFDO0FBQUQsQ0FBQyxBQXpERCxJQXlEQztBQXpEWSw4QkFBUyJ9