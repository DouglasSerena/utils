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
})({"../node_modules/core-js/library/modules/_to-integer.js":[function(require,module,exports) {
// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

},{}],"../node_modules/core-js/library/modules/_defined.js":[function(require,module,exports) {
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

},{}],"../node_modules/core-js/library/modules/_string-at.js":[function(require,module,exports) {
var toInteger = require('./_to-integer');
var defined = require('./_defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

},{"./_to-integer":"../node_modules/core-js/library/modules/_to-integer.js","./_defined":"../node_modules/core-js/library/modules/_defined.js"}],"../node_modules/core-js/library/modules/_library.js":[function(require,module,exports) {
module.exports = true;

},{}],"../node_modules/core-js/library/modules/_global.js":[function(require,module,exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

},{}],"../node_modules/core-js/library/modules/_core.js":[function(require,module,exports) {
var core = module.exports = { version: '2.6.12' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

},{}],"../node_modules/core-js/library/modules/_a-function.js":[function(require,module,exports) {
module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

},{}],"../node_modules/core-js/library/modules/_ctx.js":[function(require,module,exports) {
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

},{"./_a-function":"../node_modules/core-js/library/modules/_a-function.js"}],"../node_modules/core-js/library/modules/_is-object.js":[function(require,module,exports) {
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

},{}],"../node_modules/core-js/library/modules/_an-object.js":[function(require,module,exports) {
var isObject = require('./_is-object');
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

},{"./_is-object":"../node_modules/core-js/library/modules/_is-object.js"}],"../node_modules/core-js/library/modules/_fails.js":[function(require,module,exports) {
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

},{}],"../node_modules/core-js/library/modules/_descriptors.js":[function(require,module,exports) {
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_fails":"../node_modules/core-js/library/modules/_fails.js"}],"../node_modules/core-js/library/modules/_dom-create.js":[function(require,module,exports) {
var isObject = require('./_is-object');
var document = require('./_global').document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

},{"./_is-object":"../node_modules/core-js/library/modules/_is-object.js","./_global":"../node_modules/core-js/library/modules/_global.js"}],"../node_modules/core-js/library/modules/_ie8-dom-define.js":[function(require,module,exports) {
module.exports = !require('./_descriptors') && !require('./_fails')(function () {
  return Object.defineProperty(require('./_dom-create')('div'), 'a', { get: function () { return 7; } }).a != 7;
});

},{"./_descriptors":"../node_modules/core-js/library/modules/_descriptors.js","./_fails":"../node_modules/core-js/library/modules/_fails.js","./_dom-create":"../node_modules/core-js/library/modules/_dom-create.js"}],"../node_modules/core-js/library/modules/_to-primitive.js":[function(require,module,exports) {
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

},{"./_is-object":"../node_modules/core-js/library/modules/_is-object.js"}],"../node_modules/core-js/library/modules/_object-dp.js":[function(require,module,exports) {
var anObject = require('./_an-object');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var toPrimitive = require('./_to-primitive');
var dP = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

},{"./_an-object":"../node_modules/core-js/library/modules/_an-object.js","./_ie8-dom-define":"../node_modules/core-js/library/modules/_ie8-dom-define.js","./_to-primitive":"../node_modules/core-js/library/modules/_to-primitive.js","./_descriptors":"../node_modules/core-js/library/modules/_descriptors.js"}],"../node_modules/core-js/library/modules/_property-desc.js":[function(require,module,exports) {
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

},{}],"../node_modules/core-js/library/modules/_hide.js":[function(require,module,exports) {
var dP = require('./_object-dp');
var createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

},{"./_object-dp":"../node_modules/core-js/library/modules/_object-dp.js","./_property-desc":"../node_modules/core-js/library/modules/_property-desc.js","./_descriptors":"../node_modules/core-js/library/modules/_descriptors.js"}],"../node_modules/core-js/library/modules/_has.js":[function(require,module,exports) {
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

},{}],"../node_modules/core-js/library/modules/_export.js":[function(require,module,exports) {

var global = require('./_global');
var core = require('./_core');
var ctx = require('./_ctx');
var hide = require('./_hide');
var has = require('./_has');
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;

},{"./_global":"../node_modules/core-js/library/modules/_global.js","./_core":"../node_modules/core-js/library/modules/_core.js","./_ctx":"../node_modules/core-js/library/modules/_ctx.js","./_hide":"../node_modules/core-js/library/modules/_hide.js","./_has":"../node_modules/core-js/library/modules/_has.js"}],"../node_modules/core-js/library/modules/_redefine.js":[function(require,module,exports) {
module.exports = require('./_hide');

},{"./_hide":"../node_modules/core-js/library/modules/_hide.js"}],"../node_modules/core-js/library/modules/_iterators.js":[function(require,module,exports) {
module.exports = {};

},{}],"../node_modules/core-js/library/modules/_cof.js":[function(require,module,exports) {
var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

},{}],"../node_modules/core-js/library/modules/_iobject.js":[function(require,module,exports) {
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

},{"./_cof":"../node_modules/core-js/library/modules/_cof.js"}],"../node_modules/core-js/library/modules/_to-iobject.js":[function(require,module,exports) {
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject');
var defined = require('./_defined');
module.exports = function (it) {
  return IObject(defined(it));
};

},{"./_iobject":"../node_modules/core-js/library/modules/_iobject.js","./_defined":"../node_modules/core-js/library/modules/_defined.js"}],"../node_modules/core-js/library/modules/_to-length.js":[function(require,module,exports) {
// 7.1.15 ToLength
var toInteger = require('./_to-integer');
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

},{"./_to-integer":"../node_modules/core-js/library/modules/_to-integer.js"}],"../node_modules/core-js/library/modules/_to-absolute-index.js":[function(require,module,exports) {
var toInteger = require('./_to-integer');
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

},{"./_to-integer":"../node_modules/core-js/library/modules/_to-integer.js"}],"../node_modules/core-js/library/modules/_array-includes.js":[function(require,module,exports) {
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./_to-iobject');
var toLength = require('./_to-length');
var toAbsoluteIndex = require('./_to-absolute-index');
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

},{"./_to-iobject":"../node_modules/core-js/library/modules/_to-iobject.js","./_to-length":"../node_modules/core-js/library/modules/_to-length.js","./_to-absolute-index":"../node_modules/core-js/library/modules/_to-absolute-index.js"}],"../node_modules/core-js/library/modules/_shared.js":[function(require,module,exports) {

var core = require('./_core');
var global = require('./_global');
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: require('./_library') ? 'pure' : 'global',
  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
});

},{"./_core":"../node_modules/core-js/library/modules/_core.js","./_global":"../node_modules/core-js/library/modules/_global.js","./_library":"../node_modules/core-js/library/modules/_library.js"}],"../node_modules/core-js/library/modules/_uid.js":[function(require,module,exports) {
var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

},{}],"../node_modules/core-js/library/modules/_shared-key.js":[function(require,module,exports) {
var shared = require('./_shared')('keys');
var uid = require('./_uid');
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};

},{"./_shared":"../node_modules/core-js/library/modules/_shared.js","./_uid":"../node_modules/core-js/library/modules/_uid.js"}],"../node_modules/core-js/library/modules/_object-keys-internal.js":[function(require,module,exports) {
var has = require('./_has');
var toIObject = require('./_to-iobject');
var arrayIndexOf = require('./_array-includes')(false);
var IE_PROTO = require('./_shared-key')('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

},{"./_has":"../node_modules/core-js/library/modules/_has.js","./_to-iobject":"../node_modules/core-js/library/modules/_to-iobject.js","./_array-includes":"../node_modules/core-js/library/modules/_array-includes.js","./_shared-key":"../node_modules/core-js/library/modules/_shared-key.js"}],"../node_modules/core-js/library/modules/_enum-bug-keys.js":[function(require,module,exports) {
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

},{}],"../node_modules/core-js/library/modules/_object-keys.js":[function(require,module,exports) {
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = require('./_object-keys-internal');
var enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

},{"./_object-keys-internal":"../node_modules/core-js/library/modules/_object-keys-internal.js","./_enum-bug-keys":"../node_modules/core-js/library/modules/_enum-bug-keys.js"}],"../node_modules/core-js/library/modules/_object-dps.js":[function(require,module,exports) {
var dP = require('./_object-dp');
var anObject = require('./_an-object');
var getKeys = require('./_object-keys');

module.exports = require('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

},{"./_object-dp":"../node_modules/core-js/library/modules/_object-dp.js","./_an-object":"../node_modules/core-js/library/modules/_an-object.js","./_object-keys":"../node_modules/core-js/library/modules/_object-keys.js","./_descriptors":"../node_modules/core-js/library/modules/_descriptors.js"}],"../node_modules/core-js/library/modules/_html.js":[function(require,module,exports) {
var document = require('./_global').document;
module.exports = document && document.documentElement;

},{"./_global":"../node_modules/core-js/library/modules/_global.js"}],"../node_modules/core-js/library/modules/_object-create.js":[function(require,module,exports) {
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = require('./_an-object');
var dPs = require('./_object-dps');
var enumBugKeys = require('./_enum-bug-keys');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = require('./_dom-create')('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  require('./_html').appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

},{"./_an-object":"../node_modules/core-js/library/modules/_an-object.js","./_object-dps":"../node_modules/core-js/library/modules/_object-dps.js","./_enum-bug-keys":"../node_modules/core-js/library/modules/_enum-bug-keys.js","./_shared-key":"../node_modules/core-js/library/modules/_shared-key.js","./_dom-create":"../node_modules/core-js/library/modules/_dom-create.js","./_html":"../node_modules/core-js/library/modules/_html.js"}],"../node_modules/core-js/library/modules/_wks.js":[function(require,module,exports) {
var store = require('./_shared')('wks');
var uid = require('./_uid');
var Symbol = require('./_global').Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

},{"./_shared":"../node_modules/core-js/library/modules/_shared.js","./_uid":"../node_modules/core-js/library/modules/_uid.js","./_global":"../node_modules/core-js/library/modules/_global.js"}],"../node_modules/core-js/library/modules/_set-to-string-tag.js":[function(require,module,exports) {
var def = require('./_object-dp').f;
var has = require('./_has');
var TAG = require('./_wks')('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

},{"./_object-dp":"../node_modules/core-js/library/modules/_object-dp.js","./_has":"../node_modules/core-js/library/modules/_has.js","./_wks":"../node_modules/core-js/library/modules/_wks.js"}],"../node_modules/core-js/library/modules/_iter-create.js":[function(require,module,exports) {
'use strict';
var create = require('./_object-create');
var descriptor = require('./_property-desc');
var setToStringTag = require('./_set-to-string-tag');
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./_hide')(IteratorPrototype, require('./_wks')('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};

},{"./_object-create":"../node_modules/core-js/library/modules/_object-create.js","./_property-desc":"../node_modules/core-js/library/modules/_property-desc.js","./_set-to-string-tag":"../node_modules/core-js/library/modules/_set-to-string-tag.js","./_hide":"../node_modules/core-js/library/modules/_hide.js","./_wks":"../node_modules/core-js/library/modules/_wks.js"}],"../node_modules/core-js/library/modules/_to-object.js":[function(require,module,exports) {
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function (it) {
  return Object(defined(it));
};

},{"./_defined":"../node_modules/core-js/library/modules/_defined.js"}],"../node_modules/core-js/library/modules/_object-gpo.js":[function(require,module,exports) {
// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = require('./_has');
var toObject = require('./_to-object');
var IE_PROTO = require('./_shared-key')('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

},{"./_has":"../node_modules/core-js/library/modules/_has.js","./_to-object":"../node_modules/core-js/library/modules/_to-object.js","./_shared-key":"../node_modules/core-js/library/modules/_shared-key.js"}],"../node_modules/core-js/library/modules/_iter-define.js":[function(require,module,exports) {
'use strict';
var LIBRARY = require('./_library');
var $export = require('./_export');
var redefine = require('./_redefine');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var $iterCreate = require('./_iter-create');
var setToStringTag = require('./_set-to-string-tag');
var getPrototypeOf = require('./_object-gpo');
var ITERATOR = require('./_wks')('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

},{"./_library":"../node_modules/core-js/library/modules/_library.js","./_export":"../node_modules/core-js/library/modules/_export.js","./_redefine":"../node_modules/core-js/library/modules/_redefine.js","./_hide":"../node_modules/core-js/library/modules/_hide.js","./_iterators":"../node_modules/core-js/library/modules/_iterators.js","./_iter-create":"../node_modules/core-js/library/modules/_iter-create.js","./_set-to-string-tag":"../node_modules/core-js/library/modules/_set-to-string-tag.js","./_object-gpo":"../node_modules/core-js/library/modules/_object-gpo.js","./_wks":"../node_modules/core-js/library/modules/_wks.js"}],"../node_modules/core-js/library/modules/es6.string.iterator.js":[function(require,module,exports) {
'use strict';
var $at = require('./_string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./_iter-define')(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});

},{"./_string-at":"../node_modules/core-js/library/modules/_string-at.js","./_iter-define":"../node_modules/core-js/library/modules/_iter-define.js"}],"../node_modules/core-js/library/modules/_iter-call.js":[function(require,module,exports) {
// call something on iterator step with safe closing on error
var anObject = require('./_an-object');
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};

},{"./_an-object":"../node_modules/core-js/library/modules/_an-object.js"}],"../node_modules/core-js/library/modules/_is-array-iter.js":[function(require,module,exports) {
// check on default Array iterator
var Iterators = require('./_iterators');
var ITERATOR = require('./_wks')('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

},{"./_iterators":"../node_modules/core-js/library/modules/_iterators.js","./_wks":"../node_modules/core-js/library/modules/_wks.js"}],"../node_modules/core-js/library/modules/_create-property.js":[function(require,module,exports) {
'use strict';
var $defineProperty = require('./_object-dp');
var createDesc = require('./_property-desc');

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

},{"./_object-dp":"../node_modules/core-js/library/modules/_object-dp.js","./_property-desc":"../node_modules/core-js/library/modules/_property-desc.js"}],"../node_modules/core-js/library/modules/_classof.js":[function(require,module,exports) {
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./_cof');
var TAG = require('./_wks')('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

},{"./_cof":"../node_modules/core-js/library/modules/_cof.js","./_wks":"../node_modules/core-js/library/modules/_wks.js"}],"../node_modules/core-js/library/modules/core.get-iterator-method.js":[function(require,module,exports) {
var classof = require('./_classof');
var ITERATOR = require('./_wks')('iterator');
var Iterators = require('./_iterators');
module.exports = require('./_core').getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

},{"./_classof":"../node_modules/core-js/library/modules/_classof.js","./_wks":"../node_modules/core-js/library/modules/_wks.js","./_iterators":"../node_modules/core-js/library/modules/_iterators.js","./_core":"../node_modules/core-js/library/modules/_core.js"}],"../node_modules/core-js/library/modules/_iter-detect.js":[function(require,module,exports) {
var ITERATOR = require('./_wks')('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};

},{"./_wks":"../node_modules/core-js/library/modules/_wks.js"}],"../node_modules/core-js/library/modules/es6.array.from.js":[function(require,module,exports) {
'use strict';
var ctx = require('./_ctx');
var $export = require('./_export');
var toObject = require('./_to-object');
var call = require('./_iter-call');
var isArrayIter = require('./_is-array-iter');
var toLength = require('./_to-length');
var createProperty = require('./_create-property');
var getIterFn = require('./core.get-iterator-method');

$export($export.S + $export.F * !require('./_iter-detect')(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});

},{"./_ctx":"../node_modules/core-js/library/modules/_ctx.js","./_export":"../node_modules/core-js/library/modules/_export.js","./_to-object":"../node_modules/core-js/library/modules/_to-object.js","./_iter-call":"../node_modules/core-js/library/modules/_iter-call.js","./_is-array-iter":"../node_modules/core-js/library/modules/_is-array-iter.js","./_to-length":"../node_modules/core-js/library/modules/_to-length.js","./_create-property":"../node_modules/core-js/library/modules/_create-property.js","./core.get-iterator-method":"../node_modules/core-js/library/modules/core.get-iterator-method.js","./_iter-detect":"../node_modules/core-js/library/modules/_iter-detect.js"}],"../node_modules/core-js/library/fn/array/from.js":[function(require,module,exports) {
require('../../modules/es6.string.iterator');
require('../../modules/es6.array.from');
module.exports = require('../../modules/_core').Array.from;

},{"../../modules/es6.string.iterator":"../node_modules/core-js/library/modules/es6.string.iterator.js","../../modules/es6.array.from":"../node_modules/core-js/library/modules/es6.array.from.js","../../modules/_core":"../node_modules/core-js/library/modules/_core.js"}],"../node_modules/@babel/runtime-corejs2/core-js/array/from.js":[function(require,module,exports) {
module.exports = require("core-js/library/fn/array/from");
},{"core-js/library/fn/array/from":"../node_modules/core-js/library/fn/array/from.js"}],"../node_modules/core-js/library/modules/_meta.js":[function(require,module,exports) {
var META = require('./_uid')('meta');
var isObject = require('./_is-object');
var has = require('./_has');
var setDesc = require('./_object-dp').f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !require('./_fails')(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};

},{"./_uid":"../node_modules/core-js/library/modules/_uid.js","./_is-object":"../node_modules/core-js/library/modules/_is-object.js","./_has":"../node_modules/core-js/library/modules/_has.js","./_object-dp":"../node_modules/core-js/library/modules/_object-dp.js","./_fails":"../node_modules/core-js/library/modules/_fails.js"}],"../node_modules/core-js/library/modules/_wks-ext.js":[function(require,module,exports) {
exports.f = require('./_wks');

},{"./_wks":"../node_modules/core-js/library/modules/_wks.js"}],"../node_modules/core-js/library/modules/_wks-define.js":[function(require,module,exports) {

var global = require('./_global');
var core = require('./_core');
var LIBRARY = require('./_library');
var wksExt = require('./_wks-ext');
var defineProperty = require('./_object-dp').f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};

},{"./_global":"../node_modules/core-js/library/modules/_global.js","./_core":"../node_modules/core-js/library/modules/_core.js","./_library":"../node_modules/core-js/library/modules/_library.js","./_wks-ext":"../node_modules/core-js/library/modules/_wks-ext.js","./_object-dp":"../node_modules/core-js/library/modules/_object-dp.js"}],"../node_modules/core-js/library/modules/_object-gops.js":[function(require,module,exports) {
exports.f = Object.getOwnPropertySymbols;

},{}],"../node_modules/core-js/library/modules/_object-pie.js":[function(require,module,exports) {
exports.f = {}.propertyIsEnumerable;

},{}],"../node_modules/core-js/library/modules/_enum-keys.js":[function(require,module,exports) {
// all enumerable object keys, includes symbols
var getKeys = require('./_object-keys');
var gOPS = require('./_object-gops');
var pIE = require('./_object-pie');
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};

},{"./_object-keys":"../node_modules/core-js/library/modules/_object-keys.js","./_object-gops":"../node_modules/core-js/library/modules/_object-gops.js","./_object-pie":"../node_modules/core-js/library/modules/_object-pie.js"}],"../node_modules/core-js/library/modules/_is-array.js":[function(require,module,exports) {
// 7.2.2 IsArray(argument)
var cof = require('./_cof');
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};

},{"./_cof":"../node_modules/core-js/library/modules/_cof.js"}],"../node_modules/core-js/library/modules/_object-gopn.js":[function(require,module,exports) {
// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = require('./_object-keys-internal');
var hiddenKeys = require('./_enum-bug-keys').concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};

},{"./_object-keys-internal":"../node_modules/core-js/library/modules/_object-keys-internal.js","./_enum-bug-keys":"../node_modules/core-js/library/modules/_enum-bug-keys.js"}],"../node_modules/core-js/library/modules/_object-gopn-ext.js":[function(require,module,exports) {
// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = require('./_to-iobject');
var gOPN = require('./_object-gopn').f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};

},{"./_to-iobject":"../node_modules/core-js/library/modules/_to-iobject.js","./_object-gopn":"../node_modules/core-js/library/modules/_object-gopn.js"}],"../node_modules/core-js/library/modules/_object-gopd.js":[function(require,module,exports) {
var pIE = require('./_object-pie');
var createDesc = require('./_property-desc');
var toIObject = require('./_to-iobject');
var toPrimitive = require('./_to-primitive');
var has = require('./_has');
var IE8_DOM_DEFINE = require('./_ie8-dom-define');
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = require('./_descriptors') ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};

},{"./_object-pie":"../node_modules/core-js/library/modules/_object-pie.js","./_property-desc":"../node_modules/core-js/library/modules/_property-desc.js","./_to-iobject":"../node_modules/core-js/library/modules/_to-iobject.js","./_to-primitive":"../node_modules/core-js/library/modules/_to-primitive.js","./_has":"../node_modules/core-js/library/modules/_has.js","./_ie8-dom-define":"../node_modules/core-js/library/modules/_ie8-dom-define.js","./_descriptors":"../node_modules/core-js/library/modules/_descriptors.js"}],"../node_modules/core-js/library/modules/es6.symbol.js":[function(require,module,exports) {

'use strict';
// ECMAScript 6 symbols shim
var global = require('./_global');
var has = require('./_has');
var DESCRIPTORS = require('./_descriptors');
var $export = require('./_export');
var redefine = require('./_redefine');
var META = require('./_meta').KEY;
var $fails = require('./_fails');
var shared = require('./_shared');
var setToStringTag = require('./_set-to-string-tag');
var uid = require('./_uid');
var wks = require('./_wks');
var wksExt = require('./_wks-ext');
var wksDefine = require('./_wks-define');
var enumKeys = require('./_enum-keys');
var isArray = require('./_is-array');
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var toObject = require('./_to-object');
var toIObject = require('./_to-iobject');
var toPrimitive = require('./_to-primitive');
var createDesc = require('./_property-desc');
var _create = require('./_object-create');
var gOPNExt = require('./_object-gopn-ext');
var $GOPD = require('./_object-gopd');
var $GOPS = require('./_object-gops');
var $DP = require('./_object-dp');
var $keys = require('./_object-keys');
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function' && !!$GOPS.f;
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  require('./_object-gopn').f = gOPNExt.f = $getOwnPropertyNames;
  require('./_object-pie').f = $propertyIsEnumerable;
  $GOPS.f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !require('./_library')) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
var FAILS_ON_PRIMITIVES = $fails(function () { $GOPS.f(1); });

$export($export.S + $export.F * FAILS_ON_PRIMITIVES, 'Object', {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return $GOPS.f(toObject(it));
  }
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || require('./_hide')($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

},{"./_global":"../node_modules/core-js/library/modules/_global.js","./_has":"../node_modules/core-js/library/modules/_has.js","./_descriptors":"../node_modules/core-js/library/modules/_descriptors.js","./_export":"../node_modules/core-js/library/modules/_export.js","./_redefine":"../node_modules/core-js/library/modules/_redefine.js","./_meta":"../node_modules/core-js/library/modules/_meta.js","./_fails":"../node_modules/core-js/library/modules/_fails.js","./_shared":"../node_modules/core-js/library/modules/_shared.js","./_set-to-string-tag":"../node_modules/core-js/library/modules/_set-to-string-tag.js","./_uid":"../node_modules/core-js/library/modules/_uid.js","./_wks":"../node_modules/core-js/library/modules/_wks.js","./_wks-ext":"../node_modules/core-js/library/modules/_wks-ext.js","./_wks-define":"../node_modules/core-js/library/modules/_wks-define.js","./_enum-keys":"../node_modules/core-js/library/modules/_enum-keys.js","./_is-array":"../node_modules/core-js/library/modules/_is-array.js","./_an-object":"../node_modules/core-js/library/modules/_an-object.js","./_is-object":"../node_modules/core-js/library/modules/_is-object.js","./_to-object":"../node_modules/core-js/library/modules/_to-object.js","./_to-iobject":"../node_modules/core-js/library/modules/_to-iobject.js","./_to-primitive":"../node_modules/core-js/library/modules/_to-primitive.js","./_property-desc":"../node_modules/core-js/library/modules/_property-desc.js","./_object-create":"../node_modules/core-js/library/modules/_object-create.js","./_object-gopn-ext":"../node_modules/core-js/library/modules/_object-gopn-ext.js","./_object-gopd":"../node_modules/core-js/library/modules/_object-gopd.js","./_object-gops":"../node_modules/core-js/library/modules/_object-gops.js","./_object-dp":"../node_modules/core-js/library/modules/_object-dp.js","./_object-keys":"../node_modules/core-js/library/modules/_object-keys.js","./_object-gopn":"../node_modules/core-js/library/modules/_object-gopn.js","./_object-pie":"../node_modules/core-js/library/modules/_object-pie.js","./_library":"../node_modules/core-js/library/modules/_library.js","./_hide":"../node_modules/core-js/library/modules/_hide.js"}],"../node_modules/core-js/library/modules/es6.object.to-string.js":[function(require,module,exports) {

},{}],"../node_modules/core-js/library/modules/es7.symbol.async-iterator.js":[function(require,module,exports) {
require('./_wks-define')('asyncIterator');

},{"./_wks-define":"../node_modules/core-js/library/modules/_wks-define.js"}],"../node_modules/core-js/library/modules/es7.symbol.observable.js":[function(require,module,exports) {
require('./_wks-define')('observable');

},{"./_wks-define":"../node_modules/core-js/library/modules/_wks-define.js"}],"../node_modules/core-js/library/fn/symbol/index.js":[function(require,module,exports) {
require('../../modules/es6.symbol');
require('../../modules/es6.object.to-string');
require('../../modules/es7.symbol.async-iterator');
require('../../modules/es7.symbol.observable');
module.exports = require('../../modules/_core').Symbol;

},{"../../modules/es6.symbol":"../node_modules/core-js/library/modules/es6.symbol.js","../../modules/es6.object.to-string":"../node_modules/core-js/library/modules/es6.object.to-string.js","../../modules/es7.symbol.async-iterator":"../node_modules/core-js/library/modules/es7.symbol.async-iterator.js","../../modules/es7.symbol.observable":"../node_modules/core-js/library/modules/es7.symbol.observable.js","../../modules/_core":"../node_modules/core-js/library/modules/_core.js"}],"../node_modules/@babel/runtime-corejs2/core-js/symbol.js":[function(require,module,exports) {
module.exports = require("core-js/library/fn/symbol");
},{"core-js/library/fn/symbol":"../node_modules/core-js/library/fn/symbol/index.js"}],"../node_modules/core-js/library/modules/_add-to-unscopables.js":[function(require,module,exports) {
module.exports = function () { /* empty */ };

},{}],"../node_modules/core-js/library/modules/_iter-step.js":[function(require,module,exports) {
module.exports = function (done, value) {
  return { value: value, done: !!done };
};

},{}],"../node_modules/core-js/library/modules/es6.array.iterator.js":[function(require,module,exports) {
'use strict';
var addToUnscopables = require('./_add-to-unscopables');
var step = require('./_iter-step');
var Iterators = require('./_iterators');
var toIObject = require('./_to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./_iter-define')(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

},{"./_add-to-unscopables":"../node_modules/core-js/library/modules/_add-to-unscopables.js","./_iter-step":"../node_modules/core-js/library/modules/_iter-step.js","./_iterators":"../node_modules/core-js/library/modules/_iterators.js","./_to-iobject":"../node_modules/core-js/library/modules/_to-iobject.js","./_iter-define":"../node_modules/core-js/library/modules/_iter-define.js"}],"../node_modules/core-js/library/modules/web.dom.iterable.js":[function(require,module,exports) {

require('./es6.array.iterator');
var global = require('./_global');
var hide = require('./_hide');
var Iterators = require('./_iterators');
var TO_STRING_TAG = require('./_wks')('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}

},{"./es6.array.iterator":"../node_modules/core-js/library/modules/es6.array.iterator.js","./_global":"../node_modules/core-js/library/modules/_global.js","./_hide":"../node_modules/core-js/library/modules/_hide.js","./_iterators":"../node_modules/core-js/library/modules/_iterators.js","./_wks":"../node_modules/core-js/library/modules/_wks.js"}],"../node_modules/core-js/library/fn/symbol/iterator.js":[function(require,module,exports) {
require('../../modules/es6.string.iterator');
require('../../modules/web.dom.iterable');
module.exports = require('../../modules/_wks-ext').f('iterator');

},{"../../modules/es6.string.iterator":"../node_modules/core-js/library/modules/es6.string.iterator.js","../../modules/web.dom.iterable":"../node_modules/core-js/library/modules/web.dom.iterable.js","../../modules/_wks-ext":"../node_modules/core-js/library/modules/_wks-ext.js"}],"../node_modules/@babel/runtime-corejs2/core-js/symbol/iterator.js":[function(require,module,exports) {
module.exports = require("core-js/library/fn/symbol/iterator");
},{"core-js/library/fn/symbol/iterator":"../node_modules/core-js/library/fn/symbol/iterator.js"}],"../node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;
module.exports["default"] = module.exports, module.exports.__esModule = true;
},{}],"../node_modules/core-js/library/modules/es6.object.define-property.js":[function(require,module,exports) {
var $export = require('./_export');
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !require('./_descriptors'), 'Object', { defineProperty: require('./_object-dp').f });

},{"./_export":"../node_modules/core-js/library/modules/_export.js","./_descriptors":"../node_modules/core-js/library/modules/_descriptors.js","./_object-dp":"../node_modules/core-js/library/modules/_object-dp.js"}],"../node_modules/core-js/library/fn/object/define-property.js":[function(require,module,exports) {
require('../../modules/es6.object.define-property');
var $Object = require('../../modules/_core').Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};

},{"../../modules/es6.object.define-property":"../node_modules/core-js/library/modules/es6.object.define-property.js","../../modules/_core":"../node_modules/core-js/library/modules/_core.js"}],"../node_modules/@babel/runtime-corejs2/core-js/object/define-property.js":[function(require,module,exports) {
module.exports = require("core-js/library/fn/object/define-property");
},{"core-js/library/fn/object/define-property":"../node_modules/core-js/library/fn/object/define-property.js"}],"../node_modules/@babel/runtime-corejs2/helpers/createClass.js":[function(require,module,exports) {
var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;

    _Object$defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;
module.exports["default"] = module.exports, module.exports.__esModule = true;
},{"@babel/runtime-corejs2/core-js/object/define-property":"../node_modules/@babel/runtime-corejs2/core-js/object/define-property.js"}],"../node_modules/@babel/runtime-corejs2/helpers/typeof.js":[function(require,module,exports) {
var _Symbol = require("@babel/runtime-corejs2/core-js/symbol");

var _Symbol$iterator = require("@babel/runtime-corejs2/core-js/symbol/iterator");

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof _Symbol === "function" && typeof _Symbol$iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };

    module.exports["default"] = module.exports, module.exports.__esModule = true;
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof _Symbol === "function" && obj.constructor === _Symbol && obj !== _Symbol.prototype ? "symbol" : typeof obj;
    };

    module.exports["default"] = module.exports, module.exports.__esModule = true;
  }

  return _typeof(obj);
}

module.exports = _typeof;
module.exports["default"] = module.exports, module.exports.__esModule = true;
},{"@babel/runtime-corejs2/core-js/symbol":"../node_modules/@babel/runtime-corejs2/core-js/symbol.js","@babel/runtime-corejs2/core-js/symbol/iterator":"../node_modules/@babel/runtime-corejs2/core-js/symbol/iterator.js"}],"../node_modules/core-js/library/modules/_object-sap.js":[function(require,module,exports) {
// most Object methods by ES6 should accept primitives
var $export = require('./_export');
var core = require('./_core');
var fails = require('./_fails');
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};

},{"./_export":"../node_modules/core-js/library/modules/_export.js","./_core":"../node_modules/core-js/library/modules/_core.js","./_fails":"../node_modules/core-js/library/modules/_fails.js"}],"../node_modules/core-js/library/modules/es6.object.keys.js":[function(require,module,exports) {
// 19.1.2.14 Object.keys(O)
var toObject = require('./_to-object');
var $keys = require('./_object-keys');

require('./_object-sap')('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});

},{"./_to-object":"../node_modules/core-js/library/modules/_to-object.js","./_object-keys":"../node_modules/core-js/library/modules/_object-keys.js","./_object-sap":"../node_modules/core-js/library/modules/_object-sap.js"}],"../node_modules/core-js/library/fn/object/keys.js":[function(require,module,exports) {
require('../../modules/es6.object.keys');
module.exports = require('../../modules/_core').Object.keys;

},{"../../modules/es6.object.keys":"../node_modules/core-js/library/modules/es6.object.keys.js","../../modules/_core":"../node_modules/core-js/library/modules/_core.js"}],"../node_modules/@babel/runtime-corejs2/core-js/object/keys.js":[function(require,module,exports) {
module.exports = require("core-js/library/fn/object/keys");
},{"core-js/library/fn/object/keys":"../node_modules/core-js/library/fn/object/keys.js"}],"../node_modules/core-js/library/modules/_string-ws.js":[function(require,module,exports) {
module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

},{}],"../node_modules/core-js/library/modules/_string-trim.js":[function(require,module,exports) {
var $export = require('./_export');
var defined = require('./_defined');
var fails = require('./_fails');
var spaces = require('./_string-ws');
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;

},{"./_export":"../node_modules/core-js/library/modules/_export.js","./_defined":"../node_modules/core-js/library/modules/_defined.js","./_fails":"../node_modules/core-js/library/modules/_fails.js","./_string-ws":"../node_modules/core-js/library/modules/_string-ws.js"}],"../node_modules/core-js/library/modules/_parse-int.js":[function(require,module,exports) {
var $parseInt = require('./_global').parseInt;
var $trim = require('./_string-trim').trim;
var ws = require('./_string-ws');
var hex = /^[-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;

},{"./_global":"../node_modules/core-js/library/modules/_global.js","./_string-trim":"../node_modules/core-js/library/modules/_string-trim.js","./_string-ws":"../node_modules/core-js/library/modules/_string-ws.js"}],"../node_modules/core-js/library/modules/es6.number.parse-int.js":[function(require,module,exports) {
var $export = require('./_export');
var $parseInt = require('./_parse-int');
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', { parseInt: $parseInt });

},{"./_export":"../node_modules/core-js/library/modules/_export.js","./_parse-int":"../node_modules/core-js/library/modules/_parse-int.js"}],"../node_modules/core-js/library/fn/number/parse-int.js":[function(require,module,exports) {
require('../../modules/es6.number.parse-int');
module.exports = require('../../modules/_core').Number.parseInt;

},{"../../modules/es6.number.parse-int":"../node_modules/core-js/library/modules/es6.number.parse-int.js","../../modules/_core":"../node_modules/core-js/library/modules/_core.js"}],"../node_modules/@babel/runtime-corejs2/core-js/number/parse-int.js":[function(require,module,exports) {
module.exports = require("core-js/library/fn/number/parse-int");
},{"core-js/library/fn/number/parse-int":"../node_modules/core-js/library/fn/number/parse-int.js"}],"../src/validations/common/is-cnpj.validation.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isCnpj = isCnpj;

var _parseInt = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/number/parse-int"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isCnpj(cnpj) {
  if (!cnpj) return false;
  cnpj = cnpj.replace(/\D/g, "");
  var cpfInvalid = ["00000000000000", "11111111111111", "22222222222222", "33333333333333"].concat(["44444444444444", "55555555555555", "66666666666666", "77777777777777"], ["88888888888888", "99999999999999"]);

  if (cpfInvalid.includes(cnpj) || cnpj.length !== 14) {
    return false;
  }

  var initPart = cnpj.substr(0, 12).split("");
  var firstDigit = (0, _parseInt.default)(cnpj.charAt(12));
  var firstDigitGenerated = calcDigit(initPart, 5);

  if (firstDigit !== firstDigitGenerated) {
    return false;
  }

  var secondaryPart = cnpj.substr(0, 13).split("");
  var secondaryDigit = (0, _parseInt.default)(cnpj.charAt(13));
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
    result += (0, _parseInt.default)(currentNumber) * multi--;

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
},{"@babel/runtime-corejs2/core-js/number/parse-int":"../node_modules/@babel/runtime-corejs2/core-js/number/parse-int.js"}],"../src/validations/common/is-cpf.validation.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isCpf = isCpf;

var _parseInt = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/number/parse-int"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isCpf(cpf) {
  if (!cpf) return false;
  cpf = cpf.replace(/\D/g, "");
  var cpfInvalid = ["00000000000", "11111111111", "22222222222", "33333333333"].concat(["44444444444", "55555555555", "66666666666", "77777777777"], ["88888888888", "99999999999"]);

  if (cpfInvalid.includes(cpf) || cpf.length !== 11) {
    return false;
  }

  var initPart = cpf.substr(0, 9).split("");
  var firstDigit = (0, _parseInt.default)(cpf.charAt(9));
  var firstDigitGenerated = calcDigit(initPart, 10);

  if (firstDigit !== firstDigitGenerated) {
    return false;
  }

  var secondaryPart = cpf.substr(0, 10).split("");
  var secondaryDigit = (0, _parseInt.default)(cpf.charAt(10));
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
    return result + (0, _parseInt.default)(currentNumber) * multi--;
  }, 0);
  generatedDigit = 11 - valueTotal % 11;

  if (generatedDigit > 9) {
    generatedDigit = 0;
  }

  return generatedDigit;
}
},{"@babel/runtime-corejs2/core-js/number/parse-int":"../node_modules/@babel/runtime-corejs2/core-js/number/parse-int.js"}],"../src/validations/common/is-empty.validation.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isEmpty = isEmpty;

var _keys = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/keys"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isEmpty(item) {
  var _Object$keys;

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

  return ((_Object$keys = (0, _keys.default)(item)) === null || _Object$keys === void 0 ? void 0 : _Object$keys.length) === 0;
}
},{"@babel/runtime-corejs2/core-js/object/keys":"../node_modules/@babel/runtime-corejs2/core-js/object/keys.js"}],"../src/validations/common/common.validation.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isCpfOrCnpj = exports.isUndefined = exports.isNull = exports.isArray = exports.isFalsy = exports.isTruthy = exports.isFill = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/typeof"));

var _isCnpj = require("./is-cnpj.validation");

var _isCpf = require("./is-cpf.validation");

var _isEmpty = require("./is-empty.validation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  return (0, _typeof2.default)(value) === "object" && value instanceof Array;
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
},{"@babel/runtime-corejs2/helpers/typeof":"../node_modules/@babel/runtime-corejs2/helpers/typeof.js","./is-cnpj.validation":"../src/validations/common/is-cnpj.validation.ts","./is-cpf.validation":"../src/validations/common/is-cpf.validation.ts","./is-empty.validation":"../src/validations/common/is-empty.validation.ts"}],"../src/functions/object/extends.function.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.$extends = $extends;
exports.merge = merge;

var _typeof2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/typeof"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/keys"));

var _common = require("../../validations/common/common.validation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function $extends(objectMerge) {
  for (var _len = arguments.length, objects = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    objects[_key - 1] = arguments[_key];
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
  return (0, _keys.default)(object).reduce(function (prev, key) {
    if ((0, _typeof2.default)(object[key]) === "object" && !(0, _common.isArray)(object[key]) && (0, _common.isUndefined)(object[key].name)) {
      prev[key] = merge(prev[key], object[key]);
    } else {
      prev[key] = object[key];
    }

    return prev;
  }, objectMerge || {});
}
},{"@babel/runtime-corejs2/helpers/typeof":"../node_modules/@babel/runtime-corejs2/helpers/typeof.js","@babel/runtime-corejs2/core-js/object/keys":"../node_modules/@babel/runtime-corejs2/core-js/object/keys.js","../../validations/common/common.validation":"../src/validations/common/common.validation.ts"}],"../src/resize/resize.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resize = resize;
exports.Resize = void 0;

var _from = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/array/from"));

var _symbol = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/symbol"));

var _iterator3 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/symbol/iterator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _extends = require("../functions/object/extends.function");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof _symbol.default !== "undefined" && o[_iterator3.default] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return (0, _from.default)(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function resize(element, config) {
  return new Resize(element, config);
}

var Resize = /*#__PURE__*/function () {
  function Resize(element, config) {
    (0, _classCallCheck2.default)(this, Resize);
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


  (0, _createClass2.default)(Resize, [{
    key: "_init",
    value: function _init() {
      this._createOverlay();

      this._control.style.pointerEvents = "all";
      this._control.style.position = "absolute";
      this._control.style.userSelect = "none";
      this._control.style.zIndex = "1000";
      this.update();
    }
    /**
     * @public
     * @description Atualiza os controladores, e aceita novos */

  }, {
    key: "update",
    value: function update() {
      var resize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      this._config.resize = this._config.resize.concat(resize).filter(function (value, _, list) {
        return list.includes(value);
      });
      this.destroy();

      var _iterator = _createForOfIteratorHelper(this._config.resize),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var type = _step.value;

          this._createControl(type);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
    /**
     * @public
     * @description Desabilita o redimensionamento */

  }, {
    key: "disabled",
    value: function disabled() {
      if (this.isDisabled) {
        this.isDisabled = false;
        this.update();
      } else {
        this.isDisabled = true;
        this.destroy();
      }
    }
    /**
     * @public
     * @description Destroi todos os controladores de redimensionamento */

  }, {
    key: "destroy",
    value: function destroy() {
      if (this._controls.length > 0) {
        var _iterator2 = _createForOfIteratorHelper(this._controls),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var _step2$value = _step2.value,
                control = _step2$value.control,
                mousemove = _step2$value.mousemove;
            control.remove();
            control.removeEventListener("mousemove", mousemove);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        this._overlay.remove();

        this._controls = [];
      }
    }
    /**
     * @private
     * @description Cria os controladores de redimensionamento */

  }, {
    key: "_createControl",
    value: function _createControl(type) {
      var _this = this;

      var control = this._control.cloneNode();

      control.classList.add("control-resize");
      var controlStyle = control.style;
      var controls = {
        TOP: function TOP() {
          controlStyle.inset = "".concat(_this._config.positionControl, "px 0 auto 0");
          controlStyle.cursor = "n-resize";
          controlStyle.height = "".concat(_this._config.size, "px");
        },
        TOP_RIGHT: function TOP_RIGHT() {
          controlStyle.inset = "".concat(_this._config.positionControl, "px ").concat(_this._config.positionControl, "px auto auto");
          controlStyle.cursor = "ne-resize";
          controlStyle.height = "".concat(_this._config.size, "px");
          controlStyle.width = "".concat(_this._config.size, "px");
        },
        RIGHT: function RIGHT() {
          controlStyle.inset = "0 ".concat(_this._config.positionControl, "px 0 auto");
          controlStyle.cursor = "e-resize";
          controlStyle.width = "".concat(_this._config.size, "px");
        },
        BOTTOM_RIGHT: function BOTTOM_RIGHT() {
          controlStyle.inset = "auto ".concat(_this._config.positionControl, "px ").concat(_this._config.positionControl, "px auto");
          controlStyle.cursor = "se-resize";
          controlStyle.height = "".concat(_this._config.size, "px");
          controlStyle.width = "".concat(_this._config.size, "px");
        },
        BOTTOM: function BOTTOM() {
          controlStyle.inset = "auto 0 ".concat(_this._config.positionControl, "px 0");
          controlStyle.cursor = "s-resize";
          controlStyle.height = "".concat(_this._config.size, "px");
        },
        BOTTOM_LEFT: function BOTTOM_LEFT() {
          controlStyle.inset = "auto auto ".concat(_this._config.positionControl, "px ").concat(_this._config.positionControl, "px");
          controlStyle.cursor = "sw-resize";
          controlStyle.height = "".concat(_this._config.size, "px");
          controlStyle.width = "".concat(_this._config.size, "px");
        },
        LEFT: function LEFT() {
          controlStyle.inset = "0 auto 0 ".concat(_this._config.positionControl, "px");
          controlStyle.cursor = "w-resize";
          controlStyle.width = "".concat(_this._config.size, "px");
        },
        TOP_LEFT: function TOP_LEFT() {
          controlStyle.inset = "".concat(_this._config.positionControl, "px auto auto  ").concat(_this._config.positionControl, "px");
          controlStyle.cursor = "nw-resize";
          controlStyle.height = "".concat(_this._config.size, "px");
          controlStyle.width = "".concat(_this._config.size, "px");
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
    }
    /**
     * @private
     * @description Cria um overlay para deixar em cima da tela para
     *  não haver cliques em local não desejado */

  }, {
    key: "_createOverlay",
    value: function _createOverlay() {
      var overlayStyle = this._overlay.style;
      overlayStyle.userSelect = "none";
      overlayStyle.position = "fixed";
      overlayStyle.inset = "0";
    }
    /**
     * @private
     * @description Seta a largura ou altura do elemento, e valida se esta no maximo ou no minimo */

  }, {
    key: "_setSize",
    value: function _setSize(type, value) {
      var _this$_config$type = this._config[type],
          max = _this$_config$type.max,
          min = _this$_config$type.min;

      if (value >= min && value <= max) {
        this.element.style[type] = "".concat(value, "px");
      } else {
        this.element.style[type] = "".concat(value < min ? min : max, "px");
      }
    }
    /**
     * @private
     * @description Calcula o novo tamanho do element */

  }, {
    key: "_rect",
    value: function _rect(operator, clientX, clientY) {
      var _this$element$getBoun = this.element.getBoundingClientRect(),
          left = _this$element$getBoun.left,
          right = _this$element$getBoun.right,
          top = _this$element$getBoun.top,
          bottom = _this$element$getBoun.bottom,
          width = _this$element$getBoun.width,
          height = _this$element$getBoun.height;
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
    }
  }]);
  return Resize;
}();

exports.Resize = Resize;
},{"@babel/runtime-corejs2/core-js/array/from":"../node_modules/@babel/runtime-corejs2/core-js/array/from.js","@babel/runtime-corejs2/core-js/symbol":"../node_modules/@babel/runtime-corejs2/core-js/symbol.js","@babel/runtime-corejs2/core-js/symbol/iterator":"../node_modules/@babel/runtime-corejs2/core-js/symbol/iterator.js","@babel/runtime-corejs2/helpers/classCallCheck":"../node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js","@babel/runtime-corejs2/helpers/createClass":"../node_modules/@babel/runtime-corejs2/helpers/createClass.js","../functions/object/extends.function":"../src/functions/object/extends.function.ts"}],"../src/resize/resize.type.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
},{}],"../node_modules/core-js/library/fn/object/get-own-property-symbols.js":[function(require,module,exports) {
require('../../modules/es6.symbol');
module.exports = require('../../modules/_core').Object.getOwnPropertySymbols;

},{"../../modules/es6.symbol":"../node_modules/core-js/library/modules/es6.symbol.js","../../modules/_core":"../node_modules/core-js/library/modules/_core.js"}],"../node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-symbols.js":[function(require,module,exports) {
module.exports = require("core-js/library/fn/object/get-own-property-symbols");
},{"core-js/library/fn/object/get-own-property-symbols":"../node_modules/core-js/library/fn/object/get-own-property-symbols.js"}],"../node_modules/core-js/library/modules/es6.object.get-own-property-descriptor.js":[function(require,module,exports) {
// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = require('./_to-iobject');
var $getOwnPropertyDescriptor = require('./_object-gopd').f;

require('./_object-sap')('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});

},{"./_to-iobject":"../node_modules/core-js/library/modules/_to-iobject.js","./_object-gopd":"../node_modules/core-js/library/modules/_object-gopd.js","./_object-sap":"../node_modules/core-js/library/modules/_object-sap.js"}],"../node_modules/core-js/library/fn/object/get-own-property-descriptor.js":[function(require,module,exports) {
require('../../modules/es6.object.get-own-property-descriptor');
var $Object = require('../../modules/_core').Object;
module.exports = function getOwnPropertyDescriptor(it, key) {
  return $Object.getOwnPropertyDescriptor(it, key);
};

},{"../../modules/es6.object.get-own-property-descriptor":"../node_modules/core-js/library/modules/es6.object.get-own-property-descriptor.js","../../modules/_core":"../node_modules/core-js/library/modules/_core.js"}],"../node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-descriptor.js":[function(require,module,exports) {
module.exports = require("core-js/library/fn/object/get-own-property-descriptor");
},{"core-js/library/fn/object/get-own-property-descriptor":"../node_modules/core-js/library/fn/object/get-own-property-descriptor.js"}],"../node_modules/core-js/library/modules/_own-keys.js":[function(require,module,exports) {
// all object keys, includes non-enumerable and symbols
var gOPN = require('./_object-gopn');
var gOPS = require('./_object-gops');
var anObject = require('./_an-object');
var Reflect = require('./_global').Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};

},{"./_object-gopn":"../node_modules/core-js/library/modules/_object-gopn.js","./_object-gops":"../node_modules/core-js/library/modules/_object-gops.js","./_an-object":"../node_modules/core-js/library/modules/_an-object.js","./_global":"../node_modules/core-js/library/modules/_global.js"}],"../node_modules/core-js/library/modules/es7.object.get-own-property-descriptors.js":[function(require,module,exports) {
// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export = require('./_export');
var ownKeys = require('./_own-keys');
var toIObject = require('./_to-iobject');
var gOPD = require('./_object-gopd');
var createProperty = require('./_create-property');

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIObject(object);
    var getDesc = gOPD.f;
    var keys = ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;
    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) createProperty(result, key, desc);
    }
    return result;
  }
});

},{"./_export":"../node_modules/core-js/library/modules/_export.js","./_own-keys":"../node_modules/core-js/library/modules/_own-keys.js","./_to-iobject":"../node_modules/core-js/library/modules/_to-iobject.js","./_object-gopd":"../node_modules/core-js/library/modules/_object-gopd.js","./_create-property":"../node_modules/core-js/library/modules/_create-property.js"}],"../node_modules/core-js/library/fn/object/get-own-property-descriptors.js":[function(require,module,exports) {
require('../../modules/es7.object.get-own-property-descriptors');
module.exports = require('../../modules/_core').Object.getOwnPropertyDescriptors;

},{"../../modules/es7.object.get-own-property-descriptors":"../node_modules/core-js/library/modules/es7.object.get-own-property-descriptors.js","../../modules/_core":"../node_modules/core-js/library/modules/_core.js"}],"../node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-descriptors.js":[function(require,module,exports) {
module.exports = require("core-js/library/fn/object/get-own-property-descriptors");
},{"core-js/library/fn/object/get-own-property-descriptors":"../node_modules/core-js/library/fn/object/get-own-property-descriptors.js"}],"../node_modules/@babel/runtime-corejs2/helpers/defineProperty.js":[function(require,module,exports) {
var _Object$defineProperty = require("@babel/runtime-corejs2/core-js/object/define-property");

function _defineProperty(obj, key, value) {
  if (key in obj) {
    _Object$defineProperty(obj, key, {
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

module.exports = _defineProperty;
module.exports["default"] = module.exports, module.exports.__esModule = true;
},{"@babel/runtime-corejs2/core-js/object/define-property":"../node_modules/@babel/runtime-corejs2/core-js/object/define-property.js"}],"../node_modules/core-js/library/modules/_redefine-all.js":[function(require,module,exports) {
var hide = require('./_hide');
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};

},{"./_hide":"../node_modules/core-js/library/modules/_hide.js"}],"../node_modules/core-js/library/modules/_an-instance.js":[function(require,module,exports) {
module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

},{}],"../node_modules/core-js/library/modules/_for-of.js":[function(require,module,exports) {
var ctx = require('./_ctx');
var call = require('./_iter-call');
var isArrayIter = require('./_is-array-iter');
var anObject = require('./_an-object');
var toLength = require('./_to-length');
var getIterFn = require('./core.get-iterator-method');
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;

},{"./_ctx":"../node_modules/core-js/library/modules/_ctx.js","./_iter-call":"../node_modules/core-js/library/modules/_iter-call.js","./_is-array-iter":"../node_modules/core-js/library/modules/_is-array-iter.js","./_an-object":"../node_modules/core-js/library/modules/_an-object.js","./_to-length":"../node_modules/core-js/library/modules/_to-length.js","./core.get-iterator-method":"../node_modules/core-js/library/modules/core.get-iterator-method.js"}],"../node_modules/core-js/library/modules/_set-species.js":[function(require,module,exports) {

'use strict';
var global = require('./_global');
var core = require('./_core');
var dP = require('./_object-dp');
var DESCRIPTORS = require('./_descriptors');
var SPECIES = require('./_wks')('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};

},{"./_global":"../node_modules/core-js/library/modules/_global.js","./_core":"../node_modules/core-js/library/modules/_core.js","./_object-dp":"../node_modules/core-js/library/modules/_object-dp.js","./_descriptors":"../node_modules/core-js/library/modules/_descriptors.js","./_wks":"../node_modules/core-js/library/modules/_wks.js"}],"../node_modules/core-js/library/modules/_validate-collection.js":[function(require,module,exports) {
var isObject = require('./_is-object');
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};

},{"./_is-object":"../node_modules/core-js/library/modules/_is-object.js"}],"../node_modules/core-js/library/modules/_collection-strong.js":[function(require,module,exports) {
'use strict';
var dP = require('./_object-dp').f;
var create = require('./_object-create');
var redefineAll = require('./_redefine-all');
var ctx = require('./_ctx');
var anInstance = require('./_an-instance');
var forOf = require('./_for-of');
var $iterDefine = require('./_iter-define');
var step = require('./_iter-step');
var setSpecies = require('./_set-species');
var DESCRIPTORS = require('./_descriptors');
var fastKey = require('./_meta').fastKey;
var validate = require('./_validate-collection');
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};

},{"./_object-dp":"../node_modules/core-js/library/modules/_object-dp.js","./_object-create":"../node_modules/core-js/library/modules/_object-create.js","./_redefine-all":"../node_modules/core-js/library/modules/_redefine-all.js","./_ctx":"../node_modules/core-js/library/modules/_ctx.js","./_an-instance":"../node_modules/core-js/library/modules/_an-instance.js","./_for-of":"../node_modules/core-js/library/modules/_for-of.js","./_iter-define":"../node_modules/core-js/library/modules/_iter-define.js","./_iter-step":"../node_modules/core-js/library/modules/_iter-step.js","./_set-species":"../node_modules/core-js/library/modules/_set-species.js","./_descriptors":"../node_modules/core-js/library/modules/_descriptors.js","./_meta":"../node_modules/core-js/library/modules/_meta.js","./_validate-collection":"../node_modules/core-js/library/modules/_validate-collection.js"}],"../node_modules/core-js/library/modules/_array-species-constructor.js":[function(require,module,exports) {
var isObject = require('./_is-object');
var isArray = require('./_is-array');
var SPECIES = require('./_wks')('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};

},{"./_is-object":"../node_modules/core-js/library/modules/_is-object.js","./_is-array":"../node_modules/core-js/library/modules/_is-array.js","./_wks":"../node_modules/core-js/library/modules/_wks.js"}],"../node_modules/core-js/library/modules/_array-species-create.js":[function(require,module,exports) {
// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = require('./_array-species-constructor');

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};

},{"./_array-species-constructor":"../node_modules/core-js/library/modules/_array-species-constructor.js"}],"../node_modules/core-js/library/modules/_array-methods.js":[function(require,module,exports) {
// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = require('./_ctx');
var IObject = require('./_iobject');
var toObject = require('./_to-object');
var toLength = require('./_to-length');
var asc = require('./_array-species-create');
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};

},{"./_ctx":"../node_modules/core-js/library/modules/_ctx.js","./_iobject":"../node_modules/core-js/library/modules/_iobject.js","./_to-object":"../node_modules/core-js/library/modules/_to-object.js","./_to-length":"../node_modules/core-js/library/modules/_to-length.js","./_array-species-create":"../node_modules/core-js/library/modules/_array-species-create.js"}],"../node_modules/core-js/library/modules/_collection.js":[function(require,module,exports) {

'use strict';
var global = require('./_global');
var $export = require('./_export');
var meta = require('./_meta');
var fails = require('./_fails');
var hide = require('./_hide');
var redefineAll = require('./_redefine-all');
var forOf = require('./_for-of');
var anInstance = require('./_an-instance');
var isObject = require('./_is-object');
var setToStringTag = require('./_set-to-string-tag');
var dP = require('./_object-dp').f;
var each = require('./_array-methods')(0);
var DESCRIPTORS = require('./_descriptors');

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  if (!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    C = wrapper(function (target, iterable) {
      anInstance(target, C, NAME, '_c');
      target._c = new Base();
      if (iterable != undefined) forOf(iterable, IS_MAP, target[ADDER], target);
    });
    each('add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(','), function (KEY) {
      var IS_ADDER = KEY == 'add' || KEY == 'set';
      if (KEY in proto && !(IS_WEAK && KEY == 'clear')) hide(C.prototype, KEY, function (a, b) {
        anInstance(this, C, KEY);
        if (!IS_ADDER && IS_WEAK && !isObject(a)) return KEY == 'get' ? undefined : false;
        var result = this._c[KEY](a === 0 ? 0 : a, b);
        return IS_ADDER ? this : result;
      });
    });
    IS_WEAK || dP(C.prototype, 'size', {
      get: function () {
        return this._c.size;
      }
    });
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F, O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};

},{"./_global":"../node_modules/core-js/library/modules/_global.js","./_export":"../node_modules/core-js/library/modules/_export.js","./_meta":"../node_modules/core-js/library/modules/_meta.js","./_fails":"../node_modules/core-js/library/modules/_fails.js","./_hide":"../node_modules/core-js/library/modules/_hide.js","./_redefine-all":"../node_modules/core-js/library/modules/_redefine-all.js","./_for-of":"../node_modules/core-js/library/modules/_for-of.js","./_an-instance":"../node_modules/core-js/library/modules/_an-instance.js","./_is-object":"../node_modules/core-js/library/modules/_is-object.js","./_set-to-string-tag":"../node_modules/core-js/library/modules/_set-to-string-tag.js","./_object-dp":"../node_modules/core-js/library/modules/_object-dp.js","./_array-methods":"../node_modules/core-js/library/modules/_array-methods.js","./_descriptors":"../node_modules/core-js/library/modules/_descriptors.js"}],"../node_modules/core-js/library/modules/es6.map.js":[function(require,module,exports) {
'use strict';
var strong = require('./_collection-strong');
var validate = require('./_validate-collection');
var MAP = 'Map';

// 23.1 Map Objects
module.exports = require('./_collection')(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);

},{"./_collection-strong":"../node_modules/core-js/library/modules/_collection-strong.js","./_validate-collection":"../node_modules/core-js/library/modules/_validate-collection.js","./_collection":"../node_modules/core-js/library/modules/_collection.js"}],"../node_modules/core-js/library/modules/_array-from-iterable.js":[function(require,module,exports) {
var forOf = require('./_for-of');

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};

},{"./_for-of":"../node_modules/core-js/library/modules/_for-of.js"}],"../node_modules/core-js/library/modules/_collection-to-json.js":[function(require,module,exports) {
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = require('./_classof');
var from = require('./_array-from-iterable');
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};

},{"./_classof":"../node_modules/core-js/library/modules/_classof.js","./_array-from-iterable":"../node_modules/core-js/library/modules/_array-from-iterable.js"}],"../node_modules/core-js/library/modules/es7.map.to-json.js":[function(require,module,exports) {
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = require('./_export');

$export($export.P + $export.R, 'Map', { toJSON: require('./_collection-to-json')('Map') });

},{"./_export":"../node_modules/core-js/library/modules/_export.js","./_collection-to-json":"../node_modules/core-js/library/modules/_collection-to-json.js"}],"../node_modules/core-js/library/modules/_set-collection-of.js":[function(require,module,exports) {
'use strict';
// https://tc39.github.io/proposal-setmap-offrom/
var $export = require('./_export');

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = new Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};

},{"./_export":"../node_modules/core-js/library/modules/_export.js"}],"../node_modules/core-js/library/modules/es7.map.of.js":[function(require,module,exports) {
// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
require('./_set-collection-of')('Map');

},{"./_set-collection-of":"../node_modules/core-js/library/modules/_set-collection-of.js"}],"../node_modules/core-js/library/modules/_set-collection-from.js":[function(require,module,exports) {
'use strict';
// https://tc39.github.io/proposal-setmap-offrom/
var $export = require('./_export');
var aFunction = require('./_a-function');
var ctx = require('./_ctx');
var forOf = require('./_for-of');

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};

},{"./_export":"../node_modules/core-js/library/modules/_export.js","./_a-function":"../node_modules/core-js/library/modules/_a-function.js","./_ctx":"../node_modules/core-js/library/modules/_ctx.js","./_for-of":"../node_modules/core-js/library/modules/_for-of.js"}],"../node_modules/core-js/library/modules/es7.map.from.js":[function(require,module,exports) {
// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
require('./_set-collection-from')('Map');

},{"./_set-collection-from":"../node_modules/core-js/library/modules/_set-collection-from.js"}],"../node_modules/core-js/library/fn/map.js":[function(require,module,exports) {
require('../modules/es6.object.to-string');
require('../modules/es6.string.iterator');
require('../modules/web.dom.iterable');
require('../modules/es6.map');
require('../modules/es7.map.to-json');
require('../modules/es7.map.of');
require('../modules/es7.map.from');
module.exports = require('../modules/_core').Map;

},{"../modules/es6.object.to-string":"../node_modules/core-js/library/modules/es6.object.to-string.js","../modules/es6.string.iterator":"../node_modules/core-js/library/modules/es6.string.iterator.js","../modules/web.dom.iterable":"../node_modules/core-js/library/modules/web.dom.iterable.js","../modules/es6.map":"../node_modules/core-js/library/modules/es6.map.js","../modules/es7.map.to-json":"../node_modules/core-js/library/modules/es7.map.to-json.js","../modules/es7.map.of":"../node_modules/core-js/library/modules/es7.map.of.js","../modules/es7.map.from":"../node_modules/core-js/library/modules/es7.map.from.js","../modules/_core":"../node_modules/core-js/library/modules/_core.js"}],"../node_modules/@babel/runtime-corejs2/core-js/map.js":[function(require,module,exports) {
module.exports = require("core-js/library/fn/map");
},{"core-js/library/fn/map":"../node_modules/core-js/library/fn/map.js"}],"../node_modules/core-js/library/modules/_object-assign.js":[function(require,module,exports) {
'use strict';
// 19.1.2.1 Object.assign(target, source, ...)
var DESCRIPTORS = require('./_descriptors');
var getKeys = require('./_object-keys');
var gOPS = require('./_object-gops');
var pIE = require('./_object-pie');
var toObject = require('./_to-object');
var IObject = require('./_iobject');
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || require('./_fails')(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || isEnum.call(S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;

},{"./_descriptors":"../node_modules/core-js/library/modules/_descriptors.js","./_object-keys":"../node_modules/core-js/library/modules/_object-keys.js","./_object-gops":"../node_modules/core-js/library/modules/_object-gops.js","./_object-pie":"../node_modules/core-js/library/modules/_object-pie.js","./_to-object":"../node_modules/core-js/library/modules/_to-object.js","./_iobject":"../node_modules/core-js/library/modules/_iobject.js","./_fails":"../node_modules/core-js/library/modules/_fails.js"}],"../node_modules/core-js/library/modules/es6.object.assign.js":[function(require,module,exports) {
// 19.1.3.1 Object.assign(target, source)
var $export = require('./_export');

$export($export.S + $export.F, 'Object', { assign: require('./_object-assign') });

},{"./_export":"../node_modules/core-js/library/modules/_export.js","./_object-assign":"../node_modules/core-js/library/modules/_object-assign.js"}],"../node_modules/core-js/library/fn/object/assign.js":[function(require,module,exports) {
require('../../modules/es6.object.assign');
module.exports = require('../../modules/_core').Object.assign;

},{"../../modules/es6.object.assign":"../node_modules/core-js/library/modules/es6.object.assign.js","../../modules/_core":"../node_modules/core-js/library/modules/_core.js"}],"../node_modules/@babel/runtime-corejs2/core-js/object/assign.js":[function(require,module,exports) {
module.exports = require("core-js/library/fn/object/assign");
},{"core-js/library/fn/object/assign":"../node_modules/core-js/library/fn/object/assign.js"}],"../src/functions/coerce-array.function.ts":[function(require,module,exports) {
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
},{}],"../src/global/global.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Global = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Global = /*#__PURE__*/function () {
  function Global() {
    (0, _classCallCheck2.default)(this, Global);
  }

  (0, _createClass2.default)(Global, null, [{
    key: "defined",
    value: function defined(key, value) {
      if (!window["__DOUGLAS_SERENA__"]) {
        window["__DOUGLAS_SERENA__"] = {};
      }

      window["__DOUGLAS_SERENA__"][key] = window["__DOUGLAS_SERENA__"][key] || value;
    }
  }, {
    key: "set",
    value: function set(key, value) {
      if (!window["__DOUGLAS_SERENA__"]) {
        window["__DOUGLAS_SERENA__"] = {};
      }

      window["__DOUGLAS_SERENA__"][key] = value;
    }
  }, {
    key: "get",
    value: function get(key) {
      return window["__DOUGLAS_SERENA__"][key];
    } // VARIABLES

  }, {
    key: "isDesktop",
    get: function get() {
      var _window, _window$matchMedia;

      return (_window = window) === null || _window === void 0 ? void 0 : (_window$matchMedia = _window.matchMedia) === null || _window$matchMedia === void 0 ? void 0 : _window$matchMedia.call(_window, "(min-width: 960px)").matches;
    }
  }, {
    key: "isTable",
    get: function get() {
      var _window2, _window2$matchMedia;

      return (_window2 = window) === null || _window2 === void 0 ? void 0 : (_window2$matchMedia = _window2.matchMedia) === null || _window2$matchMedia === void 0 ? void 0 : _window2$matchMedia.call(_window2, "(min-width: 720px)").matches;
    }
  }, {
    key: "isMobile",
    get: function get() {
      var _window3, _window3$matchMedia;

      return (_window3 = window) === null || _window3 === void 0 ? void 0 : (_window3$matchMedia = _window3.matchMedia) === null || _window3$matchMedia === void 0 ? void 0 : _window3$matchMedia.call(_window3, "(max-width: 540px)").matches;
    }
  }, {
    key: "isDark",
    get: function get() {
      var _window4, _window4$matchMedia;

      return (_window4 = window) === null || _window4 === void 0 ? void 0 : (_window4$matchMedia = _window4.matchMedia) === null || _window4$matchMedia === void 0 ? void 0 : _window4$matchMedia.call(_window4, "(prefers-color-scheme: dark)").matches;
    }
  }, {
    key: "isLight",
    get: function get() {
      var _window5, _window5$matchMedia;

      return (_window5 = window) === null || _window5 === void 0 ? void 0 : (_window5$matchMedia = _window5.matchMedia) === null || _window5$matchMedia === void 0 ? void 0 : _window5$matchMedia.call(_window5, "(prefers-color-scheme: light)").matches;
    }
  }]);
  return Global;
}();

exports.Global = Global;
},{"@babel/runtime-corejs2/helpers/classCallCheck":"../node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js","@babel/runtime-corejs2/helpers/createClass":"../node_modules/@babel/runtime-corejs2/helpers/createClass.js"}],"../src/keyboard-shortcut/keyboard.polyfill.js":[function(require,module,exports) {
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

var _symbol = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/symbol"));

var _iterator9 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/symbol/iterator"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/keys"));

var _getOwnPropertySymbols = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-symbols"));

var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-descriptor"));

var _getOwnPropertyDescriptors = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-descriptors"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _map = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/map"));

var _assign = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/assign"));

var _from = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/array/from"));

var _coerceArray = require("../functions/coerce-array.function");

var _hostPlatform = require("../functions/host-platform.function");

var _global = require("../global/global");

require("./keyboard.polyfill.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = (0, _keys.default)(object); if (_getOwnPropertySymbols.default) { var symbols = (0, _getOwnPropertySymbols.default)(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return (0, _getOwnPropertyDescriptor.default)(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (_getOwnPropertyDescriptors.default) { Object.defineProperties(target, (0, _getOwnPropertyDescriptors.default)(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, (0, _getOwnPropertyDescriptor.default)(source, key)); }); } } return target; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof _symbol.default !== "undefined" && o[_iterator9.default] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return (0, _from.default)(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

_global.Global.defined("SHORTCUT", new _map.default());

var configDefault = {
  allow: [],
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

function normalize(shortcuts) {
  var platform = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (0, _hostPlatform.hostPlatform)();

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

function keyboardShortcut(shortcuts, config) {
  return new KeyboardShortcut(shortcuts, config);
}

var KeyboardShortcut = /*#__PURE__*/function () {
  function KeyboardShortcut(shortcuts, config) {
    var _this = this;

    (0, _classCallCheck2.default)(this, KeyboardShortcut);
    this.shortcuts = [];
    this.config = {};
    shortcuts = (0, _coerceArray.coerceArray)(normalize(shortcuts));
    shortcuts = shortcuts.filter(function (shortcut) {
      if (_global.Global.get("SHORTCUT").has(shortcut)) {
        console.warn("[KEYBOARD] Shortcut key \"".concat(shortcut, "\" already registered, so it was built from the list"));
        return false;
      }

      return true;
    });

    if (shortcuts.length === 0) {
      throw new Error("[KEYBOARD] Unable to continue due to lack of valid keys to register");
    }

    this.config = (0, _assign.default)({}, configDefault, config);
    this.config.excluded = this.config.excluded.filter(function (excluded) {
      return !_this.config.allow.includes(excluded);
    });

    var _iterator = _createForOfIteratorHelper(shortcuts),
        _step;

    try {
      var _loop = function _loop() {
        var shortcut = _step.value;

        var handle = function handle(event) {
          if (_this._checkKeyboardShortcut(shortcut, event)) {
            var _iterator2 = _createForOfIteratorHelper(_this.config.excluded),
                _step2;

            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                var selector = _step2.value;

                if (document.activeElement.matches(selector)) {
                  return;
                }
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }

            if (_this.config.preventDefault) {
              event.preventDefault();
            }

            if (_this.config.stopPropagation) {
              event.stopPropagation();
            }

            config.listener(event, shortcut, event.target);
          }
        };

        var _iterator3 = _createForOfIteratorHelper((0, _coerceArray.coerceArray)(_this.config.targets)),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var target = _step3.value;
            target.addEventListener(_this.config.trigger, handle);
            _this.config.handle = handle;
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }

        _global.Global.get("SHORTCUT").set(shortcut, _objectSpread(_objectSpread({}, _this.config), {}, {
          keys: shortcut
        }));

        _this.shortcuts.push(_global.Global.get("SHORTCUT").get(shortcut));
      };

      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        _loop();
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
  /**
   * @public
   * @description Desvincular um atalho de teclado */


  (0, _createClass2.default)(KeyboardShortcut, [{
    key: "unbindShortcut",
    value: function unbindShortcut() {
      var _iterator4 = _createForOfIteratorHelper(this.shortcuts),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var shortcut = _step4.value;
          keyboardShortcut.unbindShortcut(shortcut.keys);
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
    }
    /**
     * @private
     * @description Checa se a tecla pressionada é valida */

  }, {
    key: "_checkKeyboardShortcut",
    value: function _checkKeyboardShortcut(shortcut, event) {
      var modifiers = {
        ctrl: event.ctrlKey,
        alt: event.altKey,
        meta: event.metaKey,
        shift: event.shiftKey
      };

      var _iterator5 = _createForOfIteratorHelper(shortcut.split(".")),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var key = _step5.value;
          var modifier = modifiers[key];

          if (modifier === undefined) {
            var code = event.key.replace(/Key/i, "").toLowerCase();

            if (key !== code) {
              return false;
            }
          } else {
            if (!modifier) {
              return false;
            }
          }
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }

      return true;
    }
  }]);
  return KeyboardShortcut;
}();

exports.KeyboardShortcut = KeyboardShortcut;
keyboardShortcut.shortcuts = [];
Object.defineProperty(keyboardShortcut, "shortcuts", {
  get: function get() {
    return (0, _from.default)(_global.Global.get("SHORTCUT").values()).map(function (shortcut) {
      return _objectSpread({}, shortcut);
    });
  }
});
keyboardShortcut.group = [];
Object.defineProperty(keyboardShortcut, "group", {
  get: function get() {
    var shortcuts = (0, _from.default)(_global.Global.get("SHORTCUT").values());
    var groups = [];

    var _iterator6 = _createForOfIteratorHelper(shortcuts),
        _step6;

    try {
      var _loop2 = function _loop2() {
        var shortcut = _step6.value;

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

      for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
        var _ret = _loop2();

        if (_ret === "continue") continue;
      }
    } catch (err) {
      _iterator6.e(err);
    } finally {
      _iterator6.f();
    }

    return groups;
  }
});

keyboardShortcut.unbindShortcut = function (shortcuts) {
  shortcuts = (0, _coerceArray.coerceArray)(normalize(shortcuts));

  var _iterator7 = _createForOfIteratorHelper(shortcuts),
      _step7;

  try {
    for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
      var shortcut = _step7.value;

      if (!_global.Global.get("SHORTCUT").has(shortcut)) {
        console.warn("[KEYBOARD] Key shortcut \"".concat(shortcut, "\" has not been registered"));
        continue;
      }

      var config = _global.Global.get("SHORTCUT").get(shortcut);

      var _iterator8 = _createForOfIteratorHelper((0, _coerceArray.coerceArray)(config.targets)),
          _step8;

      try {
        for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
          var target = _step8.value;
          target.removeEventListener(config.trigger, config.handle);
        }
      } catch (err) {
        _iterator8.e(err);
      } finally {
        _iterator8.f();
      }

      _global.Global.get("SHORTCUT").delete(shortcut);
    }
  } catch (err) {
    _iterator7.e(err);
  } finally {
    _iterator7.f();
  }
};

keyboardShortcut.updateShortcut = function (shortcutLast, shortcut) {
  if (!_global.Global.get("SHORTCUT").has(shortcutLast)) {
    throw new Error("[KEYBOARD] Key shortcut \"".concat(shortcutLast, "\" has not been registered"));
  }

  var config = _global.Global.get("SHORTCUT").get(shortcutLast);

  keyboardShortcut.unbindShortcut(shortcutLast);
  return new KeyboardShortcut(shortcut.keys || shortcutLast, config);
};
},{"@babel/runtime-corejs2/core-js/symbol":"../node_modules/@babel/runtime-corejs2/core-js/symbol.js","@babel/runtime-corejs2/core-js/symbol/iterator":"../node_modules/@babel/runtime-corejs2/core-js/symbol/iterator.js","@babel/runtime-corejs2/core-js/object/keys":"../node_modules/@babel/runtime-corejs2/core-js/object/keys.js","@babel/runtime-corejs2/core-js/object/get-own-property-symbols":"../node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-symbols.js","@babel/runtime-corejs2/core-js/object/get-own-property-descriptor":"../node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-descriptor.js","@babel/runtime-corejs2/core-js/object/get-own-property-descriptors":"../node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-descriptors.js","@babel/runtime-corejs2/helpers/defineProperty":"../node_modules/@babel/runtime-corejs2/helpers/defineProperty.js","@babel/runtime-corejs2/helpers/classCallCheck":"../node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js","@babel/runtime-corejs2/helpers/createClass":"../node_modules/@babel/runtime-corejs2/helpers/createClass.js","@babel/runtime-corejs2/core-js/map":"../node_modules/@babel/runtime-corejs2/core-js/map.js","@babel/runtime-corejs2/core-js/object/assign":"../node_modules/@babel/runtime-corejs2/core-js/object/assign.js","@babel/runtime-corejs2/core-js/array/from":"../node_modules/@babel/runtime-corejs2/core-js/array/from.js","../functions/coerce-array.function":"../src/functions/coerce-array.function.ts","../functions/host-platform.function":"../src/functions/host-platform.function.ts","../global/global":"../src/global/global.ts","./keyboard.polyfill.js":"../src/keyboard-shortcut/keyboard.polyfill.js"}],"../src/keyboard-shortcut/keyboard-shortcut.type.ts":[function(require,module,exports) {
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

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function undoRedoStack() {
  var maxAmount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;
  return new UndoRedoStack(maxAmount);
}

var UndoRedoStack = /*#__PURE__*/function () {
  function UndoRedoStack() {
    var maxAmount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;
    (0, _classCallCheck2.default)(this, UndoRedoStack);
    this._stack = [];
    this._current = -1;
    this._maxAmount = maxAmount;
  }
  /**
   * @public
   * @description Faz a verificação se esta fazia a pilha de refazer */


  (0, _createClass2.default)(UndoRedoStack, [{
    key: "isEmptyRedo",
    get: function get() {
      return this._current >= 0 && this._current === this.length - 1;
    }
    /**
     * @public
     * @description Faz a verificação se esta fazia a pilha de desfazer */

  }, {
    key: "isEmpty",
    get: function get() {
      return this._current === -1;
    }
  }, {
    key: "length",
    get: function get() {
      return this._stack.length;
    }
    /**
     * @public
     * @description Executa de desfazer e decrementa o contador */

  }, {
    key: "undo",
    value: function undo() {
      if (!this.isEmpty) {
        var item = this._stack[this._current];
        item.undo.call(this, item.data);
        this._current--;
        return true;
      }

      return false;
    }
    /**
     * @public
     * @description Executa de refazer e incrementa o contador caso exista um desfazer */

  }, {
    key: "redo",
    value: function redo() {
      var item = this._stack[this._current + 1];

      if (item) {
        item.redo.call(this, item.data);
        this._current++;
        return true;
      }

      return false;
    }
    /**
     * @public
     * @description Ira fazer a adição das funções de desfazer e refazer no topo da pilha
     * e verificar se ja atingiu o máximo, caso que sim ele ira remover o item da da base da pilha */

  }, {
    key: "push",
    value: function push() {
      var _this$_stack;

      if (this._maxAmount === this._current) {
        this._current--;

        this._stack.shift();
      }

      this._current++;

      this._stack.splice(this._current);

      return (_this$_stack = this._stack).push.apply(_this$_stack, arguments);
    }
    /**
     * @public
     * @description Esta função limpara a pilha inteira e ira fazer o reset o contador */

  }, {
    key: "clear",
    value: function clear() {
      return this._stack.splice(0);
    }
  }]);
  return UndoRedoStack;
}();

exports.UndoRedoStack = UndoRedoStack;

var isUndoRedoStack = function isUndoRedoStack(prop) {
  return prop instanceof UndoRedoStack;
};

exports.isUndoRedoStack = isUndoRedoStack;
undoRedoStack.isUndoRedoStack = isUndoRedoStack;
},{"@babel/runtime-corejs2/helpers/classCallCheck":"../node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js","@babel/runtime-corejs2/helpers/createClass":"../node_modules/@babel/runtime-corejs2/helpers/createClass.js"}],"../src/undo-redo-stack/undo-redo-stack.type.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
},{}],"../node_modules/rxjs/node_modules/tslib/tslib.es6.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__extends = __extends;
exports.__rest = __rest;
exports.__decorate = __decorate;
exports.__param = __param;
exports.__metadata = __metadata;
exports.__awaiter = __awaiter;
exports.__generator = __generator;
exports.__exportStar = __exportStar;
exports.__values = __values;
exports.__read = __read;
exports.__spread = __spread;
exports.__spreadArrays = __spreadArrays;
exports.__spreadArray = __spreadArray;
exports.__await = __await;
exports.__asyncGenerator = __asyncGenerator;
exports.__asyncDelegator = __asyncDelegator;
exports.__asyncValues = __asyncValues;
exports.__makeTemplateObject = __makeTemplateObject;
exports.__importStar = __importStar;
exports.__importDefault = __importDefault;
exports.__classPrivateFieldGet = __classPrivateFieldGet;
exports.__classPrivateFieldSet = __classPrivateFieldSet;
exports.__createBinding = exports.__assign = void 0;

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

/* global Reflect, Promise */
var extendStatics = function (d, b) {
  extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
  };

  return extendStatics(d, b);
};

function __extends(d, b) {
  if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);

  function __() {
    this.constructor = d;
  }

  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function () {
  exports.__assign = __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

exports.__assign = __assign;

function __rest(s, e) {
  var t = {};

  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
}

function __decorate(decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
}

function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
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
}

function __generator(thisArg, body) {
  var _ = {
    label: 0,
    sent: function () {
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

    while (_) try {
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

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
}

var __createBinding = Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function () {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
};

exports.__createBinding = __createBinding;

function __exportStar(m, o) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator,
      m = s && o[s],
      i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function () {
      if (o && i >= o.length) o = void 0;
      return {
        value: o && o[i++],
        done: !o
      };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
      r,
      ar = [],
      e;

  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }

  return ar;
}
/** @deprecated */


function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));

  return ar;
}
/** @deprecated */


function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;

  for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];

  return r;
}

function __spreadArray(to, from) {
  for (var i = 0, il = from.length, j = to.length; i < il; i++, j++) to[j] = from[i];

  return to;
}

function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []),
      i,
      q = [];
  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
    return this;
  }, i;

  function verb(n) {
    if (g[n]) i[n] = function (v) {
      return new Promise(function (a, b) {
        q.push([n, v, a, b]) > 1 || resume(n, v);
      });
    };
  }

  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }

  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }

  function fulfill(value) {
    resume("next", value);
  }

  function reject(value) {
    resume("throw", value);
  }

  function settle(f, v) {
    if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
  }
}

function __asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function (e) {
    throw e;
  }), verb("return"), i[Symbol.iterator] = function () {
    return this;
  }, i;

  function verb(n, f) {
    i[n] = o[n] ? function (v) {
      return (p = !p) ? {
        value: __await(o[n](v)),
        done: n === "return"
      } : f ? f(v) : v;
    } : f;
  }
}

function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator],
      i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
    return this;
  }, i);

  function verb(n) {
    i[n] = o[n] && function (v) {
      return new Promise(function (resolve, reject) {
        v = o[n](v), settle(resolve, reject, v.done, v.value);
      });
    };
  }

  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function (v) {
      resolve({
        value: v,
        done: d
      });
    }, reject);
  }
}

function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", {
      value: raw
    });
  } else {
    cooked.raw = raw;
  }

  return cooked;
}

;

var __setModuleDefault = Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
};

function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);

  __setModuleDefault(result, mod);

  return result;
}

function __importDefault(mod) {
  return mod && mod.__esModule ? mod : {
    default: mod
  };
}

function __classPrivateFieldGet(receiver, privateMap) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to get private field on non-instance");
  }

  return privateMap.get(receiver);
}

function __classPrivateFieldSet(receiver, privateMap, value) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to set private field on non-instance");
  }

  privateMap.set(receiver, value);
  return value;
}
},{}],"../node_modules/rxjs/dist/esm5/internal/util/isFunction.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isFunction = isFunction;

function isFunction(value) {
  return typeof value === 'function';
}
},{}],"../node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createErrorClass = createErrorClass;

function createErrorClass(createImpl) {
  var _super = function (instance) {
    Error.call(instance);
    instance.stack = new Error().stack;
  };

  var ctorFunc = createImpl(_super);
  ctorFunc.prototype = Object.create(Error.prototype);
  ctorFunc.prototype.constructor = ctorFunc;
  return ctorFunc;
}
},{}],"../node_modules/rxjs/dist/esm5/internal/util/UnsubscriptionError.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnsubscriptionError = void 0;

var _createErrorClass = require("./createErrorClass");

var UnsubscriptionError = (0, _createErrorClass.createErrorClass)(function (_super) {
  return function UnsubscriptionErrorImpl(errors) {
    _super(this);

    this.message = errors ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function (err, i) {
      return i + 1 + ") " + err.toString();
    }).join('\n  ') : '';
    this.name = 'UnsubscriptionError';
    this.errors = errors;
  };
});
exports.UnsubscriptionError = UnsubscriptionError;
},{"./createErrorClass":"../node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js"}],"../node_modules/rxjs/dist/esm5/internal/util/arrRemove.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.arrRemove = arrRemove;

function arrRemove(arr, item) {
  if (arr) {
    var index = arr.indexOf(item);
    0 <= index && arr.splice(index, 1);
  }
}
},{}],"../node_modules/rxjs/dist/esm5/internal/Subscription.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSubscription = isSubscription;
exports.EMPTY_SUBSCRIPTION = exports.Subscription = void 0;

var _tslib = require("tslib");

var _isFunction = require("./util/isFunction");

var _UnsubscriptionError = require("./util/UnsubscriptionError");

var _arrRemove = require("./util/arrRemove");

var Subscription = function () {
  function Subscription(initialTeardown) {
    this.initialTeardown = initialTeardown;
    this.closed = false;
    this._parentage = null;
    this._teardowns = null;
  }

  Subscription.prototype.unsubscribe = function () {
    var e_1, _a, e_2, _b;

    var errors;

    if (!this.closed) {
      this.closed = true;
      var _parentage = this._parentage;

      if (_parentage) {
        this._parentage = null;

        if (Array.isArray(_parentage)) {
          try {
            for (var _parentage_1 = (0, _tslib.__values)(_parentage), _parentage_1_1 = _parentage_1.next(); !_parentage_1_1.done; _parentage_1_1 = _parentage_1.next()) {
              var parent_1 = _parentage_1_1.value;
              parent_1.remove(this);
            }
          } catch (e_1_1) {
            e_1 = {
              error: e_1_1
            };
          } finally {
            try {
              if (_parentage_1_1 && !_parentage_1_1.done && (_a = _parentage_1.return)) _a.call(_parentage_1);
            } finally {
              if (e_1) throw e_1.error;
            }
          }
        } else {
          _parentage.remove(this);
        }
      }

      var initialTeardown = this.initialTeardown;

      if ((0, _isFunction.isFunction)(initialTeardown)) {
        try {
          initialTeardown();
        } catch (e) {
          errors = e instanceof _UnsubscriptionError.UnsubscriptionError ? e.errors : [e];
        }
      }

      var _teardowns = this._teardowns;

      if (_teardowns) {
        this._teardowns = null;

        try {
          for (var _teardowns_1 = (0, _tslib.__values)(_teardowns), _teardowns_1_1 = _teardowns_1.next(); !_teardowns_1_1.done; _teardowns_1_1 = _teardowns_1.next()) {
            var teardown_1 = _teardowns_1_1.value;

            try {
              execTeardown(teardown_1);
            } catch (err) {
              errors = errors !== null && errors !== void 0 ? errors : [];

              if (err instanceof _UnsubscriptionError.UnsubscriptionError) {
                errors = (0, _tslib.__spreadArray)((0, _tslib.__spreadArray)([], (0, _tslib.__read)(errors), false), (0, _tslib.__read)(err.errors), false);
              } else {
                errors.push(err);
              }
            }
          }
        } catch (e_2_1) {
          e_2 = {
            error: e_2_1
          };
        } finally {
          try {
            if (_teardowns_1_1 && !_teardowns_1_1.done && (_b = _teardowns_1.return)) _b.call(_teardowns_1);
          } finally {
            if (e_2) throw e_2.error;
          }
        }
      }

      if (errors) {
        throw new _UnsubscriptionError.UnsubscriptionError(errors);
      }
    }
  };

  Subscription.prototype.add = function (teardown) {
    var _a;

    if (teardown && teardown !== this) {
      if (this.closed) {
        execTeardown(teardown);
      } else {
        if (teardown instanceof Subscription) {
          if (teardown.closed || teardown._hasParent(this)) {
            return;
          }

          teardown._addParent(this);
        }

        (this._teardowns = (_a = this._teardowns) !== null && _a !== void 0 ? _a : []).push(teardown);
      }
    }
  };

  Subscription.prototype._hasParent = function (parent) {
    var _parentage = this._parentage;
    return _parentage === parent || Array.isArray(_parentage) && _parentage.includes(parent);
  };

  Subscription.prototype._addParent = function (parent) {
    var _parentage = this._parentage;
    this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
  };

  Subscription.prototype._removeParent = function (parent) {
    var _parentage = this._parentage;

    if (_parentage === parent) {
      this._parentage = null;
    } else if (Array.isArray(_parentage)) {
      (0, _arrRemove.arrRemove)(_parentage, parent);
    }
  };

  Subscription.prototype.remove = function (teardown) {
    var _teardowns = this._teardowns;
    _teardowns && (0, _arrRemove.arrRemove)(_teardowns, teardown);

    if (teardown instanceof Subscription) {
      teardown._removeParent(this);
    }
  };

  Subscription.EMPTY = function () {
    var empty = new Subscription();
    empty.closed = true;
    return empty;
  }();

  return Subscription;
}();

exports.Subscription = Subscription;
var EMPTY_SUBSCRIPTION = Subscription.EMPTY;
exports.EMPTY_SUBSCRIPTION = EMPTY_SUBSCRIPTION;

function isSubscription(value) {
  return value instanceof Subscription || value && 'closed' in value && (0, _isFunction.isFunction)(value.remove) && (0, _isFunction.isFunction)(value.add) && (0, _isFunction.isFunction)(value.unsubscribe);
}

function execTeardown(teardown) {
  if ((0, _isFunction.isFunction)(teardown)) {
    teardown();
  } else {
    teardown.unsubscribe();
  }
}
},{"tslib":"../node_modules/rxjs/node_modules/tslib/tslib.es6.js","./util/isFunction":"../node_modules/rxjs/dist/esm5/internal/util/isFunction.js","./util/UnsubscriptionError":"../node_modules/rxjs/dist/esm5/internal/util/UnsubscriptionError.js","./util/arrRemove":"../node_modules/rxjs/dist/esm5/internal/util/arrRemove.js"}],"../node_modules/rxjs/dist/esm5/internal/config.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = void 0;
var config = {
  onUnhandledError: null,
  onStoppedNotification: null,
  Promise: undefined,
  useDeprecatedSynchronousErrorHandling: false,
  useDeprecatedNextContext: false
};
exports.config = config;
},{}],"../node_modules/rxjs/dist/esm5/internal/scheduler/timeoutProvider.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timeoutProvider = void 0;

var _tslib = require("tslib");

var timeoutProvider = {
  setTimeout: function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    var delegate = timeoutProvider.delegate;
    return ((delegate === null || delegate === void 0 ? void 0 : delegate.setTimeout) || setTimeout).apply(void 0, (0, _tslib.__spreadArray)([], (0, _tslib.__read)(args), false));
  },
  clearTimeout: function (handle) {
    var delegate = timeoutProvider.delegate;
    return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearTimeout) || clearTimeout)(handle);
  },
  delegate: undefined
};
exports.timeoutProvider = timeoutProvider;
},{"tslib":"../node_modules/rxjs/node_modules/tslib/tslib.es6.js"}],"../node_modules/rxjs/dist/esm5/internal/util/reportUnhandledError.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reportUnhandledError = reportUnhandledError;

var _config = require("../config");

var _timeoutProvider = require("../scheduler/timeoutProvider");

function reportUnhandledError(err) {
  _timeoutProvider.timeoutProvider.setTimeout(function () {
    var onUnhandledError = _config.config.onUnhandledError;

    if (onUnhandledError) {
      onUnhandledError(err);
    } else {
      throw err;
    }
  });
}
},{"../config":"../node_modules/rxjs/dist/esm5/internal/config.js","../scheduler/timeoutProvider":"../node_modules/rxjs/dist/esm5/internal/scheduler/timeoutProvider.js"}],"../node_modules/rxjs/dist/esm5/internal/util/noop.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.noop = noop;

function noop() {}
},{}],"../node_modules/rxjs/dist/esm5/internal/NotificationFactories.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorNotification = errorNotification;
exports.nextNotification = nextNotification;
exports.createNotification = createNotification;
exports.COMPLETE_NOTIFICATION = void 0;

var COMPLETE_NOTIFICATION = function () {
  return createNotification('C', undefined, undefined);
}();

exports.COMPLETE_NOTIFICATION = COMPLETE_NOTIFICATION;

function errorNotification(error) {
  return createNotification('E', undefined, error);
}

function nextNotification(value) {
  return createNotification('N', value, undefined);
}

function createNotification(kind, value, error) {
  return {
    kind: kind,
    value: value,
    error: error
  };
}
},{}],"../node_modules/rxjs/dist/esm5/internal/util/errorContext.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorContext = errorContext;
exports.captureError = captureError;

var _config = require("../config");

var context = null;

function errorContext(cb) {
  if (_config.config.useDeprecatedSynchronousErrorHandling) {
    var isRoot = !context;

    if (isRoot) {
      context = {
        errorThrown: false,
        error: null
      };
    }

    cb();

    if (isRoot) {
      var _a = context,
          errorThrown = _a.errorThrown,
          error = _a.error;
      context = null;

      if (errorThrown) {
        throw error;
      }
    }
  } else {
    cb();
  }
}

function captureError(err) {
  if (_config.config.useDeprecatedSynchronousErrorHandling && context) {
    context.errorThrown = true;
    context.error = err;
  }
}
},{"../config":"../node_modules/rxjs/dist/esm5/internal/config.js"}],"../node_modules/rxjs/dist/esm5/internal/Subscriber.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EMPTY_OBSERVER = exports.SafeSubscriber = exports.Subscriber = void 0;

var _tslib = require("tslib");

var _isFunction = require("./util/isFunction");

var _Subscription = require("./Subscription");

var _config = require("./config");

var _reportUnhandledError = require("./util/reportUnhandledError");

var _noop = require("./util/noop");

var _NotificationFactories = require("./NotificationFactories");

var _timeoutProvider = require("./scheduler/timeoutProvider");

var _errorContext = require("./util/errorContext");

var Subscriber = function (_super) {
  (0, _tslib.__extends)(Subscriber, _super);

  function Subscriber(destination) {
    var _this = _super.call(this) || this;

    _this.isStopped = false;

    if (destination) {
      _this.destination = destination;

      if ((0, _Subscription.isSubscription)(destination)) {
        destination.add(_this);
      }
    } else {
      _this.destination = EMPTY_OBSERVER;
    }

    return _this;
  }

  Subscriber.create = function (next, error, complete) {
    return new SafeSubscriber(next, error, complete);
  };

  Subscriber.prototype.next = function (value) {
    if (this.isStopped) {
      handleStoppedNotification((0, _NotificationFactories.nextNotification)(value), this);
    } else {
      this._next(value);
    }
  };

  Subscriber.prototype.error = function (err) {
    if (this.isStopped) {
      handleStoppedNotification((0, _NotificationFactories.errorNotification)(err), this);
    } else {
      this.isStopped = true;

      this._error(err);
    }
  };

  Subscriber.prototype.complete = function () {
    if (this.isStopped) {
      handleStoppedNotification(_NotificationFactories.COMPLETE_NOTIFICATION, this);
    } else {
      this.isStopped = true;

      this._complete();
    }
  };

  Subscriber.prototype.unsubscribe = function () {
    if (!this.closed) {
      this.isStopped = true;

      _super.prototype.unsubscribe.call(this);

      this.destination = null;
    }
  };

  Subscriber.prototype._next = function (value) {
    this.destination.next(value);
  };

  Subscriber.prototype._error = function (err) {
    try {
      this.destination.error(err);
    } finally {
      this.unsubscribe();
    }
  };

  Subscriber.prototype._complete = function () {
    try {
      this.destination.complete();
    } finally {
      this.unsubscribe();
    }
  };

  return Subscriber;
}(_Subscription.Subscription);

exports.Subscriber = Subscriber;

var SafeSubscriber = function (_super) {
  (0, _tslib.__extends)(SafeSubscriber, _super);

  function SafeSubscriber(observerOrNext, error, complete) {
    var _this = _super.call(this) || this;

    var next;

    if ((0, _isFunction.isFunction)(observerOrNext)) {
      next = observerOrNext;
    } else if (observerOrNext) {
      next = observerOrNext.next, error = observerOrNext.error, complete = observerOrNext.complete;
      var context_1;

      if (_this && _config.config.useDeprecatedNextContext) {
        context_1 = Object.create(observerOrNext);

        context_1.unsubscribe = function () {
          return _this.unsubscribe();
        };
      } else {
        context_1 = observerOrNext;
      }

      next = next === null || next === void 0 ? void 0 : next.bind(context_1);
      error = error === null || error === void 0 ? void 0 : error.bind(context_1);
      complete = complete === null || complete === void 0 ? void 0 : complete.bind(context_1);
    }

    _this.destination = {
      next: next ? wrapForErrorHandling(next, _this) : _noop.noop,
      error: wrapForErrorHandling(error !== null && error !== void 0 ? error : defaultErrorHandler, _this),
      complete: complete ? wrapForErrorHandling(complete, _this) : _noop.noop
    };
    return _this;
  }

  return SafeSubscriber;
}(Subscriber);

exports.SafeSubscriber = SafeSubscriber;

function wrapForErrorHandling(handler, instance) {
  return function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    try {
      handler.apply(void 0, (0, _tslib.__spreadArray)([], (0, _tslib.__read)(args), false));
    } catch (err) {
      if (_config.config.useDeprecatedSynchronousErrorHandling) {
        (0, _errorContext.captureError)(err);
      } else {
        (0, _reportUnhandledError.reportUnhandledError)(err);
      }
    }
  };
}

function defaultErrorHandler(err) {
  throw err;
}

function handleStoppedNotification(notification, subscriber) {
  var onStoppedNotification = _config.config.onStoppedNotification;
  onStoppedNotification && _timeoutProvider.timeoutProvider.setTimeout(function () {
    return onStoppedNotification(notification, subscriber);
  });
}

var EMPTY_OBSERVER = {
  closed: true,
  next: _noop.noop,
  error: defaultErrorHandler,
  complete: _noop.noop
};
exports.EMPTY_OBSERVER = EMPTY_OBSERVER;
},{"tslib":"../node_modules/rxjs/node_modules/tslib/tslib.es6.js","./util/isFunction":"../node_modules/rxjs/dist/esm5/internal/util/isFunction.js","./Subscription":"../node_modules/rxjs/dist/esm5/internal/Subscription.js","./config":"../node_modules/rxjs/dist/esm5/internal/config.js","./util/reportUnhandledError":"../node_modules/rxjs/dist/esm5/internal/util/reportUnhandledError.js","./util/noop":"../node_modules/rxjs/dist/esm5/internal/util/noop.js","./NotificationFactories":"../node_modules/rxjs/dist/esm5/internal/NotificationFactories.js","./scheduler/timeoutProvider":"../node_modules/rxjs/dist/esm5/internal/scheduler/timeoutProvider.js","./util/errorContext":"../node_modules/rxjs/dist/esm5/internal/util/errorContext.js"}],"../node_modules/rxjs/dist/esm5/internal/symbol/observable.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.observable = void 0;

var observable = function () {
  return typeof Symbol === 'function' && Symbol.observable || '@@observable';
}();

exports.observable = observable;
},{}],"../node_modules/rxjs/dist/esm5/internal/util/identity.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.identity = identity;

function identity(x) {
  return x;
}
},{}],"../node_modules/rxjs/dist/esm5/internal/util/pipe.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pipe = pipe;
exports.pipeFromArray = pipeFromArray;

var _identity = require("./identity");

function pipe() {
  var fns = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    fns[_i] = arguments[_i];
  }

  return pipeFromArray(fns);
}

function pipeFromArray(fns) {
  if (fns.length === 0) {
    return _identity.identity;
  }

  if (fns.length === 1) {
    return fns[0];
  }

  return function piped(input) {
    return fns.reduce(function (prev, fn) {
      return fn(prev);
    }, input);
  };
}
},{"./identity":"../node_modules/rxjs/dist/esm5/internal/util/identity.js"}],"../node_modules/rxjs/dist/esm5/internal/Observable.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Observable = void 0;

var _Subscriber = require("./Subscriber");

var _Subscription = require("./Subscription");

var _observable = require("./symbol/observable");

var _pipe = require("./util/pipe");

var _config = require("./config");

var _isFunction = require("./util/isFunction");

var _errorContext = require("./util/errorContext");

var Observable = function () {
  function Observable(subscribe) {
    if (subscribe) {
      this._subscribe = subscribe;
    }
  }

  Observable.prototype.lift = function (operator) {
    var observable = new Observable();
    observable.source = this;
    observable.operator = operator;
    return observable;
  };

  Observable.prototype.subscribe = function (observerOrNext, error, complete) {
    var _this = this;

    var subscriber = isSubscriber(observerOrNext) ? observerOrNext : new _Subscriber.SafeSubscriber(observerOrNext, error, complete);
    (0, _errorContext.errorContext)(function () {
      var _a = _this,
          operator = _a.operator,
          source = _a.source;
      subscriber.add(operator ? operator.call(subscriber, source) : source ? _this._subscribe(subscriber) : _this._trySubscribe(subscriber));
    });
    return subscriber;
  };

  Observable.prototype._trySubscribe = function (sink) {
    try {
      return this._subscribe(sink);
    } catch (err) {
      sink.error(err);
    }
  };

  Observable.prototype.forEach = function (next, promiseCtor) {
    var _this = this;

    promiseCtor = getPromiseCtor(promiseCtor);
    return new promiseCtor(function (resolve, reject) {
      var subscription;
      subscription = _this.subscribe(function (value) {
        try {
          next(value);
        } catch (err) {
          reject(err);
          subscription === null || subscription === void 0 ? void 0 : subscription.unsubscribe();
        }
      }, reject, resolve);
    });
  };

  Observable.prototype._subscribe = function (subscriber) {
    var _a;

    return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
  };

  Observable.prototype[_observable.observable] = function () {
    return this;
  };

  Observable.prototype.pipe = function () {
    var operations = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      operations[_i] = arguments[_i];
    }

    return (0, _pipe.pipeFromArray)(operations)(this);
  };

  Observable.prototype.toPromise = function (promiseCtor) {
    var _this = this;

    promiseCtor = getPromiseCtor(promiseCtor);
    return new promiseCtor(function (resolve, reject) {
      var value;

      _this.subscribe(function (x) {
        return value = x;
      }, function (err) {
        return reject(err);
      }, function () {
        return resolve(value);
      });
    });
  };

  Observable.create = function (subscribe) {
    return new Observable(subscribe);
  };

  return Observable;
}();

exports.Observable = Observable;

function getPromiseCtor(promiseCtor) {
  var _a;

  return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : _config.config.Promise) !== null && _a !== void 0 ? _a : Promise;
}

function isObserver(value) {
  return value && (0, _isFunction.isFunction)(value.next) && (0, _isFunction.isFunction)(value.error) && (0, _isFunction.isFunction)(value.complete);
}

function isSubscriber(value) {
  return value && value instanceof _Subscriber.Subscriber || isObserver(value) && (0, _Subscription.isSubscription)(value);
}
},{"./Subscriber":"../node_modules/rxjs/dist/esm5/internal/Subscriber.js","./Subscription":"../node_modules/rxjs/dist/esm5/internal/Subscription.js","./symbol/observable":"../node_modules/rxjs/dist/esm5/internal/symbol/observable.js","./util/pipe":"../node_modules/rxjs/dist/esm5/internal/util/pipe.js","./config":"../node_modules/rxjs/dist/esm5/internal/config.js","./util/isFunction":"../node_modules/rxjs/dist/esm5/internal/util/isFunction.js","./util/errorContext":"../node_modules/rxjs/dist/esm5/internal/util/errorContext.js"}],"../node_modules/rxjs/dist/esm5/internal/util/lift.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasLift = hasLift;
exports.operate = operate;

var _isFunction = require("./isFunction");

function hasLift(source) {
  return (0, _isFunction.isFunction)(source === null || source === void 0 ? void 0 : source.lift);
}

function operate(init) {
  return function (source) {
    if (hasLift(source)) {
      return source.lift(function (liftedSource) {
        try {
          return init(liftedSource, this);
        } catch (err) {
          this.error(err);
        }
      });
    }

    throw new TypeError('Unable to lift unknown Observable type');
  };
}
},{"./isFunction":"../node_modules/rxjs/dist/esm5/internal/util/isFunction.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OperatorSubscriber = void 0;

var _tslib = require("tslib");

var _Subscriber = require("../Subscriber");

var OperatorSubscriber = function (_super) {
  (0, _tslib.__extends)(OperatorSubscriber, _super);

  function OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize) {
    var _this = _super.call(this, destination) || this;

    _this.onFinalize = onFinalize;
    _this._next = onNext ? function (value) {
      try {
        onNext(value);
      } catch (err) {
        destination.error(err);
      }
    } : _super.prototype._next;
    _this._error = onError ? function (err) {
      try {
        onError(err);
      } catch (err) {
        destination.error(err);
      } finally {
        this.unsubscribe();
      }
    } : _super.prototype._error;
    _this._complete = onComplete ? function () {
      try {
        onComplete();
      } catch (err) {
        destination.error(err);
      } finally {
        this.unsubscribe();
      }
    } : _super.prototype._complete;
    return _this;
  }

  OperatorSubscriber.prototype.unsubscribe = function () {
    var _a;

    var closed = this.closed;

    _super.prototype.unsubscribe.call(this);

    !closed && ((_a = this.onFinalize) === null || _a === void 0 ? void 0 : _a.call(this));
  };

  return OperatorSubscriber;
}(_Subscriber.Subscriber);

exports.OperatorSubscriber = OperatorSubscriber;
},{"tslib":"../node_modules/rxjs/node_modules/tslib/tslib.es6.js","../Subscriber":"../node_modules/rxjs/dist/esm5/internal/Subscriber.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/refCount.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.refCount = refCount;

var _lift = require("../util/lift");

var _OperatorSubscriber = require("./OperatorSubscriber");

function refCount() {
  return (0, _lift.operate)(function (source, subscriber) {
    var connection = null;
    source._refCount++;
    var refCounter = new _OperatorSubscriber.OperatorSubscriber(subscriber, undefined, undefined, undefined, function () {
      if (!source || source._refCount <= 0 || 0 < --source._refCount) {
        connection = null;
        return;
      }

      var sharedConnection = source._connection;
      var conn = connection;
      connection = null;

      if (sharedConnection && (!conn || sharedConnection === conn)) {
        sharedConnection.unsubscribe();
      }

      subscriber.unsubscribe();
    });
    source.subscribe(refCounter);

    if (!refCounter.closed) {
      connection = source.connect();
    }
  });
}
},{"../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js","./OperatorSubscriber":"../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js"}],"../node_modules/rxjs/dist/esm5/internal/observable/ConnectableObservable.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConnectableObservable = void 0;

var _tslib = require("tslib");

var _Observable = require("../Observable");

var _Subscription = require("../Subscription");

var _refCount = require("../operators/refCount");

var _OperatorSubscriber = require("../operators/OperatorSubscriber");

var _lift = require("../util/lift");

var ConnectableObservable = function (_super) {
  (0, _tslib.__extends)(ConnectableObservable, _super);

  function ConnectableObservable(source, subjectFactory) {
    var _this = _super.call(this) || this;

    _this.source = source;
    _this.subjectFactory = subjectFactory;
    _this._subject = null;
    _this._refCount = 0;
    _this._connection = null;

    if ((0, _lift.hasLift)(source)) {
      _this.lift = source.lift;
    }

    return _this;
  }

  ConnectableObservable.prototype._subscribe = function (subscriber) {
    return this.getSubject().subscribe(subscriber);
  };

  ConnectableObservable.prototype.getSubject = function () {
    var subject = this._subject;

    if (!subject || subject.isStopped) {
      this._subject = this.subjectFactory();
    }

    return this._subject;
  };

  ConnectableObservable.prototype._teardown = function () {
    this._refCount = 0;
    var _connection = this._connection;
    this._subject = this._connection = null;
    _connection === null || _connection === void 0 ? void 0 : _connection.unsubscribe();
  };

  ConnectableObservable.prototype.connect = function () {
    var _this = this;

    var connection = this._connection;

    if (!connection) {
      connection = this._connection = new _Subscription.Subscription();
      var subject_1 = this.getSubject();
      connection.add(this.source.subscribe(new _OperatorSubscriber.OperatorSubscriber(subject_1, undefined, function () {
        _this._teardown();

        subject_1.complete();
      }, function (err) {
        _this._teardown();

        subject_1.error(err);
      }, function () {
        return _this._teardown();
      })));

      if (connection.closed) {
        this._connection = null;
        connection = _Subscription.Subscription.EMPTY;
      }
    }

    return connection;
  };

  ConnectableObservable.prototype.refCount = function () {
    return (0, _refCount.refCount)()(this);
  };

  return ConnectableObservable;
}(_Observable.Observable);

exports.ConnectableObservable = ConnectableObservable;
},{"tslib":"../node_modules/rxjs/node_modules/tslib/tslib.es6.js","../Observable":"../node_modules/rxjs/dist/esm5/internal/Observable.js","../Subscription":"../node_modules/rxjs/dist/esm5/internal/Subscription.js","../operators/refCount":"../node_modules/rxjs/dist/esm5/internal/operators/refCount.js","../operators/OperatorSubscriber":"../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js","../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js"}],"../node_modules/rxjs/dist/esm5/internal/scheduler/performanceTimestampProvider.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.performanceTimestampProvider = void 0;
var performanceTimestampProvider = {
  now: function () {
    return (performanceTimestampProvider.delegate || performance).now();
  },
  delegate: undefined
};
exports.performanceTimestampProvider = performanceTimestampProvider;
},{}],"../node_modules/rxjs/dist/esm5/internal/scheduler/animationFrameProvider.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.animationFrameProvider = void 0;

var _tslib = require("tslib");

var _Subscription = require("../Subscription");

var animationFrameProvider = {
  schedule: function (callback) {
    var request = requestAnimationFrame;
    var cancel = cancelAnimationFrame;
    var delegate = animationFrameProvider.delegate;

    if (delegate) {
      request = delegate.requestAnimationFrame;
      cancel = delegate.cancelAnimationFrame;
    }

    var handle = request(function (timestamp) {
      cancel = undefined;
      callback(timestamp);
    });
    return new _Subscription.Subscription(function () {
      return cancel === null || cancel === void 0 ? void 0 : cancel(handle);
    });
  },
  requestAnimationFrame: function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    var delegate = animationFrameProvider.delegate;
    return ((delegate === null || delegate === void 0 ? void 0 : delegate.requestAnimationFrame) || requestAnimationFrame).apply(void 0, (0, _tslib.__spreadArray)([], (0, _tslib.__read)(args), false));
  },
  cancelAnimationFrame: function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    var delegate = animationFrameProvider.delegate;
    return ((delegate === null || delegate === void 0 ? void 0 : delegate.cancelAnimationFrame) || cancelAnimationFrame).apply(void 0, (0, _tslib.__spreadArray)([], (0, _tslib.__read)(args), false));
  },
  delegate: undefined
};
exports.animationFrameProvider = animationFrameProvider;
},{"tslib":"../node_modules/rxjs/node_modules/tslib/tslib.es6.js","../Subscription":"../node_modules/rxjs/dist/esm5/internal/Subscription.js"}],"../node_modules/rxjs/dist/esm5/internal/observable/dom/animationFrames.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.animationFrames = animationFrames;

var _Observable = require("../../Observable");

var _Subscription = require("../../Subscription");

var _performanceTimestampProvider = require("../../scheduler/performanceTimestampProvider");

var _animationFrameProvider = require("../../scheduler/animationFrameProvider");

function animationFrames(timestampProvider) {
  return timestampProvider ? animationFramesFactory(timestampProvider) : DEFAULT_ANIMATION_FRAMES;
}

function animationFramesFactory(timestampProvider) {
  var schedule = _animationFrameProvider.animationFrameProvider.schedule;
  return new _Observable.Observable(function (subscriber) {
    var subscription = new _Subscription.Subscription();
    var provider = timestampProvider || _performanceTimestampProvider.performanceTimestampProvider;
    var start = provider.now();

    var run = function (timestamp) {
      var now = provider.now();
      subscriber.next({
        timestamp: timestampProvider ? now : timestamp,
        elapsed: now - start
      });

      if (!subscriber.closed) {
        subscription.add(schedule(run));
      }
    };

    subscription.add(schedule(run));
    return subscription;
  });
}

var DEFAULT_ANIMATION_FRAMES = animationFramesFactory();
},{"../../Observable":"../node_modules/rxjs/dist/esm5/internal/Observable.js","../../Subscription":"../node_modules/rxjs/dist/esm5/internal/Subscription.js","../../scheduler/performanceTimestampProvider":"../node_modules/rxjs/dist/esm5/internal/scheduler/performanceTimestampProvider.js","../../scheduler/animationFrameProvider":"../node_modules/rxjs/dist/esm5/internal/scheduler/animationFrameProvider.js"}],"../node_modules/rxjs/dist/esm5/internal/util/ObjectUnsubscribedError.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ObjectUnsubscribedError = void 0;

var _createErrorClass = require("./createErrorClass");

var ObjectUnsubscribedError = (0, _createErrorClass.createErrorClass)(function (_super) {
  return function ObjectUnsubscribedErrorImpl() {
    _super(this);

    this.name = 'ObjectUnsubscribedError';
    this.message = 'object unsubscribed';
  };
});
exports.ObjectUnsubscribedError = ObjectUnsubscribedError;
},{"./createErrorClass":"../node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js"}],"../node_modules/rxjs/dist/esm5/internal/Subject.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnonymousSubject = exports.Subject = void 0;

var _tslib = require("tslib");

var _Observable = require("./Observable");

var _Subscription = require("./Subscription");

var _ObjectUnsubscribedError = require("./util/ObjectUnsubscribedError");

var _arrRemove = require("./util/arrRemove");

var _errorContext = require("./util/errorContext");

var Subject = function (_super) {
  (0, _tslib.__extends)(Subject, _super);

  function Subject() {
    var _this = _super.call(this) || this;

    _this.closed = false;
    _this.observers = [];
    _this.isStopped = false;
    _this.hasError = false;
    _this.thrownError = null;
    return _this;
  }

  Subject.prototype.lift = function (operator) {
    var subject = new AnonymousSubject(this, this);
    subject.operator = operator;
    return subject;
  };

  Subject.prototype._throwIfClosed = function () {
    if (this.closed) {
      throw new _ObjectUnsubscribedError.ObjectUnsubscribedError();
    }
  };

  Subject.prototype.next = function (value) {
    var _this = this;

    (0, _errorContext.errorContext)(function () {
      var e_1, _a;

      _this._throwIfClosed();

      if (!_this.isStopped) {
        var copy = _this.observers.slice();

        try {
          for (var copy_1 = (0, _tslib.__values)(copy), copy_1_1 = copy_1.next(); !copy_1_1.done; copy_1_1 = copy_1.next()) {
            var observer = copy_1_1.value;
            observer.next(value);
          }
        } catch (e_1_1) {
          e_1 = {
            error: e_1_1
          };
        } finally {
          try {
            if (copy_1_1 && !copy_1_1.done && (_a = copy_1.return)) _a.call(copy_1);
          } finally {
            if (e_1) throw e_1.error;
          }
        }
      }
    });
  };

  Subject.prototype.error = function (err) {
    var _this = this;

    (0, _errorContext.errorContext)(function () {
      _this._throwIfClosed();

      if (!_this.isStopped) {
        _this.hasError = _this.isStopped = true;
        _this.thrownError = err;
        var observers = _this.observers;

        while (observers.length) {
          observers.shift().error(err);
        }
      }
    });
  };

  Subject.prototype.complete = function () {
    var _this = this;

    (0, _errorContext.errorContext)(function () {
      _this._throwIfClosed();

      if (!_this.isStopped) {
        _this.isStopped = true;
        var observers = _this.observers;

        while (observers.length) {
          observers.shift().complete();
        }
      }
    });
  };

  Subject.prototype.unsubscribe = function () {
    this.isStopped = this.closed = true;
    this.observers = null;
  };

  Object.defineProperty(Subject.prototype, "observed", {
    get: function () {
      var _a;

      return ((_a = this.observers) === null || _a === void 0 ? void 0 : _a.length) > 0;
    },
    enumerable: false,
    configurable: true
  });

  Subject.prototype._trySubscribe = function (subscriber) {
    this._throwIfClosed();

    return _super.prototype._trySubscribe.call(this, subscriber);
  };

  Subject.prototype._subscribe = function (subscriber) {
    this._throwIfClosed();

    this._checkFinalizedStatuses(subscriber);

    return this._innerSubscribe(subscriber);
  };

  Subject.prototype._innerSubscribe = function (subscriber) {
    var _a = this,
        hasError = _a.hasError,
        isStopped = _a.isStopped,
        observers = _a.observers;

    return hasError || isStopped ? _Subscription.EMPTY_SUBSCRIPTION : (observers.push(subscriber), new _Subscription.Subscription(function () {
      return (0, _arrRemove.arrRemove)(observers, subscriber);
    }));
  };

  Subject.prototype._checkFinalizedStatuses = function (subscriber) {
    var _a = this,
        hasError = _a.hasError,
        thrownError = _a.thrownError,
        isStopped = _a.isStopped;

    if (hasError) {
      subscriber.error(thrownError);
    } else if (isStopped) {
      subscriber.complete();
    }
  };

  Subject.prototype.asObservable = function () {
    var observable = new _Observable.Observable();
    observable.source = this;
    return observable;
  };

  Subject.create = function (destination, source) {
    return new AnonymousSubject(destination, source);
  };

  return Subject;
}(_Observable.Observable);

exports.Subject = Subject;

var AnonymousSubject = function (_super) {
  (0, _tslib.__extends)(AnonymousSubject, _super);

  function AnonymousSubject(destination, source) {
    var _this = _super.call(this) || this;

    _this.destination = destination;
    _this.source = source;
    return _this;
  }

  AnonymousSubject.prototype.next = function (value) {
    var _a, _b;

    (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.next) === null || _b === void 0 ? void 0 : _b.call(_a, value);
  };

  AnonymousSubject.prototype.error = function (err) {
    var _a, _b;

    (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 ? void 0 : _b.call(_a, err);
  };

  AnonymousSubject.prototype.complete = function () {
    var _a, _b;

    (_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.complete) === null || _b === void 0 ? void 0 : _b.call(_a);
  };

  AnonymousSubject.prototype._subscribe = function (subscriber) {
    var _a, _b;

    return (_b = (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber)) !== null && _b !== void 0 ? _b : _Subscription.EMPTY_SUBSCRIPTION;
  };

  return AnonymousSubject;
}(Subject);

exports.AnonymousSubject = AnonymousSubject;
},{"tslib":"../node_modules/rxjs/node_modules/tslib/tslib.es6.js","./Observable":"../node_modules/rxjs/dist/esm5/internal/Observable.js","./Subscription":"../node_modules/rxjs/dist/esm5/internal/Subscription.js","./util/ObjectUnsubscribedError":"../node_modules/rxjs/dist/esm5/internal/util/ObjectUnsubscribedError.js","./util/arrRemove":"../node_modules/rxjs/dist/esm5/internal/util/arrRemove.js","./util/errorContext":"../node_modules/rxjs/dist/esm5/internal/util/errorContext.js"}],"../node_modules/rxjs/dist/esm5/internal/BehaviorSubject.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BehaviorSubject = void 0;

var _tslib = require("tslib");

var _Subject = require("./Subject");

var BehaviorSubject = function (_super) {
  (0, _tslib.__extends)(BehaviorSubject, _super);

  function BehaviorSubject(_value) {
    var _this = _super.call(this) || this;

    _this._value = _value;
    return _this;
  }

  Object.defineProperty(BehaviorSubject.prototype, "value", {
    get: function () {
      return this.getValue();
    },
    enumerable: false,
    configurable: true
  });

  BehaviorSubject.prototype._subscribe = function (subscriber) {
    var subscription = _super.prototype._subscribe.call(this, subscriber);

    !subscription.closed && subscriber.next(this._value);
    return subscription;
  };

  BehaviorSubject.prototype.getValue = function () {
    var _a = this,
        hasError = _a.hasError,
        thrownError = _a.thrownError,
        _value = _a._value;

    if (hasError) {
      throw thrownError;
    }

    this._throwIfClosed();

    return _value;
  };

  BehaviorSubject.prototype.next = function (value) {
    _super.prototype.next.call(this, this._value = value);
  };

  return BehaviorSubject;
}(_Subject.Subject);

exports.BehaviorSubject = BehaviorSubject;
},{"tslib":"../node_modules/rxjs/node_modules/tslib/tslib.es6.js","./Subject":"../node_modules/rxjs/dist/esm5/internal/Subject.js"}],"../node_modules/rxjs/dist/esm5/internal/scheduler/dateTimestampProvider.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dateTimestampProvider = void 0;
var dateTimestampProvider = {
  now: function () {
    return (dateTimestampProvider.delegate || Date).now();
  },
  delegate: undefined
};
exports.dateTimestampProvider = dateTimestampProvider;
},{}],"../node_modules/rxjs/dist/esm5/internal/ReplaySubject.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReplaySubject = void 0;

var _tslib = require("tslib");

var _Subject = require("./Subject");

var _dateTimestampProvider = require("./scheduler/dateTimestampProvider");

var ReplaySubject = function (_super) {
  (0, _tslib.__extends)(ReplaySubject, _super);

  function ReplaySubject(_bufferSize, _windowTime, _timestampProvider) {
    if (_bufferSize === void 0) {
      _bufferSize = Infinity;
    }

    if (_windowTime === void 0) {
      _windowTime = Infinity;
    }

    if (_timestampProvider === void 0) {
      _timestampProvider = _dateTimestampProvider.dateTimestampProvider;
    }

    var _this = _super.call(this) || this;

    _this._bufferSize = _bufferSize;
    _this._windowTime = _windowTime;
    _this._timestampProvider = _timestampProvider;
    _this._buffer = [];
    _this._infiniteTimeWindow = true;
    _this._infiniteTimeWindow = _windowTime === Infinity;
    _this._bufferSize = Math.max(1, _bufferSize);
    _this._windowTime = Math.max(1, _windowTime);
    return _this;
  }

  ReplaySubject.prototype.next = function (value) {
    var _a = this,
        isStopped = _a.isStopped,
        _buffer = _a._buffer,
        _infiniteTimeWindow = _a._infiniteTimeWindow,
        _timestampProvider = _a._timestampProvider,
        _windowTime = _a._windowTime;

    if (!isStopped) {
      _buffer.push(value);

      !_infiniteTimeWindow && _buffer.push(_timestampProvider.now() + _windowTime);
    }

    this._trimBuffer();

    _super.prototype.next.call(this, value);
  };

  ReplaySubject.prototype._subscribe = function (subscriber) {
    this._throwIfClosed();

    this._trimBuffer();

    var subscription = this._innerSubscribe(subscriber);

    var _a = this,
        _infiniteTimeWindow = _a._infiniteTimeWindow,
        _buffer = _a._buffer;

    var copy = _buffer.slice();

    for (var i = 0; i < copy.length && !subscriber.closed; i += _infiniteTimeWindow ? 1 : 2) {
      subscriber.next(copy[i]);
    }

    this._checkFinalizedStatuses(subscriber);

    return subscription;
  };

  ReplaySubject.prototype._trimBuffer = function () {
    var _a = this,
        _bufferSize = _a._bufferSize,
        _timestampProvider = _a._timestampProvider,
        _buffer = _a._buffer,
        _infiniteTimeWindow = _a._infiniteTimeWindow;

    var adjustedBufferSize = (_infiniteTimeWindow ? 1 : 2) * _bufferSize;
    _bufferSize < Infinity && adjustedBufferSize < _buffer.length && _buffer.splice(0, _buffer.length - adjustedBufferSize);

    if (!_infiniteTimeWindow) {
      var now = _timestampProvider.now();

      var last = 0;

      for (var i = 1; i < _buffer.length && _buffer[i] <= now; i += 2) {
        last = i;
      }

      last && _buffer.splice(0, last + 1);
    }
  };

  return ReplaySubject;
}(_Subject.Subject);

exports.ReplaySubject = ReplaySubject;
},{"tslib":"../node_modules/rxjs/node_modules/tslib/tslib.es6.js","./Subject":"../node_modules/rxjs/dist/esm5/internal/Subject.js","./scheduler/dateTimestampProvider":"../node_modules/rxjs/dist/esm5/internal/scheduler/dateTimestampProvider.js"}],"../node_modules/rxjs/dist/esm5/internal/AsyncSubject.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AsyncSubject = void 0;

var _tslib = require("tslib");

var _Subject = require("./Subject");

var AsyncSubject = function (_super) {
  (0, _tslib.__extends)(AsyncSubject, _super);

  function AsyncSubject() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this._value = null;
    _this._hasValue = false;
    _this._isComplete = false;
    return _this;
  }

  AsyncSubject.prototype._checkFinalizedStatuses = function (subscriber) {
    var _a = this,
        hasError = _a.hasError,
        _hasValue = _a._hasValue,
        _value = _a._value,
        thrownError = _a.thrownError,
        isStopped = _a.isStopped,
        _isComplete = _a._isComplete;

    if (hasError) {
      subscriber.error(thrownError);
    } else if (isStopped || _isComplete) {
      _hasValue && subscriber.next(_value);
      subscriber.complete();
    }
  };

  AsyncSubject.prototype.next = function (value) {
    if (!this.isStopped) {
      this._value = value;
      this._hasValue = true;
    }
  };

  AsyncSubject.prototype.complete = function () {
    var _a = this,
        _hasValue = _a._hasValue,
        _value = _a._value,
        _isComplete = _a._isComplete;

    if (!_isComplete) {
      this._isComplete = true;
      _hasValue && _super.prototype.next.call(this, _value);

      _super.prototype.complete.call(this);
    }
  };

  return AsyncSubject;
}(_Subject.Subject);

exports.AsyncSubject = AsyncSubject;
},{"tslib":"../node_modules/rxjs/node_modules/tslib/tslib.es6.js","./Subject":"../node_modules/rxjs/dist/esm5/internal/Subject.js"}],"../node_modules/rxjs/dist/esm5/internal/scheduler/Action.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Action = void 0;

var _tslib = require("tslib");

var _Subscription = require("../Subscription");

var Action = function (_super) {
  (0, _tslib.__extends)(Action, _super);

  function Action(scheduler, work) {
    return _super.call(this) || this;
  }

  Action.prototype.schedule = function (state, delay) {
    if (delay === void 0) {
      delay = 0;
    }

    return this;
  };

  return Action;
}(_Subscription.Subscription);

exports.Action = Action;
},{"tslib":"../node_modules/rxjs/node_modules/tslib/tslib.es6.js","../Subscription":"../node_modules/rxjs/dist/esm5/internal/Subscription.js"}],"../node_modules/rxjs/dist/esm5/internal/scheduler/intervalProvider.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.intervalProvider = void 0;

var _tslib = require("tslib");

var intervalProvider = {
  setInterval: function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    var delegate = intervalProvider.delegate;
    return ((delegate === null || delegate === void 0 ? void 0 : delegate.setInterval) || setInterval).apply(void 0, (0, _tslib.__spreadArray)([], (0, _tslib.__read)(args), false));
  },
  clearInterval: function (handle) {
    var delegate = intervalProvider.delegate;
    return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearInterval) || clearInterval)(handle);
  },
  delegate: undefined
};
exports.intervalProvider = intervalProvider;
},{"tslib":"../node_modules/rxjs/node_modules/tslib/tslib.es6.js"}],"../node_modules/rxjs/dist/esm5/internal/scheduler/AsyncAction.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AsyncAction = void 0;

var _tslib = require("tslib");

var _Action = require("./Action");

var _intervalProvider = require("./intervalProvider");

var _arrRemove = require("../util/arrRemove");

var AsyncAction = function (_super) {
  (0, _tslib.__extends)(AsyncAction, _super);

  function AsyncAction(scheduler, work) {
    var _this = _super.call(this, scheduler, work) || this;

    _this.scheduler = scheduler;
    _this.work = work;
    _this.pending = false;
    return _this;
  }

  AsyncAction.prototype.schedule = function (state, delay) {
    if (delay === void 0) {
      delay = 0;
    }

    if (this.closed) {
      return this;
    }

    this.state = state;
    var id = this.id;
    var scheduler = this.scheduler;

    if (id != null) {
      this.id = this.recycleAsyncId(scheduler, id, delay);
    }

    this.pending = true;
    this.delay = delay;
    this.id = this.id || this.requestAsyncId(scheduler, this.id, delay);
    return this;
  };

  AsyncAction.prototype.requestAsyncId = function (scheduler, _id, delay) {
    if (delay === void 0) {
      delay = 0;
    }

    return _intervalProvider.intervalProvider.setInterval(scheduler.flush.bind(scheduler, this), delay);
  };

  AsyncAction.prototype.recycleAsyncId = function (_scheduler, id, delay) {
    if (delay === void 0) {
      delay = 0;
    }

    if (delay != null && this.delay === delay && this.pending === false) {
      return id;
    }

    _intervalProvider.intervalProvider.clearInterval(id);

    return undefined;
  };

  AsyncAction.prototype.execute = function (state, delay) {
    if (this.closed) {
      return new Error('executing a cancelled action');
    }

    this.pending = false;

    var error = this._execute(state, delay);

    if (error) {
      return error;
    } else if (this.pending === false && this.id != null) {
      this.id = this.recycleAsyncId(this.scheduler, this.id, null);
    }
  };

  AsyncAction.prototype._execute = function (state, _delay) {
    var errored = false;
    var errorValue;

    try {
      this.work(state);
    } catch (e) {
      errored = true;
      errorValue = e ? e : new Error('Scheduled action threw falsy error');
    }

    if (errored) {
      this.unsubscribe();
      return errorValue;
    }
  };

  AsyncAction.prototype.unsubscribe = function () {
    if (!this.closed) {
      var _a = this,
          id = _a.id,
          scheduler = _a.scheduler;

      var actions = scheduler.actions;
      this.work = this.state = this.scheduler = null;
      this.pending = false;
      (0, _arrRemove.arrRemove)(actions, this);

      if (id != null) {
        this.id = this.recycleAsyncId(scheduler, id, null);
      }

      this.delay = null;

      _super.prototype.unsubscribe.call(this);
    }
  };

  return AsyncAction;
}(_Action.Action);

exports.AsyncAction = AsyncAction;
},{"tslib":"../node_modules/rxjs/node_modules/tslib/tslib.es6.js","./Action":"../node_modules/rxjs/dist/esm5/internal/scheduler/Action.js","./intervalProvider":"../node_modules/rxjs/dist/esm5/internal/scheduler/intervalProvider.js","../util/arrRemove":"../node_modules/rxjs/dist/esm5/internal/util/arrRemove.js"}],"../node_modules/rxjs/dist/esm5/internal/util/Immediate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TestTools = exports.Immediate = void 0;
var nextHandle = 1;
var resolved;
var activeHandles = {};

function findAndClearHandle(handle) {
  if (handle in activeHandles) {
    delete activeHandles[handle];
    return true;
  }

  return false;
}

var Immediate = {
  setImmediate: function (cb) {
    var handle = nextHandle++;
    activeHandles[handle] = true;

    if (!resolved) {
      resolved = Promise.resolve();
    }

    resolved.then(function () {
      return findAndClearHandle(handle) && cb();
    });
    return handle;
  },
  clearImmediate: function (handle) {
    findAndClearHandle(handle);
  }
};
exports.Immediate = Immediate;
var TestTools = {
  pending: function () {
    return Object.keys(activeHandles).length;
  }
};
exports.TestTools = TestTools;
},{}],"../node_modules/rxjs/dist/esm5/internal/scheduler/immediateProvider.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.immediateProvider = void 0;

var _tslib = require("tslib");

var _Immediate = require("../util/Immediate");

var setImmediate = _Immediate.Immediate.setImmediate,
    clearImmediate = _Immediate.Immediate.clearImmediate;
var immediateProvider = {
  setImmediate: function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    var delegate = immediateProvider.delegate;
    return ((delegate === null || delegate === void 0 ? void 0 : delegate.setImmediate) || setImmediate).apply(void 0, (0, _tslib.__spreadArray)([], (0, _tslib.__read)(args), false));
  },
  clearImmediate: function (handle) {
    var delegate = immediateProvider.delegate;
    return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearImmediate) || clearImmediate)(handle);
  },
  delegate: undefined
};
exports.immediateProvider = immediateProvider;
},{"tslib":"../node_modules/rxjs/node_modules/tslib/tslib.es6.js","../util/Immediate":"../node_modules/rxjs/dist/esm5/internal/util/Immediate.js"}],"../node_modules/rxjs/dist/esm5/internal/scheduler/AsapAction.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AsapAction = void 0;

var _tslib = require("tslib");

var _AsyncAction = require("./AsyncAction");

var _immediateProvider = require("./immediateProvider");

var AsapAction = function (_super) {
  (0, _tslib.__extends)(AsapAction, _super);

  function AsapAction(scheduler, work) {
    var _this = _super.call(this, scheduler, work) || this;

    _this.scheduler = scheduler;
    _this.work = work;
    return _this;
  }

  AsapAction.prototype.requestAsyncId = function (scheduler, id, delay) {
    if (delay === void 0) {
      delay = 0;
    }

    if (delay !== null && delay > 0) {
      return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
    }

    scheduler.actions.push(this);
    return scheduler._scheduled || (scheduler._scheduled = _immediateProvider.immediateProvider.setImmediate(scheduler.flush.bind(scheduler, undefined)));
  };

  AsapAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
    if (delay === void 0) {
      delay = 0;
    }

    if (delay != null && delay > 0 || delay == null && this.delay > 0) {
      return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
    }

    if (scheduler.actions.length === 0) {
      _immediateProvider.immediateProvider.clearImmediate(id);

      scheduler._scheduled = undefined;
    }

    return undefined;
  };

  return AsapAction;
}(_AsyncAction.AsyncAction);

exports.AsapAction = AsapAction;
},{"tslib":"../node_modules/rxjs/node_modules/tslib/tslib.es6.js","./AsyncAction":"../node_modules/rxjs/dist/esm5/internal/scheduler/AsyncAction.js","./immediateProvider":"../node_modules/rxjs/dist/esm5/internal/scheduler/immediateProvider.js"}],"../node_modules/rxjs/dist/esm5/internal/Scheduler.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Scheduler = void 0;

var _dateTimestampProvider = require("./scheduler/dateTimestampProvider");

var Scheduler = function () {
  function Scheduler(schedulerActionCtor, now) {
    if (now === void 0) {
      now = Scheduler.now;
    }

    this.schedulerActionCtor = schedulerActionCtor;
    this.now = now;
  }

  Scheduler.prototype.schedule = function (work, delay, state) {
    if (delay === void 0) {
      delay = 0;
    }

    return new this.schedulerActionCtor(this, work).schedule(state, delay);
  };

  Scheduler.now = _dateTimestampProvider.dateTimestampProvider.now;
  return Scheduler;
}();

exports.Scheduler = Scheduler;
},{"./scheduler/dateTimestampProvider":"../node_modules/rxjs/dist/esm5/internal/scheduler/dateTimestampProvider.js"}],"../node_modules/rxjs/dist/esm5/internal/scheduler/AsyncScheduler.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AsyncScheduler = void 0;

var _tslib = require("tslib");

var _Scheduler = require("../Scheduler");

var AsyncScheduler = function (_super) {
  (0, _tslib.__extends)(AsyncScheduler, _super);

  function AsyncScheduler(SchedulerAction, now) {
    if (now === void 0) {
      now = _Scheduler.Scheduler.now;
    }

    var _this = _super.call(this, SchedulerAction, now) || this;

    _this.actions = [];
    _this._active = false;
    _this._scheduled = undefined;
    return _this;
  }

  AsyncScheduler.prototype.flush = function (action) {
    var actions = this.actions;

    if (this._active) {
      actions.push(action);
      return;
    }

    var error;
    this._active = true;

    do {
      if (error = action.execute(action.state, action.delay)) {
        break;
      }
    } while (action = actions.shift());

    this._active = false;

    if (error) {
      while (action = actions.shift()) {
        action.unsubscribe();
      }

      throw error;
    }
  };

  return AsyncScheduler;
}(_Scheduler.Scheduler);

exports.AsyncScheduler = AsyncScheduler;
},{"tslib":"../node_modules/rxjs/node_modules/tslib/tslib.es6.js","../Scheduler":"../node_modules/rxjs/dist/esm5/internal/Scheduler.js"}],"../node_modules/rxjs/dist/esm5/internal/scheduler/AsapScheduler.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AsapScheduler = void 0;

var _tslib = require("tslib");

var _AsyncScheduler = require("./AsyncScheduler");

var AsapScheduler = function (_super) {
  (0, _tslib.__extends)(AsapScheduler, _super);

  function AsapScheduler() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  AsapScheduler.prototype.flush = function (action) {
    this._active = true;
    this._scheduled = undefined;
    var actions = this.actions;
    var error;
    var index = -1;
    action = action || actions.shift();
    var count = actions.length;

    do {
      if (error = action.execute(action.state, action.delay)) {
        break;
      }
    } while (++index < count && (action = actions.shift()));

    this._active = false;

    if (error) {
      while (++index < count && (action = actions.shift())) {
        action.unsubscribe();
      }

      throw error;
    }
  };

  return AsapScheduler;
}(_AsyncScheduler.AsyncScheduler);

exports.AsapScheduler = AsapScheduler;
},{"tslib":"../node_modules/rxjs/node_modules/tslib/tslib.es6.js","./AsyncScheduler":"../node_modules/rxjs/dist/esm5/internal/scheduler/AsyncScheduler.js"}],"../node_modules/rxjs/dist/esm5/internal/scheduler/asap.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.asap = exports.asapScheduler = void 0;

var _AsapAction = require("./AsapAction");

var _AsapScheduler = require("./AsapScheduler");

var asapScheduler = new _AsapScheduler.AsapScheduler(_AsapAction.AsapAction);
exports.asapScheduler = asapScheduler;
var asap = asapScheduler;
exports.asap = asap;
},{"./AsapAction":"../node_modules/rxjs/dist/esm5/internal/scheduler/AsapAction.js","./AsapScheduler":"../node_modules/rxjs/dist/esm5/internal/scheduler/AsapScheduler.js"}],"../node_modules/rxjs/dist/esm5/internal/scheduler/async.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.async = exports.asyncScheduler = void 0;

var _AsyncAction = require("./AsyncAction");

var _AsyncScheduler = require("./AsyncScheduler");

var asyncScheduler = new _AsyncScheduler.AsyncScheduler(_AsyncAction.AsyncAction);
exports.asyncScheduler = asyncScheduler;
var async = asyncScheduler;
exports.async = async;
},{"./AsyncAction":"../node_modules/rxjs/dist/esm5/internal/scheduler/AsyncAction.js","./AsyncScheduler":"../node_modules/rxjs/dist/esm5/internal/scheduler/AsyncScheduler.js"}],"../node_modules/rxjs/dist/esm5/internal/scheduler/QueueAction.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QueueAction = void 0;

var _tslib = require("tslib");

var _AsyncAction = require("./AsyncAction");

var QueueAction = function (_super) {
  (0, _tslib.__extends)(QueueAction, _super);

  function QueueAction(scheduler, work) {
    var _this = _super.call(this, scheduler, work) || this;

    _this.scheduler = scheduler;
    _this.work = work;
    return _this;
  }

  QueueAction.prototype.schedule = function (state, delay) {
    if (delay === void 0) {
      delay = 0;
    }

    if (delay > 0) {
      return _super.prototype.schedule.call(this, state, delay);
    }

    this.delay = delay;
    this.state = state;
    this.scheduler.flush(this);
    return this;
  };

  QueueAction.prototype.execute = function (state, delay) {
    return delay > 0 || this.closed ? _super.prototype.execute.call(this, state, delay) : this._execute(state, delay);
  };

  QueueAction.prototype.requestAsyncId = function (scheduler, id, delay) {
    if (delay === void 0) {
      delay = 0;
    }

    if (delay != null && delay > 0 || delay == null && this.delay > 0) {
      return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
    }

    return scheduler.flush(this);
  };

  return QueueAction;
}(_AsyncAction.AsyncAction);

exports.QueueAction = QueueAction;
},{"tslib":"../node_modules/rxjs/node_modules/tslib/tslib.es6.js","./AsyncAction":"../node_modules/rxjs/dist/esm5/internal/scheduler/AsyncAction.js"}],"../node_modules/rxjs/dist/esm5/internal/scheduler/QueueScheduler.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QueueScheduler = void 0;

var _tslib = require("tslib");

var _AsyncScheduler = require("./AsyncScheduler");

var QueueScheduler = function (_super) {
  (0, _tslib.__extends)(QueueScheduler, _super);

  function QueueScheduler() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  return QueueScheduler;
}(_AsyncScheduler.AsyncScheduler);

exports.QueueScheduler = QueueScheduler;
},{"tslib":"../node_modules/rxjs/node_modules/tslib/tslib.es6.js","./AsyncScheduler":"../node_modules/rxjs/dist/esm5/internal/scheduler/AsyncScheduler.js"}],"../node_modules/rxjs/dist/esm5/internal/scheduler/queue.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queue = exports.queueScheduler = void 0;

var _QueueAction = require("./QueueAction");

var _QueueScheduler = require("./QueueScheduler");

var queueScheduler = new _QueueScheduler.QueueScheduler(_QueueAction.QueueAction);
exports.queueScheduler = queueScheduler;
var queue = queueScheduler;
exports.queue = queue;
},{"./QueueAction":"../node_modules/rxjs/dist/esm5/internal/scheduler/QueueAction.js","./QueueScheduler":"../node_modules/rxjs/dist/esm5/internal/scheduler/QueueScheduler.js"}],"../node_modules/rxjs/dist/esm5/internal/scheduler/AnimationFrameAction.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnimationFrameAction = void 0;

var _tslib = require("tslib");

var _AsyncAction = require("./AsyncAction");

var _animationFrameProvider = require("./animationFrameProvider");

var AnimationFrameAction = function (_super) {
  (0, _tslib.__extends)(AnimationFrameAction, _super);

  function AnimationFrameAction(scheduler, work) {
    var _this = _super.call(this, scheduler, work) || this;

    _this.scheduler = scheduler;
    _this.work = work;
    return _this;
  }

  AnimationFrameAction.prototype.requestAsyncId = function (scheduler, id, delay) {
    if (delay === void 0) {
      delay = 0;
    }

    if (delay !== null && delay > 0) {
      return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
    }

    scheduler.actions.push(this);
    return scheduler._scheduled || (scheduler._scheduled = _animationFrameProvider.animationFrameProvider.requestAnimationFrame(function () {
      return scheduler.flush(undefined);
    }));
  };

  AnimationFrameAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
    if (delay === void 0) {
      delay = 0;
    }

    if (delay != null && delay > 0 || delay == null && this.delay > 0) {
      return _super.prototype.recycleAsyncId.call(this, scheduler, id, delay);
    }

    if (scheduler.actions.length === 0) {
      _animationFrameProvider.animationFrameProvider.cancelAnimationFrame(id);

      scheduler._scheduled = undefined;
    }

    return undefined;
  };

  return AnimationFrameAction;
}(_AsyncAction.AsyncAction);

exports.AnimationFrameAction = AnimationFrameAction;
},{"tslib":"../node_modules/rxjs/node_modules/tslib/tslib.es6.js","./AsyncAction":"../node_modules/rxjs/dist/esm5/internal/scheduler/AsyncAction.js","./animationFrameProvider":"../node_modules/rxjs/dist/esm5/internal/scheduler/animationFrameProvider.js"}],"../node_modules/rxjs/dist/esm5/internal/scheduler/AnimationFrameScheduler.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnimationFrameScheduler = void 0;

var _tslib = require("tslib");

var _AsyncScheduler = require("./AsyncScheduler");

var AnimationFrameScheduler = function (_super) {
  (0, _tslib.__extends)(AnimationFrameScheduler, _super);

  function AnimationFrameScheduler() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  AnimationFrameScheduler.prototype.flush = function (action) {
    this._active = true;
    this._scheduled = undefined;
    var actions = this.actions;
    var error;
    var index = -1;
    action = action || actions.shift();
    var count = actions.length;

    do {
      if (error = action.execute(action.state, action.delay)) {
        break;
      }
    } while (++index < count && (action = actions.shift()));

    this._active = false;

    if (error) {
      while (++index < count && (action = actions.shift())) {
        action.unsubscribe();
      }

      throw error;
    }
  };

  return AnimationFrameScheduler;
}(_AsyncScheduler.AsyncScheduler);

exports.AnimationFrameScheduler = AnimationFrameScheduler;
},{"tslib":"../node_modules/rxjs/node_modules/tslib/tslib.es6.js","./AsyncScheduler":"../node_modules/rxjs/dist/esm5/internal/scheduler/AsyncScheduler.js"}],"../node_modules/rxjs/dist/esm5/internal/scheduler/animationFrame.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.animationFrame = exports.animationFrameScheduler = void 0;

var _AnimationFrameAction = require("./AnimationFrameAction");

var _AnimationFrameScheduler = require("./AnimationFrameScheduler");

var animationFrameScheduler = new _AnimationFrameScheduler.AnimationFrameScheduler(_AnimationFrameAction.AnimationFrameAction);
exports.animationFrameScheduler = animationFrameScheduler;
var animationFrame = animationFrameScheduler;
exports.animationFrame = animationFrame;
},{"./AnimationFrameAction":"../node_modules/rxjs/dist/esm5/internal/scheduler/AnimationFrameAction.js","./AnimationFrameScheduler":"../node_modules/rxjs/dist/esm5/internal/scheduler/AnimationFrameScheduler.js"}],"../node_modules/rxjs/dist/esm5/internal/scheduler/VirtualTimeScheduler.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VirtualAction = exports.VirtualTimeScheduler = void 0;

var _tslib = require("tslib");

var _AsyncAction = require("./AsyncAction");

var _Subscription = require("../Subscription");

var _AsyncScheduler = require("./AsyncScheduler");

var VirtualTimeScheduler = function (_super) {
  (0, _tslib.__extends)(VirtualTimeScheduler, _super);

  function VirtualTimeScheduler(schedulerActionCtor, maxFrames) {
    if (schedulerActionCtor === void 0) {
      schedulerActionCtor = VirtualAction;
    }

    if (maxFrames === void 0) {
      maxFrames = Infinity;
    }

    var _this = _super.call(this, schedulerActionCtor, function () {
      return _this.frame;
    }) || this;

    _this.maxFrames = maxFrames;
    _this.frame = 0;
    _this.index = -1;
    return _this;
  }

  VirtualTimeScheduler.prototype.flush = function () {
    var _a = this,
        actions = _a.actions,
        maxFrames = _a.maxFrames;

    var error;
    var action;

    while ((action = actions[0]) && action.delay <= maxFrames) {
      actions.shift();
      this.frame = action.delay;

      if (error = action.execute(action.state, action.delay)) {
        break;
      }
    }

    if (error) {
      while (action = actions.shift()) {
        action.unsubscribe();
      }

      throw error;
    }
  };

  VirtualTimeScheduler.frameTimeFactor = 10;
  return VirtualTimeScheduler;
}(_AsyncScheduler.AsyncScheduler);

exports.VirtualTimeScheduler = VirtualTimeScheduler;

var VirtualAction = function (_super) {
  (0, _tslib.__extends)(VirtualAction, _super);

  function VirtualAction(scheduler, work, index) {
    if (index === void 0) {
      index = scheduler.index += 1;
    }

    var _this = _super.call(this, scheduler, work) || this;

    _this.scheduler = scheduler;
    _this.work = work;
    _this.index = index;
    _this.active = true;
    _this.index = scheduler.index = index;
    return _this;
  }

  VirtualAction.prototype.schedule = function (state, delay) {
    if (delay === void 0) {
      delay = 0;
    }

    if (Number.isFinite(delay)) {
      if (!this.id) {
        return _super.prototype.schedule.call(this, state, delay);
      }

      this.active = false;
      var action = new VirtualAction(this.scheduler, this.work);
      this.add(action);
      return action.schedule(state, delay);
    } else {
      return _Subscription.Subscription.EMPTY;
    }
  };

  VirtualAction.prototype.requestAsyncId = function (scheduler, id, delay) {
    if (delay === void 0) {
      delay = 0;
    }

    this.delay = scheduler.frame + delay;
    var actions = scheduler.actions;
    actions.push(this);
    actions.sort(VirtualAction.sortActions);
    return true;
  };

  VirtualAction.prototype.recycleAsyncId = function (scheduler, id, delay) {
    if (delay === void 0) {
      delay = 0;
    }

    return undefined;
  };

  VirtualAction.prototype._execute = function (state, delay) {
    if (this.active === true) {
      return _super.prototype._execute.call(this, state, delay);
    }
  };

  VirtualAction.sortActions = function (a, b) {
    if (a.delay === b.delay) {
      if (a.index === b.index) {
        return 0;
      } else if (a.index > b.index) {
        return 1;
      } else {
        return -1;
      }
    } else if (a.delay > b.delay) {
      return 1;
    } else {
      return -1;
    }
  };

  return VirtualAction;
}(_AsyncAction.AsyncAction);

exports.VirtualAction = VirtualAction;
},{"tslib":"../node_modules/rxjs/node_modules/tslib/tslib.es6.js","./AsyncAction":"../node_modules/rxjs/dist/esm5/internal/scheduler/AsyncAction.js","../Subscription":"../node_modules/rxjs/dist/esm5/internal/Subscription.js","./AsyncScheduler":"../node_modules/rxjs/dist/esm5/internal/scheduler/AsyncScheduler.js"}],"../node_modules/rxjs/dist/esm5/internal/observable/empty.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.empty = empty;
exports.EMPTY = void 0;

var _Observable = require("../Observable");

var EMPTY = new _Observable.Observable(function (subscriber) {
  return subscriber.complete();
});
exports.EMPTY = EMPTY;

function empty(scheduler) {
  return scheduler ? emptyScheduled(scheduler) : EMPTY;
}

function emptyScheduled(scheduler) {
  return new _Observable.Observable(function (subscriber) {
    return scheduler.schedule(function () {
      return subscriber.complete();
    });
  });
}
},{"../Observable":"../node_modules/rxjs/dist/esm5/internal/Observable.js"}],"../node_modules/rxjs/dist/esm5/internal/util/isScheduler.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isScheduler = isScheduler;

var _isFunction = require("./isFunction");

function isScheduler(value) {
  return value && (0, _isFunction.isFunction)(value.schedule);
}
},{"./isFunction":"../node_modules/rxjs/dist/esm5/internal/util/isFunction.js"}],"../node_modules/rxjs/dist/esm5/internal/util/args.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.popResultSelector = popResultSelector;
exports.popScheduler = popScheduler;
exports.popNumber = popNumber;

var _isFunction = require("./isFunction");

var _isScheduler = require("./isScheduler");

function last(arr) {
  return arr[arr.length - 1];
}

function popResultSelector(args) {
  return (0, _isFunction.isFunction)(last(args)) ? args.pop() : undefined;
}

function popScheduler(args) {
  return (0, _isScheduler.isScheduler)(last(args)) ? args.pop() : undefined;
}

function popNumber(args, defaultValue) {
  return typeof last(args) === 'number' ? args.pop() : defaultValue;
}
},{"./isFunction":"../node_modules/rxjs/dist/esm5/internal/util/isFunction.js","./isScheduler":"../node_modules/rxjs/dist/esm5/internal/util/isScheduler.js"}],"../node_modules/rxjs/dist/esm5/internal/util/isArrayLike.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isArrayLike = void 0;

var isArrayLike = function (x) {
  return x && typeof x.length === 'number' && typeof x !== 'function';
};

exports.isArrayLike = isArrayLike;
},{}],"../node_modules/rxjs/dist/esm5/internal/util/isPromise.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPromise = isPromise;

var _isFunction = require("./isFunction");

function isPromise(value) {
  return (0, _isFunction.isFunction)(value === null || value === void 0 ? void 0 : value.then);
}
},{"./isFunction":"../node_modules/rxjs/dist/esm5/internal/util/isFunction.js"}],"../node_modules/rxjs/dist/esm5/internal/util/isInteropObservable.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isInteropObservable = isInteropObservable;

var _observable = require("../symbol/observable");

var _isFunction = require("./isFunction");

function isInteropObservable(input) {
  return (0, _isFunction.isFunction)(input[_observable.observable]);
}
},{"../symbol/observable":"../node_modules/rxjs/dist/esm5/internal/symbol/observable.js","./isFunction":"../node_modules/rxjs/dist/esm5/internal/util/isFunction.js"}],"../node_modules/rxjs/dist/esm5/internal/util/isAsyncIterable.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAsyncIterable = isAsyncIterable;

var _isFunction = require("./isFunction");

function isAsyncIterable(obj) {
  return Symbol.asyncIterator && (0, _isFunction.isFunction)(obj === null || obj === void 0 ? void 0 : obj[Symbol.asyncIterator]);
}
},{"./isFunction":"../node_modules/rxjs/dist/esm5/internal/util/isFunction.js"}],"../node_modules/rxjs/dist/esm5/internal/util/throwUnobservableError.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createInvalidObservableTypeError = createInvalidObservableTypeError;

function createInvalidObservableTypeError(input) {
  return new TypeError("You provided " + (input !== null && typeof input === 'object' ? 'an invalid object' : "'" + input + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
}
},{}],"../node_modules/rxjs/dist/esm5/internal/symbol/iterator.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSymbolIterator = getSymbolIterator;
exports.iterator = void 0;

function getSymbolIterator() {
  if (typeof Symbol !== 'function' || !Symbol.iterator) {
    return '@@iterator';
  }

  return Symbol.iterator;
}

var iterator = getSymbolIterator();
exports.iterator = iterator;
},{}],"../node_modules/rxjs/dist/esm5/internal/util/isIterable.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isIterable = isIterable;

var _iterator = require("../symbol/iterator");

var _isFunction = require("./isFunction");

function isIterable(input) {
  return (0, _isFunction.isFunction)(input === null || input === void 0 ? void 0 : input[_iterator.iterator]);
}
},{"../symbol/iterator":"../node_modules/rxjs/dist/esm5/internal/symbol/iterator.js","./isFunction":"../node_modules/rxjs/dist/esm5/internal/util/isFunction.js"}],"../node_modules/rxjs/dist/esm5/internal/util/isReadableStreamLike.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readableStreamLikeToAsyncGenerator = readableStreamLikeToAsyncGenerator;
exports.isReadableStreamLike = isReadableStreamLike;

var _tslib = require("tslib");

var _isFunction = require("./isFunction");

function readableStreamLikeToAsyncGenerator(readableStream) {
  return (0, _tslib.__asyncGenerator)(this, arguments, function readableStreamLikeToAsyncGenerator_1() {
    var reader, _a, value, done;

    return (0, _tslib.__generator)(this, function (_b) {
      switch (_b.label) {
        case 0:
          reader = readableStream.getReader();
          _b.label = 1;

        case 1:
          _b.trys.push([1,, 9, 10]);

          _b.label = 2;

        case 2:
          if (!true) return [3, 8];
          return [4, (0, _tslib.__await)(reader.read())];

        case 3:
          _a = _b.sent(), value = _a.value, done = _a.done;
          if (!done) return [3, 5];
          return [4, (0, _tslib.__await)(void 0)];

        case 4:
          return [2, _b.sent()];

        case 5:
          return [4, (0, _tslib.__await)(value)];

        case 6:
          return [4, _b.sent()];

        case 7:
          _b.sent();

          return [3, 2];

        case 8:
          return [3, 10];

        case 9:
          reader.releaseLock();
          return [7];

        case 10:
          return [2];
      }
    });
  });
}

function isReadableStreamLike(obj) {
  return (0, _isFunction.isFunction)(obj === null || obj === void 0 ? void 0 : obj.getReader);
}
},{"tslib":"../node_modules/rxjs/node_modules/tslib/tslib.es6.js","./isFunction":"../node_modules/rxjs/dist/esm5/internal/util/isFunction.js"}],"C:/Users/dougl/AppData/Roaming/nvm/v14.17.0/node_modules/parcel-bundler/node_modules/process/browser.js":[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};
},{}],"../node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js":[function(require,module,exports) {

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.innerFrom = innerFrom;
exports.fromInteropObservable = fromInteropObservable;
exports.fromArrayLike = fromArrayLike;
exports.fromPromise = fromPromise;
exports.fromIterable = fromIterable;
exports.fromAsyncIterable = fromAsyncIterable;
exports.fromReadableStreamLike = fromReadableStreamLike;

var _tslib = require("tslib");

var _isArrayLike = require("../util/isArrayLike");

var _isPromise = require("../util/isPromise");

var _Observable = require("../Observable");

var _isInteropObservable = require("../util/isInteropObservable");

var _isAsyncIterable = require("../util/isAsyncIterable");

var _throwUnobservableError = require("../util/throwUnobservableError");

var _isIterable = require("../util/isIterable");

var _isReadableStreamLike = require("../util/isReadableStreamLike");

var _isFunction = require("../util/isFunction");

var _reportUnhandledError = require("../util/reportUnhandledError");

var _observable = require("../symbol/observable");

function innerFrom(input) {
  if (input instanceof _Observable.Observable) {
    return input;
  }

  if (input != null) {
    if ((0, _isInteropObservable.isInteropObservable)(input)) {
      return fromInteropObservable(input);
    }

    if ((0, _isArrayLike.isArrayLike)(input)) {
      return fromArrayLike(input);
    }

    if ((0, _isPromise.isPromise)(input)) {
      return fromPromise(input);
    }

    if ((0, _isAsyncIterable.isAsyncIterable)(input)) {
      return fromAsyncIterable(input);
    }

    if ((0, _isIterable.isIterable)(input)) {
      return fromIterable(input);
    }

    if ((0, _isReadableStreamLike.isReadableStreamLike)(input)) {
      return fromReadableStreamLike(input);
    }
  }

  throw (0, _throwUnobservableError.createInvalidObservableTypeError)(input);
}

function fromInteropObservable(obj) {
  return new _Observable.Observable(function (subscriber) {
    var obs = obj[_observable.observable]();

    if ((0, _isFunction.isFunction)(obs.subscribe)) {
      return obs.subscribe(subscriber);
    }

    throw new TypeError('Provided object does not correctly implement Symbol.observable');
  });
}

function fromArrayLike(array) {
  return new _Observable.Observable(function (subscriber) {
    for (var i = 0; i < array.length && !subscriber.closed; i++) {
      subscriber.next(array[i]);
    }

    subscriber.complete();
  });
}

function fromPromise(promise) {
  return new _Observable.Observable(function (subscriber) {
    promise.then(function (value) {
      if (!subscriber.closed) {
        subscriber.next(value);
        subscriber.complete();
      }
    }, function (err) {
      return subscriber.error(err);
    }).then(null, _reportUnhandledError.reportUnhandledError);
  });
}

function fromIterable(iterable) {
  return new _Observable.Observable(function (subscriber) {
    var e_1, _a;

    try {
      for (var iterable_1 = (0, _tslib.__values)(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
        var value = iterable_1_1.value;
        subscriber.next(value);

        if (subscriber.closed) {
          return;
        }
      }
    } catch (e_1_1) {
      e_1 = {
        error: e_1_1
      };
    } finally {
      try {
        if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return)) _a.call(iterable_1);
      } finally {
        if (e_1) throw e_1.error;
      }
    }

    subscriber.complete();
  });
}

function fromAsyncIterable(asyncIterable) {
  return new _Observable.Observable(function (subscriber) {
    process(asyncIterable, subscriber).catch(function (err) {
      return subscriber.error(err);
    });
  });
}

function fromReadableStreamLike(readableStream) {
  return fromAsyncIterable((0, _isReadableStreamLike.readableStreamLikeToAsyncGenerator)(readableStream));
}

function process(asyncIterable, subscriber) {
  var asyncIterable_1, asyncIterable_1_1;

  var e_2, _a;

  return (0, _tslib.__awaiter)(this, void 0, void 0, function () {
    var value, e_2_1;
    return (0, _tslib.__generator)(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 5, 6, 11]);

          asyncIterable_1 = (0, _tslib.__asyncValues)(asyncIterable);
          _b.label = 1;

        case 1:
          return [4, asyncIterable_1.next()];

        case 2:
          if (!(asyncIterable_1_1 = _b.sent(), !asyncIterable_1_1.done)) return [3, 4];
          value = asyncIterable_1_1.value;
          subscriber.next(value);

          if (subscriber.closed) {
            return [2];
          }

          _b.label = 3;

        case 3:
          return [3, 1];

        case 4:
          return [3, 11];

        case 5:
          e_2_1 = _b.sent();
          e_2 = {
            error: e_2_1
          };
          return [3, 11];

        case 6:
          _b.trys.push([6,, 9, 10]);

          if (!(asyncIterable_1_1 && !asyncIterable_1_1.done && (_a = asyncIterable_1.return))) return [3, 8];
          return [4, _a.call(asyncIterable_1)];

        case 7:
          _b.sent();

          _b.label = 8;

        case 8:
          return [3, 10];

        case 9:
          if (e_2) throw e_2.error;
          return [7];

        case 10:
          return [7];

        case 11:
          subscriber.complete();
          return [2];
      }
    });
  });
}
},{"tslib":"../node_modules/rxjs/node_modules/tslib/tslib.es6.js","../util/isArrayLike":"../node_modules/rxjs/dist/esm5/internal/util/isArrayLike.js","../util/isPromise":"../node_modules/rxjs/dist/esm5/internal/util/isPromise.js","../Observable":"../node_modules/rxjs/dist/esm5/internal/Observable.js","../util/isInteropObservable":"../node_modules/rxjs/dist/esm5/internal/util/isInteropObservable.js","../util/isAsyncIterable":"../node_modules/rxjs/dist/esm5/internal/util/isAsyncIterable.js","../util/throwUnobservableError":"../node_modules/rxjs/dist/esm5/internal/util/throwUnobservableError.js","../util/isIterable":"../node_modules/rxjs/dist/esm5/internal/util/isIterable.js","../util/isReadableStreamLike":"../node_modules/rxjs/dist/esm5/internal/util/isReadableStreamLike.js","../util/isFunction":"../node_modules/rxjs/dist/esm5/internal/util/isFunction.js","../util/reportUnhandledError":"../node_modules/rxjs/dist/esm5/internal/util/reportUnhandledError.js","../symbol/observable":"../node_modules/rxjs/dist/esm5/internal/symbol/observable.js","process":"C:/Users/dougl/AppData/Roaming/nvm/v14.17.0/node_modules/parcel-bundler/node_modules/process/browser.js"}],"../node_modules/rxjs/dist/esm5/internal/util/executeSchedule.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.executeSchedule = executeSchedule;

function executeSchedule(parentSubscription, scheduler, work, delay, repeat) {
  if (delay === void 0) {
    delay = 0;
  }

  if (repeat === void 0) {
    repeat = false;
  }

  var scheduleSubscription = scheduler.schedule(function () {
    work();

    if (repeat) {
      parentSubscription.add(this.schedule(null, delay));
    } else {
      this.unsubscribe();
    }
  }, delay);
  parentSubscription.add(scheduleSubscription);

  if (!repeat) {
    return scheduleSubscription;
  }
}
},{}],"../node_modules/rxjs/dist/esm5/internal/operators/observeOn.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.observeOn = observeOn;

var _executeSchedule = require("../util/executeSchedule");

var _lift = require("../util/lift");

var _OperatorSubscriber = require("./OperatorSubscriber");

function observeOn(scheduler, delay) {
  if (delay === void 0) {
    delay = 0;
  }

  return (0, _lift.operate)(function (source, subscriber) {
    source.subscribe(new _OperatorSubscriber.OperatorSubscriber(subscriber, function (value) {
      return (0, _executeSchedule.executeSchedule)(subscriber, scheduler, function () {
        return subscriber.next(value);
      }, delay);
    }, function () {
      return (0, _executeSchedule.executeSchedule)(subscriber, scheduler, function () {
        return subscriber.complete();
      }, delay);
    }, function (err) {
      return (0, _executeSchedule.executeSchedule)(subscriber, scheduler, function () {
        return subscriber.error(err);
      }, delay);
    }));
  });
}
},{"../util/executeSchedule":"../node_modules/rxjs/dist/esm5/internal/util/executeSchedule.js","../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js","./OperatorSubscriber":"../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/subscribeOn.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.subscribeOn = subscribeOn;

var _lift = require("../util/lift");

function subscribeOn(scheduler, delay) {
  if (delay === void 0) {
    delay = 0;
  }

  return (0, _lift.operate)(function (source, subscriber) {
    subscriber.add(scheduler.schedule(function () {
      return source.subscribe(subscriber);
    }, delay));
  });
}
},{"../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js"}],"../node_modules/rxjs/dist/esm5/internal/scheduled/scheduleObservable.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scheduleObservable = scheduleObservable;

var _innerFrom = require("../observable/innerFrom");

var _observeOn = require("../operators/observeOn");

var _subscribeOn = require("../operators/subscribeOn");

function scheduleObservable(input, scheduler) {
  return (0, _innerFrom.innerFrom)(input).pipe((0, _subscribeOn.subscribeOn)(scheduler), (0, _observeOn.observeOn)(scheduler));
}
},{"../observable/innerFrom":"../node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js","../operators/observeOn":"../node_modules/rxjs/dist/esm5/internal/operators/observeOn.js","../operators/subscribeOn":"../node_modules/rxjs/dist/esm5/internal/operators/subscribeOn.js"}],"../node_modules/rxjs/dist/esm5/internal/scheduled/schedulePromise.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schedulePromise = schedulePromise;

var _innerFrom = require("../observable/innerFrom");

var _observeOn = require("../operators/observeOn");

var _subscribeOn = require("../operators/subscribeOn");

function schedulePromise(input, scheduler) {
  return (0, _innerFrom.innerFrom)(input).pipe((0, _subscribeOn.subscribeOn)(scheduler), (0, _observeOn.observeOn)(scheduler));
}
},{"../observable/innerFrom":"../node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js","../operators/observeOn":"../node_modules/rxjs/dist/esm5/internal/operators/observeOn.js","../operators/subscribeOn":"../node_modules/rxjs/dist/esm5/internal/operators/subscribeOn.js"}],"../node_modules/rxjs/dist/esm5/internal/scheduled/scheduleArray.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scheduleArray = scheduleArray;

var _Observable = require("../Observable");

function scheduleArray(input, scheduler) {
  return new _Observable.Observable(function (subscriber) {
    var i = 0;
    return scheduler.schedule(function () {
      if (i === input.length) {
        subscriber.complete();
      } else {
        subscriber.next(input[i++]);

        if (!subscriber.closed) {
          this.schedule();
        }
      }
    });
  });
}
},{"../Observable":"../node_modules/rxjs/dist/esm5/internal/Observable.js"}],"../node_modules/rxjs/dist/esm5/internal/scheduled/scheduleIterable.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scheduleIterable = scheduleIterable;

var _Observable = require("../Observable");

var _iterator = require("../symbol/iterator");

var _isFunction = require("../util/isFunction");

var _executeSchedule = require("../util/executeSchedule");

function scheduleIterable(input, scheduler) {
  return new _Observable.Observable(function (subscriber) {
    var iterator;
    (0, _executeSchedule.executeSchedule)(subscriber, scheduler, function () {
      iterator = input[_iterator.iterator]();
      (0, _executeSchedule.executeSchedule)(subscriber, scheduler, function () {
        var _a;

        var value;
        var done;

        try {
          _a = iterator.next(), value = _a.value, done = _a.done;
        } catch (err) {
          subscriber.error(err);
          return;
        }

        if (done) {
          subscriber.complete();
        } else {
          subscriber.next(value);
        }
      }, 0, true);
    });
    return function () {
      return (0, _isFunction.isFunction)(iterator === null || iterator === void 0 ? void 0 : iterator.return) && iterator.return();
    };
  });
}
},{"../Observable":"../node_modules/rxjs/dist/esm5/internal/Observable.js","../symbol/iterator":"../node_modules/rxjs/dist/esm5/internal/symbol/iterator.js","../util/isFunction":"../node_modules/rxjs/dist/esm5/internal/util/isFunction.js","../util/executeSchedule":"../node_modules/rxjs/dist/esm5/internal/util/executeSchedule.js"}],"../node_modules/rxjs/dist/esm5/internal/scheduled/scheduleAsyncIterable.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scheduleAsyncIterable = scheduleAsyncIterable;

var _Observable = require("../Observable");

var _executeSchedule = require("../util/executeSchedule");

function scheduleAsyncIterable(input, scheduler) {
  if (!input) {
    throw new Error('Iterable cannot be null');
  }

  return new _Observable.Observable(function (subscriber) {
    (0, _executeSchedule.executeSchedule)(subscriber, scheduler, function () {
      var iterator = input[Symbol.asyncIterator]();
      (0, _executeSchedule.executeSchedule)(subscriber, scheduler, function () {
        iterator.next().then(function (result) {
          if (result.done) {
            subscriber.complete();
          } else {
            subscriber.next(result.value);
          }
        });
      }, 0, true);
    });
  });
}
},{"../Observable":"../node_modules/rxjs/dist/esm5/internal/Observable.js","../util/executeSchedule":"../node_modules/rxjs/dist/esm5/internal/util/executeSchedule.js"}],"../node_modules/rxjs/dist/esm5/internal/scheduled/scheduleReadableStreamLike.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scheduleReadableStreamLike = scheduleReadableStreamLike;

var _scheduleAsyncIterable = require("./scheduleAsyncIterable");

var _isReadableStreamLike = require("../util/isReadableStreamLike");

function scheduleReadableStreamLike(input, scheduler) {
  return (0, _scheduleAsyncIterable.scheduleAsyncIterable)((0, _isReadableStreamLike.readableStreamLikeToAsyncGenerator)(input), scheduler);
}
},{"./scheduleAsyncIterable":"../node_modules/rxjs/dist/esm5/internal/scheduled/scheduleAsyncIterable.js","../util/isReadableStreamLike":"../node_modules/rxjs/dist/esm5/internal/util/isReadableStreamLike.js"}],"../node_modules/rxjs/dist/esm5/internal/scheduled/scheduled.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scheduled = scheduled;

var _scheduleObservable = require("./scheduleObservable");

var _schedulePromise = require("./schedulePromise");

var _scheduleArray = require("./scheduleArray");

var _scheduleIterable = require("./scheduleIterable");

var _scheduleAsyncIterable = require("./scheduleAsyncIterable");

var _isInteropObservable = require("../util/isInteropObservable");

var _isPromise = require("../util/isPromise");

var _isArrayLike = require("../util/isArrayLike");

var _isIterable = require("../util/isIterable");

var _isAsyncIterable = require("../util/isAsyncIterable");

var _throwUnobservableError = require("../util/throwUnobservableError");

var _isReadableStreamLike = require("../util/isReadableStreamLike");

var _scheduleReadableStreamLike = require("./scheduleReadableStreamLike");

function scheduled(input, scheduler) {
  if (input != null) {
    if ((0, _isInteropObservable.isInteropObservable)(input)) {
      return (0, _scheduleObservable.scheduleObservable)(input, scheduler);
    }

    if ((0, _isArrayLike.isArrayLike)(input)) {
      return (0, _scheduleArray.scheduleArray)(input, scheduler);
    }

    if ((0, _isPromise.isPromise)(input)) {
      return (0, _schedulePromise.schedulePromise)(input, scheduler);
    }

    if ((0, _isAsyncIterable.isAsyncIterable)(input)) {
      return (0, _scheduleAsyncIterable.scheduleAsyncIterable)(input, scheduler);
    }

    if ((0, _isIterable.isIterable)(input)) {
      return (0, _scheduleIterable.scheduleIterable)(input, scheduler);
    }

    if ((0, _isReadableStreamLike.isReadableStreamLike)(input)) {
      return (0, _scheduleReadableStreamLike.scheduleReadableStreamLike)(input, scheduler);
    }
  }

  throw (0, _throwUnobservableError.createInvalidObservableTypeError)(input);
}
},{"./scheduleObservable":"../node_modules/rxjs/dist/esm5/internal/scheduled/scheduleObservable.js","./schedulePromise":"../node_modules/rxjs/dist/esm5/internal/scheduled/schedulePromise.js","./scheduleArray":"../node_modules/rxjs/dist/esm5/internal/scheduled/scheduleArray.js","./scheduleIterable":"../node_modules/rxjs/dist/esm5/internal/scheduled/scheduleIterable.js","./scheduleAsyncIterable":"../node_modules/rxjs/dist/esm5/internal/scheduled/scheduleAsyncIterable.js","../util/isInteropObservable":"../node_modules/rxjs/dist/esm5/internal/util/isInteropObservable.js","../util/isPromise":"../node_modules/rxjs/dist/esm5/internal/util/isPromise.js","../util/isArrayLike":"../node_modules/rxjs/dist/esm5/internal/util/isArrayLike.js","../util/isIterable":"../node_modules/rxjs/dist/esm5/internal/util/isIterable.js","../util/isAsyncIterable":"../node_modules/rxjs/dist/esm5/internal/util/isAsyncIterable.js","../util/throwUnobservableError":"../node_modules/rxjs/dist/esm5/internal/util/throwUnobservableError.js","../util/isReadableStreamLike":"../node_modules/rxjs/dist/esm5/internal/util/isReadableStreamLike.js","./scheduleReadableStreamLike":"../node_modules/rxjs/dist/esm5/internal/scheduled/scheduleReadableStreamLike.js"}],"../node_modules/rxjs/dist/esm5/internal/observable/from.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.from = from;

var _scheduled = require("../scheduled/scheduled");

var _innerFrom = require("./innerFrom");

function from(input, scheduler) {
  return scheduler ? (0, _scheduled.scheduled)(input, scheduler) : (0, _innerFrom.innerFrom)(input);
}
},{"../scheduled/scheduled":"../node_modules/rxjs/dist/esm5/internal/scheduled/scheduled.js","./innerFrom":"../node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js"}],"../node_modules/rxjs/dist/esm5/internal/observable/of.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.of = of;

var _args = require("../util/args");

var _from = require("./from");

function of() {
  var args = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }

  var scheduler = (0, _args.popScheduler)(args);
  return (0, _from.from)(args, scheduler);
}
},{"../util/args":"../node_modules/rxjs/dist/esm5/internal/util/args.js","./from":"../node_modules/rxjs/dist/esm5/internal/observable/from.js"}],"../node_modules/rxjs/dist/esm5/internal/observable/throwError.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.throwError = throwError;

var _Observable = require("../Observable");

var _isFunction = require("../util/isFunction");

function throwError(errorOrErrorFactory, scheduler) {
  var errorFactory = (0, _isFunction.isFunction)(errorOrErrorFactory) ? errorOrErrorFactory : function () {
    return errorOrErrorFactory;
  };

  var init = function (subscriber) {
    return subscriber.error(errorFactory());
  };

  return new _Observable.Observable(scheduler ? function (subscriber) {
    return scheduler.schedule(init, 0, subscriber);
  } : init);
}
},{"../Observable":"../node_modules/rxjs/dist/esm5/internal/Observable.js","../util/isFunction":"../node_modules/rxjs/dist/esm5/internal/util/isFunction.js"}],"../node_modules/rxjs/dist/esm5/internal/Notification.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.observeNotification = observeNotification;
exports.Notification = exports.NotificationKind = void 0;

var _empty = require("./observable/empty");

var _of = require("./observable/of");

var _throwError = require("./observable/throwError");

var _isFunction = require("./util/isFunction");

var NotificationKind;
exports.NotificationKind = NotificationKind;

(function (NotificationKind) {
  NotificationKind["NEXT"] = "N";
  NotificationKind["ERROR"] = "E";
  NotificationKind["COMPLETE"] = "C";
})(NotificationKind || (exports.NotificationKind = NotificationKind = {}));

var Notification = function () {
  function Notification(kind, value, error) {
    this.kind = kind;
    this.value = value;
    this.error = error;
    this.hasValue = kind === 'N';
  }

  Notification.prototype.observe = function (observer) {
    return observeNotification(this, observer);
  };

  Notification.prototype.do = function (nextHandler, errorHandler, completeHandler) {
    var _a = this,
        kind = _a.kind,
        value = _a.value,
        error = _a.error;

    return kind === 'N' ? nextHandler === null || nextHandler === void 0 ? void 0 : nextHandler(value) : kind === 'E' ? errorHandler === null || errorHandler === void 0 ? void 0 : errorHandler(error) : completeHandler === null || completeHandler === void 0 ? void 0 : completeHandler();
  };

  Notification.prototype.accept = function (nextOrObserver, error, complete) {
    var _a;

    return (0, _isFunction.isFunction)((_a = nextOrObserver) === null || _a === void 0 ? void 0 : _a.next) ? this.observe(nextOrObserver) : this.do(nextOrObserver, error, complete);
  };

  Notification.prototype.toObservable = function () {
    var _a = this,
        kind = _a.kind,
        value = _a.value,
        error = _a.error;

    var result = kind === 'N' ? (0, _of.of)(value) : kind === 'E' ? (0, _throwError.throwError)(function () {
      return error;
    }) : kind === 'C' ? _empty.EMPTY : 0;

    if (!result) {
      throw new TypeError("Unexpected notification kind " + kind);
    }

    return result;
  };

  Notification.createNext = function (value) {
    return new Notification('N', value);
  };

  Notification.createError = function (err) {
    return new Notification('E', undefined, err);
  };

  Notification.createComplete = function () {
    return Notification.completeNotification;
  };

  Notification.completeNotification = new Notification('C');
  return Notification;
}();

exports.Notification = Notification;

function observeNotification(notification, observer) {
  var _a, _b, _c;

  var _d = notification,
      kind = _d.kind,
      value = _d.value,
      error = _d.error;

  if (typeof kind !== 'string') {
    throw new TypeError('Invalid notification, missing "kind"');
  }

  kind === 'N' ? (_a = observer.next) === null || _a === void 0 ? void 0 : _a.call(observer, value) : kind === 'E' ? (_b = observer.error) === null || _b === void 0 ? void 0 : _b.call(observer, error) : (_c = observer.complete) === null || _c === void 0 ? void 0 : _c.call(observer);
}
},{"./observable/empty":"../node_modules/rxjs/dist/esm5/internal/observable/empty.js","./observable/of":"../node_modules/rxjs/dist/esm5/internal/observable/of.js","./observable/throwError":"../node_modules/rxjs/dist/esm5/internal/observable/throwError.js","./util/isFunction":"../node_modules/rxjs/dist/esm5/internal/util/isFunction.js"}],"../node_modules/rxjs/dist/esm5/internal/util/isObservable.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isObservable = isObservable;

var _Observable = require("../Observable");

var _isFunction = require("./isFunction");

function isObservable(obj) {
  return !!obj && (obj instanceof _Observable.Observable || (0, _isFunction.isFunction)(obj.lift) && (0, _isFunction.isFunction)(obj.subscribe));
}
},{"../Observable":"../node_modules/rxjs/dist/esm5/internal/Observable.js","./isFunction":"../node_modules/rxjs/dist/esm5/internal/util/isFunction.js"}],"../node_modules/rxjs/dist/esm5/internal/util/EmptyError.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EmptyError = void 0;

var _createErrorClass = require("./createErrorClass");

var EmptyError = (0, _createErrorClass.createErrorClass)(function (_super) {
  return function EmptyErrorImpl() {
    _super(this);

    this.name = 'EmptyError';
    this.message = 'no elements in sequence';
  };
});
exports.EmptyError = EmptyError;
},{"./createErrorClass":"../node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js"}],"../node_modules/rxjs/dist/esm5/internal/lastValueFrom.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.lastValueFrom = lastValueFrom;

var _EmptyError = require("./util/EmptyError");

function lastValueFrom(source, config) {
  var hasConfig = typeof config === 'object';
  return new Promise(function (resolve, reject) {
    var _hasValue = false;

    var _value;

    source.subscribe({
      next: function (value) {
        _value = value;
        _hasValue = true;
      },
      error: reject,
      complete: function () {
        if (_hasValue) {
          resolve(_value);
        } else if (hasConfig) {
          resolve(config.defaultValue);
        } else {
          reject(new _EmptyError.EmptyError());
        }
      }
    });
  });
}
},{"./util/EmptyError":"../node_modules/rxjs/dist/esm5/internal/util/EmptyError.js"}],"../node_modules/rxjs/dist/esm5/internal/firstValueFrom.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.firstValueFrom = firstValueFrom;

var _EmptyError = require("./util/EmptyError");

var _Subscriber = require("./Subscriber");

function firstValueFrom(source, config) {
  var hasConfig = typeof config === 'object';
  return new Promise(function (resolve, reject) {
    var subscriber = new _Subscriber.SafeSubscriber({
      next: function (value) {
        resolve(value);
        subscriber.unsubscribe();
      },
      error: reject,
      complete: function () {
        if (hasConfig) {
          resolve(config.defaultValue);
        } else {
          reject(new _EmptyError.EmptyError());
        }
      }
    });
    source.subscribe(subscriber);
  });
}
},{"./util/EmptyError":"../node_modules/rxjs/dist/esm5/internal/util/EmptyError.js","./Subscriber":"../node_modules/rxjs/dist/esm5/internal/Subscriber.js"}],"../node_modules/rxjs/dist/esm5/internal/util/ArgumentOutOfRangeError.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArgumentOutOfRangeError = void 0;

var _createErrorClass = require("./createErrorClass");

var ArgumentOutOfRangeError = (0, _createErrorClass.createErrorClass)(function (_super) {
  return function ArgumentOutOfRangeErrorImpl() {
    _super(this);

    this.name = 'ArgumentOutOfRangeError';
    this.message = 'argument out of range';
  };
});
exports.ArgumentOutOfRangeError = ArgumentOutOfRangeError;
},{"./createErrorClass":"../node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js"}],"../node_modules/rxjs/dist/esm5/internal/util/NotFoundError.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NotFoundError = void 0;

var _createErrorClass = require("./createErrorClass");

var NotFoundError = (0, _createErrorClass.createErrorClass)(function (_super) {
  return function NotFoundErrorImpl(message) {
    _super(this);

    this.name = 'NotFoundError';
    this.message = message;
  };
});
exports.NotFoundError = NotFoundError;
},{"./createErrorClass":"../node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js"}],"../node_modules/rxjs/dist/esm5/internal/util/SequenceError.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SequenceError = void 0;

var _createErrorClass = require("./createErrorClass");

var SequenceError = (0, _createErrorClass.createErrorClass)(function (_super) {
  return function SequenceErrorImpl(message) {
    _super(this);

    this.name = 'SequenceError';
    this.message = message;
  };
});
exports.SequenceError = SequenceError;
},{"./createErrorClass":"../node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js"}],"../node_modules/rxjs/dist/esm5/internal/util/isDate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isValidDate = isValidDate;

function isValidDate(value) {
  return value instanceof Date && !isNaN(value);
}
},{}],"../node_modules/rxjs/dist/esm5/internal/operators/timeout.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timeout = timeout;
exports.TimeoutError = void 0;

var _async = require("../scheduler/async");

var _isDate = require("../util/isDate");

var _lift = require("../util/lift");

var _innerFrom = require("../observable/innerFrom");

var _createErrorClass = require("../util/createErrorClass");

var _OperatorSubscriber = require("./OperatorSubscriber");

var _executeSchedule = require("../util/executeSchedule");

var TimeoutError = (0, _createErrorClass.createErrorClass)(function (_super) {
  return function TimeoutErrorImpl(info) {
    if (info === void 0) {
      info = null;
    }

    _super(this);

    this.message = 'Timeout has occurred';
    this.name = 'TimeoutError';
    this.info = info;
  };
});
exports.TimeoutError = TimeoutError;

function timeout(config, schedulerArg) {
  var _a = (0, _isDate.isValidDate)(config) ? {
    first: config
  } : typeof config === 'number' ? {
    each: config
  } : config,
      first = _a.first,
      each = _a.each,
      _b = _a.with,
      _with = _b === void 0 ? timeoutErrorFactory : _b,
      _c = _a.scheduler,
      scheduler = _c === void 0 ? schedulerArg !== null && schedulerArg !== void 0 ? schedulerArg : _async.asyncScheduler : _c,
      _d = _a.meta,
      meta = _d === void 0 ? null : _d;

  if (first == null && each == null) {
    throw new TypeError('No timeout provided.');
  }

  return (0, _lift.operate)(function (source, subscriber) {
    var originalSourceSubscription;
    var timerSubscription;
    var lastValue = null;
    var seen = 0;

    var startTimer = function (delay) {
      timerSubscription = (0, _executeSchedule.executeSchedule)(subscriber, scheduler, function () {
        try {
          originalSourceSubscription.unsubscribe();
          (0, _innerFrom.innerFrom)(_with({
            meta: meta,
            lastValue: lastValue,
            seen: seen
          })).subscribe(subscriber);
        } catch (err) {
          subscriber.error(err);
        }
      }, delay);
    };

    originalSourceSubscription = source.subscribe(new _OperatorSubscriber.OperatorSubscriber(subscriber, function (value) {
      timerSubscription === null || timerSubscription === void 0 ? void 0 : timerSubscription.unsubscribe();
      seen++;
      subscriber.next(lastValue = value);
      each > 0 && startTimer(each);
    }, undefined, undefined, function () {
      if (!(timerSubscription === null || timerSubscription === void 0 ? void 0 : timerSubscription.closed)) {
        timerSubscription === null || timerSubscription === void 0 ? void 0 : timerSubscription.unsubscribe();
      }

      lastValue = null;
    }));
    startTimer(first != null ? typeof first === 'number' ? first : +first - scheduler.now() : each);
  });
}

function timeoutErrorFactory(info) {
  throw new TimeoutError(info);
}
},{"../scheduler/async":"../node_modules/rxjs/dist/esm5/internal/scheduler/async.js","../util/isDate":"../node_modules/rxjs/dist/esm5/internal/util/isDate.js","../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js","../observable/innerFrom":"../node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js","../util/createErrorClass":"../node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js","./OperatorSubscriber":"../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js","../util/executeSchedule":"../node_modules/rxjs/dist/esm5/internal/util/executeSchedule.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/map.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.map = map;

var _lift = require("../util/lift");

var _OperatorSubscriber = require("./OperatorSubscriber");

function map(project, thisArg) {
  return (0, _lift.operate)(function (source, subscriber) {
    var index = 0;
    source.subscribe(new _OperatorSubscriber.OperatorSubscriber(subscriber, function (value) {
      subscriber.next(project.call(thisArg, value, index++));
    }));
  });
}
},{"../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js","./OperatorSubscriber":"../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js"}],"../node_modules/rxjs/dist/esm5/internal/util/mapOneOrManyArgs.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapOneOrManyArgs = mapOneOrManyArgs;

var _tslib = require("tslib");

var _map = require("../operators/map");

var isArray = Array.isArray;

function callOrApply(fn, args) {
  return isArray(args) ? fn.apply(void 0, (0, _tslib.__spreadArray)([], (0, _tslib.__read)(args), false)) : fn(args);
}

function mapOneOrManyArgs(fn) {
  return (0, _map.map)(function (args) {
    return callOrApply(fn, args);
  });
}
},{"tslib":"../node_modules/rxjs/node_modules/tslib/tslib.es6.js","../operators/map":"../node_modules/rxjs/dist/esm5/internal/operators/map.js"}],"../node_modules/rxjs/dist/esm5/internal/observable/bindCallbackInternals.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bindCallbackInternals = bindCallbackInternals;

var _tslib = require("tslib");

var _isScheduler = require("../util/isScheduler");

var _Observable = require("../Observable");

var _subscribeOn = require("../operators/subscribeOn");

var _mapOneOrManyArgs = require("../util/mapOneOrManyArgs");

var _observeOn = require("../operators/observeOn");

var _AsyncSubject = require("../AsyncSubject");

function bindCallbackInternals(isNodeStyle, callbackFunc, resultSelector, scheduler) {
  if (resultSelector) {
    if ((0, _isScheduler.isScheduler)(resultSelector)) {
      scheduler = resultSelector;
    } else {
      return function () {
        var args = [];

        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }

        return bindCallbackInternals(isNodeStyle, callbackFunc, scheduler).apply(this, args).pipe((0, _mapOneOrManyArgs.mapOneOrManyArgs)(resultSelector));
      };
    }
  }

  if (scheduler) {
    return function () {
      var args = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }

      return bindCallbackInternals(isNodeStyle, callbackFunc).apply(this, args).pipe((0, _subscribeOn.subscribeOn)(scheduler), (0, _observeOn.observeOn)(scheduler));
    };
  }

  return function () {
    var _this = this;

    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    var subject = new _AsyncSubject.AsyncSubject();
    var uninitialized = true;
    return new _Observable.Observable(function (subscriber) {
      var subs = subject.subscribe(subscriber);

      if (uninitialized) {
        uninitialized = false;
        var isAsync_1 = false;
        var isComplete_1 = false;
        callbackFunc.apply(_this, (0, _tslib.__spreadArray)((0, _tslib.__spreadArray)([], (0, _tslib.__read)(args), false), [function () {
          var results = [];

          for (var _i = 0; _i < arguments.length; _i++) {
            results[_i] = arguments[_i];
          }

          if (isNodeStyle) {
            var err = results.shift();

            if (err != null) {
              subject.error(err);
              return;
            }
          }

          subject.next(1 < results.length ? results : results[0]);
          isComplete_1 = true;

          if (isAsync_1) {
            subject.complete();
          }
        }], false));

        if (isComplete_1) {
          subject.complete();
        }

        isAsync_1 = true;
      }

      return subs;
    });
  };
}
},{"tslib":"../node_modules/rxjs/node_modules/tslib/tslib.es6.js","../util/isScheduler":"../node_modules/rxjs/dist/esm5/internal/util/isScheduler.js","../Observable":"../node_modules/rxjs/dist/esm5/internal/Observable.js","../operators/subscribeOn":"../node_modules/rxjs/dist/esm5/internal/operators/subscribeOn.js","../util/mapOneOrManyArgs":"../node_modules/rxjs/dist/esm5/internal/util/mapOneOrManyArgs.js","../operators/observeOn":"../node_modules/rxjs/dist/esm5/internal/operators/observeOn.js","../AsyncSubject":"../node_modules/rxjs/dist/esm5/internal/AsyncSubject.js"}],"../node_modules/rxjs/dist/esm5/internal/observable/bindCallback.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bindCallback = bindCallback;

var _bindCallbackInternals = require("./bindCallbackInternals");

function bindCallback(callbackFunc, resultSelector, scheduler) {
  return (0, _bindCallbackInternals.bindCallbackInternals)(false, callbackFunc, resultSelector, scheduler);
}
},{"./bindCallbackInternals":"../node_modules/rxjs/dist/esm5/internal/observable/bindCallbackInternals.js"}],"../node_modules/rxjs/dist/esm5/internal/observable/bindNodeCallback.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bindNodeCallback = bindNodeCallback;

var _bindCallbackInternals = require("./bindCallbackInternals");

function bindNodeCallback(callbackFunc, resultSelector, scheduler) {
  return (0, _bindCallbackInternals.bindCallbackInternals)(true, callbackFunc, resultSelector, scheduler);
}
},{"./bindCallbackInternals":"../node_modules/rxjs/dist/esm5/internal/observable/bindCallbackInternals.js"}],"../node_modules/rxjs/dist/esm5/internal/util/argsArgArrayOrObject.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.argsArgArrayOrObject = argsArgArrayOrObject;
var isArray = Array.isArray;
var getPrototypeOf = Object.getPrototypeOf,
    objectProto = Object.prototype,
    getKeys = Object.keys;

function argsArgArrayOrObject(args) {
  if (args.length === 1) {
    var first_1 = args[0];

    if (isArray(first_1)) {
      return {
        args: first_1,
        keys: null
      };
    }

    if (isPOJO(first_1)) {
      var keys = getKeys(first_1);
      return {
        args: keys.map(function (key) {
          return first_1[key];
        }),
        keys: keys
      };
    }
  }

  return {
    args: args,
    keys: null
  };
}

function isPOJO(obj) {
  return obj && typeof obj === 'object' && getPrototypeOf(obj) === objectProto;
}
},{}],"../node_modules/rxjs/dist/esm5/internal/util/createObject.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createObject = createObject;

function createObject(keys, values) {
  return keys.reduce(function (result, key, i) {
    return result[key] = values[i], result;
  }, {});
}
},{}],"../node_modules/rxjs/dist/esm5/internal/observable/combineLatest.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.combineLatest = combineLatest;
exports.combineLatestInit = combineLatestInit;

var _Observable = require("../Observable");

var _argsArgArrayOrObject = require("../util/argsArgArrayOrObject");

var _from = require("./from");

var _identity = require("../util/identity");

var _mapOneOrManyArgs = require("../util/mapOneOrManyArgs");

var _args = require("../util/args");

var _createObject = require("../util/createObject");

var _OperatorSubscriber = require("../operators/OperatorSubscriber");

var _executeSchedule = require("../util/executeSchedule");

function combineLatest() {
  var args = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }

  var scheduler = (0, _args.popScheduler)(args);
  var resultSelector = (0, _args.popResultSelector)(args);

  var _a = (0, _argsArgArrayOrObject.argsArgArrayOrObject)(args),
      observables = _a.args,
      keys = _a.keys;

  if (observables.length === 0) {
    return (0, _from.from)([], scheduler);
  }

  var result = new _Observable.Observable(combineLatestInit(observables, scheduler, keys ? function (values) {
    return (0, _createObject.createObject)(keys, values);
  } : _identity.identity));
  return resultSelector ? result.pipe((0, _mapOneOrManyArgs.mapOneOrManyArgs)(resultSelector)) : result;
}

function combineLatestInit(observables, scheduler, valueTransform) {
  if (valueTransform === void 0) {
    valueTransform = _identity.identity;
  }

  return function (subscriber) {
    maybeSchedule(scheduler, function () {
      var length = observables.length;
      var values = new Array(length);
      var active = length;
      var remainingFirstValues = length;

      var _loop_1 = function (i) {
        maybeSchedule(scheduler, function () {
          var source = (0, _from.from)(observables[i], scheduler);
          var hasFirstValue = false;
          source.subscribe(new _OperatorSubscriber.OperatorSubscriber(subscriber, function (value) {
            values[i] = value;

            if (!hasFirstValue) {
              hasFirstValue = true;
              remainingFirstValues--;
            }

            if (!remainingFirstValues) {
              subscriber.next(valueTransform(values.slice()));
            }
          }, function () {
            if (! --active) {
              subscriber.complete();
            }
          }));
        }, subscriber);
      };

      for (var i = 0; i < length; i++) {
        _loop_1(i);
      }
    }, subscriber);
  };
}

function maybeSchedule(scheduler, execute, subscription) {
  if (scheduler) {
    (0, _executeSchedule.executeSchedule)(subscription, scheduler, execute);
  } else {
    execute();
  }
}
},{"../Observable":"../node_modules/rxjs/dist/esm5/internal/Observable.js","../util/argsArgArrayOrObject":"../node_modules/rxjs/dist/esm5/internal/util/argsArgArrayOrObject.js","./from":"../node_modules/rxjs/dist/esm5/internal/observable/from.js","../util/identity":"../node_modules/rxjs/dist/esm5/internal/util/identity.js","../util/mapOneOrManyArgs":"../node_modules/rxjs/dist/esm5/internal/util/mapOneOrManyArgs.js","../util/args":"../node_modules/rxjs/dist/esm5/internal/util/args.js","../util/createObject":"../node_modules/rxjs/dist/esm5/internal/util/createObject.js","../operators/OperatorSubscriber":"../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js","../util/executeSchedule":"../node_modules/rxjs/dist/esm5/internal/util/executeSchedule.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/mergeInternals.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeInternals = mergeInternals;

var _innerFrom = require("../observable/innerFrom");

var _executeSchedule = require("../util/executeSchedule");

var _OperatorSubscriber = require("./OperatorSubscriber");

function mergeInternals(source, subscriber, project, concurrent, onBeforeNext, expand, innerSubScheduler, additionalTeardown) {
  var buffer = [];
  var active = 0;
  var index = 0;
  var isComplete = false;

  var checkComplete = function () {
    if (isComplete && !buffer.length && !active) {
      subscriber.complete();
    }
  };

  var outerNext = function (value) {
    return active < concurrent ? doInnerSub(value) : buffer.push(value);
  };

  var doInnerSub = function (value) {
    expand && subscriber.next(value);
    active++;
    var innerComplete = false;
    (0, _innerFrom.innerFrom)(project(value, index++)).subscribe(new _OperatorSubscriber.OperatorSubscriber(subscriber, function (innerValue) {
      onBeforeNext === null || onBeforeNext === void 0 ? void 0 : onBeforeNext(innerValue);

      if (expand) {
        outerNext(innerValue);
      } else {
        subscriber.next(innerValue);
      }
    }, function () {
      innerComplete = true;
    }, undefined, function () {
      if (innerComplete) {
        try {
          active--;

          var _loop_1 = function () {
            var bufferedValue = buffer.shift();

            if (innerSubScheduler) {
              (0, _executeSchedule.executeSchedule)(subscriber, innerSubScheduler, function () {
                return doInnerSub(bufferedValue);
              });
            } else {
              doInnerSub(bufferedValue);
            }
          };

          while (buffer.length && active < concurrent) {
            _loop_1();
          }

          checkComplete();
        } catch (err) {
          subscriber.error(err);
        }
      }
    }));
  };

  source.subscribe(new _OperatorSubscriber.OperatorSubscriber(subscriber, outerNext, function () {
    isComplete = true;
    checkComplete();
  }));
  return function () {
    additionalTeardown === null || additionalTeardown === void 0 ? void 0 : additionalTeardown();
  };
}
},{"../observable/innerFrom":"../node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js","../util/executeSchedule":"../node_modules/rxjs/dist/esm5/internal/util/executeSchedule.js","./OperatorSubscriber":"../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/mergeMap.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeMap = mergeMap;

var _map = require("./map");

var _innerFrom = require("../observable/innerFrom");

var _lift = require("../util/lift");

var _mergeInternals = require("./mergeInternals");

var _isFunction = require("../util/isFunction");

function mergeMap(project, resultSelector, concurrent) {
  if (concurrent === void 0) {
    concurrent = Infinity;
  }

  if ((0, _isFunction.isFunction)(resultSelector)) {
    return mergeMap(function (a, i) {
      return (0, _map.map)(function (b, ii) {
        return resultSelector(a, b, i, ii);
      })((0, _innerFrom.innerFrom)(project(a, i)));
    }, concurrent);
  } else if (typeof resultSelector === 'number') {
    concurrent = resultSelector;
  }

  return (0, _lift.operate)(function (source, subscriber) {
    return (0, _mergeInternals.mergeInternals)(source, subscriber, project, concurrent);
  });
}
},{"./map":"../node_modules/rxjs/dist/esm5/internal/operators/map.js","../observable/innerFrom":"../node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js","../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js","./mergeInternals":"../node_modules/rxjs/dist/esm5/internal/operators/mergeInternals.js","../util/isFunction":"../node_modules/rxjs/dist/esm5/internal/util/isFunction.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/mergeAll.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeAll = mergeAll;

var _mergeMap = require("./mergeMap");

var _identity = require("../util/identity");

function mergeAll(concurrent) {
  if (concurrent === void 0) {
    concurrent = Infinity;
  }

  return (0, _mergeMap.mergeMap)(_identity.identity, concurrent);
}
},{"./mergeMap":"../node_modules/rxjs/dist/esm5/internal/operators/mergeMap.js","../util/identity":"../node_modules/rxjs/dist/esm5/internal/util/identity.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/concatAll.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.concatAll = concatAll;

var _mergeAll = require("./mergeAll");

function concatAll() {
  return (0, _mergeAll.mergeAll)(1);
}
},{"./mergeAll":"../node_modules/rxjs/dist/esm5/internal/operators/mergeAll.js"}],"../node_modules/rxjs/dist/esm5/internal/observable/concat.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.concat = concat;

var _concatAll = require("../operators/concatAll");

var _args = require("../util/args");

var _from = require("./from");

function concat() {
  var args = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }

  return (0, _concatAll.concatAll)()((0, _from.from)(args, (0, _args.popScheduler)(args)));
}
},{"../operators/concatAll":"../node_modules/rxjs/dist/esm5/internal/operators/concatAll.js","../util/args":"../node_modules/rxjs/dist/esm5/internal/util/args.js","./from":"../node_modules/rxjs/dist/esm5/internal/observable/from.js"}],"../node_modules/rxjs/dist/esm5/internal/observable/defer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defer = defer;

var _Observable = require("../Observable");

var _innerFrom = require("./innerFrom");

function defer(observableFactory) {
  return new _Observable.Observable(function (subscriber) {
    (0, _innerFrom.innerFrom)(observableFactory()).subscribe(subscriber);
  });
}
},{"../Observable":"../node_modules/rxjs/dist/esm5/internal/Observable.js","./innerFrom":"../node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js"}],"../node_modules/rxjs/dist/esm5/internal/observable/connectable.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectable = connectable;

var _Subject = require("../Subject");

var _Observable = require("../Observable");

var _defer = require("./defer");

var DEFAULT_CONFIG = {
  connector: function () {
    return new _Subject.Subject();
  },
  resetOnDisconnect: true
};

function connectable(source, config) {
  if (config === void 0) {
    config = DEFAULT_CONFIG;
  }

  var connection = null;
  var connector = config.connector,
      _a = config.resetOnDisconnect,
      resetOnDisconnect = _a === void 0 ? true : _a;
  var subject = connector();
  var result = new _Observable.Observable(function (subscriber) {
    return subject.subscribe(subscriber);
  });

  result.connect = function () {
    if (!connection || connection.closed) {
      connection = (0, _defer.defer)(function () {
        return source;
      }).subscribe(subject);

      if (resetOnDisconnect) {
        connection.add(function () {
          return subject = connector();
        });
      }
    }

    return connection;
  };

  return result;
}
},{"../Subject":"../node_modules/rxjs/dist/esm5/internal/Subject.js","../Observable":"../node_modules/rxjs/dist/esm5/internal/Observable.js","./defer":"../node_modules/rxjs/dist/esm5/internal/observable/defer.js"}],"../node_modules/rxjs/dist/esm5/internal/observable/forkJoin.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forkJoin = forkJoin;

var _Observable = require("../Observable");

var _argsArgArrayOrObject = require("../util/argsArgArrayOrObject");

var _innerFrom = require("./innerFrom");

var _args = require("../util/args");

var _OperatorSubscriber = require("../operators/OperatorSubscriber");

var _mapOneOrManyArgs = require("../util/mapOneOrManyArgs");

var _createObject = require("../util/createObject");

function forkJoin() {
  var args = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }

  var resultSelector = (0, _args.popResultSelector)(args);

  var _a = (0, _argsArgArrayOrObject.argsArgArrayOrObject)(args),
      sources = _a.args,
      keys = _a.keys;

  var result = new _Observable.Observable(function (subscriber) {
    var length = sources.length;

    if (!length) {
      subscriber.complete();
      return;
    }

    var values = new Array(length);
    var remainingCompletions = length;
    var remainingEmissions = length;

    var _loop_1 = function (sourceIndex) {
      var hasValue = false;
      (0, _innerFrom.innerFrom)(sources[sourceIndex]).subscribe(new _OperatorSubscriber.OperatorSubscriber(subscriber, function (value) {
        if (!hasValue) {
          hasValue = true;
          remainingEmissions--;
        }

        values[sourceIndex] = value;
      }, function () {
        return remainingCompletions--;
      }, undefined, function () {
        if (!remainingCompletions || !hasValue) {
          if (!remainingEmissions) {
            subscriber.next(keys ? (0, _createObject.createObject)(keys, values) : values);
          }

          subscriber.complete();
        }
      }));
    };

    for (var sourceIndex = 0; sourceIndex < length; sourceIndex++) {
      _loop_1(sourceIndex);
    }
  });
  return resultSelector ? result.pipe((0, _mapOneOrManyArgs.mapOneOrManyArgs)(resultSelector)) : result;
}
},{"../Observable":"../node_modules/rxjs/dist/esm5/internal/Observable.js","../util/argsArgArrayOrObject":"../node_modules/rxjs/dist/esm5/internal/util/argsArgArrayOrObject.js","./innerFrom":"../node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js","../util/args":"../node_modules/rxjs/dist/esm5/internal/util/args.js","../operators/OperatorSubscriber":"../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js","../util/mapOneOrManyArgs":"../node_modules/rxjs/dist/esm5/internal/util/mapOneOrManyArgs.js","../util/createObject":"../node_modules/rxjs/dist/esm5/internal/util/createObject.js"}],"../node_modules/rxjs/dist/esm5/internal/observable/fromEvent.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromEvent = fromEvent;

var _tslib = require("tslib");

var _innerFrom = require("../observable/innerFrom");

var _Observable = require("../Observable");

var _mergeMap = require("../operators/mergeMap");

var _isArrayLike = require("../util/isArrayLike");

var _isFunction = require("../util/isFunction");

var _mapOneOrManyArgs = require("../util/mapOneOrManyArgs");

var nodeEventEmitterMethods = ['addListener', 'removeListener'];
var eventTargetMethods = ['addEventListener', 'removeEventListener'];
var jqueryMethods = ['on', 'off'];

function fromEvent(target, eventName, options, resultSelector) {
  if ((0, _isFunction.isFunction)(options)) {
    resultSelector = options;
    options = undefined;
  }

  if (resultSelector) {
    return fromEvent(target, eventName, options).pipe((0, _mapOneOrManyArgs.mapOneOrManyArgs)(resultSelector));
  }

  var _a = (0, _tslib.__read)(isEventTarget(target) ? eventTargetMethods.map(function (methodName) {
    return function (handler) {
      return target[methodName](eventName, handler, options);
    };
  }) : isNodeStyleEventEmitter(target) ? nodeEventEmitterMethods.map(toCommonHandlerRegistry(target, eventName)) : isJQueryStyleEventEmitter(target) ? jqueryMethods.map(toCommonHandlerRegistry(target, eventName)) : [], 2),
      add = _a[0],
      remove = _a[1];

  if (!add) {
    if ((0, _isArrayLike.isArrayLike)(target)) {
      return (0, _mergeMap.mergeMap)(function (subTarget) {
        return fromEvent(subTarget, eventName, options);
      })((0, _innerFrom.innerFrom)(target));
    }
  }

  if (!add) {
    throw new TypeError('Invalid event target');
  }

  return new _Observable.Observable(function (subscriber) {
    var handler = function () {
      var args = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }

      return subscriber.next(1 < args.length ? args : args[0]);
    };

    add(handler);
    return function () {
      return remove(handler);
    };
  });
}

function toCommonHandlerRegistry(target, eventName) {
  return function (methodName) {
    return function (handler) {
      return target[methodName](eventName, handler);
    };
  };
}

function isNodeStyleEventEmitter(target) {
  return (0, _isFunction.isFunction)(target.addListener) && (0, _isFunction.isFunction)(target.removeListener);
}

function isJQueryStyleEventEmitter(target) {
  return (0, _isFunction.isFunction)(target.on) && (0, _isFunction.isFunction)(target.off);
}

function isEventTarget(target) {
  return (0, _isFunction.isFunction)(target.addEventListener) && (0, _isFunction.isFunction)(target.removeEventListener);
}
},{"tslib":"../node_modules/rxjs/node_modules/tslib/tslib.es6.js","../observable/innerFrom":"../node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js","../Observable":"../node_modules/rxjs/dist/esm5/internal/Observable.js","../operators/mergeMap":"../node_modules/rxjs/dist/esm5/internal/operators/mergeMap.js","../util/isArrayLike":"../node_modules/rxjs/dist/esm5/internal/util/isArrayLike.js","../util/isFunction":"../node_modules/rxjs/dist/esm5/internal/util/isFunction.js","../util/mapOneOrManyArgs":"../node_modules/rxjs/dist/esm5/internal/util/mapOneOrManyArgs.js"}],"../node_modules/rxjs/dist/esm5/internal/observable/fromEventPattern.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromEventPattern = fromEventPattern;

var _Observable = require("../Observable");

var _isFunction = require("../util/isFunction");

var _mapOneOrManyArgs = require("../util/mapOneOrManyArgs");

function fromEventPattern(addHandler, removeHandler, resultSelector) {
  if (resultSelector) {
    return fromEventPattern(addHandler, removeHandler).pipe((0, _mapOneOrManyArgs.mapOneOrManyArgs)(resultSelector));
  }

  return new _Observable.Observable(function (subscriber) {
    var handler = function () {
      var e = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        e[_i] = arguments[_i];
      }

      return subscriber.next(e.length === 1 ? e[0] : e);
    };

    var retValue = addHandler(handler);
    return (0, _isFunction.isFunction)(removeHandler) ? function () {
      return removeHandler(handler, retValue);
    } : undefined;
  });
}
},{"../Observable":"../node_modules/rxjs/dist/esm5/internal/Observable.js","../util/isFunction":"../node_modules/rxjs/dist/esm5/internal/util/isFunction.js","../util/mapOneOrManyArgs":"../node_modules/rxjs/dist/esm5/internal/util/mapOneOrManyArgs.js"}],"../node_modules/rxjs/dist/esm5/internal/observable/generate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generate = generate;

var _tslib = require("tslib");

var _identity = require("../util/identity");

var _isScheduler = require("../util/isScheduler");

var _defer = require("./defer");

var _scheduleIterable = require("../scheduled/scheduleIterable");

function generate(initialStateOrOptions, condition, iterate, resultSelectorOrScheduler, scheduler) {
  var _a, _b;

  var resultSelector;
  var initialState;

  if (arguments.length === 1) {
    _a = initialStateOrOptions, initialState = _a.initialState, condition = _a.condition, iterate = _a.iterate, _b = _a.resultSelector, resultSelector = _b === void 0 ? _identity.identity : _b, scheduler = _a.scheduler;
  } else {
    initialState = initialStateOrOptions;

    if (!resultSelectorOrScheduler || (0, _isScheduler.isScheduler)(resultSelectorOrScheduler)) {
      resultSelector = _identity.identity;
      scheduler = resultSelectorOrScheduler;
    } else {
      resultSelector = resultSelectorOrScheduler;
    }
  }

  function gen() {
    var state;
    return (0, _tslib.__generator)(this, function (_a) {
      switch (_a.label) {
        case 0:
          state = initialState;
          _a.label = 1;

        case 1:
          if (!(!condition || condition(state))) return [3, 4];
          return [4, resultSelector(state)];

        case 2:
          _a.sent();

          _a.label = 3;

        case 3:
          state = iterate(state);
          return [3, 1];

        case 4:
          return [2];
      }
    });
  }

  return (0, _defer.defer)(scheduler ? function () {
    return (0, _scheduleIterable.scheduleIterable)(gen(), scheduler);
  } : gen);
}
},{"tslib":"../node_modules/rxjs/node_modules/tslib/tslib.es6.js","../util/identity":"../node_modules/rxjs/dist/esm5/internal/util/identity.js","../util/isScheduler":"../node_modules/rxjs/dist/esm5/internal/util/isScheduler.js","./defer":"../node_modules/rxjs/dist/esm5/internal/observable/defer.js","../scheduled/scheduleIterable":"../node_modules/rxjs/dist/esm5/internal/scheduled/scheduleIterable.js"}],"../node_modules/rxjs/dist/esm5/internal/observable/iif.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.iif = iif;

var _defer = require("./defer");

function iif(condition, trueResult, falseResult) {
  return (0, _defer.defer)(function () {
    return condition() ? trueResult : falseResult;
  });
}
},{"./defer":"../node_modules/rxjs/dist/esm5/internal/observable/defer.js"}],"../node_modules/rxjs/dist/esm5/internal/observable/timer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timer = timer;

var _Observable = require("../Observable");

var _async = require("../scheduler/async");

var _isScheduler = require("../util/isScheduler");

var _isDate = require("../util/isDate");

function timer(dueTime, intervalOrScheduler, scheduler) {
  if (dueTime === void 0) {
    dueTime = 0;
  }

  if (scheduler === void 0) {
    scheduler = _async.async;
  }

  var intervalDuration = -1;

  if (intervalOrScheduler != null) {
    if ((0, _isScheduler.isScheduler)(intervalOrScheduler)) {
      scheduler = intervalOrScheduler;
    } else {
      intervalDuration = intervalOrScheduler;
    }
  }

  return new _Observable.Observable(function (subscriber) {
    var due = (0, _isDate.isValidDate)(dueTime) ? +dueTime - scheduler.now() : dueTime;

    if (due < 0) {
      due = 0;
    }

    var n = 0;
    return scheduler.schedule(function () {
      if (!subscriber.closed) {
        subscriber.next(n++);

        if (0 <= intervalDuration) {
          this.schedule(undefined, intervalDuration);
        } else {
          subscriber.complete();
        }
      }
    }, due);
  });
}
},{"../Observable":"../node_modules/rxjs/dist/esm5/internal/Observable.js","../scheduler/async":"../node_modules/rxjs/dist/esm5/internal/scheduler/async.js","../util/isScheduler":"../node_modules/rxjs/dist/esm5/internal/util/isScheduler.js","../util/isDate":"../node_modules/rxjs/dist/esm5/internal/util/isDate.js"}],"../node_modules/rxjs/dist/esm5/internal/observable/interval.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.interval = interval;

var _async = require("../scheduler/async");

var _timer = require("./timer");

function interval(period, scheduler) {
  if (period === void 0) {
    period = 0;
  }

  if (scheduler === void 0) {
    scheduler = _async.asyncScheduler;
  }

  if (period < 0) {
    period = 0;
  }

  return (0, _timer.timer)(period, period, scheduler);
}
},{"../scheduler/async":"../node_modules/rxjs/dist/esm5/internal/scheduler/async.js","./timer":"../node_modules/rxjs/dist/esm5/internal/observable/timer.js"}],"../node_modules/rxjs/dist/esm5/internal/observable/merge.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.merge = merge;

var _mergeAll = require("../operators/mergeAll");

var _innerFrom = require("./innerFrom");

var _empty = require("./empty");

var _args = require("../util/args");

var _from = require("./from");

function merge() {
  var args = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }

  var scheduler = (0, _args.popScheduler)(args);
  var concurrent = (0, _args.popNumber)(args, Infinity);
  var sources = args;
  return !sources.length ? _empty.EMPTY : sources.length === 1 ? (0, _innerFrom.innerFrom)(sources[0]) : (0, _mergeAll.mergeAll)(concurrent)((0, _from.from)(sources, scheduler));
}
},{"../operators/mergeAll":"../node_modules/rxjs/dist/esm5/internal/operators/mergeAll.js","./innerFrom":"../node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js","./empty":"../node_modules/rxjs/dist/esm5/internal/observable/empty.js","../util/args":"../node_modules/rxjs/dist/esm5/internal/util/args.js","./from":"../node_modules/rxjs/dist/esm5/internal/observable/from.js"}],"../node_modules/rxjs/dist/esm5/internal/observable/never.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.never = never;
exports.NEVER = void 0;

var _Observable = require("../Observable");

var _noop = require("../util/noop");

var NEVER = new _Observable.Observable(_noop.noop);
exports.NEVER = NEVER;

function never() {
  return NEVER;
}
},{"../Observable":"../node_modules/rxjs/dist/esm5/internal/Observable.js","../util/noop":"../node_modules/rxjs/dist/esm5/internal/util/noop.js"}],"../node_modules/rxjs/dist/esm5/internal/util/argsOrArgArray.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.argsOrArgArray = argsOrArgArray;
var isArray = Array.isArray;

function argsOrArgArray(args) {
  return args.length === 1 && isArray(args[0]) ? args[0] : args;
}
},{}],"../node_modules/rxjs/dist/esm5/internal/operators/onErrorResumeNext.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onErrorResumeNext = onErrorResumeNext;

var _tslib = require("tslib");

var _lift = require("../util/lift");

var _innerFrom = require("../observable/innerFrom");

var _argsOrArgArray = require("../util/argsOrArgArray");

var _OperatorSubscriber = require("./OperatorSubscriber");

var _noop = require("../util/noop");

function onErrorResumeNext() {
  var sources = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    sources[_i] = arguments[_i];
  }

  var nextSources = (0, _argsOrArgArray.argsOrArgArray)(sources);
  return (0, _lift.operate)(function (source, subscriber) {
    var remaining = (0, _tslib.__spreadArray)([source], (0, _tslib.__read)(nextSources), false);

    var subscribeNext = function () {
      if (!subscriber.closed) {
        if (remaining.length > 0) {
          var nextSource = void 0;

          try {
            nextSource = (0, _innerFrom.innerFrom)(remaining.shift());
          } catch (err) {
            subscribeNext();
            return;
          }

          var innerSub = new _OperatorSubscriber.OperatorSubscriber(subscriber, undefined, _noop.noop, _noop.noop);
          subscriber.add(nextSource.subscribe(innerSub));
          innerSub.add(subscribeNext);
        } else {
          subscriber.complete();
        }
      }
    };

    subscribeNext();
  });
}
},{"tslib":"../node_modules/rxjs/node_modules/tslib/tslib.es6.js","../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js","../observable/innerFrom":"../node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js","../util/argsOrArgArray":"../node_modules/rxjs/dist/esm5/internal/util/argsOrArgArray.js","./OperatorSubscriber":"../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js","../util/noop":"../node_modules/rxjs/dist/esm5/internal/util/noop.js"}],"../node_modules/rxjs/dist/esm5/internal/observable/onErrorResumeNext.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onErrorResumeNext = onErrorResumeNext;

var _empty = require("./empty");

var _onErrorResumeNext = require("../operators/onErrorResumeNext");

var _argsOrArgArray = require("../util/argsOrArgArray");

function onErrorResumeNext() {
  var sources = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    sources[_i] = arguments[_i];
  }

  return (0, _onErrorResumeNext.onErrorResumeNext)((0, _argsOrArgArray.argsOrArgArray)(sources))(_empty.EMPTY);
}
},{"./empty":"../node_modules/rxjs/dist/esm5/internal/observable/empty.js","../operators/onErrorResumeNext":"../node_modules/rxjs/dist/esm5/internal/operators/onErrorResumeNext.js","../util/argsOrArgArray":"../node_modules/rxjs/dist/esm5/internal/util/argsOrArgArray.js"}],"../node_modules/rxjs/dist/esm5/internal/observable/pairs.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pairs = pairs;

var _from = require("./from");

function pairs(obj, scheduler) {
  return (0, _from.from)(Object.entries(obj), scheduler);
}
},{"./from":"../node_modules/rxjs/dist/esm5/internal/observable/from.js"}],"../node_modules/rxjs/dist/esm5/internal/util/not.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.not = not;

function not(pred, thisArg) {
  return function (value, index) {
    return !pred.call(thisArg, value, index);
  };
}
},{}],"../node_modules/rxjs/dist/esm5/internal/operators/filter.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filter = filter;

var _lift = require("../util/lift");

var _OperatorSubscriber = require("./OperatorSubscriber");

function filter(predicate, thisArg) {
  return (0, _lift.operate)(function (source, subscriber) {
    var index = 0;
    source.subscribe(new _OperatorSubscriber.OperatorSubscriber(subscriber, function (value) {
      return predicate.call(thisArg, value, index++) && subscriber.next(value);
    }));
  });
}
},{"../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js","./OperatorSubscriber":"../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js"}],"../node_modules/rxjs/dist/esm5/internal/observable/partition.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.partition = partition;

var _not = require("../util/not");

var _filter = require("../operators/filter");

var _innerFrom = require("./innerFrom");

function partition(source, predicate, thisArg) {
  return [(0, _filter.filter)(predicate, thisArg)((0, _innerFrom.innerFrom)(source)), (0, _filter.filter)((0, _not.not)(predicate, thisArg))((0, _innerFrom.innerFrom)(source))];
}
},{"../util/not":"../node_modules/rxjs/dist/esm5/internal/util/not.js","../operators/filter":"../node_modules/rxjs/dist/esm5/internal/operators/filter.js","./innerFrom":"../node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js"}],"../node_modules/rxjs/dist/esm5/internal/observable/race.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.race = race;
exports.raceInit = raceInit;

var _Observable = require("../Observable");

var _innerFrom = require("./innerFrom");

var _argsOrArgArray = require("../util/argsOrArgArray");

var _OperatorSubscriber = require("../operators/OperatorSubscriber");

function race() {
  var sources = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    sources[_i] = arguments[_i];
  }

  sources = (0, _argsOrArgArray.argsOrArgArray)(sources);
  return sources.length === 1 ? (0, _innerFrom.innerFrom)(sources[0]) : new _Observable.Observable(raceInit(sources));
}

function raceInit(sources) {
  return function (subscriber) {
    var subscriptions = [];

    var _loop_1 = function (i) {
      subscriptions.push((0, _innerFrom.innerFrom)(sources[i]).subscribe(new _OperatorSubscriber.OperatorSubscriber(subscriber, function (value) {
        if (subscriptions) {
          for (var s = 0; s < subscriptions.length; s++) {
            s !== i && subscriptions[s].unsubscribe();
          }

          subscriptions = null;
        }

        subscriber.next(value);
      })));
    };

    for (var i = 0; subscriptions && !subscriber.closed && i < sources.length; i++) {
      _loop_1(i);
    }
  };
}
},{"../Observable":"../node_modules/rxjs/dist/esm5/internal/Observable.js","./innerFrom":"../node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js","../util/argsOrArgArray":"../node_modules/rxjs/dist/esm5/internal/util/argsOrArgArray.js","../operators/OperatorSubscriber":"../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js"}],"../node_modules/rxjs/dist/esm5/internal/observable/range.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.range = range;

var _Observable = require("../Observable");

var _empty = require("./empty");

function range(start, count, scheduler) {
  if (count == null) {
    count = start;
    start = 0;
  }

  if (count <= 0) {
    return _empty.EMPTY;
  }

  var end = count + start;
  return new _Observable.Observable(scheduler ? function (subscriber) {
    var n = start;
    return scheduler.schedule(function () {
      if (n < end) {
        subscriber.next(n++);
        this.schedule();
      } else {
        subscriber.complete();
      }
    });
  } : function (subscriber) {
    var n = start;

    while (n < end && !subscriber.closed) {
      subscriber.next(n++);
    }

    subscriber.complete();
  });
}
},{"../Observable":"../node_modules/rxjs/dist/esm5/internal/Observable.js","./empty":"../node_modules/rxjs/dist/esm5/internal/observable/empty.js"}],"../node_modules/rxjs/dist/esm5/internal/observable/using.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.using = using;

var _Observable = require("../Observable");

var _innerFrom = require("./innerFrom");

var _empty = require("./empty");

function using(resourceFactory, observableFactory) {
  return new _Observable.Observable(function (subscriber) {
    var resource = resourceFactory();
    var result = observableFactory(resource);
    var source = result ? (0, _innerFrom.innerFrom)(result) : _empty.EMPTY;
    source.subscribe(subscriber);
    return function () {
      if (resource) {
        resource.unsubscribe();
      }
    };
  });
}
},{"../Observable":"../node_modules/rxjs/dist/esm5/internal/Observable.js","./innerFrom":"../node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js","./empty":"../node_modules/rxjs/dist/esm5/internal/observable/empty.js"}],"../node_modules/rxjs/dist/esm5/internal/observable/zip.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zip = zip;

var _tslib = require("tslib");

var _Observable = require("../Observable");

var _innerFrom = require("./innerFrom");

var _argsOrArgArray = require("../util/argsOrArgArray");

var _empty = require("./empty");

var _OperatorSubscriber = require("../operators/OperatorSubscriber");

var _args = require("../util/args");

function zip() {
  var args = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }

  var resultSelector = (0, _args.popResultSelector)(args);
  var sources = (0, _argsOrArgArray.argsOrArgArray)(args);
  return sources.length ? new _Observable.Observable(function (subscriber) {
    var buffers = sources.map(function () {
      return [];
    });
    var completed = sources.map(function () {
      return false;
    });
    subscriber.add(function () {
      buffers = completed = null;
    });

    var _loop_1 = function (sourceIndex) {
      (0, _innerFrom.innerFrom)(sources[sourceIndex]).subscribe(new _OperatorSubscriber.OperatorSubscriber(subscriber, function (value) {
        buffers[sourceIndex].push(value);

        if (buffers.every(function (buffer) {
          return buffer.length;
        })) {
          var result = buffers.map(function (buffer) {
            return buffer.shift();
          });
          subscriber.next(resultSelector ? resultSelector.apply(void 0, (0, _tslib.__spreadArray)([], (0, _tslib.__read)(result), false)) : result);

          if (buffers.some(function (buffer, i) {
            return !buffer.length && completed[i];
          })) {
            subscriber.complete();
          }
        }
      }, function () {
        completed[sourceIndex] = true;
        !buffers[sourceIndex].length && subscriber.complete();
      }));
    };

    for (var sourceIndex = 0; !subscriber.closed && sourceIndex < sources.length; sourceIndex++) {
      _loop_1(sourceIndex);
    }

    return function () {
      buffers = completed = null;
    };
  }) : _empty.EMPTY;
}
},{"tslib":"../node_modules/rxjs/node_modules/tslib/tslib.es6.js","../Observable":"../node_modules/rxjs/dist/esm5/internal/Observable.js","./innerFrom":"../node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js","../util/argsOrArgArray":"../node_modules/rxjs/dist/esm5/internal/util/argsOrArgArray.js","./empty":"../node_modules/rxjs/dist/esm5/internal/observable/empty.js","../operators/OperatorSubscriber":"../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js","../util/args":"../node_modules/rxjs/dist/esm5/internal/util/args.js"}],"../node_modules/rxjs/dist/esm5/internal/types.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
},{}],"../node_modules/rxjs/dist/esm5/internal/operators/audit.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.audit = audit;

var _lift = require("../util/lift");

var _innerFrom = require("../observable/innerFrom");

var _OperatorSubscriber = require("./OperatorSubscriber");

function audit(durationSelector) {
  return (0, _lift.operate)(function (source, subscriber) {
    var hasValue = false;
    var lastValue = null;
    var durationSubscriber = null;
    var isComplete = false;

    var endDuration = function () {
      durationSubscriber === null || durationSubscriber === void 0 ? void 0 : durationSubscriber.unsubscribe();
      durationSubscriber = null;

      if (hasValue) {
        hasValue = false;
        var value = lastValue;
        lastValue = null;
        subscriber.next(value);
      }

      isComplete && subscriber.complete();
    };

    var cleanupDuration = function () {
      durationSubscriber = null;
      isComplete && subscriber.complete();
    };

    source.subscribe(new _OperatorSubscriber.OperatorSubscriber(subscriber, function (value) {
      hasValue = true;
      lastValue = value;

      if (!durationSubscriber) {
        (0, _innerFrom.innerFrom)(durationSelector(value)).subscribe(durationSubscriber = new _OperatorSubscriber.OperatorSubscriber(subscriber, endDuration, cleanupDuration));
      }
    }, function () {
      isComplete = true;
      (!hasValue || !durationSubscriber || durationSubscriber.closed) && subscriber.complete();
    }));
  });
}
},{"../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js","../observable/innerFrom":"../node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js","./OperatorSubscriber":"../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/auditTime.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.auditTime = auditTime;

var _async = require("../scheduler/async");

var _audit = require("./audit");

var _timer = require("../observable/timer");

function auditTime(duration, scheduler) {
  if (scheduler === void 0) {
    scheduler = _async.async;
  }

  return (0, _audit.audit)(function () {
    return (0, _timer.timer)(duration, scheduler);
  });
}
},{"../scheduler/async":"../node_modules/rxjs/dist/esm5/internal/scheduler/async.js","./audit":"../node_modules/rxjs/dist/esm5/internal/operators/audit.js","../observable/timer":"../node_modules/rxjs/dist/esm5/internal/observable/timer.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/buffer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buffer = buffer;

var _lift = require("../util/lift");

var _noop = require("../util/noop");

var _OperatorSubscriber = require("./OperatorSubscriber");

function buffer(closingNotifier) {
  return (0, _lift.operate)(function (source, subscriber) {
    var currentBuffer = [];
    source.subscribe(new _OperatorSubscriber.OperatorSubscriber(subscriber, function (value) {
      return currentBuffer.push(value);
    }, function () {
      subscriber.next(currentBuffer);
      subscriber.complete();
    }));
    closingNotifier.subscribe(new _OperatorSubscriber.OperatorSubscriber(subscriber, function () {
      var b = currentBuffer;
      currentBuffer = [];
      subscriber.next(b);
    }, _noop.noop));
    return function () {
      currentBuffer = null;
    };
  });
}
},{"../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js","../util/noop":"../node_modules/rxjs/dist/esm5/internal/util/noop.js","./OperatorSubscriber":"../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/bufferCount.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bufferCount = bufferCount;

var _tslib = require("tslib");

var _lift = require("../util/lift");

var _OperatorSubscriber = require("./OperatorSubscriber");

var _arrRemove = require("../util/arrRemove");

function bufferCount(bufferSize, startBufferEvery) {
  if (startBufferEvery === void 0) {
    startBufferEvery = null;
  }

  startBufferEvery = startBufferEvery !== null && startBufferEvery !== void 0 ? startBufferEvery : bufferSize;
  return (0, _lift.operate)(function (source, subscriber) {
    var buffers = [];
    var count = 0;
    source.subscribe(new _OperatorSubscriber.OperatorSubscriber(subscriber, function (value) {
      var e_1, _a, e_2, _b;

      var toEmit = null;

      if (count++ % startBufferEvery === 0) {
        buffers.push([]);
      }

      try {
        for (var buffers_1 = (0, _tslib.__values)(buffers), buffers_1_1 = buffers_1.next(); !buffers_1_1.done; buffers_1_1 = buffers_1.next()) {
          var buffer = buffers_1_1.value;
          buffer.push(value);

          if (bufferSize <= buffer.length) {
            toEmit = toEmit !== null && toEmit !== void 0 ? toEmit : [];
            toEmit.push(buffer);
          }
        }
      } catch (e_1_1) {
        e_1 = {
          error: e_1_1
        };
      } finally {
        try {
          if (buffers_1_1 && !buffers_1_1.done && (_a = buffers_1.return)) _a.call(buffers_1);
        } finally {
          if (e_1) throw e_1.error;
        }
      }

      if (toEmit) {
        try {
          for (var toEmit_1 = (0, _tslib.__values)(toEmit), toEmit_1_1 = toEmit_1.next(); !toEmit_1_1.done; toEmit_1_1 = toEmit_1.next()) {
            var buffer = toEmit_1_1.value;
            (0, _arrRemove.arrRemove)(buffers, buffer);
            subscriber.next(buffer);
          }
        } catch (e_2_1) {
          e_2 = {
            error: e_2_1
          };
        } finally {
          try {
            if (toEmit_1_1 && !toEmit_1_1.done && (_b = toEmit_1.return)) _b.call(toEmit_1);
          } finally {
            if (e_2) throw e_2.error;
          }
        }
      }
    }, function () {
      var e_3, _a;

      try {
        for (var buffers_2 = (0, _tslib.__values)(buffers), buffers_2_1 = buffers_2.next(); !buffers_2_1.done; buffers_2_1 = buffers_2.next()) {
          var buffer = buffers_2_1.value;
          subscriber.next(buffer);
        }
      } catch (e_3_1) {
        e_3 = {
          error: e_3_1
        };
      } finally {
        try {
          if (buffers_2_1 && !buffers_2_1.done && (_a = buffers_2.return)) _a.call(buffers_2);
        } finally {
          if (e_3) throw e_3.error;
        }
      }

      subscriber.complete();
    }, undefined, function () {
      buffers = null;
    }));
  });
}
},{"tslib":"../node_modules/rxjs/node_modules/tslib/tslib.es6.js","../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js","./OperatorSubscriber":"../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js","../util/arrRemove":"../node_modules/rxjs/dist/esm5/internal/util/arrRemove.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/bufferTime.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bufferTime = bufferTime;

var _tslib = require("tslib");

var _Subscription = require("../Subscription");

var _lift = require("../util/lift");

var _OperatorSubscriber = require("./OperatorSubscriber");

var _arrRemove = require("../util/arrRemove");

var _async = require("../scheduler/async");

var _args = require("../util/args");

var _executeSchedule = require("../util/executeSchedule");

function bufferTime(bufferTimeSpan) {
  var _a, _b;

  var otherArgs = [];

  for (var _i = 1; _i < arguments.length; _i++) {
    otherArgs[_i - 1] = arguments[_i];
  }

  var scheduler = (_a = (0, _args.popScheduler)(otherArgs)) !== null && _a !== void 0 ? _a : _async.asyncScheduler;
  var bufferCreationInterval = (_b = otherArgs[0]) !== null && _b !== void 0 ? _b : null;
  var maxBufferSize = otherArgs[1] || Infinity;
  return (0, _lift.operate)(function (source, subscriber) {
    var bufferRecords = [];
    var restartOnEmit = false;

    var emit = function (record) {
      var buffer = record.buffer,
          subs = record.subs;
      subs.unsubscribe();
      (0, _arrRemove.arrRemove)(bufferRecords, record);
      subscriber.next(buffer);
      restartOnEmit && startBuffer();
    };

    var startBuffer = function () {
      if (bufferRecords) {
        var subs = new _Subscription.Subscription();
        subscriber.add(subs);
        var buffer = [];
        var record_1 = {
          buffer: buffer,
          subs: subs
        };
        bufferRecords.push(record_1);
        (0, _executeSchedule.executeSchedule)(subs, scheduler, function () {
          return emit(record_1);
        }, bufferTimeSpan);
      }
    };

    if (bufferCreationInterval !== null && bufferCreationInterval >= 0) {
      (0, _executeSchedule.executeSchedule)(subscriber, scheduler, startBuffer, bufferCreationInterval, true);
    } else {
      restartOnEmit = true;
    }

    startBuffer();
    var bufferTimeSubscriber = new _OperatorSubscriber.OperatorSubscriber(subscriber, function (value) {
      var e_1, _a;

      var recordsCopy = bufferRecords.slice();

      try {
        for (var recordsCopy_1 = (0, _tslib.__values)(recordsCopy), recordsCopy_1_1 = recordsCopy_1.next(); !recordsCopy_1_1.done; recordsCopy_1_1 = recordsCopy_1.next()) {
          var record = recordsCopy_1_1.value;
          var buffer = record.buffer;
          buffer.push(value);
          maxBufferSize <= buffer.length && emit(record);
        }
      } catch (e_1_1) {
        e_1 = {
          error: e_1_1
        };
      } finally {
        try {
          if (recordsCopy_1_1 && !recordsCopy_1_1.done && (_a = recordsCopy_1.return)) _a.call(recordsCopy_1);
        } finally {
          if (e_1) throw e_1.error;
        }
      }
    }, function () {
      while (bufferRecords === null || bufferRecords === void 0 ? void 0 : bufferRecords.length) {
        subscriber.next(bufferRecords.shift().buffer);
      }

      bufferTimeSubscriber === null || bufferTimeSubscriber === void 0 ? void 0 : bufferTimeSubscriber.unsubscribe();
      subscriber.complete();
      subscriber.unsubscribe();
    }, undefined, function () {
      return bufferRecords = null;
    });
    source.subscribe(bufferTimeSubscriber);
  });
}
},{"tslib":"../node_modules/rxjs/node_modules/tslib/tslib.es6.js","../Subscription":"../node_modules/rxjs/dist/esm5/internal/Subscription.js","../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js","./OperatorSubscriber":"../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js","../util/arrRemove":"../node_modules/rxjs/dist/esm5/internal/util/arrRemove.js","../scheduler/async":"../node_modules/rxjs/dist/esm5/internal/scheduler/async.js","../util/args":"../node_modules/rxjs/dist/esm5/internal/util/args.js","../util/executeSchedule":"../node_modules/rxjs/dist/esm5/internal/util/executeSchedule.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/bufferToggle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bufferToggle = bufferToggle;

var _tslib = require("tslib");

var _Subscription = require("../Subscription");

var _lift = require("../util/lift");

var _innerFrom = require("../observable/innerFrom");

var _OperatorSubscriber = require("./OperatorSubscriber");

var _noop = require("../util/noop");

var _arrRemove = require("../util/arrRemove");

function bufferToggle(openings, closingSelector) {
  return (0, _lift.operate)(function (source, subscriber) {
    var buffers = [];
    (0, _innerFrom.innerFrom)(openings).subscribe(new _OperatorSubscriber.OperatorSubscriber(subscriber, function (openValue) {
      var buffer = [];
      buffers.push(buffer);
      var closingSubscription = new _Subscription.Subscription();

      var emitBuffer = function () {
        (0, _arrRemove.arrRemove)(buffers, buffer);
        subscriber.next(buffer);
        closingSubscription.unsubscribe();
      };

      closingSubscription.add((0, _innerFrom.innerFrom)(closingSelector(openValue)).subscribe(new _OperatorSubscriber.OperatorSubscriber(subscriber, emitBuffer, _noop.noop)));
    }, _noop.noop));
    source.subscribe(new _OperatorSubscriber.OperatorSubscriber(subscriber, function (value) {
      var e_1, _a;

      try {
        for (var buffers_1 = (0, _tslib.__values)(buffers), buffers_1_1 = buffers_1.next(); !buffers_1_1.done; buffers_1_1 = buffers_1.next()) {
          var buffer = buffers_1_1.value;
          buffer.push(value);
        }
      } catch (e_1_1) {
        e_1 = {
          error: e_1_1
        };
      } finally {
        try {
          if (buffers_1_1 && !buffers_1_1.done && (_a = buffers_1.return)) _a.call(buffers_1);
        } finally {
          if (e_1) throw e_1.error;
        }
      }
    }, function () {
      while (buffers.length > 0) {
        subscriber.next(buffers.shift());
      }

      subscriber.complete();
    }));
  });
}
},{"tslib":"../node_modules/rxjs/node_modules/tslib/tslib.es6.js","../Subscription":"../node_modules/rxjs/dist/esm5/internal/Subscription.js","../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js","../observable/innerFrom":"../node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js","./OperatorSubscriber":"../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js","../util/noop":"../node_modules/rxjs/dist/esm5/internal/util/noop.js","../util/arrRemove":"../node_modules/rxjs/dist/esm5/internal/util/arrRemove.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/bufferWhen.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bufferWhen = bufferWhen;

var _lift = require("../util/lift");

var _noop = require("../util/noop");

var _OperatorSubscriber = require("./OperatorSubscriber");

var _innerFrom = require("../observable/innerFrom");

function bufferWhen(closingSelector) {
  return (0, _lift.operate)(function (source, subscriber) {
    var buffer = null;
    var closingSubscriber = null;

    var openBuffer = function () {
      closingSubscriber === null || closingSubscriber === void 0 ? void 0 : closingSubscriber.unsubscribe();
      var b = buffer;
      buffer = [];
      b && subscriber.next(b);
      (0, _innerFrom.innerFrom)(closingSelector()).subscribe(closingSubscriber = new _OperatorSubscriber.OperatorSubscriber(subscriber, openBuffer, _noop.noop));
    };

    openBuffer();
    source.subscribe(new _OperatorSubscriber.OperatorSubscriber(subscriber, function (value) {
      return buffer === null || buffer === void 0 ? void 0 : buffer.push(value);
    }, function () {
      buffer && subscriber.next(buffer);
      subscriber.complete();
    }, undefined, function () {
      return buffer = closingSubscriber = null;
    }));
  });
}
},{"../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js","../util/noop":"../node_modules/rxjs/dist/esm5/internal/util/noop.js","./OperatorSubscriber":"../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js","../observable/innerFrom":"../node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/catchError.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.catchError = catchError;

var _innerFrom = require("../observable/innerFrom");

var _OperatorSubscriber = require("./OperatorSubscriber");

var _lift = require("../util/lift");

function catchError(selector) {
  return (0, _lift.operate)(function (source, subscriber) {
    var innerSub = null;
    var syncUnsub = false;
    var handledResult;
    innerSub = source.subscribe(new _OperatorSubscriber.OperatorSubscriber(subscriber, undefined, undefined, function (err) {
      handledResult = (0, _innerFrom.innerFrom)(selector(err, catchError(selector)(source)));

      if (innerSub) {
        innerSub.unsubscribe();
        innerSub = null;
        handledResult.subscribe(subscriber);
      } else {
        syncUnsub = true;
      }
    }));

    if (syncUnsub) {
      innerSub.unsubscribe();
      innerSub = null;
      handledResult.subscribe(subscriber);
    }
  });
}
},{"../observable/innerFrom":"../node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js","./OperatorSubscriber":"../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js","../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/scanInternals.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scanInternals = scanInternals;

var _OperatorSubscriber = require("./OperatorSubscriber");

function scanInternals(accumulator, seed, hasSeed, emitOnNext, emitBeforeComplete) {
  return function (source, subscriber) {
    var hasState = hasSeed;
    var state = seed;
    var index = 0;
    source.subscribe(new _OperatorSubscriber.OperatorSubscriber(subscriber, function (value) {
      var i = index++;
      state = hasState ? accumulator(state, value, i) : (hasState = true, value);
      emitOnNext && subscriber.next(state);
    }, emitBeforeComplete && function () {
      hasState && subscriber.next(state);
      subscriber.complete();
    }));
  };
}
},{"./OperatorSubscriber":"../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/reduce.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reduce = reduce;

var _scanInternals = require("./scanInternals");

var _lift = require("../util/lift");

function reduce(accumulator, seed) {
  return (0, _lift.operate)((0, _scanInternals.scanInternals)(accumulator, seed, arguments.length >= 2, false, true));
}
},{"./scanInternals":"../node_modules/rxjs/dist/esm5/internal/operators/scanInternals.js","../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/toArray.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toArray = toArray;

var _reduce = require("./reduce");

var _lift = require("../util/lift");

var arrReducer = function (arr, value) {
  return arr.push(value), arr;
};

function toArray() {
  return (0, _lift.operate)(function (source, subscriber) {
    (0, _reduce.reduce)(arrReducer, [])(source).subscribe(subscriber);
  });
}
},{"./reduce":"../node_modules/rxjs/dist/esm5/internal/operators/reduce.js","../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/joinAllInternals.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.joinAllInternals = joinAllInternals;

var _identity = require("../util/identity");

var _mapOneOrManyArgs = require("../util/mapOneOrManyArgs");

var _pipe = require("../util/pipe");

var _mergeMap = require("./mergeMap");

var _toArray = require("./toArray");

function joinAllInternals(joinFn, project) {
  return (0, _pipe.pipe)((0, _toArray.toArray)(), (0, _mergeMap.mergeMap)(function (sources) {
    return joinFn(sources);
  }), project ? (0, _mapOneOrManyArgs.mapOneOrManyArgs)(project) : _identity.identity);
}
},{"../util/identity":"../node_modules/rxjs/dist/esm5/internal/util/identity.js","../util/mapOneOrManyArgs":"../node_modules/rxjs/dist/esm5/internal/util/mapOneOrManyArgs.js","../util/pipe":"../node_modules/rxjs/dist/esm5/internal/util/pipe.js","./mergeMap":"../node_modules/rxjs/dist/esm5/internal/operators/mergeMap.js","./toArray":"../node_modules/rxjs/dist/esm5/internal/operators/toArray.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/combineLatestAll.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.combineLatestAll = combineLatestAll;

var _combineLatest = require("../observable/combineLatest");

var _joinAllInternals = require("./joinAllInternals");

function combineLatestAll(project) {
  return (0, _joinAllInternals.joinAllInternals)(_combineLatest.combineLatest, project);
}
},{"../observable/combineLatest":"../node_modules/rxjs/dist/esm5/internal/observable/combineLatest.js","./joinAllInternals":"../node_modules/rxjs/dist/esm5/internal/operators/joinAllInternals.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/combineAll.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.combineAll = void 0;

var _combineLatestAll = require("./combineLatestAll");

var combineAll = _combineLatestAll.combineLatestAll;
exports.combineAll = combineAll;
},{"./combineLatestAll":"../node_modules/rxjs/dist/esm5/internal/operators/combineLatestAll.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/combineLatest.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.combineLatest = combineLatest;

var _tslib = require("tslib");

var _combineLatest = require("../observable/combineLatest");

var _lift = require("../util/lift");

var _argsOrArgArray = require("../util/argsOrArgArray");

var _mapOneOrManyArgs = require("../util/mapOneOrManyArgs");

var _pipe = require("../util/pipe");

var _args = require("../util/args");

function combineLatest() {
  var args = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }

  var resultSelector = (0, _args.popResultSelector)(args);
  return resultSelector ? (0, _pipe.pipe)(combineLatest.apply(void 0, (0, _tslib.__spreadArray)([], (0, _tslib.__read)(args), false)), (0, _mapOneOrManyArgs.mapOneOrManyArgs)(resultSelector)) : (0, _lift.operate)(function (source, subscriber) {
    (0, _combineLatest.combineLatestInit)((0, _tslib.__spreadArray)([source], (0, _tslib.__read)((0, _argsOrArgArray.argsOrArgArray)(args)), false))(subscriber);
  });
}
},{"tslib":"../node_modules/rxjs/node_modules/tslib/tslib.es6.js","../observable/combineLatest":"../node_modules/rxjs/dist/esm5/internal/observable/combineLatest.js","../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js","../util/argsOrArgArray":"../node_modules/rxjs/dist/esm5/internal/util/argsOrArgArray.js","../util/mapOneOrManyArgs":"../node_modules/rxjs/dist/esm5/internal/util/mapOneOrManyArgs.js","../util/pipe":"../node_modules/rxjs/dist/esm5/internal/util/pipe.js","../util/args":"../node_modules/rxjs/dist/esm5/internal/util/args.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/combineLatestWith.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.combineLatestWith = combineLatestWith;

var _tslib = require("tslib");

var _combineLatest = require("./combineLatest");

function combineLatestWith() {
  var otherSources = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    otherSources[_i] = arguments[_i];
  }

  return _combineLatest.combineLatest.apply(void 0, (0, _tslib.__spreadArray)([], (0, _tslib.__read)(otherSources), false));
}
},{"tslib":"../node_modules/rxjs/node_modules/tslib/tslib.es6.js","./combineLatest":"../node_modules/rxjs/dist/esm5/internal/operators/combineLatest.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/concatMap.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.concatMap = concatMap;

var _mergeMap = require("./mergeMap");

var _isFunction = require("../util/isFunction");

function concatMap(project, resultSelector) {
  return (0, _isFunction.isFunction)(resultSelector) ? (0, _mergeMap.mergeMap)(project, resultSelector, 1) : (0, _mergeMap.mergeMap)(project, 1);
}
},{"./mergeMap":"../node_modules/rxjs/dist/esm5/internal/operators/mergeMap.js","../util/isFunction":"../node_modules/rxjs/dist/esm5/internal/util/isFunction.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/concatMapTo.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.concatMapTo = concatMapTo;

var _concatMap = require("./concatMap");

var _isFunction = require("../util/isFunction");

function concatMapTo(innerObservable, resultSelector) {
  return (0, _isFunction.isFunction)(resultSelector) ? (0, _concatMap.concatMap)(function () {
    return innerObservable;
  }, resultSelector) : (0, _concatMap.concatMap)(function () {
    return innerObservable;
  });
}
},{"./concatMap":"../node_modules/rxjs/dist/esm5/internal/operators/concatMap.js","../util/isFunction":"../node_modules/rxjs/dist/esm5/internal/util/isFunction.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/concat.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.concat = concat;

var _tslib = require("tslib");

var _lift = require("../util/lift");

var _concatAll = require("./concatAll");

var _args = require("../util/args");

var _from = require("../observable/from");

function concat() {
  var args = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }

  var scheduler = (0, _args.popScheduler)(args);
  return (0, _lift.operate)(function (source, subscriber) {
    (0, _concatAll.concatAll)()((0, _from.from)((0, _tslib.__spreadArray)([source], (0, _tslib.__read)(args), false), scheduler)).subscribe(subscriber);
  });
}
},{"tslib":"../node_modules/rxjs/node_modules/tslib/tslib.es6.js","../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js","./concatAll":"../node_modules/rxjs/dist/esm5/internal/operators/concatAll.js","../util/args":"../node_modules/rxjs/dist/esm5/internal/util/args.js","../observable/from":"../node_modules/rxjs/dist/esm5/internal/observable/from.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/concatWith.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.concatWith = concatWith;

var _tslib = require("tslib");

var _concat = require("./concat");

function concatWith() {
  var otherSources = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    otherSources[_i] = arguments[_i];
  }

  return _concat.concat.apply(void 0, (0, _tslib.__spreadArray)([], (0, _tslib.__read)(otherSources), false));
}
},{"tslib":"../node_modules/rxjs/node_modules/tslib/tslib.es6.js","./concat":"../node_modules/rxjs/dist/esm5/internal/operators/concat.js"}],"../node_modules/rxjs/dist/esm5/internal/observable/fromSubscribable.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromSubscribable = fromSubscribable;

var _Observable = require("../Observable");

function fromSubscribable(subscribable) {
  return new _Observable.Observable(function (subscriber) {
    return subscribable.subscribe(subscriber);
  });
}
},{"../Observable":"../node_modules/rxjs/dist/esm5/internal/Observable.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/connect.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connect = connect;

var _Subject = require("../Subject");

var _from = require("../observable/from");

var _lift = require("../util/lift");

var _fromSubscribable = require("../observable/fromSubscribable");

var DEFAULT_CONFIG = {
  connector: function () {
    return new _Subject.Subject();
  }
};

function connect(selector, config) {
  if (config === void 0) {
    config = DEFAULT_CONFIG;
  }

  var connector = config.connector;
  return (0, _lift.operate)(function (source, subscriber) {
    var subject = connector();
    (0, _from.from)(selector((0, _fromSubscribable.fromSubscribable)(subject))).subscribe(subscriber);
    subscriber.add(source.subscribe(subject));
  });
}
},{"../Subject":"../node_modules/rxjs/dist/esm5/internal/Subject.js","../observable/from":"../node_modules/rxjs/dist/esm5/internal/observable/from.js","../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js","../observable/fromSubscribable":"../node_modules/rxjs/dist/esm5/internal/observable/fromSubscribable.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/count.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.count = count;

var _reduce = require("./reduce");

function count(predicate) {
  return (0, _reduce.reduce)(function (total, value, i) {
    return !predicate || predicate(value, i) ? total + 1 : total;
  }, 0);
}
},{"./reduce":"../node_modules/rxjs/dist/esm5/internal/operators/reduce.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/debounce.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.debounce = debounce;

var _lift = require("../util/lift");

var _noop = require("../util/noop");

var _OperatorSubscriber = require("./OperatorSubscriber");

var _innerFrom = require("../observable/innerFrom");

function debounce(durationSelector) {
  return (0, _lift.operate)(function (source, subscriber) {
    var hasValue = false;
    var lastValue = null;
    var durationSubscriber = null;

    var emit = function () {
      durationSubscriber === null || durationSubscriber === void 0 ? void 0 : durationSubscriber.unsubscribe();
      durationSubscriber = null;

      if (hasValue) {
        hasValue = false;
        var value = lastValue;
        lastValue = null;
        subscriber.next(value);
      }
    };

    source.subscribe(new _OperatorSubscriber.OperatorSubscriber(subscriber, function (value) {
      durationSubscriber === null || durationSubscriber === void 0 ? void 0 : durationSubscriber.unsubscribe();
      hasValue = true;
      lastValue = value;
      durationSubscriber = new _OperatorSubscriber.OperatorSubscriber(subscriber, emit, _noop.noop);
      (0, _innerFrom.innerFrom)(durationSelector(value)).subscribe(durationSubscriber);
    }, function () {
      emit();
      subscriber.complete();
    }, undefined, function () {
      lastValue = durationSubscriber = null;
    }));
  });
}
},{"../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js","../util/noop":"../node_modules/rxjs/dist/esm5/internal/util/noop.js","./OperatorSubscriber":"../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js","../observable/innerFrom":"../node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/debounceTime.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.debounceTime = debounceTime;

var _async = require("../scheduler/async");

var _lift = require("../util/lift");

var _OperatorSubscriber = require("./OperatorSubscriber");

function debounceTime(dueTime, scheduler) {
  if (scheduler === void 0) {
    scheduler = _async.asyncScheduler;
  }

  return (0, _lift.operate)(function (source, subscriber) {
    var activeTask = null;
    var lastValue = null;
    var lastTime = null;

    var emit = function () {
      if (activeTask) {
        activeTask.unsubscribe();
        activeTask = null;
        var value = lastValue;
        lastValue = null;
        subscriber.next(value);
      }
    };

    function emitWhenIdle() {
      var targetTime = lastTime + dueTime;
      var now = scheduler.now();

      if (now < targetTime) {
        activeTask = this.schedule(undefined, targetTime - now);
        subscriber.add(activeTask);
        return;
      }

      emit();
    }

    source.subscribe(new _OperatorSubscriber.OperatorSubscriber(subscriber, function (value) {
      lastValue = value;
      lastTime = scheduler.now();

      if (!activeTask) {
        activeTask = scheduler.schedule(emitWhenIdle, dueTime);
        subscriber.add(activeTask);
      }
    }, function () {
      emit();
      subscriber.complete();
    }, undefined, function () {
      lastValue = activeTask = null;
    }));
  });
}
},{"../scheduler/async":"../node_modules/rxjs/dist/esm5/internal/scheduler/async.js","../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js","./OperatorSubscriber":"../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/defaultIfEmpty.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultIfEmpty = defaultIfEmpty;

var _lift = require("../util/lift");

var _OperatorSubscriber = require("./OperatorSubscriber");

function defaultIfEmpty(defaultValue) {
  return (0, _lift.operate)(function (source, subscriber) {
    var hasValue = false;
    source.subscribe(new _OperatorSubscriber.OperatorSubscriber(subscriber, function (value) {
      hasValue = true;
      subscriber.next(value);
    }, function () {
      if (!hasValue) {
        subscriber.next(defaultValue);
      }

      subscriber.complete();
    }));
  });
}
},{"../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js","./OperatorSubscriber":"../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/take.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.take = take;

var _empty = require("../observable/empty");

var _lift = require("../util/lift");

var _OperatorSubscriber = require("./OperatorSubscriber");

function take(count) {
  return count <= 0 ? function () {
    return _empty.EMPTY;
  } : (0, _lift.operate)(function (source, subscriber) {
    var seen = 0;
    source.subscribe(new _OperatorSubscriber.OperatorSubscriber(subscriber, function (value) {
      if (++seen <= count) {
        subscriber.next(value);

        if (count <= seen) {
          subscriber.complete();
        }
      }
    }));
  });
}
},{"../observable/empty":"../node_modules/rxjs/dist/esm5/internal/observable/empty.js","../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js","./OperatorSubscriber":"../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/ignoreElements.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ignoreElements = ignoreElements;

var _lift = require("../util/lift");

var _OperatorSubscriber = require("./OperatorSubscriber");

var _noop = require("../util/noop");

function ignoreElements() {
  return (0, _lift.operate)(function (source, subscriber) {
    source.subscribe(new _OperatorSubscriber.OperatorSubscriber(subscriber, _noop.noop));
  });
}
},{"../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js","./OperatorSubscriber":"../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js","../util/noop":"../node_modules/rxjs/dist/esm5/internal/util/noop.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/mapTo.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapTo = mapTo;

var _map = require("./map");

function mapTo(value) {
  return (0, _map.map)(function () {
    return value;
  });
}
},{"./map":"../node_modules/rxjs/dist/esm5/internal/operators/map.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/delayWhen.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.delayWhen = delayWhen;

var _concat = require("../observable/concat");

var _take = require("./take");

var _ignoreElements = require("./ignoreElements");

var _mapTo = require("./mapTo");

var _mergeMap = require("./mergeMap");

function delayWhen(delayDurationSelector, subscriptionDelay) {
  if (subscriptionDelay) {
    return function (source) {
      return (0, _concat.concat)(subscriptionDelay.pipe((0, _take.take)(1), (0, _ignoreElements.ignoreElements)()), source.pipe(delayWhen(delayDurationSelector)));
    };
  }

  return (0, _mergeMap.mergeMap)(function (value, index) {
    return delayDurationSelector(value, index).pipe((0, _take.take)(1), (0, _mapTo.mapTo)(value));
  });
}
},{"../observable/concat":"../node_modules/rxjs/dist/esm5/internal/observable/concat.js","./take":"../node_modules/rxjs/dist/esm5/internal/operators/take.js","./ignoreElements":"../node_modules/rxjs/dist/esm5/internal/operators/ignoreElements.js","./mapTo":"../node_modules/rxjs/dist/esm5/internal/operators/mapTo.js","./mergeMap":"../node_modules/rxjs/dist/esm5/internal/operators/mergeMap.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/delay.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.delay = delay;

var _async = require("../scheduler/async");

var _delayWhen = require("./delayWhen");

var _timer = require("../observable/timer");

function delay(due, scheduler) {
  if (scheduler === void 0) {
    scheduler = _async.asyncScheduler;
  }

  var duration = (0, _timer.timer)(due, scheduler);
  return (0, _delayWhen.delayWhen)(function () {
    return duration;
  });
}
},{"../scheduler/async":"../node_modules/rxjs/dist/esm5/internal/scheduler/async.js","./delayWhen":"../node_modules/rxjs/dist/esm5/internal/operators/delayWhen.js","../observable/timer":"../node_modules/rxjs/dist/esm5/internal/observable/timer.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/dematerialize.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dematerialize = dematerialize;

var _Notification = require("../Notification");

var _lift = require("../util/lift");

var _OperatorSubscriber = require("./OperatorSubscriber");

function dematerialize() {
  return (0, _lift.operate)(function (source, subscriber) {
    source.subscribe(new _OperatorSubscriber.OperatorSubscriber(subscriber, function (notification) {
      return (0, _Notification.observeNotification)(notification, subscriber);
    }));
  });
}
},{"../Notification":"../node_modules/rxjs/dist/esm5/internal/Notification.js","../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js","./OperatorSubscriber":"../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/distinct.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.distinct = distinct;

var _lift = require("../util/lift");

var _OperatorSubscriber = require("./OperatorSubscriber");

var _noop = require("../util/noop");

function distinct(keySelector, flushes) {
  return (0, _lift.operate)(function (source, subscriber) {
    var distinctKeys = new Set();
    source.subscribe(new _OperatorSubscriber.OperatorSubscriber(subscriber, function (value) {
      var key = keySelector ? keySelector(value) : value;

      if (!distinctKeys.has(key)) {
        distinctKeys.add(key);
        subscriber.next(value);
      }
    }));
    flushes === null || flushes === void 0 ? void 0 : flushes.subscribe(new _OperatorSubscriber.OperatorSubscriber(subscriber, function () {
      return distinctKeys.clear();
    }, _noop.noop));
  });
}
},{"../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js","./OperatorSubscriber":"../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js","../util/noop":"../node_modules/rxjs/dist/esm5/internal/util/noop.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/distinctUntilChanged.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.distinctUntilChanged = distinctUntilChanged;

var _identity = require("../util/identity");

var _lift = require("../util/lift");

var _OperatorSubscriber = require("./OperatorSubscriber");

function distinctUntilChanged(comparator, keySelector) {
  if (keySelector === void 0) {
    keySelector = _identity.identity;
  }

  comparator = comparator !== null && comparator !== void 0 ? comparator : defaultCompare;
  return (0, _lift.operate)(function (source, subscriber) {
    var previousKey;
    var first = true;
    source.subscribe(new _OperatorSubscriber.OperatorSubscriber(subscriber, function (value) {
      var currentKey = keySelector(value);

      if (first || !comparator(previousKey, currentKey)) {
        first = false;
        previousKey = currentKey;
        subscriber.next(value);
      }
    }));
  });
}

function defaultCompare(a, b) {
  return a === b;
}
},{"../util/identity":"../node_modules/rxjs/dist/esm5/internal/util/identity.js","../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js","./OperatorSubscriber":"../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/distinctUntilKeyChanged.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.distinctUntilKeyChanged = distinctUntilKeyChanged;

var _distinctUntilChanged = require("./distinctUntilChanged");

function distinctUntilKeyChanged(key, compare) {
  return (0, _distinctUntilChanged.distinctUntilChanged)(function (x, y) {
    return compare ? compare(x[key], y[key]) : x[key] === y[key];
  });
}
},{"./distinctUntilChanged":"../node_modules/rxjs/dist/esm5/internal/operators/distinctUntilChanged.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/throwIfEmpty.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.throwIfEmpty = throwIfEmpty;

var _EmptyError = require("../util/EmptyError");

var _lift = require("../util/lift");

var _OperatorSubscriber = require("./OperatorSubscriber");

function throwIfEmpty(errorFactory) {
  if (errorFactory === void 0) {
    errorFactory = defaultErrorFactory;
  }

  return (0, _lift.operate)(function (source, subscriber) {
    var hasValue = false;
    source.subscribe(new _OperatorSubscriber.OperatorSubscriber(subscriber, function (value) {
      hasValue = true;
      subscriber.next(value);
    }, function () {
      return hasValue ? subscriber.complete() : subscriber.error(errorFactory());
    }));
  });
}

function defaultErrorFactory() {
  return new _EmptyError.EmptyError();
}
},{"../util/EmptyError":"../node_modules/rxjs/dist/esm5/internal/util/EmptyError.js","../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js","./OperatorSubscriber":"../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/elementAt.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.elementAt = elementAt;

var _ArgumentOutOfRangeError = require("../util/ArgumentOutOfRangeError");

var _filter = require("./filter");

var _throwIfEmpty = require("./throwIfEmpty");

var _defaultIfEmpty = require("./defaultIfEmpty");

var _take = require("./take");

function elementAt(index, defaultValue) {
  if (index < 0) {
    throw new _ArgumentOutOfRangeError.ArgumentOutOfRangeError();
  }

  var hasDefaultValue = arguments.length >= 2;
  return function (source) {
    return source.pipe((0, _filter.filter)(function (v, i) {
      return i === index;
    }), (0, _take.take)(1), hasDefaultValue ? (0, _defaultIfEmpty.defaultIfEmpty)(defaultValue) : (0, _throwIfEmpty.throwIfEmpty)(function () {
      return new _ArgumentOutOfRangeError.ArgumentOutOfRangeError();
    }));
  };
}
},{"../util/ArgumentOutOfRangeError":"../node_modules/rxjs/dist/esm5/internal/util/ArgumentOutOfRangeError.js","./filter":"../node_modules/rxjs/dist/esm5/internal/operators/filter.js","./throwIfEmpty":"../node_modules/rxjs/dist/esm5/internal/operators/throwIfEmpty.js","./defaultIfEmpty":"../node_modules/rxjs/dist/esm5/internal/operators/defaultIfEmpty.js","./take":"../node_modules/rxjs/dist/esm5/internal/operators/take.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/endWith.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.endWith = endWith;

var _tslib = require("tslib");

var _concat = require("../observable/concat");

var _of = require("../observable/of");

function endWith() {
  var values = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    values[_i] = arguments[_i];
  }

  return function (source) {
    return (0, _concat.concat)(source, _of.of.apply(void 0, (0, _tslib.__spreadArray)([], (0, _tslib.__read)(values), false)));
  };
}
},{"tslib":"../node_modules/rxjs/node_modules/tslib/tslib.es6.js","../observable/concat":"../node_modules/rxjs/dist/esm5/internal/observable/concat.js","../observable/of":"../node_modules/rxjs/dist/esm5/internal/observable/of.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/every.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.every = every;

var _lift = require("../util/lift");

var _OperatorSubscriber = require("./OperatorSubscriber");

function every(predicate, thisArg) {
  return (0, _lift.operate)(function (source, subscriber) {
    var index = 0;
    source.subscribe(new _OperatorSubscriber.OperatorSubscriber(subscriber, function (value) {
      if (!predicate.call(thisArg, value, index++, source)) {
        subscriber.next(false);
        subscriber.complete();
      }
    }, function () {
      subscriber.next(true);
      subscriber.complete();
    }));
  });
}
},{"../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js","./OperatorSubscriber":"../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/exhaustAll.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exhaustAll = exhaustAll;

var _lift = require("../util/lift");

var _innerFrom = require("../observable/innerFrom");

var _OperatorSubscriber = require("./OperatorSubscriber");

function exhaustAll() {
  return (0, _lift.operate)(function (source, subscriber) {
    var isComplete = false;
    var innerSub = null;
    source.subscribe(new _OperatorSubscriber.OperatorSubscriber(subscriber, function (inner) {
      if (!innerSub) {
        innerSub = (0, _innerFrom.innerFrom)(inner).subscribe(new _OperatorSubscriber.OperatorSubscriber(subscriber, undefined, function () {
          innerSub = null;
          isComplete && subscriber.complete();
        }));
      }
    }, function () {
      isComplete = true;
      !innerSub && subscriber.complete();
    }));
  });
}
},{"../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js","../observable/innerFrom":"../node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js","./OperatorSubscriber":"../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/exhaust.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exhaust = void 0;

var _exhaustAll = require("./exhaustAll");

var exhaust = _exhaustAll.exhaustAll;
exports.exhaust = exhaust;
},{"./exhaustAll":"../node_modules/rxjs/dist/esm5/internal/operators/exhaustAll.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/exhaustMap.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exhaustMap = exhaustMap;

var _map = require("./map");

var _innerFrom = require("../observable/innerFrom");

var _lift = require("../util/lift");

var _OperatorSubscriber = require("./OperatorSubscriber");

function exhaustMap(project, resultSelector) {
  if (resultSelector) {
    return function (source) {
      return source.pipe(exhaustMap(function (a, i) {
        return (0, _innerFrom.innerFrom)(project(a, i)).pipe((0, _map.map)(function (b, ii) {
          return resultSelector(a, b, i, ii);
        }));
      }));
    };
  }

  return (0, _lift.operate)(function (source, subscriber) {
    var index = 0;
    var innerSub = null;
    var isComplete = false;
    source.subscribe(new _OperatorSubscriber.OperatorSubscriber(subscriber, function (outerValue) {
      if (!innerSub) {
        innerSub = new _OperatorSubscriber.OperatorSubscriber(subscriber, undefined, function () {
          innerSub = null;
          isComplete && subscriber.complete();
        });
        (0, _innerFrom.innerFrom)(project(outerValue, index++)).subscribe(innerSub);
      }
    }, function () {
      isComplete = true;
      !innerSub && subscriber.complete();
    }));
  });
}
},{"./map":"../node_modules/rxjs/dist/esm5/internal/operators/map.js","../observable/innerFrom":"../node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js","../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js","./OperatorSubscriber":"../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/expand.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expand = expand;

var _lift = require("../util/lift");

var _mergeInternals = require("./mergeInternals");

function expand(project, concurrent, scheduler) {
  if (concurrent === void 0) {
    concurrent = Infinity;
  }

  concurrent = (concurrent || 0) < 1 ? Infinity : concurrent;
  return (0, _lift.operate)(function (source, subscriber) {
    return (0, _mergeInternals.mergeInternals)(source, subscriber, project, concurrent, undefined, true, scheduler);
  });
}
},{"../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js","./mergeInternals":"../node_modules/rxjs/dist/esm5/internal/operators/mergeInternals.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/finalize.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.finalize = finalize;

var _lift = require("../util/lift");

function finalize(callback) {
  return (0, _lift.operate)(function (source, subscriber) {
    try {
      source.subscribe(subscriber);
    } finally {
      subscriber.add(callback);
    }
  });
}
},{"../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/find.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.find = find;
exports.createFind = createFind;

var _lift = require("../util/lift");

var _OperatorSubscriber = require("./OperatorSubscriber");

function find(predicate, thisArg) {
  return (0, _lift.operate)(createFind(predicate, thisArg, 'value'));
}

function createFind(predicate, thisArg, emit) {
  var findIndex = emit === 'index';
  return function (source, subscriber) {
    var index = 0;
    source.subscribe(new _OperatorSubscriber.OperatorSubscriber(subscriber, function (value) {
      var i = index++;

      if (predicate.call(thisArg, value, i, source)) {
        subscriber.next(findIndex ? i : value);
        subscriber.complete();
      }
    }, function () {
      subscriber.next(findIndex ? -1 : undefined);
      subscriber.complete();
    }));
  };
}
},{"../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js","./OperatorSubscriber":"../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/findIndex.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findIndex = findIndex;

var _lift = require("../util/lift");

var _find = require("./find");

function findIndex(predicate, thisArg) {
  return (0, _lift.operate)((0, _find.createFind)(predicate, thisArg, 'index'));
}
},{"../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js","./find":"../node_modules/rxjs/dist/esm5/internal/operators/find.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/first.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.first = first;

var _EmptyError = require("../util/EmptyError");

var _filter = require("./filter");

var _take = require("./take");

var _defaultIfEmpty = require("./defaultIfEmpty");

var _throwIfEmpty = require("./throwIfEmpty");

var _identity = require("../util/identity");

function first(predicate, defaultValue) {
  var hasDefaultValue = arguments.length >= 2;
  return function (source) {
    return source.pipe(predicate ? (0, _filter.filter)(function (v, i) {
      return predicate(v, i, source);
    }) : _identity.identity, (0, _take.take)(1), hasDefaultValue ? (0, _defaultIfEmpty.defaultIfEmpty)(defaultValue) : (0, _throwIfEmpty.throwIfEmpty)(function () {
      return new _EmptyError.EmptyError();
    }));
  };
}
},{"../util/EmptyError":"../node_modules/rxjs/dist/esm5/internal/util/EmptyError.js","./filter":"../node_modules/rxjs/dist/esm5/internal/operators/filter.js","./take":"../node_modules/rxjs/dist/esm5/internal/operators/take.js","./defaultIfEmpty":"../node_modules/rxjs/dist/esm5/internal/operators/defaultIfEmpty.js","./throwIfEmpty":"../node_modules/rxjs/dist/esm5/internal/operators/throwIfEmpty.js","../util/identity":"../node_modules/rxjs/dist/esm5/internal/util/identity.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/groupBy.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.groupBy = groupBy;

var _tslib = require("tslib");

var _Observable = require("../Observable");

var _innerFrom = require("../observable/innerFrom");

var _Subject = require("../Subject");

var _lift = require("../util/lift");

var _OperatorSubscriber = require("./OperatorSubscriber");

function groupBy(keySelector, elementOrOptions, duration, connector) {
  return (0, _lift.operate)(function (source, subscriber) {
    var element;

    if (!elementOrOptions || typeof elementOrOptions === 'function') {
      element = elementOrOptions;
    } else {
      duration = elementOrOptions.duration, element = elementOrOptions.element, connector = elementOrOptions.connector;
    }

    var groups = new Map();

    var notify = function (cb) {
      groups.forEach(cb);
      cb(subscriber);
    };

    var handleError = function (err) {
      return notify(function (consumer) {
        return consumer.error(err);
      });
    };

    var groupBySourceSubscriber = new GroupBySubscriber(subscriber, function (value) {
      try {
        var key_1 = keySelector(value);
        var group_1 = groups.get(key_1);

        if (!group_1) {
          groups.set(key_1, group_1 = connector ? connector() : new _Subject.Subject());
          var grouped = createGroupedObservable(key_1, group_1);
          subscriber.next(grouped);

          if (duration) {
            var durationSubscriber_1 = new _OperatorSubscriber.OperatorSubscriber(group_1, function () {
              group_1.complete();
              durationSubscriber_1 === null || durationSubscriber_1 === void 0 ? void 0 : durationSubscriber_1.unsubscribe();
            }, undefined, undefined, function () {
              return groups.delete(key_1);
            });
            groupBySourceSubscriber.add((0, _innerFrom.innerFrom)(duration(grouped)).subscribe(durationSubscriber_1));
          }
        }

        group_1.next(element ? element(value) : value);
      } catch (err) {
        handleError(err);
      }
    }, function () {
      return notify(function (consumer) {
        return consumer.complete();
      });
    }, handleError, function () {
      return groups.clear();
    });
    source.subscribe(groupBySourceSubscriber);

    function createGroupedObservable(key, groupSubject) {
      var result = new _Observable.Observable(function (groupSubscriber) {
        groupBySourceSubscriber.activeGroups++;
        var innerSub = groupSubject.subscribe(groupSubscriber);
        return function () {
          innerSub.unsubscribe();
          --groupBySourceSubscriber.activeGroups === 0 && groupBySourceSubscriber.teardownAttempted && groupBySourceSubscriber.unsubscribe();
        };
      });
      result.key = key;
      return result;
    }
  });
}

var GroupBySubscriber = function (_super) {
  (0, _tslib.__extends)(GroupBySubscriber, _super);

  function GroupBySubscriber() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.activeGroups = 0;
    _this.teardownAttempted = false;
    return _this;
  }

  GroupBySubscriber.prototype.unsubscribe = function () {
    this.teardownAttempted = true;
    this.activeGroups === 0 && _super.prototype.unsubscribe.call(this);
  };

  return GroupBySubscriber;
}(_OperatorSubscriber.OperatorSubscriber);
},{"tslib":"../node_modules/rxjs/node_modules/tslib/tslib.es6.js","../Observable":"../node_modules/rxjs/dist/esm5/internal/Observable.js","../observable/innerFrom":"../node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js","../Subject":"../node_modules/rxjs/dist/esm5/internal/Subject.js","../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js","./OperatorSubscriber":"../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/isEmpty.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isEmpty = isEmpty;

var _lift = require("../util/lift");

var _OperatorSubscriber = require("./OperatorSubscriber");

function isEmpty() {
  return (0, _lift.operate)(function (source, subscriber) {
    source.subscribe(new _OperatorSubscriber.OperatorSubscriber(subscriber, function () {
      subscriber.next(false);
      subscriber.complete();
    }, function () {
      subscriber.next(true);
      subscriber.complete();
    }));
  });
}
},{"../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js","./OperatorSubscriber":"../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/takeLast.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.takeLast = takeLast;

var _tslib = require("tslib");

var _empty = require("../observable/empty");

var _lift = require("../util/lift");

var _OperatorSubscriber = require("./OperatorSubscriber");

function takeLast(count) {
  return count <= 0 ? function () {
    return _empty.EMPTY;
  } : (0, _lift.operate)(function (source, subscriber) {
    var buffer = [];
    source.subscribe(new _OperatorSubscriber.OperatorSubscriber(subscriber, function (value) {
      buffer.push(value);
      count < buffer.length && buffer.shift();
    }, function () {
      var e_1, _a;

      try {
        for (var buffer_1 = (0, _tslib.__values)(buffer), buffer_1_1 = buffer_1.next(); !buffer_1_1.done; buffer_1_1 = buffer_1.next()) {
          var value = buffer_1_1.value;
          subscriber.next(value);
        }
      } catch (e_1_1) {
        e_1 = {
          error: e_1_1
        };
      } finally {
        try {
          if (buffer_1_1 && !buffer_1_1.done && (_a = buffer_1.return)) _a.call(buffer_1);
        } finally {
          if (e_1) throw e_1.error;
        }
      }

      subscriber.complete();
    }, undefined, function () {
      buffer = null;
    }));
  });
}
},{"tslib":"../node_modules/rxjs/node_modules/tslib/tslib.es6.js","../observable/empty":"../node_modules/rxjs/dist/esm5/internal/observable/empty.js","../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js","./OperatorSubscriber":"../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/last.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.last = last;

var _EmptyError = require("../util/EmptyError");

var _filter = require("./filter");

var _takeLast = require("./takeLast");

var _throwIfEmpty = require("./throwIfEmpty");

var _defaultIfEmpty = require("./defaultIfEmpty");

var _identity = require("../util/identity");

function last(predicate, defaultValue) {
  var hasDefaultValue = arguments.length >= 2;
  return function (source) {
    return source.pipe(predicate ? (0, _filter.filter)(function (v, i) {
      return predicate(v, i, source);
    }) : _identity.identity, (0, _takeLast.takeLast)(1), hasDefaultValue ? (0, _defaultIfEmpty.defaultIfEmpty)(defaultValue) : (0, _throwIfEmpty.throwIfEmpty)(function () {
      return new _EmptyError.EmptyError();
    }));
  };
}
},{"../util/EmptyError":"../node_modules/rxjs/dist/esm5/internal/util/EmptyError.js","./filter":"../node_modules/rxjs/dist/esm5/internal/operators/filter.js","./takeLast":"../node_modules/rxjs/dist/esm5/internal/operators/takeLast.js","./throwIfEmpty":"../node_modules/rxjs/dist/esm5/internal/operators/throwIfEmpty.js","./defaultIfEmpty":"../node_modules/rxjs/dist/esm5/internal/operators/defaultIfEmpty.js","../util/identity":"../node_modules/rxjs/dist/esm5/internal/util/identity.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/materialize.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.materialize = materialize;

var _Notification = require("../Notification");

var _lift = require("../util/lift");

var _OperatorSubscriber = require("./OperatorSubscriber");

function materialize() {
  return (0, _lift.operate)(function (source, subscriber) {
    source.subscribe(new _OperatorSubscriber.OperatorSubscriber(subscriber, function (value) {
      subscriber.next(_Notification.Notification.createNext(value));
    }, function () {
      subscriber.next(_Notification.Notification.createComplete());
      subscriber.complete();
    }, function (err) {
      subscriber.next(_Notification.Notification.createError(err));
      subscriber.complete();
    }));
  });
}
},{"../Notification":"../node_modules/rxjs/dist/esm5/internal/Notification.js","../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js","./OperatorSubscriber":"../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/max.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.max = max;

var _reduce = require("./reduce");

var _isFunction = require("../util/isFunction");

function max(comparer) {
  return (0, _reduce.reduce)((0, _isFunction.isFunction)(comparer) ? function (x, y) {
    return comparer(x, y) > 0 ? x : y;
  } : function (x, y) {
    return x > y ? x : y;
  });
}
},{"./reduce":"../node_modules/rxjs/dist/esm5/internal/operators/reduce.js","../util/isFunction":"../node_modules/rxjs/dist/esm5/internal/util/isFunction.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/flatMap.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flatMap = void 0;

var _mergeMap = require("./mergeMap");

var flatMap = _mergeMap.mergeMap;
exports.flatMap = flatMap;
},{"./mergeMap":"../node_modules/rxjs/dist/esm5/internal/operators/mergeMap.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/mergeMapTo.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeMapTo = mergeMapTo;

var _mergeMap = require("./mergeMap");

var _isFunction = require("../util/isFunction");

function mergeMapTo(innerObservable, resultSelector, concurrent) {
  if (concurrent === void 0) {
    concurrent = Infinity;
  }

  if ((0, _isFunction.isFunction)(resultSelector)) {
    return (0, _mergeMap.mergeMap)(function () {
      return innerObservable;
    }, resultSelector, concurrent);
  }

  if (typeof resultSelector === 'number') {
    concurrent = resultSelector;
  }

  return (0, _mergeMap.mergeMap)(function () {
    return innerObservable;
  }, concurrent);
}
},{"./mergeMap":"../node_modules/rxjs/dist/esm5/internal/operators/mergeMap.js","../util/isFunction":"../node_modules/rxjs/dist/esm5/internal/util/isFunction.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/mergeScan.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeScan = mergeScan;

var _lift = require("../util/lift");

var _mergeInternals = require("./mergeInternals");

function mergeScan(accumulator, seed, concurrent) {
  if (concurrent === void 0) {
    concurrent = Infinity;
  }

  return (0, _lift.operate)(function (source, subscriber) {
    var state = seed;
    return (0, _mergeInternals.mergeInternals)(source, subscriber, function (value, index) {
      return accumulator(state, value, index);
    }, concurrent, function (value) {
      state = value;
    }, false, undefined, function () {
      return state = null;
    });
  });
}
},{"../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js","./mergeInternals":"../node_modules/rxjs/dist/esm5/internal/operators/mergeInternals.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/merge.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.merge = merge;

var _tslib = require("tslib");

var _lift = require("../util/lift");

var _argsOrArgArray = require("../util/argsOrArgArray");

var _mergeAll = require("./mergeAll");

var _args = require("../util/args");

var _from = require("../observable/from");

function merge() {
  var args = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }

  var scheduler = (0, _args.popScheduler)(args);
  var concurrent = (0, _args.popNumber)(args, Infinity);
  args = (0, _argsOrArgArray.argsOrArgArray)(args);
  return (0, _lift.operate)(function (source, subscriber) {
    (0, _mergeAll.mergeAll)(concurrent)((0, _from.from)((0, _tslib.__spreadArray)([source], (0, _tslib.__read)(args), false), scheduler)).subscribe(subscriber);
  });
}
},{"tslib":"../node_modules/rxjs/node_modules/tslib/tslib.es6.js","../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js","../util/argsOrArgArray":"../node_modules/rxjs/dist/esm5/internal/util/argsOrArgArray.js","./mergeAll":"../node_modules/rxjs/dist/esm5/internal/operators/mergeAll.js","../util/args":"../node_modules/rxjs/dist/esm5/internal/util/args.js","../observable/from":"../node_modules/rxjs/dist/esm5/internal/observable/from.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/mergeWith.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeWith = mergeWith;

var _tslib = require("tslib");

var _merge = require("./merge");

function mergeWith() {
  var otherSources = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    otherSources[_i] = arguments[_i];
  }

  return _merge.merge.apply(void 0, (0, _tslib.__spreadArray)([], (0, _tslib.__read)(otherSources), false));
}
},{"tslib":"../node_modules/rxjs/node_modules/tslib/tslib.es6.js","./merge":"../node_modules/rxjs/dist/esm5/internal/operators/merge.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/min.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.min = min;

var _reduce = require("./reduce");

var _isFunction = require("../util/isFunction");

function min(comparer) {
  return (0, _reduce.reduce)((0, _isFunction.isFunction)(comparer) ? function (x, y) {
    return comparer(x, y) < 0 ? x : y;
  } : function (x, y) {
    return x < y ? x : y;
  });
}
},{"./reduce":"../node_modules/rxjs/dist/esm5/internal/operators/reduce.js","../util/isFunction":"../node_modules/rxjs/dist/esm5/internal/util/isFunction.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/multicast.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.multicast = multicast;

var _ConnectableObservable = require("../observable/ConnectableObservable");

var _isFunction = require("../util/isFunction");

var _connect = require("./connect");

function multicast(subjectOrSubjectFactory, selector) {
  var subjectFactory = (0, _isFunction.isFunction)(subjectOrSubjectFactory) ? subjectOrSubjectFactory : function () {
    return subjectOrSubjectFactory;
  };

  if ((0, _isFunction.isFunction)(selector)) {
    return (0, _connect.connect)(selector, {
      connector: subjectFactory
    });
  }

  return function (source) {
    return new _ConnectableObservable.ConnectableObservable(source, subjectFactory);
  };
}
},{"../observable/ConnectableObservable":"../node_modules/rxjs/dist/esm5/internal/observable/ConnectableObservable.js","../util/isFunction":"../node_modules/rxjs/dist/esm5/internal/util/isFunction.js","./connect":"../node_modules/rxjs/dist/esm5/internal/operators/connect.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/pairwise.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pairwise = pairwise;

var _lift = require("../util/lift");

var _OperatorSubscriber = require("./OperatorSubscriber");

function pairwise() {
  return (0, _lift.operate)(function (source, subscriber) {
    var prev;
    var hasPrev = false;
    source.subscribe(new _OperatorSubscriber.OperatorSubscriber(subscriber, function (value) {
      var p = prev;
      prev = value;
      hasPrev && subscriber.next([p, value]);
      hasPrev = true;
    }));
  });
}
},{"../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js","./OperatorSubscriber":"../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/pluck.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pluck = pluck;

var _map = require("./map");

function pluck() {
  var properties = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    properties[_i] = arguments[_i];
  }

  var length = properties.length;

  if (length === 0) {
    throw new Error('list of properties cannot be empty.');
  }

  return (0, _map.map)(function (x) {
    var currentProp = x;

    for (var i = 0; i < length; i++) {
      var p = currentProp === null || currentProp === void 0 ? void 0 : currentProp[properties[i]];

      if (typeof p !== 'undefined') {
        currentProp = p;
      } else {
        return undefined;
      }
    }

    return currentProp;
  });
}
},{"./map":"../node_modules/rxjs/dist/esm5/internal/operators/map.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/publish.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.publish = publish;

var _Subject = require("../Subject");

var _multicast = require("./multicast");

var _connect = require("./connect");

function publish(selector) {
  return selector ? function (source) {
    return (0, _connect.connect)(selector)(source);
  } : function (source) {
    return (0, _multicast.multicast)(new _Subject.Subject())(source);
  };
}
},{"../Subject":"../node_modules/rxjs/dist/esm5/internal/Subject.js","./multicast":"../node_modules/rxjs/dist/esm5/internal/operators/multicast.js","./connect":"../node_modules/rxjs/dist/esm5/internal/operators/connect.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/publishBehavior.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.publishBehavior = publishBehavior;

var _BehaviorSubject = require("../BehaviorSubject");

var _ConnectableObservable = require("../observable/ConnectableObservable");

function publishBehavior(initialValue) {
  return function (source) {
    var subject = new _BehaviorSubject.BehaviorSubject(initialValue);
    return new _ConnectableObservable.ConnectableObservable(source, function () {
      return subject;
    });
  };
}
},{"../BehaviorSubject":"../node_modules/rxjs/dist/esm5/internal/BehaviorSubject.js","../observable/ConnectableObservable":"../node_modules/rxjs/dist/esm5/internal/observable/ConnectableObservable.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/publishLast.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.publishLast = publishLast;

var _AsyncSubject = require("../AsyncSubject");

var _ConnectableObservable = require("../observable/ConnectableObservable");

function publishLast() {
  return function (source) {
    var subject = new _AsyncSubject.AsyncSubject();
    return new _ConnectableObservable.ConnectableObservable(source, function () {
      return subject;
    });
  };
}
},{"../AsyncSubject":"../node_modules/rxjs/dist/esm5/internal/AsyncSubject.js","../observable/ConnectableObservable":"../node_modules/rxjs/dist/esm5/internal/observable/ConnectableObservable.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/publishReplay.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.publishReplay = publishReplay;

var _ReplaySubject = require("../ReplaySubject");

var _multicast = require("./multicast");

var _isFunction = require("../util/isFunction");

function publishReplay(bufferSize, windowTime, selectorOrScheduler, timestampProvider) {
  if (selectorOrScheduler && !(0, _isFunction.isFunction)(selectorOrScheduler)) {
    timestampProvider = selectorOrScheduler;
  }

  var selector = (0, _isFunction.isFunction)(selectorOrScheduler) ? selectorOrScheduler : undefined;
  return function (source) {
    return (0, _multicast.multicast)(new _ReplaySubject.ReplaySubject(bufferSize, windowTime, timestampProvider), selector)(source);
  };
}
},{"../ReplaySubject":"../node_modules/rxjs/dist/esm5/internal/ReplaySubject.js","./multicast":"../node_modules/rxjs/dist/esm5/internal/operators/multicast.js","../util/isFunction":"../node_modules/rxjs/dist/esm5/internal/util/isFunction.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/raceWith.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.raceWith = raceWith;

var _tslib = require("tslib");

var _race = require("../observable/race");

var _lift = require("../util/lift");

var _identity = require("../util/identity");

function raceWith() {
  var otherSources = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    otherSources[_i] = arguments[_i];
  }

  return !otherSources.length ? _identity.identity : (0, _lift.operate)(function (source, subscriber) {
    (0, _race.raceInit)((0, _tslib.__spreadArray)([source], (0, _tslib.__read)(otherSources), false))(subscriber);
  });
}
},{"tslib":"../node_modules/rxjs/node_modules/tslib/tslib.es6.js","../observable/race":"../node_modules/rxjs/dist/esm5/internal/observable/race.js","../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js","../util/identity":"../node_modules/rxjs/dist/esm5/internal/util/identity.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/repeat.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.repeat = repeat;

var _empty = require("../observable/empty");

var _lift = require("../util/lift");

var _OperatorSubscriber = require("./OperatorSubscriber");

function repeat(count) {
  if (count === void 0) {
    count = Infinity;
  }

  return count <= 0 ? function () {
    return _empty.EMPTY;
  } : (0, _lift.operate)(function (source, subscriber) {
    var soFar = 0;
    var innerSub;

    var subscribeForRepeat = function () {
      var syncUnsub = false;
      innerSub = source.subscribe(new _OperatorSubscriber.OperatorSubscriber(subscriber, undefined, function () {
        if (++soFar < count) {
          if (innerSub) {
            innerSub.unsubscribe();
            innerSub = null;
            subscribeForRepeat();
          } else {
            syncUnsub = true;
          }
        } else {
          subscriber.complete();
        }
      }));

      if (syncUnsub) {
        innerSub.unsubscribe();
        innerSub = null;
        subscribeForRepeat();
      }
    };

    subscribeForRepeat();
  });
}
},{"../observable/empty":"../node_modules/rxjs/dist/esm5/internal/observable/empty.js","../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js","./OperatorSubscriber":"../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/repeatWhen.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.repeatWhen = repeatWhen;

var _Subject = require("../Subject");

var _lift = require("../util/lift");

var _OperatorSubscriber = require("./OperatorSubscriber");

function repeatWhen(notifier) {
  return (0, _lift.operate)(function (source, subscriber) {
    var innerSub;
    var syncResub = false;
    var completions$;
    var isNotifierComplete = false;
    var isMainComplete = false;

    var checkComplete = function () {
      return isMainComplete && isNotifierComplete && (subscriber.complete(), true);
    };

    var getCompletionSubject = function () {
      if (!completions$) {
        completions$ = new _Subject.Subject();
        notifier(completions$).subscribe(new _OperatorSubscriber.OperatorSubscriber(subscriber, function () {
          if (innerSub) {
            subscribeForRepeatWhen();
          } else {
            syncResub = true;
          }
        }, function () {
          isNotifierComplete = true;
          checkComplete();
        }));
      }

      return completions$;
    };

    var subscribeForRepeatWhen = function () {
      isMainComplete = false;
      innerSub = source.subscribe(new _OperatorSubscriber.OperatorSubscriber(subscriber, undefined, function () {
        isMainComplete = true;
        !checkComplete() && getCompletionSubject().next();
      }));

      if (syncResub) {
        innerSub.unsubscribe();
        innerSub = null;
        syncResub = false;
        subscribeForRepeatWhen();
      }
    };

    subscribeForRepeatWhen();
  });
}
},{"../Subject":"../node_modules/rxjs/dist/esm5/internal/Subject.js","../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js","./OperatorSubscriber":"../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/retry.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.retry = retry;

var _lift = require("../util/lift");

var _OperatorSubscriber = require("./OperatorSubscriber");

var _identity = require("../util/identity");

var _timer = require("../observable/timer");

var _innerFrom = require("../observable/innerFrom");

function retry(configOrCount) {
  if (configOrCount === void 0) {
    configOrCount = Infinity;
  }

  var config;

  if (configOrCount && typeof configOrCount === 'object') {
    config = configOrCount;
  } else {
    config = {
      count: configOrCount
    };
  }

  var _a = config.count,
      count = _a === void 0 ? Infinity : _a,
      delay = config.delay,
      _b = config.resetOnSuccess,
      resetOnSuccess = _b === void 0 ? false : _b;
  return count <= 0 ? _identity.identity : (0, _lift.operate)(function (source, subscriber) {
    var soFar = 0;
    var innerSub;

    var subscribeForRetry = function () {
      var syncUnsub = false;
      innerSub = source.subscribe(new _OperatorSubscriber.OperatorSubscriber(subscriber, function (value) {
        if (resetOnSuccess) {
          soFar = 0;
        }

        subscriber.next(value);
      }, undefined, function (err) {
        if (soFar++ < count) {
          var resub_1 = function () {
            if (innerSub) {
              innerSub.unsubscribe();
              innerSub = null;
              subscribeForRetry();
            } else {
              syncUnsub = true;
            }
          };

          if (delay != null) {
            var notifier = typeof delay === 'number' ? (0, _timer.timer)(delay) : (0, _innerFrom.innerFrom)(delay(err, soFar));
            var notifierSubscriber_1 = new _OperatorSubscriber.OperatorSubscriber(subscriber, function () {
              notifierSubscriber_1.unsubscribe();
              resub_1();
            }, function () {
              subscriber.complete();
            });
            notifier.subscribe(notifierSubscriber_1);
          } else {
            resub_1();
          }
        } else {
          subscriber.error(err);
        }
      }));

      if (syncUnsub) {
        innerSub.unsubscribe();
        innerSub = null;
        subscribeForRetry();
      }
    };

    subscribeForRetry();
  });
}
},{"../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js","./OperatorSubscriber":"../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js","../util/identity":"../node_modules/rxjs/dist/esm5/internal/util/identity.js","../observable/timer":"../node_modules/rxjs/dist/esm5/internal/observable/timer.js","../observable/innerFrom":"../node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/retryWhen.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.retryWhen = retryWhen;

var _Subject = require("../Subject");

var _lift = require("../util/lift");

var _OperatorSubscriber = require("./OperatorSubscriber");

function retryWhen(notifier) {
  return (0, _lift.operate)(function (source, subscriber) {
    var innerSub;
    var syncResub = false;
    var errors$;

    var subscribeForRetryWhen = function () {
      innerSub = source.subscribe(new _OperatorSubscriber.OperatorSubscriber(subscriber, undefined, undefined, function (err) {
        if (!errors$) {
          errors$ = new _Subject.Subject();
          notifier(errors$).subscribe(new _OperatorSubscriber.OperatorSubscriber(subscriber, function () {
            return innerSub ? subscribeForRetryWhen() : syncResub = true;
          }));
        }

        if (errors$) {
          errors$.next(err);
        }
      }));

      if (syncResub) {
        innerSub.unsubscribe();
        innerSub = null;
        syncResub = false;
        subscribeForRetryWhen();
      }
    };

    subscribeForRetryWhen();
  });
}
},{"../Subject":"../node_modules/rxjs/dist/esm5/internal/Subject.js","../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js","./OperatorSubscriber":"../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/sample.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sample = sample;

var _lift = require("../util/lift");

var _noop = require("../util/noop");

var _OperatorSubscriber = require("./OperatorSubscriber");

function sample(notifier) {
  return (0, _lift.operate)(function (source, subscriber) {
    var hasValue = false;
    var lastValue = null;
    source.subscribe(new _OperatorSubscriber.OperatorSubscriber(subscriber, function (value) {
      hasValue = true;
      lastValue = value;
    }));

    var emit = function () {
      if (hasValue) {
        hasValue = false;
        var value = lastValue;
        lastValue = null;
        subscriber.next(value);
      }
    };

    notifier.subscribe(new _OperatorSubscriber.OperatorSubscriber(subscriber, emit, _noop.noop));
  });
}
},{"../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js","../util/noop":"../node_modules/rxjs/dist/esm5/internal/util/noop.js","./OperatorSubscriber":"../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/sampleTime.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sampleTime = sampleTime;

var _async = require("../scheduler/async");

var _sample = require("./sample");

var _interval = require("../observable/interval");

function sampleTime(period, scheduler) {
  if (scheduler === void 0) {
    scheduler = _async.asyncScheduler;
  }

  return (0, _sample.sample)((0, _interval.interval)(period, scheduler));
}
},{"../scheduler/async":"../node_modules/rxjs/dist/esm5/internal/scheduler/async.js","./sample":"../node_modules/rxjs/dist/esm5/internal/operators/sample.js","../observable/interval":"../node_modules/rxjs/dist/esm5/internal/observable/interval.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/scan.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scan = scan;

var _lift = require("../util/lift");

var _scanInternals = require("./scanInternals");

function scan(accumulator, seed) {
  return (0, _lift.operate)((0, _scanInternals.scanInternals)(accumulator, seed, arguments.length >= 2, true));
}
},{"../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js","./scanInternals":"../node_modules/rxjs/dist/esm5/internal/operators/scanInternals.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/sequenceEqual.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sequenceEqual = sequenceEqual;

var _lift = require("../util/lift");

var _OperatorSubscriber = require("./OperatorSubscriber");

function sequenceEqual(compareTo, comparator) {
  if (comparator === void 0) {
    comparator = function (a, b) {
      return a === b;
    };
  }

  return (0, _lift.operate)(function (source, subscriber) {
    var aState = createState();
    var bState = createState();

    var emit = function (isEqual) {
      subscriber.next(isEqual);
      subscriber.complete();
    };

    var createSubscriber = function (selfState, otherState) {
      var sequenceEqualSubscriber = new _OperatorSubscriber.OperatorSubscriber(subscriber, function (a) {
        var buffer = otherState.buffer,
            complete = otherState.complete;

        if (buffer.length === 0) {
          complete ? emit(false) : selfState.buffer.push(a);
        } else {
          !comparator(a, buffer.shift()) && emit(false);
        }
      }, function () {
        selfState.complete = true;
        var complete = otherState.complete,
            buffer = otherState.buffer;
        complete && emit(buffer.length === 0);
        sequenceEqualSubscriber === null || sequenceEqualSubscriber === void 0 ? void 0 : sequenceEqualSubscriber.unsubscribe();
      });
      return sequenceEqualSubscriber;
    };

    source.subscribe(createSubscriber(aState, bState));
    compareTo.subscribe(createSubscriber(bState, aState));
  });
}

function createState() {
  return {
    buffer: [],
    complete: false
  };
}
},{"../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js","./OperatorSubscriber":"../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/share.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.share = share;

var _tslib = require("tslib");

var _from = require("../observable/from");

var _take = require("../operators/take");

var _Subject = require("../Subject");

var _Subscriber = require("../Subscriber");

var _lift = require("../util/lift");

function share(options) {
  if (options === void 0) {
    options = {};
  }

  var _a = options.connector,
      connector = _a === void 0 ? function () {
    return new _Subject.Subject();
  } : _a,
      _b = options.resetOnError,
      resetOnError = _b === void 0 ? true : _b,
      _c = options.resetOnComplete,
      resetOnComplete = _c === void 0 ? true : _c,
      _d = options.resetOnRefCountZero,
      resetOnRefCountZero = _d === void 0 ? true : _d;
  return function (wrapperSource) {
    var connection = null;
    var resetConnection = null;
    var subject = null;
    var refCount = 0;
    var hasCompleted = false;
    var hasErrored = false;

    var cancelReset = function () {
      resetConnection === null || resetConnection === void 0 ? void 0 : resetConnection.unsubscribe();
      resetConnection = null;
    };

    var reset = function () {
      cancelReset();
      connection = subject = null;
      hasCompleted = hasErrored = false;
    };

    var resetAndUnsubscribe = function () {
      var conn = connection;
      reset();
      conn === null || conn === void 0 ? void 0 : conn.unsubscribe();
    };

    return (0, _lift.operate)(function (source, subscriber) {
      refCount++;

      if (!hasErrored && !hasCompleted) {
        cancelReset();
      }

      var dest = subject = subject !== null && subject !== void 0 ? subject : connector();
      subscriber.add(function () {
        refCount--;

        if (refCount === 0 && !hasErrored && !hasCompleted) {
          resetConnection = handleReset(resetAndUnsubscribe, resetOnRefCountZero);
        }
      });
      dest.subscribe(subscriber);

      if (!connection) {
        connection = new _Subscriber.SafeSubscriber({
          next: function (value) {
            return dest.next(value);
          },
          error: function (err) {
            hasErrored = true;
            cancelReset();
            resetConnection = handleReset(reset, resetOnError, err);
            dest.error(err);
          },
          complete: function () {
            hasCompleted = true;
            cancelReset();
            resetConnection = handleReset(reset, resetOnComplete);
            dest.complete();
          }
        });
        (0, _from.from)(source).subscribe(connection);
      }
    })(wrapperSource);
  };
}

function handleReset(reset, on) {
  var args = [];

  for (var _i = 2; _i < arguments.length; _i++) {
    args[_i - 2] = arguments[_i];
  }

  if (on === true) {
    reset();
    return null;
  }

  if (on === false) {
    return null;
  }

  return on.apply(void 0, (0, _tslib.__spreadArray)([], (0, _tslib.__read)(args), false)).pipe((0, _take.take)(1)).subscribe(function () {
    return reset();
  });
}
},{"tslib":"../node_modules/rxjs/node_modules/tslib/tslib.es6.js","../observable/from":"../node_modules/rxjs/dist/esm5/internal/observable/from.js","../operators/take":"../node_modules/rxjs/dist/esm5/internal/operators/take.js","../Subject":"../node_modules/rxjs/dist/esm5/internal/Subject.js","../Subscriber":"../node_modules/rxjs/dist/esm5/internal/Subscriber.js","../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/shareReplay.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shareReplay = shareReplay;

var _ReplaySubject = require("../ReplaySubject");

var _share = require("./share");

function shareReplay(configOrBufferSize, windowTime, scheduler) {
  var _a, _b;

  var bufferSize;
  var refCount = false;

  if (configOrBufferSize && typeof configOrBufferSize === 'object') {
    bufferSize = (_a = configOrBufferSize.bufferSize) !== null && _a !== void 0 ? _a : Infinity;
    windowTime = (_b = configOrBufferSize.windowTime) !== null && _b !== void 0 ? _b : Infinity;
    refCount = !!configOrBufferSize.refCount;
    scheduler = configOrBufferSize.scheduler;
  } else {
    bufferSize = configOrBufferSize !== null && configOrBufferSize !== void 0 ? configOrBufferSize : Infinity;
  }

  return (0, _share.share)({
    connector: function () {
      return new _ReplaySubject.ReplaySubject(bufferSize, windowTime, scheduler);
    },
    resetOnError: true,
    resetOnComplete: false,
    resetOnRefCountZero: refCount
  });
}
},{"../ReplaySubject":"../node_modules/rxjs/dist/esm5/internal/ReplaySubject.js","./share":"../node_modules/rxjs/dist/esm5/internal/operators/share.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/single.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.single = single;

var _EmptyError = require("../util/EmptyError");

var _SequenceError = require("../util/SequenceError");

var _NotFoundError = require("../util/NotFoundError");

var _lift = require("../util/lift");

var _OperatorSubscriber = require("./OperatorSubscriber");

function single(predicate) {
  return (0, _lift.operate)(function (source, subscriber) {
    var hasValue = false;
    var singleValue;
    var seenValue = false;
    var index = 0;
    source.subscribe(new _OperatorSubscriber.OperatorSubscriber(subscriber, function (value) {
      seenValue = true;

      if (!predicate || predicate(value, index++, source)) {
        hasValue && subscriber.error(new _SequenceError.SequenceError('Too many matching values'));
        hasValue = true;
        singleValue = value;
      }
    }, function () {
      if (hasValue) {
        subscriber.next(singleValue);
        subscriber.complete();
      } else {
        subscriber.error(seenValue ? new _NotFoundError.NotFoundError('No matching values') : new _EmptyError.EmptyError());
      }
    }));
  });
}
},{"../util/EmptyError":"../node_modules/rxjs/dist/esm5/internal/util/EmptyError.js","../util/SequenceError":"../node_modules/rxjs/dist/esm5/internal/util/SequenceError.js","../util/NotFoundError":"../node_modules/rxjs/dist/esm5/internal/util/NotFoundError.js","../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js","./OperatorSubscriber":"../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/skip.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.skip = skip;

var _filter = require("./filter");

function skip(count) {
  return (0, _filter.filter)(function (_, index) {
    return count <= index;
  });
}
},{"./filter":"../node_modules/rxjs/dist/esm5/internal/operators/filter.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/skipLast.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.skipLast = skipLast;

var _identity = require("../util/identity");

var _lift = require("../util/lift");

var _OperatorSubscriber = require("./OperatorSubscriber");

function skipLast(skipCount) {
  return skipCount <= 0 ? _identity.identity : (0, _lift.operate)(function (source, subscriber) {
    var ring = new Array(skipCount);
    var seen = 0;
    source.subscribe(new _OperatorSubscriber.OperatorSubscriber(subscriber, function (value) {
      var valueIndex = seen++;

      if (valueIndex < skipCount) {
        ring[valueIndex] = value;
      } else {
        var index = valueIndex % skipCount;
        var oldValue = ring[index];
        ring[index] = value;
        subscriber.next(oldValue);
      }
    }));
    return function () {
      ring = null;
    };
  });
}
},{"../util/identity":"../node_modules/rxjs/dist/esm5/internal/util/identity.js","../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js","./OperatorSubscriber":"../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/skipUntil.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.skipUntil = skipUntil;

var _lift = require("../util/lift");

var _OperatorSubscriber = require("./OperatorSubscriber");

var _innerFrom = require("../observable/innerFrom");

var _noop = require("../util/noop");

function skipUntil(notifier) {
  return (0, _lift.operate)(function (source, subscriber) {
    var taking = false;
    var skipSubscriber = new _OperatorSubscriber.OperatorSubscriber(subscriber, function () {
      skipSubscriber === null || skipSubscriber === void 0 ? void 0 : skipSubscriber.unsubscribe();
      taking = true;
    }, _noop.noop);
    (0, _innerFrom.innerFrom)(notifier).subscribe(skipSubscriber);
    source.subscribe(new _OperatorSubscriber.OperatorSubscriber(subscriber, function (value) {
      return taking && subscriber.next(value);
    }));
  });
}
},{"../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js","./OperatorSubscriber":"../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js","../observable/innerFrom":"../node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js","../util/noop":"../node_modules/rxjs/dist/esm5/internal/util/noop.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/skipWhile.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.skipWhile = skipWhile;

var _lift = require("../util/lift");

var _OperatorSubscriber = require("./OperatorSubscriber");

function skipWhile(predicate) {
  return (0, _lift.operate)(function (source, subscriber) {
    var taking = false;
    var index = 0;
    source.subscribe(new _OperatorSubscriber.OperatorSubscriber(subscriber, function (value) {
      return (taking || (taking = !predicate(value, index++))) && subscriber.next(value);
    }));
  });
}
},{"../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js","./OperatorSubscriber":"../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/startWith.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startWith = startWith;

var _concat = require("../observable/concat");

var _args = require("../util/args");

var _lift = require("../util/lift");

function startWith() {
  var values = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    values[_i] = arguments[_i];
  }

  var scheduler = (0, _args.popScheduler)(values);
  return (0, _lift.operate)(function (source, subscriber) {
    (scheduler ? (0, _concat.concat)(values, source, scheduler) : (0, _concat.concat)(values, source)).subscribe(subscriber);
  });
}
},{"../observable/concat":"../node_modules/rxjs/dist/esm5/internal/observable/concat.js","../util/args":"../node_modules/rxjs/dist/esm5/internal/util/args.js","../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/switchMap.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.switchMap = switchMap;

var _innerFrom = require("../observable/innerFrom");

var _lift = require("../util/lift");

var _OperatorSubscriber = require("./OperatorSubscriber");

function switchMap(project, resultSelector) {
  return (0, _lift.operate)(function (source, subscriber) {
    var innerSubscriber = null;
    var index = 0;
    var isComplete = false;

    var checkComplete = function () {
      return isComplete && !innerSubscriber && subscriber.complete();
    };

    source.subscribe(new _OperatorSubscriber.OperatorSubscriber(subscriber, function (value) {
      innerSubscriber === null || innerSubscriber === void 0 ? void 0 : innerSubscriber.unsubscribe();
      var innerIndex = 0;
      var outerIndex = index++;
      (0, _innerFrom.innerFrom)(project(value, outerIndex)).subscribe(innerSubscriber = new _OperatorSubscriber.OperatorSubscriber(subscriber, function (innerValue) {
        return subscriber.next(resultSelector ? resultSelector(value, innerValue, outerIndex, innerIndex++) : innerValue);
      }, function () {
        innerSubscriber = null;
        checkComplete();
      }));
    }, function () {
      isComplete = true;
      checkComplete();
    }));
  });
}
},{"../observable/innerFrom":"../node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js","../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js","./OperatorSubscriber":"../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/switchAll.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.switchAll = switchAll;

var _switchMap = require("./switchMap");

var _identity = require("../util/identity");

function switchAll() {
  return (0, _switchMap.switchMap)(_identity.identity);
}
},{"./switchMap":"../node_modules/rxjs/dist/esm5/internal/operators/switchMap.js","../util/identity":"../node_modules/rxjs/dist/esm5/internal/util/identity.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/switchMapTo.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.switchMapTo = switchMapTo;

var _switchMap = require("./switchMap");

var _isFunction = require("../util/isFunction");

function switchMapTo(innerObservable, resultSelector) {
  return (0, _isFunction.isFunction)(resultSelector) ? (0, _switchMap.switchMap)(function () {
    return innerObservable;
  }, resultSelector) : (0, _switchMap.switchMap)(function () {
    return innerObservable;
  });
}
},{"./switchMap":"../node_modules/rxjs/dist/esm5/internal/operators/switchMap.js","../util/isFunction":"../node_modules/rxjs/dist/esm5/internal/util/isFunction.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/switchScan.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.switchScan = switchScan;

var _switchMap = require("./switchMap");

var _lift = require("../util/lift");

function switchScan(accumulator, seed) {
  return (0, _lift.operate)(function (source, subscriber) {
    var state = seed;
    (0, _switchMap.switchMap)(function (value, index) {
      return accumulator(state, value, index);
    }, function (_, innerValue) {
      return state = innerValue, innerValue;
    })(source).subscribe(subscriber);
    return function () {
      state = null;
    };
  });
}
},{"./switchMap":"../node_modules/rxjs/dist/esm5/internal/operators/switchMap.js","../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/takeUntil.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.takeUntil = takeUntil;

var _lift = require("../util/lift");

var _OperatorSubscriber = require("./OperatorSubscriber");

var _innerFrom = require("../observable/innerFrom");

var _noop = require("../util/noop");

function takeUntil(notifier) {
  return (0, _lift.operate)(function (source, subscriber) {
    (0, _innerFrom.innerFrom)(notifier).subscribe(new _OperatorSubscriber.OperatorSubscriber(subscriber, function () {
      return subscriber.complete();
    }, _noop.noop));
    !subscriber.closed && source.subscribe(subscriber);
  });
}
},{"../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js","./OperatorSubscriber":"../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js","../observable/innerFrom":"../node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js","../util/noop":"../node_modules/rxjs/dist/esm5/internal/util/noop.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/takeWhile.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.takeWhile = takeWhile;

var _lift = require("../util/lift");

var _OperatorSubscriber = require("./OperatorSubscriber");

function takeWhile(predicate, inclusive) {
  if (inclusive === void 0) {
    inclusive = false;
  }

  return (0, _lift.operate)(function (source, subscriber) {
    var index = 0;
    source.subscribe(new _OperatorSubscriber.OperatorSubscriber(subscriber, function (value) {
      var result = predicate(value, index++);
      (result || inclusive) && subscriber.next(value);
      !result && subscriber.complete();
    }));
  });
}
},{"../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js","./OperatorSubscriber":"../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/tap.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tap = tap;

var _isFunction = require("../util/isFunction");

var _lift = require("../util/lift");

var _OperatorSubscriber = require("./OperatorSubscriber");

var _identity = require("../util/identity");

function tap(observerOrNext, error, complete) {
  var tapObserver = (0, _isFunction.isFunction)(observerOrNext) || error || complete ? {
    next: observerOrNext,
    error: error,
    complete: complete
  } : observerOrNext;
  return tapObserver ? (0, _lift.operate)(function (source, subscriber) {
    var _a;

    (_a = tapObserver.subscribe) === null || _a === void 0 ? void 0 : _a.call(tapObserver);
    var isUnsub = true;
    source.subscribe(new _OperatorSubscriber.OperatorSubscriber(subscriber, function (value) {
      var _a;

      (_a = tapObserver.next) === null || _a === void 0 ? void 0 : _a.call(tapObserver, value);
      subscriber.next(value);
    }, function () {
      var _a;

      isUnsub = false;
      (_a = tapObserver.complete) === null || _a === void 0 ? void 0 : _a.call(tapObserver);
      subscriber.complete();
    }, function (err) {
      var _a;

      isUnsub = false;
      (_a = tapObserver.error) === null || _a === void 0 ? void 0 : _a.call(tapObserver, err);
      subscriber.error(err);
    }, function () {
      var _a, _b;

      if (isUnsub) {
        (_a = tapObserver.unsubscribe) === null || _a === void 0 ? void 0 : _a.call(tapObserver);
      }

      (_b = tapObserver.finalize) === null || _b === void 0 ? void 0 : _b.call(tapObserver);
    }));
  }) : _identity.identity;
}
},{"../util/isFunction":"../node_modules/rxjs/dist/esm5/internal/util/isFunction.js","../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js","./OperatorSubscriber":"../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js","../util/identity":"../node_modules/rxjs/dist/esm5/internal/util/identity.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/throttle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.throttle = throttle;
exports.defaultThrottleConfig = void 0;

var _lift = require("../util/lift");

var _OperatorSubscriber = require("./OperatorSubscriber");

var _innerFrom = require("../observable/innerFrom");

var defaultThrottleConfig = {
  leading: true,
  trailing: false
};
exports.defaultThrottleConfig = defaultThrottleConfig;

function throttle(durationSelector, _a) {
  var _b = _a === void 0 ? defaultThrottleConfig : _a,
      leading = _b.leading,
      trailing = _b.trailing;

  return (0, _lift.operate)(function (source, subscriber) {
    var hasValue = false;
    var sendValue = null;
    var throttled = null;
    var isComplete = false;

    var endThrottling = function () {
      throttled === null || throttled === void 0 ? void 0 : throttled.unsubscribe();
      throttled = null;

      if (trailing) {
        send();
        isComplete && subscriber.complete();
      }
    };

    var cleanupThrottling = function () {
      throttled = null;
      isComplete && subscriber.complete();
    };

    var startThrottle = function (value) {
      return throttled = (0, _innerFrom.innerFrom)(durationSelector(value)).subscribe(new _OperatorSubscriber.OperatorSubscriber(subscriber, endThrottling, cleanupThrottling));
    };

    var send = function () {
      if (hasValue) {
        hasValue = false;
        var value = sendValue;
        sendValue = null;
        subscriber.next(value);
        !isComplete && startThrottle(value);
      }
    };

    source.subscribe(new _OperatorSubscriber.OperatorSubscriber(subscriber, function (value) {
      hasValue = true;
      sendValue = value;
      !(throttled && !throttled.closed) && (leading ? send() : startThrottle(value));
    }, function () {
      isComplete = true;
      !(trailing && hasValue && throttled && !throttled.closed) && subscriber.complete();
    }));
  });
}
},{"../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js","./OperatorSubscriber":"../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js","../observable/innerFrom":"../node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/throttleTime.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.throttleTime = throttleTime;

var _async = require("../scheduler/async");

var _throttle = require("./throttle");

var _timer = require("../observable/timer");

function throttleTime(duration, scheduler, config) {
  if (scheduler === void 0) {
    scheduler = _async.asyncScheduler;
  }

  if (config === void 0) {
    config = _throttle.defaultThrottleConfig;
  }

  var duration$ = (0, _timer.timer)(duration, scheduler);
  return (0, _throttle.throttle)(function () {
    return duration$;
  }, config);
}
},{"../scheduler/async":"../node_modules/rxjs/dist/esm5/internal/scheduler/async.js","./throttle":"../node_modules/rxjs/dist/esm5/internal/operators/throttle.js","../observable/timer":"../node_modules/rxjs/dist/esm5/internal/observable/timer.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/timeInterval.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timeInterval = timeInterval;
exports.TimeInterval = void 0;

var _async = require("../scheduler/async");

var _scan = require("./scan");

var _defer = require("../observable/defer");

var _map = require("./map");

function timeInterval(scheduler) {
  if (scheduler === void 0) {
    scheduler = _async.async;
  }

  return function (source) {
    return (0, _defer.defer)(function () {
      return source.pipe((0, _scan.scan)(function (_a, value) {
        var current = _a.current;
        return {
          value: value,
          current: scheduler.now(),
          last: current
        };
      }, {
        current: scheduler.now(),
        value: undefined,
        last: undefined
      }), (0, _map.map)(function (_a) {
        var current = _a.current,
            last = _a.last,
            value = _a.value;
        return new TimeInterval(value, current - last);
      }));
    });
  };
}

var TimeInterval = function () {
  function TimeInterval(value, interval) {
    this.value = value;
    this.interval = interval;
  }

  return TimeInterval;
}();

exports.TimeInterval = TimeInterval;
},{"../scheduler/async":"../node_modules/rxjs/dist/esm5/internal/scheduler/async.js","./scan":"../node_modules/rxjs/dist/esm5/internal/operators/scan.js","../observable/defer":"../node_modules/rxjs/dist/esm5/internal/observable/defer.js","./map":"../node_modules/rxjs/dist/esm5/internal/operators/map.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/timeoutWith.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timeoutWith = timeoutWith;

var _async = require("../scheduler/async");

var _isDate = require("../util/isDate");

var _timeout = require("./timeout");

function timeoutWith(due, withObservable, scheduler) {
  var first;
  var each;

  var _with;

  scheduler = scheduler !== null && scheduler !== void 0 ? scheduler : _async.async;

  if ((0, _isDate.isValidDate)(due)) {
    first = due;
  } else if (typeof due === 'number') {
    each = due;
  }

  if (withObservable) {
    _with = function () {
      return withObservable;
    };
  } else {
    throw new TypeError('No observable provided to switch to');
  }

  if (first == null && each == null) {
    throw new TypeError('No timeout provided.');
  }

  return (0, _timeout.timeout)({
    first: first,
    each: each,
    scheduler: scheduler,
    with: _with
  });
}
},{"../scheduler/async":"../node_modules/rxjs/dist/esm5/internal/scheduler/async.js","../util/isDate":"../node_modules/rxjs/dist/esm5/internal/util/isDate.js","./timeout":"../node_modules/rxjs/dist/esm5/internal/operators/timeout.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/timestamp.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timestamp = timestamp;

var _dateTimestampProvider = require("../scheduler/dateTimestampProvider");

var _map = require("./map");

function timestamp(timestampProvider) {
  if (timestampProvider === void 0) {
    timestampProvider = _dateTimestampProvider.dateTimestampProvider;
  }

  return (0, _map.map)(function (value) {
    return {
      value: value,
      timestamp: timestampProvider.now()
    };
  });
}
},{"../scheduler/dateTimestampProvider":"../node_modules/rxjs/dist/esm5/internal/scheduler/dateTimestampProvider.js","./map":"../node_modules/rxjs/dist/esm5/internal/operators/map.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/window.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.window = window;

var _Subject = require("../Subject");

var _lift = require("../util/lift");

var _OperatorSubscriber = require("./OperatorSubscriber");

var _noop = require("../util/noop");

function window(windowBoundaries) {
  return (0, _lift.operate)(function (source, subscriber) {
    var windowSubject = new _Subject.Subject();
    subscriber.next(windowSubject.asObservable());

    var errorHandler = function (err) {
      windowSubject.error(err);
      subscriber.error(err);
    };

    source.subscribe(new _OperatorSubscriber.OperatorSubscriber(subscriber, function (value) {
      return windowSubject === null || windowSubject === void 0 ? void 0 : windowSubject.next(value);
    }, function () {
      windowSubject.complete();
      subscriber.complete();
    }, errorHandler));
    windowBoundaries.subscribe(new _OperatorSubscriber.OperatorSubscriber(subscriber, function () {
      windowSubject.complete();
      subscriber.next(windowSubject = new _Subject.Subject());
    }, _noop.noop, errorHandler));
    return function () {
      windowSubject === null || windowSubject === void 0 ? void 0 : windowSubject.unsubscribe();
      windowSubject = null;
    };
  });
}
},{"../Subject":"../node_modules/rxjs/dist/esm5/internal/Subject.js","../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js","./OperatorSubscriber":"../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js","../util/noop":"../node_modules/rxjs/dist/esm5/internal/util/noop.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/windowCount.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.windowCount = windowCount;

var _tslib = require("tslib");

var _Subject = require("../Subject");

var _lift = require("../util/lift");

var _OperatorSubscriber = require("./OperatorSubscriber");

function windowCount(windowSize, startWindowEvery) {
  if (startWindowEvery === void 0) {
    startWindowEvery = 0;
  }

  var startEvery = startWindowEvery > 0 ? startWindowEvery : windowSize;
  return (0, _lift.operate)(function (source, subscriber) {
    var windows = [new _Subject.Subject()];
    var starts = [];
    var count = 0;
    subscriber.next(windows[0].asObservable());
    source.subscribe(new _OperatorSubscriber.OperatorSubscriber(subscriber, function (value) {
      var e_1, _a;

      try {
        for (var windows_1 = (0, _tslib.__values)(windows), windows_1_1 = windows_1.next(); !windows_1_1.done; windows_1_1 = windows_1.next()) {
          var window_1 = windows_1_1.value;
          window_1.next(value);
        }
      } catch (e_1_1) {
        e_1 = {
          error: e_1_1
        };
      } finally {
        try {
          if (windows_1_1 && !windows_1_1.done && (_a = windows_1.return)) _a.call(windows_1);
        } finally {
          if (e_1) throw e_1.error;
        }
      }

      var c = count - windowSize + 1;

      if (c >= 0 && c % startEvery === 0) {
        windows.shift().complete();
      }

      if (++count % startEvery === 0) {
        var window_2 = new _Subject.Subject();
        windows.push(window_2);
        subscriber.next(window_2.asObservable());
      }
    }, function () {
      while (windows.length > 0) {
        windows.shift().complete();
      }

      subscriber.complete();
    }, function (err) {
      while (windows.length > 0) {
        windows.shift().error(err);
      }

      subscriber.error(err);
    }, function () {
      starts = null;
      windows = null;
    }));
  });
}
},{"tslib":"../node_modules/rxjs/node_modules/tslib/tslib.es6.js","../Subject":"../node_modules/rxjs/dist/esm5/internal/Subject.js","../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js","./OperatorSubscriber":"../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/windowTime.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.windowTime = windowTime;

var _Subject = require("../Subject");

var _async = require("../scheduler/async");

var _Subscription = require("../Subscription");

var _lift = require("../util/lift");

var _OperatorSubscriber = require("./OperatorSubscriber");

var _arrRemove = require("../util/arrRemove");

var _args = require("../util/args");

var _executeSchedule = require("../util/executeSchedule");

function windowTime(windowTimeSpan) {
  var _a, _b;

  var otherArgs = [];

  for (var _i = 1; _i < arguments.length; _i++) {
    otherArgs[_i - 1] = arguments[_i];
  }

  var scheduler = (_a = (0, _args.popScheduler)(otherArgs)) !== null && _a !== void 0 ? _a : _async.asyncScheduler;
  var windowCreationInterval = (_b = otherArgs[0]) !== null && _b !== void 0 ? _b : null;
  var maxWindowSize = otherArgs[1] || Infinity;
  return (0, _lift.operate)(function (source, subscriber) {
    var windowRecords = [];
    var restartOnClose = false;

    var closeWindow = function (record) {
      var window = record.window,
          subs = record.subs;
      window.complete();
      subs.unsubscribe();
      (0, _arrRemove.arrRemove)(windowRecords, record);
      restartOnClose && startWindow();
    };

    var startWindow = function () {
      if (windowRecords) {
        var subs = new _Subscription.Subscription();
        subscriber.add(subs);
        var window_1 = new _Subject.Subject();
        var record_1 = {
          window: window_1,
          subs: subs,
          seen: 0
        };
        windowRecords.push(record_1);
        subscriber.next(window_1.asObservable());
        (0, _executeSchedule.executeSchedule)(subs, scheduler, function () {
          return closeWindow(record_1);
        }, windowTimeSpan);
      }
    };

    if (windowCreationInterval !== null && windowCreationInterval >= 0) {
      (0, _executeSchedule.executeSchedule)(subscriber, scheduler, startWindow, windowCreationInterval, true);
    } else {
      restartOnClose = true;
    }

    startWindow();

    var loop = function (cb) {
      return windowRecords.slice().forEach(cb);
    };

    var terminate = function (cb) {
      loop(function (_a) {
        var window = _a.window;
        return cb(window);
      });
      cb(subscriber);
      subscriber.unsubscribe();
    };

    source.subscribe(new _OperatorSubscriber.OperatorSubscriber(subscriber, function (value) {
      loop(function (record) {
        record.window.next(value);
        maxWindowSize <= ++record.seen && closeWindow(record);
      });
    }, function () {
      return terminate(function (consumer) {
        return consumer.complete();
      });
    }, function (err) {
      return terminate(function (consumer) {
        return consumer.error(err);
      });
    }));
    return function () {
      windowRecords = null;
    };
  });
}
},{"../Subject":"../node_modules/rxjs/dist/esm5/internal/Subject.js","../scheduler/async":"../node_modules/rxjs/dist/esm5/internal/scheduler/async.js","../Subscription":"../node_modules/rxjs/dist/esm5/internal/Subscription.js","../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js","./OperatorSubscriber":"../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js","../util/arrRemove":"../node_modules/rxjs/dist/esm5/internal/util/arrRemove.js","../util/args":"../node_modules/rxjs/dist/esm5/internal/util/args.js","../util/executeSchedule":"../node_modules/rxjs/dist/esm5/internal/util/executeSchedule.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/windowToggle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.windowToggle = windowToggle;

var _tslib = require("tslib");

var _Subject = require("../Subject");

var _Subscription = require("../Subscription");

var _lift = require("../util/lift");

var _innerFrom = require("../observable/innerFrom");

var _OperatorSubscriber = require("./OperatorSubscriber");

var _noop = require("../util/noop");

var _arrRemove = require("../util/arrRemove");

function windowToggle(openings, closingSelector) {
  return (0, _lift.operate)(function (source, subscriber) {
    var windows = [];

    var handleError = function (err) {
      while (0 < windows.length) {
        windows.shift().error(err);
      }

      subscriber.error(err);
    };

    (0, _innerFrom.innerFrom)(openings).subscribe(new _OperatorSubscriber.OperatorSubscriber(subscriber, function (openValue) {
      var window = new _Subject.Subject();
      windows.push(window);
      var closingSubscription = new _Subscription.Subscription();

      var closeWindow = function () {
        (0, _arrRemove.arrRemove)(windows, window);
        window.complete();
        closingSubscription.unsubscribe();
      };

      var closingNotifier;

      try {
        closingNotifier = (0, _innerFrom.innerFrom)(closingSelector(openValue));
      } catch (err) {
        handleError(err);
        return;
      }

      subscriber.next(window.asObservable());
      closingSubscription.add(closingNotifier.subscribe(new _OperatorSubscriber.OperatorSubscriber(subscriber, closeWindow, _noop.noop, handleError)));
    }, _noop.noop));
    source.subscribe(new _OperatorSubscriber.OperatorSubscriber(subscriber, function (value) {
      var e_1, _a;

      var windowsCopy = windows.slice();

      try {
        for (var windowsCopy_1 = (0, _tslib.__values)(windowsCopy), windowsCopy_1_1 = windowsCopy_1.next(); !windowsCopy_1_1.done; windowsCopy_1_1 = windowsCopy_1.next()) {
          var window_1 = windowsCopy_1_1.value;
          window_1.next(value);
        }
      } catch (e_1_1) {
        e_1 = {
          error: e_1_1
        };
      } finally {
        try {
          if (windowsCopy_1_1 && !windowsCopy_1_1.done && (_a = windowsCopy_1.return)) _a.call(windowsCopy_1);
        } finally {
          if (e_1) throw e_1.error;
        }
      }
    }, function () {
      while (0 < windows.length) {
        windows.shift().complete();
      }

      subscriber.complete();
    }, handleError, function () {
      while (0 < windows.length) {
        windows.shift().unsubscribe();
      }
    }));
  });
}
},{"tslib":"../node_modules/rxjs/node_modules/tslib/tslib.es6.js","../Subject":"../node_modules/rxjs/dist/esm5/internal/Subject.js","../Subscription":"../node_modules/rxjs/dist/esm5/internal/Subscription.js","../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js","../observable/innerFrom":"../node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js","./OperatorSubscriber":"../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js","../util/noop":"../node_modules/rxjs/dist/esm5/internal/util/noop.js","../util/arrRemove":"../node_modules/rxjs/dist/esm5/internal/util/arrRemove.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/windowWhen.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.windowWhen = windowWhen;

var _Subject = require("../Subject");

var _lift = require("../util/lift");

var _OperatorSubscriber = require("./OperatorSubscriber");

var _innerFrom = require("../observable/innerFrom");

function windowWhen(closingSelector) {
  return (0, _lift.operate)(function (source, subscriber) {
    var window;
    var closingSubscriber;

    var handleError = function (err) {
      window.error(err);
      subscriber.error(err);
    };

    var openWindow = function () {
      closingSubscriber === null || closingSubscriber === void 0 ? void 0 : closingSubscriber.unsubscribe();
      window === null || window === void 0 ? void 0 : window.complete();
      window = new _Subject.Subject();
      subscriber.next(window.asObservable());
      var closingNotifier;

      try {
        closingNotifier = (0, _innerFrom.innerFrom)(closingSelector());
      } catch (err) {
        handleError(err);
        return;
      }

      closingNotifier.subscribe(closingSubscriber = new _OperatorSubscriber.OperatorSubscriber(subscriber, openWindow, openWindow, handleError));
    };

    openWindow();
    source.subscribe(new _OperatorSubscriber.OperatorSubscriber(subscriber, function (value) {
      return window.next(value);
    }, function () {
      window.complete();
      subscriber.complete();
    }, handleError, function () {
      closingSubscriber === null || closingSubscriber === void 0 ? void 0 : closingSubscriber.unsubscribe();
      window = null;
    }));
  });
}
},{"../Subject":"../node_modules/rxjs/dist/esm5/internal/Subject.js","../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js","./OperatorSubscriber":"../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js","../observable/innerFrom":"../node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/withLatestFrom.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withLatestFrom = withLatestFrom;

var _tslib = require("tslib");

var _lift = require("../util/lift");

var _OperatorSubscriber = require("./OperatorSubscriber");

var _innerFrom = require("../observable/innerFrom");

var _identity = require("../util/identity");

var _noop = require("../util/noop");

var _args = require("../util/args");

function withLatestFrom() {
  var inputs = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    inputs[_i] = arguments[_i];
  }

  var project = (0, _args.popResultSelector)(inputs);
  return (0, _lift.operate)(function (source, subscriber) {
    var len = inputs.length;
    var otherValues = new Array(len);
    var hasValue = inputs.map(function () {
      return false;
    });
    var ready = false;

    var _loop_1 = function (i) {
      (0, _innerFrom.innerFrom)(inputs[i]).subscribe(new _OperatorSubscriber.OperatorSubscriber(subscriber, function (value) {
        otherValues[i] = value;

        if (!ready && !hasValue[i]) {
          hasValue[i] = true;
          (ready = hasValue.every(_identity.identity)) && (hasValue = null);
        }
      }, _noop.noop));
    };

    for (var i = 0; i < len; i++) {
      _loop_1(i);
    }

    source.subscribe(new _OperatorSubscriber.OperatorSubscriber(subscriber, function (value) {
      if (ready) {
        var values = (0, _tslib.__spreadArray)([value], (0, _tslib.__read)(otherValues), false);
        subscriber.next(project ? project.apply(void 0, (0, _tslib.__spreadArray)([], (0, _tslib.__read)(values), false)) : values);
      }
    }));
  });
}
},{"tslib":"../node_modules/rxjs/node_modules/tslib/tslib.es6.js","../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js","./OperatorSubscriber":"../node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js","../observable/innerFrom":"../node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js","../util/identity":"../node_modules/rxjs/dist/esm5/internal/util/identity.js","../util/noop":"../node_modules/rxjs/dist/esm5/internal/util/noop.js","../util/args":"../node_modules/rxjs/dist/esm5/internal/util/args.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/zipAll.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zipAll = zipAll;

var _zip = require("../observable/zip");

var _joinAllInternals = require("./joinAllInternals");

function zipAll(project) {
  return (0, _joinAllInternals.joinAllInternals)(_zip.zip, project);
}
},{"../observable/zip":"../node_modules/rxjs/dist/esm5/internal/observable/zip.js","./joinAllInternals":"../node_modules/rxjs/dist/esm5/internal/operators/joinAllInternals.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/zip.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zip = zip;

var _tslib = require("tslib");

var _zip = require("../observable/zip");

var _lift = require("../util/lift");

function zip() {
  var sources = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    sources[_i] = arguments[_i];
  }

  return (0, _lift.operate)(function (source, subscriber) {
    _zip.zip.apply(void 0, (0, _tslib.__spreadArray)([source], (0, _tslib.__read)(sources), false)).subscribe(subscriber);
  });
}
},{"tslib":"../node_modules/rxjs/node_modules/tslib/tslib.es6.js","../observable/zip":"../node_modules/rxjs/dist/esm5/internal/observable/zip.js","../util/lift":"../node_modules/rxjs/dist/esm5/internal/util/lift.js"}],"../node_modules/rxjs/dist/esm5/internal/operators/zipWith.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zipWith = zipWith;

var _tslib = require("tslib");

var _zip = require("./zip");

function zipWith() {
  var otherInputs = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    otherInputs[_i] = arguments[_i];
  }

  return _zip.zip.apply(void 0, (0, _tslib.__spreadArray)([], (0, _tslib.__read)(otherInputs), false));
}
},{"tslib":"../node_modules/rxjs/node_modules/tslib/tslib.es6.js","./zip":"../node_modules/rxjs/dist/esm5/internal/operators/zip.js"}],"../node_modules/rxjs/dist/esm5/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  Observable: true,
  ConnectableObservable: true,
  observable: true,
  animationFrames: true,
  Subject: true,
  BehaviorSubject: true,
  ReplaySubject: true,
  AsyncSubject: true,
  asap: true,
  asapScheduler: true,
  async: true,
  asyncScheduler: true,
  queue: true,
  queueScheduler: true,
  animationFrame: true,
  animationFrameScheduler: true,
  VirtualTimeScheduler: true,
  VirtualAction: true,
  Scheduler: true,
  Subscription: true,
  Subscriber: true,
  Notification: true,
  NotificationKind: true,
  pipe: true,
  noop: true,
  identity: true,
  isObservable: true,
  lastValueFrom: true,
  firstValueFrom: true,
  ArgumentOutOfRangeError: true,
  EmptyError: true,
  NotFoundError: true,
  ObjectUnsubscribedError: true,
  SequenceError: true,
  TimeoutError: true,
  timeout: true,
  UnsubscriptionError: true,
  bindCallback: true,
  bindNodeCallback: true,
  combineLatest: true,
  concat: true,
  connectable: true,
  defer: true,
  empty: true,
  EMPTY: true,
  forkJoin: true,
  from: true,
  fromEvent: true,
  fromEventPattern: true,
  generate: true,
  iif: true,
  interval: true,
  merge: true,
  never: true,
  NEVER: true,
  of: true,
  onErrorResumeNext: true,
  pairs: true,
  partition: true,
  race: true,
  range: true,
  throwError: true,
  timer: true,
  using: true,
  zip: true,
  scheduled: true,
  config: true,
  audit: true,
  auditTime: true,
  buffer: true,
  bufferCount: true,
  bufferTime: true,
  bufferToggle: true,
  bufferWhen: true,
  catchError: true,
  combineAll: true,
  combineLatestAll: true,
  combineLatestWith: true,
  concatAll: true,
  concatMap: true,
  concatMapTo: true,
  concatWith: true,
  connect: true,
  count: true,
  debounce: true,
  debounceTime: true,
  defaultIfEmpty: true,
  delay: true,
  delayWhen: true,
  dematerialize: true,
  distinct: true,
  distinctUntilChanged: true,
  distinctUntilKeyChanged: true,
  elementAt: true,
  endWith: true,
  every: true,
  exhaust: true,
  exhaustAll: true,
  exhaustMap: true,
  expand: true,
  filter: true,
  finalize: true,
  find: true,
  findIndex: true,
  first: true,
  groupBy: true,
  ignoreElements: true,
  isEmpty: true,
  last: true,
  map: true,
  mapTo: true,
  materialize: true,
  max: true,
  mergeAll: true,
  flatMap: true,
  mergeMap: true,
  mergeMapTo: true,
  mergeScan: true,
  mergeWith: true,
  min: true,
  multicast: true,
  observeOn: true,
  pairwise: true,
  pluck: true,
  publish: true,
  publishBehavior: true,
  publishLast: true,
  publishReplay: true,
  raceWith: true,
  reduce: true,
  repeat: true,
  repeatWhen: true,
  retry: true,
  retryWhen: true,
  refCount: true,
  sample: true,
  sampleTime: true,
  scan: true,
  sequenceEqual: true,
  share: true,
  shareReplay: true,
  single: true,
  skip: true,
  skipLast: true,
  skipUntil: true,
  skipWhile: true,
  startWith: true,
  subscribeOn: true,
  switchAll: true,
  switchMap: true,
  switchMapTo: true,
  switchScan: true,
  take: true,
  takeLast: true,
  takeUntil: true,
  takeWhile: true,
  tap: true,
  throttle: true,
  throttleTime: true,
  throwIfEmpty: true,
  timeInterval: true,
  timeoutWith: true,
  timestamp: true,
  toArray: true,
  window: true,
  windowCount: true,
  windowTime: true,
  windowToggle: true,
  windowWhen: true,
  withLatestFrom: true,
  zipAll: true,
  zipWith: true
};
Object.defineProperty(exports, "Observable", {
  enumerable: true,
  get: function () {
    return _Observable.Observable;
  }
});
Object.defineProperty(exports, "ConnectableObservable", {
  enumerable: true,
  get: function () {
    return _ConnectableObservable.ConnectableObservable;
  }
});
Object.defineProperty(exports, "observable", {
  enumerable: true,
  get: function () {
    return _observable.observable;
  }
});
Object.defineProperty(exports, "animationFrames", {
  enumerable: true,
  get: function () {
    return _animationFrames.animationFrames;
  }
});
Object.defineProperty(exports, "Subject", {
  enumerable: true,
  get: function () {
    return _Subject.Subject;
  }
});
Object.defineProperty(exports, "BehaviorSubject", {
  enumerable: true,
  get: function () {
    return _BehaviorSubject.BehaviorSubject;
  }
});
Object.defineProperty(exports, "ReplaySubject", {
  enumerable: true,
  get: function () {
    return _ReplaySubject.ReplaySubject;
  }
});
Object.defineProperty(exports, "AsyncSubject", {
  enumerable: true,
  get: function () {
    return _AsyncSubject.AsyncSubject;
  }
});
Object.defineProperty(exports, "asap", {
  enumerable: true,
  get: function () {
    return _asap.asap;
  }
});
Object.defineProperty(exports, "asapScheduler", {
  enumerable: true,
  get: function () {
    return _asap.asapScheduler;
  }
});
Object.defineProperty(exports, "async", {
  enumerable: true,
  get: function () {
    return _async.async;
  }
});
Object.defineProperty(exports, "asyncScheduler", {
  enumerable: true,
  get: function () {
    return _async.asyncScheduler;
  }
});
Object.defineProperty(exports, "queue", {
  enumerable: true,
  get: function () {
    return _queue.queue;
  }
});
Object.defineProperty(exports, "queueScheduler", {
  enumerable: true,
  get: function () {
    return _queue.queueScheduler;
  }
});
Object.defineProperty(exports, "animationFrame", {
  enumerable: true,
  get: function () {
    return _animationFrame.animationFrame;
  }
});
Object.defineProperty(exports, "animationFrameScheduler", {
  enumerable: true,
  get: function () {
    return _animationFrame.animationFrameScheduler;
  }
});
Object.defineProperty(exports, "VirtualTimeScheduler", {
  enumerable: true,
  get: function () {
    return _VirtualTimeScheduler.VirtualTimeScheduler;
  }
});
Object.defineProperty(exports, "VirtualAction", {
  enumerable: true,
  get: function () {
    return _VirtualTimeScheduler.VirtualAction;
  }
});
Object.defineProperty(exports, "Scheduler", {
  enumerable: true,
  get: function () {
    return _Scheduler.Scheduler;
  }
});
Object.defineProperty(exports, "Subscription", {
  enumerable: true,
  get: function () {
    return _Subscription.Subscription;
  }
});
Object.defineProperty(exports, "Subscriber", {
  enumerable: true,
  get: function () {
    return _Subscriber.Subscriber;
  }
});
Object.defineProperty(exports, "Notification", {
  enumerable: true,
  get: function () {
    return _Notification.Notification;
  }
});
Object.defineProperty(exports, "NotificationKind", {
  enumerable: true,
  get: function () {
    return _Notification.NotificationKind;
  }
});
Object.defineProperty(exports, "pipe", {
  enumerable: true,
  get: function () {
    return _pipe.pipe;
  }
});
Object.defineProperty(exports, "noop", {
  enumerable: true,
  get: function () {
    return _noop.noop;
  }
});
Object.defineProperty(exports, "identity", {
  enumerable: true,
  get: function () {
    return _identity.identity;
  }
});
Object.defineProperty(exports, "isObservable", {
  enumerable: true,
  get: function () {
    return _isObservable.isObservable;
  }
});
Object.defineProperty(exports, "lastValueFrom", {
  enumerable: true,
  get: function () {
    return _lastValueFrom.lastValueFrom;
  }
});
Object.defineProperty(exports, "firstValueFrom", {
  enumerable: true,
  get: function () {
    return _firstValueFrom.firstValueFrom;
  }
});
Object.defineProperty(exports, "ArgumentOutOfRangeError", {
  enumerable: true,
  get: function () {
    return _ArgumentOutOfRangeError.ArgumentOutOfRangeError;
  }
});
Object.defineProperty(exports, "EmptyError", {
  enumerable: true,
  get: function () {
    return _EmptyError.EmptyError;
  }
});
Object.defineProperty(exports, "NotFoundError", {
  enumerable: true,
  get: function () {
    return _NotFoundError.NotFoundError;
  }
});
Object.defineProperty(exports, "ObjectUnsubscribedError", {
  enumerable: true,
  get: function () {
    return _ObjectUnsubscribedError.ObjectUnsubscribedError;
  }
});
Object.defineProperty(exports, "SequenceError", {
  enumerable: true,
  get: function () {
    return _SequenceError.SequenceError;
  }
});
Object.defineProperty(exports, "TimeoutError", {
  enumerable: true,
  get: function () {
    return _timeout.TimeoutError;
  }
});
Object.defineProperty(exports, "timeout", {
  enumerable: true,
  get: function () {
    return _timeout.timeout;
  }
});
Object.defineProperty(exports, "UnsubscriptionError", {
  enumerable: true,
  get: function () {
    return _UnsubscriptionError.UnsubscriptionError;
  }
});
Object.defineProperty(exports, "bindCallback", {
  enumerable: true,
  get: function () {
    return _bindCallback.bindCallback;
  }
});
Object.defineProperty(exports, "bindNodeCallback", {
  enumerable: true,
  get: function () {
    return _bindNodeCallback.bindNodeCallback;
  }
});
Object.defineProperty(exports, "combineLatest", {
  enumerable: true,
  get: function () {
    return _combineLatest.combineLatest;
  }
});
Object.defineProperty(exports, "concat", {
  enumerable: true,
  get: function () {
    return _concat.concat;
  }
});
Object.defineProperty(exports, "connectable", {
  enumerable: true,
  get: function () {
    return _connectable.connectable;
  }
});
Object.defineProperty(exports, "defer", {
  enumerable: true,
  get: function () {
    return _defer.defer;
  }
});
Object.defineProperty(exports, "empty", {
  enumerable: true,
  get: function () {
    return _empty.empty;
  }
});
Object.defineProperty(exports, "EMPTY", {
  enumerable: true,
  get: function () {
    return _empty.EMPTY;
  }
});
Object.defineProperty(exports, "forkJoin", {
  enumerable: true,
  get: function () {
    return _forkJoin.forkJoin;
  }
});
Object.defineProperty(exports, "from", {
  enumerable: true,
  get: function () {
    return _from.from;
  }
});
Object.defineProperty(exports, "fromEvent", {
  enumerable: true,
  get: function () {
    return _fromEvent.fromEvent;
  }
});
Object.defineProperty(exports, "fromEventPattern", {
  enumerable: true,
  get: function () {
    return _fromEventPattern.fromEventPattern;
  }
});
Object.defineProperty(exports, "generate", {
  enumerable: true,
  get: function () {
    return _generate.generate;
  }
});
Object.defineProperty(exports, "iif", {
  enumerable: true,
  get: function () {
    return _iif.iif;
  }
});
Object.defineProperty(exports, "interval", {
  enumerable: true,
  get: function () {
    return _interval.interval;
  }
});
Object.defineProperty(exports, "merge", {
  enumerable: true,
  get: function () {
    return _merge.merge;
  }
});
Object.defineProperty(exports, "never", {
  enumerable: true,
  get: function () {
    return _never.never;
  }
});
Object.defineProperty(exports, "NEVER", {
  enumerable: true,
  get: function () {
    return _never.NEVER;
  }
});
Object.defineProperty(exports, "of", {
  enumerable: true,
  get: function () {
    return _of.of;
  }
});
Object.defineProperty(exports, "onErrorResumeNext", {
  enumerable: true,
  get: function () {
    return _onErrorResumeNext.onErrorResumeNext;
  }
});
Object.defineProperty(exports, "pairs", {
  enumerable: true,
  get: function () {
    return _pairs.pairs;
  }
});
Object.defineProperty(exports, "partition", {
  enumerable: true,
  get: function () {
    return _partition.partition;
  }
});
Object.defineProperty(exports, "race", {
  enumerable: true,
  get: function () {
    return _race.race;
  }
});
Object.defineProperty(exports, "range", {
  enumerable: true,
  get: function () {
    return _range.range;
  }
});
Object.defineProperty(exports, "throwError", {
  enumerable: true,
  get: function () {
    return _throwError.throwError;
  }
});
Object.defineProperty(exports, "timer", {
  enumerable: true,
  get: function () {
    return _timer.timer;
  }
});
Object.defineProperty(exports, "using", {
  enumerable: true,
  get: function () {
    return _using.using;
  }
});
Object.defineProperty(exports, "zip", {
  enumerable: true,
  get: function () {
    return _zip.zip;
  }
});
Object.defineProperty(exports, "scheduled", {
  enumerable: true,
  get: function () {
    return _scheduled.scheduled;
  }
});
Object.defineProperty(exports, "config", {
  enumerable: true,
  get: function () {
    return _config.config;
  }
});
Object.defineProperty(exports, "audit", {
  enumerable: true,
  get: function () {
    return _audit.audit;
  }
});
Object.defineProperty(exports, "auditTime", {
  enumerable: true,
  get: function () {
    return _auditTime.auditTime;
  }
});
Object.defineProperty(exports, "buffer", {
  enumerable: true,
  get: function () {
    return _buffer.buffer;
  }
});
Object.defineProperty(exports, "bufferCount", {
  enumerable: true,
  get: function () {
    return _bufferCount.bufferCount;
  }
});
Object.defineProperty(exports, "bufferTime", {
  enumerable: true,
  get: function () {
    return _bufferTime.bufferTime;
  }
});
Object.defineProperty(exports, "bufferToggle", {
  enumerable: true,
  get: function () {
    return _bufferToggle.bufferToggle;
  }
});
Object.defineProperty(exports, "bufferWhen", {
  enumerable: true,
  get: function () {
    return _bufferWhen.bufferWhen;
  }
});
Object.defineProperty(exports, "catchError", {
  enumerable: true,
  get: function () {
    return _catchError.catchError;
  }
});
Object.defineProperty(exports, "combineAll", {
  enumerable: true,
  get: function () {
    return _combineAll.combineAll;
  }
});
Object.defineProperty(exports, "combineLatestAll", {
  enumerable: true,
  get: function () {
    return _combineLatestAll.combineLatestAll;
  }
});
Object.defineProperty(exports, "combineLatestWith", {
  enumerable: true,
  get: function () {
    return _combineLatestWith.combineLatestWith;
  }
});
Object.defineProperty(exports, "concatAll", {
  enumerable: true,
  get: function () {
    return _concatAll.concatAll;
  }
});
Object.defineProperty(exports, "concatMap", {
  enumerable: true,
  get: function () {
    return _concatMap.concatMap;
  }
});
Object.defineProperty(exports, "concatMapTo", {
  enumerable: true,
  get: function () {
    return _concatMapTo.concatMapTo;
  }
});
Object.defineProperty(exports, "concatWith", {
  enumerable: true,
  get: function () {
    return _concatWith.concatWith;
  }
});
Object.defineProperty(exports, "connect", {
  enumerable: true,
  get: function () {
    return _connect.connect;
  }
});
Object.defineProperty(exports, "count", {
  enumerable: true,
  get: function () {
    return _count.count;
  }
});
Object.defineProperty(exports, "debounce", {
  enumerable: true,
  get: function () {
    return _debounce.debounce;
  }
});
Object.defineProperty(exports, "debounceTime", {
  enumerable: true,
  get: function () {
    return _debounceTime.debounceTime;
  }
});
Object.defineProperty(exports, "defaultIfEmpty", {
  enumerable: true,
  get: function () {
    return _defaultIfEmpty.defaultIfEmpty;
  }
});
Object.defineProperty(exports, "delay", {
  enumerable: true,
  get: function () {
    return _delay.delay;
  }
});
Object.defineProperty(exports, "delayWhen", {
  enumerable: true,
  get: function () {
    return _delayWhen.delayWhen;
  }
});
Object.defineProperty(exports, "dematerialize", {
  enumerable: true,
  get: function () {
    return _dematerialize.dematerialize;
  }
});
Object.defineProperty(exports, "distinct", {
  enumerable: true,
  get: function () {
    return _distinct.distinct;
  }
});
Object.defineProperty(exports, "distinctUntilChanged", {
  enumerable: true,
  get: function () {
    return _distinctUntilChanged.distinctUntilChanged;
  }
});
Object.defineProperty(exports, "distinctUntilKeyChanged", {
  enumerable: true,
  get: function () {
    return _distinctUntilKeyChanged.distinctUntilKeyChanged;
  }
});
Object.defineProperty(exports, "elementAt", {
  enumerable: true,
  get: function () {
    return _elementAt.elementAt;
  }
});
Object.defineProperty(exports, "endWith", {
  enumerable: true,
  get: function () {
    return _endWith.endWith;
  }
});
Object.defineProperty(exports, "every", {
  enumerable: true,
  get: function () {
    return _every.every;
  }
});
Object.defineProperty(exports, "exhaust", {
  enumerable: true,
  get: function () {
    return _exhaust.exhaust;
  }
});
Object.defineProperty(exports, "exhaustAll", {
  enumerable: true,
  get: function () {
    return _exhaustAll.exhaustAll;
  }
});
Object.defineProperty(exports, "exhaustMap", {
  enumerable: true,
  get: function () {
    return _exhaustMap.exhaustMap;
  }
});
Object.defineProperty(exports, "expand", {
  enumerable: true,
  get: function () {
    return _expand.expand;
  }
});
Object.defineProperty(exports, "filter", {
  enumerable: true,
  get: function () {
    return _filter.filter;
  }
});
Object.defineProperty(exports, "finalize", {
  enumerable: true,
  get: function () {
    return _finalize.finalize;
  }
});
Object.defineProperty(exports, "find", {
  enumerable: true,
  get: function () {
    return _find.find;
  }
});
Object.defineProperty(exports, "findIndex", {
  enumerable: true,
  get: function () {
    return _findIndex.findIndex;
  }
});
Object.defineProperty(exports, "first", {
  enumerable: true,
  get: function () {
    return _first.first;
  }
});
Object.defineProperty(exports, "groupBy", {
  enumerable: true,
  get: function () {
    return _groupBy.groupBy;
  }
});
Object.defineProperty(exports, "ignoreElements", {
  enumerable: true,
  get: function () {
    return _ignoreElements.ignoreElements;
  }
});
Object.defineProperty(exports, "isEmpty", {
  enumerable: true,
  get: function () {
    return _isEmpty.isEmpty;
  }
});
Object.defineProperty(exports, "last", {
  enumerable: true,
  get: function () {
    return _last.last;
  }
});
Object.defineProperty(exports, "map", {
  enumerable: true,
  get: function () {
    return _map.map;
  }
});
Object.defineProperty(exports, "mapTo", {
  enumerable: true,
  get: function () {
    return _mapTo.mapTo;
  }
});
Object.defineProperty(exports, "materialize", {
  enumerable: true,
  get: function () {
    return _materialize.materialize;
  }
});
Object.defineProperty(exports, "max", {
  enumerable: true,
  get: function () {
    return _max.max;
  }
});
Object.defineProperty(exports, "mergeAll", {
  enumerable: true,
  get: function () {
    return _mergeAll.mergeAll;
  }
});
Object.defineProperty(exports, "flatMap", {
  enumerable: true,
  get: function () {
    return _flatMap.flatMap;
  }
});
Object.defineProperty(exports, "mergeMap", {
  enumerable: true,
  get: function () {
    return _mergeMap.mergeMap;
  }
});
Object.defineProperty(exports, "mergeMapTo", {
  enumerable: true,
  get: function () {
    return _mergeMapTo.mergeMapTo;
  }
});
Object.defineProperty(exports, "mergeScan", {
  enumerable: true,
  get: function () {
    return _mergeScan.mergeScan;
  }
});
Object.defineProperty(exports, "mergeWith", {
  enumerable: true,
  get: function () {
    return _mergeWith.mergeWith;
  }
});
Object.defineProperty(exports, "min", {
  enumerable: true,
  get: function () {
    return _min.min;
  }
});
Object.defineProperty(exports, "multicast", {
  enumerable: true,
  get: function () {
    return _multicast.multicast;
  }
});
Object.defineProperty(exports, "observeOn", {
  enumerable: true,
  get: function () {
    return _observeOn.observeOn;
  }
});
Object.defineProperty(exports, "pairwise", {
  enumerable: true,
  get: function () {
    return _pairwise.pairwise;
  }
});
Object.defineProperty(exports, "pluck", {
  enumerable: true,
  get: function () {
    return _pluck.pluck;
  }
});
Object.defineProperty(exports, "publish", {
  enumerable: true,
  get: function () {
    return _publish.publish;
  }
});
Object.defineProperty(exports, "publishBehavior", {
  enumerable: true,
  get: function () {
    return _publishBehavior.publishBehavior;
  }
});
Object.defineProperty(exports, "publishLast", {
  enumerable: true,
  get: function () {
    return _publishLast.publishLast;
  }
});
Object.defineProperty(exports, "publishReplay", {
  enumerable: true,
  get: function () {
    return _publishReplay.publishReplay;
  }
});
Object.defineProperty(exports, "raceWith", {
  enumerable: true,
  get: function () {
    return _raceWith.raceWith;
  }
});
Object.defineProperty(exports, "reduce", {
  enumerable: true,
  get: function () {
    return _reduce.reduce;
  }
});
Object.defineProperty(exports, "repeat", {
  enumerable: true,
  get: function () {
    return _repeat.repeat;
  }
});
Object.defineProperty(exports, "repeatWhen", {
  enumerable: true,
  get: function () {
    return _repeatWhen.repeatWhen;
  }
});
Object.defineProperty(exports, "retry", {
  enumerable: true,
  get: function () {
    return _retry.retry;
  }
});
Object.defineProperty(exports, "retryWhen", {
  enumerable: true,
  get: function () {
    return _retryWhen.retryWhen;
  }
});
Object.defineProperty(exports, "refCount", {
  enumerable: true,
  get: function () {
    return _refCount.refCount;
  }
});
Object.defineProperty(exports, "sample", {
  enumerable: true,
  get: function () {
    return _sample.sample;
  }
});
Object.defineProperty(exports, "sampleTime", {
  enumerable: true,
  get: function () {
    return _sampleTime.sampleTime;
  }
});
Object.defineProperty(exports, "scan", {
  enumerable: true,
  get: function () {
    return _scan.scan;
  }
});
Object.defineProperty(exports, "sequenceEqual", {
  enumerable: true,
  get: function () {
    return _sequenceEqual.sequenceEqual;
  }
});
Object.defineProperty(exports, "share", {
  enumerable: true,
  get: function () {
    return _share.share;
  }
});
Object.defineProperty(exports, "shareReplay", {
  enumerable: true,
  get: function () {
    return _shareReplay.shareReplay;
  }
});
Object.defineProperty(exports, "single", {
  enumerable: true,
  get: function () {
    return _single.single;
  }
});
Object.defineProperty(exports, "skip", {
  enumerable: true,
  get: function () {
    return _skip.skip;
  }
});
Object.defineProperty(exports, "skipLast", {
  enumerable: true,
  get: function () {
    return _skipLast.skipLast;
  }
});
Object.defineProperty(exports, "skipUntil", {
  enumerable: true,
  get: function () {
    return _skipUntil.skipUntil;
  }
});
Object.defineProperty(exports, "skipWhile", {
  enumerable: true,
  get: function () {
    return _skipWhile.skipWhile;
  }
});
Object.defineProperty(exports, "startWith", {
  enumerable: true,
  get: function () {
    return _startWith.startWith;
  }
});
Object.defineProperty(exports, "subscribeOn", {
  enumerable: true,
  get: function () {
    return _subscribeOn.subscribeOn;
  }
});
Object.defineProperty(exports, "switchAll", {
  enumerable: true,
  get: function () {
    return _switchAll.switchAll;
  }
});
Object.defineProperty(exports, "switchMap", {
  enumerable: true,
  get: function () {
    return _switchMap.switchMap;
  }
});
Object.defineProperty(exports, "switchMapTo", {
  enumerable: true,
  get: function () {
    return _switchMapTo.switchMapTo;
  }
});
Object.defineProperty(exports, "switchScan", {
  enumerable: true,
  get: function () {
    return _switchScan.switchScan;
  }
});
Object.defineProperty(exports, "take", {
  enumerable: true,
  get: function () {
    return _take.take;
  }
});
Object.defineProperty(exports, "takeLast", {
  enumerable: true,
  get: function () {
    return _takeLast.takeLast;
  }
});
Object.defineProperty(exports, "takeUntil", {
  enumerable: true,
  get: function () {
    return _takeUntil.takeUntil;
  }
});
Object.defineProperty(exports, "takeWhile", {
  enumerable: true,
  get: function () {
    return _takeWhile.takeWhile;
  }
});
Object.defineProperty(exports, "tap", {
  enumerable: true,
  get: function () {
    return _tap.tap;
  }
});
Object.defineProperty(exports, "throttle", {
  enumerable: true,
  get: function () {
    return _throttle.throttle;
  }
});
Object.defineProperty(exports, "throttleTime", {
  enumerable: true,
  get: function () {
    return _throttleTime.throttleTime;
  }
});
Object.defineProperty(exports, "throwIfEmpty", {
  enumerable: true,
  get: function () {
    return _throwIfEmpty.throwIfEmpty;
  }
});
Object.defineProperty(exports, "timeInterval", {
  enumerable: true,
  get: function () {
    return _timeInterval.timeInterval;
  }
});
Object.defineProperty(exports, "timeoutWith", {
  enumerable: true,
  get: function () {
    return _timeoutWith.timeoutWith;
  }
});
Object.defineProperty(exports, "timestamp", {
  enumerable: true,
  get: function () {
    return _timestamp.timestamp;
  }
});
Object.defineProperty(exports, "toArray", {
  enumerable: true,
  get: function () {
    return _toArray.toArray;
  }
});
Object.defineProperty(exports, "window", {
  enumerable: true,
  get: function () {
    return _window.window;
  }
});
Object.defineProperty(exports, "windowCount", {
  enumerable: true,
  get: function () {
    return _windowCount.windowCount;
  }
});
Object.defineProperty(exports, "windowTime", {
  enumerable: true,
  get: function () {
    return _windowTime.windowTime;
  }
});
Object.defineProperty(exports, "windowToggle", {
  enumerable: true,
  get: function () {
    return _windowToggle.windowToggle;
  }
});
Object.defineProperty(exports, "windowWhen", {
  enumerable: true,
  get: function () {
    return _windowWhen.windowWhen;
  }
});
Object.defineProperty(exports, "withLatestFrom", {
  enumerable: true,
  get: function () {
    return _withLatestFrom.withLatestFrom;
  }
});
Object.defineProperty(exports, "zipAll", {
  enumerable: true,
  get: function () {
    return _zipAll.zipAll;
  }
});
Object.defineProperty(exports, "zipWith", {
  enumerable: true,
  get: function () {
    return _zipWith.zipWith;
  }
});

var _Observable = require("./internal/Observable");

var _ConnectableObservable = require("./internal/observable/ConnectableObservable");

var _observable = require("./internal/symbol/observable");

var _animationFrames = require("./internal/observable/dom/animationFrames");

var _Subject = require("./internal/Subject");

var _BehaviorSubject = require("./internal/BehaviorSubject");

var _ReplaySubject = require("./internal/ReplaySubject");

var _AsyncSubject = require("./internal/AsyncSubject");

var _asap = require("./internal/scheduler/asap");

var _async = require("./internal/scheduler/async");

var _queue = require("./internal/scheduler/queue");

var _animationFrame = require("./internal/scheduler/animationFrame");

var _VirtualTimeScheduler = require("./internal/scheduler/VirtualTimeScheduler");

var _Scheduler = require("./internal/Scheduler");

var _Subscription = require("./internal/Subscription");

var _Subscriber = require("./internal/Subscriber");

var _Notification = require("./internal/Notification");

var _pipe = require("./internal/util/pipe");

var _noop = require("./internal/util/noop");

var _identity = require("./internal/util/identity");

var _isObservable = require("./internal/util/isObservable");

var _lastValueFrom = require("./internal/lastValueFrom");

var _firstValueFrom = require("./internal/firstValueFrom");

var _ArgumentOutOfRangeError = require("./internal/util/ArgumentOutOfRangeError");

var _EmptyError = require("./internal/util/EmptyError");

var _NotFoundError = require("./internal/util/NotFoundError");

var _ObjectUnsubscribedError = require("./internal/util/ObjectUnsubscribedError");

var _SequenceError = require("./internal/util/SequenceError");

var _timeout = require("./internal/operators/timeout");

var _UnsubscriptionError = require("./internal/util/UnsubscriptionError");

var _bindCallback = require("./internal/observable/bindCallback");

var _bindNodeCallback = require("./internal/observable/bindNodeCallback");

var _combineLatest = require("./internal/observable/combineLatest");

var _concat = require("./internal/observable/concat");

var _connectable = require("./internal/observable/connectable");

var _defer = require("./internal/observable/defer");

var _empty = require("./internal/observable/empty");

var _forkJoin = require("./internal/observable/forkJoin");

var _from = require("./internal/observable/from");

var _fromEvent = require("./internal/observable/fromEvent");

var _fromEventPattern = require("./internal/observable/fromEventPattern");

var _generate = require("./internal/observable/generate");

var _iif = require("./internal/observable/iif");

var _interval = require("./internal/observable/interval");

var _merge = require("./internal/observable/merge");

var _never = require("./internal/observable/never");

var _of = require("./internal/observable/of");

var _onErrorResumeNext = require("./internal/observable/onErrorResumeNext");

var _pairs = require("./internal/observable/pairs");

var _partition = require("./internal/observable/partition");

var _race = require("./internal/observable/race");

var _range = require("./internal/observable/range");

var _throwError = require("./internal/observable/throwError");

var _timer = require("./internal/observable/timer");

var _using = require("./internal/observable/using");

var _zip = require("./internal/observable/zip");

var _scheduled = require("./internal/scheduled/scheduled");

var _types = require("./internal/types");

Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _types[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _types[key];
    }
  });
});

var _config = require("./internal/config");

var _audit = require("./internal/operators/audit");

var _auditTime = require("./internal/operators/auditTime");

var _buffer = require("./internal/operators/buffer");

var _bufferCount = require("./internal/operators/bufferCount");

var _bufferTime = require("./internal/operators/bufferTime");

var _bufferToggle = require("./internal/operators/bufferToggle");

var _bufferWhen = require("./internal/operators/bufferWhen");

var _catchError = require("./internal/operators/catchError");

var _combineAll = require("./internal/operators/combineAll");

var _combineLatestAll = require("./internal/operators/combineLatestAll");

var _combineLatestWith = require("./internal/operators/combineLatestWith");

var _concatAll = require("./internal/operators/concatAll");

var _concatMap = require("./internal/operators/concatMap");

var _concatMapTo = require("./internal/operators/concatMapTo");

var _concatWith = require("./internal/operators/concatWith");

var _connect = require("./internal/operators/connect");

var _count = require("./internal/operators/count");

var _debounce = require("./internal/operators/debounce");

var _debounceTime = require("./internal/operators/debounceTime");

var _defaultIfEmpty = require("./internal/operators/defaultIfEmpty");

var _delay = require("./internal/operators/delay");

var _delayWhen = require("./internal/operators/delayWhen");

var _dematerialize = require("./internal/operators/dematerialize");

var _distinct = require("./internal/operators/distinct");

var _distinctUntilChanged = require("./internal/operators/distinctUntilChanged");

var _distinctUntilKeyChanged = require("./internal/operators/distinctUntilKeyChanged");

var _elementAt = require("./internal/operators/elementAt");

var _endWith = require("./internal/operators/endWith");

var _every = require("./internal/operators/every");

var _exhaust = require("./internal/operators/exhaust");

var _exhaustAll = require("./internal/operators/exhaustAll");

var _exhaustMap = require("./internal/operators/exhaustMap");

var _expand = require("./internal/operators/expand");

var _filter = require("./internal/operators/filter");

var _finalize = require("./internal/operators/finalize");

var _find = require("./internal/operators/find");

var _findIndex = require("./internal/operators/findIndex");

var _first = require("./internal/operators/first");

var _groupBy = require("./internal/operators/groupBy");

var _ignoreElements = require("./internal/operators/ignoreElements");

var _isEmpty = require("./internal/operators/isEmpty");

var _last = require("./internal/operators/last");

var _map = require("./internal/operators/map");

var _mapTo = require("./internal/operators/mapTo");

var _materialize = require("./internal/operators/materialize");

var _max = require("./internal/operators/max");

var _mergeAll = require("./internal/operators/mergeAll");

var _flatMap = require("./internal/operators/flatMap");

var _mergeMap = require("./internal/operators/mergeMap");

var _mergeMapTo = require("./internal/operators/mergeMapTo");

var _mergeScan = require("./internal/operators/mergeScan");

var _mergeWith = require("./internal/operators/mergeWith");

var _min = require("./internal/operators/min");

var _multicast = require("./internal/operators/multicast");

var _observeOn = require("./internal/operators/observeOn");

var _pairwise = require("./internal/operators/pairwise");

var _pluck = require("./internal/operators/pluck");

var _publish = require("./internal/operators/publish");

var _publishBehavior = require("./internal/operators/publishBehavior");

var _publishLast = require("./internal/operators/publishLast");

var _publishReplay = require("./internal/operators/publishReplay");

var _raceWith = require("./internal/operators/raceWith");

var _reduce = require("./internal/operators/reduce");

var _repeat = require("./internal/operators/repeat");

var _repeatWhen = require("./internal/operators/repeatWhen");

var _retry = require("./internal/operators/retry");

var _retryWhen = require("./internal/operators/retryWhen");

var _refCount = require("./internal/operators/refCount");

var _sample = require("./internal/operators/sample");

var _sampleTime = require("./internal/operators/sampleTime");

var _scan = require("./internal/operators/scan");

var _sequenceEqual = require("./internal/operators/sequenceEqual");

var _share = require("./internal/operators/share");

var _shareReplay = require("./internal/operators/shareReplay");

var _single = require("./internal/operators/single");

var _skip = require("./internal/operators/skip");

var _skipLast = require("./internal/operators/skipLast");

var _skipUntil = require("./internal/operators/skipUntil");

var _skipWhile = require("./internal/operators/skipWhile");

var _startWith = require("./internal/operators/startWith");

var _subscribeOn = require("./internal/operators/subscribeOn");

var _switchAll = require("./internal/operators/switchAll");

var _switchMap = require("./internal/operators/switchMap");

var _switchMapTo = require("./internal/operators/switchMapTo");

var _switchScan = require("./internal/operators/switchScan");

var _take = require("./internal/operators/take");

var _takeLast = require("./internal/operators/takeLast");

var _takeUntil = require("./internal/operators/takeUntil");

var _takeWhile = require("./internal/operators/takeWhile");

var _tap = require("./internal/operators/tap");

var _throttle = require("./internal/operators/throttle");

var _throttleTime = require("./internal/operators/throttleTime");

var _throwIfEmpty = require("./internal/operators/throwIfEmpty");

var _timeInterval = require("./internal/operators/timeInterval");

var _timeoutWith = require("./internal/operators/timeoutWith");

var _timestamp = require("./internal/operators/timestamp");

var _toArray = require("./internal/operators/toArray");

var _window = require("./internal/operators/window");

var _windowCount = require("./internal/operators/windowCount");

var _windowTime = require("./internal/operators/windowTime");

var _windowToggle = require("./internal/operators/windowToggle");

var _windowWhen = require("./internal/operators/windowWhen");

var _withLatestFrom = require("./internal/operators/withLatestFrom");

var _zipAll = require("./internal/operators/zipAll");

var _zipWith = require("./internal/operators/zipWith");
},{"./internal/Observable":"../node_modules/rxjs/dist/esm5/internal/Observable.js","./internal/observable/ConnectableObservable":"../node_modules/rxjs/dist/esm5/internal/observable/ConnectableObservable.js","./internal/symbol/observable":"../node_modules/rxjs/dist/esm5/internal/symbol/observable.js","./internal/observable/dom/animationFrames":"../node_modules/rxjs/dist/esm5/internal/observable/dom/animationFrames.js","./internal/Subject":"../node_modules/rxjs/dist/esm5/internal/Subject.js","./internal/BehaviorSubject":"../node_modules/rxjs/dist/esm5/internal/BehaviorSubject.js","./internal/ReplaySubject":"../node_modules/rxjs/dist/esm5/internal/ReplaySubject.js","./internal/AsyncSubject":"../node_modules/rxjs/dist/esm5/internal/AsyncSubject.js","./internal/scheduler/asap":"../node_modules/rxjs/dist/esm5/internal/scheduler/asap.js","./internal/scheduler/async":"../node_modules/rxjs/dist/esm5/internal/scheduler/async.js","./internal/scheduler/queue":"../node_modules/rxjs/dist/esm5/internal/scheduler/queue.js","./internal/scheduler/animationFrame":"../node_modules/rxjs/dist/esm5/internal/scheduler/animationFrame.js","./internal/scheduler/VirtualTimeScheduler":"../node_modules/rxjs/dist/esm5/internal/scheduler/VirtualTimeScheduler.js","./internal/Scheduler":"../node_modules/rxjs/dist/esm5/internal/Scheduler.js","./internal/Subscription":"../node_modules/rxjs/dist/esm5/internal/Subscription.js","./internal/Subscriber":"../node_modules/rxjs/dist/esm5/internal/Subscriber.js","./internal/Notification":"../node_modules/rxjs/dist/esm5/internal/Notification.js","./internal/util/pipe":"../node_modules/rxjs/dist/esm5/internal/util/pipe.js","./internal/util/noop":"../node_modules/rxjs/dist/esm5/internal/util/noop.js","./internal/util/identity":"../node_modules/rxjs/dist/esm5/internal/util/identity.js","./internal/util/isObservable":"../node_modules/rxjs/dist/esm5/internal/util/isObservable.js","./internal/lastValueFrom":"../node_modules/rxjs/dist/esm5/internal/lastValueFrom.js","./internal/firstValueFrom":"../node_modules/rxjs/dist/esm5/internal/firstValueFrom.js","./internal/util/ArgumentOutOfRangeError":"../node_modules/rxjs/dist/esm5/internal/util/ArgumentOutOfRangeError.js","./internal/util/EmptyError":"../node_modules/rxjs/dist/esm5/internal/util/EmptyError.js","./internal/util/NotFoundError":"../node_modules/rxjs/dist/esm5/internal/util/NotFoundError.js","./internal/util/ObjectUnsubscribedError":"../node_modules/rxjs/dist/esm5/internal/util/ObjectUnsubscribedError.js","./internal/util/SequenceError":"../node_modules/rxjs/dist/esm5/internal/util/SequenceError.js","./internal/operators/timeout":"../node_modules/rxjs/dist/esm5/internal/operators/timeout.js","./internal/util/UnsubscriptionError":"../node_modules/rxjs/dist/esm5/internal/util/UnsubscriptionError.js","./internal/observable/bindCallback":"../node_modules/rxjs/dist/esm5/internal/observable/bindCallback.js","./internal/observable/bindNodeCallback":"../node_modules/rxjs/dist/esm5/internal/observable/bindNodeCallback.js","./internal/observable/combineLatest":"../node_modules/rxjs/dist/esm5/internal/observable/combineLatest.js","./internal/observable/concat":"../node_modules/rxjs/dist/esm5/internal/observable/concat.js","./internal/observable/connectable":"../node_modules/rxjs/dist/esm5/internal/observable/connectable.js","./internal/observable/defer":"../node_modules/rxjs/dist/esm5/internal/observable/defer.js","./internal/observable/empty":"../node_modules/rxjs/dist/esm5/internal/observable/empty.js","./internal/observable/forkJoin":"../node_modules/rxjs/dist/esm5/internal/observable/forkJoin.js","./internal/observable/from":"../node_modules/rxjs/dist/esm5/internal/observable/from.js","./internal/observable/fromEvent":"../node_modules/rxjs/dist/esm5/internal/observable/fromEvent.js","./internal/observable/fromEventPattern":"../node_modules/rxjs/dist/esm5/internal/observable/fromEventPattern.js","./internal/observable/generate":"../node_modules/rxjs/dist/esm5/internal/observable/generate.js","./internal/observable/iif":"../node_modules/rxjs/dist/esm5/internal/observable/iif.js","./internal/observable/interval":"../node_modules/rxjs/dist/esm5/internal/observable/interval.js","./internal/observable/merge":"../node_modules/rxjs/dist/esm5/internal/observable/merge.js","./internal/observable/never":"../node_modules/rxjs/dist/esm5/internal/observable/never.js","./internal/observable/of":"../node_modules/rxjs/dist/esm5/internal/observable/of.js","./internal/observable/onErrorResumeNext":"../node_modules/rxjs/dist/esm5/internal/observable/onErrorResumeNext.js","./internal/observable/pairs":"../node_modules/rxjs/dist/esm5/internal/observable/pairs.js","./internal/observable/partition":"../node_modules/rxjs/dist/esm5/internal/observable/partition.js","./internal/observable/race":"../node_modules/rxjs/dist/esm5/internal/observable/race.js","./internal/observable/range":"../node_modules/rxjs/dist/esm5/internal/observable/range.js","./internal/observable/throwError":"../node_modules/rxjs/dist/esm5/internal/observable/throwError.js","./internal/observable/timer":"../node_modules/rxjs/dist/esm5/internal/observable/timer.js","./internal/observable/using":"../node_modules/rxjs/dist/esm5/internal/observable/using.js","./internal/observable/zip":"../node_modules/rxjs/dist/esm5/internal/observable/zip.js","./internal/scheduled/scheduled":"../node_modules/rxjs/dist/esm5/internal/scheduled/scheduled.js","./internal/types":"../node_modules/rxjs/dist/esm5/internal/types.js","./internal/config":"../node_modules/rxjs/dist/esm5/internal/config.js","./internal/operators/audit":"../node_modules/rxjs/dist/esm5/internal/operators/audit.js","./internal/operators/auditTime":"../node_modules/rxjs/dist/esm5/internal/operators/auditTime.js","./internal/operators/buffer":"../node_modules/rxjs/dist/esm5/internal/operators/buffer.js","./internal/operators/bufferCount":"../node_modules/rxjs/dist/esm5/internal/operators/bufferCount.js","./internal/operators/bufferTime":"../node_modules/rxjs/dist/esm5/internal/operators/bufferTime.js","./internal/operators/bufferToggle":"../node_modules/rxjs/dist/esm5/internal/operators/bufferToggle.js","./internal/operators/bufferWhen":"../node_modules/rxjs/dist/esm5/internal/operators/bufferWhen.js","./internal/operators/catchError":"../node_modules/rxjs/dist/esm5/internal/operators/catchError.js","./internal/operators/combineAll":"../node_modules/rxjs/dist/esm5/internal/operators/combineAll.js","./internal/operators/combineLatestAll":"../node_modules/rxjs/dist/esm5/internal/operators/combineLatestAll.js","./internal/operators/combineLatestWith":"../node_modules/rxjs/dist/esm5/internal/operators/combineLatestWith.js","./internal/operators/concatAll":"../node_modules/rxjs/dist/esm5/internal/operators/concatAll.js","./internal/operators/concatMap":"../node_modules/rxjs/dist/esm5/internal/operators/concatMap.js","./internal/operators/concatMapTo":"../node_modules/rxjs/dist/esm5/internal/operators/concatMapTo.js","./internal/operators/concatWith":"../node_modules/rxjs/dist/esm5/internal/operators/concatWith.js","./internal/operators/connect":"../node_modules/rxjs/dist/esm5/internal/operators/connect.js","./internal/operators/count":"../node_modules/rxjs/dist/esm5/internal/operators/count.js","./internal/operators/debounce":"../node_modules/rxjs/dist/esm5/internal/operators/debounce.js","./internal/operators/debounceTime":"../node_modules/rxjs/dist/esm5/internal/operators/debounceTime.js","./internal/operators/defaultIfEmpty":"../node_modules/rxjs/dist/esm5/internal/operators/defaultIfEmpty.js","./internal/operators/delay":"../node_modules/rxjs/dist/esm5/internal/operators/delay.js","./internal/operators/delayWhen":"../node_modules/rxjs/dist/esm5/internal/operators/delayWhen.js","./internal/operators/dematerialize":"../node_modules/rxjs/dist/esm5/internal/operators/dematerialize.js","./internal/operators/distinct":"../node_modules/rxjs/dist/esm5/internal/operators/distinct.js","./internal/operators/distinctUntilChanged":"../node_modules/rxjs/dist/esm5/internal/operators/distinctUntilChanged.js","./internal/operators/distinctUntilKeyChanged":"../node_modules/rxjs/dist/esm5/internal/operators/distinctUntilKeyChanged.js","./internal/operators/elementAt":"../node_modules/rxjs/dist/esm5/internal/operators/elementAt.js","./internal/operators/endWith":"../node_modules/rxjs/dist/esm5/internal/operators/endWith.js","./internal/operators/every":"../node_modules/rxjs/dist/esm5/internal/operators/every.js","./internal/operators/exhaust":"../node_modules/rxjs/dist/esm5/internal/operators/exhaust.js","./internal/operators/exhaustAll":"../node_modules/rxjs/dist/esm5/internal/operators/exhaustAll.js","./internal/operators/exhaustMap":"../node_modules/rxjs/dist/esm5/internal/operators/exhaustMap.js","./internal/operators/expand":"../node_modules/rxjs/dist/esm5/internal/operators/expand.js","./internal/operators/filter":"../node_modules/rxjs/dist/esm5/internal/operators/filter.js","./internal/operators/finalize":"../node_modules/rxjs/dist/esm5/internal/operators/finalize.js","./internal/operators/find":"../node_modules/rxjs/dist/esm5/internal/operators/find.js","./internal/operators/findIndex":"../node_modules/rxjs/dist/esm5/internal/operators/findIndex.js","./internal/operators/first":"../node_modules/rxjs/dist/esm5/internal/operators/first.js","./internal/operators/groupBy":"../node_modules/rxjs/dist/esm5/internal/operators/groupBy.js","./internal/operators/ignoreElements":"../node_modules/rxjs/dist/esm5/internal/operators/ignoreElements.js","./internal/operators/isEmpty":"../node_modules/rxjs/dist/esm5/internal/operators/isEmpty.js","./internal/operators/last":"../node_modules/rxjs/dist/esm5/internal/operators/last.js","./internal/operators/map":"../node_modules/rxjs/dist/esm5/internal/operators/map.js","./internal/operators/mapTo":"../node_modules/rxjs/dist/esm5/internal/operators/mapTo.js","./internal/operators/materialize":"../node_modules/rxjs/dist/esm5/internal/operators/materialize.js","./internal/operators/max":"../node_modules/rxjs/dist/esm5/internal/operators/max.js","./internal/operators/mergeAll":"../node_modules/rxjs/dist/esm5/internal/operators/mergeAll.js","./internal/operators/flatMap":"../node_modules/rxjs/dist/esm5/internal/operators/flatMap.js","./internal/operators/mergeMap":"../node_modules/rxjs/dist/esm5/internal/operators/mergeMap.js","./internal/operators/mergeMapTo":"../node_modules/rxjs/dist/esm5/internal/operators/mergeMapTo.js","./internal/operators/mergeScan":"../node_modules/rxjs/dist/esm5/internal/operators/mergeScan.js","./internal/operators/mergeWith":"../node_modules/rxjs/dist/esm5/internal/operators/mergeWith.js","./internal/operators/min":"../node_modules/rxjs/dist/esm5/internal/operators/min.js","./internal/operators/multicast":"../node_modules/rxjs/dist/esm5/internal/operators/multicast.js","./internal/operators/observeOn":"../node_modules/rxjs/dist/esm5/internal/operators/observeOn.js","./internal/operators/pairwise":"../node_modules/rxjs/dist/esm5/internal/operators/pairwise.js","./internal/operators/pluck":"../node_modules/rxjs/dist/esm5/internal/operators/pluck.js","./internal/operators/publish":"../node_modules/rxjs/dist/esm5/internal/operators/publish.js","./internal/operators/publishBehavior":"../node_modules/rxjs/dist/esm5/internal/operators/publishBehavior.js","./internal/operators/publishLast":"../node_modules/rxjs/dist/esm5/internal/operators/publishLast.js","./internal/operators/publishReplay":"../node_modules/rxjs/dist/esm5/internal/operators/publishReplay.js","./internal/operators/raceWith":"../node_modules/rxjs/dist/esm5/internal/operators/raceWith.js","./internal/operators/reduce":"../node_modules/rxjs/dist/esm5/internal/operators/reduce.js","./internal/operators/repeat":"../node_modules/rxjs/dist/esm5/internal/operators/repeat.js","./internal/operators/repeatWhen":"../node_modules/rxjs/dist/esm5/internal/operators/repeatWhen.js","./internal/operators/retry":"../node_modules/rxjs/dist/esm5/internal/operators/retry.js","./internal/operators/retryWhen":"../node_modules/rxjs/dist/esm5/internal/operators/retryWhen.js","./internal/operators/refCount":"../node_modules/rxjs/dist/esm5/internal/operators/refCount.js","./internal/operators/sample":"../node_modules/rxjs/dist/esm5/internal/operators/sample.js","./internal/operators/sampleTime":"../node_modules/rxjs/dist/esm5/internal/operators/sampleTime.js","./internal/operators/scan":"../node_modules/rxjs/dist/esm5/internal/operators/scan.js","./internal/operators/sequenceEqual":"../node_modules/rxjs/dist/esm5/internal/operators/sequenceEqual.js","./internal/operators/share":"../node_modules/rxjs/dist/esm5/internal/operators/share.js","./internal/operators/shareReplay":"../node_modules/rxjs/dist/esm5/internal/operators/shareReplay.js","./internal/operators/single":"../node_modules/rxjs/dist/esm5/internal/operators/single.js","./internal/operators/skip":"../node_modules/rxjs/dist/esm5/internal/operators/skip.js","./internal/operators/skipLast":"../node_modules/rxjs/dist/esm5/internal/operators/skipLast.js","./internal/operators/skipUntil":"../node_modules/rxjs/dist/esm5/internal/operators/skipUntil.js","./internal/operators/skipWhile":"../node_modules/rxjs/dist/esm5/internal/operators/skipWhile.js","./internal/operators/startWith":"../node_modules/rxjs/dist/esm5/internal/operators/startWith.js","./internal/operators/subscribeOn":"../node_modules/rxjs/dist/esm5/internal/operators/subscribeOn.js","./internal/operators/switchAll":"../node_modules/rxjs/dist/esm5/internal/operators/switchAll.js","./internal/operators/switchMap":"../node_modules/rxjs/dist/esm5/internal/operators/switchMap.js","./internal/operators/switchMapTo":"../node_modules/rxjs/dist/esm5/internal/operators/switchMapTo.js","./internal/operators/switchScan":"../node_modules/rxjs/dist/esm5/internal/operators/switchScan.js","./internal/operators/take":"../node_modules/rxjs/dist/esm5/internal/operators/take.js","./internal/operators/takeLast":"../node_modules/rxjs/dist/esm5/internal/operators/takeLast.js","./internal/operators/takeUntil":"../node_modules/rxjs/dist/esm5/internal/operators/takeUntil.js","./internal/operators/takeWhile":"../node_modules/rxjs/dist/esm5/internal/operators/takeWhile.js","./internal/operators/tap":"../node_modules/rxjs/dist/esm5/internal/operators/tap.js","./internal/operators/throttle":"../node_modules/rxjs/dist/esm5/internal/operators/throttle.js","./internal/operators/throttleTime":"../node_modules/rxjs/dist/esm5/internal/operators/throttleTime.js","./internal/operators/throwIfEmpty":"../node_modules/rxjs/dist/esm5/internal/operators/throwIfEmpty.js","./internal/operators/timeInterval":"../node_modules/rxjs/dist/esm5/internal/operators/timeInterval.js","./internal/operators/timeoutWith":"../node_modules/rxjs/dist/esm5/internal/operators/timeoutWith.js","./internal/operators/timestamp":"../node_modules/rxjs/dist/esm5/internal/operators/timestamp.js","./internal/operators/toArray":"../node_modules/rxjs/dist/esm5/internal/operators/toArray.js","./internal/operators/window":"../node_modules/rxjs/dist/esm5/internal/operators/window.js","./internal/operators/windowCount":"../node_modules/rxjs/dist/esm5/internal/operators/windowCount.js","./internal/operators/windowTime":"../node_modules/rxjs/dist/esm5/internal/operators/windowTime.js","./internal/operators/windowToggle":"../node_modules/rxjs/dist/esm5/internal/operators/windowToggle.js","./internal/operators/windowWhen":"../node_modules/rxjs/dist/esm5/internal/operators/windowWhen.js","./internal/operators/withLatestFrom":"../node_modules/rxjs/dist/esm5/internal/operators/withLatestFrom.js","./internal/operators/zipAll":"../node_modules/rxjs/dist/esm5/internal/operators/zipAll.js","./internal/operators/zipWith":"../node_modules/rxjs/dist/esm5/internal/operators/zipWith.js"}],"../src/publish-subscribe/publish-subscribe.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onEvent = onEvent;
exports.publish = publish;

var _map = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/map"));

var _rxjs = require("rxjs");

var _global = require("../global/global");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_global.Global.defined("PUBLISH_SUBSCRIBE", new _map.default());

function onEvent(event) {
  var publish = _global.Global.get("PUBLISH_SUBSCRIBE").get(event);

  if (!publish) {
    _global.Global.get("PUBLISH_SUBSCRIBE").set(event, new _rxjs.Subject());
  }

  return _global.Global.get("PUBLISH_SUBSCRIBE").get(event);
}

function publish(event, data) {
  var publish = _global.Global.get("PUBLISH_SUBSCRIBE").get(event);

  if (publish) {
    publish.next(data);
  }
}
},{"@babel/runtime-corejs2/core-js/map":"../node_modules/@babel/runtime-corejs2/core-js/map.js","rxjs":"../node_modules/rxjs/dist/esm5/index.js","../global/global":"../src/global/global.ts"}],"../node_modules/core-js/library/modules/es6.array.is-array.js":[function(require,module,exports) {
// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = require('./_export');

$export($export.S, 'Array', { isArray: require('./_is-array') });

},{"./_export":"../node_modules/core-js/library/modules/_export.js","./_is-array":"../node_modules/core-js/library/modules/_is-array.js"}],"../node_modules/core-js/library/fn/array/is-array.js":[function(require,module,exports) {
require('../../modules/es6.array.is-array');
module.exports = require('../../modules/_core').Array.isArray;

},{"../../modules/es6.array.is-array":"../node_modules/core-js/library/modules/es6.array.is-array.js","../../modules/_core":"../node_modules/core-js/library/modules/_core.js"}],"../node_modules/@babel/runtime-corejs2/core-js/array/is-array.js":[function(require,module,exports) {
module.exports = require("core-js/library/fn/array/is-array");
},{"core-js/library/fn/array/is-array":"../node_modules/core-js/library/fn/array/is-array.js"}],"../node_modules/@babel/runtime-corejs2/helpers/arrayLikeToArray.js":[function(require,module,exports) {
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

module.exports = _arrayLikeToArray;
module.exports["default"] = module.exports, module.exports.__esModule = true;
},{}],"../node_modules/@babel/runtime-corejs2/helpers/arrayWithoutHoles.js":[function(require,module,exports) {
var _Array$isArray = require("@babel/runtime-corejs2/core-js/array/is-array");

var arrayLikeToArray = require("./arrayLikeToArray.js");

function _arrayWithoutHoles(arr) {
  if (_Array$isArray(arr)) return arrayLikeToArray(arr);
}

module.exports = _arrayWithoutHoles;
module.exports["default"] = module.exports, module.exports.__esModule = true;
},{"@babel/runtime-corejs2/core-js/array/is-array":"../node_modules/@babel/runtime-corejs2/core-js/array/is-array.js","./arrayLikeToArray.js":"../node_modules/@babel/runtime-corejs2/helpers/arrayLikeToArray.js"}],"../node_modules/@babel/runtime-corejs2/helpers/iterableToArray.js":[function(require,module,exports) {
var _Symbol = require("@babel/runtime-corejs2/core-js/symbol");

var _Symbol$iterator = require("@babel/runtime-corejs2/core-js/symbol/iterator");

var _Array$from = require("@babel/runtime-corejs2/core-js/array/from");

function _iterableToArray(iter) {
  if (typeof _Symbol !== "undefined" && iter[_Symbol$iterator] != null || iter["@@iterator"] != null) return _Array$from(iter);
}

module.exports = _iterableToArray;
module.exports["default"] = module.exports, module.exports.__esModule = true;
},{"@babel/runtime-corejs2/core-js/symbol":"../node_modules/@babel/runtime-corejs2/core-js/symbol.js","@babel/runtime-corejs2/core-js/symbol/iterator":"../node_modules/@babel/runtime-corejs2/core-js/symbol/iterator.js","@babel/runtime-corejs2/core-js/array/from":"../node_modules/@babel/runtime-corejs2/core-js/array/from.js"}],"../node_modules/@babel/runtime-corejs2/helpers/unsupportedIterableToArray.js":[function(require,module,exports) {
var _Array$from = require("@babel/runtime-corejs2/core-js/array/from");

var arrayLikeToArray = require("./arrayLikeToArray.js");

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return _Array$from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}

module.exports = _unsupportedIterableToArray;
module.exports["default"] = module.exports, module.exports.__esModule = true;
},{"@babel/runtime-corejs2/core-js/array/from":"../node_modules/@babel/runtime-corejs2/core-js/array/from.js","./arrayLikeToArray.js":"../node_modules/@babel/runtime-corejs2/helpers/arrayLikeToArray.js"}],"../node_modules/@babel/runtime-corejs2/helpers/nonIterableSpread.js":[function(require,module,exports) {
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableSpread;
module.exports["default"] = module.exports, module.exports.__esModule = true;
},{}],"../node_modules/@babel/runtime-corejs2/helpers/toConsumableArray.js":[function(require,module,exports) {
var arrayWithoutHoles = require("./arrayWithoutHoles.js");

var iterableToArray = require("./iterableToArray.js");

var unsupportedIterableToArray = require("./unsupportedIterableToArray.js");

var nonIterableSpread = require("./nonIterableSpread.js");

function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}

module.exports = _toConsumableArray;
module.exports["default"] = module.exports, module.exports.__esModule = true;
},{"./arrayWithoutHoles.js":"../node_modules/@babel/runtime-corejs2/helpers/arrayWithoutHoles.js","./iterableToArray.js":"../node_modules/@babel/runtime-corejs2/helpers/iterableToArray.js","./unsupportedIterableToArray.js":"../node_modules/@babel/runtime-corejs2/helpers/unsupportedIterableToArray.js","./nonIterableSpread.js":"../node_modules/@babel/runtime-corejs2/helpers/nonIterableSpread.js"}],"../node_modules/@babel/runtime-corejs2/helpers/arrayWithHoles.js":[function(require,module,exports) {
var _Array$isArray = require("@babel/runtime-corejs2/core-js/array/is-array");

function _arrayWithHoles(arr) {
  if (_Array$isArray(arr)) return arr;
}

module.exports = _arrayWithHoles;
module.exports["default"] = module.exports, module.exports.__esModule = true;
},{"@babel/runtime-corejs2/core-js/array/is-array":"../node_modules/@babel/runtime-corejs2/core-js/array/is-array.js"}],"../node_modules/@babel/runtime-corejs2/helpers/iterableToArrayLimit.js":[function(require,module,exports) {
var _Symbol = require("@babel/runtime-corejs2/core-js/symbol");

var _Symbol$iterator = require("@babel/runtime-corejs2/core-js/symbol/iterator");

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof _Symbol !== "undefined" && arr[_Symbol$iterator] || arr["@@iterator"];

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

module.exports = _iterableToArrayLimit;
module.exports["default"] = module.exports, module.exports.__esModule = true;
},{"@babel/runtime-corejs2/core-js/symbol":"../node_modules/@babel/runtime-corejs2/core-js/symbol.js","@babel/runtime-corejs2/core-js/symbol/iterator":"../node_modules/@babel/runtime-corejs2/core-js/symbol/iterator.js"}],"../node_modules/@babel/runtime-corejs2/helpers/nonIterableRest.js":[function(require,module,exports) {
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

module.exports = _nonIterableRest;
module.exports["default"] = module.exports, module.exports.__esModule = true;
},{}],"../node_modules/@babel/runtime-corejs2/helpers/slicedToArray.js":[function(require,module,exports) {
var arrayWithHoles = require("./arrayWithHoles.js");

var iterableToArrayLimit = require("./iterableToArrayLimit.js");

var unsupportedIterableToArray = require("./unsupportedIterableToArray.js");

var nonIterableRest = require("./nonIterableRest.js");

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}

module.exports = _slicedToArray;
module.exports["default"] = module.exports, module.exports.__esModule = true;
},{"./arrayWithHoles.js":"../node_modules/@babel/runtime-corejs2/helpers/arrayWithHoles.js","./iterableToArrayLimit.js":"../node_modules/@babel/runtime-corejs2/helpers/iterableToArrayLimit.js","./unsupportedIterableToArray.js":"../node_modules/@babel/runtime-corejs2/helpers/unsupportedIterableToArray.js","./nonIterableRest.js":"../node_modules/@babel/runtime-corejs2/helpers/nonIterableRest.js"}],"../node_modules/core-js/library/modules/es6.parse-int.js":[function(require,module,exports) {
var $export = require('./_export');
var $parseInt = require('./_parse-int');
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), { parseInt: $parseInt });

},{"./_export":"../node_modules/core-js/library/modules/_export.js","./_parse-int":"../node_modules/core-js/library/modules/_parse-int.js"}],"../node_modules/core-js/library/fn/parse-int.js":[function(require,module,exports) {
require('../modules/es6.parse-int');
module.exports = require('../modules/_core').parseInt;

},{"../modules/es6.parse-int":"../node_modules/core-js/library/modules/es6.parse-int.js","../modules/_core":"../node_modules/core-js/library/modules/_core.js"}],"../node_modules/@babel/runtime-corejs2/core-js/parse-int.js":[function(require,module,exports) {
module.exports = require("core-js/library/fn/parse-int");
},{"core-js/library/fn/parse-int":"../node_modules/core-js/library/fn/parse-int.js"}],"../node_modules/core-js/library/modules/_is-integer.js":[function(require,module,exports) {
// 20.1.2.3 Number.isInteger(number)
var isObject = require('./_is-object');
var floor = Math.floor;
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};

},{"./_is-object":"../node_modules/core-js/library/modules/_is-object.js"}],"../node_modules/core-js/library/modules/es6.number.is-integer.js":[function(require,module,exports) {
// 20.1.2.3 Number.isInteger(number)
var $export = require('./_export');

$export($export.S, 'Number', { isInteger: require('./_is-integer') });

},{"./_export":"../node_modules/core-js/library/modules/_export.js","./_is-integer":"../node_modules/core-js/library/modules/_is-integer.js"}],"../node_modules/core-js/library/fn/number/is-integer.js":[function(require,module,exports) {
require('../../modules/es6.number.is-integer');
module.exports = require('../../modules/_core').Number.isInteger;

},{"../../modules/es6.number.is-integer":"../node_modules/core-js/library/modules/es6.number.is-integer.js","../../modules/_core":"../node_modules/core-js/library/modules/_core.js"}],"../node_modules/@babel/runtime-corejs2/core-js/number/is-integer.js":[function(require,module,exports) {
module.exports = require("core-js/library/fn/number/is-integer");
},{"core-js/library/fn/number/is-integer":"../node_modules/core-js/library/fn/number/is-integer.js"}],"../src/functions/remove-accents.function.ts":[function(require,module,exports) {
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

var _assign = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/assign"));

var _removeAccents = require("./remove-accents.function");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function contains(value, compare, options) {
  var _options, _options2, _options3, _value2;

  if (!value) return false;

  var _value = value.toString();

  options = (0, _assign.default)({}, {
    removeSpace: true,
    removeAccents: true,
    caseSensitive: false
  }, options);

  if ((_options = options) !== null && _options !== void 0 && _options.removeAccents) {
    _value = (0, _removeAccents.removeAccents)(_value);

    if (typeof compare === "string") {
      compare = (0, _removeAccents.removeAccents)(compare);
    }
  }

  if (!((_options2 = options) !== null && _options2 !== void 0 && _options2.caseSensitive)) {
    _value = _value.toLowerCase();

    if (typeof compare === "string") {
      compare = compare.toLowerCase();
    }
  }

  if ((_options3 = options) !== null && _options3 !== void 0 && _options3.removeSpace) {
    _value = _value.replace(/ +/g, "");

    if (typeof compare === "string") {
      compare = compare.replace(/ +/g, "");
    }
  }

  var match = (_value2 = _value) === null || _value2 === void 0 ? void 0 : _value2.match(compare);
  return !!match;
}
},{"@babel/runtime-corejs2/core-js/object/assign":"../node_modules/@babel/runtime-corejs2/core-js/object/assign.js","./remove-accents.function":"../src/functions/remove-accents.function.ts"}],"../src/validations/number.validation.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isBeforeNumber = exports.isFloat = exports.isNumber = exports.isNumeric = exports.isNegative = void 0;

var _parseInt2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/parse-int"));

var _isInteger = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/number/is-integer"));

var _parseInt3 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/number/parse-int"));

var _contains = require("../functions/contains.function");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isNegative = function isNegative(value) {
  return (0, _contains.contains)(value.toString(), "-");
};

exports.isNegative = isNegative;

var isNumeric = function isNumeric(value) {
  return !isNaN((0, _parseInt2.default)(value)) && isFinite(value);
};

exports.isNumeric = isNumeric;

var isNumber = function isNumber(value) {
  return !isNaN((0, _parseInt2.default)(value)) && isFinite(value) && typeof value === "number";
};

exports.isNumber = isNumber;

var isFloat = function isFloat(value) {
  return isNumeric(value) && !(0, _isInteger.default)(Number(value));
};

exports.isFloat = isFloat;

var isBeforeNumber = function isBeforeNumber(value, range) {
  value = (0, _parseInt3.default)(value.toString());
  return value >= (range.start || 0) && value <= range.end;
};

exports.isBeforeNumber = isBeforeNumber;
},{"@babel/runtime-corejs2/core-js/parse-int":"../node_modules/@babel/runtime-corejs2/core-js/parse-int.js","@babel/runtime-corejs2/core-js/number/is-integer":"../node_modules/@babel/runtime-corejs2/core-js/number/is-integer.js","@babel/runtime-corejs2/core-js/number/parse-int":"../node_modules/@babel/runtime-corejs2/core-js/number/parse-int.js","../functions/contains.function":"../src/functions/contains.function.ts"}],"../src/functions/parse-number.function.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseNumber = parseNumber;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/slicedToArray"));

var _assign = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/assign"));

var _number = require("../validations/number.validation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  config = (0, _assign.default)({}, _config, config);

  if (!(0, _number.isNumeric)(value) && typeof value === "string") {
    var _config2, _prefix, _sufixa;

    var negative = (0, _number.isNegative)(value);
    var decimalStr = new RegExp("\\".concat((_config2 = config) === null || _config2 === void 0 ? void 0 : _config2.decimal), "g");

    if (config.thousands) {
      var _config3;

      var thousandsStr = new RegExp("\\".concat((_config3 = config) === null || _config3 === void 0 ? void 0 : _config3.thousands), "g");
      value = value.toString().replace(thousandsStr, "");
    }

    value = value.toString().replace(decimalStr, ".");

    var _value$split = value.split("."),
        _value$split2 = (0, _slicedToArray2.default)(_value$split, 2),
        prefix = _value$split2[0],
        sufixa = _value$split2[1];

    prefix = (_prefix = prefix) === null || _prefix === void 0 ? void 0 : _prefix.replace(/\D/g, "");
    sufixa = (_sufixa = sufixa) === null || _sufixa === void 0 ? void 0 : _sufixa.replace(/\D/g, "");
    value = Number("".concat(prefix, ".").concat(sufixa)) || 0;

    if (negative) {
      value = -value;
    }
  } else {
    var _config4;

    if ((_config4 = config) !== null && _config4 !== void 0 && _config4.error) new Error("Invalid Input.");
  }

  return Number(value);
}
},{"@babel/runtime-corejs2/helpers/slicedToArray":"../node_modules/@babel/runtime-corejs2/helpers/slicedToArray.js","@babel/runtime-corejs2/core-js/object/assign":"../node_modules/@babel/runtime-corejs2/core-js/object/assign.js","../validations/number.validation":"../src/validations/number.validation.ts"}],"../src/calc/math.calc.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.distribute = exports.increment = exports.divide = exports.multiply = exports.subtract = exports.add = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/slicedToArray"));

var _parseNumber = require("../functions/parse-number.function");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var convertValues = function convertValues(value, twoValue) {
  value = (0, _parseNumber.parseNumber)(value);
  twoValue = (0, _parseNumber.parseNumber)(twoValue);
  return [value, twoValue];
};

var add = function add(value, twoValue) {
  var _convertValues = convertValues(value, twoValue),
      _convertValues2 = (0, _slicedToArray2.default)(_convertValues, 2),
      one = _convertValues2[0],
      two = _convertValues2[1];

  return one + two;
};

exports.add = add;

var subtract = function subtract(value, twoValue) {
  var _convertValues3 = convertValues(value, twoValue),
      _convertValues4 = (0, _slicedToArray2.default)(_convertValues3, 2),
      one = _convertValues4[0],
      two = _convertValues4[1];

  return one - two;
};

exports.subtract = subtract;

var multiply = function multiply(value, twoValue) {
  var _convertValues5 = convertValues(value, twoValue),
      _convertValues6 = (0, _slicedToArray2.default)(_convertValues5, 2),
      one = _convertValues6[0],
      two = _convertValues6[1];

  return one * two;
};

exports.multiply = multiply;

var divide = function divide(value, twoValue) {
  var _convertValues7 = convertValues(value, twoValue),
      _convertValues8 = (0, _slicedToArray2.default)(_convertValues7, 2),
      one = _convertValues8[0],
      two = _convertValues8[1];

  return one / two;
};

exports.divide = divide;

var increment = function increment(value, _increment2) {
  var _convertValues9 = convertValues(value, _increment2),
      _convertValues10 = (0, _slicedToArray2.default)(_convertValues9, 2),
      _value = _convertValues10[0],
      _increment = _convertValues10[1];

  return _increment > 0 ? Math.round(_value / _increment) * _increment : _value;
};

exports.increment = increment;

var distribute = function distribute(value, number) {
  var _convertValues11 = convertValues(value, number),
      _convertValues12 = (0, _slicedToArray2.default)(_convertValues11, 2),
      _valueInit = _convertValues12[0],
      _number = _convertValues12[1];

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
},{"@babel/runtime-corejs2/helpers/slicedToArray":"../node_modules/@babel/runtime-corejs2/helpers/slicedToArray.js","../functions/parse-number.function":"../src/functions/parse-number.function.ts"}],"../src/calc/calc.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calc = calc;
exports.isCalc = exports.Calc = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _assign = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/assign"));

var _math = require("./math.calc");

var _parseNumber = require("../functions/parse-number.function");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var Calc = /*#__PURE__*/function () {
  function Calc(value, config) {
    var _this$config;

    (0, _classCallCheck2.default)(this, Calc);
    this.config = (0, _assign.default)({}, _config, config);
    this.precision = Math.pow(10, (_this$config = this.config) === null || _this$config === void 0 ? void 0 : _this$config.precision);

    this._save(value);
  }
  /**
   * @public
   * @description Converte um valor do tipo string ou Calc para um number
   * @param {CalcAny | Calc} value
   * @returns {number} */


  (0, _createClass2.default)(Calc, [{
    key: "_parse",
    value: function _parse(value) {
      if (isCalc(value)) {
        value = value.valueRaw;
      } else {
        value = (0, _parseNumber.parseNumber)(value, this.config);
      }

      return value;
    }
    /**
     * @public
     * @description Salva o valor verificando que tipo que ele é
     * @param {CalcAny | Calc} value */

  }, {
    key: "_save",
    value: function _save(value) {
      if (isCalc(value)) {
        this.valueRaw = value.valueRaw;
      } else {
        this.valueRaw = (0, _parseNumber.parseNumber)(value, this.config);
      }

      this.value = this._roundingNumber(this.valueRaw);
    }
    /**
     * @public
     * @description Arredonda o valor usando a configuração da classe
     * @param {number | string} value */

  }, {
    key: "_roundingNumber",
    value: function _roundingNumber(value) {
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
    }
    /**
     * @public
     * @description Faz a adição do valor passado via parametro no valor salvo na classe
     * @param {CalcAny | Calc} value
     * @returns {Calc}  */

  }, {
    key: "add",
    value: function add(value) {
      this.valueRaw = (0, _math.add)(this.valueRaw, this._parse(value));
      this.value = this._roundingNumber(this.valueRaw);
      return this;
    }
    /**
     * @public
     * @description Faz a subtração do valor passado via parametro no valor salvo na classe
     * @param {CalcAny | Calc} value
     * @returns {Calc} */

  }, {
    key: "subtract",
    value: function subtract(value) {
      this.valueRaw = (0, _math.subtract)(this.valueRaw, this._parse(value));
      this.value = this._roundingNumber(this.valueRaw);
      return this;
    }
    /**
     * @public
     * @description Faz a multiplicação do valor passado via parametro no valor salvo na classe
     * @param {CalcAny | Calc} value
     * @returns {Calc} */

  }, {
    key: "multiply",
    value: function multiply(value) {
      this.valueRaw = (0, _math.multiply)(this.valueRaw, this._parse(value));
      this.value = this._roundingNumber(this.valueRaw);
      return this;
    }
    /**
     * @public
     * @description Faz a divisão do valor passado via parametro no valor salvo na classe
     * @param {CalcAny | Calc} value
     * @returns {Calc} */

  }, {
    key: "divide",
    value: function divide(value) {
      this.valueRaw = (0, _math.divide)(this.valueRaw, this._parse(value));
      this.value = this._roundingNumber(this.valueRaw);
      return this;
    }
    /**
     * @public
     * @description Distribui o valor salvo na classe igualmente entre a quantidade passada
     * @param {CalcAny | Calc} value
     * @returns {number[]} */

  }, {
    key: "distribute",
    value: function distribute(amount) {
      var _this = this;

      var result = (0, _math.distribute)(this.valueRaw, this._parse(amount)).map(function (value) {
        return _this._roundingNumber(value);
      });

      var rest = this._roundingNumber((0, _math.subtract)(this.valueRaw, (0, _math.multiply)(result.pop(), result.length)));

      return [].concat((0, _toConsumableArray2.default)(result), [rest]);
    }
    /**
     * @public
     * @description Transforma o valor em um string
     * @returns {string} */

  }, {
    key: "toString",
    value: function toString() {
      return this.value.toString();
    }
    /**
     * @public
     * @description Transforma o valor do calculo em um json {value: 21.2}
     * @returns {number} */

  }, {
    key: "toJson",
    value: function toJson() {
      return this.value;
    }
  }]);
  return Calc;
}();
/**
 * @public
 * @description Configura as opções padrão da classe Calc
 * @param {Partial<IConfigCalc>} config */


exports.Calc = Calc;

calc.config = function (config) {
  (0, _assign.default)(_config, config);
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
},{"@babel/runtime-corejs2/helpers/toConsumableArray":"../node_modules/@babel/runtime-corejs2/helpers/toConsumableArray.js","@babel/runtime-corejs2/helpers/classCallCheck":"../node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js","@babel/runtime-corejs2/helpers/createClass":"../node_modules/@babel/runtime-corejs2/helpers/createClass.js","@babel/runtime-corejs2/core-js/object/assign":"../node_modules/@babel/runtime-corejs2/core-js/object/assign.js","./math.calc":"../src/calc/math.calc.ts","../functions/parse-number.function":"../src/functions/parse-number.function.ts"}],"../src/calc/calc.type.ts":[function(require,module,exports) {
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
var INPUT_TYPE_TEXT = ["email", "number", "password", "search", "tel", "text", "url"];
exports.INPUT_TYPE_TEXT = INPUT_TYPE_TEXT;
var INPUT_TYPE_DATE = ["date", "datetime", "datetime-local", "month", "time", "week"];
exports.INPUT_TYPE_DATE = INPUT_TYPE_DATE;
var INPUT_TYPE_OTHER = ["button", "checkbox", "color", "file", "hidden", "image", "radio", "range", "submit"];
exports.INPUT_TYPE_OTHER = INPUT_TYPE_OTHER;
var INPUT_TYPE = [].concat(INPUT_TYPE_DATE, INPUT_TYPE_TEXT, INPUT_TYPE_OTHER);
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

function stackCallback(handler) {
  var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
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

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _assign = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/assign"));

var _stackCallback = require("../functions/stack-callback.function");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _config = {
  time: 250
};

function debounce(callbackOrTime, time) {
  return new Debounce(callbackOrTime, time);
}

var Debounce = /*#__PURE__*/function () {
  function Debounce(callbackOrTime, time) {
    (0, _classCallCheck2.default)(this, Debounce);

    if (typeof callbackOrTime === "function") {
      this.config = (0, _assign.default)({}, _config);

      if (time) {
        (0, _assign.default)(this.config, {
          time: time
        });
      }

      this.run(callbackOrTime);
    } else {
      this.config = (0, _assign.default)({}, _config);

      if (callbackOrTime) {
        (0, _assign.default)(this.config, {
          time: callbackOrTime
        });
      }
    }
  }

  (0, _createClass2.default)(Debounce, [{
    key: "run",
    value: function run(callback, time) {
      this.cancel();
      this.ref = (0, _stackCallback.stackCallback)(callback, time || this.config.time);
      return this;
    }
  }, {
    key: "cancel",
    value: function cancel() {
      if (this.ref) {
        (0, _stackCallback.cancelStackCallback)(this.ref);
        this.ref = undefined;
      }

      return this;
    }
  }]);
  return Debounce;
}();

exports.Debounce = Debounce;

debounce.config = function (config) {
  (0, _assign.default)(_config, config);
};

var isDebounce = function isDebounce(prop) {
  return prop instanceof Debounce;
};

exports.isDebounce = isDebounce;
debounce.isDebounce = isDebounce;
},{"@babel/runtime-corejs2/helpers/classCallCheck":"../node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js","@babel/runtime-corejs2/helpers/createClass":"../node_modules/@babel/runtime-corejs2/helpers/createClass.js","@babel/runtime-corejs2/core-js/object/assign":"../node_modules/@babel/runtime-corejs2/core-js/object/assign.js","../functions/stack-callback.function":"../src/functions/stack-callback.function.ts"}],"../src/debounce/debounce.type.ts":[function(require,module,exports) {
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

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _assign = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/assign"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/keys"));

var _getOwnPropertySymbols = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-symbols"));

var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-descriptor"));

var _getOwnPropertyDescriptors = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-descriptors"));

var _imask = _interopRequireDefault(require("imask"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = (0, _keys.default)(object); if (_getOwnPropertySymbols.default) { var symbols = (0, _getOwnPropertySymbols.default)(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return (0, _getOwnPropertyDescriptor.default)(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (_getOwnPropertyDescriptors.default) { Object.defineProperties(target, (0, _getOwnPropertyDescriptors.default)(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, (0, _getOwnPropertyDescriptor.default)(source, key)); }); } } return target; }

function maskIMask(pattern, config) {
  return new MaskIMask(pattern, config);
}

var MaskIMask = /*#__PURE__*/function () {
  function MaskIMask(pattern, config) {
    var _this = this;

    (0, _classCallCheck2.default)(this, MaskIMask);
    this.config = (0, _assign.default)({}, this.config, config);

    if (typeof pattern === "string") {
      this.pattern = pattern;
      var patterns = this.pattern.split("||").sort(function (one, two) {
        return one.length - two.length;
      });
      this.config.mask = patterns.length > 1 ? patterns.map(function (pattern) {
        return (0, _assign.default)({}, _this.config, {
          mask: pattern
        });
      }) : patterns[0];
    } else {
      (0, _assign.default)(this.config, pattern);
    }
  }

  (0, _createClass2.default)(MaskIMask, [{
    key: "bind",
    value: function bind(element, config) {
      config = (0, _assign.default)({}, this.config, config);
      this.element = element;
      this.inputMask = (0, _imask.default)(this.element, config);
      this.update(this.inputMask.value);
      return this;
    }
  }, {
    key: "update",
    value: function update(value, config) {
      config = (0, _assign.default)({}, this.config, config);

      if (!value) {
        value = this.element instanceof HTMLInputElement ? this.element.value : this.element.textContent;
      }

      if (this.element && value) {
        this.inputMask.value = this.mask(value, config);
        this.inputMask.updateValue();
      }

      return this;
    }
  }, {
    key: "mask",
    value: function mask(value, config) {
      config = (0, _assign.default)({}, this.config, config);
      var imask = this.createMask((value === null || value === void 0 ? void 0 : value.toString()) || "", config);
      return imask.value;
    }
  }, {
    key: "unmask",
    value: function unmask(value, config) {
      config = (0, _assign.default)({}, this.config, config);
      var imask = this.createMask((value === null || value === void 0 ? void 0 : value.toString()) || "", config);
      return imask.unmaskedValue;
    }
  }, {
    key: "createMask",
    value: function createMask(value, config) {
      var createMask = _imask.default.createMask(_objectSpread({}, config));

      createMask.resolve(value);
      return createMask;
    }
  }]);
  return MaskIMask;
}();

exports.MaskIMask = MaskIMask;
},{"@babel/runtime-corejs2/helpers/defineProperty":"../node_modules/@babel/runtime-corejs2/helpers/defineProperty.js","@babel/runtime-corejs2/helpers/classCallCheck":"../node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js","@babel/runtime-corejs2/helpers/createClass":"../node_modules/@babel/runtime-corejs2/helpers/createClass.js","@babel/runtime-corejs2/core-js/object/assign":"../node_modules/@babel/runtime-corejs2/core-js/object/assign.js","@babel/runtime-corejs2/core-js/object/keys":"../node_modules/@babel/runtime-corejs2/core-js/object/keys.js","@babel/runtime-corejs2/core-js/object/get-own-property-symbols":"../node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-symbols.js","@babel/runtime-corejs2/core-js/object/get-own-property-descriptor":"../node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-descriptor.js","@babel/runtime-corejs2/core-js/object/get-own-property-descriptors":"../node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-descriptors.js","imask":"../node_modules/imask/esm/index.js"}],"../node_modules/vanilla-masker/lib/vanilla-masker.js":[function(require,module,exports) {
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

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _assign = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/assign"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/keys"));

var _getOwnPropertySymbols = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-symbols"));

var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-descriptor"));

var _getOwnPropertyDescriptors = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/get-own-property-descriptors"));

var _vanillaMasker = _interopRequireDefault(require("vanilla-masker"));

var _parseNumber = require("../../functions/parse-number.function");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = (0, _keys.default)(object); if (_getOwnPropertySymbols.default) { var symbols = (0, _getOwnPropertySymbols.default)(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return (0, _getOwnPropertyDescriptor.default)(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (_getOwnPropertyDescriptors.default) { Object.defineProperties(target, (0, _getOwnPropertyDescriptors.default)(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, (0, _getOwnPropertyDescriptor.default)(source, key)); }); } } return target; }

var _config = {
  separator: ",",
  delimiter: "."
};

function maskVanillaMasker(config) {
  return new MaskVanillaMasker(config);
}

var MaskVanillaMasker = /*#__PURE__*/function () {
  function MaskVanillaMasker(config) {
    (0, _classCallCheck2.default)(this, MaskVanillaMasker);
    this.config = (0, _assign.default)({}, _config, config);
  }

  (0, _createClass2.default)(MaskVanillaMasker, [{
    key: "bind",
    value: function bind(element, config) {
      var _this = this;

      this.element = element;
      this.config.dispatchEvent = true;
      config = (0, _assign.default)({}, this.config, _objectSpread(_objectSpread({}, config), {}, {
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
    }
  }, {
    key: "update",
    value: function update(value, config) {
      config = (0, _assign.default)({}, this.config, config);

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
    }
  }, {
    key: "mask",
    value: function mask(value, config) {
      config = (0, _assign.default)({}, this.config, config);

      if (!config.dispatchEvent) {
        var _value;

        value = this.unmask(((_value = value) === null || _value === void 0 ? void 0 : _value.toString()) || "").toFixed(config.precision || 2);
      }

      return _vanillaMasker.default.toMoney(value, _objectSpread(_objectSpread({}, config), {}, {
        delimiter: "-"
      })).replace(/-/g, config.delimiter);
    }
  }, {
    key: "unmask",
    value: function unmask(value, config) {
      config = (0, _assign.default)({}, this.config, config);
      return (0, _parseNumber.parseNumber)(value, {
        decimal: config.separator,
        thousands: config.delimiter
      });
    }
  }]);
  return MaskVanillaMasker;
}();

exports.MaskVanillaMasker = MaskVanillaMasker;

maskVanillaMasker.config = function (config) {
  (0, _assign.default)(_config, config);
};
},{"@babel/runtime-corejs2/helpers/defineProperty":"../node_modules/@babel/runtime-corejs2/helpers/defineProperty.js","@babel/runtime-corejs2/helpers/classCallCheck":"../node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js","@babel/runtime-corejs2/helpers/createClass":"../node_modules/@babel/runtime-corejs2/helpers/createClass.js","@babel/runtime-corejs2/core-js/object/assign":"../node_modules/@babel/runtime-corejs2/core-js/object/assign.js","@babel/runtime-corejs2/core-js/object/keys":"../node_modules/@babel/runtime-corejs2/core-js/object/keys.js","@babel/runtime-corejs2/core-js/object/get-own-property-symbols":"../node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-symbols.js","@babel/runtime-corejs2/core-js/object/get-own-property-descriptor":"../node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-descriptor.js","@babel/runtime-corejs2/core-js/object/get-own-property-descriptors":"../node_modules/@babel/runtime-corejs2/core-js/object/get-own-property-descriptors.js","vanilla-masker":"../node_modules/vanilla-masker/lib/vanilla-masker.js","../../functions/parse-number.function":"../src/functions/parse-number.function.ts"}],"../src/masked/masked.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.masked = masked;

var _keys = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/keys"));

var _assign = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/assign"));

var _mask = require("../constant/mask.constant");

var _common = require("../validations/common/common.validation");

var _maskImask = require("./imask/mask-imask");

var _vanillaMasker = require("./vanilla-masker/vanilla-masker");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function masked(pattern, config) {
  if (typeof pattern === "string") {
    var custoMaskKeys = (0, _keys.default)(_mask.CUSTOM_MASKS);

    if (custoMaskKeys.includes(pattern === null || pattern === void 0 ? void 0 : pattern.toUpperCase())) {
      var CUSTOM_MASK = _mask.CUSTOM_MASKS[pattern === null || pattern === void 0 ? void 0 : pattern.toUpperCase()];

      if (CUSTOM_MASK.type === "MASK") {
        var _config = CUSTOM_MASK.config;

        if ((0, _common.isArray)(_config.mask)) {
          _config.mask = _config.mask.map(function (mask) {
            return (0, _assign.default)({}, config, mask);
          });
        }

        config = (0, _assign.default)({}, CUSTOM_MASK.config, config);
        return new _maskImask.MaskIMask(config);
      } else {
        config = (0, _assign.default)({}, CUSTOM_MASK.config, config);
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
},{"@babel/runtime-corejs2/core-js/object/keys":"../node_modules/@babel/runtime-corejs2/core-js/object/keys.js","@babel/runtime-corejs2/core-js/object/assign":"../node_modules/@babel/runtime-corejs2/core-js/object/assign.js","../constant/mask.constant":"../src/constant/mask.constant.ts","../validations/common/common.validation":"../src/validations/common/common.validation.ts","./imask/mask-imask":"../src/masked/imask/mask-imask.ts","./vanilla-masker/vanilla-masker":"../src/masked/vanilla-masker/vanilla-masker.ts"}],"../src/masked/masked.type.ts":[function(require,module,exports) {
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
  var _keys2, _keys3, _keys4, _keys5;

  if (typeof keys === "string") {
    var _keys;

    keys = (_keys = keys) === null || _keys === void 0 ? void 0 : _keys.split(".");
  }

  keys = (_keys2 = keys) === null || _keys2 === void 0 ? void 0 : _keys2.filter(function (key) {
    return key;
  });

  if (((_keys3 = keys) === null || _keys3 === void 0 ? void 0 : _keys3.length) === 0) {
    return object;
  }

  var key = keys[0];
  (_keys4 = keys) === null || _keys4 === void 0 ? void 0 : _keys4.shift();

  if (((_keys5 = keys) === null || _keys5 === void 0 ? void 0 : _keys5.length) === 0) {
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

var _typeof2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/object/keys"));

var _getNode = require("../functions/object/get-node.function");

var _extends = require("../functions/object/extends.function");

var _themeSystem = require("../functions/theme-system.function");

var _common = require("../validations/common/common.validation");

var _themeColor = require("./theme-color");

var _window, _window$matchMedia, _window$matchMedia$ca, _window2, _window2$matchMedia, _window2$matchMedia$c;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _config = {
  prefix: "color",
  use: (0, _themeSystem.themeSystem)() || "light",
  disableSystemBasedColorShift: false,
  _element: document.createElement("style")
};
(_window = window) === null || _window === void 0 ? void 0 : (_window$matchMedia = _window.matchMedia) === null || _window$matchMedia === void 0 ? void 0 : (_window$matchMedia$ca = _window$matchMedia.call(_window, "(prefers-color-scheme: dark)")) === null || _window$matchMedia$ca === void 0 ? void 0 : _window$matchMedia$ca.addEventListener("change", function (event) {
  if ((0, _common.isFalsy)(_config.disableSystemBasedColorShift)) {
    theme().change((0, _themeSystem.themeSystem)() || "light");
  }
});

function theme(themes, config) {
  return new Theme(themes, config);
}

var Theme = /*#__PURE__*/function () {
  function Theme(themes, config) {
    (0, _classCallCheck2.default)(this, Theme);
    (0, _extends.$extends)(Theme._themes, themes);
    (0, _extends.$extends)(_config, config);

    if (!document.head.contains(this.element)) {
      document.head.appendChild(this.element);
    }
  }

  (0, _createClass2.default)(Theme, [{
    key: "themes",
    get: function get() {
      return Theme._themes;
    }
  }, {
    key: "prefix",
    get: function get() {
      return _config.prefix;
    }
  }, {
    key: "style",
    get: function get() {
      return _config._style;
    }
  }, {
    key: "use",
    get: function get() {
      return _config.use;
    }
  }, {
    key: "config",
    get: function get() {
      return _config;
    }
  }, {
    key: "element",
    get: function get() {
      return _config._element;
    }
  }, {
    key: "themeSystem",
    get: function get() {
      return (0, _themeSystem.themeSystem)() || "light";
    }
  }, {
    key: "isDark",
    get: function get() {
      return this.use === "dark";
    }
  }, {
    key: "isLight",
    get: function get() {
      return this.use === "light";
    }
  }, {
    key: "isNoPreference",
    get: function get() {
      return this.use === "no-preference";
    }
    /**
     * @private
     * @description Reseta todo o estilo */

  }, {
    key: "reset",
    value: function reset() {
      Theme._themes = {};
      _config = {
        use: this.themeSystem,
        _style: "",
        prefix: "color",
        disableChangeScheme: false,
        _element: _config._element
      };
    }
    /**
     * @private
     * @description Altera o tema do sistema podendo ser dark light ou o padrão */

  }, {
    key: "change",
    value: function change(theme) {
      _config.use = theme;
      this.createStyle();
    }
    /**
     * @private
     * @description Cria todo o estilo baseado nas cores passadas no construtor */

  }, {
    key: "createStyle",
    value: function createStyle() {
      _config._style = this._generatorStyle();
      _config._element.innerHTML = this.style;
      document.body.classList.remove("theme-dark", "theme-light", "theme-no-preference");
      document.body.classList.add("theme-".concat(_config.use));
    }
    /**
     * @private
     * @description Pega a cor passada por paramento
     * @example getColor("dark.primary.light") */

  }, {
    key: "getColor",
    value: function getColor(colors) {
      var currentTheme = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var nodes = colors.split(".");

      if (currentTheme) {
        nodes.unshift(this.use);
      }

      var color = (0, _getNode.getNode)(this.themes, nodes);

      if ((0, _typeof2.default)(color) === "object") {
        return color.default;
      }

      return color;
    }
    /**
     * @private
     * @description Gera o conteudo da tag de estilo */

  }, {
    key: "_generatorStyle",
    value: function _generatorStyle() {
      var style = ["color-scheme: ".concat(this.use)];
      var colors = Theme._themes[this.use];

      if ((0, _typeof2.default)(Theme._themes.global) === "object") {
        style = style.concat(this._generatorStyleVariables(Theme._themes.global));
      }

      if ((0, _typeof2.default)(colors) === "object") {
        style = style.concat(this._generatorStyleVariables(colors));
      }

      return ":root{".concat(style.join(";"), ";}");
    }
    /**
     * @private
     * @description Gera todas as variavel de estilo passadas pelo paramento */

  }, {
    key: "_generatorStyleVariables",
    value: function _generatorStyleVariables(colors) {
      var _this = this;

      return (0, _keys.default)(colors).reduce(function (prev, colorType) {
        if (typeof colors[colorType] === "string") {
          prev.push("--".concat(_this.prefix, "-").concat(colorType, ": ").concat(colors[colorType]));
        } else {
          (0, _keys.default)(colors[colorType]).forEach(function (colorName) {
            var value = colors[colorType][colorName];

            if (colorName === "default") {
              prev.push("--".concat(_this.prefix, "-").concat(colorType, ": ").concat(value));
            } else {
              prev.push("--".concat(_this.prefix, "-").concat(colorType, "-").concat(colorName, ": ").concat(value));
            }
          });
        }

        return prev;
      }, []);
    }
  }]);
  return Theme;
}();

exports.Theme = Theme;
Theme._themes = _themeColor.themeColor;
/**
 * @public
 * @description Este observador é nativo do javascript então
 * você ficar responsavel por destruir este observador
 * @example Theme.destroyChangeTheme(listener) */

Theme.onChangeTheme = (_window2 = window) === null || _window2 === void 0 ? void 0 : (_window2$matchMedia = _window2.matchMedia) === null || _window2$matchMedia === void 0 ? void 0 : (_window2$matchMedia$c = _window2$matchMedia.call(_window2, "(prefers-color-scheme: dark)")) === null || _window2$matchMedia$c === void 0 ? void 0 : _window2$matchMedia$c.addEventListener.bind(window);
/**
 * @public
 * @description Este metodo é usado para destruir os observador usados no onChangeTheme */

Theme.destroyChangeTheme = function (listener) {
  var _window3, _window3$matchMedia, _window3$matchMedia$c;

  return (_window3 = window) === null || _window3 === void 0 ? void 0 : (_window3$matchMedia = _window3.matchMedia) === null || _window3$matchMedia === void 0 ? void 0 : (_window3$matchMedia$c = _window3$matchMedia.call(_window3, "(prefers-color-scheme: dark)")) === null || _window3$matchMedia$c === void 0 ? void 0 : _window3$matchMedia$c.removeEventListener("change", listener);
};

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
},{"@babel/runtime-corejs2/helpers/typeof":"../node_modules/@babel/runtime-corejs2/helpers/typeof.js","@babel/runtime-corejs2/helpers/classCallCheck":"../node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js","@babel/runtime-corejs2/helpers/createClass":"../node_modules/@babel/runtime-corejs2/helpers/createClass.js","@babel/runtime-corejs2/core-js/object/keys":"../node_modules/@babel/runtime-corejs2/core-js/object/keys.js","../functions/object/get-node.function":"../src/functions/object/get-node.function.ts","../functions/object/extends.function":"../src/functions/object/extends.function.ts","../functions/theme-system.function":"../src/functions/theme-system.function.ts","../validations/common/common.validation":"../src/validations/common/common.validation.ts","./theme-color":"../src/theme/theme-color.ts"}],"../src/theme/theme.type.ts":[function(require,module,exports) {
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
  var _array$, _array$$match;

  var array = base64 === null || base64 === void 0 ? void 0 : base64.split(",");
  var mime = ((_array$ = array[0]) === null || _array$ === void 0 ? void 0 : (_array$$match = _array$.match(/:(.*?);/)) === null || _array$$match === void 0 ? void 0 : _array$$match[1]) || "image/png";

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
},{}],"../node_modules/core-js/library/modules/_species-constructor.js":[function(require,module,exports) {
// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = require('./_an-object');
var aFunction = require('./_a-function');
var SPECIES = require('./_wks')('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};

},{"./_an-object":"../node_modules/core-js/library/modules/_an-object.js","./_a-function":"../node_modules/core-js/library/modules/_a-function.js","./_wks":"../node_modules/core-js/library/modules/_wks.js"}],"../node_modules/core-js/library/modules/_invoke.js":[function(require,module,exports) {
// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};

},{}],"../node_modules/core-js/library/modules/_task.js":[function(require,module,exports) {


var ctx = require('./_ctx');
var invoke = require('./_invoke');
var html = require('./_html');
var cel = require('./_dom-create');
var global = require('./_global');
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (require('./_cof')(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};

},{"./_ctx":"../node_modules/core-js/library/modules/_ctx.js","./_invoke":"../node_modules/core-js/library/modules/_invoke.js","./_html":"../node_modules/core-js/library/modules/_html.js","./_dom-create":"../node_modules/core-js/library/modules/_dom-create.js","./_global":"../node_modules/core-js/library/modules/_global.js","./_cof":"../node_modules/core-js/library/modules/_cof.js"}],"../node_modules/core-js/library/modules/_microtask.js":[function(require,module,exports) {


var global = require('./_global');
var macrotask = require('./_task').set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = require('./_cof')(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};

},{"./_global":"../node_modules/core-js/library/modules/_global.js","./_task":"../node_modules/core-js/library/modules/_task.js","./_cof":"../node_modules/core-js/library/modules/_cof.js"}],"../node_modules/core-js/library/modules/_new-promise-capability.js":[function(require,module,exports) {
'use strict';
// 25.4.1.5 NewPromiseCapability(C)
var aFunction = require('./_a-function');

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};

},{"./_a-function":"../node_modules/core-js/library/modules/_a-function.js"}],"../node_modules/core-js/library/modules/_perform.js":[function(require,module,exports) {
module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};

},{}],"../node_modules/core-js/library/modules/_user-agent.js":[function(require,module,exports) {

var global = require('./_global');
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';

},{"./_global":"../node_modules/core-js/library/modules/_global.js"}],"../node_modules/core-js/library/modules/_promise-resolve.js":[function(require,module,exports) {
var anObject = require('./_an-object');
var isObject = require('./_is-object');
var newPromiseCapability = require('./_new-promise-capability');

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

},{"./_an-object":"../node_modules/core-js/library/modules/_an-object.js","./_is-object":"../node_modules/core-js/library/modules/_is-object.js","./_new-promise-capability":"../node_modules/core-js/library/modules/_new-promise-capability.js"}],"../node_modules/core-js/library/modules/es6.promise.js":[function(require,module,exports) {


'use strict';
var LIBRARY = require('./_library');
var global = require('./_global');
var ctx = require('./_ctx');
var classof = require('./_classof');
var $export = require('./_export');
var isObject = require('./_is-object');
var aFunction = require('./_a-function');
var anInstance = require('./_an-instance');
var forOf = require('./_for-of');
var speciesConstructor = require('./_species-constructor');
var task = require('./_task').set;
var microtask = require('./_microtask')();
var newPromiseCapabilityModule = require('./_new-promise-capability');
var perform = require('./_perform');
var userAgent = require('./_user-agent');
var promiseResolve = require('./_promise-resolve');
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[require('./_wks')('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = require('./_redefine-all')($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
require('./_set-to-string-tag')($Promise, PROMISE);
require('./_set-species')(PROMISE);
Wrapper = require('./_core')[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && require('./_iter-detect')(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});

},{"./_library":"../node_modules/core-js/library/modules/_library.js","./_global":"../node_modules/core-js/library/modules/_global.js","./_ctx":"../node_modules/core-js/library/modules/_ctx.js","./_classof":"../node_modules/core-js/library/modules/_classof.js","./_export":"../node_modules/core-js/library/modules/_export.js","./_is-object":"../node_modules/core-js/library/modules/_is-object.js","./_a-function":"../node_modules/core-js/library/modules/_a-function.js","./_an-instance":"../node_modules/core-js/library/modules/_an-instance.js","./_for-of":"../node_modules/core-js/library/modules/_for-of.js","./_species-constructor":"../node_modules/core-js/library/modules/_species-constructor.js","./_task":"../node_modules/core-js/library/modules/_task.js","./_microtask":"../node_modules/core-js/library/modules/_microtask.js","./_new-promise-capability":"../node_modules/core-js/library/modules/_new-promise-capability.js","./_perform":"../node_modules/core-js/library/modules/_perform.js","./_user-agent":"../node_modules/core-js/library/modules/_user-agent.js","./_promise-resolve":"../node_modules/core-js/library/modules/_promise-resolve.js","./_wks":"../node_modules/core-js/library/modules/_wks.js","./_redefine-all":"../node_modules/core-js/library/modules/_redefine-all.js","./_set-to-string-tag":"../node_modules/core-js/library/modules/_set-to-string-tag.js","./_set-species":"../node_modules/core-js/library/modules/_set-species.js","./_core":"../node_modules/core-js/library/modules/_core.js","./_iter-detect":"../node_modules/core-js/library/modules/_iter-detect.js"}],"../node_modules/core-js/library/modules/es7.promise.finally.js":[function(require,module,exports) {

// https://github.com/tc39/proposal-promise-finally
'use strict';
var $export = require('./_export');
var core = require('./_core');
var global = require('./_global');
var speciesConstructor = require('./_species-constructor');
var promiseResolve = require('./_promise-resolve');

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });

},{"./_export":"../node_modules/core-js/library/modules/_export.js","./_core":"../node_modules/core-js/library/modules/_core.js","./_global":"../node_modules/core-js/library/modules/_global.js","./_species-constructor":"../node_modules/core-js/library/modules/_species-constructor.js","./_promise-resolve":"../node_modules/core-js/library/modules/_promise-resolve.js"}],"../node_modules/core-js/library/modules/es7.promise.try.js":[function(require,module,exports) {
'use strict';
// https://github.com/tc39/proposal-promise-try
var $export = require('./_export');
var newPromiseCapability = require('./_new-promise-capability');
var perform = require('./_perform');

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });

},{"./_export":"../node_modules/core-js/library/modules/_export.js","./_new-promise-capability":"../node_modules/core-js/library/modules/_new-promise-capability.js","./_perform":"../node_modules/core-js/library/modules/_perform.js"}],"../node_modules/core-js/library/fn/promise.js":[function(require,module,exports) {
require('../modules/es6.object.to-string');
require('../modules/es6.string.iterator');
require('../modules/web.dom.iterable');
require('../modules/es6.promise');
require('../modules/es7.promise.finally');
require('../modules/es7.promise.try');
module.exports = require('../modules/_core').Promise;

},{"../modules/es6.object.to-string":"../node_modules/core-js/library/modules/es6.object.to-string.js","../modules/es6.string.iterator":"../node_modules/core-js/library/modules/es6.string.iterator.js","../modules/web.dom.iterable":"../node_modules/core-js/library/modules/web.dom.iterable.js","../modules/es6.promise":"../node_modules/core-js/library/modules/es6.promise.js","../modules/es7.promise.finally":"../node_modules/core-js/library/modules/es7.promise.finally.js","../modules/es7.promise.try":"../node_modules/core-js/library/modules/es7.promise.try.js","../modules/_core":"../node_modules/core-js/library/modules/_core.js"}],"../node_modules/@babel/runtime-corejs2/core-js/promise.js":[function(require,module,exports) {
module.exports = require("core-js/library/fn/promise");
},{"core-js/library/fn/promise":"../node_modules/core-js/library/fn/promise.js"}],"../node_modules/@babel/runtime-corejs2/helpers/asyncToGenerator.js":[function(require,module,exports) {
var _Promise = require("@babel/runtime-corejs2/core-js/promise");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    _Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new _Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

module.exports = _asyncToGenerator;
module.exports["default"] = module.exports, module.exports.__esModule = true;
},{"@babel/runtime-corejs2/core-js/promise":"../node_modules/@babel/runtime-corejs2/core-js/promise.js"}],"../node_modules/regenerator-runtime/runtime.js":[function(require,module,exports) {
var define;
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  typeof module === "object" ? module.exports : {}
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}

},{}],"../node_modules/@babel/runtime-corejs2/regenerator/index.js":[function(require,module,exports) {
module.exports = require("regenerator-runtime");
},{"regenerator-runtime":"../node_modules/regenerator-runtime/runtime.js"}],"../src/functions/file/file-to-base64.function.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fileToBase64 = fileToBase64;

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _promise = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/promise"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function fileToBase64(_x) {
  return _fileToBase.apply(this, arguments);
}

function _fileToBase() {
  _fileToBase = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(file) {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", new _promise.default(function (resolve, reject) {
              var fileReader = new FileReader();
              fileReader.onerror = reject;

              fileReader.onload = function () {
                return resolve(fileReader.result);
              };

              fileReader.readAsDataURL(file);
            }));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _fileToBase.apply(this, arguments);
}
},{"@babel/runtime-corejs2/helpers/asyncToGenerator":"../node_modules/@babel/runtime-corejs2/helpers/asyncToGenerator.js","@babel/runtime-corejs2/regenerator":"../node_modules/@babel/runtime-corejs2/regenerator/index.js","@babel/runtime-corejs2/core-js/promise":"../node_modules/@babel/runtime-corejs2/core-js/promise.js"}],"../src/validations/file/file.validation.ts":[function(require,module,exports) {
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

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _promise = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/promise"));

var _file = require("../../validations/file/file.validation");

var _base64ToFile = require("./base64-to-file.function");

var _fileToBase = require("./file-to-base64.function");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getSizeImage = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(file) {
    var type, image, base64;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            type = file.type.split("/");

            if (!(0, _file.isFile)(file) && typeof file === "string") {
              file = (0, _base64ToFile.base64toFile)(file, "unnamed.png");
            }

            if (!(type[0] !== "image")) {
              _context.next = 4;
              break;
            }

            throw new Error("File is not image");

          case 4:
            image = new Image();
            _context.next = 7;
            return (0, _fileToBase.fileToBase64)(file);

          case 7:
            base64 = _context.sent;
            return _context.abrupt("return", new _promise.default(function (resolve, reject) {
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
            }));

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getSizeImage(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.getSizeImage = getSizeImage;
},{"@babel/runtime-corejs2/helpers/asyncToGenerator":"../node_modules/@babel/runtime-corejs2/helpers/asyncToGenerator.js","@babel/runtime-corejs2/regenerator":"../node_modules/@babel/runtime-corejs2/regenerator/index.js","@babel/runtime-corejs2/core-js/promise":"../node_modules/@babel/runtime-corejs2/core-js/promise.js","../../validations/file/file.validation":"../src/validations/file/file.validation.ts","./base64-to-file.function":"../src/functions/file/base64-to-file.function.ts","./file-to-base64.function":"../src/functions/file/file-to-base64.function.ts"}],"../src/functions/object/sort-asc.function.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sortAsc = sortAsc;

var _getNode = require("./get-node.function");

function sortAsc(object, filter) {
  var _filter;

  var arrayFilterLabel = (_filter = filter) === null || _filter === void 0 ? void 0 : _filter.split("|");
  var pipe = arrayFilterLabel[1];
  filter = arrayFilterLabel[0];
  return object.sort(function (a, b) {
    var _filter2, _filter3;

    var node_a = (0, _getNode.getNode)(a, (_filter2 = filter) === null || _filter2 === void 0 ? void 0 : _filter2.split("."));
    var node_b = (0, _getNode.getNode)(b, (_filter3 = filter) === null || _filter3 === void 0 ? void 0 : _filter3.split("."));

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
  var _filter;

  var arrayFilterLabel = (_filter = filter) === null || _filter === void 0 ? void 0 : _filter.split("|");
  var pipe = arrayFilterLabel[1];
  filter = arrayFilterLabel[0];
  return object.sort(function (a, b) {
    var _filter2, _filter3;

    var node_a = (0, _getNode.getNode)(a, (_filter2 = filter) === null || _filter2 === void 0 ? void 0 : _filter2.split("."));
    var node_b = (0, _getNode.getNode)(b, (_filter3 = filter) === null || _filter3 === void 0 ? void 0 : _filter3.split("."));

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

var _promise = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/promise"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function sleep() {
  var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 250;
  return new _promise.default(function (resolve) {
    return setTimeout(resolve, time);
  });
}
},{"@babel/runtime-corejs2/core-js/promise":"../node_modules/@babel/runtime-corejs2/core-js/promise.js"}],"../src/functions/handle-try.function.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleTry = handleTry;

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/asyncToGenerator"));

var _regenerator = _interopRequireDefault(require("@babel/runtime-corejs2/regenerator"));

var _common = require("../validations/common/common.validation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function handleTry(_x) {
  return _handleTry.apply(this, arguments);
}

function _handleTry() {
  _handleTry = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(promise) {
    var _promise, _, _promise$toPromise, _promise2, data;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _ = (_promise = promise) === null || _promise === void 0 ? void 0 : _promise.toPromise;

            if (!(0, _common.isUndefined)(_)) {
              promise = (_promise$toPromise = (_promise2 = promise).toPromise) === null || _promise$toPromise === void 0 ? void 0 : _promise$toPromise.call(_promise2);
            }

            _context.next = 5;
            return promise;

          case 5:
            data = _context.sent;
            return _context.abrupt("return", [data, null]);

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", [null, _context.t0]);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 9]]);
  }));
  return _handleTry.apply(this, arguments);
}
},{"@babel/runtime-corejs2/helpers/asyncToGenerator":"../node_modules/@babel/runtime-corejs2/helpers/asyncToGenerator.js","@babel/runtime-corejs2/regenerator":"../node_modules/@babel/runtime-corejs2/regenerator/index.js","../validations/common/common.validation":"../src/validations/common/common.validation.ts"}],"../src/functions/pick-text-color-based-color.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pickTextColorBasedColor = pickTextColorBasedColor;

var _parseInt2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/parse-int"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @description Verifica qual é a tonalidade que a cor passada via paramentos esta mais proxima
 * @param {string} color
 * @param {string} [lightColor="#ffffff"]
 * @param {string} [darkColor="#000000"]
 * @return {number} */
function pickTextColorBasedColor(color) {
  var lightColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "#ffffff";
  var darkColor = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "#000000";
  color = color.charAt(0) === "#" ? color.substring(1, 7) : color;
  var r = (0, _parseInt2.default)(color.substring(0, 2), 16); // hexToR

  var g = (0, _parseInt2.default)(color.substring(2, 4), 16); // hexToG

  var b = (0, _parseInt2.default)(color.substring(4, 6), 16); // hexToB

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
},{"@babel/runtime-corejs2/core-js/parse-int":"../node_modules/@babel/runtime-corejs2/core-js/parse-int.js"}],"../src/regex/char-special.regex.ts":[function(require,module,exports) {
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

function isPassword(value, disabled) {
  var minLength = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 9;
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

var _parseInt = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/number/parse-int"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isRgSp(rg) {
  if (!rg) return false;
  rg = rg.replace(/\D/g, "");
  var partRg = rg.substr(0, 8).split("");
  var digitRg = Number(rg.charAt(8));
  var digitGenerated = calcDigit(partRg);
  return digitRg === digitGenerated;
}

function calcDigit(parteCPF) {
  var multi = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 9;
  var generatedDigit = 0;
  var valueTotal = 0;
  valueTotal = parteCPF.reduce(function (result, currentNumber) {
    return result + (0, _parseInt.default)(currentNumber) * multi--;
  }, 0);
  generatedDigit = valueTotal % 11;

  if (generatedDigit > 9) {
    generatedDigit = 0;
  }

  return generatedDigit;
}
},{"@babel/runtime-corejs2/core-js/number/parse-int":"../node_modules/@babel/runtime-corejs2/core-js/number/parse-int.js"}],"../src/validations/file/file.type.ts":[function(require,module,exports) {
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

var _from = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/array/from"));

var _symbol = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/symbol"));

var _iterator2 = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/symbol/iterator"));

var _isEmpty = require("../common/is-empty.validation");

var _file = require("./file.validation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof _symbol.default !== "undefined" && o[_iterator2.default] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return (0, _from.default)(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var isAllowExtensions = function isAllowExtensions(files, extensions) {
  var filesInvalid = [];
  files = files || [];

  if ((0, _file.isFile)(files)) {
    files = [files];
  }

  for (var _i = 0, _Array$from = (0, _from.default)(files); _i < _Array$from.length; _i++) {
    var file = _Array$from[_i];
    var type = [];

    if (!(0, _file.isFile)(file)) {
      filesInvalid.push({
        error: "NOT_FILE"
      });
    }

    var _iterator = _createForOfIteratorHelper(extensions),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var extension = _step.value;
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
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }

  return {
    allowedExtensions: extensions,
    valid: (0, _isEmpty.isEmpty)(filesInvalid),
    filesInvalid: filesInvalid
  };
};

exports.isAllowExtensions = isAllowExtensions;
},{"@babel/runtime-corejs2/core-js/array/from":"../node_modules/@babel/runtime-corejs2/core-js/array/from.js","@babel/runtime-corejs2/core-js/symbol":"../node_modules/@babel/runtime-corejs2/core-js/symbol.js","@babel/runtime-corejs2/core-js/symbol/iterator":"../node_modules/@babel/runtime-corejs2/core-js/symbol/iterator.js","../common/is-empty.validation":"../src/validations/common/is-empty.validation.ts","./file.validation":"../src/validations/file/file.validation.ts"}],"../src/validations/file/max-size.validation.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.maxSize = void 0;

var _from = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/array/from"));

var _file = require("./file.validation");

var _isEmpty = require("../common/is-empty.validation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var maxSize = function maxSize(files, max) {
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "KB";
  var filesInvalid = [];
  files = files || [];
  var size = _file.BIT_SIZES[type] || _file.BIT_SIZES.B;
  size = size * max;

  if ((0, _file.isFile)(files)) {
    files = [files];
  }

  for (var _i = 0, _Array$from = (0, _from.default)(files); _i < _Array$from.length; _i++) {
    var file = _Array$from[_i];

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
},{"@babel/runtime-corejs2/core-js/array/from":"../node_modules/@babel/runtime-corejs2/core-js/array/from.js","./file.validation":"../src/validations/file/file.validation.ts","../common/is-empty.validation":"../src/validations/common/is-empty.validation.ts"}],"../src/validations/file/min-size.validation.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.minSize = void 0;

var _from = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/array/from"));

var _file = require("./file.validation");

var _isEmpty = require("../common/is-empty.validation");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var minSize = function minSize(files, min) {
  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "KB";
  var filesInvalid = [];
  files = files || [];
  var size = _file.BIT_SIZES[type] || _file.BIT_SIZES.B;
  size = size * min;

  if ((0, _file.isFile)(files)) {
    files = [files];
  }

  for (var _i = 0, _Array$from = (0, _from.default)(files); _i < _Array$from.length; _i++) {
    var file = _Array$from[_i];

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
},{"@babel/runtime-corejs2/core-js/array/from":"../node_modules/@babel/runtime-corejs2/core-js/array/from.js","./file.validation":"../src/validations/file/file.validation.ts","../common/is-empty.validation":"../src/validations/common/is-empty.validation.ts"}],"../src/types/max-min.type.ts":[function(require,module,exports) {
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

var _publishSubscribe = require("./publish-subscribe/publish-subscribe");

Object.keys(_publishSubscribe).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _publishSubscribe[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _publishSubscribe[key];
    }
  });
});

var _global = require("./global/global");

Object.keys(_global).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _global[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _global[key];
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
},{"./resize/resize":"../src/resize/resize.ts","./resize/resize.type":"../src/resize/resize.type.ts","./keyboard-shortcut/keyboard-shortcut":"../src/keyboard-shortcut/keyboard-shortcut.ts","./keyboard-shortcut/keyboard-shortcut.type":"../src/keyboard-shortcut/keyboard-shortcut.type.ts","./undo-redo-stack/undo-redo-stack":"../src/undo-redo-stack/undo-redo-stack.ts","./undo-redo-stack/undo-redo-stack.type":"../src/undo-redo-stack/undo-redo-stack.type.ts","./publish-subscribe/publish-subscribe":"../src/publish-subscribe/publish-subscribe.ts","./global/global":"../src/global/global.ts","./calc/calc":"../src/calc/calc.ts","./calc/math.calc":"../src/calc/math.calc.ts","./calc/calc.type":"../src/calc/calc.type.ts","./constant/input-mode.constant":"../src/constant/input-mode.constant.ts","./constant/input.constant":"../src/constant/input.constant.ts","./constant/mask.constant":"../src/constant/mask.constant.ts","./debounce/debounce":"../src/debounce/debounce.ts","./debounce/debounce.type":"../src/debounce/debounce.type.ts","./masked/masked":"../src/masked/masked.ts","./masked/masked.type":"../src/masked/masked.type.ts","./masked/imask/mask-imask":"../src/masked/imask/mask-imask.ts","./masked/vanilla-masker/vanilla-masker":"../src/masked/vanilla-masker/vanilla-masker.ts","./theme/theme":"../src/theme/theme.ts","./theme/theme.type":"../src/theme/theme.type.ts","./functions/file/base64-to-file.function":"../src/functions/file/base64-to-file.function.ts","./functions/file/file-to-base64.function":"../src/functions/file/file-to-base64.function.ts","./functions/file/get-size-image.function":"../src/functions/file/get-size-image.function.ts","./functions/object/get-node.function":"../src/functions/object/get-node.function.ts","./functions/object/extends.function":"../src/functions/object/extends.function.ts","./functions/object/sort-asc.function":"../src/functions/object/sort-asc.function.ts","./functions/object/sort-desc.function":"../src/functions/object/sort-desc.function.ts","./functions/sleep.function":"../src/functions/sleep.function.ts","./functions/handle-try.function":"../src/functions/handle-try.function.ts","./functions/theme-system.function":"../src/functions/theme-system.function.ts","./functions/parse-number.function":"../src/functions/parse-number.function.ts","./functions/remove-accents.function":"../src/functions/remove-accents.function.ts","./functions/stack-callback.function":"../src/functions/stack-callback.function.ts","./functions/pick-text-color-based-color":"../src/functions/pick-text-color-based-color.ts","./regex/char-special.regex":"../src/regex/char-special.regex.ts","./regex/cnpj.regex":"../src/regex/cnpj.regex.ts","./regex/cpf-cnpj.regex":"../src/regex/cpf-cnpj.regex.ts","./regex/cpf.regex":"../src/regex/cpf.regex.ts","./regex/email.regex":"../src/regex/email.regex.ts","./regex/number.regex":"../src/regex/number.regex.ts","./regex/phone-br.regex":"../src/regex/phone-br.regex.ts","./regex/time.regex":"../src/regex/time.regex.ts","./regex/upper-case.regex":"../src/regex/upper-case.regex.ts","./regex/url.regex":"../src/regex/url.regex.ts","./validations/common/common.validation":"../src/validations/common/common.validation.ts","./validations/common/common.type":"../src/validations/common/common.type.ts","./functions/contains.function":"../src/functions/contains.function.ts","./validations/common/is-cnpj.validation":"../src/validations/common/is-cnpj.validation.ts","./validations/common/is-cpf.validation":"../src/validations/common/is-cpf.validation.ts","./validations/common/is-empty.validation":"../src/validations/common/is-empty.validation.ts","./validations/common/is-password.validation":"../src/validations/common/is-password.validation.ts","./validations/common/is-rg-sp.validation":"../src/validations/common/is-rg-sp.validation.ts","./validations/file/file.validation":"../src/validations/file/file.validation.ts","./validations/file/file.type":"../src/validations/file/file.type.ts","./validations/file/is-allow-extension.validation":"../src/validations/file/is-allow-extension.validation.ts","./validations/file/max-size.validation":"../src/validations/file/max-size.validation.ts","./validations/file/min-size.validation":"../src/validations/file/min-size.validation.ts","./validations/number.validation":"../src/validations/number.validation.ts","./types/max-min.type":"../src/types/max-min.type.ts","./types/range.type":"../src/types/range.type.ts"}],"main.ts":[function(require,module,exports) {
"use strict";

var _utils = require("./../src/utils");

(0, _utils.keyboardShortcut)("meta.z", {
  listener: console.log
});
(0, _utils.onEvent)("ewdwa").subscribe(console.log);
(0, _utils.publish)("ewdwa", {
  wad: "dwa"
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64240" + '/');

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