(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", ".", "../common", "../number.validation"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.minSize = void 0;
    var _1 = require(".");
    var common_1 = require("../common");
    var number_validation_1 = require("../number.validation");
    var minSize = function (files, min, type) {
        if (type === void 0) { type = "KB"; }
        var filesInvalid = [];
        files = files || [];
        var size = _1.BIT_SIZES[type] || _1.BIT_SIZES.B;
        size = size * min;
        if (common_1.isInstance(files, File)) {
            files = [files];
        }
        for (var _i = 0, _a = Array.from(files); _i < _a.length; _i++) {
            var file = _a[_i];
            if (!_1.isFile(file)) {
                filesInvalid.push({ error: "NOT_FILE" });
            }
            if (number_validation_1.isLess(file.size, size)) {
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
            valid: common_1.isEmpty(filesInvalid),
            filesInvalid: filesInvalid,
        };
    };
    exports.minSize = minSize;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWluLXNpemUudmFsaWRhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy92YWxpZGF0aW9ucy9maWxlL21pbi1zaXplLnZhbGlkYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0lBQUEsc0JBT1c7SUFDWCxvQ0FBZ0Q7SUFDaEQsMERBQThDO0lBYXZDLElBQU0sT0FBTyxHQUFHLFVBQ3JCLEtBQWMsRUFDZCxHQUFXLEVBQ1gsSUFBeUI7UUFBekIscUJBQUEsRUFBQSxXQUF5QjtRQUV6QixJQUFNLFlBQVksR0FBeUIsRUFBRSxDQUFDO1FBQzlDLEtBQUssR0FBRyxLQUFLLElBQUksRUFBRSxDQUFDO1FBRXBCLElBQUksSUFBSSxHQUFHLFlBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxZQUFTLENBQUMsQ0FBQyxDQUFDO1FBQzFDLElBQUksR0FBRyxJQUFJLEdBQUcsR0FBRyxDQUFDO1FBRWxCLElBQUksbUJBQVUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDM0IsS0FBSyxHQUFHLENBQUMsS0FBYSxDQUFDLENBQUM7U0FDekI7UUFFRCxLQUFtQixVQUE2QixFQUE3QixLQUFBLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBaUIsQ0FBQyxFQUE3QixjQUE2QixFQUE3QixJQUE2QixFQUFFO1lBQTdDLElBQU0sSUFBSSxTQUFBO1lBQ2IsSUFBSSxDQUFDLFNBQU0sQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDakIsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO2FBQzFDO1lBRUQsSUFBSSwwQkFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7Z0JBQzNCLFlBQVksQ0FBQyxJQUFJLENBQUM7b0JBQ2hCLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSTtvQkFDbkIsZUFBZSxFQUFFLElBQUksQ0FBQyxJQUFJO29CQUMxQixRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUk7b0JBQ25CLEtBQUssRUFBRSxNQUFNO2lCQUNkLENBQUMsQ0FBQzthQUNKO1NBQ0Y7UUFFRCxPQUFPO1lBQ0wsT0FBTyxFQUFFLElBQUk7WUFDYixXQUFXLEVBQUUsSUFBSTtZQUNqQixLQUFLLEVBQUUsZ0JBQU8sQ0FBQyxZQUFZLENBQUM7WUFDNUIsWUFBWSxjQUFBO1NBQ2IsQ0FBQztJQUNKLENBQUMsQ0FBQztJQXBDVyxRQUFBLE9BQU8sV0FvQ2xCIn0=