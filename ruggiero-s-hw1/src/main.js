import * as utils from "./utils.js";

const init = () => {

    // generation function
    const generateTechno = count => {
        let babble = "";
        for (let i = 0; i < count; i++)
        {
            babble += (i > 0) ? "<br>" : "";
            babble += `
            ${utils.randomElement(json["words-one"])}
            ${words[1][Math.floor(Math.random() * words[1].length)]}
            ${words[2][Math.floor(Math.random() * words[2].length)]}
            `;
        }
        return babble;
    };

    let json = new XMLHttpRequest();
    json.onload = (e) =>
    {
        console.log(`In onload - HTTP Status Code = ${e.target.status}`);
        json = e.target.responseXML;

        console.log(json);

        // find references
        const giveOne = document.querySelector("#give-one");
        const giveFive = document.querySelector("#give-five");
        const output = document.querySelector("#output");

        // assign onclick handlers
        giveOne.onclick = () => output.innerHTML = generateTechno(1);
        giveFive.onclick = () => output.innerHTML = generateTechno(5);

        // initial generation
        output.innerHTML = generateTechno(1);
    }
    json.onerror = (e) => console.log(`In onerror - HTTP Status Code = ${e.target.status}`);
    json.open("GET", "./data/babble-data.json");
    json.send();   
}

init();