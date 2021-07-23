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
    exports.isRgSp = void 0;
    function isRgSp(rg) {
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
        valueTotal = parteCPF.reduce(function (result, currentNumber) {
            return result + Number.parseInt(currentNumber) * multi--;
        }, 0);
        generatedDigit = valueTotal % 11;
        if (generatedDigit > 9) {
            generatedDigit = 0;
        }
        return generatedDigit;
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXMtcmctc3AudmFsaWRhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy92YWxpZGF0aW9ucy9jb21tb24vaXMtcmctc3AudmFsaWRhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7SUFBQSxTQUFnQixNQUFNLENBQUMsRUFBVTtRQUMvQixFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFXLENBQUM7UUFFckMsSUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3pDLElBQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckMsSUFBTSxjQUFjLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRXpDLE9BQU8sT0FBTyxLQUFLLGNBQWMsQ0FBQztJQUNwQyxDQUFDO0lBUkQsd0JBUUM7SUFFRCxTQUFTLFNBQVMsQ0FBQyxRQUFrQixFQUFFLEtBQVM7UUFBVCxzQkFBQSxFQUFBLFNBQVM7UUFDOUMsSUFBSSxjQUFjLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQztRQUVuQixVQUFVLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FDMUIsVUFBQyxNQUFjLEVBQUUsYUFBcUI7WUFDcEMsT0FBQSxNQUFNLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxLQUFLLEVBQUU7UUFBakQsQ0FBaUQsRUFDbkQsQ0FBQyxDQUNGLENBQUM7UUFFRixjQUFjLEdBQUcsVUFBVSxHQUFHLEVBQUUsQ0FBQztRQUVqQyxJQUFJLGNBQWMsR0FBRyxDQUFDLEVBQUU7WUFDdEIsY0FBYyxHQUFHLENBQUMsQ0FBQztTQUNwQjtRQUVELE9BQU8sY0FBYyxDQUFDO0lBQ3hCLENBQUMifQ==