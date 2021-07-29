"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRgSp = void 0;
function isRgSp(rg) {
    if (!rg)
        return false;
    rg = rg.replace(/\D/g, "");
    var partRg = rg.substr(0, 8).split("");
    var digitRg = Number(rg.charAt(8));
    var digitGenerated = calcDigit(partRg);
    return digitRg === digitGenerated;
}
exports.isRgSp = isRgSp;
function calcDigit(parteCPF, multi) {
    if (multi === void 0) { multi = 9; }
    var generatedDigit = 0;
    var valueTotal = 0;
    valueTotal = parteCPF.reduce(function (result, currentNumber) { return result + Number.parseInt(currentNumber) * multi--; }, 0);
    generatedDigit = valueTotal % 11;
    if (generatedDigit > 9) {
        generatedDigit = 0;
    }
    return generatedDigit;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXMtcmctc3AudmFsaWRhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy92YWxpZGF0aW9ucy9jb21tb24vaXMtcmctc3AudmFsaWRhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxTQUFnQixNQUFNLENBQUMsRUFBVTtJQUMvQixJQUFJLENBQUMsRUFBRTtRQUFFLE9BQU8sS0FBSyxDQUFDO0lBRXRCLEVBQUUsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQVcsQ0FBQztJQUVyQyxJQUFNLE1BQU0sR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDekMsSUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyQyxJQUFNLGNBQWMsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFekMsT0FBTyxPQUFPLEtBQUssY0FBYyxDQUFDO0FBQ3BDLENBQUM7QUFWRCx3QkFVQztBQUVELFNBQVMsU0FBUyxDQUFDLFFBQWtCLEVBQUUsS0FBUztJQUFULHNCQUFBLEVBQUEsU0FBUztJQUM5QyxJQUFJLGNBQWMsR0FBRyxDQUFDLENBQUM7SUFDdkIsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDO0lBRW5CLFVBQVUsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUMxQixVQUFDLE1BQWMsRUFBRSxhQUFxQixJQUFLLE9BQUEsTUFBTSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEdBQUcsS0FBSyxFQUFFLEVBQWpELENBQWlELEVBQzVGLENBQUMsQ0FDRixDQUFDO0lBRUYsY0FBYyxHQUFHLFVBQVUsR0FBRyxFQUFFLENBQUM7SUFFakMsSUFBSSxjQUFjLEdBQUcsQ0FBQyxFQUFFO1FBQ3RCLGNBQWMsR0FBRyxDQUFDLENBQUM7S0FDcEI7SUFFRCxPQUFPLGNBQWMsQ0FBQztBQUN4QixDQUFDIn0=