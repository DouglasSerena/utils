// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../src/validations/common/is-cnpj.validation.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isCnpj = isCnpj;

var __spreadArray = void 0 && (void 0).__spreadArray || function (to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};

function isCnpj(cnpj) {
  if (!cnpj) return false;
  cnpj = cnpj.replace(/\D/g, "");

  var cpfInvalid = __spreadArray(__spreadArray(__spreadArray([], ["00000000000000", "11111111111111", "22222222222222", "33333333333333"], false), ["44444444444444", "55555555555555", "66666666666666", "77777777777777"], false), ["88888888888888", "99999999999999"], false);

  if (cpfInvalid.includes(cnpj) || cnpj.length !== 14) {
    return false;
  }

  var initPart = cnpj.substr(0, 12).split("");
  var firstDigit = Number.parseInt(cnpj.charAt(12));
  var firstDigitGenerated = calcDigit(initPart, 5);

  if (firstDigit !== firstDigitGenerated) {
    return false;
  }

  var secondaryPart = cnpj.substr(0, 13).split("");
  var secondaryDigit = Number.parseInt(cnpj.charAt(13));
  var secondaryDigitGenerated = calcDigit(secondaryPart, 6);

  if (secondaryDigit !== secondaryDigitGenerated) {
    return false;
  }

  return true;
}

function calcDigit(parteCNPJ, multi) {
  var generatedDigit = 0;
  var valueTotal = 0;
  valueTotal = parteCNPJ.reduce(function (result, currentNumber) {
    result += Number.parseInt(currentNumber) * multi--;

    if (multi < 2) {
      multi = 9;
    }

    return result;
  }, 0);

  if (valueTotal % 11 < 2) {
    generatedDigit = 0;
  } else {
    generatedDigit = 11 - valueTotal % 11;
  }

  return generatedDigit;
}
},{}],"../src/validations/common/is-cpf.validation.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isCpf = isCpf;

var __spreadArray = void 0 && (void 0).__spreadArray || function (to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};

function isCpf(cpf) {
  if (!cpf) return false;
  cpf = cpf.replace(/\D/g, "");

  var cpfInvalid = __spreadArray(__spreadArray(__spreadArray([], ["00000000000", "11111111111", "22222222222", "33333333333"], false), ["44444444444", "55555555555", "66666666666", "77777777777"], false), ["88888888888", "99999999999"], false);

  if (cpfInvalid.includes(cpf) || cpf.length !== 11) {
    return false;
  }

  var initPart = cpf.substr(0, 9).split("");
  var firstDigit = Number.parseInt(cpf.charAt(9));
  var firstDigitGenerated = calcDigit(initPart, 10);

  if (firstDigit !== firstDigitGenerated) {
    return false;
  }

  var secondaryPart = cpf.substr(0, 10).split("");
  var secondaryDigit = Number.parseInt(cpf.charAt(10));
  var secondaryDigitGenerated = calcDigit(secondaryPart, 11);

  if (secondaryDigit !== secondaryDigitGenerated) {
    return false;
  }

  return true;
}

function calcDigit(parteCPF, multi) {
  var generatedDigit = 0;
  var valueTotal = 0;
  valueTotal = parteCPF.reduce(function (result, currentNumber) {
    return result + Number.parseInt(currentNumber) * multi--;
  }, 0);
  generatedDigit = 11 - valueTotal % 11;

  if (generatedDigit > 9) {
    generatedDigit = 0;
  }

  return generatedDigit;
}
},{}],"../src/validations/common/is-empty.validation.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isEmpty = isEmpty;

function isEmpty(item) {
  var _a;

  if (!item) {
    return true;
  }

  if (item instanceof Array) {
    return (item === null || item === void 0 ? void 0 : item.length) === 0;
  }

  if (typeof item === "string") {
    return item.length === 0;
  }

  if (typeof item === "number") {
    return item === 0;
  }

  return ((_a = Object.keys(item)) === null || _a === void 0 ? void 0 : _a.length) === 0;
}
},{}],"../src/validations/common/common.validation.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isCpfOrCnpj = exports.isUndefined = exports.isNull = exports.isArray = exports.isFalsy = exports.isTruthy = exports.isFill = void 0;

var _isCnpj = require("./is-cnpj.validation");

var _isCpf = require("./is-cpf.validation");

var _isEmpty = require("./is-empty.validation");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var isFill = function isFill(item) {
  return !(0, _isEmpty.isEmpty)(item);
};

exports.isFill = isFill;

var isTruthy = function isTruthy(value) {
  return !!value;
};

exports.isTruthy = isTruthy;

var isFalsy = function isFalsy(value) {
  return !value;
};

exports.isFalsy = isFalsy;

var isArray = function isArray(value) {
  return _typeof(value) === "object" && value instanceof Array;
};

exports.isArray = isArray;

var isNull = function isNull(value) {
  return value === null;
};

exports.isNull = isNull;

var isUndefined = function isUndefined(value) {
  return value === undefined;
};

exports.isUndefined = isUndefined;

var isCpfOrCnpj = function isCpfOrCnpj(value) {
  value = value.replace(/\D/g, "");
  return value.length <= 11 ? (0, _isCpf.isCpf)(value) : (0, _isCnpj.isCnpj)(value);
};

exports.isCpfOrCnpj = isCpfOrCnpj;
},{"./is-cnpj.validation":"../src/validations/common/is-cnpj.validation.ts","./is-cpf.validation":"../src/validations/common/is-cpf.validation.ts","./is-empty.validation":"../src/validations/common/is-empty.validation.ts"}],"../src/functions/object/extends.function.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.$extends = $extends;
exports.merge = merge;

var _common = require("../../validations/common/common.validation");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function $extends(objectMerge) {
  var objects = [];

  for (var _i = 1; _i < arguments.length; _i++) {
    objects[_i - 1] = arguments[_i];
  }

  if ((0, _common.isFill)(objects)) {
    objects.forEach(function (object) {
      if ((0, _common.isFill)(object)) {
        merge(objectMerge, object);
      }
    });
  }

  return objectMerge;
}

function merge(objectMerge, object) {
  return Object.keys(object).reduce(function (prev, key) {
    if (_typeof(object[key]) === "object" && !(0, _common.isArray)(object[key]) && (0, _common.isUndefined)(object[key].name)) {
      prev[key] = merge(prev[key], object[key]);
    } else {
      prev[key] = object[key];
    }

    return prev;
  }, objectMerge || {});
}
},{"../../validations/common/common.validation":"../src/validations/common/common.validation.ts"}],"../src/resize/resize.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resize = resize;
exports.Resize = void 0;

var _extends = require("../functions/object/extends.function");

function resize(element, config) {
  return new Resize(element, config);
}

var Resize =
/** @class */
function () {
  function Resize(element, config) {
    this.element = element;
    this._overlay = document.createElement("div");
    this._control = document.createElement("div");
    this._config = {
      height: {
        max: 5000,
        min: 20
      },
      width: {
        max: 5000,
        min: 20
      },
      resize: [],
      positionControl: -3,
      size: 6
    };
    this._controls = [];
    this.isDisabled = false;
    this._config = (0, _extends.$extends)({}, this._config, config);

    this._init();
  }
  /**
   * @public
   * @description Inicia o redimensionamento */


  Resize.prototype._init = function () {
    this._createOverlay();

    this._control.style.pointerEvents = "all";
    this._control.style.position = "absolute";
    this._control.style.userSelect = "none";
    this._control.style.zIndex = "1000";
    this.update();
  };
  /**
   * @public
   * @description Atualiza os controladores, e aceita novos */


  Resize.prototype.update = function (resize) {
    if (resize === void 0) {
      resize = [];
    }

    this._config.resize = this._config.resize.concat(resize).filter(function (value, _, list) {
      return list.includes(value);
    });
    this.destroy();

    for (var _i = 0, _a = this._config.resize; _i < _a.length; _i++) {
      var type = _a[_i];

      this._createControl(type);
    }
  };
  /**
   * @public
   * @description Desabilita o redimensionamento */


  Resize.prototype.disabled = function () {
    if (this.isDisabled) {
      this.isDisabled = false;
      this.update();
    } else {
      this.isDisabled = true;
      this.destroy();
    }
  };
  /**
   * @public
   * @description Destroi todos os controladores de redimensionamento */


  Resize.prototype.destroy = function () {
    if (this._controls.length > 0) {
      for (var _i = 0, _a = this._controls; _i < _a.length; _i++) {
        var _b = _a[_i],
            control = _b.control,
            mousemove = _b.mousemove;
        control.remove();
        control.removeEventListener("mousemove", mousemove);
      }

      this._overlay.remove();

      this._controls = [];
    }
  };
  /**
   * @private
   * @description Cria os controladores de redimensionamento */


  Resize.prototype._createControl = function (type) {
    var _this = this;

    var control = this._control.cloneNode();

    control.classList.add("control-resize");
    var controlStyle = control.style;
    var controls = {
      TOP: function TOP() {
        controlStyle.inset = _this._config.positionControl + "px 0 auto 0";
        controlStyle.cursor = "n-resize";
        controlStyle.height = _this._config.size + "px";
      },
      TOP_RIGHT: function TOP_RIGHT() {
        controlStyle.inset = _this._config.positionControl + "px " + _this._config.positionControl + "px auto auto";
        controlStyle.cursor = "ne-resize";
        controlStyle.height = _this._config.size + "px";
        controlStyle.width = _this._config.size + "px";
      },
      RIGHT: function RIGHT() {
        controlStyle.inset = "0 " + _this._config.positionControl + "px 0 auto";
        controlStyle.cursor = "e-resize";
        controlStyle.width = _this._config.size + "px";
      },
      BOTTOM_RIGHT: function BOTTOM_RIGHT() {
        controlStyle.inset = "auto " + _this._config.positionControl + "px " + _this._config.positionControl + "px auto";
        controlStyle.cursor = "se-resize";
        controlStyle.height = _this._config.size + "px";
        controlStyle.width = _this._config.size + "px";
      },
      BOTTOM: function BOTTOM() {
        controlStyle.inset = "auto 0 " + _this._config.positionControl + "px 0";
        controlStyle.cursor = "s-resize";
        controlStyle.height = _this._config.size + "px";
      },
      BOTTOM_LEFT: function BOTTOM_LEFT() {
        controlStyle.inset = "auto auto " + _this._config.positionControl + "px " + _this._config.positionControl + "px";
        controlStyle.cursor = "sw-resize";
        controlStyle.height = _this._config.size + "px";
        controlStyle.width = _this._config.size + "px";
      },
      LEFT: function LEFT() {
        controlStyle.inset = "0 auto 0 " + _this._config.positionControl + "px";
        controlStyle.cursor = "w-resize";
        controlStyle.width = _this._config.size + "px";
      },
      TOP_LEFT: function TOP_LEFT() {
        controlStyle.inset = _this._config.positionControl + "px auto auto  " + _this._config.positionControl + "px";
        controlStyle.cursor = "nw-resize";
        controlStyle.height = _this._config.size + "px";
        controlStyle.width = _this._config.size + "px";
      }
    };
    controls[type]();
    this.element.appendChild(control);

    var mousemove = function mousemove() {
      _this._overlay.style.cursor = controlStyle.cursor;
      document.body.appendChild(_this._overlay);

      var mousemove = function mousemove(event) {
        var rect = _this._rect(type, event.x, event.y);

        _this._setSize("width", rect.width);

        _this._setSize("height", rect.height);

        _this.element.dispatchEvent(new Event("resize"));
      };

      var mouseup = function mouseup() {
        _this._overlay.remove();

        window.removeEventListener("mousemove", mousemove);
        window.removeEventListener("mouseup", mouseup);
      };

      window.addEventListener("mousemove", mousemove);
      window.addEventListener("mouseup", mouseup);
    };

    control.addEventListener("mousedown", mousemove);

    this._controls.push({
      control: control,
      mousemove: mousemove
    });
  };
  /**
   * @private
   * @description Cria um overlay para deixar em cima da tela para
   *  não haver cliques em local não desejado */


  Resize.prototype._createOverlay = function () {
    var overlayStyle = this._overlay.style;
    overlayStyle.userSelect = "none";
    overlayStyle.position = "fixed";
    overlayStyle.inset = "0";
  };
  /**
   * @private
   * @description Seta a largura ou altura do elemento, e valida se esta no maximo ou no minimo */


  Resize.prototype._setSize = function (type, value) {
    var _a = this._config[type],
        max = _a.max,
        min = _a.min;

    if (value >= min && value <= max) {
      this.element.style[type] = value + "px";
    } else {
      this.element.style[type] = (value < min ? min : max) + "px";
    }
  };
  /**
   * @private
   * @description Calcula o novo tamanho do element */


  Resize.prototype._rect = function (operator, clientX, clientY) {
    var _a = this.element.getBoundingClientRect(),
        left = _a.left,
        right = _a.right,
        top = _a.top,
        bottom = _a.bottom,
        width = _a.width,
        height = _a.height;
    /**
     *  @description Calculo principal:
     * Height: 200
     * AxisX: 100
     * MouseX: 110
     * Calculo TOP: 200 + (100 - 110) = 210
     * Este calculo varia dependendo da forma que for fazer a verificação */


    var operators = {
      TOP: function TOP() {
        return {
          width: width,
          height: height + (top - clientY)
        };
      },
      TOP_RIGHT: function TOP_RIGHT() {
        return {
          height: operators.TOP().height,
          width: operators.RIGHT().width
        };
      },
      RIGHT: function RIGHT() {
        return {
          height: height,
          width: width - (right - clientX)
        };
      },
      BOTTOM_RIGHT: function BOTTOM_RIGHT() {
        return {
          height: operators.BOTTOM().height,
          width: operators.RIGHT().width
        };
      },
      BOTTOM: function BOTTOM() {
        return {
          width: width,
          height: height - (bottom - clientY)
        };
      },
      BOTTOM_LEFT: function BOTTOM_LEFT() {
        return {
          height: operators.BOTTOM().height,
          width: operators.LEFT().width
        };
      },
      LEFT: function LEFT() {
        return {
          height: height,
          width: width + (left - clientX)
        };
      },
      TOP_LEFT: function TOP_LEFT() {
        return {
          height: operators.TOP().height,
          width: operators.LEFT().width
        };
      }
    };
    return operators[operator]();
  };

  return Resize;
}();

exports.Resize = Resize;
},{"../functions/object/extends.function":"../src/functions/object/extends.function.ts"}],"../src/resize/resize.type.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
},{}],"../src/selected-list/selected-list.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectedList = selectedList;
exports.isSelectedList = exports.SelectedList = void 0;

function selectedList() {
  return new SelectedList();
}

var SelectedList =
/** @class */
function () {
  function SelectedList() {
    this.list = [];
  }

  Object.defineProperty(SelectedList.prototype, "length", {
    get: function get() {
      return this.list.length;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(SelectedList.prototype, "isEmpty", {
    get: function get() {
      return this.length === 0;
    },
    enumerable: false,
    configurable: true
  });

  SelectedList.prototype[Symbol.iterator] = function () {
    var index = -1;
    var list = this.list;
    return {
      next: function next() {
        return {
          value: list[++index],
          done: !(index in list)
        };
      }
    };
  };

  SelectedList.prototype.select = function () {
    var _a;

    var value = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      value[_i] = arguments[_i];
    }

    return (_a = this.list).push.apply(_a, value);
  };

  SelectedList.prototype.unselect = function (value) {
    if (!(typeof value === "number")) {
      value = this.list.indexOf(value);
    }

    return this.list.splice(value, 1);
  };

  SelectedList.prototype.filter = function (predicate) {
    this.list = this.list.filter(predicate);
    return this.list;
  };

  SelectedList.prototype.map = function (predicate) {
    this.list = this.list.map(predicate);
    return this.list;
  };

  SelectedList.prototype.forEach = function (predicate) {
    this.list.forEach(predicate);
  };

  SelectedList.prototype.find = function (predicate) {
    return this.list.find(predicate);
  };

  SelectedList.prototype.findIndex = function (predicate) {
    return this.list.findIndex(predicate);
  };
  /**
   * @public
   * @description Esta função limpara a pilha inteira e ira fazer o reset o contador */


  SelectedList.prototype.clear = function () {
    return this.list.splice(0);
  };

  return SelectedList;
}();

exports.SelectedList = SelectedList;

var isSelectedList = function isSelectedList(prop) {
  return prop instanceof SelectedList;
};

exports.isSelectedList = isSelectedList;
selectedList.isSelectedList = isSelectedList;
},{}],"../src/functions/coerce-array.function.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.coerceArray = coerceArray;

function coerceArray(params) {
  return Array.isArray(params) ? params : [params];
}
},{}],"../src/functions/host-platform.function.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hostPlatform = hostPlatform;

/**
 * @function
 * @description Verifica em qual plataforma esta sendo rodado o javascript */
function hostPlatform() {
  var appleDevices = ["Mac", "iPhone", "iPad", "iPhone"];
  return appleDevices.some(function (device) {
    return navigator.userAgent.includes(device);
  }) ? "apple" : "pc";
}
},{}],"../src/keyboard-shortcut/keyboard.polyfill.js":[function(require,module,exports) {
// polyfill
if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function (s) {
    var matches = (this.document || this.ownerDocument).querySelectorAll(s),
        i = matches.length;

    while (--i >= 0 && matches.item(i) !== this) {}

    return i > -1;
  };
}
},{}],"../src/keyboard-shortcut/keyboard-shortcut.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.keyboardShortcut = keyboardShortcut;
exports.KeyboardShortcut = void 0;

var _coerceArray = require("../functions/coerce-array.function");

var _hostPlatform = require("../functions/host-platform.function");

require("./keyboard.polyfill.js");

var __assign = void 0 && (void 0).__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var shortcutsMap = new Map();
var configDefault = {
  hidden: false,
  trigger: "keydown",
  preventDefault: true,
  stopPropagation: false,
  targets: document.documentElement,
  excluded: ["textarea", "input", "select", "[contenteditable]"]
};
/**
 * @function
 * @description Funções para deixa a teclas em um padrão */

function normalize(shortcuts, platform) {
  if (platform === void 0) {
    platform = (0, _hostPlatform.hostPlatform)();
  }

  var normalize = function normalize(shortcut) {
    shortcut = shortcut.toLowerCase();

    switch (platform) {
      case "pc":
        return shortcut.split(".").map(function (shortcut) {
          return shortcut === "meta" ? "ctrl" : shortcut;
        }).join(".");

      default:
        return shortcut;
    }
  };

  if (Array.isArray(shortcuts)) {
    return shortcuts.map(function (shortcut) {
      return normalize(shortcut);
    });
  } else {
    return normalize(shortcuts);
  }
}

function keyboardShortcut(shortcuts, config, listener) {
  return new KeyboardShortcut(shortcuts, config, listener);
}

var KeyboardShortcut =
/** @class */
function () {
  function KeyboardShortcut(shortcuts, config, listener) {
    var _this = this;

    this.shortcuts = [];
    this.config = {};
    shortcuts = (0, _coerceArray.coerceArray)(normalize(shortcuts));
    shortcuts = shortcuts.filter(function (shortcut) {
      if (shortcutsMap.has(shortcut)) {
        console.warn("[KEYBOARD] Shortcut key \"" + shortcut + "\" already registered, so it was built from the list");
        return false;
      }

      return true;
    });

    if (shortcuts.length === 0) {
      throw new Error("[KEYBOARD] Unable to continue due to lack of valid keys to register");
    }

    this.config = Object.assign({}, configDefault);
    var _listener = listener;

    if (typeof config === "function") {
      _listener = config;
    } else {
      Object.assign(this.config, config);
    }

    var _loop_1 = function _loop_1(shortcut) {
      var handle = function handle(event) {
        if (_this._checkKeyboardShortcut(shortcut, event)) {
          for (var _i = 0, _a = _this.config.excluded; _i < _a.length; _i++) {
            var selector = _a[_i];

            if (document.activeElement.matches(selector)) {
              return;
            }
          }

          if (_this.config.preventDefault) {
            event.preventDefault();
          }

          if (_this.config.stopPropagation) {
            event.stopPropagation();
          }

          _listener(event, shortcut, event.target);
        }
      };

      for (var _a = 0, _b = (0, _coerceArray.coerceArray)(this_1.config.targets); _a < _b.length; _a++) {
        var target = _b[_a];
        target.addEventListener(this_1.config.trigger, handle);
        this_1.config.handle = handle;
      }

      shortcutsMap.set(shortcut, __assign(__assign({}, this_1.config), {
        keys: shortcut,
        listener: _listener
      }));
      this_1.shortcuts.push(shortcutsMap.get(shortcut));
    };

    var this_1 = this;

    for (var _i = 0, shortcuts_1 = shortcuts; _i < shortcuts_1.length; _i++) {
      var shortcut = shortcuts_1[_i];

      _loop_1(shortcut);
    }
  }
  /**
   * @public
   * @description Desvincular um atalho de teclado */


  KeyboardShortcut.prototype.unbindShortcut = function () {
    for (var _i = 0, _a = this.shortcuts; _i < _a.length; _i++) {
      var shortcut = _a[_i];
      keyboardShortcut.unbindShortcut(shortcut.keys);
    }
  };
  /**
   * @private
   * @description Checa se a tecla pressionada é valida */


  KeyboardShortcut.prototype._checkKeyboardShortcut = function (shortcut, event) {
    var modifiers = {
      ctrl: event.ctrlKey,
      alt: event.altKey,
      meta: event.metaKey,
      shift: event.shiftKey
    };

    for (var _i = 0, _a = shortcut.split("."); _i < _a.length; _i++) {
      var key = _a[_i];
      var modifier = modifiers[key];

      if (modifier === undefined) {
        var code = event.code.replace(/Key/i, "").toLowerCase();

        if (key !== code) {
          return false;
        }
      } else {
        if (!modifier) {
          return false;
        }
      }
    }

    return true;
  };

  return KeyboardShortcut;
}();

exports.KeyboardShortcut = KeyboardShortcut;
keyboardShortcut.shortcuts = [];
Object.defineProperty(keyboardShortcut, "shortcuts", {
  get: function get() {
    return Array.from(shortcutsMap.values()).map(function (shortcut) {
      return __assign({}, shortcut);
    });
  }
});
keyboardShortcut.group = [];
Object.defineProperty(keyboardShortcut, "group", {
  get: function get() {
    var shortcuts = Array.from(shortcutsMap.values());
    var groups = [];

    var _loop_2 = function _loop_2(shortcut) {
      if (shortcut.hidden) {
        return "continue";
      }

      var group = groups.find(function (group) {
        return group.group === shortcut.group;
      });

      if (!group) {
        group = {
          group: shortcut.group,
          shortcuts: []
        };
        groups.push(group);
      }

      var keys = normalize(shortcut.keys, (0, _hostPlatform.hostPlatform)());
      group.shortcuts.push({
        keys: keys,
        description: shortcut.description
      });
    };

    for (var _i = 0, shortcuts_2 = shortcuts; _i < shortcuts_2.length; _i++) {
      var shortcut = shortcuts_2[_i];

      _loop_2(shortcut);
    }

    return groups;
  }
});

keyboardShortcut.unbindShortcut = function (shortcuts) {
  shortcuts = (0, _coerceArray.coerceArray)(normalize(shortcuts));

  for (var _i = 0, shortcuts_3 = shortcuts; _i < shortcuts_3.length; _i++) {
    var shortcut = shortcuts_3[_i];

    if (!shortcutsMap.has(shortcut)) {
      console.warn("[KEYBOARD] Key shortcut \"" + shortcut + "\" has not been registered");
      continue;
    }

    var config = shortcutsMap.get(shortcut);

    for (var _a = 0, _b = (0, _coerceArray.coerceArray)(config.targets); _a < _b.length; _a++) {
      var target = _b[_a];
      target.removeEventListener(config.trigger, config.handle);
    }

    shortcutsMap.delete(shortcut);
  }
};

keyboardShortcut.updateShortcut = function (shortcutLast, shortcut) {
  if (!shortcutsMap.has(shortcutLast)) {
    throw new Error("[KEYBOARD] Key shortcut \"" + shortcutLast + "\" has not been registered");
  }

  var config = shortcutsMap.get(shortcutLast);
  keyboardShortcut.unbindShortcut(shortcutLast);
  return new KeyboardShortcut(shortcut, config, config.listener);
};
},{"../functions/coerce-array.function":"../src/functions/coerce-array.function.ts","../functions/host-platform.function":"../src/functions/host-platform.function.ts","./keyboard.polyfill.js":"../src/keyboard-shortcut/keyboard.polyfill.js"}],"../src/keyboard-shortcut/keyboard-shortcut.type.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
},{}],"../src/undo-redo-stack/undo-redo-stack.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.undoRedoStack = undoRedoStack;
exports.isUndoRedoStack = exports.UndoRedoStack = void 0;

function undoRedoStack(maxAmount) {
  if (maxAmount === void 0) {
    maxAmount = 100;
  }

  return new UndoRedoStack(maxAmount);
}

var UndoRedoStack =
/** @class */
function () {
  function UndoRedoStack(maxAmount) {
    if (maxAmount === void 0) {
      maxAmount = 100;
    }

    this._stack = [];
    this._current = -1;
    this._maxAmount = maxAmount;
  }

  Object.defineProperty(UndoRedoStack.prototype, "isEmptyRedo", {
    /**
     * @public
     * @description Faz a verificação se esta fazia a pilha de refazer */
    get: function get() {
      return this._current >= 0 && this._current === this.length - 1;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(UndoRedoStack.prototype, "isEmpty", {
    /**
     * @public
     * @description Faz a verificação se esta fazia a pilha de desfazer */
    get: function get() {
      return this._current === -1;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(UndoRedoStack.prototype, "length", {
    get: function get() {
      return this._stack.length;
    },
    enumerable: false,
    configurable: true
  });
  /**
   * @public
   * @description Executa de desfazer e decrementa o contador */

  UndoRedoStack.prototype.undo = function () {
    if (!this.isEmpty) {
      var item = this._stack[this._current];
      item.undo.call(this, item.data);
      this._current--;
      return true;
    }

    return false;
  };
  /**
   * @public
   * @description Executa de refazer e incrementa o contador caso exista um desfazer */


  UndoRedoStack.prototype.redo = function () {
    var item = this._stack[this._current + 1];

    if (item) {
      item.redo.call(this, item.data);
      this._current++;
      return true;
    }

    return false;
  };
  /**
   * @public
   * @description Ira fazer a adição das funções de desfazer e refazer no topo da pilha
   * e verificar se ja atingiu o máximo, caso que sim ele ira remover o item da da base da pilha */


  UndoRedoStack.prototype.push = function () {
    var _a;

    var perform = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      perform[_i] = arguments[_i];
    }

    if (this._maxAmount === this._current) {
      this._current--;

      this._stack.shift();
    }

    this._current++;

    this._stack.splice(this._current);

    return (_a = this._stack).push.apply(_a, perform);
  };
  /**
   * @public
   * @description Esta função limpara a pilha inteira e ira fazer o reset o contador */


  UndoRedoStack.prototype.clear = function () {
    return this._stack.splice(0);
  };

  return UndoRedoStack;
}();

exports.UndoRedoStack = UndoRedoStack;

var isUndoRedoStack = function isUndoRedoStack(prop) {
  return prop instanceof UndoRedoStack;
};

exports.isUndoRedoStack = isUndoRedoStack;
undoRedoStack.isUndoRedoStack = isUndoRedoStack;
},{}],"../src/undo-redo-stack/undo-redo-stack.type.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
},{}],"../src/monitoring/monitoring.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Monitoring = void 0;

var Monitoring =
/** @class */
function () {
  function Monitoring() {}

  Object.defineProperty(Monitoring.prototype, "isDesktop", {
    get: function get() {
      var _a;

      return (_a = window === null || window === void 0 ? void 0 : window.matchMedia) === null || _a === void 0 ? void 0 : _a.call(window, "(min-width: 960px)").matches;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Monitoring.prototype, "isTable", {
    get: function get() {
      var _a;

      return (_a = window === null || window === void 0 ? void 0 : window.matchMedia) === null || _a === void 0 ? void 0 : _a.call(window, "(min-width: 720px)").matches;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Monitoring.prototype, "isMobile", {
    get: function get() {
      var _a;

      return (_a = window === null || window === void 0 ? void 0 : window.matchMedia) === null || _a === void 0 ? void 0 : _a.call(window, "(max-width: 540px)").matches;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Monitoring.prototype, "isDark", {
    get: function get() {
      var _a;

      return (_a = window === null || window === void 0 ? void 0 : window.matchMedia) === null || _a === void 0 ? void 0 : _a.call(window, "(prefers-color-scheme: dark)").matches;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Monitoring.prototype, "isLight", {
    get: function get() {
      var _a;

      return (_a = window === null || window === void 0 ? void 0 : window.matchMedia) === null || _a === void 0 ? void 0 : _a.call(window, "(prefers-color-scheme: light)").matches;
    },
    enumerable: false,
    configurable: true
  });
  return Monitoring;
}();

exports.Monitoring = Monitoring;
},{}],"../src/monitoring/monitoring.type.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
},{}],"../src/functions/remove-accents.function.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeAccents = removeAccents;

function removeAccents(work) {
  var accents = {
    â: "a",
    Â: "A",
    à: "a",
    À: "A",
    á: "a",
    Á: "A",
    ã: "a",
    Ã: "A",
    ê: "e",
    Ê: "E",
    è: "e",
    È: "E",
    é: "e",
    É: "E",
    î: "i",
    Î: "I",
    ì: "i",
    Ì: "I",
    í: "i",
    Í: "I",
    õ: "o",
    Õ: "O",
    ô: "o",
    Ô: "O",
    ò: "o",
    Ò: "O",
    ó: "o",
    Ó: "O",
    ü: "u",
    Ü: "U",
    û: "u",
    Û: "U",
    ú: "u",
    Ú: "U",
    ù: "u",
    Ù: "U",
    ç: "c",
    Ç: "C"
  };
  return work === null || work === void 0 ? void 0 : work.replace(/[\W\[\] ]/g, function (char) {
    return accents[char] || char;
  });
}
},{}],"../src/functions/contains.function.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.contains = contains;

var _removeAccents = require("./remove-accents.function");

function contains(value, compare, options) {
  if (!value) return false;

  var _value = value.toString();

  options = Object.assign({}, {
    removeSpace: true,
    removeAccents: true,
    caseSensitive: false
  }, options);

  if (options === null || options === void 0 ? void 0 : options.removeAccents) {
    _value = (0, _removeAccents.removeAccents)(_value);

    if (typeof compare === "string") {
      compare = (0, _removeAccents.removeAccents)(compare);
    }
  }

  if (!(options === null || options === void 0 ? void 0 : options.caseSensitive)) {
    _value = _value.toLowerCase();

    if (typeof compare === "string") {
      compare = compare.toLowerCase();
    }
  }

  if (options === null || options === void 0 ? void 0 : options.removeSpace) {
    _value = _value.replace(/ +/g, "");

    if (typeof compare === "string") {
      compare = compare.replace(/ +/g, "");
    }
  }

  var match = _value === null || _value === void 0 ? void 0 : _value.match(compare);
  return !!match;
}
},{"./remove-accents.function":"../src/functions/remove-accents.function.ts"}],"../src/validations/number.validation.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isBeforeNumber = exports.isFloat = exports.isNumber = exports.isNumeric = exports.isNegative = void 0;

var _contains = require("../functions/contains.function");

var isNegative = function isNegative(value) {
  return (0, _contains.contains)(value.toString(), "-");
};

exports.isNegative = isNegative;

var isNumeric = function isNumeric(value) {
  return !isNaN(parseInt(value)) && isFinite(value);
};

exports.isNumeric = isNumeric;

var isNumber = function isNumber(value) {
  return !isNaN(parseInt(value)) && isFinite(value) && typeof value === "number";
};

exports.isNumber = isNumber;

var isFloat = function isFloat(value) {
  return isNumeric(value) && !Number.isInteger(Number(value));
};

exports.isFloat = isFloat;

var isBeforeNumber = function isBeforeNumber(value, range) {
  value = Number.parseInt(value.toString());
  return value >= (range.start || 0) && value <= range.end;
};

exports.isBeforeNumber = isBeforeNumber;
},{"../functions/contains.function":"../src/functions/contains.function.ts"}],"../src/functions/parse-number.function.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseNumber = parseNumber;

