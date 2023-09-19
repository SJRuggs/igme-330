import * as utils from "./utils.js";

(() => {

    const babbleLoaded = (json) =>
    {
        document.querySelector("#give-one").onclick = () => output.innerHTML = generateTechno(json, 1);
        document.querySelector("#give-five").onclick = () => output.innerHTML = generateTechno(json, 5);
        document.querySelector("#output").innerHTML = generateTechno(json, 1);
    }
    
    const generateTechno = (json, count) =>
    {
        let babble = [];
        for (let i = 0; i < count; i++)
            babble.push(json.words.map((set) => utils.randomElement(set)).join(" "));
        return babble.join("<br>");
    }

    const xhr = new XMLHttpRequest();
    xhr.onload = e => babbleLoaded(JSON.parse(e.target.response));
    xhr.onerror = e => console.log(e.target.status);
    xhr.open("GET", "./data/babble-data.json");
    xhr.send();
})();