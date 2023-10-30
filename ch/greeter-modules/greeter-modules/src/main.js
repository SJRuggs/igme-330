import { formatGreeting } from "./utils.js";

const input         = document.querySelector("#input-firstname");
const output        = document.querySelector("#output");
const cbForcefully  = document.querySelector("#cb-forcefully");

const helloButton   = document.querySelector("#btn-hello");
const goodbyeButton = document.querySelector("#btn-goodbye");

let forcefully = cbForcefully.checked;

cbForcefully.onchange   = e =>  forcefully = e.target.checked;
helloButton.onclick     = e =>  output.innerHTML = formatGreeting("Hello",input.value.trim(),forcefully);
goodbyeButton.onclick   = e =>  output.innerHTML = formatGreeting("Goodbye",input.value.trim(),forcefully);
