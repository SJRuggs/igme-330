import * as storage from "./storage.js"
let items = [];
let ol;

const showItems = () => { ol.innerHTML = items.map(item => `<li>${item}</li>`).join("\n"); };
const addItem = str => {
  if(str.length > 0){
    items.push(str);
    showItems();
  }
};

window.onload = () => {
  // list
  ol = document.querySelector("#target");

  // buttons
  document.querySelector("#btn-add").addEventListener("click", () => {
    const input = document.querySelector("#thing-text");
    addItem(input.value);
    input.value = "";
    storage.writeToLocalStorage("items",items);
  });
  document.querySelector("#btn-clear").addEventListener("click", () => {
    items = [];
    showItems();
    storage.writeToLocalStorage("items", items);
  });

  // local storage
  items = storage.readFromLocalStorage("items");
  if (!Array.isArray(items)) items = [];
  showItems();
}