var _number = require("../validations/number.validation");

var _config = {
  decimal: ".",
  thousands: null,
  error: false
};
/**
 * @description Faz a conversão do valor em um tipo numerico
 * @param {number|string} value
 * @param {Partial<IConfigParseNumber>} [config]
 * @returns {number} */

function parseNumber(value, config) {
  config = Object.assign({}, _config, config);

  if (!(0, _number.isNumeric)(value) && typeof value === "string") {
    var negative = (0, _number.isNegative)(value);
    var decimalStr = new RegExp("\\" + (config === null || config === void 0 ? void 0 : config.decimal), "g");

    if (config.thousands) {
      var thousandsStr = new RegExp("\\" + (config === null || config === void 0 ? void 0 : config.thousands), "g");
      value = value.toString().replace(thousandsStr, "");
    }

    value = value.toString().replace(decimalStr, ".");

    var _a = value.split("."),
        prefix = _a[0],
        sufixa = _a[1];

    prefix = prefix === null || prefix === void 0 ? void 0 : prefix.replace(/\D/g, "");
    sufixa = sufixa === null || sufixa === void 0 ? void 0 : sufixa.replace(/\D/g, "");
    value = Number(prefix + "." + sufixa) || 0;

    if (negative) {
      value = -value;
    }
  } else {
    if (config === null || config === void 0 ? void 0 : config.error) new Error("Invalid Input.");
  }

  return Number(value);
}
},{"../validations/number.validation":"../src/validations/number.validation.ts"}],"../src/calc/math.calc.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.distribute = exports.increment = exports.divide = exports.multiply = exports.subtract = exports.add = void 0;

var _parseNumber = require("../functions/parse-number.function");

var convertValues = function convertValues(value, twoValue) {
  value = (0, _parseNumber.parseNumber)(value);
  twoValue = (0, _parseNumber.parseNumber)(twoValue);
  return [value, twoValue];
};

var add = function add(value, twoValue) {
  var _a = convertValues(value, twoValue),
      one = _a[0],
      two = _a[1];

  return one + two;
};

exports.add = add;

var subtract = function subtract(value, twoValue) {
  var _a = convertValues(value, twoValue),
      one = _a[0],
      two = _a[1];

  return one - two;
};

exports.subtract = subtract;

var multiply = function multiply(value, twoValue) {
  var _a = convertValues(value, twoValue),
      one = _a[0],
      two = _a[1];

  return one * two;
};

exports.multiply = multiply;

var divide = function divide(value, twoValue) {
  var _a = convertValues(value, twoValue),
      one = _a[0],
      two = _a[1];

  return one / two;
};

exports.divide = divide;

var increment = function increment(value, _increment2) {
  var _a = convertValues(value, _increment2),
      _value = _a[0],
      _increment = _a[1];

  return _increment > 0 ? Math.round(_value / _increment) * _increment : _value;
};

exports.increment = increment;

var distribute = function distribute(value, number) {
  var _a = convertValues(value, number),
      _valueInit = _a[0],
      _number = _a[1];

  var array = [];
  var index = _number;

  var _value = divide(_valueInit, number);

  for (; index > 0; index--) {
    if (index === 1) {
      array.push(subtract(_valueInit, multiply(_value, _number - 1)));
    } else {
      array.push(_value);
    }
  }

  return array;
};

exports.distribute = distribute;
},{"../functions/parse-number.function":"../src/functions/parse-number.function.ts"}],"../src/calc/calc.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calc = calc;
exports.isCalc = exports.Calc = void 0;

var _math = require("./math.calc");

var _parseNumber = require("../functions/parse-number.function");

var __spreadArray = void 0 && (void 0).__spreadArray || function (to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};

var _config = {
  decimal: ",",
  thousands: ".",
  error: false,
  precision: 2,
  increment: 0,
  round: "round"
};

function calc(value, config) {
  return new Calc(value, config);
}

var Calc =
/** @class */
function () {
  function Calc(value, config) {
    var _a;

    this.config = Object.assign({}, _config, config);
    this.precision = Math.pow(10, (_a = this.config) === null || _a === void 0 ? void 0 : _a.precision);

    this._save(value);
  }
  /**
   * @public
   * @description Converte um valor do tipo string ou Calc para um number
   * @param {CalcAny | Calc} value
   * @returns {number} */


  Calc.prototype._parse = function (value) {
    if (isCalc(value)) {
      value = value.valueRaw;
    } else {
      value = (0, _parseNumber.parseNumber)(value, this.config);
    }

    return value;
  };
  /**
   * @public
   * @description Salva o valor verificando que tipo que ele é
   * @param {CalcAny | Calc} value */


  Calc.prototype._save = function (value) {
    if (isCalc(value)) {
      this.valueRaw = value.valueRaw;
    } else {
      this.valueRaw = (0, _parseNumber.parseNumber)(value, this.config);
    }

    this.value = this._roundingNumber(this.valueRaw);
  };
  /**
   * @public
   * @description Arredonda o valor usando a configuração da classe
   * @param {number | string} value */


  Calc.prototype._roundingNumber = function (value) {
    value = Number(value) * this.precision;
    value = Number(value.toFixed(4));
    var mathRound = Math[this.config.round];
    value = mathRound(value) / this.precision;

    if (this.config.increment) {
      /**
       * @description Faz um incremento de valor
       * @example */
      value = (0, _math.increment)(value, this.config.increment) * this.precision;
      value = mathRound(value) / this.precision;
    }

    return value;
  };
  /**
   * @public
   * @description Faz a adição do valor passado via parametro no valor salvo na classe
   * @param {CalcAny | Calc} value
   * @returns {Calc}  */


  Calc.prototype.add = function (value) {
    this.valueRaw = (0, _math.add)(this.valueRaw, this._parse(value));
    this.value = this._roundingNumber(this.valueRaw);
    return this;
  };
  /**
   * @public
   * @description Faz a subtração do valor passado via parametro no valor salvo na classe
   * @param {CalcAny | Calc} value
   * @returns {Calc} */


  Calc.prototype.subtract = function (value) {
    this.valueRaw = (0, _math.subtract)(this.valueRaw, this._parse(value));
    this.value = this._roundingNumber(this.valueRaw);
    return this;
  };
  /**
   * @public
   * @description Faz a multiplicação do valor passado via parametro no valor salvo na classe
   * @param {CalcAny | Calc} value
   * @returns {Calc} */


  Calc.prototype.multiply = function (value) {
    this.valueRaw = (0, _math.multiply)(this.valueRaw, this._parse(value));
    this.value = this._roundingNumber(this.valueRaw);
    return this;
  };
  /**
   * @public
   * @description Faz a divisão do valor passado via parametro no valor salvo na classe
   * @param {CalcAny | Calc} value
   * @returns {Calc} */


  Calc.prototype.divide = function (value) {
    this.valueRaw = (0, _math.divide)(this.valueRaw, this._parse(value));
    this.value = this._roundingNumber(this.valueRaw);
    return this;
  };
  /**
   * @public
   * @description Distribui o valor salvo na classe igualmente entre a quantidade passada
   * @param {CalcAny | Calc} value
   * @returns {number[]} */


  Calc.prototype.distribute = function (amount) {
    var _this = this;

    var result = (0, _math.distribute)(this.valueRaw, this._parse(amount)).map(function (value) {
      return _this._roundingNumber(value);
    });

    var rest = this._roundingNumber((0, _math.subtract)(this.valueRaw, (0, _math.multiply)(result.pop(), result.length)));

    return __spreadArray(__spreadArray([], result, true), [rest], false);
  };
  /**
   * @public
   * @description Transforma o valor em um string
   * @returns {string} */


  Calc.prototype.toString = function () {
    return this.value.toString();
  };
  /**
   * @public
   * @description Transforma o valor do calculo em um json {value: 21.2}
   * @returns {number} */


  Calc.prototype.toJson = function () {
    return this.value;
  };

  return Calc;
}();

exports.Calc = Calc;

/**
 * @public
 * @description Configura as opções padrão da classe Calc
 * @param {Partial<IConfigCalc>} config */
calc.config = function (config) {
  Object.assign(_config, config);
};
/**
 * @public
 * @description Verifica se o parametro é do tipo Calc
 * @param {unknown} prop
 * @returns {prop is Calc} */


var isCalc = function isCalc(prop) {
  return prop instanceof Calc;
};

exports.isCalc = isCalc;
calc.isCalc = isCalc;
},{"./math.calc":"../src/calc/math.calc.ts","../functions/parse-number.function":"../src/functions/parse-number.function.ts"}],"../src/calc/calc.type.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
},{}],"../src/constant/input-mode.constant.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.INPUT_MODE = void 0;
var INPUT_MODE = ["none", "text", "decimal", "numeric", "tel", "search", "email", "url"];
exports.INPUT_MODE = INPUT_MODE;
},{}],"../src/constant/input.constant.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.INPUT_TYPE = exports.INPUT_TYPE_OTHER = exports.INPUT_TYPE_DATE = exports.INPUT_TYPE_TEXT = void 0;

var __spreadArray = void 0 && (void 0).__spreadArray || function (to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};

var INPUT_TYPE_TEXT = ["email", "number", "password", "search", "tel", "text", "url"];
exports.INPUT_TYPE_TEXT = INPUT_TYPE_TEXT;
var INPUT_TYPE_DATE = ["date", "datetime", "datetime-local", "month", "time", "week"];
exports.INPUT_TYPE_DATE = INPUT_TYPE_DATE;
var INPUT_TYPE_OTHER = ["button", "checkbox", "color", "file", "hidden", "image", "radio", "range", "submit"];
exports.INPUT_TYPE_OTHER = INPUT_TYPE_OTHER;

var INPUT_TYPE = __spreadArray(__spreadArray(__spreadArray([], INPUT_TYPE_DATE, true), INPUT_TYPE_TEXT, true), INPUT_TYPE_OTHER, true);

exports.INPUT_TYPE = INPUT_TYPE;
},{}],"../node_modules/dayjs/dayjs.min.js":[function(require,module,exports) {
var define;
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).dayjs=e()}(this,(function(){"use strict";var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",f="month",h="quarter",c="year",d="date",$="Invalid Date",l=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},m=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},g={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,f),s=n-i<0,u=e.clone().add(r+(s?-1:1),f);return+(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:f,y:c,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:h}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},D="en",v={};v[D]=M;var p=function(t){return t instanceof _},S=function(t,e,n){var r;if(!t)return D;if("string"==typeof t)v[t]&&(r=t),e&&(v[t]=e,r=t);else{var i=t.name;v[i]=t,r=i}return!n&&r&&(D=r),r||!n&&D},w=function(t,e){if(p(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},O=g;O.l=S,O.i=p,O.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function M(t){this.$L=S(t.locale,null,!0),this.parse(t)}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(O.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(l);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return O},m.isValid=function(){return!(this.$d.toString()===$)},m.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return w(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<w(t)},m.$g=function(t,e,n){return O.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!O.u(e)||e,h=O.p(t),$=function(t,e){var i=O.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},l=function(t,e){return O.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,g="set"+(this.$u?"UTC":"");switch(h){case c:return r?$(1,0):$(31,11);case f:return r?$(1,M):$(0,M+1);case o:var D=this.$locale().weekStart||0,v=(y<D?y+7:y)-D;return $(r?m-v:m+(6-v),M);case a:case d:return l(g+"Hours",0);case u:return l(g+"Minutes",1);case s:return l(g+"Seconds",2);case i:return l(g+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var n,o=O.p(t),h="set"+(this.$u?"UTC":""),$=(n={},n[a]=h+"Date",n[d]=h+"Date",n[f]=h+"Month",n[c]=h+"FullYear",n[u]=h+"Hours",n[s]=h+"Minutes",n[i]=h+"Seconds",n[r]=h+"Milliseconds",n)[o],l=o===a?this.$D+(e-this.$W):e;if(o===f||o===c){var y=this.clone().set(d,1);y.$d[$](l),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d}else $&&this.$d[$](l);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[O.p(t)]()},m.add=function(r,h){var d,$=this;r=Number(r);var l=O.p(h),y=function(t){var e=w($);return O.w(e.date(e.date()+Math.round(t*r)),$)};if(l===f)return this.set(f,this.$M+r);if(l===c)return this.set(c,this.$y+r);if(l===a)return y(1);if(l===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[l]||1,m=this.$d.getTime()+r*M;return O.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||$;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=O.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,f=n.months,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].substr(0,s)},c=function(t){return O.s(s%12||12,t,"0")},d=n.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:O.s(a+1,2,"0"),MMM:h(n.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:O.s(this.$D,2,"0"),d:String(this.$W),dd:h(n.weekdaysMin,this.$W,o,2),ddd:h(n.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:O.s(s,2,"0"),h:c(1),hh:c(2),a:d(s,u,!0),A:d(s,u,!1),m:String(u),mm:O.s(u,2,"0"),s:String(this.$s),ss:O.s(this.$s,2,"0"),SSS:O.s(this.$ms,3,"0"),Z:i};return r.replace(y,(function(t,e){return e||l[t]||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,$){var l,y=O.p(d),M=w(r),m=(M.utcOffset()-this.utcOffset())*e,g=this-M,D=O.m(this,M);return D=(l={},l[c]=D/12,l[f]=D,l[h]=D/3,l[o]=(g-m)/6048e5,l[a]=(g-m)/864e5,l[u]=g/n,l[s]=g/e,l[i]=g/t,l)[y]||g,$?D:O.a(D)},m.daysInMonth=function(){return this.endOf(f).$D},m.$locale=function(){return v[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=S(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return O.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),b=_.prototype;return w.prototype=b,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",f],["$y",c],["$D",d]].forEach((function(t){b[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),w.extend=function(t,e){return t.$i||(t(e,_,w),t.$i=!0),w},w.locale=S,w.isDayjs=p,w.unix=function(t){return w(1e3*t)},w.en=v[D],w.Ls=v,w.p={},w}));
},{}],"../node_modules/imask/esm/_rollupPluginBabelHelpers-74ba0139.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._ = _createClass;
exports.a = _classCallCheck;
exports.b = _objectWithoutProperties;
exports.c = _typeof;
exports.d = _inherits;
exports.e = _createSuper;
exports.f = _slicedToArray;
exports.g = _get;
exports.h = _getPrototypeOf;
exports.i = _set;

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    exports.c = _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    exports.c = _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  exports.h = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    exports.g = _get = Reflect.get;
  } else {
    exports.g = _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);

      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };
  }

  return _get(target, property, receiver || target);
}

function set(target, property, value, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.set) {
    set = Reflect.set;
  } else {
    set = function set(target, property, value, receiver) {
      var base = _superPropBase(target, property);

      var desc;

      if (base) {
        desc = Object.getOwnPropertyDescriptor(base, property);

        if (desc.set) {
          desc.set.call(receiver, value);
          return true;
        } else if (!desc.writable) {
          return false;
        }
      }

      desc = Object.getOwnPropertyDescriptor(receiver, property);

      if (desc) {
        if (!desc.writable) {
          return false;
        }

        desc.value = value;
        Object.defineProperty(receiver, property, desc);
      } else {
        _defineProperty(receiver, property, value);
      }

      return true;
    };
  }

  return set(target, property, value, receiver);
}

function _set(target, property, value, receiver, isStrict) {
  var s = set(target, property, value, receiver || target);

  if (!s && isStrict) {
    throw new Error('failed to set property');
  }

  return value;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
},{}],"../node_modules/imask/esm/core/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.escapeRegExp = escapeRegExp;
exports.forceDirection = forceDirection;
exports.indexInDirection = indexInDirection;
exports.isString = isString;
exports.objectIncludes = objectIncludes;
exports.posInDirection = posInDirection;
exports.DIRECTION = void 0;

var _rollupPluginBabelHelpers74ba = require("../_rollupPluginBabelHelpers-74ba0139.js");

/** Checks if value is string */
function isString(str) {
  return typeof str === 'string' || str instanceof String;
}
/**
  Direction
  @prop {string} NONE
  @prop {string} LEFT
  @prop {string} FORCE_LEFT
  @prop {string} RIGHT
  @prop {string} FORCE_RIGHT
*/


var DIRECTION = {
  NONE: 'NONE',
  LEFT: 'LEFT',
  FORCE_LEFT: 'FORCE_LEFT',
  RIGHT: 'RIGHT',
  FORCE_RIGHT: 'FORCE_RIGHT'
};
/**
  Direction
  @enum {string}
*/

/** Returns next char index in direction */

exports.DIRECTION = DIRECTION;

function indexInDirection(pos, direction) {
  if (direction === DIRECTION.LEFT) --pos;
  return pos;
}
/** Returns next char position in direction */


function posInDirection(pos, direction) {
  switch (direction) {
    case DIRECTION.LEFT:
    case DIRECTION.FORCE_LEFT:
      return --pos;

    case DIRECTION.RIGHT:
    case DIRECTION.FORCE_RIGHT:
      return ++pos;

    default:
      return pos;
  }
}
/** */


function forceDirection(direction) {
  switch (direction) {
    case DIRECTION.LEFT:
      return DIRECTION.FORCE_LEFT;

    case DIRECTION.RIGHT:
      return DIRECTION.FORCE_RIGHT;

    default:
      return direction;
  }
}
/** Escapes regular expression control chars */


function escapeRegExp(str) {
  return str.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
} // cloned from https://github.com/epoberezkin/fast-deep-equal with small changes


function objectIncludes(b, a) {
  if (a === b) return true;
  var arrA = Array.isArray(a),
      arrB = Array.isArray(b),
      i;

  if (arrA && arrB) {
    if (a.length != b.length) return false;

    for (i = 0; i < a.length; i++) {
      if (!objectIncludes(a[i], b[i])) return false;
    }

    return true;
  }

  if (arrA != arrB) return false;

  if (a && b && (0, _rollupPluginBabelHelpers74ba.c)(a) === 'object' && (0, _rollupPluginBabelHelpers74ba.c)(b) === 'object') {
    var dateA = a instanceof Date,
        dateB = b instanceof Date;
    if (dateA && dateB) return a.getTime() == b.getTime();
    if (dateA != dateB) return false;
    var regexpA = a instanceof RegExp,
        regexpB = b instanceof RegExp;
    if (regexpA && regexpB) return a.toString() == b.toString();
    if (regexpA != regexpB) return false;
    var keys = Object.keys(a); // if (keys.length !== Object.keys(b).length) return false;

    for (i = 0; i < keys.length; i++) {
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;
    }

    for (i = 0; i < keys.length; i++) {
      if (!objectIncludes(b[keys[i]], a[keys[i]])) return false;
    }

    return true;
  } else if (a && b && typeof a === 'function' && typeof b === 'function') {
    return a.toString() === b.toString();
  }

  return false;
}
/** Selection range */
},{"../_rollupPluginBabelHelpers-74ba0139.js":"../node_modules/imask/esm/_rollupPluginBabelHelpers-74ba0139.js"}],"../node_modules/imask/esm/core/action-details.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rollupPluginBabelHelpers74ba = require("../_rollupPluginBabelHelpers-74ba0139.js");

var _utils = require("./utils.js");

/** Provides details of changing input */
var ActionDetails = /*#__PURE__*/function () {
  /** Current input value */

  /** Current cursor position */

  /** Old input value */

  /** Old selection */
  function ActionDetails(value, cursorPos, oldValue, oldSelection) {
    (0, _rollupPluginBabelHelpers74ba.a)(this, ActionDetails);
    this.value = value;
    this.cursorPos = cursorPos;
    this.oldValue = oldValue;
    this.oldSelection = oldSelection; // double check if left part was changed (autofilling, other non-standard input triggers)

    while (this.value.slice(0, this.startChangePos) !== this.oldValue.slice(0, this.startChangePos)) {
      --this.oldSelection.start;
    }
  }
  /**
    Start changing position
    @readonly
  */


  (0, _rollupPluginBabelHelpers74ba._)(ActionDetails, [{
    key: "startChangePos",
    get: function get() {
      return Math.min(this.cursorPos, this.oldSelection.start);
    }
    /**
      Inserted symbols count
      @readonly
    */

  }, {
    key: "insertedCount",
    get: function get() {
      return this.cursorPos - this.startChangePos;
    }
    /**
      Inserted symbols
      @readonly
    */

  }, {
    key: "inserted",
    get: function get() {
      return this.value.substr(this.startChangePos, this.insertedCount);
    }
    /**
      Removed symbols count
      @readonly
    */

  }, {
    key: "removedCount",
    get: function get() {
      // Math.max for opposite operation
      return Math.max(this.oldSelection.end - this.startChangePos || // for Delete
      this.oldValue.length - this.value.length, 0);
    }
    /**
      Removed symbols
      @readonly
    */

  }, {
    key: "removed",
    get: function get() {
      return this.oldValue.substr(this.startChangePos, this.removedCount);
    }
    /**
      Unchanged head symbols
      @readonly
    */

  }, {
    key: "head",
    get: function get() {
      return this.value.substring(0, this.startChangePos);
    }
    /**
      Unchanged tail symbols
      @readonly
    */

  }, {
    key: "tail",
    get: function get() {
      return this.value.substring(this.startChangePos + this.insertedCount);
    }
    /**
      Remove direction
      @readonly
    */

  }, {
    key: "removeDirection",
    get: function get() {
      if (!this.removedCount || this.insertedCount) return _utils.DIRECTION.NONE; // align right if delete at right or if range removed (event with backspace)

      return this.oldSelection.end === this.cursorPos || this.oldSelection.start === this.cursorPos ? _utils.DIRECTION.RIGHT : _utils.DIRECTION.LEFT;
    }
  }]);
  return ActionDetails;
}();

var _default = ActionDetails;
exports.default = _default;
},{"../_rollupPluginBabelHelpers-74ba0139.js":"../node_modules/imask/esm/_rollupPluginBabelHelpers-74ba0139.js","./utils.js":"../node_modules/imask/esm/core/utils.js"}],"../node_modules/imask/esm/core/change-details.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rollupPluginBabelHelpers74ba = require("../_rollupPluginBabelHelpers-74ba0139.js");

/**
  Provides details of changing model value
  @param {Object} [details]
  @param {string} [details.inserted] - Inserted symbols
  @param {boolean} [details.skip] - Can skip chars
  @param {number} [details.removeCount] - Removed symbols count
  @param {number} [details.tailShift] - Additional offset if any changes occurred before tail
*/
var ChangeDetails = /*#__PURE__*/function () {
  /** Inserted symbols */

  /** Can skip chars */

  /** Additional offset if any changes occurred before tail */

  /** Raw inserted is used by dynamic mask */
  function ChangeDetails(details) {
    (0, _rollupPluginBabelHelpers74ba.a)(this, ChangeDetails);
    Object.assign(this, {
      inserted: '',
      rawInserted: '',
      skip: false,
      tailShift: 0
    }, details);
  }
  /**
    Aggregate changes
    @returns {ChangeDetails} `this`
  */


  (0, _rollupPluginBabelHelpers74ba._)(ChangeDetails, [{
    key: "aggregate",
    value: function aggregate(details) {
      this.rawInserted += details.rawInserted;
      this.skip = this.skip || details.skip;
      this.inserted += details.inserted;
      this.tailShift += details.tailShift;
      return this;
    }
    /** Total offset considering all changes */

  }, {
    key: "offset",
    get: function get() {
      return this.tailShift + this.inserted.length;
    }
  }]);
  return ChangeDetails;
}();

var _default = ChangeDetails;
exports.default = _default;
},{"../_rollupPluginBabelHelpers-74ba0139.js":"../node_modules/imask/esm/_rollupPluginBabelHelpers-74ba0139.js"}],"../node_modules/imask/esm/core/continuous-tail-details.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rollupPluginBabelHelpers74ba = require("../_rollupPluginBabelHelpers-74ba0139.js");

/** Provides details of continuous extracted tail */
var ContinuousTailDetails = /*#__PURE__*/function () {
  /** Tail value as string */

  /** Tail start position */

  /** Start position */
  function ContinuousTailDetails() {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var stop = arguments.length > 2 ? arguments[2] : undefined;
    (0, _rollupPluginBabelHelpers74ba.a)(this, ContinuousTailDetails);
    this.value = value;
    this.from = from;
    this.stop = stop;
  }

  (0, _rollupPluginBabelHelpers74ba._)(ContinuousTailDetails, [{
    key: "toString",
    value: function toString() {
      return this.value;
    }
  }, {
    key: "extend",
    value: function extend(tail) {
      this.value += String(tail);
    }
  }, {
    key: "appendTo",
    value: function appendTo(masked) {
      return masked.append(this.toString(), {
        tail: true
      }).aggregate(masked._appendPlaceholder());
    }
  }, {
    key: "state",
    get: function get() {
      return {
        value: this.value,
        from: this.from,
        stop: this.stop
      };
    },
    set: function set(state) {
      Object.assign(this, state);
    }
  }, {
    key: "shiftBefore",
    value: function shiftBefore(pos) {
      if (this.from >= pos || !this.value.length) return '';
      var shiftChar = this.value[0];
      this.value = this.value.slice(1);
      return shiftChar;
    }
  }]);
  return ContinuousTailDetails;
}();

var _default = ContinuousTailDetails;
exports.default = _default;
},{"../_rollupPluginBabelHelpers-74ba0139.js":"../node_modules/imask/esm/_rollupPluginBabelHelpers-74ba0139.js"}],"../node_modules/imask/esm/core/holder.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Applies mask on element.
 * @constructor
 * @param {HTMLInputElement|HTMLTextAreaElement|MaskElement} el - Element to apply mask
 * @param {Object} opts - Custom mask options
 * @return {InputMask}
 */
function IMask(el) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}; // currently available only for input-like elements

  return new IMask.InputMask(el, opts);
}

var _default = IMask;
exports.default = _default;
},{}],"../node_modules/imask/esm/masked/base.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rollupPluginBabelHelpers74ba = require("../_rollupPluginBabelHelpers-74ba0139.js");

var _changeDetails = _interopRequireDefault(require("../core/change-details.js"));

var _continuousTailDetails = _interopRequireDefault(require("../core/continuous-tail-details.js"));

var _utils = require("../core/utils.js");

var _holder = _interopRequireDefault(require("../core/holder.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Supported mask type */

/** Provides common masking stuff */
var Masked = /*#__PURE__*/function () {
  // $Shape<MaskedOptions>; TODO after fix https://github.com/facebook/flow/issues/4773

  /** @type {Mask} */

  /** */
  // $FlowFixMe no ideas

  /** Transforms value before mask processing */

  /** Validates if value is acceptable */

  /** Does additional processing in the end of editing */

  /** Format typed value to string */

  /** Parse strgin to get typed value */

  /** Enable characters overwriting */

  /** */
  function Masked(opts) {
    (0, _rollupPluginBabelHelpers74ba.a)(this, Masked);
    this._value = '';

    this._update(Object.assign({}, Masked.DEFAULTS, opts));

    this.isInitialized = true;
  }
  /** Sets and applies new options */


  (0, _rollupPluginBabelHelpers74ba._)(Masked, [{
    key: "updateOptions",
    value: function updateOptions(opts) {
      if (!Object.keys(opts).length) return;
      this.withValueRefresh(this._update.bind(this, opts));
    }
    /**
      Sets new options
      @protected
    */

  }, {
    key: "_update",
    value: function _update(opts) {
      Object.assign(this, opts);
    }
    /** Mask state */

  }, {
    key: "state",
    get: function get() {
      return {
        _value: this.value
      };
    },
    set: function set(state) {
      this._value = state._value;
    }
    /** Resets value */

  }, {
    key: "reset",
    value: function reset() {
      this._value = '';
    }
    /** */

  }, {
    key: "value",
    get: function get() {
      return this._value;
    },
    set: function set(value) {
      this.resolve(value);
    }
    /** Resolve new value */

  }, {
    key: "resolve",
    value: function resolve(value) {
      this.reset();
      this.append(value, {
        input: true
      }, '');
      this.doCommit();
      return this.value;
    }
    /** */

  }, {
    key: "unmaskedValue",
    get: function get() {
      return this.value;
    },
    set: function set(value) {
      this.reset();
      this.append(value, {}, '');
      this.doCommit();
    }
    /** */

  }, {
    key: "typedValue",
    get: function get() {
      return this.doParse(this.value);
    },
    set: function set(value) {
      this.value = this.doFormat(value);
    }
    /** Value that includes raw user input */

  }, {
    key: "rawInputValue",
    get: function get() {
      return this.extractInput(0, this.value.length, {
        raw: true
      });
    },
    set: function set(value) {
      this.reset();
      this.append(value, {
        raw: true
      }, '');
      this.doCommit();
    }
    /** */

  }, {
    key: "isComplete",
    get: function get() {
      return true;
    }
    /** Finds nearest input position in direction */

  }, {
    key: "nearestInputPos",
    value: function nearestInputPos(cursorPos, direction) {
      return cursorPos;
    }
    /** Extracts value in range considering flags */

  }, {
    key: "extractInput",
    value: function extractInput() {
      var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
      return this.value.slice(fromPos, toPos);
    }
    /** Extracts tail in range */

  }, {
    key: "extractTail",
    value: function extractTail() {
      var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
      return new _continuousTailDetails.default(this.extractInput(fromPos, toPos), fromPos);
    }
    /** Appends tail */
    // $FlowFixMe no ideas

  }, {
    key: "appendTail",
    value: function appendTail(tail) {
      if ((0, _utils.isString)(tail)) tail = new _continuousTailDetails.default(String(tail));
      return tail.appendTo(this);
    }
    /** Appends char */

  }, {
    key: "_appendCharRaw",
    value: function _appendCharRaw(ch) {
      if (!ch) return new _changeDetails.default();
      this._value += ch;
      return new _changeDetails.default({
        inserted: ch,
        rawInserted: ch
      });
    }
    /** Appends char */

  }, {
    key: "_appendChar",
    value: function _appendChar(ch) {
      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var checkTail = arguments.length > 2 ? arguments[2] : undefined;
      var consistentState = this.state;

      var details = this._appendCharRaw(this.doPrepare(ch, flags), flags);

      if (details.inserted) {
        var consistentTail;
        var appended = this.doValidate(flags) !== false;

        if (appended && checkTail != null) {
          // validation ok, check tail
          var beforeTailState = this.state;

          if (this.overwrite) {
            consistentTail = checkTail.state;
            checkTail.shiftBefore(this.value.length);
          }

          var tailDetails = this.appendTail(checkTail);
          appended = tailDetails.rawInserted === checkTail.toString(); // if ok, rollback state after tail

          if (appended && tailDetails.inserted) this.state = beforeTailState;
        } // revert all if something went wrong


        if (!appended) {
          details = new _changeDetails.default();
          this.state = consistentState;
          if (checkTail && consistentTail) checkTail.state = consistentTail;
        }
      }

      return details;
    }
    /** Appends optional placeholder at end */

  }, {
    key: "_appendPlaceholder",
    value: function _appendPlaceholder() {
      return new _changeDetails.default();
    }
    /** Appends symbols considering flags */
    // $FlowFixMe no ideas

  }, {
    key: "append",
    value: function append(str, flags, tail) {
      if (!(0, _utils.isString)(str)) throw new Error('value should be string');
      var details = new _changeDetails.default();
      var checkTail = (0, _utils.isString)(tail) ? new _continuousTailDetails.default(String(tail)) : tail;
      if (flags && flags.tail) flags._beforeTailState = this.state;

      for (var ci = 0; ci < str.length; ++ci) {
        details.aggregate(this._appendChar(str[ci], flags, checkTail));
      } // append tail but aggregate only tailShift


      if (checkTail != null) {
        details.tailShift += this.appendTail(checkTail).tailShift; // TODO it's a good idea to clear state after appending ends
        // but it causes bugs when one append calls another (when dynamic dispatch set rawInputValue)
        // this._resetBeforeTailState();
      }

      return details;
    }
    /** */

  }, {
    key: "remove",
    value: function remove() {
      var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
      this._value = this.value.slice(0, fromPos) + this.value.slice(toPos);
      return new _changeDetails.default();
    }
    /** Calls function and reapplies current value */

  }, {
    key: "withValueRefresh",
    value: function withValueRefresh(fn) {
      if (this._refreshing || !this.isInitialized) return fn();
      this._refreshing = true;
      var rawInput = this.rawInputValue;
      var value = this.value;
      var ret = fn();
      this.rawInputValue = rawInput; // append lost trailing chars at end

      if (this.value && this.value !== value && value.indexOf(this.value) === 0) {
        this.append(value.slice(this.value.length), {}, '');
      }

      delete this._refreshing;
      return ret;
    }
    /** */

  }, {
    key: "runIsolated",
    value: function runIsolated(fn) {
      if (this._isolated || !this.isInitialized) return fn(this);
      this._isolated = true;
      var state = this.state;
      var ret = fn(this);
      this.state = state;
      delete this._isolated;
      return ret;
    }
    /**
      Prepares string before mask processing
      @protected
    */

  }, {
    key: "doPrepare",
    value: function doPrepare(str) {
      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.prepare ? this.prepare(str, this, flags) : str;
    }
    /**
      Validates if value is acceptable
      @protected
    */

  }, {
    key: "doValidate",
    value: function doValidate(flags) {
      return (!this.validate || this.validate(this.value, this, flags)) && (!this.parent || this.parent.doValidate(flags));
    }
    /**
      Does additional processing in the end of editing
      @protected
    */

  }, {
    key: "doCommit",
    value: function doCommit() {
      if (this.commit) this.commit(this.value, this);
    }
    /** */

  }, {
    key: "doFormat",
    value: function doFormat(value) {
      return this.format ? this.format(value, this) : value;
    }
    /** */

  }, {
    key: "doParse",
    value: function doParse(str) {
      return this.parse ? this.parse(str, this) : str;
    }
    /** */

  }, {
    key: "splice",
    value: function splice(start, deleteCount, inserted, removeDirection) {
      var tailPos = start + deleteCount;
      var tail = this.extractTail(tailPos);
      var startChangePos = this.nearestInputPos(start, removeDirection);
      var changeDetails = new _changeDetails.default({
        tailShift: startChangePos - start // adjust tailShift if start was aligned

      }).aggregate(this.remove(startChangePos)).aggregate(this.append(inserted, {
        input: true
      }, tail));
      return changeDetails;
    }
  }]);
  return Masked;
}();

Masked.DEFAULTS = {
  format: function format(v) {
    return v;
  },
  parse: function parse(v) {
    return v;
  }
};
_holder.default.Masked = Masked;
var _default = Masked;
exports.default = _default;
},{"../_rollupPluginBabelHelpers-74ba0139.js":"../node_modules/imask/esm/_rollupPluginBabelHelpers-74ba0139.js","../core/change-details.js":"../node_modules/imask/esm/core/change-details.js","../core/continuous-tail-details.js":"../node_modules/imask/esm/core/continuous-tail-details.js","../core/utils.js":"../node_modules/imask/esm/core/utils.js","../core/holder.js":"../node_modules/imask/esm/core/holder.js"}],"../node_modules/imask/esm/masked/factory.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.maskedClass = maskedClass;
exports.default = void 0;

