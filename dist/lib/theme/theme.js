"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Theme = exports.theme = void 0;
var get_node_function_1 = require("../functions/object/get-node.function");
var merge_object_function_1 = require("../functions/object/merge-object.function");
var theme_system_function_1 = require("../functions/theme-system.function");
var validate_validation_1 = require("../validations/validate.validation");
var _themes = {};
var _config = {
    prefix: "color",
    use: theme_system_function_1.themeSystem() || "light",
    disableSystemBasedColorShift: false,
    _element: document.createElement("style"),
};
(_b = (_a = window === null || window === void 0 ? void 0 : window.matchMedia) === null || _a === void 0 ? void 0 : _a.call(window, "(prefers-color-scheme: dark)")) === null || _b === void 0 ? void 0 : _b.addEventListener("change", function (event) {
    if (validate_validation_1.validate(_config.disableSystemBasedColorShift).isFalse()) {
        theme().change(theme_system_function_1.themeSystem() || "light");
    }
});
function theme(themes, config) {
    return new Theme(themes, config);
}
exports.theme = theme;
var Theme = /** @class */ (function () {
    function Theme(themes, config) {
        merge_object_function_1.mergeObject(_themes, themes);
        merge_object_function_1.mergeObject(_config, config);
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
            return theme_system_function_1.themeSystem() || "light";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Theme.prototype, "isDark", {
        get: function () {
            return validate_validation_1.validate(this.use).isEqual("dark");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Theme.prototype, "isLight", {
        get: function () {
            return validate_validation_1.validate(this.use).isEqual("light");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Theme.prototype, "isNoPreference", {
        get: function () {
            return validate_validation_1.validate(this.use).isEqual("no-preference");
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
        document.body.classList.remove("theme-dark", "theme-light", "theme-no-preference");
        document.body.classList.add("theme-" + _config.use);
    };
    Theme.prototype.getColor = function (colors, currentTheme) {
        if (currentTheme === void 0) { currentTheme = true; }
        var nodes = colors.split(".");
        if (currentTheme) {
            nodes.unshift(this.use);
        }
        var color = get_node_function_1.getNode(this.themes, nodes);
        if (validate_validation_1.validate(color).isObject()) {
            return color.default;
        }
        return color;
    };
    Theme.prototype.generatorStyle = function () {
        var style = ["color-scheme: " + this.use];
        var colors = _themes[this.use];
        if (validate_validation_1.validate(_themes.global).isObject()) {
            style = style.concat(this.generatorStyleContent(_themes.global));
        }
        if (validate_validation_1.validate(colors).isObject()) {
            style = style.concat(this.generatorStyleContent(colors));
        }
        return ":root{" + style.join(";") + ";}";
    };
    Theme.prototype.generatorStyleContent = function (colors) {
        var _this = this;
        return Object.keys(colors).reduce(function (prev, colorType) {
            if (validate_validation_1.validate(colors[colorType]).isString()) {
                prev.push("--" + _this.prefix + "-" + colorType + ": " + colors[colorType]);
            }
            else {
                Object.keys(colors[colorType]).forEach(function (colorName) {
                    var value = colors[colorType][colorName];
                    if (validate_validation_1.validate(colorName).isEqual("default")) {
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
    merge_object_function_1.mergeObject(_config, config);
};
theme.theme = function (themes) {
    merge_object_function_1.mergeObject(_themes, themes);
};
theme.isTheme = function (prop) { return validate_validation_1.validate(prop).isInstanceof(Theme); };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdGhlbWUvdGhlbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDJFQUFnRTtBQUNoRSxtRkFBd0U7QUFDeEUsNEVBQWlFO0FBQ2pFLDBFQUE4RDtBQUc5RCxJQUFJLE9BQU8sR0FBVyxFQUFFLENBQUM7QUFDekIsSUFBSSxPQUFPLEdBQWlCO0lBQzFCLE1BQU0sRUFBRSxPQUFPO0lBQ2YsR0FBRyxFQUFFLG1DQUFXLEVBQUUsSUFBSSxPQUFPO0lBQzdCLDRCQUE0QixFQUFFLEtBQUs7SUFDbkMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDO0NBQzFDLENBQUM7QUFFRixNQUFBLE1BQUEsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLFVBQVUsK0NBQWxCLE1BQU0sRUFBZSw4QkFBOEIsQ0FBQywwQ0FBRSxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsVUFBQyxLQUFLO0lBQ3JGLElBQUksOEJBQVEsQ0FBQyxPQUFPLENBQUMsNEJBQTRCLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtRQUM1RCxLQUFLLEVBQUUsQ0FBQyxNQUFNLENBQUMsbUNBQVcsRUFBRSxJQUFJLE9BQU8sQ0FBQyxDQUFDO0tBQzFDO0FBQ0gsQ0FBQyxDQUFDLENBQUM7QUFFSCxTQUFnQixLQUFLLENBQUMsTUFBZSxFQUFFLE1BQXFCO0lBQzFELE9BQU8sSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ25DLENBQUM7QUFGRCxzQkFFQztBQUVEO0lBdUJFLGVBQVksTUFBZSxFQUFFLE1BQXFCO1FBQ2hELG1DQUFXLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzdCLG1DQUFXLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBRTdCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJ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