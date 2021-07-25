"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.minSize = void 0;
var file_validation_1 = require("./file.validation");
var common_validation_1 = require("../common/common.validation");
var number_validation_1 = require("../number.validation");
var common_1 = require("../common");
var minSize = function (files, min, type) {
    if (type === void 0) { type = "KB"; }
    var filesInvalid = [];
    files = files || [];
    var size = file_validation_1.BIT_SIZES[type] || file_validation_1.BIT_SIZES.B;
    size = size * min;
    if (common_validation_1.isInstanceOf(files, File)) {
        files = [files];
    }
    for (var _i = 0, _a = Array.from(files); _i < _a.length; _i++) {
        var file = _a[_i];
        if (!file_validation_1.isFile(file)) {
            filesInvalid.push({ error: "NOT_FILE" });
        }
        if (number_validation_1.isLess(file.size, size)) {
            filesInvalid.push({
                filename: file.name,
                fileSizeInBytes: file.size,
                mimeType: file.type,
                error: "SIZE",
            });
        }
    }
    return {
        minSize: size,
        typeDefined: type,
        valid: common_1.isEmpty(filesInvalid),
        filesInvalid: filesInvalid,
    };
};
exports.minSize = minSize;
//# sourceMappingURL=min-size.validation.js.map