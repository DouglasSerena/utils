(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.utils = {}));
}(this, (function (exports) { 'use strict';

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

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __spreadArray(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
            to[j] = from[i];
        return to;
    }

    function base64toFile(base64, filename) {
        var _a, _b;
        var array = base64 === null || base64 === void 0 ? void 0 : base64.split(",");
        var mime = (_b = (_a = array[0]) === null || _a === void 0 ? void 0 : _a.match(/:(.*?);/)) === null || _b === void 0 ? void 0 : _b[1];
        var _atob = atob(array[1]);
        var length = _atob.length;
        var uint8array = new Uint8Array(length);
        while (length--) {
            uint8array[length] = _atob.charCodeAt(length);
        }
        return new File([uint8array], filename, { type: mime });
    }

    function fileToBase64(file) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var fileReader = new FileReader();
                        fileReader.onerror = reject;
                        fileReader.onload = function () { return resolve(fileReader.result); };
                        fileReader.readAsDataURL(file);
                    })];
            });
        });
    }

    function isCnpj(cnpj) {
        cnpj = cnpj.replace(/\D/g, "");
        var cpfInvalid = __spreadArray(__spreadArray(__spreadArray([], ["00000000000000", "11111111111111", "22222222222222", "33333333333333"]), ["44444444444444", "55555555555555", "66666666666666", "77777777777777"]), ["88888888888888", "99999999999999"]);
        if (cpfInvalid.includes(cnpj) || cnpj.length !== 14) {
            return false;
        }
        var initPart = cnpj.substr(0, 12).split("");
        var firstDigit = Number.parseInt(cnpj.charAt(12));
        var firstDigitGenerated = calcDigit$2(initPart, 5);
        if (firstDigit !== firstDigitGenerated) {
            return false;
        }
        var secondaryPart = cnpj.substr(0, 13).split("");
        var secondaryDigit = Number.parseInt(cnpj.charAt(13));
        var secondaryDigitGenerated = calcDigit$2(secondaryPart, 6);
        if (secondaryDigit !== secondaryDigitGenerated) {
            return false;
        }
        return true;
    }
    function calcDigit$2(parteCNPJ, multi) {
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
        }
        else {
            generatedDigit = 11 - (valueTotal % 11);
        }
        return generatedDigit;
    }

    function isCpf(cpf) {
        cpf = cpf.replace(/\D/g, "");
        var cpfInvalid = __spreadArray(__spreadArray(__spreadArray([], ["00000000000", "11111111111", "22222222222", "33333333333"]), ["44444444444", "55555555555", "66666666666", "77777777777"]), ["88888888888", "99999999999"]);
        if (cpfInvalid.includes(cpf) || cpf.length !== 11) {
            return false;
        }
        var initPart = cpf.substr(0, 9).split("");
        var firstDigit = Number.parseInt(cpf.charAt(9));
        var firstDigitGenerated = calcDigit$1(initPart, 10);
        if (firstDigit !== firstDigitGenerated) {
            return false;
        }
        var secondaryPart = cpf.substr(0, 10).split("");
        var secondaryDigit = Number.parseInt(cpf.charAt(10));
        var secondaryDigitGenerated = calcDigit$1(secondaryPart, 11);
        if (secondaryDigit !== secondaryDigitGenerated) {
            return false;
        }
        return true;
    }
    function calcDigit$1(parteCPF, multi) {
        var generatedDigit = 0;
        var valueTotal = 0;
        valueTotal = parteCPF.reduce(function (result, currentNumber) {
            return result + Number.parseInt(currentNumber) * multi--;
        }, 0);
        generatedDigit = 11 - (valueTotal % 11);
        if (generatedDigit > 9) {
            generatedDigit = 0;
        }
        return generatedDigit;
    }

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

    var isEqual = function (value, compare) { return value === compare; };
    var isDifferent = function (value, compare) { return value !== compare; };
    var isEqualNotStrict = function (value, compare) { return value == compare; };
    var isDifferentNotStrict = function (value, compare) { return value != compare; };
    var isFill = function (item) { return !isEmpty(item); };
    var isInstanceOf = function (value, instance) { return value instanceof instance; };
    var notIsInstanceOf = function (value, instance) { return !isInstanceOf(value, instance); };
    var isString = function (value) { return typeof value === "string"; };
    var isNull = function (value) { return value === null; };
    var isUndefined = function (value) { return typeof value === "undefined"; };
    var isCpfOrCnpj = function (value) {
        value = value.replace(/\D/g, "");
        return value.length <= 11 ? isCpf(value) : isCnpj(value);
    };

    var BIT_SIZES = {
        B: 1,
        KB: 1024,
        MB: 1048576,
        GB: 1073741824,
        TB: 1099511627776,
    };
    var RESOLUTION_WIDTH = {
        HD: 1280,
        HD_MORE: 1366,
        FULL_HD: 1920,
        QUAD_HD: 2560,
        UHD: 3840,
    };
    var RESOLUTION_HEIGHT = {
        HD: 720,
        HD_MORE: 768,
        FULL_HD: 1080,
        QUAD_HD: 1440,
        UHD: 2160,
    };
    var isFile = function (file) { return isInstanceOf(file, File); };

    var getSizeImage = function (file) { return __awaiter(void 0, void 0, void 0, function () {
        var type, image, base64;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    type = file.type.split("/");
                    if (!isFile(file)) {
                        throw new Error("file is not instance of File");
                    }
                    if (isDifferent(type[0], "image")) {
                        throw new Error("File is not image");
                    }
                    image = new Image();
                    return [4 /*yield*/, fileToBase64(file)];
                case 1:
                    base64 = _a.sent();
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            image.onerror = function (error) {
                                reject(error);
                            };
                            image.onload = function () {
                                resolve({
                                    height: image.height,
                                    width: image.width,
                                });
                            };
                            image.src = base64;
                        })];
            }
        });
    }); };

    function getNode(object, keys) {
        if (typeof keys === "string") {
            keys = keys === null || keys === void 0 ? void 0 : keys.split(".");
        }
        keys = keys === null || keys === void 0 ? void 0 : keys.filter(function (key) { return key; });
        if ((keys === null || keys === void 0 ? void 0 : keys.length) === 0) {
            return object;
        }
        var key = keys[0];
        keys === null || keys === void 0 ? void 0 : keys.shift();
        if ((keys === null || keys === void 0 ? void 0 : keys.length) === 0) {
            return object === null || object === void 0 ? void 0 : object[key];
        }
        else {
            return getNode(object === null || object === void 0 ? void 0 : object[key], keys);
        }
    }

    function mergeObject(objectMerge) {
        var objects = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            objects[_i - 1] = arguments[_i];
        }
        if (!isEmpty(objects)) {
            objects.forEach(function (object) {
                if (!isEmpty(object)) {
                    merge(objectMerge, object);
                }
            });
        }
        return objectMerge;
    }
    function merge(objectMerge, object) {
        return Object.keys(object).reduce(function (prev, key) {
            var _a;
            if (((_a = object[key]) === null || _a === void 0 ? void 0 : _a.constructor) === Object) {
                prev[key] = merge(objectMerge[key], object[key]);
            }
            else {
                prev[key] = object[key];
            }
            return prev;
        }, objectMerge || {});
    }

    function sortAsc(object, filter) {
        var arrayFilterLabel = filter === null || filter === void 0 ? void 0 : filter.split("|");
        arrayFilterLabel[1];
        filter = arrayFilterLabel[0];
        return object.sort(function (a, b) {
            var node_a = getNode(a, filter === null || filter === void 0 ? void 0 : filter.split("."));
            var node_b = getNode(b, filter === null || filter === void 0 ? void 0 : filter.split("."));
            if (typeof node_a === "number" && typeof node_b === "number") {
                return node_a - node_b;
            }
            else if (typeof node_a === "string") {
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

    function sortDesc(object, filter) {
        var arrayFilterLabel = filter === null || filter === void 0 ? void 0 : filter.split("|");
        arrayFilterLabel[1];
        filter = arrayFilterLabel[0];
        return object.sort(function (a, b) {
            var node_a = getNode(a, filter === null || filter === void 0 ? void 0 : filter.split("."));
            var node_b = getNode(b, filter === null || filter === void 0 ? void 0 : filter.split("."));
            if (typeof node_a === "number" && typeof node_b === "number") {
                var result = node_a - node_b;
                return result > 0 ? -1 : result == 0 ? 0 : 1;
            }
            else if (typeof node_a === "string") {
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
            Ç: "C",
        };
        return work === null || work === void 0 ? void 0 : work.replace(/[\W\[\] ]/g, function (char) { return accents[char] || char; });
    }

    function contains(work, compare, options) {
        options = Object.assign({}, {
            removeSpace: true,
            removeAccents: true,
            caseSensitive: false,
        }, options);
        if (options === null || options === void 0 ? void 0 : options.removeAccents) {
            work = removeAccents(work);
            if (typeof compare === "string") {
                compare = removeAccents(compare);
            }
        }
        if (!(options === null || options === void 0 ? void 0 : options.caseSensitive)) {
            work = work.toLowerCase();
            if (typeof compare === "string") {
                compare = compare.toLowerCase();
            }
        }
        if (options === null || options === void 0 ? void 0 : options.removeSpace) {
            work = work.replace(/ +/g, "");
            if (typeof compare === "string") {
                compare = compare.replace(/ +/g, "");
            }
        }
        return (work === null || work === void 0 ? void 0 : work.match(compare)) !== null;
    }

    function handleTry(promise) {
        return __awaiter(this, void 0, void 0, function () {
            var _, data, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        _ = promise.toPromise();
                        if (!isUndefined(_)) {
                            promise = promise.toPromise();
                        }
                        return [4 /*yield*/, promise];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, [data, null]];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, [null, error_1]];
                    case 3: return [2 /*return*/];
                }
            });
        });
    }

    var isEqualNumber = function (value, compare) { return value === compare; };
    var isDifferentNumber = function (value, compare) { return value !== compare; };
    var isNumeric = function (value) { return !isNaN(parseInt(value)) && isFinite(value); };
    var isNumber = function (value) {
        return !isNaN(parseInt(value)) && isFinite(value) && typeof value === "number";
    };
    var isFloat = function (value) { return isNumeric(value) && !Number.isInteger(value); };
    var isMore = function (value, compare) { return value > compare; };
    var isMoreOrEqual = function (value, compare) { return value >= compare; };
    var isLess = function (value, compare) { return value < compare; };
    var isLessOrEqual = function (value, compare) { return value <= compare; };
    var isBeforeNumber = function (value, range) {
        value = Number.parseInt(value.toString());
        return value >= (range.start || 0) && value <= range.end;
    };

    var parseNumberOptions = {
        decimal: ",",
        thousands: ".",
        error: false,
    };
    function parseNumber(value, options) {
        options = Object.assign({}, parseNumberOptions, options);
        if (!isNumeric(value) && isString(value)) {
            var decimalStr = new RegExp("\\" + (options === null || options === void 0 ? void 0 : options.decimal), "g");
            var thousandsStr = new RegExp("\\" + (options === null || options === void 0 ? void 0 : options.thousands), "g");
            value = value.toString().replace(thousandsStr, "").replace(decimalStr, ".");
            value = Number(value) || 0;
        }
        else {
            if (options === null || options === void 0 ? void 0 : options.error)
                ;
        }
        return Number(value);
    }

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    var relativeTime$1 = createCommonjsModule(function (module, exports) {
    !function(r,e){module.exports=e();}(commonjsGlobal,(function(){return function(r,e,t){r=r||{};var n=e.prototype,o={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"};function i(r,e,t,o){return n.fromToBase(r,e,t,o)}t.en.relativeTime=o,n.fromToBase=function(e,n,i,d,u){for(var f,a,s,l=i.$locale().relativeTime||o,h=r.thresholds||[{l:"s",r:44,d:"second"},{l:"m",r:89},{l:"mm",r:44,d:"minute"},{l:"h",r:89},{l:"hh",r:21,d:"hour"},{l:"d",r:35},{l:"dd",r:25,d:"day"},{l:"M",r:45},{l:"MM",r:10,d:"month"},{l:"y",r:17},{l:"yy",d:"year"}],m=h.length,c=0;c<m;c+=1){var y=h[c];y.d&&(f=d?t(e).diff(i,y.d,!0):i.diff(e,y.d,!0));var p=(r.rounding||Math.round)(Math.abs(f));if(s=f>0,p<=y.r||!y.r){p<=1&&c>0&&(y=h[c-1]);var v=l[y.l];u&&(p=u(""+p)),a="string"==typeof v?v.replace("%d",p):v(p,n,y.l,s);break}}if(n)return a;var M=s?l.future:l.past;return "function"==typeof M?M(a):M.replace("%s",a)},n.to=function(r,e){return i(r,e,this,!0)},n.from=function(r,e){return i(r,e,this)};var d=function(r){return r.$u?t.utc():t()};n.toNow=function(r){return this.to(d(this),r)},n.fromNow=function(r){return this.from(d(this),r)};}}));
    });

    var dayjs_min = createCommonjsModule(function (module, exports) {
    !function(t,e){module.exports=e();}(commonjsGlobal,(function(){var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",f="month",h="quarter",c="year",d="date",$="Invalid Date",l=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},m=function(t,e,n){var r=String(t);return !r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},g={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return (e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return -t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,f),s=n-i<0,u=e.clone().add(r+(s?-1:1),f);return +(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return {M:f,y:c,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:h}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},D="en",v={};v[D]=M;var p=function(t){return t instanceof _},S=function(t,e,n){var r;if(!t)return D;if("string"==typeof t)v[t]&&(r=t),e&&(v[t]=e,r=t);else {var i=t.name;v[i]=t,r=i;}return !n&&r&&(D=r),r||!n&&D},w=function(t,e){if(p(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},O=g;O.l=S,O.i=p,O.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function M(t){this.$L=S(t.locale,null,!0),this.parse(t);}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(O.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(l);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init();},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds();},m.$utils=function(){return O},m.isValid=function(){return !(this.$d.toString()===$)},m.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return w(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<w(t)},m.$g=function(t,e,n){return O.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!O.u(e)||e,h=O.p(t),$=function(t,e){var i=O.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},l=function(t,e){return O.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,g="set"+(this.$u?"UTC":"");switch(h){case c:return r?$(1,0):$(31,11);case f:return r?$(1,M):$(0,M+1);case o:var D=this.$locale().weekStart||0,v=(y<D?y+7:y)-D;return $(r?m-v:m+(6-v),M);case a:case d:return l(g+"Hours",0);case u:return l(g+"Minutes",1);case s:return l(g+"Seconds",2);case i:return l(g+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var n,o=O.p(t),h="set"+(this.$u?"UTC":""),$=(n={},n[a]=h+"Date",n[d]=h+"Date",n[f]=h+"Month",n[c]=h+"FullYear",n[u]=h+"Hours",n[s]=h+"Minutes",n[i]=h+"Seconds",n[r]=h+"Milliseconds",n)[o],l=o===a?this.$D+(e-this.$W):e;if(o===f||o===c){var y=this.clone().set(d,1);y.$d[$](l),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d;}else $&&this.$d[$](l);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[O.p(t)]()},m.add=function(r,h){var d,$=this;r=Number(r);var l=O.p(h),y=function(t){var e=w($);return O.w(e.date(e.date()+Math.round(t*r)),$)};if(l===f)return this.set(f,this.$M+r);if(l===c)return this.set(c,this.$y+r);if(l===a)return y(1);if(l===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[l]||1,m=this.$d.getTime()+r*M;return O.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||$;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=O.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,f=n.months,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].substr(0,s)},c=function(t){return O.s(s%12||12,t,"0")},d=n.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:O.s(a+1,2,"0"),MMM:h(n.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:O.s(this.$D,2,"0"),d:String(this.$W),dd:h(n.weekdaysMin,this.$W,o,2),ddd:h(n.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:O.s(s,2,"0"),h:c(1),hh:c(2),a:d(s,u,!0),A:d(s,u,!1),m:String(u),mm:O.s(u,2,"0"),s:String(this.$s),ss:O.s(this.$s,2,"0"),SSS:O.s(this.$ms,3,"0"),Z:i};return r.replace(y,(function(t,e){return e||l[t]||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,$){var l,y=O.p(d),M=w(r),m=(M.utcOffset()-this.utcOffset())*e,g=this-M,D=O.m(this,M);return D=(l={},l[c]=D/12,l[f]=D,l[h]=D/3,l[o]=(g-m)/6048e5,l[a]=(g-m)/864e5,l[u]=g/n,l[s]=g/e,l[i]=g/t,l)[y]||g,$?D:O.a(D)},m.daysInMonth=function(){return this.endOf(f).$D},m.$locale=function(){return v[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=S(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return O.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),b=_.prototype;return w.prototype=b,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",f],["$y",c],["$D",d]].forEach((function(t){b[t[1]]=function(e){return this.$g(e,t[0],t[1])};})),w.extend=function(t,e){return t.$i||(t(e,_,w),t.$i=!0),w},w.locale=S,w.isDayjs=p,w.unix=function(t){return w(1e3*t)},w.en=v[D],w.Ls=v,w.p={},w}));
    });

    dayjs_min.extend(relativeTime$1);
    function relativeTime(value, time) {
        if (time === void 0) { time = "future"; }
        value = dayjs_min(value);
        if (time === "future") {
            return dayjs_min(Date.now()).to(value);
        }
        return dayjs_min(value).to(Date.now());
    }

    var REGEX_TIME = /^([0-1][0-9]|[2][0-3]):([0-5][0-9])(:([0-5][0-9]))?$/g;

    function timeToDate(time) {
        if (time) {
            var validTime = time.match(REGEX_TIME) !== null;
            return validTime
                ? dayjs_min().format("YYYY-MM-DDT" + time + "Z")
                : dayjs_min().format("YYYY-MM-DDTHH:mm:ssZ");
        }
        return time;
    }

    var convertValues = function (value, twoValue) {
        value = parseNumber(value);
        twoValue = parseNumber(twoValue);
        return [value, twoValue];
    };
    var add = function (value, twoValue) {
        var _a = convertValues(value, twoValue), one = _a[0], two = _a[1];
        return one + two;
    };
    var subtract = function (value, twoValue) {
        var _a = convertValues(value, twoValue), one = _a[0], two = _a[1];
        return one - two;
    };
    var multiply = function (value, twoValue) {
        var _a = convertValues(value, twoValue), one = _a[0], two = _a[1];
        return one * two;
    };
    var divide = function (value, twoValue) {
        var _a = convertValues(value, twoValue), one = _a[0], two = _a[1];
        return one / two;
    };
    var increment = function (value, increment) {
        var _a = convertValues(value, increment), _value = _a[0], _increment = _a[1];
        return _increment > 0 ? Math.round(_value / _increment) * _increment : _value;
    };
    var distribute = function (value, number) {
        var _a = convertValues(value, number), _valueInit = _a[0], _number = _a[1];
        var array = [];
        var index = _number;
        var _value = divide(_valueInit, number);
        for (; index > 0; index--) {
            if (index === 1) {
                array.push(subtract(_valueInit, multiply(_value, _number - 1)));
            }
            else {
                array.push(_value);
            }
        }
        return array;
    };

    var REGEX_CHAR_SPECIAL = /(\W)/g;

    var REGEX_CNPJ = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;

    var REGEX_CPF_CNPJ = /(^\d{3}\.\d{3}\.\d{3}-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$)/;

    var REGEX_CPF = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

    var REGEX_EMAIL = /^[-\w.%+]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    var REGEX_NUMBER = /(\d)/g;

    var REGEX_PHONE_BR = /^((\()?(\d{2})?(\))?( )?(9)?( )?\d{4}(-)?\d{4})$/;

    var REGEX_UPPER_CASE = /([A-Z])/g;

    var REGEX_URL = /^((((http[s]?):\/{2})?)+(([0-9a-z_-]+\.)+([a-z]{2,3}))(:[0-9]+)?((\/([~0-9a-zA-Z\#\+\%@\.\/_-]+))?(\?[0-9a-zA-Z\+\%@\/&\[\];=_-]+)?)?)/;

    function isPassword(value, disabled, minLength) {
        if (minLength === void 0) { minLength = 9; }
        var resultUpperCase = (disabled === null || disabled === void 0 ? void 0 : disabled.charUpperCase) || contains(value, REGEX_UPPER_CASE, { caseSensitive: true });
        var resultMinLength = (value === null || value === void 0 ? void 0 : value.length) >= minLength;
        var resultCharSpecial = (disabled === null || disabled === void 0 ? void 0 : disabled.charSpecial) || contains(value, REGEX_CHAR_SPECIAL);
        var resultNumber = (disabled === null || disabled === void 0 ? void 0 : disabled.number) || contains(value, REGEX_NUMBER);
        return resultUpperCase && resultMinLength && resultCharSpecial && resultNumber;
    }

    function isRgSp(rg) {
        rg = rg.replace(/\D/g, "");
        var partRg = rg.substr(0, 8).split("");
        var digitRg = Number(rg.charAt(8));
        var digitGenerated = calcDigit(partRg);
        return digitRg === digitGenerated;
    }
    function calcDigit(parteCPF, multi) {
        if (multi === void 0) { multi = 9; }
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

    var isAllowExtensions = function (files, extensions) {
        var filesInvalid = [];
        files = files || [];
        if (isInstanceOf(files, File)) {
            files = [files];
        }
        for (var _i = 0, _a = Array.from(files); _i < _a.length; _i++) {
            var file = _a[_i];
            var type = [];
            if (notIsInstanceOf(file, File)) {
                filesInvalid.push({ error: "NOT_FILE" });
            }
            for (var _b = 0, extensions_1 = extensions; _b < extensions_1.length; _b++) {
                var extension = extensions_1[_b];
                type = file.name.split(".");
                if (isLess(type.length, 2)) {
                    filesInvalid.push({
                        filename: file.name,
                        mimeType: file.type,
                        error: "WITHOUT_EXTENSION",
                    });
                }
                if (isDifferent(extension, type[type.length - 1])) {
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
            valid: isEmpty(filesInvalid),
            filesInvalid: filesInvalid,
        };
    };

    var maxSize = function (files, max, type) {
        if (type === void 0) { type = "KB"; }
        var filesInvalid = [];
        files = files || [];
        var size = BIT_SIZES[type] || BIT_SIZES.B;
        size = size * max;
        if (isInstanceOf(files, File)) {
            files = [files];
        }
        for (var _i = 0, _a = Array.from(files); _i < _a.length; _i++) {
            var file = _a[_i];
            if (!isFile(file)) {
                filesInvalid.push({ error: "NOT_FILE" });
            }
            if (isMore(file.size, size)) {
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
            valid: isEmpty(filesInvalid),
            filesInvalid: filesInvalid,
        };
    };

    var minSize = function (files, min, type) {
        if (type === void 0) { type = "KB"; }
        var filesInvalid = [];
        files = files || [];
        var size = BIT_SIZES[type] || BIT_SIZES.B;
        size = size * min;
        if (isInstanceOf(files, File)) {
            files = [files];
        }
        for (var _i = 0, _a = Array.from(files); _i < _a.length; _i++) {
            var file = _a[_i];
            if (!isFile(file)) {
                filesInvalid.push({ error: "NOT_FILE" });
            }
            if (isLess(file.size, size)) {
                filesInvalid.push({
                    filename: file.name,
                    fileSizeInBytes: file.size,
                    mimeType: file.type,
                    error: "SIZE",
                });
            }
        }
        return {
            minSize: size,
            typeDefined: type,
            valid: isEmpty(filesInvalid),
            filesInvalid: filesInvalid,
        };
    };

    var isBetween = createCommonjsModule(function (module, exports) {
    !function(e,i){module.exports=i();}(commonjsGlobal,(function(){return function(e,i,t){i.prototype.isBetween=function(e,i,s,f){var n=t(e),o=t(i),r="("===(f=f||"()")[0],u=")"===f[1];return (r?this.isAfter(n,s):!this.isBefore(n,s))&&(u?this.isBefore(o,s):!this.isAfter(o,s))||(r?this.isBefore(n,s):!this.isAfter(n,s))&&(u?this.isAfter(o,s):!this.isBefore(o,s))};}}));
    });

    var isSameOrAfter = createCommonjsModule(function (module, exports) {
    !function(e,t){module.exports=t();}(commonjsGlobal,(function(){return function(e,t){t.prototype.isSameOrAfter=function(e,t){return this.isSame(e,t)||this.isAfter(e,t)};}}));
    });

    var isSameOrBefore = createCommonjsModule(function (module, exports) {
    !function(e,i){module.exports=i();}(commonjsGlobal,(function(){return function(e,i){i.prototype.isSameOrBefore=function(e,i){return this.isSame(e,i)||this.isBefore(e,i)};}}));
    });

    dayjs_min.extend(isBetween);
    dayjs_min.extend(isSameOrAfter);
    dayjs_min.extend(isSameOrBefore);
    var isDate = function (value) { return dayjs_min(value).isValid(); };
    var isAfterDate = function (date, dataAfter, options) {
        return dayjs_min(date).isAfter(dayjs_min(dataAfter), options);
    };
    var isBeforeDate = function (date, dataBefore, options) {
        return dayjs_min(date).isBefore(dayjs_min(dataBefore), options);
    };
    var isBetweenDate = function (date, range, options, d) {
        return dayjs_min(date).isBetween(dayjs_min((range === null || range === void 0 ? void 0 : range.start) || new Date()), dayjs_min((range === null || range === void 0 ? void 0 : range.end) || new Date()), options, d);
    };
    var isBirthDateValidation = function (birchDay, year) {
        var _a, _b, _c;
        if (!(year === null || year === void 0 ? void 0 : year.max)) {
            year.min = Number.parseInt((_a = year === null || year === void 0 ? void 0 : year.min) === null || _a === void 0 ? void 0 : _a.toString());
            return dayjs_min(birchDay).isSameOrBefore(dayjs_min().subtract(year.min, "years"));
        }
        year.max = Number.parseInt((_b = year === null || year === void 0 ? void 0 : year.max) === null || _b === void 0 ? void 0 : _b.toString());
        year.min = Number.parseInt((_c = year === null || year === void 0 ? void 0 : year.min) === null || _c === void 0 ? void 0 : _c.toString());
        return (dayjs_min(birchDay).isSameOrAfter(dayjs_min().subtract(year.max, "years")) &&
            dayjs_min(birchDay).isSameOrBefore(dayjs_min().subtract(year.min || 0, "years")));
    };
    var isEqualDate = function (date, dateDifferent, options) { return dayjs_min(date).isSame(dayjs_min(dateDifferent), options); };
    var isDifferentDate = function (date, dateDifferent, options) { return !isEqualDate(date, dateDifferent, options); };

    function validate(value) {
        return new Validate(value);
    }
    var Validate = /** @class */ (function () {
        function Validate(value) {
            var _this = this;
            this.value = value;
            // COMMON
            this.isEqual = function (compare) { return isEqual(_this.value, compare); };
            this.isDifferent = function (compare) { return isDifferent(_this.value, compare); };
            this.isEqualNotStrict = function (compare) { return isEqualNotStrict(_this.value, compare); };
            this.isDifferentNotStrict = function (compare) {
                return isDifferentNotStrict(_this.value, compare);
            };
            this.isFill = function () { return !isEmpty(_this.value); };
            this.isEmpty = function () { return isEmpty(_this.value); };
            this.isInstanceOf = function (instance) { return isInstanceOf(_this.value, instance); };
            this.notIsInstanceOf = function (instance) { return notIsInstanceOf(_this.value, instance); };
            this.isString = function () { return isString(_this.value); };
            this.isNull = function () { return isNull(_this.value); };
            this.isUndefined = function () { return isUndefined(_this.value); };
            this.isCnpj = function () { return isCnpj(_this.value); };
            this.isCpf = function () { return isCpf(_this.value); };
            this.isCpfOrCnpj = function () { return isCpfOrCnpj(_this.value); };
            // VALIDATION FILE
            this.isFile = function () { return isFile(_this.value); };
            this.maxHeightFile = function (max) { return __awaiter(_this, void 0, void 0, function () { var _a; return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = isMore;
                        return [4 /*yield*/, getSizeImage(this.value)];
                    case 1: return [2 /*return*/, _a.apply(void 0, [(_b.sent()).height, max])];
                }
            }); }); };
            this.minHeightFile = function (min) { return __awaiter(_this, void 0, void 0, function () { var _a; return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = isLess;
                        return [4 /*yield*/, getSizeImage(this.value)];
                    case 1: return [2 /*return*/, _a.apply(void 0, [(_b.sent()).height, min])];
                }
            }); }); };
            this.maxWidthFile = function (max) { return __awaiter(_this, void 0, void 0, function () { var _a; return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = isMore;
                        return [4 /*yield*/, getSizeImage(this.value)];
                    case 1: return [2 /*return*/, _a.apply(void 0, [(_b.sent()).width, max])];
                }
            }); }); };
            this.minWidthFile = function (min) { return __awaiter(_this, void 0, void 0, function () { var _a; return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = isLess;
                        return [4 /*yield*/, getSizeImage(this.value)];
                    case 1: return [2 /*return*/, _a.apply(void 0, [(_b.sent()).width, min])];
                }
            }); }); };
            this.maxSizeFile = function (max, type) {
                return maxSize(_this.value, max, type).valid;
            };
            this.minSizeFile = function (min, type) {
                return minSize(_this.value, min, type).valid;
            };
            this.isAllowExtensionsFile = function (extensions) {
                return isAllowExtensions(_this.value, extensions).valid;
            };
            // VALIDATIONS NUMBER
            this.isNumeric = function () { return isNumeric(_this.value); };
            this.isNumber = function () { return isNumber(_this.value); };
            this.isFloat = function () { return isFloat(_this.value); };
            this.isEqualNumber = function (compare) { return isEqualNumber(_this.value, compare); };
            this.isDifferentNumber = function (compare) { return isDifferentNumber(_this.value, compare); };
            this.isBeforeNumber = function (range) { return isBeforeNumber(_this.value, range); };
            this.isLessOrEqual = function (value) { return isLessOrEqual(_this.value, value); };
            this.isLess = function (value) { return isLess(_this.value, value); };
            this.isMore = function (value) { return isMore(_this.value, value); };
            this.isMoreOrEqual = function (value) { return isMoreOrEqual(_this.value, value); };
            // VALIDATION DATE
            this.isDate = function () { return isDate(_this.value); };
            this.isAfterDate = function (date, options) {
                return isAfterDate(_this.value, date, options);
            };
            this.isBeforeDate = function (date, options) {
                return isBeforeDate(_this.value, date, options);
            };
            this.isBetweenDate = function (range, options, d) { return isBetweenDate(_this.value, range, options, d); };
            this.isBirthDateValidation = function (year) {
                return isBirthDateValidation(_this.value, year);
            };
            this.isEqualDate = function (date, options) {
                return isEqualDate(_this.value, date, options);
            };
            this.isDifferentDate = function (date, options) {
                return isDifferentDate(_this.value, date, options);
            };
        }
        return Validate;
    }());

    var calcOptions = __assign(__assign({}, parseNumberOptions), { precision: 2, increment: 0, round: "round" });

    function calc(value, settings) {
        return new Calc(value, settings);
    }
    var Calc = /** @class */ (function () {
        function Calc(value, settings) {
            var _a;
            this.settings = Object.assign({}, this.settings, calcOptions, settings);
            this.precision = Math.pow(10, (_a = this.settings) === null || _a === void 0 ? void 0 : _a.precision);
            this.save(value);
        }
        Calc.prototype.parse = function (value) {
            if (isInstanceOf(value, Calc)) {
                value = value.valueRaw;
            }
            else {
                value = parseNumber(value, this.settings);
            }
            return value;
        };
        Calc.prototype.save = function (value) {
            if (isInstanceOf(value, Calc)) {
                this.valueRaw = value.valueRaw;
            }
            else {
                this.valueRaw = parseNumber(value, this.settings);
            }
            this.value = this.roundingNumber(this.valueRaw);
        };
        Calc.prototype.roundingNumber = function (value) {
            value = Number(value) * this.precision;
            value = Number(value.toFixed(4));
            var mathRound = Math[this.settings.round];
            value = mathRound(value) / this.precision;
            if (this.settings.increment) {
                value = increment(value, this.settings.increment) * this.precision;
                value = mathRound(value) / this.precision;
            }
            return value;
        };
        Calc.prototype.add = function (value) {
            this.valueRaw = add(this.valueRaw, this.parse(value));
            this.value = this.roundingNumber(this.valueRaw);
            return this;
        };
        Calc.prototype.subtract = function (value) {
            this.valueRaw = subtract(this.valueRaw, this.parse(value));
            this.value = this.roundingNumber(this.valueRaw);
            return this;
        };
        Calc.prototype.multiply = function (value) {
            this.valueRaw = multiply(this.valueRaw, this.parse(value));
            this.value = this.roundingNumber(this.valueRaw);
            return this;
        };
        Calc.prototype.divide = function (value) {
            this.valueRaw = divide(this.valueRaw, this.parse(value));
            this.value = this.roundingNumber(this.valueRaw);
            return this;
        };
        Calc.prototype.distribute = function (value) {
            var _this = this;
            var result = distribute(this.valueRaw, this.parse(value)).map(function (value) {
                return _this.roundingNumber(value);
            });
            var rest = this.roundingNumber(subtract(this.valueRaw, multiply(result.pop(), result.length)));
            return __spreadArray(__spreadArray([], result), [rest]);
        };
        return Calc;
    }());

    exports.BIT_SIZES = BIT_SIZES;
    exports.Calc = Calc;
    exports.REGEX_CHAR_SPECIAL = REGEX_CHAR_SPECIAL;
    exports.REGEX_CNPJ = REGEX_CNPJ;
    exports.REGEX_CPF = REGEX_CPF;
    exports.REGEX_CPF_CNPJ = REGEX_CPF_CNPJ;
    exports.REGEX_EMAIL = REGEX_EMAIL;
    exports.REGEX_NUMBER = REGEX_NUMBER;
    exports.REGEX_PHONE_BR = REGEX_PHONE_BR;
    exports.REGEX_TIME = REGEX_TIME;
    exports.REGEX_UPPER_CASE = REGEX_UPPER_CASE;
    exports.REGEX_URL = REGEX_URL;
    exports.RESOLUTION_HEIGHT = RESOLUTION_HEIGHT;
    exports.RESOLUTION_WIDTH = RESOLUTION_WIDTH;
    exports.Validate = Validate;
    exports.add = add;
    exports.base64toFile = base64toFile;
    exports.calc = calc;
    exports.calcOptions = calcOptions;
    exports.contains = contains;
    exports.distribute = distribute;
    exports.divide = divide;
    exports.fileToBase64 = fileToBase64;
    exports.getNode = getNode;
    exports.getSizeImage = getSizeImage;
    exports.handleTry = handleTry;
    exports.increment = increment;
    exports.isAfterDate = isAfterDate;
    exports.isAllowExtensions = isAllowExtensions;
    exports.isBeforeDate = isBeforeDate;
    exports.isBeforeNumber = isBeforeNumber;
    exports.isBetweenDate = isBetweenDate;
    exports.isBirthDateValidation = isBirthDateValidation;
    exports.isCnpj = isCnpj;
    exports.isCpf = isCpf;
    exports.isCpfOrCnpj = isCpfOrCnpj;
    exports.isDate = isDate;
    exports.isDifferent = isDifferent;
    exports.isDifferentDate = isDifferentDate;
    exports.isDifferentNotStrict = isDifferentNotStrict;
    exports.isDifferentNumber = isDifferentNumber;
    exports.isEmpty = isEmpty;
    exports.isEqual = isEqual;
    exports.isEqualDate = isEqualDate;
    exports.isEqualNotStrict = isEqualNotStrict;
    exports.isEqualNumber = isEqualNumber;
    exports.isFile = isFile;
    exports.isFill = isFill;
    exports.isFloat = isFloat;
    exports.isInstanceOf = isInstanceOf;
    exports.isLess = isLess;
    exports.isLessOrEqual = isLessOrEqual;
    exports.isMore = isMore;
    exports.isMoreOrEqual = isMoreOrEqual;
    exports.isNull = isNull;
    exports.isNumber = isNumber;
    exports.isNumeric = isNumeric;
    exports.isPassword = isPassword;
    exports.isRgSp = isRgSp;
    exports.isString = isString;
    exports.isUndefined = isUndefined;
    exports.maxSize = maxSize;
    exports.merge = merge;
    exports.mergeObject = mergeObject;
    exports.minSize = minSize;
    exports.multiply = multiply;
    exports.notIsInstanceOf = notIsInstanceOf;
    exports.parseNumber = parseNumber;
    exports.parseNumberOptions = parseNumberOptions;
    exports.relativeTime = relativeTime;
    exports.removeAccents = removeAccents;
    exports.sortAsc = sortAsc;
    exports.sortDesc = sortDesc;
    exports.subtract = subtract;
    exports.timeToDate = timeToDate;
    exports.validate = validate;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=utils.umd.js.map