var _utils = require("../core/utils.js");

var _holder = _interopRequireDefault(require("../core/holder.js"));

require("../_rollupPluginBabelHelpers-74ba0139.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Get Masked class by mask type */
function maskedClass(mask) {
  if (mask == null) {
    throw new Error('mask property should be defined');
  } // $FlowFixMe


  if (mask instanceof RegExp) return _holder.default.MaskedRegExp; // $FlowFixMe

  if ((0, _utils.isString)(mask)) return _holder.default.MaskedPattern; // $FlowFixMe

  if (mask instanceof Date || mask === Date) return _holder.default.MaskedDate; // $FlowFixMe

  if (mask instanceof Number || typeof mask === 'number' || mask === Number) return _holder.default.MaskedNumber; // $FlowFixMe

  if (Array.isArray(mask) || mask === Array) return _holder.default.MaskedDynamic; // $FlowFixMe

  if (_holder.default.Masked && mask.prototype instanceof _holder.default.Masked) return mask; // $FlowFixMe

  if (mask instanceof Function) return _holder.default.MaskedFunction; // $FlowFixMe

  if (mask instanceof _holder.default.Masked) return mask.constructor;
  console.warn('Mask not found for mask', mask); // eslint-disable-line no-console
  // $FlowFixMe

  return _holder.default.Masked;
}
/** Creates new {@link Masked} depending on mask type */


function createMask(opts) {
  // $FlowFixMe
  if (_holder.default.Masked && opts instanceof _holder.default.Masked) return opts;
  opts = Object.assign({}, opts);
  var mask = opts.mask; // $FlowFixMe

  if (_holder.default.Masked && mask instanceof _holder.default.Masked) return mask;
  var MaskedClass = maskedClass(mask);
  if (!MaskedClass) throw new Error('Masked class is not found for provided mask, appropriate module needs to be import manually before creating mask.');
  return new MaskedClass(opts);
}

_holder.default.createMask = createMask;
var _default = createMask;
exports.default = _default;
},{"../core/utils.js":"../node_modules/imask/esm/core/utils.js","../core/holder.js":"../node_modules/imask/esm/core/holder.js","../_rollupPluginBabelHelpers-74ba0139.js":"../node_modules/imask/esm/_rollupPluginBabelHelpers-74ba0139.js"}],"../node_modules/imask/esm/masked/pattern/input-definition.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_INPUT_DEFINITIONS = exports.default = void 0;

var _rollupPluginBabelHelpers74ba = require("../../_rollupPluginBabelHelpers-74ba0139.js");

var _factory = _interopRequireDefault(require("../factory.js"));

var _changeDetails = _interopRequireDefault(require("../../core/change-details.js"));

var _utils = require("../../core/utils.js");

require("../../core/holder.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _excluded = ["mask"];
var DEFAULT_INPUT_DEFINITIONS = {
  '0': /\d/,
  'a': /[\u0041-\u005A\u0061-\u007A\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/,
  // http://stackoverflow.com/a/22075070
  '*': /./
};
/** */

exports.DEFAULT_INPUT_DEFINITIONS = DEFAULT_INPUT_DEFINITIONS;

var PatternInputDefinition = /*#__PURE__*/function () {
  /** */

  /** */

  /** */

  /** */

  /** */

  /** */
  function PatternInputDefinition(opts) {
    (0, _rollupPluginBabelHelpers74ba.a)(this, PatternInputDefinition);
    var mask = opts.mask,
        blockOpts = (0, _rollupPluginBabelHelpers74ba.b)(opts, _excluded);
    this.masked = (0, _factory.default)({
      mask: mask
    });
    Object.assign(this, blockOpts);
  }

  (0, _rollupPluginBabelHelpers74ba._)(PatternInputDefinition, [{
    key: "reset",
    value: function reset() {
      this._isFilled = false;
      this.masked.reset();
    }
  }, {
    key: "remove",
    value: function remove() {
      var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;

      if (fromPos === 0 && toPos >= 1) {
        this._isFilled = false;
        return this.masked.remove(fromPos, toPos);
      }

      return new _changeDetails.default();
    }
  }, {
    key: "value",
    get: function get() {
      return this.masked.value || (this._isFilled && !this.isOptional ? this.placeholderChar : '');
    }
  }, {
    key: "unmaskedValue",
    get: function get() {
      return this.masked.unmaskedValue;
    }
  }, {
    key: "isComplete",
    get: function get() {
      return Boolean(this.masked.value) || this.isOptional;
    }
  }, {
    key: "_appendChar",
    value: function _appendChar(str) {
      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (this._isFilled) return new _changeDetails.default();
      var state = this.masked.state; // simulate input

      var details = this.masked._appendChar(str, flags);

      if (details.inserted && this.doValidate(flags) === false) {
        details.inserted = details.rawInserted = '';
        this.masked.state = state;
      }

      if (!details.inserted && !this.isOptional && !this.lazy && !flags.input) {
        details.inserted = this.placeholderChar;
      }

      details.skip = !details.inserted && !this.isOptional;
      this._isFilled = Boolean(details.inserted);
      return details;
    }
  }, {
    key: "append",
    value: function append() {
      var _this$masked;

      return (_this$masked = this.masked).append.apply(_this$masked, arguments);
    }
  }, {
    key: "_appendPlaceholder",
    value: function _appendPlaceholder() {
      var details = new _changeDetails.default();
      if (this._isFilled || this.isOptional) return details;
      this._isFilled = true;
      details.inserted = this.placeholderChar;
      return details;
    }
  }, {
    key: "extractTail",
    value: function extractTail() {
      var _this$masked2;

      return (_this$masked2 = this.masked).extractTail.apply(_this$masked2, arguments);
    }
  }, {
    key: "appendTail",
    value: function appendTail() {
      var _this$masked3;

      return (_this$masked3 = this.masked).appendTail.apply(_this$masked3, arguments);
    }
  }, {
    key: "extractInput",
    value: function extractInput() {
      var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
      var flags = arguments.length > 2 ? arguments[2] : undefined;
      return this.masked.extractInput(fromPos, toPos, flags);
    }
  }, {
    key: "nearestInputPos",
    value: function nearestInputPos(cursorPos) {
      var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _utils.DIRECTION.NONE;
      var minPos = 0;
      var maxPos = this.value.length;
      var boundPos = Math.min(Math.max(cursorPos, minPos), maxPos);

      switch (direction) {
        case _utils.DIRECTION.LEFT:
        case _utils.DIRECTION.FORCE_LEFT:
          return this.isComplete ? boundPos : minPos;

        case _utils.DIRECTION.RIGHT:
        case _utils.DIRECTION.FORCE_RIGHT:
          return this.isComplete ? boundPos : maxPos;

        case _utils.DIRECTION.NONE:
        default:
          return boundPos;
      }
    }
  }, {
    key: "doValidate",
    value: function doValidate() {
      var _this$masked4, _this$parent;

      return (_this$masked4 = this.masked).doValidate.apply(_this$masked4, arguments) && (!this.parent || (_this$parent = this.parent).doValidate.apply(_this$parent, arguments));
    }
  }, {
    key: "doCommit",
    value: function doCommit() {
      this.masked.doCommit();
    }
  }, {
    key: "state",
    get: function get() {
      return {
        masked: this.masked.state,
        _isFilled: this._isFilled
      };
    },
    set: function set(state) {
      this.masked.state = state.masked;
      this._isFilled = state._isFilled;
    }
  }]);
  return PatternInputDefinition;
}();

var _default = PatternInputDefinition;
exports.default = _default;
},{"../../_rollupPluginBabelHelpers-74ba0139.js":"../node_modules/imask/esm/_rollupPluginBabelHelpers-74ba0139.js","../factory.js":"../node_modules/imask/esm/masked/factory.js","../../core/change-details.js":"../node_modules/imask/esm/core/change-details.js","../../core/utils.js":"../node_modules/imask/esm/core/utils.js","../../core/holder.js":"../node_modules/imask/esm/core/holder.js"}],"../node_modules/imask/esm/masked/pattern/fixed-definition.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rollupPluginBabelHelpers74ba = require("../../_rollupPluginBabelHelpers-74ba0139.js");

var _changeDetails = _interopRequireDefault(require("../../core/change-details.js"));

var _utils = require("../../core/utils.js");

var _continuousTailDetails = _interopRequireDefault(require("../../core/continuous-tail-details.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PatternFixedDefinition = /*#__PURE__*/function () {
  /** */

  /** */

  /** */

  /** */
  function PatternFixedDefinition(opts) {
    (0, _rollupPluginBabelHelpers74ba.a)(this, PatternFixedDefinition);
    Object.assign(this, opts);
    this._value = '';
  }

  (0, _rollupPluginBabelHelpers74ba._)(PatternFixedDefinition, [{
    key: "value",
    get: function get() {
      return this._value;
    }
  }, {
    key: "unmaskedValue",
    get: function get() {
      return this.isUnmasking ? this.value : '';
    }
  }, {
    key: "reset",
    value: function reset() {
      this._isRawInput = false;
      this._value = '';
    }
  }, {
    key: "remove",
    value: function remove() {
      var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this._value.length;
      this._value = this._value.slice(0, fromPos) + this._value.slice(toPos);
      if (!this._value) this._isRawInput = false;
      return new _changeDetails.default();
    }
  }, {
    key: "nearestInputPos",
    value: function nearestInputPos(cursorPos) {
      var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _utils.DIRECTION.NONE;
      var minPos = 0;
      var maxPos = this._value.length;

      switch (direction) {
        case _utils.DIRECTION.LEFT:
        case _utils.DIRECTION.FORCE_LEFT:
          return minPos;

        case _utils.DIRECTION.NONE:
        case _utils.DIRECTION.RIGHT:
        case _utils.DIRECTION.FORCE_RIGHT:
        default:
          return maxPos;
      }
    }
  }, {
    key: "extractInput",
    value: function extractInput() {
      var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this._value.length;
      var flags = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return flags.raw && this._isRawInput && this._value.slice(fromPos, toPos) || '';
    }
  }, {
    key: "isComplete",
    get: function get() {
      return true;
    }
  }, {
    key: "_appendChar",
    value: function _appendChar(str) {
      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var details = new _changeDetails.default();
      if (this._value) return details;
      var appended = this.char === str[0];
      var isResolved = appended && (this.isUnmasking || flags.input || flags.raw) && !flags.tail;
      if (isResolved) details.rawInserted = this.char;
      this._value = details.inserted = this.char;
      this._isRawInput = isResolved && (flags.raw || flags.input);
      return details;
    }
  }, {
    key: "_appendPlaceholder",
    value: function _appendPlaceholder() {
      var details = new _changeDetails.default();
      if (this._value) return details;
      this._value = details.inserted = this.char;
      return details;
    }
  }, {
    key: "extractTail",
    value: function extractTail() {
      arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
      return new _continuousTailDetails.default('');
    } // $FlowFixMe no ideas

  }, {
    key: "appendTail",
    value: function appendTail(tail) {
      if ((0, _utils.isString)(tail)) tail = new _continuousTailDetails.default(String(tail));
      return tail.appendTo(this);
    }
  }, {
    key: "append",
    value: function append(str, flags, tail) {
      var details = this._appendChar(str, flags);

      if (tail != null) {
        details.tailShift += this.appendTail(tail).tailShift;
      }

      return details;
    }
  }, {
    key: "doCommit",
    value: function doCommit() {}
  }, {
    key: "state",
    get: function get() {
      return {
        _value: this._value,
        _isRawInput: this._isRawInput
      };
    },
    set: function set(state) {
      Object.assign(this, state);
    }
  }]);
  return PatternFixedDefinition;
}();

var _default = PatternFixedDefinition;
exports.default = _default;
},{"../../_rollupPluginBabelHelpers-74ba0139.js":"../node_modules/imask/esm/_rollupPluginBabelHelpers-74ba0139.js","../../core/change-details.js":"../node_modules/imask/esm/core/change-details.js","../../core/utils.js":"../node_modules/imask/esm/core/utils.js","../../core/continuous-tail-details.js":"../node_modules/imask/esm/core/continuous-tail-details.js"}],"../node_modules/imask/esm/masked/pattern/chunk-tail-details.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rollupPluginBabelHelpers74ba = require("../../_rollupPluginBabelHelpers-74ba0139.js");

var _changeDetails = _interopRequireDefault(require("../../core/change-details.js"));

var _utils = require("../../core/utils.js");

var _continuousTailDetails = _interopRequireDefault(require("../../core/continuous-tail-details.js"));

var _holder = _interopRequireDefault(require("../../core/holder.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _excluded = ["chunks"];

var ChunksTailDetails = /*#__PURE__*/function () {
  /** */
  function ChunksTailDetails() {
    var chunks = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    (0, _rollupPluginBabelHelpers74ba.a)(this, ChunksTailDetails);
    this.chunks = chunks;
    this.from = from;
  }

  (0, _rollupPluginBabelHelpers74ba._)(ChunksTailDetails, [{
    key: "toString",
    value: function toString() {
      return this.chunks.map(String).join('');
    } // $FlowFixMe no ideas

  }, {
    key: "extend",
    value: function extend(tailChunk) {
      if (!String(tailChunk)) return;
      if ((0, _utils.isString)(tailChunk)) tailChunk = new _continuousTailDetails.default(String(tailChunk));
      var lastChunk = this.chunks[this.chunks.length - 1];
      var extendLast = lastChunk && ( // if stops are same or tail has no stop
      lastChunk.stop === tailChunk.stop || tailChunk.stop == null) && // if tail chunk goes just after last chunk
      tailChunk.from === lastChunk.from + lastChunk.toString().length;

      if (tailChunk instanceof _continuousTailDetails.default) {
        // check the ability to extend previous chunk
        if (extendLast) {
          // extend previous chunk
          lastChunk.extend(tailChunk.toString());
        } else {
          // append new chunk
          this.chunks.push(tailChunk);
        }
      } else if (tailChunk instanceof ChunksTailDetails) {
        if (tailChunk.stop == null) {
          // unwrap floating chunks to parent, keeping `from` pos
          var firstTailChunk;

          while (tailChunk.chunks.length && tailChunk.chunks[0].stop == null) {
            firstTailChunk = tailChunk.chunks.shift();
            firstTailChunk.from += tailChunk.from;
            this.extend(firstTailChunk);
          }
        } // if tail chunk still has value


        if (tailChunk.toString()) {
          // if chunks contains stops, then popup stop to container
          tailChunk.stop = tailChunk.blockIndex;
          this.chunks.push(tailChunk);
        }
      }
    }
  }, {
    key: "appendTo",
    value: function appendTo(masked) {
      // $FlowFixMe
      if (!(masked instanceof _holder.default.MaskedPattern)) {
        var tail = new _continuousTailDetails.default(this.toString());
        return tail.appendTo(masked);
      }

      var details = new _changeDetails.default();

      for (var ci = 0; ci < this.chunks.length && !details.skip; ++ci) {
        var chunk = this.chunks[ci];

        var lastBlockIter = masked._mapPosToBlock(masked.value.length);

        var stop = chunk.stop;
        var chunkBlock = void 0;

        if (stop != null && ( // if block not found or stop is behind lastBlock
        !lastBlockIter || lastBlockIter.index <= stop)) {
          if (chunk instanceof ChunksTailDetails || // for continuous block also check if stop is exist
          masked._stops.indexOf(stop) >= 0) {
            details.aggregate(masked._appendPlaceholder(stop));
          }

          chunkBlock = chunk instanceof ChunksTailDetails && masked._blocks[stop];
        }

        if (chunkBlock) {
          var tailDetails = chunkBlock.appendTail(chunk);
          tailDetails.skip = false; // always ignore skip, it will be set on last

          details.aggregate(tailDetails);
          masked._value += tailDetails.inserted; // get not inserted chars

          var remainChars = chunk.toString().slice(tailDetails.rawInserted.length);
          if (remainChars) details.aggregate(masked.append(remainChars, {
            tail: true
          }));
        } else {
          details.aggregate(masked.append(chunk.toString(), {
            tail: true
          }));
        }
      }

      return details;
    }
  }, {
    key: "state",
    get: function get() {
      return {
        chunks: this.chunks.map(function (c) {
          return c.state;
        }),
        from: this.from,
        stop: this.stop,
        blockIndex: this.blockIndex
      };
    },
    set: function set(state) {
      var chunks = state.chunks,
          props = (0, _rollupPluginBabelHelpers74ba.b)(state, _excluded);
      Object.assign(this, props);
      this.chunks = chunks.map(function (cstate) {
        var chunk = "chunks" in cstate ? new ChunksTailDetails() : new _continuousTailDetails.default(); // $FlowFixMe already checked above

        chunk.state = cstate;
        return chunk;
      });
    }
  }, {
    key: "shiftBefore",
    value: function shiftBefore(pos) {
      if (this.from >= pos || !this.chunks.length) return '';
      var chunkShiftPos = pos - this.from;
      var ci = 0;

      while (ci < this.chunks.length) {
        var chunk = this.chunks[ci];
        var shiftChar = chunk.shiftBefore(chunkShiftPos);

        if (chunk.toString()) {
          // chunk still contains value
          // but not shifted - means no more available chars to shift
          if (!shiftChar) break;
          ++ci;
        } else {
          // clean if chunk has no value
          this.chunks.splice(ci, 1);
        }

        if (shiftChar) return shiftChar;
      }

      return '';
    }
  }]);
  return ChunksTailDetails;
}();

var _default = ChunksTailDetails;
exports.default = _default;
},{"../../_rollupPluginBabelHelpers-74ba0139.js":"../node_modules/imask/esm/_rollupPluginBabelHelpers-74ba0139.js","../../core/change-details.js":"../node_modules/imask/esm/core/change-details.js","../../core/utils.js":"../node_modules/imask/esm/core/utils.js","../../core/continuous-tail-details.js":"../node_modules/imask/esm/core/continuous-tail-details.js","../../core/holder.js":"../node_modules/imask/esm/core/holder.js"}],"../node_modules/imask/esm/masked/regexp.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rollupPluginBabelHelpers74ba = require("../_rollupPluginBabelHelpers-74ba0139.js");

var _base = _interopRequireDefault(require("./base.js"));

var _holder = _interopRequireDefault(require("../core/holder.js"));

require("../core/change-details.js");

require("../core/continuous-tail-details.js");

require("../core/utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Masking by RegExp */
var MaskedRegExp = /*#__PURE__*/function (_Masked) {
  (0, _rollupPluginBabelHelpers74ba.d)(MaskedRegExp, _Masked);

  var _super = (0, _rollupPluginBabelHelpers74ba.e)(MaskedRegExp);

  function MaskedRegExp() {
    (0, _rollupPluginBabelHelpers74ba.a)(this, MaskedRegExp);
    return _super.apply(this, arguments);
  }

  (0, _rollupPluginBabelHelpers74ba._)(MaskedRegExp, [{
    key: "_update",
    value:
    /**
      @override
      @param {Object} opts
    */
    function _update(opts) {
      if (opts.mask) opts.validate = function (value) {
        return value.search(opts.mask) >= 0;
      };
      (0, _rollupPluginBabelHelpers74ba.g)((0, _rollupPluginBabelHelpers74ba.h)(MaskedRegExp.prototype), "_update", this).call(this, opts);
    }
  }]);
  return MaskedRegExp;
}(_base.default);

_holder.default.MaskedRegExp = MaskedRegExp;
var _default = MaskedRegExp;
exports.default = _default;
},{"../_rollupPluginBabelHelpers-74ba0139.js":"../node_modules/imask/esm/_rollupPluginBabelHelpers-74ba0139.js","./base.js":"../node_modules/imask/esm/masked/base.js","../core/holder.js":"../node_modules/imask/esm/core/holder.js","../core/change-details.js":"../node_modules/imask/esm/core/change-details.js","../core/continuous-tail-details.js":"../node_modules/imask/esm/core/continuous-tail-details.js","../core/utils.js":"../node_modules/imask/esm/core/utils.js"}],"../node_modules/imask/esm/masked/pattern.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rollupPluginBabelHelpers74ba = require("../_rollupPluginBabelHelpers-74ba0139.js");

var _utils = require("../core/utils.js");

var _changeDetails = _interopRequireDefault(require("../core/change-details.js"));

var _base = _interopRequireDefault(require("./base.js"));

var _inputDefinition = _interopRequireWildcard(require("./pattern/input-definition.js"));

var _fixedDefinition = _interopRequireDefault(require("./pattern/fixed-definition.js"));

var _chunkTailDetails = _interopRequireDefault(require("./pattern/chunk-tail-details.js"));

var _factory = _interopRequireDefault(require("./factory.js"));

var _holder = _interopRequireDefault(require("../core/holder.js"));

require("./regexp.js");

