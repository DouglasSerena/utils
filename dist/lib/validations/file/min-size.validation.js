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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWluLXNpemUudmFsaWRhdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy92YWxpZGF0aW9ucy9maWxlL21pbi1zaXplLnZhbGlkYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscURBTzJCO0FBQzNCLGlFQUEyRDtBQUMzRCwwREFBOEM7QUFDOUMscUVBQXdEO0FBYWpELElBQU0sT0FBTyxHQUFHLFVBQUMsS0FBYyxFQUFFLEdBQVcsRUFBRSxJQUF5QjtJQUF6QixxQkFBQSxFQUFBLFdBQXlCO0lBQzVFLElBQU0sWUFBWSxHQUEwQixFQUFFLENBQUM7SUFDL0MsS0FBSyxHQUFHLEtBQUssSUFBSSxFQUFFLENBQUM7SUFFcEIsSUFBSSxJQUFJLEdBQUcsMkJBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSwyQkFBUyxDQUFDLENBQUMsQ0FBQztJQUMxQyxJQUFJLEdBQUcsSUFBSSxHQUFHLEdBQUcsQ0FBQztJQUVsQixJQUFJLGdDQUFZLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUFFO1FBQzdCLEtBQUssR0FBRyxDQUFDLEtBQWEsQ0FBQyxDQUFDO0tBQ3pCO0lBRUQsS0FBbUIsVUFBaUIsRUFBakIsS0FBQSxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFqQixjQUFpQixFQUFqQixJQUFpQixFQUFFO1FBQWpDLElBQU0sSUFBSSxTQUFBO1FBQ2IsSUFBSSxDQUFDLHdCQUFNLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDakIsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO1NBQzFDO1FBRUQsSUFBSSwwQkFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDM0IsWUFBWSxDQUFDLElBQUksQ0FBQztnQkFDaEIsUUFBUSxFQUFFLElBQUksQ0FBQyxJQUFJO2dCQUNuQixlQUFlLEVBQUUsSUFBSSxDQUFDLElBQUk7Z0JBQzFCLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSTtnQkFDbkIsS0FBSyxFQUFFLE1BQU07YUFDZCxDQUFDLENBQUM7U0FDSjtLQUNGO0lBRUQsT0FBTztRQUNMLE9BQU8sRUFBRSxJQUFJO1FBQ2IsV0FBVyxFQUFFLElBQUk7UUFDakIsS0FBSyxFQUFFLDZCQUFPLENBQUMsWUFBWSxDQUFDO1FBQzVCLFlBQVksY0FBQTtLQUNiLENBQUM7QUFDSixDQUFDLENBQUM7QUFoQ1csUUFBQSxPQUFPLFdBZ0NsQiJ9