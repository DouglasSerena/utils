"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maxSize = void 0;
var file_validation_1 = require("./file.validation");
var common_validation_1 = require("../common/common.validation");
var number_validation_1 = require("../number.validation");
var is_empty_validation_1 = require("../common/is-empty.validation");
var maxSize = function (files, max, type) {
    if (type === void 0) { type = "KB"; }
    var filesInvalid = [];
    files = files || [];
    var size = file_validation_1.BIT_SIZES[type] || file_validation_1.BIT_SIZES.B;
    size = size * max;
    if (common_validation_1.isInstanceof(files, File)) {
        files = [files];
    }
    for (var _i = 0, _a = Array.from(files); _i < _a.length; _i++) {
        var file = _a[_i];
        if (!file_validation_1.isFile(file)) {
            filesInvalid.push({ error: "NOT_FILE" });
        }
        if (number_validation_1.isMore(file.size, size)) {
            filesInvalid.push({
                filename: file.name,
                fileSizeInBytes: file.size,
                mimeType: file.type,
                error: "SIZE",
            });
        }
    }
    return {
        maxSize: size,
        typeDefined: type,
        valid: is_empty_validation_1.isEmpty(filesInvalid),
        filesInvalid: filesInvalid,
    };
};
exports.maxSize = maxSize;
//# sourceMappingURL=max-size.validation.js.map