require("../core/continuous-tail-details.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _excluded = ["_blocks"];
/**
  Pattern mask
  @param {Object} opts
  @param {Object} opts.blocks
  @param {Object} opts.definitions
  @param {string} opts.placeholderChar
  @param {boolean} opts.lazy
*/

var MaskedPattern = /*#__PURE__*/function (_Masked) {
  (0, _rollupPluginBabelHelpers74ba.d)(MaskedPattern, _Masked);

  var _super = (0, _rollupPluginBabelHelpers74ba.e)(MaskedPattern);
  /** */

  /** */

  /** Single char for empty input */

  /** Show placeholder only when needed */


  function MaskedPattern() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _rollupPluginBabelHelpers74ba.a)(this, MaskedPattern); // TODO type $Shape<MaskedPatternOptions>={} does not work

    opts.definitions = Object.assign({}, _inputDefinition.DEFAULT_INPUT_DEFINITIONS, opts.definitions);
    return _super.call(this, Object.assign({}, MaskedPattern.DEFAULTS, opts));
  }
  /**
    @override
    @param {Object} opts
  */


  (0, _rollupPluginBabelHelpers74ba._)(MaskedPattern, [{
    key: "_update",
    value: function _update() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      opts.definitions = Object.assign({}, this.definitions, opts.definitions);
      (0, _rollupPluginBabelHelpers74ba.g)((0, _rollupPluginBabelHelpers74ba.h)(MaskedPattern.prototype), "_update", this).call(this, opts);

      this._rebuildMask();
    }
    /** */

  }, {
    key: "_rebuildMask",
    value: function _rebuildMask() {
      var _this = this;

      var defs = this.definitions;
      this._blocks = [];
      this._stops = [];
      this._maskedBlocks = {};
      var pattern = this.mask;
      if (!pattern || !defs) return;
      var unmaskingBlock = false;
      var optionalBlock = false;

      for (var i = 0; i < pattern.length; ++i) {
        if (this.blocks) {
          var _ret = function () {
            var p = pattern.slice(i);
            var bNames = Object.keys(_this.blocks).filter(function (bName) {
              return p.indexOf(bName) === 0;
            }); // order by key length

            bNames.sort(function (a, b) {
              return b.length - a.length;
            }); // use block name with max length

            var bName = bNames[0];

            if (bName) {
              // $FlowFixMe no ideas
              var maskedBlock = (0, _factory.default)(Object.assign({
                parent: _this,
                lazy: _this.lazy,
                placeholderChar: _this.placeholderChar,
                overwrite: _this.overwrite
              }, _this.blocks[bName]));

              if (maskedBlock) {
                _this._blocks.push(maskedBlock); // store block index


                if (!_this._maskedBlocks[bName]) _this._maskedBlocks[bName] = [];

                _this._maskedBlocks[bName].push(_this._blocks.length - 1);
              }

              i += bName.length - 1;
              return "continue";
            }
          }();

          if (_ret === "continue") continue;
        }

        var char = pattern[i];

        var _isInput = (char in defs);

        if (char === MaskedPattern.STOP_CHAR) {
          this._stops.push(this._blocks.length);

          continue;
        }

        if (char === '{' || char === '}') {
          unmaskingBlock = !unmaskingBlock;
          continue;
        }

        if (char === '[' || char === ']') {
          optionalBlock = !optionalBlock;
          continue;
        }

        if (char === MaskedPattern.ESCAPE_CHAR) {
          ++i;
          char = pattern[i];
          if (!char) break;
          _isInput = false;
        }

        var def = _isInput ? new _inputDefinition.default({
          parent: this,
          lazy: this.lazy,
          placeholderChar: this.placeholderChar,
          mask: defs[char],
          isOptional: optionalBlock
        }) : new _fixedDefinition.default({
          char: char,
          isUnmasking: unmaskingBlock
        });

        this._blocks.push(def);
      }
    }
    /**
      @override
    */

  }, {
    key: "state",
    get: function get() {
      return Object.assign({}, (0, _rollupPluginBabelHelpers74ba.g)((0, _rollupPluginBabelHelpers74ba.h)(MaskedPattern.prototype), "state", this), {
        _blocks: this._blocks.map(function (b) {
          return b.state;
        })
      });
    },
    set: function set(state) {
      var _blocks = state._blocks,
          maskedState = (0, _rollupPluginBabelHelpers74ba.b)(state, _excluded);

      this._blocks.forEach(function (b, bi) {
        return b.state = _blocks[bi];
      });

      (0, _rollupPluginBabelHelpers74ba.i)((0, _rollupPluginBabelHelpers74ba.h)(MaskedPattern.prototype), "state", maskedState, this, true);
    }
    /**
      @override
    */

  }, {
    key: "reset",
    value: function reset() {
      (0, _rollupPluginBabelHelpers74ba.g)((0, _rollupPluginBabelHelpers74ba.h)(MaskedPattern.prototype), "reset", this).call(this);

      this._blocks.forEach(function (b) {
        return b.reset();
      });
    }
    /**
      @override
    */

  }, {
    key: "isComplete",
    get: function get() {
      return this._blocks.every(function (b) {
        return b.isComplete;
      });
    }
    /**
      @override
    */

  }, {
    key: "doCommit",
    value: function doCommit() {
      this._blocks.forEach(function (b) {
        return b.doCommit();
      });

      (0, _rollupPluginBabelHelpers74ba.g)((0, _rollupPluginBabelHelpers74ba.h)(MaskedPattern.prototype), "doCommit", this).call(this);
    }
    /**
      @override
    */

  }, {
    key: "unmaskedValue",
    get: function get() {
      return this._blocks.reduce(function (str, b) {
        return str += b.unmaskedValue;
      }, '');
    },
    set: function set(unmaskedValue) {
      (0, _rollupPluginBabelHelpers74ba.i)((0, _rollupPluginBabelHelpers74ba.h)(MaskedPattern.prototype), "unmaskedValue", unmaskedValue, this, true);
    }
    /**
      @override
    */

  }, {
    key: "value",
    get: function get() {
      // TODO return _value when not in change?
      return this._blocks.reduce(function (str, b) {
        return str += b.value;
      }, '');
    },
    set: function set(value) {
      (0, _rollupPluginBabelHelpers74ba.i)((0, _rollupPluginBabelHelpers74ba.h)(MaskedPattern.prototype), "value", value, this, true);
    }
    /**
      @override
    */

  }, {
    key: "appendTail",
    value: function appendTail(tail) {
      return (0, _rollupPluginBabelHelpers74ba.g)((0, _rollupPluginBabelHelpers74ba.h)(MaskedPattern.prototype), "appendTail", this).call(this, tail).aggregate(this._appendPlaceholder());
    }
    /**
      @override
    */

  }, {
    key: "_appendCharRaw",
    value: function _appendCharRaw(ch) {
      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var blockIter = this._mapPosToBlock(this.value.length);

      var details = new _changeDetails.default();
      if (!blockIter) return details;

      for (var bi = blockIter.index;; ++bi) {
        var _block = this._blocks[bi];
        if (!_block) break;

        var blockDetails = _block._appendChar(ch, flags);

        var skip = blockDetails.skip;
        details.aggregate(blockDetails);
        if (skip || blockDetails.rawInserted) break; // go next char
      }

      return details;
    }
    /**
      @override
    */

  }, {
    key: "extractTail",
    value: function extractTail() {
      var _this2 = this;

      var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
      var chunkTail = new _chunkTailDetails.default();
      if (fromPos === toPos) return chunkTail;

      this._forEachBlocksInRange(fromPos, toPos, function (b, bi, bFromPos, bToPos) {
        var blockChunk = b.extractTail(bFromPos, bToPos);
        blockChunk.stop = _this2._findStopBefore(bi);
        blockChunk.from = _this2._blockStartPos(bi);
        if (blockChunk instanceof _chunkTailDetails.default) blockChunk.blockIndex = bi;
        chunkTail.extend(blockChunk);
      });

      return chunkTail;
    }
    /**
      @override
    */

  }, {
    key: "extractInput",
    value: function extractInput() {
      var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
      var flags = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      if (fromPos === toPos) return '';
      var input = '';

      this._forEachBlocksInRange(fromPos, toPos, function (b, _, fromPos, toPos) {
        input += b.extractInput(fromPos, toPos, flags);
      });

      return input;
    }
  }, {
    key: "_findStopBefore",
    value: function _findStopBefore(blockIndex) {
      var stopBefore;

      for (var si = 0; si < this._stops.length; ++si) {
        var stop = this._stops[si];
        if (stop <= blockIndex) stopBefore = stop;else break;
      }

      return stopBefore;
    }
    /** Appends placeholder depending on laziness */

  }, {
    key: "_appendPlaceholder",
    value: function _appendPlaceholder(toBlockIndex) {
      var _this3 = this;

      var details = new _changeDetails.default();
      if (this.lazy && toBlockIndex == null) return details;

      var startBlockIter = this._mapPosToBlock(this.value.length);

      if (!startBlockIter) return details;
      var startBlockIndex = startBlockIter.index;
      var endBlockIndex = toBlockIndex != null ? toBlockIndex : this._blocks.length;

      this._blocks.slice(startBlockIndex, endBlockIndex).forEach(function (b) {
        if (!b.lazy || toBlockIndex != null) {
          // $FlowFixMe `_blocks` may not be present
          var args = b._blocks != null ? [b._blocks.length] : [];

          var bDetails = b._appendPlaceholder.apply(b, args);

          _this3._value += bDetails.inserted;
          details.aggregate(bDetails);
        }
      });

      return details;
    }
    /** Finds block in pos */

  }, {
    key: "_mapPosToBlock",
    value: function _mapPosToBlock(pos) {
      var accVal = '';

      for (var bi = 0; bi < this._blocks.length; ++bi) {
        var _block2 = this._blocks[bi];
        var blockStartPos = accVal.length;
        accVal += _block2.value;

        if (pos <= accVal.length) {
          return {
            index: bi,
            offset: pos - blockStartPos
          };
        }
      }
    }
    /** */

  }, {
    key: "_blockStartPos",
    value: function _blockStartPos(blockIndex) {
      return this._blocks.slice(0, blockIndex).reduce(function (pos, b) {
        return pos += b.value.length;
      }, 0);
    }
    /** */

  }, {
    key: "_forEachBlocksInRange",
    value: function _forEachBlocksInRange(fromPos) {
      var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
      var fn = arguments.length > 2 ? arguments[2] : undefined;

      var fromBlockIter = this._mapPosToBlock(fromPos);

      if (fromBlockIter) {
        var toBlockIter = this._mapPosToBlock(toPos); // process first block


        var isSameBlock = toBlockIter && fromBlockIter.index === toBlockIter.index;
        var fromBlockStartPos = fromBlockIter.offset;
        var fromBlockEndPos = toBlockIter && isSameBlock ? toBlockIter.offset : this._blocks[fromBlockIter.index].value.length;
        fn(this._blocks[fromBlockIter.index], fromBlockIter.index, fromBlockStartPos, fromBlockEndPos);

        if (toBlockIter && !isSameBlock) {
          // process intermediate blocks
          for (var bi = fromBlockIter.index + 1; bi < toBlockIter.index; ++bi) {
            fn(this._blocks[bi], bi, 0, this._blocks[bi].value.length);
          } // process last block


          fn(this._blocks[toBlockIter.index], toBlockIter.index, 0, toBlockIter.offset);
        }
      }
    }
    /**
      @override
    */

  }, {
    key: "remove",
    value: function remove() {
      var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
      var removeDetails = (0, _rollupPluginBabelHelpers74ba.g)((0, _rollupPluginBabelHelpers74ba.h)(MaskedPattern.prototype), "remove", this).call(this, fromPos, toPos);

      this._forEachBlocksInRange(fromPos, toPos, function (b, _, bFromPos, bToPos) {
        removeDetails.aggregate(b.remove(bFromPos, bToPos));
      });

      return removeDetails;
    }
    /**
      @override
    */

  }, {
    key: "nearestInputPos",
    value: function nearestInputPos(cursorPos) {
      var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _utils.DIRECTION.NONE; // TODO refactor - extract alignblock

      var beginBlockData = this._mapPosToBlock(cursorPos) || {
        index: 0,
        offset: 0
      };
      var beginBlockOffset = beginBlockData.offset,
          beginBlockIndex = beginBlockData.index;
      var beginBlock = this._blocks[beginBlockIndex];
      if (!beginBlock) return cursorPos;
      var beginBlockCursorPos = beginBlockOffset; // if position inside block - try to adjust it

      if (beginBlockCursorPos !== 0 && beginBlockCursorPos < beginBlock.value.length) {
        beginBlockCursorPos = beginBlock.nearestInputPos(beginBlockOffset, (0, _utils.forceDirection)(direction));
      }

      var cursorAtRight = beginBlockCursorPos === beginBlock.value.length;
      var cursorAtLeft = beginBlockCursorPos === 0; //  cursor is INSIDE first block (not at bounds)

      if (!cursorAtLeft && !cursorAtRight) return this._blockStartPos(beginBlockIndex) + beginBlockCursorPos;
      var searchBlockIndex = cursorAtRight ? beginBlockIndex + 1 : beginBlockIndex;

      if (direction === _utils.DIRECTION.NONE) {
        // NONE direction used to calculate start input position if no chars were removed
        // FOR NONE:
        // -
        // input|any
        // ->
        //  any|input
        // <-
        //  filled-input|any
        // check if first block at left is input
        if (searchBlockIndex > 0) {
          var blockIndexAtLeft = searchBlockIndex - 1;
          var blockAtLeft = this._blocks[blockIndexAtLeft];
          var blockInputPos = blockAtLeft.nearestInputPos(0, _utils.DIRECTION.NONE); // is input

          if (!blockAtLeft.value.length || blockInputPos !== blockAtLeft.value.length) {
            return this._blockStartPos(searchBlockIndex);
          }
        } // ->


        var firstInputAtRight = searchBlockIndex;

        for (var bi = firstInputAtRight; bi < this._blocks.length; ++bi) {
          var blockAtRight = this._blocks[bi];

          var _blockInputPos = blockAtRight.nearestInputPos(0, _utils.DIRECTION.NONE);

          if (!blockAtRight.value.length || _blockInputPos !== blockAtRight.value.length) {
            return this._blockStartPos(bi) + _blockInputPos;
          }
        } // <-
        // find first non-fixed symbol


        for (var _bi = searchBlockIndex - 1; _bi >= 0; --_bi) {
          var _block3 = this._blocks[_bi];

          var _blockInputPos2 = _block3.nearestInputPos(0, _utils.DIRECTION.NONE); // is input


          if (!_block3.value.length || _blockInputPos2 !== _block3.value.length) {
            return this._blockStartPos(_bi) + _block3.value.length;
          }
        }

        return cursorPos;
      }

      if (direction === _utils.DIRECTION.LEFT || direction === _utils.DIRECTION.FORCE_LEFT) {
        // -
        //  any|filled-input
        // <-
        //  any|first not empty is not-len-aligned
        //  not-0-aligned|any
        // ->
        //  any|not-len-aligned or end
        // check if first block at right is filled input
        var firstFilledBlockIndexAtRight;

        for (var _bi2 = searchBlockIndex; _bi2 < this._blocks.length; ++_bi2) {
          if (this._blocks[_bi2].value) {
            firstFilledBlockIndexAtRight = _bi2;
            break;
          }
        }

        if (firstFilledBlockIndexAtRight != null) {
          var filledBlock = this._blocks[firstFilledBlockIndexAtRight];

          var _blockInputPos3 = filledBlock.nearestInputPos(0, _utils.DIRECTION.RIGHT);

          if (_blockInputPos3 === 0 && filledBlock.unmaskedValue.length) {
            // filled block is input
            return this._blockStartPos(firstFilledBlockIndexAtRight) + _blockInputPos3;
          }
        } // <-
        // find this vars


        var firstFilledInputBlockIndex = -1;
        var firstEmptyInputBlockIndex; // TODO consider nested empty inputs

        for (var _bi3 = searchBlockIndex - 1; _bi3 >= 0; --_bi3) {
          var _block4 = this._blocks[_bi3];

          var _blockInputPos4 = _block4.nearestInputPos(_block4.value.length, _utils.DIRECTION.FORCE_LEFT);

          if (!_block4.value || _blockInputPos4 !== 0) firstEmptyInputBlockIndex = _bi3;

          if (_blockInputPos4 !== 0) {
            if (_blockInputPos4 !== _block4.value.length) {
              // aligned inside block - return immediately
              return this._blockStartPos(_bi3) + _blockInputPos4;
            } else {
              // found filled
              firstFilledInputBlockIndex = _bi3;
              break;
            }
          }
        }

        if (direction === _utils.DIRECTION.LEFT) {
          // try find first empty input before start searching position only when not forced
          for (var _bi4 = firstFilledInputBlockIndex + 1; _bi4 <= Math.min(searchBlockIndex, this._blocks.length - 1); ++_bi4) {
            var _block5 = this._blocks[_bi4];

            var _blockInputPos5 = _block5.nearestInputPos(0, _utils.DIRECTION.NONE);

            var blockAlignedPos = this._blockStartPos(_bi4) + _blockInputPos5;

            if (blockAlignedPos > cursorPos) break; // if block is not lazy input

            if (_blockInputPos5 !== _block5.value.length) return blockAlignedPos;
          }
        } // process overflow


        if (firstFilledInputBlockIndex >= 0) {
          return this._blockStartPos(firstFilledInputBlockIndex) + this._blocks[firstFilledInputBlockIndex].value.length;
        } // for lazy if has aligned left inside fixed and has came to the start - use start position


        if (direction === _utils.DIRECTION.FORCE_LEFT || this.lazy && !this.extractInput() && !isInput(this._blocks[searchBlockIndex])) {
          return 0;
        }

        if (firstEmptyInputBlockIndex != null) {
          return this._blockStartPos(firstEmptyInputBlockIndex);
        } // find first input


        for (var _bi5 = searchBlockIndex; _bi5 < this._blocks.length; ++_bi5) {
          var _block6 = this._blocks[_bi5];

          var _blockInputPos6 = _block6.nearestInputPos(0, _utils.DIRECTION.NONE); // is input


          if (!_block6.value.length || _blockInputPos6 !== _block6.value.length) {
            return this._blockStartPos(_bi5) + _blockInputPos6;
          }
        }

        return 0;
      }

      if (direction === _utils.DIRECTION.RIGHT || direction === _utils.DIRECTION.FORCE_RIGHT) {
        // ->
        //  any|not-len-aligned and filled
        //  any|not-len-aligned
        // <-
        //  not-0-aligned or start|any
        var firstInputBlockAlignedIndex;
        var firstInputBlockAlignedPos;

        for (var _bi6 = searchBlockIndex; _bi6 < this._blocks.length; ++_bi6) {
          var _block7 = this._blocks[_bi6];

          var _blockInputPos7 = _block7.nearestInputPos(0, _utils.DIRECTION.NONE);

          if (_blockInputPos7 !== _block7.value.length) {
            firstInputBlockAlignedPos = this._blockStartPos(_bi6) + _blockInputPos7;
            firstInputBlockAlignedIndex = _bi6;
            break;
          }
        }

        if (firstInputBlockAlignedIndex != null && firstInputBlockAlignedPos != null) {
          for (var _bi7 = firstInputBlockAlignedIndex; _bi7 < this._blocks.length; ++_bi7) {
            var _block8 = this._blocks[_bi7];

            var _blockInputPos8 = _block8.nearestInputPos(0, _utils.DIRECTION.FORCE_RIGHT);

            if (_blockInputPos8 !== _block8.value.length) {
              return this._blockStartPos(_bi7) + _blockInputPos8;
            }
          }

          return direction === _utils.DIRECTION.FORCE_RIGHT ? this.value.length : firstInputBlockAlignedPos;
        }

        for (var _bi8 = Math.min(searchBlockIndex, this._blocks.length - 1); _bi8 >= 0; --_bi8) {
          var _block9 = this._blocks[_bi8];

          var _blockInputPos9 = _block9.nearestInputPos(_block9.value.length, _utils.DIRECTION.LEFT);

          if (_blockInputPos9 !== 0) {
            var alignedPos = this._blockStartPos(_bi8) + _blockInputPos9;

            if (alignedPos >= cursorPos) return alignedPos;
            break;
          }
        }
      }

      return cursorPos;
    }
    /** Get block by name */

  }, {
    key: "maskedBlock",
    value: function maskedBlock(name) {
      return this.maskedBlocks(name)[0];
    }
    /** Get all blocks by name */

  }, {
    key: "maskedBlocks",
    value: function maskedBlocks(name) {
      var _this4 = this;

      var indices = this._maskedBlocks[name];
      if (!indices) return [];
      return indices.map(function (gi) {
        return _this4._blocks[gi];
      });
    }
  }]);
  return MaskedPattern;
}(_base.default);

MaskedPattern.DEFAULTS = {
  lazy: true,
  placeholderChar: '_'
};
MaskedPattern.STOP_CHAR = '`';
MaskedPattern.ESCAPE_CHAR = '\\';
MaskedPattern.InputDefinition = _inputDefinition.default;
MaskedPattern.FixedDefinition = _fixedDefinition.default;

function isInput(block) {
  if (!block) return false;
  var value = block.value;
  return !value || block.nearestInputPos(0, _utils.DIRECTION.NONE) !== value.length;
}

_holder.default.MaskedPattern = MaskedPattern;
var _default = MaskedPattern;
exports.default = _default;
},{"../_rollupPluginBabelHelpers-74ba0139.js":"../node_modules/imask/esm/_rollupPluginBabelHelpers-74ba0139.js","../core/utils.js":"../node_modules/imask/esm/core/utils.js","../core/change-details.js":"../node_modules/imask/esm/core/change-details.js","./base.js":"../node_modules/imask/esm/masked/base.js","./pattern/input-definition.js":"../node_modules/imask/esm/masked/pattern/input-definition.js","./pattern/fixed-definition.js":"../node_modules/imask/esm/masked/pattern/fixed-definition.js","./pattern/chunk-tail-details.js":"../node_modules/imask/esm/masked/pattern/chunk-tail-details.js","./factory.js":"../node_modules/imask/esm/masked/factory.js","../core/holder.js":"../node_modules/imask/esm/core/holder.js","./regexp.js":"../node_modules/imask/esm/masked/regexp.js","../core/continuous-tail-details.js":"../node_modules/imask/esm/core/continuous-tail-details.js"}],"../node_modules/imask/esm/masked/range.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rollupPluginBabelHelpers74ba = require("../_rollupPluginBabelHelpers-74ba0139.js");

var _pattern = _interopRequireDefault(require("./pattern.js"));

var _holder = _interopRequireDefault(require("../core/holder.js"));

require("../core/utils.js");

require("../core/change-details.js");

require("./base.js");

require("../core/continuous-tail-details.js");

require("./pattern/input-definition.js");

require("./factory.js");

require("./pattern/fixed-definition.js");

require("./pattern/chunk-tail-details.js");

require("./regexp.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Pattern which accepts ranges */
var MaskedRange = /*#__PURE__*/function (_MaskedPattern) {
  (0, _rollupPluginBabelHelpers74ba.d)(MaskedRange, _MaskedPattern);

  var _super = (0, _rollupPluginBabelHelpers74ba.e)(MaskedRange);

  function MaskedRange() {
    (0, _rollupPluginBabelHelpers74ba.a)(this, MaskedRange);
    return _super.apply(this, arguments);
  }

  (0, _rollupPluginBabelHelpers74ba._)(MaskedRange, [{
    key: "_matchFrom",
    get:
    /**
      Optionally sets max length of pattern.
      Used when pattern length is longer then `to` param length. Pads zeros at start in this case.
    */

    /** Min bound */

    /** Max bound */

    /** */
    function get() {
      return this.maxLength - String(this.from).length;
    }
    /**
      @override
    */

  }, {
    key: "_update",
    value: function _update(opts) {
      // TODO type
      opts = Object.assign({
        to: this.to || 0,
        from: this.from || 0
      }, opts);
      var maxLength = String(opts.to).length;
      if (opts.maxLength != null) maxLength = Math.max(maxLength, opts.maxLength);
      opts.maxLength = maxLength;
      var fromStr = String(opts.from).padStart(maxLength, '0');
      var toStr = String(opts.to).padStart(maxLength, '0');
      var sameCharsCount = 0;

      while (sameCharsCount < toStr.length && toStr[sameCharsCount] === fromStr[sameCharsCount]) {
        ++sameCharsCount;
      }

      opts.mask = toStr.slice(0, sameCharsCount).replace(/0/g, '\\0') + '0'.repeat(maxLength - sameCharsCount);
      (0, _rollupPluginBabelHelpers74ba.g)((0, _rollupPluginBabelHelpers74ba.h)(MaskedRange.prototype), "_update", this).call(this, opts);
    }
    /**
      @override
    */

  }, {
    key: "isComplete",
    get: function get() {
      return (0, _rollupPluginBabelHelpers74ba.g)((0, _rollupPluginBabelHelpers74ba.h)(MaskedRange.prototype), "isComplete", this) && Boolean(this.value);
    }
  }, {
    key: "boundaries",
    value: function boundaries(str) {
      var minstr = '';
      var maxstr = '';

      var _ref = str.match(/^(\D*)(\d*)(\D*)/) || [],
          _ref2 = (0, _rollupPluginBabelHelpers74ba.f)(_ref, 3),
          placeholder = _ref2[1],
          num = _ref2[2];

      if (num) {
        minstr = '0'.repeat(placeholder.length) + num;
        maxstr = '9'.repeat(placeholder.length) + num;
      }

      minstr = minstr.padEnd(this.maxLength, '0');
      maxstr = maxstr.padEnd(this.maxLength, '9');
      return [minstr, maxstr];
    }
    /**
      @override
    */

  }, {
    key: "doPrepare",
    value: function doPrepare(str) {
      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      str = (0, _rollupPluginBabelHelpers74ba.g)((0, _rollupPluginBabelHelpers74ba.h)(MaskedRange.prototype), "doPrepare", this).call(this, str, flags).replace(/\D/g, '');
      if (!this.autofix) return str;
      var fromStr = String(this.from).padStart(this.maxLength, '0');
      var toStr = String(this.to).padStart(this.maxLength, '0');
      var val = this.value;
      var prepStr = '';

      for (var ci = 0; ci < str.length; ++ci) {
        var nextVal = val + prepStr + str[ci];

        var _this$boundaries = this.boundaries(nextVal),
            _this$boundaries2 = (0, _rollupPluginBabelHelpers74ba.f)(_this$boundaries, 2),
            minstr = _this$boundaries2[0],
            maxstr = _this$boundaries2[1];

        if (Number(maxstr) < this.from) prepStr += fromStr[nextVal.length - 1];else if (Number(minstr) > this.to) prepStr += toStr[nextVal.length - 1];else prepStr += str[ci];
      }

      return prepStr;
    }
    /**
      @override
    */

  }, {
    key: "doValidate",
    value: function doValidate() {
      var _get2;

      var str = this.value;
      var firstNonZero = str.search(/[^0]/);
      if (firstNonZero === -1 && str.length <= this._matchFrom) return true;

      var _this$boundaries3 = this.boundaries(str),
          _this$boundaries4 = (0, _rollupPluginBabelHelpers74ba.f)(_this$boundaries3, 2),
          minstr = _this$boundaries4[0],
          maxstr = _this$boundaries4[1];

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return this.from <= Number(maxstr) && Number(minstr) <= this.to && (_get2 = (0, _rollupPluginBabelHelpers74ba.g)((0, _rollupPluginBabelHelpers74ba.h)(MaskedRange.prototype), "doValidate", this)).call.apply(_get2, [this].concat(args));
    }
  }]);
  return MaskedRange;
}(_pattern.default);

_holder.default.MaskedRange = MaskedRange;
var _default = MaskedRange;
exports.default = _default;
},{"../_rollupPluginBabelHelpers-74ba0139.js":"../node_modules/imask/esm/_rollupPluginBabelHelpers-74ba0139.js","./pattern.js":"../node_modules/imask/esm/masked/pattern.js","../core/holder.js":"../node_modules/imask/esm/core/holder.js","../core/utils.js":"../node_modules/imask/esm/core/utils.js","../core/change-details.js":"../node_modules/imask/esm/core/change-details.js","./base.js":"../node_modules/imask/esm/masked/base.js","../core/continuous-tail-details.js":"../node_modules/imask/esm/core/continuous-tail-details.js","./pattern/input-definition.js":"../node_modules/imask/esm/masked/pattern/input-definition.js","./factory.js":"../node_modules/imask/esm/masked/factory.js","./pattern/fixed-definition.js":"../node_modules/imask/esm/masked/pattern/fixed-definition.js","./pattern/chunk-tail-details.js":"../node_modules/imask/esm/masked/pattern/chunk-tail-details.js","./regexp.js":"../node_modules/imask/esm/masked/regexp.js"}],"../node_modules/imask/esm/masked/date.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rollupPluginBabelHelpers74ba = require("../_rollupPluginBabelHelpers-74ba0139.js");

var _pattern = _interopRequireDefault(require("./pattern.js"));

var _range = _interopRequireDefault(require("./range.js"));

var _holder = _interopRequireDefault(require("../core/holder.js"));

require("../core/utils.js");

require("../core/change-details.js");

require("./base.js");

require("../core/continuous-tail-details.js");

require("./pattern/input-definition.js");

require("./factory.js");

require("./pattern/fixed-definition.js");

require("./pattern/chunk-tail-details.js");

require("./regexp.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Date mask */
var MaskedDate = /*#__PURE__*/function (_MaskedPattern) {
  (0, _rollupPluginBabelHelpers74ba.d)(MaskedDate, _MaskedPattern);

  var _super = (0, _rollupPluginBabelHelpers74ba.e)(MaskedDate);
  /** Pattern mask for date according to {@link MaskedDate#format} */

  /** Start date */

  /** End date */

  /** */

  /**
    @param {Object} opts
  */


  function MaskedDate(opts) {
    (0, _rollupPluginBabelHelpers74ba.a)(this, MaskedDate);
    return _super.call(this, Object.assign({}, MaskedDate.DEFAULTS, opts));
  }
  /**
    @override
  */


  (0, _rollupPluginBabelHelpers74ba._)(MaskedDate, [{
    key: "_update",
    value: function _update(opts) {
      if (opts.mask === Date) delete opts.mask;
      if (opts.pattern) opts.mask = opts.pattern;
      var blocks = opts.blocks;
      opts.blocks = Object.assign({}, MaskedDate.GET_DEFAULT_BLOCKS()); // adjust year block

      if (opts.min) opts.blocks.Y.from = opts.min.getFullYear();
      if (opts.max) opts.blocks.Y.to = opts.max.getFullYear();

      if (opts.min && opts.max && opts.blocks.Y.from === opts.blocks.Y.to) {
        opts.blocks.m.from = opts.min.getMonth() + 1;
        opts.blocks.m.to = opts.max.getMonth() + 1;

        if (opts.blocks.m.from === opts.blocks.m.to) {
          opts.blocks.d.from = opts.min.getDate();
          opts.blocks.d.to = opts.max.getDate();
        }
      }

      Object.assign(opts.blocks, blocks); // add autofix

      Object.keys(opts.blocks).forEach(function (bk) {
        var b = opts.blocks[bk];
        if (!('autofix' in b)) b.autofix = opts.autofix;
      });
      (0, _rollupPluginBabelHelpers74ba.g)((0, _rollupPluginBabelHelpers74ba.h)(MaskedDate.prototype), "_update", this).call(this, opts);
    }
    /**
      @override
    */

  }, {
    key: "doValidate",
    value: function doValidate() {
      var _get2;

      var date = this.date;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return (_get2 = (0, _rollupPluginBabelHelpers74ba.g)((0, _rollupPluginBabelHelpers74ba.h)(MaskedDate.prototype), "doValidate", this)).call.apply(_get2, [this].concat(args)) && (!this.isComplete || this.isDateExist(this.value) && date != null && (this.min == null || this.min <= date) && (this.max == null || date <= this.max));
    }
    /** Checks if date is exists */

  }, {
    key: "isDateExist",
    value: function isDateExist(str) {
      return this.format(this.parse(str, this), this).indexOf(str) >= 0;
    }
    /** Parsed Date */

  }, {
    key: "date",
    get: function get() {
      return this.typedValue;
    },
    set: function set(date) {
      this.typedValue = date;
    }
    /**
      @override
    */

  }, {
    key: "typedValue",
    get: function get() {
      return this.isComplete ? (0, _rollupPluginBabelHelpers74ba.g)((0, _rollupPluginBabelHelpers74ba.h)(MaskedDate.prototype), "typedValue", this) : null;
    },
    set: function set(value) {
      (0, _rollupPluginBabelHelpers74ba.i)((0, _rollupPluginBabelHelpers74ba.h)(MaskedDate.prototype), "typedValue", value, this, true);
    }
  }]);
  return MaskedDate;
}(_pattern.default);

MaskedDate.DEFAULTS = {
  pattern: 'd{.}`m{.}`Y',
  format: function format(date) {
    var day = String(date.getDate()).padStart(2, '0');
    var month = String(date.getMonth() + 1).padStart(2, '0');
    var year = date.getFullYear();
    return [day, month, year].join('.');
  },
  parse: function parse(str) {
    var _str$split = str.split('.'),
        _str$split2 = (0, _rollupPluginBabelHelpers74ba.f)(_str$split, 3),
        day = _str$split2[0],
        month = _str$split2[1],
        year = _str$split2[2];

    return new Date(year, month - 1, day);
  }
};

MaskedDate.GET_DEFAULT_BLOCKS = function () {
  return {
    d: {
      mask: _range.default,
      from: 1,
      to: 31,
      maxLength: 2
    },
    m: {
      mask: _range.default,
      from: 1,
      to: 12,
      maxLength: 2
    },
    Y: {
      mask: _range.default,
      from: 1900,
      to: 9999
    }
  };
};

_holder.default.MaskedDate = MaskedDate;
var _default = MaskedDate;
exports.default = _default;
},{"../_rollupPluginBabelHelpers-74ba0139.js":"../node_modules/imask/esm/_rollupPluginBabelHelpers-74ba0139.js","./pattern.js":"../node_modules/imask/esm/masked/pattern.js","./range.js":"../node_modules/imask/esm/masked/range.js","../core/holder.js":"../node_modules/imask/esm/core/holder.js","../core/utils.js":"../node_modules/imask/esm/core/utils.js","../core/change-details.js":"../node_modules/imask/esm/core/change-details.js","./base.js":"../node_modules/imask/esm/masked/base.js","../core/continuous-tail-details.js":"../node_modules/imask/esm/core/continuous-tail-details.js","./pattern/input-definition.js":"../node_modules/imask/esm/masked/pattern/input-definition.js","./factory.js":"../node_modules/imask/esm/masked/factory.js","./pattern/fixed-definition.js":"../node_modules/imask/esm/masked/pattern/fixed-definition.js","./pattern/chunk-tail-details.js":"../node_modules/imask/esm/masked/pattern/chunk-tail-details.js","./regexp.js":"../node_modules/imask/esm/masked/regexp.js"}],"../node_modules/imask/esm/controls/mask-element.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rollupPluginBabelHelpers74ba = require("../_rollupPluginBabelHelpers-74ba0139.js");

var _holder = _interopRequireDefault(require("../core/holder.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
  Generic element API to use with mask
  @interface
*/
var MaskElement = /*#__PURE__*/function () {
  function MaskElement() {
    (0, _rollupPluginBabelHelpers74ba.a)(this, MaskElement);
  }

  (0, _rollupPluginBabelHelpers74ba._)(MaskElement, [{
    key: "selectionStart",
    get:
    /** */

    /** */

    /** */

    /** Safely returns selection start */
    function get() {
      var start;

      try {
        start = this._unsafeSelectionStart;
      } catch (e) {}

      return start != null ? start : this.value.length;
    }
    /** Safely returns selection end */

  }, {
    key: "selectionEnd",
    get: function get() {
      var end;

      try {
        end = this._unsafeSelectionEnd;
      } catch (e) {}

      return end != null ? end : this.value.length;
    }
    /** Safely sets element selection */

  }, {
    key: "select",
    value: function select(start, end) {
      if (start == null || end == null || start === this.selectionStart && end === this.selectionEnd) return;

      try {
        this._unsafeSelect(start, end);
      } catch (e) {}
    }
    /** Should be overriden in subclasses */

  }, {
    key: "_unsafeSelect",
    value: function _unsafeSelect(start, end) {}
    /** Should be overriden in subclasses */

  }, {
    key: "isActive",
    get: function get() {
      return false;
    }
    /** Should be overriden in subclasses */

  }, {
    key: "bindEvents",
    value: function bindEvents(handlers) {}
    /** Should be overriden in subclasses */

  }, {
    key: "unbindEvents",
    value: function unbindEvents() {}
  }]);
  return MaskElement;
}();

_holder.default.MaskElement = MaskElement;
var _default = MaskElement;
exports.default = _default;
},{"../_rollupPluginBabelHelpers-74ba0139.js":"../node_modules/imask/esm/_rollupPluginBabelHelpers-74ba0139.js","../core/holder.js":"../node_modules/imask/esm/core/holder.js"}],"../node_modules/imask/esm/controls/html-mask-element.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rollupPluginBabelHelpers74ba = require("../_rollupPluginBabelHelpers-74ba0139.js");

var _maskElement = _interopRequireDefault(require("./mask-element.js"));

