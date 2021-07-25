"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Theme = exports.theme = void 0;
var functions_1 = require("../functions");
var validations_1 = require("../validations");
var _themes = {};
var _config = {
    prefix: "color",
    use: functions_1.themeSystem() || "light",
    disableSystemBasedColorShift: false,
    _element: document.createElement("style"),
};
(_b = (_a = window === null || window === void 0 ? void 0 : window.matchMedia) === null || _a === void 0 ? void 0 : _a.call(window, "(prefers-color-scheme: dark)")) === null || _b === void 0 ? void 0 : _b.addEventListener("change", function (event) {
    if (validations_1.validate(_config.disableSystemBasedColorShift).isFalse()) {
        theme().change(functions_1.themeSystem() || "light");
    }
});
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
    Object.defineProperty(Theme.prototype, "prefix", {
        get: function () {
            return _config.prefix;
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
    Object.defineProperty(Theme.prototype, "themeSystem", {
        get: function () {
            return functions_1.themeSystem() || "light";
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
        _config = {
            use: this.themeSystem,
            _style: "",
            prefix: "color",
            disableChangeScheme: false,
            _element: _config._element,
        };
    };
    Theme.prototype.change = function (theme) {
        _config.use = theme;
        this.createStyle();
    };
    Theme.prototype.createStyle = function () {
        _config._style = this.generatorStyle();
        _config._element.innerHTML = this.style;
    };
    Theme.prototype.getColor = function (colors, currentTheme) {
        if (currentTheme === void 0) { currentTheme = true; }
        var nodes = colors.split(".");
        if (currentTheme) {
            nodes.unshift(this.use);
        }
        var color = functions_1.getNode(this.themes, nodes);
        if (validations_1.validate(color).isObject()) {
            return color.default;
        }
        return color;
    };
    Theme.prototype.generatorStyle = function () {
        var style = ["color-scheme: " + this.use];
        var colors = _themes[this.use];
        if (validations_1.validate(_themes.global).isObject()) {
            style = style.concat(this.generatorStyleContent(_themes.global));
        }
        if (validations_1.validate(colors).isObject()) {
            style = style.concat(this.generatorStyleContent(colors));
        }
        return ":root{" + style.join(";") + ";}";
    };
    Theme.prototype.generatorStyleContent = function (colors) {
        var _this = this;
        return Object.keys(colors).reduce(function (prev, colorType) {
            if (validations_1.validate(colors[colorType]).isString()) {
                prev.push("--" + _this.prefix + "-" + colorType + ": " + colors[colorType]);
            }
            else {
                Object.keys(colors[colorType]).forEach(function (colorName) {
                    var value = colors[colorType][colorName];
                    if (validations_1.validate(colorName).isEqual("default")) {
                        prev.push("--" + _this.prefix + "-" + colorType + ": " + value);
                    }
                    else {
                        prev.push("--" + _this.prefix + "-" + colorType + "-" + colorName + ": " + value);
                    }
                });
            }
            return prev;
        }, []);
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