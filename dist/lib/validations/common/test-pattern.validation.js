"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testPattern = void 0;
var common_validation_1 = require("./common.validation");
function testPattern(value, pattern) {
    if (!value)
        return false;
    if (common_validation_1.isString(pattern)) {
        pattern = new RegExp(pattern);
    }
    return pattern.test(value);
}
exports.testPattern = testPattern;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC1wYXR0ZXJuLnZhbGlkYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdmFsaWRhdGlvbnMvY29tbW9uL3Rlc3QtcGF0dGVybi52YWxpZGF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHlEQUErQztBQUUvQyxTQUFnQixXQUFXLENBQUMsS0FBYSxFQUFFLE9BQXdCO0lBQ2pFLElBQUksQ0FBQyxLQUFLO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFFekIsSUFBSSw0QkFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ3JCLE9BQU8sR0FBRyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUMvQjtJQUNELE9BQVEsT0FBa0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDekMsQ0FBQztBQVBELGtDQU9DIn0=