var _holder = _interopRequireDefault(require("../core/holder.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Bridge between HTMLElement and {@link Masked} */
var HTMLMaskElement = /*#__PURE__*/function (_MaskElement) {
  (0, _rollupPluginBabelHelpers74ba.d)(HTMLMaskElement, _MaskElement);

  var _super = (0, _rollupPluginBabelHelpers74ba.e)(HTMLMaskElement);
  /** Mapping between HTMLElement events and mask internal events */

  /** HTMLElement to use mask on */

  /**
    @param {HTMLInputElement|HTMLTextAreaElement} input
  */


  function HTMLMaskElement(input) {
    var _this;

    (0, _rollupPluginBabelHelpers74ba.a)(this, HTMLMaskElement);
    _this = _super.call(this);
    _this.input = input;
    _this._handlers = {};
    return _this;
  }
  /** */
  // $FlowFixMe https://github.com/facebook/flow/issues/2839


  (0, _rollupPluginBabelHelpers74ba._)(HTMLMaskElement, [{
    key: "rootElement",
    get: function get() {
      return this.input.getRootNode ? this.input.getRootNode() : document;
    }
    /**
      Is element in focus
      @readonly
    */

  }, {
    key: "isActive",
    get: function get() {
      //$FlowFixMe
      return this.input === this.rootElement.activeElement;
    }
    /**
      Returns HTMLElement selection start
      @override
    */

  }, {
    key: "_unsafeSelectionStart",
    get: function get() {
      return this.input.selectionStart;
    }
    /**
      Returns HTMLElement selection end
      @override
    */

  }, {
    key: "_unsafeSelectionEnd",
    get: function get() {
      return this.input.selectionEnd;
    }
    /**
      Sets HTMLElement selection
      @override
    */

  }, {
    key: "_unsafeSelect",
    value: function _unsafeSelect(start, end) {
      this.input.setSelectionRange(start, end);
    }
    /**
      HTMLElement value
      @override
    */

  }, {
    key: "value",
    get: function get() {
      return this.input.value;
    },
    set: function set(value) {
      this.input.value = value;
    }
    /**
      Binds HTMLElement events to mask internal events
      @override
    */

  }, {
    key: "bindEvents",
    value: function bindEvents(handlers) {
      var _this2 = this;

      Object.keys(handlers).forEach(function (event) {
        return _this2._toggleEventHandler(HTMLMaskElement.EVENTS_MAP[event], handlers[event]);
      });
    }
    /**
      Unbinds HTMLElement events to mask internal events
      @override
    */

  }, {
    key: "unbindEvents",
    value: function unbindEvents() {
      var _this3 = this;

      Object.keys(this._handlers).forEach(function (event) {
        return _this3._toggleEventHandler(event);
      });
    }
    /** */

  }, {
    key: "_toggleEventHandler",
    value: function _toggleEventHandler(event, handler) {
      if (this._handlers[event]) {
        this.input.removeEventListener(event, this._handlers[event]);
        delete this._handlers[event];
      }

      if (handler) {
        this.input.addEventListener(event, handler);
        this._handlers[event] = handler;
      }
    }
  }]);
  return HTMLMaskElement;
}(_maskElement.default);

HTMLMaskElement.EVENTS_MAP = {
  selectionChange: 'keydown',
  input: 'input',
  drop: 'drop',
  click: 'click',
  focus: 'focus',
  commit: 'blur'
};
_holder.default.HTMLMaskElement = HTMLMaskElement;
var _default = HTMLMaskElement;
exports.default = _default;
},{"../_rollupPluginBabelHelpers-74ba0139.js":"../node_modules/imask/esm/_rollupPluginBabelHelpers-74ba0139.js","./mask-element.js":"../node_modules/imask/esm/controls/mask-element.js","../core/holder.js":"../node_modules/imask/esm/core/holder.js"}],"../node_modules/imask/esm/controls/html-contenteditable-mask-element.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rollupPluginBabelHelpers74ba = require("../_rollupPluginBabelHelpers-74ba0139.js");

var _htmlMaskElement = _interopRequireDefault(require("./html-mask-element.js"));

var _holder = _interopRequireDefault(require("../core/holder.js"));

require("./mask-element.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HTMLContenteditableMaskElement = /*#__PURE__*/function (_HTMLMaskElement) {
  (0, _rollupPluginBabelHelpers74ba.d)(HTMLContenteditableMaskElement, _HTMLMaskElement);

  var _super = (0, _rollupPluginBabelHelpers74ba.e)(HTMLContenteditableMaskElement);

  function HTMLContenteditableMaskElement() {
    (0, _rollupPluginBabelHelpers74ba.a)(this, HTMLContenteditableMaskElement);
    return _super.apply(this, arguments);
  }

  (0, _rollupPluginBabelHelpers74ba._)(HTMLContenteditableMaskElement, [{
    key: "_unsafeSelectionStart",
    get:
    /**
      Returns HTMLElement selection start
      @override
    */
    function get() {
      var root = this.rootElement;
      var selection = root.getSelection && root.getSelection();
      return selection && selection.anchorOffset;
    }
    /**
      Returns HTMLElement selection end
      @override
    */

  }, {
    key: "_unsafeSelectionEnd",
    get: function get() {
      var root = this.rootElement;
      var selection = root.getSelection && root.getSelection();
      return selection && this._unsafeSelectionStart + String(selection).length;
    }
    /**
      Sets HTMLElement selection
      @override
    */

  }, {
    key: "_unsafeSelect",
    value: function _unsafeSelect(start, end) {
      if (!this.rootElement.createRange) return;
      var range = this.rootElement.createRange();
      range.setStart(this.input.firstChild || this.input, start);
      range.setEnd(this.input.lastChild || this.input, end);
      var root = this.rootElement;
      var selection = root.getSelection && root.getSelection();

      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
    /**
      HTMLElement value
      @override
    */

  }, {
    key: "value",
    get: function get() {
      // $FlowFixMe
      return this.input.textContent;
    },
    set: function set(value) {
      this.input.textContent = value;
    }
  }]);
  return HTMLContenteditableMaskElement;
}(_htmlMaskElement.default);

_holder.default.HTMLContenteditableMaskElement = HTMLContenteditableMaskElement;
var _default = HTMLContenteditableMaskElement;
exports.default = _default;
},{"../_rollupPluginBabelHelpers-74ba0139.js":"../node_modules/imask/esm/_rollupPluginBabelHelpers-74ba0139.js","./html-mask-element.js":"../node_modules/imask/esm/controls/html-mask-element.js","../core/holder.js":"../node_modules/imask/esm/core/holder.js","./mask-element.js":"../node_modules/imask/esm/controls/mask-element.js"}],"../node_modules/imask/esm/controls/input.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rollupPluginBabelHelpers74ba = require("../_rollupPluginBabelHelpers-74ba0139.js");

var _utils = require("../core/utils.js");

var _actionDetails = _interopRequireDefault(require("../core/action-details.js"));

var _date = _interopRequireDefault(require("../masked/date.js"));

var _factory = _interopRequireWildcard(require("../masked/factory.js"));

var _maskElement = _interopRequireDefault(require("./mask-element.js"));

var _htmlMaskElement = _interopRequireDefault(require("./html-mask-element.js"));

var _htmlContenteditableMaskElement = _interopRequireDefault(require("./html-contenteditable-mask-element.js"));

var _holder = _interopRequireDefault(require("../core/holder.js"));

require("../masked/pattern.js");

require("../core/change-details.js");

require("../masked/base.js");

require("../core/continuous-tail-details.js");

require("../masked/pattern/input-definition.js");

require("../masked/pattern/fixed-definition.js");

require("../masked/pattern/chunk-tail-details.js");

require("../masked/regexp.js");

require("../masked/range.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _excluded = ["mask"];
/** Listens to element events and controls changes between element and {@link Masked} */

var InputMask = /*#__PURE__*/function () {
  /**
    View element
    @readonly
  */

  /**
    Internal {@link Masked} model
    @readonly
  */

  /**
    @param {MaskElement|HTMLInputElement|HTMLTextAreaElement} el
    @param {Object} opts
  */
  function InputMask(el, opts) {
    (0, _rollupPluginBabelHelpers74ba.a)(this, InputMask);
    this.el = el instanceof _maskElement.default ? el : el.isContentEditable && el.tagName !== 'INPUT' && el.tagName !== 'TEXTAREA' ? new _htmlContenteditableMaskElement.default(el) : new _htmlMaskElement.default(el);
    this.masked = (0, _factory.default)(opts);
    this._listeners = {};
    this._value = '';
    this._unmaskedValue = '';
    this._saveSelection = this._saveSelection.bind(this);
    this._onInput = this._onInput.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onDrop = this._onDrop.bind(this);
    this._onFocus = this._onFocus.bind(this);
    this._onClick = this._onClick.bind(this);
    this.alignCursor = this.alignCursor.bind(this);
    this.alignCursorFriendly = this.alignCursorFriendly.bind(this);

    this._bindEvents(); // refresh


    this.updateValue();

    this._onChange();
  }
  /** Read or update mask */


  (0, _rollupPluginBabelHelpers74ba._)(InputMask, [{
    key: "mask",
    get: function get() {
      return this.masked.mask;
    },
    set: function set(mask) {
      if (this.maskEquals(mask)) return;

      if (!(mask instanceof _holder.default.Masked) && this.masked.constructor === (0, _factory.maskedClass)(mask)) {
        this.masked.updateOptions({
          mask: mask
        });
        return;
      }

      var masked = (0, _factory.default)({
        mask: mask
      });
      masked.unmaskedValue = this.masked.unmaskedValue;
      this.masked = masked;
    }
    /** Raw value */

  }, {
    key: "maskEquals",
    value: function maskEquals(mask) {
      return mask == null || mask === this.masked.mask || mask === Date && this.masked instanceof _date.default;
    }
  }, {
    key: "value",
    get: function get() {
      return this._value;
    },
    set: function set(str) {
      this.masked.value = str;
      this.updateControl();
      this.alignCursor();
    }
    /** Unmasked value */

  }, {
    key: "unmaskedValue",
    get: function get() {
      return this._unmaskedValue;
    },
    set: function set(str) {
      this.masked.unmaskedValue = str;
      this.updateControl();
      this.alignCursor();
    }
    /** Typed unmasked value */

  }, {
    key: "typedValue",
    get: function get() {
      return this.masked.typedValue;
    },
    set: function set(val) {
      this.masked.typedValue = val;
      this.updateControl();
      this.alignCursor();
    }
    /**
      Starts listening to element events
      @protected
    */

  }, {
    key: "_bindEvents",
    value: function _bindEvents() {
      this.el.bindEvents({
        selectionChange: this._saveSelection,
        input: this._onInput,
        drop: this._onDrop,
        click: this._onClick,
        focus: this._onFocus,
        commit: this._onChange
      });
    }
    /**
      Stops listening to element events
      @protected
     */

  }, {
    key: "_unbindEvents",
    value: function _unbindEvents() {
      if (this.el) this.el.unbindEvents();
    }
    /**
      Fires custom event
      @protected
     */

  }, {
    key: "_fireEvent",
    value: function _fireEvent(ev) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var listeners = this._listeners[ev];
      if (!listeners) return;
      listeners.forEach(function (l) {
        return l.apply(void 0, args);
      });
    }
    /**
      Current selection start
      @readonly
    */

  }, {
    key: "selectionStart",
    get: function get() {
      return this._cursorChanging ? this._changingCursorPos : this.el.selectionStart;
    }
    /** Current cursor position */

  }, {
    key: "cursorPos",
    get: function get() {
      return this._cursorChanging ? this._changingCursorPos : this.el.selectionEnd;
    },
    set: function set(pos) {
      if (!this.el || !this.el.isActive) return;
      this.el.select(pos, pos);

      this._saveSelection();
    }
    /**
      Stores current selection
      @protected
    */

  }, {
    key: "_saveSelection",
    value: function _saveSelection()
    /* ev */
    {
      if (this.value !== this.el.value) {
        console.warn('Element value was changed outside of mask. Syncronize mask using `mask.updateValue()` to work properly.'); // eslint-disable-line no-console
      }

      this._selection = {
        start: this.selectionStart,
        end: this.cursorPos
      };
    }
    /** Syncronizes model value from view */

  }, {
    key: "updateValue",
    value: function updateValue() {
      this.masked.value = this.el.value;
      this._value = this.masked.value;
    }
    /** Syncronizes view from model value, fires change events */

  }, {
    key: "updateControl",
    value: function updateControl() {
      var newUnmaskedValue = this.masked.unmaskedValue;
      var newValue = this.masked.value;
      var isChanged = this.unmaskedValue !== newUnmaskedValue || this.value !== newValue;
      this._unmaskedValue = newUnmaskedValue;
      this._value = newValue;
      if (this.el.value !== newValue) this.el.value = newValue;
      if (isChanged) this._fireChangeEvents();
    }
    /** Updates options with deep equal check, recreates @{link Masked} model if mask type changes */

  }, {
    key: "updateOptions",
    value: function updateOptions(opts) {
      var mask = opts.mask,
          restOpts = (0, _rollupPluginBabelHelpers74ba.b)(opts, _excluded);
      var updateMask = !this.maskEquals(mask);
      var updateOpts = !(0, _utils.objectIncludes)(this.masked, restOpts);
      if (updateMask) this.mask = mask;
      if (updateOpts) this.masked.updateOptions(restOpts);
      if (updateMask || updateOpts) this.updateControl();
    }
    /** Updates cursor */

  }, {
    key: "updateCursor",
    value: function updateCursor(cursorPos) {
      if (cursorPos == null) return;
      this.cursorPos = cursorPos; // also queue change cursor for mobile browsers

      this._delayUpdateCursor(cursorPos);
    }
    /**
      Delays cursor update to support mobile browsers
      @private
    */

  }, {
    key: "_delayUpdateCursor",
    value: function _delayUpdateCursor(cursorPos) {
      var _this = this;

      this._abortUpdateCursor();

      this._changingCursorPos = cursorPos;
      this._cursorChanging = setTimeout(function () {
        if (!_this.el) return; // if was destroyed

        _this.cursorPos = _this._changingCursorPos;

        _this._abortUpdateCursor();
      }, 10);
    }
    /**
      Fires custom events
      @protected
    */

  }, {
    key: "_fireChangeEvents",
    value: function _fireChangeEvents() {
      this._fireEvent('accept', this._inputEvent);

      if (this.masked.isComplete) this._fireEvent('complete', this._inputEvent);
    }
    /**
      Aborts delayed cursor update
      @private
    */

  }, {
    key: "_abortUpdateCursor",
    value: function _abortUpdateCursor() {
      if (this._cursorChanging) {
        clearTimeout(this._cursorChanging);
        delete this._cursorChanging;
      }
    }
    /** Aligns cursor to nearest available position */

  }, {
    key: "alignCursor",
    value: function alignCursor() {
      this.cursorPos = this.masked.nearestInputPos(this.cursorPos, _utils.DIRECTION.LEFT);
    }
    /** Aligns cursor only if selection is empty */

  }, {
    key: "alignCursorFriendly",
    value: function alignCursorFriendly() {
      if (this.selectionStart !== this.cursorPos) return; // skip if range is selected

      this.alignCursor();
    }
    /** Adds listener on custom event */

  }, {
    key: "on",
    value: function on(ev, handler) {
      if (!this._listeners[ev]) this._listeners[ev] = [];

      this._listeners[ev].push(handler);

      return this;
    }
    /** Removes custom event listener */

  }, {
    key: "off",
    value: function off(ev, handler) {
      if (!this._listeners[ev]) return this;

      if (!handler) {
        delete this._listeners[ev];
        return this;
      }

      var hIndex = this._listeners[ev].indexOf(handler);

      if (hIndex >= 0) this._listeners[ev].splice(hIndex, 1);
      return this;
    }
    /** Handles view input event */

  }, {
    key: "_onInput",
    value: function _onInput(e) {
      this._inputEvent = e;

      this._abortUpdateCursor(); // fix strange IE behavior


      if (!this._selection) return this.updateValue();
      var details = new _actionDetails.default( // new state
      this.el.value, this.cursorPos, // old state
      this.value, this._selection);
      var oldRawValue = this.masked.rawInputValue;
      var offset = this.masked.splice(details.startChangePos, details.removed.length, details.inserted, details.removeDirection).offset; // force align in remove direction only if no input chars were removed
      // otherwise we still need to align with NONE (to get out from fixed symbols for instance)

      var removeDirection = oldRawValue === this.masked.rawInputValue ? details.removeDirection : _utils.DIRECTION.NONE;
      var cursorPos = this.masked.nearestInputPos(details.startChangePos + offset, removeDirection);
      this.updateControl();
      this.updateCursor(cursorPos);
      delete this._inputEvent;
    }
    /** Handles view change event and commits model value */

  }, {
    key: "_onChange",
    value: function _onChange() {
      if (this.value !== this.el.value) {
        this.updateValue();
      }

      this.masked.doCommit();
      this.updateControl();

      this._saveSelection();
    }
    /** Handles view drop event, prevents by default */

  }, {
    key: "_onDrop",
    value: function _onDrop(ev) {
      ev.preventDefault();
      ev.stopPropagation();
    }
    /** Restore last selection on focus */

  }, {
    key: "_onFocus",
    value: function _onFocus(ev) {
      this.alignCursorFriendly();
    }
    /** Restore last selection on focus */

  }, {
    key: "_onClick",
    value: function _onClick(ev) {
      this.alignCursorFriendly();
    }
    /** Unbind view events and removes element reference */

  }, {
    key: "destroy",
    value: function destroy() {
      this._unbindEvents(); // $FlowFixMe why not do so?


      this._listeners.length = 0; // $FlowFixMe

      delete this.el;
    }
  }]);
  return InputMask;
}();

_holder.default.InputMask = InputMask;
var _default = InputMask;
exports.default = _default;
},{"../_rollupPluginBabelHelpers-74ba0139.js":"../node_modules/imask/esm/_rollupPluginBabelHelpers-74ba0139.js","../core/utils.js":"../node_modules/imask/esm/core/utils.js","../core/action-details.js":"../node_modules/imask/esm/core/action-details.js","../masked/date.js":"../node_modules/imask/esm/masked/date.js","../masked/factory.js":"../node_modules/imask/esm/masked/factory.js","./mask-element.js":"../node_modules/imask/esm/controls/mask-element.js","./html-mask-element.js":"../node_modules/imask/esm/controls/html-mask-element.js","./html-contenteditable-mask-element.js":"../node_modules/imask/esm/controls/html-contenteditable-mask-element.js","../core/holder.js":"../node_modules/imask/esm/core/holder.js","../masked/pattern.js":"../node_modules/imask/esm/masked/pattern.js","../core/change-details.js":"../node_modules/imask/esm/core/change-details.js","../masked/base.js":"../node_modules/imask/esm/masked/base.js","../core/continuous-tail-details.js":"../node_modules/imask/esm/core/continuous-tail-details.js","../masked/pattern/input-definition.js":"../node_modules/imask/esm/masked/pattern/input-definition.js","../masked/pattern/fixed-definition.js":"../node_modules/imask/esm/masked/pattern/fixed-definition.js","../masked/pattern/chunk-tail-details.js":"../node_modules/imask/esm/masked/pattern/chunk-tail-details.js","../masked/regexp.js":"../node_modules/imask/esm/masked/regexp.js","../masked/range.js":"../node_modules/imask/esm/masked/range.js"}],"../node_modules/imask/esm/masked/enum.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rollupPluginBabelHelpers74ba = require("../_rollupPluginBabelHelpers-74ba0139.js");

var _pattern = _interopRequireDefault(require("./pattern.js"));

var _holder = _interopRequireDefault(require("../core/holder.js"));

require("../core/utils.js");

require("../core/change-details.js");

require("./base.js");

require("../core/continuous-tail-details.js");

require("./pattern/input-definition.js");

require("./factory.js");

require("./pattern/fixed-definition.js");

require("./pattern/chunk-tail-details.js");

require("./regexp.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Pattern which validates enum values */
var MaskedEnum = /*#__PURE__*/function (_MaskedPattern) {
  (0, _rollupPluginBabelHelpers74ba.d)(MaskedEnum, _MaskedPattern);

  var _super = (0, _rollupPluginBabelHelpers74ba.e)(MaskedEnum);

  function MaskedEnum() {
    (0, _rollupPluginBabelHelpers74ba.a)(this, MaskedEnum);
    return _super.apply(this, arguments);
  }

  (0, _rollupPluginBabelHelpers74ba._)(MaskedEnum, [{
    key: "_update",
    value:
    /**
      @override
      @param {Object} opts
    */
    function _update(opts) {
      // TODO type
      if (opts.enum) opts.mask = '*'.repeat(opts.enum[0].length);
      (0, _rollupPluginBabelHelpers74ba.g)((0, _rollupPluginBabelHelpers74ba.h)(MaskedEnum.prototype), "_update", this).call(this, opts);
    }
    /**
      @override
    */

  }, {
    key: "doValidate",
    value: function doValidate() {
      var _this = this,
          _get2;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return this.enum.some(function (e) {
        return e.indexOf(_this.unmaskedValue) >= 0;
      }) && (_get2 = (0, _rollupPluginBabelHelpers74ba.g)((0, _rollupPluginBabelHelpers74ba.h)(MaskedEnum.prototype), "doValidate", this)).call.apply(_get2, [this].concat(args));
    }
  }]);
  return MaskedEnum;
}(_pattern.default);

_holder.default.MaskedEnum = MaskedEnum;
var _default = MaskedEnum;
exports.default = _default;
},{"../_rollupPluginBabelHelpers-74ba0139.js":"../node_modules/imask/esm/_rollupPluginBabelHelpers-74ba0139.js","./pattern.js":"../node_modules/imask/esm/masked/pattern.js","../core/holder.js":"../node_modules/imask/esm/core/holder.js","../core/utils.js":"../node_modules/imask/esm/core/utils.js","../core/change-details.js":"../node_modules/imask/esm/core/change-details.js","./base.js":"../node_modules/imask/esm/masked/base.js","../core/continuous-tail-details.js":"../node_modules/imask/esm/core/continuous-tail-details.js","./pattern/input-definition.js":"../node_modules/imask/esm/masked/pattern/input-definition.js","./factory.js":"../node_modules/imask/esm/masked/factory.js","./pattern/fixed-definition.js":"../node_modules/imask/esm/masked/pattern/fixed-definition.js","./pattern/chunk-tail-details.js":"../node_modules/imask/esm/masked/pattern/chunk-tail-details.js","./regexp.js":"../node_modules/imask/esm/masked/regexp.js"}],"../node_modules/imask/esm/masked/number.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rollupPluginBabelHelpers74ba = require("../_rollupPluginBabelHelpers-74ba0139.js");

var _utils = require("../core/utils.js");

var _changeDetails = _interopRequireDefault(require("../core/change-details.js"));

var _base = _interopRequireDefault(require("./base.js"));

var _holder = _interopRequireDefault(require("../core/holder.js"));

require("../core/continuous-tail-details.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
  Number mask
  @param {Object} opts
  @param {string} opts.radix - Single char
  @param {string} opts.thousandsSeparator - Single char
  @param {Array<string>} opts.mapToRadix - Array of single chars
  @param {number} opts.min
  @param {number} opts.max
  @param {number} opts.scale - Digits after point
  @param {boolean} opts.signed - Allow negative
  @param {boolean} opts.normalizeZeros - Flag to remove leading and trailing zeros in the end of editing
  @param {boolean} opts.padFractionalZeros - Flag to pad trailing zeros after point in the end of editing
*/
var MaskedNumber = /*#__PURE__*/function (_Masked) {
  (0, _rollupPluginBabelHelpers74ba.d)(MaskedNumber, _Masked);

  var _super = (0, _rollupPluginBabelHelpers74ba.e)(MaskedNumber);
  /** Single char */

  /** Single char */

  /** Array of single chars */

  /** */

  /** */

  /** Digits after point */

  /** */

  /** Flag to remove leading and trailing zeros in the end of editing */

  /** Flag to pad trailing zeros after point in the end of editing */


  function MaskedNumber(opts) {
    (0, _rollupPluginBabelHelpers74ba.a)(this, MaskedNumber);
    return _super.call(this, Object.assign({}, MaskedNumber.DEFAULTS, opts));
  }
  /**
    @override
  */


  (0, _rollupPluginBabelHelpers74ba._)(MaskedNumber, [{
    key: "_update",
    value: function _update(opts) {
      (0, _rollupPluginBabelHelpers74ba.g)((0, _rollupPluginBabelHelpers74ba.h)(MaskedNumber.prototype), "_update", this).call(this, opts);

      this._updateRegExps();
    }
    /** */

  }, {
    key: "_updateRegExps",
    value: function _updateRegExps() {
      // use different regexp to process user input (more strict, input suffix) and tail shifting
      var start = '^' + (this.allowNegative ? '[+|\\-]?' : '');
      var midInput = '(0|([1-9]+\\d*))?';
      var mid = '\\d*';
      var end = (this.scale ? '(' + (0, _utils.escapeRegExp)(this.radix) + '\\d{0,' + this.scale + '})?' : '') + '$';
      this._numberRegExpInput = new RegExp(start + midInput + end);
      this._numberRegExp = new RegExp(start + mid + end);
      this._mapToRadixRegExp = new RegExp('[' + this.mapToRadix.map(_utils.escapeRegExp).join('') + ']', 'g');
      this._thousandsSeparatorRegExp = new RegExp((0, _utils.escapeRegExp)(this.thousandsSeparator), 'g');
    }
    /** */

  }, {
    key: "_removeThousandsSeparators",
    value: function _removeThousandsSeparators(value) {
      return value.replace(this._thousandsSeparatorRegExp, '');
    }
    /** */

  }, {
    key: "_insertThousandsSeparators",
    value: function _insertThousandsSeparators(value) {
      // https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
      var parts = value.split(this.radix);
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, this.thousandsSeparator);
      return parts.join(this.radix);
    }
    /**
      @override
    */

  }, {
    key: "doPrepare",
    value: function doPrepare(str) {
      var _get2;

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return (_get2 = (0, _rollupPluginBabelHelpers74ba.g)((0, _rollupPluginBabelHelpers74ba.h)(MaskedNumber.prototype), "doPrepare", this)).call.apply(_get2, [this, this._removeThousandsSeparators(str.replace(this._mapToRadixRegExp, this.radix))].concat(args));
    }
    /** */

  }, {
    key: "_separatorsCount",
    value: function _separatorsCount(to) {
      var extendOnSeparators = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var count = 0;

      for (var pos = 0; pos < to; ++pos) {
        if (this._value.indexOf(this.thousandsSeparator, pos) === pos) {
          ++count;
          if (extendOnSeparators) to += this.thousandsSeparator.length;
        }
      }

      return count;
    }
    /** */

  }, {
    key: "_separatorsCountFromSlice",
    value: function _separatorsCountFromSlice() {
      var slice = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._value;
      return this._separatorsCount(this._removeThousandsSeparators(slice).length, true);
    }
    /**
      @override
    */

  }, {
    key: "extractInput",
    value: function extractInput() {
      var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;
      var flags = arguments.length > 2 ? arguments[2] : undefined;

      var _this$_adjustRangeWit = this._adjustRangeWithSeparators(fromPos, toPos);

      var _this$_adjustRangeWit2 = (0, _rollupPluginBabelHelpers74ba.f)(_this$_adjustRangeWit, 2);

      fromPos = _this$_adjustRangeWit2[0];
      toPos = _this$_adjustRangeWit2[1];
      return this._removeThousandsSeparators((0, _rollupPluginBabelHelpers74ba.g)((0, _rollupPluginBabelHelpers74ba.h)(MaskedNumber.prototype), "extractInput", this).call(this, fromPos, toPos, flags));
    }
    /**
      @override
    */

  }, {
    key: "_appendCharRaw",
    value: function _appendCharRaw(ch) {
      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (!this.thousandsSeparator) return (0, _rollupPluginBabelHelpers74ba.g)((0, _rollupPluginBabelHelpers74ba.h)(MaskedNumber.prototype), "_appendCharRaw", this).call(this, ch, flags);
      var prevBeforeTailValue = flags.tail && flags._beforeTailState ? flags._beforeTailState._value : this._value;

      var prevBeforeTailSeparatorsCount = this._separatorsCountFromSlice(prevBeforeTailValue);

      this._value = this._removeThousandsSeparators(this.value);
      var appendDetails = (0, _rollupPluginBabelHelpers74ba.g)((0, _rollupPluginBabelHelpers74ba.h)(MaskedNumber.prototype), "_appendCharRaw", this).call(this, ch, flags);
      this._value = this._insertThousandsSeparators(this._value);
      var beforeTailValue = flags.tail && flags._beforeTailState ? flags._beforeTailState._value : this._value;

      var beforeTailSeparatorsCount = this._separatorsCountFromSlice(beforeTailValue);

      appendDetails.tailShift += (beforeTailSeparatorsCount - prevBeforeTailSeparatorsCount) * this.thousandsSeparator.length;
      appendDetails.skip = !appendDetails.rawInserted && ch === this.thousandsSeparator;
      return appendDetails;
    }
    /** */

  }, {
    key: "_findSeparatorAround",
    value: function _findSeparatorAround(pos) {
      if (this.thousandsSeparator) {
        var searchFrom = pos - this.thousandsSeparator.length + 1;
        var separatorPos = this.value.indexOf(this.thousandsSeparator, searchFrom);
        if (separatorPos <= pos) return separatorPos;
      }

      return -1;
    }
  }, {
    key: "_adjustRangeWithSeparators",
    value: function _adjustRangeWithSeparators(from, to) {
      var separatorAroundFromPos = this._findSeparatorAround(from);

      if (separatorAroundFromPos >= 0) from = separatorAroundFromPos;

      var separatorAroundToPos = this._findSeparatorAround(to);

      if (separatorAroundToPos >= 0) to = separatorAroundToPos + this.thousandsSeparator.length;
      return [from, to];
    }
    /**
      @override
    */

  }, {
    key: "remove",
    value: function remove() {
      var fromPos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var toPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.value.length;

      var _this$_adjustRangeWit3 = this._adjustRangeWithSeparators(fromPos, toPos);

      var _this$_adjustRangeWit4 = (0, _rollupPluginBabelHelpers74ba.f)(_this$_adjustRangeWit3, 2);

      fromPos = _this$_adjustRangeWit4[0];
      toPos = _this$_adjustRangeWit4[1];
      var valueBeforePos = this.value.slice(0, fromPos);
      var valueAfterPos = this.value.slice(toPos);

      var prevBeforeTailSeparatorsCount = this._separatorsCount(valueBeforePos.length);

      this._value = this._insertThousandsSeparators(this._removeThousandsSeparators(valueBeforePos + valueAfterPos));

      var beforeTailSeparatorsCount = this._separatorsCountFromSlice(valueBeforePos);

      return new _changeDetails.default({
        tailShift: (beforeTailSeparatorsCount - prevBeforeTailSeparatorsCount) * this.thousandsSeparator.length
      });
    }
    /**
      @override
    */

  }, {
    key: "nearestInputPos",
    value: function nearestInputPos(cursorPos, direction) {
      if (!this.thousandsSeparator) return cursorPos;

      switch (direction) {
        case _utils.DIRECTION.NONE:
        case _utils.DIRECTION.LEFT:
        case _utils.DIRECTION.FORCE_LEFT:
          {
            var separatorAtLeftPos = this._findSeparatorAround(cursorPos - 1);

            if (separatorAtLeftPos >= 0) {
              var separatorAtLeftEndPos = separatorAtLeftPos + this.thousandsSeparator.length;

              if (cursorPos < separatorAtLeftEndPos || this.value.length <= separatorAtLeftEndPos || direction === _utils.DIRECTION.FORCE_LEFT) {
                return separatorAtLeftPos;
              }
            }

            break;
          }

        case _utils.DIRECTION.RIGHT:
        case _utils.DIRECTION.FORCE_RIGHT:
          {
            var separatorAtRightPos = this._findSeparatorAround(cursorPos);

            if (separatorAtRightPos >= 0) {
              return separatorAtRightPos + this.thousandsSeparator.length;
            }
          }
      }

      return cursorPos;
    }
    /**
      @override
    */

  }, {
    key: "doValidate",
    value: function doValidate(flags) {
      var regexp = flags.input ? this._numberRegExpInput : this._numberRegExp; // validate as string

      var valid = regexp.test(this._removeThousandsSeparators(this.value));

      if (valid) {
        // validate as number
        var number = this.number;
        valid = valid && !isNaN(number) && ( // check min bound for negative values
        this.min == null || this.min >= 0 || this.min <= this.number) && ( // check max bound for positive values
        this.max == null || this.max <= 0 || this.number <= this.max);
      }

      return valid && (0, _rollupPluginBabelHelpers74ba.g)((0, _rollupPluginBabelHelpers74ba.h)(MaskedNumber.prototype), "doValidate", this).call(this, flags);
    }
    /**
      @override
    */

  }, {
    key: "doCommit",
    value: function doCommit() {
      if (this.value) {
        var number = this.number;
        var validnum = number; // check bounds

        if (this.min != null) validnum = Math.max(validnum, this.min);
        if (this.max != null) validnum = Math.min(validnum, this.max);
        if (validnum !== number) this.unmaskedValue = String(validnum);
        var formatted = this.value;
        if (this.normalizeZeros) formatted = this._normalizeZeros(formatted);
        if (this.padFractionalZeros) formatted = this._padFractionalZeros(formatted);
        this._value = formatted;
      }

      (0, _rollupPluginBabelHelpers74ba.g)((0, _rollupPluginBabelHelpers74ba.h)(MaskedNumber.prototype), "doCommit", this).call(this);
    }
    /** */

  }, {
    key: "_normalizeZeros",
    value: function _normalizeZeros(value) {
      var parts = this._removeThousandsSeparators(value).split(this.radix); // remove leading zeros


      parts[0] = parts[0].replace(/^(\D*)(0*)(\d*)/, function (match, sign, zeros, num) {
        return sign + num;
      }); // add leading zero

      if (value.length && !/\d$/.test(parts[0])) parts[0] = parts[0] + '0';

      if (parts.length > 1) {
        parts[1] = parts[1].replace(/0*$/, ''); // remove trailing zeros

        if (!parts[1].length) parts.length = 1; // remove fractional
      }

      return this._insertThousandsSeparators(parts.join(this.radix));
    }
    /** */

  }, {
    key: "_padFractionalZeros",
    value: function _padFractionalZeros(value) {
      if (!value) return value;
      var parts = value.split(this.radix);
      if (parts.length < 2) parts.push('');
      parts[1] = parts[1].padEnd(this.scale, '0');
      return parts.join(this.radix);
    }
    /**
      @override
    */

  }, {
    key: "unmaskedValue",
    get: function get() {
      return this._removeThousandsSeparators(this._normalizeZeros(this.value)).replace(this.radix, '.');
    },
    set: function set(unmaskedValue) {
      (0, _rollupPluginBabelHelpers74ba.i)((0, _rollupPluginBabelHelpers74ba.h)(MaskedNumber.prototype), "unmaskedValue", unmaskedValue.replace('.', this.radix), this, true);
    }
    /**
      @override
    */

  }, {
    key: "typedValue",
    get: function get() {
      return Number(this.unmaskedValue);
    },
    set: function set(n) {
      (0, _rollupPluginBabelHelpers74ba.i)((0, _rollupPluginBabelHelpers74ba.h)(MaskedNumber.prototype), "unmaskedValue", String(n), this, true);
    }
    /** Parsed Number */

  }, {
    key: "number",
    get: function get() {
      return this.typedValue;
    },
    set: function set(number) {
      this.typedValue = number;
    }
    /**
      Is negative allowed
      @readonly
    */

  }, {
    key: "allowNegative",
    get: function get() {
      return this.signed || this.min != null && this.min < 0 || this.max != null && this.max < 0;
    }
  }]);
  return MaskedNumber;
}(_base.default);

