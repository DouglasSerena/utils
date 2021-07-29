"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeAccents = void 0;
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
exports.removeAccents = removeAccents;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3ZlLWFjY2VudHMuZnVuY3Rpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZnVuY3Rpb25zL3JlbW92ZS1hY2NlbnRzLmZ1bmN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLFNBQWdCLGFBQWEsQ0FBQyxJQUFZO0lBQ3hDLElBQU0sT0FBTyxHQUFHO1FBQ2QsQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsR0FBRztRQUNOLENBQUMsRUFBRSxHQUFHO1FBQ04sQ0FBQyxFQUFFLEdBQUc7UUFDTixDQUFDLEVBQUUsR0FBRztLQUNQLENBQUM7SUFDRixPQUFPLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxPQUFPLENBQUMsWUFBWSxFQUFFLFVBQUMsSUFBSSxJQUFLLE9BQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksRUFBckIsQ0FBcUIsQ0FBQyxDQUFDO0FBQ3RFLENBQUM7QUExQ0Qsc0NBMENDIn0=