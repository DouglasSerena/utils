"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.minSize = void 0;
var file_validation_1 = require("./file.validation");
var common_validation_1 = require("../common/common.validation");
var number_validation_1 = require("../number.validation");
var is_empty_validation_1 = require("../common/is-empty.validation");
var minSize = function (files, min, type) {
    if (type === void 0) { type = "KB"; }
    var filesInvalid = [];
    files = files || [];
    var size = file_validation_1.BIT_SIZES[type] || file_validation_1.BIT_SIZES.B;
    size = size * min;
    if (common_validation_1.isInstanceof(files, File)) {
        files = [files];
    }
    for (var _i = 0, _a = Array.from(files); _i < _a.length; _i++) {
        var file = _a[_i];
        if (!file_validation_1.isFile(file)) {
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
        valid: is_empty_validation_1.isEmpty(filesInvalid),
        filesInvalid: filesInvalid,
    };
};
exports.minSize = minSize;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWluLXNpemUudmFsaWRhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy92YWxpZGF0aW9ucy9maWxlL21pbi1zaXplLnZhbGlkYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscURBTzJCO0FBQzNCLGlFQUEyRDtBQUMzRCwwREFBOEM7QUFDOUMscUVBQXdEO0FBYWpELElBQU0sT0FBTyxHQUFHLFVBQUMsS0FBYyxFQUFFLEdBQVcsRUFBRSxJQUF5QjtJQUF6QixxQkFBQSxFQUFBLFdBQXlCO0lBQzVFLElBQU0sWUFBWSxHQUEwQixFQUFFLENBQUM7SUFDL0MsS0FBSyxHQUFHLEtBQUssSUFBSSxFQUFFLENBQUM7SUFFcEIsSUFBSSxJQUFJLEdBQUcsMkJBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSwyQkFBUyxDQUFDLENBQUMsQ0FBQztJQUMxQyxJQUFJLEdBQUcsSUFBSSxHQUFHLEdBQUcsQ0FBQztJQUVsQixJQUFJLGdDQUFZLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUFFO1FBQzdCLEtBQUssR0FBRyxDQUFDLEtBQWEsQ0FBQyxDQUFDO0tBQ3pCO0lBRUQsS0FBbUIsVUFBNkIsRUFBN0IsS0FBQSxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQWlCLENBQUMsRUFBN0IsY0FBNkIsRUFBN0IsSUFBNkIsRUFBRTtRQUE3QyxJQUFNLElBQUksU0FBQTtRQUNiLElBQUksQ0FBQyx3QkFBTSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2pCLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztTQUMxQztRQUVELElBQUksMEJBQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQzNCLFlBQVksQ0FBQyxJQUFJLENBQUM7Z0JBQ2hCLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSTtnQkFDbkIsZUFBZSxFQUFFLElBQUksQ0FBQyxJQUFJO2dCQUMxQixRQUFRLEVBQUUsSUFBSSxDQUFDLElBQUk7Z0JBQ25CLEtBQUssRUFBRSxNQUFNO2FBQ2QsQ0FBQyxDQUFDO1NBQ0o7S0FDRjtJQUVELE9BQU87UUFDTCxPQUFPLEVBQUUsSUFBSTtRQUNiLFdBQVcsRUFBRSxJQUFJO1FBQ2pCLEtBQUssRUFBRSw2QkFBTyxDQUFDLFlBQVksQ0FBQztRQUM1QixZQUFZLGNBQUE7S0FDYixDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBaENXLFFBQUEsT0FBTyxXQWdDbEIifQ==