MaskedNumber.DEFAULTS = {
  radix: ',',
  thousandsSeparator: '',
  mapToRadix: ['.'],
  scale: 2,
  signed: false,
  normalizeZeros: true,
  padFractionalZeros: false
};
_holder.default.MaskedNumber = MaskedNumber;
var _default = MaskedNumber;
exports.default = _default;
},{"../_rollupPluginBabelHelpers-74ba0139.js":"../node_modules/imask/esm/_rollupPluginBabelHelpers-74ba0139.js","../core/utils.js":"../node_modules/imask/esm/core/utils.js","../core/change-details.js":"../node_modules/imask/esm/core/change-details.js","./base.js":"../node_modules/imask/esm/masked/base.js","../core/holder.js":"../node_modules/imask/esm/core/holder.js","../core/continuous-tail-details.js":"../node_modules/imask/esm/core/continuous-tail-details.js"}],"../node_modules/imask/esm/masked/function.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rollupPluginBabelHelpers74ba = require("../_rollupPluginBabelHelpers-74ba0139.js");

var _base = _interopRequireDefault(require("./base.js"));

var _holder = _interopRequireDefault(require("../core/holder.js"));

require("../core/change-details.js");

require("../core/continuous-tail-details.js");

require("../core/utils.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Masking by custom Function */
var MaskedFunction = /*#__PURE__*/function (_Masked) {
  (0, _rollupPluginBabelHelpers74ba.d)(MaskedFunction, _Masked);

  var _super = (0, _rollupPluginBabelHelpers74ba.e)(MaskedFunction);

  function MaskedFunction() {
    (0, _rollupPluginBabelHelpers74ba.a)(this, MaskedFunction);
    return _super.apply(this, arguments);
  }

  (0, _rollupPluginBabelHelpers74ba._)(MaskedFunction, [{
    key: "_update",
    value:
    /**
      @override
      @param {Object} opts
    */
    function _update(opts) {
      if (opts.mask) opts.validate = opts.mask;
      (0, _rollupPluginBabelHelpers74ba.g)((0, _rollupPluginBabelHelpers74ba.h)(MaskedFunction.prototype), "_update", this).call(this, opts);
    }
  }]);
  return MaskedFunction;
}(_base.default);

_holder.default.MaskedFunction = MaskedFunction;
var _default = MaskedFunction;
exports.default = _default;
},{"../_rollupPluginBabelHelpers-74ba0139.js":"../node_modules/imask/esm/_rollupPluginBabelHelpers-74ba0139.js","./base.js":"../node_modules/imask/esm/masked/base.js","../core/holder.js":"../node_modules/imask/esm/core/holder.js","../core/change-details.js":"../node_modules/imask/esm/core/change-details.js","../core/continuous-tail-details.js":"../node_modules/imask/esm/core/continuous-tail-details.js","../core/utils.js":"../node_modules/imask/esm/core/utils.js"}],"../node_modules/imask/esm/masked/dynamic.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rollupPluginBabelHelpers74ba = require("../_rollupPluginBabelHelpers-74ba0139.js");

var _changeDetails = _interopRequireDefault(require("../core/change-details.js"));

var _factory = _interopRequireDefault(require("./factory.js"));

var _base = _interopRequireDefault(require("./base.js"));

var _holder = _interopRequireDefault(require("../core/holder.js"));

require("../core/utils.js");

require("../core/continuous-tail-details.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _excluded = ["compiledMasks", "currentMaskRef", "currentMask"];
/** Dynamic mask for choosing apropriate mask in run-time */

var MaskedDynamic = /*#__PURE__*/function (_Masked) {
  (0, _rollupPluginBabelHelpers74ba.d)(MaskedDynamic, _Masked);

  var _super = (0, _rollupPluginBabelHelpers74ba.e)(MaskedDynamic);
  /** Currently chosen mask */

  /** Compliled {@link Masked} options */

  /** Chooses {@link Masked} depending on input value */

  /**
    @param {Object} opts
  */


  function MaskedDynamic(opts) {
    var _this;

    (0, _rollupPluginBabelHelpers74ba.a)(this, MaskedDynamic);
    _this = _super.call(this, Object.assign({}, MaskedDynamic.DEFAULTS, opts));
    _this.currentMask = null;
    return _this;
  }
  /**
    @override
  */


  (0, _rollupPluginBabelHelpers74ba._)(MaskedDynamic, [{
    key: "_update",
    value: function _update(opts) {
      (0, _rollupPluginBabelHelpers74ba.g)((0, _rollupPluginBabelHelpers74ba.h)(MaskedDynamic.prototype), "_update", this).call(this, opts);

      if ('mask' in opts) {
        // mask could be totally dynamic with only `dispatch` option
        this.compiledMasks = Array.isArray(opts.mask) ? opts.mask.map(function (m) {
          return (0, _factory.default)(m);
        }) : [];
      }
    }
    /**
      @override
    */

  }, {
    key: "_appendCharRaw",
    value: function _appendCharRaw(ch) {
      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var details = this._applyDispatch(ch, flags);

      if (this.currentMask) {
        details.aggregate(this.currentMask._appendChar(ch, flags));
      }

      return details;
    }
  }, {
    key: "_applyDispatch",
    value: function _applyDispatch() {
      var appended = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var prevValueBeforeTail = flags.tail && flags._beforeTailState != null ? flags._beforeTailState._value : this.value;
      var inputValue = this.rawInputValue;
      var insertValue = flags.tail && flags._beforeTailState != null ? // $FlowFixMe - tired to fight with type system
      flags._beforeTailState._rawInputValue : inputValue;
      var tailValue = inputValue.slice(insertValue.length);
      var prevMask = this.currentMask;
      var details = new _changeDetails.default();
      var prevMaskState = prevMask && prevMask.state; // clone flags to prevent overwriting `_beforeTailState`

      this.currentMask = this.doDispatch(appended, Object.assign({}, flags)); // restore state after dispatch

      if (this.currentMask) {
        if (this.currentMask !== prevMask) {
          // if mask changed reapply input
          this.currentMask.reset();

          if (insertValue) {
            // $FlowFixMe - it's ok, we don't change current mask above
            var d = this.currentMask.append(insertValue, {
              raw: true
            });
            details.tailShift = d.inserted.length - prevValueBeforeTail.length;
          }

          if (tailValue) {
            // $FlowFixMe - it's ok, we don't change current mask above
            details.tailShift += this.currentMask.append(tailValue, {
              raw: true,
              tail: true
            }).tailShift;
          }
        } else {
          // Dispatch can do something bad with state, so
          // restore prev mask state
          this.currentMask.state = prevMaskState;
        }
      }

      return details;
    }
  }, {
    key: "_appendPlaceholder",
    value: function _appendPlaceholder() {
      var details = this._applyDispatch.apply(this, arguments);

      if (this.currentMask) {
        details.aggregate(this.currentMask._appendPlaceholder());
      }

      return details;
    }
    /**
      @override
    */

  }, {
    key: "doDispatch",
    value: function doDispatch(appended) {
      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.dispatch(appended, this, flags);
    }
    /**
      @override
    */

  }, {
    key: "doValidate",
    value: function doValidate() {
      var _get2, _this$currentMask;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return (_get2 = (0, _rollupPluginBabelHelpers74ba.g)((0, _rollupPluginBabelHelpers74ba.h)(MaskedDynamic.prototype), "doValidate", this)).call.apply(_get2, [this].concat(args)) && (!this.currentMask || (_this$currentMask = this.currentMask).doValidate.apply(_this$currentMask, args));
    }
    /**
      @override
    */

  }, {
    key: "reset",
    value: function reset() {
      if (this.currentMask) this.currentMask.reset();
      this.compiledMasks.forEach(function (m) {
        return m.reset();
      });
    }
    /**
      @override
    */

  }, {
    key: "value",
    get: function get() {
      return this.currentMask ? this.currentMask.value : '';
    },
    set: function set(value) {
      (0, _rollupPluginBabelHelpers74ba.i)((0, _rollupPluginBabelHelpers74ba.h)(MaskedDynamic.prototype), "value", value, this, true);
    }
    /**
      @override
    */

  }, {
    key: "unmaskedValue",
    get: function get() {
      return this.currentMask ? this.currentMask.unmaskedValue : '';
    },
    set: function set(unmaskedValue) {
      (0, _rollupPluginBabelHelpers74ba.i)((0, _rollupPluginBabelHelpers74ba.h)(MaskedDynamic.prototype), "unmaskedValue", unmaskedValue, this, true);
    }
    /**
      @override
    */

  }, {
    key: "typedValue",
    get: function get() {
      return this.currentMask ? this.currentMask.typedValue : '';
    } // probably typedValue should not be used with dynamic
    ,
    set: function set(value) {
      var unmaskedValue = String(value); // double check it

      if (this.currentMask) {
        this.currentMask.typedValue = value;
        unmaskedValue = this.currentMask.unmaskedValue;
      }

      this.unmaskedValue = unmaskedValue;
    }
    /**
      @override
    */

  }, {
    key: "isComplete",
    get: function get() {
      return !!this.currentMask && this.currentMask.isComplete;
    }
    /**
      @override
    */

  }, {
    key: "remove",
    value: function remove() {
      var details = new _changeDetails.default();

      if (this.currentMask) {
        var _this$currentMask2;

        details.aggregate((_this$currentMask2 = this.currentMask).remove.apply(_this$currentMask2, arguments)) // update with dispatch
        .aggregate(this._applyDispatch());
      }

      return details;
    }
    /**
      @override
    */

  }, {
    key: "state",
    get: function get() {
      return Object.assign({}, (0, _rollupPluginBabelHelpers74ba.g)((0, _rollupPluginBabelHelpers74ba.h)(MaskedDynamic.prototype), "state", this), {
        _rawInputValue: this.rawInputValue,
        compiledMasks: this.compiledMasks.map(function (m) {
          return m.state;
        }),
        currentMaskRef: this.currentMask,
        currentMask: this.currentMask && this.currentMask.state
      });
    },
    set: function set(state) {
      var compiledMasks = state.compiledMasks,
          currentMaskRef = state.currentMaskRef,
          currentMask = state.currentMask,
          maskedState = (0, _rollupPluginBabelHelpers74ba.b)(state, _excluded);
      this.compiledMasks.forEach(function (m, mi) {
        return m.state = compiledMasks[mi];
      });

      if (currentMaskRef != null) {
        this.currentMask = currentMaskRef;
        this.currentMask.state = currentMask;
      }

      (0, _rollupPluginBabelHelpers74ba.i)((0, _rollupPluginBabelHelpers74ba.h)(MaskedDynamic.prototype), "state", maskedState, this, true);
    }
    /**
      @override
    */

  }, {
    key: "extractInput",
    value: function extractInput() {
      var _this$currentMask3;

      return this.currentMask ? (_this$currentMask3 = this.currentMask).extractInput.apply(_this$currentMask3, arguments) : '';
    }
    /**
      @override
    */

  }, {
    key: "extractTail",
    value: function extractTail() {
      var _this$currentMask4, _get3;

      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return this.currentMask ? (_this$currentMask4 = this.currentMask).extractTail.apply(_this$currentMask4, args) : (_get3 = (0, _rollupPluginBabelHelpers74ba.g)((0, _rollupPluginBabelHelpers74ba.h)(MaskedDynamic.prototype), "extractTail", this)).call.apply(_get3, [this].concat(args));
    }
    /**
      @override
    */

  }, {
    key: "doCommit",
    value: function doCommit() {
      if (this.currentMask) this.currentMask.doCommit();
      (0, _rollupPluginBabelHelpers74ba.g)((0, _rollupPluginBabelHelpers74ba.h)(MaskedDynamic.prototype), "doCommit", this).call(this);
    }
    /**
      @override
    */

  }, {
    key: "nearestInputPos",
    value: function nearestInputPos() {
      var _this$currentMask5, _get4;

      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return this.currentMask ? (_this$currentMask5 = this.currentMask).nearestInputPos.apply(_this$currentMask5, args) : (_get4 = (0, _rollupPluginBabelHelpers74ba.g)((0, _rollupPluginBabelHelpers74ba.h)(MaskedDynamic.prototype), "nearestInputPos", this)).call.apply(_get4, [this].concat(args));
    }
  }, {
    key: "overwrite",
    get: function get() {
      return this.currentMask ? this.currentMask.overwrite : (0, _rollupPluginBabelHelpers74ba.g)((0, _rollupPluginBabelHelpers74ba.h)(MaskedDynamic.prototype), "overwrite", this);
    },
    set: function set(overwrite) {
      console.warn('"overwrite" option is not available in dynamic mask, use this option in siblings');
    }
  }]);
  return MaskedDynamic;
}(_base.default);

MaskedDynamic.DEFAULTS = {
  dispatch: function dispatch(appended, masked, flags) {
    if (!masked.compiledMasks.length) return;
    var inputValue = masked.rawInputValue; // simulate input

    var inputs = masked.compiledMasks.map(function (m, index) {
      m.reset();
      m.append(inputValue, {
        raw: true
      });
      m.append(appended, flags);
      var weight = m.rawInputValue.length;
      return {
        weight: weight,
        index: index
      };
    }); // pop masks with longer values first

    inputs.sort(function (i1, i2) {
      return i2.weight - i1.weight;
    });
    return masked.compiledMasks[inputs[0].index];
  }
};
_holder.default.MaskedDynamic = MaskedDynamic;
var _default = MaskedDynamic;
exports.default = _default;
},{"../_rollupPluginBabelHelpers-74ba0139.js":"../node_modules/imask/esm/_rollupPluginBabelHelpers-74ba0139.js","../core/change-details.js":"../node_modules/imask/esm/core/change-details.js","./factory.js":"../node_modules/imask/esm/masked/factory.js","./base.js":"../node_modules/imask/esm/masked/base.js","../core/holder.js":"../node_modules/imask/esm/core/holder.js","../core/utils.js":"../node_modules/imask/esm/core/utils.js","../core/continuous-tail-details.js":"../node_modules/imask/esm/core/continuous-tail-details.js"}],"../node_modules/imask/esm/masked/pipe.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPipe = createPipe;
exports.pipe = pipe;
exports.PIPE_TYPE = void 0;

var _factory = _interopRequireDefault(require("./factory.js"));

var _holder = _interopRequireDefault(require("../core/holder.js"));

require("../core/utils.js");

require("../_rollupPluginBabelHelpers-74ba0139.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** Mask pipe source and destination types */
var PIPE_TYPE = {
  MASKED: 'value',
  UNMASKED: 'unmaskedValue',
  TYPED: 'typedValue'
};
/** Creates new pipe function depending on mask type, source and destination options */

exports.PIPE_TYPE = PIPE_TYPE;

function createPipe(mask) {
  var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : PIPE_TYPE.MASKED;
  var to = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : PIPE_TYPE.MASKED;
  var masked = (0, _factory.default)(mask);
  return function (value) {
    return masked.runIsolated(function (m) {
      m[from] = value;
      return m[to];
    });
  };
}
/** Pipes value through mask depending on mask type, source and destination options */


function pipe(value) {
  for (var _len = arguments.length, pipeArgs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    pipeArgs[_key - 1] = arguments[_key];
  }

  return createPipe.apply(void 0, pipeArgs)(value);
}

_holder.default.PIPE_TYPE = PIPE_TYPE;
_holder.default.createPipe = createPipe;
_holder.default.pipe = pipe;
},{"./factory.js":"../node_modules/imask/esm/masked/factory.js","../core/holder.js":"../node_modules/imask/esm/core/holder.js","../core/utils.js":"../node_modules/imask/esm/core/utils.js","../_rollupPluginBabelHelpers-74ba0139.js":"../node_modules/imask/esm/_rollupPluginBabelHelpers-74ba0139.js"}],"../node_modules/imask/esm/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "InputMask", {
  enumerable: true,
  get: function () {
    return _input.default;
  }
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _holder.default;
  }
});
Object.defineProperty(exports, "Masked", {
  enumerable: true,
  get: function () {
    return _base.default;
  }
});
Object.defineProperty(exports, "MaskedPattern", {
  enumerable: true,
  get: function () {
    return _pattern.default;
  }
});
Object.defineProperty(exports, "MaskedEnum", {
  enumerable: true,
  get: function () {
    return _enum.default;
  }
});
Object.defineProperty(exports, "MaskedRange", {
  enumerable: true,
  get: function () {
    return _range.default;
  }
});
Object.defineProperty(exports, "MaskedNumber", {
  enumerable: true,
  get: function () {
    return _number.default;
  }
});
Object.defineProperty(exports, "MaskedDate", {
  enumerable: true,
  get: function () {
    return _date.default;
  }
});
Object.defineProperty(exports, "MaskedRegExp", {
  enumerable: true,
  get: function () {
    return _regexp.default;
  }
});
Object.defineProperty(exports, "MaskedFunction", {
  enumerable: true,
  get: function () {
    return _function.default;
  }
});
Object.defineProperty(exports, "MaskedDynamic", {
  enumerable: true,
  get: function () {
    return _dynamic.default;
  }
});
Object.defineProperty(exports, "createMask", {
  enumerable: true,
  get: function () {
    return _factory.default;
  }
});
Object.defineProperty(exports, "MaskElement", {
  enumerable: true,
  get: function () {
    return _maskElement.default;
  }
});
Object.defineProperty(exports, "HTMLMaskElement", {
  enumerable: true,
  get: function () {
    return _htmlMaskElement.default;
  }
});
Object.defineProperty(exports, "HTMLContenteditableMaskElement", {
  enumerable: true,
  get: function () {
    return _htmlContenteditableMaskElement.default;
  }
});
Object.defineProperty(exports, "PIPE_TYPE", {
  enumerable: true,
  get: function () {
    return _pipe.PIPE_TYPE;
  }
});
Object.defineProperty(exports, "createPipe", {
  enumerable: true,
  get: function () {
    return _pipe.createPipe;
  }
});
Object.defineProperty(exports, "pipe", {
  enumerable: true,
  get: function () {
    return _pipe.pipe;
  }
});

var _input = _interopRequireDefault(require("./controls/input.js"));

var _holder = _interopRequireDefault(require("./core/holder.js"));

var _base = _interopRequireDefault(require("./masked/base.js"));

var _pattern = _interopRequireDefault(require("./masked/pattern.js"));

var _enum = _interopRequireDefault(require("./masked/enum.js"));

var _range = _interopRequireDefault(require("./masked/range.js"));

var _number = _interopRequireDefault(require("./masked/number.js"));

var _date = _interopRequireDefault(require("./masked/date.js"));

var _regexp = _interopRequireDefault(require("./masked/regexp.js"));

var _function = _interopRequireDefault(require("./masked/function.js"));

var _dynamic = _interopRequireDefault(require("./masked/dynamic.js"));

var _factory = _interopRequireDefault(require("./masked/factory.js"));

var _maskElement = _interopRequireDefault(require("./controls/mask-element.js"));

var _htmlMaskElement = _interopRequireDefault(require("./controls/html-mask-element.js"));

var _htmlContenteditableMaskElement = _interopRequireDefault(require("./controls/html-contenteditable-mask-element.js"));

var _pipe = require("./masked/pipe.js");

require("./_rollupPluginBabelHelpers-74ba0139.js");

require("./core/utils.js");

require("./core/action-details.js");

require("./core/change-details.js");

require("./core/continuous-tail-details.js");

require("./masked/pattern/input-definition.js");

require("./masked/pattern/fixed-definition.js");

require("./masked/pattern/chunk-tail-details.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

try {
  globalThis.IMask = _holder.default;
} catch (e) {}
},{"./controls/input.js":"../node_modules/imask/esm/controls/input.js","./core/holder.js":"../node_modules/imask/esm/core/holder.js","./masked/base.js":"../node_modules/imask/esm/masked/base.js","./masked/pattern.js":"../node_modules/imask/esm/masked/pattern.js","./masked/enum.js":"../node_modules/imask/esm/masked/enum.js","./masked/range.js":"../node_modules/imask/esm/masked/range.js","./masked/number.js":"../node_modules/imask/esm/masked/number.js","./masked/date.js":"../node_modules/imask/esm/masked/date.js","./masked/regexp.js":"../node_modules/imask/esm/masked/regexp.js","./masked/function.js":"../node_modules/imask/esm/masked/function.js","./masked/dynamic.js":"../node_modules/imask/esm/masked/dynamic.js","./masked/factory.js":"../node_modules/imask/esm/masked/factory.js","./controls/mask-element.js":"../node_modules/imask/esm/controls/mask-element.js","./controls/html-mask-element.js":"../node_modules/imask/esm/controls/html-mask-element.js","./controls/html-contenteditable-mask-element.js":"../node_modules/imask/esm/controls/html-contenteditable-mask-element.js","./masked/pipe.js":"../node_modules/imask/esm/masked/pipe.js","./_rollupPluginBabelHelpers-74ba0139.js":"../node_modules/imask/esm/_rollupPluginBabelHelpers-74ba0139.js","./core/utils.js":"../node_modules/imask/esm/core/utils.js","./core/action-details.js":"../node_modules/imask/esm/core/action-details.js","./core/change-details.js":"../node_modules/imask/esm/core/change-details.js","./core/continuous-tail-details.js":"../node_modules/imask/esm/core/continuous-tail-details.js","./masked/pattern/input-definition.js":"../node_modules/imask/esm/masked/pattern/input-definition.js","./masked/pattern/fixed-definition.js":"../node_modules/imask/esm/masked/pattern/fixed-definition.js","./masked/pattern/chunk-tail-details.js":"../node_modules/imask/esm/masked/pattern/chunk-tail-details.js"}],"../node_modules/dayjs/plugin/customParseFormat.js":[function(require,module,exports) {
var define;
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).dayjs_plugin_customParseFormat=e()}(this,(function(){"use strict";var t={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},e=/(\[[^[]*\])|([-:/.()\s]+)|(A|a|YYYY|YY?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g,n=/\d\d/,r=/\d\d?/,i=/\d*[^\s\d-_:/()]+/,o={},s=function(t){return(t=+t)+(t>68?1900:2e3)};var a=function(t){return function(e){this[t]=+e}},f=[/[+-]\d\d:?(\d\d)?|Z/,function(t){(this.zone||(this.zone={})).offset=function(t){if(!t)return 0;if("Z"===t)return 0;var e=t.match(/([+-]|\d\d)/g),n=60*e[1]+(+e[2]||0);return 0===n?0:"+"===e[0]?-n:n}(t)}],u=function(t){var e=o[t];return e&&(e.indexOf?e:e.s.concat(e.f))},h=function(t,e){var n,r=o.meridiem;if(r){for(var i=1;i<=24;i+=1)if(t.indexOf(r(i,0,e))>-1){n=i>12;break}}else n=t===(e?"pm":"PM");return n},d={A:[i,function(t){this.afternoon=h(t,!1)}],a:[i,function(t){this.afternoon=h(t,!0)}],S:[/\d/,function(t){this.milliseconds=100*+t}],SS:[n,function(t){this.milliseconds=10*+t}],SSS:[/\d{3}/,function(t){this.milliseconds=+t}],s:[r,a("seconds")],ss:[r,a("seconds")],m:[r,a("minutes")],mm:[r,a("minutes")],H:[r,a("hours")],h:[r,a("hours")],HH:[r,a("hours")],hh:[r,a("hours")],D:[r,a("day")],DD:[n,a("day")],Do:[i,function(t){var e=o.ordinal,n=t.match(/\d+/);if(this.day=n[0],e)for(var r=1;r<=31;r+=1)e(r).replace(/\[|\]/g,"")===t&&(this.day=r)}],M:[r,a("month")],MM:[n,a("month")],MMM:[i,function(t){var e=u("months"),n=(u("monthsShort")||e.map((function(t){return t.substr(0,3)}))).indexOf(t)+1;if(n<1)throw new Error;this.month=n%12||n}],MMMM:[i,function(t){var e=u("months").indexOf(t)+1;if(e<1)throw new Error;this.month=e%12||e}],Y:[/[+-]?\d+/,a("year")],YY:[n,function(t){this.year=s(t)}],YYYY:[/\d{4}/,a("year")],Z:f,ZZ:f};function c(n){var r,i;r=n,i=o&&o.formats;for(var s=(n=r.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,(function(e,n,r){var o=r&&r.toUpperCase();return n||i[r]||t[r]||i[o].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,(function(t,e,n){return e||n.slice(1)}))}))).match(e),a=s.length,f=0;f<a;f+=1){var u=s[f],h=d[u],c=h&&h[0],l=h&&h[1];s[f]=l?{regex:c,parser:l}:u.replace(/^\[|\]$/g,"")}return function(t){for(var e={},n=0,r=0;n<a;n+=1){var i=s[n];if("string"==typeof i)r+=i.length;else{var o=i.regex,f=i.parser,u=t.substr(r),h=o.exec(u)[0];f.call(e,h),t=t.replace(h,"")}}return function(t){var e=t.afternoon;if(void 0!==e){var n=t.hours;e?n<12&&(t.hours+=12):12===n&&(t.hours=0),delete t.afternoon}}(e),e}}return function(t,e,n){n.p.customParseFormat=!0,t&&t.parseTwoDigitYear&&(s=t.parseTwoDigitYear);var r=e.prototype,i=r.parse;r.parse=function(t){var e=t.date,r=t.utc,s=t.args;this.$u=r;var a=s[1];if("string"==typeof a){var f=!0===s[2],u=!0===s[3],h=f||u,d=s[2];u&&(d=s[2]),o=this.$locale(),!f&&d&&(o=n.Ls[d]),this.$d=function(t,e,n){try{if(["x","X"].indexOf(e)>-1)return new Date(("X"===e?1e3:1)*t);var r=c(e)(t),i=r.year,o=r.month,s=r.day,a=r.hours,f=r.minutes,u=r.seconds,h=r.milliseconds,d=r.zone,l=new Date,m=s||(i||o?1:l.getDate()),M=i||l.getFullYear(),Y=0;i&&!o||(Y=o>0?o-1:l.getMonth());var p=a||0,v=f||0,D=u||0,g=h||0;return d?new Date(Date.UTC(M,Y,m,p,v,D,g+60*d.offset*1e3)):n?new Date(Date.UTC(M,Y,m,p,v,D,g)):new Date(M,Y,m,p,v,D,g)}catch(t){return new Date("")}}(e,a,r),this.init(),d&&!0!==d&&(this.$L=this.locale(d).$L),h&&e!==this.format(a)&&(this.$d=new Date("")),o={}}else if(a instanceof Array)for(var l=a.length,m=1;m<=l;m+=1){s[1]=a[m-1];var M=n.apply(this,s);if(M.isValid()){this.$d=M.$d,this.$L=M.$L,this.init();break}m===l&&(this.$d=new Date(""))}else i.call(this,t)}}}));
},{}],"../src/constant/mask.constant.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CUSTOM_MASKS = exports.BLOCKS_DATE = void 0;

var _dayjs = _interopRequireDefault(require("dayjs"));

var _imask = require("imask");

