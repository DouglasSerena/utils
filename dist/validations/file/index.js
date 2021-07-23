var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../common", "./is-allow-extension.validation", "./min-size.validation", "./max-size.validation"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isFile = exports.RESOLUTION_HEIGHT = exports.RESOLUTION_WIDTH = exports.BIT_SIZES = void 0;
    var common_1 = require("../common");
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
    var isFile = function (file) { return common_1.isInstance(file, File); };
    exports.isFile = isFile;
    __exportStar(require("./is-allow-extension.validation"), exports);
    __exportStar(require("./min-size.validation"), exports);
    __exportStar(require("./max-size.validation"), exports);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdmFsaWRhdGlvbnMvZmlsZS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBQUEsb0NBQXVDO0lBSTFCLFFBQUEsU0FBUyxHQUFHO1FBQ3ZCLENBQUMsRUFBRSxDQUFDO1FBQ0osRUFBRSxFQUFFLElBQUk7UUFDUixFQUFFLEVBQUUsT0FBTztRQUNYLEVBQUUsRUFBRSxVQUFVO1FBQ2QsRUFBRSxFQUFFLGFBQWE7S0FDbEIsQ0FBQztJQUNXLFFBQUEsZ0JBQWdCLEdBQUc7UUFDOUIsRUFBRSxFQUFFLElBQUk7UUFDUixPQUFPLEVBQUUsSUFBSTtRQUNiLE9BQU8sRUFBRSxJQUFJO1FBQ2IsT0FBTyxFQUFFLElBQUk7UUFDYixHQUFHLEVBQUUsSUFBSTtLQUNWLENBQUM7SUFDVyxRQUFBLGlCQUFpQixHQUFHO1FBQy9CLEVBQUUsRUFBRSxHQUFHO1FBQ1AsT0FBTyxFQUFFLEdBQUc7UUFDWixPQUFPLEVBQUUsSUFBSTtRQUNiLE9BQU8sRUFBRSxJQUFJO1FBQ2IsR0FBRyxFQUFFLElBQUk7S0FDVixDQUFDO0lBU0YsSUFBTSxNQUFNLEdBQUcsVUFBQyxJQUFTLElBQUssT0FBQSxtQkFBVSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBdEIsQ0FBc0IsQ0FBQztJQUU1Qyx3QkFBTTtJQUNmLGtFQUFnRDtJQUNoRCx3REFBc0M7SUFDdEMsd0RBQXNDIn0=