var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isCnpj = void 0;
    function isCnpj(cnpj) {
        cnpj = cnpj.replace(/\D/g, "");
        var cpfInvalid = __spreadArray(__spreadArray(__spreadArray([], ["00000000000000", "11111111111111", "22222222222222", "33333333333333"]), ["44444444444444", "55555555555555", "66666666666666", "77777777777777"]), ["88888888888888", "99999999999999"]);
        if (cpfInvalid.includes(cnpj) || cnpj.length !== 14) {
            return false;
        }
        var initPart = cnpj.substr(0, 12).split("");
        var firstDigit = Number.parseInt(cnpj.charAt(12));
        var firstDigitGenerated = calcDigit(initPart, 5);
        if (firstDigit !== firstDigitGenerated) {
            return false;
        }
        var secondaryPart = cnpj.substr(0, 13).split("");
        var secondaryDigit = Number.parseInt(cnpj.charAt(13));
        var secondaryDigitGenerated = calcDigit(secondaryPart, 6);
        if (secondaryDigit !== secondaryDigitGenerated) {
            return false;
        }
        return true;
    }
    exports.isCnpj = isCnpj;
    function calcDigit(parteCNPJ, multi) {
        var generatedDigit = 0;
        var valueTotal = 0;
        valueTotal = parteCNPJ.reduce(function (result, currentNumber) {
            result += Number.parseInt(currentNumber) * multi--;
            if (multi < 2) {
                multi = 9;
            }
            return result;
        }, 0);
        if (valueTotal % 11 < 2) {
            generatedDigit = 0;
        }
        else {
            generatedDigit = 11 - (valueTotal % 11);
        }
        return generatedDigit;
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXMtY25wai52YWxpZGF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3ZhbGlkYXRpb25zL2NvbW1vbi9pcy1jbnBqLnZhbGlkYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFBQSxTQUFnQixNQUFNLENBQUMsSUFBWTtRQUNqQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFXLENBQUM7UUFFekMsSUFBTSxVQUFVLGlEQUNYLENBQUMsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLEVBQUUsZ0JBQWdCLENBQUMsR0FDeEUsQ0FBQyxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsQ0FBQyxHQUN4RSxDQUFDLGdCQUFnQixFQUFFLGdCQUFnQixDQUFDLENBQ3hDLENBQUM7UUFFRixJQUFJLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxFQUFFLEVBQUU7WUFDbkQsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUVELElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM5QyxJQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNwRCxJQUFNLG1CQUFtQixHQUFHLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFFbkQsSUFBSSxVQUFVLEtBQUssbUJBQW1CLEVBQUU7WUFDdEMsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUVELElBQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNuRCxJQUFNLGNBQWMsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN4RCxJQUFNLHVCQUF1QixHQUFHLFNBQVMsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDNUQsSUFBSSxjQUFjLEtBQUssdUJBQXVCLEVBQUU7WUFDOUMsT0FBTyxLQUFLLENBQUM7U0FDZDtRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQTdCRCx3QkE2QkM7SUFFRCxTQUFTLFNBQVMsQ0FBQyxTQUFtQixFQUFFLEtBQWE7UUFDbkQsSUFBSSxjQUFjLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQztRQUVuQixVQUFVLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFDLE1BQWMsRUFBRSxhQUFxQjtZQUNsRSxNQUFNLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQztZQUNuRCxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUU7Z0JBQ2IsS0FBSyxHQUFHLENBQUMsQ0FBQzthQUNYO1lBQ0QsT0FBTyxNQUFNLENBQUM7UUFDaEIsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRU4sSUFBSSxVQUFVLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRTtZQUN2QixjQUFjLEdBQUcsQ0FBQyxDQUFDO1NBQ3BCO2FBQU07WUFDTCxjQUFjLEdBQUcsRUFBRSxHQUFHLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1NBQ3pDO1FBRUQsT0FBTyxjQUFjLENBQUM7SUFDeEIsQ0FBQyJ9