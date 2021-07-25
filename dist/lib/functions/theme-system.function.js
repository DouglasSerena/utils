"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.themeSystem = void 0;
var themeSystem = function () {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};
exports.themeSystem = themeSystem;
//# sourceMappingURL=theme-system.function.js.map