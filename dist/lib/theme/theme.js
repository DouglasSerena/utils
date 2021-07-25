"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Theme = exports.theme = void 0;
var functions_1 = require("../functions");
var validations_1 = require("../validations");
var _themes = {};
var _config = {
    use: "dark",
    _element: document.createElement("style"),
};
function theme(themes, config) {
    return new Theme(themes, config);
}
exports.theme = theme;
var Theme = /** @class */ (function () {
    function Theme(themes, config) {
        functions_1.mergeObject(_themes, themes);
        functions_1.mergeObject(_config, config);
        if (!document.head.contains(this.element)) {
            document.head.appendChild(this.element);
        }
    }
    Object.defineProperty(Theme.prototype, "themes", {
        get: function () {
            return _themes;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Theme.prototype, "style", {
        get: function () {
            return _config._style;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Theme.prototype, "use", {
        get: function () {
            return _config.use;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Theme.prototype, "config", {
        get: function () {
            return _config;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Theme.prototype, "element", {
        get: function () {
            return _config._element;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Theme.prototype, "isDark", {
        get: function () {
            return validations_1.validate(this.use).isEqual("dark");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Theme.prototype, "isLight", {
        get: function () {
            return validations_1.validate(this.use).isEqual("light");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Theme.prototype, "isNoPreference", {
        get: function () {
            return validations_1.validate(this.use).isEqual("no-preference");
        },
        enumerable: false,
        configurable: true
    });
    Theme.prototype.reset = function () {
        _themes = {};
    };
    Theme.prototype.change = function (theme) {
        _config.use = theme;
        this.createStyle();
    };
    Theme.prototype.createStyle = function () {
        _config._style = this.generatorStyle();
        _config._element.innerHTML = this.style;
    };
    Theme.prototype.generatorStyle = function () {
        var style = ["color-scheme: " + this.use];
        var colors = _themes[this.use];
        Object.keys(colors).forEach(function (colorType) {
            if (validations_1.validate(colors[colorType]).isString()) {
                style.push("--color-" + colorType + ": " + colors[colorType]);
            }
            else {
                Object.keys(colors[colorType]).forEach(function (colorName) {
                    var value = colors[colorType][colorName];
                    if (validations_1.validate(colorName).isEqual("default")) {
                        style.push("--color-" + colorType + ": " + value);
                    }
                    else {
                        style.push("--color-" + colorType + "-" + colorName + ": " + value);
                    }
                });
            }
        });
        return ":root{" + style.join(";") + ";}";
    };
    return Theme;
}());
exports.Theme = Theme;
theme.config = function (config) {
    functions_1.mergeObject(_config, config);
};
theme.theme = function (themes) {
    functions_1.mergeObject(_themes, themes);
};
theme.isTheme = function (prop) { return validations_1.validate(prop).isInstanceOf(Theme); };
//# sourceMappingURL=theme.js.map