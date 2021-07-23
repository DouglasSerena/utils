var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./is-cnpj.validation", "./is-cpf.validation", "./is-empty.validation", "./is-rg-sp.validation", "./is-password.validation"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isDifferentNotStrict = exports.isEqualNotStrict = exports.isDifferent = exports.isEqual = exports.isNull = exports.isCpfOrCnpj = exports.isCpf = exports.isCnpj = exports.isUndefined = exports.isString = exports.notIsInstance = exports.isInstance = exports.isFill = exports.isEmpty = void 0;
    var is_cnpj_validation_1 = require("./is-cnpj.validation");
    Object.defineProperty(exports, "isCnpj", { enumerable: true, get: function () { return is_cnpj_validation_1.isCnpj; } });
    var is_cpf_validation_1 = require("./is-cpf.validation");
    Object.defineProperty(exports, "isCpf", { enumerable: true, get: function () { return is_cpf_validation_1.isCpf; } });
    var is_empty_validation_1 = require("./is-empty.validation");
    Object.defineProperty(exports, "isEmpty", { enumerable: true, get: function () { return is_empty_validation_1.isEmpty; } });
    var isEqual = function (value, verify) { return value === verify; };
    exports.isEqual = isEqual;
    var isDifferent = function (value, verify) { return value !== verify; };
    exports.isDifferent = isDifferent;
    var isEqualNotStrict = function (value, verify) { return value == verify; };
    exports.isEqualNotStrict = isEqualNotStrict;
    var isDifferentNotStrict = function (value, verify) {
        return value != verify;
    };
    exports.isDifferentNotStrict = isDifferentNotStrict;
    var isFill = function (item) { return !is_empty_validation_1.isEmpty(item); };
    exports.isFill = isFill;
    var isInstance = function (value, instance) { return value instanceof instance; };
    exports.isInstance = isInstance;
    var notIsInstance = function (value, instance) {
        return !isInstance(value, instance);
    };
    exports.notIsInstance = notIsInstance;
    var isString = function (value) { return typeof value === "string"; };
    exports.isString = isString;
    var isNull = function (value) { return value === null; };
    exports.isNull = isNull;
    var isUndefined = function (value) { return typeof value === "undefined"; };
    exports.isUndefined = isUndefined;
    var isCpfOrCnpj = function (value) {
        value = value.replace(/\D/g, "");
        return value.length <= 11 ? is_cpf_validation_1.isCpf(value) : is_cnpj_validation_1.isCnpj(value);
    };
    exports.isCpfOrCnpj = isCpfOrCnpj;
    __exportStar(require("./is-rg-sp.validation"), exports);
    __exportStar(require("./is-password.validation"), exports);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdmFsaWRhdGlvbnMvY29tbW9uL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBQSwyREFBOEM7SUFnQzVDLHVGQWhDTywyQkFBTSxPQWdDUDtJQS9CUix5REFBNEM7SUFnQzFDLHNGQWhDTyx5QkFBSyxPQWdDUDtJQS9CUCw2REFBZ0Q7SUF3QjlDLHdGQXhCTyw2QkFBTyxPQXdCUDtJQXRCVCxJQUFNLE9BQU8sR0FBRyxVQUFDLEtBQVUsRUFBRSxNQUFXLElBQWMsT0FBQSxLQUFLLEtBQUssTUFBTSxFQUFoQixDQUFnQixDQUFDO0lBZ0NyRSwwQkFBTztJQS9CVCxJQUFNLFdBQVcsR0FBRyxVQUFDLEtBQVUsRUFBRSxNQUFXLElBQWMsT0FBQSxLQUFLLEtBQUssTUFBTSxFQUFoQixDQUFnQixDQUFDO0lBZ0N6RSxrQ0FBVztJQTlCYixJQUFNLGdCQUFnQixHQUFHLFVBQUMsS0FBVSxFQUFFLE1BQVcsSUFBYyxPQUFBLEtBQUssSUFBSSxNQUFNLEVBQWYsQ0FBZSxDQUFDO0lBK0I3RSw0Q0FBZ0I7SUE5QmxCLElBQU0sb0JBQW9CLEdBQUcsVUFBQyxLQUFVLEVBQUUsTUFBVztRQUNuRCxPQUFBLEtBQUssSUFBSSxNQUFNO0lBQWYsQ0FBZSxDQUFDO0lBOEJoQixvREFBb0I7SUE1QnRCLElBQU0sTUFBTSxHQUFHLFVBQVUsSUFBa0IsSUFBYyxPQUFBLENBQUMsNkJBQU8sQ0FBSSxJQUFJLENBQUMsRUFBakIsQ0FBaUIsQ0FBQztJQWdCekUsd0JBQU07SUFmUixJQUFNLFVBQVUsR0FBRyxVQUFDLEtBQVUsRUFBRSxRQUFhLElBQUssT0FBQSxLQUFLLFlBQVksUUFBUSxFQUF6QixDQUF5QixDQUFDO0lBZ0IxRSxnQ0FBVTtJQWZaLElBQU0sYUFBYSxHQUFHLFVBQUMsS0FBVSxFQUFFLFFBQWE7UUFDOUMsT0FBQSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDO0lBQTVCLENBQTRCLENBQUM7SUFlN0Isc0NBQWE7SUFkZixJQUFNLFFBQVEsR0FBRyxVQUFDLEtBQVUsSUFBSyxPQUFBLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBekIsQ0FBeUIsQ0FBQztJQWV6RCw0QkFBUTtJQWRWLElBQU0sTUFBTSxHQUFHLFVBQUMsS0FBVSxJQUFjLE9BQUEsS0FBSyxLQUFLLElBQUksRUFBZCxDQUFjLENBQUM7SUFtQnJELHdCQUFNO0lBbEJSLElBQU0sV0FBVyxHQUFHLFVBQUMsS0FBVSxJQUFjLE9BQUEsT0FBTyxLQUFLLEtBQUssV0FBVyxFQUE1QixDQUE0QixDQUFDO0lBY3hFLGtDQUFXO0lBYmIsSUFBTSxXQUFXLEdBQUcsVUFBQyxLQUFhO1FBQ2hDLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNqQyxPQUFPLEtBQUssQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyx5QkFBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQywyQkFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNELENBQUMsQ0FBQztJQWFBLGtDQUFXO0lBWGIsd0RBQXNDO0lBQ3RDLDJEQUF5QyJ9