var _customParseFormat = _interopRequireDefault(require("dayjs/plugin/customParseFormat"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dayjs.default.extend(_customParseFormat.default);

var BLOCKS_DATE = {
  DD: {
    mask: _imask.MaskedRange,
    from: 1,
    to: 31,
    maxLength: 2,
    placeholderChar: "d"
  },
  MM: {
    mask: _imask.MaskedRange,
    from: 1,
    to: 12,
    maxLength: 2,
    placeholderChar: "m"
  },
  YYYY: {
    mask: _imask.MaskedRange,
    from: 0,
    to: 9999,
    placeholderChar: "y"
  },
  HH: {
    mask: _imask.MaskedRange,
    from: 0,
    to: 23,
    placeholderChar: "-"
  },
  H: {
    mask: _imask.MaskedRange,
    from: 0,
    to: 12,
    placeholderChar: "-"
  },
  mm: {
    mask: _imask.MaskedRange,
    from: 0,
    to: 59,
    placeholderChar: "-"
  },
  ss: {
    mask: _imask.MaskedRange,
    from: 0,
    to: 59,
    placeholderChar: "-"
  },
  A: {
    mask: _imask.MaskedEnum,
    enum: ["AM", "PM"],
    prepare: function prepare(str) {
      return str.toUpperCase();
    },
    placeholderChar: "-"
  },
  aa: {
    mask: _imask.MaskedEnum,
    enum: ["am", "pm"],
    prepare: function prepare(str) {
      return str.toUpperCase();
    },
    placeholderChar: "-"
  }
};
exports.BLOCKS_DATE = BLOCKS_DATE;
var CUSTOM_MASKS = {
  TEL: {
    type: "MASK",
    config: {
      mask: [{
        mask: "(00) 0000-0000"
      }, {
        mask: "(00) 0 0000-0000"
      }]
    }
  },
  CPF: {
    type: "MASK",
    config: {
      mask: "000.000.000-00"
    }
  },
  CNPJ: {
    type: "MASK",
    config: {
      mask: "00.000.000/0000-00"
    }
  },
  CPF_CNPJ: {
    type: "MASK",
    config: {
      mask: [{
        mask: "000.000.000-00"
      }, {
        mask: "00.000.000/0000-00"
      }]
    }
  },
  RG: {
    type: "MASK",
    config: {
      mask: [{
        mask: "00.000.000-0"
      }, {
        mask: "00000000000000"
      }]
    }
  },
  ESTADUAL: {
    type: "MASK",
    config: {
      mask: "00.0.000.0000000-0"
    }
  },
  RG_ESTADUAL: {
    type: "MASK",
    config: {
      mask: [{
        mask: "00.000.000-0"
      }, {
        mask: "00.0.000.0000000-0"
      }, {
        mask: "00000000000000"
      }]
    }
  },
  CEP: {
    type: "MASK",
    config: {
      mask: "00000-000"
    }
  },
  DATE: {
    type: "MASK",
    config: {
      mask: Date,
      lazy: false,
      pattern: "DD/MM/YYYY",
      blocks: BLOCKS_DATE,
      format: function format(date) {
        return (0, _dayjs.default)(date).format("DD/MM/YYYY");
      },
      parse: function parse(str) {
        return (0, _dayjs.default)(str, "DD/MM/YYYY").toDate();
      }
    }
  },
  DATE_TIME: {
    type: "MASK",
    config: {
      mask: Date,
      lazy: false,
      pattern: "DD/MM/YYYY HH:mm",
      blocks: BLOCKS_DATE,
      format: function format(date) {
        return (0, _dayjs.default)(date).format("DD/MM/YYYY HH:mm");
      },
      parse: function parse(str) {
        return (0, _dayjs.default)(str, "DD/MM/YYYY HH:mm").toDate();
      }
    }
  },
  DATE_TIME_12: {
    type: "MASK",
    config: {
      mask: Date,
      lazy: false,
      pattern: "DD/MM/YYYY H:mm A",
      blocks: BLOCKS_DATE,
      format: function format(date) {
        return (0, _dayjs.default)(date).format("DD/MM/YYYY H:mm A");
      },
      parse: function parse(str) {
        return (0, _dayjs.default)(str, "DD/MM/YYYY H:mm A").toDate();
      }
    }
  },
  MONTH: {
    type: "MASK",
    config: {
      mask: Date,
      lazy: false,
      pattern: "MM/YYYY",
      blocks: BLOCKS_DATE,
      format: function format(date) {
        return (0, _dayjs.default)(date).format("MM/YYYY");
      },
      parse: function parse(str) {
        return (0, _dayjs.default)(str, "MM/YYYY").toDate();
      }
    }
  },
  TIME: {
    type: "MASK",
    config: {
      mask: Date,
      lazy: false,
      pattern: "HH:mm",
      blocks: BLOCKS_DATE,
      format: function format(date) {
        return (0, _dayjs.default)(date).format("HH:mm");
      },
      parse: function parse(str) {
        return (0, _dayjs.default)(str, "HH:mm").toDate();
      }
    }
  },
  TIME_12: {
    type: "MASK",
    config: {
      mask: Date,
      lazy: false,
      pattern: "H:mm A",
      blocks: BLOCKS_DATE,
      format: function format(date) {
        return (0, _dayjs.default)(date).format("H:mm A");
      },
      parse: function parse(str) {
        return (0, _dayjs.default)(str, "H:mm A").toDate();
      }
    }
  },
  CURRENCY: {
    type: "MASK_MONEY",
    config: {
      precision: 2,
      delimiter: ",",
      separator: "."
    }
  },
  CURRENCY_BRL: {
    type: "MASK_MONEY",
    config: {
      precision: 2,
      delimiter: ".",
      separator: ","
    }
  },
  AMOUNT: {
    type: "MASK_MONEY",
    config: {
      precision: 3,
      delimiter: "",
      separator: "."
    }
  },
  PERCENT: {
    type: "MASK_MONEY",
    config: {
      precision: 2,
      delimiter: "",
      separator: ","
    }
  }
};
exports.CUSTOM_MASKS = CUSTOM_MASKS;
},{"dayjs":"../node_modules/dayjs/dayjs.min.js","imask":"../node_modules/imask/esm/index.js","dayjs/plugin/customParseFormat":"../node_modules/dayjs/plugin/customParseFormat.js"}],"../src/functions/stack-callback.function.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cancelStackCallback = cancelStackCallback;
exports.stackCallback = stackCallback;

function cancelStackCallback(stackId) {
  clearTimeout(stackId);
}

function stackCallback(handler, time) {
  if (time === void 0) {
    time = 0;
  }

  return setTimeout(function () {
    return handler();
  }, time);
}
},{}],"../src/debounce/debounce.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.debounce = debounce;
exports.isDebounce = exports.Debounce = void 0;

var _stackCallback = require("../functions/stack-callback.function");

var _config = {
  time: 250
};

function debounce(callbackOrTime, time) {
  return new Debounce(callbackOrTime, time);
}

var Debounce =
/** @class */
function () {
  function Debounce(callbackOrTime, time) {
    if (typeof callbackOrTime === "function") {
      this.config = Object.assign({}, _config);

      if (time) {
        Object.assign(this.config, {
          time: time
        });
      }

      this.run(callbackOrTime);
    } else {
      this.config = Object.assign({}, _config);

      if (callbackOrTime) {
        Object.assign(this.config, {
          time: callbackOrTime
        });
      }
    }
  }

  Debounce.prototype.run = function (callback, time) {
    this.cancel();
    this.ref = (0, _stackCallback.stackCallback)(callback, time || this.config.time);
    return this;
  };

  Debounce.prototype.cancel = function () {
    if (this.ref) {
      (0, _stackCallback.cancelStackCallback)(this.ref);
      this.ref = undefined;
    }

    return this;
  };

  return Debounce;
}();

exports.Debounce = Debounce;

debounce.config = function (config) {
  Object.assign(_config, config);
};

var isDebounce = function isDebounce(prop) {
  return prop instanceof Debounce;
};

exports.isDebounce = isDebounce;
debounce.isDebounce = isDebounce;
},{"../functions/stack-callback.function":"../src/functions/stack-callback.function.ts"}],"../src/debounce/debounce.type.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
},{}],"../src/masked/imask/mask-imask.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.maskIMask = maskIMask;
exports.MaskIMask = void 0;

var _imask = _interopRequireDefault(require("imask"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __assign = void 0 && (void 0).__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

function maskIMask(pattern, config) {
  return new MaskIMask(pattern, config);
}

var MaskIMask =
/** @class */
function () {
  function MaskIMask(pattern, config) {
    var _this = this;

    this.config = Object.assign({}, this.config, config);

    if (typeof pattern === "string") {
      this.pattern = pattern;
      var patterns = this.pattern.split("||").sort(function (one, two) {
        return one.length - two.length;
      });
      this.config.mask = patterns.length > 1 ? patterns.map(function (pattern) {
        return Object.assign({}, _this.config, {
          mask: pattern
        });
      }) : patterns[0];
    } else {
      Object.assign(this.config, pattern);
    }
  }

  MaskIMask.prototype.bind = function (element, config) {
    config = Object.assign({}, this.config, config);
    this.element = element;
    this.inputMask = (0, _imask.default)(this.element, config);
    this.update(this.inputMask.value);
    return this;
  };

  MaskIMask.prototype.update = function (value, config) {
    config = Object.assign({}, this.config, config);

    if (!value) {
      value = this.element instanceof HTMLInputElement ? this.element.value : this.element.textContent;
    }

    if (this.element && value) {
      this.inputMask.value = this.mask(value, config);
      this.inputMask.updateValue();
    }

    return this;
  };

  MaskIMask.prototype.mask = function (value, config) {
    config = Object.assign({}, this.config, config);
    var imask = this.createMask((value === null || value === void 0 ? void 0 : value.toString()) || "", config);
    return imask.value;
  };

  MaskIMask.prototype.unmask = function (value, config) {
    config = Object.assign({}, this.config, config);
    var imask = this.createMask((value === null || value === void 0 ? void 0 : value.toString()) || "", config);
    return imask.unmaskedValue;
  };

  MaskIMask.prototype.createMask = function (value, config) {
    var createMask = _imask.default.createMask(__assign({}, config));

    createMask.resolve(value);
    return createMask;
  };

  return MaskIMask;
}();

exports.MaskIMask = MaskIMask;
},{"imask":"../node_modules/imask/esm/index.js"}],"../node_modules/vanilla-masker/lib/vanilla-masker.js":[function(require,module,exports) {
var define;
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.VMasker = factory();
  }
}(this, function() {
  var DIGIT = "9",
      ALPHA = "A",
      ALPHANUM = "S",
      BY_PASS_KEYS = [9, 16, 17, 18, 36, 37, 38, 39, 40, 91, 92, 93],
      isAllowedKeyCode = function(keyCode) {
        for (var i = 0, len = BY_PASS_KEYS.length; i < len; i++) {
          if (keyCode == BY_PASS_KEYS[i]) {
            return false;
          }
        }
        return true;
      },
      mergeMoneyOptions = function(opts) {
        opts = opts || {};
        opts = {
          delimiter: opts.delimiter || ".",
          lastOutput: opts.lastOutput,
          precision: opts.hasOwnProperty("precision") ? opts.precision : 2,
          separator: opts.separator || ",",
          showSignal: opts.showSignal,
          suffixUnit: opts.suffixUnit && (" " + opts.suffixUnit.replace(/[\s]/g,'')) || "",
          unit: opts.unit && (opts.unit.replace(/[\s]/g,'') + " ") || "",
          zeroCents: opts.zeroCents
        };
        opts.moneyPrecision = opts.zeroCents ? 0 : opts.precision;
        return opts;
      },
      // Fill wildcards past index in output with placeholder
      addPlaceholdersToOutput = function(output, index, placeholder) {
        for (; index < output.length; index++) {
          if(output[index] === DIGIT || output[index] === ALPHA || output[index] === ALPHANUM) {
            output[index] = placeholder;
          }
        }
        return output;
      }
  ;

  var VanillaMasker = function(elements) {
    this.elements = elements;
  };

  VanillaMasker.prototype.unbindElementToMask = function() {
    for (var i = 0, len = this.elements.length; i < len; i++) {
      this.elements[i].lastOutput = "";
      this.elements[i].onkeyup = false;
      this.elements[i].onkeydown = false;

      if (this.elements[i].value.length) {
        this.elements[i].value = this.elements[i].value.replace(/\D/g, '');
      }
    }
  };

  VanillaMasker.prototype.bindElementToMask = function(maskFunction) {
    var that = this,
        onType = function(e) {
          e = e || window.event;
          var source = e.target || e.srcElement;

          if (isAllowedKeyCode(e.keyCode)) {
            setTimeout(function() {
              that.opts.lastOutput = source.lastOutput;
              source.value = VMasker[maskFunction](source.value, that.opts);
              source.lastOutput = source.value;
              if (source.setSelectionRange && that.opts.suffixUnit) {
                source.setSelectionRange(source.value.length, (source.value.length - that.opts.suffixUnit.length));
              }
            }, 0);
          }
        }
    ;
    for (var i = 0, len = this.elements.length; i < len; i++) {
      this.elements[i].lastOutput = "";
      this.elements[i].onkeyup = onType;
      if (this.elements[i].value.length) {
        this.elements[i].value = VMasker[maskFunction](this.elements[i].value, this.opts);
      }
    }
  };

  VanillaMasker.prototype.maskMoney = function(opts) {
    this.opts = mergeMoneyOptions(opts);
    this.bindElementToMask("toMoney");
  };

  VanillaMasker.prototype.maskNumber = function() {
    this.opts = {};
    this.bindElementToMask("toNumber");
  };
  
  VanillaMasker.prototype.maskAlphaNum = function() {
    this.opts = {};
    this.bindElementToMask("toAlphaNumeric");
  };

  VanillaMasker.prototype.maskPattern = function(pattern) {
    this.opts = {pattern: pattern};
    this.bindElementToMask("toPattern");
  };

  VanillaMasker.prototype.unMask = function() {
    this.unbindElementToMask();
  };

  var VMasker = function(el) {
    if (!el) {
      throw new Error("VanillaMasker: There is no element to bind.");
    }
    var elements = ("length" in el) ? (el.length ? el : []) : [el];
    return new VanillaMasker(elements);
  };

  VMasker.toMoney = function(value, opts) {
    opts = mergeMoneyOptions(opts);
    if (opts.zeroCents) {
      opts.lastOutput = opts.lastOutput || "";
      var zeroMatcher = ("("+ opts.separator +"[0]{0,"+ opts.precision +"})"),
          zeroRegExp = new RegExp(zeroMatcher, "g"),
          digitsLength = value.toString().replace(/[\D]/g, "").length || 0,
          lastDigitLength = opts.lastOutput.toString().replace(/[\D]/g, "").length || 0
      ;
      value = value.toString().replace(zeroRegExp, "");
      if (digitsLength < lastDigitLength) {
        value = value.slice(0, value.length - 1);
      }
    }
    var number = value.toString().replace(/[\D]/g, ""),
        clearDelimiter = new RegExp("^(0|\\"+ opts.delimiter +")"),
        clearSeparator = new RegExp("(\\"+ opts.separator +")$"),
        money = number.substr(0, number.length - opts.moneyPrecision),
        masked = money.substr(0, money.length % 3),
        cents = new Array(opts.precision + 1).join("0")
    ;
    money = money.substr(money.length % 3, money.length);
    for (var i = 0, len = money.length; i < len; i++) {
      if (i % 3 === 0) {
        masked += opts.delimiter;
      }
      masked += money[i];
    }
    masked = masked.replace(clearDelimiter, "");
    masked = masked.length ? masked : "0";
    var signal = "";
    if(opts.showSignal === true) {
      signal = value < 0 || (value.startsWith && value.startsWith('-')) ? "-" :  "";
    }
    if (!opts.zeroCents) {
      var beginCents = number.length - opts.precision,
          centsValue = number.substr(beginCents, opts.precision),
          centsLength = centsValue.length,
          centsSliced = (opts.precision > centsLength) ? opts.precision : centsLength
      ;
      cents = (cents + centsValue).slice(-centsSliced);
    }
    var output = opts.unit + signal + masked + opts.separator + cents;
    return output.replace(clearSeparator, "") + opts.suffixUnit;
  };

  VMasker.toPattern = function(value, opts) {
    var pattern = (typeof opts === 'object' ? opts.pattern : opts),
        patternChars = pattern.replace(/\W/g, ''),
        output = pattern.split(""),
        values = value.toString().replace(/\W/g, ""),
        charsValues = values.replace(/\W/g, ''),
        index = 0,
        i,
        outputLength = output.length,
        placeholder = (typeof opts === 'object' ? opts.placeholder : undefined)
    ;
    
    for (i = 0; i < outputLength; i++) {
      // Reached the end of input
      if (index >= values.length) {
        if (patternChars.length == charsValues.length) {
          return output.join("");
        }
        else if ((placeholder !== undefined) && (patternChars.length > charsValues.length)) {
          return addPlaceholdersToOutput(output, i, placeholder).join("");
        }
        else {
          break;
        }
      }
      // Remaining chars in input
      else{
        if ((output[i] === DIGIT && values[index].match(/[0-9]/)) ||
            (output[i] === ALPHA && values[index].match(/[a-zA-Z]/)) ||
            (output[i] === ALPHANUM && values[index].match(/[0-9a-zA-Z]/))) {
          output[i] = values[index++];
        } else if (output[i] === DIGIT || output[i] === ALPHA || output[i] === ALPHANUM) {
          if(placeholder !== undefined){
            return addPlaceholdersToOutput(output, i, placeholder).join("");
          }
          else{
            return output.slice(0, i).join("");
          }
        }
      }
    }
    return output.join("").substr(0, i);
  };

  VMasker.toNumber = function(value) {
    return value.toString().replace(/(?!^-)[^0-9]/g, "");
  };
  
  VMasker.toAlphaNumeric = function(value) {
    return value.toString().replace(/[^a-z0-9 ]+/i, "");
  };

  return VMasker;
}));

},{}],"../src/masked/vanilla-masker/vanilla-masker.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.maskVanillaMasker = maskVanillaMasker;
exports.MaskVanillaMasker = void 0;

var _vanillaMasker = _interopRequireDefault(require("vanilla-masker"));

var _parseNumber = require("../../functions/parse-number.function");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __assign = void 0 && (void 0).__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var _config = {
  separator: ",",
  delimiter: "."
};

function maskVanillaMasker(config) {
  return new MaskVanillaMasker(config);
}

var MaskVanillaMasker =
/** @class */
function () {
  function MaskVanillaMasker(config) {
    this.config = Object.assign({}, _config, config);
  }

  MaskVanillaMasker.prototype.bind = function (element, config) {
    var _this = this;

    this.element = element;
    this.config.dispatchEvent = true;
    config = Object.assign({}, this.config, __assign(__assign({}, config), {
      dispatchEvent: true
    }));
    this.update(null, config);
    this.element.addEventListener("input", function () {
      _this.update(null, config);

      if (!(_this.element instanceof HTMLInputElement)) {
        var range = document.createRange();
        range.selectNodeContents(_this.element);
        range.collapse(false);
        var selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
      }
    });
    return this;
  };

  MaskVanillaMasker.prototype.update = function (value, config) {
    config = Object.assign({}, this.config, config);

    if (!value) {
      value = this.element instanceof HTMLInputElement ? this.element.value : this.element.textContent;
    }

    if (this.element) {
      if (this.element instanceof HTMLInputElement) {
        this.element.value = this.mask(value, config);
      } else {
        this.element.textContent = this.mask(value, config);
      }
    }

    return this;
  };

  MaskVanillaMasker.prototype.mask = function (value, config) {
    config = Object.assign({}, this.config, config);

    if (!config.dispatchEvent) {
      value = this.unmask((value === null || value === void 0 ? void 0 : value.toString()) || "").toFixed(config.precision || 2);
    }

    return _vanillaMasker.default.toMoney(value, __assign(__assign({}, config), {
      delimiter: "-"
    })).replace(/-/g, config.delimiter);
  };

  MaskVanillaMasker.prototype.unmask = function (value, config) {
    config = Object.assign({}, this.config, config);
    return (0, _parseNumber.parseNumber)(value, {
      decimal: config.separator,
      thousands: config.delimiter
    });
  };

  return MaskVanillaMasker;
}();

exports.MaskVanillaMasker = MaskVanillaMasker;

maskVanillaMasker.config = function (config) {
  Object.assign(_config, config);
};
},{"vanilla-masker":"../node_modules/vanilla-masker/lib/vanilla-masker.js","../../functions/parse-number.function":"../src/functions/parse-number.function.ts"}],"../src/masked/masked.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.masked = masked;

var _mask = require("../constant/mask.constant");

var _common = require("../validations/common/common.validation");

var _maskImask = require("./imask/mask-imask");

var _vanillaMasker = require("./vanilla-masker/vanilla-masker");

function masked(pattern, config) {
  if (typeof pattern === "string") {
    var custoMaskKeys = Object.keys(_mask.CUSTOM_MASKS);

    if (custoMaskKeys.includes(pattern === null || pattern === void 0 ? void 0 : pattern.toUpperCase())) {
      var CUSTOM_MASK = _mask.CUSTOM_MASKS[pattern === null || pattern === void 0 ? void 0 : pattern.toUpperCase()];

      if (CUSTOM_MASK.type === "MASK") {
        var _config = CUSTOM_MASK.config;

        if ((0, _common.isArray)(_config.mask)) {
          _config.mask = _config.mask.map(function (mask) {
            return Object.assign({}, config, mask);
          });
        }

        config = Object.assign({}, CUSTOM_MASK.config, config);
        return new _maskImask.MaskIMask(config);
      } else {
        config = Object.assign({}, CUSTOM_MASK.config, config);
        return new _vanillaMasker.MaskVanillaMasker(config);
      }
    }

    return new _maskImask.MaskIMask(pattern, config);
  }

  if (pattern.mask) {
    return new _maskImask.MaskIMask(pattern);
  } else {
    return new _vanillaMasker.MaskVanillaMasker(pattern);
  }
}

masked.custom = function (name, mask) {
  return _mask.CUSTOM_MASKS[name] = mask;
};
},{"../constant/mask.constant":"../src/constant/mask.constant.ts","../validations/common/common.validation":"../src/validations/common/common.validation.ts","./imask/mask-imask":"../src/masked/imask/mask-imask.ts","./vanilla-masker/vanilla-masker":"../src/masked/vanilla-masker/vanilla-masker.ts"}],"../src/masked/masked.type.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
},{}],"../src/functions/object/get-node.function.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNode = getNode;

function getNode(object, keys) {
  if (typeof keys === "string") {
    keys = keys === null || keys === void 0 ? void 0 : keys.split(".");
  }

  keys = keys === null || keys === void 0 ? void 0 : keys.filter(function (key) {
    return key;
  });

  if ((keys === null || keys === void 0 ? void 0 : keys.length) === 0) {
    return object;
  }

  var key = keys[0];
  keys === null || keys === void 0 ? void 0 : keys.shift();

  if ((keys === null || keys === void 0 ? void 0 : keys.length) === 0) {
    return object === null || object === void 0 ? void 0 : object[key];
  } else {
    return getNode(object === null || object === void 0 ? void 0 : object[key], keys);
  }
}
},{}],"../src/functions/theme-system.function.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.themeSystem = void 0;

var themeSystem = function themeSystem() {
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

exports.themeSystem = themeSystem;
},{}],"../src/theme/theme-color.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.themeColor = void 0;
var themeColor = {
  global: {
    primary: {
      default: "#673ab7",
      light: "#cec8ec",
      dark: "hsl(262, 47%, 63%)"
    },
    danger: "#f44336",
    success: "#4caf50",
    warning: "#ff9800",
    telegram: "#0088cc",
    whatsapp: "#25d366",
    facebook: "#4267b2",
    instagram: "radial-gradient(circle at 33% 100%, #fed373 4%,#f15245 30%,#d92e7f 62%,#9b36b7 85%, #515ecf)"
  },
  dark: {
    background: {
      default: "#181818",
      light: "#424242",
      dark: "#202020"
    },
    text: {
      default: "#fff",
      light: "#fff",
      dark: "#aaa"
    }
  },
  light: {
    background: {
      default: "#fff",
      light: "#fff",
      dark: "#eee"
    },
    text: {
      default: "#333",
      light: "#fff",
      dark: "#000"
    }
  }
};
exports.themeColor = themeColor;
},{}],"../src/theme/theme.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.theme = theme;
exports.isTheme = exports.Theme = void 0;

var _getNode = require("../functions/object/get-node.function");

var _extends = require("../functions/object/extends.function");

var _themeSystem = require("../functions/theme-system.function");

var _common = require("../validations/common/common.validation");

var _themeColor = require("./theme-color");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _a, _b;

var _config = {
  prefix: "color",
  use: (0, _themeSystem.themeSystem)() || "light",
  disableSystemBasedColorShift: false,
  _element: document.createElement("style")
};
(_b = (_a = window === null || window === void 0 ? void 0 : window.matchMedia) === null || _a === void 0 ? void 0 : _a.call(window, "(prefers-color-scheme: dark)")) === null || _b === void 0 ? void 0 : _b.addEventListener("change", function (event) {
  if ((0, _common.isFalsy)(_config.disableSystemBasedColorShift)) {
    theme().change((0, _themeSystem.themeSystem)() || "light");
  }
});

function theme(themes, config) {
  return new Theme(themes, config);
}

var Theme =
/** @class */
function () {
  function Theme(themes, config) {
    (0, _extends.$extends)(Theme._themes, themes);
    (0, _extends.$extends)(_config, config);

    if (!document.head.contains(this.element)) {
      document.head.appendChild(this.element);
    }
  }

  Object.defineProperty(Theme.prototype, "themes", {
    get: function get() {
      return Theme._themes;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Theme.prototype, "prefix", {
    get: function get() {
      return _config.prefix;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Theme.prototype, "style", {
    get: function get() {
      return _config._style;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Theme.prototype, "use", {
    get: function get() {
      return _config.use;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Theme.prototype, "config", {
    get: function get() {
      return _config;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Theme.prototype, "element", {
    get: function get() {
      return _config._element;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Theme.prototype, "themeSystem", {
    get: function get() {
      return (0, _themeSystem.themeSystem)() || "light";
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Theme.prototype, "isDark", {
    get: function get() {
      return this.use === "dark";
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Theme.prototype, "isLight", {
    get: function get() {
      return this.use === "light";
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Theme.prototype, "isNoPreference", {
    get: function get() {
      return this.use === "no-preference";
    },
    enumerable: false,
    configurable: true
  });
  /**
   * @private
   * @description Reseta todo o estilo */

  Theme.prototype.reset = function () {
    Theme._themes = {};
    _config = {
      use: this.themeSystem,
      _style: "",
      prefix: "color",
      disableChangeScheme: false,
      _element: _config._element
    };
  };
  /**
   * @private
   * @description Altera o tema do sistema podendo ser dark light ou o padrão */


  Theme.prototype.change = function (theme) {
    _config.use = theme;
    this.createStyle();
  };
  /**
   * @private
   * @description Cria todo o estilo baseado nas cores passadas no construtor */


  Theme.prototype.createStyle = function () {
    _config._style = this._generatorStyle();
    _config._element.innerHTML = this.style;
    document.body.classList.remove("theme-dark", "theme-light", "theme-no-preference");
    document.body.classList.add("theme-" + _config.use);
  };
  /**
   * @private
   * @description Pega a cor passada por paramento
   * @example getColor("dark.primary.light") */


  Theme.prototype.getColor = function (colors, currentTheme) {
    if (currentTheme === void 0) {
      currentTheme = true;
    }

    var nodes = colors.split(".");

    if (currentTheme) {
      nodes.unshift(this.use);
    }

    var color = (0, _getNode.getNode)(this.themes, nodes);

    if (_typeof(color) === "object") {
      return color.default;
    }

    return color;
  };
  /**
   * @private
   * @description Gera o conteudo da tag de estilo */


  Theme.prototype._generatorStyle = function () {
    var style = ["color-scheme: " + this.use];
    var colors = Theme._themes[this.use];

    if (_typeof(Theme._themes.global) === "object") {
      style = style.concat(this._generatorStyleVariables(Theme._themes.global));
    }

    if (_typeof(colors) === "object") {
      style = style.concat(this._generatorStyleVariables(colors));
    }

    return ":root{" + style.join(";") + ";}";
  };
  /**
   * @private
   * @description Gera todas as variavel de estilo passadas pelo paramento */


  Theme.prototype._generatorStyleVariables = function (colors) {
    var _this = this;

    return Object.keys(colors).reduce(function (prev, colorType) {
      if (typeof colors[colorType] === "string") {
        prev.push("--" + _this.prefix + "-" + colorType + ": " + colors[colorType]);
      } else {
        Object.keys(colors[colorType]).forEach(function (colorName) {
          var value = colors[colorType][colorName];

          if (colorName === "default") {
            prev.push("--" + _this.prefix + "-" + colorType + ": " + value);
          } else {
            prev.push("--" + _this.prefix + "-" + colorType + "-" + colorName + ": " + value);
          }
        });
      }

      return prev;
    }, []);
  };

  var _c, _d;

  Theme._themes = _themeColor.themeColor;
  /**
   * @public
   * @description Este observador é nativo do javascript então
   * você ficar responsavel por destruir este observador
   * @example Theme.destroyChangeTheme(listener) */

  Theme.onChangeTheme = (_d = (_c = window === null || window === void 0 ? void 0 : window.matchMedia) === null || _c === void 0 ? void 0 : _c.call(window, "(prefers-color-scheme: dark)")) === null || _d === void 0 ? void 0 : _d.addEventListener.bind(window);
  /**
   * @public
   * @description Este metodo é usado para destruir os observador usados no onChangeTheme */

  Theme.destroyChangeTheme = function (listener) {
    var _a, _b;

    return (_b = (_a = window === null || window === void 0 ? void 0 : window.matchMedia) === null || _a === void 0 ? void 0 : _a.call(window, "(prefers-color-scheme: dark)")) === null || _b === void 0 ? void 0 : _b.removeEventListener("change", listener);
  };

  return Theme;
}();

exports.Theme = Theme;

theme.config = function (config) {
  (0, _extends.$extends)(_config, config);
};

theme.theme = function (themes) {
  (0, _extends.$extends)(Theme._themes, themes);
};

var isTheme = function isTheme(prop) {
  return prop instanceof Theme;
};

exports.isTheme = isTheme;
theme.isTheme = isTheme;
},{"../functions/object/get-node.function":"../src/functions/object/get-node.function.ts","../functions/object/extends.function":"../src/functions/object/extends.function.ts","../functions/theme-system.function":"../src/functions/theme-system.function.ts","../validations/common/common.validation":"../src/validations/common/common.validation.ts","./theme-color":"../src/theme/theme-color.ts"}],"../src/theme/theme.type.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
},{}],"../src/functions/file/base64-to-file.function.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.base64toFile = base64toFile;

function base64toFile(base64, filename) {
  var _a, _b;

  var array = base64 === null || base64 === void 0 ? void 0 : base64.split(",");
  var mime = ((_b = (_a = array[0]) === null || _a === void 0 ? void 0 : _a.match(/:(.*?);/)) === null || _b === void 0 ? void 0 : _b[1]) || "image/png";

  var _atob = atob(array[1] || array[0]);

  var length = _atob.length;
  var uint8array = new Uint8Array(length);

  while (length--) {
    uint8array[length] = _atob.charCodeAt(length);
  }

  return new File([uint8array], filename, {
    type: mime
  });
}
},{}],"../src/functions/file/file-to-base64.function.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fileToBase64 = fileToBase64;

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = void 0 && (void 0).__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

function fileToBase64(file) {
  return __awaiter(this, void 0, Promise, function () {
    return __generator(this, function (_a) {
      return [2
      /*return*/
      , new Promise(function (resolve, reject) {
        var fileReader = new FileReader();
        fileReader.onerror = reject;

        fileReader.onload = function () {
          return resolve(fileReader.result);
        };

        fileReader.readAsDataURL(file);
      })];
    });
  });
}
},{}],"../src/validations/file/file.validation.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isFile = exports.RESOLUTION_HEIGHT = exports.RESOLUTION_WIDTH = exports.BIT_SIZES = void 0;
var BIT_SIZES = {
  B: 1,
  KB: 1024,
  MB: 1048576,
  GB: 1073741824,
  TB: 1099511627776
};
exports.BIT_SIZES = BIT_SIZES;
var RESOLUTION_WIDTH = {
  HD: 1280,
  HD_MORE: 1366,
  FULL_HD: 1920,
  QUAD_HD: 2560,
  UHD: 3840
};
exports.RESOLUTION_WIDTH = RESOLUTION_WIDTH;
var RESOLUTION_HEIGHT = {
  HD: 720,
  HD_MORE: 768,
  FULL_HD: 1080,
  QUAD_HD: 1440,
  UHD: 2160
};
exports.RESOLUTION_HEIGHT = RESOLUTION_HEIGHT;

var isFile = function isFile(file) {
  return file instanceof File;
};

exports.isFile = isFile;
},{}],"../src/functions/file/get-size-image.function.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSizeImage = void 0;

var _file = require("../../validations/file/file.validation");

var _base64ToFile = require("./base64-to-file.function");

var _fileToBase = require("./file-to-base64.function");

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = void 0 && (void 0).__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var getSizeImage = function getSizeImage(file) {
  return __awaiter(void 0, void 0, Promise, function () {
    var type, image, base64;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          type = file.type.split("/");

          if (!(0, _file.isFile)(file) && typeof file === "string") {
            file = (0, _base64ToFile.base64toFile)(file, "unnamed.png");
          }

          if (type[0] !== "image") {
            throw new Error("File is not image");
          }

          image = new Image();
          return [4
          /*yield*/
          , (0, _fileToBase.fileToBase64)(file)];

        case 1:
          base64 = _a.sent();
          return [2
          /*return*/
          , new Promise(function (resolve, reject) {
            image.onerror = function (error) {
              reject(error);
            };

            image.onload = function () {
              resolve({
                height: image.height,
                width: image.width
              });
            };

            image.src = base64;
          })];
      }
    });
  });
};

exports.getSizeImage = getSizeImage;
},{"../../validations/file/file.validation":"../src/validations/file/file.validation.ts","./base64-to-file.function":"../src/functions/file/base64-to-file.function.ts","./file-to-base64.function":"../src/functions/file/file-to-base64.function.ts"}],"../src/functions/object/sort-asc.function.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sortAsc = sortAsc;

var _getNode = require("./get-node.function");

function sortAsc(object, filter) {
  var arrayFilterLabel = filter === null || filter === void 0 ? void 0 : filter.split("|");
  var pipe = arrayFilterLabel[1];
  filter = arrayFilterLabel[0];
  return object.sort(function (a, b) {
    var node_a = (0, _getNode.getNode)(a, filter === null || filter === void 0 ? void 0 : filter.split("."));
    var node_b = (0, _getNode.getNode)(b, filter === null || filter === void 0 ? void 0 : filter.split("."));

    if (typeof node_a === "number" && typeof node_b === "number") {
      return node_a - node_b;
    } else if (typeof node_a === "string") {
      if (node_a.toLocaleUpperCase() < node_b.toLocaleUpperCase()) {
        return -1;
      }

      if (node_b.toLocaleUpperCase() < node_a.toLocaleUpperCase()) {
        return 1;
      }
    }

    return 0;
  });
}
},{"./get-node.function":"../src/functions/object/get-node.function.ts"}],"../src/functions/object/sort-desc.function.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sortDesc = sortDesc;

var _getNode = require("./get-node.function");

function sortDesc(object, filter) {
  var arrayFilterLabel = filter === null || filter === void 0 ? void 0 : filter.split("|");
  var pipe = arrayFilterLabel[1];
  filter = arrayFilterLabel[0];
  return object.sort(function (a, b) {
    var node_a = (0, _getNode.getNode)(a, filter === null || filter === void 0 ? void 0 : filter.split("."));
    var node_b = (0, _getNode.getNode)(b, filter === null || filter === void 0 ? void 0 : filter.split("."));

    if (typeof node_a === "number" && typeof node_b === "number") {
      var result = node_a - node_b;
      return result > 0 ? -1 : result == 0 ? 0 : 1;
    } else if (typeof node_a === "string") {
      if (node_a.toLocaleUpperCase() > node_b.toLocaleUpperCase()) {
        return -1;
      }

      if (node_b.toLocaleUpperCase() > node_a.toLocaleUpperCase()) {
        return 1;
      }
    }

    return 0;
  });
}
},{"./get-node.function":"../src/functions/object/get-node.function.ts"}],"../src/functions/sleep.function.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sleep = sleep;

