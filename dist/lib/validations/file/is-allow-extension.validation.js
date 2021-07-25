"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAllowExtensions = void 0;
var common_validation_1 = require("../common/common.validation");
var number_validation_1 = require("../number.validation");
var is_empty_validation_1 = require("../common/is-empty.validation");
var isAllowExtensions = function (files, extensions) {
    var filesInvalid = [];
    files = files || [];
    if (common_validation_1.isInstanceof(files, File)) {
        files = [files];
    }
    for (var _i = 0, _a = Array.from(files); _i < _a.length; _i++) {
        var file = _a[_i];
        var type = [];
        if (common_validation_1.notIsInstanceof(file, File)) {
            filesInvalid.push({ error: "NOT_FILE" });
        }
        for (var _b = 0, extensions_1 = extensions; _b < extensions_1.length; _b++) {
            var extension = extensions_1[_b];
            type = file.name.split(".");
            if (number_validation_1.isLess(type.length, 2)) {
                filesInvalid.push({
                    filename: file.name,
                    mimeType: file.type,
                    error: "WITHOUT_EXTENSION",
                });
            }
            if (common_validation_1.isDifferent(extension, type[type.length - 1])) {
                filesInvalid.push({
                    filename: file.name,
                    mimeType: file.type,
                    extension: type[type.length - 1],
                    error: null,
                });
            }
        }
    }
    return {
        allowedExtensions: extensions,
        valid: is_empty_validation_1.isEmpty(filesInvalid),
        filesInvalid: filesInvalid,
    };
};
exports.isAllowExtensions = isAllowExtensions;
//# sourceMappingURL=is-allow-extension.validation.js.map