"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFile = exports.RESOLUTION_HEIGHT = exports.RESOLUTION_WIDTH = exports.BIT_SIZES = void 0;
var common_validation_1 = require("../common/common.validation");
exports.BIT_SIZES = {
    B: 1,
    KB: 1024,
    MB: 1048576,
    GB: 1073741824,
    TB: 1099511627776,
};
exports.RESOLUTION_WIDTH = {
    HD: 1280,
    HD_MORE: 1366,
    FULL_HD: 1920,
    QUAD_HD: 2560,
    UHD: 3840,
};
exports.RESOLUTION_HEIGHT = {
    HD: 720,
    HD_MORE: 768,
    FULL_HD: 1080,
    QUAD_HD: 1440,
    UHD: 2160,
};
var isFile = function (file) { return common_validation_1.isInstance(file, File); };
exports.isFile = isFile;
//# sourceMappingURL=file.validation.js.map