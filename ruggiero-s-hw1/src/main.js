import * as utils from "./utils.js";

const init = () =>
{
    const generateTechno = (json, count) =>
    {
        let babble = "";
        for (let i = 0; i < count; i++)
        {
            babble += (i > 0) ? "<br>" : "";
            babble += `
            ${utils.randomElement(json.words[0])}
            ${utils.randomElement(json.words[1])}
            ${utils.randomElement(json.words[2])}
            `;
        }
        return babble;
    };

    const loadBabble = (url, callback) =>
    {
        let json;
        const xhr = new XMLHttpRequest();
        xhr.onload = (e) =>
        {
            console.log(`In onload - HTTP Status Code = ${e.target.status}`);
            const text = e.target.response;
            try { json = JSON.parse(text); }
            catch (e) { console.log(e); return; }
            callback(json);
        }
        xhr.onerror = (e) => console.log(`In onerror - HTTP Status Code = ${e.target.status}`);
        xhr.open("GET", url);
        xhr.send();
    };

    const babbleLoaded = (json) =>
    {
        const giveOne = document.querySelector("#give-one");
        const giveFive = document.querySelector("#give-five");
        const output = document.querySelector("#output");
        giveOne.onclick = () => output.innerHTML = generateTechno(json, 1);
        giveFive.onclick = () => output.innerHTML = generateTechno(json, 5);
        output.innerHTML = generateTechno(json, 1);
    }

    loadBabble("./data/babble-data.json", babbleLoaded);
    
}



init();