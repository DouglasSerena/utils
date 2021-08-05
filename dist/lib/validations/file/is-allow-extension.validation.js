"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAllowExtensions = void 0;
var common_validation_1 = require("../common/common.validation");
var number_validation_1 = require("../number.validation");
var is_empty_validation_1 = require("../common/is-empty.validation");
var isAllowExtensions = function (files, extensions) {
    var filesInvalid = [];
    files = files || [];
    if (common_validation_1.isInstanceof(files, File)) {
        files = [files];
    }
    for (var _i = 0, _a = Array.from(files); _i < _a.length; _i++) {
        var file = _a[_i];
        var type = [];
        if (common_validation_1.notIsInstanceof(file, File)) {
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
            if (common_validation_1.isDifferent(extension, type[type.length - 1])) {
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
        valid: is_empty_validation_1.isEmpty(filesInvalid),
        filesInvalid: filesInvalid,
    };
};
exports.isAllowExtensions = isAllowExtensions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXMtYWxsb3ctZXh0ZW5zaW9uLnZhbGlkYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdmFsaWRhdGlvbnMvZmlsZS9pcy1hbGxvdy1leHRlbnNpb24udmFsaWRhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxpRUFBeUY7QUFDekYsMERBQThDO0FBQzlDLHFFQUF3RDtBQVlqRCxJQUFNLGlCQUFpQixHQUFHLFVBQUMsS0FBYyxFQUFFLFVBQW9CO0lBQ3BFLElBQU0sWUFBWSxHQUE0QixFQUFFLENBQUM7SUFDakQsS0FBSyxHQUFHLEtBQUssSUFBSSxFQUFFLENBQUM7SUFFcEIsSUFBSSxnQ0FBWSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsRUFBRTtRQUM3QixLQUFLLEdBQUcsQ0FBQyxLQUFhLENBQUMsQ0FBQztLQUN6QjtJQUVELEtBQW1CLFVBQWlCLEVBQWpCLEtBQUEsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBakIsY0FBaUIsRUFBakIsSUFBaUIsRUFBRTtRQUFqQyxJQUFNLElBQUksU0FBQTtRQUNiLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUVkLElBQUksbUNBQWUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDL0IsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO1NBQzFDO1FBRUQsS0FBd0IsVUFBVSxFQUFWLHlCQUFVLEVBQVYsd0JBQVUsRUFBVixJQUFVLEVBQUU7WUFBL0IsSUFBTSxTQUFTLG1CQUFBO1lBQ2xCLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUU1QixJQUFJLDBCQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsRUFBRTtnQkFDMUIsWUFBWSxDQUFDLElBQUksQ0FBQztvQkFDaEIsUUFBUSxFQUFFLElBQUksQ0FBQyxJQUFJO29CQUNuQixRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUk7b0JBQ25CLEtBQUssRUFBRSxtQkFBbUI7aUJBQzNCLENBQUMsQ0FBQzthQUNKO1lBRUQsSUFBSSwrQkFBVyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUNqRCxZQUFZLENBQUMsSUFBSSxDQUFDO29CQUNoQixRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUk7b0JBQ25CLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSTtvQkFDbkIsU0FBUyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztvQkFDaEMsS0FBSyxFQUFFLElBQUk7aUJBQ1osQ0FBQyxDQUFDO2FBQ0o7U0FDRjtLQUNGO0lBRUQsT0FBTztRQUNMLGlCQUFpQixFQUFFLFVBQVU7UUFDN0IsS0FBSyxFQUFFLDZCQUFPLENBQUMsWUFBWSxDQUFDO1FBQzVCLFlBQVksY0FBQTtLQUNiLENBQUM7QUFDSixDQUFDLENBQUM7QUExQ1csUUFBQSxpQkFBaUIscUJBMEM1QiJ9