function sleep(time) {
  if (time === void 0) {
    time = 250;
  }

  return new Promise(function (resolve) {
    return setTimeout(resolve, time);
  });
}
},{}],"../src/functions/handle-try.function.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleTry = handleTry;

var _common = require("../validations/common/common.validation");

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = void 0 && (void 0).__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

function handleTry(promise) {
  var _a;

  return __awaiter(this, void 0, Promise, function () {
    var _, data, error_1;

    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 2,, 3]);

          _ = promise === null || promise === void 0 ? void 0 : promise.toPromise;

          if (!(0, _common.isUndefined)(_)) {
            promise = (_a = promise.toPromise) === null || _a === void 0 ? void 0 : _a.call(promise);
          }

          return [4
          /*yield*/
          , promise];

        case 1:
          data = _b.sent();
          return [2
          /*return*/
          , [data, null]];

        case 2:
          error_1 = _b.sent();
          return [2
          /*return*/
          , [null, error_1]];

        case 3:
          return [2
          /*return*/
          ];
      }
    });
  });
}
},{"../validations/common/common.validation":"../src/validations/common/common.validation.ts"}],"../src/functions/pick-text-color-based-color.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pickTextColorBasedColor = pickTextColorBasedColor;

/**
 * @description Verifica qual é a tonalidade que a cor passada via paramentos esta mais proxima
 * @param {string} color
 * @param {string} [lightColor="#ffffff"]
 * @param {string} [darkColor="#000000"]
 * @return {number} */
function pickTextColorBasedColor(color, lightColor, darkColor) {
  if (lightColor === void 0) {
    lightColor = "#ffffff";
  }

  if (darkColor === void 0) {
    darkColor = "#000000";
  }

  color = color.charAt(0) === "#" ? color.substring(1, 7) : color;
  var r = parseInt(color.substring(0, 2), 16); // hexToR

  var g = parseInt(color.substring(2, 4), 16); // hexToG

  var b = parseInt(color.substring(4, 6), 16); // hexToB

  var uicolors = [r / 255, g / 255, b / 255];
  var c = uicolors.map(function (col) {
    if (col <= 0.03928) {
      return col / 12.92;
    }

    return Math.pow((col + 0.055) / 1.055, 2.4);
  });
  var L = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  return L > 0.179 ? darkColor : lightColor;
}
},{}],"../src/regex/char-special.regex.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.REGEX_CHAR_SPECIAL = void 0;
var REGEX_CHAR_SPECIAL = /(\W)/g;
exports.REGEX_CHAR_SPECIAL = REGEX_CHAR_SPECIAL;
},{}],"../src/regex/cnpj.regex.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.REGEX_CNPJ = void 0;
var REGEX_CNPJ = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
exports.REGEX_CNPJ = REGEX_CNPJ;
},{}],"../src/regex/cpf-cnpj.regex.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.REGEX_CPF_CNPJ = void 0;
var REGEX_CPF_CNPJ = /(^\d{3}\.\d{3}\.\d{3}-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$)/;
exports.REGEX_CPF_CNPJ = REGEX_CPF_CNPJ;
},{}],"../src/regex/cpf.regex.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.REGEX_CPF = void 0;
var REGEX_CPF = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
exports.REGEX_CPF = REGEX_CPF;
},{}],"../src/regex/email.regex.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.REGEX_EMAIL = void 0;
var REGEX_EMAIL = /^[-\w.%+]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
exports.REGEX_EMAIL = REGEX_EMAIL;
},{}],"../src/regex/number.regex.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.REGEX_NUMBER = void 0;
var REGEX_NUMBER = /(\d)/g;
exports.REGEX_NUMBER = REGEX_NUMBER;
},{}],"../src/regex/phone-br.regex.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.REGEX_PHONE_BR = void 0;
var REGEX_PHONE_BR = /^((\()?(\d{2})?(\))?( )?(9)?( )?\d{4}(-)?\d{4})$/;
exports.REGEX_PHONE_BR = REGEX_PHONE_BR;
},{}],"../src/regex/time.regex.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.REGEX_TIME = void 0;
var REGEX_TIME = /^([0-1][0-9]|[2][0-3]):([0-5][0-9])(:([0-5][0-9]))?$/g;
exports.REGEX_TIME = REGEX_TIME;
},{}],"../src/regex/upper-case.regex.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.REGEX_UPPER_CASE = void 0;
var REGEX_UPPER_CASE = /([A-Z])/g;
exports.REGEX_UPPER_CASE = REGEX_UPPER_CASE;
},{}],"../src/regex/url.regex.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.REGEX_URL = void 0;
var REGEX_URL = /^((((http[s]?):\/{2})?)+(([0-9a-z_-]+\.)+([a-z]{2,3}))(:[0-9]+)?((\/([~0-9a-zA-Z\#\+\%@\.\/_-]+))?(\?[0-9a-zA-Z\+\%@\/&\[\];=_-]+)?)?)/;
exports.REGEX_URL = REGEX_URL;
},{}],"../src/validations/common/common.type.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
},{}],"../src/regex/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _charSpecial = require("./char-special.regex");

Object.keys(_charSpecial).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _charSpecial[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _charSpecial[key];
    }
  });
});

var _cnpj = require("./cnpj.regex");

Object.keys(_cnpj).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _cnpj[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _cnpj[key];
    }
  });
});

var _cpfCnpj = require("./cpf-cnpj.regex");

Object.keys(_cpfCnpj).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _cpfCnpj[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _cpfCnpj[key];
    }
  });
});

var _cpf = require("./cpf.regex");

Object.keys(_cpf).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _cpf[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _cpf[key];
    }
  });
});

var _email = require("./email.regex");

Object.keys(_email).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _email[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _email[key];
    }
  });
});

var _number = require("./number.regex");

Object.keys(_number).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _number[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _number[key];
    }
  });
});

var _phoneBr = require("./phone-br.regex");

Object.keys(_phoneBr).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _phoneBr[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _phoneBr[key];
    }
  });
});

var _time = require("./time.regex");

Object.keys(_time).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _time[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _time[key];
    }
  });
});

var _upperCase = require("./upper-case.regex");

Object.keys(_upperCase).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _upperCase[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _upperCase[key];
    }
  });
});

var _url = require("./url.regex");

Object.keys(_url).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _url[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _url[key];
    }
  });
});
},{"./char-special.regex":"../src/regex/char-special.regex.ts","./cnpj.regex":"../src/regex/cnpj.regex.ts","./cpf-cnpj.regex":"../src/regex/cpf-cnpj.regex.ts","./cpf.regex":"../src/regex/cpf.regex.ts","./email.regex":"../src/regex/email.regex.ts","./number.regex":"../src/regex/number.regex.ts","./phone-br.regex":"../src/regex/phone-br.regex.ts","./time.regex":"../src/regex/time.regex.ts","./upper-case.regex":"../src/regex/upper-case.regex.ts","./url.regex":"../src/regex/url.regex.ts"}],"../src/validations/common/is-password.validation.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPassword = isPassword;

var _regex = require("../../regex");

var _contains = require("../../functions/contains.function");

function isPassword(value, disabled, minLength) {
  if (minLength === void 0) {
    minLength = 9;
  }

  if (!value) return false;

  var _value = value.toString();

  var resultUpperCase = (disabled === null || disabled === void 0 ? void 0 : disabled.charUpperCase) || (0, _contains.contains)(_value, _regex.REGEX_UPPER_CASE, {
    caseSensitive: true
  });
  var resultMinLength = (_value === null || _value === void 0 ? void 0 : _value.length) >= minLength;
  var resultCharSpecial = (disabled === null || disabled === void 0 ? void 0 : disabled.charSpecial) || (0, _contains.contains)(_value, _regex.REGEX_CHAR_SPECIAL);
  var resultNumber = (disabled === null || disabled === void 0 ? void 0 : disabled.number) || (0, _contains.contains)(_value, _regex.REGEX_NUMBER);
  return resultUpperCase && resultMinLength && resultCharSpecial && resultNumber;
}
},{"../../regex":"../src/regex/index.ts","../../functions/contains.function":"../src/functions/contains.function.ts"}],"../src/validations/common/is-rg-sp.validation.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isRgSp = isRgSp;

function isRgSp(rg) {
  if (!rg) return false;
  rg = rg.replace(/\D/g, "");
  var partRg = rg.substr(0, 8).split("");
  var digitRg = Number(rg.charAt(8));
  var digitGenerated = calcDigit(partRg);
  return digitRg === digitGenerated;
}

function calcDigit(parteCPF, multi) {
  if (multi === void 0) {
    multi = 9;
  }

  var generatedDigit = 0;
  var valueTotal = 0;
  valueTotal = parteCPF.reduce(function (result, currentNumber) {
    return result + Number.parseInt(currentNumber) * multi--;
  }, 0);
  generatedDigit = valueTotal % 11;

  if (generatedDigit > 9) {
    generatedDigit = 0;
  }

  return generatedDigit;
}
},{}],"../src/validations/file/file.type.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
},{}],"../src/validations/file/is-allow-extension.validation.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAllowExtensions = void 0;

var _isEmpty = require("../common/is-empty.validation");

var _file = require("./file.validation");

var isAllowExtensions = function isAllowExtensions(files, extensions) {
  var filesInvalid = [];
  files = files || [];

  if ((0, _file.isFile)(files)) {
    files = [files];
  }

  for (var _i = 0, _a = Array.from(files); _i < _a.length; _i++) {
    var file = _a[_i];
    var type = [];

    if (!(0, _file.isFile)(file)) {
      filesInvalid.push({
        error: "NOT_FILE"
      });
    }

    for (var _b = 0, extensions_1 = extensions; _b < extensions_1.length; _b++) {
      var extension = extensions_1[_b];
      type = file.name.split(".");

      if (type.length < 2) {
        filesInvalid.push({
          filename: file.name,
          mimeType: file.type,
          error: "WITHOUT_EXTENSION"
        });
      }

      if (extension !== type[type.length - 1]) {
        filesInvalid.push({
          filename: file.name,
          mimeType: file.type,
          extension: type[type.length - 1],
          error: null
        });
      }
    }
  }

  return {
    allowedExtensions: extensions,
    valid: (0, _isEmpty.isEmpty)(filesInvalid),
    filesInvalid: filesInvalid
  };
};

exports.isAllowExtensions = isAllowExtensions;
},{"../common/is-empty.validation":"../src/validations/common/is-empty.validation.ts","./file.validation":"../src/validations/file/file.validation.ts"}],"../src/validations/file/max-size.validation.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.maxSize = void 0;

var _file = require("./file.validation");

var _isEmpty = require("../common/is-empty.validation");

var maxSize = function maxSize(files, max, type) {
  if (type === void 0) {
    type = "KB";
  }

  var filesInvalid = [];
  files = files || [];
  var size = _file.BIT_SIZES[type] || _file.BIT_SIZES.B;
  size = size * max;

  if ((0, _file.isFile)(files)) {
    files = [files];
  }

  for (var _i = 0, _a = Array.from(files); _i < _a.length; _i++) {
    var file = _a[_i];

    if (!(0, _file.isFile)(file)) {
      filesInvalid.push({
        error: "NOT_FILE"
      });
    }

    if (file.size > size) {
      filesInvalid.push({
        filename: file.name,
        fileSizeInBytes: file.size,
        mimeType: file.type,
        error: "SIZE"
      });
    }
  }

  return {
    maxSize: size,
    typeDefined: type,
    valid: (0, _isEmpty.isEmpty)(filesInvalid),
    filesInvalid: filesInvalid
  };
};

exports.maxSize = maxSize;
},{"./file.validation":"../src/validations/file/file.validation.ts","../common/is-empty.validation":"../src/validations/common/is-empty.validation.ts"}],"../src/validations/file/min-size.validation.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.minSize = void 0;

var _file = require("./file.validation");

var _isEmpty = require("../common/is-empty.validation");

var minSize = function minSize(files, min, type) {
  if (type === void 0) {
    type = "KB";
  }

  var filesInvalid = [];
  files = files || [];
  var size = _file.BIT_SIZES[type] || _file.BIT_SIZES.B;
  size = size * min;

  if ((0, _file.isFile)(files)) {
    files = [files];
  }

  for (var _i = 0, _a = Array.from(files); _i < _a.length; _i++) {
    var file = _a[_i];

    if (!(0, _file.isFile)(file)) {
      filesInvalid.push({
        error: "NOT_FILE"
      });
    }

    if (file.size < size) {
      filesInvalid.push({
        filename: file.name,
        fileSizeInBytes: file.size,
        mimeType: file.type,
        error: "SIZE"
      });
    }
  }

  return {
    minSize: size,
    typeDefined: type,
    valid: (0, _isEmpty.isEmpty)(filesInvalid),
    filesInvalid: filesInvalid
  };
};

exports.minSize = minSize;
},{"./file.validation":"../src/validations/file/file.validation.ts","../common/is-empty.validation":"../src/validations/common/is-empty.validation.ts"}],"../src/types/max-min.type.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
},{}],"../src/types/range.type.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
},{}],"../src/utils.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _resize = require("./resize/resize");

Object.keys(_resize).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _resize[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _resize[key];
    }
  });
});

var _resize2 = require("./resize/resize.type");

Object.keys(_resize2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _resize2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _resize2[key];
    }
  });
});

var _selectedList = require("./selected-list/selected-list");

Object.keys(_selectedList).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _selectedList[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _selectedList[key];
    }
  });
});

var _keyboardShortcut = require("./keyboard-shortcut/keyboard-shortcut");

Object.keys(_keyboardShortcut).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _keyboardShortcut[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _keyboardShortcut[key];
    }
  });
});

var _keyboardShortcut2 = require("./keyboard-shortcut/keyboard-shortcut.type");

Object.keys(_keyboardShortcut2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _keyboardShortcut2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _keyboardShortcut2[key];
    }
  });
});

var _undoRedoStack = require("./undo-redo-stack/undo-redo-stack");

Object.keys(_undoRedoStack).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _undoRedoStack[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _undoRedoStack[key];
    }
  });
});

var _undoRedoStack2 = require("./undo-redo-stack/undo-redo-stack.type");

Object.keys(_undoRedoStack2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _undoRedoStack2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _undoRedoStack2[key];
    }
  });
});

var _monitoring = require("./monitoring/monitoring");

Object.keys(_monitoring).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _monitoring[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _monitoring[key];
    }
  });
});

var _monitoring2 = require("./monitoring/monitoring.type");

Object.keys(_monitoring2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _monitoring2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _monitoring2[key];
    }
  });
});

var _calc = require("./calc/calc");

Object.keys(_calc).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _calc[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _calc[key];
    }
  });
});

var _math = require("./calc/math.calc");

Object.keys(_math).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _math[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _math[key];
    }
  });
});

var _calc2 = require("./calc/calc.type");

Object.keys(_calc2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _calc2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _calc2[key];
    }
  });
});

var _inputMode = require("./constant/input-mode.constant");

Object.keys(_inputMode).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _inputMode[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _inputMode[key];
    }
  });
});

var _input = require("./constant/input.constant");

Object.keys(_input).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _input[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _input[key];
    }
  });
});

var _mask = require("./constant/mask.constant");

Object.keys(_mask).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _mask[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _mask[key];
    }
  });
});

var _debounce = require("./debounce/debounce");

Object.keys(_debounce).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _debounce[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _debounce[key];
    }
  });
});

var _debounce2 = require("./debounce/debounce.type");

Object.keys(_debounce2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _debounce2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _debounce2[key];
    }
  });
});

var _masked = require("./masked/masked");

Object.keys(_masked).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _masked[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _masked[key];
    }
  });
});

var _masked2 = require("./masked/masked.type");

Object.keys(_masked2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _masked2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _masked2[key];
    }
  });
});

var _maskImask = require("./masked/imask/mask-imask");

Object.keys(_maskImask).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _maskImask[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _maskImask[key];
    }
  });
});

var _vanillaMasker = require("./masked/vanilla-masker/vanilla-masker");

Object.keys(_vanillaMasker).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _vanillaMasker[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _vanillaMasker[key];
    }
  });
});

var _theme = require("./theme/theme");

Object.keys(_theme).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _theme[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _theme[key];
    }
  });
});

var _theme2 = require("./theme/theme.type");

Object.keys(_theme2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _theme2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _theme2[key];
    }
  });
});

var _base64ToFile = require("./functions/file/base64-to-file.function");

Object.keys(_base64ToFile).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _base64ToFile[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _base64ToFile[key];
    }
  });
});

var _fileToBase = require("./functions/file/file-to-base64.function");

Object.keys(_fileToBase).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _fileToBase[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _fileToBase[key];
    }
  });
});

var _getSizeImage = require("./functions/file/get-size-image.function");

Object.keys(_getSizeImage).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _getSizeImage[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _getSizeImage[key];
    }
  });
});

var _getNode = require("./functions/object/get-node.function");

Object.keys(_getNode).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _getNode[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _getNode[key];
    }
  });
});

var _extends = require("./functions/object/extends.function");

Object.keys(_extends).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _extends[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _extends[key];
    }
  });
});

var _sortAsc = require("./functions/object/sort-asc.function");

Object.keys(_sortAsc).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _sortAsc[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _sortAsc[key];
    }
  });
});

var _sortDesc = require("./functions/object/sort-desc.function");

Object.keys(_sortDesc).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _sortDesc[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _sortDesc[key];
    }
  });
});

var _sleep = require("./functions/sleep.function");

Object.keys(_sleep).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _sleep[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _sleep[key];
    }
  });
});

var _handleTry = require("./functions/handle-try.function");

Object.keys(_handleTry).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _handleTry[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _handleTry[key];
    }
  });
});

var _themeSystem = require("./functions/theme-system.function");

Object.keys(_themeSystem).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _themeSystem[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _themeSystem[key];
    }
  });
});

var _parseNumber = require("./functions/parse-number.function");

Object.keys(_parseNumber).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _parseNumber[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _parseNumber[key];
    }
  });
});

var _removeAccents = require("./functions/remove-accents.function");

Object.keys(_removeAccents).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _removeAccents[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _removeAccents[key];
    }
  });
});

var _stackCallback = require("./functions/stack-callback.function");

Object.keys(_stackCallback).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _stackCallback[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _stackCallback[key];
    }
  });
});

var _pickTextColorBasedColor = require("./functions/pick-text-color-based-color");

Object.keys(_pickTextColorBasedColor).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _pickTextColorBasedColor[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _pickTextColorBasedColor[key];
    }
  });
});

var _charSpecial = require("./regex/char-special.regex");

Object.keys(_charSpecial).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _charSpecial[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _charSpecial[key];
    }
  });
});

var _cnpj = require("./regex/cnpj.regex");

Object.keys(_cnpj).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _cnpj[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _cnpj[key];
    }
  });
});

var _cpfCnpj = require("./regex/cpf-cnpj.regex");

Object.keys(_cpfCnpj).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _cpfCnpj[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _cpfCnpj[key];
    }
  });
});

var _cpf = require("./regex/cpf.regex");

Object.keys(_cpf).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _cpf[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _cpf[key];
    }
  });
});

var _email = require("./regex/email.regex");

Object.keys(_email).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _email[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _email[key];
    }
  });
});

var _number = require("./regex/number.regex");

Object.keys(_number).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _number[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _number[key];
    }
  });
});

var _phoneBr = require("./regex/phone-br.regex");

Object.keys(_phoneBr).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _phoneBr[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _phoneBr[key];
    }
  });
});

var _time = require("./regex/time.regex");

Object.keys(_time).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _time[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _time[key];
    }
  });
});

var _upperCase = require("./regex/upper-case.regex");

Object.keys(_upperCase).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _upperCase[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _upperCase[key];
    }
  });
});

var _url = require("./regex/url.regex");

Object.keys(_url).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _url[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _url[key];
    }
  });
});

var _common = require("./validations/common/common.validation");

Object.keys(_common).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _common[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _common[key];
    }
  });
});

var _common2 = require("./validations/common/common.type");

Object.keys(_common2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _common2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _common2[key];
    }
  });
});

var _contains = require("./functions/contains.function");

Object.keys(_contains).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _contains[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _contains[key];
    }
  });
});

var _isCnpj = require("./validations/common/is-cnpj.validation");

Object.keys(_isCnpj).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _isCnpj[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isCnpj[key];
    }
  });
});

var _isCpf = require("./validations/common/is-cpf.validation");

Object.keys(_isCpf).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _isCpf[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isCpf[key];
    }
  });
});

var _isEmpty = require("./validations/common/is-empty.validation");

Object.keys(_isEmpty).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _isEmpty[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isEmpty[key];
    }
  });
});

var _isPassword = require("./validations/common/is-password.validation");

Object.keys(_isPassword).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _isPassword[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isPassword[key];
    }
  });
});

var _isRgSp = require("./validations/common/is-rg-sp.validation");

Object.keys(_isRgSp).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _isRgSp[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isRgSp[key];
    }
  });
});

var _file = require("./validations/file/file.validation");

Object.keys(_file).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _file[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _file[key];
    }
  });
});

var _file2 = require("./validations/file/file.type");

Object.keys(_file2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _file2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _file2[key];
    }
  });
});

var _isAllowExtension = require("./validations/file/is-allow-extension.validation");

Object.keys(_isAllowExtension).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _isAllowExtension[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isAllowExtension[key];
    }
  });
});

var _maxSize = require("./validations/file/max-size.validation");

Object.keys(_maxSize).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _maxSize[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _maxSize[key];
    }
  });
});

var _minSize = require("./validations/file/min-size.validation");

Object.keys(_minSize).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _minSize[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _minSize[key];
    }
  });
});

var _number2 = require("./validations/number.validation");

Object.keys(_number2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _number2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _number2[key];
    }
  });
});

var _maxMin = require("./types/max-min.type");

Object.keys(_maxMin).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _maxMin[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _maxMin[key];
    }
  });
});

var _range = require("./types/range.type");

Object.keys(_range).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _range[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _range[key];
    }
  });
});
},{"./resize/resize":"../src/resize/resize.ts","./resize/resize.type":"../src/resize/resize.type.ts","./selected-list/selected-list":"../src/selected-list/selected-list.ts","./keyboard-shortcut/keyboard-shortcut":"../src/keyboard-shortcut/keyboard-shortcut.ts","./keyboard-shortcut/keyboard-shortcut.type":"../src/keyboard-shortcut/keyboard-shortcut.type.ts","./undo-redo-stack/undo-redo-stack":"../src/undo-redo-stack/undo-redo-stack.ts","./undo-redo-stack/undo-redo-stack.type":"../src/undo-redo-stack/undo-redo-stack.type.ts","./monitoring/monitoring":"../src/monitoring/monitoring.ts","./monitoring/monitoring.type":"../src/monitoring/monitoring.type.ts","./calc/calc":"../src/calc/calc.ts","./calc/math.calc":"../src/calc/math.calc.ts","./calc/calc.type":"../src/calc/calc.type.ts","./constant/input-mode.constant":"../src/constant/input-mode.constant.ts","./constant/input.constant":"../src/constant/input.constant.ts","./constant/mask.constant":"../src/constant/mask.constant.ts","./debounce/debounce":"../src/debounce/debounce.ts","./debounce/debounce.type":"../src/debounce/debounce.type.ts","./masked/masked":"../src/masked/masked.ts","./masked/masked.type":"../src/masked/masked.type.ts","./masked/imask/mask-imask":"../src/masked/imask/mask-imask.ts","./masked/vanilla-masker/vanilla-masker":"../src/masked/vanilla-masker/vanilla-masker.ts","./theme/theme":"../src/theme/theme.ts","./theme/theme.type":"../src/theme/theme.type.ts","./functions/file/base64-to-file.function":"../src/functions/file/base64-to-file.function.ts","./functions/file/file-to-base64.function":"../src/functions/file/file-to-base64.function.ts","./functions/file/get-size-image.function":"../src/functions/file/get-size-image.function.ts","./functions/object/get-node.function":"../src/functions/object/get-node.function.ts","./functions/object/extends.function":"../src/functions/object/extends.function.ts","./functions/object/sort-asc.function":"../src/functions/object/sort-asc.function.ts","./functions/object/sort-desc.function":"../src/functions/object/sort-desc.function.ts","./functions/sleep.function":"../src/functions/sleep.function.ts","./functions/handle-try.function":"../src/functions/handle-try.function.ts","./functions/theme-system.function":"../src/functions/theme-system.function.ts","./functions/parse-number.function":"../src/functions/parse-number.function.ts","./functions/remove-accents.function":"../src/functions/remove-accents.function.ts","./functions/stack-callback.function":"../src/functions/stack-callback.function.ts","./functions/pick-text-color-based-color":"../src/functions/pick-text-color-based-color.ts","./regex/char-special.regex":"../src/regex/char-special.regex.ts","./regex/cnpj.regex":"../src/regex/cnpj.regex.ts","./regex/cpf-cnpj.regex":"../src/regex/cpf-cnpj.regex.ts","./regex/cpf.regex":"../src/regex/cpf.regex.ts","./regex/email.regex":"../src/regex/email.regex.ts","./regex/number.regex":"../src/regex/number.regex.ts","./regex/phone-br.regex":"../src/regex/phone-br.regex.ts","./regex/time.regex":"../src/regex/time.regex.ts","./regex/upper-case.regex":"../src/regex/upper-case.regex.ts","./regex/url.regex":"../src/regex/url.regex.ts","./validations/common/common.validation":"../src/validations/common/common.validation.ts","./validations/common/common.type":"../src/validations/common/common.type.ts","./functions/contains.function":"../src/functions/contains.function.ts","./validations/common/is-cnpj.validation":"../src/validations/common/is-cnpj.validation.ts","./validations/common/is-cpf.validation":"../src/validations/common/is-cpf.validation.ts","./validations/common/is-empty.validation":"../src/validations/common/is-empty.validation.ts","./validations/common/is-password.validation":"../src/validations/common/is-password.validation.ts","./validations/common/is-rg-sp.validation":"../src/validations/common/is-rg-sp.validation.ts","./validations/file/file.validation":"../src/validations/file/file.validation.ts","./validations/file/file.type":"../src/validations/file/file.type.ts","./validations/file/is-allow-extension.validation":"../src/validations/file/is-allow-extension.validation.ts","./validations/file/max-size.validation":"../src/validations/file/max-size.validation.ts","./validations/file/min-size.validation":"../src/validations/file/min-size.validation.ts","./validations/number.validation":"../src/validations/number.validation.ts","./types/max-min.type":"../src/types/max-min.type.ts","./types/range.type":"../src/types/range.type.ts"}],"main.ts":[function(require,module,exports) {
"use strict";

var _utils = require("./../src/utils");

(0, _utils.keyboardShortcut)(["ctrl.z"], {
  trigger: "keydown",
  group: "ctrl",
  description: "UNDO"
}, function (event, key, target) {
  console.log(event, key, target);
});
},{"./../src/utils":"../src/utils.ts"}],"C:/Users/dougl/AppData/Roaming/nvm/v14.17.0/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57962" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/dougl/AppData/Roaming/nvm/v14.17.0/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.ts"], null)
//# sourceMappingURL=/main.c39d6dcf.js.map