"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.base64toFile = void 0;
function base64toFile(base64, filename) {
    var _a, _b;
    var array = base64 === null || base64 === void 0 ? void 0 : base64.split(",");
    var mime = (_b = (_a = array[0]) === null || _a === void 0 ? void 0 : _a.match(/:(.*?);/)) === null || _b === void 0 ? void 0 : _b[1];
    var _atob = atob(array[1]);
    var length = _atob.length;
    var uint8array = new Uint8Array(length);
    while (length--) {
        uint8array[length] = _atob.charCodeAt(length);
    }
    return new File([uint8array], filename, { type: mime });
}
exports.base64toFile = base64toFile;
//# sourceMappingURL=base64-to-file.function.js.map