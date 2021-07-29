import { masked, maskIMask } from "./../dist/utils.es5.js";

const input = document.querySelector("input");
const div = document.querySelector("div");

masked("TEL").bind(input).update(null);
// input.value = "1235";
console.log(masked().mask("12122222225", { mask: "000-000-00" }));
console.log(masked("CURRENCY_BRL").unmask("01,001"));
// masked().bind(input, masked().amount);
// masked().bind(div, masked().amount);
// masked("#.##0,00")
