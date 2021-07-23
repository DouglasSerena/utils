var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../../validations", "../../validations/file", "./file-to-base64.function"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getSizeImage = void 0;
    var validations_1 = require("../../validations");
    var file_1 = require("../../validations/file");
    var file_to_base64_function_1 = require("./file-to-base64.function");
    var getSizeImage = function (file) { return __awaiter(void 0, void 0, void 0, function () {
        var type, image, base64;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    type = file.type.split("/");
                    if (!file_1.isFile(file)) {
                        throw new Error("file is not instance of File");
                    }
                    if (validations_1.isDifferent(type[0], "image")) {
                        throw new Error("File is not image");
                    }
                    image = new Image();
                    return [4 /*yield*/, file_to_base64_function_1.fileToBase64(file)];
                case 1:
                    base64 = _a.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            image.onerror = function (error) {
                                reject(error);
                            };
                            image.onload = function () {
                                resolve({
                                    height: image.height,
                                    width: image.width,
                                });
                            };
                            image.src = base64;
                        })];
            }
        });
    }); };
    exports.getSizeImage = getSizeImage;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LXNpemUtaW1hZ2UuZnVuY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZnVuY3Rpb25zL2ZpbGUvZ2V0LXNpemUtaW1hZ2UuZnVuY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQUEsaURBQWdEO0lBQ2hELCtDQUFnRDtJQUNoRCxxRUFBeUQ7SUFFbEQsSUFBTSxZQUFZLEdBQUcsVUFDMUIsSUFBVTs7Ozs7b0JBRUosSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUVsQyxJQUFJLENBQUMsYUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFO3dCQUNqQixNQUFNLElBQUksS0FBSyxDQUFDLDhCQUE4QixDQUFDLENBQUM7cUJBQ2pEO29CQUVELElBQUkseUJBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLEVBQUU7d0JBQ2pDLE1BQU0sSUFBSSxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQztxQkFDdEM7b0JBRUssS0FBSyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7b0JBQ1gscUJBQU0sc0NBQVksQ0FBQyxJQUFJLENBQUMsRUFBQTs7b0JBQWpDLE1BQU0sR0FBRyxTQUF3QjtvQkFFdkMsc0JBQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTs0QkFDakMsS0FBSyxDQUFDLE9BQU8sR0FBRyxVQUFDLEtBQUs7Z0NBQ3BCLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQzs0QkFDaEIsQ0FBQyxDQUFDOzRCQUNGLEtBQUssQ0FBQyxNQUFNLEdBQUc7Z0NBQ2IsT0FBTyxDQUFDO29DQUNOLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTTtvQ0FDcEIsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLO2lDQUNuQixDQUFDLENBQUM7NEJBQ0wsQ0FBQyxDQUFDOzRCQUVGLEtBQUssQ0FBQyxHQUFHLEdBQUcsTUFBZ0IsQ0FBQzt3QkFDL0IsQ0FBQyxDQUFDLEVBQUM7OztTQUNKLENBQUM7SUE3QlcsUUFBQSxZQUFZLGdCQTZCdkIifQ==