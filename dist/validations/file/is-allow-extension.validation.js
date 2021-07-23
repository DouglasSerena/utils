(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../common", "../number.validation"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isAllowExtensions = void 0;
    var common_1 = require("../common");
    var number_validation_1 = require("../number.validation");
    var isAllowExtensions = function (files, extensions) {
        var filesInvalid = [];
        files = files || [];
        if (common_1.isInstance(files, File)) {
            files = [files];
        }
        for (var _i = 0, _a = Array.from(files); _i < _a.length; _i++) {
            var file = _a[_i];
            var type = [];
            if (common_1.notIsInstance(file, File)) {
                filesInvalid.push({ error: "NOT_FILE" });
            }
            for (var _b = 0, extensions_1 = extensions; _b < extensions_1.length; _b++) {
                var extension = extensions_1[_b];
                type = file.name.split(".");
                if (number_validation_1.isLess(type.length, 2)) {
                    filesInvalid.push({
                        filename: file.name,
                        mimeType: file.type,
                        error: "WITHOUT_EXTENSION",
                    });
                }
                if (common_1.isDifferent(extension, type[type.length - 1])) {
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
            valid: common_1.isEmpty(filesInvalid),
            filesInvalid: filesInvalid,
        };
    };
    exports.isAllowExtensions = isAllowExtensions;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXMtYWxsb3ctZXh0ZW5zaW9uLnZhbGlkYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdmFsaWRhdGlvbnMvZmlsZS9pcy1hbGxvdy1leHRlbnNpb24udmFsaWRhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7SUFDQSxvQ0FBNEU7SUFDNUUsMERBQThDO0lBZXZDLElBQU0saUJBQWlCLEdBQUcsVUFDL0IsS0FBYyxFQUNkLFVBQW9CO1FBRXBCLElBQU0sWUFBWSxHQUEyQixFQUFFLENBQUM7UUFDaEQsS0FBSyxHQUFHLEtBQUssSUFBSSxFQUFFLENBQUM7UUFFcEIsSUFBSSxtQkFBVSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsRUFBRTtZQUMzQixLQUFLLEdBQUcsQ0FBQyxLQUFhLENBQUMsQ0FBQztTQUN6QjtRQUVELEtBQW1CLFVBQTZCLEVBQTdCLEtBQUEsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFpQixDQUFDLEVBQTdCLGNBQTZCLEVBQTdCLElBQTZCLEVBQUU7WUFBN0MsSUFBTSxJQUFJLFNBQUE7WUFDYixJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7WUFFZCxJQUFJLHNCQUFhLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO2dCQUM3QixZQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7YUFDMUM7WUFFRCxLQUF3QixVQUFVLEVBQVYseUJBQVUsRUFBVix3QkFBVSxFQUFWLElBQVUsRUFBRTtnQkFBL0IsSUFBTSxTQUFTLG1CQUFBO2dCQUNsQixJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBRTVCLElBQUksMEJBQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxFQUFFO29CQUMxQixZQUFZLENBQUMsSUFBSSxDQUFDO3dCQUNoQixRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUk7d0JBQ25CLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSTt3QkFDbkIsS0FBSyxFQUFFLG1CQUFtQjtxQkFDM0IsQ0FBQyxDQUFDO2lCQUNKO2dCQUVELElBQUksb0JBQVcsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDakQsWUFBWSxDQUFDLElBQUksQ0FBQzt3QkFDaEIsUUFBUSxFQUFFLElBQUksQ0FBQyxJQUFJO3dCQUNuQixRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUk7d0JBQ25CLFNBQVMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7d0JBQ2hDLEtBQUssRUFBRSxJQUFJO3FCQUNaLENBQUMsQ0FBQztpQkFDSjthQUNGO1NBQ0Y7UUFFRCxPQUFPO1lBQ0wsaUJBQWlCLEVBQUUsVUFBVTtZQUM3QixLQUFLLEVBQUUsZ0JBQU8sQ0FBQyxZQUFZLENBQUM7WUFDNUIsWUFBWSxjQUFBO1NBQ2IsQ0FBQztJQUNKLENBQUMsQ0FBQztJQTdDVyxRQUFBLGlCQUFpQixxQkE2QzVCIn0=