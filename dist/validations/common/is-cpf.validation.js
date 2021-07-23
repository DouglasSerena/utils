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
    exports.isCpf = void 0;
    function isCpf(cpf) {
        cpf = cpf.replace(/\D/g, "");
        var cpfInvalid = __spreadArray(__spreadArray(__spreadArray([], ["00000000000", "11111111111", "22222222222", "33333333333"]), ["44444444444", "55555555555", "66666666666", "77777777777"]), ["88888888888", "99999999999"]);
        if (cpfInvalid.includes(cpf) || cpf.length !== 11) {
            return false;
        }
        var initPart = cpf.substr(0, 9).split("");
        var firstDigit = Number.parseInt(cpf.charAt(9));
        var firstDigitGenerated = calcDigit(initPart, 10);
        if (firstDigit !== firstDigitGenerated) {
            return false;
        }
        var secondaryPart = cpf.substr(0, 10).split("");
        var secondaryDigit = Number.parseInt(cpf.charAt(10));
        var secondaryDigitGenerated = calcDigit(secondaryPart, 11);
        if (secondaryDigit !== secondaryDigitGenerated) {
            return false;
        }
        return true;
    }
    exports.isCpf = isCpf;
    function calcDigit(parteCPF, multi) {
        var generatedDigit = 0;
        var valueTotal = 0;
        valueTotal = parteCPF.reduce(function (result, currentNumber) {
            return result + Number.parseInt(currentNumber) * multi--;
        }, 0);
        generatedDigit = 11 - (valueTotal % 11);
        if (generatedDigit > 9) {
            generatedDigit = 0;
        }
        return generatedDigit;
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXMtY3BmLnZhbGlkYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdmFsaWRhdGlvbnMvY29tbW9uL2lzLWNwZi52YWxpZGF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQUEsU0FBZ0IsS0FBSyxDQUFDLEdBQVc7UUFDL0IsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBVyxDQUFDO1FBRXZDLElBQU0sVUFBVSxpREFDWCxDQUFDLGFBQWEsRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLGFBQWEsQ0FBQyxHQUM1RCxDQUFDLGFBQWEsRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLGFBQWEsQ0FBQyxHQUM1RCxDQUFDLGFBQWEsRUFBRSxhQUFhLENBQUMsQ0FDbEMsQ0FBQztRQUVGLElBQUksVUFBVSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLEVBQUUsRUFBRTtZQUNqRCxPQUFPLEtBQUssQ0FBQztTQUNkO1FBRUQsSUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzVDLElBQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xELElBQU0sbUJBQW1CLEdBQUcsU0FBUyxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNwRCxJQUFJLFVBQVUsS0FBSyxtQkFBbUIsRUFBRTtZQUN0QyxPQUFPLEtBQUssQ0FBQztTQUNkO1FBRUQsSUFBTSxhQUFhLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2xELElBQU0sY0FBYyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3ZELElBQU0sdUJBQXVCLEdBQUcsU0FBUyxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM3RCxJQUFJLGNBQWMsS0FBSyx1QkFBdUIsRUFBRTtZQUM5QyxPQUFPLEtBQUssQ0FBQztTQUNkO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBNUJELHNCQTRCQztJQUVELFNBQVMsU0FBUyxDQUFDLFFBQWtCLEVBQUUsS0FBYTtRQUNsRCxJQUFJLGNBQWMsR0FBRyxDQUFDLENBQUM7UUFDdkIsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDO1FBRW5CLFVBQVUsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUMxQixVQUFDLE1BQWMsRUFBRSxhQUFxQjtZQUNwQyxPQUFBLE1BQU0sR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEtBQUssRUFBRTtRQUFqRCxDQUFpRCxFQUNuRCxDQUFDLENBQ0YsQ0FBQztRQUVGLGNBQWMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFFeEMsSUFBSSxjQUFjLEdBQUcsQ0FBQyxFQUFFO1lBQ3RCLGNBQWMsR0FBRyxDQUFDLENBQUM7U0FDcEI7UUFFRCxPQUFPLGNBQWMsQ0FBQztJQUN4QixDQUFDIn0=